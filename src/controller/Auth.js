import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { v4 as uuidV4 } from "uuid";
import db from '../Config/Database.js'
import { userLoginSchema, userRegisterSchema } from "../Model/UsuarioSchema.js";

// Cadastro de Usuários -----------------------------------------------------------------------------------------------------------//

export async function signUp(req, res) {
    const user = req.body
    const { error } =  await userRegisterSchema.validate(user)

    if (error) {
      const errorMessages = error.details.map(err => err.message)
      return res.status(422).send(errorMessages)
    }
  
    const passwordHashed = bcrypt.hashSync(user.password, 10);
    
    try {    
        const checkExistingEmail = await db.collection("users").findOne({email: user.email});
        if(checkExistingEmail) return res.status(400).send("Usuário já cadastrado!");
        console.log("Tentei cadastrar!")
        await db.collection("users").insertOne({ ...user, password: passwordHashed })
        res.status(201).send("Usuário cadastrado com sucesso!")
        console.log("Cadastrado!")
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  
// Login de Usuário -----------------------------------------------------------------------------------------------------------------//

export async function signIn(req, res) {
  const user = req.body;

  const {value: userDataValidate, error } = userLoginSchema.validate(user, { abortEarly: false });
  if(error){
    console.log("erro ao fazer login!");
    return res.status(422).send(error);
  }

  try {
    const checkUserLogin = await db.collection('users').findOne({ email:userDataValidate.email })
    if (!checkUserLogin) return res.status(403).send("Usuário incorreto")

    const isCorrectPassword = bcrypt.compareSync(userDataValidate.password, checkUserLogin.password)
    if (!isCorrectPassword) return res.status(403).send("Senha incorreta")

    //const checkUserSession = await db.collection("sessions").findOne({_id: checkUserLogin._id})

    const token = uuidV4();
    console.log("TOKEN ATUALIZADO", token)
    
/*     if(checkUserSession){
      await db.collection("sessions").updateOne({ _id: ObjectId(checkUserLogin._id)}, {$set: {token:token} });
      console.log("checkUserSession");
      console.log(checkUserSession);
    }else{
      const newSession = {_id: checkUserLogin._id, name: checkUserLogin.name, token: token}
      console.log("!checkuserSession")
      await db.collection("sessions").insertOne(newSession)
    } */
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