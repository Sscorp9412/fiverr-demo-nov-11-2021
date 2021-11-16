const { Client }=require('pg'); // postgreSQL client connection
require('dotenv').config();

/*
    Database connection
    NOTE: We are using postgreSQL database here
*/
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
client.connect(); // connecting client dbs

module.exports = client;