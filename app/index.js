import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { display } from "display";
import * as utils from "../common/utils";
import * as fs from "fs";
let font = fs.readFileSync("resources/fonts/big/playfair-data.json", "json");
let fontSmall = fs.readFileSync("resources/fonts/small/playfair-data.json", "json");
import * as print from "../common/print";

// Update the clock every minute
clock.granularity = "minutes";

let status = "clock";
const pusheen = document.getElementById("face");

const timeCharacters = [
  document.getElementById("time1"), 
  document.getElementById("time2"), 
  document.getElementById("time3"), 
  document.getElementById("time4"), 
  document.getElementById("time5"), 
  document.getElementById("time6"), 
  document.getElementById("time7")
];

const dateCharacters = [
  document.getElementById("date1"), 
  document.getElementById("date2"), 
  document.getElementById("date3"), 
  document.getElementById("date4"), 
  document.getElementById("date5"), 
  document.getElementById("date6"), 
  document.getElementById("date7"),
  document.getElementById("date8"),
  document.getElementById("date9"),
  document.getElementById("date10"),
  document.getElementById("date11"),
  document.getElementById("date12"),
  document.getElementById("date13"),
  document.getElementById("date14"),
];

clock.ontick = (evt) => {
  let steps = today.adjusted.steps;
  let date = evt.date;
  let weekday = date.getDay();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let mins = utils.zeroPad(date.getMinutes());

  let period = "am";
  if (hour >= 12) {
    period = "pm";
  }
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hour = hour % 12 || 12;
  } else {
    // 24h format
    hour = utils.zeroPad(hour);
  }
    
  print.font(10, 10, hour+":"+mins+" "+period, font, timeCharacters, "left");
  print.font(10, 50, month+"-"+day+" "+utils.weekday(weekday).substring(0,3)+" "+steps, fontSmall, dateCharacters, "left");
}