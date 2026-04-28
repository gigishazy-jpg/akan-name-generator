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

let defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "-- Select Month --";
monthSelect.appendChild(defaultOption);

months.forEach((m, i) => {
  let option = document.createElement("option");
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

// ===== LEAP YEAR =====
function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// ===== VALIDATION FUNCTIONS =====
function validateDay() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearInput.value);

  if (!day) return (dayError.innerText = "Day required");
  if (day < 1) return (dayError.innerText = "Invalid day");

  if (month && year) {
    const daysInMonth = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    if (day > daysInMonth[month - 1]) {
      return (dayError.innerText = "Invalid for this month");
    }
  }

  dayError.innerText = "";
  return true;
}

function validateMonth() {
  if (!monthSelect.value) {
    monthError.innerText = "Select month";
    return false;
  }
  monthError.innerText = "";
  return true;
}

function validateYear() {
  const year = yearInput.value;

  if (!year) return (yearError.innerText = "Year required");
  if (year.length !== 4 || year > 2030) {
    return (yearError.innerText = "4 digits ≤ 2030");
  }

  yearError.innerText = "";
  return true;
}

function validateGender() {
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    genderError.innerText = "Select gender";
    return false;
  }
  genderError.innerText = "";
  return true;
}

// ===== ELEMENT REFERENCES =====
const dayInput = document.getElementById("day");
const yearInput = document.getElementById("year");

const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");
const genderError = document.getElementById("genderError");

// ===== LIVE VALIDATION EVENTS =====
dayInput.addEventListener("input", validateDay);
monthSelect.addEventListener("change", () => {
  validateMonth();
  validateDay();
});
yearInput.addEventListener("input", validateYear);

document
  .querySelectorAll('input[name="gender"]')
  .forEach((r) => r.addEventListener("change", validateGender));

// ===== FORM SUBMIT =====
document.getElementById("akanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    !validateDay() ||
    !validateMonth() ||
    !validateYear() ||
    !validateGender()
  )
    return;

  const day = parseInt(dayInput.value);
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearInput.value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  // ===== FORMULA =====
  const CC = Math.floor(year / 100);
  const YY = year % 100;

  let d =
    Math.floor(
      CC / 4 - 2 * CC - 1 + (5 * YY) / 4 + (26 * (month + 1)) / 10 + day,
    ) % 7;

  if (d < 0) d = (d + 7) % 7;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const male = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
  const female = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

  const name = gender === "male" ? male[d] : female[d];

  document.getElementById("resultText").innerText =
    `You were born on a ${days[d]}. Your Akan name is ${name}!`;
});
