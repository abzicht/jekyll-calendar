/*
 * Source:  https://github.com/WesSouza/calendar-base
 * License: https://github.com/WesSouza/calendar-base/blob/master/LICENSE
 */
/**
 * Calendar object
 */
var Calendar = /*#__PURE__*/function () {
  /**
   * Calendar constructor
   *
   * @param  options  Calendar options
   */
  function Calendar(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$startDate = _ref.startDate,
        startDate = _ref$startDate === void 0 ? null : _ref$startDate,
        _ref$endDate = _ref.endDate,
        endDate = _ref$endDate === void 0 ? null : _ref$endDate,
        _ref$siblingMonths = _ref.siblingMonths,
        siblingMonths = _ref$siblingMonths === void 0 ? false : _ref$siblingMonths,
        _ref$weekNumbers = _ref.weekNumbers,
        weekNumbers = _ref$weekNumbers === void 0 ? false : _ref$weekNumbers,
        _ref$weekStart = _ref.weekStart,
        weekStart = _ref$weekStart === void 0 ? 0 : _ref$weekStart;

    this.startDate = startDate;
    this.endDate = endDate;
    this.siblingMonths = siblingMonths;
    this.weekNumbers = weekNumbers;
    this.weekStart = weekStart;
  }
  /**
   * Calculate a calendar month
   *
   * @param   year   Year
   * @param   month  Month [0-11]
   * @return         Calendar days
   */


  var _proto = Calendar.prototype;

  _proto.getCalendar = function getCalendar(year, month) {
    var date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    year = date.getUTCFullYear();
    month = date.getUTCMonth();
    var calendar = [];
    var firstDay = date.getUTCDay();
    var firstDate = -((7 - this.weekStart + firstDay) % 7);
    var lastDate = Calendar.daysInMonth(year, month);
    var lastDay = (lastDate - firstDate) % 7;
    var lastDatePreviousMonth = Calendar.daysInMonth(year, month - 1);
    var i = firstDate;
    var currentDay;
    var currentDate;
    var currentDateObject = false;
    var currentWeekNumber = null;
    var otherMonth;
    var otherYear;
    var max = lastDate - i + (lastDay !== 0 ? 7 - lastDay : 0) + firstDate;

    while (i < max) {
      currentDate = i + 1;
      currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;

      if (currentDate < 1 || currentDate > lastDate) {
        if (this.siblingMonths) {
          if (currentDate < 1) {
            otherMonth = month - 1;
            otherYear = year;

            if (otherMonth < 0) {
              otherMonth = 11;
              otherYear--;
            }

            currentDate = lastDatePreviousMonth + currentDate;
          } else if (currentDate > lastDate) {
            otherMonth = month + 1;
            otherYear = year;

            if (otherMonth > 11) {
              otherMonth = 0;
              otherYear++;
            }

            currentDate = i - lastDate + 1;
          }

          if (otherMonth !== undefined && otherYear !== undefined) {
            currentDateObject = {
              day: currentDate,
              weekDay: currentDay,
              month: otherMonth,
              year: otherYear,
              siblingMonth: true
            };
          }
        } else {
          currentDateObject = false;
        }
      } else {
        currentDateObject = {
          day: currentDate,
          weekDay: currentDay,
          month: month,
          year: year
        };
      }

      if (currentDateObject && this.weekNumbers) {
        if (currentWeekNumber === null) {
          currentWeekNumber = Calendar.calculateWeekNumber(currentDateObject);
        } else if (currentDay === 1 && currentWeekNumber === 52) {
          currentWeekNumber = 1;
        } else if (currentDay === 1) {
          currentWeekNumber++;
        }

        currentDateObject.weekNumber = currentWeekNumber;
      }

      if (currentDateObject && this.startDate) {
        currentDateObject.selected = this.isDateSelected(currentDateObject);
      }

      calendar.push(currentDateObject);
      i++;
    }

    return calendar;
  }
  /**
   * Checks if a date is selected
   *
   * @param   date  Date object
   * @return        Selected status of the date
   */
  ;

  _proto.isDateSelected = function isDateSelected(date) {
    if (!this.startDate) {
      return false;
    }

    if (date.year === this.startDate.year && date.month === this.startDate.month && date.day === this.startDate.day) {
      return true;
    }

    if (!this.endDate) {
      return false;
    }

    if (date.year === this.startDate.year && date.month === this.startDate.month && date.day < this.startDate.day) {
      return false;
    }

    if (date.year === this.endDate.year && date.month === this.endDate.month && date.day > this.endDate.day) {
      return false;
    }

    if (date.year === this.startDate.year && date.month < this.startDate.month) {
      return false;
    }

    if (date.year === this.endDate.year && date.month > this.endDate.month) {
      return false;
    }

    if (date.year < this.startDate.year) {
      return false;
    }

    if (date.year > this.endDate.year) {
      return false;
    }

    return true;
  }
  /**
   * Sets the selected period start
   *
   * @param  date  Date object
   */
  ;

  _proto.setStartDate = function setStartDate(date) {
    this.startDate = date;
  }
  /**
   * Sets the selected period end
   *
   * @param  date  Date object
   */
  ;

  _proto.setEndDate = function setEndDate(date) {
    this.endDate = date;
  }
  /**
   * Sets one selected date
   *
   * @param  date  Date object
   */
  ;

  _proto.setDate = function setDate(date) {
    return this.setStartDate(date);
  }
  /**
   * Calculates the difference between two dates (date1 - date2), in days
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return             Days between the dates
   */
  ;

  Calendar.diff = function diff(dateLeft, dateRight) {
    var dateLeftDate = new Date(Date.UTC(dateLeft.year, dateLeft.month, dateLeft.day, 0, 0, 0, 0));
    var dateRightDate = new Date(Date.UTC(dateRight.year, dateRight.month, dateRight.day, 0, 0, 0, 0));
    return Math.ceil((dateLeftDate.getTime() - dateRightDate.getTime()) / 86400000);
  }
  /**
   * Calculates the interval between two dates
   *
   * @param   dateLeft   Date object
   * @param   dateRight  Date object
   * @return             Number of days between dates
   */
  ;

  Calendar.interval = function interval(dateLeft, dateRight) {
    return Math.abs(Calendar.diff(dateLeft, dateRight)) + 1;
  }
  /**
   * Quickly compare two dates
   *
   * @param   dateLeft   Left `CalendarDate` object
   * @param   dateRight  Right `CalendarDate` object
   * @return             Comparison result: -1 (left < right), 0 (equal) or 1 (left > right)
   */
  ;

  Calendar.compare = function compare(dateLeft, dateRight) {
    if (typeof dateLeft !== 'object' || typeof dateRight !== 'object' || dateLeft === null || dateRight === null) {
      throw new TypeError('dates must be objects');
    }

    if (dateLeft.year < dateRight.year) {
      return -1;
    }

    if (dateLeft.year > dateRight.year) {
      return 1;
    }

    if (dateLeft.month < dateRight.month) {
      return -1;
    }

    if (dateLeft.month > dateRight.month) {
      return 1;
    }

    if (dateLeft.day < dateRight.day) {
      return -1;
    }

    if (dateLeft.day > dateRight.day) {
      return 1;
    }

    return 0;
  }
  /**
   * Calculates the number of days in a month
   *
   * @param   year  Year
   * @param   month Month [0-11]
   * @return        Length of the month
   */
  ;

  Calendar.daysInMonth = function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  /**
   * Calculates if a given year is a leap year
   *
   * @param   year  Year
   * @return        Leap year or not
   */
  ;

  Calendar.isLeapYear = function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  /**
   * Calculates the week number for a given date
   *
   * @param   date  Date object
   * @return        Week number
   */
  // Adapted from http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
  ;

  Calendar.calculateWeekNumber = function calculateWeekNumber(date) {
    // Creates the requested date
    var current = new Date(Date.UTC(date.year, date.month, date.day, 0, 0, 0, 0)); // Create a copy of the object

    var target = new Date(current.valueOf()); // ISO week date weeks start on monday so correct the day number

    var dayNr = (current.getUTCDay() + 6) % 7; // ISO 8601 states that week 1 is the week with the first thursday of that
    // year. Set the target date to the thursday in the target week.

    target.setUTCDate(target.getUTCDate() - dayNr + 3); // Store the millisecond value of the target date

    var firstThursday = target.valueOf(); // Set the target to the first thursday of the year
    // First set the target to january first

    target.setUTCMonth(0, 1); // Not a thursday? Correct the date to the next thursday

    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + (4 - target.getUTCDay() + 7) % 7);
    } // The week number is the number of weeks between the  first thursday of the
    // year and the thursday in the target week.
    // 604800000 = 7 * 24 * 3600 * 1000


    return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  };

  return Calendar;
}();

//# sourceMappingURL=calendarbase.esm.js.map
