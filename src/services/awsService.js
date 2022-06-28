const aws = require('aws-sdk');

const bucketName = 'istudy'
const dspaces = new aws.Endpoint("sfo3.digitaloceanspaces.com")
const s3 = new aws.S3({
    endpoint: dspaces,
    accessKeyId: process.env.SPACES_ACCESS_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY
})

const uploadImage = async (image) => {
    const key = `${Date.now()}.png`

    const s3Params = {
        Bucket: bucketName,
        Key: key,
        Body: image
    }

    try {
        const uploadURL = await s3.upload(s3Params).promise()
        return {"status": 200, "url": uploadURL, "name": key}
    } catch (e) {
        return {"status": 400, "error": e}
    }
}

module.exports = uploadImage;

