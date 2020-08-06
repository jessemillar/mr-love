export function font(x, y, message, characters, elements, align = "left", space = 10, kerning = 0) {
  let cursorX = x;
  let cursorY = y;

  // Hide all elements
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.visibility = "hidden";
  }

  if (align != "left") {
    let width = 0;

    // Calculate the overall width of the message
    for (var i = 0; i < message.length; i++) {
      let char = translate(message[i]);

      if (char == " ") {
        width += space + kerning;
        continue;
      }

      width += characters[char].width + kerning;
    }

    // Place the starting point of the cursor based on the width of the message
    if (align == "center") {
      cursorX -= width / 2;
    } else if (align == "right") {
      cursorX = x - width;
    }
  }

  let curElement = 0;

  for (var i = 0; i < message.length; i++) {
    let char = translate(message[i]);

    // Handle spaces
    if (char == " ") {
      cursorX += space + kerning;
      continue;
    }

    elements[curElement].x = cursorX;
    elements[curElement].y = cursorY;
    elements[curElement].width = characters[char].width;
    elements[curElement].height = characters[char].height;
    elements[curElement].href = characters[char].href;
    // elements[curElement].style.fill = "#ffffff";
    elements[curElement].style.visibility = "visible";

    curElement++;

    cursorX += characters[char].width + kerning;
  }
}

// Translate special characters to filename-safe names
function translate(character) {
  switch(character) {
    case "0":
      return "zero";
    case "1":
      return "one";
    case "2":
      return "two";
    case "3":
      return "three";
    case "4":
      return "four";
    case "5":
      return "five";
    case "6":
      return "six";
    case "7":
      return "seven";
    case "8":
      return "eight";
    case "9":
      return "nine";
    case ":":
      return "colon";
    case "-":
      return "dash";
    default:
      return character;
  }
}
