//bubble sort
async function bubbleSort() {
    let bars = document.getElementById('array-container1').getElementsByClassName('bar');
    let array = [...initialArray];
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            await new Promise((resolve) => setTimeout(resolve, frequency));

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                createBars(array, 'array-container1'); 
                for(let k = 1;k<=i;k++){
                    bars[n - k ].style.backgroundColor = 'green';
                }
            }

            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
        bars[n - i - 1].style.backgroundColor = 'green';
    }
    bars[0].style.backgroundColor = 'green';
}

// Selection Sort algorithm-----------------------------------------------------
async function selectionSort() {
    let bars = document.getElementById('array-container2').getElementsByClassName('bar');
    let array = [...initialArray];
    let n = array.length;
    let sortedIndices = []; // Keep track of sorted indices

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        bars[i].style.backgroundColor = 'red'; // Highlight the current index

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = 'red'; // Highlight the comparison bar

            await new Promise((resolve) => setTimeout(resolve, frequency));

            if (array[j] < array[minIdx]) {
                minIdx = j; // Update the new minimum index
            }

            bars[j].style.backgroundColor = 'steelblue'; // Reset color of the non-minimum bars
        }

        if (minIdx !== i) {
            // Swap the minimum element with the current element
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[minIdx].style.backgroundColor = 'yellow';
            await new Promise((resolve) => setTimeout(resolve, frequency));
            createBars(array, 'array-container2'); // Update the bars after the swap
            // After recreating bars, restore the green color for the sorted indices
            sortedIndices.forEach(index => {
                bars[index].style.backgroundColor = 'green';
            });
        }

        // Set the current bar as sorted and save the sorted index
        bars[i].style.backgroundColor = 'green';
        sortedIndices.push(i); // Track the sorted index
    }

    // Finally, set the last bar to green, since it's the last sorted element
    bars[n - 1].style.backgroundColor = 'green';
    sortedIndices.push(n - 1); // Add the last index to sortedIndices
}


// Insertion Sort algorithm-------------------------------------------------
async function insertionSort() {
    const bars = document.getElementById('array-container3').getElementsByClassName('bar');
    let array = [...initialArray];
    let n = array.length;
    let sortedIndices = []; // Keep track of sorted indices

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'red';
        await new Promise((resolve) => setTimeout(resolve, frequency));

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            createBars(array, 'array-container3');
            sortedIndices.forEach(index => {
                bars[j+1].style.backgroundColor = 'green';
            });
        }
        array[j + 1] = key;
        createBars(array, 'array-container3');
        sortedIndices.forEach(index => {
            bars[j+1].style.backgroundColor = 'green';
        });
        bars[j+1].style.backgroundColor = 'yellow';
        await new Promise((resolve) => setTimeout(resolve, frequency));
        bars[i].style.backgroundColor = 'green';
        sortedIndices.push(j+1);
        sortedIndices.push(i);
        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = 'green'; // Keep all sorted elements green
        }
    }
}

// Merge Sort algorithm------------------------------------------------------

async function mergeSort() {
    const bars = document.getElementById('array-container4').getElementsByClassName('bar');
    let array = [...initialArray];
    let sortedIndices = []; // Track sorted indices
    await mergeSortHelper(array, 0, array.length - 1, bars, sortedIndices);
}

async function mergeSortHelper(array, left, right, bars, sortedIndices) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(array, left, mid, bars, sortedIndices);
    await mergeSortHelper(array, mid + 1, right, bars, sortedIndices);
    await merge(array, left, mid, right, bars, sortedIndices);

    // After merge, mark the bars from left to right as sorted (green)
    for (let i = left; i <= right; i++) {
        bars[i].style.backgroundColor = 'green';
        if (!sortedIndices.includes(i)) {
            sortedIndices.push(i); // Track sorted indices
        }
    }
}

