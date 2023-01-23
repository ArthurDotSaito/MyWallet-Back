import db from '../Config/Database.js'
import dayjs from 'dayjs'
import { walletRegisterSchema } from '../Schema/walletRegisterSchema.js';
import { ObjectId } from 'mongodb';

// Receber dados p/ o banco ------------------------------------------------------------------------------------------------//

export async function postWallet(req,res){
    const user = req.body;
    const date = dayjs().format("DD/MM");
    const _id = res.locals.id;

    const { value: walletValidation, error } = walletRegisterSchema.validate({ ...user, date: date });
    if (error) return res.status(422).send(error.message);

    try{
        const checkUserWallet = await db.collection("wallet").findOne({_id: ObjectId(_id)});
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