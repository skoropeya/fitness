const container = document.querySelector('.slider__container');
const track = container.querySelector('.slider__track');
const items = container.querySelectorAll('.slider__item');
const images = container.querySelectorAll('.trainer-card__photo');
const btnPrev = document.querySelector('.slider__btn--previous');
const btnNext = document.querySelector('.slider__btn--next');

const SLIDES_TO_SCROLL = 1;
const ITEM_PROPERTIES = {
  'mobile': {width: 226, height: 274, amount: 1},
  'tablet': {width: 268, height: 294, amount: 2},
  'desktop': {width: 260, height: 294, amount: 4},
};

let count = 0;

const getOriginalSize = (elem, attr) => elem.getAttribute(attr);

const originalImages = [];
images.forEach(function (image) {
  originalImages.push({
    img: image,
    originalWidth: getOriginalSize(image, 'width'),
  });
});

const setSize = (elem, valueWidth, valueHeight) => {
  elem.style.setProperty('width', valueWidth);
  elem.style.setProperty('height', valueHeight);
};

const calculateImageSize = (typeScreen, item) => {
  let baseItemWidth = ITEM_PROPERTIES[typeScreen].width;
  let itemWidth = item.clientWidth;

  if (baseItemWidth) {
    images.forEach(function (image, i) {
      const originalWidth = originalImages[i].originalWidth;
      const newWidth = originalWidth / baseItemWidth * itemWidth;
      setSize(image, `${newWidth}px`, 'auto');
    });
  }
};

const getTypeScreen = () => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    return 'mobile';
  } else if (window.matchMedia('(max-width: 1199px)').matches) {
    return 'tablet';
  } else {
    return 'desktop';
  }
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

const rollSlider = (countSlides, widthItem, itemMarginRight) => {
  track.style.transform = `translateX(-${countSlides * (widthItem + itemMarginRight)}px)`;
};

const setSlider = () => {
  const typeScreen = getTypeScreen();
  const itemMarginRight = getMarginRight(items[0]);
  const slidesToShow = howManySlides(typeScreen);
  const coefficientCard = getCoefficientCard(typeScreen);

  const widthContainer = container.clientWidth;
  const widthItem = (widthContainer - itemMarginRight * (slidesToShow - 1)) / slidesToShow;

  items.forEach((item) => {
    item.style.width = `${widthItem}px`;
    item.style.height = `${widthItem * coefficientCard}px`;
    calculateImageSize(typeScreen, item);
  });



  rollSlider(count, widthItem, itemMarginRight);

  btnNext.addEventListener('click', function () {
    count = count + SLIDES_TO_SCROLL;
    if (count > (items.length - slidesToShow)) {
      count = 0;
    }
    rollSlider(count, widthItem, itemMarginRight);
  });

  btnPrev.addEventListener('click', function () {
    count = count - SLIDES_TO_SCROLL;
    if (count < 0) {
      count = items.length - slidesToShow;
    }
    rollSlider(count, widthItem, itemMarginRight);
  });
};

const initSliderTrainers = () => {
  setSlider();
  window.addEventListener('resize', setSlider);
};

export {initSliderTrainers};
