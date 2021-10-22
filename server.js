const PORT = 5000;

//inport the path
const path = require('path');
// import json-server
const jsonServer = require('json-server');
//create server
const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, 'db.json'));

//middlewares will give info about server
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);
server.listen(PORT, () => console.log(`Json sever is running on port ${PORT}`));

