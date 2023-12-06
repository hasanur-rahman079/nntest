const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const FileModel = require("../db/model/upload.model");

// configure AWS
const s3 = new aws.S3({
  secretAccessKey: process.env.S3_ACCESS_KEY,
  accessKeyId: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// configure multer
multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

// Create a new file collection
const uploadFile = async (req, res) => {
  // Log that the server received a request
  console.log("Server received a file upload request");

  // use the multer middleware-s3 to handle upload the file
  const uploadFile = upload.single("image");

  // and get the file url from the req.file.location
  const file = req.file;
  console.log(file.location);

  try {
    res.status(201).json({ data: req.file.location });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = uploadFile;
