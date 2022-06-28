const userService = require('../services/userService')
const { errorUndefinedBodys } = require('../errors/routes.errors')

const getAllUsers = async (req, res) => {
    const getAllUsers = await userService.getAllUsers()
    res.send(getAllUsers);
};

const getOneUser = async (req, res) => {
  if (req.body.senha === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const getOneUser = await userService.getOneUser(req.body)
      res.status(getOneUser.status).send(getOneUser)
  }
};

const verifyNewUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const verify = await userService.verifyNewUser(req.body)
      res.status(verify.status).send(verify);
  }
};

const verifyForgetPass = async (req, res) => {
  if (req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const verify = await userService.verifyForgetPass(req.body)
      res.status(verify.status).send(verify);
  }
};

const verifyToken = async (req, res) => {
  if (req.body.token === undefined) {
    errorUndefinedBodys(res)
  } else {
      const verify = await userService.verifyToken(req.body.token)
      res.status(verify.status).send(verify);
  }
};

const createNewUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined || req.body.senha === undefined) {
    errorUndefinedBodys(res)
  } else {
      const createUser = await userService.createNewUser(req.body)
      res.status(createUser.status).send(createUser);
  }
};

const changePassword = async (req, res) => {
  if (req.body.senha === undefined) {
    errorUndefinedBodys(res)
  } else {
      const pass = await userService.changePassword(req.body.senha, req.params.userEmail)
      res.status(pass.status).send(pass);
  }
};

const updateOneUser = async (req, res) => {
  if (req.body.name === undefined) {
    errorUndefinedBodys(res)
  } else {
      const updateOneUser = await userService.updateOneUser(req.params.userId, req.body.name)
      res.status(updateOneUser.status).send(updateOneUser);
  }
};

const deleteOneUser = (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    errorUndefinedBodys(res)
  } else {
      const deleteOneUser = userService.deleteOneUser
      res.status(deleteOneUser.status).send("Delete um usuario existente.");
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  verifyNewUser,
  verifyForgetPass,
  changePassword,
  verifyToken,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
