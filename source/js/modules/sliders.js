import {getOriginalSize, getTypeScreen, getMarginRight, calculateImageSize, calculateItemSize} from '../utils/for-slider';

const mediaQueryTouch = window.matchMedia('(hover: none) and (pointer: coarse)');
const SLIDES_TO_SCROLL = 1;
const ITEM_PROPERTIES = {
  'slider-trainers': {
    'mobile': {width: 226, height: 274, amount: 1, touchableCard: true},
    'tablet': {width: 268, height: 294, amount: 2, touchableCard: true},
    'desktop': {width: 260, height: 294, amount: 4, touchableCard: true},
  },
  'slider-reviews': {
    'mobile': {width: 226, height: 335, amount: 1, touchableCard: false},
    'tablet': {width: 566, height: 242, amount: 1, touchableCard: false},
    'desktop': {width: 560, height: 242, amount: 1, touchableCard: false},
  },
};

const howManySlides = (sliderId, typeScreen) => {
  return ITEM_PROPERTIES[sliderId][typeScreen].amount;
};

const getCoefficientCard = (sliderId, typeScreen) => {
  return ITEM_PROPERTIES[sliderId][typeScreen].height / ITEM_PROPERTIES[sliderId][typeScreen].width;
};

const initSliders = () => {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(function (slider) {
    const sliderId = slider.id;
    const container = slider.querySelector('.slider__container');
    const track = slider.querySelector('.slider__track');
    const items = slider.querySelectorAll('.slider__item');
    const btnPrev = slider.querySelector('.slider__btn--previous');
    const btnNext = slider.querySelector('.slider__btn--next');
    const isAdaptive = slider.dataset.isAdaptive;
    let images;
    const originalImages = [];
    let count = 0;

    const rollSlider = (countSlides, itemWidth, itemMarginRight) => {
      track.style.transform = `translateX(-${countSlides * (itemWidth + itemMarginRight)}px)`;
    };

    const setSlider = () => {
      const typeScreen = getTypeScreen();
      const itemMarginRight = getMarginRight(items[0]);
      const slidesToShow = howManySlides(sliderId, typeScreen);
      const widthContainer = container.offsetWidth;
      const itemWidth = (widthContainer - itemMarginRight * (slidesToShow - 1)) / slidesToShow;

      if (isAdaptive === 'true') {
        images = slider.querySelectorAll('.slider__item img');
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
      }

      rollSlider(count, itemWidth, itemMarginRight);

      btnNext.addEventListener('click', function () {
        count = count + SLIDES_TO_SCROLL;
        if (count > (items.length - slidesToShow)) {
          count = 0;
        }
        rollSlider(count, itemWidth, itemMarginRight);
      });

      btnPrev.addEventListener('click', function () {
        count = count - SLIDES_TO_SCROLL;
        if (count < 0) {
          count = items.length - slidesToShow;
        }
        rollSlider(count, itemWidth, itemMarginRight);
      });

      if (mediaQueryTouch.matches) {
        let x1;
        let y1;

        const onTouchStart = (evt) => {
          x1 = evt.touches[0].clientX;
          y1 = evt.touches[0].clientY;

          if (ITEM_PROPERTIES[sliderId][typeScreen].touchableCard) {
            if (evt.target.matches('.slider__item img') || evt.target.matches('.slider__item h3')) {
              items.forEach((item) => {
                if (evt.target.closest('.slider__item') === item) {
                  item.dataset.isTouch = 'true';
                } else {
                  item.dataset.isTouch = 'false';
                }
              });
            }
          }
        };

        const onTouchMove = (evt) => {
          if (!x1 || !y1) {
            return false;
          }

          let x2 = evt.touches[0].clientX;
          let y2 = evt.touches[0].clientY;
          let xDifference = x2 - x1;
          let yDifference = y2 - y1;

          if (Math.abs(xDifference) > Math.abs(yDifference)) {
            if (xDifference > 0) {
              count = count - SLIDES_TO_SCROLL;
              if (count < 0) {
                count = items.length - slidesToShow;
              }
              rollSlider(count, itemWidth, itemMarginRight);
            } else {
              count = count + SLIDES_TO_SCROLL;
              if (count > (items.length - slidesToShow)) {
                count = 0;
              }
              rollSlider(count, itemWidth, itemMarginRight);
            }
          }

          x1 = 0;
          y1 = 0;
          return true;
        };

        container.addEventListener('touchstart', onTouchStart, false);
        container.addEventListener('touchmove', onTouchMove, false);
      }
    };

    setSlider();
    window.addEventListener('resize', setSlider);
  });
};

export {initSliders};
