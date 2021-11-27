const cart = function (params) {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = document.querySelector('.modal-close');
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');
  const cartTotal = document.querySelector('.card-table__total');
  const modalForm = document.querySelector('.modal-form');
  const nameCustomerInput = document.getElementById('nameCustomer');
  const phoneCustomerInput = document.getElementById('phoneCustomer');

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    const newCart = cart.filter(good => {
      return good.id !== id;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    })

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    })

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));
    const clickedGood = goods.find(good => good.id === id);
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (cart.some(good => good.id === clickedGood.id)) {
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      })
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    const priceArray = [];
    cartTable.innerHTML = '';
    cartTotal.textContent = 0 + '$';
    goods.forEach(({ name, price, count, id }) => {
      const goodAmount = +price * +count;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${name}</td>
        <td>${price}$</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${count}</td>
        <td><button class="cart-btn-plus">+</button></td>
        <td>${goodAmount}$</td>
        <td><button class="cart-btn-delete">x</button></td>
      `
      cartTable.append(tr);
      tr.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(id);
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(id);
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(id);
        };
      });
      priceArray.push(goodAmount);
    });
    if (priceArray.length > 0) {
      const totalPrice = priceArray.reduce(function(sum, current) {
        return sum + current;
      });
      cartTotal.textContent = totalPrice + '$';
    }
  };

  const sendForm = () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: nameCustomerInput.value,
        phone: phoneCustomerInput.value
      })
    }).then(() => {
      closeModal();
      localStorage.removeItem('cart');
      modalForm.reset();
    })
  }
  
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  })

  const closeModal = () => {
    cart.classList.remove('show');
  };

  cartBtn.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    renderCartGoods(cartArray);
    cart.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  cart.addEventListener('click', (e) => {
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  })

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        const buttonToCart = e.target.closest('.add-to-cart');
        const goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      };
    })
  }
};

export default cart;