//헤더 스크롤 변경
let header = document.querySelector('header');

let desktopLogo = document.querySelector('.desktop-logo');
let desktopSearchIcon = document.querySelector('.desktop-search-icon');

let tabletLogo = document.querySelector('.tablet-logo');
let tabletMenuIcon = document.querySelector('.tablet-menu-icon');
let tabletSearchIcon = document.querySelector('.tablet-search-icon');
let tabletMypageIcon = document.querySelector('.tablet-mypage-icon');
let tabletCartIcon = document.querySelector('.tablet-cart-icon');

let isProductPage = document.body.id === 'product-page';

window.addEventListener('scroll', function () {
    // Product 페이지에서는 실행하지 않음
    if (isProductPage) {
        return;
    }
    if (window.scrollY > 0) {
        header.classList.add('scrolled');

        desktopLogo.src = 'Desktop/typo_4C381E.png';
        desktopSearchIcon.src = 'Desktop/search-b.svg';

        tabletLogo.src = 'Mobile/source/typo_4C381E.png';
        tabletMenuIcon.src = 'Tablet/list-b.svg';
        tabletSearchIcon.src = 'Tablet/search-b.svg';
        tabletMypageIcon.src = 'Tablet/mypage-b.svg';
        tabletCartIcon.src = 'Tablet/cart-b.svg';
    } else {
        header.classList.remove('scrolled');

        desktopLogo.src = 'Desktop/typo_f2eee7.png';
        desktopSearchIcon.src = 'Desktop/search-w.svg';

        tabletLogo.src = 'Mobile/source/typo_f2eee7.png';
        tabletMenuIcon.src = 'Tablet/list.svg';
        tabletSearchIcon.src = 'Tablet/search.svg';
        tabletMypageIcon.src = 'Tablet/mypage.svg';
        tabletCartIcon.src = 'Tablet/cart.svg';
    }
});

//햄버거 목록
let menuBtn = document.querySelector('#menu-btn');
let closeBtn = document.querySelector('#close-btn');
let mobileMenu = document.querySelector('#mobile-menu');
menuBtn.onclick = function(){
    mobileMenu.classList.add('active');
}
closeBtn.onclick = function(){
    mobileMenu.classList.remove('active');
}

//장바구니 숫자 변경
document.querySelector('.cart-count').dataset.count = 0;
document.querySelector('.mobile-cart').dataset.count = 0;

// 히어로 자동 스와이퍼
if (document.querySelector('.hero-swiper')) {
    let heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        breakpoints: {
            // 데스크탑
            1024: {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                }
            }
        }
    });
}

// 베스트셀러 스와이퍼
let bestSwiper = null;

function handleBestSwiper() {
    let bestSwiperElement = document.querySelector('.best-swiper');
    if (!bestSwiperElement) {
        return;
    }
    if (window.innerWidth <= 1023) {
        if (bestSwiper === null) {
            bestSwiper = new Swiper('.best-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                allowTouchMove: true,

                pagination: {
                    el: '.best-swiper .swiper-pagination',
                    clickable: true
                }
            });
        }
    } else {
        if (bestSwiper !== null) {
            bestSwiper.destroy(true, true);
            bestSwiper = null;
        }
    }
}
handleBestSwiper();
window.addEventListener('resize', handleBestSwiper);

// 노트 스와이퍼
if (document.querySelector('.note-swiper')) {
    let noteSwiper = new Swiper('.note-swiper', {
        slidesPerView: 'auto',
        freeMode: true,
        allowTouchMove: true,
        mousewheel: {
            forceToAxis: false,
            releaseOnEdges: true,
            sensitivity: 1
        },
        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20
            },

            768: {
                spaceBetween: 30,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20
            },

            1024: {
                spaceBetween: 30,
                slidesOffsetBefore: 40,
                slidesOffsetAfter: 40
            }
        }
    });
    function updateNoteMousewheel() {
        if (window.innerWidth >= 1024) {
            noteSwiper.mousewheel.enable();
        } else {
            noteSwiper.mousewheel.disable();
        }
    }
    updateNoteMousewheel();
    window.addEventListener('resize', updateNoteMousewheel);
}

//데스크탑 순차적으로 글자 나오게 하기
let storyGroups = document.querySelectorAll('.reveal-group');

let storyObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');

                // 한 번 실행 후 더 이상 관찰하지 않음
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1
    }
);

storyGroups.forEach(function (group) {
    storyObserver.observe(group);
});

// 향수 이름 글자 수
let perfumeNameInput = document.querySelector('#per-name');
let perfumeNameCount = document.querySelector('.custom-name .text-count');
if (perfumeNameInput && perfumeNameCount) {
    perfumeNameInput.addEventListener('input', function () {
        perfumeNameCount.textContent = perfumeNameInput.value.length + ' / 10';
    });
}
// 요청사항 글자 수
let requestInput = document.querySelector('#u-request');
let requestCount = document.querySelector('.custom-request .text-count');
if (requestInput && requestCount) {
    requestInput.addEventListener('input', function () {
        requestCount.textContent = requestInput.value.length + ' / 200';
    });
}

// 커스텀 향수 정보 저장
let customForm = document.querySelector('#custom-question');

if (customForm) {
    customForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let perfumeName = document.querySelector('#per-name').value;
        let topNote = document.querySelector('input[name="top-note"]:checked')?.value;
        let middleNote = document.querySelector('input[name="middle-note"]:checked')?.value;
        let baseNote = document.querySelector('input[name="base-note"]:checked')?.value;
        let request = document.querySelector('#u-request').value;

        sessionStorage.setItem('perfumeName', perfumeName);
        sessionStorage.setItem('topNote', topNote);
        sessionStorage.setItem('middleNote', middleNote);
        sessionStorage.setItem('baseNote', baseNote);
        sessionStorage.setItem('request', request);

        window.location.href = 'gyeol-result-page.html';
    });
}

// 결과 페이지에 커스텀 향수 정보 표시
let resultName = document.querySelector('#result-name');

if (resultName) {
    let perfumeName = sessionStorage.getItem('perfumeName');
    let topNote = sessionStorage.getItem('topNote');
    let middleNote = sessionStorage.getItem('middleNote');
    let baseNote = sessionStorage.getItem('baseNote');
    let request = sessionStorage.getItem('request');

    // 데스크탑
    document.querySelector('#result-name').textContent = perfumeName;
    document.querySelector('#result-top').textContent = topNote;
    document.querySelector('#result-middle').textContent = middleNote;
    document.querySelector('#result-base').textContent = baseNote;
    document.querySelector('#result-request').textContent =
    request ? request : '요청사항이 없습니다.';;

    // 모바일, 태블릿
    document.querySelector('#mobile-result-name').textContent = perfumeName;
    document.querySelector('#mobile-result-top').textContent = topNote;
    document.querySelector('#mobile-result-middle').textContent = middleNote;
    document.querySelector('#mobile-result-base').textContent = baseNote;

    // 날짜
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    document.querySelector('#result-date').textContent =
        `${year}. ${month}. ${day}`;
}
// 장바구니 담기
let addCart = document.querySelector('#add-cart');
if (addCart) {
    addCart.addEventListener('click', function (e) {
        e.preventDefault();
        let cartCount = Number(localStorage.getItem('cartCount')) || 0;
        cartCount++;
        localStorage.setItem('cartCount', cartCount);
        window.location.href = 'gyeol-main.html';
    });
}
// 장바구니 숫자 표시
let cartCount = Number(localStorage.getItem('cartCount')) || 0;
let desktopCart = document.querySelector('.cart-count');
let mobileCart = document.querySelector('.mobile-cart');
if (desktopCart) {
    desktopCart.dataset.count = cartCount;
}
if (mobileCart) {
    mobileCart.dataset.count = cartCount;
}

//향수 제작 페이지
// 향을 선택해주세요 클릭
document.querySelectorAll('.scent-note-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        this.closest('.note-item').classList.toggle('active');
    });
});

// Citrus, Green 등 클릭
document.querySelectorAll('.category-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        const currentCategory = this.closest('.note-category');
        const currentNoteItem = this.closest('.note-item');

        currentNoteItem.querySelectorAll('.note-category').forEach(function(category){
            if(category !== currentCategory){
                category.classList.remove('active');
            }
        });
        // 내가 클릭한 카테고리는 열기/닫기
        currentCategory.classList.toggle('active');
    });
});
