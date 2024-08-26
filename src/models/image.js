const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const imageSchema = new mongoose.Schema(
  {
    projectId: ObjectId,
    projectName: String,
    cameraId: ObjectId,
    cameraName: String,
    uploadTime: Date,
    imageUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Image', imageSchema);
