"use client";

import { useState } from "react";
import {
    CameraIcon,
    CheckIcon,
    CopyIcon,
    KeyRoundIcon,
    PlusIcon,
    Trash2Icon,
    TriangleAlertIcon,
    UserPlusIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { copyWithToast } from "@/lib/clipboard";

const timezones = [
    "Pacific Time (UTC−8)",
    "Eastern Time (UTC−5)",
    "London (UTC+0)",
    "Berlin (UTC+1)",
    "Mumbai (UTC+5:30)",
    "Singapore (UTC+8)",
    "Tokyo (UTC+9)",
];

function ProfileTab() {
    return (
        <div className="max-w-2xl space-y-6">
            <div className="rounded-2xl border bg-card p-5 lg:p-6">
                <h3 className="font-heading text-base font-semibold">
                    Profile
                </h3>
                <p className="text-xs text-muted-foreground">
                    How you appear across the workspace
                </p>

                <div className="mt-6 flex items-center gap-5">
                    <Avatar className="size-20 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
                        <AvatarFallback className="text-xl">AK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    toast.info(
                                        "Avatar upload is a demo in this template",
                                    )
                                }
                            >
                                <CameraIcon className="size-3.5" />
                                Change
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground"
                                onClick={() =>
                                    toast.info(
                                        "Avatar removed — using initials",
                                    )
                                }
                            >
                                Remove
                            </Button>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                            PNG or JPG, at least 256×256px
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="profile-name">Full name</Label>
                        <Input id="profile-name" defaultValue="Alex Kim" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="profile-email">Email</Label>
                        <Input
                            id="profile-email"
                            type="email"
                            defaultValue="alex@lumina.dev"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="profile-role">Role</Label>
                        <Input id="profile-role" defaultValue="Head of AI" />
                    </div>
                    <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue={timezones[0]}>
                            <SelectTrigger
                                className="w-full"
                                aria-label="Timezone"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {timezones.map((tz) => (
                                    <SelectItem key={tz} value={tz}>
                                        {tz}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-end">
                    <Button
                        variant="gradient"
                        onClick={() => toast.success("Profile saved")}
                    >
                        Save changes
                    </Button>
                </div>
            </div>
        </div>
    );
}

type Member = {
    name: string;
    email: string;
    initials: string;
    role: "Owner" | "Admin" | "Member";
};

const initialMembers: Member[] = [
    {
        name: "Alex Kim",
        email: "alex@lumina.dev",
        initials: "AK",
        role: "Owner",
    },
    {
        name: "Sarah Chen",
        email: "sarah@lumina.dev",
        initials: "SC",
        role: "Admin",
    },
    {
        name: "Marcus Rivera",
        email: "marcus@lumina.dev",
        initials: "MR",
        role: "Member",
    },
    {
        name: "Aisha Patel",
        email: "aisha@lumina.dev",
        initials: "AP",
        role: "Member",
    },
    {
        name: "Tom Okafor",
        email: "tom@lumina.dev",
        initials: "TO",
        role: "Member",
    },
];

function WorkspaceTab() {
    const [members, setMembers] = useState(initialMembers);
    const [invite, setInvite] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);

    function sendInvite() {
        if (!invite.trim() || !invite.includes("@")) {
            toast.error("Enter a valid email to invite");
            return;
        }
        toast.success("Invite sent", { description: invite });
        setInvite("");
    }

    return (
        <div className="max-w-3xl space-y-6">
            <div className="rounded-2xl border bg-card p-5 lg:p-6">
                <h3 className="font-heading text-base font-semibold">
                    Workspace
                </h3>
                <p className="text-xs text-muted-foreground">
                    Shared settings for everyone in Lumina Labs
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="ws-name">Workspace name</Label>
                        <Input id="ws-name" defaultValue="Lumina Labs" />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => toast.success("Workspace name updated")}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <div className="rounded-2xl border bg-card">
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6 lg:pb-4">
                    <div>
                        <h3 className="font-heading text-base font-semibold">
                            Members
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {members.length} of 10 seats used on the Pro plan
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={invite}
                            onChange={(e) => setInvite(e.target.value)}
                            placeholder="teammate@company.com"
                            className="h-9 w-full sm:w-56"
                            aria-label="Invite email"
                            onKeyDown={(e) => e.key === "Enter" && sendInvite()}
                        />
                        <Button
                            variant="gradient"
                            size="sm"
                            className="h-9"
                            onClick={sendInvite}
                        >
                            <UserPlusIcon className="size-3.5" />
                            Invite
                        </Button>
                    </div>
                </div>
                <div className="border-t">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-5 lg:pl-6">
                                    Member
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="pr-5 text-right lg:pr-6">
                                    Remove
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((m) => (
                                <TableRow key={m.email}>
                                    <TableCell className="pl-5 lg:pl-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-8">
                                                <AvatarFallback className="text-[10px]">
                                                    {m.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">
                                                {m.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {m.email}
                                    </TableCell>
                                    <TableCell>
                                        {m.role === "Owner" ? (
                                            <Badge
                                                variant="glow"
                                                className="px-2 py-0.5 text-[10px]"
                                            >
                                                Owner
                                            </Badge>
                                        ) : (
                                            <Select
                                                defaultValue={m.role}
                                                onValueChange={(role) =>
                                                    toast.success(
                                                        `${m.name} is now ${role}`,
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    size="sm"
                                                    className="h-8 w-28 text-xs"
                                                    aria-label={`Role for ${m.name}`}
                                                >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Admin">
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="Member">
                                                        Member
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </TableCell>
                                    <TableCell className="pr-5 text-right lg:pr-6">
                                        {m.role !== "Owner" && (
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                aria-label={`Remove ${m.name}`}
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => {
                                                    setMembers((prev) =>
                                                        prev.filter(
                                                            (x) =>
                                                                x.email !==
                                                                m.email,
                                                        ),
                                                    );
                                                    toast.success(
                                                        `${m.name} removed from workspace`,
                                                    );
                                                }}
                                            >
                                                <Trash2Icon className="size-3.5" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 lg:p-6">
                <h3 className="flex items-center gap-2 font-heading text-base font-semibold text-destructive">
                    <TriangleAlertIcon className="size-4" />
                    Danger zone
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                    Deleting the workspace removes all members, agents, API keys
                    and generation history. This cannot be undone.
                </p>
                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="mt-4"
                        >
                            Delete workspace
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete “Lumina Labs”?</DialogTitle>
                            <DialogDescription>
                                All {members.length} member
                                {members.length === 1 ? "" : "s"} will lose
                                access immediately and 1,284 agent runs of
                                history will be erased. There is no undo.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => setDeleteOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setDeleteOpen(false);
                                    toast.error(
                                        "Workspace deletion is disabled in the demo",
                                    );
                                }}
                            >
                                Yes, delete everything
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

type ApiKey = {
    name: string;
    masked: string;
    created: string;
    lastUsed: string;
};

const initialKeys: ApiKey[] = [
    {
        name: "Production",
        masked: "tp_live_••••4821",
        created: "Mar 2, 2026",
        lastUsed: "2m ago",
    },
    {
        name: "Staging",
        masked: "tp_test_••••9034",
        created: "Apr 18, 2026",
        lastUsed: "1h ago",
    },
    {
        name: "CI pipeline",
        masked: "tp_live_••••1177",
        created: "May 25, 2026",
        lastUsed: "Yesterday",
    },
];

const scopes = [
    { id: "chat", label: "Chat completions" },
    { id: "images", label: "Image generation" },
    { id: "voice", label: "Voice synthesis" },
    { id: "agents", label: "Agent runs" },
];

function ApiKeysTab() {
    const [keys, setKeys] = useState(initialKeys);
    const [createOpen, setCreateOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [selectedScopes, setSelectedScopes] = useState<string[]>(["chat"]);
    const [revealedKey, setRevealedKey] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    function createKey() {
        if (!newName.trim()) {
            toast.error("Give the key a name");
            return;
        }
        if (selectedScopes.length === 0) {
            toast.error("Select at least one scope");
            return;
        }
        setRevealedKey("tp_live_9fK3xQm7Ln2wPzR8vT4bH6dY1sC5aE0j");
    }

    function finishCreate() {
        setKeys((prev) => [
            {
                name: newName.trim(),
                masked:
                    "tp_live_••••" +
                    revealedKey!.slice(-4).replace(/[^0-9]/g, "0"),
                created: "Just now",
                lastUsed: "Never",
            },
            ...prev,
        ]);
        setCreateOpen(false);
        setRevealedKey(null);
        setNewName("");
        setSelectedScopes(["chat"]);
        setCopied(false);
        toast.success("API key created");
    }

    return (
        <div className="max-w-3xl space-y-6">
            <div className="rounded-2xl border bg-card">
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6 lg:pb-4">
                    <div>
                        <h3 className="font-heading text-base font-semibold">
                            API keys
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Authenticate requests to the Tapotik API
                        </p>
                    </div>
                    <Dialog
                        open={createOpen}
                        onOpenChange={(o) => {
                            setCreateOpen(o);
                            if (!o) {
                                setRevealedKey(null);
                                setCopied(false);
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button variant="gradient" size="sm">
                                <PlusIcon className="size-3.5" />
                                Create key
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            {revealedKey === null ? (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Create API key
                                        </DialogTitle>
                                        <DialogDescription>
                                            Scoped keys limit blast radius —
                                            grant only what this integration
                                            needs.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="key-name">
                                                Key name
                                            </Label>
                                            <Input
                                                id="key-name"
                                                value={newName}
                                                onChange={(e) =>
                                                    setNewName(e.target.value)
                                                }
                                                placeholder="e.g. Vercel deployment"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label>Scopes</Label>
                                            {scopes.map((scope) => (
                                                <div
                                                    key={scope.id}
                                                    className="flex items-center gap-2.5"
                                                >
                                                    <Checkbox
                                                        id={`scope-${scope.id}`}
                                                        checked={selectedScopes.includes(
                                                            scope.id,
                                                        )}
                                                        onCheckedChange={(v) =>
                                                            setSelectedScopes(
                                                                (prev) =>
                                                                    v === true
                                                                        ? [
                                                                              ...prev,
                                                                              scope.id,
                                                                          ]
                                                                        : prev.filter(
                                                                              (
                                                                                  s,
                                                                              ) =>
                                                                                  s !==
                                                                                  scope.id,
                                                                          ),
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={`scope-${scope.id}`}
                                                        className="cursor-pointer text-sm font-normal"
                                                    >
                                                        {scope.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setCreateOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="gradient"
                                            onClick={createKey}
                                        >
                                            <KeyRoundIcon className="size-4" />
                                            Create key
                                        </Button>
                                    </DialogFooter>
                                </>
                            ) : (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Copy your key now
                                        </DialogTitle>
                                        <DialogDescription>
                                            For security, this is the{" "}
                                            <span className="font-semibold text-foreground">
                                                only time
                                            </span>{" "}
                                            the full key is shown.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex items-center gap-2 rounded-xl border bg-muted/50 p-3">
                                        <code className="min-w-0 flex-1 truncate font-mono text-xs">
                                            {revealedKey}
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            aria-label="Copy key"
                                            onClick={async () => {
                                                const ok = await copyWithToast(
                                                    revealedKey!,
                                                    {
                                                        success:
                                                            "Key copied to clipboard",
                                                        error: "Couldn't copy — select the key and copy it manually",
                                                    },
                                                );
                                                if (ok) setCopied(true);
                                            }}
                                        >
                                            {copied ? (
                                                <CheckIcon className="size-3.5 text-success" />
                                            ) : (
                                                <CopyIcon className="size-3.5" />
                                            )}
                                        </Button>
                                    </div>
                                    <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3">
                                        <TriangleAlertIcon className="mt-0.5 size-4 shrink-0 text-warning" />
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            Store it in a secret manager. Anyone
                                            with this key can spend your credits
                                            within its scopes:{" "}
                                            <span className="font-mono">
                                                {selectedScopes.join(", ")}
                                            </span>
                                            .
                                        </p>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="gradient"
                                            onClick={finishCreate}
                                        >
                                            I&apos;ve stored it safely
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="border-t">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-5 lg:pl-6">
                                    Name
                                </TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Last used</TableHead>
                                <TableHead className="pr-5 text-right lg:pr-6">
                                    Revoke
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {keys.map((k) => (
                                <TableRow key={k.masked + k.name}>
                                    <TableCell className="pl-5 text-sm font-medium lg:pl-6">
                                        {k.name}
                                    </TableCell>
                                    <TableCell>
                                        <code className="rounded-sm bg-muted px-2 py-1 font-mono text-xs">
                                            {k.masked}
                                        </code>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {k.created}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {k.lastUsed}
                                    </TableCell>
                                    <TableCell className="pr-5 text-right lg:pr-6">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs text-muted-foreground hover:text-destructive"
                                            onClick={() => {
                                                setKeys((prev) =>
                                                    prev.filter(
                                                        (x) =>
                                                            x.masked !==
                                                            k.masked,
                                                    ),
                                                );
                                                toast.success(
                                                    `“${k.name}” revoked`,
                                                );
                                            }}
                                        >
                                            Revoke
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-primary">Tip:</span>{" "}
                    rotate production keys quarterly. Requests signed with
                    revoked keys return{" "}
                    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                        401 key_revoked
                    </code>{" "}
                    within 60 seconds globally.
                </p>
            </div>
        </div>
    );
}

const notificationRows = [
    {
        id: "product",
        title: "Product updates",
        description: "New models, features and improvements",
    },
    {
        id: "usage",
        title: "Usage alerts",
        description: "When you cross 50 / 80 / 100% of credits",
    },
    {
        id: "failures",
        title: "Agent failures",
        description: "A run fails or needs human review",
    },
    {
        id: "digest",
        title: "Weekly digest",
        description: "Monday summary of workspace activity",
    },
];

function NotificationsTab() {
    const [prefs, setPrefs] = useState<
        Record<string, { email: boolean; inapp: boolean }>
    >({
        product: { email: true, inapp: true },
        usage: { email: true, inapp: true },
        failures: { email: true, inapp: false },
        digest: { email: false, inapp: true },
    });

    function toggle(id: string, channel: "email" | "inapp", value: boolean) {
        setPrefs((prev) => ({
            ...prev,
            [id]: { ...prev[id], [channel]: value },
        }));
    }

    return (
        <div className="max-w-2xl">
            <div className="rounded-2xl border bg-card">
                <div className="p-5 lg:p-6 lg:pb-4">
                    <h3 className="font-heading text-base font-semibold">
                        Notifications
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Choose how each event reaches you
                    </p>
                </div>

                <div className="border-t">
                    <div className="flex items-center gap-4 px-5 py-3 lg:px-6">
                        <span className="flex-1" />
                        <span className="w-14 text-center text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                            Email
                        </span>
                        <span className="w-14 text-center text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                            In-app
                        </span>
                    </div>

                    {notificationRows.map((row, i) => (
                        <div
                            key={row.id}
                            className={cn(
                                "flex items-center gap-4 px-5 py-4 lg:px-6",
                                i !== notificationRows.length - 1 && "border-b",
                            )}
                        >
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">
                                    {row.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {row.description}
                                </p>
                            </div>
                            <div className="flex w-14 justify-center">
                                <Switch
                                    checked={prefs[row.id].email}
                                    onCheckedChange={(v) =>
                                        toggle(row.id, "email", v)
                                    }
                                    aria-label={`${row.title} via email`}
                                />
                            </div>
                            <div className="flex w-14 justify-center">
                                <Switch
                                    checked={prefs[row.id].inapp}
                                    onCheckedChange={(v) =>
                                        toggle(row.id, "inapp", v)
                                    }
                                    aria-label={`${row.title} in-app`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end border-t p-4 px-5 lg:px-6">
                    <Button
                        variant="gradient"
                        size="sm"
                        onClick={() =>
                            toast.success("Notification preferences saved")
                        }
                    >
                        Save preferences
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function SettingsClient() {
    return (
        <div className="mx-auto w-full max-w-350 space-y-6 p-4 sm:p-6 lg:p-8">
            <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    Settings
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your profile, workspace, keys and notifications.
                </p>
            </div>

            <Tabs defaultValue="profile" className="gap-6">
                <TabsList className="no-scrollbar w-full max-w-full justify-start overflow-x-auto sm:w-fit">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="workspace">Workspace</TabsTrigger>
                    <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileTab />
                </TabsContent>
                <TabsContent value="workspace">
                    <WorkspaceTab />
                </TabsContent>
                <TabsContent value="api-keys">
                    <ApiKeysTab />
                </TabsContent>
                <TabsContent value="notifications">
                    <NotificationsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
