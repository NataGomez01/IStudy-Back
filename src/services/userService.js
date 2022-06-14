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

const getOneUser = async ({email, senha}) => {
  const userByDados = await prisma.user.findFirst({ 
    where: {
      email: email
    }
  })
  
  if (userByDados == null) {
    return {"status": 400, "message": "Usuario não cadastrado!"}
  } else {
    const isEqualPassword = await bcrypt.compare(senha, userByDados.senha)
    if (isEqualPassword) {
      return {"status": 200, "message": "Usuario correto!"}
    } else {
      return {"status": 400, "message": "Senha incorreta!"}
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
    return {"status": 400, "message":"Email não encontrado no banco de dados!"}
  }
};

const changePassword = async (body) => {
  const userChangePass = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  })

  const isEqualPassword = await bcrypt.compare(body.senha, userChangePass.senha)

  if (isEqualPassword) {
    return {"status": 400, "message": "Sua senha tem que ser diferente da anterior!"}
  } else {
    const hashPass = await bcrypt.hash(body.senha, 10)

    await prisma.user.updateMany({
      where: {
        email: body.email
      },
      data : {
        senha: hashPass
      }
    })

    return {"status": 200, "message":"Senha atualizada com sucesso!"}
  }
};

const createNewUser = async (body) => {
  const verifyEmail = await prisma.user.findFirst({
    where: {
      email: body.email
    }
  })
  
  if (verifyEmail === null) {
    const hashPass = await bcrypt.hash(body.senha, 10)
    const token = jwt.sign(body.email, process.env.JWT_SECRET)

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        senha: hashPass
      }
    })
  } else {
    return {"status": 200, "message":"Usuario já existe, entrando..."}
  }
  
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
