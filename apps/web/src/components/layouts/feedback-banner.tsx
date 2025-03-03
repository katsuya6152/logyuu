"use client";

import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import Image from "next/image";
import Link from "next/link";

export default function FeedbackBanner() {
  const isVisible = useScrollVisibility(10);

  return (
    <div
      className={`fixed bottom-0 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Link href="https://forms.gle/Lh8hk5HiDXFu4ymp8" target="_blank">
        <Image
          src="/feedback-banner.png"
          alt="banner"
          width={1560}
          height={280}
        />
      </Link>
    </div>
  );
}
