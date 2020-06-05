"use strict";

const fs = require("fs");
const config = require("config");

const urls = {};

urls.showUrls = function () {
    console.log("The available urls are:");
    // console.log(config.usda.urls)
    return config.usda.urls;
};

urls.setDefault = function (configFilePath, newUrl) {
    if ((configFilePath === "undefined") || (newUrl === "undefined")) {
        console.log("Entra");
        throw new Error("the arguments are missing");
    }
    fs.readFile(configFilePath, "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            throw new Error("The \"path\" argument must be of type string or an instance of Buffer or URL. Received undefined");
        }
        try {
            const options = JSON.parse(jsonString);
            options.usda.urls.default = newUrl;
            fs.writeFileSync(configFilePath, JSON.stringify(options));
            console.log("A new URL was set as default.");
        } catch (err) {
            console.log("Error parsing JSON string:", err);
            throw err;
        }
    });
};

urls.addUrl = function (configFilePath, name, url) {
    if ((configFilePath === "undefined") || (name === "undefined") || (url === "undefined")) {
        throw new Error("The \"path\" argument must be of type string or an instance of Buffer or URL. Received undefined");
    }
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
    if (url.match(regex)) {
        fs.readFile(configFilePath, "utf8", (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                throw err;
            }
            try {
                const options = JSON.parse(jsonString);
                options.usda.urls[`${name}`] = `${url}`;
                fs.writeFileSync(configFilePath, JSON.stringify(options));
                console.log("A new URL was added.");
            } catch (err) {
                console.log("Error parsing JSON string:", err);
                throw err;
            }
        });
    } else {
        console.log("Url not available");
        throw new Error("Url not available");
    }
};

module.exports = urls;
