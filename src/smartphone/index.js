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
    // Do something when begin button is clicked
});

cancel.addEventListener("click", () => {
    // Do nothing when cancel button is clicked
})