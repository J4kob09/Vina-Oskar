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

    //Koda za vinograde okenca  

    const galleryData = [
      {
        src: 'images/malecnik.jpg',
        title: 'Vinograd: Malečnik',
        desc: 'Vinograd se nahaja v Malečniku na jugozahodni legi, ki omogoča dobro osončenost. Tla sestavlja lapornata podlaga, v zgornjih plasteh pa prevladuje težka ilovnata prst. Takšna sestava tal predstavlja značilnost vinogradniškega območja. V vinogradu so zasajene tri sorte vinske trte, in sicer laški rizling, šipon in sauvignon. Te sorte predstavljajo osnovo za pridelavo različnih vrst vina.',
        features: [
          '<span>Sorta grozdja:</span> Laški Rizling, Šipon in Sauvignon',
          '<span>Velikost obdelovalne površine:</span> 2ha',
          '<span>Pozicija:</span> Jugozahod',
          '<span>Prst:</span> Lapornata podlaga, v zgornjih plasteh težka ilovnata'
        ]
      },
      {
        src: 'images/gorca.jpg',
        title: 'Vinograd: Gorca',
        desc: 'Vinograd se nahaja v Gorci na južni legi, ki omogoča dobro osončenost vinogradniških površin. Podlago tal sestavlja lapor, na površju pa je prst lahka in rodovitna. Takšne talne značilnosti so pomemben del okolja, v katerem raste vinska trta. V vinogradu sta zasajeni sorti modri pinot in rumeni muškat, ki se razlikujeta po svojih značilnostih in omogočata pridelavo različnih vrst vina.',
        features: [
          '<span>Sorta grozdja:</span> Modri Pinot in Rumeni Muškat',
          '<span>Velikost obdelovalne površine:</span> 1,8ha',
          '<span>Pozicija:</span> Jug',
          '<span>Prst:</span> Lapornata podlaga, na površju lahka rodovitna'
        ]
      },
      {
        src: 'images/hrenca.jpg',
        title: 'Vinograd: Hrenca',
        desc: 'Vinograd se nahaja v Hrenci na jugovzhodni legi, ki omogoča dobro jutranjo osončenost. Tla sestavlja lapornata podlaga, na površju pa prevladuje ilovnata prst. Takšna sestava tal predstavlja pomembno značilnost vinogradniškega območja. V vinogradu sta zasajeni sorti laški rizling in renski rizling, ki sta znani beli vinski sorti.',
        features: [
          '<span>Sorta grozdja:</span> Laški Rizling in Renski Rizling',
          '<span>Velikost obdelovalne površine:</span> 1,6ha',
          '<span>Pozicija:</span> Jugovzhod',
          '<span>Prst:</span> Lapornata podlaga, na površju ilovnata'
        ]
      },
      {
        src: 'images/',
        title: 'Ruperče',
        desc: 'Vinograd se nahaja v Ruperčah na vzhodni legi, ki omogoča dobro jutranjo osončenost. Tla so lahka in peščena, kar predstavlja pomembno značilnost vinogradniškega območja. V vinogradu je zasajena sorta chardonnay, ki spada med znane bele vinske sorte.',
        features: [
          '<span>Sorta grozdja:</span> Chardonnay',
          '<span>Velikost obdelovalne površine:</span> 2,5ha',
          '<span>Pozicija:</span> Vzhod',
          '<span>Prst:</span> Lahka, peščena'
        ]
      },
      {
        src: 'images/trcova.jpg',
        title: 'Trčova',
        desc: 'Vinograd se nahaja v Trčovi na južni legi, ki omogoča dobro osončenost. Tla so peščeno lapornata, v globljih plasteh pa postanejo skalnata. Takšna sestava tal predstavlja značilnost tega vinogradniškega območja. V vinogradu je zasajena sorta laški rizling, ki spada med bele vinske sorte.',
        features: [
          '<span>Sorta grozdja:</span> Laški Rizling',
          '<span>Velikost obdelovalne površine:</span> 1,3ha',
          '<span>Pozicija:</span> Jug',
          '<span>Prst:</span> Peščena lapornata v globjih plasteh skalnata'
        ]
      }
    ];

    let currentIndex = 0;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalFeatures = document.getElementById('modalFeatures');

    // Odpiranje modala z določenim indeksom
    function openModal(index) {
      currentIndex = index;
      updateModalContent();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Onemogoči drsenje strani pod modalom
    }

    // Zapiranje modala
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Posodobitev vsebine modala
    function updateModalContent() {
      const item = galleryData[currentIndex];
      modalImg.src = item.src;
      modalImg.alt = item.title;
      modalBadge.textContent = item.badge;
      modalTitle.textContent = item.title;
      modalDesc.textContent = item.desc;

      // Generiranje točk
      modalFeatures.innerHTML = '';
      item.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = feat;
        modalFeatures.appendChild(li);
      });
    }

    // Prejšnja slika
    function prevImage(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      updateModalContent();
    }

    // Naslednja slika
    function nextImage(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryData.length;
      updateModalContent();
    }

    // Klik na temno ozadje zapre modal
    function handleOverlayClick(e) {
      if (e.target === modal) {
        closeModal();
      }
    }

    // Upravljanje s tipkovnico (Esc za zaprtje, levo/desno za navigacijo)
    document.addEventListener('keydown', function(e) {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });