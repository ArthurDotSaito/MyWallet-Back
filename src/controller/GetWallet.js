import db from '../Config/Database.js'
import { ObjectId } from 'mongodb';

// Enviar os dados p/ página ------------------------------------------------------------------------------------------------//

export async function getWallet(req, res){
    const _id = res.locals.id;

    try{    
        const checkUserWallet = await db.collection("wallet").findOne({_id: ObjectId(_id)});
        if(!checkUserWallet) return res.status(404).send("No user on wallet");

        console.log("enviei sua resposta:", checkUserWallet)
        return res.send(checkUserWallet)
    }catch(error){
        console.log("Erro no wallet Backend");
        return res.status(500).send(error.message);
    }

}

