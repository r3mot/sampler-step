import { useSequence } from "../../hooks/useSequence.ts";

import { MuteButton } from "./components/mute/MuteButton.tsx";
import styles from "./Legend.module.css";

export const Legend = () => {
  const { samples, faders, steps } = useSequence();
  return (
    <div className={styles.wrapper}>
      {samples.map((sample: any) => (
        <div key={sample.id} className={styles.track}>
          <h1>{sample.name}</h1>
          <MuteButton
            fader={faders.current ? faders.current[sample.id] : null}
            id={sample.id}
            steps={steps.current}
          />
        </div>
      ))}
    </div>
  );
};
