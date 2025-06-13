"use client";

import dynamic from "next/dynamic";
import BackgroundImage from "@/components/BackgroundImage";

// Dynamically import InteractiveAvatar with no SSR
const InteractiveAvatar = dynamic(
  () => import("@/components/InteractiveAvatar"),
  { ssr: false },
);

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <BackgroundImage />
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <InteractiveAvatar />
      </div>
    </div>
  );
}
