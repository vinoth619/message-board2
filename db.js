const mongodb=require('mongodb')
const mongoclint =mongodb.MongoClient
const objectID=mongodb.ObjectId



let database;
   async function getDatabase(){
    const client= await mongoclint.connect('mongodb://127.0.0.1:27017')
    database=client.db('messege-board');

    if(!database){
        console.log("DATA BASE NOT CONNECTED")
    }

    return database

   }


   module.exports={getDatabase,objectID}