import { DocCode } from "@/components/docs/doc-blocks";

// Article typography primitives — server-safe, local to blog posts.

function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mt-12 mb-4 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            {children}
        </h2>
    );
}

function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="my-5 text-[15.5px] leading-8 text-muted-foreground">
            {children}
        </p>
    );
}

function Strong({ children }: { children: React.ReactNode }) {
    return <span className="font-medium text-foreground">{children}</span>;
}

function Quote({ children, by }: { children: React.ReactNode; by?: string }) {
    return (
        <blockquote className="relative my-10 overflow-hidden rounded-2xl p-6 pl-8 glass sm:p-8 sm:pl-10">
            <span
                aria-hidden
                className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-primary via-secondary to-accent"
            />
            <p className="font-heading text-lg leading-relaxed font-medium text-balance sm:text-xl">
                {children}
            </p>
            {by ? (
                <footer className="mt-3 text-sm text-muted-foreground">
                    — {by}
                </footer>
            ) : null}
        </blockquote>
    );
}

function UL({ items }: { items: React.ReactNode[] }) {
    return (
        <ul className="my-5 space-y-3">
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-start gap-3 text-[15.5px] leading-8 text-muted-foreground"
                >
                    <span
                        aria-hidden
                        className="mt-3.25 size-1.5 shrink-0 rounded-full bg-primary/70"
                    />
                    <span className="min-w-0">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export type PostContent = {
    tags: string[];
    authorBio: string;
    body: React.ReactNode;
};

export const postContent: Record<string, PostContent> = {
    "introducing-tapotik-agents": {
        tags: ["Agents", "Automation", "Product"],
        authorBio:
            "Sarah leads product at Tapotik AI, where she turns messy real-world workflows into things agents can actually finish. Previously she built automation platforms at Northwind.",
        body: (
            <>
                <P>
                    Today we&apos;re shipping <Strong>Tapotik Agents</Strong> to
                    every Pro and Enterprise workspace. Agents plan, execute and
                    verify multi-step work across your tools — researching a
                    refund, triaging a bug, reconciling an invoice — and they do
                    it with a property most autonomous systems skip: they know
                    when to stop and ask a human.
                </P>
                <P>
                    We&apos;ve watched teams wire chat models into workflows for
                    two years. The pattern is always the same: the model is
                    smart enough to do the work, but the glue around it —
                    retries, state, tool wiring, escalation — swallows weeks of
                    engineering. Agents productize that glue.
                </P>
                <H2>Plan, execute, verify</H2>
                <P>
                    Every run moves through three phases. First the agent{" "}
                    <Strong>plans</Strong>: it decomposes your goal into steps
                    and declares which tools it intends to use, so you can
                    inspect intent before anything happens. Then it{" "}
                    <Strong>executes</Strong>, chaining up to 25 tool calls with
                    parallel dispatch where steps are independent — runs are
                    2.3× faster than our beta because of this alone. Finally it{" "}
                    <Strong>verifies</Strong>: a separate pass checks the
                    outcome against the original goal, and failed verification
                    sends the agent back to planning rather than out the door
                    with a wrong answer.
                </P>
                <P>
                    The whole run is visible as a live execution graph in the
                    dashboard. Click any node and you see the exact tool call,
                    its arguments, the response and the tokens spent. Nothing is
                    a black box, because nothing invisible ever earns trust.
                </P>
                <H2>Approval gates, built in</H2>
                <P>
                    Some actions should never be fully autonomous. Mark any tool
                    with <Strong>requires_approval</Strong> and the run pauses
                    before calling it — the agent presents what it wants to do
                    and why, and a human approves or rejects from the dashboard,
                    Slack or email.
                </P>
                <UL
                    items={[
                        <>
                            <Strong>Scoped gates:</Strong> gate a single tool, a
                            category (anything that writes), or every action
                            above a credit threshold.
                        </>,
                        <>
                            <Strong>Context attached:</Strong> approvers see the
                            plan, the evidence gathered so far and the exact
                            payload — not just an &quot;approve?&quot; button.
                        </>,
                        <>
                            <Strong>Full audit trail:</Strong> every approval,
                            rejection and auto-resumed run lands in the
                            workspace audit log with actor and timestamp.
                        </>,
                    ]}
                />
                <Quote by="Sarah Chen, VP of Product">
                    Autonomy isn&apos;t the absence of humans. It&apos;s knowing
                    precisely when a human matters — and pausing there, every
                    time.
                </Quote>
                <H2>What beta teams shipped</H2>
                <P>
                    Northwind&apos;s support team runs a refund-triage agent
                    that verifies order state in Stripe, checks policy and
                    drafts the resolution — humans approve the refund itself.
                    Their handle time dropped 62%. Vectorline pointed an agent
                    at their release process: it compiles changelogs from merged
                    PRs, drafts the announcement and schedules the send, saving
                    an engineer most of a day per release.
                </P>
                <P>
                    The common thread: agents win on work that is{" "}
                    <Strong>procedural but not predictable</Strong> — too
                    variable to hard-code, too repetitive for a person to enjoy.
                </P>
                <H2>Available today</H2>
                <P>
                    Agents are live for Pro and Enterprise plans. Runs bill
                    underlying model tokens plus 2 credits for orchestration,
                    and every workspace gets 25 free runs this month to
                    experiment. Start in the dashboard with a template, or go
                    straight to the API — the docs cover the full run lifecycle,
                    webhooks and approval endpoints.
                </P>
                <P>
                    We think this is the biggest step yet toward AI that ships
                    work, not suggestions. We can&apos;t wait to see what you
                    hand off first.
                </P>
            </>
        ),
    },

    "state-of-ai-inference-2025": {
        tags: ["Inference", "Latency", "Benchmarks"],
        authorBio:
            "Marcus is CTO at Tapotik AI. He spends his time shaving milliseconds off the inference stack and writing about what he finds. Formerly infra lead at Lumina Labs.",
        body: (
            <>
                <P>
                    For ninety days we benchmarked twelve inference providers —
                    every major cloud and five specialists — from 32 vantage
                    points across four continents. One number tells the story of
                    2025:{" "}
                    <Strong>
                        median time-to-first-token fell from 480ms to 92ms
                    </Strong>{" "}
                    in eighteen months. Latency, not raw capability, is now the
                    axis providers compete on.
                </P>
                <P>
                    Why? Model quality converged. On our internal evals, the top
                    eight models land within four points of each other on
                    general tasks. When everyone is smart, the product
                    experience is decided by how fast the first token hits the
                    screen — and whether the stream ever stutters.
                </P>
                <H2>Latency is the new accuracy</H2>
                <P>
                    Users perceive sub-100ms first tokens as instant. Between
                    100ms and 300ms, an interface feels responsive but
                    mechanical. Past 500ms, engagement measurably decays: in our
                    product analytics, chat sessions with p95 first-token
                    latency above 500ms are <Strong>31% shorter</Strong> than
                    fast ones with the same model. People don&apos;t consciously
                    notice the difference — they just stop asking follow-up
                    questions.
                </P>
                <H2>What the numbers show</H2>
                <UL
                    items={[
                        <>
                            <Strong>Median TTFT, top quartile:</Strong> 92ms —
                            sub-100ms first tokens are now table stakes, not a
                            differentiator.
                        </>,
                        <>
                            <Strong>Inter-token stability matters more:</Strong>{" "}
                            providers with the best p50 often had the worst p99
                            jitter. A stream that hitches every 40 tokens reads
                            worse than one that starts 50ms later.
                        </>,
                        <>
                            <Strong>Geography still dominates:</Strong> the same
                            provider varied by up to 210ms between regions.
                            Single-region inference is a latency tax on half
                            your users.
                        </>,
                        <>
                            <Strong>Cost per token fell 74%</Strong> year over
                            year at equivalent quality — routing mid-tier
                            prompts to smaller models is where the real savings
                            hide.
                        </>,
                    ]}
                />
                <H2>How sub-100ms actually happens</H2>
                <P>
                    Three techniques account for most of the gains. Speculative
                    decoding drafts tokens with a small model and verifies them
                    in batches with the large one — free 2-3× throughput when
                    the draft model agrees. Paged KV-cache with prefix reuse
                    means a returning conversation skips re-encoding its
                    history. And edge routing terminates TLS near the user,
                    streaming tokens over an already-warm connection to the
                    nearest cluster.
                </P>
                <P>
                    Measure it yourself — the methodology is one loop and a
                    high-resolution timer:
                </P>
                <DocCode
                    language="typescript"
                    filename="bench/ttft.ts"
                    code={`const started = performance.now();
let first: number | null = null;
let tokens = 0;

const stream = await client.chat.completions.create({
  model: "tapotik-2-flash",
  messages: [{ role: "user", content: PROMPT }],
  stream: true,
});

for await (const chunk of stream) {
  if (chunk.choices[0]?.delta?.content) {
    first ??= performance.now() - started; // time to first token
    tokens++;
  }
}

console.log({ ttft_ms: first, tok_per_s: tokens / ((performance.now() - started) / 1000) });`}
                />
                <Quote by="Marcus Rivera, CTO">
                    Nobody churns because your model scored two points lower on
                    MMLU. They churn because the answer took a second to start.
                </Quote>
                <H2>What this means if you&apos;re building</H2>
                <P>
                    Treat latency as a product metric, not an infra metric. Put
                    p95 TTFT on the same dashboard as retention. Stream
                    everything — non-streamed endpoints are a design decision to
                    feel slow. And route: reserve your largest model for
                    requests that need it, because the fastest token is the one
                    a smaller model produced correctly.
                </P>
                <P>
                    Full methodology, per-provider data and the harness we used
                    are in the appendix repo. Benchmarks rot fast — we&apos;ll
                    rerun this quarterly and keep the charts live.
                </P>
            </>
        ),
    },

    "designing-for-ai-products": {
        tags: ["Design", "UX", "AI interfaces"],
        authorBio:
            "Aisha is Head of Design at Tapotik AI. She works on the design language of probabilistic interfaces — what software looks like when it isn't always right.",
        body: (
            <>
                <P>
                    Traditional software is deterministic: the button does the
                    thing, every time. AI products broke that contract. The same
                    prompt can produce brilliance or nonsense, and the interface
                    has to carry that uncertainty without terrifying the user.
                    After two years of designing AI-native surfaces, we think
                    trust comes from three materials:{" "}
                    <Strong>streaming states</Strong>,{" "}
                    <Strong>confidence signals</Strong> and{" "}
                    <Strong>graceful failure</Strong>.
                </P>
                <H2>Streaming is a design material</H2>
                <P>
                    A response that streams feels alive; a spinner feels like a
                    slot machine. But raw token streams have their own problems
                    — text reflowing under the cursor, layouts jumping as code
                    blocks form. The fixes are mundane and they matter: reserve
                    vertical space before content arrives, commit markdown
                    blocks atomically instead of character-by-character, and
                    keep the scroll anchored to the user&apos;s reading
                    position, not the bottom of the stream.
                </P>
                <P>
                    The most underrated streaming pattern is the{" "}
                    <Strong>thinking preamble</Strong>: a short status line —
                    &quot;reading 4 files&quot;, &quot;checking your
                    calendar&quot; — that fills the gap before the first token.
                    It converts dead air into evidence that something purposeful
                    is happening.
                </P>
                <H2>Confidence, made visible</H2>
                <P>
                    Models are confidently wrong; interfaces shouldn&apos;t be.
                    The goal isn&apos;t to display raw probabilities — users
                    can&apos;t act on &quot;0.73&quot; — it&apos;s to change
                    posture when the system is unsure.
                </P>
                <UL
                    items={[
                        <>
                            <Strong>Cite or qualify:</Strong> answers grounded
                            in retrieved documents show their sources inline;
                            ungrounded answers say so in words, not decimals.
                        </>,
                        <>
                            <Strong>Hedge structurally:</Strong> when confidence
                            is low, offer two interpretations side by side
                            instead of one authoritative wrong one.
                        </>,
                        <>
                            <Strong>Make verification cheap:</Strong> one-click
                            &quot;show the query it ran&quot;, &quot;jump to the
                            source paragraph&quot;. Trust is built by
                            auditability, not assertion.
                        </>,
                    ]}
                />
                <Quote by="Aisha Patel, Head of Design">
                    The honest AI interface isn&apos;t the one that&apos;s
                    always right. It&apos;s the one that never pretends to be
                    more certain than it is.
                </Quote>
                <H2>Failure is a first-class state</H2>
                <P>
                    Every AI product fails: refusals, timeouts, hallucinated
                    tool arguments, rate limits. Design for these the way you
                    design the happy path. A refusal should explain{" "}
                    <em>which</em> policy applied and offer a compliant
                    rephrase. A timeout should preserve the user&apos;s prompt
                    and retry with one tap. A low-quality generation should make
                    &quot;regenerate with changes&quot; feel like a natural next
                    step rather than an admission of defeat.
                </P>
                <P>
                    We keep a &quot;failure inventory&quot; for every surface —
                    a list of every way the model can disappoint, each mapped to
                    a designed response. It&apos;s the single highest-leverage
                    document our design team owns.
                </P>
                <H2>The trust ledger</H2>
                <P>
                    Users keep an unconscious ledger: every kept promise adds a
                    point, every silent failure removes five. Streaming
                    honestly, signaling confidence and failing gracefully are
                    how AI products stay in credit. Capability gets people to
                    try your product — the ledger decides whether they stay.
                </P>
            </>
        ),
    },

    "fine-tuning-vs-rag": {
        tags: ["RAG", "Fine-tuning", "Evals"],
        authorBio:
            "Tom leads applied research at Tapotik AI, focused on retrieval, evals and making model behavior measurable. He previously ran the AI platform team at Vectorline.",
        body: (
            <>
                <P>
                    &quot;Should we fine-tune or use RAG?&quot; is the question
                    we hear most from teams moving past the prototype phase.
                    It&apos;s usually the wrong question — the two techniques
                    solve different problems, and the teams that struggle are
                    the ones using either to do the other&apos;s job.
                    Here&apos;s the decision framework we use, with the eval
                    data behind it.
                </P>
                <H2>They optimize different things</H2>
                <P>
                    <Strong>
                        RAG changes what the model knows at request time.
                    </Strong>{" "}
                    It retrieves relevant documents and puts them in context —
                    perfect for knowledge that is voluminous, changes often or
                    must be cited.{" "}
                    <Strong>Fine-tuning changes how the model behaves.</Strong>{" "}
                    It bakes in tone, format, domain vocabulary and
                    task-specific reflexes — things you&apos;d otherwise burn
                    prompt tokens re-explaining on every call.
                </P>
                <UL
                    items={[
                        <>
                            Facts that update daily, per-customer data,
                            compliance-sensitive citations →{" "}
                            <Strong>RAG</Strong>.
                        </>,
                        <>
                            Consistent output schema, brand voice, niche jargon,
                            shorter prompts at scale →{" "}
                            <Strong>fine-tuning</Strong>.
                        </>,
                        <>
                            &quot;The model doesn&apos;t know our docs&quot; is
                            a retrieval problem. &quot;The model won&apos;t stop
                            being chatty in our JSON&quot; is a behavior
                            problem.
                        </>,
                    ]}
                />
                <H2>The cost curves cross</H2>
                <P>
                    RAG is cheap to start — an index and an embedding pipeline —
                    but every request pays a context tax: retrieved chunks are
                    input tokens, forever. Fine-tuning is expensive up front
                    (data curation dominates; training itself is the cheap part)
                    but then <em>reduces</em> per-request cost, because a tuned
                    model needs shorter prompts. In our modeling, the curves
                    cross around <Strong>2–5 million requests per month</Strong>
                    : below that, RAG alone is almost always the right
                    economics; above it, tuning the behavior and retrieving only
                    fresh facts wins.
                </P>
                <H2>What our evals showed</H2>
                <P>
                    We built a 1,200-case eval from real support and analytics
                    workloads and ran four configurations of{" "}
                    <Strong>tapotik-2-pro</Strong>: base, RAG-only,
                    fine-tune-only, and hybrid. Grading was blind, with a
                    rubric-scoring judge audited by humans on a 10% sample.
                </P>
                <DocCode
                    language="typescript"
                    filename="evals/run.ts"
                    code={`const results = await evals.run({
  suite: "support-kb-v3",           // 1,200 graded cases
  configs: [
    { name: "base",      model: "tapotik-2-pro" },
    { name: "rag",       model: "tapotik-2-pro", retrieval: { index: "kb_prod", top_k: 6 } },
    { name: "tuned",     model: "ft:tapotik-2-pro:support-v2" },
    { name: "hybrid",    model: "ft:tapotik-2-pro:support-v2", retrieval: { index: "kb_prod", top_k: 4 } },
  ],
  judge: { model: "tapotik-2-pro", rubric: "factuality+format" },
});

// factuality: base 61% | rag 89% | tuned 71% | hybrid 93%
// format:     base 74% | rag 76% | tuned 96% | hybrid 97%`}
                />
                <P>
                    The pattern held across suites: RAG dominated factuality,
                    tuning dominated format and tone, and the hybrid beat both
                    on every axis while using{" "}
                    <Strong>38% fewer input tokens</Strong> than RAG-only — the
                    tuned model needed less instruction and fewer retrieved
                    chunks to get the same answer right.
                </P>
                <Quote by="Tom Okafor, Applied Research">
                    Fine-tuning teaches the model how to behave. Retrieval tells
                    it what&apos;s true today. Most production systems
                    eventually need both — just not on day one.
                </Quote>
                <H2>The framework, in one paragraph</H2>
                <P>
                    Start with RAG — it&apos;s debuggable, updatable and cheap
                    at low volume. Add fine-tuning when one of three triggers
                    fires: your system prompt has grown past ~2K tokens of
                    behavioral instruction, your output format failures are
                    user-visible, or your request volume makes the per-token
                    math favor shorter prompts. And before any of it, build the
                    eval suite — without one, both techniques are just expensive
                    guessing.
                </P>
            </>
        ),
    },

    "voice-ai-localization": {
        tags: ["Voice", "Localization", "Customer story"],
        authorBio:
            "Elena runs customer marketing at Tapotik AI, telling the stories of teams building with the platform. She previously led product marketing at Brightpath.",
        body: (
            <>
                <P>
                    Brightpath sells professional certification courses in 14
                    countries — 400 hours of video, taught by instructors whose
                    voices <em>are</em> the brand. Localizing that catalog the
                    traditional way had been quoted at 14 months and just under
                    a million dollars. Using Tapotik&apos;s AI Voice, a team of
                    five shipped 12 languages in 31 days. This is how.
                </P>
                <H2>The problem with dubbing at scale</H2>
                <P>
                    Studio dubbing doesn&apos;t just cost money — it costs
                    identity. Learners pick Brightpath courses for specific
                    instructors, and a stranger&apos;s voice in German breaks
                    the relationship that makes the courses work. Subtitles were
                    the fallback, but completion rates for subtitled courses ran
                    22% below native-language versions. Brightpath needed the{" "}
                    <Strong>
                        same instructors, fluent in twelve languages they
                        don&apos;t speak
                    </Strong>
                    .
                </P>
                <H2>The workflow</H2>
                <P>
                    Each instructor recorded 90 seconds of consented reference
                    audio and signed a consent token — the cryptographic
                    permission Tapotik&apos;s cloning API requires. From there
                    the pipeline was almost boring:
                </P>
                <UL
                    items={[
                        <>
                            Transcripts flowed through translation with a
                            glossary layer pinning 1,400 certification terms
                            that must never drift.
                        </>,
                        <>
                            Each localized script rendered through the
                            instructor&apos;s voice clone, with emotion presets
                            matched per segment — <Strong>calm</Strong> for
                            theory, <Strong>energetic</Strong> for section
                            openers.
                        </>,
                        <>
                            Native-speaker reviewers spot-checked every module
                            and flagged segments for re-render — 6% needed a
                            second pass, mostly pronunciation of proper nouns
                            fixed with phoneme hints.
                        </>,
                    ]}
                />
                <H2>Keeping the nuance</H2>
                <P>
                    The surprise wasn&apos;t that the clones sounded like the
                    instructors — it&apos;s that they <em>taught</em> like them.
                    The pause before a key definition, the slight lift on a
                    rhetorical question: pacing and emotion controls carried
                    over the delivery habits learners associate with each
                    teacher. In blind tests, Brightpath&apos;s own staff
                    identified the AI-rendered Spanish audio only 54% of the
                    time — a coin flip.
                </P>
                <Quote by="Priya Sharma, VP of Content at Brightpath">
                    Our instructors now teach in twelve languages. They speak
                    three. That sentence still sounds like science fiction to
                    me, and we ship it every day.
                </Quote>
                <H2>The results</H2>
                <P>
                    Localized enrollments grew 3.1× in the first quarter.
                    Completion rates in dubbed languages now sit within two
                    points of English — the subtitle gap is gone. Total
                    production cost landed at roughly{" "}
                    <Strong>4% of the studio quote</Strong>, and new course
                    modules now localize in days as part of the regular
                    publishing pipeline rather than as a special project.
                </P>
                <P>
                    Brightpath&apos;s next step is realtime: instructor Q&amp;A
                    sessions with live translated voice, so a learner in São
                    Paulo can ask a question in Portuguese and hear the answer
                    in the instructor&apos;s voice, in Portuguese, seconds
                    later. The pilot starts this fall.
                </P>
            </>
        ),
    },

    "soc2-zero-retention": {
        tags: ["Security", "SOC 2", "Enterprise"],
        authorBio:
            "David is Head of Security at Tapotik AI. He built the platform's zero-retention architecture and spends his days making auditors happy and attackers miserable.",
        body: (
            <>
                <P>
                    Enterprise AI adoption has a trust problem, and it&apos;s
                    earned: the industry spent two years asking companies to
                    send their most sensitive data to black boxes with vague
                    retention policies. Our answer is an architecture where{" "}
                    <Strong>capability never requires custody</Strong> —
                    frontier models, SOC 2 Type II controls, and a mode where
                    your data provably ceases to exist the moment your response
                    is delivered.
                </P>
                <H2>Zero retention, by construction</H2>
                <P>
                    With zero-retention mode enabled, prompts, files and outputs
                    live only in volatile memory on the inference node. Nothing
                    touches disk: no logs of request bodies, no caches that
                    outlive the response, no &quot;deleted after 30 days&quot;
                    asterisks. When the last byte streams back to you, the
                    buffers are freed and the data is gone. We verify this the
                    hard way — memory forensics on production nodes are part of
                    our quarterly penetration test, and the pen-test summary is
                    available to enterprise customers under NDA.
                </P>
                <P>
                    The trade-offs are real and we state them plainly:
                    zero-retention disables conversation history, prefix caching
                    and support&apos;s ability to replay a failed request.
                    Enterprise customers choose per-project — most run product
                    workloads with standard 30-day retention and route regulated
                    workloads through zero-retention.
                </P>
                <H2>Your region, your keys</H2>
                <P>
                    <Strong>Region pinning</Strong> guarantees inference happens
                    in the jurisdiction you choose — EU, US, or APAC — enforced
                    at the routing layer, not by policy document. A pinned
                    request that can&apos;t be served in-region fails closed
                    rather than silently crossing a border.
                </P>
                <UL
                    items={[
                        <>
                            <Strong>BYOK encryption:</Strong> data at rest is
                            encrypted under keys you hold in your own KMS.
                            Revoke the key and every byte we store becomes
                            ciphertext we cannot read.
                        </>,
                        <>
                            <Strong>Per-workspace isolation:</Strong> tenants
                            are separated at the compute layer, not just the
                            database — dedicated inference clusters are standard
                            on Enterprise.
                        </>,
                        <>
                            <Strong>No training, ever:</Strong> customer data is
                            never used to train models on any plan. This is
                            contractual, not a settings toggle someone can flip.
                        </>,
                    ]}
                />
                <H2>Compliance without theater</H2>
                <P>
                    We hold SOC 2 Type II (report available under NDA), are GDPR
                    and HIPAA ready with signed BAAs, and publish our
                    subprocessor list with 30-day change notifications. Every
                    workspace gets a full audit log — every request, key, actor
                    and model — exportable to your SIEM. Compliance documents
                    describe the system; the audit log proves it.
                </P>
                <Quote by="David Kim, Head of Security">
                    The best data-breach story is the one where there was
                    nothing to breach. Zero retention isn&apos;t a policy
                    promise — it&apos;s an architecture where the promise
                    can&apos;t be broken quietly.
                </Quote>
                <H2>What&apos;s next</H2>
                <P>
                    This quarter we&apos;re shipping customer-managed logging
                    (your audit trail streams to your infrastructure in real
                    time) and confidential-compute inference on AMD SEV-SNP for
                    workloads where even our own operators must be outside the
                    trust boundary. Security reviews move at the speed of your
                    slowest question — if you have one, our team answers
                    architecture deep-dives directly. Ask.
                </P>
            </>
        ),
    },
};
