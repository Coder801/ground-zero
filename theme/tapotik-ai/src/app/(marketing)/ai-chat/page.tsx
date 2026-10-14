import type { Metadata } from "next";
import {
    BrainIcon,
    FileTextIcon,
    GlobeIcon,
    HeadphonesIcon,
    LayersIcon,
    LightbulbIcon,
    PenLineIcon,
    PlugIcon,
    RocketIcon,
    SearchIcon,
    UsersIcon,
    DatabaseIcon,
} from "lucide-react";

import {
    HowItWorks,
    ProductFAQ,
    ProductFeatureGrid,
    ProductHero,
    UseCases,
} from "@/components/pages/product-sections";
import { Pricing } from "@/components/sections/pricing";
import { CTA } from "@/components/sections/cta";
import { products } from "@/lib/data";
import { ChatHeroDemo } from "./_components/chat-hero-demo";

const product = products.find((p) => p.href === "/ai-chat")!;

export const metadata: Metadata = {
    title: product.name,
    description: product.description,
};

const featureItems = [
    {
        title: "GPT & Claude models",
        description:
            "Every frontier model behind one thread — swap mid-conversation or let smart routing decide per message.",
        icon: LayersIcon,
    },
    {
        title: "Persistent memory",
        description:
            "Projects, preferences and decisions carry across sessions. Your assistant on Monday remembers Friday.",
        icon: BrainIcon,
    },
    {
        title: "File analysis",
        description:
            "Drop in PDFs, spreadsheets and codebases up to 200MB. Ask questions, extract tables, compare versions.",
        icon: FileTextIcon,
    },
    {
        title: "Web browsing",
        description:
            "Live answers with cited sources — the assistant browses, cross-checks and links every claim.",
        icon: GlobeIcon,
    },
    {
        title: "Tool calling",
        description:
            "Connect calendars, CRMs and 6,000+ apps so answers become actions: book it, file it, send it.",
        icon: PlugIcon,
    },
    {
        title: "Shared team threads",
        description:
            "Hand a conversation to a teammate with full context, or pin threads to projects for the whole workspace.",
        icon: UsersIcon,
    },
];

const steps = [
    {
        title: "Connect your context",
        description:
            "Link your docs, drives and tools once. Every conversation starts already knowing your business.",
        icon: PlugIcon,
    },
    {
        title: "Ask in plain language",
        description:
            "Smart routing picks the best model per message — quality when it matters, speed when it doesn't.",
        icon: LightbulbIcon,
    },
    {
        title: "Ship the output",
        description:
            "Turn answers into drafts, tickets and scheduled actions without leaving the thread.",
        icon: RocketIcon,
    },
];

const useCases = [
    {
        title: "Customer support",
        description:
            "Resolve tickets with answers grounded in your help center, order data and past conversations.",
        icon: HeadphonesIcon,
    },
    {
        title: "Research & analysis",
        description:
            "Summarize hundred-page reports, compare sources and surface what changed since last quarter.",
        icon: SearchIcon,
    },
    {
        title: "Writing & editing",
        description:
            "Drafts that sound like you — briefs, posts and emails in your team's voice and terminology.",
        icon: PenLineIcon,
    },
    {
        title: "Data Q&A",
        description:
            "Ask questions of CSVs, dashboards and warehouses in English and get charts, not query errors.",
        icon: DatabaseIcon,
    },
];

const faqItems = [
    {
        question: "Which models can I use in AI Chat?",
        answer: "All of them — our fine-tuned in-house family plus frontier models from OpenAI, Anthropic and Google. You can pick a model per thread, or enable smart routing and let Tapotik choose the best model for each message based on quality, latency and cost.",
    },
    {
        question: "How does persistent memory work?",
        answer: "Memory stores facts you approve — project names, preferences, recurring decisions — in your workspace, encrypted at rest. You can review, edit or wipe memories at any time, and admins can disable memory entirely for compliance-sensitive teams.",
    },
    {
        question: "Can the assistant access the live web?",
        answer: "Yes. With browsing enabled, AI Chat searches, reads and cross-checks sources in real time, and every claim in the answer links back to where it came from. Browsing can be toggled per thread or disabled workspace-wide.",
    },
    {
        question: "Is my conversation data used for training?",
        answer: "Never. Prompts, files and outputs are excluded from training on every plan. Enterprise workspaces can additionally enable zero-retention mode, where nothing is persisted after the response is delivered.",
    },
];

export default function AIChatPage() {
    return (
        <>
            <ProductHero
                badge={product.name}
                icon={product.icon}
                gradient={product.gradient}
                layout="split"
                title={
                    <>
                        An assistant that{" "}
                        <span className="text-gradient">
                            does the work, not just the talking
                        </span>
                    </>
                }
                description={product.description}
                highlights={product.features}
                demo={<ChatHeroDemo />}
            />

            <ProductFeatureGrid
                title={
                    <>
                        Built for conversations{" "}
                        <span className="text-gradient">with consequences</span>
                    </>
                }
                description="Everything your team needs to turn chat from a toy into the fastest tool in the stack."
                items={featureItems}
                gradient={product.gradient}
            />

            <HowItWorks
                title={
                    <>
                        From question to done in{" "}
                        <span className="text-gradient">three steps</span>
                    </>
                }
                steps={steps}
                gradient={product.gradient}
            />

            <UseCases
                title={
                    <>
                        One assistant,{" "}
                        <span className="text-gradient">every team</span>
                    </>
                }
                description="The same thread that answers support tickets writes your launch brief."
                items={useCases}
            />

            <Pricing />

            <ProductFAQ
                description="The questions teams ask before making AI Chat their default tab."
                items={faqItems}
            />

            <CTA />
        </>
    );
}
