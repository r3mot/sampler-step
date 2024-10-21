import { useSequence } from "@/hooks/useSequence";
import { SampleInternal } from "@/types";
import styles from "./Grid.module.css";

const initialPattern = [
  [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
];

export const Grid = () => {
  const { samples, steps, currentStep } = useSequence();

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
      {initialPattern.map((rowPattern, row) => (
        <div key={row} className={styles.row}>
          {rowPattern.map((isChecked, col) => {
            const isActive = currentStep === col;
            return (
              <label key={col} className={styles.col}>
                <input
                  className={styles.pad}
                  type="checkbox"
                  defaultChecked={isChecked}
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
                  style={isChecked ? { background: samples[row].color } : {}}
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
