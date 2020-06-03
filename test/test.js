'use strict';
const assert = require('assert');
const expect = require('chai').expect;



const program = require("commander");
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const Path = require("path");
const home = require('os').homedir();
const homeConfig = Path.join(home, ".config");
const actual = Path.join(process.cwd(), "config");


if ((!fs.existsSync(Path.join(home, ".config" + "/default.json"))) && (!fs.existsSync(Path.join(process.cwd(), "config" + "/default.json")))) {
    console.log("No existe un archivo de configuración llamado default.json.");
}else{
    const config = require("config");
    const url = require("../lib/urls-data");
    const load = require("../lib/load-data");
    describe('Testability: load-data.js', () => {
        // it("Showing the urls", function (done) {
        //      load.download().then((value) => {
        //         // done();
        //         expect(value).to.equal(false);
        //         // done();
        //     });
        // });
    
        it("Unzip files", function () {
            const result = load.unzip_files();
            assert.equal(result, undefined);
        });
    
        // it("Conver file to json", function () {
        //     const result = load.convertToJSON();
        //     console.log(result);
        //     assert.equal(result, undefined);
        // });
    
        // it("Conver file to json", function () {
        //     const result = load.insertDatabase();
        //     console.log(result);
        //     assert.equal(result, undefined);
        // });
    });
    
    
    describe('Testability: url-data.js', () => {
    
        it("Showing the urls", function () {
            assert.equal(url.showUrls(), config.usda.urls);
        });
    
        it("Set url as a default url", function () {
            const result = url.setDefault("config/default.json", "test");
            assert.equal(result, undefined);
        });
    
        it("Add a new url", function () {
            const result = url.addUrl("config/default.json", "name", "www.google.com");
            assert.equal(result, undefined);
        });
    
    });
}
