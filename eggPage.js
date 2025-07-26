window.addEventListener('DOMContentLoaded', () => {

  const eggBtn = document.getElementById('eggImg');

  let eggImagesList = ["assets/red-1.png", "assets/blue-1.png", "assets/green-1.png"]


  let randomIndex = Math.floor(Math.random() * eggImagesList.length);
  let chosenEggImg = eggImagesList[randomIndex];

  eggBtn.style.display = "block";
  eggBtn.src = chosenEggImg;


  let clickCount = 1;

  eggBtn.addEventListener('click', () => {
    console.log("Egg Button clicked");

    clickCount++;
    
    if (randomIndex == 0) {
        eggBtn.src = `assets/red-${clickCount}.png`;
    }else if (randomIndex == 1) {
        eggBtn.src = `assets/blue-${clickCount}.png`;
    }else if (randomIndex == 2) {
        eggBtn.src = `assets/green-${clickCount}.png`;
    }


    if (clickCount > 6) {
        window.api.goToDragonPage();
    }
  });
});