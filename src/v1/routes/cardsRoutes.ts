import express from 'express'; 

export const CARDS = express();

import { cardsController}  from "../../controllers/cardsController"
const controller = new cardsController()

import { keyVerification } from "../../middlewares/keyVerification"

CARDS
.use(keyVerification)
// GETS
.get('/all', controller.getAllCards)
.get('/:userId', controller.getUserCards)
// POSTS
.post('/', controller.createNewCard)
// PUTS
.put('/:cardId', controller.updateOneCard)
// DELETES
.delete('/:cardId', controller.deleteOneCard)

