"use client";

import { useState } from "react";
import { TbBell, TbBellRinging, TbCircleCheck, TbLoader2 } from "react-icons/tb";
import Modal from "@/components/modal";
import { subscribeToAlerts, type SubscribeResult } from "@/lib/alerts";

type Status = "idle" | "submitting" | SubscribeResult | "error";

export default function SubscribeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="alerts-heading">
      {/* Unmounts on close, so the form starts fresh each time it opens. */}
      <SubscribeForm onClose={onClose} />
    </Modal>
  );
}

function SubscribeForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      setStatus(await subscribeToAlerts(email.trim()));
    } catch {
      setStatus("error");
    }
  }

  if (status === "subscribed" || status === "already-subscribed") {
    return (
      <>
        <TbCircleCheck
          aria-hidden
          className="block text-6xl mb-4 mx-auto text-[#c94a1a]"
        />
        <h2
          id="alerts-heading"
          className="font-display font-black text-3xl text-[#c94a1a] mb-3"
        >
          {status === "subscribed" ? "You're subscribed" : "Already subscribed"}
        </h2>
        <p className="text-sm text-[#8a5530] mb-6">
          {status === "subscribed"
            ? "We'll email you the next time a truck hits the bridge."
            : "This email is already on the list. You're all set."}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 bg-[#ff6b35] text-white font-bold rounded-full hover:bg-[#e85a24] transition-colors text-sm"
        >
          Done
        </button>
      </>
    );
  }

  return (
    <>
      <TbBellRinging
        aria-hidden
        className="block text-5xl mb-3 mx-auto text-[#c94a1a]"
      />
      <h2
        id="alerts-heading"
        className="font-display font-black text-3xl text-[#c94a1a] mb-2"
      >
        Get Incident Alerts
      </h2>
      <p className="text-sm text-[#8a5530] mb-6">
        We&rsquo;ll email you when a truck hits the bridge.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="alerts-email" className="sr-only">
          Email address
        </label>
        <input
          id="alerts-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-white border-2 border-[#f5d4b0] rounded-xl px-4 py-3 text-sm text-[#3d2314] placeholder-[#b8906a] focus:outline-none focus:border-[#ff6b35] transition-colors"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#ff6b35] text-white font-bold rounded-full hover:bg-[#e85a24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <TbLoader2 aria-hidden className="animate-spin" />
          ) : (
            <TbBell aria-hidden />
          )}
          Notify me
        </button>
      </form>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-[#c94a1a]">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="mt-4 text-xs text-[#8a5530]">
        Only used for incident alerts. Unsubscribe anytime.
      </p>
    </>
  );
}
