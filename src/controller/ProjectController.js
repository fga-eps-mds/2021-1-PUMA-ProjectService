const projectRepository = require('../repository/projectRepository');

function addProject(project) {
  return new Promise((resolve, reject) => {
    try {
      const projectId = projectRepository.addProject(project);
      projectRepository.addProjectKnowledgeAreasRelation(projectId, project.knowledgeareas);
      resolve(projectId);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
}

function addFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const projectId = projectRepository.addFile(file);
      resolve(projectId);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
}

function deleteProject(projectId) {
  return new Promise((resolve, reject) => {
    try {
      const response = projectRepository.deleteProject(projectId);
      resolve(response);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
}

function getKnowledgeAreas() {
  return new Promise((resolve, reject) => {
    try {
      const response = projectRepository.getKnowledgeAreas();
      resolve(response);
    } catch (e) {
      reject(e);
    }
    resolve();
  });
}

module.exports = {
  addProject,
  addFile,
  deleteProject,
  getKnowledgeAreas,
};
