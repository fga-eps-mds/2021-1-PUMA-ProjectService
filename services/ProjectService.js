const db = require('../dbconfig/dbConfig');

async function create(project) {
    console.log(project.file);
    var result = await db.query('INSERT INTO PROJECT(name,problem,expectedresult,knowledgearea,status,userid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [project.name,project.problem,project.expectedresult,project.knowledgearea,project.status, project.userid]);
    let message;
    console.log(result);
    if (result.affectedRows){
        message = 'Projeto criado com sucesso';
    } else {
        message= 'Erro na criacao do projeto';
    }
    return {message};
}

async function getProject() {
    return null;
}

module.exports = {
    create
}