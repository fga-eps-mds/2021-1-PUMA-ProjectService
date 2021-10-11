const projectRepository = require("../repository/projectRepository");

function register(newProject){
    return new Promise(async (resolve, reject) => {
        try {
            const projectId = await projectRepository.create(newProject);
        } catch (error) {
            reject(error);
        }
        resolve();
    });
}

function getKnowledgeAreas() {
    return new Promise(async (resolve, reject) => {
        try {
            await projectRepository.getKnowledgeAreas();
        } catch (error) {
            reject(error);
        }
        resolve();
    });
}

module.exports = {
    register, getKnowledgeAreas
};