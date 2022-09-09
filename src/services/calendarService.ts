import {querys} from '../db/calendarQuerys'

const db = new querys()

import { routesError } from '../errors/routes.errors';
const error = new routesError()

interface calendarData {
  id: number;
  title: string;
  date: string;
  desc: string
}

export class calendarService {
  async getAllEvents(userid: number) {
  const userById = await db.userById(userid)
    if (userById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      const res = await db.allEvents(userid)
      return {"status": 200, res}
    }
  };

  async createNewEvent({id, title, date, desc}: calendarData) {
    const userById = await db.userById(id)
    if (userById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      const res = await db.createEvent(id, title, date, desc)
      return {"status": 200, create: res}
    }
  };

  async updateOneEvent(id: number, {title, date, desc}: calendarData) {
    const eventById = await db.eventById(id)
    if (eventById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      const res = await db.updateEvent(id, title, date, desc)
      return {"status": 200, res}
    }
  };

  async deleteOneEvent(id: number) {
    const eventById = await db.eventById(id)
    if (eventById === null) {
      return error.errorIncorrectsDatas('id')
    } else {
      const res = await db.deleteEvent(id)
      return {"status": 200, res}
    }
  };
}

