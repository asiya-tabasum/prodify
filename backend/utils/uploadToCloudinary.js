const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return reject(new Error("Image upload failed"));
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    stream.end(fileBuffer);
  });
};

module.exports= uploadToCloudinary;