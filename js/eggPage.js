window.addEventListener('DOMContentLoaded', () => {

  const eggBtn = document.getElementById('eggImg');
  // const clickText2 = document.getElementById('click_text_2');
  // const clickText3 = document.getElementById('click_text_3');
  // const clickText4 = document.getElementById('click_text_4');


  let eggImagesList = ["../assets/images/red-1.png", "../assets/images/blue-1.png", "../assets/images/green-1.png"]


  let randomIndex = Math.floor(Math.random() * eggImagesList.length);
  let chosenEggImg = eggImagesList[randomIndex];

  eggBtn.style.display = "block";
  eggBtn.src = chosenEggImg;


  let clickCount = 1;

  eggBtn.addEventListener('click', () => {
    console.log("Egg Button clicked");

    clickCount++;
    
    if (randomIndex == 0) {
        eggBtn.src = `../assets/images/red-${clickCount}.png`;
    }else if (randomIndex == 1) {
        eggBtn.src = `../assets/images/blue-${clickCount}.png`;
    }else if (randomIndex == 2) {
        eggBtn.src = `../assets/images/green-${clickCount}.png`;
    }


    if (clickCount > 5) {
        window.api.goToDragonPage();
    }

    const clickText = document.getElementById(`clickText${clickCount}`);
    if (clickText) {
      clickText.style.display = "block";
    }

  });
});