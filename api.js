const router = require('express').Router();
const appController = require('./apiControllers/applicationController');
router.get('/ping',(req,res)=>{
    return res.status(200).send('pong');
});
router.get('/apps',appController.getApps);

module.exports = router;