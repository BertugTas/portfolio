"use client";

import dynamic from "next/dynamic";

const CursorSpotlight = dynamic(
  () => import("@/components/CursorSpotlight"),
  { ssr: false }
);

export default function ClientCursorSpotlight() {
  return <CursorSpotlight />;
}
