import * as Tone from "tone";

/**
 * Initializes the Tone.js sequencer
 * @param {*} samples - The samples to be used in the sequence
 */
const sampler = (sample) => {
  const sampler = new Tone.Sampler({
    urls: {
      ["C4"]: sample.path,
    },
  });

  // let channel = fader;
  // sampler.connect(channel);
  return sampler;
};

/**
 *  Initializes the samplers and returns them to the caller
 * @param {*} samples - The samples to be used in the sequence
 */
export const initSamplers = (samples) => {
  return samples.map((sample) => ({
    id: sample.id,
    sampler: new Tone.Sampler({
      urls: {
        ["C4"]: sample.path,
      },
    }),
  }));
};

/**
 *  Initializes the sequence and returns it to the caller
 * @param {React.MutableRefObject<Tone.Sequence>} samplers - The samplers to be used in the sequence
 * @param {*} steps - The steps of the sequence
 * @param {*} numBeats - The number of steps in the sequence
 */
export const initSequence = (samplers, steps, numBeats) => {
  return new Tone.Sequence(
    (time, step) => {
      samplers.current.map((sample) => {
        if (steps.current[sample.id][step].checked) {
          sample.sampler.triggerAttack("C4", time);
        }
      });
      showSteps(steps, step);
    },
    [...Array(numBeats).keys()],
    "8n"
  );
};

let prevStep = -1;
/**
 *  Shows the current step by setting the opacity of the current column to 0.5
 * @param {*} steps - The steps of the sequence
 * @param {*} step  - The current step
 * @uses - The id of the column is set to ${step}-${rowId}
 * @uses - prevStep is used to reset the opacity of the previous column
 */
const showSteps = (steps, step) => {
  Object.keys(steps.current).forEach((rowId) => {
    // Reset the opacity of the previous column
    if (prevStep >= 0) {
      document.getElementById(`${prevStep}-${rowId}`).style.opacity = 1;
      document.getElementById(`${prevStep}-${rowId}`).style.filter = "none";
    }
    // Set the opacity of the current column
    document.getElementById(`${step}-${rowId}`).style.opacity = 0.2;
    document.getElementById(`${step}-${rowId}`).style.filter =
      "drop-shadow(0 0 0.5rem black)";
  });
  prevStep = step;
};
