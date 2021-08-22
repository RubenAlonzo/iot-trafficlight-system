var client = mqtt.connect("ws://localhost:8080") // Configure according your ws broker
const timeleftTopic = "counter/timeleft";
const colorTopic = "counter/color";
var counterTimeleft = 0; // Remaining time for the counter device
var capturedTimeLeft = 0 // Remaining counter time when a cross request is done
var counterColor = "red"; // red, green, yellow

client.on('connect', ()=>{
  client.subscribe(timeleftTopic);
  client.subscribe(colorTopic);
  console.log("Connected!");
})

client.on('message', (topic, message)=>{
  // Save the counter state
  if(topic == timeleftTopic)
    counterTimeleft = message;
  else if(topic == colorTopic)
    counterColor = message;

  console.log(topic + ": " + message)
})

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

// *** IOT DEVICE LOGIC ***

// Receiver events from the current device and and apply smart behaviours accordingly
function treatDeviceEvent(eventType){

  // If the user request a cross and the counter is in red with more than 10 seconds,
  // a cross message is published to allow the user to cross.
  if(eventType == 'cross-click' && counterColor == "red" && counterTimeleft > 10){
    publishTopicBasedOnDistance("smartphone/click", "cross");
    capturedTimeLeft = counterTimeleft;
  }
  // If the user tries to cancel a crossing state which has more than 10 seconds left 
  // and hasn't passed more than 5 seconds since he did a cross request; sends a cancel request
  else if(eventType == 'cancel-click' && counterColor == "green" && counterTimeleft > 10 && isCrossCancelable()){
    client.publish("smartphone/click", "cancel");
    capturedTimeLeft = 0;
  }
}

// Determines if a cross request can be canceled
function isCrossCancelable(){

  // If the capture time left is 0, means the user hasn't done a cross request early before
  if(capturedTimeLeft == 0) return false;
  
  // Determines if it hasn't passed more than 5 seconds after the cross request
  return !(counterTimeleft < (capturedTimeLeft - 5));
}

// Apply a delay on the publish or ignore it depending the distance
function publishTopicBasedOnDistance(topic, message){
  var deviceDistance = getDeviceDistance(0, 11);
  console.log("Device distance: " + deviceDistance + " meters");
  if(deviceDistance <= 1){
    setTimeout(function() {
     client.publish(topic, message);
     console.log("Message sent after 1 second"); 
    }, 1000);
  }
  else if(deviceDistance <= 3){
    setTimeout(function() {
      client.publish(topic, message);
      console.log("Message sent after 3 second");        
    }, 3000);
  }
  else if(deviceDistance <= 5){
    setTimeout(function() {
      client.publish(topic, message);
      console.log("Message sent after 5 second");  
    }, 5000);
  }
  else{
    console.log("Too far from pedestrian crossing to send a cross request");  
  }
}

// This function simulates a device distance calculation (in meters)
// min: minimun distance from the pedestrian crossing
// max: maximun distance from the pedestrian crossing
function getDeviceDistance(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}