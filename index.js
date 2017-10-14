'use strict'

const server = require('./lib/server.js');

server.server.listen(3000, () => {
  console.log('Server running :: 3000');
});