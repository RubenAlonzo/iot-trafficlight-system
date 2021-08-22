const setActiveLight = (lightColor = "green") => {
    let trafficLight = document.querySelector('traffic-light')
    trafficLight.color = lightColor;
};


// TODO: Implement the https://www.npmjs.com/package/web-traffic-light library for the traffic light


// TODO: The trafficlight should adjust its light according to the counter topics. 
// A algorithm to inffer trafficlight state from counter state should be implemented 