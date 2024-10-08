const boxesContainer = document.querySelector("#boxes-container");
const colorPicker = document.querySelector("#color-picker");
const brushSizeChanger = document.querySelector("#brush-size")
const eraserBtn = document.querySelector(".eraser")
const colorBtn = document.querySelector(".color-button")
const clear = document.querySelector(".clear")
const gridSizeLabel = document.querySelector("#grid-size"); 
const lines = document.querySelector(".lines")
const sizeSlider = document.querySelector("#grid-size-slider");

let gridLines = false;
let currentMode = "color";
let gridArray = [];
let brushSize = [0];
let isMouseDown = false;

sizeSlider.value = "16";
gridSizeLabel.textContent = "Grid Size: " + sizeSlider.value;

changeGridSize();

// -------------------- Grid event listeners and functions -------------------- //

// Disables the arrow keys on the sizeSlider
sizeSlider.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
      e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
      }
});

// Changes the text of the label
sizeSlider.addEventListener("input", (e) => {
  gridSizeLabel.textContent = "Grid Size: " + e.target.value;
});

// Changes the size of the grip when the mouse is released
sizeSlider.addEventListener("mouseup", (e) => {
  changeGridSize();
});

// Empties the grid
function emptyGrid(parent) {
  parent.innerHTML = "";
  gridArray.length = 0;
}

// Changes the grid size
function changeGridSize() {
  emptyGrid(boxesContainer);
  for (let i = 0; i < (sizeSlider.value)**2; i++) {
    let newBox = document.createElement("div");
    newBox.classList.add("box");
    if (gridLines) newBox.classList.add("grid-lines");
    gridArray.push(newBox);
    boxesContainer.appendChild(newBox);
  }
  let newFlexBasis = 100 / sizeSlider.value;
  gridArray.forEach(box => {
    box.style.flexBasis = newFlexBasis + "%";
  });
  brushSize = changeBrushSize();
}

// -------------------- Drawing event listeners and functions -------------------- //

boxesContainer.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  e.preventDefault();
  draw(e);
});
boxesContainer.addEventListener("mouseup", () => {
  isMouseDown = false;
});
boxesContainer.addEventListener("mouseover", (e) => {
  if (isMouseDown) {
    draw(e);
  }
});
boxesContainer.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

// Draws on the grid and calls isElementInArea
function draw(e) {
  const index = gridArray.indexOf(e.target);
  for (let i = 0; i < brushSize.length; i++) {
    if (gridArray[index + brushSize[i]] !== undefined) {
      if (isElementInArea(gridArray[index + brushSize[i]], e.target)) {
        if (currentMode === "eraser") {
          gridArray[index + brushSize[i]].style.backgroundColor = "";
        } else {
          gridArray[index + brushSize[i]].style.backgroundColor = colorPicker.value;
        }
      }
    }
  }
}

// Checks to see if you are drawing up next to the right or left edge.
// Stops the drawing from going over to the other side
function isElementInArea(element, target) {
  const elementRect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  let test;

  if (elementRect.left * 1.4 <= targetRect.left) {
    test = false;
  }
  else if (elementRect.left >= targetRect.left * 1.4){
    test = false;
  }
  else {
    test = true;
  }
  return (
    test
  )
}

// -------------------- Options event listeners and functions -------------------- //

//Calls changeBrushSize when a new brush size is inputted
brushSizeChanger.addEventListener("input", (e) => {
  brushSize = changeBrushSize();
});

// Changes mode to eraser
eraserBtn.addEventListener("click", () => {
changeMode("eraser")
})

// Changes mode to color
colorBtn.addEventListener("click", () => {
changeMode("color");
})

// Clears the color of the grid
clear.addEventListener("click", () => {
gridArray.forEach(box => {
  box.style.backgroundColor = "";
})
});

// Adds the grid lines
lines.addEventListener("click", () => {
  if (gridLines) {
    gridArray.forEach(box => {
      box.classList.remove("grid-lines");
    });
    gridLines = false;
    lines.textContent = "Grid Lines: On";
  } else {
    gridArray.forEach(box => {
      box.classList.add("grid-lines");
    });
    gridLines = true;
    lines.textContent = "Grid Lines: Off";
  }
});

// Updates the brush size when the grid size changes
function changeBrushSize() {
  let size = Number(sizeSlider.value);
  let brush = Number(brushSizeChanger.value);

  switch (brush) {
    case 1:
      return [0];
    case 3:
      return [-size, -1, 0, 1, +size];
    case 5:
      return [-(size * 2), -(size - 1), -size, -(size + 1), -2, -1, 0, 1, 2, (size + 1), size, (size - 1), (size * 2)];
      break;
    case 7:
      return [-(size * 3), -(size * 2 - 1), -(size * 2), -(size * 2 + 1), -(size - 2), -(size - 1), -size, -(size + 1), -(size + 2), -3, -2, -1, 0, 1, 2, 3, (size + 2), (size + 1), size, (size - 1), (size - 2), (size * 2 + 1), (size * 2), (size * 2 - 1), (size * 3)];
  }
}

// Changes the mode to either color or eraser
function changeMode(newMode) {
  if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else {
    eraserBtn.classList.remove("active");
  }
  if (newMode === "color") {
    colorBtn.classList.add("active");
  } else {
    eraserBtn.classList.add("active");
  }
  currentMode = newMode;
}