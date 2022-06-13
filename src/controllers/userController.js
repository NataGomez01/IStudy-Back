const userService = require('../services/userService')
const errorUndefinedBodys = require('../errors/routes.errors')

const getAllUsers = async (req, res) => {
    const getAllUsers = await userService.getAllUsers()
    res.send(getAllUsers);
};

const getOneUser = async (req, res) => {
  if (req.body.senha === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const getOneUser = await userService.getOneUser(req.body)
      res.send(getOneUser);
  }
};

const verifyNewUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const verify = await userService.verifyNewUser(req.body)
      res.send(verify);
  }
};

const verifyForgetPass = async (req, res) => {
  if (req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const verify = await userService.verifyForgetPass(req.body)
      res.send(verify);
  }
};

const createNewUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined || req.body.senha === undefined) {
    errorUndefinedBodys(res)
  } else {
      const createUser = await userService.createNewUser(req.body)
      res.send(createUser);
  }
};

const changePassword = async (req, res) => {
  if (req.body.senha === undefined) {
    errorUndefinedBodys(res)
  } else {
      const pass = await userService.changePassword(req.body.senha, req.params.userEmail)
      res.send(pass);
  }
};

const updateOneUser = (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const updateOneUser = userService.updateOneUser
      res.send("Atualize os dados de um usuario.");
  }
};

const deleteOneUser = (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const deleteOneUser = userService.deleteOneUser
      res.send("Delete um usuario existente.");
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  verifyNewUser,
  verifyForgetPass,
  changePassword,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
