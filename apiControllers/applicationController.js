const database = require('../services/database');
const mongo = require('mongodb')
const notInclude = [
    'skip',
    'take',
    'search',
    'find'
];
const getApps = async (req,res,next)=>{
    try {
        let filterObject = {};
        const keys = Object.keys(req.query);
        
        for(let index = 0;index<keys.length;index++){
            const finded = notInclude.find(item=>item===keys[index]);
            if(finded)
                continue;
            filterObject = {
                ...filterObject,
                [keys[index]]:req.query[keys[index]]
            }
        }
        const db = await database.getDatabase();
        const collection = await db.getCollection('apps');
        const cursor = collection.find(filterObject);
        
        const apps = await cursor.toArray();
        db.dispose();
        res.status(200).send({result:apps,status:'SUCCESS'});
        return next();
    } catch (error) {
        return next(error);
    }
}
const getApp = async (req,res,next)=>{
    try {
        const db = await database.getDatabase();
        const collection = await db.getCollection('apps');
        const _id = req.params.id;
        let cursor;
        let apps = [];
        if(mongo.ObjectID.isValid(_id)){
            cursor = await collection.find({_id:new mongo.ObjectID(_id)});
            apps = await cursor.toArray();
        }
        if(apps.length === 0){
            cursor = await collection.find({name:_id});
            apps = await cursor.toArray();
            db.dispose();
            if(apps.length === 0){
                res.status(400).send({status:'NOT_FOUND'});
                return next();
            }
        }
        res.status(200).send({status:'SUCCESS',result: apps[0]});
        return next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
const postApp = async (req,res,next)=>{
    
    try {
        const {body} = req;
        if(body.name=== undefined){
            res.status(400).send({
                errors:[
                    {'name':'You need to complete this field'}
                ],
                status:'BAD_REQUESTS'
            });
            return next();
        }
        if(body.label=== undefined){
            res.status(400).send({
                errors:[
                    {'label':'You need to complete this field'}
                ],
                status:'BAD_REQUESTS'
            });
            return next();
        }
        const db = await database.getDatabase();
        const collection = await db.getCollection('apps');
        const cursor = collection.find({name:body.name});
        const apps = await cursor.toArray();
        if(apps.length>0){
            res.status(400).send({message:'App name already exists'})
            return next();
        }
        const result = await collection.insertOne(body);
        db.dispose();
        if(result.insertedCount !==1){
            res.status(500).send({message:''})
            return next();
        }
        res.status(200).send({result:result.insertedId});
        return next();
    } catch (error) {
        return next(error);
    }
}
module.exports = {getApps,postApp,getApp}