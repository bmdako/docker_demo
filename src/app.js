var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/{name*}',
  handler: function (request, reply) {
    reply('Hello, ' + (process.env.USERNAME ? process.env.USERNAME :
      request.params.name ? encodeURIComponent(request.params.name) : 'world') + '!');
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});