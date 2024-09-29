import { useContext } from "react";
import { SequenceContext } from "@/context/SequenceProvider";
import * as Tone from "tone";

export const useSequence = () => {
  const context = useContext(SequenceContext);

  if (!context) {
    throw new Error("useSequence must be used within a SequenceProvider");
  }

  async function startTransport() {
    await Tone.start();
    Tone.getTransport().start();
    context?.sequence.current?.start();
  }

  async function stopTransport() {
    Tone.getTransport().stop();
    context?.sequence.current?.stop();
  }

  return { ...context, startTransport, stopTransport };
};
