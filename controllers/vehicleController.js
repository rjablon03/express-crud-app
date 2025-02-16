const db = require("../config/firebase");
const Vehicle = require("../models/vehicle");

class VehicleController {
    async index(req, res) {
        try {
            let snapshot = await db.collection('vehicles').get();
            const vehicles = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

            res.render('vehicleIndex', { vehicles: vehicles })
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
            const mpg = {'city': parseInt(req.body.city), 'highway': parseInt(req.body.highway)};
            req.body.mpg = mpg;
            delete req.body.city;
            delete req.body.highway;

            const newVehicle = new Vehicle(req.body);

            console.log('Adding the following vehicle object to the database');
            console.log(req.body);
            const docRef = await db.collection('vehicles').add({...newVehicle});

            res.writeHead(302, {'Location': '/vehicles'}); 
            res.end();
        }
        catch (err) {
            console.log(err)
        }
    };

    async vehicleInfo(req, res) {
        const id = req.params.id;
        const vehicle = await db.collection('vehicles').doc(id).get();

        res.render('vehicleInfo', { vehicle: vehicle.data()});
    }

    async update(req, res) {
        try {
            const vehicle = new Vehicle(req.body);
            await db.collection('vehicles').doc(id).set(...vehicle, {merge: true});
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = VehicleController;