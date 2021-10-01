const db = require('../dbconfig/dbConfig');

async function create(project){
    var result = await db.query('INSERT INTO PROJETO(descricao,concluido,aprovado,agente_externo,disciplina_aloc) VALUES ($1,$2,$3,$4,$5) RETURNING *', 
                                [project.descricao,project.concluido,project.aprovado,project.agente_externo,project.disciplina_aloc]);
    let message= 'Erro na criacao do projeto';

    if (result.affectedRows){
        message = 'Projeto criado com sucesso'
    }
    
    return {message};

}

module.exports = {
    create
}