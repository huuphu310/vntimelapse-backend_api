const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const projectSchema = new mongoose.Schema(
  {
    name: String,
    ownerId: { type: ObjectId, ref: 'User' },
    active: { type: Boolean, default: true },
    cameras: [Object],
    duration: Number,
    videosPerDay: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Project', projectSchema);
