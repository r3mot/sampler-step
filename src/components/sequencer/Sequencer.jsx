import React from "react";
import styles from "./Sequencer.module.css";
import { Legend } from "../legend";
import { Grid } from "../grid";

export const Sequencer = () => {
  return (
    <div className={styles.sequencer}>
      <Legend />
      <Grid />
    </div>
  );
};
