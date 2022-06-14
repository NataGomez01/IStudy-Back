const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const allUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (err) {
        return err
    }
} 

const userByEmail = async (email) => {
    try {
        return await prisma.user.findFirst({ 
            where: {
              email: email
            }
        })
    } catch (err) {
        return err
    }
}

const userByName = async (name) => {
    try {
        return await prisma.user.findFirst({ 
            where: {
              name: name
            }
        })
    } catch (err) {
        return err
    }
}

const userUpdatePassword = async (email, hashPass) => {
    try {
        return await prisma.user.updateMany({
            where: {
            email: email
            },
            data : {
            senha: hashPass
            }
        })
    } catch (err) {
        return err
    }
}

const userCreate = async (email, name, hashPass) => {
    try {
        return await prisma.user.create({
            data: {
              name: name,
              email: email,
              senha: hashPass
            }
          })
    } catch(err) {
        return err
    }
}

module.exports = {
    allUsers,
    userByEmail,
    userByName,
    userUpdatePassword,
    userCreate
}