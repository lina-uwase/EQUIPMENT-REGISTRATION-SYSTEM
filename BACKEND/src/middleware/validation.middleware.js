export const validateBody = (schema) => async(req,res,next) =>{
    try{
        console.log("here in validate")
        console.log(req.body)
        await schema.validate(req.body);
        next();
    }catch(error){
        res.status(400).json({error:error.message});
    }
}