import {querys} from '../db/cardQuerys'

const db = new querys()

import { routesError } from '../errors/routes.errors';
const error = new routesError()

interface card {
    id_user: number, 
    id_category: number, 
    title : string, 
    answer: string,
    image: string,
  }

export class cardsService {
  async getAllCards() {
    return await db.allCards()
  };

  async getUserCards(id: number) {
    const userById = await db.userById(id)
    if (userById === null) {
        return error.errorIncorrectsDatas('id')
    } else {
        const userById = await db.userCards(id)
        return userById
    }
  };

  async createNewCard({id_user, id_category, title, answer, image}: card) {
    try {
        const createCard = await db.cardCreate(image, id_user, id_category, title, answer)
        return {"status": 200, createCard}
    } catch (e) {
        console.log(e)
        return e
    }
  };
  
  async updateOneCard(id:number, {id_category, image, title, answer}) {
    try {
        const updateCard = await db.cardUpdate(id, id_category, image, title, answer)
        return {"status": 200, updateCard}
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

