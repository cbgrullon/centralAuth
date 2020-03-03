const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
class database{
    client;
    db;
    connect = async()=>{
        client = await MongoClient.connect(config.mongoUrl);
        db = client.db(config.dbName);
    }
    getCollection = (collectionName)=>{
        return this.db.collection(collectionName);
    }
    dispose = ()=>{
        this.client.close();
    }
}
async function getDatabase(){
    const db = new database();
    await db.connect();
    return db;
}
module.exports = {getDatabase}