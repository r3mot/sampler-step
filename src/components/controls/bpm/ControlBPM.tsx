import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useBPM } from "@/hooks/useBPM";
import styles from "./ControlBPM.module.css";

export const ControlBPM = () => {
  const { bpm, handleMouseDown, handleMouseUp, handleInputChange } = useBPM();

  return (
    <div className={styles.wrapper}>
      <AiFillCaretLeft
        size={40}
        className={styles.button}
        onMouseDown={() => handleMouseDown(-1)}
        onMouseUp={handleMouseUp}
      />
      <div className={styles.box}>
        <input
          type="number"
          className={styles.boxInput}
          value={bpm}
          onChange={handleInputChange}
          min="1"
          max="1000"
        />
        <div className={styles.boxLabel}>BPM</div>
      </div>
      <AiFillCaretRight
        size={40}
        className={styles.button}
        onMouseDown={() => handleMouseDown(1)}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};
