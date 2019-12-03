/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const upload = async (file) => {
  const image = await cloudinary.uploader.upload(file, (result) => result);
  return image;
};

export const manyImages = async (files) => {
  const urls = [];
  let { image } = files;
  image = Array.isArray(image) ? image : [image];
  for (const img of image) {
    const cloudFile = await upload(img.tempFilePath);
    urls.push(cloudFile.url);
  }
  return urls;
};
