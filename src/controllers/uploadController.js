const File = require('../models/File');
const { generateImageThumbnail, generateVideoThumbnail, getVideoDuration } = require('../utils/thumbnail');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
  try {
    const { title, description, alignment, resolution } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    let fileType = file.mimetype.startsWith('image') ? 'image' : 'video';
    let thumbName = `thumb-${file.filename}.png`;
    let thumbPath = path.join(path.dirname(file.path), thumbName);
    let duration = undefined;

    // Video duration check
    if (fileType === 'video') {
      duration = await getVideoDuration(file.path);
      if (duration > 20) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: 'Video duration exceeds 10 seconds' });
      }
      await generateVideoThumbnail(file.path, thumbPath);
    } else {
      await generateImageThumbnail(file.path, thumbPath);
    }

    const onlineId = uuidv4();
    const url = `/uploads/${file.filename}`;
    const thumbUrl = `/uploads/${thumbName}`;

    const newFile = new File({
      title,
      description,
      alignment,
      resolution,
      onlineId,
      url,
      thumbUrl,
      fileType,
      uploadedBy: req.user.id,
      duration,
    });
    await newFile.save();
    res.status(201).json({
      id: newFile._id,
      title,
      description,
      alignment,
      resolution,
      onlineId,
      url,
      thumbUrl,
      duration, // add duration to response
    });
  } catch (err) {
    res.status(500).json({ message: 'File upload error', error: err.message });
  }
};
