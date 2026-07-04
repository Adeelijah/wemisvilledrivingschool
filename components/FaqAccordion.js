"use client";

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y-2 divide-ink border-2 border-ink">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className="font-display text-base uppercase tracking-wide text-ink md:text-lg">{item.q}</span>
              <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-ink font-plate text-sm transition-transform ${isOpen ? "rotate-45 bg-signal" : ""}`}>
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-slate">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
