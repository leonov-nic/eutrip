'use strict';

(function () {

  var KEY_ESCAPE = "Escape";
  var KEY_ENTER = "Enter";
  var popup = document.querySelector(".popup");
  var buttons = document.querySelectorAll(".button-js");
  var close = popup.querySelector(".popup__close");
  var form = document.querySelector(".popup__form");
  var upButton = document.querySelector(".arrow");
  var html = document.querySelector("html");
  var letterField = document.querySelector("#letter");
  var mailField = document.querySelector("#mail");

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

  var openPopup = function () {
    var element = document.createElement("div");
    element.className = "body-black";
    document.body.appendChild(element);
    popup.style.display = "block";
    popup.className = "popup modal-show";
    html.style.overflow = "hidden";

    // document.body.className = "body-black";
    // document.body.style = "background-color: rgba(0, 0, 0, 0.8)";
    // popup.style.top = "50px";

    element.addEventListener("click", closePopup);
    close.addEventListener("click", closePopup);
    document.addEventListener("keydown", isEscPress);
  };

// If (document.body.clientWidth>768){
//   document.write('<script src=...>')
// }

  form.addEventListener ('click', function(evt) {

    // console.log(document.body.clientWidth);
    // var pop = popup.style.display = "block";

    if (screen.width < 700 && evt.target === letterField || screen.width < 700 && evt.target === mailField) {
      popup.style.top = "-200px";
      popup.style.transition = "0.5s";
    } else if (screen.width > 700) {
      popup.style.top = "calc(50% - 360px)";
      popup.style.transition = "0.5s";
    } else {
      popup.style.top = "0";
      popup.style.transition = "0.5s";
    }
  });


  var closePopup = function () {
    var popup = document.querySelector(".popup");
    var element = document.querySelector(".body-black");
    element.remove();
    html.style.overflow = "auto";

    popup.style.display = "none";

    popup.className = " ";
    popup.className = "popup";

    document.removeEventListener("keydown", isEscPress);
    close.removeEventListener("click", closePopup);
    element.addEventListener("click", closePopup);
  };

  buttons.forEach(function (button) {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();
      openPopup();
    });
  });

  var upWindow = function () {
    if (window.pageYOffset > 200) {
      upButton.style.display = "block";

      upButton.addEventListener("click", function (evt) {
        window.scrollTo(0, 0);
      });
    } else {
      upButton.style.display = "none";
    }
  }

  window.removeEventListener("scroll", upWindow);
  window.addEventListener("scroll", upWindow);

  var main = document.querySelector("main");
  var form = document.querySelector(".popup__form");

  var mainNavigation = document.querySelector(".main-nav");
  var toggleMenu = document.querySelector(".main-nav__toggle");
  var listMenu = document.querySelector(".main-nav__list");
  var listSocial = document.querySelector(".main-nav__list-social");
  var menuLinks = document.querySelectorAll(".main-nav__link");

  mainNavigation.classList.remove("main-nav--nojs");

  toggleMenu.addEventListener("click", function(evt) {
    evt.preventDefault();

    if (mainNavigation.classList.contains("main-nav--closed")) {
      mainNavigation.classList.remove("main-nav--closed");
      mainNavigation.classList.add("main-nav--opened");
      listMenu.classList.add("menu-show");
      listSocial.classList.add("menu-show");

    } else {
      mainNavigation.classList.add("main-nav--closed");
      mainNavigation.classList.remove("main-nav--opened");
      listMenu.classList.remove("menu-show");
      listSocial.classList.remove("menu-show");
    }
  });

  var onCloseMenu = function () {
    if (mainNavigation.classList.contains("main-nav--opened")) {
      mainNavigation.classList.remove("main-nav--opened");
      mainNavigation.classList.add("main-nav--closed");
    }
  };

  menuLinks.forEach(function (link) {
    link.removeEventListener("click", onCloseMenu);
    link.addEventListener("click", onCloseMenu);
  });

})();