async function merge(array, left, mid, right, bars, sortedIndices) {

    let n1 = mid - left + 1;
    let n2 = right - mid;
    let leftArr = array.slice(left, mid + 1);
    let rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        bars[k].style.backgroundColor = 'red'; // Mark comparison
        await new Promise((resolve) => setTimeout(resolve, frequency));

        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            i++;
        } else {
            array[k] = rightArr[j];
            j++;
        }
        createBars(array, 'array-container4');

        // Restore green color for already sorted bars
        sortedIndices.forEach(index => {
            bars[index].style.backgroundColor = 'green';
        });

        bars[k].style.backgroundColor = 'steelblue'; // Reset to default after update
        k++;
    }

    while (i < n1) {
        array[k] = leftArr[i];
        createBars(array, 'array-container4');
        i++;
        k++;

        // Restore green color for already sorted bars
        sortedIndices.forEach(index => {
            bars[index].style.backgroundColor = 'green';
        });
    }

    while (j < n2) {
        array[k] = rightArr[j];
        createBars(array, 'array-container4');
        j++;
        k++;

        // Restore green color for already sorted bars
        sortedIndices.forEach(index => {
            bars[index].style.backgroundColor = 'green';
        });
    }
}

// Quick Sort algorithm--------------------------------------------------------
async function quickSort() {
    const bars = document.getElementById('array-container5').getElementsByClassName('bar');
    let array = [...initialArray];
    await quickSortHelper(array, 0, array.length - 1, bars);
    for(let k = 0;k<=array.length-1;k++){
        bars[k ].style.backgroundColor = 'green';
    }
}

async function quickSortHelper(array, low, high, bars) {
    if (low < high) {
        // Partition the array and get the pivot index
        let pi = await partition(array, low, high, bars);
        // Recursively apply quick sort to the left and right sub-arrays
        await quickSortHelper(array, low, pi - 1, bars);
        await quickSortHelper(array, pi + 1, high, bars);
    }
}

async function partition(array, low, high, bars) {
    let pivot = array[high]; // Choose the rightmost element as pivot
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // Highlight both the current element and the pivot
        bars[j].style.backgroundColor = 'red'; // Highlight the current element
        bars[high].style.backgroundColor = 'red'; // Highlight the pivot

        await new Promise((resolve) => setTimeout(resolve, frequency));

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]; // Swap
            createBars(array, 'array-container5'); // Update the visualization
        }
        
        // Reset the current element's color to steelblue after comparison
        bars[j].style.backgroundColor = 'steelblue'; 
        bars[high].style.backgroundColor = 'steelblue'; // Reset pivot color as well
    }

    // Place the pivot in the correct position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    createBars(array, 'array-container5'); // Update visualization
    for(let k = 0;k<=i;k++){
        bars[k].style.backgroundColor = 'green';
    }
    return i + 1; // Return the partitioning index
    
}






// Heap Sort Helper---------------------------------------------------------------


async function heapSort() {
    let bars = document.getElementById('array-container6').getElementsByClassName('bar');
    let sortedIndices = [];
    async function heapify(arr, n, i, containerId) {
        let largest = i; // Initialize largest as root
        let left = 2 * i + 1; // Left child
        let right = 2 * i + 2; // Right child
    
        // Check if left child exists and is greater than root
        if (left < n && arr[left] > arr[largest]) largest = left;
        
        // Check if right child exists and is greater than the current largest
        if (right < n && arr[right] > arr[largest]) largest = right;
    
        // If largest is not root
        if (largest !== i) {
            // Highlight the current and largest elements
            document.getElementById(containerId).children[i].style.backgroundColor = 'red';
            document.getElementById(containerId).children[largest].style.backgroundColor = 'red';
            await new Promise((resolve) => setTimeout(resolve, frequency));
    
            // Swap root with the largest child
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            createBars(arr, containerId); // Update the visualization
            sortedIndices.forEach(index => {
                bars[index].style.backgroundColor = 'green';
            });
            
    
            // Reset colors after the swap
            document.getElementById(containerId).children[i].style.backgroundColor = 'steelblue';
            document.getElementById(containerId).children[largest].style.backgroundColor = 'steelblue';
    
            // Recursively heapify the affected subtree
            await heapify(arr, n, largest, containerId);
        }
    }
    
    let arr = [...initialArray];
    let n = arr.length;

    // Build the heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i, 'array-container6');
    }

    for (let i = n - 1; i > 0; i--) {
        // Move current root to the end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        createBars(arr, 'array-container6'); // Update visualization
    
        // Set the position of the sorted element to green after updating the visualization
        document.getElementById('array-container6').children[i].style.backgroundColor = 'green';
        sortedIndices.push(i);
    
        // Update colors of previously sorted elements to green
        for (let k = n - 1; k > i; k--) {
            document.getElementById('array-container6').children[k].style.backgroundColor = 'green';
        }
    
        // Call heapify on the reduced heap
        await heapify(arr, i, 0, 'array-container6');
    }
    
    // Finally, set the last remaining element to green
    document.getElementById('array-container6').children[0].style.backgroundColor = 'green';
}

