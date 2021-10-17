const db = require('../../dbconfig/dbConfig');

function addProject(project) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO PROJECT(name,problem,expectedresult,status,userid,subjectid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [project.name, project.problem, project.expectedresult, project.status, project.userid, project.subjectid]
        ).then((response) => {
            resolve(response.rows[0].projectid);
        }).catch((response) => {
            reject(response);
        });
    });
}

function addFile(file) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO FILE(filename,bytecontent,projectid) VALUES ($1,$2,$3) RETURNING *',
            [file.filename, file.bytecontent, file.projectid]
        ).then((response) => {
            resolve(response.rows[0].fileid);
        }).catch((response) => {
                console.log(response);
                reject(response);
        });
    });
}

function retriveProjects() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM PROJECT')
            .then((response) => {
            resolve(response.rows)
        }).catch((response) => {
            reject(response);
        });
    });
}

function retriveProject(projectid) {
    return new Promise((resolve,reject) => {
        db.query(
            'SELECT p.name, p.problem,p.expectedresult,p.status FROM PROJECT as p WHERE projectid=$1',
            [projectid]
        )
            .then((response) => {
                resolve(response.rows);
             })
            .catch((response) => {
            reject(response);
        });
    });
}

function deleteProject(projectId) {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM PROJECT WHERE projectid = $1 RETURNING *',
            [projectId]
        ).then((response) => {
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    });
}

function getKnowledgeAreas() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM KNOWLEDGE_AREA',
        ).then((response) => {
            resolve(response.rows);
        }).catch((response) => {
            reject(response);
        });
    });
}

function addProjectKnowledgeAreasRelation(projectId, knowledgeAreas) {
    const areas = [];
    knowledgeAreas.forEach((area) => {
        areas.push([area.knoledgeareaid, projectId]);
    });
    return new Promise((resolve, reject) => {
        areas.forEach((area) => {
            db.query(
                'INSERT INTO HAS (knoledgeareaid, projectid) VALUES ($1,$2) ', [area[0],area[1]]
            ).then((response) => {
                resolve(response.rows);
            }).catch((response) => {
                reject(response);
            });
        });
    });
}

module.exports = {
    addProject,
    retriveProjects,
    retriveProject,
    addFile,
    deleteProject,
    getKnowledgeAreas,
    addProjectKnowledgeAreasRelation
};
