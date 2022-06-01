import {getOriginalSize, setSize, getTypeScreen} from '../utils/width-card';

const container = document.querySelector('.slider__container');
const track = container.querySelector('.slider__track');
const items = container.querySelectorAll('.slider__item');
const images = container.querySelectorAll('.trainer-card__photo');
const btnPrev = document.querySelector('.slider__btn--previous');
const btnNext = document.querySelector('.slider__btn--next');

const mediaQueryTouch = window.matchMedia('(hover: none) and (pointer: coarse)');
let count = 0;

const SLIDES_TO_SCROLL = 1;
const ITEM_PROPERTIES = {
  'mobile': {width: 226, height: 274, amount: 1},
  'tablet': {width: 268, height: 294, amount: 2},
  'desktop': {width: 260, height: 294, amount: 4},
};

const originalImages = [];
images.forEach(function (image) {
  originalImages.push({
    img: image,
    originalWidth: getOriginalSize(image, 'width'),
  });
});

const calculateImageSize = (baseItemWidth, itemWidth) => {
  const coefficient = itemWidth / baseItemWidth;

  images.forEach(function (image, i) {
    const originalWidth = originalImages[i].originalWidth;
    let newWidth = coefficient * originalWidth;

    if (newWidth < itemWidth) {
      newWidth = itemWidth;
    }

    setSize(image, `${newWidth}px`, 'auto');
  });
};

const calculateItemSize = (itemWidth, coefficientCard) => {
  items.forEach((item) => {
    item.style.width = `${itemWidth}px`;
    item.style.height = `${itemWidth * coefficientCard}px`;
  });
};

const howManySlides = (typeScreen) => {
  return ITEM_PROPERTIES[typeScreen].amount;
};

const getCoefficientCard = (typeScreen) => {
  return ITEM_PROPERTIES[typeScreen].height / ITEM_PROPERTIES[typeScreen].width;
};

const getMarginRight = (elem) => {
  const value = window.getComputedStyle(elem, null).getPropertyValue('margin-right');
  return +value.slice(0, -2);
};

const rollSlider = (countSlides, itemWidth, itemMarginRight) => {
  track.style.transform = `translateX(-${countSlides * (itemWidth + itemMarginRight)}px)`;
};

const setSlider = () => {
  const typeScreen = getTypeScreen();
  const itemMarginRight = getMarginRight(items[0]);
  const slidesToShow = howManySlides(typeScreen);
  const coefficientCard = getCoefficientCard(typeScreen);
  const baseItemWidth = ITEM_PROPERTIES[typeScreen].width;

  const widthContainer = container.offsetWidth;
  const itemWidth = (widthContainer - itemMarginRight * (slidesToShow - 1)) / slidesToShow;

  calculateItemSize(itemWidth, coefficientCard);
  calculateImageSize(baseItemWidth, itemWidth);
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

      if (evt.target.matches('.slider__item img') || evt.target.matches('.slider__item h3')) {
        items.forEach((item) => {
          if (evt.target.closest('.slider__item') === item) {
            item.dataset.isTouch = 'true';
          } else {
            item.dataset.isTouch = 'false';
          }
        });
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

const initSliderTrainers = () => {
  setSlider();
  window.addEventListener('resize', setSlider);
};

export {initSliderTrainers};
