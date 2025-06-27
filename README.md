Wildberries Analytics Dashboard
📌 Стек технологий

- Backend: Django + Django REST Framework
- Frontend: React + Material UI + Chart.js
- Парсинг: Python скрипт с использованием requests и BeautifulSoup

✅ Backend (Django)
Установка и запуск Backend:

cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# или
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Парсинг товаров с Wildberries:
Вариант 1: Через Django shell:

python manage.py shell

from products.parser import WildberriesParser
from products.models import Product

# Очистить старые товары (по желанию)
Product.objects.all().delete()

# Спарсить новые товары по запросу "телефон", 1 страница
products = WildberriesParser.parse_search("телефон", pages=1)
count = WildberriesParser.save_to_db(products)

print(f"Добавлено {count} новых товаров")

Вариант 2: Через API (cURL):

curl -X POST "http://localhost:8000/api/products/parse/" \
-H "Content-Type: application/json" \
-d '{"query": "телефон", "pages": 1}'

API Эндпоинты:

GET /api/products/ - Список всех товаров (с фильтрацией)
POST /api/products/parse/ - Запуск парсинга новых товаров
GET /api/products/histogram/ - Гистограмма цен
GET /api/products/discount-rating/ - График Скидка vs Рейтинг

Примеры API-запросов:

Товары дороже 5000 руб:
curl "http://localhost:8000/api/products/?min_price=5000"

Товары с рейтингом выше 4.5:
curl "http://localhost:8000/api/products/?min_rating=4.5"

Гистограмма цен:
curl "http://localhost:8000/api/products/histogram/"

График Скидка vs Рейтинг:
curl "http://localhost:8000/api/products/discount-rating/"

✅ Frontend (React)
Установка и запуск Frontend:

cd wildberries-frontend
npm install
npm start

Откроется по адресу: http://localhost:3000
