const cancelBTN = document.getElementById("cancel-button");
const beginBTN = document.getElementById("begin-button");

const shakePhone = () => {
    const DOMphone = document.querySelector(".phone-background");
    DOMphone.classList.add("shake");
    setTimeout(() => {
        DOMphone.classList.remove("shake");
    }, 3000);
};

beginBTN.addEventListener("click", () => {
    shakePhone();
    treatDeviceEvent("cross-click") //Simulate a real event captured by the IoT device
});

cancelBTN.addEventListener("click", () => {
    treatDeviceEvent("cancel-click") //Simulate a real event captured by the IoT device
})