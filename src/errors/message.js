const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.PROJECT_NOT_FOUND:
      return 'Project is not found';
    case codes.EXCEED_CREATE_VIDEO_PER_DAY:
      return 'Exceeded daily video creation limit';
    case codes.CAMERA_NOT_FOUND:
      return 'Camera is not found';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
