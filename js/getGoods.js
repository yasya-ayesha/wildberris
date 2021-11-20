const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');

  const getData = () => {
    fetch('https://testproject2-672ba-default-rtdb.firebaseio.com/db.json')
      .then(res => res.json())
      .then(data => localStorage.setItem('goods', JSON.stringify(data)));
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    })
  });
};

getGoods();