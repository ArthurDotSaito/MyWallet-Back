import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";
import { userRegisterSchema } from "../Model/UsuarioSchema.js";

// Cadastro de Usuários -----------------------------------------------------------------------------------------------------------//

export async function signUp(req, res) {
    const user = req.body
    const { error } =  await userRegisterSchema.validate(user)
  
    if (error) {
      const errorMessages = error.details.map(err => err.message)
      return res.status(422).send(errorMessages)
    }
  
    try {
        const checkExistingEmail = await db.collection("users").findOne({email: user.email});
        if(checkExistingEmail) return res.status(400).send("Usuário já cadastrado!");
        const passwordHashed = bcrypt.hashSync(password, 10)

        await db.collection("usuarios").insertOne({ ...user, password: passwordHashed })
        res.status(201).send("Usuário cadastrado com sucesso!")
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  
  export async function signIn(req, res) {
    const { email, password } = req.body
  
    try {
  
      const checkUser = await db.collection('usuarios').findOne({ email })
  
      if (!checkUser) return res.status(400).send("Usuário ou senha incorretos")
  
      const isCorrectPassword = bcrypt.compareSync(password, checkUser.password)
  
      if (!isCorrectPassword) return res.status(400).send("Usuário ou senha incorretos")
  
      const token = uuidV4();
  
      await db.collection("sessoes").insertOne({ idUsuario: checkUser._id, token })
  
      return res.status(200).send(token)
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }