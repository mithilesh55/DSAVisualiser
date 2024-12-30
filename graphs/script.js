function generateGraph() {
    const nodeCount = 5;
    const edges = [];
    const adjMatrix = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(0));
    const adjList = Array.from({ length: nodeCount }, () => []);

    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            if (Math.random() > 0.5) {
                adjMatrix[i][j] = 1;
                adjMatrix[j][i] = 1;
                adjList[i].push(j);
                adjList[j].push(i);
                edges.push([i, j]);
            }
        }
    }

    drawGraph(edges, nodeCount);
    drawAdjacencyList(adjList);
    drawAdjacencyMatrix(adjMatrix, nodeCount);
}
window.onload = generateGraph;


function drawGraph(edges, nodeCount) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = 20;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angleStep = (2 * Math.PI) / nodeCount;
    const positions = [];

    // Create positions of nodes
    for (let i = 0; i < nodeCount; i++) {
        const x = centerX + 150 * Math.cos(i * angleStep);
        const y = centerY + 150 * Math.sin(i * angleStep);
        positions.push({ x, y });
    }

    // Create edges with a smoother look, drawn before nodes
    ctx.lineWidth = 2;
    edges.forEach(([i, j]) => {
        // Get the start and end positions of the edge
        const startX = positions[i].x;
        const startY = positions[i].y;
        const endX = positions[j].x;
        const endY = positions[j].y;

        // Create gradient for the edges
        const edgeGradient = ctx.createLinearGradient(startX, startY, endX, endY);
        edgeGradient.addColorStop(0, "#333");
        edgeGradient.addColorStop(1, "#8B8B8B"); // Slightly lighter edge color

        // Draw the edge with the gradient
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = edgeGradient;
        ctx.lineWidth = 3; // Slightly thicker edges
        ctx.stroke();
    });

    // Create nodes with a polished look, drawn after edges
    for (let i = 0; i < nodeCount; i++) {
        const { x, y } = positions[i];

        // Create radial gradient for node color
        const gradient = ctx.createRadialGradient(x, y, radius / 4, x, y, radius);
        gradient.addColorStop(0, "white");          // light center
        gradient.addColorStop(0.6, "lightgray");          // main color
        gradient.addColorStop(1, "darkslategray");

        // Draw the node with a gradient fill
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add shadow for depth effect
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // Stroke the node with a dark outline
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#333';
        ctx.stroke();

        // Reset shadow for text
        ctx.shadowColor = "transparent";

        // Draw the node's label (centered)
        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, x, y);
    }

    // Reset any settings that may have been changed
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#333';
}


function drawAdjacencyList(adjList) {
    const canvas = document.getElementById('adjListCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = 15; // Radius for each circular node
    const spacing = 60; // Horizontal space between nodes
    const arrowSize = 6; // Size of arrowhead for the linked list

    adjList.forEach((neighbors, i) => {
        let currentX = 50; // Starting X position for each row
        const y = 50 + i * 70; // Row height for each list entry

        // Draw the main node in the list (the head of each linked list)
        drawNode(ctx, i, currentX, y, radius);
        currentX += spacing;

        neighbors.forEach((neighbor, index) => {
            // Draw an arrow pointing to the next neighbor node
            drawArrow(ctx, currentX - spacing + radius, y, currentX - radius, y, arrowSize);

            // Draw each neighbor node
            drawNode(ctx, neighbor, currentX, y, radius);
            currentX += spacing;
        });
    });
}

function drawNode(ctx, node, x, y, radius) {
    // Create a radial gradient for a 3D effect
    const gradient = ctx.createRadialGradient(x, y, radius / 4, x, y, radius);
    gradient.addColorStop(0, "white");          // light center
    gradient.addColorStop(0.6, "lightgray");          // main color
    gradient.addColorStop(1, "darkslategray");

    // Draw the node circle with gradient
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add shadow for depth
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    // Draw outer stroke with darker color
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";
    ctx.stroke();

    // Reset shadow for the text
    ctx.shadowColor = "transparent";

    // Draw centered text inside the node
    ctx.fillStyle = "#333";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node, x, y);
}


// Helper function to draw an arrow between two points
function drawArrow(ctx, fromX, fromY, toX, toY, arrowSize) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Calculate the angle of the line for positioning the arrowhead
    const angle = Math.atan2(toY - fromY, toX - fromX);

    // Draw the arrowhead
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowSize * Math.cos(angle - Math.PI / 6),
        toY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        toX - arrowSize * Math.cos(angle + Math.PI / 6),
        toY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();
}


function drawAdjacencyMatrix(adjMatrix, nodeCount) {
    const canvas = document.getElementById('adjMatrixCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = 30;
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#333';

    for (let i = 0; i < nodeCount; i++) {
        ctx.fillText(i, 40 + i * cellSize, 25);
        ctx.fillText(i, 15, 50 + i * cellSize);
    }

    for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
            const x = 40 + j * cellSize;
            const y = 40 + i * cellSize;
            ctx.strokeRect(x, y, cellSize, cellSize);
            ctx.fillText(adjMatrix[i][j], x + 10, y + 20);
        }
    }
}
