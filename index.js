function setGrid(squareNum) {

    square.style.width = `${squareSize}px`
    square.style.height = `${squareSize}px`

    squareContainer.style.gridTemplateColumns = `repeat(${squareRows}, ${squareSize}px)`;
    squareContainer.style.width = `${squareRows*squareSize}px`
    squareContainer.style.height = `${squareRows*squareSize}px`

    for (let i = 0; i < squareNum; i++) {

        // Create a new square element for each iteration
        const square = document.createElement('div');
        // Add the class to the square element
        square.classList.add('custom-square'); 
        square.style.background = 'rgba(0,0,0,0)'

        // Append the current square element to the container
        squareContainer.appendChild(square);
        //console.log("appended")

        square.addEventListener("mouseover", () => {
        //square.style.backgroundColor = "black";

        let rgbaString = square.style.background
        console.log("rgbaString", rgbaString)

        // The fourth element (at index 3) represents the alpha value
        let squareAlphaValue = 1.0

        squareAlphaValue = parseFloat(rgbaString.split(',')[3]);
        if (isNaN(squareAlphaValue))
            squareAlphaValue = 1.0


        console.log("alphaValue",alphaValue)
        squareAlphaValue += parseFloat(alphaValue)
        if (squareAlphaValue > 1.0) {
            squareAlphaValue = parseFloat(1)
        }
        console.log("squareAlphaValue",squareAlphaValue)

        // Paint it!
        square.style.background = `rgba(${red},${green},${blue},${squareAlphaValue}`


        });
    }
}

function clearGrid() {
    const squares = document.querySelectorAll(".custom-square");
    squares.forEach((square) => {
        squareContainer.removeChild(square); // Remove each square from the container
    });
}

// width of square container
let squareContainerSide = 800
// number of squares per rows
let squareRows = 100
// total numbers of square
let squareNum = squareRows**2
let squareSize = squareContainerSide / squareRows
let opacityValue = 1

const squareContainer = document.querySelector(".grid-container");

// Create a square element
const square = document.createElement('div');
// Add a class to the element
square.classList.add('custom-square'); // You can choose any class name you like

const setGridButton = document.getElementById("set-grid-button")
setGridButton.addEventListener("click", () => {
    const gridNumber = prompt("Enter new grid 1-100")
    console.log("gridNumber",gridNumber)

    if (gridNumber >= 1 && gridNumber <= 100) {
        clearGrid()
        // the width of container
        squareContainerSide = 800
        // number of square per rows
        squareRows = gridNumber
        squareNum = squareRows**2
        squareSize = squareContainerSide / squareRows
        setGrid(squareNum)
    } else {
        alert("Please enter number between 1-100")
    }
})


// Get background colour
const backgroundColour = document.getElementById("background-colour")

backgroundColour.addEventListener('input', ()=> {
    squareContainer.style.background = backgroundColour.value;
})

// Get border colour
const borderColour = document.getElementById("border-colour")

borderColour.addEventListener('input', ()=> {
    console.log("borderColour.value",borderColour.value)
    console.log("typeof(borderColour.value)",typeof(borderColour.value))
    //squareContainer.style.boxShadow = `inset 0 0 0 1px ${borderColour.value}`

    const squares = document.querySelectorAll(".custom-square");
    squares.forEach((square) => {
        square.style.boxShadow = `inset 0 0 0 1px ${borderColour.value}`
    });
})

// Get Paint colour
// black is default
let red, green, blue;
red = 0
green = 0
blue = 0

let paintColourValue = "rgba(0,0,0,0)"
const paintColour = document.getElementById("paint-colour")

paintColour.addEventListener('input', ()=> {
    console.log("paintColour.value",paintColour.value)
    console.log("typeof(paintColour.value)",typeof(paintColour.value))
    //squareContainer.style.boxShadow = `inset 0 0 0 1px ${borderColour.value}`
    console.log("paintColour",paintColour)
    paintColourValue = paintColour.value
    console.log("paintColourValue",paintColourValue)

    // using slice method to extract RGB values
    red = parseInt(paintColourValue.slice(1,3), 16)
    green = parseInt(paintColourValue.slice(3,5), 16)
    blue = parseInt(paintColourValue.slice(5,7), 16)

    console.log("red",red)
    console.log("green",green)
    console.log("blue",blue)
})

// set alpha slider value
let alphaValue = 1

// Get the range input element by its ID
const alphaSlider = document.getElementById("alpha-slider");

// Get the paragraph element where you want to display the slider value
let alphaSliderValue = document.getElementById("alpha-slider-value");

// Set the initial value of the slider
alphaSlider.value = alphaValue;

// Display the slider value
alphaSliderValue.textContent = `${alphaValue}`;

// Add an event listener to detect changes in the slider value
alphaSlider.addEventListener("input", function() {
    // Get the current value of the slider
    alphaValue = alphaSlider.value;
    
    // Display the slider value
    alphaSliderValue.textContent = `${alphaValue}`;
});



// initialise grid
setGrid(squareNum)