// const multer = require("multer");
// const path = require("path");

// // Multer config
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);  
//     if (ext !== ".pdf") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });


const multer = require('multer');
const path = require('path');


// module.exports = multer({
//     storage: multer.diskStorage({}),
//     // fileFilter: (req, file, cb) => {
//     //     let ext = path.extname(file.originalname);
//     //     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//     //         cb(null, true)
//     //     } else {
//     //         cb(null, false)
//     //     }
//     // }
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload