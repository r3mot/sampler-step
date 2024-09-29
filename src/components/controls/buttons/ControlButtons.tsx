import { IoPlay, IoStop } from "react-icons/io5";
import { BiReset } from "react-icons/bi";
import styles from "./ControlButtons.module.css";
import { useControls } from "@/hooks";

export function ControlButtons() {
  const { startSequence, stopSequence, clearGrid, controls } = useControls();

  const getButtonStyle = (state: boolean, color: string) => ({
    ...(state ? { color, border: `2px solid ${color}` } : {}),
  });

  return (
    <div className={styles.buttonWrapper}>
      <IoPlay
        size={35}
        className={styles.button}
        onClick={startSequence}
        style={getButtonStyle(controls.playing, "#0fd619")}
      />
      <IoStop
        size={35}
        className={styles.button}
        onClick={stopSequence}
        style={getButtonStyle(controls.stopped, "rgb(196, 29, 29)")}
      />
      <BiReset
        size={35}
        className={styles.button}
        onClick={clearGrid}
        style={getButtonStyle(controls.cleared, "rgb(219, 231, 109)")}
      />
    </div>
  );
}
