#!/usr/bin/env node

const program = require("commander");
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const Path = require("path");
var beautify = require('js-beautify').js;
const home = require('os').homedir();
const homeConfig = Path.join(home, ".config");
const actual = Path.join(process.cwd(), "config");

function start() {

    const msn = msn => {
        console.log(chalk.bold.cyan(figlet.textSync(msn, {
            font: 'ANSI Shadow',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })));
    }

    const question1 = () => {
        const quest1 = {
            name: 'configFile',
            type: 'list',
            message: '¿Do you want to use a default configuration file? ',
            choices: [
                'Yes.',
                'No.'
            ]
        };

        return inquirer.prompt(quest1);
    }

    const question2 = () => {
        const quest2 = {
            name: 'directory',
            type: 'list',
            message: 'Where will your config file be? ',
            choices: [
                'I want to use this directory.',
                'I want to use my home directory.'
            ]
        };

        return inquirer.prompt(quest2);
    }


    const queryParams = (first, second) => {

        if (second.directory === 'I want to use this directory.') {
            process.env["NODE_CONFIG_DIR"] = actual;
            console.log("aqui:" + process.env["NODE_CONFIG_DIR"]);

        } else if (second.directory === 'I want to use my home directory.') {
            process.env["NODE_CONFIG_DIR"] = homeConfig;

        }

        if (first.configFile === 'No.') {
            console.log("Please, introduce the answers")
            const data = [
                {
                    name: 'dbHost',
                    type: 'input',
                    message: 'MongoDB address:',
                    default: '127.0.0.1',
                    validate: validateString
                }, {
                    name: 'dbPort',
                    type: 'number',
                    message: 'MongoDB port: ',
                    default: 27017,
                    validate: validateNumber
                },
                {
                    name: 'dbName',
                    type: 'input',
                    message: 'Database name: ',
                    default: 'usda-db',
                    validate: validateString
                }, {
                    name: 'dbCollection',
                    type: 'input',
                    message: 'Database collection: ',
                    default: 'food',
                    validate: validateString
                },
                {
                    name: 'usdaUrlsDefault',
                    type: 'input',
                    message: 'Download url: ',
                    default: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abxl.zip',
                    validate: validateString

                }, {
                    name: 'filesZip',
                    type: 'input',
                    message: 'Zip file name: ',
                    default: 'data.zip',
                    validate: validateString
                },
                {
                    name: 'filesJson',
                    type: 'input',
                    message: 'JSON file name:',
                    default: 'usda.json',
                    validate: validateString
                }, {
                    name: 'dirZip',
                    type: 'input',
                    message: 'Zip directory name:',
                    default: 'zip',
                    validate: validateString
                },
                {
                    name: 'dirUnzip',
                    type: 'input',
                    message: 'Unzip directory name:',
                    default: 'unzip',
                    validate: validateString
                },
                {
                    name: 'dirJson',
                    type: 'input',
                    message: 'Json directory name:',
                    default: 'json',
                    validate: validateString
                }
            ];
            console.log(data);
            return inquirer.prompt(data);
        }
        if (first.configFile === 'Yes.') {

            const cont = {
                db:
                {
                    host: "127.0.0.1",
                    port: 27017,
                    name: "usda-db",
                    collectionUSDA: "food"
                },
                usda: {
                    urls: {
                        default: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abxl.zip",
                        sr28: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abxl.zip",
                        sr27: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr27/dnload/sr27abxl.zip",
                        sr26: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr26/dnload/sr26abxl.zip",
                        sr25: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr25/dnload/sr25abxl.zip",
                        sr24: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr24/dnload/sr24abxl.zip",
                        sr23: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr23/dnload/sr23abxl.zip",
                        sr22: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr22/dnload/sr22abxl.zip",
                        sr21: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr21/dnload/sr21abxl.zip",
                        sr20: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr20/sr20abxl.zip",
                        sr19: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr19/sr19abxl.zip",
                        sr18: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr18/sr18abxl.zip",
                        sr17: "https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr17/sr17abxl.zip"
                    }
                },
                files: {
                    zip: "data.zip",
                    json: "usda.json",
                    dish: "dishes.json"
                },
                directories_path: {
                    zip: "./files/zip/",
                    unzip: "./files/unzip/",
                    json: "./files/json/"
                }
            };


            if (!fs.existsSync(process.env["NODE_CONFIG_DIR"])) {
                console.log("New directory was created.")
                fs.mkdirSync(process.env["NODE_CONFIG_DIR"], 0777);
            }

            const file = Path.join(process.env["NODE_CONFIG_DIR"] + "/default.json");
            console.log(file);
            fs.writeFileSync(file, beautify(JSON.stringify(cont), { indent_size: 2, space_in_empty_paren: true }));

        }
        createDirs();
    };

    (async () => {
        msn('eusda');
        const first = await question1();
        const second = await question2();
        const result = queryParams(first, second)
        if (typeof result !== 'undefined') {
            createConfig(await result);
        }
        // process.stdout.write("\u001b[2J\u001b[0;0H");
       
    })();

};

