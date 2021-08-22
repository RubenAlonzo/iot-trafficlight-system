const timeleftTopic = "counter/timeleft";
const colorTopic = "counter/color";

var counterTimeleft = 0; // Remaining time for the counter device
var secondsSinceLastCrossRequest = 15 // Start with 5 so its out of cancelable range
var counterColor = "red"; // red, green, yellow

var client = mqtt.connect("ws://localhost:8080") // Configure according your ws broker

client.on('connect', ()=>{
  client.subscribe(timeleftTopic);
  client.subscribe(colorTopic);
  console.log("Connected!");
})

client.on('message', (topic, message)=>{
  // Save the counter state
  if(topic == timeleftTopic){
    counterTimeleft = parseInt(message.toString());
    secondsSinceLastCrossRequest++;
  }
  if(topic == colorTopic)
    counterColor = message.toString();
  
  if(counterColor == "red" && counterTimeleft <= 10) setPhoneText("Cross request un-available");
  if(counterColor == "red" && counterTimeleft > 10) setPhoneText("Cross request available");
  if(counterColor == "green") setPhoneText("You can cross");
  if(counterColor == "yellow"){
    shakePhone();
    setPhoneText("Hurry up!");
  }
})

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

// *** IOT DEVICE LOGIC ***

// Receives events from the current device and and apply smart behaviours accordingly
function treatDeviceEvent(eventType){

  // If the user request a cross and the counter is in red with more than 10 seconds,
  // a cross message is published to allow the user to cross.
  if(eventType == 'cross-click' && counterColor == "red"  && counterTimeleft > 10){
    publishTopicBasedOnDistance("smartphone/click", "cross");
    secondsSinceLastCrossRequest = 0;
  }
  // If the user tries to cancel a crossing state 
  // and hasn't passed more than 15 seconds since he did a cross request, sends a cancel request
  else if(eventType == 'cancel-click' && secondsSinceLastCrossRequest < 15){
    client.publish("smartphone/click", "cancel");
    setPhoneInfoText("Cross request canceled")
    setTimeout(() => setPhoneInfoText(""), 3000);
    console.log("Cross request canceled");
  }
}

// Apply a delay on the publish depending the distance (Maximun 6 meters distance)
function publishTopicBasedOnDistance(topic, message){
  
  var deviceDistance = getDeviceDistance(1, 6);
  setPhoneInfoText("Cross will be available in " + deviceDistance + " second")
  console.log("Device distance: " + deviceDistance + " meters");
  
  setTimeout(function() {
    client.publish(topic, message);
    setPhoneInfoText("");
    console.log("Message sent after " + deviceDistance + " second"); 
  }, deviceDistance * 1000);
}

// This function simulates a device distance calculation (in meters)
// min: minimun distance from the pedestrian crossing
// max: maximun distance from the pedestrian crossing
function getDeviceDistance(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}