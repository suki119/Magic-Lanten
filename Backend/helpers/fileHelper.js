
// const multer = require('multer');
// const path = require('path');


// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//             cb(null, true)
//         } else {
//             cb(null, false)
//         }
//     }
// })

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


module.exports = multer({
    storage: multer.diskStorage({}),
    // fileFilter: (req, file, cb) => {
    //     let ext = path.extname(file.originalname);
    //     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    //         cb(null, true)
    //     } else {
    //         cb(null, false)
    //     }
    // }
})
