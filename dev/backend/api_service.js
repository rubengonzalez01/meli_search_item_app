const { response, json } = require("express");
const fetch = require('node-fetch');
const QUANTITY = 4;

class Service{
    
    constructor(){
        this.results = {
            header:{},
            data: []
        }

    }

    // funcion para obtener los items desde la api de Meli
    async getItems(req, res){
        let { keyword } = req.params;
        
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${keyword}`;        
        console.log(url)

        await fetch(url)
        .then( response => response.json())
        .then( content => {
            console.log('contenido: ', content)
            for (let index = 0; index < QUANTITY; index++) {
                this.results.data.push(content.results[index]);                
            }
        })
        .catch( err => { console.err('Error ' + err)});
        
        res.status(200).json(this.results);
    }


    async getItemDescription(req, res){
        let { itemId } = req.body

        const url = `https://api.mercadolibre.com/items/${itemId}/description`;

        await fetch(url)
        .then( response => response.json())
        .then( content => {
            console.log('content', content)
            let description = {
                plain_text: content.plain_text
            }
            this.results.data.push(description);
        })
        .catch( err => { console.err('Error ' + err)});

        res.status(200).json(this.results);
    }
}

module.exports = { Service };