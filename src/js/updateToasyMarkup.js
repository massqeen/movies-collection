import refs from './refs';

function showToasty() {
  refs.toasty.classList.add('show-toasty');
  refs.toastySound.play();
}

function destroyToasty() {
  setTimeout(() => {
    refs.toasty.classList.remove('show-toasty');
  }, 800);
}

export { showToasty, destroyToasty };