const validateNumber = async (input) => {
    if (typeof input !== 'number') {
        console.log('\nIncorrect asnwer, it was expected a number.');
        process.exit(1);
    }
    return true;
};

const validateString = async (input) => {
    if (typeof input !== 'string') {
        console.log('\nIncorrect asnwer, it was expected a number.');
        process.exit(1);
    }
    return true;
};

const createDirs = () => {
    console.log("Maybe we need to create some directories.")
    const pathFiles = `${process.cwd()}/files`;
    if (!fs.existsSync(pathFiles)) {
        console.log("The directory 'files' was created.")
        fs.mkdirSync(pathFiles, 0777);
        const pathZip = `${process.cwd()}/files/zip`;
        if (!fs.existsSync(pathZip)) {
            console.log("The directory 'zip' was created.")
            fs.mkdirSync(pathZip, 0777);
        }
        const pathUnzip = `${process.cwd()}/files/unzip`;
        if (!fs.existsSync(pathUnzip)) {
            console.log("The directory 'unzip' was created.")
            fs.mkdirSync(pathUnzip, 0777);
        }
        const pathJson = `${process.cwd()}/files/json`;
        if (!fs.existsSync(pathJson)) {
            console.log("The directory 'json' was created.")
            fs.mkdirSync(pathJson, 0777);
        }
    } else if (fs.existsSync(pathFiles)) {
        console.log("files no existe");
        const pathZip = `${process.cwd()}/files/zip`;
        if (!fs.existsSync(pathZip)) {
            console.log("The directory 'zip' was created.")
            fs.mkdirSync(pathZip, 0777);
        }
        const pathUnzip = `${process.cwd()}/files/unzip`;
        if (!fs.existsSync(pathUnzip)) {
            console.log("The directory 'unzip' was created.")
            fs.mkdirSync(pathUnzip, 0777);
        }
        const pathJson = `${process.cwd()}/files/json`;
        if (!fs.existsSync(pathJson)) {
            console.log("The directory 'json' was created.")
            fs.mkdirSync(pathJson, 0777);
        }
    }
}

const createConfig = (data) => {
    if (typeof data === 'undefined') {
        console.log("The config file was created with default params.")
    }

    const myConfig = {
        db:
        {
            host: data.dbHost,
            port: data.dbPort,
            name: data.dbName,
            collectionUSDA: data.dbCollection
        },
        usda: {
            urls: {
                default: data.usdaUrlsDefault
            }
        },
        files: {
            zip: data.filesZip,
            json: data.filesJson
        },
        directories_path: {
            zip: `./files/${data.dirZip}/`,
            unzip: `./files/${data.dirUnzip}/`,
            json: `./files/${data.dirJson}/`
        }
    };


    if (!fs.existsSync(process.env["NODE_CONFIG_DIR"])) {
        console.log("New directory was created.")
        fs.mkdirSync(process.env["NODE_CONFIG_DIR"], 0777);
    }
    const file = Path.join(process.env["NODE_CONFIG_DIR"] + "/default.json");
    fs.writeFileSync(file, beautify(JSON.stringify(myConfig),  { indent_size: 2, space_in_empty_paren: true } ));
 
};






