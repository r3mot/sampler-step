import { useSequenceContext } from "../../context";
import styles from "./Grid.module.css";

export const Grid = () => {
  const { numBeats, samples, steps } = useSequenceContext();
  const rows = Array.from(Array(samples.length).keys());
  const cols = Array.from(Array(numBeats).keys());

  /**
   * Check to see if there exists a reference to the row of checkboxes in the steps context.
   * If not, create a new array for the row.
   * Once the row exists, begin adding reference to each checkbox (column) in the row.
   * This is done by using the ref attribute on the input element.
   */
  return (
    <div className={styles.grid}>
      {rows.map((row) => (
        <div key={row} className={styles.row}>
          {cols.map((col) => {
            return (
              <label key={col} className={styles.col}>
                <input
                  className={styles.pad}
                  type='checkbox'
                  ref={(el) => {
                    if (!el) return;
                    if (!steps?.current[row]) {
                      steps.current[row] = [];
                    }
                    steps.current[row][col] = el;
                  }}
                />
                <div
                  key={`${col}-${row}`}
                  id={`${col}-${row}`}
                  className={`${styles.overlay} ${
                    styles[samples[row].name]
                  } pad`}
                />
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};
