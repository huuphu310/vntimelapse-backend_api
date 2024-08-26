const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const {
  getProjectsValidate,
  getProjectValidate,
  createProjectValidate,
  updateProjectValidate,
} = require('../validations/project');
const projectController = require('../controllers/project');

/* eslint-disable prettier/prettier */
router.get('/projects', auth, getProjectsValidate, asyncMiddleware(projectController.getProjects));
router.get('/projects/:projectId', auth, getProjectValidate, asyncMiddleware(projectController.getProject));
router.post('/projects', auth, createProjectValidate, asyncMiddleware(projectController.createProject));
router.put('/projects/:projectId', auth, updateProjectValidate, asyncMiddleware(projectController.updateProject));
/* eslint-enable prettier/prettier */

module.exports = router;
