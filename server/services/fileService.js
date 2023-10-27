const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});


const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const allowed = ['.png', '.jpg', '.jpeg', '.pdf'];
    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(null, false); // handle error in middleware, not here
    }
}



module.exports.upload = multer({ storage, limits: {
    fileSize: 1024 * 1024 * 10
}, fileFilter }).fields([
    {
        name: 'image', maxCount:1
    },
    {
        name: 'filePdf', maxCount:1
    }
])