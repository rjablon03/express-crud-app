const db = require("../config/firebase");
const Vehicle = require("../models/vehicle");

class VehicleController {
    async index(req, res) {
        try {
            let snapshot = await db.collection('vehicles').get();
            const vehicles = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            let history = req.cookies.viewedVehicles ? JSON.parse(req.cookies.viewedVehicles) : [];
            let viewedVehicles = [];

            if (history != []) {

                for (let i = 0; i < history.length; i++) {
                    const vehicle = vehicles.find(vehicle => vehicle.id === history[i])
                    viewedVehicles.push(vehicle)
                }
            }

            console.log(vehicles);
            console.log(viewedVehicles)

            res.render('vehicleIndex', { vehicles: vehicles, viewedVehicles: viewedVehicles })
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

        let history = req.cookies.viewedVehicles ? JSON.parse(req.cookies.viewedVehicles) : [];

        history = history.filter(id => id !== vehicle.id);

        history.unshift(vehicle.id);

        if (history.length > 3) {
            history.pop();
        }

        res.cookie("viewedVehicles", JSON.stringify(history), { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

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