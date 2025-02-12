const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('<h1>Hello!</h1><p>This is the root route for the CIS-371 CRUD Assignment!</p>'));

app.get('/vehicles', (req, res) => res.sendFile(path.join(__dirname, 'views', 'test.html')));

app.listen(port, () => console.log(`CRUD assignment server listening on port ${port}`));