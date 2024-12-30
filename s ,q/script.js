const stack = [];
const queue = [];

const stackCanvas = document.getElementById('stackCanvas');
const stackCtx = stackCanvas.getContext('2d');

const queueCanvas = document.getElementById('queueCanvas');
const queueCtx = queueCanvas.getContext('2d');

const toast = document.getElementById('toast');
const inputArea = document.getElementById('input-value');

// Event listeners for button clicks
document.getElementById('pushButton').addEventListener('click', () => {
    addValueToStackAndQueue();
});

document.getElementById('popButton').addEventListener('click', () => {
    popAndDequeue();
});

// Handle Enter and Backspace keys for the entire window
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior (if any)
        addValueToStackAndQueue();
    } else if (event.key === 'Backspace') {
        event.preventDefault(); // Prevent default behavior (if any)
        popAndDequeue();
    }
});

// Function to add value to stack and queue
function addValueToStackAndQueue(value) {
    const inputValue = inputArea.value; // Get the value from the input area
    if (inputValue.trim() === '') {
        // If no input, generate a random number
        const randomValue = Math.floor(Math.random() * 100000) + 1;
        pushStack(randomValue);
        enqueueQueue(randomValue);
        showToast(`Added random value: ${randomValue}`);
    } else {
        pushStack(inputValue);
        enqueueQueue(inputValue);
        inputArea.value = ''; // Clear input after adding
    }
    // Redraw both visuals
    drawStack();
    drawQueue();
}

// Pop and dequeue function
function popAndDequeue() {
    if (stack.length === 0 || queue.length === 0) {
        showToast("Stack or Queue is empty!");
    } else {
        popStack();
        dequeueQueue();
    }
}

// Drawing functions
function drawStack() {
    stackCtx.clearRect(0, 0, stackCanvas.width, stackCanvas.height);
    stackCtx.font = '24px Arial'; // Larger font size
    stackCtx.textAlign = 'center';
    for (let i = 0; i < stack.length; i++) {
        stackCtx.fillStyle = '#ff9f05';
        stackCtx.fillRect(50, stackCanvas.height - 50 * (i + 1), 200, 40);
        stackCtx.fillStyle = '#FFFFFF';
        stackCtx.fillText(stack[i], 150, stackCanvas.height - 50 * i - 25);
    }
}

function drawQueue() {
    queueCtx.clearRect(0, 0, queueCanvas.width, queueCanvas.height);
    queueCtx.font = '24px Arial'; // Larger font size
    queueCtx.textAlign = 'center';
    queueCtx.textBaseline = 'middle';
    for (let i = 0; i < queue.length; i++) {
        queueCtx.fillStyle = '#05fa1d';
        queueCtx.fillRect(50, 50 * i + 20, 200, 40);
        queueCtx.fillStyle = '#050505';
        queueCtx.fillText(queue[i], 150, 50 * i + 45);
    }
}

function pushStack(value) {
    stack.push(value);
    drawStack();
}

function popStack() {
    stack.pop();
    drawStack();
}

function enqueueQueue(value) {
    queue.push(value);
    drawQueue();
}

function dequeueQueue() {
    queue.shift();
    drawQueue();
}

function showToast(message) {
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Function to populate the stack and queue with random values on page load
function populateStackAndQueue() {
    for (let i = 0; i < 3; i++) {
        const randomValue = Math.floor(Math.random() * 100000) + 1;
        pushStack(randomValue);
        enqueueQueue(randomValue);
    }
}

// Call the populate function on page load
window.onload = () => {
    populateStackAndQueue();
};
