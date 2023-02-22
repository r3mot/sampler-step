import { IoPlay, IoStop } from "react-icons/io5";
import { BiReset } from "react-icons/bi";
import { useControls } from "../../../context/ControlsProvider";
import styles from "./ControlButtons.module.css";
/**
 * Buttons for starting, stopping, and clearing the sequencer.<br>
 * @returns {JSX.Element} ControlButtons Component
 */
export const ControlButtons = () => {
  const { start, stop, clear, isPlaying, isCleared, isStopped } = useControls();

  /**
   * For each button, the color and border change when the button is clicked.
   */
  return (
    <div className={styles.buttonWrapper}>
      <IoPlay
        size={35}
        className={styles.button}
        onClick={start}
        style={
          isPlaying ? { color: "#0fd619", border: " 2px solid #0fd619" } : ""
        }
      />
      <IoStop
        size={35}
        style={
          isStopped
            ? {
                color: " rgb(196, 29, 29)",
                border: "2px solid  rgb(196, 29, 29)",
              }
            : ""
        }
        className={styles.button}
        onClick={stop}
      />
      <BiReset
        size={35}
        style={
          isCleared
            ? {
                color: " rgb(219, 231, 109)",
                border: "2px solid  rgb(219, 231, 109)",
              }
            : ""
        }
        className={styles.button}
        onClick={clear}
      />
    </div>
  );
};

/**
 * Gradient for react icons
 * @returns
 */
const GreenGradient = () => {
  return (
    <svg width='0' height='0'>
      <radialGradient id='green-gradient' x1='100%' y1='100%' x2='0%' y2='0%'>
        <stop stopColor='#cdf583' offset='0%' />
        <stop stopColor='#06990d' offset='100%' />
      </radialGradient>
    </svg>
  );
};
