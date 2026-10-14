import type { Metadata } from "next";

import { ChatClient } from "./_components/chat-client";

export const metadata: Metadata = {
    title: "AI Chat",
    description:
        "Chat with tapotik-v4 and other frontier models — code, analysis and writing in one thread.",
};

export default function ChatPage() {
    return <ChatClient />;
}
