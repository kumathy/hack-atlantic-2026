"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { TbX } from "react-icons/tb";

/* Overlay, Escape-to-close, scroll lock and focus handling for popups. */
export default function Modal({
  isOpen,
  onClose,
  labelledBy,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  /** id of the heading that names the dialog */
  labelledBy: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleEscape = useEffectEvent(() => onClose());

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleEscape();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3d2314]/45 p-4 backdrop-blur-sm fade-in"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl border-2 border-[#f5d4b0] bg-[#fef3e8] p-8 text-center shadow-2xl outline-none modal-in"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl font-bold text-[#a0673a] transition-colors hover:text-[#c94a1a]"
        >
          <TbX aria-hidden />
        </button>
        {children}
      </div>
    </div>
  );
}
