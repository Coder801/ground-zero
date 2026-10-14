import type { Metadata } from "next";

import { VoiceClient } from "./_components/voice-client";

export const metadata: Metadata = {
    title: "Voice Studio",
    description:
        "Turn scripts into natural speech — 6 studio voices, 40 languages, emotion presets and delivery controls.",
};

export default function VoiceStudioPage() {
    return <VoiceClient />;
}
