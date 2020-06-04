# entullo
This is a simple development of a package that allows to have a database in MongoDB with nutrition data obtained of USDA (United States Department of Agriculture). You can change the url and download other type of data  for your database.

## Installation

You need node.js and npm.

~~~
npm install -g entullo
~~~

## Usage from command line

You can use `--help` option to see what you can do:

~~~
Options:
  -v --version        Print entullo version
  -h, --help          output usage information

Commands:
  config              Show the config options.
  download [options]  Download data from USDA
  usda [options]      Config the URLs
  insert              Insert data from ./files/json/usda.json to the database.
~~~

### Commands:
`config`: It shows the config file.
`download`: It is used to download data.
- Options: You can see the command options using `--help`:

    ~~~
    Usage: app download [options]

    Download data from entullo

    Options:
    -u, --usda       USDA data version
    -s, --set <url>  Download data from another USDA url       
    -h, --help       output usage information
    ~~~
    

`usda`: Is is used to work with the urls.
- Options: You can see the command options using `--help`:

    ~~~
    Usage: app entullo [options]

    Config the URLs

    Options:
    -a, --add <path> <version> <url>  Add a new url to the config options
    -s, --show                        Show the available urls
    -d, --default <path> <version>    Set a default url
    -h, --help                        output usage information
    ~~~

`insert`: It inserts data in your database (MongoDB).

## Entullo Tutorial

Install it with

```
npm i -g entullo
```

The first time it will ask you some questions to 
configure the database.

Here is an example of how to configure it locally:

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ entullo
The directory 'files' was created.
The directory 'zip' was created.
The directory 'unzip' was created.
The directory 'json' was created.
███████╗███╗   ██╗████████╗██╗   ██╗██╗     ██╗      ██████╗
██╔════╝████╗  ██║╚══██╔══╝██║   ██║██║     ██║     ██╔═══██╗
█████╗  ██╔██╗ ██║   ██║   ██║   ██║██║     ██║     ██║   ██║
██╔══╝  ██║╚██╗██║   ██║   ██║   ██║██║     ██║     ██║   ██║
███████╗██║ ╚████║   ██║   ╚██████╔╝███████╗███████╗╚██████╔╝
╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚══════╝╚══════╝ ╚═════╝

? Do you want to use a default configuration file?  Yes.
? Where will your config file be?  I want to use this directory.
New directory: /Volumes/2020/TFG/tfg-kathrina-arrocha-umpierrez/deploy/config
New file: /Volumes/2020/TFG/tfg-kathrina-arrocha-umpierrez/deploy/config/default.json
```

this will create the following tree:

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ tree
.
├── config
│   └── default.json
└── files
    ├── json
    ├── unzip
    └── zip

5 directories, 1 file
```

The command `entullo config` shows the contents of the configuration file:

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ entullo config
entullo 2.0.2

The configuration used is:

Config {
  db: {
    host: '127.0.0.1',
    port: 27017,
    name: 'usda-db',
    collectionUSDA: 'food'
  },
  usda: {
    urls: {
      default: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abxl.zip',
      sr28: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abxl.zip',
      sr27: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr27/dnload/sr27abxl.zip',
      sr26: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr26/dnload/sr26abxl.zip',
      sr25: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr25/dnload/sr25abxl.zip',
      sr24: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr24/dnload/sr24abxl.zip',
      sr23: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr23/dnload/sr23abxl.zip',
      sr22: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr22/dnload/sr22abxl.zip',
      sr21: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr21/dnload/sr21abxl.zip',
      sr20: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr20/sr20abxl.zip',
      sr19: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr19/sr19abxl.zip',
      sr18: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr18/sr18abxl.zip',
      sr17: 'https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/sr17/sr17abxl.zip'
    }
  },
  files: { zip: 'data.zip', json: 'usda.json', dish: 'dishes.json' },
  directories_path: {
    zip: './files/zip/',
    unzip: './files/unzip/',
    json: './files/json/'
  }
}
```

With the command `download` you can download the default version:

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ entullo download
entullo 2.0.2

 Downloading from USDA, using version sr28
        You can choose another version in this URL:
        https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/
       Then, you should change it in our configuration file: ./config/default.json

Extracted files
Converting excel file to json...
Process successfully completed
New json file created in ./files/json/
```

