const db = require('../db/userQuerys')
const { sendEmail } = require('./sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { errorIncorrectsDatas, errorAlreadyExists } = require('../errors/routes.errors')

const getAllUsers = async () => {
  return await db.allUsers()
};

const getAllMedals = async () => {
  return await db.medals()
};

const getUserMedals = async (id) => {
  const userById = await db.userById(id)
  if (userById === null) {
    return errorIncorrectsDatas('id')
  } else {
    return await db.userMedals(id)
  }
};

const getOneUser = async ({email, senha}) => {
  const userByDados = await db.userByEmail(email)
  if (userByDados == null) {
    return errorIncorrectsDatas('usuario')
  } else {
    const isEqualPassword = await bcrypt.compare(senha, userByDados.senha)
    const statistics = await db.statisticsById(userByDados.id)
    if (isEqualPassword) {
      const token = jwt.sign(email, process.env.JWT_SECRET)

      return {
        "status": 200, 
        "data": userByDados,
        "statistics": statistics, 
        "token": token
      }
    } else {
      return errorIncorrectsDatas('senha')
    }
  }
};

const verifyNewUser = async ({name, email}) => {
  const verifyName = await db.userByName(name)

  const verifyEmail = await db.userByEmail(email)

  if(verifyName !== null && verifyEmail !== null) {
    return errorAlreadyExists('Nome e Email')
  } else if (verifyEmail !== null) {
    return errorAlreadyExists('Email')
  } else if (verifyName !== null) {
    return errorAlreadyExists('Nome')
  }

  const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)

  const resEmail = await sendEmail(email, randomCode)

  if (resEmail === undefined) {
    return {"status": 200, "code": randomCode}
  } else {
    return {"status": 201, "message": "Email inválido!"}
  }
};

const verifyForgetPass = async ({email}) => {
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
    return errorIncorrectsDatas('email')
  }
};

const verifyToken = async (token) => {
  const resToken = jwt.verify(token, process.env.JWT_SECRET, function(err) {
    if (err) return false
  })

  if(resToken === undefined) {
    return {"status": 200} 
  } else {
    return {"status": 201, "message": "Token invalido."}
  }  
  
};

const changePassword = async (senha, email) => {
  const userChangePass = await db.userByEmail(email)

  if (userChangePass === null) {
    return errorIncorrectsDatas('email')
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

const createNewUser = async ({image, email, name, senha}) => {
    const verifyEmail = await db.userByEmail(email)
    const token = jwt.sign(email, process.env.JWT_SECRET)
    let user = ''
    let statistics = ''

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

const updateOneUser = async (id, name) => {
  const userById = await db.userById(id)
  if (userById === null) {
    return errorIncorrectsDatas('id')
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

const updateUserMedal = async (id, id_medal) => {
  const userById = await db.userById(id)
  let userMedals = 'Sucesso'
  let res = ''
  if (userById === null) {
    return errorIncorrectsDatas('id')
  } else {
    res = await db.userUpdateMedal(id, id_medal)
    userMedals = await db.userMedals(id)
  }
  return {"status": 200, "achievements": userMedals, res}
};

const updateImage = async (id, image) => {
  const userById = await db.userById(id)
  if (userById === null) {
    return errorIncorrectsDatas('id')
  } else {
      await db.userUpdateImage(userById.id ,image)
  }    
  return {"status": 200, "message": "Imagem atualizada!"}
};

const deleteOneUser = async (id) => {
  const userById = await db.userById(id)
  
  if (userById === null ) {
    return errorIncorrectsDatas('id')
  } else {
    await db.deleteUser(id)
  }
  return {"status": 200, "message": "Usuario deletado."}
};

module.exports = {
  getAllUsers,
  getAllMedals,
  getUserMedals,
  getOneUser,
  verifyNewUser,
  verifyForgetPass,
  changePassword,
  verifyToken,
  updateUserMedal,
  createNewUser,
  updateOneUser,
  updateImage,
  deleteOneUser,
};
