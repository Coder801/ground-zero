import type { Metadata } from "next";
import {
    CameraIcon,
    ClapperboardIcon,
    FilmIcon,
    GaugeIcon,
    GraduationCapIcon,
    LayoutTemplateIcon,
    MegaphoneIcon,
    PencilLineIcon,
    RocketIcon,
    ScissorsIcon,
    SlidersHorizontalIcon,
    StoreIcon,
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
import { VideoHeroDemo } from "./_components/video-hero-demo";

const product = products.find((p) => p.href === "/ai-video")!;

export const metadata: Metadata = {
    title: product.name,
    description: product.description,
};

const featureItems = [
    {
        title: "Text to video",
        description:
            "Scripts and storyboards become cinematic clips — coherent motion, consistent characters, no uncanny frames.",
        icon: FilmIcon,
    },
    {
        title: "Camera control",
        description:
            "Dolly, orbit, crane and handheld presets — or keyframe your own path for exact, repeatable moves.",
        icon: CameraIcon,
    },
    {
        title: "60fps output",
        description:
            "Frame interpolation renders buttery 60fps at up to 4K, ready for broadcast and paid placements.",
        icon: GaugeIcon,
    },
    {
        title: "Scene stitching",
        description:
            "Chain scenes with matched lighting and continuity. One storyboard in, one seamless cut out.",
        icon: ClapperboardIcon,
    },
    {
        title: "Storyboard editor",
        description:
            "Per-scene prompts, durations and transitions on a visual timeline your whole team can edit.",
        icon: LayoutTemplateIcon,
    },
    {
        title: "Smart trims",
        description:
            "Auto-cut for 6s, 15s and 30s deliverables with reframing for vertical, square and widescreen.",
        icon: ScissorsIcon,
    },
];

const steps = [
    {
        title: "Write the storyboard",
        description:
            "Describe each scene in plain language — or paste a script and let Tapotik split it into shots.",
        icon: PencilLineIcon,
    },
    {
        title: "Direct the motion",
        description:
            "Choose camera presets, pacing and style per scene. Preview drafts in seconds before final render.",
        icon: SlidersHorizontalIcon,
    },
    {
        title: "Render & publish",
        description:
            "Export 60fps in every ratio at once and push straight to your channels or editor.",
        icon: RocketIcon,
    },
];

const useCases = [
    {
        title: "Product launches",
        description:
            "Teaser films and feature reveals with cinematic camera moves — no crew, no render farm.",
        icon: RocketIcon,
    },
    {
        title: "Ad creative",
        description:
            "Test ten hooks in an afternoon. Every cut auto-resized for Reels, Shorts and CTV.",
        icon: MegaphoneIcon,
    },
    {
        title: "Course & training",
        description:
            "Turn documentation into narrated walkthrough videos your team actually watches.",
        icon: GraduationCapIcon,
    },
    {
        title: "E-commerce",
        description:
            "Product spins and lifestyle b-roll for every SKU, generated from your catalog images.",
        icon: StoreIcon,
    },
];

const faqItems = [
    {
        question: "How long can generated videos be?",
        answer: "Single scenes render up to 20 seconds; with scene stitching you can chain storyboards into clips of several minutes while keeping lighting and character continuity. Longer formats work best as stitched scenes with per-scene prompts.",
    },
    {
        question: "What resolutions and frame rates are supported?",
        answer: "Drafts render at 720p for fast iteration. Final renders go up to 4K, and 60fps frame interpolation is included on all Pro renders — along with vertical, square and widescreen exports from the same timeline.",
    },
    {
        question: "Can I control the camera precisely?",
        answer: "Yes. Use the built-in presets (dolly, orbit, crane, handheld) or keyframe position, rotation and focal length per scene. Camera paths are saved with the storyboard, so re-renders reproduce the exact same move.",
    },
    {
        question: "Do I own the videos I generate?",
        answer: "On paid plans, yes — full commercial rights for ads, social, broadcast and client work. Renders are also watermark-free on every paid tier.",
    },
];

export default function AIVideoPage() {
    return (
        <>
            <ProductHero
                badge={product.name}
                icon={product.icon}
                gradient={product.gradient}
                layout="stacked"
                title={
                    <>
                        Cinematic video,{" "}
                        <span className="text-gradient-pink">
                            typed not filmed
                        </span>
                    </>
                }
                description={product.description}
                highlights={product.features}
                demo={<VideoHeroDemo />}
            />

            <ProductFeatureGrid
                title={
                    <>
                        A film crew in{" "}
                        <span className="text-gradient-pink">a text box</span>
                    </>
                }
                description="Direction, cinematography and post — every department, one prompt."
                items={featureItems}
                gradient={product.gradient}
            />

            <HowItWorks
                title={
                    <>
                        Script to screen in{" "}
                        <span className="text-gradient">three steps</span>
                    </>
                }
                steps={steps}
                gradient={product.gradient}
            />

            <UseCases
                title={
                    <>
                        Video for teams{" "}
                        <span className="text-gradient-pink">
                            without a studio
                        </span>
                    </>
                }
                description="Wherever motion sells the story, AI Video gets you there before the brief goes stale."
                items={useCases}
            />

            <PricingBanner productName={product.name} />

            <ProductFAQ
                description="Length, resolution, rights — the practical stuff, answered."
                items={faqItems}
            />

            <CTA />
        </>
    );
}
