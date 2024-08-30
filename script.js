function emptyGrid(parent) {
  gridArray.forEach(child => {
    parent.removeChild(child);
  });
  gridArray.length = 0;
}

function changeGridSize() {
  emptyGrid(boxesContainer);
  for (let i = 0; i < (gridSizeSlider.value)**2; i++) {
    let newBox = document.createElement("div");
    newBox.classList.add("box");
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
        gridArray[index + brushSize[i]].style.backgroundColor = colorPicker.value;
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
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
document.addEventListener("mouseover", (e) => {
  if (e.target.className === "box" && isMouseDown) {
    draw(e);
  }
});

let brushSizeChanger = document.querySelector("#brush-size")
brushSizeChanger.addEventListener("input", (e) => {
    brushSize = changeBrushSize();
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




