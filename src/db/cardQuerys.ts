import { PrismaClient } from '.prisma/client'
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

    async oneCard(id: number): Promise<any> {
        try {
            return await prisma.user_Cards.findUnique({ 
                where: {
                  id: Number(id)
                },
                include: {
                    card_Answer: true,
                    category: true
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async userCards(id: number) {
        try {
            return await prisma.user_Cards.findMany({ 
                where: {
                  id_User: Number(id)
                },
                include: {
                    category: true
                }
            })
        } catch (err) {
            return err.message
        }
    }

    async cardUpdate(id: number, title: string) {
        try {
            return await prisma.user_Cards.update({
                where: {
                    id: Number(id)
                },
                data : {
                    title: title,
                }
            })
        } catch (err) {
            return err.message
        }
    }

    async answerUpdate(id: number, question: string, answer: string) {
        try {
            return await prisma.answers.update({
                where: {
                    id: Number(id)
                },
                data : {
                    question: question,
                    answer: answer
                }
            })
        } catch (err) {
            return err.message
        }
    }
    
    async cardCreate(image: string, id_user: number, id_category: number, title : string): Promise<any> {
        try {
            return await prisma.user_Cards.create({
                data: {
                    id_User: id_user,
                    image_url: image === undefined ? 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Categorys/ImageDefault.png' : image,
                    title: title,
                    category: {
                        connect: {
                            id: id_category
                        }
                    }
                }
              })
        } catch(err) {
            return err.message
        }
    }

    async AnswerCreate(id_card: number, question: string, answer: string) {
        try {
            return await prisma.user_Cards.update({
                where: {
                    id: Number(id_card)
                },
                data : {
                    card_Answer: {
                        create: {
                            question: question,
                            answer: answer
                        }
                    }
                }
            })
        } catch (err) {
            return err.message
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
            return err.message
        }
    }
}
