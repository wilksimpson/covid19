//Modulos usados
const {Client} = require('pg')
const express = require('express')
const app = express()
const axios = require('axios')
var database = require("./database") //Conexão do banco de dados


//Parametros dos modulos
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const port = 8000


app.get('/check', async(req, res) => {
    var session_url = 'https://imunizacao-es.saude.gov.br/_search?scroll=1m';
    var session_url2 = 'https://imunizacao-es.saude.gov.br/_search/scroll';
    var user1 = 'imunizacao_public';
    var pass = 'qlto5t&7r_@+#Tlstigi';
    var n = 1;
    var scrollId;
    var vacs;
    var hits;
    var UF = 'PA';
   
   // await axios.post(session_url,{ "size": 10000, "query": {"match": {"vacina_dataAplicacao":"2021-10-06T00:00:00.000Z"}}}, {auth: {username: user1,password: pass}})
    await axios.post(session_url,{ "size": 10000, "query": {"match": {"paciente_endereco_uf":UF}}}, {auth: {username: user1,password: pass}})
        .then(res => {
            scrollId = res.data._scroll_id
            vacs = res.data.hits.hits
            hits = res.data.hits
            console.log("Gravando Dados pg: "+n)
            GravaVacs(vacs)
           
        })
        .catch(error =>{
            console.error(error)
        })
    while(vacs !== null){   
        await axios.post(session_url2,{ "scroll_id": scrollId,"scroll": "1m"}, {auth: {username: user1,password: pass}})
        .then(res => {
            n=n+1
            scrollId = res.data._scroll_id
            vacs = res.data.hits.hits
            hits = res.data.hits
            console.log("Gravando Dados pg: "+n)
            GravaVacs(vacs)
        })
        .catch(error =>{
            console.error(error)
        })
    }
    res.json("Concluído! Foram recebidos: "+n*10000)

})

//porta de escuta node.js
app.listen(port, () => {
    // client.connect()
     console.log(`example app listening at http:localhost:${port}`)
 })


 function GravaVacs(vacs){
     //condicional caso o data retorne alguma informação
     if (vacs !== null) {
			  
				
        for(let i = 0; i < vacs.length; i++){
           
           var dados = {
               document_id: vacs[i]._id,
               paciente_id: vacs[i]._source.paciente_id,               
               paciente_idade: vacs[i]._source.paciente_idade,              
               paciente_nascimento: vacs[i]._source.paciente_dataNascimento,          
               paciente_sexo:  vacs[i]._source.paciente_enumSexoBiologico,                  
               paciente_racacor_codigo:  vacs[i]._source.paciente_racaCor_codigo,   
               paciente_racacor_valor:  vacs[i]._source.paciente_racaCor_valor,    
               paciente_end_codibge:  vacs[i]._source.paciente_endereco_coIbgeMunicipio,      
               paciente_end_codpais:  vacs[i]._source.paciente_endereco_coPais,      
               paciente_end_nomemunicipio:  vacs[i]._source.paciente_endereco_nmMunicipio,   
               paciente_end_uf:  vacs[i]._source.paciente_endereco_uf,           
               paciente_end_cep:  vacs[i]._source.paciente_endereco_cep,               
               vacina_grupo_atend_cod:  vacs[i]._source.vacina_grupoAtendimento_codigo,    
               vacina_grupo_atend_nome:  vacs[i]._source.vacina_grupoAtendimento_nome,   
               vacina_categoria_cod:  vacs[i]._source.vacina_categoria_codigo,      
               vacina_categoria_nome:  vacs[i]._source.vacina_categoria_nome,     
               vacina_lote:  vacs[i]._source.vacina_lote,               
               vacina_fabricante_nome:  vacs[i]._source.vacina_fabricante_nome,    
               vacina_aplicacao:  vacs[i]._source.vacina_dataAplicacao,          
               vacina_dose:  vacs[i]._source.vacina_descricao_dose,               
               vacina_nome:  vacs[i]._source.vacina_nome,               
               sistema_origem:  vacs[i]._source.sistema_origem           
           }

           database.insert(dados).into("vaccination").then(dados => {
               //console.log("Gravando dados"); 
            }).catch(err => {
                console.log(err);
            });
        }   

     }
 }