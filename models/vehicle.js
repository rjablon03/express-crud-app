class Vehicle {
    constructor(description) {
        if (description){
            this.id = description.id;
            this.make = description.make;
            this.model = description.model;
            this.year = parseInt(description.year);
            this.mileage = parseInt(description.mileage);
            this.needsRepair = description.needsRepair == 'True' ? true : false;
        }
    }
}

module.exports = Vehicle