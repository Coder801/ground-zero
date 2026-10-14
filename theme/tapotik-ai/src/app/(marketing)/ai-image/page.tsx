import type { Metadata } from "next";
import {
    ExpandIcon,
    ImageIcon,
    LayersIcon,
    MegaphoneIcon,
    PackageIcon,
    PaintbrushIcon,
    PaletteIcon,
    PencilRulerIcon,
    Share2Icon,
    SlidersHorizontalIcon,
    SparklesIcon,
    WandSparklesIcon,
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
import { ImageHeroDemo } from "./_components/image-hero-demo";

const product = products.find((p) => p.href === "/ai-image")!;

export const metadata: Metadata = {
    title: product.name,
    description: product.description,
};

const featureItems = [
    {
        title: "Text to image",
        description:
            "Production-grade renders from a sentence. Our pixel-v3 model understands composition, lighting and brand tone.",
        icon: WandSparklesIcon,
    },
    {
        title: "Style presets",
        description:
            "Photoreal, 3D glass, anime, isometric and 40 more — or distill your own preset from reference images.",
        icon: PaletteIcon,
    },
    {
        title: "4K upscaling",
        description:
            "One-click upscale to 4096px with detail synthesis that survives print, not just Instagram.",
        icon: ExpandIcon,
    },
    {
        title: "Batch mode",
        description:
            "Generate hundreds of on-brief variations from a CSV of prompts — perfect for ad-set matrices.",
        icon: LayersIcon,
    },
    {
        title: "Inpaint & outpaint",
        description:
            "Select a region and rewrite it, or extend the canvas in any direction without visible seams.",
        icon: PaintbrushIcon,
    },
    {
        title: "Brand kits",
        description:
            "Lock palettes, logo placement and negative prompts per workspace so every output ships on-brand.",
        icon: PencilRulerIcon,
    },
];

const steps = [
    {
        title: "Describe the shot",
        description:
            "Type a prompt or paste a reference. Prompt enhancement expands it with lighting and lens detail.",
        icon: WandSparklesIcon,
    },
    {
        title: "Direct the style",
        description:
            "Pick presets, aspect ratios and brand kits. Generate four candidates per run and iterate on the best.",
        icon: SlidersHorizontalIcon,
    },
    {
        title: "Export anywhere",
        description:
            "Upscale to 4K, remove backgrounds and push straight to Figma, Shopify or your DAM.",
        icon: Share2Icon,
    },
];

const useCases = [
    {
        title: "Marketing campaigns",
        description:
            "Hero visuals and ad-set variations in every ratio your channels demand — hours, not agencies.",
        icon: MegaphoneIcon,
    },
    {
        title: "Product mockups",
        description:
            "Place products in studio scenes, lifestyle settings or seasonal themes without a photoshoot.",
        icon: PackageIcon,
    },
    {
        title: "Concept art",
        description:
            "Explore fifty directions before lunch. Style-consistent boards for games, film and brand work.",
        icon: SparklesIcon,
    },
    {
        title: "Social content",
        description:
            "A month of on-brand posts from one prompt matrix, sized for every platform automatically.",
        icon: ImageIcon,
    },
];

const faqItems = [
    {
        question: "Can I use generated images commercially?",
        answer: "Yes. Every image you generate on a paid plan comes with full commercial usage rights, including client work and resale as part of a larger product. Free-tier images are licensed for personal and internal use.",
    },
    {
        question: "What resolutions are supported?",
        answer: "Base generations render up to 2048px on the long edge in any aspect ratio. The 4K upscaler takes any output to 4096px with detail synthesis — crisp enough for print and out-of-home formats.",
    },
    {
        question: "How do style presets and brand kits differ?",
        answer: "Presets control the artistic direction of a single generation — photoreal, 3D glass, anime and so on. Brand kits are workspace-level guardrails: locked palettes, typography-safe margins and negative prompts that apply to every generation your team runs.",
    },
    {
        question: "How fast is a batch of four images?",
        answer: "A standard batch of four 1024px images completes in about three seconds on Pro. Batch mode runs are parallelized, so a 500-variation CSV typically finishes in under four minutes.",
    },
];

export default function AIImagePage() {
    return (
        <>
            <ProductHero
                badge={product.name}
                icon={product.icon}
                gradient={product.gradient}
                layout="stacked"
                title={
                    <>
                        Imagination,{" "}
                        <span className="text-gradient-pink">
                            rendered in seconds
                        </span>
                    </>
                }
                description={product.description}
                highlights={product.features}
                demo={<ImageHeroDemo />}
            />

            <ProductFeatureGrid
                title={
                    <>
                        A full studio in{" "}
                        <span className="text-gradient-pink">
                            one prompt bar
                        </span>
                    </>
                }
                description="From first concept to print-ready file without leaving the canvas."
                items={featureItems}
                gradient={product.gradient}
            />

            <HowItWorks
                title={
                    <>
                        Prompt to portfolio in{" "}
                        <span className="text-gradient">three steps</span>
                    </>
                }
                steps={steps}
                gradient={product.gradient}
            />

            <UseCases
                title={
                    <>
                        Made for{" "}
                        <span className="text-gradient-pink">visual teams</span>
                    </>
                }
                description="Wherever images bottleneck your pipeline, AI Image removes the queue."
                items={useCases}
            />

            <PricingBanner productName={product.name} />

            <ProductFAQ
                description="Licensing, resolution and speed — answered before you ask."
                items={faqItems}
            />

            <CTA />
        </>
    );
}
