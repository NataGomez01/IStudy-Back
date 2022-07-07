const userService = require('../services/userService')
const { errorUndefinedBodys } = require('../errors/routes.errors')

const getAllUsers = async (req, res) => {
    const getAllUsers = await userService.getAllUsers()
    res.send(getAllUsers);
};

const getAllMedals = async (req, res) => {
  const getAllMedals = await userService.getAllMedals()
  res.send(getAllMedals);
};

const getUserMedals = async (req, res) => {
  const getUserMedals = await userService.getUserMedals(req.params.userId)
  res.send(getUserMedals);
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

const updateMedals = async (req, res) => {
  if (req.body.id_medal === undefined) {
    errorUndefinedBodys(res)
  } else {
      const updateUserMedals = await userService.updateUserMedal(req.params.userId, req.body.id_medal)
      res.status(updateUserMedals.status).send(updateUserMedals);
  }
};

const updateImage = async (req, res) => {
  if (req.body.image === undefined) {
    errorUndefinedBodys(res)
  } else {
      const updateImage = await userService.updateImage(req.params.userId, req.body.image)
      res.status(updateImage.status).send(updateImage);
  }
};

const deleteOneUser = async (req, res) => {
  const deleteUser = await userService.deleteOneUser(req.params.userId)
  res.status(deleteUser.status).send(deleteUser);
};

module.exports = {
  getAllUsers,
  getAllMedals,
  getUserMedals,
  getOneUser,
  verifyNewUser,
  verifyForgetPass,
  changePassword,
  updateMedals,
  verifyToken,
  createNewUser,
  updateOneUser,
  updateImage,
  deleteOneUser,
};
