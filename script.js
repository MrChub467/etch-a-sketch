const boxesContainer = document.querySelector("#container");

for (let i = 0; i < 16**2; i++) {
  let newBox = document.createElement("div");
  newBox.classList.add("box");
  newBox.textContent = "box";
  boxesContainer.appendChild(newBox);
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