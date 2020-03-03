const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiHandler = require('./api');
//Api
const api = express();
api.use(bodyParser.json());
api.use(cors());
api.use('/api',apiHandler);
api.listen(5000,()=>{
    console.log('Running');
});