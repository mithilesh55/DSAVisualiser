
let linkedList = [];
// Add event listener for Enter key on the input field
document.getElementById('dataInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addNode();
  }
});

document.getElementById('deleteValue').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    deleteNode();
  }
});

// Add three entries by default when the page loads
window.onload = function() {
  for (let i = 0; i < 3; i++) {
    addNode();
  }
};

// Function to add node to the linked list
function addNode() {
  const dataInput = document.getElementById('dataInput');
  let dataValue = dataInput.value;

  if (dataValue === '') {
    dataValue = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
  }

  linkedList.push(dataValue);
  dataInput.value = ''; // Clear the input field
  renderLinkedLists();
}

// Function to render the linked lists
function renderLinkedLists() {
  renderSinglyLinkedList();
  renderDoublyLinkedList();
  renderCircularLinkedList();
}

// Render Singly Linked List
function renderSinglyLinkedList() {
  const container = document.getElementById('singlyLinkedList');
  container.innerHTML = '';
  linkedList.forEach((data, index) => {
    const node = createNode(data);
    container.appendChild(node);

    if (index < linkedList.length - 1) {
      const arrow = createArrow();
      container.appendChild(arrow);
    } else {
      const arrowToNull = createArrow();
      container.appendChild(arrowToNull);

      const nullElement = createNull();
      container.appendChild(nullElement);
    }
  });
}

// Render Doubly Linked List
function renderDoublyLinkedList() {
  const container = document.getElementById('doublyLinkedList');
  container.innerHTML = '';
  linkedList.forEach((data, index) => {
    const node = createNode(data);
    container.appendChild(node);

    if (index < linkedList.length - 1) {
      // Create container for vertical arrows
      const arrowContainer = document.createElement('div');
      arrowContainer.className = 'double-arrow-container';

      const leftArrow = createDoubleArrow('left');
      const rightArrow = createDoubleArrow('right');
      arrowContainer.appendChild(leftArrow);
      arrowContainer.appendChild(rightArrow);
      container.appendChild(arrowContainer);
    } else {
      // Last right arrow with extra spacing
      const rightArrowToNull = createDoubleArrow('right');
      rightArrowToNull.classList.add('last-arrow');  // Add spacing to the last arrow
      container.appendChild(rightArrowToNull);

      const nullElement = createNull();
      container.appendChild(nullElement);
    }
  });
}

// Render Circular Linked List
function renderCircularLinkedList() {
  const container = document.getElementById('circularLinkedList');
  container.innerHTML = '';
  linkedList.forEach((data, index) => {
    const node = createNode(data);
    container.appendChild(node);

    // Draw an arrow for each node
    if (index < linkedList.length - 1) {
      const arrow = createArrow();
      container.appendChild(arrow);
    }
  });

  // Create arrow from last node to the first node
  if (linkedList.length > 0) {
    const lastArrow = createArrow();
    lastArrow.classList.add('circular-arrow');  // Optional class for styling
    container.appendChild(lastArrow);

    const firstNode = document.createElement('div');
    firstNode.innerText = 'Head';
    firstNode.className = 'node head-node';
    container.appendChild(firstNode);
  }
}

// Helper functions to create nodes, arrows, and nulls
function createNode(data) {
  const nodeElement = document.createElement('div');
  nodeElement.className = 'node';

  const dataElement = document.createElement('div');
  dataElement.className = 'data';
  dataElement.textContent = `Data: ${data}`;
  nodeElement.appendChild(dataElement);

  return nodeElement;
}

function createArrow() {
  const arrow = document.createElement('div');
  arrow.className = 'arrow';
  return arrow;
}

function createDoubleArrow(direction) {
  const doubleArrow = document.createElement('div');
  doubleArrow.className = direction === 'left' ? 'double-arrow-left' : 'double-arrow-right';
  return doubleArrow;
}

function createNull() {
  const nullElement = document.createElement('div');
  nullElement.className = 'null';
  nullElement.textContent = ' null';
  return nullElement;
}

// Delete node function
function deleteNode() {
  const value = parseInt(document.getElementById("deleteValue").value);

  // Generate a random number if no value is provided
  const dataToDelete = isNaN(value) ? Math.floor(Math.random() * 100) : value;

  // Remove node from the linked list array
  const index = linkedList.indexOf(dataToDelete);
  if (index !== -1) {
    linkedList.splice(index, 1); // Remove the node from the list
    renderLinkedLists();  // Re-render the linked lists
  } else {
    alert("Node not found!");
  }
}

// Clear All function
function clearAll() {
  // Reset the linked list to an empty array
  linkedList = [];
  
  // Re-render all the linked lists
  renderLinkedLists();
}
