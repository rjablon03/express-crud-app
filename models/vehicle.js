class Vehicle {
    constructor(description) {
        if (description){
            this.id = description.id;
            this.make = description.make;
            this.model = description.model;
            this.year = parseInt(description.year);
            this.bodyStyle = description.bodyStyle
            this.mileage = parseInt(description.mileage);
            this.mpg = description.mpg
        }
    }
}

module.exports = Vehicle