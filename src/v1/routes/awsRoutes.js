const express = require("express");
const AWS = express();

const awsController = require("../../controllers/awsController")

AWS
.post("/upload/:userId", awsController.uploadImage)

module.exports = AWS;