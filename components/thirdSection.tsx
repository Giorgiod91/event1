"use client";
import React from "react";
import { Typewriter, useTypewriter } from "react-simple-typewriter";

type Props = {};

function ThirdSection({}: Props) {
  const [text, count] = useTypewriter({
    words: ["Plane deine eigenen Events"],
    loop: true,
    deleteSpeed: 50,
  });

  return (
    <div className="via-magenta-500 bg-neutral">
      <div className="mx-auto flex min-h-[14rem] max-w-3xl flex-col justify-center gap-12 md:flex-row md:items-center md:justify-start">
        <div className="max-w-xl space-y-4 px-12 py-12 text-4xl leading-relaxed text-base-content/80 text-white md:px-0">
          <span className="h-16 text-4xl font-extrabold tracking-tight text-slate-100 md:-mb-4 lg:text-4xl xl:text-4xl">
            {text}
          </span>
        </div>
        <div className="hidden aspect-square bg-neutral max-md:w-full md:order-first md:h-[28rem]"></div>
      </div>
    </div>
  );
}

export default ThirdSection;
