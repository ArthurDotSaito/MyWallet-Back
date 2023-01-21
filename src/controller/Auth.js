import bcrypt from "bcrypt";
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
  const user = req.body
  const {value: userData, error } = userLoginSchema.validate(user, { abortEarly: false });
  if(error){
    return res.status(422).send(error);
    console.log("erro ao fazer login!");
  }

  try {
    const checkUserLogin = await db.collection('users').findOne({ email:userData.email })
    if (!checkUserLogin) return res.status(403).send("Usuário ou senha incorretos")

    const isCorrectPassword = bcrypt.compareSync(userData.password, checkUserLogin.password)
    if (!isCorrectPassword) return res.status(403).send("Usuário ou senha incorretos")

    const token = uuidV4();

    const sessionUserData = {userId: checkUserLogin._id, token}
    await db.collection("sessions").insertOne({ sessionUserData })
    console.log("Tentei Logar!");
    return res.status(200).send({token, name: checkUserLogin.name})

  }catch (error) {
    res.status(500).send(error.message);
    console.log("Erro ao validar o Login!")
  }
}