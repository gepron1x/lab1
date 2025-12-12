// renderDishes.js
// import dishes from './dishes.js';

// Сортируем блюда по названию в каждой категории
function renderAllDishes() {
  // Группируем и сортируем по категориям
  const categories = {
    soup: document.querySelector('#soups .dishes-grid'),
    main: document.querySelector('#main .dishes-grid'),
    drink: document.querySelector('#drinks .dishes-grid')
  };


  // Сортировка по алфавиту внутри каждой категории
  const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  sortedDishes.forEach(dish => {
    const card = document.createElement('div');
    card.classList.add('dish-card');
    card.dataset.dish = dish.keyword; // важный data-атрибут

    card.innerHTML = `
      <img src="images/${dish.image}" alt="${dish.name}" class="dish-image">
      <h3 class="dish-name">${dish.name}</h3>
      <p class="dish-count">${dish.count}</p>
      <p class="dish-price">${dish.price} ₽</p>
      <button>Добавить</button>
    `;

    // Добавляем в нужную секцию
    if (categories[dish.category]) {
      categories[dish.category].appendChild(card);
    }
  });
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', renderAllDishes);