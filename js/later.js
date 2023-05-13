function init() {
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
  var later = {};
  if (localStorage.getItem('later')) {
    later = JSON.parse(localStorage.getItem('later'));
    for (var key in later) {
      out += '<div class="cart">';
      out += `<p class="name">${data[key].name}</p>`;
      out += `<img src="img/${data[key].img}">`;
      out += `<div class="cost">${data[key].cost}</div>`;
      out += `<a href="goods.html#${key}">Просмотреть</a>`;
      out += '</div>';
    }
    $('.goods-out').html(out);
  } else {
    $('.goods-out').html("Добавьте товар");
  }
}

$(document).ready(function () {
  init();
})