function getRandomNumber() {
    const min = 3; // Minimum value
    const max = 20; // Maximum value
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

let numbers = generateArray(getRandomNumber());

document.addEventListener("DOMContentLoaded", () => {
    const arrayLengthSlider = document.getElementById("arrayLength");
    arrayLengthSlider.value = numbers.length; // Set the slider value to the initial array length
    document.getElementById("arrayLengthDisplay").textContent = numbers.length; // Display the length
    initializeArrays(); // Initialize the arrays on page load

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            startSearch(); // Call the search function on Enter
        }
    });
});

function initializeArrays() {
    displayArray("linearArray", numbers);
    displayArray("binaryArray", numbers);
}

function updateArrayLength() {
    const length = document.getElementById("arrayLength").value;
    document.getElementById("arrayLengthDisplay").textContent = length;
    numbers = generateArray(length); // Generate new array on slider change
    resetResults();
    displayArray("linearArray", numbers);
    displayArray("binaryArray", numbers);
}

function generateArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    array.sort((a, b) => a - b); // Sorted for binary search
    return array;
}

function startSearch() {
    const searchValue = parseInt(document.getElementById("searchInput").value, 10);
    resetResults();
    
    const volumeSlider = document.getElementById('arrayLength');
    volumeSlider.disabled = true; // Disable the slider

    // Start both searches and use Promise.all to wait for them to complete
    Promise.all([
        new Promise(resolve => {
            linearSearch(numbers, searchValue, resolve); // Pass resolve to linearSearch
        }),
        new Promise(resolve => {
            binarySearch(numbers, searchValue, resolve); // Pass resolve to binarySearch
        })
    ]).then(() => {
        volumeSlider.disabled = false; // Re-enable the slider after both searches are done
    });
}

function displayArray(containerId, array) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    array.forEach(num => {
        const element = document.createElement("div");
        element.textContent = num;
        element.style.backgroundColor = "#e0e0e0"; // Default color
        container.appendChild(element);
    });
}

function resetResults() {
    document.getElementById("linearIndex").textContent = "-";
    document.getElementById("linearSteps").textContent = "-";
    document.getElementById("binaryIndex").textContent = "-";
    document.getElementById("binarySteps").textContent = "-";
    Array.from(document.querySelectorAll(".array-container div")).forEach(el => {
        el.style.backgroundColor = "#e0e0e0"; // Reset color to default
    });
}

async function linearSearch(array, searchValue) {
    let steps = 0;
    for (let i = 0; i < array.length; i++) {
        steps++;
        highlightElement("linearArray", i, "red");
        await delay(500);

        if (array[i] === searchValue) {
            markFound("linearArray", i, steps, "linearIndex", "linearSteps");
            return;
        }
        highlightElement("linearArray", i, "#e0e0e0"); // Reset to default if not found
    }
    document.getElementById("linearSteps").textContent = steps;
}

async function binarySearch(array, searchValue) {
    let steps = 0;
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        highlightElement("binaryArray", mid, "red");
        await delay(500);

        if (array[mid] === searchValue) {
            markFound("binaryArray", mid, steps, "binaryIndex", "binarySteps");
            return;
        } else if (array[mid] < searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
        highlightElement("binaryArray", mid, "#e0e0e0"); // Reset to default if not found
    }
    document.getElementById("binarySteps").textContent = steps;
}

function highlightElement(arrayId, index, color) {
    const elements = document.getElementById(arrayId).children;
    elements[index].style.backgroundColor = color;
}

function markFound(arrayId, index, steps, indexId, stepsId) {
    const elements = document.getElementById(arrayId).children;
    elements[index].style.backgroundColor = "green";
    document.getElementById(indexId).textContent = index;
    document.getElementById(stepsId).textContent = steps;

    // Update the result message
    const searchValue = document.getElementById("searchInput").value;
    document.getElementById("resultMessage").textContent = `The number ${searchValue} is in position ${index + 1} in the above array.`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
