import { samples } from "../../data/samples.js";
import { useSequence } from "../../hooks/useSequence.ts";

import { MuteButton } from "./components/mute/MuteButton.tsx";
import styles from "./Legend.module.css";

export const Legend = () => {
  // @ts-ignore
  const { samplers } = useSequence();
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
