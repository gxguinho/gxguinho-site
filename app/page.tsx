import { PokemonArt } from "./components/pokemon";
import { PokemonTerminal } from "./components/pokemon-terminal";
import { DEFAULT_POKEMON } from "./components/pokemon-art";

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

      {/* A arte e renderizada no servidor e entregue ao componente cliente,
          que a coloca dentro de um <noscript>. */}
      <PokemonTerminal fallback={<PokemonArt name={DEFAULT_POKEMON} />} />
    </div>
  );
}
