const express = require('express');
const app = express()
const bodyParser = require('body-parser')

const ajouterArticle = require("./database/mongoose.js").ajouterArticle
const obtenirArticles = require("./database/mongoose.js").obtenirArticles

app.use(bodyParser.json())

app.post('/ajouterArticle', async(req,res)=> {
    try {
        const respond = await ajouterArticle(req.body)
        res.status(200).send(respond)
    } catch(e) {
        res.send(e)
    }
})


app.get('/obtenirLesArticles', async(req,res)=> {
    try {
        const respond = await obtenirArticles()
        res.status(200).send(respond)
    } catch(e) {
        res.send(e)
    }
})






app.listen(1000,console.log('listening at port 1000'))