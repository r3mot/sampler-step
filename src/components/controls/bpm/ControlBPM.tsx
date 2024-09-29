import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useBPM } from "../../../hooks/useBPM";
import styles from "./ControlBPM.module.css";

export const ControlBPM = () => {
  const { bpm, handleMouseDown, handleMouseUp } = useBPM();

  return (
    <div className={styles.wrapper}>
      <AiFillCaretLeft
        size={40}
        className={styles.button}
        onMouseDown={() => handleMouseDown(-1)}
        onMouseUp={handleMouseUp}
      />
      <div className={styles.box}>
        <div className={styles.boxBPM}>{bpm}</div>
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
