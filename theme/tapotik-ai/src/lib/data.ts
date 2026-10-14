import {
    BotIcon,
    BrainCircuitIcon,
    CodeIcon,
    GaugeIcon,
    GlobeIcon,
    ImageIcon,
    LanguagesIcon,
    MessageSquareIcon,
    MicIcon,
    ShieldCheckIcon,
    VideoIcon,
    WorkflowIcon,
    ZapIcon,
    type LucideIcon,
} from "lucide-react";

export type Product = {
    name: string;
    href: string;
    tagline: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    features: string[];
};

export const products: Product[] = [
    {
        name: "AI Chat",
        href: "/ai-chat",
        tagline: "Converse with intelligence",
        description:
            "Multi-model conversational AI with memory, tools and web search. Built for support, research and everyday work.",
        icon: MessageSquareIcon,
        gradient: "from-primary to-secondary",
        features: [
            "GPT & Claude models",
            "Persistent memory",
            "File analysis",
            "Web browsing",
        ],
    },
    {
        name: "AI Image",
        href: "/ai-image",
        tagline: "Imagination, rendered",
        description:
            "Generate production-grade visuals from text. Styles from photorealism to 3D glass, with batch generation and upscaling.",
        icon: ImageIcon,
        gradient: "from-secondary to-pink",
        features: [
            "Text to image",
            "Style presets",
            "4K upscaling",
            "Batch mode",
        ],
    },
    {
        name: "AI Video",
        href: "/ai-video",
        tagline: "Cinematic in seconds",
        description:
            "Turn scripts and storyboards into cinematic clips with camera controls, motion presets and frame interpolation.",
        icon: VideoIcon,
        gradient: "from-pink to-warning",
        features: [
            "Text to video",
            "Camera control",
            "60fps output",
            "Scene stitching",
        ],
    },
    {
        name: "AI Voice",
        href: "/ai-voice",
        tagline: "Speech that feels human",
        description:
            "Lifelike text-to-speech and voice cloning in 40+ languages with emotion, pacing and pronunciation control.",
        icon: MicIcon,
        gradient: "from-accent to-primary",
        features: [
            "Voice cloning",
            "40+ languages",
            "Emotion control",
            "Studio quality",
        ],
    },
    {
        name: "AI Agents",
        href: "/ai-agents",
        tagline: "Autonomy that ships work",
        description:
            "Deploy autonomous agents that plan, execute and verify multi-step workflows across your tools and data.",
        icon: BotIcon,
        gradient: "from-primary to-accent",
        features: [
            "Multi-step planning",
            "Tool calling",
            "Human approval",
            "Audit logs",
        ],
    },
];

export type Feature = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export const features: Feature[] = [
    {
        title: "Neural Engine",
        description:
            "State-of-the-art foundation models tuned for speed, accuracy and cost efficiency at any scale.",
        icon: BrainCircuitIcon,
    },
    {
        title: "Realtime Streaming",
        description:
            "Sub-100ms first-token latency with token streaming across chat, voice and agents.",
        icon: ZapIcon,
    },
    {
        title: "Workflow Automation",
        description:
            "Drag-and-drop builder to chain models, tools and conditions into production workflows.",
        icon: WorkflowIcon,
    },
    {
        title: "Enterprise Security",
        description:
            "SOC 2 Type II, GDPR and HIPAA ready. Your data is encrypted in transit and at rest.",
        icon: ShieldCheckIcon,
    },
    {
        title: "Global Edge Network",
        description:
            "Inference distributed across 32 regions for consistent performance worldwide.",
        icon: GlobeIcon,
    },
    {
        title: "Developer API",
        description:
            "Typed SDKs, webhooks and OpenAPI specs. Ship your first integration in minutes.",
        icon: CodeIcon,
    },
    {
        title: "90+ Languages",
        description:
            "Generate, translate and understand content in more than ninety languages.",
        icon: LanguagesIcon,
    },
    {
        title: "Usage Analytics",
        description:
            "Track tokens, costs and latency per project with exportable reports.",
        icon: GaugeIcon,
    },
];

export type Integration = {
    name: string;
    category: string;
    description: string;
    initial: string;
    color: string;
};

