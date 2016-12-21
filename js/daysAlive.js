function isLeapYear(year) {
  /* Takes in a single parameter called year and calculates whether or not
  the year is a Leap Year. Returns either true or false */

  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function daysInMonth(year, month) {
  /* Takes in two parameters, year and month. checks how many days there
  are in the current month. Returns number of days in month */

  var days = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    case 2:
      if (isLeapYear(year)) {
        days = 29;
      } else {
        days = 28;
      }
      break;
    default:
      break;
  }
  return days;
}

function nextDay(date) {
  /* takes a single parameter called date. moves the date to the next
  day. Returns the new date. */

  if (date[2] < daysInMonth(date[0], date[1])) {
    date[0] = date[0];
    date[1] = date[1];
    date[2] = ++date[2];
    return date;
  } else {
    if (date[1] === 12) {
      date[0] = ++date[0];
      date[1] = 1;
      date[2] = 1;
      return date;
    } else {
      date[0] = date[0];
      date[1] = ++date[1];
      date[2] = 1;
      return date;
    }
  }
}

function isDateBefore(dateOne, dateTwo) {
  /* Takes in two parameters, dateOne and dateTwo. Checks if dates
  are valid. Returns true or false */

  if (dateOne[0] < dateTwo[0]) {
    return true;
  } else if (dateOne[0] === dateTwo[0]) {
    if (dateOne[1] < dateTwo[1]) {
      return true;
    } else if (dateOne[1] === dateTwo[1]) {
      return dateOne[2] < dateTwo[2];
    }
  }
  return false;
}

function daysBetweenDates(dateOne, dateTwo) {
  /* takes in two parameters, dateOne and dateTwo. calculates the number
  of days between dates. returns the number of days.*/

  var days = 0;
  while (isDateBefore(dateOne, dateTwo)) {
    dateOne = nextDay(dateOne);
    days += 1;
  }
  return days;
}

function calculateDates() {
  /* Takes no arguments. Performs the actual calculations. Returns the amount
  of days alive*/

  var dateOfBirth = document.getElementById('calendar');
  dateOfBirth = dateOfBirth.value;
  dateOfBirth = dateOfBirth.split('-');
  var dateOne = [parseInt(dateOfBirth[0], 10), parseInt(dateOfBirth[1], 10), parseInt(dateOfBirth[2], 10)];
  var today = new Date();
  var dateTwo = [today.getFullYear(), today.getMonth() + 1, today.getDate()];

  // Test cases
  //var dateOne = [1989,1,24];
  //var dateTwo = [2016,12,18];

  var answer = daysBetweenDates(dateOne, dateTwo);
  //console.log(answer);
  return answer;
}

function main() {
  /* takes no arguments. Displays the results to the screen. */

  var answer = calculateDates();
  var displayResult = document.getElementById('result');
  displayResult.textContent = answer;
}

var submt = document.getElementById('button');

submt.addEventListener('click', function(e) {
  e.preventDefault();
  main();
}, false);
