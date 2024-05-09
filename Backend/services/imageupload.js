const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});


async function uploadFile(file) {
    try {
        const fileName = `${new Date().getTime()}_${file.name}`;
        const mimetype = file.mimetype;
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: file.data,
            ContentType: mimetype,
            ACL: 'public-read'
        };

        const command = new PutObjectCommand(params);
        const res = await s3.send(command);
        const objectUrl = `https://${process.env.BUCKET_NAME}.s3.${'ap-south-1'}.amazonaws.com/${fileName}`;
        return { fileUrl: objectUrl };
    } catch (error) {
        throw error;
    }
}


exports.uploadFileToAws = async (req, res, next) => {
    try {
        if (req.files && req.files.image) {
            const file = req.files.image;
            const uploadRes = await uploadFile(file);
            req.fileurl = uploadRes.fileUrl;
            next()
        }
        else {
            res.status(404).send('FILES_NOT_FOUND')
        }
    } catch (error) {
        return next(error);
    }
}
