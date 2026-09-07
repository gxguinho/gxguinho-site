import { POKEMON, type PokemonName } from "./pokemon-art";
import styles from "./pokemon.module.css";

type Run = { color: string; text: string };

/**
 * Quebra as linhas nos marcadores ${cN} e resolve cada um na paleta do pokemon.
 *
 * A cor corrente atravessa linhas — e o mesmo comportamento dos codigos ANSI no
 * terminal, onde a cor vale ate alguem trocar.
 */
function parseArt(lines: readonly string[], colors: readonly string[]): Run[][] {
  const marker = /\$\{c(\d)\}/g;
  let color = colors[0];

  return lines.map((line) => {
    const runs: Run[] = [];
    let last = 0;
    let match: RegExpExecArray | null;

    marker.lastIndex = 0;
    while ((match = marker.exec(line)) !== null) {
      if (match.index > last) {
        runs.push({ color, text: line.slice(last, match.index) });
      }
      color = colors[Number(match[1]) - 1] ?? colors[0];
      last = match.index + match[0].length;
    }
    if (last < line.length) {
      runs.push({ color, text: line.slice(last) });
    }
    return runs;
  });
}

// A arte e estatica: parseia uma vez na carga do modulo, nao a cada render.
const PARSED = Object.fromEntries(
  Object.entries(POKEMON).map(([name, data]) => [
    name,
    parseArt(data.lines, data.colors),
  ]),
) as Record<PokemonName, Run[][]>;

/** Altura do cromo do terminal em volta da arte: barra de titulo, barra de
 *  abas, paddings, as duas linhas de prompt e a dica. */
const CHROME_PX = 210;
const LINE_HEIGHT = 1.08;
/** Largura de avanco de um caractere numa fonte monoespacada, em em. */
const ADVANCE = 0.6;
/** Folga lateral: os paddings da area de saida. */
const GUTTER_PX = 48;

export function PokemonArt({ name }: { name: PokemonName }) {
  const grid = PARSED[name];
  const rows = grid.length;
  const cols = Math.max(
    ...grid.map((runs) => runs.reduce((n, run) => n + run.text.length, 0)),
  );

  // O tamanho sai das duas dimensoes da arte, nao de constantes: cada pokemon
  // tem altura propria (28 linhas o gengar, 36 o eevee) e a largura tambem
  // varia. Assim da para redesenhar um deles maior sem quebrar o layout.
  const fontSize = [
    "max(6px, min(",
    `calc((100dvh - ${CHROME_PX}px) / ${(rows * LINE_HEIGHT).toFixed(2)}), `,
    `calc((100vw - ${GUTTER_PX}px) / ${(cols * ADVANCE).toFixed(2)}), `,
    "20px))",
  ].join("");

  return (
    <pre
      className={styles.art}
      style={{ fontSize }}
      role="img"
      aria-label={`${name} em arte ASCII`}
    >
      {PARSED[name].map((runs, y) => (
        <div key={y}>
          {runs.length === 0
            ? " "
            : runs.map((run, i) => (
                <span key={i} style={{ color: run.color }}>
                  {run.text}
                </span>
              ))}
        </div>
      ))}
    </pre>
  );
}
