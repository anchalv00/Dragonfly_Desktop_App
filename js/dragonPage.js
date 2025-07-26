window.addEventListener('DOMContentLoaded', () => {

  const dragonImg = document.getElementById('dragonImg');
  const metricsBtn = document.getElementById('metricsBtn');


  let dragonImagesList = ["../assets/images/red-dragon.png", "../assets/images/blue-dragon.png", "../assets/images/green-dragon.png"]


  let randomIndex = Math.floor(Math.random() * dragonImagesList.length);
  let chosenDragonImg = dragonImagesList[randomIndex];

  dragonImg.style.display = "block";
  dragonImg.src = chosenDragonImg;

    module.exports = {
        chosenDragonImg
    };


  metricsBtn.addEventListener('click', () => {
    console.log("Metrics Button clicked");

    window.api.goToMetricsPage();
  });
});