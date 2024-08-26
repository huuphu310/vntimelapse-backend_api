const mongoose = require('mongoose');
const { ROLE } = require('../constants');

const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    passwordHash: String,
    active: { type: Boolean, default: true },
    role: { type: String, enum: Object.values(ROLE) },
    projectIds: [{ type: ObjectId, ref: 'Project' }],
    setting: Object,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', userSchema);
