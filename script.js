const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
});


const tabButtons = document.querySelectorAll('.tab-btn');
const menuGrids = document.querySelectorAll('.menu-grid');

tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const target = btn.dataset.tab;

        tabButtons.forEach(function (b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        menuGrids.forEach(function (grid) {
            grid.classList.remove('active');
        });

        menuGrids.forEach(function (grid) {
            if (grid.dataset.content === target) {
                grid.classList.add('active');
            }
        });
    });
});



const galleryImages = document.querySelectorAll('.gallery-grid img');

galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox';

        const bigImg = document.createElement('img');
        bigImg.src = img.src;

        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function () {
            overlay.remove();
        });
    });
});



const reservationForm = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');

if (reservationForm) {
    reservationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const ad = document.getElementById('ad').value;
        const telefon = document.getElementById('telefon').value;
        const tarix = document.getElementById('tarix').value;
        const saat = document.getElementById('saat').value;
        const say = document.getElementById('say').value;
        const masa = document.getElementById('masa').value;

        if (ad === '' || telefon === '' || tarix === '' || saat === '' || say === '' || masa === '') {
            formMessage.textContent = '❌ Zəhmət olmasa bütün sahələri doldurun!';
            formMessage.style.color = '#e74c3c';
            return;
        }

        formMessage.textContent = '✅ Təşəkkür edirik, ' + ad + '! Rezervasiyanız qəbul edildi.';
        formMessage.style.color = '#27ae60';

        reservationForm.reset();
    });
}


const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo(0, 0);
});



const hoursStatus = document.getElementById('hoursStatus');

if (hoursStatus) {
    const indi = new Date();
    const saat = indi.getHours();
    const gun = indi.getDay();

    let aciqdir = false;

    if (gun === 0) {
        aciqdir = saat >= 11 && saat < 22;
    } else if (gun === 6) {
        aciqdir = saat >= 10;
    } else {
        aciqdir = saat >= 10 && saat < 23;
    }

    if (aciqdir) {
        hoursStatus.textContent = '🟢 Hazırda AÇIQDIR';
        hoursStatus.classList.add('open');
    } else {
        hoursStatus.textContent = '🔴 Hazırda BAĞLIDIR';
        hoursStatus.classList.add('closed');
    }
}



const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

if (searchInput) {
    searchInput.addEventListener('input', function () {
        const axtaris = searchInput.value.toLowerCase();
        const aktivGrid = document.querySelector('.menu-grid.active');

        if (!aktivGrid) return;

        const yemekler = aktivGrid.querySelectorAll('.menu-item');

        yemekler.forEach(function (yemek) {
            const ad = yemek.dataset.ad.toLowerCase();

            if (ad.includes(axtaris)) {
                yemek.classList.remove('hidden');
            } else {
                yemek.classList.add('hidden');
            }
        });
    });
}

if (sortSelect) {
    sortSelect.addEventListener('change', function () {
        const secim = sortSelect.value;
        const aktivGrid = document.querySelector('.menu-grid.active');

        if (!aktivGrid || secim === 'default') return;

        const yemekler = Array.from(aktivGrid.querySelectorAll('.menu-item'));

        yemekler.sort(function (a, b) {
            const qiymetA = parseFloat(a.dataset.qiymet);
            const qiymetB = parseFloat(b.dataset.qiymet);

            if (secim === 'low') {
                return qiymetA - qiymetB;
            } else {
                return qiymetB - qiymetA;
            }
        });

        yemekler.forEach(function (yemek) {
            aktivGrid.appendChild(yemek);
        });
    });
}