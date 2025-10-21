const mongoose =require('mongoose');

const StringSchema=new mongoose.Schema({
    id: {
    type: String,
    required: true,
    unique: true
  },
    value:{
        type:String,
        required:true
    },
    properties:{
     length:Number,
    is_palindrome:Boolean,
    unique_characters:Number,
    word_count:Number,
    sha256_hash:String,
    character_frequency_map:Object,
   },
   
    createdAt:{
        type:String,
        default:Date.now()
    }


})

module.exports=mongoose.model('String',StringSchema);