import express from 'express';
import bodyParser from 'body-parser';

import knex from 'knex';
import config from './server/knexfile.js';

import { getSecret } from './AzureKeyVaultAuth.js';

const useKnex = knex(config);

const port = process.env.PORT || 8000;
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    res.send('hello world')
})

app.get('/secret', async function(req, res){
    const value = await getSecret('MySQL-host')
    res.send(value)
})

app.listen(port, function(){
    console.log(`${port}: listening...`)
})




/* Tutorial Code */

// knex allows you to use promises on the query
// app.get('/todos', function(req, res){
//     knex.raw('SELECT * FROM todos').then(function(todos){
//         res.send(todos[0]) // rows is the first value of the returned array ?
//     })
// })

// using shortcuts
// app.get('/todos', function(req, res){
//     knex.select().from('todos').then(function(todos){
//         res.send(todos)
//     })
// })

// single value
// app.get('/todos/:id', function(req, res){
//     knex.raw(`SELECT * FROM todos WHERE id=${req.params.id}`).then((todos) => {
//         res.send(todos[0])
//     })
// })

// singe value - using shortcuts
// app.get('/todos', function(req, res){
//     knex.select().from('todos').where('id', 1).then((todo) => {
//         res.send(todo)
//     })
// })

// insert w. raw sql
// app.post('/todos', function(req, res){
//     knex.raw('INSERT INTO todos(title, user_id) values(?, ?)', ['play sports', '1']).then((todo) => {
//         res.send(todo)
//     })
// })

// insert w. shortcuts
// app.post('/todos', function(req, res){
//     knex('todos').insert({
//         title: "go play some soccer",
//         user_id: 1
//     }).then((result) => res.send(result))
// })

// insert w. params and raw
// app.post('/todos/:id', function(req, res){
//     knex.raw('UPDATE todos SET ' + req.body.field + ' = ? WHERE id = ?', [req.body.value, req.params.id])
// })




