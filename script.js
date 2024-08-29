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
  updateBrushSize();
}

// Is called when the grid size changes. It then updates the brush sizes
function updateBrushSize() {
  let size = gridSizeSlider.value;
  brushSizeThree = [-size, -1, 0, 1, +size];
  brushSizeFive = [-(size * 2), -(size - 1), -size, -(size + 1), -2, -1, 0, 1, 2, (size + 1), size, (size - 1), (size * 2)];
  brushSizeSeven = [-(size * 3), -(size * 2 - 1), -(size * 2), -(size * 2 + 1), -(size - 2), -(size - 1), -size, -(size + 1), -(size + 2), -3, -2, -1, 0, 1, 2, 3, (size + 2), (size + 1), size, (size - 1), (size - 2), (size * 2 + 1), (size * 2), (size * 2 - 1), (size * 3)];
}

const boxesContainer = document.querySelector("#boxes-container");
let isMouseDown = false;
boxesContainer.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  //e.target.style.backgroundColor = colorPicker.value;
  e.preventDefault();
  const index = gridArray.indexOf(e.target);
  
  for (let i = 0; i < brushSize; i++) {
    gridArray[index + brushSizeThree[i]].style.backgroundColor = colorPicker.value;
  }

});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
document.addEventListener("mouseover", (e) => {
  if (e.target.className === "box" && isMouseDown) {
    const index = gridArray.indexOf(e.target);
    
  
  for (let i = 0; i < 5; i++) {
    gridArray[index + brushSizeThree[i]].style.backgroundColor = colorPicker.value;
  }
    //e.target.style.backgroundColor = colorPicker.value;
  }
});

const gridSizeSlider = document.querySelector("#grid-size-slider");
gridSizeSlider.value = "16";
let gridSizeLabel = document.querySelector("#grid-size"); 
gridSizeLabel.textContent = "Grid Size: " + gridSizeSlider.value;
let colorPicker = document.querySelector("#color-picker");
let gridArray = [];
let brushSize = 1;
let brushSizeThree, brushSizeFive, brushSizeSeven;




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

function changeBrushSize() {
  brushSize = brushSizeChanger.value;
}

let brushSizeChanger = document.querySelector("#brush-size")
brushSizeChanger.addEventListener("input", (e) => {
    changeBrushSize();
});

