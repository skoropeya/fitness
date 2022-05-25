// скрипт взят отсюда:
// https://www.youtube.com/watch?v=4JS70KB9GS0
// https://github.com/pepelsbey/playground/tree/main/12

const video = document.querySelector('.video');
const link = video.querySelector('.video__link');
const overlay = video.querySelector('.video__overlay');
const button = video.querySelector('.video__btn');
const url = link.href;

const parseMediaURL = () => {
  const regexp = /https:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9_-]+)/i;
  const match = url.match(regexp);

  return match[1];
};

const id = parseMediaURL(link);

const generateURL = () => {
  return 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1';
};

const createIframe = () => {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('src', generateURL(id));
  iframe.setAttribute('frameborder', '0');
  iframe.classList.add('video__media');

  return iframe;
};

const clickVideo = () => {
  let iframe = createIframe(id);

  link.remove();
  button.remove();
  overlay.remove();
  video.appendChild(iframe);
};

const initVideo = () => {
  video.addEventListener('click', clickVideo);

  link.removeAttribute('href');
};

export {initVideo};
