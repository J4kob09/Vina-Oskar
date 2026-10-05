document.addEventListener("DOMContentLoaded", function () {

  const orderForm = document.querySelector("form");

  const quantityInputs = document.querySelectorAll(
    'input[type="number"][name^="qty_"]'
  );

  quantityInputs.forEach(function (input) {

    input.addEventListener("input", function () {

      if (Number(input.value) < 0) {
        input.value = 0;
      }

      if (Number(input.value) > Number(input.max)) {
        input.value = input.max;
      }

    });

  });


  orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let totalItems = 0;

    quantityInputs.forEach(function (input) {
      totalItems += Number(input.value) || 0;
    });


    if (totalItems === 0) {
      alert("Prosimo izberite vsaj en izdelek.");
      return;
    }


    const name = document.getElementById("ime").value.trim();
    const phone = document.getElementById("telefon").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("naslov").value.trim();


    if (!name || !phone || !email || !address) {
      alert("Prosimo izpolnite vse obvezne podatke.");
      return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Prosimo vnesite veljaven e-poštni naslov.");
      return;
    }


    const orderItems = [];

    quantityInputs.forEach(function (input) {

      const quantity = Number(input.value) || 0;

      if (quantity > 0) {

        const row = input.closest(".wine-order-row");

        const productName =
          row.querySelector("h4").textContent.trim();

        orderItems.push(productName + " x " + quantity);
      }

    });


    const deliveryInput =
      document.querySelector('input[name="dostava"]:checked');

    const delivery = deliveryInput
      ? deliveryInput.value
      : "";


    const notes =
      document.getElementById("opombe").value.trim();


    const company =
      document.getElementById("podjetje").value.trim();


    console.log("NAROČILO");
    console.log("Ime:", name);
    console.log("Telefon:", phone);
    console.log("Email:", email);
    console.log("Podjetje:", company);
    console.log("Naslov:", address);
    console.log("Dostava:", delivery);
    console.log("Izdelki:", orderItems);
    console.log("Opombe:", notes);


    alert(
      "Naročilo je pripravljeno.\n\n" +
      "Naslednji korak je povezava z Netlify."
    );

  });

});