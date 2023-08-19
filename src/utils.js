import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      let uploadFolder = "";
    if (file.fieldname === "profile") {
      uploadFolder = "profiles";
    } else if (file.fieldname === "product") {
      uploadFolder = "images";
    } else if (file.fieldname === "document") {
      uploadFolder = "documents";
    }
    else if (file.fieldname === "thumbnails") {
      uploadFolder = "images";
    } 

    cb(null, `${__dirname}/public/${uploadFolder}`);  
    } catch (error) {
      const errort = new Error("Unexpected field,  can not find type of fields: 'product' or 'document', 'profiles', 'thumbnails'  ");
      errort.name = "MulterError";
      return cb(errort);
    }

  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const uploader = multer({ storage });

export default __dirname;
