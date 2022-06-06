const userService = require('../services/userService')

const getAllUsers = async (req, res) => {
  const getAllUsers = await userService.getAllUsers()
  res.send(getAllUsers);
};

const getOneUser = async (req, res) => {
  const getOneUser = await userService.getOneUser(req.params.userId)
  res.send(getOneUser);
};

const verifyNewUser = async (req, res) => {
  const verify = await userService.verifyNewUser(req.body)
  res.send(verify);
};

const createNewUser = async (req, res) => {
  const createUser = await userService.createNewUser(req.body)
  res.send(createUser);
};

const updateOneUser = (req, res) => {
  const updateOneUser = userService.updateOneUser
  res.send("Atualize os dados de um usuario.");
};

const deleteOneUser = (req, res) => {
  const deleteOneUser = userService.deleteOneUser
  res.send("Delete um usuario existente.");
};

module.exports = {
  getAllUsers,
  getOneUser,
  verifyNewUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};