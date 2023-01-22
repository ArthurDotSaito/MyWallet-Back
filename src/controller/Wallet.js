import db from '../Config/Database.js'
import dayjs from 'dayjs'
import { walletRegisterSchema } from '../Model/UsuarioSchema.js';

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

// Receber dados p/ o banco ------------------------------------------------------------------------------------------------//

export async function postWallet(req,res){
    const {authorization} = req.headers;
    const user = req.body;
    const token = authorization.replace("Bearer ", "");
    const date = dayjs().format("DD/MM");
    console.log("DATE")
    console.log(date);
    if(!token) return res.status(401).send("No token !");    

    const { value: walletValidation, error } = walletRegisterSchema.validate({ ...user, date: date });
    if (error) return res.status(422).send(error.message);

    try{
        console.log("USER")
        console.log(user)

        const tokenExistPost = await db.collection("sessions").findOne({token});
        if(!tokenExistPost) return res.status(404).send("User not found on session");

        console.log('WALLET VALIDATION')
        console.log(walletValidation)

        console.log("tokenExistPost.userId");
        console.log(tokenExistPost)

        const checkUserWallet = await db.collection("wallet").findOne({_id: tokenExistPost.userId});
        console.log('CheQUEI O WALLET!');
        console.log(checkUserWallet);
        if(!checkUserWallet) return res.status(404).send("No user on wallet");

        await db.collection("wallet").updateOne({_id:checkUserWallet._id}, { 
            $set: {wallet: [...checkUserWallet.wallet, walletValidation]}
        });

        res.sendStatus(201)
    }catch(error){
        console.log("Erro no POST WALLET");
        return res.status(500).send(error.message);
    }
}