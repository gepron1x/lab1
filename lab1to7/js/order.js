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
async function updateOrderDisplay() {
  dishes = await lazyDishes();
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

function isValidLunch() {
  const hasSoup = !!selected.soup;
  const hasMain = !!selected['main-course'];
  const hasSalad = !!selected.salad;
  const hasDrink = !!selected.drink;

  const totalMain = (hasSoup ? 1 : 0) + (hasMain ? 1 : 0) + (hasSalad ? 1 : 0);

  // Вариант 1: Суп + Главное + Салат + Напиток
  if (hasSoup && hasMain && hasSalad && hasDrink) return true;
  // Вариант 2: Суп + Главное + Напиток
  if (hasSoup && hasMain && hasDrink) return true;
  // Вариант 3: Суп + Салат + Напиток
  if (hasSoup && hasSalad && hasDrink) return true;
  // Вариант 4: Главное + Салат + Напиток
  if (hasMain && hasSalad && hasDrink) return true;
  // Вариант 5: Главное + Напиток
  if (hasMain && hasDrink) return true;

  return false;
}

// Получение текста ошибки
function getErrorMessage() {
  const hasAnything = Object.values(selected).some(d => d !== null);
  const hasDrink = !!selected.drink;

  if (!hasAnything) return "Ничего не выбрано. Выберите блюда для заказа";

  if (hasDrink && Object.keys(selected).filter(k => selected[k]).length === 1)
    return "Выберите главное блюдо";

  if (!!selected.soup && !selected['main-course'] && !selected.salad)
    return "Выберите главное блюдо/салат/стартер";

  if ((!!selected['main-course'] || !!selected.salad) && !selected.soup && !selected.drink)
    return "Выберите суп или главное блюдо";

  if (hasDrink && !selected.soup && !selected['main-course'] && !selected.salad)
    return "Выберите главное блюдо";

  if (!hasDrink) return "Выберите напиток";

  return "Недостаточно блюд для ланча";
}

// Создание модального уведомления
function showNotification(message) {
  // Удаляем старое, если есть
  const old = document.querySelector('.modal-overlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal">
      <h3>Ошибка заказа</h3>
      <p>${message}</p>
      <button>Окей 👌</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Закрытие по кнопке
  overlay.querySelector('button').addEventListener('click', () => {
    overlay.remove();
  });
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

  // updateOrderDisplay();
});

document.querySelector('form')?.addEventListener('submit', (e) => {
  if (!isValidLunch()) {
    e.preventDefault(); // блокируем отправку
    const message = getErrorMessage();
    showNotification(message);
  }
  // Если валидно — форма отправится нормально
});

document.addEventListener('DOMContentLoaded', updateOrderDisplay);