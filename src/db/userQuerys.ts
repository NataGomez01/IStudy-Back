import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class querys {
    async allUsers() {
        try {
            return await prisma.user.findMany()
        } catch (err) {
            return err
        }
    } 
    
    async userByEmail(email: string): Promise<any> {
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
    
    async userByName(name: string) {
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
            return err
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
            return err
        }
    }
    
    async userCreate(image: string, email: string, name: string, hashPass: string): Promise<any> {
        try {
            return await prisma.user.create({
                data: {
                    image_url: image === undefined ? 'https://istudy.sfo3.digitaloceanspaces.com/1656957335805.png' : image,
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
            console.log(err)
            return err
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
            console.log(err)
            return err
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
            console.log(err)
            return err
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
            return err
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
            return err
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
            return err
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
            console.log(err)
            return err
        }
    }
    
    async medals() {
        try {
            return await prisma.medals.findMany()
        } catch (err) {
            return err
        }
    }
}
