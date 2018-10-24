'use strict';

const discordClient = require('../server/discordClient');
const config = require('../config/config');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);


const witClient = require('../server/witClient')(config.witToken);

const client = discordClient.init('debug', witClient);
client.login(config.botToken);


server.listen(3000);

server.on('listening', () => {
    console.log(`Listening on port ${server.address().port} in ${service.get('env')}`);
})