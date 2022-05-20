const setViewportWidth = () => {
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);

  window.addEventListener('resize', function () {
    vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  });
};

export {setViewportWidth};
