import {querys} from '../db/userQuerys'
import { sendEmail } from './sendEmail'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = new querys()

import { routesError } from '../errors/routes.errors';
const error = new routesError()

interface user {
  image: string;
  name: string;
  email: string;
  senha: string;
}

type email = {
  email: string
}

export class userService {
  async getAllUsers() {
    return await db.allUsers()
  };
  
  async getAllMedals() {
    return await db.medals()
  };
  
  async getUserMedals(id: number) {
    const userById = await db.userById(id)
    if (userById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      return await db.userMedals(id)
    }
  };
  
  async getOneUser({email, senha}: user) {
    const userByDados = await db.userByEmail(email)
    if (userByDados == null) {
      return error.errorIncorrectsDatas('usuario')
    } else {
      const isEqualPassword = await bcrypt.compare(senha, userByDados.senha)
      const statistics = await db.statisticsById(userByDados.id)
      if (isEqualPassword) {
        const token = jwt.sign(email, process.env.JWT_SECRET)
  
        return {
          "status": 200, 
          "data": userByDados,
          "statistics": statistics, 
          "token": token, 
          "message": "Usuario correto!"
        }
      } else {
        return error.errorIncorrectsDatas('senha')
      }
    }
  };
  
  async verifyNewUser({name, email}: user) {
    const verifyName = await db.userByName(name)
  
    const verifyEmail = await db.userByEmail(email)
  
    if(verifyName !== null && verifyEmail !== null) {
      return error.errorAlreadyExists('Nome e Email')
    } else if (verifyEmail !== null) {
      return error.errorAlreadyExists('Email')
    } else if (verifyName !== null) {
      return error.errorAlreadyExists('Nome')
    }
  
    const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
  
    const resEmail = await sendEmail(email, randomCode)
  
    if (resEmail === undefined) {
      return {"status": 200, "code": randomCode}
    } else {
      return {"status": 201, "message": "Email inválido!"}
    }
  };
  
  async verifyForgetPass({email}: email) {
    const verifyEmail = await db.userByEmail(email)
  
    if(verifyEmail !== null) {
      const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
      const resEmail = await sendEmail(email, randomCode)
      if (resEmail === undefined) {
        return {"status": 200, "code": randomCode, "email": email}
      } else {
        return {"status": 201, "message": "Email inválido!"}
      }  
    } else {
      return error.errorIncorrectsDatas('email')
    }
  };
  
  async verifyToken(token: string) {
    const resToken = jwt.verify(token, process.env.JWT_SECRET, function(err: any) {
      if (err) return false
    })
  
    if(resToken === undefined) {
      return {"status": 200, "message": "Token valido!"} 
    } else {
      return {"status": 201, "message": "Token invalido!"}
    }  
    
  };
  
  async changePassword(senha: string, email: string) {
    const userChangePass = await db.userByEmail(email)
  
    if (userChangePass === null) {
      return error.errorIncorrectsDatas('email')
    }
  
    const isEqualPassword = await bcrypt.compare(senha, userChangePass.senha)
  
    if (isEqualPassword) {
      return {"status": 201, "message": "Sua senha tem que ser diferente da anterior!"}
    } else {
      const hashPass = await bcrypt.hash(senha, 10)
  
      await db.userUpdatePassword(email, hashPass)
  
      return {"status": 200, "message":"Senha atualizada com sucesso!"}
    }
  };
  
  async createNewUser({image, email, name, senha}: user) {
      const verifyEmail = await db.userByEmail(email)
      const token = jwt.sign(email, process.env.JWT_SECRET)
      let user
      let statistics
  
      if(verifyEmail === null) {
        const hashPass = await bcrypt.hash(senha, 10)
        user = await db.userCreate(image ,email, name, hashPass)
        statistics = await db.statisticsById(user.id)
      } else {
        user = verifyEmail
        statistics = await db.statisticsById(user.id)
      }
      
      return {
        "status": 200, 
        "data": user,
        "statistics": statistics, 
        "token": token
      }
  };
  
  async updateOneUser(id:number, name:string) {
    const userById = await db.userById(id)
    if (userById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      const haveSameName = await db.userByName(name)
      if (userById.name === name || haveSameName != null) {
        return {"status": 201, "message": "O nome tem que ser diferente do anterior, ou nome ja cadastrado!"}
      } else {
        await db.userUpdateName(userById.id ,name)
      }    
    }
    return {"status": 200, "message": "nome trocado com sucesso!"}
  };
  
  async updateUserMedal(id:number, id_medal:number) {
    const userById = await db.userById(id)
    let userMedals
    let res
    if (userById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      res = await db.userUpdateMedal(id, id_medal)
      userMedals = await db.userMedals(id)
    }
    return {"status": 200, "achievements": userMedals, res}
  };
  
  async updateImage(id:number, image:string) {
    const userById = await db.userById(id)
    if (userById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
        await db.userUpdateImage(userById.id ,image)
    }    
    return {"status": 200, "message": "Imagem atualizada!"}
  };
  
  async deleteOneUser(id: number) {
    const userById = await db.userById(id)
    
    if (userById === null ) {
      return error.errorIncorrectsDatas('id')
    } else {
      await db.deleteUser(id)
    }
    return {"status": 200, "message": "Usuario deletado."}
  };
  
}
