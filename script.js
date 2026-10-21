
document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // OBRAZEC
  // =========================

  const orderForm = document.querySelector("form");

  const quantityInputs = document.querySelectorAll(
    'form input[type="number"][data-cena]'
  );

  // Preverjanje količin
  quantityInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      const min = Number(input.min || 0);
      const max = Number(input.max);

      if (Number(input.value) < min) {
        input.value = min;
      }

      if (
        input.max !== "" &&
        Number(input.value) > max
      ) {
        input.value = max;
      }

      izracunajSkupaj();
    });
  });
  
  // Oddaja obrazca prek FormSubmit
  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!orderForm.reportValidity()) {
        return;
      }

      const allQuantityInputs = orderForm.querySelectorAll(
        'input[type="number"]'
      );

      let totalItems = 0;

      allQuantityInputs.forEach(function (input) {
        totalItems += Math.max(0, Number(input.value) || 0);
      });

      if (totalItems === 0) {
        alert("Prosimo, izberite vsaj en izdelek.");
        return;
      }

      const name = document.getElementById("ime").value.trim();
      const phone = document.getElementById("telefon").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("naslov").value.trim();
      const company = document.getElementById("podjetje").value.trim();
      const notes = document.getElementById("opombe").value.trim();

      const orderItems = [];

      allQuantityInputs.forEach(function (input) {
        const quantity = Math.max(0, Number(input.value) || 0);

        if (quantity > 0) {
          const row = input.closest(".wine-order-row");
          const heading = row?.querySelector("h4");
          const productName = heading
            ? heading.textContent.trim()
            : input.name;

          orderItems.push(productName + " x " + quantity);
        }
      });

      const cena = document.getElementById("skupaj").textContent;
      const cenaEmail = document.getElementById("skupna_cena_email");
      const povzetekEmail = document.getElementById("povzetek_email");

      if (cenaEmail) {
        cenaEmail.value = cena;
      }

      if (povzetekEmail) {
        povzetekEmail.value = orderItems.join("\n");
      }

      // Preverimo obvezna polja
      if (!name || !phone || !email || !address) {
        alert("Prosimo, izpolnite vse obvezne podatke.");
        return;
      }

      // Pripravimo obrazec in ga pošljemo
      HTMLFormElement.prototype.submit.call(orderForm);
    });
  }


  // =========================
  // GALERIJA VINOGRADOV
  // =========================

  const galleryData = [
    {
      src: "images/malecnik.jpg",
      title: "Vinograd: Malečnik",
      badge: "Malečnik",
      desc: "Vinograd se nahaja v Malečniku na jugozahodni legi, ki omogoča dobro osončenost. Tla sestavlja lapornata podlaga, v zgornjih plasteh pa prevladuje težka ilovnata prst. V vinogradu so zasajene sorte laški rizling, šipon in sauvignon.",
      features: [
        "<span>Sorta grozdja:</span> Laški rizling, šipon in sauvignon",
        "<span>Velikost obdelovalne površine:</span> 2 ha",
        "<span>Pozicija:</span> Jugozahod",
        "<span>Prst:</span> Lapornata podlaga, v zgornjih plasteh težka ilovnata"
      ]
    },
    {
      src: "images/gorca.jpg",
      title: "Vinograd: Gorca",
      badge: "Gorca",
      desc: "Vinograd se nahaja v Gorci na južni legi, ki omogoča dobro osončenost. Podlago tal sestavlja lapor, na površju pa je prst lahka in rodovitna. Zasajeni sta sorti modri pinot in rumeni muškat.",
      features: [
        "<span>Sorta grozdja:</span> Modri pinot in rumeni muškat",
        "<span>Velikost obdelovalne površine:</span> 1,8 ha",
        "<span>Pozicija:</span> Jug",
        "<span>Prst:</span> Lapornata podlaga, na površju lahka in rodovitna"
      ]
    },
    {
      src: "images/hrenca.jpg",
      title: "Vinograd: Hrenca",
      badge: "Hrenca",
      desc: "Vinograd se nahaja v Hrenci na jugovzhodni legi, ki omogoča dobro jutranjo osončenost. Tla sestavlja lapornata podlaga, na površju pa prevladuje ilovnata prst. Zasajeni sta sorti laški rizling in renski rizling.",
      features: [
        "<span>Sorta grozdja:</span> Laški rizling in renski rizling",
        "<span>Velikost obdelovalne površine:</span> 1,6 ha",
        "<span>Pozicija:</span> Jugovzhod",
        "<span>Prst:</span> Lapornata podlaga, na površju ilovnata"
      ]
    },
    {
      src: "images/",
      title: "Ruperče",
      badge: "Ruperče",
      desc: "Vinograd se nahaja v Ruperčah na vzhodni legi, ki omogoča dobro jutranjo osončenost. Tla so lahka in peščena. V vinogradu je zasajena sorta chardonnay.",
      features: [
        "<span>Sorta grozdja:</span> Chardonnay",
        "<span>Velikost obdelovalne površine:</span> 2,5 ha",
        "<span>Pozicija:</span> Vzhod",
        "<span>Prst:</span> Lahka, peščena"
      ]
    },
    {
      src: "images/trcova.jpg",
      title: "Vinograd: Trčova",
      badge: "Trčova",
      desc: "Vinograd se nahaja v Trčovi na južni legi. Tla so peščeno lapornata, v globljih plasteh pa postanejo skalnata. V vinogradu je zasajena sorta laški rizling.",
      features: [
        "<span>Sorta grozdja:</span> Laški rizling",
        "<span>Velikost obdelovalne površine:</span> 1,3 ha",
        "<span>Pozicija:</span> Jug",
        "<span>Prst:</span> Peščena lapornata, v globljih plasteh skalnata"
      ]
    }
  ];

  let currentIndex = 0;

  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImg");
  const modalBadge = document.getElementById("modalBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalFeatures = document.getElementById("modalFeatures");

  function updateModalContent() {
    if (
      !modal ||
      !modalImg ||
      !modalTitle ||
      !modalDesc ||
      !modalFeatures
    ) {
      return;
    }

    const item = galleryData[currentIndex];

    modalImg.src = item.src;
    modalImg.alt = item.title;

    if (modalBadge) {
      modalBadge.textContent = item.badge;
    }

    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    modalFeatures.replaceChildren();

    item.features.forEach(function (feature) {
      const li = document.createElement("li");
      li.textContent = feature.replace(/<[^>]*>/g, "");
      modalFeatures.appendChild(li);
    });
  }

  function openModal(index) {
    if (!modal) return;

    currentIndex = index;
    updateModalContent();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function prevImage(event) {
    if (event) event.stopPropagation();

    currentIndex =
      (currentIndex - 1 + galleryData.length) % galleryData.length;

    updateModalContent();
  }

  function nextImage(event) {
    if (event) event.stopPropagation();

    currentIndex = (currentIndex + 1) % galleryData.length;

    updateModalContent();
  }

  function handleOverlayClick(event) {
    if (modal && event.target === modal) {
      closeModal();
    }
  }

  document.addEventListener("keydown", function (event) {
    if (!modal || !modal.classList.contains("active")) return;

    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === "ArrowRight") nextImage();
  });

  // Funkcije so dostopne tudi iz HTML onclick atributov.
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.prevImage = prevImage;
  window.nextImage = nextImage;
  window.handleOverlayClick = handleOverlayClick;


  // =========================
  // IZRAČUN SKUPNE CENE
  // =========================

  function izracunajSkupaj() {
    let skupaj = 0;

    document.querySelectorAll("form input[data-cena]").forEach(function (input) {
      const cena = Number(input.dataset.cena) || 0;
      const kolicina = Math.max(0, Number(input.value) || 0);

      skupaj += cena * kolicina;
    });

    const prikaz = document.getElementById("skupaj");

    if (prikaz) {
      prikaz.textContent =
        skupaj.toFixed(2).replace(".", ",") + " €";
    }
  }

  window.izracunajSkupaj = izracunajSkupaj;
  izracunajSkupaj();
});
