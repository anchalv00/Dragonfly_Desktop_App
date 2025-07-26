window.addEventListener('DOMContentLoaded', () => {

  const dragonImg = document.getElementById('dragonImg');

  let dragonImagesList = ["../assets/images/red-dragon.png", "../assets/images/blue-dragon.png", "../assets/images/green-dragon.png"]


  let randomIndex = Math.floor(Math.random() * dragonImagesList.length);
  let chosenDragonImg = dragonImagesList[randomIndex];

  dragonImg.style.display = "block";
  dragonImg.src = chosenDragonImg;


  dragonImg.addEventListener('click', () => {
    console.log("Dragon Button clicked");


  });
});