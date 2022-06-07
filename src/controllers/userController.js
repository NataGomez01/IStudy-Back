const userService = require('../services/userService')

const getAllUsers = async (req, res) => {
  if (req.header('Authentication') !== process.env.HEADER_AUTH) {
    res.send({"status": 400, "message":"Requisição não aceita!"});
  } else {
    const getAllUsers = await userService.getAllUsers()
    res.send(getAllUsers);
  }
};

const getOneUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    res.send({"status": 400, "message": "Dados insuficientes!"})
  } else {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
      res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
      const getOneUser = await userService.getOneUser(req.body)
      res.send(getOneUser);
    }
  }
};

const verifyNewUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    res.send({"status": 400, "message": "Dados insuficientes!"})
  } else {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
      res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
      const verify = await userService.verifyNewUser(req.body)
      res.send(verify);
    }
  }
};

const createNewUser = async (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined || req.body.senha === undefined) {
    res.send({"status": 400, "message": "Dados insuficientes!"})
  } else {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
      res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
      const createUser = await userService.createNewUser(req.body)
      res.send(createUser);
    }
  }
};

const updateOneUser = (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    res.send({"status": 400, "message": "Dados insuficientes!"})
  } else {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
      res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
      const updateOneUser = userService.updateOneUser
      res.send("Atualize os dados de um usuario.");
    }
  }
};

const deleteOneUser = (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined) {
    res.send({"status": 400, "message": "Dados insuficientes!"})
  } else {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
      res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
      const deleteOneUser = userService.deleteOneUser
      res.send("Delete um usuario existente.");
    }
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  verifyNewUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
