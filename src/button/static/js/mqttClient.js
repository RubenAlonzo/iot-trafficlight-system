const colorTopic = "counter/color";
const buttonTopic = "button/click";

var counterTimeleft = 0; // Remaining time for the counter device
var counterColor; // red, green, yellow

var client = mqtt.connect("ws://localhost:8080") // Configure according your ws broker

client.on('connect', ()=>{
  client.subscribe(colorTopic);
  console.log("Connected!");
})

client.on('message', (topic, message)=>{
  if(topic == colorTopic) counterColor = message.toString();
  console.log("Connected!");
})

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

// *** IOT DEVICE LOGIC ***

// Receives events from the current device and and apply smart behaviours accordingly
function treatDeviceEvent(eventType){

  if(eventType == 'cross-click' && counterColor == "red"){
    client.publish(buttonTopic, "cross");
    console.log("A cross request was sent");
  }
  else if(eventType == "cancel-click" && counterColor == "green"){
    client.publish(buttonTopic, "cancel");
    console.log("A cancel cross request was sent");
  }
}
