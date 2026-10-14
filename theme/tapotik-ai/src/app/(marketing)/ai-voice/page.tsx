import type { Metadata } from "next";
import {
    AudioLinesIcon,
    BookOpenIcon,
    CopyIcon,
    GamepadIcon,
    GlobeIcon,
    HeadsetIcon,
    LanguagesIcon,
    MicIcon,
    RadioIcon,
    SlidersHorizontalIcon,
    SmileIcon,
} from "lucide-react";

import {
    HowItWorks,
    PricingBanner,
    ProductFAQ,
    ProductFeatureGrid,
    ProductHero,
    UseCases,
} from "@/components/pages/product-sections";
import { CTA } from "@/components/sections/cta";
import { products } from "@/lib/data";
import { VoiceHeroDemo } from "./_components/voice-hero-demo";

const product = products.find((p) => p.href === "/ai-voice")!;

export const metadata: Metadata = {
    title: product.name,
    description: product.description,
};

const featureItems = [
    {
        title: "Voice cloning",
        description:
            "Clone any consented voice from 60 seconds of audio — pacing, timbre and quirks intact.",
        icon: CopyIcon,
    },
    {
        title: "40+ languages",
        description:
            "One voice, forty tongues. Keep the same speaker identity across every market you localize for.",
        icon: LanguagesIcon,
    },
    {
        title: "Emotion control",
        description:
            "Dial warmth, energy and gravity per sentence with SSML-style tags or the visual director.",
        icon: SmileIcon,
    },
    {
        title: "Studio quality",
        description:
            "48kHz output with breath control and de-essing baked in. No post-processing required.",
        icon: MicIcon,
    },
    {
        title: "Realtime streaming",
        description:
            "Sub-200ms time-to-first-audio over WebSocket — fast enough for live agents and IVR.",
        icon: RadioIcon,
    },
    {
        title: "Pronunciation control",
        description:
            "Lexicons for product names, people and jargon, applied consistently across every render.",
        icon: AudioLinesIcon,
    },
];

const steps = [
    {
        title: "Pick or clone a voice",
        description:
            "Choose from 120 studio voices or clone your own from a minute of clean audio.",
        icon: MicIcon,
    },
    {
        title: "Direct the delivery",
        description:
            "Set emotion, pacing and pronunciation per line. Preview instantly, tweak like a director.",
        icon: SlidersHorizontalIcon,
    },
    {
        title: "Stream anywhere",
        description:
            "Render to file or stream over WebSocket into your app, IVR or game engine.",
        icon: RadioIcon,
    },
];

const useCases = [
    {
        title: "Audiobooks & narration",
        description:
            "Narrate a full manuscript overnight in a voice that never loses energy at chapter twelve.",
        icon: BookOpenIcon,
    },
    {
        title: "Product localization",
        description:
            "Ship your walkthroughs and courses in 40 languages with the same brand voice.",
        icon: GlobeIcon,
    },
    {
        title: "Voice assistants & IVR",
        description:
            "Replace robot menus with a voice customers don't hang up on — streamed in real time.",
        icon: HeadsetIcon,
    },
    {
        title: "Games & characters",
        description:
            "Give every NPC a distinct voice and re-render dialogue as the script evolves.",
        icon: GamepadIcon,
    },
];

const faqItems = [
    {
        question: "How does voice cloning consent work?",
        answer: "Every clone requires a recorded consent statement from the speaker, verified before the voice becomes usable. Cloned voices live in your workspace only, and the speaker can revoke consent — which disables the voice — at any time.",
    },
    {
        question: "Which languages are supported?",
        answer: "Text-to-speech works in 40+ languages including English, Spanish, French, German, Japanese, Portuguese, Hindi, Mandarin, Korean and Arabic. Cloned voices speak all supported languages while keeping the original speaker's identity.",
    },
    {
        question: "How fast is realtime streaming?",
        answer: "Time-to-first-audio averages under 200ms over our WebSocket API, with word-level timestamps included. That's fast enough for live conversational agents, IVR systems and in-game dialogue.",
    },
    {
        question: "Can I use generated audio commercially?",
        answer: "Yes — paid plans include full commercial rights for ads, audiobooks, products and client work. For cloned voices, commercial use additionally requires the speaker's consent tier to permit it.",
    },
];

export default function AIVoicePage() {
    return (
        <>
            <ProductHero
                badge={product.name}
                icon={product.icon}
                gradient={product.gradient}
                layout="split"
                title={
                    <>
                        Speech that{" "}
                        <span className="text-gradient">feels human</span>
                    </>
                }
                description={product.description}
                highlights={product.features}
                demo={<VoiceHeroDemo />}
            />

            <ProductFeatureGrid
                title={
                    <>
                        A recording studio{" "}
                        <span className="text-gradient">without the booth</span>
                    </>
                }
                description="Everything between a script and a finished voice track, automated."
                items={featureItems}
                gradient={product.gradient}
            />

            <HowItWorks
                title={
                    <>
                        Script to soundtrack in{" "}
                        <span className="text-gradient">three steps</span>
                    </>
                }
                steps={steps}
                gradient={product.gradient}
            />

            <UseCases
                title={
                    <>
                        Wherever your product{" "}
                        <span className="text-gradient">speaks</span>
                    </>
                }
                description="From narration to real-time conversation, one voice engine covers it."
                items={useCases}
            />

            <PricingBanner
                productName={product.name}
                bullets={[
                    "120 studio voices included",
                    "Cloning on Pro and above",
                    "Streaming API on every plan",
                ]}
            />

            <ProductFAQ
                description="Consent, languages and latency — the questions voice teams ask first."
                items={faqItems}
            />

            <CTA />
        </>
    );
}