//-------------------------------------------------------------------
let initialArray = [35, 20, 10, 50, 40, 5, 25];
let frequency = 200;  
let length=14;                  
const containerIds = [
    'array-container1', 'array-container2', 'array-container3',
    'array-container4', 'array-container5', 'array-container6'
];

// Create initial bars for all array containers
function createBars(array, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 4.7}px`; // Height based on value
        if(array.length <= 17){
            bar.innerText = value;
        }
        container.appendChild(bar);
    });
}
function createAllBars(){
    createBars(initialArray, 'array-container1');
    createBars(initialArray, 'array-container2');
    createBars(initialArray, 'array-container3');
    createBars(initialArray, 'array-container4');
    createBars(initialArray, 'array-container5');
    createBars(initialArray, 'array-container6');   
}

window.onload = () => {
    createAllBars();
};

document.getElementById('sort-btn').addEventListener('click', async () => {
    createAllBars();
    const button = document.getElementById('sort-btn');
    const volumeSlider = document.getElementById('volume');
    const speed = document.getElementById('speed');
    const newarr = document.getElementById('newarr');
    const sortall = document.getElementById('sort-all');
    button.disabled = true;
    sortall.disabled = true;
    speed.disabled = true;
    volumeSlider.disabled = true;
    newarr.disabled = true;
    await bubbleSort();
    await selectionSort();
    await insertionSort();
    await mergeSort();
    await quickSort();
    await heapSort();
    button.disabled = false;
    newarr.disabled = false;
    volumeSlider.disabled = false;
    speed.disabled = false;
    sortall.disabled = false;

});


function generateRandomNumbersInRange(n) {
    const randomNumbers = new Set(); 

    while (randomNumbers.size < n) {
        const randomNumber = Math.floor(Math.random() * (50)) + 1;
        randomNumbers.add(randomNumber); 
    }

    initialArray = [...randomNumbers];
}

const newarr = document.getElementById('newarr');
newarr.onclick = function() { 
    generateRandomNumbersInRange(length); 
    createAllBars();
};


const volumeSlider = document.getElementById('volume');
volumeSlider.addEventListener('input', () => {
    const length = volumeSlider.value; 
    generateRandomNumbersInRange(length); 
    createAllBars();
});

const speed = document.getElementById('speed');
speed.addEventListener('input', () => {
    frequency = 500 - speed.value; 
});



document.getElementById('sort-all').addEventListener('click', async () => {

    createAllBars();
    const button = document.getElementById('sort-btn');
    const volumeSlider = document.getElementById('volume');
    const speed = document.getElementById('speed');
    const newarr = document.getElementById('newarr');
    const sortall = document.getElementById('sort-all');
    
    // Disable buttons
    button.disabled = true;
    sortall.disabled = true;
    speed.disabled = true;
    volumeSlider.disabled = true;
    newarr.disabled = true;

    // Wait for all sorting algorithms to complete
    await Promise.all([
        bubbleSort(),
        selectionSort(),
        insertionSort(),
        mergeSort(),
        quickSort(),
        heapSort()
    ]);

    // Re-enable buttons after sorting is done
    button.disabled = false;
    newarr.disabled = false;
    volumeSlider.disabled = false;
    speed.disabled = false;
    sortall.disabled = false;
});





