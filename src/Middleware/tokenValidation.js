import db from "../Config/Database.js";

export const tokenValidation = () =>{
    return async (req, res, next) =>{
        try{
            const {authorization} = req.headers;
            const token = authorization.replace("Bearer ", "");
            if (!token) return res.status(401).send(error.message);

            const tokenExist = await db.collection("sessions").findOne({token});
            if(!tokenExist) return res.status(401).send("User not found on session");

            res.locals.id = tokenExist.userId

            next()
        }catch(error){
            return res.status(500).send(err.message);
        }

    }
} 