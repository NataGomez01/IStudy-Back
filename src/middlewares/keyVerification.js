const keyVerification = function (req, res, next) {
    if (req.header('Authentication') !== process.env.HEADER_AUTH) {
        return res.send({"status": 400, "message":"Requisição não aceita!"});
    } else {
        return next();
    } 
};

module.exports = keyVerification