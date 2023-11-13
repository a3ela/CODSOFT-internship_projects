const initApp = () => {
  const currentValueEl = document.querySelector(".output-value");
  const previousValEl = document.querySelector(".history-value");
  let itemArray = [];
  const equtionArray = [];
  let newNumberFlag = false;

  const inputButtons = document.querySelectorAll(".number");
  const clearButton = document.querySelector(".clear");
  const deleteButton = document.querySelector(".delete");
  const signchangeButton = document.querySelector(".signChange");
  const optButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector(".equals");

  //numbers finctionality
  inputButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const newInput = e.target.textContent;
      if (newNumberFlag) {
        currentValueEl.value = newInput;
        newNumberFlag = false;
      } else {
        currentValueEl.value =
          currentValueEl.value == 0
            ? newInput
            : `${currentValueEl.value}${newInput}`;
      }
    });
  });

  //clear functionality
  clearButton.addEventListener("click", () => {
    currentValueEl.value = 0;
    previousValEl.textContent = "";
    itemArray = [];
  });

  //equals functionality
  equalsButton.addEventListener("click", () => {
    const currentVal = currentValueEl.value;
    let equationObj;

    if (!itemArray.length && equtionArray.length) {
      const lastEquation = equtionArray[equtionArray.length - 1];
      equationObj = {
        num1: parseFloat(currentVal),
        num2: lastEquation.num2,
        opt: lastEquation.opt,
      };
    } else if (!itemArray.length) {
      return currentVal;
    } else {
      itemArray.push(currentVal);
      equationObj = {
        num1: parseFloat(itemArray[0]),
        num2: parseFloat(currentVal),
        opt: itemArray[1],
      };
    }
    equtionArray.push(equationObj);

    const equationString = `${equationObj["num1"]} ${equationObj["opt"]} ${equationObj["num2"]}`;
    calculate(equationString, currentValueEl);
    previousValEl.textContent = `${equationString} =`;

    newNumberFlag = true;
    itemArray = [];
    console.log(equtionArray);
  });

  //delete functionality
  deleteButton.addEventListener("click", () => {
    if (currentValueEl.value.length == 1) currentValueEl.value = 0;
    else currentValueEl.value = currentValueEl.value.slice(0, -1);
  });

  //signchanger functionality
  signchangeButton.addEventListener("click", () => {
    currentValueEl.value = parseFloat(currentValueEl.value) * -1;
  });

  //operators functionality
  optButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (newNumberFlag) {
        previousValEl.textContent = "";
        itemArray = [];
      }

      const newOperator = e.target.textContent;
      const currentVal = currentValueEl.value;

      if (!itemArray.length && currentVal == 0) return;

      //new equation
      if (!itemArray.length) {
        itemArray.push(currentVal, newOperator);
        previousValEl.textContent = `${currentVal}${newOperator}`;
        return (newNumberFlag = true);
      }

      //complete equation
      if (itemArray.length) {
        itemArray.push(currentVal);

        const equationObj = {
          num1: parseFloat(itemArray[0]),
          num2: parseFloat(currentVal),
          opt: itemArray[1],
        };

        equtionArray.push(equationObj);
        const equationString = `${equationObj["num1"]}
         ${equationObj["opt"]}
         ${equationObj["num2"]}`;

        const newValue = calculate(equationString, currentValueEl);

        previousValEl.textContent = `${newValue} ${newOperator}`;

        itemArray = [newValue, newOperator];
        newNumberFlag = true;
        console.log(equtionArray);
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", initApp());

const calculate = (equation, currentValEl) => {
  const regex = /(^[*/=])|(\s)/g;
  equation.replace(regex, "");
  const divByZero = /(\/0)/.test(equation);
  if (divByZero) return (currentValEl.value = "can't divide by zero");
  return (currentValEl.value = eval(equation));
};
