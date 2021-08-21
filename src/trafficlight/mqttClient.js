var client = mqtt.connect('ws://localhost:8888') // you add a ws:// url here

client.on('connect', ()=>{
  client.subscribe("counter/color")
})

client.on('message', (topic, message)=>{
  console.log(topic + ": " + message)
})
