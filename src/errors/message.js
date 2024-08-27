const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.USER_NOT_ACTIVE:
      return 'User is not active';
    case codes.CREDENTIAL_INVALID:
      return 'Credential is invalid';
    case codes.PASSWORD_INVALID:
      return 'Password is invalid'
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
