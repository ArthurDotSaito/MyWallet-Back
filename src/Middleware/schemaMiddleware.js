export const validateSchema = (schema) =>{
    return(req, res, next) =>{

        try{
            const value  = schema.validate(req.body, {abortEarly:false});
            res.locals.value = value
    
            next();
        }catch(error){
            const errors = error.details.map(err => err.message);
            return res.status(422).send(errors);
        }
    };
};