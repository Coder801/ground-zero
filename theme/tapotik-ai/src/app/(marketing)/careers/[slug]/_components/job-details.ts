export type JobDetail = {
    intro: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
};

export const fallbackDetail: JobDetail = {
    intro: "You'll join a small, senior team with real ownership over outcomes that ship to 12,000+ companies. We optimize for craft, clarity and momentum — and we'll shape the finer details of this role around your strengths.",
    responsibilities: [
        "Own meaningful projects end-to-end, from first sketch to production",
        "Collaborate across engineering, design and research in small squads",
        "Raise the quality bar through reviews, documentation and mentorship",
        "Talk to customers regularly and turn insight into roadmap",
        "Help us keep shipping fast without breaking trust",
    ],
    requirements: [
        "4+ years of relevant experience shipping production work",
        "A portfolio of projects you can walk us through in depth",
        "Strong written communication for an async, remote-first team",
        "Comfort with ambiguity and a bias toward action",
        "Genuine curiosity about applied AI",
    ],
    niceToHave: [
        "Experience at a fast-growing product company",
        "Contributions to open source or public writing",
        "Hands-on experience with LLM-powered products",
    ],
};

export const jobDetails: Record<string, JobDetail> = {
    "senior-ml-engineer": {
        intro: "Our inference platform serves 48 million requests a day with an 87ms average first token. You'll own the systems that keep that number falling while models — and traffic — keep growing. This is deep infrastructure work with a direct line to every user's experience.",
        responsibilities: [
            "Design and operate GPU inference clusters across 32 edge regions",
            "Drive latency work: speculative decoding, KV-cache strategies, smart batching",
            "Build the model-routing layer that picks the best model per request",
            "Own capacity planning and cost efficiency for a multi-tenant fleet",
            "Partner with research to productionize new models within days, not months",
        ],
        requirements: [
            "5+ years building distributed systems, 2+ with ML inference in production",
            "Fluency in Python and one systems language (Go, Rust or C++)",
            "Hands-on experience with CUDA, TensorRT, vLLM or similar serving stacks",
            "Strong grasp of queueing, autoscaling and observability at scale",
            "Clear written communication for RFC-driven, async decision making",
        ],
        niceToHave: [
            "Experience with multi-region traffic engineering",
            "Contributions to open-source inference tooling",
            "Familiarity with speech or diffusion model serving",
        ],
    },
    "product-designer": {
        intro: "AI interfaces are still being invented — streaming states, confidence signals, approval gates. You'll define how millions of people experience five AI products, from the first prompt to the thousandth workflow. High autonomy, direct access to users, no design-by-committee.",
        responsibilities: [
            "Own end-to-end design for one of our five products, from discovery to ship",
            "Design the interaction language for streaming, generative and agentic UI",
            "Prototype in code or high-fidelity tools to test motion and feel",
            "Evolve our design system alongside three other product designers",
            "Run regular research sessions and translate findings into crisp specs",
        ],
        requirements: [
            "4+ years designing shipped software products, ideally developer- or AI-facing",
            "A portfolio showing systems thinking and obsessive interaction detail",
            "Fluency with modern prototyping (Figma, code prototypes or motion tools)",
            "Comfort presenting work and reasoning to founders and engineers",
            "Experience designing for both dark and light interfaces",
        ],
        niceToHave: [
            "Front-end skills (React, Tailwind, motion libraries)",
            "Experience with data-dense dashboard design",
            "Prior work on AI or ML-powered products",
        ],
    },
    "developer-advocate": {
        intro: "Developers ship their first Tapotik integration in under ten minutes — when the docs, SDKs and examples are right. You'll be the voice of the platform in public and the voice of developers internally, with a real seat at the product table.",
        responsibilities: [
            "Create tutorials, sample apps and reference architectures developers love",
            "Own our developer content calendar: blog, video, livestreams and talks",
            "Gather developer feedback and turn it into SDK and docs improvements",
            "Support our community across Discord, GitHub and X",
            "Represent Tapotik at conferences and hackathons worldwide",
        ],
        requirements: [
            "3+ years in developer relations, developer education or engineering",
            "You write code (TypeScript or Python) and prose equally comfortably",
            "A public footprint: talks, posts, videos or open-source work",
            "Empathy for beginners and rigor for experts",
            "Willingness to travel ~15% for events",
        ],
        niceToHave: [
            "Experience with AI/LLM developer tooling",
            "An existing audience in the AI or web dev community",
            "Video editing and livestream production chops",
        ],
    },
    "enterprise-ae": {
        intro: "Enterprises are moving from AI pilots to platform decisions, and Tapotik wins on latency, security and price transparency. You'll own a named-account territory end-to-end with a product that demos itself and a security story that closes.",
        responsibilities: [
            "Own the full sales cycle for enterprise accounts ($100k+ ACV)",
            "Run consultative discovery with engineering and security stakeholders",
            "Partner with solutions engineering on pilots, evals and POCs",
            "Negotiate commercial and legal terms alongside our deal desk",
            "Feed structured market intelligence back to product and pricing",
        ],
        requirements: [
            "5+ years closing enterprise SaaS deals, ideally infra or developer tools",
            "Track record of consistent quota attainment (top 10% of your team)",
            "Comfort selling to CTOs, CISOs and heads of AI",
            "Crisp written communication and disciplined pipeline hygiene",
            "Based in New York or willing to work East Coast hours",
        ],
        niceToHave: [
            "Experience selling AI/ML or API-first products",
            "Familiarity with SOC 2, HIPAA and procurement security reviews",
            "An existing network in financial services or healthcare",
        ],
    },
    "research-scientist": {
        intro: "Our research team exists to make the platform smarter, faster and safer — not to chase leaderboard glory. You'll run experiments that ship: routing policies, eval harnesses, fine-tuning recipes and safety systems used by 12,000+ teams within weeks of working.",
        responsibilities: [
            "Design and run experiments on model routing, distillation and fine-tuning",
            "Build eval suites that measure what users actually feel",
            "Publish internally first, externally when it helps the field",
            "Pair with platform engineers to move results into production",
            "Advise product teams on capability and safety trade-offs",
        ],
        requirements: [
            "PhD or equivalent research experience in ML, NLP or related fields",
            "Strong empirical skills: you design clean experiments and distrust noise",
            "Fluency with PyTorch or JAX and modern training infrastructure",
            "Publication record or public artifacts demonstrating rigor",
            "Ability to communicate findings to non-research audiences",
        ],
        niceToHave: [
            "Experience with RLHF, DPO or preference optimization",
            "Work on multimodal (vision, speech or video) models",
            "Open-source research tooling contributions",
        ],
    },
    "support-engineer": {
        intro: "Support at Tapotik is an engineering discipline. You'll debug real integration issues, write runbooks that prevent the next ticket, and own the APAC window of our follow-the-sun coverage — with a direct line to the teams who ship fixes.",
        responsibilities: [
            "Own technical escalations across APAC hours (API, SDKs, webhooks)",
            "Reproduce issues in code and file crisp, actionable bug reports",
            "Write documentation and runbooks that deflect entire ticket categories",
            "Monitor platform health and coordinate incident comms for your region",
            "Champion customer pain in weekly product reviews",
        ],
        requirements: [
            "3+ years in technical support, solutions or software engineering",
            "Comfort reading and writing TypeScript or Python to debug integrations",
            "Experience with REST APIs, webhooks and auth flows",
            "Calm, structured communication under incident pressure",
            "Based in APAC time zones (UTC+7 to UTC+10)",
        ],
        niceToHave: [
            "Experience supporting AI or developer-platform products",
            "Familiarity with observability tools (Datadog, Grafana)",
            "A second language used in APAC markets",
        ],
    },
};
