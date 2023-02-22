import { useRef } from "react";
import { useSequenceContext } from "../../context/SequenceProvider";
import styles from "./Sequencer.module.css";

export const Sequencer = () => {
  const { numBeats, samples } = useSequenceContext();
  const rows = Array.from(Array(samples.length).keys());
  const cols = Array.from(Array(numBeats).keys());

  return (
    <div className={styles.grid}>
      {rows.map((row) => (
        <div key={row} className={styles.row}>
          {cols.map((col) => {
            return <TrackColumn key={col} row={row} col={col} />;
          })}
        </div>
      ))}
    </div>
  );
};

export const TrackColumn = ({ row, col }) => {
  const { steps, samples } = useSequenceContext();
  const dotRef = useRef(null);

  const toggleActiveClass = () => {
    dotRef.current.classList.toggle(styles.active);
  };

  /**
   * Check to see if there exists a reference to the row of checkboxes in the steps context.
   * If not, create a new array for the row.
   * Once the row exists, begin adding reference to each checkbox (column) in the row.
   * This is done by using the ref attribute on the input element.
   */
  return (
    <label>
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
        id={`column-${col}-${row}`}
        className={`${styles.overlay} ${styles[samples[row].name]} pad`}>
        <div
          ref={(el) => {
            if (!el) return;
            dotRef.current = el;
          }}
          className={styles.dot}
          onClick={() => toggleActiveClass}
        />
      </div>
    </label>
  );
};
