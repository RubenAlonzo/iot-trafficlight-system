var client = mqtt.connect("ws://localhost:8888") // you add a ws:// url here

client.on('connect', ()=>{
  setInterval(()=>{
    client.publish("counter/color", "current counter color")
    console.log('Message sent!')
  }, 1000)
})