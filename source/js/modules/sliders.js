/* eslint-disable no-undef */
import {getOriginalSize, getTypeScreen, calculateImageSize, calculateItemSize} from '../utils/for-size-fix';

const ITEM_PROPERTIES = {
  'slider-trainers': {
    'mobile': {width: 226, height: 274, amount: 1, marginRight: 0},
    'tablet': {width: 268, height: 294, amount: 2, marginRight: 30},
    'desktop': {width: 260, height: 294, amount: 4, marginRight: 40},
  },
  'slider-reviews': {
    'mobile': {width: 226, height: 335, amount: 1, marginRight: 0},
    'tablet': {width: 566, height: 242, amount: 1, marginRight: 0},
    'desktop': {width: 560, height: 242, amount: 1, marginRight: 0},
  },
};

const howManySlides = (sliderId, typeScreen) => {
  return ITEM_PROPERTIES[sliderId][typeScreen].amount;
};

const getCoefficientCard = (sliderId, typeScreen) => {
  return ITEM_PROPERTIES[sliderId][typeScreen].height / ITEM_PROPERTIES[sliderId][typeScreen].width;
};

const sliders = document.querySelectorAll('.slider');

const initSliders = () => {
  sliders.forEach(function (slider) {

    const sliderId = slider.id;
    const container = slider.querySelector('.slider__container');
    const items = slider.querySelectorAll('.slider__item');
    const typeScreen = getTypeScreen();
    const itemMarginRight = ITEM_PROPERTIES[sliderId][typeScreen].marginRight;
    const slidesToShow = howManySlides(sliderId, typeScreen);
    const isAdaptive = slider.dataset.isAdaptive;

    if (isAdaptive === 'true') {
      const images = slider.querySelectorAll('.slider__item img');
      const originalImages = [];

      const setSize = () => {
        const widthContainer = container.offsetWidth;
        const itemWidth = (widthContainer - itemMarginRight * (slidesToShow - 1)) / slidesToShow;

        images.forEach(function (image) {
          originalImages.push({
            img: image,
            originalWidth: getOriginalSize(image, 'width'),
          });
        });

        const coefficientCard = getCoefficientCard(sliderId, typeScreen);
        const baseItemWidth = ITEM_PROPERTIES[sliderId][typeScreen].width;
        calculateItemSize(items, itemWidth, coefficientCard);
        calculateImageSize(images, originalImages, baseItemWidth, itemWidth);
      };

      setSize();
      window.addEventListener('resize', setSize);
    }
    const classSwiper = slider.querySelector('.swiper').classList[0];
    const classBtnPrev = slider.querySelector('.slider__btn--previous').classList[0];
    const classBtnNext = slider.querySelector('.slider__btn--next').classList[0];

    // eslint-disable-next-line no-new
    new Swiper(`.${classSwiper}`, {
      navigation: {
        nextEl: `.${classBtnNext}`,
        prevEl: `.${classBtnPrev}`,
      },

      slidesPerView: slidesToShow,
      watchOverflow: true,
      spaceBetween: itemMarginRight,
      slidesPerGroup: 1,
      loop: true,
      speed: 500,
    });
  });
};

export {initSliders};
