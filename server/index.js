require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const app = Express();
const connectDb = require("./db/connect.js");
const multer = require("multer");
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

// Specify the allowed origins
const allowedOrigins = ["http://localhost:3000"];

// Enable CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // check the origin is in the allowed origins list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
  })
);

// Middleware
app.use(Express.json());
connectDb();

module.exports = app;

// Importing routes
// const uploadRoutes = require("./routes/upload.routes.js");

// Rooth path middleware
app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.send("Welcome to the NodeNext Text API Application");
  } else {
    next();
  }
});

// Using routes
// app.use("/upload", uploadRoutes);

const stroage = multer.memoryStorage();
const upload = multer({ storage: stroage });

app.post("/api/upload", upload.single("image"), async (req, res) => {
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

  // tell s3 to send the command to s3 bucket
  await s3.send(command);

  res.send({});
});
