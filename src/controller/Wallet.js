import db from '../Config/Database.js'

export async function getWallet(req, res){
    const {authorization} = req.headers
    const token = authorization.replace("Bearer ", "");
    if(!token) return res.status(401).send("No token");

    try{
        const tokenExist = await db.collection("sessions").findOne({token});
        if(!tokenExist) return res.status(404).send("User not found on session");
        console.log("Token Exist!")
        console.log(tokenExist)
    
        const checkUserWallet = await db.collection("wallet").findOne({_id: tokenExist.userId});
        console.log('CheckUserWalletWallet')
        console.log(checkUserWallet)
        if(!checkUserWallet) return res.status(404).send("No user on wallet");

        console.log("enviei sua resposta:", checkUserWallet)
        return res.send(checkUserWallet)
    }catch(error){
        return res.status(500).send(err.message)
        console.log("Erro no wallet Backend");
    }

}