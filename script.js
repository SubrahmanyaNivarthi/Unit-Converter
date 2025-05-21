const conversionType = document.getElementById("conversionType");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");

const converterSection = document.getElementById("converterSection");
const bmiSection = document.getElementById("bmiSection");
const bmiHeight = document.getElementById("bmiHeight");
const bmiWeight = document.getElementById("bmiWeight");
const bmiResult = document.getElementById("bmiResult");

const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    inch: 39.3701,
    foot: 3.28084
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462
  },
  data: {
    bit: 1,
    byte: 0.125,
    kilobyte: 0.00012207,
    megabyte: 0.0000001192,
    gigabyte: 0.0000000001164
  }
};

function loadUnits(category) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  Object.keys(units[category]).forEach(unit => {
    const option1 = new Option(unit, unit);
    const option2 = new Option(unit, unit);
    fromUnit.appendChild(option1);
    toUnit.appendChild(option2);
  });
}

function convert() {
  const category = conversionType.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    result.textContent = "Please enter a number.";
    return;
  }

  const baseValue = value / units[category][from]; // convert to base
  const convertedValue = baseValue * units[category][to];

  result.textContent = `${value} ${from} = ${convertedValue.toFixed(4)} ${to}`;
}

function calculateBMI() {
  const height = parseFloat(bmiHeight.value) / 100; // cm to m
  const weight = parseFloat(bmiWeight.value);

  if (isNaN(height) || isNaN(weight)) {
    bmiResult.textContent = "Please enter valid height and weight.";
    return;
  }

  const bmi = weight / (height * height);
  let status = "";

  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 24.9) status = "Normal";
  else if (bmi < 29.9) status = "Overweight";
  else status = "Obese";

  bmiResult.textContent = `BMI: ${bmi.toFixed(2)} (${status})`;
}

conversionType.addEventListener("change", () => {
  const selected = conversionType.value;

  if (selected === "bmi") {
    converterSection.style.display = "none";
    bmiSection.style.display = "block";
  } else {
    bmiSection.style.display = "none";
    converterSection.style.display = "block";
    loadUnits(selected);
  }

  result.textContent = "";
  bmiResult.textContent = "";
  inputValue.value = "";
});

window.onload = () => {
  loadUnits("length");
};
