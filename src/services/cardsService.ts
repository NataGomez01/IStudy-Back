import {querys} from '../db/cardQuerys'

const db = new querys()

import { routesError } from '../errors/routes.errors';
const error = new routesError()

interface card {
    id_user: number, 
    id_category: number, 
    title : string, 
    image: string,
  }

export class cardsService {
  async getAllCards() {
    const res = await db.allCards()
    return {"status": 200, res}
  };

  async getOneCard(id: number) {
    const res = await db.oneCard(id)
    return {"status": 200, res} 
  };

  async getUserCards(id: number) {
    const userById = await db.userById(id)
    if (userById === null) {
        return error.errorIncorrectsDatas('id')
    } else {
        const res = await db.userCards(id)
        return {"status": 200, res}
    }
  };

  async createNewCard({id_user, id_category, title, image}: card) {
    try {
        const createCard = await db.cardCreate(image, id_user, id_category, title)
        return {"status": 200, createCard}
    } catch (e) {
        console.log(e)
        return e
    }
  };

  async createAnswers(id: number, arrayAnswers: Array<any>) {
    console.log(arrayAnswers.length)
    try {
        for(let i = 0; i < arrayAnswers.length; i++) {
            let question = arrayAnswers[i].question
            let answer = arrayAnswers[i].answer
            await db.AnswerCreate(id, question, answer)
        }
        return {"status": 200}
    } catch (e) {
        console.log(e)
        return e
    }
  };
  
  async updateOneCard(id:number, {id_category, image, title, answer}) {
    try {
        const updateCard = await db.cardUpdate(id, id_category, image, title)
        return {"status": 200, updateCard}
    } catch (e) {
        console.log(e)
        return e
    }
  };

  async updateOneAnswer(id:number, {question, answer}) {
    try {
        const updateAnswer = await db.answerUpdate(id, question, answer)
        return {"status": 200, updateAnswer}
    } catch (e) {
        console.log(e)
        return e
    }
  };
  
  async deleteOneCard(id: number) {
    try {
        const deleteCard = await db.deleteCard(id)
        return {"status": 200, deleteCard}
    } catch (e) {
        console.log(e)
        return e
    }
  };
  
}

