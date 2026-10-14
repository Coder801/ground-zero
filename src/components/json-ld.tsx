import { contacts } from "@/data/contacts";
import { services } from "@/data/services";
import { site } from "@/data/site";

const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: `${site.name} — ${site.role}, ${site.city}`,
    description: site.description,
    url: site.url,
    image: new URL(site.ogImage, site.url).href,
    telephone: contacts.phone,
    areaServed: [
        { "@type": "City", name: "Kyiv" },
        { "@type": "AdministrativeArea", name: "Kyiv Oblast" },
    ],
    address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "UA",
    },
    knowsAbout: services.map((service) => service.title),
};

export function JsonLd() {
    return (
        <script
            type="application/ld+json"
            // Static data from our own files; `<` escaped so it can't close the tag.
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
