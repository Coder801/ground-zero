"use client";

import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

import { FixedSizeChart } from "@/components/effects/fixed-size-chart";
import { brandHex } from "@/lib/brand-colors";

const chartData = [
    { name: "Mon", requests: 24000, tokens: 18000 },
    { name: "Tue", requests: 32000, tokens: 24500 },
    { name: "Wed", requests: 28500, tokens: 22000 },
    { name: "Thu", requests: 41000, tokens: 33000 },
    { name: "Fri", requests: 38000, tokens: 30500 },
    { name: "Sat", requests: 29500, tokens: 21000 },
    { name: "Sun", requests: 45500, tokens: 37000 },
];

// Homepage dashboard-preview area chart in its own 'use client' module to keep
// dashboard-preview.tsx lean. Recharts tree-shaken via optimizePackageImports.
export function DashboardChart() {
    return (
        <FixedSizeChart>
            {({ width, height }) => (
                <AreaChart
                    width={width}
                    height={height}
                    data={chartData}
                    margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="g-req" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor={brandHex.primary}
                                stopOpacity={0.5}
                            />
                            <stop
                                offset="100%"
                                stopColor={brandHex.primary}
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient id="g-tok" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor={brandHex.accent}
                                stopOpacity={0.35}
                            />
                            <stop
                                offset="100%"
                                stopColor={brandHex.accent}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 11,
                            fill: "var(--muted-foreground)",
                        }}
                        dy={6}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 11,
                            fill: "var(--muted-foreground)",
                        }}
                        tickFormatter={(v: number) =>
                            `${Math.round(v / 1000)}k`
                        }
                    />
                    <Tooltip
                        cursor={{ stroke: "var(--border)" }}
                        contentStyle={{
                            background: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: "var(--popover-foreground)",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="requests"
                        stroke={brandHex.primary}
                        strokeWidth={2}
                        fill="url(#g-req)"
                    />
                    <Area
                        type="monotone"
                        dataKey="tokens"
                        stroke={brandHex.accent}
                        strokeWidth={2}
                        fill="url(#g-tok)"
                    />
                </AreaChart>
            )}
        </FixedSizeChart>
    );
}
