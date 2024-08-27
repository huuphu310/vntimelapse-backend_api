const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const powerSchema = new mongoose.Schema(
  {
    cameraId: ObjectId,
    cameraName: String,
    voltage: Number,
    power: Number,
    updated: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Power', powerSchema);
