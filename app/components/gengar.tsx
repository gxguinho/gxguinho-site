import { GENGAR_ART } from "./gengar-art";
import styles from "./gengar.module.css";

type Run = { color: string; text: string };

/**
 * Quebra as linhas nos marcadores ${c1}/${c2}/${c3}.
 *
 * A cor corrente atravessa linhas — e o mesmo comportamento dos codigos ANSI
 * no terminal, onde a cor vale ate alguem trocar. Roda uma vez, na carga do
 * modulo: a arte e estatica, entao nao ha o que recalcular por render.
 */
function parseArt(lines: readonly string[]): Run[][] {
  const marker = /\$\{(c[123])\}/g;
  let color = "c1";

  return lines.map((line) => {
    const runs: Run[] = [];
    let last = 0;
    let match: RegExpExecArray | null;

    marker.lastIndex = 0;
    while ((match = marker.exec(line)) !== null) {
      if (match.index > last) {
        runs.push({ color, text: line.slice(last, match.index) });
      }
      color = match[1];
      last = match.index + match[0].length;
    }
    if (last < line.length) {
      runs.push({ color, text: line.slice(last) });
    }
    return runs;
  });
}

const ROWS = parseArt(GENGAR_ART);

/**
 * Gengar em arte ASCII, no estilo dos logos do neofetch.
 * Sem estado e sem efeito: roda como Server Component e nao manda JS ao cliente.
 */
export function Gengar({ className }: { className?: string }) {
  return (
    <pre
      className={[styles.art, className].filter(Boolean).join(" ")}
      role="img"
      aria-label="Gengar desenhado em arte ASCII"
    >
      {ROWS.map((runs, y) => (
        <div key={y}>
          {runs.length === 0
            ? " "
            : runs.map((run, i) => (
                <span key={i} className={styles[run.color]}>
                  {run.text}
                </span>
              ))}
        </div>
      ))}
    </pre>
  );
}
