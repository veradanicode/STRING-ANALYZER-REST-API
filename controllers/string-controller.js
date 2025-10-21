const String=require('../models/string-schema')
const analyzeString=require('../helper/analyzeString')
const parseNaturalLanguageQuery =require('../helper/parseNaturalLanguageQuery')


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
        const newString=new String({
            id: properties.sha256_hash,
            value,
            properties
        })
        await newString.save()

        return res.status(201).json({
            id: newString.id,
            value: newString.value,
            properties: newString.properties,
            created_at: newString.created_at,
        });
        
    } catch (error) {
       return  res.status(500).json({
            success:false,
            message:'Internal error'
        })
        
    }
}

const getStringByValue=async(req,res)=>{
    try {
        const {string_value}=req.params;

        const data=await String.findOne({value:string_value})
        if (!data) return res.status(404).json({
             message: "String not found" 
            });

        res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Error"
        })
    }
}

const getAllStrings = async (req, res) => {
  try {
    const {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    } = req.query;

    
    const filter = {};

    if (is_palindrome !== undefined) {
      if (is_palindrome !== "true" && is_palindrome !== "false") {
        return res
          .status(400)
          .json({ error: "Invalid value for is_palindrome (true/false)" });
      }
      filter["properties.is_palindrome"] = is_palindrome === "true";
    }

    if (min_length !== undefined) {
      if (isNaN(min_length)) {
        return res
          .status(400)
          .json({ error: "min_length must be a number" });
      }
      filter["properties.length"] = { $gte: parseInt(min_length) };
    }

    if (max_length !== undefined) {
      if (isNaN(max_length)) {
        return res
          .status(400)
          .json({ error: "max_length must be a number" });
      }
      filter["properties.length"] = {
        ...filter["properties.length"],
        $lte: parseInt(max_length),
      };
    }

    if (word_count !== undefined) {
      if (isNaN(word_count)) {
        return res
          .status(400)
          .json({ error: "word_count must be a number" });
      }
      filter["properties.word_count"] = parseInt(word_count);
    }

    if (contains_character !== undefined) {
      if (typeof contains_character !== "string" || contains_character.length !== 1) {
        return res
          .status(400)
          .json({ error: "contains_character must be a single character" });
      }
      filter.value = { $regex: contains_character, $options: "i" };
    }

    const data = await String.find(filter).sort({ created_at: -1 });

    res.status(200).json({
      data,
      count: data.length,
      filters_applied: {
        ...(is_palindrome && { is_palindrome: is_palindrome === "true" }),
        ...(min_length && { min_length: parseInt(min_length) }),
        ...(max_length && { max_length: parseInt(max_length) }),
        ...(word_count && { word_count: parseInt(word_count) }),
        ...(contains_character && { contains_character }),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterByNaturalLanguage = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Missing "query" parameter' });
    }

    const filters = parseNaturalLanguageQuery(query);

    // if the query is empty or couldn't be parsed
    if (Object.keys(filters).length === 0) {
      return res.status(400).json({
        error: "Unable to parse natural language query",
      });
    }

    
    // Detect conflicting filters
    if (
      (filters.min_length && filters.max_length && filters.min_length > filters.max_length) ||
      (filters.is_palindrome === true && filters.is_palindrome === false) ||
      (filters.word_count && filters.word_count < 0)
    ) {
      return res.status(422).json({
        error: "Query parsed but resulted in conflicting filters",
        parsed_filters: filters,
      });
    }

    // Build Mongo filter
    const mongoFilter = {};

    if (filters.is_palindrome !== undefined)
      mongoFilter["properties.is_palindrome"] = filters.is_palindrome;
    if (filters.word_count !== undefined)
      mongoFilter["properties.word_count"] = filters.word_count;
    if (filters.min_length !== undefined)
      mongoFilter["properties.length"] = { $gte: filters.min_length };
    if (filters.contains_character !== undefined)
      mongoFilter.value = {
        $regex: filters.contains_character,
        $options: "i",
      };

    const data = await String.find(mongoFilter);

    res.status(200).json({
      data,
      count: data.length,
      interpreted_query: {
        original: query,
        parsed_filters: filters,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteString = async (req, res) => {
  try {
    const { string_value } = req.params;

    // Try to find the string first
    const existingString = await String.findOne({ value: string_value });

    if (!existingString) {
      return res.status(404).json({
        success: false,
        message: "String does not exist in the system",
      });
    }

    // Delete the string
    await String.deleteOne({ value: string_value });

    // Return 204 (No Content)
    return res.status(204).send();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports={
    CreateStringController,
    getStringByValue,
    getAllStrings,
    filterByNaturalLanguage,
    deleteString
};