"use client";

import Image from "next/image";

export function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const dimensions = size === "small" ? 64 : 96;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src="/images/logo-bio-lens.png"
        alt="Bio Lens - Logo"
        width={dimensions}
        height={dimensions}
        className="object-contain"
        priority
      />
      <span className="text-white text-lg font-medium tracking-wide">Bio Lens</span>
    </div>
  );
}
