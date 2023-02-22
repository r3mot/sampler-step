import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useBPM } from "../../../hooks/useBPM";
import styles from "./ControlBPM.module.css";

export const ControlBPM = () => {
  const { bpm, raiseTempo, lowerTempo, mouseUp } = useBPM();

  return (
    <div className={styles.wrapper}>
      <AiFillCaretLeft
        size={35}
        className={styles.button}
        onMouseDown={lowerTempo}
        onMouseUp={mouseUp}
      />
      <div className={styles.box}>
        <h2>{bpm}BPM</h2>
      </div>
      <AiFillCaretRight
        size={35}
        className={styles.button}
        onMouseDown={raiseTempo}
        onMouseUp={mouseUp}
      />
    </div>
  );
};
