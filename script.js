const boxesContainer = document.querySelector("#container");

const gridSizeSlider = document.querySelector("#grid-size-slider");
let gridSizeLabel = document.querySelector("#grid-size"); 
let gridArray = [];



function emptyGrid() {
  gridArray.forEach(child => {
    boxesContainer.removeChild(child);
  });
  gridArray.length = 0;
}

function changeGridSize() {
  emptyGrid();
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
}

document.addEventListener("mouseover", (e) => {
  if (e.target.className === "box") {
    if (e.target.style.backgroundColor === "black") {
      e.target.style.backgroundColor = "";
    }
    else {
      e.target.style.backgroundColor = "black";
    }
  }
});

document.addEventListener("input", (e) => {
  gridSizeLabel.textContent = "Grid Size: " + e.target.value;
  changeGridSize();
});

changeGridSize();