export const integrations: Integration[] = [
    {
        name: "Slack",
        category: "Communication",
        description: "Send AI summaries and alerts to channels.",
        initial: "S",
        color: "#611f69",
    },
    {
        name: "Notion",
        category: "Productivity",
        description: "Sync knowledge bases for retrieval.",
        initial: "N",
        color: "#111111",
    },
    {
        name: "GitHub",
        category: "Developer",
        description: "Automate reviews, triage and changelogs.",
        initial: "G",
        color: "#24292e",
    },
    {
        name: "Figma",
        category: "Design",
        description: "Generate copy and assets inside files.",
        initial: "F",
        color: "#a259ff",
    },
    {
        name: "Zapier",
        category: "Automation",
        description: "Connect 6,000+ apps to your agents.",
        initial: "Z",
        color: "#ff4a00",
    },
    {
        name: "Salesforce",
        category: "CRM",
        description: "Enrich leads and draft outreach at scale.",
        initial: "S",
        color: "#00a1e0",
    },
    {
        name: "HubSpot",
        category: "Marketing",
        description: "Personalize campaigns with AI insights.",
        initial: "H",
        color: "#ff7a59",
    },
    {
        name: "Stripe",
        category: "Payments",
        description: "Answer billing questions with live data.",
        initial: "S",
        color: "#635bff",
    },
    {
        name: "Google Drive",
        category: "Storage",
        description: "Index documents for instant answers.",
        initial: "D",
        color: "#4285f4",
    },
    {
        name: "Discord",
        category: "Community",
        description: "Deploy AI moderators and helpers.",
        initial: "D",
        color: "#5865f2",
    },
    {
        name: "Linear",
        category: "Project",
        description: "Turn feedback into triaged issues.",
        initial: "L",
        color: "#5e6ad2",
    },
    {
        name: "Shopify",
        category: "E-commerce",
        description: "Write product copy that converts.",
        initial: "S",
        color: "#95bf47",
    },
];

export type Testimonial = {
    quote: string;
    name: string;
    role: string;
    company: string;
    initials: string;
};

export const testimonials: Testimonial[] = [
    {
        quote: "Tapotik replaced four separate AI tools for us. The agents alone save our support team 30 hours a week.",
        name: "Sarah Chen",
        role: "VP of Operations",
        company: "Northwind",
        initials: "SC",
    },
    {
        quote: "The API is a joy. We shipped an AI copilot into our product in under two weeks, including SSO and audit logs.",
        name: "Marcus Rivera",
        role: "CTO",
        company: "Lumina Labs",
        initials: "MR",
    },
    {
        quote: "Image generation quality is on par with anything on the market, and the workflow builder is genuinely unique.",
        name: "Aisha Patel",
        role: "Creative Director",
        company: "Studio Nova",
        initials: "AP",
    },
    {
        quote: "We evaluated six platforms. Tapotik won on latency, pricing transparency and the best dashboard we've seen.",
        name: "Tom Okafor",
        role: "Head of AI",
        company: "Vectorline",
        initials: "TO",
    },
    {
        quote: "Voice cloning in 40 languages let us localize our entire course catalog in a month instead of a year.",
        name: "Elena Kowalski",
        role: "Product Lead",
        company: "Brightpath",
        initials: "EK",
    },
    {
        quote: "The security posture sealed the deal — SOC 2, region pinning and zero data retention on enterprise.",
        name: "David Kim",
        role: "CISO",
        company: "Meridian Bank",
        initials: "DK",
    },
];

export type PricingTier = {
    name: string;
    description: string;
    monthly: number;
    yearly: number;
    cta: string;
    href: string;
    highlighted?: boolean;
    features: string[];
};

export const pricingTiers: PricingTier[] = [
    {
        name: "Starter",
        description: "For individuals exploring AI-powered work.",
        monthly: 0,
        yearly: 0,
        cta: "Start for free",
        href: "/signup",
        features: [
            "1,000 AI credits / month",
            "AI Chat with GPT models",
            "50 image generations",
            "Community support",
            "1 workspace",
        ],
    },
    {
        name: "Pro",
        description: "For professionals and small teams shipping fast.",
        monthly: 29,
        yearly: 24,
        cta: "Start Pro trial",
        href: "/signup",
        highlighted: true,
        features: [
            "25,000 AI credits / month",
            "All AI models, priority routing",
            "Unlimited image generations",
            "AI Video & Voice access",
            "5 workspaces, 10 members",
            "Workflow builder",
            "Priority support",
        ],
    },
    {
        name: "Enterprise",
        description: "For organizations with scale and compliance needs.",
        monthly: 99,
        yearly: 79,
        cta: "Contact sales",
        href: "/contact",
        features: [
            "Unlimited AI credits",
            "Dedicated inference clusters",
            "Custom model fine-tuning",
            "SSO / SAML & SCIM",
            "SOC 2, HIPAA, region pinning",
            "99.99% uptime SLA",
            "Dedicated success manager",
        ],
    },
];

