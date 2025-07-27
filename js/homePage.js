window.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('close-btn');
  const minBtn = document.getElementById('min-btn');

  closeBtn.addEventListener('click', () => {
    window.api.closeWindow();
  });

  minBtn.addEventListener('click', () => {
    window.api.minimizeWindow();
  });
  
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