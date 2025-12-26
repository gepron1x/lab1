
const API_BASE = 'https://edu.std-900.ist.mospolytech.ru';
const API_KEY = 'e5992e19-c0fe-4ac0-9e07-8ccaa279890b';

let orders = [];
let currentOrderId = null;

async function fetchOrders() {
  try {
    const response = await fetch(`${API_BASE}/labs/api/orders?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Ошибка авторизации или сервера');
    orders = await response.json();
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    for(const order of orders) {
      order.dishes = [];
      for(const kind of ["soup", "main_course", "salad", "drink", "dessert"]) {
        dish = await getDish(order, kind);
        order[kind] = dish;
        if(!!dish) order.dishes.push(dish);
      }
      order.price = order.dishes.map(dish => dish.price).reduce((a, b) => a + b, 0);
    }
    renderOrders();
  } catch (err) {
    showNotification('Ошибка загрузки заказов: ' + err.message, 'error');
  }
}

async function getDish(order, category_name) {
  dish_id = order[category_name + "_id"];
  if (!dish_id) return null;
  return await dishById(dish_id);

}

async function renderOrders() {
  const tbody = document.querySelector('#orders-table tbody');
  const noOrders = document.getElementById('no-orders');

  if (orders.length === 0) {
    noOrders.style.display = 'block';
    tbody.innerHTML = '';
    return;
  }

  noOrders.style.display = 'none';
  tbody.innerHTML = '';

  orders.forEach((order, index) => {
    const dishesNames = order.dishes.map(dish => dish.name).join(', ') || '—';

    const deliveryTime = order.delivery_type === 'by_time'
      ? order.delivery_time
      : 'Как можно скорее (с 7:00 до 23:00)';


    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${formatDate(order.created_at)}</td>
      <td>${dishesNames}</td>
      <td>${order.price} ₽</td>
      <td>${deliveryTime}</td>
      <td class="actions">
        <i class="bi bi-eye" data-action="view" data-id="${order.id}"></i>
        <i class="bi bi-pencil" data-action="edit" data-id="${order.id}"></i>
        <i class="bi bi-trash" data-action="delete" data-id="${order.id}"></i>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
}

// Модальные окна
function openModal(modalId) {
  document.getElementById('modal-overlay').style.display = 'block';
  document.getElementById(modalId).style.display = 'block';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

function showNotification(message, type = 'success') {
  const notif = document.getElementById('notification');
  notif.textContent = message;
  notif.style.background = type === 'error' ? '#e74c3c' : '#2ecc71';
  notif.style.display = 'block';
  setTimeout(() => notif.style.display = 'none', 4000);
}

// Действия
document.addEventListener('click', async (e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if (!action || !id) return;

  currentOrderId = id;
  const order = orders.find(o => o.id == id);

  if (action === 'view') {
    renderViewModal(order);
    openModal('view-modal');
  }

  if (action === 'edit') {
    renderEditModal(order);
    openModal('edit-modal');
  }

  if (action === 'delete') {
    openModal('delete-modal');
  }

  if (e.target.classList.contains('close-modal')) {
    closeModal();
  }
});

document.getElementById('confirm-delete').addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_BASE}/labs/api/orders/${currentOrderId}?api_key=${API_KEY}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Ошибка удаления');
    showNotification('Заказ успешно удалён');
    fetchOrders();
    closeModal();
  } catch (err) {
    showNotification('Ошибка при удалении заказа', 'error');
  }
});

document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const order = orders.find(o => o.id == currentOrderId);
  for(const key of Object.keys(data)) {
    if(data[key] === order[key]) {
      delete data[key];
    }
  }

  try {
    body = JSON.stringify(data);
    console.log("Body: " + body);
    const response = await fetch(`${API_BASE}/labs/api/orders/${currentOrderId}?api_key=${API_KEY}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data
    });
    if (!response.ok) throw new Error('Ошибка сохранения');
    showNotification('Заказ успешно изменён');
    console.log(await response.json());
    fetchOrders();
    closeModal();
  } catch (err) {
    showNotification('Ошибка при сохранении', 'error');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-modal')) {
    closeModal();
    return;
  }
  if (e.target.id === 'modal-overlay') {
    closeModal();
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

function orderContents(order) {
  return `<ul>
      ${order.soup ? `<li>Суп: ${order.soup.name} (${order.soup.price}₽)</li>` : ''}
      ${order.main_course ? `<li>Основное блюдо: ${order.main_course.name} (${order.main_course.price}₽)</li>` : ''}
      ${order.salad ? `<li>Салат: ${order.salad.name} (${order.salad.price}₽)</li>` : ''}
      ${order.drink ? `<li>Напиток: ${order.drink.name} (${order.drink.price}₽)</li>` : ''}
      ${order.dessert ? `<li>Десерт: ${order.dessert.name} (${order.dessert.price}₽)</li>` : ''}
    </ul>`;
}

function renderViewModal(order) {
  const dishes = ["soup", "main_course", "salad", "drink", "dessert"]
      .map(name => order[name]).filter(Boolean)
      .map(dish => dish.price).reduce((a, b) => a + b, 0);
  document.getElementById('view-content').innerHTML = `
    <p><strong>Дата оформления:</strong> ${formatDate(order.created_at)}</p>
    <p><strong>Имя получателя:</strong> ${order.full_name}</p>
    <p><strong>Адрес доставки:</strong> ${order.delivery_address}</p>
    <p><strong>Время доставки:</strong> ${order.delivery_type === 'by_time' ? order.delivery_time : 'Как можно скорее'}</p>
    <p><strong>Телефон:</strong> ${order.phone}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Комментарий:</strong> ${order.comment || '—'}</p>
    <h3>Состав заказа</h3>
    ${orderContents(order)}
    <p><strong>Стоимость:</strong> ${order.price}₽</p>
  `;
}

function renderEditModal(order) {
  document.getElementById('edit-form').innerHTML = `
    <div class="form-group">
      <label for="full_name">Имя получателя</label>
      <input type="text" id="full_name" name="full_name" value="${escapeHtml(order.full_name || '')}" required>
    </div>

    <div class="form-group">
      <label for="delivery_address">Адрес доставки</label>
      <input type="text" id="delivery_address" name="delivery_address" value="${escapeHtml(order.delivery_address || '')}" required>
    </div>

    <div class="form-group">
      <label for="phone">Телефон</label>
      <input type="tel" id="phone" name="phone" value="${escapeHtml(order.phone || '')}" required>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" value="${escapeHtml(order.email || '')}" required>
    </div>

    <div class="form-group">
      <label for="delivery_type">Тип доставки</label>
      <select id="delivery_type" name="delivery_type" required>
        <option value="now" ${order.delivery_type === 'now' ? 'selected' : ''}>Как можно скорее</option>
        <option value="by_time" ${order.delivery_type === 'by_time' ? 'selected' : ''}>Ко времени</option>
      </select>
    </div>

    <div class="form-group">
      <label for="delivery_time">Время доставки</label>
      <input type="time" id="delivery_time" name="delivery_time" value="${order.delivery_time || ''}">
      <small>Обязательно для доставки "Ко времени"</small>
    </div>

    <div class="form-group">
      <label for="comment">Комментарий</label>
      <textarea id="comment" name="comment" rows="4">${escapeHtml(order.comment || '')}</textarea>
    </div>

    <h3>Состав заказа</h3>
    ${orderContents(order)}
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', fetchOrders);