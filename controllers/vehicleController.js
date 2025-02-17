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
            await db.collection('vehicles').add({...newVehicle});

            res.writeHead(302, {'Location': '/vehicles'}); 
            res.end();
        }
        catch (err) {
            console.log(err)
        }
    };

    async vehicleInfo(req, res) {
        const id = req.params.id;
        const doc = await db.collection('vehicles').doc(id).get();
        const vehicle = new Vehicle(doc.data());
        vehicle.id = id;

        res.render('vehicleInfo', {vehicle});
    }

    async edit(req, res) {
        const id = req.params.id;
        const doc = await db.collection('vehicles').doc(id).get();
        const vehicle = new Vehicle(doc.data());
        vehicle.id = id;

        res.render('vehicleEditor', {vehicle});
    }

    async update(req, res) {
        try {
            const vehicle = new Vehicle(req.body);
            await db.collection('vehicles').doc(req.params.id).set({...vehicle}, {merge: true});

            res.writeHead(302, {'Location': '/vehicles'}); 
            res.end();
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = VehicleController;