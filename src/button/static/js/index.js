
const btnCross = document.getElementById('cross-button');
const btnCancel = document.getElementById("cancel-button");

btnCross.addEventListener("click", () => {
  treatDeviceEvent("cross-click") //Simulate a real event captured by the IoT device
});

btnCancel.addEventListener("click", () => {
  treatDeviceEvent("cancel-click") //Simulate a real event captured by the IoT device
});
