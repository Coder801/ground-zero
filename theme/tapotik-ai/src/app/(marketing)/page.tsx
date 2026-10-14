import { Hero } from "@/components/sections/hero";
import { TrustedCompanies } from "@/components/sections/trusted-companies";
import { FeaturesBento } from "@/components/sections/features-bento";
import { Products } from "@/components/sections/products";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WorkflowBuilder } from "@/components/sections/workflow-builder";
import { Integrations } from "@/components/sections/integrations";
import { DashboardPreview } from "@/components/sections/dashboard-preview";
import { ChatDemo } from "@/components/sections/chat-demo";
import { ImageGenerator } from "@/components/sections/image-generator";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustedCompanies />
            <FeaturesBento />
            <Products />
            <HowItWorks />
            <WorkflowBuilder />
            <Integrations />
            <DashboardPreview />
            <ChatDemo />
            <ImageGenerator />
            <Pricing />
            <Testimonials />
            <FAQ />
            <BlogPreview />
            <CTA />
        </>
    );
}
