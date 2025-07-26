window.addEventListener('DOMContentLoaded', () => {

  const button = document.getElementById('goToEggPage');

  button.addEventListener('click', () => {
    console.log("Button clicked");
    window.api.goToEggPage();
  });
});