function init() {

    if (fs.existsSync(actual)) {
        // console.log("Caso 1: ")
        process.env["NODE_CONFIG_DIR"] = actual;
        // console.log("aqui:" + process.env["NODE_CONFIG_DIR"]);
    } else if (fs.existsSync(homeConfig)) {
        process.env["NODE_CONFIG_DIR"] = homeConfig;
        // console.log("aqui:" + process.env["NODE_CONFIG_DIR"]);
    }
    // process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
    const config = require("config");
    // console.log('Configuration directory: ' + config.util.getEnv('CONFIG_DIR'));
    // console.log('Configuration NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
    // console.log('Configuration NODE_CONFIG: ' + config.util.getEnv('NODE_CONFIG'));
    // console.log('Configuration HOSTNAME: ' + config.util.getEnv('HOSTNAME'));
    // console.log('Configuration NODE_APP_INSTANCE: ' + config.util.getEnv('NODE_APP_INSTANCE'));

    // console.log(config);




    const load = require("./lib/load-data");
    const urlData = require("./lib/urls-data");


    program
        .name("app")
        .usage("command [option]");

    program
        .option("-v --version", "Print eusda version")
        .description("Show the version.")

    if (program.version !== undefined) {
        const package = require("./package.json");
        console.log(`eusda ${package.version}`);
    }


    program
        .command("config")
        .description("Show the config options.")
        .action(function () {
            console.log("\nThe configuration used is:\n");
            console.log(config);
            console.log("\n You can change the settings from default.json:\n");
        });

    const urls = config.get("usda.urls");
    const version = urls.default;
    const regexp = /sr+[1-9][1-9]/;
    const resultVersion = version.match(regexp);

    program
        .command("download")
        .description("Download data from USDA")
        .option("-u, --usda", "USDA data version")
        .option("-s, --set <url>", "Download data from another USDA url")
        .action(function (opt) {
            if (opt.usda === true) {
                console.log("We are using " + resultVersion + " version");
            }
            if (opt.set !== undefined) {
                load.download(opt.set);
            }
            if ((opt.usda === undefined) && (opt.set === undefined)) {
                load.download();
            }
        });

    program
        .command("usda")
        .description("Config the URLs")
        .option("-a, --add <path> <version> <url>", "Add a new url to config options")
        .option("-s, --show", "Show the available urls")
        .option("-d, --default <path> <version>", "Set a default url")
        .action(function (opt, arg1, otro) {
            if (opt.show === true) {
                const show = urlData.showUrls();
                console.log(show);
                process.exit();
            }
            if (opt.add !== undefined) {
                const args = 7;
                if ((opt.parent.rawArgs.length < args)) {
                    console.log("error: option '-a, --add <path> <version> <url>' argument missing");
                    process.exit();
                } else if ((opt.parent.rawArgs.length > args)) {
                    console.log("error: option '-a, --add <path> <version> <url>' there are more arguments than necessary");
                    process.exit();
                }
                const index4 = 4;
                const index5 = 5;
                const index6 = 6;
                const pathFile = process.argv[index4];
                const versionName = process.argv[index5];
                const newUrl = process.argv[index6];
                urlData.addUrl(pathFile, versionName, newUrl);
            }
            if (opt.default !== undefined) {
                const args = 6;
                if ((opt.parent.rawArgs.length < args)) {
                    console.log("error: option '-d, --default <path> <version>' argument missing");
                    process.exit();
                } else if ((opt.parent.rawArgs.length > args)) {
                    console.log("error: option '-d, --default  <path> <version>' there are more arguments than necessary");
                    process.exit();
                }
                const index4 = 4;
                const index5 = 5;
                const pathFile = process.argv[index4];
                const versionName = process.argv[index5];
                urlData.setDefault(pathFile, versionName);
            }
            if ((opt.add === undefined) && (opt.default === undefined)) {
                program.help();
            }
        });

    const directorio = config.get("directories_path.json");
    const archivo = config.get("files.json");

    program
        .command("insert")
        .description(`Insert data from ${directorio}${archivo} to database.`)
        .action(function () {
            load.insertDatabase();
        });


    program.on("command:*", function () {
        console.error("Invalid command: %s\nSee --help for a list of available commands.", program.args.join(" "));
        process.exit();
    });

    program.parse(process.argv);

    const comandos = 3;
    if (process.argv.length < comandos) program.help();


}


if ((!fs.existsSync(Path.join(home, ".config" + "/default.json"))) && (!fs.existsSync(Path.join(process.cwd(), "config" + "/default.json")))) {
    console.log("No existe un archivo de configuración llamado default.json.");
    if (!fs.existsSync(Path.join(process.cwd(), "files"))) {
        createDirs();
    }
    start();

} else {
    if (!fs.existsSync(Path.join(process.cwd(), "files"))) {
        createDirs();
    }
    init();
}


