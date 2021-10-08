const db = require('../dbconfig/dbConfig');

async function create(project) {
    var result = await db.query('INSERT INTO PROJECT(name,problem,expectedresult,knowledgearea,status,userid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [project.name,project.problem,project.expectedresult,project.knowledgearea,project.status, project.userid]);
    // let message;
    // if (result.affectedRows){
    //     message = 'Projeto criado com sucesso';
    // } else {
    //     message= 'Erro na criacao do projeto';
    // }
    return {result};
}

async function getProject(idProjeto) {
    var result  = db.query('SELECT p.name, p.problem,p.expectedresult,p.status,p.knowledgearea FROM PROJETO as p WHERE id=$1', [idProjeto]).then(response =>{
        return response.rows
    })
    // let message;
    // if (result.affectedRows){
    //     message = 'Projeto criado com sucesso';
    // } else {
    //     message= 'Erro na criacao do projeto';
    // }
}

module.exports = {
    create,
    getProject
}