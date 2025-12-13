// import dishes from './dishes.js';

const selected = {
  soup: null,        // супы
  'main-course': null,  // основные блюда (обратите внимание на название категории!)
  salad: null,       // салаты/стартеры
  drink: null,       // напитки
  dessert: null      // десерты
};

const orderContainer = document.querySelector('#order-summary');
const totalBlock = document.querySelector('#order-total');

// Функция обновления отображения заказа
function updateOrderDisplay() {

  const hasAnySelected = Object.values(selected).some(dish => dish !== null);

  if (!hasAnySelected) {
    orderContainer.innerHTML = '<p class="nothing-selected">Ничего не выбрано</p>';
    totalBlock.style.display = 'none';
    return;
  }

  totalBlock.style.display = 'block';

  let html = '';
  // === Супы ===
  html += '<div class="order-category"><h4>Супы</h4>';
  html += selected.soup
    ? `<p>${selected.soup.name} — ${selected.soup.price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';

  // === Основные блюда ===
  html += '<div class="order-category"><h4>Основное блюдо</h4>';
  html += selected['main-course']
    ? `<p>${selected['main-course'].name} — ${selected['main-course'].price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';

  // === Салаты/стартеры ===
  html += '<div class="order-category"><h4>Салат или стартер</h4>';
  html += selected.salad
    ? `<p>${selected.salad.name} — ${selected.salad.price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';

  // === Напитки ===
  html += '<div class="order-category"><h4>Напиток</h4>';
  html += selected.drink
    ? `<p>${selected.drink.name} — ${selected.drink.price} ₽</p>`
    : '<p class="not-selected">Напиток не выбран</p>';
  html += '</div>';

  // === Десерты ===
  html += '<div class="order-category"><h4>Десерт</h4>';
  html += selected.dessert
    ? `<p>${selected.dessert.name} — ${selected.dessert.price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';
  orderContainer.innerHTML = html;

  const total = Object.values(selected).reduce((sum, dish) => {
    return sum + (dish ? dish.price : 0);
  }, 0);

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