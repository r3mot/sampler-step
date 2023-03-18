# <p align="center">Step Sequencer</p>

A simple step sequencer that leverages the [Tone.js](https://tonejs.github.io) API and React to provide a fun experience without a DAW.


  <img src="https://user-images.githubusercontent.com/88360543/226132825-2661fe64-b8ae-43b3-af2b-a8520cd50a87.gif" alt="step sequencer animated" />


## Introduction
This project is a personal exploration into the world of web audio, inspired by [Chrome Music Lab](https://musiclab.chromeexperiments.com/Song-Maker/).<br>
After trying my hand at VST development with C++ and JUCE, I found myself wondering what it would be like to have the same tooling--in the browser. While this project is simply an introduction, I see it as a start to something more.<br>

For now, this sequencer offers 4 pre-selected samples and 16 beats (4/4). Simply click on a cell that corresponds to the sample, make your pattern, and press play! 
<br><br>

 ## Getting Started
<ul>
  <li>Clone the repo</li>
  <li><code>npm install</code> to install dependencies</li>
  <li><code>npm run dev</code> to run the application locally</li>
</ul>

If you run into any issues, you can let me know by creating an issue. This is a project I am working on in my spare time so I may not see it right away. 
<br><br>

## Using Your Own Samples
To include your samples, follow the pattern below: 
- Name: Pick a name you're comfortable with. It will be displayed on the sequencer to indicate which sample is selected.
- Color: Once the user clicks a cell, it's background is updated according to the color you gave the sample.

```javascript
// sample.js
import samplePath from "../assets/audio/sample.wav";

export const samples = [
  {
    id: 0,
    name: "sample-name",
    path: samplePath,
    color: "radial-gradient(#1dff04, #447e44)", 
  },
]

```
<br><br>

## Technology
<ul> 
  <li><code>React</code> to manage the front-end of the application and increase the rate of development</li>
  <li><code>Tone.js</code> a web audio framework to create interactive music in the browser. Tone manages all of the control signals. </li>
  <li><code>JavaScript</code> <i> will be moving the project over to TypeScript soon </i></li>
  <li><code>Vite</code> used to handle tooling such as bundling</li>
</ul>
