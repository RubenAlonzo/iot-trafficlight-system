# iot-trafficlight-system

This project simulates a real trafficlight system interconnected with IoT technology.

It has 5 different and independent devices which are using the MQTT protocol to connect to a
Broker Server so they can publish and subscribe to eachother topics, allowing an indirect communication
between devices.

Each device has its own dependencies. In order to run it:
1. Run: `npm install` on each device root folder
2. After installing the dependencies, you can run all the devices and broker with from their respective root folder using: `npm run start`
