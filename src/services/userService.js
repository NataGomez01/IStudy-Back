const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { email } = require('./sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const getOneUser = async ({name, email}) => {
  const userById = await prisma.user.findFirst({ 
    where: {
      name: name,
      email: email
    }
  })
  if (userById === null) {
    return {"status": 400, "message": "Usuario não cadastrado!"}
  } else {
    return {"status": 200, "message": "Usuario correto!"}
  }
};

const verifyNewUser = async (body) => {
  const verifyName = await prisma.user.findFirst({
    where: {
      email: body.name
    }
  })

  const verifyEmail = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  })

  if(verifyName !== null && verifyEmail !== null) {
    return {"status": 400, "message": 'Nome e Email ja cadastrado!'}
  } else if (verifyEmail !== null) {
    return {"status": 400, "message": 'Email ja cadastrado'}
  } else if (verifyName !== null) {
    return {"status": 400, "message": 'Nome ja cadastrado'}
  }

  const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)

  email(body.email, randomCode)

  return {"status": 200, "code": randomCode}
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
  createNewUser,
  updateOneUser,
  deleteOneUser,
};