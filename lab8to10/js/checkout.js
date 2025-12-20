const API_BASE = 'https://edu.std-900.ist.mospolytech.ru';

const API_KEY = 'e5992e19-c0fe-4ac0-9e07-8ccaa279890b';

const orderContainer = document.querySelector('#checkout-summary');
const totalBlock = document.querySelector('#checkout-total');

async function renderOrderDishes() {
  const grid = document.getElementById('order-dishes-grid');
  const nothing = document.getElementById('nothing-selected');
  const selectedDishes = Object.values(selected).filter(d => d);

  if (selectedDishes.length === 0) {
    nothing.style.display = 'block';
    grid.style.display = 'none';
    return;
  }

  nothing.style.display = 'none';
  grid.style.display = 'grid';
  grid.innerHTML = '';

  selectedDishes.forEach(dish => {
    const card = document.createElement('div');
    card.className = 'dish-card checkout-card';
    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <h3>${dish.name}</h3>
      <p>${dish.count}</p>
      <p>${dish.price} ₽</p>
      <button class="remove-btn" data-keyword="${dish.keyword}">Удалить</button>
    `;
    grid.appendChild(card);
  });
}

function addSummary(category, categoryName) {
  let html = '';
  html += `<div class="order-category"><h4>${categoryName}</h4>`;
  html += selected[category]
    ? `<p>${selected[category].name} — ${selected[category].price} ₽</p>`
    : '<p class="not-selected">Блюдо не выбрано</p>';
  html += '</div>';
  return html;
}
async function updateOrderDisplay() {
  dishes = await lazyDishes();
  const hasAnySelected = Object.values(selected).some(dish => dish !== null);

  if (!hasAnySelected) {
    totalBlock.style.display = 'none';
    return;
  }

  totalBlock.style.display = 'block';

  let html = '';

  html += addSummary("soup", "Супы");
  html += addSummary("main-course", "Основное блюдо");
  html += addSummary("salad", "Салат или стартер");
  html += addSummary("drink", "Напиток");
  html += addSummary("dessert", "Десерт");

  orderContainer.innerHTML = html;

  const total = Object.values(selected).reduce((sum, dish) => {
    return sum + (dish ? dish.price : 0);
  }, 0);

  document.querySelector('#total-price').textContent = total;
}

async function updateSummary() {
  await updateOrderDisplay();
  await renderOrderDishes();
}

// Удаление блюда
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const keyword = e.target.dataset.keyword;
    const dish = Object.values(selected).find(d => d?.keyword === keyword);
    if (dish) {
      selected[dish.category] = null;
      saveOrder(selected);
      updateSummary();
    }
  }
});

// Отправка заказа
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!isValidLunch()) {
    showNotification(getErrorMessage());
    return;
  }

  const formData = new FormData(e.target);
  const data = {
    full_name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    delivery_address: formData.get('address'),
    delivery_type: formData.get('delivery_time'),
    comment: formData.get('comment') || '',
    subscribe: formData.get('subscribe') ? 1 : 0,
  };

  if (selected.soup) data.soup_id = selected.soup.id;
  if (selected['main-course']) data.main_course_id = selected['main-course'].id;
  if (selected.salad) data.salad_id = selected.salad.id;
  if (selected.drink) data.drink_id = selected.drink.id;
  if (selected.dessert) data.dessert_id = selected.dessert.id;
  if (data.delivery_type === 'by_time') {
    data.delivery_time = formData.get('delivery_time');
  }

  try {
    const response = await fetch(`${API_BASE}/labs/api/orders?api_key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Ошибка сервера');
    }
    console.log(result);
    showNotification("Заказ успешно оформлен");
    clearOrder();
    setTimeout(() => window.location.href = 'lunch.html', 10 * 1000);

  } catch (err) {
    showNotification('Ошибка оформления заказа: ' + err.message);
  }
});

// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
  dishes = await lazyDishes();
  const saved = loadOrder();
  if (saved) {
    
    Object.keys(saved).forEach(cat => {
      if (saved[cat]) {
        const dish = dishes.find(d => d.keyword === saved[cat] && d.category === cat);
        if (dish) selected[cat] = dish;
      }
    });
  }
  await updateSummary();
});