import { Response } from "express";

export class routesError {
    errorUndefinedBodys(res: Response) {
        return res.status(201).json({"status": 201, "message": "Dados insuficientes!"})
    }
    
    errorIncorrectsDatas(data: String) {
        return {"status": 201, "message": `${data} incorreto/a!`}
    }
    
    errorAlreadyExists(data: String) {
        return {"status": 201, "message": `${data} já está cadastrado/a!`}
    }
}

