const lengthInput = document.getElementById("length");
const breadthInput = document.getElementById("breadth");
const searchElementInput = document.getElementById("searchElement");
const startBtn = document.getElementById("startBtn");
const arrayContainer = document.getElementById("arrayContainer");
const arrayDimensions = document.getElementById("arrayDimensions");

let matrix = [];
let numRows = parseInt(lengthInput.value);
let numCols = parseInt(breadthInput.value);

// Function to update the array dimensions displayed in h2
function updateArrayDimensions() {
  numRows = parseInt(lengthInput.value);
  numCols = parseInt(breadthInput.value);
  arrayDimensions.textContent = `2D Array [ ${numRows} ] [ ${numCols} ]`;
}

// Function to generate and display the matrix
function generateMatrix() {
  updateArrayDimensions();
  numRows = parseInt(lengthInput.value);
  numCols = parseInt(breadthInput.value);
  matrix = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => Math.floor(Math.random() * 1000))
  );
  
  displayMatrix();
}

// Function to display the matrix in the container
function displayMatrix() {
  arrayContainer.innerHTML = '';
  arrayContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

  matrix.forEach(row => {
    row.forEach(value => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = value;
      arrayContainer.appendChild(cell);
    });
  });
}

// Function to sort the 2D matrix
function sortMatrix() {
  // Flatten the matrix, sort, then rebuild it
  const flattened = matrix.flat();
  flattened.sort((a, b) => a - b);

  // Rebuild sorted matrix
  matrix = [];
  for (let i = 0; i < numRows; i++) {
    matrix.push(flattened.slice(i * numCols, (i + 1) * numCols));
  }

  displayMatrix(); // Display the sorted matrix
}

// Function to start binary search animation
async function binarySearch() {
  const target = parseInt(searchElementInput.value);
  if (isNaN(target)) return alert("Please enter a valid search element.");
  
  let left = 0;
  let right = numRows * numCols - 1;

  // Flattened binary search on the sorted matrix
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / numCols);
    const col = mid % numCols;
    const cellIndex = row * numCols + col;
    const cell = arrayContainer.children[cellIndex];

    cell.classList.add("red");
    await new Promise(resolve => setTimeout(resolve, 500)); // pause for animation
    
    const midValue = matrix[row][col];
    if (midValue === target) {
      cell.classList.remove("red");
      cell.classList.add("green");
      return;
    } else {
      cell.classList.remove("red");
      if (midValue < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  alert("Element not found.");
}

// Event listeners
lengthInput.addEventListener("input", generateMatrix);
breadthInput.addEventListener("input", generateMatrix);
searchElementInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sortMatrix(); // Sort before starting the search
    binarySearch();
  }
});
startBtn.addEventListener("click", () => {
  sortMatrix(); // Sort before starting the search
  binarySearch();
});

// Initialize the matrix on page load
generateMatrix();
