import { ControlBPM } from "@/components/controls/bpm/ControlBPM";
import { ControlButtons } from "@/components/controls/buttons/ControlButtons";
import styles from "./ControlPanel.module.css";

export const ControlPanel = () => {
  return (
    <div className={styles.panel}>
      <ControlButtons />
      <ControlBPM />
    </div>
  );
};
