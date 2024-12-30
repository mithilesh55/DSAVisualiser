// Define the hash functions with their formulas
const hashFunctions = [
    { name: 'Modulus Hash Function', formula: 'hash = key % 7', func: key => key % 7 },
    { name: 'Division Method', formula: 'hash = key % tableSize', func: key => key % 7 },
    { name: 'Multiplication Method', formula: 'hash = floor(tableSize * ((key * A) % 1))', func: key => Math.floor(7 * ((key * 0.6180339887) % 1)) },
    { name: 'Mid-Square Method', formula: 'hash = middle two digits of key^2', func: key => Math.floor((key * key) / 100) % 7 },
    { name: 'Folding Method', formula: 'hash = sum of segments', func: key => key.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0) % 7 },
    { name: 'Universal Hashing', formula: 'hash = (a * key + b) mod p mod tableSize', func: key => (Math.floor(Math.random() * 10) * key + Math.floor(Math.random() * 10)) % 7 },
    { name: 'Perfect Hashing', formula: 'hash = computed based on key', func: key => key % 7 },
    { name: 'Multiplicative Hash Function', formula: 'hash = floor(7 * ((key * A) % 1))', func: key => Math.floor(7 * ((key * 0.6180339887) % 1)) },
    { name: 'CRC32 Hash Function', formula: 'hash = key % 37', func: key => key % 37 },
    { name: 'MurmurHash', formula: 'hash = key % 53', func: key => key % 53 },
    { name: 'FNV Hash Function', formula: 'hash = key % 61', func: key => key % 61 },
    { name: 'CityHash/FarmHash', formula: 'hash = key % 67', func: key => key % 67 },
    { name: 'MD5 (deprecated)', formula: 'hash = key % 101', func: key => key % 101 },
    { name: 'SHA-1 (deprecated)', formula: 'hash = key % 113', func: key => key % 113 },
    { name: 'SHA-2 (secure)', formula: 'hash = key % 127', func: key => key % 127 },
    { name: 'SHA-3 (secure)', formula: 'hash = key % 131', func: key => key % 131 },
    { name: 'SipHash', formula: 'hash = key % 139', func: key => key % 139 }
];

// Default array to be used on page load
const defaultArray = [23, 45, 12, 6, 78, 34, 56, 89, 24, 37];

// Function to generate hash tables for each hash function
function generateAllHashTables(numbers) {
    // Display the input array below the button
    displayInputArray(numbers);

    const container = document.getElementById('hashTablesContainer');
    container.innerHTML = '';  // Clear the container before generating

    hashFunctions.forEach(({ name, formula, func }) => {
        const hashTable = createHashTable(func, numbers);
        const tableElement = createTableElement(name, formula, hashTable);
        container.appendChild(tableElement);
    });
}

// Function to parse the input array from the user
function parseInputArray(inputString) {
    return inputString.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
}

// Function to display the input array
function displayInputArray(numbers) {
    const displayDiv = document.getElementById('displayInputArray');
    displayDiv.innerHTML = `<p><strong>Input Array:</strong> [${numbers.join(', ')}]</p>`;
}

// Function to create a hash table using the provided hash function
function createHashTable(hashFunction, numbers) {
    const tableSize = 7;  // Set a constant size for all hash tables
    const hashTable = new Array(tableSize).fill(null);
    
    numbers.forEach(num => {
        const index = hashFunction(num);
        if (!hashTable[index]) {
            hashTable[index] = [];
        }
        hashTable[index].push(num);  // Use chaining for collision handling
    });
    
    return hashTable;
}

// Function to create the table element for a given hash function, its formula, and its hash table
function createTableElement(functionName, formula, hashTable) {
    const tableDiv = document.createElement('div');
    tableDiv.className = 'hash-table';

    const title = document.createElement('h2');
    title.innerText = functionName;
    tableDiv.appendChild(title);

    const formulaElement = document.createElement('p');
    formulaElement.innerText = formula;
    formulaElement.className = 'hash-formula';
    tableDiv.appendChild(formulaElement);

    const table = document.createElement('table');

    // Create table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const indexHeader = document.createElement('th');
    indexHeader.innerText = 'Index';
    const valueHeader = document.createElement('th');
    valueHeader.innerText = 'Values';
    headerRow.appendChild(indexHeader);
    headerRow.appendChild(valueHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    hashTable.forEach((bucket, index) => {
        const row = document.createElement('tr');
        
        const indexCell = document.createElement('td');
        indexCell.innerText = index;
        row.appendChild(indexCell);

        const valueCell = document.createElement('td');
        valueCell.innerText = bucket ? bucket.join(", ") : "Empty";
        row.appendChild(valueCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableDiv.appendChild(table);
    return tableDiv;
}

// Event listener to handle form input and button click
document.addEventListener('DOMContentLoaded', function () {
    // Generate hash tables for the default array on page load
    generateAllHashTables(defaultArray);

    // Listen for user input and generate new tables when button is clicked
    document.querySelector('button').addEventListener('click', () => {
        const inputArray = document.getElementById('inputArray').value;
        const numbers = parseInputArray(inputArray);
        if (numbers.length > 0) {
            generateAllHashTables(numbers);  // Generate hash tables with the user input
        } else {
            alert("Please enter a valid array of numbers.");
        }
    });
});
