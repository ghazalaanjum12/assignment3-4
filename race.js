/*
    Author: Ghazala Anjum C0905815
    Version: 1.0
    Date: 28-03-2024
    Description: JavaScript file containing a Car class, race simulation function, and race results rendering logic.
*/

// Define a class representing a Car
class Car {
    // Constructor function to initialize car properties
    constructor(brand, model, year, color, price, gas) {
        this.brand = brand; // Brand of the car
        this.model = model; // Model of the car
        this.year = year; // Year of manufacture
        this.color = color; // Color of the car
        this.price = price; // Price of the car
        this.gas = gas; // Gas level of the car
    }

    // Method to make the car honk and display car details
    honk() {
        console.log("Tuut tuut");
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color}, Price: ${this.price}`);
    }

    // Method to simulate gas loss based on car age
    loseGas() {
        const currentYear = new Date().getFullYear();
        let gasLoss = 5; // Default gas loss per turn
        if (this.year !== currentYear) {
            gasLoss += currentYear - this.year; // Additional gas loss for older cars
        }
        this.gas -= gasLoss; // Subtract gas loss from the current gas level
        if (this.gas < 0) {
            this.gas = 0; // Ensure gas level doesn't go below 0
        }
    }
}

// Create instances of Car
const cars = [
    new Car("Honda", "CR-V", 2023, "Red", 50000, 45),
    new Car("Ford", "F-150", 2020, "Black", 25000, 30),
    new Car("BMW", "X5", 2022, "Green", 60000, 65),
    new Car("Mazda", "CX-5", 2019, "White", 15000, 60),
    new Car("Audi", "Q7", 2018, "Silver", 52000, 47),
    new Car("Kia", "Forte", 2020, "Blue", 21000, 56)
];

// Function to simulate a race for given number of turns
function simulateRace(turns) {
    const results = []; // Array to store race results for each turn
    // Loop for each turn
    for (let turn = 1; turn <= turns; turn++) {
        const turnResults = []; // Array to store gas levels of cars for current turn
        // Iterate through each car and simulate gas loss for the turn
        cars.forEach(car => {
            car.loseGas();
            turnResults.push(car.gas); // Add gas level to turn results
        });
        results.push(turnResults); // Add turn results to overall race results
    }
    return results; // Return the race results
}

// Simulate race for 7 turns
const raceResults = simulateRace(7);

// Get the tbody element of the race results table
const tbody = document.querySelector('#race-results tbody');

// Add race results to the HTML table
raceResults.forEach((turnResult, index) => {
    const tr = document.createElement('tr'); // Create a table row for each turn
    const turnTd = document.createElement('td'); // Create a table cell for turn number
    turnTd.textContent = index + 1; // Set the turn number
    tr.appendChild(turnTd); // Append the turn number cell to the row

    // Iterate through gas levels of each car for the turn
    turnResult.forEach(gas => {
        const gasTd = document.createElement('td'); // Create a table cell for gas level
        gasTd.textContent = gas + ' liters'; // Set the gas level text
        tr.appendChild(gasTd); // Append the gas level cell to the row
    });

    tbody.appendChild(tr); // Append the row to the tbody
});
