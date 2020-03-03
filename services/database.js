const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
class database{
    database(){
        this.client = {};
        this.db = {};
    }
    async connect(){
        this.client = await MongoClient.connect(config.mongoUrl,config.options);
        this.db = this.client.db(config.dbName);
    }
    async getCollection(collectionName){
        if(this.db)
        return await this.db.collection(collectionName);
    }
    dispose(){
        this.client.close();
    }
}
async function getDatabase(){
    const db = new database();
    await db.connect();
    return db;
}
module.exports = {getDatabase}