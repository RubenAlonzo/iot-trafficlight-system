const timeleftTopic = "counter/timeleft";
const colorTopic = "counter/color";
const buttonTopic = "button/click";
const smartphoneTopic = "smartphone/click";

var client = mqtt.connect("ws://localhost:8080") // you add a ws:// url here

client.on('connect', ()=>{
  client.subscribe(buttonTopic) // The counter should react to message from this topic
  client.subscribe(smartphoneTopic) // The counter should react to message from this topic
  console.log("Connected!");
})

// This is how mqtt listen message subscriptions. Modify actions according to topic
client.on('message', (topic, message)=>{
  console.log(topic + ": " + message)

  if(topic == smartphoneTopic){
    if(message == "cross"){
      changeCounterValuesFromObject(initialGreenState);
      console.log("Cross request allowed. Counter initiated on green")
    }
    else if(message == "cancel"){
      changeCounterValuesFromObject(initialYellowState);
      console.log("Cancel cross request allowed. Counter initiated on yellow")
    }
  }
})

// Log and finish client in case of an error
client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})


// *** IOT DEVICE LOGIC ***

function treatDeviceState(timeleft, color){
  if(client.connected == false){
    console.log("The device is not connected");
    return;
  }

  // Publish counter state
  client.publish(timeleftTopic, timeleft.toString())
  client.publish(colorTopic, color.toString())
  
  // console.log(timeleftTopic + ": " + timeleft)
  // console.log(colorTopic + ": " + color)
}