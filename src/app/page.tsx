import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Works } from "@/components/sections/works";
import { Process } from "@/components/sections/process";
import { Personal } from "@/components/sections/personal";
import { Contacts } from "@/components/sections/contacts";
import { JsonLd } from "@/components/json-ld";

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <Hero />
                <Services />
                <Works />
                <Process />
                <Personal />
                <Contacts />
            </main>
            <Footer />
            <JsonLd />
        </>
    );
}
