"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/bio-lens/Sidebar";

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            router.push("/dashboard");
            // ou:
            // router.push("/analysis/1");
          }, 500);

          return 100;
        }

        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [router]);

  const radius = 140;
  const stroke = 28;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar
        showUser
        userName="Maria"
        showLogout
      />

      <main className="flex-1 flex flex-col items-center py-14">
        <h1 className="text-4xl font-bold text-[#111827] mb-20">
          Nova Análise
        </h1>

        <p className="font-semibold text-lg mb-10">
          Analisando imagem....
        </p>

        <div className="relative w-[340px] h-[340px]">
          <svg
            width="340"
            height="340"
            className="-rotate-90"
          >
            <circle
              cx="170"
              cy="170"
              r={radius}
              stroke="#DDEFE9"
              strokeWidth={stroke}
              fill="none"
            />

            <circle
              cx="170"
              cy="170"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition:
                  "stroke-dashoffset 0.3s ease",
              }}
            />

            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#00C9A7"
                />
                <stop
                  offset="100%"
                  stopColor="#16A34A"
                />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-[#111827]">
              {progress}%
            </span>
          </div>
        </div>

        <p className="mt-14 text-3xl font-bold text-center text-[#111827]">
          Isso pode levar alguns segundos.
        </p>
      </main>
    </div>
  );
}