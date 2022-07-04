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

const userCreate = async (image, email, name, hashPass) => {
    try {
        return await prisma.user.create({
            data: {
                image_url: image === undefined ? 'https://istudy.sfo3.digitaloceanspaces.com/1656957335805.png' : image,
                name: name,
                email: email,
                senha: hashPass
            }
          })
    } catch(err) {
        console.log(err)
        return err
    }
}

const userById = async (id) => {
    try {
        return await prisma.user.findUnique({ 
            where: {
              id: Number(id)
            }
        })
    } catch (err) {
        return err
    }
}

const userUpdateName = async (id, name) => {
    try {
        await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name
            }
        })
    } catch (err) {
        return err
    }
}

const userUpdateImage = async (id, image) => {
    try {
        await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                image_url: image
            }
        })
    } catch (err) {
        return err
    }
}

const deleteUser = async (id) => {
    try {
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (err) {
        return err
    }
}

module.exports = {
    allUsers,
    userByEmail,
    userByName,
    userUpdatePassword,
    userCreate,
    userById,
    userUpdateName,
    userUpdateImage,
    deleteUser
}
