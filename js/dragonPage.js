window.addEventListener('DOMContentLoaded', () => {

  const dragonImg = document.getElementById('dragonImg');
  const buttonAudio = document.getElementById('buttonAudio');
  const feedButton = document.getElementById('feedBtn');
  const trainingButton = document.getElementById('trainBtn');
  const metricsBtn = document.getElementById('metricsBtn');

  const levelNum = document.getElementById('levelNum');

  let moneyBtn = document.getElementById('moneyBtn');
  let moneyAmount = Number(moneyBtn.textContent);

  let trainTimeLeft = 10;
  let feedTimeLeft = 10;

  let levelBarProgress = 0;

  const levelBar = new ProgressBar.Line('#levelBar', {
        // strokeWidth: 4,
        color: '#FE9284',
        // trailColor: '#eee',
        // trailWidth: 1,
        duration: 500,
        easing: 'easeInOut',
        svgStyle: { width: '100%', height: '100%' },
    });

  levelBar.set(levelBarProgress);

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

    if (levelBarProgress < 1  && moneyAmount > 0) {
      levelBarProgress += 0.25;
      levelBar.set(levelBarProgress);
    }

    if (levelBarProgress >= 1) {         
      levelBarProgress = 0;
      levelBar.set(levelBarProgress);
      levelNum.textContent = (Number(levelNum.textContent) + 1).toString();
    }


    if (moneyAmount > 0) {
      moneyAmount -= 5;
      moneyBtn.textContent = moneyAmount.toString();
    }else {
      feedTimeLeft = 10;

      const countdown = setInterval(() => {
        const mins = String(Math.floor(feedTimeLeft/60)).padStart(2,'0');
        const secs = String(feedTimeLeft % 60).padStart(2, '0');
        feedButton.textContent = `${mins}:${secs}`;
        feedTimeLeft--;

        if (feedTimeLeft < 0) {
            clearInterval(countdown);
            feedButton.textContent = "FEED";
            moneyAmount = 20;
            moneyBtn.textContent = moneyAmount.toString();
            feedButton.disabled = false;
        }else {
            feedButton.disabled = true;
        }
      }, 1000); 
    }

    setTimeout(() => {

    }, 1500); 

  });


  metricsBtn.addEventListener('click', () => {
    console.log("Metrics Button clicked");

    window.api.goToMetricsPage();
  });

  const timer = document.getElementById('timer');


  trainingButton.addEventListener('click', () => {
      console.log("Training Button clicked");
      buttonAudio.play();

      if (levelBarProgress < 1) {
        levelBarProgress += 0.5;
        levelBar.set(levelBarProgress);
      }

      if (levelBarProgress >= 1) {         
        levelBarProgress = 0;
        levelBar.set(levelBarProgress);
        levelNum.textContent = (Number(levelNum.textContent) + 1).toString();
      }

      setTimeout(() => {

      }, 1500); 

      trainTimeLeft = 10;

      const countdown = setInterval(() => {
        const mins = String(Math.floor(trainTimeLeft/60)).padStart(2,'0');
        const secs = String(trainTimeLeft % 60).padStart(2, '0');
        trainingButton.textContent = `${mins}:${secs}`;
        trainTimeLeft--;

        if (trainTimeLeft < 0) {
            clearInterval(countdown);
            trainingButton.textContent = "TRAIN";
            trainingButton.disabled = false;
        }else {
            trainingButton.disabled = true;
        }
      }, 1000); 

      });

});