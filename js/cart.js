var cart = {};
function loadCart() {
  // Проверка есть ли в localStorage запись
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!isEmpty(cart)) {
      $('.main-cart').html('Корзина пуста');
    } else {
      showCart();
    }
  } else {
    $('.main-cart').html('Корзина пуста');
  }
}

function showCart() {
  // Вывод корзины
  if (!isEmpty(cart)) {
    $('.main-cart').html('Корзина пуста');
  } else {
    $.getJSON('goods.json', function (data) {
      var goods = data;
      var out = '';
      for (var id in cart) {
        out += `<button data-id="${id}" class="del-goods">X</button>`;
        out += `<img src="img/${goods[id].img}">`;
        out += `<p>${goods[id].name}</p>`;
        out += `<p>${goods[id].cost * cart[id]}</p>`;
        out += `<button data-id="${id}" class="plus-goods">+</button>`;
        out += `<span>${cart[id]}</span>`;
        out += `<button data-id="${id}" class="minus-goods">-</button><br><br><br>`;
      }
      $('.main-cart').html(out);
      $('.del-goods').on('click', delGoods);
      $('.plus-goods').on('click', plusGoods);
      $('.minus-goods').on('click', minusGoods);
    });
  }
}

function isEmpty(object) {
  // Проверка корзины на пустоту
  for (var key in object) {
    if (object.hasOwnProperty(key)) return true;
    return false;
  }
}

function delGoods() {
  // Удаление товара из корзины
  var id = $(this).attr('data-id');
  delete cart[id];
  saveCart();
  showCart();
}

function plusGoods() {
  // Увеличение количества
  var id = $(this).attr('data-id');
  cart[id]++;
  saveCart();
  showCart();
}

function minusGoods() {
  // Уменьшение количества
  var id = $(this).attr('data-id');
  if (cart[id] === 1) {
    delete cart[id];
  } else {
    cart[id]--;
  }
  saveCart();
  showCart();
}

function saveCart() {
  // Сохранение корзины в localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function sendEmail() {
  var ename = $('#ename').val();
  var email = $('#email').val();
  var ephone = $('#ephone').val();
  if (ename != '' && email != '' && ephone != '') {
    if (isEmpty(cart)) {
      $.post(
        "core/mail.php",
        {
          "ename": ename,
          "email": email,
          "ephone": ephone,
          "cart": cart,
        },
        function (data) {
          if (data == 1) {
            alert("Заказ отправлен");
          } else {
            alert("Заказ НЕ отправлен");
          }
        }
      );
    } else {
      alert("Корзина пуста");
    }
  } else {
    alert("Заполните поля");
  }
}

$(document).ready(function () {
  loadCart();
  $('.send-email').on('click', sendEmail);
});