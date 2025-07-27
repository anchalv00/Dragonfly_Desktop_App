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
 const description = document.getElementById('description');

 dragonImg.style.display = "block";


let redDragonMetrics = ["Name: Blaze", "Origin: Volcanic Island", "Type: Fire", "Blaze lives on a fiery volcano where the ground is always hot and lava bubbles below. He's fast, loud, and loves flying through smoke and fire. Blaze gets grumpy when others enter his home, but deep down, he loves showing off."];
let blueDragonMetrics = ["Name: Bluey", "Origin: Icy Atlantic", "Type: Water", "Bluey swims in the coldest parts of the ocean, gliding through ice and snow like a shadow. He's quiet, clever, and loves exploring frozen caves. Bluey doesn't like to fight, but if he has to, he'll freeze a whole wave in seconds."];
let greenDragonMetrics = ["Name: Brownie", "Origin: West Jungle", "Type: Earth", "Brownie lives deep in the jungle, hidden among trees, vines, and moss. She's slow, strong, and loves peace and quiet. Most creatures don't even know she's there until the ground starts to shake!"];


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
      description.textContent = redDragonMetrics[3];
    } else if (randomIntConverted == 1) {
      dragonName.textContent = blueDragonMetrics[0];
      dragonOrigin.textContent = blueDragonMetrics[1];
      dragonType.textContent = blueDragonMetrics[2];
      description.textContent = blueDragonMetrics[3];
    } else if (randomIntConverted == 2) {
      dragonName.textContent = greenDragonMetrics[0];
      dragonOrigin.textContent = greenDragonMetrics[1];
      dragonType.textContent = greenDragonMetrics[2];
      description.textContent = greenDragonMetrics[3];
    }
    dragonName.classList.remove('hidden');
    dragonOrigin.classList.remove('hidden');
    dragonType.classList.remove('hidden');
    description.classList.remove('hidden');
  }
    
});

exitBtn.addEventListener('click', () => {
  console.log("Exit Button clicked");
  buttonAudio.play();
  setTimeout(() => {
    window.api.goToDragonPage();
  }, 800); 
});

});