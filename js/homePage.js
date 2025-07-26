window.addEventListener('DOMContentLoaded', () => {

  const button = document.getElementById('goToEggPage');
  const startBtnAudio = document.getElementById('startBtnAudio');
  // When start button is clicked, play audio and navigate to egg page after a delay
  button.addEventListener('click', () => {
    console.log("Button clicked");
    startBtnAudio.play();
    setTimeout(() => {
      window.api.goToEggPage();
    }, 1500); 
  });
});