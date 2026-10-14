import {
    BatteryChargingIcon,
    CableIcon,
    CircuitBoardIcon,
    HeadsetIcon,
    PencilRulerIcon,
    PlugZapIcon,
    type LucideIcon,
} from "lucide-react";

import { services, type ServiceIcon } from "@/data/services";
import { sections } from "@/data/site";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

const icons: Record<ServiceIcon, LucideIcon> = {
    panel: CircuitBoardIcon,
    battery: BatteryChargingIcon,
    cable: CableIcon,
    consult: HeadsetIcon,
    drawing: PencilRulerIcon,
    appliance: PlugZapIcon,
};

export function Services() {
    return (
        <Section id="services">
            <SectionHeading title={sections.services} />
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                    const Icon = icons[service.icon];
                    return (
                        <li
                            key={service.tag}
                            className="group flex flex-col rounded-2xl border bg-card p-6 transition-colors duration-300 hover:border-primary/30 sm:p-7"
                        >
                            <div
                                aria-hidden
                                className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary to-secondary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow-primary)]"
                            >
                                <Icon className="size-6 transition-transform duration-300 ease-out group-hover:scale-110" />
                            </div>
                            <h3 className="mt-5 font-heading text-lg font-semibold">
                                {service.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {service.text}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
}
