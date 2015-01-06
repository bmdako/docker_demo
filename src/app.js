var Hapi = require('hapi');

var server = new Hapi.Server(),
    username = process.env.USERNAME;

server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, ' + (username !== undefined ? username : 'world') + '!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + (username !== undefined ? username : encodeURIComponent(request.params.name)) + '!');
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});