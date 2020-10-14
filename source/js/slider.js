'use strict';

(function () {

  var slides = document.querySelectorAll('#slides .slide');
  var buttons = document.querySelectorAll('.portfolio__controls');
  var list = document.querySelector('.portfolio__list');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide,4000);
  var playing = true;
  var pauseButton = document.getElementById('pause');
  var pauseText = document.getElementById('pause-text');
  var next = document.getElementById('next');
  var previous = document.getElementById('previous');

  for(var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'inline-block'
  }

  function nextSlide() {
    goToSlide(currentSlide+1);
  }

  function previousSlide() {
    goToSlide(currentSlide-1);
  }

  function goToSlide(n) {

    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
  }

  function pauseSlideshow() {
    // pauseText.textContent = '►';
    pauseText.className = 'portfolio__play-text';
    playing = false;
    clearInterval(slideInterval);
  }

  function playSlideshow() {
    // pauseText.textContent = '||';
    pauseText.className = 'portfolio__pause-text';
    playing = true;
    slideInterval = setInterval(nextSlide,4000);
  }

  var onPauseButton = function (evt) {
    evt.preventDefault();

    if(playing) {
      pauseSlideshow();
    } else {
      playSlideshow();
    }
  }

  var onNextButton = function (evt) {
    evt.preventDefault();

    pauseSlideshow();
    nextSlide();
  };

  var onPreviousButton = function (evt) {
    evt.preventDefault();

    pauseSlideshow();
    previousSlide();
  };

  pauseButton.removeEventListener('click', onPauseButton);
  pauseButton.addEventListener('click', onPauseButton);

  next.removeEventListener('click', onNextButton);
  next.addEventListener('click', onNextButton);

  previous.removeEventListener('click', onPreviousButton);
  previous.addEventListener('click', onPreviousButton);

})();
