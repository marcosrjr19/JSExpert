const BaseRepository = require('../repository/base/baseRepository');

const tax = require('../entities/tax');

class CarService {
    constructor({ cars }){
        this.carRepository = new BaseRepository({ file : cars})
        this.taxBasedOnAge = tax.taxesBasedOnAge;
    
        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style : 'currency',
            currency : 'BRL',
        });
    }

    async getAvailableCar(carCategory){

        const carId = this.chooseRandomCar(carCategory);
        return await this.carRepository.find(carId);
    }

    chooseRandomCar(carCategory){
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);

        const carId = carCategory.carIds[randomCarIndex];

        return carId;
    }

    getRandomPositionFromArray(list){

        const listLength = list.length;

        return Math.floor(Math.random() * (listLength))
    }

    calculateFinalPrice(customer,carCategory,numberOfDays){

        const { age } = customer;
        const { price } = carCategory;
        const { then: tax } = this.taxBasedOnAge.find( tax => age >= tax.from && age <= tax.to);

        const finalPrice = ((tax * price) * (numberOfDays));

        const formattedPrice = this.currencyFormat.format(finalPrice);

        return formattedPrice
    }
}

module.exports = CarService;