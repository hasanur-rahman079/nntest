require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const FileModel = require("../db/model/upload.model");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.S3_BUCKET_NAME;
const bucketRegion = process.env.S3_REGION;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const accessKey = process.env.S3_ACCESS_KEY;

// configure AWS
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// Create a new file collection
const uploadFile = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  req.file.buffer;

  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    // tell s3 to send the command to s3 bucket
    await s3.send(command);

    res.send({});
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = uploadFile;
