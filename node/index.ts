const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000 ;
const configDb = {
host:"db",
user:"root",
password: 'root',
database: "nodedb"
}

app.get("/",(req,res)=>{
  
  const callback = getnomes((data)=>{
    
  res.send(`
          <h1>Full Cycle Rocks!</h1>
          <ol>`
          +data+
          `</ol>`)  
  });
 
});

function getnomes(callback){
  const connect = mysql.createConnection(configDb); 
  const sql = "INSERT INTO PEOPLE (nome) VALUES('Gabriel')"
  connect.query(sql);
  const sqldata = "SELECT * FROM PEOPLE"
  const data = connect.query(sqldata,function(err,result,fields){
    var dados = result.map( (row) => {
     return   `<li>${row.nome}</li>`;
    });
    return callback(dados)
  }
  )
  connect.end();

}

app.listen(port,()=>{
console.log("Start app at port "+port)
});
