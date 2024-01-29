let form = document.querySelector("form");
let spans = document.querySelectorAll(".card .body div span:first-child");
let day = document.querySelector(".card .day input");
let month = document.querySelector(".card .month input");
let year = document.querySelector(".card .year input");
let errorYear = document.querySelector(".error-year");
let errorMonth = document.querySelector(".error-month");
let errorDay = document.querySelector(".error-day");
let icon = document.querySelector(".line img");
let outputYear = document.querySelector(".actualYear");
let outputMonth = document.querySelector(".actualMonth");
let outputDay = document.querySelector(".actualDay");

let date = new Date();
icon.addEventListener("click", () => {
  errorDay.innerHTML = "";
  errorMonth.innerHTML = "";
  errorYear.innerHTML = "";
  outputYear.innerHTML = "--";
  outputMonth.innerHTML = "--";
  outputDay.innerHTML = "--";
  yearError(false);
  monthError(false);
  dayError(false);

  if (day.value === "" || day.value > 31 || day.value < 1) {
    errorDay.innerHTML = "*Invalid Day";
    dayError(true);
    return;
  }

  if (month.value === "" || month.value > 12 || month.value < 1) {
    errorMonth.innerHTML = "*Invalid Month";
    monthError(true);
    return;
  }

  if (year.value === "" || year.value > date.getFullYear()) {
    errorYear.innerHTML = "*Invalid Year";
    yearError(true);
    return;
  }

  const maxDaysInMonth = new Date(year, month, 0).getDate();
  if (day.value > maxDaysInMonth) {
    errorDay.innerHTML = "*You entered day past the number of days this month";
    dayError();
    return;
  }

  if (day.value === "" || month.value === "" || year.value === "") {
    spans.forEach((span) => {
      span.innerHTML = "--";
    });
    return;
  }

  calcAge();
});

if (day.value === "" || month.value === "" || year.value === "") {
  spans.forEach((span) => {
    span.innerHTML = "--";
  });
}

let calcAge = function () {
  let monthValue = month.value;
  let dayValue = day.value;
  let yearValue = year.value;

  let dob = new Date(`${monthValue} ${dayValue} ${yearValue}`);

  if (dob > date) {
    alert("Cant put future date");
  }

  let ageDifference = date.getTime() - dob.getTime();

  let years = Math.floor(ageDifference / 1000 / 3600 / 24 / 365);
  let months = Math.floor(
    (ageDifference % (1000 * 3600 * 24 * 365)) / (1000 * 3600 * 24 * 30.44)
  );
  let days = Math.floor(
    (ageDifference % (1000 * 3600 * 24 * 30.44)) / (1000 * 3600 * 24)
  );

  outputYear.innerHTML = years;
  outputMonth.innerHTML = months;
  outputDay.innerHTML = days;
};

let dayError = function (hasError) {
  day.style.borderColor = hasError ? "red" : "";
};

let monthError = function (hasError) {
  month.style.borderColor = hasError ? "red" : "";
};

let yearError = function (hasError) {
  year.style.borderColor = hasError ? "red" : "";
};
