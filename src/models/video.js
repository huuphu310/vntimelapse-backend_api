const mongoose = require('mongoose');
const { VIDEO_STATUS } = require('../constants');

const { ObjectId } = mongoose.Types;

const videoSchema = new mongoose.Schema(
  {
    projectId: ObjectId,
    projectName: String,
    cameraId: ObjectId,
    cameraName: String,
    uploadTime: Date,
    videoUrl: String,
    status: {
      type: String,
      enum: Object.values(VIDEO_STATUS),
      default: VIDEO_STATUS.PROCESSING,
    },
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Video', videoSchema);
