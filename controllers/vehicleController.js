const db = require("../config/firebase");
const Vehicle = require("../models/vehicle");

class VehicleController {
    newVehicle(req, res) {
        res.render('addVehicle', {vehicle: new Vehicle()})
    }

    async create(req, res) {
        console.log('Adding Vehicle');

        try {
            const newVehicle = new Vehicle(req.body);

            console.log('REQBODY STARTS HERE')
            console.log(req.body)
            console.log('REQBODY ENDS HERE')
            const docRef = await db.collection('vehicles').add({...newVehicle});

            res.writeHead(302, {'Location': '/views/vehicle'});
            res.end();
        }
        catch (err) {
            console.log(err)
        }
    };
}

module.exports = VehicleController;