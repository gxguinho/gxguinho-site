import { Gengar } from "./components/gengar";

function Prompt({ command }: { command?: string }) {
  return (
    <p>
      <span className="text-[#da4b2e]">gxguinho@site</span>
      <span className="text-white/40">:</span>
      <span className="text-[#4e8fc4]">~</span>
      <span className="text-white/40">$ </span>
      {command ?? (
        <span className="cursor-blink inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[#d6cec6]" />
      )}
    </p>
  );
}

export default function Home() {
  return (
    // h-dvh em vez de h-screen: no mobile a barra de endereco entra na conta
    // do vh e o rodape ficaria cortado.
    <div className="flex h-dvh w-full flex-col bg-[#1b1715]">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[#292220] px-3 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#e05a47]" />
        <span className="h-3 w-3 rounded-full bg-[#d8a03c]" />
        <span className="h-3 w-3 rounded-full bg-[#58a653]" />
        <p className="mx-auto pr-14 font-mono text-xs text-white/40">
          gxguinho@site: ~
        </p>
      </div>

      {/* Conteudo flui do topo a esquerda, como num terminal de verdade. */}
      <div className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-[#d6cec6]">
        <Prompt command="gengar" />
        <div className="py-3">
          <Gengar />
        </div>
        <Prompt />
      </div>
    </div>
  );
}
