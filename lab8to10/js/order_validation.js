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