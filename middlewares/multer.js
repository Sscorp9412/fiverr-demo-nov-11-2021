/*
---------------
multer config
---------------
*/ 

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./assets")
  },

  filename: function (req, file, callback) {
    console.log(file.originalname)
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = multer({ storage });
