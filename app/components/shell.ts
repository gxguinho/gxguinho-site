import { POKEMON_NAMES, type PokemonName } from "./pokemon-art";

export const COMMANDS = ["pokemon", "ls", "help", "clear"] as const;

export type Output =
  | { kind: "pokemon"; pokemon: PokemonName }
  | { kind: "text"; lines: string[] }
  | { kind: "list" }
  | { kind: "error"; lines: string[] }
  | null;

/** Prefixo comum a todos os candidatos — o que o Tab consegue completar com certeza. */
function commonPrefix(items: string[]): string {
  if (items.length === 0) return "";
  let prefix = items[0];
  for (const item of items.slice(1)) {
    while (!item.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/**
 * Divide a entrada em token corrente e o resto.
 * O ultimo token e o que esta sendo completado — vazio se a entrada termina
 * em espaco, que e quando o shell lista tudo em vez de completar.
 */
function tokens(input: string) {
  const parts = input.split(" ");
  return { head: parts.slice(0, -1), current: parts[parts.length - 1] };
}

export function candidates(input: string): string[] {
  const { head, current } = tokens(input);
  const pool =
    head.length === 0
      ? [...COMMANDS, ...POKEMON_NAMES]
      : head[0] === "pokemon" && head.length === 1
        ? POKEMON_NAMES
        : [];
  return (pool as readonly string[]).filter((c) => c.startsWith(current));
}

/** Texto que o Tab acrescentaria: so a parte certa, nunca um palpite. */
export function ghost(input: string): string {
  if (input === "") return "";
  const { current } = tokens(input);
  const matches = candidates(input);
  if (matches.length === 0) return "";
  return commonPrefix(matches).slice(current.length);
}

export function complete(input: string): { value: string; listing: string[] } {
  const { head, current } = tokens(input);
  const matches = candidates(input);
  if (matches.length === 0) return { value: input, listing: [] };

  const prefix = commonPrefix(matches);
  const value = [...head, prefix].join(" ");
  // Unico candidato: completa e ja abre espaco para o argumento seguinte.
  if (matches.length === 1) {
    const needsArg = matches[0] === "pokemon";
    return { value: needsArg ? `${value} ` : value, listing: [] };
  }
  // Ambiguo e sem nada a acrescentar: lista, como o bash no segundo Tab.
  return { value, listing: prefix === current ? matches : [] };
}

/** Chame so com entrada nao vazia — Enter em branco nao mexe na saida. */
export function run(input: string): Output {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  const [command, ...args] = parts;

  if (command === "clear") return null;
  if (command === "ls") return { kind: "list" };
  if (command === "help") {
    return {
      kind: "text",
      lines: [
        "pokemon <nome>   desenha um pokemon",
        "ls               lista os disponiveis",
        "clear            limpa a saida",
        "help             isto aqui",
        "",
        "Tab completa, setas navegam o historico.",
      ],
    };
  }

  // `pokemon pikachu` e `pikachu` fazem a mesma coisa.
  const name = command === "pokemon" ? args[0] : command;

  if (command === "pokemon" && !name) {
    return { kind: "error", lines: ["pokemon: falta o nome. tente `ls`."] };
  }
  if ((POKEMON_NAMES as string[]).includes(name)) {
    return { kind: "pokemon", pokemon: name as PokemonName };
  }
  return {
    kind: "error",
    lines: [`${command}: nao encontrado. tente \`ls\` ou \`help\`.`],
  };
}
