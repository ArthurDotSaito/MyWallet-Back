import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import db from '../Config/Database.js'
import { userRegisterSchema } from "../Model/UsuarioSchema.js";

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
        await db.collection("usuarios").insertOne({ ...user, password: passwordHashed })
        res.status(201).send("Usuário cadastrado com sucesso!")
        console.log("Cadastrado!")
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  
