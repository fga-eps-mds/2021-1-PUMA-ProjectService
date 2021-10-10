const db = require('../../dbconfig/dbConfig');

/*
CREATE TABLE PROJECT (
      projectId SERIAL,
      name varchar(50) NOT NULL,
      problem VARCHAR(100) NOT NULL,
      expectedResult VARCHAR(500) NOT NULL,
      status stats DEFAULT 'Em alocacao' NOT NULL,
      userId SERIAL NOT NULL,
      subjectId SERIAL NOT NULL,
      CONSTRAINT PROJECT_PK PRIMARY KEY (projectId),
      CONSTRAINT PROJECT_COMMON_USER_FK FOREIGN KEY (userId)
        REFERENCES COMMON_USER (userId),
      CONSTRAINT PROJECT_SUBJECT_FK FOREIGN KEY (subjectId)
        REFERENCES SUBJECT (subjectId)
  );
*/

function create(newProject){
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO PROJETO(descricao,concluido,aprovado,agente_externo,disciplina_aloc) VALUES ($1,$2,$3,$4,$5) RETURNING *;', 
                    [newProject.descricao,newProject.concluido,newProject.aprovado,newProject.agente_externo,newProject.disciplina_aloc]
        )
        .then((response) => {
            resolve(response.rows[0].newProjectId);
        })
        .catch((response) => {
            reject(response);
        });
    });
}

module.exports = {
    create
}