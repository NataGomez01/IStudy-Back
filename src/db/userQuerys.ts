import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class querys {
    async topUsers() {
        try {
            return await prisma.statiscs.findMany({
                include: {
                    user: true
                }
            })
        } catch (err) {
            return err.message
        }
    } 
    
    async userByEmail(email: string): Promise<any> {
        try {
            return await prisma.user.findFirst({ 
                where: {
                  email: email
                },
                include: {
                    likedCards: {
                        select: {
                            id: true
                        }
                    }
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userByName(name: string) {
        try {
            return await prisma.user.findFirst({ 
                where: {
                  name: name
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userUpdatePassword(email: string, hashPass: string) {
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
            return err.message
        }
    }
    
    async userUpdateMedal(id: number, id_medal: number) {
        const newId = Number(id) - 1
        try {
            return await prisma.statiscs.update({
                where: {
                    id: Number(newId)
                },
                data : {
                    medals: {
                        connect: {
                            id: Number(id_medal)
                        }
                    }
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userCreate(image: string, email: string, name: string, hashPass: string): Promise<any> {
        try {
            return await prisma.user.create({
                data: {
                    image_url: image === undefined ? 'https://firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/avatares%2FAvatar9-removebg-preview.png?alt=media&token=550d7b83-7ed2-4550-85c1-29bd4586581f' : image,
                    name: name,
                    email: email,
                    senha: hashPass,
                    statistics: {
                        create: [
                            {
                                wins: 0,
                                loses: 0,
                                playeds: 0
                            }
                        ]
                    }
                }
              })
        } catch(err) {
            return err.message
        }
    }
    
    async statisticsById(id: number) {
        try {
            return await prisma.statiscs.findMany({ 
                where: {
                  id_User: Number(id)
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userMedals(id: number) {
        try {
            return await prisma.statiscs.findMany({ 
                where: {
                  id_User: Number(id)
                },
                select: {
                    medals: true
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userById(id: number): Promise<any> {
        try {
            return await prisma.user.findUnique({ 
                where: {
                  id: Number(id)
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userUpdateName(id: number, name: string) {
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
            return err.message
        }
    }

    async statsUpdate(id: number, type: string) {
        try {
            if(type == 'win') {
                await prisma.statiscs.updateMany({
                    where: {
                        id_User: id
                    },
                    data: {
                        wins: {
                            increment: 1
                        }
                    }
                })
            } else if (type == 'lose') {
                await prisma.statiscs.updateMany({
                    where: {
                        id_User: id
                    },
                    data: {
                        loses: {
                            increment: 1
                        }
                    }
                })
            } else {
                return "Type don't exists"
            }

            await prisma.statiscs.updateMany({
                where: {
                    id_User: id
                },
                data: {
                playeds: {
                        increment: 1
                    }
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userUpdateImage(id: number, image: string) {
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
            return err.message
        }
    }
    
    async deleteUser(id: number) {
        try {
            await prisma.user.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async medals() {
        try {
            return await prisma.medals.findMany()
        } catch (err) {
            return err.message
        }
    }
}
