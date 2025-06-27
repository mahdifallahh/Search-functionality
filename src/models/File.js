const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  alignment: { type: String, enum: ['Landscape', 'Portrait', 'Other'], required: true },
  resolution: { type: String, enum: ['HD', 'FullHD', '4K', '8K', 'Other'], required: true },
  onlineId: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  fileType: { type: String, enum: ['image', 'video'], required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedDate: { type: Date, default: Date.now },
  duration: { type: Number }, // in seconds, for videos
}, { timestamps: true });

fileSchema.index({ onlineId: 'text', title: 'text' });

module.exports = mongoose.model('File', fileSchema);
