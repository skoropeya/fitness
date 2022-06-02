const getOriginalSize = (elem, attr) => elem.getAttribute(attr);

const setSize = (elem, valueWidth, valueHeight) => {
  elem.style.setProperty('width', valueWidth);
  elem.style.setProperty('height', valueHeight);
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

const getMarginRight = (elem) => {
  const value = window.getComputedStyle(elem, null).getPropertyValue('margin-right');
  return +value.slice(0, -2);
};

const calculateImageSize = (images, originalImages, baseItemWidth, itemWidth) => {
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

const calculateItemSize = (items, itemWidth, coefficientCard) => {
  items.forEach((item) => {
    item.style.width = `${itemWidth}px`;
    item.style.height = `${itemWidth * coefficientCard}px`;
  });
};

export {getOriginalSize, setSize, getTypeScreen, getMarginRight, calculateImageSize, calculateItemSize};
