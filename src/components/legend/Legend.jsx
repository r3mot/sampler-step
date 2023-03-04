import { useState, useEffect } from "react";
import styles from "./Legend.module.css";
import { samples } from "../../data";
import { useSequenceContext } from "../../context/SequenceProvider";

export const Legend = () => {
  const { samplers } = useSequenceContext();

  const [muted, setMuted] = useState(
    new Map(samplers.current.map((sampler) => [sampler.id, sampler.muted]))
  );

  const [curr, setCurr] = useState(0);

  function muteSample(sample) {
    samplers.current[sample.id].sampler.volume.mute =
      !samplers.current[sample.id].sampler.volume.mute;

    setCurr(sample.id);

    setMuted((prev) => {
      const newMuted = new Map(prev);
      newMuted.set(sample.id, !newMuted.get(sample.id));
      return newMuted;
    });
  }

  useEffect(() => {}, [muted]);

  return (
    <div className={styles.wrapper}>
      {samples.map((sample) => (
        <div key={sample.id} className={styles.track}>
          <div className={styles.left}>
            <h1>{sample.name}</h1>
          </div>
          <div className={styles.right}>
            <button onClick={() => muteSample(sample)}>
              {muted.get(sample.id) ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  // return (
  //   <div className={styles.wrapper}>
  //     {samples.map((sample) => (
  //       <div key={sample.id} className={styles.track}>
  //         <div className={styles.left}>
  //           <h1>{sample.name}</h1>
  //         </div>
  //         <div key={sample.id} className={styles.right}>
  //           <button id={sample.id} onClick={(e) => muteSample(e.target)}>
  //             {}
  //           </button>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};
