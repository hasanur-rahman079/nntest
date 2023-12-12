require("dotenv").config();
const fs = require("fs");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// const bucketName = process.env.AWS_BUCKET_NAME;
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new aws.S3();

// upload a file to s3 by storing files locally first

// async function uploadFile(file) {
//   try {
//     const fileStream = fs.createReadStream(file.path);

//     const uploadParams = {
//       Bucket: bucketName,
//       Body: fileStream,
//       Key: file.filename,
//     };

//     const result = await s3.upload(uploadParams).promise();
//     console.log("S3 Upload Result:", result);
//   } catch (error) {
//     console.error("Error uploading file to S3:", error);
//     throw error;
//   }
// }

// exports.uploadFile = uploadFile;

// upload a file to s3 directly
const uploadFilesDirectly = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    }),
  });

module.exports = uploadFilesDirectly;
