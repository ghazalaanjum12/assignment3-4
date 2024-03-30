/*
    Author: Ghazala Anjum C0905815
    Version: 1.0
    Date: 28-03-2024
    Description: JavaScript file containing a Car class, race simulation function, and race results rendering logic.
*/

/**
 * Function to pause execution for a given duration.
 * @param {number} duration Duration in milliseconds to pause.
 */
function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

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

/**
 * Function to simulate a race for given number of turns.
 * @param {number} turns Number of turns for the race.
 */
async function simulateRace(turns) {
    const results = []; // Array to store race results for each turn
    // Loop for each turn
    for (let turn = 1; turn <= turns; turn++) {
        const turnResults = []; // Array to store gas levels of cars for current turn
        // Iterate through each car and simulate gas loss for the turn
        cars.forEach(car => {
            car.loseGas();
            turnResults.push(car); // Add car to turn results
        });
        // Sort cars based on gas level in descending order
        turnResults.sort((a, b) => b.gas - a.gas);
        results.push(turnResults); // Add turn results to overall race results

        await renderRaceResults(results, turn); // Render the race results for the current turn
        if (turn < turns) {
            await delay(2000); // Delay between turns (2000 milliseconds = 2 seconds)
        }
    }
    // Highlight the winner after the race ends
    highlightWinner();
    return results; // Return the race results
}

// Function to render race results for a specific turn
async function renderRaceResults(results, turn) {
    // Get the tbody element of the race results table
    const tbody = document.querySelector('#race-results tbody');
    // Clear the existing table content
    tbody.innerHTML = '';

    // Add race results for the specified turn to the HTML table
    const turnResult = results[turn - 1]; // Get cars for the current turn
    const tr = document.createElement('tr'); // Create a table row for the turn
    const turnTd = document.createElement('td'); // Create a table cell for turn number
    turnTd.textContent = turn; // Set the turn number
    tr.appendChild(turnTd); // Append the turn number cell to the row

    // Iterate through cars for the current turn
    turnResult.forEach(car => {
        const carTd = document.createElement('td'); // Create a table cell for car details
        carTd.textContent = `${car.brand} ${car.model} (${car.gas} liters)`; // Set the car details text
        tr.appendChild(carTd); // Append the car details cell to the row
    });

    tbody.appendChild(tr); // Append the row to the tbody
}

// Function to highlight the winner after the race ends
function highlightWinner() {
    // Find the car with the highest gas level at the end of the race
    const winner = cars.reduce((prev, curr) => (curr.gas > prev.gas) ? curr : prev);

    // Highlight the cell corresponding to the gas level of the winner
    const tbody = document.querySelector('#race-results tbody');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const carCells = row.querySelectorAll('td:not(:first-child)');
        carCells.forEach(cell => {
            if (cell.textContent.startsWith(`${winner.brand} ${winner.model}`)) {
                cell.style.backgroundColor = 'green';
            }
        });
    });
}

// Start the race simulation for 7 turns
simulateRace(7);
