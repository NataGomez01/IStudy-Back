const db = require('../db/userQuerys')
const { sendEmail } = require('./sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { errorIncorrectsDatas, errorAlreadyExists } = require('../errors/routes.errors')

const getAllUsers = async () => {
  return await db.allUsers()
};

const getOneUser = async ({email, senha}) => {
  const userByDados = await db.userByEmail(email)
  if (userByDados == null) {
    return errorIncorrectsDatas('usuario')
  } else {
    const isEqualPassword = await bcrypt.compare(senha, userByDados.senha)
    if (isEqualPassword) {
      const token = jwt.sign(email, process.env.JWT_SECRET)

      return {"status": 200, "data": userByDados, "token": token, "message": "Usuario correto!"}
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

  sendEmail(email, randomCode)

  return {"status": 200, "code": randomCode}
};

const verifyForgetPass = async ({email}) => {
  const verifyEmail = await db.userByEmail(email)

  if(verifyEmail !== null) {
    const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
    sendEmail(email, randomCode)
    return {"status": 200, "code": randomCode, "email": email}
  } else {
    return errorIncorrectsDatas('email')
  }
};

const changePassword = async (senha, email) => {
  const userChangePass = await db.userByEmail(email)

  const isEqualPassword = await bcrypt.compare(senha, userChangePass.senha)

  if (isEqualPassword) {
    return {"status": 400, "message": "Sua senha tem que ser diferente da anterior!"}
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

  if(verifyEmail === null) {
    const hashPass = await bcrypt.hash(senha, 10)
    user = await db.userCreate(image ,email, name, hashPass)
  }
  
  return {"status": 200, "dados": user, "token": token}
};

const updateOneUser = async (id, name) => {
  const userById = await db.userById(id)
  if (userById === null) {
    return errorIncorrectsDatas('id')
  } else {
    await db.userUpdateName(userById.id ,name)
  }
  return {"status": 200, "message": "nome trocado com sucesso!"}
};

const deleteOneUser = () => {
  return;
};

module.exports = {
  getAllUsers,
  getOneUser,
  verifyNewUser,
  verifyForgetPass,
  changePassword,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
