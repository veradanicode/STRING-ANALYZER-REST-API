const express=require('express');
const router=express.Router();
const CreateStringController=require('../controllers/create-string-controller')


//routes
router.post('/create',CreateStringController)

module.exports=router;