const database = require('../services/database');
const getApps = async (req,res,next)=>{
    try {
        const db = await database.getDatabase();
        const collection = await db.getCollection('apps');
        const cursor = collection.find({});
        const apps = await cursor.apps.toArray();
        db.dispose();
        return res.status(200).send(apps);
    } catch (error) {
        return next(error);
    }
}
module.exports = {getApps}