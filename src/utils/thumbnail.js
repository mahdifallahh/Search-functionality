const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

async function generateImageThumbnail(filePath, thumbPath) {
  await sharp(filePath)
    .resize(100, 100)
    .toFile(thumbPath);
}

function generateVideoThumbnail(filePath, thumbPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .screenshots({
        count: 1,
        folder: path.dirname(thumbPath),
        filename: path.basename(thumbPath),
        size: '100x100',
      });
  });
}

function getVideoDuration(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata.format.duration);
    });
  });
}

module.exports = { generateImageThumbnail, generateVideoThumbnail, getVideoDuration };
