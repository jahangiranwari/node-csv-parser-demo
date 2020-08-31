# node-csv-parser-demo
Demo app to parse CSV files in Node.js

## CSV to NDJSON
Using [csv-parser](https://www.npmjs.com/package/csv-parser) one can easily convert CSV to [NDJSON](http://ndjson.org/). A script [csv-to-json.sh](csv-to-json.sh) was written to test it out. It can be executed by passing a single file as (`-f`) argument or all CSV files inside a directory by passing (`-d`) argument.

#### File

```sh
$ docker-compose run --rm cli bash
#./csv-to-json.sh -f data/posts.csv
Generated data/posts.json
```
#### Directory

```sh
$ docker-compose run --rm cli bash
#./csv-to-json.sh -d ./data
Generated ./data/groups.json
Generated ./data/posts.json
```
## CSV import to MongoDB
In many cases we may want to import CSV data to a database. As an example we can parse CSV data and import it to a MongoDB database as follows:

```sh
$ docker-compose up -d
$ docker-compose run --rm cli bash
# node import-data.js data/posts.csv
Established database connection
CSV file successfully processed
Pipeline succeeded
New row created for import id: 15887
New row created for import id: 15421
New row created for import id: 15461
Closed database connection
```

Verify that the rows were imported:

```sh
$ docker-compose exec db bash
# mongo -u root -p pass
> show dbs
admin     0.000GB
cli_demo  0.000GB
config    0.000GB
local     0.000GB

> use cli_demo
switched to db cli_demo

> show collections
posts

> db.posts.count()
3
```