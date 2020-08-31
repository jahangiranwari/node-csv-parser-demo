'use strict'

const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true } );
let createCount = 0;

class ContentImporter {

  constructor(dbName, collectionName) {
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.connect();
  }

  createRow = async (data) => {
    createCount++;
    const result = await client.db(this.dbName).collection(this.collectionName).insertOne(data);
    console.log(`New row created for import id: ${result.ops[0].id}`);
    createCount--;
  }

  connect() {
    client.connect();
    console.log('Established database connection');
  }

  disconnect = async () => {
    var checkConnection = setInterval(function() {
      if (createCount == 0) {
        client.close();
        clearInterval(checkConnection);
        console.log('Closed database connection');
      }
    }, 1000);
  }
}

module.exports = ContentImporter
