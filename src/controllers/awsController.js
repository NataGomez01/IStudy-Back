const awsService = require('../services/awsService')
const { errorUndefinedBodys } = require('../errors/routes.errors')

const uploadImage = async (req, res) => {
    if (req.body.image === undefined) {
        errorUndefinedBodys(res)
      } else {
          const uploadImage = await awsService(req.body.image)
          res.status(uploadImage.status).send(uploadImage)
      }
}

module.exports = {
    uploadImage
}
