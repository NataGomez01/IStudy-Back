const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.get("/", userController.getAllUsers);

router.post("/login", userController.getOneUser);

router.post("/verify", userController.verifyNewUser);

router.post("/forget", userController.verifyForgetPass)

router.post("/changepass", userController.changePassword)

router.post("/create", userController.createNewUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router; 
