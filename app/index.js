import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { display } from "display";
import * as utils from "../common/utils";
import * as fontDarkPlease from "../resources/fonts/please/dark/please-data.json";
import * as fontLightPlease from "../resources/fonts/please/light/please-data.json";
import * as fontDarkPleaseSmall from "../resources/fonts/please-small/dark/please-small-data.json";
import * as fontLightPleaseSmall from "../resources/fonts/please-small/light/please-small-data.json";
import * as print from "../common/print";

// Update the clock every minute
clock.granularity = "minutes";

let dayColor = "#fdf1e6";
let nightColor = "#000000";

let status = "clock";
const pusheen = document.getElementById("pusheen");
const frameCount = 4;
let curFrame = 1;

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

const dayAnimations = [
  "computer",
  "cupid",
  "dino",
  "fierce",
  "ice-cream",
  "shades",
  "pizza"
];

const nightAnimations = [
  "blanket",
  "nap"
];

// Initial setup
document.getElementById("background").style.fill = (utils.isDay()) ? dayColor : nightColor;
let curAnimation = utils.random((utils.isDay()) ? dayAnimations : nightAnimations);
let font = (utils.isDay()) ? fontDarkPlease : fontLightPlease;
let fontSmall = (utils.isDay()) ? fontDarkPleaseSmall : fontLightPleaseSmall;

// Ask Pusheen functionality
pusheen.addEventListener("click", function() {
  status = "ask";
  curAnimation = "detective";
});

// The animation loop
setInterval(function(){
  if (curFrame < frameCount) {
    curFrame++;
  } else {
    curFrame = 1;
  }
  
  pusheen.href = "animations/"+curAnimation+"/frame"+curFrame+".png";
}, 165);

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
    
  print.font(150, 216, hour+":"+mins+" "+period, font, timeCharacters, "center");
  print.font(150, 269, month+"-"+day+" "+utils.weekday(weekday).substring(0,3)+" "+steps, fontSmall, dateCharacters, "center");
}

// Change the animation when you look away
display.addEventListener("change", function() {
  if (!display.on) {
    if (status == "ask") {
      status = "clock";
      
      if (Math.random() >= 0.5) {
        curAnimation = "yes";
      } else {
        curAnimation = "no";
      }
    } else {
      curAnimation = utils.random((utils.isDay()) ? dayAnimations : nightAnimations);
    }
     
    document.getElementById("background").style.fill = (utils.isDay()) ? dayColor : nightColor;
    font = (utils.isDay()) ? fontDarkPlease : fontLightPlease;
    fontSmall = (utils.isDay()) ? fontDarkPleaseSmall : fontLightPleaseSmall;
  }
});