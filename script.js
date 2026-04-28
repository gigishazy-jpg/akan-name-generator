document.getElementById("akanBtn").addEventListener("click", function () {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  // Works for radio OR dropdown
  let genderInput = document.querySelector('input[name="gender"]:checked');
  let gender = genderInput
    ? genderInput.value
    : document.getElementById("gender")?.value;

  const resultBox = document.getElementById("resultText");

  // Create date
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const akanName =
    gender === "male" ? maleNames[dayOfWeek] : femaleNames[dayOfWeek];

  // Display result in the box
  resultBox.innerText = `You were born on a ${days[dayOfWeek]}. Your Akan name is ${akanName}!`;
});
