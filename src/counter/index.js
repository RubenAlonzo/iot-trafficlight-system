const setCounterTime = (time) => {
    document.querySelector(".counter").textContent = time;
};

const setCounterContent = (icon, color = "rgb(111, 201, 111)") => {
    document.querySelector(".counter-icon").textContent = icon;
    document.querySelector(".counter").style.color = color;
};

const toggleIcon = () => {
    const icon = document.querySelector(".counter-icon");
    icon.textContent.trim() == "🏃‍♂️"
        ? (icon.textContent = "🧍‍♂️")
        : (icon.textContent = "🏃‍♂️");
};

const countRemainingTime = (deadline, icon = "🏃‍♂️", textColor = "") => {
    setCounterContent(icon, textColor);
    let intervalId;
    intervalId = setInterval(() => {
        if (deadline > 0) {
            setCounterTime(--deadline);
        } else {
            toggleIcon();
            clearInterval(intervalId);
        }
    }, 1000);
};