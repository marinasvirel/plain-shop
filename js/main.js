var cart = {}; // Корзина

function init() {
  // Чтение файла goods.json
  // $.getJSON("goods.json", goodsOut);
  $.post(
    "admin/core.php",
    {
      "action": "loadGoods"
    },
    goodsOut,
  );
}

function goodsOut(data) {
  // Вывод товара на страницу
  data = JSON.parse(data);
  var out = '';
  for (var key in data) {
    out += '<div class="cart">';
    out += `<button class="later" data-id="${key}">&hearts;</button>`;
    out += `<p class="name"><a href="goods.html#${key}">${data[key].name}</a></p>`;
    out += `<img src="img/${data[key].img}">`;
    out += `<div class="cost">${data[key].cost}</div>`;
    out += `<button class="add-to-cart" data-id="${key}">Купить</button>`;
    out += '</div>';
  }
  $('.goods-out').html(out);
  $('.add-to-cart').on('click', addToCart);
  $('.later').on('click', addToLater);
}

function addToLater(){
  //Добавление товара в избранное
  var later = {};
  if (localStorage.getItem('later')) {
    later = JSON.parse(localStorage.getItem('later'));
  }
  alert("Добавлено в избранные");
  var id = $(this).attr('data-id');
  later[id] = 1;
  localStorage.setItem('later', JSON.stringify(later));
}

function addToCart() {
  // Добавляем товар в корзину
  var id = $(this).attr('data-id');
  if (cart[id] === undefined) {
    cart[id] = 1;
  } else {
    cart[id]++;
  }
  showMiniCart();
  saveCart();
}

function saveCart() {
  // Сохранение корзины в localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart() {
  // Показ мини корзины
  var out = "";
  for (var key in cart) {
    out += key + '----' + cart[key] + '<br>';
  }
  $('.mini-cart').html(out);
}

function loadCart() {
  // Проверка есть ли в localStorage запись
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    showMiniCart();
  }
}

$(document).ready(function () {
  init();
  loadCart();
})