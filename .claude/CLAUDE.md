# Лендинг электрика — Дмитро Онищенко, Київ

Одностраничный лендинг-портфолио частного электрика. Собран на основе купленной темы
(оригинал лежит в `theme/`, не трогать). Контент сайта — на украинском, общение
с владельцем — на русском, комментарии в коде — на английском.

## Стек

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict (`allowJs: false`)
- Tailwind CSS v4 (`@tailwindcss/postcss`, без tailwind.config — токены в `src/app/globals.css`)
- shadcn/ui `new-york` поверх `@base-ui/react` (`ui/button`, `badge`, `card`, `input`, `textarea`, `label`)
- next-themes (светлая/тёмная, по умолчанию — системная), lucide-react
- **Статический экспорт**: `output: "export"`, `images.unoptimized: true` → результат в `out/`
- Хостинг: Cloudflare Pages (build `npm run build`, output `out`, `NODE_VERSION=22`)

## Команды

```bash
npm run dev         # http://localhost:4000
npm run build       # статический сайт в out/
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run format      # prettier --write .
```

Критерий готовности любой правки: typecheck, lint и build — **без ошибок и предупреждений**,
Prettier применён.

## Структура

```
src/app/            layout.tsx (шрифты, metadata, OG), page.tsx (порядок секций),
                    globals.css (токены), sitemap.ts, robots.ts, icon.svg, apple-icon.png
src/components/
  sections/         hero, services, works, process, personal, contacts
  site/             header, footer, section (обёртка с якорем), section-heading
  ui/               примитивы из темы
  contact-button    клиентский: ссылка-контакт + иконка «Копіювати» (выезжает при hover)
  contact-form      клиентский: форма заявки → FormSubmit
  show-more         клиентский: «Показати ще» для работ на мобильном
  theme-toggle      клиентский
  json-ld           schema.org Electrician
src/data/           ВЕСЬ контент: site.ts, services.ts, works.ts, contacts.ts
public/             works/ (фото работ), og.png, _headers (кэш для Cloudflare)
docs/               самостоятельные HTML-страницы (в git); elektryk-plan.html → /3-month-plan
scripts/sync-docs.mjs  копирует страницы из docs/ в public/ (predev/prebuild)
theme/              оригинал купленной темы, только для справки
```

## Правила

- **Контент только в `src/data/*`.** В JSX тексты не хардкодить. Интерфейсы `Service`
  и `Work` заданы ТЗ — менять осторожно (`tag` и `online` в услугах на сайте сейчас
  не выводятся, но остаются в данных).
- **Одна страница `/`**, секции подряд: hero → `#services` → `#works` → `#process` →
  «Працюю особисто» → `#contacts` → footer. Навигация — якоря; секции оборачивать
  в `Section` (даёт `scroll-margin-top` под sticky-шапку через `--header-height`).
- **Серверные компоненты по умолчанию.** Клиентские только: `theme-toggle`,
  `contact-button`, `contact-form`, `show-more`. Функции/иконки-компоненты через
  границу server→client не передавать (передавать ключ и маппить внутри).
- **Без серверных фич**: никаких API routes, middleware, ISR, `next/image`-оптимизатора.
  `sitemap.ts`/`robots.ts` — с `export const dynamic = "force-static"`.
- **Не возвращать** framer-motion, lenis, sonner, recharts и прочие удалённые
  зависимости темы: это бьёт по Lighthouse. Анимации — CSS-переходы.
- Каруселей, табов, модалок нет (решение владельца). Исключение — «Показати ще» в работах
  на мобильном.

## Дизайн

- Акцент — синий «нулевой проводник»: `--primary` `#2457a4` (светлая) / `#6d9be0` (тёмная).
  В тёмной теме текст на синем — тёмный (`--primary-foreground: #050816`), белый не проходит AA.
  `secondary`/`accent` — оттенки того же синего; розовый из темы удалён.
- Шрифты: Roboto (всё) и Roboto Mono (номера шагов, «Арк. N»), `subsets: ["latin", "cyrillic"]`.
  Подключены в `layout.tsx` → CSS-переменные `--font-roboto`/`--font-roboto-mono` →
  `--font-sans`/`--font-heading`/`--font-mono` в `globals.css`.
- Работы: фото 4:3, подпись-штамп «назва / опис / Арк. N» (номер = индекс в массиве).
  Без `image` — заглушка «Фото буде тут».
- Hero на мобильном: метка-спецификация столбиком с линиями, бейджи столбиком
  одинаковой ширины; с `md` — всё в одну строку.
- Обязательно: mobile-first без горизонтального скролла на 360px, видимый focus,
  контраст AA (проверять расчётом, не на глаз), `prefers-reduced-motion` (глобальное
  правило в `globals.css`).

## Нюансы и грабли

- **Tailwind v4 сканирует весь проект.** `theme/` исключена через
  `@source not "../../theme"` в `globals.css` — без этого CSS раздувается с ~42 до 154 КБ
  и Lighthouse Performance падает до ~76. Gitignored-пути (`docs/`) Tailwind пропускает сам.
- `theme/` и `docs/` исключены из `tsconfig`, ESLint (`globalIgnores`), `.prettierignore`
  и Tailwind (`@source not`).
- **Страницы из `docs/`.** `docs/elektryk-plan.html` — внутренний план владельца (рус.),
  отдельный HTML со своими стилями, не часть лендинга. `scripts/sync-docs.mjs` перед
  `dev`/`build` копирует его в `public/3-month-plan.html` (копия в `.gitignore`, правится
  только исходник в `docs/`). Cloudflare Pages отдаёт его по `/3-month-plan`; в `next dev`
  он доступен только как `/3-month-plan.html`. Страница с `noindex`, в sitemap не входит,
  ссылки на неё с лендинга нет. Новая страница — добавить пару в `pages` в скрипте.
- **Форма** шлёт JSON на `https://formsubmit.co/ajax/<email>` (`contactForm.endpoint`
  в `contacts.ts`). Первая заявка присылает владельцу письмо активации — без неё заявки
  не доходят. Не отправлять реальные тестовые заявки без согласия владельца
  (проверять с подменой ответа через DevTools Protocol `Fetch.enable`).
- `site.url` в `src/data/site.ts` — пока `https://example.com`; от него строятся canonical,
  sitemap, OG и JSON-LD. Заменить на продакшн-домен перед деплоем.
- `public/og.png` отрисован вручную (HTML + Roboto → скриншот Chrome 1200×630).
  На нём ещё теги QF — при правке пересоздать тем же способом.
- `npm audit` показывает уязвимости, унаследованные из lock-файла темы; осознанно
  не обновлялось.

## Проверка в браузере

- Сервер для `out/`: `python3 -m http.server 4173 -d out` (для скриншотов) или
  `npx serve@14 out` (**с gzip — только так мерить Lighthouse**, python-сервер не сжимает
  и занижает Performance).
- Lighthouse (мобильный по умолчанию): `CHROME_PATH=".../Google Chrome" npx -y lighthouse@12 <url>`.
  Текущий уровень: 96 / 100 / 100 / 100, LCP ~2.7 с (упирается в рантайм Next/React).
- Headless Chrome через `--window-size` не рендерит уже ~500px — для мобильных
  скриншотов использовать DevTools Protocol `Emulation.setDeviceMetricsOverride`
  (`mobile: true`, для touch — `hover: none` через `setEmulatedMedia`).
- После `scrollIntoView` ждать: в `html` включён `scroll-behavior: smooth`.
