const buttonTopic = "button/click";
const smartphoneTopic = "smartphone/click";
var client = mqtt.connect("ws://localhost:8080"); // you add a ws:// url here

// When connecting to the mqtt broker, it subscribes to the counter events
client.on("connect", () => {
    client.subscribe("button/click");
    client.subscribe("smartphone/click");
});

// This is how mqtt listen message subscriptions. Modify actions according to topic
client.on("message", (topic, message) => {
    console.log(topic + ": " + message);

    if (topic == buttonTopic || topic == smartphoneTopic) {
        if (message == "cross") {
            saveNew();
        }
    }
});
