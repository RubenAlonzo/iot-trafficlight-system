// Allowed icons
const crossIcon = "🏃‍♂️";
const stayIcon = "🧍‍♂️";

// Use current interval to cancel the interval created using clearInterval()
var currentInterval = 0;

// Allowed colors
const greenColor = {
  value: "rgb(111, 201, 111)",
  colorName: "green"
}
const yellowColor = {
  value: "rgb(249, 169, 25)",
  colorName: "yellow"
}
const redColor = {
  value: "rgb(220, 53, 50)",
  colorName: "red"
}

// Counter initial states
const initialRedState = {
  initialTime: 55,
  color: redColor,
  icon: stayIcon
}
const initialYellowState = {
  initialTime: 5,
  color: yellowColor,
  icon: crossIcon
}
const initialGreenState = {
  initialTime: 30,
  color: greenColor,
  icon: crossIcon
}

const setCounterTime = (time) => {
    document.querySelector(".counter").textContent = time;
};

const setCounterContent = (icon, color = greenColor) => {
    document.querySelector(".counter-icon").textContent = icon;
    document.querySelector(".counter").style.color = color;
};

const start = (timeleft = 55, color = redColor, icon = stayIcon) => {

  if(timeleft > 55 || timeleft < 1){  // Make sure only counts between 1-55 are allowed
    console.log("Invalid timeleft while attempting to start the counter");
    return;
  }
   
  if(color != redColor && color != yellowColor && color != greenColor){ // Make sure only the predefined colors are set
    console.log("Invalid color while attempting to start the counter");
    return;
  } 
  
  if(icon != stayIcon && icon != crossIcon){ // Make sure only the predefined icons are set
    console.log("Invalid icon while attempting to start the counter");
    return;
  }

  // If it gets here, means the parameters are valid

  if(currentInterval != null) clearInterval(currentInterval);

  currentInterval = setInterval(()=>{
    setCounterTime(timeleft);
    setCounterContent(icon, color.value);
    treatDeviceState(timeleft, color.colorName); //Simulate a state captured by the IoT device

    timeleft--;

    if(color == redColor && timeleft < 1){ // Red count ending. Starting the green count

      timeleft = initialGreenState.initialTime;
      color = initialGreenState.color;
      icon =  initialGreenState.icon;
    }
    if(color == greenColor && timeleft < 1){ // Green count ending. Starting the yellow count

      // TODO:Reproduce a sound here like: You Can cross now
      timeleft = initialYellowState.initialTime;
      color = initialYellowState.color;
      icon =  initialYellowState.icon;
    }
    if(color == yellowColor && timeleft < 1){ // Yellow count ending. Starting the red count

      // TODO:Reproduce a regresive count with the seconds from the yellow counter, like: Five!, four!, three! ...
      timeleft = initialRedState.initialTime;
      color = initialRedState.color;
      icon = initialRedState.icon;
    }
  }, 1000);
}

const changeCounterValuesFromObject = (initialStateObject) => {
  // Make sure the object is valid
  if(initialStateObject.initialTime == null || initialStateObject.color == null || initialStateObject.icon == null){
    console.log("Invalid object passed for changing the counter values.");
    return;
  }

  clearInterval(currentInterval);
  currentInterval = null;
  start(initialStateObject.initialTime, initialStateObject.color, initialStateObject.icon);
}

// Start running the counter defaults
start();
