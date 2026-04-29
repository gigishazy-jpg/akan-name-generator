// ===== MONTH DROPDOWN =====
const monthSelect = document.getElementById("month");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Default option
monthSelect.innerHTML = '<option value="">-- Select Month --</option>';
// sets the first option as a placeholder so nothing is selected initially

// Populate months
months.forEach((m, i) => {
  // loops through every item in the array
  const option = document.createElement("option");
  // creates a new html element that goes into the select dropdown
  option.value = i + 1;
  // the i represents the index 0 that starts in the array + 1 bcz the months are usually numbered 1-12 
  option.text = m;
  // m represents month hence sets the visible text of the dropdown
  monthSelect.appendChild(option);
  // adds the newly created option into select element after each loop the dropdown grows
});

// ===== PREVENT NEGATIVE INPUT =====
["day", "year"].forEach((id) => {
  // in the array of  the id day and year for each loops through its a method 
  // loops through 2 ids day and year each once
  // for each item in the day and year run the method 
  // => takes the id day and year into the parenthesis to run through the methods
  const input = document.getElementById(id);
  // checks what is input in the ids day and year 
  // => this is an arrow function used to write functions in a shorter way
  // used getElementById to find the elements id in the html

  input.addEventListener("keydown", (e) => {
    if (e.key === "-" || e.key === "e") e.preventDefault();
  });
// keydown runs when a key is pressed
// (e) event object tells you what is pressed in the keys
// "-" when you press the - negative key it refuses to add itself in the input bcz it is prevented 
// through the prevent default which stops the key from appearing in the input
  input.addEventListener("input", () => {
    if (input.value < 0) input.value = "";
    // input runs whenever the  value is typed or pasted if the value is negative it clears the input
  });
});

// ===== LEAP YEAR FUNCTION =====
function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
// calculates the year if its both divisible by 4 and 100 remainder is 0
//  if its not divisible by 100 return false and if true it should also be divisible by 400
//  && means both should be true || or one condition should be true to be true

// ===== DAYS IN MONTH =====
function getDaysInMonth(month, year) {
  if ([4, 6, 9, 11].includes(month)) return 30;
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return 31;
}
// 

// ===== ELEMENTS =====
const dayInput = document.getElementById("day");
const yearInput = document.getElementById("year");
const result = document.getElementById("resultText");

// ===== LIVE VALIDATION =====
function validateDate() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearInput.value);

  if (!day || !month || !year) return false;

  if (day < 1) {
    result.innerText = "Day must be at least 1.";
    return false;
  }

  const maxDays = getDaysInMonth(month, year);

  if (day > maxDays) {
    result.innerText = `Invalid date! ${months[month - 1]} has only ${maxDays} days.`;
    return false;
  }

  result.innerText = "";
  return true;
}

// ===== LIVE EVENTS =====
dayInput.addEventListener("input", validateDate);
monthSelect.addEventListener("change", validateDate);
yearInput.addEventListener("input", validateDate);

// ===== FORM SUBMIT =====
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); //  stop page refresh

  const day = parseInt(dayInput.value);
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearInput.value);

  // ✅ Gender from dropdown
  const gender = document.getElementById("gender").value;

  // ===== VALIDATION =====
  if (!day || !month || !year || gender === "") {
    result.innerText = "Please fill all fields!";
    return;
  }

  if (year < 0) {
    result.innerText = "Year cannot be negative.";
    return;
  }

  if (year.toString().length !== 4 || year > 2030) {
    result.innerText = "Year must be 4 digits and ≤ 2030.";
    return;
  }

  if (!validateDate()) return;

  // ===== FORMULA CALCULATION =====

  // Adjust Jan & Feb
  let adjYear = year;
  let adjMonth = month;

  if (month === 1 || month === 2) {
    adjMonth = month + 12;
    adjYear = year - 1;
  }

  const CC = Math.floor(adjYear / 100);
  const YY = adjYear % 100;
  const MM = adjMonth;
  const DD = day;

  let d =
    Math.floor(CC / 4 - 2 * CC - 1 + (5 * YY) / 4 + (26 * (MM + 1)) / 10 + DD) %
    7;

  // Fix negative mod
  if (d < 0) d = (d + 7) % 7;

  // ===== DAY NAMES =====
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // ===== AKAN NAMES =====
  const maleNames = [
    "Kwasi",
    "Kwadwo",
    "Kwabena",
    "Kwaku",
    "Yaw",
    "Kofi",
    "Kwame",
  ];

  const femaleNames = [
    "Akosua",
    "Adwoa",
    "Abenaa",
    "Akua",
    "Yaa",
    "Afua",
    "Ama",
  ];

  const akanName = gender === "male" ? maleNames[d] : femaleNames[d];

  // ===== DISPLAY RESULT =====
  result.innerText = `You were born on a ${days[d]}. Your Akan name is ${akanName}!`;
});
