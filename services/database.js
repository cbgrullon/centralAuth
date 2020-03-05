const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
class database{
    database(){
        this.client = {};
        this.db = {};
        this.disposed = false;
        setTimeout(()=>{
            console.log('Db not disposed');
            this.dispose();
        },5000);
    }
    async connect(){
        if(this.disposed===true){
            throw 'Object disposed';
        }
        this.client = await MongoClient.connect(config.mongoUrl,config.options);
        this.db = this.client.db(config.dbName);
    }
    async getCollection(collectionName){
        if(this.disposed===true){
            throw 'Object disposed';
        }
        return await this.db.collection(collectionName);
    }
    dispose(){
        if(this.disposed===true){
            throw 'Object disposed';
        }
        this.client.close();
        this.disposed = true;
    }
}
async function getDatabase(){
    const db = new database();
    await db.connect();
    return db;
}
module.exports = {getDatabase}