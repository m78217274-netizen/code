"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4">
      {faqs.map((item, index) => (
        <div key={item.question} className="rounded-lg border border-line bg-white dark:border-white/10 dark:bg-white/5">
          <button
            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading font-bold text-navy dark:text-white"
            onClick={() => setActive(active === index ? -1 : index)}
            aria-expanded={active === index}
          >
            {item.question}
            <ChevronDown className={cn("shrink-0 transition", active === index && "rotate-180")} size={20} />
          </button>
          {active === index ? (
            <p className="px-5 pb-5 leading-7 text-muted dark:text-slate-300">{item.answer}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
