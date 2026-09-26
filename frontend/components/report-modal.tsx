"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  TbCameraPlus,
  TbCircleCheck,
  TbClipboardText,
  TbLoader2,
  TbSend,
  TbX,
} from "react-icons/tb";

type FormState = "idle" | "submitting" | "success";

export default function ReportModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [previews, setPreviews] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reads the latest state without re-running the effect below, so the dialog
  // isn't re-focused (stealing focus from the inputs) on every re-render.
  const handleEscape = useEffectEvent(() => {
    if (formState === "submitting") return;
    if (formState === "success") resetForm();
    onClose();
  });

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleEscape();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Move focus into the dialog when it opens and when it swaps to the success view.
  const isSuccess = formState === "success";
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen, isSuccess]);

  // Blob URLs from the file picker leak until they're revoked. Revoke only the
  // ones being dropped, plus whatever is left when the modal unmounts.
  const previewsRef = useRef(previews);
  previewsRef.current = previews;
  useEffect(() => {
    return () => previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const slots = 5 - previews.length;
    if (slots <= 0) return;
    const urls = Array.from(files)
      .slice(0, slots)
      .map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...urls]);
  }

  function removePreview(index: number) {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, j) => j !== index));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
  }

  function resetForm() {
    setFormState("idle");
    setForm({ name: "", email: "", description: "" });
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews([]);
  }

  function closeAfterSuccess() {
    resetForm();
    onClose();
  }

  if (!isOpen) return null;

  if (formState === "success") {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3d2314]/45 p-4 backdrop-blur-sm"
        onMouseDown={closeAfterSuccess}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-success-title"
          tabIndex={-1}
          onMouseDown={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl border-2 border-[#f5d4b0] bg-[#fef3e8] p-8 text-center shadow-2xl outline-none bounce-in"
        >
          <button
            type="button"
            onClick={closeAfterSuccess}
            aria-label="Close report dialog"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-[#a0673a] transition-colors hover:text-[#c94a1a]"
          >
            <TbX aria-hidden />
          </button>
          <TbCircleCheck
            aria-hidden
            className="block text-6xl mb-4 mx-auto text-[#c94a1a]"
          />
          <h2
            id="report-success-title"
            className="font-display font-black text-3xl text-[#c94a1a] mb-3"
          >
            Report received!
          </h2>
          <p className="text-[#a0673a] text-sm leading-relaxed">
            Thanks for your report. We&rsquo;ll review it and update the
            timeline.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              onClick={resetForm}
              className="px-6 py-2.5 bg-[#ff6b35] text-white font-bold rounded-full hover:bg-[#e85a24] transition-colors text-sm"
            >
              Submit another report
            </button>
            <button
              onClick={closeAfterSuccess}
              className="px-6 py-2.5 bg-white border-2 border-[#f5d4b0] text-[#c94a1a] font-bold rounded-full hover:border-[#ff6b35] transition-colors text-sm"
            >
              Back to counter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3d2314]/45 p-4 backdrop-blur-sm"
      onMouseDown={formState === "submitting" ? undefined : onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-dialog-title"
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-3xl border-2 border-[#f5d4b0] bg-[#fef3e8] p-6 shadow-2xl outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={formState === "submitting"}
          aria-label="Close report dialog"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-[#a0673a] transition-colors hover:text-[#c94a1a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <TbX aria-hidden />
        </button>

        <div className="text-center mb-8 px-8">
          <TbClipboardText
            aria-hidden
            className="block text-5xl mb-3 mx-auto text-[#c94a1a]"
          />
          <h2
            id="report-dialog-title"
            className="font-display font-black text-4xl text-[#c94a1a] mb-2"
          >
            Report an Incident
          </h2>
          <p className="text-[#a0673a] text-sm leading-relaxed max-w-xs mx-auto">
            Saw a truck hit the overpass? Send us the details and any
            photos you took.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="report-name"
              className="block text-xs font-bold uppercase tracking-widest text-[#a0673a] mb-1.5"
            >
              Your Name <span className="text-[#ff6b35]">*</span>
            </label>
            <input
              required
              id="report-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className="w-full bg-white border-2 border-[#f5d4b0] rounded-xl px-4 py-3 text-sm text-[#3d2314] placeholder-[#d4b090] focus:outline-none focus:border-[#ff6b35] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="report-email"
              className="block text-xs font-bold uppercase tracking-widest text-[#a0673a] mb-1.5"
            >
              Email Address <span className="text-[#ff6b35]">*</span>
            </label>
            <input
              required
              id="report-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-white border-2 border-[#f5d4b0] rounded-xl px-4 py-3 text-sm text-[#3d2314] placeholder-[#d4b090] focus:outline-none focus:border-[#ff6b35] transition-colors"
            />
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#a0673a] mb-1.5">
              Photos{" "}
              <span className="text-[#c4916a] font-normal normal-case tracking-normal">
                (optional, up to 5)
              </span>
            </span>
            <div
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileRef.current?.click()}
              className={`
                rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all
                ${
                  isDragging
                    ? "border-[#ff6b35] bg-[#fff0e8]"
                    : "border-[#f5d4b0] hover:border-[#ff6b35] hover:bg-[#fff8f3]"
                }
              `}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <TbCameraPlus
                aria-hidden
                className="block text-2xl mb-1 mx-auto text-[#c4916a]"
              />
              <p className="text-xs text-[#c4916a]">
                Drop photos here or click to upload
              </p>
            </div>

            {previews.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {previews.map((src, i) => (
                  <div
                    key={src}
                    className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#f5d4b0]"
                  >
                    {/* Blob URL from the file picker — next/image can't optimize these. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      aria-label={`Remove photo ${i + 1}`}
                      className="absolute top-1 right-1 bg-white/90 rounded-full w-5 h-5 text-xs flex items-center justify-center text-[#c94a1a] font-bold hover:bg-white transition-colors leading-none"
                    >
                      <TbX aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="report-description"
              className="block text-xs font-bold uppercase tracking-widest text-[#a0673a] mb-1.5"
            >
              What happened? <span className="text-[#ff6b35]">*</span>
            </label>
            <textarea
              required
              id="report-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="When did it happen? What kind of truck was it? Was the road closed?"
              className="w-full bg-white border-2 border-[#f5d4b0] rounded-xl px-4 py-3 text-sm text-[#3d2314] placeholder-[#d4b090] focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#ff6b35] text-white font-black rounded-full text-sm uppercase tracking-widest hover:bg-[#e85a24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {formState === "submitting" ? (
              <>
                <TbLoader2 aria-hidden className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <TbSend aria-hidden />
                Submit Report
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
