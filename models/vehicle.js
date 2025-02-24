class Vehicle {
    constructor(description) {
        if (description){
            this.id = description.id;
            this.make = description.make;
            this.model = description.model;
            this.year = parseInt(description.year);
            this.bodyStyle = description.bodyStyle
            this.mileage = parseInt(description.mileage);
            this.cityMPG = parseInt(description.cityMPG);
            this.highwayMPG = parseInt(description.highwayMPG);
        }
        this.errors = []
    }

    checkVehicle() {
        this.errors = []

        if (this.year <= 0) {
            this.errors.push('Year cannot be zero or negative');
        }
        if (this.mileage < 0) {
            this.errors.push('Mileage cannot be negative');
        }
        if (this.cityMPG <= 0) {
            this.errors.push('City MPG cannot be zero or negative');
        }
        if (this.highwayMPG <= 0) {
            this.errors.push('Highway MPG cannot be zero or null')
        }

        return this.errors.length === 0;
    }
}

module.exports = Vehicle