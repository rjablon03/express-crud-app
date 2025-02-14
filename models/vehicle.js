class Vehicle {
    constructor(description) {
        this.id = description.id;
        this.make = description.make;
        this.model = description.model;
        this.year = description.year;
        this.needsRepair = description.needsRepair;
    }
}

module.exports = Vehicle