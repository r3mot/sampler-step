import { useContext } from "react";
import { SequenceContext } from "../context/SequenceProvider";

export const useSequence = () => {
  const context = useContext(SequenceContext);

  if (!context) {
    throw new Error("useSequence must be used within a SequenceProvider");
  }

  return context;
};
