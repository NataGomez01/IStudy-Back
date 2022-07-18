import { cardsService } from '../services/cardsService'
import { routesError } from '../errors/routes.errors'
import { Request, Response } from "express";

const error = new routesError()
const service = new cardsService()

export class cardsController {
    async getAllCards(req: Request, res: Response): Promise<void> {
        const getAllCards = await service.getAllCards()
        res.json(getAllCards);
      };
      
      async getUserCards(req: Request, res: Response): Promise<void> {
        const getCardMedals = await service.getUserCards(Number(req.params.userId))
        res.json(getCardMedals);
      };
      
      async createNewCard(req: Request, res: Response): Promise<void> {
        if (req.body.id_user === undefined || req.body.id_category === undefined || req.body.title === undefined || req.body.answer === undefined) {
          error.errorUndefinedBodys(res)
        } else {
            const createCard = await service.createNewCard(req.body)
            res.status(createCard.status).json(createCard);
        }
      };
      
      async updateOneCard(req: Request, res: Response): Promise<void> {
        if (req.body.id_category === undefined || req.body.image === undefined || req.body.title === undefined || req.body.answer === undefined) {
          error.errorUndefinedBodys(res)
        } else {
            const updateOneCard = await service.updateOneCard(Number(req.params.cardId), req.body)
            res.json(updateOneCard);
        }
      };
      
      async deleteOneCard(req: Request, res: Response): Promise<void> {
        const deleteCard = await service.deleteOneCard(Number(req.params.cardId))
        res.json(deleteCard);
      };
}