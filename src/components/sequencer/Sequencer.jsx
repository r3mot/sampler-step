import React from "react";
import styles from "./Sequencer.module.css";
import { useSequenceContext } from "../../context/SequenceProvider";
import { Legend } from "../legend";
import { Grid } from "../grid";

export const Sequencer = () => {
  const { samplers } = useSequenceContext();
  return (
    <div className={styles.sequencer}>
      <Legend />
      <Grid />
    </div>
  );
};
