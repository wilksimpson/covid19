//const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

//app.use(cors())

app.get('/', async(req, res) => {
    var session_url = 'https://imunizacao-es.saude.gov.br/_search?scroll=1m';
    var user1 = 'imunizacao_public';
    var pass = 'qlto5t&7r_@+#Tlstigi';



    try {
    // response é a resposta do axios, mas eu tiro o data de dentro da response 
    const {data} = await axios.post(session_url, {
        "size": 10000
       }, {
        auth: {
          username: user1,
          password: pass
        }
      })

           
     return res.json(data)
        
    } catch (error) {
        console.error(error)
    }

    
})
