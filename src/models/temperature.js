const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const temperatureSchema = new mongoose.Schema(
  {
    cameraId: ObjectId,
    cameraName: String,
    temperature: Number,
    humidity: Number,
    updated: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Temperature', temperatureSchema);
