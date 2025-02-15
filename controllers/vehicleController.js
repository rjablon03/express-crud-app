const db = require("../config/firebase");
const Vehicle = require("../models/vehicle");

class VehicleController {
    async index(req, res) {
        try {
            let snapshot = await db.collection('vehicles').get();
            let documents = [];

            snapshot.forEach((doc) => {
                documents.push(new Vehicle(doc.data()));
            })

            res.render('vehicleIndex', { vehicles: documents })
        }
        catch (err) {
            console.log(err);
        }
    }

    newVehicle(req, res) {
        res.render('addVehicle', {vehicle: new Vehicle()})
    }

    async create(req, res) {
        try {
            const mpg = {'city': req.body.city, 'highway': req.body.highway};
            req.body.mpg = mpg;
            delete req.body.city;
            delete req.body.highway;

            const newVehicle = new Vehicle(req.body);

            console.log('Adding the following vehicle object to the database');
            console.log(req.body);
            const docRef = await db.collection('vehicles').add({...newVehicle});

            res.writeHead(302, {'Location': '/vehicles'}); // Left off here, need to route to newVehicle info or home page
            res.end();
        }
        catch (err) {
            console.log(err)
        }
    };
}

module.exports = VehicleController;