# CS-33 Minesweeper Game - React

Реалізація класичної гри **"Сапер"** на **React 19** з використанням **Vite** для швидкої розробки та компонентного підходу.

> **Лабораторна робота №5**  
> **Студентка:** Kasianova Kate  
> **Група:** CS-33  
> **Дата:** 16 листопада 2025

---

## Мета роботи

- Опанувати основи **React**: компоненти, стан (`state`), властивості (`props`)
- Рефакторити JS-гру Minesweeper у **компонентну архітектуру**
- Навчитися використовувати **CSS Modules** для локальних стилів
- Забезпечити ізоляцію стилів (не впливати на інші сторінки)

---

| Завдання | Статус |
|--------|--------|
| Особиста директорія `src/components/KasianovaKate` | Done |
| Роутинг: шлях `/kasianova-kate` | Done |
| Розбиття на компоненти: `Board`, `Cell`, `Timer`, `MinesCounter`, `StatusMessage`, `GameEndModal` | Done |
| Управління станом через `useState`, `useEffect` | Done |
| Локальні стилі через **CSS Modules** (`.module.css`) | Done |
| Ізоляція стилів (не впливають на інші сторінки) | Done |

-----

## 📁 Структура Проєкту: Minesweeper на React

```
src/
├── components/
│   └── KasianovaKate
│       ├── photo/
│       │   ├── flag.png                                 # Іконка прапорця
│       │   └── image-Photoroom.png                        # Іконка міни
│       │
│       ├── Board.jsx                                      # Компонент ігрової дошки
│       ├── Board.module.css                               # Стилі дошки (CSS Module)
│       │
│       ├── Cell.jsx                                       # Компонент однієї клітинки
│       ├── Cell.module.css # Стилі клітинки (CSS Module)
│       │
│       ├── GameEndModal.jsx                               # Компонент модального вікна завершення гри
│       ├── GameEndModal.module.css                        # Стилі модального вікна
│       │
│       ├── index.jsx                                      # Експорт всіх компонентів з директорії
│       │
│       ├── MinesCounter.jsx                               # Лічильник мін/прапорців
│       ├── StatusMessage.jsx                              # Повідомлення про статус гри (Win/Loss)
│       ├── Timer.jsx                                      # Таймер гри
│       │
│       └── Minesweeper.jsx # ГОЛОВНИЙ КОНТЕЙНЕР/КОМПОНЕНТ ГРИ (Логіка, State)
│
├── pages/
│   └── Game/
│       └── index.jsx                                      # Сторінка "Play Game" 
│
├── App.jsx                                                #  Основний файл роутингу (додано Route на /kasianova-kate)
├── main.jsx                                               # Точка входу в застосунок
└── assets/                                                # Глобальні ресурси (якщо є)
```

-----

## Функціонал гри

- Поле: **9×9**, **10 мін** (початковий рівень)
- Лівий клік — відкрити клітинку
- Правий клік — поставити/зняти прапорець
- Автоматичне відкриття порожніх зон
- Таймер, лічильник мін
- Модальне вікно при перемозі/програші
- Кнопка "Нова гра"
- Адаптивний дизайн

---

## Технології

| Технологія | Використання |
|----------|-------------|
| **React 19** | Функціональні компоненти, хуки |
| **Vite** | Швидка розробка, HMR |
| **React Router** | Роутинг до `/kasianova-kate` |
| **CSS Modules** | Локальні стилі, ізоляція |
| **JavaScript (ES6+)** | Чисті функції, масиви, алгоритми |

---

## Запуск проєкту

### 1. Встановлення залежностей
npm install

### 2. Режим розробки
npm run dev

Відкрий: http://localhost:5173/kasianova-kate

### 3. Збірка для продакшну
npm run build

npm run preview

### Доступні скрипти

- npm run dev - Запуск розробки
- npm run build - Збірка продакшну
- npm run preview - Перегляд збірки
- npm run lint - Перевірка коду

### Як внести зміни (Contributing)

1. Створіть гілку:
git checkout -b lab5/Kasianova-Kate-react-saper
2. Зробіть зміни
3. Перевірте стиль: npm run lint
4. Зробіть коміт: git add .
git commit -m "lab5: повна реалізація Сапера"
5. Запуште: git push origin lab5/Kasianova-Kate-react-saper
6. Створіть Pull Request

### Скріншоти
<img width="1920" height="891" alt="image" src="https://github.com/user-attachments/assets/a6738c1c-ec02-4b88-b9a2-4e7a38d5b342" />

<img width="1766" height="865" alt="image" src="https://github.com/user-attachments/assets/bb7e26c9-1d75-4d32-bc4d-31ac35dccf9e" />

<img width="1226" height="783" alt="image" src="https://github.com/user-attachments/assets/6a1feb66-8eb6-479f-b4e4-199f4de23450" />

<img width="1160" height="892" alt="image" src="https://github.com/user-attachments/assets/ac5a582c-904b-4c06-867c-d02be7a8368e" />




