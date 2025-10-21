const express=require('express');
const router=express.Router();
const {CreateStringController,getStringByValue,getAllStrings,filterByNaturalLanguage,deleteString}=require('../controllers/string-controller')

//routes
router.post('/',CreateStringController);
router.get('/filter-by-natural-language', filterByNaturalLanguage);
router.get('/:string_value',getStringByValue);
router.get('/',getAllStrings);
router.delete('/:string_value', deleteString);



module.exports=router;