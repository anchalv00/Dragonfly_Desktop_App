// homePage.js
// Renderer script for the Home Page.
// Handles window controls and navigation to the Egg Page.

window.addEventListener('DOMContentLoaded', () => {
  // Get window control buttons
  const closeBtn = document.getElementById('close-btn');
  const minBtn = document.getElementById('min-btn');

  // Close the app window when close button is clicked
  closeBtn.addEventListener('click', () => {
    window.api.closeWindow();
  });

  // Minimize the app window when minimize button is clicked
  minBtn.addEventListener('click', () => {
    window.api.minimizeWindow();
  });
  
  // Get the start button and audio element
  const button = document.getElementById('goToEggPage');
  const startBtnAudio = document.getElementById('startBtnAudio');

  // When start button is clicked, play audio and navigate to egg page after a delay
  button.addEventListener('click', () => {
    console.log("Button clicked");
    startBtnAudio.play();
    setTimeout(() => {
      window.api.goToEggPage();
    }, 1500); // Wait for audio to finish before navigating
  });
});