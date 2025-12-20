// renderDishes.js
const containers = {
  soup:    document.querySelector('#soup .dishes-grid'),
  'main-course':    document.querySelector('#main-course .dishes-grid'),
  salad:   document.querySelector('#salad .dishes-grid'),
  drink:   document.querySelector('#drink .dishes-grid'),
  dessert: document.querySelector('#dessert .dishes-grid')
};

function createCard(dish) {
  const card = document.createElement('div');
  card.className = 'dish-card';
  card.dataset.dish = dish.keyword;
  card.dataset.kind = dish.kind; // важно для фильтрации

  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <h3>${dish.name}</h3>
    <p class="count">${dish.count}</p>
    <p class="price">${dish.price} ₽</p>
  `;

  return card;
}

async function renderCategory(category, kind = 'all') {
  dishes = await lazyDishes();
  const container = containers[category];
  if (!container) return;

  container.innerHTML = '';

  const filtered = dishes.filter(d => 
    d.category === category && 
    (kind === 'all' || kind === '' || d.kind === kind)
  );

  // Сортировка по алфамильно
  filtered.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  filtered.forEach(dish => {
    container.appendChild(createCard(dish));
  });
}

async function renderAll() {
  renderCategory('soup');
  renderCategory('main-course');
  renderCategory('salad');
  renderCategory('drink');
  renderCategory('dessert');
}

// === ФИЛЬТРАЦИЯ ===
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  const filterContainer = btn.closest('section');
  const category = filterContainer.id; // soup, main, salad и т.д.
  const kind = btn.dataset.kind;

  // Управление active
  filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn.dataset.kind === 'all' || btn.classList.contains('active')) {
    filterContainer.querySelector('[data-kind="all"]').classList.add('active');
    renderCategory(category, 'all');
  } else {
    btn.classList.add('active');
    renderCategory(category, kind);
  }
});

// Изначально показываем всё
document.addEventListener('DOMContentLoaded', renderAll);