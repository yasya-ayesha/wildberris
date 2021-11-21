const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  
  if (window.location.pathname === '/index.html') {
    const allBtn = document.querySelector('.more');
    allBtn.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    })
  }
  
  const renderGoods = goods => {
    const goodsContainer = document.querySelector('.long-goods-list');
    goodsContainer.innerHTML = '';

    goods.forEach(({label, img, name, price, id, description}) => {
      const goodBlock = document.createElement('div');

      goodBlock.classList.add('col-lg-3');
      goodBlock.classList.add('col-sm-6');

      goodBlock.innerHTML = `
        <div class="goods-card">
					<span class="label ${label ? null : 'd-none'}">${label}</span>
					<img src="db/${img}" alt="${name}" class="goods-image">
					<h3 class="goods-title">${name}</h3>
					<p class="goods-description">${description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${id}">
						<span class="button-price">$${price}</span>
					</button>
				</div>
      `

      goodsContainer.append(goodBlock)
    })
  }

  const getData = (value, category) => {
    fetch('https://testproject2-672ba-default-rtdb.firebaseio.com/db.json')
      .then(res => res.json())
      .then(data => {
        const array = category ? data.filter((item) => item[category] === value) : data;
        localStorage.setItem('goods', JSON.stringify(array));

        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html';
        } else {
          renderGoods(array);
        }
      })
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      getData(linkValue, category);
    })
  });

  if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }
};

export default getGoods;