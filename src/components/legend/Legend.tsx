// @ts-nocheck

import { useSequenceContext } from "../../context/index.js";
import { samples } from "../../data/samples.js";

import { MuteButton } from "./components/mute/MuteButton.tsx";
import styles from "./Legend.module.css";

export const Legend = () => {
  const { samplers } = useSequenceContext();
  return (
    <div className={styles.wrapper}>
      {samples.map((sample: any) => (
        <div key={sample.id} className={styles.track}>
          <h1>{sample.name}</h1>
          <MuteButton
            sampler={samplers.current[sample.id].sampler}
            id={sample.id}
          />
        </div>
      ))}
    </div>
  );
};
