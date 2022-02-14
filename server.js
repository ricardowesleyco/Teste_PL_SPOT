const bodyParser = require("body-parser");
const express = require('express');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Controller = require('./controllers/Controller')

app.get('/',(req,res)=>{res.send({message:'Hello'})})

app.get('/coordenadas/:lat/:lon',Controller.buscarPorCoordenadas)

app.get('/cidade/:cidade',Controller.buscarPorCidade)

app.get('/playlist',Controller.buscarPlaylist)

const PORT = 8093
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})