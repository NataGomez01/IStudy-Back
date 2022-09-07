import express from 'express'; 

export const CARDS = express();

import { cardsController}  from "../../controllers/cardsController"
const controller = new cardsController()

import { keyVerification } from "../../middlewares/keyVerification"

CARDS
.use(keyVerification)
// GETS
.get('/all', controller.getAllCards)
.get('/top', controller.getTopCards)
.get('/questions/:cardId', controller.getQuestions)
.get('/:userId', controller.getUserCards)
.get('/one/:cardId', controller.getOneCard)
// POSTS
.post('/', controller.createNewCard)
.post('/answers/:cardId', controller.createAnswers)
// PUTS
.put('/info/:cardId', controller.updateOneCard)
.put('/stars/:cardId', controller.updateStarsCard)
.put('/answer/:answerId', controller.updateOneAnswer)
// DELETES
.delete('/:cardId', controller.deleteOneCard)
