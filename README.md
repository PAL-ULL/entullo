[![npm version](https://badge.fury.io/js/entullo.svg)](https://badge.fury.io/js/entullo)

# entullo
This is a simple development of a package that allows to have a database in MongoDB with nutrition data obtained of USDA (United States Department of Agriculture). You can change the url and download other type of data  for your database.

## Installation

You need node.js and npm.

~~~
npm install -d entullo
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



