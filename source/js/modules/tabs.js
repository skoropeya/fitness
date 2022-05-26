const tab = document.querySelector('.tabs');
const buttons = tab.querySelectorAll('.tabs__btn');
const contents = tab.querySelectorAll('.tabs__content');

const clickButton = (evt) => {
  const currentTimePeriod = evt.target.dataset.timePeriod;
  const currentParent = evt.target.parentNode;

  contents.forEach((content) => {
    if (content.dataset.timePeriod === currentTimePeriod) {
      content.dataset.isActive = 'true';
    } else {
      content.dataset.isActive = 'false';
    }
  });

  buttons.forEach((button) => {
    const parent = button.parentNode;
    if (parent === currentParent) {
      parent.dataset.isActive = 'true';
    } else {
      parent.dataset.isActive = 'false';
    }
  });
};

const initTabs = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', clickButton);
  });
};

export {initTabs};
