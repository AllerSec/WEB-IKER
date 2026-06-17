"use client";
import * as React from "react";

export function StackedLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center leading-[1.05] ${className}`}>
      <span className="stack-label l1">{text}</span>
      <span className="stack-label l2 -mt-1.5">{text}</span>
      <span className="stack-label l3 -mt-1.5">{text}</span>
    </div>
  );
}
