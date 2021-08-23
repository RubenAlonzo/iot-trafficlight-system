const setActiveLight = (lightColor = "green") => {
    let trafficLight = document.querySelector('traffic-light')
    trafficLight.color = lightColor;
};