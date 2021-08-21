const setActiveLight = (lightIndex = 0) => {
    let lights = document.querySelectorAll('.traffic-light > span')
    lights.forEach((light, index) => {
        if (lightIndex === index) 
            light.style.opacity = 1;
        else light.style.opacity = 0.2;
    })
};

// TODO: Implement the https://www.npmjs.com/package/web-traffic-light library for the traffic light

// TODO: The trafficlight should adjust its light according to the counter topics. 
// A algorithm to inffer trafficlight state from counter state should be implemented 