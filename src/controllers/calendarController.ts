import { calendarService } from '../services/calendarService'
import { routesError } from '../errors/routes.errors'
import { Request, Response } from "express";

const error = new routesError()
const service = new calendarService()

export class calendarController {
    async getAllEvents(req: Request, res: Response): Promise<void> {
        const getAllEvents = await service.getAllEvents(Number(req.params.userId))
        res.status(200).json(getAllEvents);
    };

    async createNewEvent(req: Request, res: Response): Promise<void> {
        if (req.body.id === undefined || req.body.date === undefined || req.body.desc === undefined) {
            error.errorUndefinedBodys(res)
        } else {
            const createNewEvent = await service.createNewEvent(req.body)
            res.status(200).json(createNewEvent);
        }
    };

    async updateOneEvent(req: Request, res: Response): Promise<void> {
        if (req.body.date === undefined || req.body.desc === undefined) {
            error.errorUndefinedBodys(res)
        } else {
            const updateOneEvent = await service.updateOneEvent(Number(req.params.eventId) ,req.body)
            res.status(200).json(updateOneEvent);
        }
    };

    async deleteOneEvent(req: Request, res: Response): Promise<void> {
        const deleteOneEvent = await service.deleteOneEvent(Number(req.params.eventId))
        res.status(200).json(deleteOneEvent);
    };
}
