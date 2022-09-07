import express from 'express'; 

export const USERS = express();

import { userController}  from "../../controllers/userController"
const controller = new userController()

import { keyVerification } from "../../middlewares/keyVerification"

USERS
.use(keyVerification)
// GETS
.get('/top', controller.getTopUsers)
.get('/achievement/all', controller.getAllMedals)
.get('/achievement/:userId', controller.getUserMedals)
.post('/login', controller.getOneUser)
// POSTS
.post('/verify', controller.verifyNewUser)
.post('/', controller.createNewUser)
.post('/password', controller.verifyForgetPass)
.post('/token', controller.verifyToken)
// PUTS
.put('/:userId', controller.updateOneUser)
.put('/achievement/:userId', controller.updateMedals)
.put('/password/:userEmail', controller.changePassword)
.put('/image/:userId', controller.updateImage)
.put('/stats/:userId', controller.updateStats)
// DELETES
.delete('/:userId', controller.deleteOneUser)

