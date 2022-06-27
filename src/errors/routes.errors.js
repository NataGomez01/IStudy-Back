const errorUndefinedBodys = (res) => {
    return res.status(400).send({"status": 400, "message": "Dados insuficientes!"})
}

const errorIncorrectsDatas = (data) => {
    return {"status": 400, "message": `${data} incorreto/a!`}
}

const errorAlreadyExists = (data) => {
    return {"status": 400, "message": `${data} já está cadastrado/a!`}
}

module.exports = {
    errorUndefinedBodys,
    errorIncorrectsDatas,
    errorAlreadyExists
}