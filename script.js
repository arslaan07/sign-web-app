let isDrawing = false;
document.addEventListener("DOMContentLoaded", function() {
    let history = [];

    const colorPicker = document.getElementById('colorPicker');
    const canvasColor = document.getElementById('canvasColor');
    const canvas = document.getElementById('myCanvas');
    const undoButton = document.getElementById('undoButton');
    const clearButton =  document.getElementById('clearButton');
    const saveButton = document.getElementById('saveButton');
    const fontPicker = document.getElementById('fontPicker');
    const textInput = document.getElementById('textInput');
    const fontSizePicker = document.getElementById('fontSizePicker');

    const ctx = canvas.getContext('2d');

    colorPicker.addEventListener('change', (e) => {
        ctx.fillStyle = e.target.value;
        ctx.strokeStyle = e.target.value;
    });

    canvasColor.addEventListener('change', (event) => {
        ctx.fillStyle = event.target.value;
        ctx.fillRect(0, 0, 800, 500);
    });
    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        lastX = event.offsetX;
        lastY = event.offsetY;
        console.log(event.target.value);
    });
    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();

            lastX = event.offsetX;
            lastY = event.offsetY;
        }
    });
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    // if we move outside the canvas isDrawing is set to false
    window.addEventListener('mouseout', (event) => {
        const { clientX, clientY } = event;
        const { left, top, width, height } = canvas.getBoundingClientRect();
        
        // Check if the mouse position is outside the canvas area
        if (clientX < left || clientX > left + width || clientY < top || clientY > top + height) {
            isDrawing = false;
        }
    });
    

    fontSizePicker.addEventListener('change', (event) => {
        ctx.lineWidth = event.target.value;
    });
    
    
    clearButton.addEventListener('click', () => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
    saveButton.addEventListener('click', () => {
        localStorage.setItem('canvasContents', canvas.toDataURL());
        // Create a new <a> element
        let link = document.createElement('a');
    
        // Set the download attribute and the href attribute of the <a> element
        link.download = 'my-canvas.png';
        link.href = canvas.toDataURL();
    
        // Append the link to the document body
        document.body.appendChild(link);
    
        // Dispatch a click event on the <a> element
        link.click();
    
        // Remove the link from the document body
        document.body.removeChild(link);
    });

    retrieveButton.addEventListener('click', () => {
        // Retrieve the saved canvas contents from local storage
        let savedCanvas = localStorage.getItem('canvasContents');

        if (savedCanvas) {
            let img = new Image();
            img.src = savedCanvas;
            ctx.drawImage(img, 0, 0);
        }
    });
})