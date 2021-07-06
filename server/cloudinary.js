const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  'cloud_name': process.env.CLOUD_NAME,
  'api_key': process.env.API_KEY,
  'api_secret': process.env.API_SECRET
});

const uploadPhotoToCloudinary = (body) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_large(body.dataURI, (err, results) => {
      if (err) {
        reject(err);
      } else {
        let url = { url: results.url };
        resolve(JSON.stringify(url));
      }
    });
  });
};

module.exports = uploadPhotoToCloudinary;

