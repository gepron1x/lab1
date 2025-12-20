
const STORAGE_KEY = 'lunch_order';

function saveOrder(selected) {
  const order = {
    soup: selected.soup?.keyword || null,
    'main-course': selected['main-course']?.keyword || null,
    salad: selected.salad?.keyword || null,
    drink: selected.drink?.keyword || null,
    dessert: selected.dessert?.keyword || null
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

function loadOrder() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function clearOrder() {
  localStorage.removeItem(STORAGE_KEY);
}