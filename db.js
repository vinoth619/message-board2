const mongodb=require('mongodb')
const mongoclint =mongodb.MongoClient
const objectID=mongodb.ObjectId



let database;
   async function getDatabase(){
    const client= await mongoclint.connect('mongodb+srv://xbi4gpt:irc26977@cluster0.dacxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    database=client.db('messege-board');

    if(!database){
        console.log("DATA BASE NOT CONNECTED")
    }

    return database

   }


   module.exports={getDatabase,objectID}
