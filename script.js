document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  document.getElementById("formMessage").textContent =
    "Vnos je uspešno validiran. Sporočilo še ni poslano.";
});