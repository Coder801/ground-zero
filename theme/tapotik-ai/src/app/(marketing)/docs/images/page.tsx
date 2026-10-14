import type { Metadata } from "next";
import Link from "next/link";

import {
    DocCallout,
    DocCode,
    DocEndpoint,
    DocH2,
    DocH3,
    DocInlineCode,
    DocP,
    DocPage,
    DocTable,
} from "@/components/docs/doc-blocks";

export const metadata: Metadata = {
    title: "Image API",
    description:
        "Generate production-grade images from text — style presets, batch generation, upscaling and edit masks.",
};

export default function ImagesApiPage() {
    return (
        <DocPage
            title="Image API"
            description="Text-to-image generation with style presets from photorealism to 3D glass, plus 4K upscaling and mask-based edits. Images are returned as signed URLs valid for 24 hours."
        >
            <DocH2>Generate images</DocH2>
            <DocEndpoint method="POST" path="/v1/images/generations" />
            <DocP>
                Generation is synchronous for single images (typically 2–4
                seconds) and asynchronous for batches — batch requests return a
                job you can poll or subscribe to via{" "}
                <Link href="/docs/webhooks">webhooks</Link>.
            </DocP>
            <DocCode
                language="bash"
                filename="terminal"
                code={`curl https://api.tapotik.ai/v1/images/generations \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "tapotik-image-3",
    "prompt": "Isometric glass workstation floating in deep navy space, soft violet rim light",
    "size": "1536x1024",
    "style": "render_3d",
    "n": 1
  }'`}
            />
            <DocCode
                language="typescript"
                filename="app/generate.ts"
                code={`const result = await client.images.generate({
  model: "tapotik-image-3",
  prompt:
    "Isometric glass workstation floating in deep navy space, soft violet rim light",
  size: "1536x1024",
  style: "render_3d",
  n: 1,
});

console.log(result.data[0].url);        // signed URL, 24h TTL
console.log(result.data[0].revised_prompt); // prompt after safety/quality rewrite`}
            />

            <DocH3>Request parameters</DocH3>
            <DocTable
                headers={["Parameter", "Type", "Description"]}
                rows={[
                    [
                        <DocInlineCode key="p">model</DocInlineCode>,
                        "string · required",
                        <>
                            <DocInlineCode>tapotik-image-3</DocInlineCode>{" "}
                            (flagship) or{" "}
                            <DocInlineCode>tapotik-image-3-fast</DocInlineCode>.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">prompt</DocInlineCode>,
                        "string · required",
                        "Description of the image, up to 4,000 characters.",
                    ],
                    [
                        <DocInlineCode key="p">size</DocInlineCode>,
                        "string · default 1024x1024",
                        <>
                            <DocInlineCode>1024x1024</DocInlineCode>,{" "}
                            <DocInlineCode>1536x1024</DocInlineCode>,{" "}
                            <DocInlineCode>1024x1536</DocInlineCode> or{" "}
                            <DocInlineCode>2048x2048</DocInlineCode>.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">style</DocInlineCode>,
                        "string",
                        "Style preset — see the table below. Omit for the model default.",
                    ],
                    [
                        <DocInlineCode key="p">n</DocInlineCode>,
                        "integer · 1–8 · default 1",
                        "Number of variations. n > 1 runs as an async batch job.",
                    ],
                    [
                        <DocInlineCode key="p">negative_prompt</DocInlineCode>,
                        "string",
                        'Elements to avoid, e.g. "text, watermark, extra fingers".',
                    ],
                    [
                        <DocInlineCode key="p">seed</DocInlineCode>,
                        "integer",
                        "Fix the seed for reproducible generations.",
                    ],
                ]}
            />

            <DocH2>Style presets</DocH2>
            <DocTable
                headers={["Preset", "Look"]}
                rows={[
                    [
                        <DocInlineCode key="s">photoreal</DocInlineCode>,
                        "Natural light photography, accurate skin and materials.",
                    ],
                    [
                        <DocInlineCode key="s">render_3d</DocInlineCode>,
                        "Glossy 3D renders — glass, chrome, soft studio lighting.",
                    ],
                    [
                        <DocInlineCode key="s">illustration</DocInlineCode>,
                        "Editorial flat illustration with bold shapes.",
                    ],
                    [
                        <DocInlineCode key="s">anime</DocInlineCode>,
                        "Clean line art with cel shading.",
                    ],
                    [
                        <DocInlineCode key="s">pixel</DocInlineCode>,
                        "Retro pixel art, fixed 1:1 grid.",
                    ],
                ]}
            />

            <DocH2>Upscaling</DocH2>
            <DocEndpoint method="POST" path="/v1/images/upscale" />
            <DocP>
                Upscale any generated image to 4K. Pass the{" "}
                <DocInlineCode>image_id</DocInlineCode> from a previous
                generation — source files never need to be re-uploaded.
            </DocP>
            <DocCode
                language="typescript"
                code={`const upscaled = await client.images.upscale({
  image_id: "img_9f3b2c",
  factor: 4, // 2 or 4
});`}
            />

            <DocH2>Credits</DocH2>
            <DocP>
                A standard 1024×1024 image costs 1 credit;{" "}
                <DocInlineCode>2048x2048</DocInlineCode> and 4× upscales cost 3
                credits. Failed generations are never billed, and
                safety-filtered prompts return{" "}
                <DocInlineCode>422 content_policy_violation</DocInlineCode>{" "}
                without consuming credits.
            </DocP>
            <DocCallout type="info">
                Generated images are yours: every plan grants full commercial
                usage rights to outputs, per our{" "}
                <Link
                    href="/terms"
                    className="font-medium underline underline-offset-4"
                >
                    Terms of Service
                </Link>
                .
            </DocCallout>
        </DocPage>
    );
}
