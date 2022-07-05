const errorUndefinedBodys = (res) => {
    return res.status(200).send({"status": 200, "message": "Dados insuficientes!"})
}

const errorIncorrectsDatas = (data) => {
    return {"status": 200, "message": `${data} incorreto/a!`}
}

const errorAlreadyExists = (data) => {
    return {"status": 200, "message": `${data} já está cadastrado/a!`}
}

module.exports = {
    errorUndefinedBodys,
    errorIncorrectsDatas,
    errorAlreadyExists
}