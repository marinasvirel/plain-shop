var cart = {}; // Корзина

function init() {
  var hash = window.location.hash.substring(1);
  $.post(
    "admin/core.php",
    {
      "action": "loadSingleGoods",
      "id": hash,
    },
    goodsOut,
  );
}

function goodsOut(data) {
  // Вывод товара на страницу
  if (data != 0) {
    data = JSON.parse(data);
    var out = '';
    out += '<div class="cart">';
    out += `<button class="later" data-id="${data.id}">&hearts;</button>`;
    out += `<p class="name">${data.name}</p>`;
    out += `<img src="img/${data.img}">`;
    out += `<div class="cost">${data.cost}</div>`;
    out += `<button class="add-to-cart" data-id="${data.id}">Купить</button>`;
    out += '</div>';
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.later').on('click', addToLater);
  } else{
    $('.goods-out').html("Такого товара не существует");
  }
}

function addToLater() {
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