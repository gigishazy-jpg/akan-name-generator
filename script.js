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

// Populate months
months.forEach((m, i) => {
  const option = document.createElement("option");
  option.value = i + 1;
  option.text = m;
  monthSelect.appendChild(option);
});

// ===== PREVENT NEGATIVE INPUT =====
["day", "year"].forEach((id) => {
  const input = document.getElementById(id);

  input.addEventListener("keydown", (e) => {
    if (e.key === "-" || e.key === "e") e.preventDefault();
  });

  input.addEventListener("input", () => {
    if (input.value < 0) input.value = "";
  });
});

// ===== LEAP YEAR FUNCTION =====
function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// ===== DAYS IN MONTH =====
function getDaysInMonth(month, year) {
  if ([4, 6, 9, 11].includes(month)) return 30;
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return 31;
}

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
  e.preventDefault(); // 🚫 stop page refresh

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
