class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

// Generate a random binary tree with height between 3 and 5
function generateRandomTree(depth = 1, maxDepth = 3 + Math.floor(Math.random() * 3)) {
    if (depth > maxDepth) return null;
    const node = new TreeNode(Math.floor(Math.random() * 100));
    node.left = generateRandomTree(depth + 1, maxDepth);
    node.right = generateRandomTree(depth + 1, maxDepth);
    return node;
}

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const nodeRadius = 20;
let root = generateRandomTree();

// Draw the binary tree with text inside each node
function drawTree(node, x, y, horizontalOffset) {
    if (!node) return;

    // Set node position
    node.x = x;
    node.y = y;

    // Draw left child and connecting line
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - horizontalOffset, y + 80);
        ctx.stroke();
        drawTree(node.left, x - horizontalOffset, y + 80, horizontalOffset / 2);
    }

    // Draw right child and connecting line
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + horizontalOffset, y + 80);
        ctx.stroke();
        drawTree(node.right, x + horizontalOffset, y + 80, horizontalOffset / 2);
    }

    // Draw node as grey circle with value inside
    drawNode(node, "lightgrey");
}

function drawNode(node, color) {
    // Create radial gradient for a 3D effect
    const gradient = ctx.createRadialGradient(
        node.x, node.y, nodeRadius / 2, // inner circle
        node.x, node.y, nodeRadius       // outer circle
    );
    gradient.addColorStop(0, "white");          // light center
    gradient.addColorStop(0.6, color);          // main color
    gradient.addColorStop(1, "darkslategray");  // dark edge

    // Draw the node circle with gradient
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add a shadow for depth
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    // Outline the node with a darker color for contrast
    ctx.lineWidth = 2;
    ctx.strokeStyle = "darkslategray";
    ctx.stroke();

    // Reset shadow for text
    ctx.shadowColor = "transparent";
    
    // Draw the node value (text)
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";  // Center vertically
    ctx.font = "bold 16px Arial"; // Bold font for better readability
    ctx.fillText(node.value, node.x, node.y);
}


// Initial draw of the tree
function drawInitialTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(root, canvas.width / 2, 40, canvas.width / 4);
}

// Clear traversal results on page load
function clearOutputs() {
    document.getElementById("inorderOutput").textContent = '';
    document.getElementById("preorderOutput").textContent = '';
    document.getElementById("postorderOutput").textContent = '';
    document.getElementById("levelorderOutput").textContent = '';
}

window.onload = function () {
    clearOutputs();
    root = generateRandomTree();
    drawInitialTree();
};

// Disable and enable traversal buttons
function disableButtons() {
    document.querySelectorAll("#controls button").forEach(button => button.disabled = true);
}

function enableButtons() {
    document.querySelectorAll("#controls button").forEach(button => button.disabled = false);
}

// Traversal functions with animation
async function animateTraversal(orderFn, outputId) {
    drawInitialTree(); // Reset tree to grey before each traversal
    const order = [];
    const visitNode = async (node) => {
        if (!node) return;
        
        // Highlight node in red, then in green, and add value to the traversal path
        drawNode(node, "red");
        await new Promise((resolve) => setTimeout(resolve, 500));
        drawNode(node, "green");
        
        order.push(node.value);
    };

    disableButtons(); // Disable buttons at the start of traversal
    await orderFn(root, visitNode);
    enableButtons(); // Enable buttons after traversal is complete

    document.getElementById(outputId).textContent = order.join(", ");
}

const inorderTraversal = async (node, visitFn) => {
    if (!node) return;
    await inorderTraversal(node.left, visitFn);
    await visitFn(node);
    await inorderTraversal(node.right, visitFn);
};

const preorderTraversal = async (node, visitFn) => {
    if (!node) return;
    await visitFn(node);
    await preorderTraversal(node.left, visitFn);
    await preorderTraversal(node.right, visitFn);
};

const postorderTraversal = async (node, visitFn) => {
    if (!node) return;
    await postorderTraversal(node.left, visitFn);
    await postorderTraversal(node.right, visitFn);
    await visitFn(node);
};

const levelOrderTraversal = async (node, visitFn) => {
    if (!node) return;
    const queue = [node];
    while (queue.length) {
        const current = queue.shift();
        await visitFn(current);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
};

// Start traversal animation based on selected traversal type
function startTraversal(type) {
    switch (type) {
        case "inorder":
            animateTraversal(inorderTraversal, "inorderOutput");
            break;
        case "preorder":
            animateTraversal(preorderTraversal, "preorderOutput");
            break;
        case "postorder":
            animateTraversal(postorderTraversal, "postorderOutput");
            break;
        case "levelorder":
            animateTraversal(levelOrderTraversal, "levelorderOutput");
            break;
    }
}

function reloadPage() {
    window.location.reload();
}
