const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.post("/verify", userController.verifyNewUser);

router.post("/create", userController.createNewUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router; 