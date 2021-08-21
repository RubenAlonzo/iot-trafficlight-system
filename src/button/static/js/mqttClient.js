var client = mqtt.connect("ws://localhost:8888") // Configure according your ws broker

function publishTopic(topic, value){
  client.publish(topic, value);
  console.log('Message sent!');
}

client.on('connect', ()=>{
  console.log('Connected!');
})

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})
