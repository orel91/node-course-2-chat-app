var moment = require("moment");

// var date = new Date();
// var months = ["Jan", "Feb"];
// console.log(date.getMonth());

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format("MMM Do YYYY h:mm:ss a"));