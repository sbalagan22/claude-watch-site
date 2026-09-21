"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Privacy-preserving analytics beacon.
 * Never sets cookies, never collects IP addresses, never tracks across sites.
 * Complies with GDPR, CCPA, and PECR without requiring a consent banner.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only log in production or if debug flag is set
    if (typeof window === "undefined") return;

    const data = {
      path: pathname,
      referrer: document.referrer || null,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: Date.now(),
    };

    // For privacy-first self-hosted endpoints or local dispatch
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ANALYTICS_URL) {
      navigator.sendBeacon?.(process.env.NEXT_PUBLIC_ANALYTICS_URL, JSON.stringify(data));
    }
  }, [pathname]);

  return null;
}
