import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');// Directory to save images
        //cb(error argument, destination path)
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        //field name is image (form field name), Date.now() is to make sure the file name is unique, path.extname is to get the extension of the file

        //eg image-29012025.jpg
    },
    // destination where the file will be saved
    // filename how the file will be saved
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/; // Allowed file types

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
    const mimetype = filetypes.test(file.mimetype); // Check MIME type

    if (mimetype && extname) {
        return cb(null, true); // File is valid
    } else {
        cb('Images only!'); // Reject the file
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },  
})

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message : 'Image uploaded',
        imagePath : `/${req.file.path}`
    })
});

export default router;