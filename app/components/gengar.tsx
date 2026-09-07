import { GENGAR } from "./gengar-art";
import styles from "./gengar.module.css";

const BLOCK = "█";

type Props = {
  /** Cor por tras do desenho. Precisa bater com o fundo em que ele e colocado. */
  background?: string;
  className?: string;
};

/**
 * Gengar desenhado com caracteres, no espirito da arte que o neofetch imprime.
 * Sem estado e sem efeito: roda como Server Component e nao manda JS ao cliente.
 */
export function Gengar({ background = "transparent", className }: Props) {
  return (
    <pre
      className={[styles.art, className].filter(Boolean).join(" ")}
      style={{ ["--gengar-empty" as string]: background }}
      role="img"
      aria-label="Gengar desenhado em arte ASCII com blocos coloridos"
    >
      {GENGAR.rows.map((row, y) => {
        const spans = [];
        for (let i = 0; i < row.length; i += 2) {
          const color = row[i];
          const count = row[i + 1];
          spans.push(
            <span
              key={i}
              className={color === -1 ? styles.empty : styles[`c${color}`]}
            >
              {BLOCK.repeat(count)}
            </span>,
          );
        }
        return <div key={y}>{spans}</div>;
      })}
    </pre>
  );
}
