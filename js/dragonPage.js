window.addEventListener('DOMContentLoaded', () => {

  const dragonImg = document.getElementById('dragonImg');
  const buttonAudio = document.getElementById('buttonAudio');
  const feedButton = document.getElementById('feedBtn');
  const trainingButton = document.getElementById('trainBtn');
  const metricsBtn = document.getElementById('metricsBtn');


  let dragonImagesList = ["../assets/images/red-dragon.png", "../assets/images/blue-dragon.png", "../assets/images/green-dragon.png"]


  let randomIndex = Math.floor(Math.random() * dragonImagesList.length);
  let chosenDragonImg = dragonImagesList[randomIndex];

  window.api.setDragon(chosenDragonImg);
  window.api.setRandomInt(randomIndex);

  dragonImg.style.display = "block";
  dragonImg.src = chosenDragonImg;

  dragonImg.addEventListener('click', () => {
    console.log("Dragon Button clicked");
 
  });

  feedButton.addEventListener('click', () => {
    console.log("Feed Button clicked");
    buttonAudio.play();
    setTimeout(() => {

    }, 1500); 

    module.exports = {
        chosenDragonImg
    };


  metricsBtn.addEventListener('click', () => {
    console.log("Metrics Button clicked");

    window.api.goToMetricsPage();
  });

  trainingButton.addEventListener('click', () => {
    console.log("Training Button clicked");
    buttonAudio.play();
    setTimeout(() => {

    }, 1500); 
  });

});