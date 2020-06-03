"use strict";

const fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const AdmZip = require("adm-zip");
const resolver = require("excelresolver");
const config = require("config");
var beautify = require('js-beautify').js;
var mongojs = require("mongojs");
var db = mongojs(config.get("db.name"));

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

    fs.writeFile(config.get("directories_path.json") + config.get("files.json"), beautify(JSON.stringify(data),  { indent_size: 2, space_in_empty_paren: true }), (err) => {
        if (err) throw err;
        console.log("New json file created in " + json);
    });
};

load.insertDatabase = function () {
    fs.readFile(config.get("directories_path.json") + config.get("files.json"), "utf8", function (err, data) {
        if (err) { throw err; }

        var json = JSON.parse(data);
        const food = config.get("db.collectionUSDA");
        if (db.food !== "undefined") {
            db.food.drop(function (err, delOK) {
                if (err) throw err;
                if (delOK) {
                    console.log("Collection deleted");
                    db.food.insert(json, function (err, doc) {
                        if (err) throw err;
                        console.log("Inserting data in the collection: " + food);
                        // eslint-disable-next-line valid-typeof
                        if (typeof (doc) !== "Object") {
                            console.log("the data was successfully inserted");
                            db.close();
                        }
                    });
                }
            });
        } else {
            db.food.insert(json, function (err, doc) {
                if (err) throw err;
                console.log("Inserting data in the collection: " + food);
                // eslint-disable-next-line valid-typeof
                if (typeof (doc) !== "Object") {
                    console.log("the data was successfully inserted");
                    db.close();
                }
            });
        }
    });
};


module.exports = load;
