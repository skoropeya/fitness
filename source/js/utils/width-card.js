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

export {getOriginalSize, setSize, getTypeScreen};
