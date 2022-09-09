// schema MySql
// CREATE SCHEMA `innovatalk` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci ;
// Create table
/* CREATE TABLE `clientes` (
  `id` int NOT NULL,
  `nome` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `telefone` varchar(15) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const db = mysql.createPool({
    host: process.env.DB_URL || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Su200118$",
    database: process.env.DB_NAME || "innovatalk"
});

//console.log("Aqui " + process.env.DB_PASSWORD);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Caso de erro de autorização
Execute the following query in MYSQL Workbench

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:

flush privileges;
*/


/* Script de criação da table
CREATE TABLE `clientes` (
  `id` int NOT NULL,
  `nome` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `telefone` varchar(15) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
*/

app.get('/db', (req, res)=> {
    const sqlInsert = "INSERT INTO clientes (id, nome, telefone) VALUES (2,'Serginho Gama', '11-99999-9999');"
    db.query(sqlInsert, (err,result)=> {
        res.send(result);
        console.log(result);
    })
});

app.get('/db/get', (req, res)=> {

    const sqlInsert = "SELECT * FROM clientes;";
    db.query(sqlInsert, (err,result)=> {
        res.send(result);
        console.log(err ? err : result);
    })
    
});

app.post('/db/insert', (req, res)=> {

    const id = req.body.id;
    const nome = req.body.nome;
    const telefone = req.body.telefone;

    const sqlInsert = "INSERT INTO clientes (id, nome, telefone) VALUES (?,?,?);"
    db.query(sqlInsert, [id, nome, telefone], (err,result)=> {
        console.log(err ? err : result);
    })

});

app.delete('/db/delete/:id', (req, res)=> {
    const id = req.params.id;

    const sqlDelete = "DELETE FROM clientes WHERE id = ?;";
    db.query(sqlDelete, id, (err,result)=> {
        res.send(result);
        console.log(err ? err : result);
    })
    
});

app.put('/db/update', (req, res)=> {
    const id = req.body.id;
    const telefone = req.body.telefone;

    const sqlUpdate = "UPDATE clientes SET telefone = ? WHERE id = ?;";
    db.query(sqlUpdate, [telefone,id], (err,result)=> {
        res.send(result);
        console.log(err ? err : result);
    })
    
});

app.get('/', (req, res)=> {
    res.send("Hello World");
})

app.get('/nome', (req, res)=> {
    res.send("This is Sergio Gama " + process.env.DB_URL);
    //console.log("Aqui: " + process.env.DB_PASSWORD);
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`running on port ${PORT}`);
//    console.log("running!!");
});

/*
app.listen(3001, () => {
    console.log("running on port 3001");
});
*/

