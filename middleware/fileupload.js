const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "__" + file.originalname)
    }
});


const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('pdf') || (file.mimetype).includes('doc') || (file.mimetype).includes('docx')) {
        cb(null, true);
    } else {
        cb(null, false);

    }

};

let upload = multer({ storage: storage, fileFilter: fileFilter, });

module.exports = upload.single('resumePath')
