// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  
  return i;
}

export function weekday(i) {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[i];
}

export function isDay() {
  let hour = new Date().getHours();
  
  if (hour >= 6 && hour <= 20) {
    return true;
  } else {
    return false;
  }
}

export function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}