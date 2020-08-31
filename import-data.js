'use strict'

const { pipeline } = require('stream');
const csv = require('csv-parser');
const fs = require('fs')
const ContentImporter = require('./content-importer')

const csvFile = process.argv[2]

if (!fs.existsSync(csvFile)) {
  console.warn("Please provide a valid CSV file");
  process.exit(1);
}

// Database settings
let dbName = process.env.DB_NAME || 'csv_parse_demo'
let collectionName = csvFile.split('/')[1].split('.')[0];
let importer = new ContentImporter(dbName, collectionName);

// Setup readable and transform streams
let readableStream = fs.createReadStream(__dirname + '/' + csvFile);
let importStream = csv({strict: false});

importStream.on('data', (row) => {
    importer.createRow(row)})
  .on('end', (err) => {
    console.log('CSV file successfully processed');
    importer.disconnect();
  })

pipeline(
  readableStream,
  importStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
