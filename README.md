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

## Tutorial

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