export const faqs = [
    {
        question: "What counts as an AI credit?",
        answer: "One credit equals roughly 1,000 tokens of text, one standard image, or one second of generated video. The dashboard shows a live breakdown per product, and unused credits roll over for 90 days on paid plans.",
    },
    {
        question: "Can I switch between AI models?",
        answer: "Yes. Every product lets you choose between our fine-tuned in-house models and frontier models from OpenAI, Anthropic and Google. Pro plans include smart routing that picks the best model per request automatically.",
    },
    {
        question: "Is my data used to train models?",
        answer: "No. Your prompts, files and outputs are never used for training. Enterprise plans additionally support zero-retention mode where nothing is persisted after the response is delivered.",
    },
    {
        question: "Do you offer an API?",
        answer: "Every plan includes REST and streaming APIs with typed SDKs for TypeScript, Python and Go. Rate limits scale with your plan, and enterprise customers get dedicated throughput.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Absolutely. Plans are month-to-month with no lock-in. If you cancel, you keep access until the end of the billing period and can export all of your data.",
    },
    {
        question: "Do you offer discounts for startups or education?",
        answer: "Yes — eligible startups get 50% off Pro for the first year, and verified students and educators get free Pro access. Reach out through the contact page to apply.",
    },
];

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readingTime: string;
    author: { name: string; role: string; initials: string };
    gradient: string;
};

export const blogPosts: BlogPost[] = [
    {
        slug: "introducing-tapotik-agents",
        title: "Introducing Tapotik Agents: autonomy you can trust",
        excerpt:
            "Our new agent runtime plans, executes and verifies multi-step work across your tools — with human approval gates built in.",
        category: "Product",
        date: "2025-06-18",
        readingTime: "6 min read",
        author: { name: "Sarah Chen", role: "Product", initials: "SC" },
        gradient: "from-primary via-secondary to-accent",
    },
    {
        slug: "state-of-ai-inference-2025",
        title: "The state of AI inference in 2025: latency is the new accuracy",
        excerpt:
            "Benchmarks across 12 providers show sub-100ms first tokens are now table stakes. Here's how we got there.",
        category: "Engineering",
        date: "2025-06-04",
        readingTime: "9 min read",
        author: { name: "Marcus Rivera", role: "Engineering", initials: "MR" },
        gradient: "from-secondary via-pink to-warning",
    },
    {
        slug: "designing-for-ai-products",
        title: "Designing for AI products: patterns that build user trust",
        excerpt:
            "Streaming states, confidence signals and graceful failure — the design language of AI-native interfaces.",
        category: "Design",
        date: "2025-05-22",
        readingTime: "7 min read",
        author: { name: "Aisha Patel", role: "Design", initials: "AP" },
        gradient: "from-accent via-primary to-secondary",
    },
    {
        slug: "fine-tuning-vs-rag",
        title: "Fine-tuning vs RAG: choosing the right memory for your use case",
        excerpt:
            "A practical decision framework with cost curves, eval results and the hybrid approach we recommend for most teams.",
        category: "Engineering",
        date: "2025-05-10",
        readingTime: "11 min read",
        author: { name: "Tom Okafor", role: "Research", initials: "TO" },
        gradient: "from-pink via-secondary to-primary",
    },
    {
        slug: "voice-ai-localization",
        title: "How Brightpath localized 400 hours of courses with AI Voice",
        excerpt:
            "A customer story: cloning instructor voices across 12 languages while keeping emotional nuance intact.",
        category: "Customers",
        date: "2025-04-28",
        readingTime: "5 min read",
        author: { name: "Elena Kowalski", role: "Marketing", initials: "EK" },
        gradient: "from-warning via-pink to-secondary",
    },
    {
        slug: "soc2-zero-retention",
        title: "Zero retention, full capability: our enterprise security model",
        excerpt:
            "How we deliver frontier AI under SOC 2 Type II with region pinning, BYOK encryption and zero-retention inference.",
        category: "Security",
        date: "2025-04-15",
        readingTime: "8 min read",
        author: { name: "David Kim", role: "Security", initials: "DK" },
        gradient: "from-success via-accent to-primary",
    },
];

export const trustedCompanies: { name: string; gradient: string }[] = [
    { name: "Vercel", gradient: "from-primary to-secondary" },
    { name: "Linear", gradient: "from-[#6366f1] to-secondary" },
    { name: "Raycast", gradient: "from-pink to-secondary" },
    { name: "Supabase", gradient: "from-accent to-primary" },
    { name: "Retool", gradient: "from-primary to-accent" },
    { name: "Loom", gradient: "from-secondary to-pink" },
    { name: "Pitch", gradient: "from-pink to-warning" },
    { name: "Framer", gradient: "from-primary to-pink" },
    { name: "Amplitude", gradient: "from-secondary to-primary" },
    { name: "Airtable", gradient: "from-primary to-secondary" },
];

