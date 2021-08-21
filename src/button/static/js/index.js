
const handleButtonCLick = () => {
  publishTopic("button/click", "The button was clicked");
  console.log("clicked!");
}

const mainButton = document.getElementById('main-button');
mainButton.addEventListener('click', handleButtonCLick);
