function emptyGrid(parent) {
  parent.innerHTML = "";
  gridArray.length = 0;
}

function changeGridSize() {
  emptyGrid(boxesContainer);
  for (let i = 0; i < (gridSizeSlider.value)**2; i++) {
    let newBox = document.createElement("div");
    newBox.classList.add("box");
    if (gridLines) newBox.id = "grid-lines";
    gridArray.push(newBox);
    boxesContainer.appendChild(newBox);
  }
  let newFlexBasis = 100 / gridSizeSlider.value;
  gridArray.forEach(box => {
    box.style.flexBasis = newFlexBasis + "%";
  });
  brushSize = changeBrushSize();
}

// Is called when the grid size changes. It then updates the brush sizes
function changeBrushSize() {
  let size = Number(gridSizeSlider.value);
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

// Checks to see if you are drawing up next to the right or left edge. Stops the drawing from going over to the other side
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

let isMouseDown = false;
const boxesContainer = document.querySelector("#boxes-container");
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

let brushSizeChanger = document.querySelector("#brush-size")
brushSizeChanger.addEventListener("input", (e) => {
    brushSize = changeBrushSize();
});

// Select the eraser
let eraserBtn = document.querySelector(".eraser")
eraserBtn.addEventListener("click", () => {
  changeMode("eraser")
})
let currentMode = "color";

const colorBtn = document.querySelector(".color-button")
colorBtn.addEventListener("click", () => {
  changeMode("color");
})
// Clear the color of the grid
const clear = document.querySelector(".clear")
clear.addEventListener("click", () => {
  gridArray.forEach(box => {
    box.style.backgroundColor = "";
  })
});

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
let gridLines = false;
const lines = document.querySelector(".lines")
lines.addEventListener("click", () => {
  if (gridLines) {
    gridArray.forEach(box => {
      box.id = "";
    });
    gridLines = false;
    lines.textContent = "Grid Lines: On";
  } else {
    gridArray.forEach(box => {
      box.id = "grid-lines";
    });
    gridLines = true;
    lines.textContent = "Grid Lines: Off";
  }
});




const gridSizeSlider = document.querySelector("#grid-size-slider");
gridSizeSlider.value = "16";
let gridSizeLabel = document.querySelector("#grid-size"); 
gridSizeLabel.textContent = "Grid Size: " + gridSizeSlider.value;
let colorPicker = document.querySelector("#color-picker");
let gridArray = [];
let brushSize = [0];





changeGridSize();

// Grid Size Slider event listeners to disable the arrow keys, change the size of the grip when the mouse is released, and to change the text of the label
gridSizeSlider.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
      e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
      }
});
gridSizeSlider.addEventListener("input", (e) => {
  gridSizeLabel.textContent = "Grid Size: " + e.target.value;
});
gridSizeSlider.addEventListener("mouseup", (e) => {
  changeGridSize();
});




