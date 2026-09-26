"use client";

import { useState } from "react";
import ReportModal from "@/components/report-modal";

/* Lets server-rendered pages open the report modal. */
export default function ReportButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>
      <ReportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
