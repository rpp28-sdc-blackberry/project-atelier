const cloudinary = require('cloudinary');
// const config = require('../cloudinary.config.js');
const env = require('dotenv').config();

cloudinary.config({
  'cloud_name': CLOUDINARY_CLOUD_NAME,
  'api_key': CLOUDINARY_API_KEY,
  'api_secret': CLOUDINARY_API_SECRET
});

const uploadPhotoToCloudinary = (body) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_large(body.dataURI, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.url);
      }
    });
  });
};

module.exports = uploadPhotoToCloudinary;

