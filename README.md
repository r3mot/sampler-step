# Sampler Step

A simple step sequencer that leverages the [Tone.js](https://tonejs.github.io) API and React. It features 4 pre-selected samples and a 16-beat (4/4) pattern. Just click on a cell to create your pattern and press play!

![grid groovin demo](https://user-images.githubusercontent.com/88360543/226132825-2661fe64-b8ae-43b3-af2b-a8520cd50a87.gif)

 ## Getting Started
 - Clone the repo ```https://github.com/r3mot/sampler-step```
 - ```npm install```
 - ```npm run dev```


## Using Your Own Samples
Replace your samples in the assets folder and ensure you have the correct paths.
You can also drag & drap samples into the track legend.

```typescript
// sample.ts
import samplePath from "../assets/audio/sample.wav";

export const samples = [
  {
    id: 0,
    name: "sample-name",
    path: samplePath,
    color: "radial-gradient(#1dff04, #447e44)", 
  },
];

```

## License

[MIT License](https://choosealicense.com/licenses/mit/)
