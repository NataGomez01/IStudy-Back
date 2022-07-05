const errorUndefinedBodys = (res) => {
    return res.status(201).send({"status": 201, "message": "Dados insuficientes!"})
}

const errorIncorrectsDatas = (data) => {
    return {"status": 201, "message": `${data} incorreto/a!`}
}

const errorAlreadyExists = (data) => {
    return {"status": 201, "message": `${data} já está cadastrado/a!`}
}

module.exports = {
    errorUndefinedBodys,
    errorIncorrectsDatas,
    errorAlreadyExists
}