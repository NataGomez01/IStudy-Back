import { userService } from '../services/userService'
import { routesError } from '../errors/routes.errors'
import { Request, Response } from "express";

const error = new routesError()
const service = new userService()

export class userController {
  async getTopUsers(req: Request, res: Response): Promise<void> {
    const getTopUsers = await service.getTopUsers()
    res.json(getTopUsers);
  };

  async getAllMedals(req: Request, res: Response): Promise<void> {
    const getAllMedals = await service.getAllMedals()
    res.json(getAllMedals);
  };
  
  async getUserMedals(req: Request, res: Response): Promise<void> {
    const getUserMedals = await service.getUserMedals(Number(req.params.userId))
    res.json(getUserMedals);
  };
  
  async getOneUser(req: Request, res: Response): Promise<void> {
    if (req.body.senha === undefined || req.body.email === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const getOneUser = await service.getOneUser(req.body)
        res.status(getOneUser.status).json(getOneUser)
    }
  };
  
  async verifyNewUser(req: Request, res: Response): Promise<void> {
    if (req.body.name === undefined || req.body.email === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const verify = await service.verifyNewUser(req.body)
        res.status(verify.status).json(verify);
    }
  };
  
  async verifyForgetPass(req: Request, res: Response): Promise<void> {
    if (req.body.email === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const verify = await service.verifyForgetPass(req.body)
        res.status(verify.status).json(verify);
    }
  };
  
  async verifyToken(req: Request, res: Response): Promise<void> {
    if (req.body.token === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const verify = await service.verifyToken(req.body.token)
        res.status(verify.status).json(verify);
    }
  };
  
  async createNewUser(req: Request, res: Response): Promise<void> {
    if (req.body.name === undefined || req.body.email === undefined || req.body.senha === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const createUser = await service.createNewUser(req.body)
        res.status(createUser.status).json(createUser);
    }
  };
  
  async changePassword(req: Request, res: Response): Promise<void> {
    if (req.body.senha === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const pass = await service.changePassword(req.body.senha, req.params.userEmail)
        res.status(pass.status).json(pass);
    }
  };
  
  async updateOneUser(req: Request, res: Response): Promise<void> {
    if (req.body.name === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const updateOneUser = await service.updateOneUser(Number(req.params.userId), req.body.name)
        res.status(updateOneUser.status).json(updateOneUser);
    }
  };
  
  async updateMedals(req: Request, res: Response): Promise<void> {
    if (req.body.id_medal === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const updateUserMedals = await service.updateUserMedal(Number(req.params.userId), req.body.id_medal)
        res.status(updateUserMedals.status).json(updateUserMedals);
    }
  };
  
  async updateImage(req: Request, res: Response): Promise<void> {
    if (req.body.image === undefined) {
      error.errorUndefinedBodys(res)
    } else {
        const updateImage = await service.updateImage(Number(req.params.userId), req.body.image)
        res.status(updateImage.status).json(updateImage);
    }
  };
  
  async deleteOneUser(req: Request, res: Response): Promise<void> {
    const deleteUser = await service.deleteOneUser(Number(req.params.userId))
    res.status(deleteUser.status).json(deleteUser);
  };
}

