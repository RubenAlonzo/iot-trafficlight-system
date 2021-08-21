var client = mqtt.connect("ws://localhost:8080") // Configure according your ws broker

function publishTopic(topic, value){
  client.publish(topic, value);
  console.log('Message sent!');
}

// When connecting to the mqtt broker, it subscribes to the counter events
client.on('connect', ()=>{
  client.subscribe("counter/timeleft")
  client.subscribe("counter/color")
})

// This is how mqtt listen message subscriptions. Modify actions according to topic
client.on('message', (topic, message)=>{
  console.log(topic + ": " + message)
})

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

// IOT DEVICE LOGIC

function treatDeviceEvent(eventType){

  // Add some logic to decide what should be published

  // TODO: This device should be able to send begin or cancel cross messages. 
  // If the counter is in green (trafficlight in red), nothing happens
  // The mqtt client should evaluate what action to take

  // Logic for testing:
  if(eventType == 'cross-click'){
    publishTopic("smartphone/click", "begin from smartphone");
  }
  else if(eventType == 'cancel-click'){
    publishTopic("smartphone/click", "cancel from smartphone");
  }
}
