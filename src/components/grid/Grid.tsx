import { useSequence } from "../../hooks/useSequence";
import { SampleInternal } from "../../types";
import styles from "./Grid.module.css";

export const Grid = () => {
  const { numBeats, samples, steps, currentStep } = useSequence();
  const rows = Array.from(Array(samples.length).keys());
  const cols = Array.from(Array(numBeats).keys());

  const padClicked = (
    samples: SampleInternal[],
    row: number,
    col: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const isChecked = steps.current ? steps.current[row][col].checked : false;

    if (isChecked) {
      (e.target as HTMLElement).style.background =
        "#181818 linear-gradient(#2e2e2e, #181818)";
    } else {
      (e.target as HTMLElement).style.background = samples[row].color;
    }
  };

  return (
    <div className={styles.grid}>
      {rows.map((row) => (
        <div key={row} className={styles.row}>
          {cols.map((col) => {
            const isActive = currentStep === col;
            return (
              <label key={col} className={styles.col}>
                <input
                  className={styles.pad}
                  type="checkbox"
                  ref={(el) => {
                    if (!el) return;
                    if (steps.current && !steps.current[row]) {
                      steps.current[row] = [];
                    }
                    if (steps.current) {
                      steps.current[row][col] = el;
                    }
                  }}
                />
                <div
                  onClick={(e) => padClicked(samples, row, col, e)}
                  key={`${col}-${row}`}
                  id={`${col}-${row}`}
                  className={`${styles.overlay} ${
                    styles[samples[row].name]
                  } pad ${isActive ? styles.active : ""}`}
                />
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};
