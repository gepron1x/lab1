// dishes.js — массив блюд, полученный из API

const dishes = [
  // =============== СУПЫ ===============
  {
    keyword: "gaspacho",
    name: "Гаспачо",
    price: 195,
    count: "350 г",
    image: "soups/gazpacho",
    category: "soup",
    kind: "veg"
  },
  {
    keyword: "gribnoy",
    name: "Грибной суп-пюре",
    price: 185,
    count: "330 г",
    image: "soups/mushroom_soup",
    category: "soup",
    kind: "veg"
  },
  {
    keyword: "norvezhskiy",
    name: "Норвежский суп",
    price: 270,
    count: "330 г",
    image: "soups/norwegian_soup",
    category: "soup",
    kind: "fish"
  },
  {
    keyword: "ramen",
    name: "Рамен",
    price: 375,
    count: "425 г",
    image: "soups/ramen",
    category: "soup",
    kind: "meat"
  },
  {
    keyword: "tomyum",
    name: "Том ям с креветками",
    price: 650,
    count: "500 г",
    image: "soups/tomyum",
    category: "soup",
    kind: "fish"
  },
  {
    keyword: "chicken",
    name: "Куриный суп",
    price: 330,
    count: "350 г",
    image: "soups/chicken",
    category: "soup",
    kind: "meat"
  },

  // =============== ОСНОВНЫЕ БЛЮДА ===============
  {
    keyword: "zharenaya-kartoshka",
    name: "Жареная картошка с грибами",
    price: 150,
    count: "250 г",
    image: "main_course/friedpotatoeswithmushrooms1",
    category: "main-course",
    kind: "veg"
  },
  {
    keyword: "lazanya",
    name: "Лазанья",
    price: 385,
    count: "310 г",
    image: "main_course/lasagna",
    category: "main-course",
    kind: "meat"
  },
  {
    keyword: "kotlety-s-pyure",
    name: "Котлеты из курицы с картофельным пюре",
    price: 225,
    count: "280 г",
    image: "main_course/chickencutletsandmashedpotatoes",
    category: "main-course",
    kind: "meat"
  },
  {
    keyword: "fishrice",
    name: "Рыбная котлета с рисом и спаржей",
    price: 320,
    count: "270 г",
    image: "main_course/fishrice",
    category: "main-course",
    kind: "fish"
  },
  {
    keyword: "pizza",
    name: "Пицца Маргарита",
    price: 450,
    count: "470 г",
    image: "main_course/pizza",
    category: "main-course",
    kind: "veg"
  },
  {
    keyword: "shrimppasta",
    name: "Паста с креветками",
    price: 340,
    count: "280 г",
    image: "main_course/shrimppasta",
    category: "main-course",
    kind: "fish"
  },

  // =============== САЛАТЫ / СТАРТЕРЫ ===============
  {
    keyword: "saladwithegg",
    name: "Корейский салат с овощами и яйцом",
    price: 330,
    count: "250 г",
    image: "salads_starters/saladwithegg",
    category: "salad",
    kind: "veg"
  },
  {
    keyword: "caesar",
    name: "Цезарь с цыпленком",
    price: 370,
    count: "220 г",
    image: "salads_starters/caesar",
    category: "salad",
    kind: "meat"
  },
  {
    keyword: "caprese",
    name: "Капрезе с моцареллой",
    price: 350,
    count: "235 г",
    image: "salads_starters/caprese",
    category: "salad",
    kind: "veg"
  },
  {
    keyword: "tunasalad",
    name: "Салат с тунцом",
    price: 480,
    count: "250 г",
    image: "salads_starters/tunasalad",
    category: "salad",
    kind: "fish"
  },
  {
    keyword: "frenchfries1",
    name: "Картофель фри с соусом Цезарь",
    price: 280,
    count: "235 г",
    image: "salads_starters/frenchfries1",
    category: "salad",
    kind: "veg"
  },
  {
    keyword: "frenchfries2",
    name: "Картофель фри с кетчупом",
    price: 260,
    count: "235 г",
    image: "salads_starters/frenchfries2",
    category: "salad",
    kind: "veg"
  },

  // =============== НАПИТКИ ===============
  {
    keyword: "apelsinoviy",
    name: "Апельсиновый сок",
    price: 120,
    count: "300 мл",
    image: "beverages/orangejuice",
    category: "drink",
    kind: "cold"
  },
  {
    keyword: "yablochniy",
    name: "Яблочный сок",
    price: 90,
    count: "300 мл",
    image: "beverages/applejuice",
    category: "drink",
    kind: "cold"
  },
  {
    keyword: "morkovniy",
    name: "Морковный сок",
    price: 110,
    count: "300 мл",
    image: "beverages/carrotjuice",
    category: "drink",
    kind: "cold"
  },
  {
    keyword: "cappuccino",
    name: "Капучино",
    price: 180,
    count: "300 мл",
    image: "beverages/cappuccino",
    category: "drink",
    kind: "hot"
  },
  {
    keyword: "greentea",
    name: "Зелёный чай",
    price: 100,
    count: "300 мл",
    image: "beverages/greentea",
    category: "drink",
    kind: "hot"
  },
  {
    keyword: "tea",
    name: "Чёрный чай",
    price: 90,
    count: "300 мл",
    image: "beverages/tea",
    category: "drink",
    kind: "hot"
  },

  // =============== ДЕСЕРТЫ ===============
  {
    keyword: "baklava",
    name: "Пахлава",
    price: 220,
    count: "300 гр",
    image: "desserts/baklava",
    category: "dessert",
    kind: "medium"
  },
  {
    keyword: "checheesecake",
    name: "Чизкейк",
    price: 240,
    count: "125 гр",
    image: "desserts/checheesecake",
    category: "dessert",
    kind: "small"
  },
  {
    keyword: "chocolatecheesecake",
    name: "Шоколадный чизкейк",
    price: 260,
    count: "125 гр",
    image: "desserts/chocolatecheesecake",
    category: "dessert",
    kind: "small"
  },
  {
    keyword: "chocolatecake",
    name: "Шоколадный торт",
    price: 270,
    count: "140 гр",
    image: "desserts/chocolatecake",
    category: "dessert",
    kind: "small"
  },
  {
    keyword: "donuts2",
    name: "Пончики (3 штуки)",
    price: 410,
    count: "350 гр",
    image: "desserts/donuts2",
    category: "dessert",
    kind: "medium"
  },
  {
    keyword: "donuts",
    name: "Пончики (6 штук)",
    price: 650,
    count: "700 гр",
    image: "desserts/donuts",
    category: "dessert",
    kind: "large"
  }
];