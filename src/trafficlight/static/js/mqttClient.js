const timeleftTopic = "counter/timeleft";
const colorTopic = "counter/color";

var counterTimeleft = 0; // Remaining time for the counter device
var counterColor = ""; // red, green, yellow

var client = mqtt.connect('ws://localhost:8080') // you add a ws:// url here

// When connecting to the mqtt broker, it subscribes to the counter events
client.on('connect', ()=>{
  client.subscribe("counter/timeleft")
  client.subscribe("counter/color")
  console.log("Connected!")
})

// This is how mqtt listen message subscriptions. Modify actions according to topic
client.on('message', (topic, message)=>{
  // Save the counter state
  if(topic == timeleftTopic){
    counterTimeleft = parseInt(message.toString());
  }
  if(topic == colorTopic) counterColor = message.toString();

  setDeviceColor();
  // console.log(topic + ": " + message)
});

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

// *** IOT DEVICE LOGIC ***

function setDeviceColor(){
  if(client.connected == false){
    console.log("The device is not connected");
    return;
  }

  if(counterColor == "red" && (counterTimeleft > 5 && counterTimeleft < 56)){
    setActiveLight("green");
  }
  else if(counterColor == "red" && (counterTimeleft > 0 && counterTimeleft < 6)){
    setActiveLight("yellow");
  }
  else if(counterColor == "green" && (counterTimeleft > 5 && counterTimeleft < 31)){
    setActiveLight("red");
  }
  else if(counterColor == "green" && (counterTimeleft > 0 && counterTimeleft < 6)){
    setActiveLight("red");
  }
}