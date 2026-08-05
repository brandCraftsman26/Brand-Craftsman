"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HeatmapTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't track admin pages to reduce noise
      if (pathname?.startsWith("/admin")) return;

      const x_pos = e.clientX;
      const y_pos = e.clientY + window.scrollY;
      const target = e.target as HTMLElement;
      const element_tag = target?.tagName || "UNKNOWN";

      try {
        fetch("/api/analytics/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "click",
            path: pathname,
            x_pos: Math.round(x_pos),
            y_pos: Math.round(y_pos),
            element_tag,
            metadata: {
              className: target?.className ? String(target.className).slice(0, 100) : "",
              text: target?.innerText ? String(target.innerText).slice(0, 50) : "",
            },
          }),
        }).catch(() => {});
      } catch {}
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
