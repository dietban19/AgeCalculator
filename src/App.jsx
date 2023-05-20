import { useState, useEffect } from "react";
import Arrow from "./assets/icon-arrow.svg";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

function App() {
  const [age, setAge] = useState({ days: null, months: null, years: null });
  const [date, setDate] = useState({
    day: Number(new Date().getDate()),
    month: Number(new Date().getMonth() + 1),
    year: Number(new Date().getFullYear()),
  });
  const currDate = new Date(date.year, date.month - 1, date.day);

  // check if date is in the future
  const handleCompareDate = (e) => {
    const myOwnDate = new Date(e.years, e.months - 1, e.days);

    if (currDate > myOwnDate) {
      // console.log("past");
      return false;
    } else if (currDate < myOwnDate) {
      // console.log("future");
      return true;
    }
  };

  const handleError = (n, message = "er", type = "add") => {
    const t = document.getElementById(`${n}`);
    if (n === "form-age-container") {
      const child = t.children;
      child[0].children[2].innerHTML = message;
      for (let i = 0; i < child.length; i++) {
        const childs = child[i];
        // Do something with each child element

        childs.classList[type]("error");
        childs.classList[type]("shake");
        childs.addEventListener("animationend", () =>
          childs.classList.remove("shake")
        );
      }

      // child.classList[type]("error");
    } else {
      t.nextElementSibling.innerHTML = message;
      t.parentElement.classList[type]("error");
      t.parentElement.classList[type]("shake");
      t.parentElement.addEventListener("animationend", () =>
        t.parentElement.classList.remove("shake")
      );
    }
  };

  function checkInput({ days, months, years }) {
    // checks if year is valid
    if (years === 0) {
      age.years = 0;
      handleError("year", "Valid Year is Required");
    } else {
      handleError("year", " ", "remove");
    }

    // checks if day is valid
    if (days === 0) {
      age.days = 0;
      handleError("day", "Valid Day is Required");
    } else {
      if (days > 31) {
        handleError("day", "There are only 31 days in a month");
      } else if (days <= 0) {
        handleError("day", "Day must be greater than 0");
      } else {
        handleError("day", " ", "remove");
      }
    }

    // checks if month is valid
    if (months === 0) {
      age.months = 0;
      handleError("month", "Valid Month is Required");
    } else {
      if (months > 12) {
        handleError("month", "There are only 12 months in a year");
      } else if (months <= 0) {
        handleError("month", "Month must be greater than 0");
      } else {
        handleError("month", " ", "remove");
      }
    }

    //check if current date is in the past
    if (handleCompareDate({ days, months, years })) {
      handleError("form-age-container", "Date must be in the past");
    }
  }

  const handleCalculateAge = (e) => {
    const myOwnDate = new Date(e.years, e.months - 1, e.days);
    let leap = (date.year % myOwnDate.getFullYear()) / 4;
    let daysInMonth = [
      31,
      28 + { leap },
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

    var myYear = date.year - e.years;
    var myMonth = date.month - e.months;
    console.log(date.month);
    console.log(e.months);
    var myDay = date.day - e.days;
    console.log(myYear, myMonth, myDay);

    if (myMonth < 0) {
      myYear -= 1;
      myMonth += 12;
    }
    if (myDay < 0) {
      myMonth -= 1;
      myDay += daysInMonth[e.months];
    }
    setAge({
      days: myDay,
      months: myMonth,
      years: myYear,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { day, month, year } = event.target.elements;

    const userInputs = {
      days: Number(day.value),
      months: Number(month.value),
      years: Number(year.value),
    };

    checkInput(userInputs);

    // check if any class has the class 'error'
    let x = document.querySelectorAll('[class*="error"]');

    if (!document.querySelectorAll('[class*="error"]').length > 0) {
      return handleCalculateAge(userInputs);
    }
  };

  return (
    <body>
      <main>
        <form className="form-header" onSubmit={handleSubmit}>
          <div className="form-age-container" id="form-age-container">
            <div className="input-container" id="input-container">
              <label htmlFor="day">Day</label>
              <input type="number" name="day" id="day" placeholder="DD" />
              <span className="err-info"></span>
            </div>
            <div className="input-container">
              <label htmlFor="month">Month</label>
              <input type="number" name="month" id="month" placeholder="MM" />
              <span className="err-info"></span>
            </div>
            <div className="input-container">
              <label htmlFor="year">Year</label>
              <input type="number" name="year" id="year" placeholder="YY" />
              <span className="err-info visually-hidden"></span>
            </div>
          </div>
          <div className="submit-button">
            <button type="submit">
              <img src={Arrow} alt="arrow" />
            </button>
          </div>
        </form>

        <section className="result-container">
          <div className="result">
            <span className="output-text">
              {age.days === null ? "--" : age.years}
            </span>
            <h1 className="output-text">Years</h1>
          </div>
          <div className="result">
            <span className="output-text">
              {age.days === null ? "--" : age.months}
            </span>
            <h1 className="output-text">Months</h1>
          </div>
          <div className="result">
            <span className="output-text">
              {age.days === null ? "--" : age.days}
            </span>
            <h1 className="output-text">Days</h1>
          </div>
        </section>
      </main>
    </body>
  );
}

export default App;
