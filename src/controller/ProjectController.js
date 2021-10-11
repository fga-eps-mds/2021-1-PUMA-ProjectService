const Project = require('../models/Project');

const projectRepository = require('../repository/projectRepository');

function addProject(project) {
    return new Promise(async (resolve, reject) => {
        try {
            const projectId =  await projectRepository.addProject(project);
             await projectRepository.addProjectKnowledgeAreasRelation(projectId, project.knowledgeareas);
             resolve(projectId);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

function addFile(file) {
    return new Promise(async (resolve, reject) => {
        console.log(file);
        try {
            const projectId =  await projectRepository.addFile(file);
            resolve(projectId);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

function deleteProject(projectId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response =  await projectRepository.deleteProject(projectId);
            resolve(response);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

function getKnowledgeAreas() {
    return new Promise(async (resolve, reject) => {
        try {
            const response =  await projectRepository.getKnowledgeAreas();
            resolve(response);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}
module.exports = { addProject, addFile, deleteProject, getKnowledgeAreas }