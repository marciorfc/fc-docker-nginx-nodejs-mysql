const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
let connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Márcio')`
connection.query(sql)
connection.end()


app.get('/', async (req, res) => {
    connection = mysql.createConnection(config);

    let output = '<h1>Full Cycle Rocks!</h1>';
    connection.query('SELECT name from people', function(err, results, fields) {
        if (err) throw err;
        results.forEach( (row) => {
            output += '<ul>'
            output += `<li>${row.name}</li>`
            output += '</ul>'
        })    
        res.send(output)     
    })
    connection.end()
})

app.listen(port, () => console.log('Rodando na porta ', port));