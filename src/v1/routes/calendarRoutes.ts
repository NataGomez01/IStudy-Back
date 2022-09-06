import express from 'express'; 

export const CALENDAR = express();

import { calendarController}  from "../../controllers/calendarController"
const controller = new calendarController()

import { keyVerification } from "../../middlewares/keyVerification"

CALENDAR
.use(keyVerification)
// GETS
.get('/:userId', controller.getAllEvents)
// POSTS
.post('/', controller.createNewEvent)
// PUTS
.put('/:eventId', controller.updateOneEvent)
// DELETES
.delete('/:eventId', controller.deleteOneEvent)

