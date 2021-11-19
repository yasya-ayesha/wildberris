const cart = function (params) {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = document.querySelector('.modal-close');

  cartBtn.addEventListener('click', () => {
    cart.classList.add('show');
  })
  closeBtn.addEventListener('click', () => {
    cart.classList.remove('show');
  })
};

cart();