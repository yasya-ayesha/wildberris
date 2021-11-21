const cart = function (params) {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = document.querySelector('.modal-close');
  
  const closeModal = () => {
    cart.classList.remove('show');
  };

  cartBtn.addEventListener('click', () => {
    cart.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  cart.addEventListener('click', (e) => {
    if (!e.target.closest('.modal')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  })
};

export default cart;