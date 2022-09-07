import { cardsService } from '../services/cardsService'
import { routesError } from '../errors/routes.errors'
import { Request, Response } from "express";

const error = new routesError()
const service = new cardsService()

export class cardsController {
    async getAllCards(req: Request, res: Response): Promise<void> {
        const getAllCards = await service.getAllCards()
        res.status(200).json(getAllCards);
      };

    async getTopCards(req: Request, res: Response): Promise<void> {
      const getTopCards = await service.getTopCards()
      res.status(200).json(getTopCards);
    };

    async getQuestions(req: Request, res: Response): Promise<void> {
        const getQuestions = await service.getQuestions(Number(req.params.cardId))
        res.status(200).json(getQuestions);
      };

      async getOneCard(req: Request, res: Response): Promise<void> {
        const getOneCards = await service.getOneCard(Number(req.params.cardId))
        res.status(200).json(getOneCards);
      };
      
      async getUserCards(req: Request, res: Response): Promise<void> {
        const getCardMedals = await service.getUserCards(Number(req.params.userId))
        res.status(200).json(getCardMedals);
      };
      
      async createNewCard(req: Request, res: Response): Promise<void> {
        if (req.body.id_user === undefined || req.body.id_category === undefined || req.body.title === undefined) {
          error.errorUndefinedBodys(res)
        } else {
            const createCard = await service.createNewCard(req.body)
            res.status(createCard.status).json(createCard);
        }
      };

      async createAnswers(req: Request, res: Response): Promise<void> {
        if (!req.body[0]) {
          error.errorUndefinedBodys(res)
        } else {
            const createAnswers = await service.createAnswers(Number(req.params.cardId), req.body)
            res.status(createAnswers.status).json(createAnswers);
        }
      };
      
      async updateOneCard(req: Request, res: Response): Promise<void> {
        if (req.body.title === undefined) {
          error.errorUndefinedBodys(res)
        } else {
            const updateOneCard = await service.updateOneCard(Number(req.params.cardId), req.body.title)
            res.status(200).json(updateOneCard);
        }
      };

      async updateStarsCard(req: Request, res: Response): Promise<void> {
        if (req.body.userId === undefined) {
          error.errorUndefinedBodys(res)
        } else {
            const updateStarsCard = await service.updateStarsCard(Number(req.params.cardId), req.body.userId)
            res.status(200).json(updateStarsCard);
        }
      };

      async updateOneAnswer(req: Request, res: Response): Promise<void> {
        if (req.body.question === undefined || req.body.answer === undefined) {
          error.errorUndefinedBodys(res)
        } else {
            const updateOneAnswer = await service.updateOneAnswer(Number(req.params.answerId), req.body)
            res.status(200).json(updateOneAnswer);
        }
      };
      
      async deleteOneCard(req: Request, res: Response): Promise<void> {
        const deleteCard = await service.deleteOneCard(Number(req.params.cardId))
        res.status(200).json(deleteCard);
      };
}
