'use strict';

(function () {

  var KEY_ESCAPE = "Escape";
  var KEY_ENTER = "Enter";
  var popup = document.querySelector(".popup");
  var close = popup.querySelector(".popup__close");
  var buttons = document.querySelectorAll(".button-js");
  var menu = document.querySelectorAll(".feedback__link");
  var places = document.querySelectorAll(".places__link");
  var cards = document.querySelectorAll(".feedback__card-item");
  var mainNavigation = document.querySelector(".page-header__wrapper");
  var toggleMenu = document.querySelector(".page-header__toggle");
  var listMenu = document.querySelector(".page-header__list");
  var listContact = document.querySelector(".page-header__contact-list");
  var trip = document.querySelector(".trip");
  var fields = document.querySelectorAll(".popup__input");
  var submit = document.querySelector(".popup__button");
  var texts = document.querySelectorAll(".popup__mistake");

  var isEscPress = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  var isEnterPress = function (evt, action) {
    if (evt.key === KEY_ENTER) {
      action();
    }
  };

  var addPopup = function () {
    popup.classList.add("popup__active");
    var but = document.querySelector(".popup__close");

    document.addEventListener("keydown", isEscPress);
    close.addEventListener("keydown", isEnterPress);
    close.addEventListener("click", closePopup);

  };

  buttons.forEach(function (button) {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();
      addPopup();
    });
  });

  var closePopup = function () {
    popup.classList.remove("popup__active");
    document.removeEventListener('keydown', isEscPress);
    close.removeEventListener('click', closePopup);
    close.removeEventListener("keydown", isEnterPress);
  };

  var showPlace = function (place, menu, element) {

    place.addEventListener("click", function () {

      var menus = document.querySelectorAll('.feedback__link');
      var cards = document.querySelectorAll('.feedback__card-item');

      for (var i = 0; i < menus.length; i++) {
        menus[i].className = "feedback__link";
        cards[i].classList.remove("feedback__card-item--active");
      }

      menu.classList.add("feedback__link--active");
      element.classList.add("feedback__card-item--active");
    });

  };

  for (var i = 0; i < menu.length; i++) {
    showPlace(places[i], menu[i], cards[i]);
  }

  var openCard = function (menu, element) {

    menu.addEventListener('click', function () {
      var menus = document.querySelectorAll('.feedback__link');
      var cards = document.querySelectorAll('.feedback__card-item');
      for (var i = 0; i < menus.length; i++) {
        menus[i].className = "feedback__link";
        cards[i].classList.remove("feedback__card-item--active");
      }

      menu.classList.add("feedback__link--active");
      element.classList.add("feedback__card-item--active");
    });
  };

  for (var i = 0; i < menu.length; i++) {
    openCard(menu[i], cards[i]);
  }

  mainNavigation.classList.remove("page-header--nojs");

  var openCloseMenu = function (evt) {
    evt.preventDefault();

    if (mainNavigation.classList.contains("page-header--opened")) {
      mainNavigation.classList.add("page-header--closed");
      mainNavigation.classList.remove("page-header--opened");
      trip.classList.remove("menu-show");
      trip.classList.add("menu-close");
      } else {
      mainNavigation.classList.remove("page-header--closed");
      mainNavigation.classList.add("page-header--opened");
      trip.classList.add("menu-show");
      trip.classList.remove("menu-close");
    }
  }

  toggleMenu.addEventListener("click", openCloseMenu);

  var errorText = function (field, text) {

    field.addEventListener("input", function () {
      if (field.value && field.validity.patternMismatch || field.badInput) {
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
    });
  }

  for (var i = 0; i < fields.length; i++) {
    errorText(fields[i], texts[i]);
  }

  submit.addEventListener("click", function() {

    for (var i = 0; i < fields.length; i++) {

      if (fields[i].validity.patternMismatch || !fields[i].value) {
        texts[i].style.display = "block";
      }  else {
        texts[i].style.display = "none";
      }
    }
  });


})();
