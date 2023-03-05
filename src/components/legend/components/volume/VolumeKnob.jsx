import React from "react";
import styles from "./VolumeKnob.module.css";

export const VolumeKnob = ({ sampler }) => {
  const visualizeKnobTurn = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = e.target.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const knob = document.querySelector(`.${styles.volumeKnob}`);
    knob.style.transform = `rotate(${(x - y) * 0.5}deg)`;
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.volumeKnob}
        onMouseDown={(e) => visualizeKnobTurn(e)}></div>
    </div>
  );
};
