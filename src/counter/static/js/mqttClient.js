var client = mqtt.connect("ws://localhost:8080") // you add a ws:// url here

client.on('connect', ()=>{
  client.subscribe("button/click") // The counter should react to message from this topic
  client.subscribe("smartphone/click") // The counter should react to message from this topic

  // The interval below publish the counter topics.These topics will be called from the counter index.js
  setInterval(()=>{
    client.publish("counter/timeleft", "Pass time left in seconds")
    client.publish("counter/color", "Pass current color") 
    console.log('Message sent!')
  }, 1000)

})

// This is how mqtt listen message subscriptions. Modify actions according to topic
client.on('message', (topic, message)=>{
  console.log(topic + ": " + message)
})

// Log and finish client in case of an error
client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})
