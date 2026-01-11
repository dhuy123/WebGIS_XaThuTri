const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
   // limits: { fileSize: 50 * 1024 * 1024 } // Giới hạn kích thước tệp tin là 50MB
   //limits: { fileSize: 10 * 24 * 24 } // Giới hạn kích thước tệp tin là 
});

module.exports = upload;