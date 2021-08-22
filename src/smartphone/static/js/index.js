const cancelBTN = document.getElementById("cancel-button");
const beginBTN = document.getElementById("begin-button");
const phoneText = document.getElementById("user-title");
const infoText = document.getElementById("info");

const setPhoneText = (text = "Wait...") => {
  phoneText.innerText = text;
}

const setPhoneInfoText = (text = "") => {
  infoText.innerText = text;
}

const shakePhone = () => {
    const DOMphone = document.querySelector(".phone-background");
    DOMphone.classList.add("shake");
    setTimeout(() => {
        DOMphone.classList.remove("shake");
    }, 1000);
};

beginBTN.addEventListener("click", () => {
    treatDeviceEvent("cross-click") //Simulate a real event captured by the IoT device
});

cancelBTN.addEventListener("click", () => {
    treatDeviceEvent("cancel-click") //Simulate a real event captured by the IoT device
})