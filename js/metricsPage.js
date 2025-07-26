window.addEventListener('DOMContentLoaded', () => {

 const {chosenDragonImg} = require('js\dragonPage.js');

 const dragonImg = document.getElementById('dragonImg');

 dragonImg.src = chosenDragonImg;
 dragonImg.style.display = "block";

  button.addEventListener('click', () => {
    console.log("Button clicked");
    window.api.goToEggPage();
  });
});
