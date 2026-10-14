export interface NavLink {
    title: string;
    href: `#${string}`;
}

export interface HeroBadge {
    label: string;
    highlighted?: boolean;
}

export interface ProcessStep {
    title: string;
    text: string;
}

export const site = {
    name: "Дмитро Онищенко",
    role: "електрик",
    city: "Київ",
    serviceArea: "Працюю в Києві та області",
    serviceAreaShort: "Київ та область",
    // TODO: замінити на продакшн-домен.
    url: "https://example.com",
    ogImage: "/og.png",
    title: "Електрик у Києві — щити, інвертори, проводка | Дмитро Онищенко",
    description:
        "Електромонтаж у Києві та області: збірка щитів, підключення гібридних інверторів, проводка під ремонт, креслення. Працюю особисто, зі схемою до і після робіт.",
};

export const nav: NavLink[] = [
    { title: "Послуги", href: "#services" },
    { title: "Роботи", href: "#works" },
    { title: "Як працюю", href: "#process" },
    { title: "Контакти", href: "#contacts" },
];

export const hero = {
    eyebrow: ["Електромонтаж", "щити", "резервне живлення", "креслення"],
    title: "Електрика за схемою",
    text: "Збираю щити, підключаю інвертори, роблю проводку під ремонт. Перед роботою — схема, після роботи — схема, фото всіх штроб і маркування кожного автомата.",
    badges: [
        { label: "Маю наявне бронювання", highlighted: true },
        { label: "Працюю особисто" },
        { label: "Свій інструмент" },
        { label: "Матеріали зі знижкою" },
    ] satisfies HeroBadge[],
};

export const sections = {
    services: "Послуги",
    works: "Приклади робіт",
    process: "Як працюю",
    contacts: "Зв’язатися зі мною",
};

/** На мобільному (до md) показуємо перші роботи, решту — за кнопкою. */
export const worksMore = {
    visibleOnMobile: 4,
    show: "Показати ще",
    hide: "Згорнути",
};

export const process: ProcessStep[] = [
    {
        title: "Замір і схема",
        text: "Узгоджуємо точки та групи, креслю схему. Замір безкоштовний при замовленні.",
    },
    {
        title: "Кошторис письмово",
        text: "Перелік робіт і матеріалів з цінами до початку монтажу.",
    },
    {
        title: "Монтаж",
        text: "Фото кожної стіни зі штробами до штукатурки.",
    },
    {
        title: "Здача",
        text: "Перевірка УЗО та ізоляції; схема, фото й маркування автоматів одним файлом.",
    },
];

export const personal = {
    title: "Працюю особисто — від заміру до здачі.",
    text: "Одна людина відповідає за схему, монтаж і результат. Електрика під ключ: від проєкту щита до перевірки та документації.",
};
