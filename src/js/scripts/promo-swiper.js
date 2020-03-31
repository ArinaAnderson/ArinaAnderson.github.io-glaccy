'use strict';
(function () {
  if (document.querySelector('.promo__wrap')) {
    var swiperPromo = new Swiper('.promo__wrap', {
      spaceBetween: 0,
      pagination: {
        el: '.promo__pagination',
        type: 'bullets',
        clickable: true,
      },
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      page: document.querySelector('.page'),
      overlay: document.querySelector('.overlay'),// hack for ios

      slides: document.querySelector('.promo__list').children,
      pageBgs: {
        '0': '#849d8f',
        '1': '#8996a6',
        '2': '#9d8b84',
      },
      noSlideToSlideTabNav: true,
    });

    const page = document.querySelector('.page');
    const promoSlider = document.querySelector('.promo__list');
    const promoSlides = document.querySelectorAll('.promo__item');
    const promoSlidesAr = Array.prototype.slice.call(promoSlides);
    const promoFocusables = promoSlider.querySelectorAll('.promo__focusable');
    const promoFocusablesArr = Array.prototype.slice.call(promoFocusables);

    const siteList = document.querySelector('.site-list');
    const PORTRAIT_WIDTH_MIN = 768;
    const LANDSCAPE_WIDTH_MIN = 900;
    let devWidth = window.utils.getWindWidth();

    let activeSlide = swiperPromo.slides[swiperPromo.activeIndex];
    let activeFocusablesArr = Array.prototype.slice.call(activeSlide.querySelectorAll('.promo__focusable'));

    function setInitialTabIdxState() {
      promoFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, true)});
      activeFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, false)});
    }

    function updateActiveSlide() {
      activeSlide = swiperPromo.slides[swiperPromo.activeIndex];
      activeFocusablesArr = Array.prototype.slice.call(activeSlide.querySelectorAll('.promo__focusable'));
    }

    function setSiteListBgColor() {
      if (devWidth < PORTRAIT_WIDTH_MIN || devWidth >= LANDSCAPE_WIDTH_MIN) {
        siteList.style.backgroundColor = 'transparent';
      }  else {
        siteList.style.backgroundColor = page.style.backgroundColor;
      }
    }

    setInitialTabIdxState();

    promoSlider.addEventListener('transitionend', function (evt) {
      setSiteListBgColor();
      activeFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, true)});
      updateActiveSlide();
      activeFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, false)});
    }, true);

    window.addEventListener('resize', function () {
      devWidth = window.utils.getWindWidth();
      setSiteListBgColor();
    });

    
    // an attempt to implement
    promoSlider.addEventListener('focus', function (evt) {
      // console.log(evt.target, evt.currentTarget);

      // blur --> if evt.focus does not belog to activeSlide -> to set focus on the nextElementSibling of promoSlider
      // but how to find the closest interective -> closest

      //!!!!document.querySelector('*[tabindex="0"]');

      // to be very SPECIFIC: knowing the structure of the swiper thing we can just say: focus goes to
      // the first child of document.querySelector('.swiper-pagination').children;
    }, true);

  }
})();
