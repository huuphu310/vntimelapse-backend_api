const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const videoSchema = new mongoose.Schema(
  {
    projectId: ObjectId,
    projectName: String,
    cameraId: ObjectId,
    cameraName: String,
    uploadTime: Date,
    videoUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Video', videoSchema);
