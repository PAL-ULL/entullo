"use strict";

const fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const AdmZip = require("adm-zip");
const resolver = require("excelresolver");
const config = require("config");
var beautify = require('js-beautify').js;
var mongojs = require("mongojs");

const host =  config.get("db.host");
const port = config.get("db.port");;
const name = config.get("db.name");
const url = `mongodb://${host}:${port}/${name}`;

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const load = {};

load.download = async function (urlOption) {
    let url;
    if (urlOption !== undefined) {
        url = urlOption;
    } else {
        url = config.get("usda.urls.default");
    }
    const regexp = /sr+[1-9][1-9]/;
    const result = url.match(regexp);

    console.log(
        "\n Downloading from USDA, using version " + result +
        `
        You can choose another version in this URL: 
        https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/
       Then, you should change it in our configuration file: ./config/default.json
  `);

    const zipPath = config.get("directories_path.zip");
    const zipFile = config.get("files.zip");
    const path = Path.resolve(zipPath, zipFile);
    const writer = fs.createWriteStream(path);

    await Axios({
        url: url,
        method: "GET",
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(writer);
    })
        .catch((err) => {
            console.error(err);
        });

    return new Promise((resolve, reject) => {
        writer.on("finish", () => {
            load.unzip_files();
            load.convertToJSON();
            console.log("Process successfully completed");
        });
        writer.on("error", err => {
            reject(err);
        });
    });
};

load.unzip_files = function () {
    const zipPath = config.get("directories_path.zip");
    const zipFile = config.get("files.zip");

    var zip = new AdmZip(zipPath + zipFile);
    const unzipPath = config.get("directories_path.unzip");
    zip.extractAllTo(unzipPath, true);

    console.log("Extracted files");
};

load.convertToJSON = async function () {
    console.log("Converting excel file to json...");
    const json = config.get("directories_path.json");
    const myfile = config.get("directories_path.unzip") + "ABBREV.xlsx";
    const data = await resolver.parse(myfile);

    fs.writeFile(config.get("directories_path.json") + config.get("files.json"), beautify(JSON.stringify(data), { indent_size: 2, space_in_empty_paren: true }), (err) => {
        if (err) throw err;
        console.log("New json file created in " + json);
    });
};

load.insertDatabase = function () {
    fs.readFile(config.get("directories_path.json") + config.get("files.json"), "utf8", function (err, data) {
        if (err) { throw err; }
        client.connect(function (err, client) {
            assert.equal(null, err);
            const db = client.db(name);
            var json = JSON.parse(data);

            const food = config.get("db.collectionUSDA");
            // const collection = db.collection(food);
            db.listCollections().toArray(function (err, names) {
                if (err) {
                    console.log(err);
                } else {
                    for (let i = 0; i < names.length; i++) {
                        if ((names[i].name = food)) {
                            db.dropCollection(
                                food,
                                function (err, result) {
                                    console.log("Collection droped");
                                }
                            );
                        } else {
                            console.log("Collection doesn't exist");
                        }
                    }
                }
            })

            db.createCollection(food, function (err, collection) {
                assert.equal(null, err);
                collection.insertMany(json, function (err, doc) {
                    if (err) throw err;
                    console.log("Inserting data in the collection: " + food);
                    if (typeof (doc) !== "Object") {
                        console.log("Data was successfully inserted");
                        client.close();
                    }
                });
            });


        });
    });
};


module.exports = load;
