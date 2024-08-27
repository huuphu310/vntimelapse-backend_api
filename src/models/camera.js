const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const cameraSchema = new mongoose.Schema(
  {
    projectId: { type: ObjectId, ref: 'Project' },
    name: String,
    apiKey: String,
    apiSecret: String,
    sshLink: String,
    active: { type: Boolean, default: true },
    frameTime: {
      startTime: String,
      endTime: String,
    },
    captureTime: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Camera', cameraSchema);
