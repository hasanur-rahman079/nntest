const Express = require("express");
const cors = require("cors");
const app = Express();
const connectDb = require("./db/connect.js");

const uploadFilesDirectly = require("./s3.js");

const upload = uploadFilesDirectly("bdmuseum").single("file");

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
const uploadRoutes = require("./routes/upload.routes.js");

// Rooth path middleware
app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.send("Welcome to the NodeNext Text API Application");
  } else {
    next();
  }
});

// Using routes
// app.use("/api/upload", uploadRoutes);

app.post("/api/image", (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    console.log(req.body); // Access other form fields
    console.log(req.file); // Access the uploaded file details

    res.send("File uploaded successfully");
    res.status(200).json({ message: "File uploaded successfully" });
  });
});
