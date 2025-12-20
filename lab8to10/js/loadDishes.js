lazyInitDishes = null;

async function loadDishes() {
  const url = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Not an array');
    }

    return data;

  } catch (error) {
    console.error('Ошибка загрузки блюд:', error);
    throw error;
  }
}

async function lazyDishes() {
  if(lazyInitDishes != null) return lazyInitDishes;
  lazyInitDishes = await loadDishes();
  return lazyInitDishes;
}
