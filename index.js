const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = 3000;

app.get('/', (req, res) => res.send('<h1>Hello!</h1><p>This is the root route for the CIS-371 CRUD Assignment!</p>'));

app.get('/vehicles', (req, res) => res.render("vehicleIndex"));

app.listen(port, () => console.log(`CRUD assignment server listening on port ${port}`));