import { IoPlay, IoStop } from "react-icons/io5";
import { BiReset } from "react-icons/bi";
import { useControls } from "../../../hooks/useControls";
import styles from "./ControlButtons.module.css";
/**
 * Buttons for starting, stopping, and clearing the sequencer.<br>
 * @returns {JSX.Element} ControlButtons Component
 */
export const ControlButtons = () => {
  const { start, stop, clear, controls } = useControls();

  const getButtonStyle = (state, color) => ({
    ...(state ? { color, border: `2px solid ${color}` } : {}),
  });

  /**
   * For each button, the color and border change when the button is clicked.
   */
  return (
    <div className={styles.buttonWrapper}>
      <IoPlay
        size={35}
        className={styles.button}
        onClick={start}
        style={getButtonStyle(controls.isPlaying, "#0fd619")}
      />
      <IoStop
        size={35}
        className={styles.button}
        onClick={stop}
        style={getButtonStyle(controls.isStopped, "rgb(196, 29, 29)")}
      />
      <BiReset
        size={35}
        className={styles.button}
        onClick={clear}
        style={getButtonStyle(controls.isCleared, "rgb(219, 231, 109)")}
      />
    </div>
  );
};
