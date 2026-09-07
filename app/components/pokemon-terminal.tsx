"use client";

import { useEffect, useRef, useState } from "react";
import { PokemonArt } from "./pokemon";
import {
  DEFAULT_POKEMON,
  POKEMON_NAMES,
  type PokemonName,
} from "./pokemon-art";
import { candidates, complete, ghost, run, type Output } from "./shell";

const TYPE_MS = 55;
/** Ticks parados depois da ultima letra, antes de "executar" o comando. */
const PAUSE_TICKS = 5;
const INTRO = `pokemon ${DEFAULT_POKEMON}`;
const INTRO_TICKS = INTRO.length + PAUSE_TICKS;

function PromptPrefix() {
  return (
    <>
      <span className="text-[#da4b2e]">gxguinho@site</span>
      <span className="text-white/40">:</span>
      <span className="text-[#4e8fc4]">~</span>
      <span className="text-white/40">$ </span>
    </>
  );
}

function Cursor() {
  return (
    <span className="cursor-blink inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[#d6cec6]" />
  );
}

export function PokemonTerminal({ fallback }: { fallback: React.ReactNode }) {
  const [bootTick, setBootTick] = useState(0);
  const [echo, setEcho] = useState(INTRO);
  const [output, setOutput] = useState<Output>({
    kind: "pokemon",
    pokemon: DEFAULT_POKEMON,
  });
  // Segue o ultimo pokemon desenhado, para a aba continuar marcada mesmo
  // enquanto a saida mostra outra coisa (`help`, um erro).
  const [selected, setSelected] = useState<PokemonName>(DEFAULT_POKEMON);
  const [input, setInput] = useState("");
  const [listing, setListing] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const booted = bootTick >= INTRO_TICKS;

  // Cada render agenda o proximo tick e para sozinho no fim. O setState fica
  // no callback do timer, nunca no corpo do effect.
  useEffect(() => {
    if (bootTick >= INTRO_TICKS) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = setTimeout(
      () => setBootTick(reduced ? INTRO_TICKS : bootTick + 1),
      reduced ? 0 : TYPE_MS,
    );
    return () => clearTimeout(id);
  }, [bootTick]);

  // Foca sozinho so onde ha teclado fisico: no toque isso abriria o teclado
  // por cima da tela sem o usuario ter pedido.
  useEffect(() => {
    if (booted && window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }, [booted]);

  // A barra rola na horizontal no celular; se o pokemon veio do teclado, a
  // aba correspondente pode estar fora de vista.
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [selected]);

  function submit(command: string) {
    const trimmed = command.trim();
    setInput("");
    setListing([]);
    setHistIndex(-1);
    if (trimmed === "") return;
    const result = run(trimmed);
    setEcho(trimmed);
    setHistory((h) => [trimmed, ...h]);
    setOutput(result);
    if (result?.kind === "pokemon") setSelected(result.pokemon);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const { value, listing: matches } = complete(input);
      setInput(value);
      setListing(matches);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      submit(input);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (history.length === 0) return;
      event.preventDefault();
      const next =
        event.key === "ArrowUp"
          ? Math.min(histIndex + 1, history.length - 1)
          : histIndex - 1;
      setHistIndex(next);
      setInput(next < 0 ? "" : history[next]);
    }
  }

  const suggestion = ghost(input);
  // Vermelho so quando o token que esta sendo digitado nao casa com nada.
  // Entrada terminada em espaco tem token corrente vazio: nao e erro.
  const noMatch =
    input.trim() !== "" &&
    !input.endsWith(" ") &&
    candidates(input).length === 0;

  return (
    <>
      {/* Clicar em qualquer canto da saida devolve o foco ao prompt. */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-[#d6cec6]"
      >
        <p>
          <PromptPrefix />
          {booted ? echo : INTRO.slice(0, Math.min(bootTick, INTRO.length))}
          {!booted && <Cursor />}
        </p>

        {booted && (
          <>
            <div className="py-3">
              {output?.kind === "pokemon" && (
                <PokemonArt name={output.pokemon} />
              )}
              {output?.kind === "list" && (
                <p className="text-[#8f857d]">{POKEMON_NAMES.join("  ")}</p>
              )}
              {output?.kind === "text" &&
                output.lines.map((line, i) => (
                  <p key={i} className="text-[#8f857d]">
                    {line || " "}
                  </p>
                ))}
              {output?.kind === "error" &&
                output.lines.map((line, i) => (
                  <p key={i} className="text-[#e0705c]">
                    {line}
                  </p>
                ))}
            </div>

            {listing.length > 0 && (
              <p className="pb-1 text-[#8f857d]">{listing.join("  ")}</p>
            )}

            <label className="flex">
              <span className="shrink-0">
                <PromptPrefix />
              </span>
              <span className="relative min-w-0 flex-1">
                {/* Camada do fantasma: um clone invisivel do texto digitado
                    empurra a sugestao para a posicao certa. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 whitespace-pre"
                >
                  <span className="invisible">{input}</span>
                  <span className="text-white/25">{suggestion}</span>
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    setListing([]);
                  }}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="comando"
                  className={[
                    "relative w-full bg-transparent outline-none [font:inherit]",
                    "caret-[#d6cec6]",
                    noMatch ? "text-[#e0705c]" : "text-[#d6cec6]",
                  ].join(" ")}
                />
              </span>
            </label>

            <p className="pt-2 text-[11px] text-[#6b625b]">
              tab completa · setas navegam o historico · `help` para ajuda
            </p>
          </>
        )}

        {/* O terminal e interativo, entao a arte so aparece depois do JS.
            Sem ele a pagina ficaria vazia — este e o conteudo de base. */}
        <noscript>{fallback}</noscript>
      </div>

      {/* Barra de status, no espirito da do tmux: sempre visivel e com a aba
          corrente invertida. E o caminho principal no celular, onde digitar
          num teclado virtual seria castigo. */}
      <nav
        aria-label="pokemon"
        className="flex shrink-0 overflow-x-auto border-t border-white/10 bg-[#221d1a] font-mono text-[13px]"
      >
        {POKEMON_NAMES.map((name) => {
          const active = name === selected;
          return (
            <button
              key={name}
              ref={active ? activeTabRef : null}
              type="button"
              onClick={() => submit(`pokemon ${name}`)}
              aria-current={active ? "true" : undefined}
              className={[
                "min-h-11 shrink-0 px-3 py-2 whitespace-nowrap transition-colors",
                "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#da4b2e]",
                active
                  ? "bg-[#da4b2e] font-medium text-[#1b1715]"
                  : "text-[#8f857d] hover:bg-white/5 hover:text-[#d6cec6]",
              ].join(" ")}
            >
              {name}
            </button>
          );
        })}
      </nav>
    </>
  );
}
