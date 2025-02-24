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
            const newVehicle = new Vehicle(req.body);

            console.log('Adding the following vehicle object to the database');
            console.log(req.body);

            if (!newVehicle.checkVehicle()) {
                res.render('addVehicle', { vehicle: newVehicle })
                return
            }

            delete newVehicle.errors;
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

        res.render('vehicleEditor', {vehicle: vehicle});
    }

    async update(req, res) {
        try {
            const id = req.params.id
            const vehicle = new Vehicle(req.body);
            vehicle.id = id;

            if (!vehicle.checkVehicle()) {
                res.render('vehicleEditor', {vehicle: vehicle})
                res.end();
            }

            await db.collection('vehicles').doc(id).set({...vehicle}, {merge: true});

            console.log(`Vehicle '${id}' has been updated with the following information`)
            console.log(req.body);

            res.writeHead(302, {'Location': '/vehicles'}); 
            res.end();
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteVehicle(req, res) {
        try {
            const id = req.params.id;
            await db.collection('vehicles').doc(id).delete();
            console.log(`Vehicle '${id}' has been deleted\n`)
            
            res.writeHead(302, {'Location': '/vehicles'}); 
            res.end();
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = VehicleController;