export const stats: {
    label: string;
    value: number;
    suffix: string;
    decimals?: number;
}[] = [
    { label: "Active teams", value: 12000, suffix: "+" },
    { label: "AI requests / day", value: 48, suffix: "M" },
    { label: "Uptime SLA", value: 99.99, suffix: "%", decimals: 2 },
    { label: "Avg. first token", value: 87, suffix: "ms" },
];

export type ChangelogEntry = {
    version: string;
    date: string;
    title: string;
    description: string;
    tags: ("New" | "Improved" | "Fixed")[];
    items: { type: "New" | "Improved" | "Fixed"; text: string }[];
};

export const changelog: ChangelogEntry[] = [
    {
        version: "2.8.0",
        date: "2025-06-20",
        title: "Agents go multi-step",
        description:
            "Agents can now plan and execute chains of up to 25 tool calls with human approval gates.",
        tags: ["New", "Improved"],
        items: [
            {
                type: "New",
                text: "Multi-step agent planning with live execution graph",
            },
            {
                type: "New",
                text: "Approval gates: require human sign-off on sensitive actions",
            },
            {
                type: "Improved",
                text: "Agent runs are 2.3× faster through parallel tool calls",
            },
            {
                type: "Fixed",
                text: "Rare race condition when two agents shared a memory store",
            },
        ],
    },
    {
        version: "2.7.0",
        date: "2025-06-05",
        title: "Video generation, upgraded",
        description:
            "Cinematic camera moves, 60fps interpolation and a new storyboard editor.",
        tags: ["New"],
        items: [
            {
                type: "New",
                text: "Camera presets: dolly, orbit, crane and handheld",
            },
            { type: "New", text: "Storyboard editor with per-scene prompts" },
            {
                type: "Improved",
                text: "60fps frame interpolation on all Pro renders",
            },
        ],
    },
    {
        version: "2.6.2",
        date: "2025-05-19",
        title: "Dashboard polish & fixes",
        description:
            "A quality pass across analytics, billing and team management.",
        tags: ["Improved", "Fixed"],
        items: [
            {
                type: "Improved",
                text: "Usage charts now break down by model and project",
            },
            { type: "Improved", text: "Billing page loads 4× faster" },
            { type: "Fixed", text: "CSV export missing header row on Safari" },
            {
                type: "Fixed",
                text: "Workspace invites expiring early in some timezones",
            },
        ],
    },
    {
        version: "2.6.0",
        date: "2025-05-02",
        title: "Voice cloning studio",
        description:
            "Clone a voice from 60 seconds of audio, with emotion and pacing controls.",
        tags: ["New", "Improved"],
        items: [
            { type: "New", text: "Instant voice cloning from short samples" },
            {
                type: "New",
                text: "Emotion presets: neutral, warm, energetic, calm",
            },
            {
                type: "Improved",
                text: "TTS latency down 40% across all languages",
            },
        ],
    },
];

export type JobOpening = {
    title: string;
    department: string;
    location: string;
    type: string;
    slug: string;
};

export const jobOpenings: JobOpening[] = [
    {
        title: "Senior ML Engineer, Inference",
        department: "Engineering",
        location: "Remote (US/EU)",
        type: "Full-time",
        slug: "senior-ml-engineer",
    },
    {
        title: "Product Designer, AI Interfaces",
        department: "Design",
        location: "Remote (Global)",
        type: "Full-time",
        slug: "product-designer",
    },
    {
        title: "Developer Advocate",
        department: "Marketing",
        location: "San Francisco / Remote",
        type: "Full-time",
        slug: "developer-advocate",
    },
    {
        title: "Enterprise Account Executive",
        department: "Sales",
        location: "New York / Remote",
        type: "Full-time",
        slug: "enterprise-ae",
    },
    {
        title: "Applied Research Scientist",
        department: "Research",
        location: "London / Remote",
        type: "Full-time",
        slug: "research-scientist",
    },
    {
        title: "Support Engineer, APAC",
        department: "Support",
        location: "Remote (APAC)",
        type: "Full-time",
        slug: "support-engineer",
    },
];

export const docsNav = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Quickstart", href: "/docs/quickstart" },
            { title: "Authentication", href: "/docs/authentication" },
        ],
    },
    {
        title: "Products",
        items: [
            { title: "Chat API", href: "/docs/chat" },
            { title: "Image API", href: "/docs/images" },
            { title: "Voice API", href: "/docs/voice" },
            { title: "Agents", href: "/docs/agents" },
        ],
    },
    {
        title: "Platform",
        items: [
            { title: "Rate limits", href: "/docs/rate-limits" },
            { title: "Webhooks", href: "/docs/webhooks" },
            { title: "Errors", href: "/docs/errors" },
        ],
    },
];
