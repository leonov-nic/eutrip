"use strict";

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
  var tel = document.querySelector(".popup__input[name=phone]");
  var mail = document.querySelector(".popup__input[name=mail]");
  var submit = document.querySelector(".popup__button");
  var form = document.querySelector(".popup__form");
  var texts = document.querySelectorAll(".popup__mistake");
  var popupSuccess = document.querySelector(".popup-successfully");
  var popupText = document.querySelector(".popup-successfully__text");
  var URL = "../php/order.php";

  var isEscPress = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  function isEscPressSucces (evt, action) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      action();
    }
  }

  var isEnterPress = function (evt, action) {
    if (evt.key === KEY_ENTER) {
      action();
    }
  };

  var addPopup = function () {

    var element = document.createElement("div");
    element.className = "popup__bodyback";
    document.body.appendChild(element);

    popup.classList.add("popup__active");
    catchStorage();

    document.addEventListener("keydown", isEscPress);
    close.addEventListener("keydown", isEnterPress);
    close.addEventListener("click", closePopup);
    element.addEventListener("click", closePopup);

  };

  buttons.forEach(function (button) {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();
      addPopup();
    });
  });

  var closePopup = function () {
    var element = document.querySelector(".popup__bodyback");
    element.remove();
    popup.classList.remove("popup__active");
    popup.classList.remove("popup__error");
    document.removeEventListener("keydown", isEscPress);
    close.removeEventListener("click", closePopup);
    element.removeEventListener("click", closePopup);
    close.removeEventListener("keydown", isEnterPress);
    submit.removeEventListener("click", showValidityText);
    form.removeEventListener("submit", onSubmit);
  };

  var showPlace = function (place, menu, element) {

    place.addEventListener("click", function () {

      var menus = document.querySelectorAll(".feedback__link");
      var cards = document.querySelectorAll(".feedback__card-item");

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

    menu.addEventListener("click", function () {
      var menus = document.querySelectorAll(".feedback__link");
      var cards = document.querySelectorAll(".feedback__card-item");
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
  };

  for (var i = 0; i < fields.length; i++) {
    errorText(fields[i], texts[i]);
  }

  function showValidityText () {

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].validity.patternMismatch || !fields[i].value) {
        texts[i].style.display = "block";

        popup.classList.remove("popup__error");
        popup.offsetWidth === popup.offsetWidth;
        popup.classList.add("popup__error");
      } else {
          texts[i].style.display = "none";
        }
    }
  }

  var storageMail = "";
  var isStorageSupport = "true";

  try {
    storageMail = localStorage.getItem("mail");
  }
  catch (err) {
    isStorageSupport = "false";
  }

  function catchStorage() {
    if (storageMail) {
      mail.value = storageMail;
      tel.focus();
    } else {
      mail.focus();
    }
  }

  var onSubmit = function (evt) {
    save(new FormData(form), addSuccessModal, addErrorModal);
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem("mail", mail.value);
    }
  };

  submit.addEventListener("click", showValidityText);
  form.addEventListener("submit", onSubmit);

  function save (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        closePopup();
        onLoad(xhr.response);
      } else {
        onError("Ошибка: " + xhr.status + " " + xhr.statusText);
      }
    });

    xhr.addEventListener("error", function () {
      onError("Произошла ошибка соединения");
    });

    xhr.addEventListener("timeout", function () {
      onError("Запрос не успел выполниться за " + xhr.timeout + "мс");
    });

    xhr.timeout = 5000;

    xhr.open("POST", URL);
    xhr.send(data);
  }

  function addSuccessModal() {
    popupSuccess.style.display = "block";

    function onPopupEscPress (evt) {
      isEscPressSucces(evt, closePopupSuccessfully);
    };

    function closePopupSuccessfully () {
      popupSuccess.style.display = "none";

      document.removeEventListener("keydown", onPopupEscPress);
      popupSuccess.removeEventListener("click", closePopupSuccessfully);
    };

    popupSuccess.addEventListener("click", closePopupSuccessfully);
    document.addEventListener("keydown", onPopupEscPress);
  }

  function addErrorModal(message) {
    popupSuccess.style.display = "block";
    popupText.textContent = message;

    function onPopupEscPress (evt) {
      isEscPressSucces(evt, closePopupSuccessfully);
    };

    function closePopupSuccessfully () {
      popupSuccess.style.display = "none";

      document.removeEventListener("keydown", onPopupEscPress);
      popupSuccess.removeEventListener("click", closePopupSuccessfully);
    };

    popupSuccess.addEventListener("click", closePopupSuccessfully);
    document.addEventListener("keydown", onPopupEscPress);
  }

})();
