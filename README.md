# Дмитро Онищенко — електрик, Київ

Односторінковий лендинг-портфоліо. Next.js 16 (App Router, статичний експорт),
TypeScript strict, Tailwind CSS v4. Сервера немає: збирається в статичні файли
й хоститься на Cloudflare Pages.

## Запуск

Потрібен Node.js ≥ 20.9 (див. `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4000
npm run build      # статичний сайт у out/
npx serve out      # переглянути зібраний сайт локально
```

Перевірки перед комітом:

```bash
npm run typecheck
npm run lint
npm run format     # Prettier
```

## Де що лежить

```
src/
├── app/
│   ├── layout.tsx       # шрифти (Roboto), metadata, Open Graph
│   ├── page.tsx         # порядок секцій на сторінці
│   ├── globals.css      # токени кольорів (світла/темна тема), утиліти
│   ├── sitemap.ts robots.ts icon.svg apple-icon.png
├── components/
│   ├── sections/        # hero, services, works, process, personal, contacts
│   ├── site/            # шапка, футер, обгортка секції, заголовок секції
│   ├── ui/              # button, badge, card, input, textarea, label
│   ├── contact-button.tsx # кнопка контакту з іконкою «Копіювати» (клієнтський)
│   ├── contact-form.tsx   # форма заявки → email через FormSubmit (клієнтський)
│   └── json-ld.tsx      # schema.org Electrician
└── data/                # ВЕСЬ контент сторінки
    ├── site.ts          # ім'я, домен, SEO-тексти, hero, кроки «Як працюю»
    ├── services.ts      # послуги QF1…QF5
    ├── works.ts         # приклади робіт
    └── contacts.ts      # телефон, Telegram, email для заявок, тексти форми
public/
├── works/               # фото робіт
├── og.png               # картинка для соцмереж 1200×630
└── _headers             # кешування статики на Cloudflare Pages
```

Тексти змінюються лише в `src/data/` — у розмітці контенту немає.

## Перед першим деплоєм

1. `src/data/site.ts` → `url`: продакшн-домен (з нього будуються canonical, sitemap, Open Graph, JSON-LD).
2. Активуйте форму заявок — див. нижче.

## Форма заявок

Сайт статичний, тому заявки надсилає сервіс [FormSubmit](https://formsubmit.co)
(безкоштовно, без реєстрації) на `contacts.email` з `src/data/contacts.ts`.

1. Після деплою надішліть із сайту тестову заявку.
2. На пошту прийде лист від FormSubmit «Action Required: Activate Form» — натисніть **Activate Form**.
   До активації заявки не доставляються.
3. Рекомендовано: у тому ж листі FormSubmit дає «випадковий» рядок замість адреси.
   Підставте його в `contactForm.endpoint` замість `${contacts.email}` — тоді email
   не світиться в коді сторінки і менше спаму.

Від ботів стоїть приховане поле-пастка (`_honey`). Якщо спаму стане багато,
можна ввімкнути капчу: `_captcha: "true"` у `src/components/contact-form.tsx`.

## Як додати роботу

1. Підготуйте фото у пропорції **4:3**, бажано 1600×1200, у **WebP** (до ~200 КБ).
   Наприклад: `cwebp -q 80 -resize 1600 1200 photo.jpg -o public/works/shchyt-6.webp`
   або через [squoosh.app](https://squoosh.app).
   Сайт віддає файл як є (статичний експорт без оптимізатора зображень), тож стискайте заздалегідь.
2. Покладіть файл у `public/works/`.
3. Додайте запис у `src/data/works.ts`:

```ts
{
    id: "shchyt-6",                       // унікальний
    title: "Електрощит",                  // назва в штампі
    caption: "Щит на 36 модулів, 2 УЗО", // опис у штампі
    image: "/works/shchyt-6.webp",
    alt: "Зібраний щит на 36 модулів з підписаними автоматами",
},
```

Номер аркуша («Арк. N») рахується автоматично за порядком у масиві. Щоб замінити
заглушку «Фото буде тут» на фото, достатньо додати `image` до наявного запису.

## Деплой на Cloudflare Pages

1. Запуште репозиторій на GitHub/GitLab.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**, оберіть репозиторій.
3. Налаштування збірки:
    - **Framework preset:** `Next.js (Static HTML Export)`
    - **Build command:** `npm run build`
    - **Build output directory:** `out`
    - **Environment variables:** `NODE_VERSION` = `22`
4. **Save and Deploy.** Далі кожен push у основну гілку деплоїться автоматично,
   pull request-и отримують preview-адреси.
5. Власний домен: **Custom domains → Set up a custom domain**. Не забудьте вказати його в `site.url`.

Без Git: `npm run build && npx wrangler pages deploy out --project-name=<назва>`.

## Оригінал теми

Папка `theme/` — куплена тема в незмінному вигляді, лише для довідки. Вона виключена
з TypeScript, ESLint, Prettier і Tailwind і в збірку не потрапляє. Її можна прибрати з
репозиторію, на сайт це не вплине.
