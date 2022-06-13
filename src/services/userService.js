const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { email } = require('./sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { errorIncorrectsDatas, errorAlreadyExists } = require('../errors/routes.errors')

// VERIFICAR SE ESTA CHEGANDO O BODY

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany()

  const usersJson = {
    "Users": []
  }

  allUsers.map((user) => {
    usersJson.Users.push({
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "senha": user.senha,
      "created_at": user.createdAt
    })
  })

  return JSON.stringify(usersJson)
};

const getOneUser = async ({email, senha}) => {
  const userByDados = await prisma.user.findFirst({ 
    where: {
      email: email
    }
  })
  
  if (userByDados == null) {
    return errorIncorrectsDatas('usuario')
  } else {
    const isEqualPassword = await bcrypt.compare(senha, userByDados.senha)
    if (isEqualPassword) {
      return {"status": 200, "message": "Usuario correto!"}
    } else {
      return errorIncorrectsDatas('senha')
    }
  }
};

const verifyNewUser = async (body) => {
  const verifyName = await prisma.user.findFirst({
    where: {
      name: body.name
    }
  })

  const verifyEmail = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  })

  if(verifyName !== null && verifyEmail !== null) {
    return errorAlreadyExists('Nome e Email')
  } else if (verifyEmail !== null) {
    return errorAlreadyExists('Email')
  } else if (verifyName !== null) {
    return errorAlreadyExists('Nome')
  }

  const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)

  email(body.email, randomCode)

  return {"status": 200, "code": randomCode}
};

const verifyForgetPass = async (body) => {
  const verifyEmail = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  })

  if(verifyEmail !== null) {
    const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
    email(body.email, randomCode)
    return {"status": 200, "code": randomCode, "email": body.email}
  } else {
    return errorIncorrectsDatas('email')
  }
};

const changePassword = async (senha, email) => {
  const userChangePass = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  const isEqualPassword = await bcrypt.compare(senha, userChangePass.senha)

  if (isEqualPassword) {
    return {"status": 400, "message": "Sua senha tem que ser diferente da anterior!"}
  } else {
    const hashPass = await bcrypt.hash(senha, 10)

    await prisma.user.updateMany({
      where: {
        email: email
      },
      data : {
        senha: hashPass
      }
    })

    return {"status": 200, "message":"Senha atualizada com sucesso!"}
  }
};

const createNewUser = async (body) => {
  const hashPass = await bcrypt.hash(body.senha, 10)
  const token = jwt.sign(body.email, process.env.JWT_SECRET)

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      senha: hashPass
    }
  })

  return {"status": 200, "dados": {"name": body.name, "email": body.email}, "token": token}
};

const updateOneUser = () => {
  return;
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
