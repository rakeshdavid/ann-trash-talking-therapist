"use client";

import dynamic from "next/dynamic";

const InteractiveAvatar = dynamic(
  () => import("../components/InteractiveAvatar"),
  {
    ssr: false,
  }
);

export default function App() {
  return (
    <div>
      <InteractiveAvatar />
    </div>
  );
}
