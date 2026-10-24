"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailLink, whatsappLink } from "@/lib/order";
import { SITE } from "@/lib/site";

const units = ["kg", "fish"] as const;
const days = ["Today", "Tomorrow", "This weekend"] as const;
const quick = ["2", "5", "10"] as const;

const field = "h-12 rounded-xl border-border bg-card px-4 text-base shadow-none focus-visible:ring-2 focus-visible:ring-primary";
const chip = (on: boolean) =>
  `type-label h-10 rounded-full border px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
    on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"
  }`;
const action = "type-label inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * Builds a complete WhatsApp or email request as the visitor fills it in.
 * Nothing is sent from here: the buttons open the visitor's own WhatsApp, mail app or phone.
 */
export function LiveFishOrder() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<(typeof units)[number]>("kg");
  const [day, setDay] = useState<string>("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");

  const when = date || day;
  const lines = ["Hello KRIL, I would like to order live fish."];
  if (amount.trim()) lines.push(`How much: ${amount.trim()} ${unit}`);
  if (when) lines.push(`When: ${when}`);
  if (place.trim()) lines.push(`Delivery location: ${place.trim()}`);
  if (name.trim()) lines.push(`Name: ${name.trim()}`);
  const message = lines.join("\n");
  const filled = lines.length - 1;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
      <form onSubmit={(e) => e.preventDefault()} className="grid content-start gap-7 p-5 sm:p-8 lg:p-10">
        <div className="space-y-2">
          <Label htmlFor="fish-amount" className="type-label">How much fish</Label>
          <div className="flex gap-2">
            <Input
              id="fish-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="For example, 5"
              autoComplete="off"
              className={field}
            />
            <div role="group" aria-label="Unit" className="flex shrink-0 rounded-full border border-border bg-card p-1">
              {units.map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={unit === u}
                  onClick={() => setUnit(u)}
                  className={`type-label rounded-full px-4 transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                    unit === u ? "bg-primary text-primary-foreground" : "hover:bg-foreground/5"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {quick.map((q) => (
              <button key={q} type="button" aria-pressed={amount.trim() === q} onClick={() => setAmount(amount.trim() === q ? "" : q)} className={chip(amount.trim() === q)}>
                {q} {unit}
              </button>
            ))}
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="type-label mb-2">When you need it</legend>
          <div className="flex flex-wrap items-center gap-2">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={day === d && !date}
                onClick={() => {
                  setDate("");
                  setDay(day === d ? "" : d);
                }}
                className={chip(day === d && !date)}
              >
                {d}
              </button>
            ))}
            <Label htmlFor="fish-date" className="sr-only">Choose a date</Label>
            <Input
              id="fish-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 w-auto rounded-full border-border bg-card px-4 shadow-none"
            />
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fish-place" className="type-label">Delivery location</Label>
            <Input id="fish-place" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Your town or area" autoComplete="off" className={field} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fish-name" className="type-label">Your name</Label>
            <Input id="fish-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" autoComplete="off" className={field} />
          </div>
        </div>
      </form>

      <div className="border-t border-border bg-secondary p-5 sm:p-8 lg:p-10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="type-label text-muted-foreground">Your message to KRIL</p>
          <p className="type-label text-muted-foreground">
            {filled === 0 ? "Add details above" : `${filled} of 4 details added`}
          </p>
        </div>
        <div className="mt-3 max-w-xl rounded-2xl rounded-tl-md bg-card p-5" aria-live="polite">
          {lines.map((l) => (
            <p key={l} className="type-body break-words">{l}</p>
          ))}
        </div>
        <p className="type-label mt-3 text-muted-foreground">Anything you leave out, we will ask.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={`${action} bg-primary text-primary-foreground hover:opacity-90`}>
            <MessageCircle className="size-4" aria-hidden /> Send on WhatsApp
          </a>
          <a href={emailLink(message)} className={`${action} border border-primary/30 hover:bg-primary/5`}>
            <Mail className="size-4" aria-hidden /> Email
          </a>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className={`${action} border border-primary/30 hover:bg-primary/5`}>
            <Phone className="size-4" aria-hidden /> Call
          </a>
        </div>
      </div>
    </div>
  );
}
