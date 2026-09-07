import { Gengar } from "./components/gengar";

const TERMINAL_BG = "#1b1715";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-16 dark:bg-black">
      <main className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#292220] px-3 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#e05a47]" />
            <span className="h-3 w-3 rounded-full bg-[#d8a03c]" />
            <span className="h-3 w-3 rounded-full bg-[#58a653]" />
            <p className="mx-auto pr-14 font-mono text-xs text-white/40">
              gxguinho@site: ~
            </p>
          </div>

          <div className="bg-[#1b1715] px-4 py-4 font-mono text-[13px] leading-relaxed text-[#d6cec6]">
            <p>
              <span className="text-[#da4b2e]">gxguinho@site</span>
              <span className="text-white/40">:</span>
              <span className="text-[#4e8fc4]">~</span>
              <span className="text-white/40">$ </span>
              gengar
            </p>

            <div className="flex justify-center py-3">
              <Gengar background={TERMINAL_BG} />
            </div>

            <p>
              <span className="text-[#da4b2e]">gxguinho@site</span>
              <span className="text-white/40">:</span>
              <span className="text-[#4e8fc4]">~</span>
              <span className="text-white/40">$ </span>
              <span className="cursor-blink inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[#d6cec6]" />
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
