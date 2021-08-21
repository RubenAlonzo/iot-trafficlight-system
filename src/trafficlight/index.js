const setActiveLight = (lightIndex = 0) => {
    let lights = document.querySelectorAll('.traffic-light > span')
    lights.forEach((light, index) => {
        if (lightIndex === index) 
            light.style.opacity = 1;
        else light.style.opacity = 0.2;
    })
};
     

