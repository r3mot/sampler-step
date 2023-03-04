import { useSequenceContext } from "../../context";
import { samples } from "../../data";
import { MuteButton } from "./components";
import styles from "./Legend.module.css";

export const Legend = () => {
  const { samplers } = useSequenceContext();
  return (
    <div className={styles.wrapper}>
      {samples.map((sample) => (
        <div key={sample.id} className={styles.track}>
          <div className={styles.left}>
            <h1>{sample.name}</h1>
          </div>
          <div className={styles.right}>
            <MuteButton sampler={samplers.current[sample.id].sampler} />
          </div>
        </div>
      ))}
    </div>
  );
};
