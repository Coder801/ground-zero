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
    title: "Voice API",
    description:
        "Lifelike text-to-speech in 40+ languages with emotion control, plus instant voice cloning from 60 seconds of audio.",
};

export default function VoiceApiPage() {
    return (
        <DocPage
            title="Voice API"
            description="Studio-quality text-to-speech in 40+ languages with controls for emotion, pacing and pronunciation — plus instant voice cloning from as little as 60 seconds of reference audio."
        >
            <DocH2>Generate speech</DocH2>
            <DocEndpoint method="POST" path="/v1/voice/speech" />
            <DocP>
                Returns audio bytes directly. Short inputs (&lt; 1,000
                characters) respond in near real time; longer inputs run as
                async jobs with a <Link href="/docs/webhooks">webhook</Link> on
                completion.
            </DocP>
            <DocCode
                language="bash"
                filename="terminal"
                code={`curl https://api.tapotik.ai/v1/voice/speech \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "tapotik-voice-2",
    "voice": "aria",
    "input": "Your export is ready — twelve thousand rows, zero errors.",
    "emotion": "warm",
    "format": "mp3"
  }' \\
  --output speech.mp3`}
            />
            <DocCode
                language="typescript"
                filename="app/speech.ts"
                code={`const audio = await client.voice.speech.create({
  model: "tapotik-voice-2",
  voice: "aria",
  input: "Your export is ready — twelve thousand rows, zero errors.",
  emotion: "warm",
  format: "mp3",
});

await fs.promises.writeFile("speech.mp3", Buffer.from(await audio.arrayBuffer()));`}
            />

            <DocH3>Request parameters</DocH3>
            <DocTable
                headers={["Parameter", "Type", "Description"]}
                rows={[
                    [
                        <DocInlineCode key="p">model</DocInlineCode>,
                        "string · required",
                        <>
                            <DocInlineCode>tapotik-voice-2</DocInlineCode> or
                            the low-latency{" "}
                            <DocInlineCode>tapotik-voice-2-turbo</DocInlineCode>
                            .
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">voice</DocInlineCode>,
                        "string · required",
                        <>
                            A stock voice ID (see below) or a clone ID like{" "}
                            <DocInlineCode>vc_7d21…</DocInlineCode>.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">input</DocInlineCode>,
                        "string · required",
                        "Text to speak, up to 40,000 characters per request.",
                    ],
                    [
                        <DocInlineCode key="p">emotion</DocInlineCode>,
                        "string · default neutral",
                        <>
                            <DocInlineCode>neutral</DocInlineCode>,{" "}
                            <DocInlineCode>warm</DocInlineCode>,{" "}
                            <DocInlineCode>energetic</DocInlineCode> or{" "}
                            <DocInlineCode>calm</DocInlineCode>.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">speed</DocInlineCode>,
                        "number · 0.5–2.0 · default 1.0",
                        "Playback pacing multiplier.",
                    ],
                    [
                        <DocInlineCode key="p">format</DocInlineCode>,
                        "string · default mp3",
                        <>
                            <DocInlineCode>mp3</DocInlineCode>,{" "}
                            <DocInlineCode>wav</DocInlineCode>,{" "}
                            <DocInlineCode>flac</DocInlineCode> or{" "}
                            <DocInlineCode>pcm</DocInlineCode> (24kHz).
                        </>,
                    ],
                ]}
            />

            <DocH2>Stock voices</DocH2>
            <DocTable
                headers={["Voice", "Character", "Languages"]}
                rows={[
                    [
                        <DocInlineCode key="v">aria</DocInlineCode>,
                        "Warm, conversational female",
                        "42",
                    ],
                    [
                        <DocInlineCode key="v">atlas</DocInlineCode>,
                        "Deep, confident male narrator",
                        "42",
                    ],
                    [
                        <DocInlineCode key="v">nova</DocInlineCode>,
                        "Bright, energetic product voice",
                        "38",
                    ],
                    [
                        <DocInlineCode key="v">sage</DocInlineCode>,
                        "Measured, documentary tone",
                        "35",
                    ],
                ]}
            />

            <DocH2>Voice cloning</DocH2>
            <DocEndpoint method="POST" path="/v1/voice/clones" />
            <DocP>
                Upload 60 seconds or more of clean reference audio to create a
                reusable clone. Clones are private to your workspace and usable
                anywhere a <DocInlineCode>voice</DocInlineCode> parameter is
                accepted.
            </DocP>
            <DocCode
                language="typescript"
                filename="app/clone.ts"
                code={`const clone = await client.voice.clones.create({
  name: "Lead instructor — course narration",
  files: [fs.createReadStream("./reference.wav")],
  consent_token: "cst_91ae4b", // signed consent from the voice owner
});

// -> { id: "vc_7d21f0", status: "ready", name: "Lead instructor — ..." }`}
            />
            <DocCallout type="warning">
                Cloning requires a signed <code>consent_token</code> proving the
                speaker&apos;s permission. Cloning a voice without consent
                violates our acceptable use policy and results in immediate
                suspension.
            </DocCallout>

            <DocH2>Credits</DocH2>
            <DocP>
                Speech costs 1 credit per 1,000 characters of input.{" "}
                <DocInlineCode>tapotik-voice-2-turbo</DocInlineCode> costs 0.5
                credits per 1,000 characters. Creating a clone is a one-time 25
                credits; using it is billed like any other voice. AI Voice
                requires a Pro plan or above — see{" "}
                <Link href="/pricing">pricing</Link>.
            </DocP>
        </DocPage>
    );
}
