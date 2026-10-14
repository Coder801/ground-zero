import type { Metadata } from "next";

import { ImageClient } from "./_components/image-client";

export const metadata: Metadata = {
    title: "Image Studio",
    description:
        "Generate gallery-grade images from text — styles, aspect ratios, seeds and fine-grained controls.",
};

export default function ImageStudioPage() {
    return <ImageClient />;
}
