import multer from 'multer'
export const upload = multer({ dest: '../data' })

/** 
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'ss4.0',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    limits: {
      fileSize: 200000000,
    },
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key(req, file, cb) {
      cb(null, uuid() + encodeURIComponent(file.originalname))
    },
  }),
})*/
