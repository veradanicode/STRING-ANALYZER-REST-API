const String=require('../models/string-schema')
const analyzeString=require('../helper/analyzeString')


const CreateStringController=async(req,res)=>{
    try {
        const{value}=req.body;

        //check if value already exists
        const checkIfStringExists=await String.findOne({value})
        if(checkIfStringExists){
            return res.status(409).json({
                success:false,
                message:"String already exists in the system"
            })
        }
        //check if req body is empty
        if(!value){
            return res.status(400).json({
                success:false,
                message:`Invalid request body or missing "value" field`
            })
        }

        //check if req body is String datatype
          if(typeof value !='string'){
            return res.status(422).json({
                success:false,
                message:`Invalid data type for "value" (must be string)`
            })
        }

        const properties=analyzeString(value);
        const newString=new String({value,properties})
        await newString.save()

        return res.status(201).json({
            newString
        })
        
    } catch (error) {
       return  res.status(500).json({
            success:false,
            message:'Internal error'
        })
        
    }
}


module.exports=CreateStringController;