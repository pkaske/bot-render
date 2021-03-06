'use strict';

const Renderer = require('./renderer');
const startChromium = require('./chromium');
const express = require('express');

const app = express();

app.get('/', async function(request, response) {
  const head = await new Renderer(request.query.url).extractHead().catch(err => console.error(err));
  response.send(head);
});

app.get('/_ah/health', (request, response) => response.send('OK'));

const port = process.env.PORT || '3000';

// Should respond to _ah/health _ah/start _ah/stop

if (!startChromium()) {
  console.error('Failed to start Chromium');
  return;
}

app.listen(port, function() {
  console.log('Listening on port', port);
});
