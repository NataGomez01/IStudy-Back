const express = require("express");
const USERS = express();

const userController = require("../../controllers/userController");

const keyVerification = require("../../middlewares/keyVerification");

USERS
.use(keyVerification)
// GETS
.get('/all', userController.getAllUsers)
.post('/login', userController.getOneUser)
// POSTS
.post('/verify', userController.verifyNewUser)
.post('/', userController.createNewUser)
.post('/password', userController.verifyForgetPass)
// PUTS
.put('/:userId', userController.updateOneUser)
.put('/password/:userEmail', userController.changePassword)
// DELETES
.delete('/:userId', userController.deleteOneUser)

module.exports = USERS; 
