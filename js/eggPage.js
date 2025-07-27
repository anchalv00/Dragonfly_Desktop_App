// eggPage.js
// Renderer script for the Egg Page.
// Handles egg cracking animation, audio, and navigation to Dragon Page.

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

  // Get egg image button and crack audio
  const eggBtn = document.getElementById('eggImg');
  const crackAudio = document.getElementById('crackAudio');

  // List of egg images for different colors
  let eggImagesList = ["../assets/images/red-1.png", "../assets/images/blue-1.png", "../assets/images/green-1.png"]

  // Pick a random egg image
  let randomIndex = Math.floor(Math.random() * eggImagesList.length);
  let chosenEggImg = eggImagesList[randomIndex];

  // Show the egg image
  eggBtn.style.display = "block";
  eggBtn.src = chosenEggImg;

  let clickCount = 1;

  // Handle egg cracking animation and navigation
  eggBtn.addEventListener('click', () => {
    console.log("Egg Button clicked");
    crackAudio.currentTime = 0;
    crackAudio.playbackRate = 3;
    crackAudio.play();

    // Wait for audio to finish before changing the egg image
    setTimeout(() => {
      clickCount++;
      // Change egg image based on color and click count
      if (randomIndex == 0) {
        eggBtn.src = `../assets/images/red-${clickCount}.png`;
      } else if (randomIndex == 1) {
        eggBtn.src = `../assets/images/blue-${clickCount}.png`;
      } else if (randomIndex == 2) {
        eggBtn.src = `../assets/images/green-${clickCount}.png`;
      }

      // After 5 clicks, go to Dragon Page
      if (clickCount > 5) {
        window.api.goToDragonPage();
      }

      // Show click text animation
      const clickText = document.getElementById(`clickText${clickCount}`);
      if (clickText) {
        clickText.style.display = "block";
      }
    }, crackAudio.duration * 300); // Short delay for effect
  });
});