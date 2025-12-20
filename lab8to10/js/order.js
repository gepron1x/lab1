const selected = {
  soup: null,
  'main-course': null,
  salad: null,
  drink: null,
  dessert: null
};

function isValidCombo() {
  const s = !!selected.soup;
  const m = !!selected['main-course'];
  const a = !!selected.salad;
  const d = !!selected.drink;

  return (
    (s && m && a && d) ||
    (s && m && d) ||
    (s && a && d) ||
    (m && a && d) ||
    (m && d)
  );
}

async function highlightSelected() {
  document.querySelectorAll('.dish-card').forEach(card => {
    card.classList.remove('selected');
  });

  for (const category in selected) {
    const dish = selected[category];
    if (!dish) continue;

    const card = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
    if (card) {
      card.classList.add('selected');
    }
  }
}

function updatePanel() {
  const hasItems = Object.values(selected).some(d => d !== null);
  const panel = document.getElementById('checkout-panel');
  const link = document.getElementById('go-to-checkout');
  const totalEl = document.getElementById('panel-total');

  if (!hasItems) {
    panel.style.display = 'none';
    return;
  }

  panel.style.display = 'block';
  const total = Object.values(selected).reduce((sum, dish) => sum + (dish?.price || 0), 0);
  totalEl.textContent = total;

  if (isValidCombo()) {
    link.classList.remove('btn-disabled');
    link.classList.add('enabled');
  } else {
    link.classList.add('btn-disabled');
    link.classList.remove('enabled');
  }
}

// При выборе блюда
document.addEventListener('click', async (e) => {
  const card = e.target.closest('.dish-card');
  if (!card) return;

  const keyword = card.dataset.dish;
  const all = await lazyDishes();
  const dish = all.find(d => d.keyword === keyword);
  if (!dish) return;

  selected[dish.category] = dish;
  saveOrder(selected);
  updatePanel();
  highlightSelected(); // подсветка выбранных карточек
});

// При загрузке страницы — восстанавливаем заказ
document.addEventListener('DOMContentLoaded', async () => {
  const saved = loadOrder();
  if (saved) {
    const all = await lazyDishes();
    Object.keys(saved).forEach(cat => {
      if (saved[cat]) {
        const dish = all.find(d => d.keyword === saved[cat] && d.category === cat);
        if (dish) selected[cat] = dish;
      }
    });
    highlightSelected();
    updatePanel();
  }
});