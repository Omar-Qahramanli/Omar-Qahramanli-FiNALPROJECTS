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

