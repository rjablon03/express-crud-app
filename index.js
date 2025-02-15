const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const VehicleController = require('./controllers/vehicleController')
const vehicleController = new VehicleController();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('<h1>Hello!</h1><p>This is the root route for the CIS-371 CRUD Assignment!</p>'));

app.get('/vehicles', (req, res) => res.render('vehicleIndex'));

app.get('/vehicles/addVehicle', (req, res) => {
    console.log('Making new vehicle');
    vehicleController.newVehicle(req, res);
});

app.post('/vehicle', (req, res) => {
    vehicleController.create(req, res);
})

app.listen(port, () => console.log(`CRUD assignment server listening on port ${port}`));