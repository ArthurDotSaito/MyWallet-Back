import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import db from '../Config/Database.js'

// Login de Usuário -----------------------------------------------------------------------------------------------------------------//

export async function signIn(req, res) {
  const user = req.body;

  try {
    const checkUserLogin = await db.collection('users').findOne({ email:user.email })
    if (!checkUserLogin) return res.status(403).send("Usuário incorreto")
    console.log("CheckUserLogin!!!!")
    console.log(checkUserLogin)

    const isCorrectPassword = bcrypt.compareSync(user.password, checkUserLogin.password)
    if (!isCorrectPassword) return res.status(403).send("Senha incorreta")

    const token = uuidV4();
    console.log("TOKEN ATUALIZADO", token)
    
    const sessionData = {userId: checkUserLogin._id, token}
    console.log("SESSION DATA")
    console.log(sessionData)
    await db.collection("sessions").insertOne(sessionData)

    // Check If User have a Wallet or is a newUser or a user without any Walllet ------------------------------//

    const checkUserWallet = await db.collection("wallet").findOne({_id:checkUserLogin._id});
    console.log("checkUserWallet")
    console.log(checkUserWallet)
    if(!checkUserWallet){
      console.log("!checkUserWallet")
      const newWallet = {_id: checkUserLogin._id, name: checkUserLogin.name, wallet:[]}
      await db.collection("wallet").insertOne(newWallet)
    }

    return res.status(200).send({token, name:checkUserLogin.name})

  }catch (error) {
    res.status(500).send(error.message);
    console.log("Erro ao validar o Login!")
  }
}