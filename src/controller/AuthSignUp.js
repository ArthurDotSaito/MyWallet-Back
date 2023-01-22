import bcrypt from "bcrypt";
import db from '../Config/Database.js'

// Cadastro de Usuários -----------------------------------------------------------------------------------------------------------//

export async function signUp(req, res) {
    const user = req.body;
    const saltRounds = 10;

    const passwordHashed = bcrypt.hashSync(user.password, saltRounds);
    
    try {    
        const checkExistingEmail = await db.collection("users").findOne({email: user.email});
        if(checkExistingEmail) return res.status(400).send("Usuário já cadastrado!");
        console.log("Tentei cadastrar!");

        await db.collection("users").insertOne({ ...user, password: passwordHashed });

        res.status(201).send("Usuário cadastrado com sucesso!");
        console.log("Cadastrado!");
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  