The new tree structure is:

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ tree -s
.
├── [        102]  config
│   └── [       1559]  default.json
└── [        170]  files
    ├── [        102]  json
    │   └── [   11787549]  usda.json
    ├── [        136]  unzip
    │   ├── [    2486334]  ABBREV.xlsx
    │   └── [     653211]  sr28_doc.pdf
    └── [        102]  zip
        └── [    3050195]  data.zip

5 directories, 5 files
```

Observe the size of the file `files/json/usda.json`: it contains the whole data base in JSON format. For instance, to get the 2nd item description we can use [jq](https://stedolan.github.io/jq/):

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ jq .[1].shrt_desc files/json/usda.json
"BUTTER,WHIPPED,W/ SALT"
```

Be sure MongoDB is installed and `mongod` is running. If not,
[install it](https://docs.mongodb.com/manual/installation/),
[confifure it](https://docs.mongodb.com/manual/reference/configuration-options/)
and [run it](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/):

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ mkdir mongo-database
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ cd mongo-database/
[.../deploy/mongo-database(master)]$ mongod --dbpath .
2020-06-04T11:33:33.492+0100 I  CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2020-06-04T11:33:33.522+0100 I  CONTROL  [initandlisten] MongoDB starting : pid=9774 port=27017 dbpath=. 64-bit host=sanclemente-2.local
...
```

This commands start `mongod` in the directory `mongo-database`:

```
[.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ tree mongo-database/
mongo-database/
├── WiredTiger
├── WiredTiger.lock
├── WiredTiger....
├── _mdb_catalog.wt
├── collection-.....wt
├── diagnostic.data
│   ├── metrics.2020-06-04T10-33-42Z-00000
│   └── metrics.interim
├── index-6--5.....wt
├── journal
│   └── WiredTigerPreplog....
├── mongod.lock
├── sizeStorer.wt
└── storage.bson

2 directories, 21 files
```

Now we can upload the json file inside the mongo database with

```
.../tfg-kathrina-arrocha-umpierrez/deploy(master)]$ entullo insert
entullo 2.0.2
/Users/casiano/.nvm/versions/node/v12.10.0/lib/node_modules/entullo/node_modules/mongodb/lib/utils.js:132
      throw err;
      ^

MongoError: ns not found
    at MessageStream.messageHandler (/Users/casiano/.nvm/versions/node/v12.10.0/lib/node_modules/entullo/node_modules/mongodb/lib/cmap/connection.js:261:20)
    at MessageStream.emit (events.js:209:13)
    at processIncomingData (/Users/casiano/.nvm/versions/node/v12.10.0/lib/node_modules/entullo/node_modules/mongodb/lib/cmap/message_stream.js:144:12)
    at MessageStream._write (/Users/casiano/.nvm/versions/node/v12.10.0/lib/node_modules/entullo/node_modules/mongodb/lib/cmap/message_stream.js:42:5)
    at doWrite (_stream_writable.js:428:12)
    at writeOrBuffer (_stream_writable.js:412:5)
    at MessageStream.Writable.write (_stream_writable.js:302:11)
    at Socket.ondata (_stream_readable.js:722:22)
    at Socket.emit (events.js:209:13)
    at addChunk (_stream_readable.js:305:12) {
  ok: 0,
  code: 26,
  codeName: 'NamespaceNotFound',
  name: 'MongoError'
}
```

From stack overflow:

```
 MongoError: ns not found occurs when performing actions on collections that don't exist. For example, attempting to drop indexes before an explicit collection creation has occurred or before adding a document to the collection which implicitly creates the collection.
```