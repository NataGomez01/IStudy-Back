import { userService } from '../services/userService'
import { routesError } from '../errors/routes.errors'
import { Request, Response } from "express";

const error = new routesError()
const service = new userService()

export class userController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const getAllUsers = await service.getAllUsers()
    res.send(getAllUsers);
  };

  async getAllMedals(req: Request, res: Response): Promise<void> {
    const getAllMedals = await service.getAllMedals()
    res.send(getAllMedals);
  };
  
  async getUserMedals(req: Request, res: Response): Promise<void> {
    const getUserMedals = await service.getUserMedals(Number(req.params.userId))
    res.send(getUserMedals);
  };
  
  async getOneUser(req: Request, res: Response): Promise<void> {
    if (req.body.senha === undefined || req.body.email === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const getOneUser = await service.getOneUser(req.body)
        res.status(getOneUser.status).send(getOneUser)
    }
  };
  
  async verifyNewUser(req: Request, res: Response): Promise<void> {
    if (req.body.name === undefined || req.body.email === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const verify = await service.verifyNewUser(req.body)
        res.status(verify.status).send(verify);
    }
  };
  
  async verifyForgetPass(req: Request, res: Response): Promise<void> {
    if (req.body.email === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const verify = await service.verifyForgetPass(req.body)
        res.status(verify.status).send(verify);
    }
  };
  
  async verifyToken(req: Request, res: Response): Promise<void> {
    if (req.body.token === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const verify = await service.verifyToken(req.body.token)
        res.status(verify.status).send(verify);
    }
  };
  
  async createNewUser(req: Request, res: Response): Promise<void> {
    if (req.body.name === undefined || req.body.email === undefined || req.body.senha === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const createUser = await service.createNewUser(req.body)
        res.status(createUser.status).send(createUser);
    }
  };
  
  async changePassword(req: Request, res: Response): Promise<void> {
    if (req.body.senha === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const pass = await service.changePassword(req.body.senha, req.params.userEmail)
        res.status(pass.status).send(pass);
    }
  };
  
  async updateOneUser(req: Request, res: Response): Promise<void> {
    if (req.body.name === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const updateOneUser = await service.updateOneUser(Number(req.params.userId), req.body.name)
        res.status(updateOneUser.status).send(updateOneUser);
    }
  };
  
  async updateMedals(req: Request, res: Response): Promise<void> {
    if (req.body.id_medal === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const updateUserMedals = await service.updateUserMedal(Number(req.params.userId), req.body.id_medal)
        res.status(updateUserMedals.status).send(updateUserMedals);
    }
  };
  
  async updateImage(req: Request, res: Response): Promise<void> {
    if (req.body.image === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const updateImage = await service.updateImage(Number(req.params.userId), req.body.image)
        res.status(updateImage.status).send(updateImage);
    }
  };
  
  async deleteOneUser(req: Request, res: Response): Promise<void> {
    const deleteUser = await service.deleteOneUser(Number(req.params.userId))
    res.status(deleteUser.status).send(deleteUser);
  };
}
