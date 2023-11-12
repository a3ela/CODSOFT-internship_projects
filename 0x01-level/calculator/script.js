const initApp = () => {
  const historyVal = document.getElementById("historyvalue");
  const outputval = document.getElementById("outputvalue");
  let itemArray = [];
  let equationArray = [];
  let newNumberFlag = false;

  const buttons = document.querySelectorAll(".number");
  const clearBtn = document.getElementById("clear");
  const deleteBtn = document.getElementById("backspace");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let currentval = e.target.textContent;

      if (newNumberFlag) {
        outputval.innerText = currentval;
      } else {
        outputval.innerText =
          outputval.innerText == 0
            ? currentval
            : `${outputval.innerHTML}${currentval}`;
      }
    });
  });

  clearBtn.addEventListener("click", () => {
    outputval.innerText = 0;
    itemArray = [];
  });

  deleteBtn.addEventListener("click", () => {
    if (outputval.innerText.length == 1) outputval.innerText = 0;
    else outputval.innerText = outputval.innerText.slice(0, -1);
  });
};

document.addEventListener("DOMContentLoaded", initApp);
