import db from '../Config/Database.js'

// Enviar os dados p/ página ------------------------------------------------------------------------------------------------//

export async function getWallet(req, res){
    const {authorization} = req.headers;
    const token = authorization.replace("Bearer ", "");
    if(!token) return res.status(401).send("No token");

    try{
        const tokenExist = await db.collection("sessions").findOne({token});
        if(!tokenExist) return res.status(404).send("User not found on session");
    
        const checkUserWallet = await db.collection("wallet").findOne({_id: tokenExist.userId});
        if(!checkUserWallet) return res.status(404).send("No user on wallet");

        console.log("enviei sua resposta:", checkUserWallet)
        return res.send(checkUserWallet)
    }catch(error){
        console.log("Erro no wallet Backend");
        return res.status(500).send(err.message);
    }

}

