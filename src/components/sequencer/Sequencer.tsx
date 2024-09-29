import styles from "./Sequencer.module.css";
import { Legend } from "@/components/legend/Legend";
import { Grid } from "@/components/grid/Grid";

export const Sequencer = () => {
  return (
    <div className={styles.sequencer}>
      <Legend />
      <Grid />
    </div>
  );
};
