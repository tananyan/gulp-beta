// document.addEventListener("DOMContentLoaded", () => {});
document.addEventListener("DOMContentLoaded", function () {
  // lang
  const lang = document.querySelector(".footer__lang"),
    langSelect = document.querySelector(".footer__lang-select");

  lang.addEventListener("click", () => {
    langSelect.style.display = "block";
  });
  langSelect.addEventListener("click", () => {
    langSelect.style.display = "none";
  });

  // scroll
  const scrollUp = document.querySelector(".scroll-up");

  function myFunction() {
    if (
      document.body.scrollTop > 870 ||
      document.documentElement.scrollTop > 870
    ) {
      scrollUp.style.display = "block";
    } else {
      scrollUp.style.display = "none";
    }
  }
  window.onscroll = function () {
    myFunction();
  };

  //
});
