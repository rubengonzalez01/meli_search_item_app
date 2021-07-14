let express = require('express');

// en caso de requerir validacion de datos
let midd = require('./middleware');
// servicio que pega contra la api de MeLi
let service = require('./api_service');

let serviceApi = new service.Service();

const PORT = 3000;



let server = express();
server.listen(PORT, () => console.log('Server started in port ' + PORT));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.get('/items/:keyword', function(req, res){ serviceApi.getItems(req, res) });

server.post('/items/description', function(req, res){ serviceApi.getItemDescription(req, res) });

// Efectua una busqueda en base al keyword proporcionado
server.get("/users/:keyword", function(req, res){ console.log('HELLOMOTO!') });