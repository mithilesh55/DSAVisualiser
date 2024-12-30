const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const heightRange = document.getElementById('heightRange');
const heightDisplay = document.getElementById('heightDisplay');

let maxLevels = parseInt(heightRange.value, 10);

// Set canvas dimensions based on container size
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

// Function to draw a binary tree node with enhanced visual effects
function drawTree(x, y, level, maxLevels, gapX, gapY, nodeNumber) {
  if (level > maxLevels) return;

  // Draw left child branch
  if (level < maxLevels) {
    const leftX = x - gapX / 2;
    const leftY = y + gapY;

    // Set line style for branches
    ctx.strokeStyle = '#333';  // Darker line color for visibility
    ctx.lineWidth = 3;         // Increase line thickness
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(leftX, leftY);
    ctx.stroke();

    drawTree(leftX, leftY, level + 1, maxLevels, gapX / 2, gapY, nodeNumber * 2);
  }

  // Draw right child branch
  if (level < maxLevels) {
    const rightX = x + gapX / 2;
    const rightY = y + gapY;

    ctx.strokeStyle = '#333';  // Darker line color for visibility
    ctx.lineWidth = 3;         // Increase line thickness
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();

    drawTree(rightX, rightY, level + 1, maxLevels, gapX / 2, gapY, nodeNumber * 2 + 1);
  }

  // Draw the node with gradient fill and shadow
  const gradient = ctx.createRadialGradient(x, y, 5, x, y, 20);
  gradient.addColorStop(0, '#4a90e2');
  gradient.addColorStop(1, '#0044cc');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;  // Reset shadow for next element
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw the node number inside the circle
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(nodeNumber, x, y);
}

// Function to clear the canvas and draw the tree with specified height
function drawBinaryTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const rootX = canvas.width / 2;
  const rootY = 50;  // Start the root node near the top
  const gapX = canvas.width / 2;  // Horizontal gap between nodes
  const gapY = canvas.height / (maxLevels + 1);  // Vertical gap between levels

  drawTree(rootX, rootY, 1, maxLevels, gapX, gapY, 1);
}

// Update tree height dynamically based on range input
heightRange.addEventListener('input', (event) => {
  maxLevels = parseInt(event.target.value, 10);
  heightDisplay.textContent = maxLevels;
  drawBinaryTree();
});

// Initial draw with default height
drawBinaryTree();
