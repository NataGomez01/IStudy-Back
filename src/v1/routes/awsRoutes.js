const express = require("express");
const AWS = express();

const awsController = require("../../controllers/awsController")

AWS
.post("/upload", awsController.uploadImage)

module.exports = AWS;