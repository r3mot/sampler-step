import { useSequenceContext } from "../../context";
import { samples } from "../../data";

import { MuteButton } from "./components/mute/MuteButton";
import styles from "./Legend.module.css";

export const Legend = () => {
  const { samplers } = useSequenceContext();
  return (
    <div className={styles.wrapper}>
      {samples.map((sample) => (
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
