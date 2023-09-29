// Get canvas and context
const canvas = document.getElementById("bezierCanvas");
const ctx = canvas.getContext("2d");

// Get control inputs
const pointCountSelect = document.getElementById("pointCount");
const x1Input = document.getElementById("x1");
const y1Input = document.getElementById("y1");
const x2Input = document.getElementById("x2");
const y2Input = document.getElementById("y2");
const x3Input = document.getElementById("x3");
const y3Input = document.getElementById("y3");
const x4Input = document.getElementById("x4");
const y4Input = document.getElementById("y4");
const drawButton = document.getElementById("drawButton");

// Initialize control points
let p1 = { x: 50, y: 200 };
let p2 = { x: 200, y: 50 };
let p3 = { x: 400, y: 50 };
let p4 = { x: 550, y: 200 };

// Set initial input values
x1Input.value = p1.x;
y1Input.value = p1.y;
x2Input.value = p2.x;
y2Input.value = p2.y;
x3Input.value = p3.x;
y3Input.value = p3.y;
x4Input.value = p4.x;
y4Input.value = p4.y;

// Function to toggle visibility of control points
function toggleControlPoints(numPoints) {
    const point3 = document.getElementById('point3');
    const point4 = document.getElementById('point4');

    point3.style.display = numPoints >= 3 ? 'block' : 'none';
    point4.style.display = numPoints === 4 ? 'block' : 'none';
}

// Event listener for point count selection
pointCountSelect.addEventListener('change', (event) => {
    const numPoints = parseInt(event.target.value);
    toggleControlPoints(numPoints);
});

// Initialize control points based on the selected point count
toggleControlPoints(parseInt(pointCountSelect.value));

// Function to draw a circle at a given point
function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#007bff";
    ctx.fill();
}

// Function to draw the Bezier curve with control points
function drawBezierCurve() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update control points from input values
    p1.x = parseFloat(x1Input.value);
    p1.y = parseFloat(y1Input.value);
    p2.x = parseFloat(x2Input.value);
    p2.y = parseFloat(y2Input.value);

    const numPoints = parseInt(pointCountSelect.value);

    if (numPoints >= 3) {
        p3.x = parseFloat(x3Input.value);
        p3.y = parseFloat(y3Input.value);
    }

    if (numPoints === 4) {
        p4.x = parseFloat(x4Input.value);
        p4.y = parseFloat(y4Input.value);
    }

    // Draw Bezier curve
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);

    if (numPoints === 2) {
        ctx.lineTo(p2.x, p2.y);
    } else if (numPoints === 3) {
        ctx.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
    } else if (numPoints === 4) {
        ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    }

    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw control points
    drawPoint(p1.x, p1.y);
    drawPoint(p2.x, p2.y);

    if (numPoints >= 3) {
        drawPoint(p3.x, p3.y);
    }

    if (numPoints === 4) {
        drawPoint(p4.x, p4.y);
    }
}

// Initial drawing
drawBezierCurve();

// Attach event listener to the draw button
drawButton.addEventListener("click", drawBezierCurve);
