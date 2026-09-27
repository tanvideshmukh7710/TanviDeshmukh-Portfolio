"use client";

import React from "react";
import { CustomCursor, CustomCursorTarget } from "@/components/ui/custom-cursor";

export default function CustomCursorDemo() {
  return (
    <CustomCursor
      color="#8b0a0a"
      followDamping={22}
      followStiffness={150}
      className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-2xl border border-zinc-200"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight font-agrandir">
          Custom Cursor Interactive Demo
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Hover over the circular targets below to see spring tracking and hover expansion.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <CustomCursorTarget
          size="sm"
          className="rounded-full bg-white shadow-md border border-zinc-200 p-2 text-xs font-semibold cursor-pointer"
        >
          <span>Small</span>
        </CustomCursorTarget>

        <CustomCursorTarget
          size="md"
          className="rounded-full bg-white shadow-lg border border-zinc-200 p-3 text-sm font-semibold cursor-pointer"
        >
          <span>Medium</span>
        </CustomCursorTarget>

        <CustomCursorTarget
          size="lg"
          className="rounded-full bg-white shadow-xl border border-zinc-200 p-4 text-base font-semibold cursor-pointer"
        >
          <span>Large</span>
        </CustomCursorTarget>
      </div>
    </CustomCursor>
  );
}
