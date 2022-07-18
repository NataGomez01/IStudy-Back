import { Request, Response, NextFunction } from "express";

export const keyVerification = function (req: Request, res: Response, next: NextFunction) {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
        return res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
        return next();
    } 
};
