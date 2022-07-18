import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class querys {
    async allCards() {
        try {
            return await prisma.cards.findMany({
                select: {
                    questions: true
                }
            })
        } catch (err) {
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
    
    async userCards(id: number) {
        try {
            return await prisma.user_Cards.findMany({ 
                where: {
                  id_User: Number(id)
                }
            })
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async cardUpdate(id: number, id_category: number, image: string, title: string, answer: string) {
        try {
            return await prisma.user_Cards.update({
                where: {
                    id: Number(id)
                },
                data : {
                    image_url: image,
                    title: title,
                    answer: answer,
                    category: {
                        connect: {
                            id: id_category
                        }
                    }
                }
            })
        } catch (err) {
            return err
        }
    }
    
    async cardCreate(image: string, id_user: number, id_category: number, title : string, answer: string): Promise<any> {
        try {
            return await prisma.user_Cards.create({
                data: {
                    id_User: id_user,
                    image_url: image === undefined ? 'Card-Image' : image,
                    title: title,
                    answer: answer,
                    category: {
                        connect: {
                            id: id_category
                        }
                    }
                }
              })
        } catch(err) {
            console.log(err)
            return err
        }
    }

    async deleteCard(id: number) {
        try {
            await prisma.user_Cards.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return err
        }
    }
}
