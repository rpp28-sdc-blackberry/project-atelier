const cloudinary = require('cloudinary');
const config = require('../cloudinary.config.js');

const uploadPhotoToCloudinary = (body) => {
  cloudinary.config({
    'cloud_name': config.cloud_name,
    'api_key': config.api_key,
    'api_secret': config.api_secret
  });
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(body.dataURI, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.url);
      }
    });
  });
};

module.exports = uploadPhotoToCloudinary;

