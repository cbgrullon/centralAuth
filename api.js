const router = require('express').Router();
const appController = require('./apiControllers/applicationController');
router.get('/ping',(req,res)=>{    
    return res.status(200).send('pong');
});
router.get('/apps',appController.getApps);
router.get('/apps/:id',appController.getApp)
router.post('/apps',appController.postApp);
router.use((error,req,res,next)=>{
    res.status(500).send({
        status:'ERROR',
        result:error
    });
    return next();
});
module.exports = router;
/*
    Api error example
    {
        errors:[
            "{fieldName}":"error message"
        ],
        status: 'SUCCESS',
        result: object
    }
 */