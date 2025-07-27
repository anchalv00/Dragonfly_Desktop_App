window.addEventListener('DOMContentLoaded', () => {


  const dragonImg = document.getElementById('dragonImg');
  const buttonAudio = document.getElementById('buttonAudio');
  const feedButton = document.getElementById('feedBtn');
  const trainingButton = document.getElementById('trainBtn');
  const metricsBtn = document.getElementById('metricsBtn');
  const levelUpImg = document.getElementById('levelUpImg');

  const levelNum = document.getElementById('levelNum');

  let moneyBtn = document.getElementById('moneyBtn');
  let moneyAmount;

  let trainTimeLeft;
  let feedTimeLeft;

  let levelBarProgress;

  const levelBar = new ProgressBar.Line('#levelBar', {
        color: '#FE9284',
        duration: 500,
        easing: 'easeInOut',
        svgStyle: { width: '100%', height: '100%' },
    });

  // levelBar.set(levelBarProgress);


  let trainBarProgress;

  const trainBar = new ProgressBar.Line('#trainBar', {
        color: '#FE9284',
        duration: 500,
        easing: 'easeInOut',
        svgStyle: { width: '100%', height: '100%' },
    });

  // trainBar.set(trainBarProgress);


  let dragonImagesList = ["../assets/images/red-dragon.png", "../assets/images/blue-dragon.png", "../assets/images/green-dragon.png"]


  let randomIndex = Math.floor(Math.random() * dragonImagesList.length);
  let chosenDragonImg = dragonImagesList[randomIndex];

  
  window.api.getProgress().then((progress) => {
    if (progress) {
      console.log("Progress loaded:", progress);
      levelNum.textContent = progress.levelNum || 0;
      moneyAmount = progress.moneyAmount || 20;
      moneyBtn.textContent = moneyAmount.toString();
      trainBarProgress = progress.trainBarProgress || 0;
      levelBarProgress = progress.levelBarProgress || 0;  
      trainBar.set(trainBarProgress);
      levelBar.set(levelBarProgress);
      randomIndex = progress.randomIndex;
      if (progress.chosenDragonImg) {
        chosenDragonImg = progress.chosenDragonImg;
      } else {
        randomIndex = Math.floor(Math.random() * dragonImagesList.length);
        chosenDragonImg = dragonImagesList[randomIndex];
      }
      dragonImg.src = chosenDragonImg;
  
    }else {
      console.log("No progress found, using default values.");
      levelNum.textContent = "0";
      moneyAmount = Number(moneyBtn.textContent);
      moneyBtn.textContent = moneyAmount.toString();
      trainBarProgress = 0;
      levelBarProgress = 0;  
      trainBar.set(trainBarProgress);
      levelBar.set(levelBarProgress);
      randomIndex = Math.floor(Math.random() * dragonImagesList.length);
      chosenDragonImg = dragonImagesList[randomIndex];
    }
    console.log("Progress:", progress);
    window.api.setDragon(chosenDragonImg);
    window.api.setRandomInt(randomIndex);

    dragonImg.style.display = "block";
    dragonImg.src = chosenDragonImg;

  });

  


  function showLevelUpImage() {
    levelUpImg.style.display = "block";
    setTimeout(() => {
      levelUpImg.style.display = "none";
    }, 2000);
  }

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
      showLevelUpImage();
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

    buttonAudio.play();

    window.api.saveProgress({
      randomIndex: randomIndex,
      chosenDragonImg: chosenDragonImg,
      levelNum: levelNum.textContent,
      moneyAmount: moneyAmount,
      trainBarProgress: trainBarProgress,
      levelBarProgress: levelBarProgress
    });

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
        showLevelUpImage();
      }

      if (trainBarProgress < 1) {
        trainBarProgress += 0.1;
        trainBar.set(trainBarProgress);
      }

      if (trainBarProgress >= 1) {         
        trainBarProgress = 0;
        trainBar.set(levelBarProgress);
        levelBar.set(0);
        levelNum.textContent = (Number(levelNum.textContent) + 1).toString();
        showLevelUpImage();
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