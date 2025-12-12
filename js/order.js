// import dishes from './dishes.js';

const selected = {
  soup: null,
  main: null,
  drink: null
};

const orderContainer = document.querySelector('#order-summary');
const totalBlock = document.querySelector('#order-total');

// Функция обновления отображения заказа
function updateOrderDisplay() {

  if (!(selected.soup || selected.main || selected.drink)) {
    orderContainer.innerHTML = '<p class="nothing-selected">Ничего не выбрано</p>';
    totalBlock.style.display = 'none';
    return;
  }

  totalBlock.style.display = 'block';

  let html = '';


  html += '<div class="order-category">';
  html += '<h4>Суп</h4>';
  html += selected.soup 
    ? `<p>${selected.soup.name} — ${selected.soup.price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';

  html += '<div class="order-category">';
  html += '<h4>Основное блюдо</h4>';
  html += selected.main 
    ? `<p>${selected.main.name} — ${selected.main.price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';

  html += '<div class="order-category">';
  html += '<h4>Напиток</h4>';
  html += selected.drink 
    ? `<p>${selected.drink.name} — ${selected.drink.price} ₽</p>`
    : '<p class="not-selected">Напиток не выбран</p>';
  html += '</div>';

  orderContainer.innerHTML = html;

  const total = (selected.soup?.price || 0) + 
                (selected.main?.price || 0) + 
                (selected.drink?.price || 0);

  document.querySelector('#total-price').textContent = total;
}

// Обработчик клика по карточке
document.addEventListener('click', (e) => {
  const card = e.target.closest('.dish-card');
  if (!card) return;

  const keyword = card.dataset.dish;
  const dish = dishes.find(d => d.keyword === keyword);
  console.log(keyword);
  if (!dish) return;

  selected[dish.category] = dish;

  updateOrderDisplay();
});

document.addEventListener('DOMContentLoaded', updateOrderDisplay);