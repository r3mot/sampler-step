import { ControlBPM } from "@/components/controls/bpm/ControlBPM";
import { ControlButtons } from "@/components/controls/buttons/ControlButtons";
import styles from "./ControlPanel.module.css";

/**
 * Control panel for the sequencer.<br>
 * Includes buttons for starting, stopping, and clearing the sequencer.<br>
 * Also includes a dropdown for selecting the number of beats in the sequence.<br>
 *
 * @returns {JSX.Element} - ControlPanel Component
 */
export const ControlPanel = () => {
  return (
    <div className={styles.panel}>
      <ControlButtons />
      <ControlBPM />
    </div>
  );
};
