/*
  dragonPage.js
  Renderer script for the Dragon Page.
  Handles dragon image, feeding, training, progress bars, and navigation to metrics.
*/

window.addEventListener('DOMContentLoaded', () => {

  // Window control buttons
  const closeBtn = document.getElementById('close-btn');
  const minBtn = document.getElementById('min-btn');

  closeBtn.addEventListener('click', () => {
    window.api.closeWindow();
  });

  minBtn.addEventListener('click', () => {
    window.api.minimizeWindow();
  });

  // Main UI elements
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

  // Progress bar for level
  const levelBar = new ProgressBar.Line('#levelBar', {
        color: '#FE9284',
        duration: 500,
        easing: 'easeInOut',
        svgStyle: { width: '100%', height: '100%' },
    });

  // Progress bar for training
  let trainBarProgress;
  const trainBar = new ProgressBar.Line('#trainBar', {
        color: '#FE9284',
        duration: 500,
        easing: 'easeInOut',
        svgStyle: { width: '100%', height: '100%' },
    });

  // List of possible dragon images
  let dragonImagesList = ["../assets/images/red-dragon.png", "../assets/images/blue-dragon.png", "../assets/images/green-dragon.png"]

  // Pick a random dragon image
  let randomIndex = Math.floor(Math.random() * dragonImagesList.length);
  let chosenDragonImg = dragonImagesList[randomIndex];

  // Load progress from main process (if any)
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
      // No progress found, use defaults
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

  // Show level up image for 2 seconds
  function showLevelUpImage() {
    levelUpImg.style.display = "block";
    setTimeout(() => {
      levelUpImg.style.display = "none";
    }, 2000);
  }

  // Dragon image click event (can add animation here)
  dragonImg.addEventListener('click', () => {
    console.log("Dragon Button clicked");
  });

  // Feed button logic
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
      // If out of money, start cooldown timer
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
    setTimeout(() => {}, 1500); 
  });

  // Metrics button logic (save progress and go to metrics page)
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
    setTimeout(() => {
      window.api.goToMetricsPage();
    }, 800);
  });

  // Train button logic
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

      setTimeout(() => {}, 1500); 

      // Training cooldown timer
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