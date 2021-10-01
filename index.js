var database = require("./database")

var dados = [
    {nome: "Call of duty",
    preco: 60
},
{
    nome: "GTA",
    preco: 60
},
{
    nome: "WOW",
    preco: 120
}
]

var query = database.insert(dados).into("games").then(data => {
   console.log(data); 
}).catch(err => {
    console.log(err);
});

console.log(query.toQuery());
