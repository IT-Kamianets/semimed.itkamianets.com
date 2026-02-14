# SEMIMED — Центр реабілітації

Вебсайт центру реабілітації SEMIMED (м. Кам'янець-Подільський).

**Demo:** [semimed.itkamianets.com](https://semimed.itkamianets.com)

## Технології

- **HTML5** — статичні сторінки
- **Tailwind CSS 3.4** — утилітарний CSS-фреймворк з кастомним конфігом
- **JavaScript** — навігація, анімації, карусель відгуків, i18n, валідація форм
- **Google Fonts** — Plus Jakarta Sans + Inter

## Сторінки

| Файл | Опис |
|------|------|
| `index.html` | Головна — hero, послуги, про нас, відгуки, форма запису |
| `services.html` | Послуги — 10 методів лікування + 7 напрямків роботи |
| `about.html` | Про нас — місія та підхід |
| `contact.html` | Контакти — адреса, телефон, графік роботи, карта, форма |
| `404.html` | Сторінка помилки |

## Можливості

- Двомовність (UA / EN) з перемикачем
- Адаптивний дизайн (mobile-first)
- Sticky header з ефектом при скролі
- Анімації появи елементів (fade-in, scale-in)
- Карусель відгуків з навігацією
- Google Maps інтеграція
- SEO: meta-теги, Open Graph, JSON-LD (MedicalBusiness)
- GitHub Pages деплой

## Запуск локально

```bash
# Встановити залежності
npm install

# Режим розробки (watch + live-server)
npm run dev

# Білд CSS
npm run build
```

## Структура проекту

```
├── index.html          # Головна сторінка
├── services.html       # Послуги
├── about.html          # Про нас
├── contact.html        # Контакти
├── 404.html            # 404
├── src/
│   └── input.css       # Tailwind вхідний файл з компонентами
├── dist/
│   └── output.css      # Скомпільований CSS
├── js/
│   ├── main.js         # Головний скрипт
│   ├── navigation.js   # Header, mobile menu, scroll-spy
│   ├── animations.js   # Scroll animations, counters
│   ├── testimonials.js # Карусель відгуків
│   ├── form.js         # Валідація форм
│   ├── i18n.js         # Система перекладів
│   └── gallery.js      # Фільтрація галереї
├── lang/
│   ├── uk.json         # Українські переклади
│   └── en.json         # Англійські переклади
├── images/
│   └── logo/           # Логотип
├── tailwind.config.js  # Конфіг Tailwind
└── package.json
```

## Ліцензія

Ліцензія МОЗ України № 904 від 30.05.2025 «Про ліцензування медичної практики»
