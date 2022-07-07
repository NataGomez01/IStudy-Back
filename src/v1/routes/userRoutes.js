const express = require("express");
const USERS = express();

const userController = require("../../controllers/userController");

const keyVerification = require("../../middlewares/keyVerification");

USERS
.use(keyVerification)
// GETS
.get('/all', userController.getAllUsers)
.get('/achievement/all', userController.getAllMedals)
.get('/achievement/:userId', userController.getUserMedals)
.post('/login', userController.getOneUser)
// POSTS
.post('/verify', userController.verifyNewUser)
.post('/', userController.createNewUser)
.post('/password', userController.verifyForgetPass)
.post('/token', userController.verifyToken)
// PUTS
.put('/:userId', userController.updateOneUser)
.put('/achievement/:userId', userController.updateMedals)
.put('/password/:userEmail', userController.changePassword)
.put('/image/:userId', userController.updateImage)
// DELETES
.delete('/:userId', userController.deleteOneUser)

module.exports = USERS; 
