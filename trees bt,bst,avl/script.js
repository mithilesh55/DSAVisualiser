let array = [];
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.querySelector('.container').offsetHeight - 20;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function generateRandomArray() {
    array = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
}

function displayArray() {
    const arrayDisplay = document.getElementById('arrayDisplay');
    arrayDisplay.textContent = 'Random DATA: ' + array.join(', ');
}

function generateAndDisplayArray() {
    generateRandomArray();
    displayArray();
    clearCanvas();
}


class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

function insertBinary(root, value) {
    if (root === null) return new Node(value);
    if (Math.random() < 0.5) {
        root.left = insertBinary(root.left, value);
    } else {
        root.right = insertBinary(root.right, value);
    }
    return root;
}

function insertBST(root, value) {
    if (root === null) return new Node(value);
    if (value < root.value) root.left = insertBST(root.left, value);
    else root.right = insertBST(root.right, value);
    return root;
}

function height(node) {
    return node ? node.height : 0;
}

function updateHeight(node) {
    node.height = 1 + Math.max(height(node.left), height(node.right));
}

function rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    updateHeight(y);
    updateHeight(x);
    return x;
}

function rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    updateHeight(x);
    updateHeight(y);
    return y;
}

function getBalance(node) {
    return node ? height(node.left) - height(node.right) : 0;
}

function insertAVL(root, value) {
    if (root === null) return new Node(value);
    if (value < root.value) root.left = insertAVL(root.left, value);
    else root.right = insertAVL(root.right, value);

    updateHeight(root);

    const balance = getBalance(root);
    if (balance > 1 && value < root.left.value) return rotateRight(root);
    if (balance < -1 && value > root.right.value) return rotateLeft(root);
    if (balance > 1 && value > root.left.value) {
        root.left = rotateLeft(root.left);
        return rotateRight(root);
    }
    if (balance < -1 && value < root.right.value) {
        root.right = rotateRight(root.right);
        return rotateLeft(root);
    }

    return root;
}

function drawTree(ctx, node, x, y, gapX, gapY) {
    if (!node) return;

    // Draw the node
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#00cc66';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText(node.value, x - 10, y + 5);

    // Calculate positions for child nodes
    const childY = y + gapY;
    const newGapX = gapX / 1.5; // Reduce gap gradually for fitting

    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - gapX, childY - 20);
        ctx.stroke();
        drawTree(ctx, node.left, x - gapX, childY, newGapX, gapY);
    }

    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + gapX, childY - 20);
        ctx.stroke();
        drawTree(ctx, node.right, x + gapX, childY, newGapX, gapY);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBinaryTree() {
    clearCanvas();
    const root = array.reduce((root, value) => insertBinary(root, value), null);
    drawTree(ctx, root, canvas.width / 2, 30, canvas.width / 8, 80);
}

function drawBST() {
    clearCanvas();
    const root = array.reduce((root, value) => insertBST(root, value), null);
    drawTree(ctx, root, canvas.width / 2, 30, canvas.width / 8, 80);
}

function drawAVLTree() {
    clearCanvas();
    const root = array.reduce((root, value) => insertAVL(root, value), null);
    drawTree(ctx, root, canvas.width / 2, 30, canvas.width / 8, 80);
}

window.onload = function() {
    drawBinaryTree();
};

generateAndDisplayArray();
