'use strict';

var hoursOpen = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

/***********************--Function Definitions--*******************************/

/* Generate a random number of customers */
function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Generate cookies sold for a particular hour */
function soldCookies(avgCookie, customerHour) {
    return Math.ceil(avgCookie * customerHour);
}

/* Calculate total cookies sold from 6 am to 8 pm */
function getCookieTotal(totalCookies, cookie) {
    return totalCookies + cookie;
}

/* Create a table */
function render(parent, elementType, data) {
    var element = document.createElement(elementType);
    if (data) {
        element.textContent = data;
    }
    parent.appendChild(element);
    return element;
}

/* Create and show table headings */
function renderHeading() {
    var tableElement = render(sectionElement, "table");
    tableElement.setAttribute("id", "report");
    var tableRow = render(tableElement, "tr");
    var headings = ['', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Daily Location Total'];

    headings.forEach(function (heading) {
        w
        render(tableRow, "th", heading);
    });
}

/* Create a table row */
function rowRenderTable(table, dataArray) {
    var newRow = render(table, "tr");
    for (var f = 0; f < dataArray.length; f++) {
        render(newRow, "td", dataArray[f]);
    }
}

/* Create footer row */
function getHourlyTotal(cookieArray1, cookieArray2, cookieArray3, cookieArray4, cookieArray5) {
    var openHours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
    var hourSum = [];
    for (var d = 0; d < openHours.length; d++) {
        hourSum[d] = cookieArray1[d + 1] + cookieArray2[d + 1] + cookieArray3[d + 1] + cookieArray4[d + 1] + cookieArray5[d + 1];
    }
    console.log("hourSum is ", hourSum);
    var cookieHourSum = hourSum.reduce(getCookieTotal);
    console.log("Total cookies sold at all locations for the day: ", cookieHourSum);
    hourSum.unshift("Totals");
    hourSum.push(cookieHourSum);
    rowRenderTable(newTable, hourSum);
    return hourSum;
}

// Calculate total cookies sold from 6 am to 8 pm
function getCookieTotal(totalCookies, cookie) {
    return totalCookies + cookie;
}

// Create a table
function render(parent, elementType, data) {
    var element = document.createElement(elementType);
    if (data) {
        element.textContent = data;
    }
    parent.appendChild(element);
    return element;
}

// Create and show table headings
function renderHeading() {
    var tableElement = render(sectionElement, "table");
    tableElement.setAttribute("id", "report");
    var tableRow = render(tableElement, "tr");
    var headings = ['', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Daily Location Total'];

    headings.forEach(function (heading) {
        render(tableRow, "th", heading);
    });
}

// Create a row
function rowRenderTable(table, dataArray) {
    var newRow = render(table, "tr");
    for (var f = 0; f < dataArray.length; f++) {
        render(newRow, "td", dataArray[f]);
    }
}

// Add row from form submission
function newRowForm(address, minCust, maxCust, cookieAverage) {
    // Get reference to table
    var addressTable = document.getElementById("table-data");

    // Create row
    var addressRow = document.createElement("tr");

    // Add row to table
    addressTable.appendChild(addressRow);

    // Add address name to row
    var addressName = document.createElement("td");
    addressRow.appendChild(addressName);
    addressName.textContent = address;

    // Add address name to row
    var minCustName = document.createElement("td");
    addressRow.appendChild(minCustName);
    addressName.textContent = minCust;

    // Add address name to row
    var maxCustName = document.createElement("td");
    addressRow.appendChild(maxCustName);
    addressName.textContent = maxCust;

    // Add address name to row
    var avgCookieName = document.createElement("td");
    addressRow.appendChild(avgCookieName);
    addressName.textContent = cookieAverage;
}

/**************--End of Function Definitions--***************/


/* Implement a constructor function */

function Locale(address, minCustomer, maxCustomer, avgCookie) {
    this.address = address;
    this.minCustomer = minCustomer;
    this.maxCustomer = maxCustomer;
    this.avgCookie = avgCookie;
    this.randomCustomer = function () {
        return randNum(this.minCustomer, this.maxCustomer);
    };

}

/* Use the constructor function to create an object for each location using the 'new' keyword */

var localeOne = new Locale('1st & Pike', 23, 65, 6.3);
// console.log(localeOne);
var localeTwo = new Locale('SeaTac Airport', 3, 24, 1.2);
var localeThree = new Locale('Seattle Center', 11, 38, 3.7);
var localeFour = new Locale('Capitol Hill', 20, 38, 2.3);
var localeFive = new Locale('Alki', 2, 16, 4.6);

// Locale Prototypes
Locale.prototype.populateHourlyCookies = function () {
    var cookieSold = [];
    for (var i = 0; i < hoursOpen.length; i++) {
        cookieSold[i] = soldCookies(this.avgCookie, this.randomCustomer());
    }
    this.cookieSold = cookieSold;
}

Locale.prototype.rowRenderTable = function (table, cookieSold) {
    var newRow = render(table, "tr");
    for (var f = 0; f < cookieSold.length; f++) {
        render(newRow, "td", cookieSold[f]);
    }
}

var locales = [{ localeOne }, { localeTwo }, { localeThree }, { localeFour }, { localeFive }];

/* Create an array for each locale */
localeOne.populateHourlyCookies();
// console.log(localeOne.populateHourlyCookies);
localeTwo.populateHourlyCookies();
localeThree.populateHourlyCookies();
localeFour.populateHourlyCookies();
localeFive.populateHourlyCookies();

var cookieDataOne = localeOne.cookieSold;
// console.log(`Total cookies sold for each hour at ${localeOne.address}: ${cookieDataOne}`);
var cookieDataTwo = localeTwo.cookieSold;
var cookieDataThree = localeThree.cookieSold;
var cookieDataFour = localeFour.cookieSold;
var cookieDataFive = localeFive.cookieSold;

/* Calculate total cookies sold for the day at each locale */
var cookieSumOne = cookieDataOne.reduce(getCookieTotal);
console.log(cookieSumOne);

var cookieSumTwo = cookieDataTwo.reduce(getCookieTotal);
var cookieSumThree = cookieDataThree.reduce(getCookieTotal);
var cookieSumFour = cookieDataFour.reduce(getCookieTotal);
var cookieSumFive = cookieDataFive.reduce(getCookieTotal);

/* Add locale to the front of the array */
var listTotalOne = cookieDataOne.unshift(localeOne.address);
// console.log(cookieDataOne);
var listTotalTwo = cookieDataTwo.unshift(localeTwo.address);
var listTotalThree = cookieDataThree.unshift(localeThree.address);
var listTotalFour = cookieDataFour.unshift(localeFour.address);
var listTotalFive = cookieDataFive.unshift(localeFive.address);

/* Calculate total cookies sold for the day at each location */
console.log(cookieDataOne);
var totalCookiesOne = cookieDataOne.reduce(getCookieTotal);
// console.log(`Total cookies sold for ${localeOne.address}: ${totalCookiesOne}`);

// Calculate total cookies sold for the day at each location
var totalCookiesTwo = cookieDataTwo.reduce(getCookieTotal);
console.log(cookieDataTwo);
var totalCookiesThree = cookieDataThree.reduce(getCookieTotal);
var totalCookiesFour = cookieDataFour.reduce(getCookieTotal);
var totalCookiesFive = cookieDataFive.reduce(getCookieTotal);

// Add cookie total to end of each locale's array
cookieDataOne.push(cookieSumOne);
cookieDataTwo.push(cookieSumTwo);
cookieDataThree.push(cookieSumThree);
cookieDataFour.push(cookieSumFour);
cookieDataFive.push(cookieSumFive);


/* create a table to store the lists of data for each location */

var sectionElement = document.getElementById("table-data");

// var tableElement = document.createElement("table");
// sectionElement.appendChild(tableElement);
var newTable = render(sectionElement, "table");

// var tableRow = document.createElement("tr");
// tableElement.appendChild(tableRow);
// var newRow = render(newTable, "tr");

// var tableCell = document.createElement("td");
// tableCell.textContent = "This is a test.";
// tableRow.appendChild(tableCell);
// var newCell = render(newRow, "td", "This is a test");

var headings = ['', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Daily Location Total'];

// renderHeading();
rowRenderTable(newTable, headings);
rowRenderTable(newTable, cookieDataOne);
rowRenderTable(newTable, cookieDataTwo);
rowRenderTable(newTable, cookieDataThree);
rowRenderTable(newTable, cookieDataFour);
rowRenderTable(newTable, cookieDataFive);



// Handle form submission
function handleSubmission(event) {
    event.preventDefault();

    // var localeTable = document.getElementById("table-data");

    var address = event.target.addressField.value;
    console.log("address entered was ", address);

    var minCustomer = event.target.minCustomerField.value;
    console.log("minCustomer entered was ", minCustomer);

    var maxCustomer = event.target.maxCustomerField.value;
    console.log("maxCustomer entered was ", maxCustomer);

    var avgCookie = event.target.avgCookieField.value;
    console.log("avgCookie entered was ", avgCookie);


    // Create new locale object using form data
    var formLocale = new Locale(address, minCustomer, maxCustomer, avgCookie);
    console.log(formLocale);

    // Calculate random number of customers for form locale
    var formRandCust = randomCustomerHour(formLocale.minCustomer, formLocale.maxCustomer);
    console.log(formRandCust);

    // Calculate cookes sold for each other from form locale
    var everyCookieHourForm = everyHour(formLocale);
    console.log(everyCookieHourForm);

    // Store hourly cookie totals in an array for locale form
    var formCookieData = populateHourlyCookies(formLocale);
    console.log(formCookieData);

    // Calculate sum of cookies sold for the day for locale form
    var formCookieSum = formCookieData.reduce(getCookieTotal);
    console.log(formCookieSum);

    // Add cookie total to end of the locale array from form
    formCookieData.push(formCookieSum);
    console.log(formCookieData);

    // Add locale address to the front of the locale array from form
    formCookieData.unshift(address);
    console.log(formCookieData);

    rowRenderTable(newTable, formCookieData);
}

var localeForm = document.getElementById("locale-form");

localeForm.addEventListener("submit", handleSubmission);