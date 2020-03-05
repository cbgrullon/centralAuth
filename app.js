const router = require('express').Router();
const path = require('path');
const indexPath = path.join(__dirname,'index.html');
router.get('*',(req,res)=>{
    return res.sendFile(indexPath);
});
module.exports = router;