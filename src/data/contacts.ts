export interface Contacts {
    /** Номер у міжнародному форматі без пробілів — для `tel:` і JSON-LD. */
    phone: string;
    /** Номер для показу на сторінці. */
    phoneDisplay: string;
    /** Telegram username без `@`. */
    telegram: string;
    /** Куди приходять заявки з форми. */
    email: string;
}

export interface ContactLink {
    kind: "phone" | "telegram";
    label: string;
    href: string;
    display: string;
    /** Що потрапляє в буфер при копіюванні. */
    copy: string;
}

export const contacts: Contacts = {
    phone: "+380636126197",
    phoneDisplay: "+380 63 612 61 97",
    telegram: "dmytroonishchenko",
    email: "donischenko801@gmail.com",
};

export const contactLinks: ContactLink[] = [
    {
        kind: "phone",
        label: "Телефон / Viber",
        href: `tel:${contacts.phone}`,
        display: contacts.phoneDisplay,
        copy: contacts.phone,
    },
    {
        kind: "telegram",
        label: "Telegram",
        href: `https://t.me/${contacts.telegram}`,
        display: `@${contacts.telegram}`,
        copy: `@${contacts.telegram}`,
    },
];

/**
 * Форма надсилає заявку через FormSubmit (https://formsubmit.co) — сайт статичний,
 * власного сервера немає. Після першої заявки FormSubmit надішле на `contacts.email`
 * лист з підтвердженням; без нього заявки не доходять. Див. README.
 */
export const contactForm = {
    endpoint: `https://formsubmit.co/ajax/${contacts.email}`,
    subject: "Заявка з сайту",
    intro: "Або залиште повідомлення — передзвоню чи напишу.",
    fields: {
        name: "Ім’я",
        contact: "Телефон або Telegram",
        message: "Що потрібно зробити",
    },
    placeholders: {
        contact: "+380… або @username",
        message: "Наприклад: зібрати щит у двокімнатній квартирі під ремонт",
    },
    submit: "Надіслати",
    sending: "Надсилаю…",
    success: "Дякую! Повідомлення надіслано — відповім найближчим часом.",
    error: "Не вдалося надіслати. Зателефонуйте або напишіть у Telegram.",
};
