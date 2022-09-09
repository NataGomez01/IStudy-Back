import { PrismaClient } from '.prisma/client'
const prisma = new PrismaClient()

export class querys {
    async allEvents(userId: number) {
        try {
            return await prisma.calendar.findMany({
                where: {
                    id_User: userId
                }
            })
        } catch (err) {
            return err.message
        }
    } 

    async createEvent(id: number, title: string, date: string, desc: string) {
        try {
            const res = await prisma.calendar.create({
                data: {
                    id_User: id,
                    title: title,
                    date: date,
                    desc: desc
                }
            })

            return res
        } catch (err) {
            return err.message
        }
    } 

    async updateEvent(id: number, title: string, date: string, desc: string) {
        try {
            const res = await prisma.calendar.update({
                where: {
                    id: id
                },
                data: {
                    date: date,
                    title: title,
                    desc: desc
                }
            })

            return res
        } catch (err) {
            return err.message
        }
    } 

    async deleteEvent(id: number) {
        try {
            const res = await prisma.calendar.delete({
                where: {
                    id: id
                }
            })

            return res
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

    async eventById(id: number): Promise<any> {
        try {
            return await prisma.calendar.findUnique({ 
                where: {
                  id: Number(id)
                }
            })
        } catch (err) {
            return err.message
        }
    }
}
