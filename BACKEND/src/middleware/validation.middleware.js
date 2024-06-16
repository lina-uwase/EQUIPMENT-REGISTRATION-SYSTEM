export const validateBody = (schema) => async(req,res,next) =>{
    try{
        await schema.validate(req.body);
        next();
    }catch(error){
        res.status(400).json({error:error.message});
    }
}