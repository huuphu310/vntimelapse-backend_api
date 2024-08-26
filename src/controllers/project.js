const projectService = require('../services/project');

const getProjects = async (req, res) => {
  const result = await projectService.getProjects(req.query, req.user);
  return res.send({ status: 1, result });
};

const getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await projectService.getProject(projectId);
  return res.send({ status: 1, result: project });
};

const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body);
  return res.send({ status: 1, result: project });
};

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await projectService.updateProject(projectId, req.body);
  return res.send({ status: 1, result: project });
};

module.exports = { getProjects, getProject, createProject, updateProject };
