window.addEventListener('DOMContentLoaded', () => {

  const closeBtn = document.getElementById('close-btn');
  const minBtn = document.getElementById('min-btn');

  closeBtn.addEventListener('click', () => {
    window.api.closeWindow();
  });

  minBtn.addEventListener('click', () => {
    window.api.minimizeWindow();
  });

 const dragonImg = document.getElementById('dragonImg');
 const dragonName = document.getElementById('dragonName');
 const dragonOrigin = document.getElementById('dragonOrigin');  
 const dragonType = document.getElementById('dragonType');
 const exitBtn = document.getElementById('exitBtn');

 dragonImg.style.display = "block";


let redDragonMetrics = ["Blaze", "Volcanic Island", "Fire"];
let blueDragonMetrics = ["Bluey", "Icy Atlantic", "Water"];
let greenDragonMetrics = ["Brownie", "West Jungle", "Earth"];


window.api.getDragon().then((chosenDragonImg) => {
    if (chosenDragonImg) {
      console.log("Chosen Dragon Image:", chosenDragonImg);
      document.getElementById('dragonImg').src = chosenDragonImg;
    }
});

window.api.getRandomInt().then((randomInt) => {
  console.log("Random Int:", randomInt);
  const randomIntConverted = Number(randomInt);

  if (randomIntConverted >= 0 && randomIntConverted < 3) {
    console.log("Chosen Random Int:", randomIntConverted);
    if (randomIntConverted == 0) {
      dragonName.textContent = redDragonMetrics[0];
      dragonOrigin.textContent = redDragonMetrics[1];
      dragonType.textContent = redDragonMetrics[2];
    } else if (randomIntConverted == 1) {
      dragonName.textContent = blueDragonMetrics[0];
      dragonOrigin.textContent = blueDragonMetrics[1];
      dragonType.textContent = blueDragonMetrics[2];
    } else if (randomIntConverted == 2) {
      dragonName.textContent = greenDragonMetrics[0];
      dragonOrigin.textContent = greenDragonMetrics[1];
      dragonType.textContent = greenDragonMetrics[2];
    }
    dragonName.classList.remove('hidden');
    dragonOrigin.classList.remove('hidden');
    dragonType.classList.remove('hidden');
  }
    
});

exitBtn.addEventListener('click', () => {
  console.log("Exit Button clicked");
  buttonAudio.play();
  setTimeout(() => {
    window.api.goToDragonPage();
  }, 1500); 
});

});
