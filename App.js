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



//Rota get Montando API com axios
app.get('/check', async(req, res) => {
    var session_url = 'https://imunizacao-es.saude.gov.br/_search?scroll=1m';
    var session_url2 = 'https://imunizacao-es.saude.gov.br/_search/scroll';
     var user1 = 'imunizacao_public';
     var pass = 'qlto5t&7r_@+#Tlstigi';
     var n = 0;   

     do
     try {
     // response é a resposta do axios, mas eu tiro o data de dentro da response 
     const {data} = await axios.post(session_url, {
         "size": 100
        }, {
         auth: {
           username: user1,
           password: pass
         }
     })

     //retorno das info
     res.json(data)
     const scroll_id_ = data._scroll_id
     const vacs = data.hits.hits
     //console.log(data)
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
                   // console.log(dados); 
                 }).catch(err => {
                     console.log(err);
                 });
             }   

          }

     }
     // tratamento de erro
     catch (error) {
         console.error(error)
     }
while (n < 5);     
try {
    // response é a resposta do axios, mas eu tiro o data de dentro da response 
    const {data} = await axios.post(session_url2, {
        "size": 100,       	
        "scroll_id": scroll_id_,
        "scroll": "1m"
       }, {
        auth: {
          username: user1,
          password: pass
        }
    })

 
    //retorno das info
    res.json(data)
    const scroll_id_ = data._scroll_id
    const vacs = data.hits.hits
    //console.log(data)
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
                  // console.log(dados); 
                }).catch(err => {
                    console.log(err);
                });
            }   

         }

    }
    // tratamento de erro
    catch (error) {
        console.error(error)
    }
})



//porta de escuta node.js
app.listen(port, () => {
    // client.connect()
     console.log(`example app listening at http:localhost:${port}`)
 })