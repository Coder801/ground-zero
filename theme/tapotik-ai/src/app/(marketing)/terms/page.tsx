import type { Metadata } from "next";
import Link from "next/link";
import { ScaleIcon } from "lucide-react";

import { AuroraBackground } from "@/components/effects/aurora-background";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "The agreement that governs your use of Tapotik AI — plans and billing, credits, acceptable use, content ownership and liability.",
};

function LegalP({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[15px] leading-7 text-muted-foreground">
            {children}
        </p>
    );
}

function LegalUL({ items }: { items: React.ReactNode[] }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-7 text-muted-foreground"
                >
                    <span
                        aria-hidden
                        className="mt-2.75 size-1.5 shrink-0 rounded-full bg-primary/70"
                    />
                    <span className="min-w-0">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function Strong({ children }: { children: React.ReactNode }) {
    return <span className="font-medium text-foreground">{children}</span>;
}

const sections: { id: string; title: string; body: React.ReactNode }[] = [
    {
        id: "agreement",
        title: "Agreement to terms",
        body: (
            <>
                <LegalP>
                    These Terms of Service (&quot;Terms&quot;) are a binding
                    agreement between you and Tapotik AI, Inc.
                    (&quot;Tapotik&quot;, &quot;we&quot;, &quot;us&quot;)
                    governing your use of the Tapotik platform, APIs, SDKs and
                    websites (together, the &quot;Services&quot;). By creating
                    an account, accessing the API or clicking &quot;agree&quot;,
                    you accept these Terms on your own behalf or on behalf of
                    the organization you represent, and you confirm you have
                    authority to do so.
                </LegalP>
                <LegalP>
                    If you have a separately negotiated enterprise agreement
                    with us, that agreement controls where it conflicts with
                    these Terms.
                </LegalP>
            </>
        ),
    },
    {
        id: "accounts",
        title: "Accounts and eligibility",
        body: (
            <>
                <LegalP>
                    You must be at least 16 years old (or the age of digital
                    consent in your jurisdiction) and capable of forming a
                    binding contract to use the Services. You are responsible
                    for your account credentials, for all activity under your
                    API keys and for ensuring your team&apos;s use complies with
                    these Terms.
                </LegalP>
                <LegalUL
                    items={[
                        "Provide accurate registration and billing information and keep it current.",
                        "Keep API keys secret — do not embed live keys in client-side code or public repositories.",
                        "Notify us promptly at security@tapotik.ai if you suspect unauthorized access.",
                    ]}
                />
            </>
        ),
    },
    {
        id: "billing",
        title: "Plans, billing and renewals",
        body: (
            <>
                <LegalP>
                    Paid plans are billed in advance, monthly or yearly, and
                    renew automatically until cancelled. You can cancel at any
                    time from workspace settings; access continues until the end
                    of the paid period. Except where required by law or
                    expressly stated, fees are non-refundable, including for
                    partially used periods.
                </LegalP>
                <LegalP>
                    We may change prices with at least 30 days&apos; notice;
                    changes apply from your next renewal. Taxes are your
                    responsibility and are added where we are required to
                    collect them. If invoices go unpaid 15 days past due, we may
                    suspend the workspace after notice.
                </LegalP>
            </>
        ),
    },
    {
        id: "credits",
        title: "Credits and fair use",
        body: (
            <>
                <LegalP>
                    Usage is metered in credits as described on the{" "}
                    <Link
                        href="/pricing"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        pricing page
                    </Link>
                    . Monthly credits reset each billing cycle; unused credits
                    on paid plans roll over for 90 days. Credits have no cash
                    value, are not transferable between organizations and expire
                    when an account closes.
                </LegalP>
                <LegalP>
                    &quot;Unlimited&quot; features are subject to fair use: we
                    may apply technical safeguards where usage patterns indicate
                    abuse, resale of raw capacity or degradation of service for
                    other customers. We will contact you before restricting a
                    good-faith workload.
                </LegalP>
            </>
        ),
    },
    {
        id: "acceptable-use",
        title: "Acceptable use",
        body: (
            <>
                <LegalP>You agree not to use the Services to:</LegalP>
                <LegalUL
                    items={[
                        "Violate any law, or infringe the intellectual property, privacy or publicity rights of others.",
                        "Generate content for fraud, spam, malware, or deceptive impersonation — including cloning a voice without the speaker's documented consent.",
                        "Create or distribute child sexual abuse material, non-consensual intimate imagery, or content inciting violence.",
                        "Attempt to extract model weights, probe or circumvent safety systems, or benchmark for a competing service without our written consent.",
                        "Resell raw API access without adding material functionality, or share one subscription across multiple organizations.",
                    ]}
                />
                <LegalP>
                    We may suspend or terminate access for violations,
                    immediately where the violation risks harm. Where practical,
                    we will notify you and give you a chance to cure.
                </LegalP>
            </>
        ),
    },
    {
        id: "content",
        title: "Your content and AI outputs",
        body: (
            <>
                <LegalP>
                    <Strong>You own your content.</Strong> You retain all rights
                    to the prompts, files and data you submit
                    (&quot;Input&quot;) and, as between you and Tapotik, we
                    assign to you all our right, title and interest in the
                    generated results (&quot;Output&quot;). You may use Output
                    for any lawful purpose, including commercially, on every
                    plan.
                </LegalP>
                <LegalP>
                    You grant us a limited license to process Input and Output
                    solely to provide the Services. We do not train models on
                    your content. Because machine learning is probabilistic,
                    Output may be inaccurate or similar to output generated for
                    others — you are responsible for reviewing Output before
                    relying on it, and no Output is professional (legal,
                    medical, financial) advice.
                </LegalP>
            </>
        ),
    },
    {
        id: "ip",
        title: "Intellectual property",
        body: (
            <LegalP>
                The Services — including models, software, documentation and
                branding — are owned by Tapotik and its licensors and are
                protected by intellectual property law. We grant you a limited,
                non-exclusive, non-transferable license to use them as permitted
                by these Terms. Any feedback you choose to send us may be used
                without restriction or obligation. Except for the rights
                expressly granted here, no license is implied.
            </LegalP>
        ),
    },
    {
        id: "third-party",
        title: "Third-party services and models",
        body: (
            <LegalP>
                The platform can route requests to third-party frontier models
                and connect to third-party integrations you enable (for example
                Slack, GitHub or Salesforce). Your use of those integrations is
                governed by the third party&apos;s own terms, and model
                providers may impose additional usage policies which we surface
                in the documentation. We are not responsible for third-party
                services, but we contractually require model providers
                processing your requests to honor the same no-training
                commitment we make.
            </LegalP>
        ),
    },
    {
        id: "disclaimers",
        title: "Disclaimers and limitation of liability",
        body: (
            <>
                <LegalP>
                    THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
                    AVAILABLE&quot;. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE
                    DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                    NON-INFRINGEMENT AND ANY WARRANTY THAT OUTPUT WILL BE
                    ACCURATE OR ERROR-FREE. ENTERPRISE UPTIME COMMITMENTS ARE
                    STATED IN THE APPLICABLE SLA, NOT IN THESE TERMS.
                </LegalP>
                <LegalP>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL
                    BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL
                    OR PUNITIVE DAMAGES, OR LOST PROFITS, REVENUE OR DATA; AND
                    OUR AGGREGATE LIABILITY UNDER THESE TERMS IS CAPPED AT THE
                    AMOUNTS YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM (OR US
                    $100 IF YOU PAID NOTHING). THESE LIMITS DO NOT APPLY WHERE
                    THEY CANNOT LAWFULLY BE LIMITED.
                </LegalP>
            </>
        ),
    },
    {
        id: "termination",
        title: "Termination",
        body: (
            <LegalP>
                You may stop using the Services and delete your workspace at any
                time. We may suspend or terminate the Services for material
                breach that remains uncured 14 days after notice, for unlawful
                use immediately, or if we discontinue the Services (with at
                least 90 days&apos; notice and a pro-rata refund of prepaid
                fees). Upon termination you may export your data for 30 days,
                after which it is deleted per our{" "}
                <Link
                    href="/privacy"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                >
                    Privacy Policy
                </Link>
                . Sections that by their nature should survive (content
                ownership, disclaimers, liability limits, governing law)
                survive.
            </LegalP>
        ),
    },
    {
        id: "general",
        title: "Governing law, changes and contact",
        body: (
            <>
                <LegalP>
                    These Terms are governed by the laws of the State of
                    California, excluding its conflict-of-law rules; exclusive
                    venue lies in the state and federal courts of San Francisco
                    County, and each party waives jury trial. If any provision
                    is unenforceable, the rest remains in effect. Our failure to
                    enforce a provision is not a waiver.
                </LegalP>
                <LegalP>
                    We may update these Terms as the Services evolve; material
                    changes are notified to workspace admins at least 30 days in
                    advance, and continued use after the effective date
                    constitutes acceptance. Questions about these Terms:{" "}
                    <a
                        href="mailto:legal@tapotik.ai"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        legal@tapotik.ai
                    </a>{" "}
                    · Tapotik AI, Inc., 548 Market Street, San Francisco, CA
                    94104, USA.
                </LegalP>
            </>
        ),
    },
];

export default function TermsPage() {
    return (
        <>
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
                <AuroraBackground intensity="subtle" />
                <div className="relative container-wide">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <Badge
                            variant="glow"
                            className="tracking-widest uppercase"
                        >
                            <ScaleIcon className="size-3" />
                            Legal
                        </Badge>
                        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Terms of{" "}
                            <span className="text-gradient">Service</span>
                        </h1>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Last updated: June 1, 2025
                        </p>
                        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                            The agreement between you and Tapotik AI. Written to
                            be read: plain language where the law allows,
                            capital letters only where it doesn&apos;t.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-12 xl:max-w-5xl xl:grid-cols-[240px_minmax(0,1fr)]">
                        <aside className="hidden xl:block">
                            <nav
                                aria-label="Table of contents"
                                className="sticky top-28 rounded-2xl p-5 glass"
                            >
                                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                                    On this page
                                </p>
                                <ul className="mt-3 space-y-1">
                                    {sections.map((section, i) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="flex gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-snug text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                                            >
                                                <span className="font-mono text-primary/70">
                                                    {String(i + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                                {section.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>

                        <div className="max-w-3xl min-w-0 space-y-12">
                            {sections.map((section, i) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-32"
                                >
                                    <h2 className="flex items-baseline gap-3 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                                        <span
                                            aria-hidden
                                            className="font-mono text-sm text-primary/70"
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {section.title}
                                    </h2>
                                    <div className="mt-4 space-y-4">
                                        {section.body}
                                    </div>
                                </section>
                            ))}

                            <div className="rounded-2xl p-6 glass">
                                <p className="text-sm font-semibold">Related</p>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                    See also our{" "}
                                    <Link
                                        href="/privacy"
                                        className="font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>{" "}
                                    and current plan details on the{" "}
                                    <Link
                                        href="/pricing"
                                        className="font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        pricing page
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
