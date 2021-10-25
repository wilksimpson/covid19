//Modulos usados
const { Client } = require('pg')
const express = require('express')
const app = express()
const axios = require('axios')
var database = require("./database") //Conexão do banco de dados

/*/
    API Consumer { Dados sobre casos e mortes de covid-19 no Brasil. } 
/*/

//Parametros dos modulos
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 8001


app.get('/check_casos', async (req, res) => {
    var session_url = 'https://api.brasil.io/v1/dataset/covid19/caso_full/data/?format=json&page_size=10000&date=';
    var keyToken = 'f18a51bf9232b34154b05f9be9236fbf1b6437fa';
    var n = 1;
    var NextPG;
    var _results;
    session_url += '2021-10-23';


    await axios.get(session_url, { headers: { Authorization: `token ${keyToken}` } })
        .then(res => {
            NextPG = res.data.next
            _results = res.data.results
            console.log("Gravando Dados pg: " + n)
            GravaCases(_results)

        })
        .catch(error => {
            console.error(error)
        })
    while (NextPG !== null) {
        await axios.get(NextPG, { headers: { Authorization: `token ${keyToken}` } })
            .then(res => {
                n = n + 1
                NextPG = res.data.next
                _results = res.data.results
                console.log("Gravando Dados pg: " + n)
                GravaCases(_results)
            })
            .catch(error => {
                console.error(error)
            })
    }
    res.json(_results)

})

//porta de escuta node.js
app.listen(port, () => {
    //console.log(NextPG)
    console.log(`example app listening at http:localhost:${port}`)
})


function GravaCases(_results) {
    //condicional caso o data retorne alguma informação
    if (_results !== null) {


        for (let i = 0; i < _results.length; i++) {

            if (_results[i].is_repeated !== 'true') {
                var dados = {
                    city: _results[i].city,
                    city_ibge_code: _results[i].city_ibge_code,
                    date_registro: _results[i].date,
                    epidemiological_week: _results[i].epidemiological_week,
                    estimated_population: _results[i].estimated_population,
                    last_available_date: _results[i].last_available_date,
                    taxa_mortalidade: _results[i].last_available_death_rate,
                    new_confirmed: _results[i].new_confirmed,
                    new_deaths: _results[i].new_deaths,
                    order_for_place: _results[i].order_for_place,
                    place_type: _results[i].place_type,
                    estado: _results[i].state
                }
            }
            database.insert(dados).into("casos_full").then(dados => {
                //console.log("Gravando dados"); 
            }).catch(err => {
                console.log(err);
            });
        }

    }
}