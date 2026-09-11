/* =========================================================
   SPINACH VASCULAR SCAFFOLD SIMULATOR
========================================================= */


/* =========================================================
   STATE
========================================================= */

const state = {

  mode: "guided",

  currentStep: 1,

  unlockedStep: 1,

  experimentStarted: false,

  decellProgress: 0,

  decellComplete: false,

  flowRunning: false,

  flowComplete: false,

  dye: 60,

  observationTime: 10,

  distance: 0,

  velocity: 0,

  coverage: 0,

  chart: null,

  animationFrame: null

};



/* =========================================================
   DOM
========================================================= */

const stepPanels = {
  1: document.getElementById("step1"),
  2: document.getElementById("step2"),
  3: document.getElementById("step3"),
  4: document.getElementById("step4")
};


const stepButtons =
  document.querySelectorAll(".step-button");


const timelineItems =
  document.querySelectorAll(".timeline-item");


const timelineLines =
  document.querySelectorAll(".timeline-line");


const topbarStage =
  document.getElementById("topbarStage");


/* Buttons */

const beginExperiment =
  document.getElementById("beginExperiment");

const startDecellularization =
  document.getElementById("startDecellularization");

const continueToFlow =
  document.getElementById("continueToFlow");

const startFlow =
  document.getElementById("startFlow");

const stopFlow =
  document.getElementById("stopFlow");

const continueToAnalysis =
  document.getElementById("continueToAnalysis");

const resetButton =
  document.getElementById("resetButton");

const restartExperiment =
  document.getElementById("restartExperiment");


/* Mode */

const guidedMode =
  document.getElementById("guidedMode");

const freeMode =
  document.getElementById("freeMode");


/* Decellularization */

const decellProgressBar =
  document.getElementById("decellProgressBar");

const decellProgressText =
  document.getElementById("decellProgressText");

const cellularRemaining =
  document.getElementById("cellularRemaining");

const vascularVisibility =
  document.getElementById("vascularVisibility");

const cellularBar =
  document.getElementById("cellularBar");

const vascularBar =
  document.getElementById("vascularBar");

const decellStatus =
  document.getElementById("decellStatus");

const cellularLayer =
  document.getElementById("cellularLayer");

const vascularNetwork =
  document.getElementById("vascularNetwork");


/* Flow */

const dyeRange =
  document.getElementById("dyeRange");

const dyeValue =
  document.getElementById("dyeValue");

const timeRange =
  document.getElementById("timeRange");

const timeValue =
  document.getElementById("timeValue");

const flowStatus =
  document.getElementById("flowStatus");

const distanceValue =
  document.getElementById("distanceValue");

const velocityValue =
  document.getElementById("velocityValue");

const coverageValue =
  document.getElementById("coverageValue");

const flowParticles =
  document.querySelectorAll(".flow-particle");


/* Final results */

const finalVisibility =
  document.getElementById("finalVisibility");

const finalCoverage =
  document.getElementById("finalCoverage");

const finalVelocity =
  document.getElementById("finalVelocity");


/* =========================================================
   STAGE TITLES
========================================================= */

const stageNames = {

  1: "SAMPLE PREPARATION",

  2: "DECELLULARIZATION MODEL",

  3: "VASCULAR FLOW SIMULATION",

  4: "ANALYSIS & CONCLUSION"

};



/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  updateFlowControls();

  updateDecellVisual(0);

  updateAnalysis();

  setupChart();

  setStep(1);

});



/* =========================================================
   NAVIGATION
========================================================= */

function setStep(step) {

  if (step < 1 || step > 4) {
    return;
  }


  if (
    state.mode === "guided" &&
    step > state.unlockedStep
  ) {
    return;
  }


  state.currentStep = step;


  Object.values(stepPanels).forEach(panel => {
    panel.classList.remove("active");
  });


  stepPanels[step].classList.add("active");


  stepButtons.forEach(button => {

    const buttonStep =
      Number(button.dataset.step);

    button.classList.toggle(
      "active",
      buttonStep === step
    );

  });


  timelineItems.forEach(item => {

    const itemStep =
      Number(item.dataset.timeline);

    item.classList.toggle(
      "active",
      itemStep === step
    );

    item.classList.toggle(
      "completed",
      itemStep < state.currentStep
    );

  });


  topbarStage.textContent =
    stageNames[step];


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}



/* =========================================================
   STEP UNLOCKING
========================================================= */

function unlockStep(step) {

  if (step > state.unlockedStep) {
    state.unlockedStep = step;
  }


  stepButtons.forEach(button => {

    const buttonStep =
      Number(button.dataset.step);

    if (buttonStep <= state.unlockedStep) {

      button.classList.remove("locked");

      button.querySelector(".step-status").textContent =
        buttonStep < state.unlockedStep
          ? "✓"
          : "●";

    }

  });

}



/* =========================================================
   STEP BUTTONS
========================================================= */

stepButtons.forEach(button => {

  button.addEventListener("click", () => {

    const step =
      Number(button.dataset.step);

    setStep(step);

  });

});



/* =========================================================
   BEGIN EXPERIMENT
========================================================= */

beginExperiment.addEventListener("click", () => {

  state.experimentStarted = true;

  unlockStep(2);

  setStep(2);

});



/* =========================================================
   MODE SWITCH
========================================================= */


/*
   GUIDED MODE
   ------------
   Experiment must proceed in order.

   FREE MODE
   ---------
   Once the experiment begins, every stage becomes accessible.
   The user can revisit the simulation and change parameters.

   This is intentionally different from the Start button.
*/

guidedMode.addEventListener("click", () => {

  state.mode = "guided";

  guidedMode.classList.add("active");
  freeMode.classList.remove("active");


  if (state.currentStep > state.unlockedStep) {
    setStep(state.unlockedStep);
  }

});


freeMode.addEventListener("click", () => {

  state.mode = "free";

  freeMode.classList.add("active");
  guidedMode.classList.remove("active");


  if (state.experimentStarted) {

    state.unlockedStep = 4;

    stepButtons.forEach(button => {
      button.classList.remove("locked");
    });

  }

});



/* =========================================================
   DECELLULARIZATION
========================================================= */

startDecellularization.addEventListener(
  "click",
  startDecellularizationModel
);


function startDecellularizationModel() {

  if (state.decellComplete) {
    return;
  }


  startDecellularization.disabled = true;

  startDecellularization.innerHTML =
    "<span>Running Decellularization Model...</span><b>◌</b>";


  decellStatus.classList.add("running");

  decellStatus.classList.remove("complete");

  decellStatus.innerHTML =
    "<i></i> RUNNING";


  let startTime = null;

  const duration = 8000;


  function animate(timestamp) {

    if (!startTime) {
      startTime = timestamp;
    }


    const elapsed =
      timestamp - startTime;


    const progress =
      Math.min(elapsed / duration, 1);


    state.decellProgress =
      progress * 100;


    updateDecellVisual(
      state.decellProgress
    );


    if (progress < 1) {

      requestAnimationFrame(animate);

    } else {

      finishDecellularization();

    }

  }


  requestAnimationFrame(animate);

}



/* =========================================================
   DECELL VISUAL MODEL
========================================================= */

function updateDecellVisual(progress) {

  const p =
    Math.max(
      0,
      Math.min(100, progress)
    );


  /*
    This is intentionally a visual model.

    It does NOT represent a measured biochemical
    decellularization percentage.
  */


  const remaining =
    100 - (p * 0.92);


  const visibility =
    20 + (p * 0.76);


  cellularRemaining.textContent =
    `${Math.round(remaining)}%`;


  vascularVisibility.textContent =
    `${Math.round(visibility)}%`;


  cellularBar.style.width =
    `${Math.max(8, remaining)}%`;


  vascularBar.style.width =
    `${Math.min(96, visibility)}%`;


  decellProgressBar.style.width =
    `${p}%`;


  decellProgressText.textContent =
    `${Math.round(p)}%`;


  /*
    Main leaf model:
    cellular material fades,
    vascular network becomes more visible.
  */

  if (cellularLayer) {

    const opacity =
      1 - (p / 100) * 0.92;

    cellularLayer.style.opacity =
      opacity;

  }


  if (vascularNetwork) {

    const opacity =
      0.45 + (p / 100) * 0.55;

    vascularNetwork.style.opacity =
      opacity;

  }


  updateProcessSteps(p);

}



/* =========================================================
   PROCESS STEP VISUAL
========================================================= */

function updateProcessSteps(progress) {

  const steps =
    document.querySelectorAll(
      ".process-step"
    );


  let activeIndex = 0;


  if (progress >= 15 && progress < 65) {
    activeIndex = 1;
  }

  if (progress >= 65 && progress < 90) {
    activeIndex = 2;
  }

  if (progress >= 90) {
    activeIndex = 3;
  }


  steps.forEach((step, index) => {

    step.classList.toggle(
      "active",
      index === activeIndex
    );

    step.classList.toggle(
      "completed",
      index < activeIndex
    );

  });

}



/* =========================================================
   FINISH DECELLULARIZATION
========================================================= */

function finishDecellularization() {

  state.decellComplete = true;


  state.decellProgress = 100;


  updateDecellVisual(100);


  decellStatus.classList.remove("running");

  decellStatus.classList.add("complete");

  decellStatus.innerHTML =
    "<i></i> MODEL COMPLETE";


  startDecellularization.disabled = true;

  startDecellularization.innerHTML =
    "<span>Decellularization Model Complete</span><b>✓</b>";


  continueToFlow.classList.remove("hidden");


  unlockStep(3);


  if (state.mode === "guided") {

    setTimeout(() => {

      continueToFlow.focus();

    }, 100);

  }

}



/* =========================================================
   CONTINUE TO FLOW
========================================================= */

continueToFlow.addEventListener("click", () => {

  if (!state.decellComplete) {
    return;
  }


  setStep(3);

});



/* =========================================================
   FLOW CONTROLS
========================================================= */

dyeRange.addEventListener("input", () => {

  state.dye =
    Number(dyeRange.value);


  updateFlowControls();

});


timeRange.addEventListener("input", () => {

  state.observationTime =
    Number(timeRange.value);


  updateFlowControls();

});


function updateFlowControls() {

  dyeValue.textContent =
    `${state.dye}%`;


  timeValue.textContent =
    state.observationTime;


  updateModelValues();

}



/* =========================================================
   FLOW MODEL
========================================================= */

function calculateFlowModel() {

  /*
    Educational model only.

    Dye intensity:
    - affects how visible the tracer is

    Observation time:
    - increases modeled network reach

    These values are NOT experimentally calibrated.
  */


  const dyeFactor =
    state.dye / 100;


  const time =
    state.observationTime;


  const timeFactor =
    Math.min(
      1,
      time / 30
    );


  const modeledDistance =
    20 +
    (dyeFactor * 18) +
    (timeFactor * 62);


  const modeledCoverage =
    Math.min(
      96,
      18 +
      (dyeFactor * 25) +
      (timeFactor * 58)
    );


  const modeledVelocity =
    modeledDistance / time;


  return {

    distance: modeledDistance,

    coverage: modeledCoverage,

    velocity: modeledVelocity

  };

}



/* =========================================================
   UPDATE MODEL VALUES
========================================================= */

function updateModelValues() {

  const result =
    calculateFlowModel();


  state.distance =
    result.distance;


  state.coverage =
    result.coverage;


  state.velocity =
    result.velocity;


  if (!state.flowRunning) {

    distanceValue.textContent =
      "0";

    velocityValue.textContent =
      "0";

    coverageValue.textContent =
      "0";

  }

}



/* =========================================================
   START FLOW
========================================================= */

startFlow.addEventListener(
  "click",
  startTracerFlow
);


function startTracerFlow() {

  if (state.flowRunning) {
    return;
  }


  state.flowRunning = true;

  state.flowComplete = false;


  startFlow.classList.add("hidden");

  stopFlow.classList.remove("hidden");


  flowStatus.classList.add("running");

  flowStatus.classList.remove("complete");

  flowStatus.innerHTML =
    "<i></i> FLOW RUNNING";


  /*
    Make tracer particles visible.
  */

  flowParticles.forEach(
    particle => {

      particle.style.opacity =
        0.35 +
        state.dye / 150;

    }
  );


  animateFlow();

}



/* =========================================================
   FLOW ANIMATION
========================================================= */

function animateFlow() {

  const result =
    calculateFlowModel();


  state.distance =
    result.distance;


  state.coverage =
    result.coverage;


  state.velocity =
    result.velocity;


  distanceValue.textContent =
    state.distance.toFixed(1);


  velocityValue.textContent =
    state.velocity.toFixed(2);


  coverageValue.textContent =
    Math.round(state.coverage);


  /*
    Particle animation.

    The paths are SVG paths. Each particle follows
    the main vascular path visually.
  */


  const mainPath =
    document.querySelector(
      ".main-flow-vein"
    );


  if (!mainPath) {
    finishFlow();
    return;
  }


  const totalLength =
    mainPath.getTotalLength();


  const start =
    performance.now();


  function frame(now) {

    if (!state.flowRunning) {
      return;
    }


    const elapsed =
      now - start;


    /*
      Longer observation time = slower visual cycle,
      but more network coverage in the model.
    */

    const cycleDuration =
      4200 /
      Math.max(
        0.6,
        state.dye / 60
      );


    const baseProgress =
      (elapsed % cycleDuration) /
      cycleDuration;


    flowParticles.forEach(
      (particle, index) => {

        const offset =
          index * 0.085;


        let progress =
          baseProgress + offset;


        if (progress > 1) {
          progress -= 1;
        }


        const point =
          mainPath.getPointAtLength(
            progress * totalLength
          );


        particle.setAttribute(
          "cx",
          point.x
        );


        particle.setAttribute(
          "cy",
          point.y
        );


        particle.style.opacity =
          Math.max(
            0,
            Math.sin(progress * Math.PI)
          ) *
          (0.45 + state.dye / 120);

      }
    );


    /*
      Flow runs until one visual cycle is complete.
    */

    if (elapsed < cycleDuration * 1.25) {

      state.animationFrame =
        requestAnimationFrame(frame);

    } else {

      finishFlow();

    }

  }


  state.animationFrame =
    requestAnimationFrame(frame);

}



/* =========================================================
   FINISH FLOW
========================================================= */

function finishFlow() {

  state.flowRunning = false;

  state.flowComplete = true;


  if (state.animationFrame) {

    cancelAnimationFrame(
      state.animationFrame
    );

  }


  const result =
    calculateFlowModel();


  state.distance =
    result.distance;


  state.coverage =
    result.coverage;


  state.velocity =
    result.velocity;


  distanceValue.textContent =
    state.distance.toFixed(1);


  velocityValue.textContent =
    state.velocity.toFixed(2);


  coverageValue.textContent =
    Math.round(state.coverage);


  flowParticles.forEach(
    particle => {

      particle.style.opacity =
        0.15;

    }
  );


  startFlow.classList.remove("hidden");

  stopFlow.classList.add("hidden");


  startFlow.innerHTML =
    "<span>Run Tracer Flow Again</span><b>↻</b>";


  flowStatus.classList.remove("running");

  flowStatus.classList.add("complete");

  flowStatus.innerHTML =
    "<i></i> MODEL COMPLETE";


  continueToAnalysis.classList.remove(
    "hidden"
  );


  unlockStep(4);


  updateAnalysis();

}



/* =========================================================
   STOP FLOW
========================================================= */

stopFlow.addEventListener("click", () => {

  state.flowRunning = false;


  if (state.animationFrame) {

    cancelAnimationFrame(
      state.animationFrame
    );

  }


  flowParticles.forEach(
    particle => {

      particle.style.opacity = 0;

    }
  );


  startFlow.classList.remove("hidden");

  stopFlow.classList.add("hidden");


  flowStatus.classList.remove(
    "running"
  );

  flowStatus.innerHTML =
    "<i></i> STOPPED";

});



/* =========================================================
   CONTINUE TO ANALYSIS
========================================================= */

continueToAnalysis.addEventListener(
  "click",
  () => {

    if (!state.flowComplete) {
      return;
    }


    updateAnalysis();

    setStep(4);

  }
);



/* =========================================================
   CHART
========================================================= */

function setupChart() {

  const canvas =
    document.getElementById(
      "coverageChart"
    );


  if (!canvas || typeof Chart === "undefined") {
    return;
  }


  const ctx =
    canvas.getContext("2d");


  state.chart =
    new Chart(ctx, {

      type: "line",

      data: {

        labels: [
          "2",
          "6",
          "10",
          "14",
          "18",
          "22",
          "26",
          "30"
        ],

        datasets: [

          {

            label:
              "Modelled network coverage",

            data:
              calculateCoverageCurve(),

            borderWidth: 2,

            tension: 0.35,

            pointRadius: 2,

            pointHoverRadius: 4

          }

        ]

      },


      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {
            display: false
          },

          tooltip: {

            callbacks: {

              label: context => {

                return `${context.parsed.y}% model coverage`;

              }

            }

          }

        },


        scales: {

          x: {

            grid: {
              color:
                "rgba(255,255,255,0.035)"
            },

            ticks: {

              color: "#61766e",

              font: {
                size: 8
              }

            },

            title: {

              display: true,

              text:
                "Observation time",

              color: "#4f665e",

              font: {
                size: 8
              }

            }

          },


          y: {

            beginAtZero: true,

            max: 100,

            grid: {
              color:
                "rgba(255,255,255,0.035)"
            },

            ticks: {

              color: "#61766e",

              font: {
                size: 8
              },

              callback: value => `${value}%`

            }

          }

        }

      }

    });

}



/* =========================================================
   COVERAGE CURVE
========================================================= */

function calculateCoverageCurve() {

  const values = [];


  for (
    let time = 2;
    time <= 30;
    time += 4
  ) {

    const dyeFactor =
      state.dye / 100;


    const timeFactor =
      Math.min(
        1,
        time / 30
      );


    const coverage =
      Math.min(
        96,
        18 +
        (dyeFactor * 25) +
        (timeFactor * 58)
      );


    values.push(
      Math.round(coverage)
    );

  }


  return values;

}



/* =========================================================
   UPDATE CHART
========================================================= */

function updateChart() {

  if (!state.chart) {
    return;
  }


  state.chart.data.datasets[0].data =
    calculateCoverageCurve();


  state.chart.update();

}



/* =========================================================
   ANALYSIS
========================================================= */

function updateAnalysis() {

  const structuralVisibility =
    Math.round(
      20 +
      (state.decellProgress * 0.76)
    );


  finalVisibility.textContent =
    `${structuralVisibility}%`;


  finalCoverage.textContent =
    `${Math.round(state.coverage)}%`;


  finalVelocity.textContent =
    state.velocity > 0
      ? state.velocity.toFixed(2)
      : "0";


  updateChart();

}



/* =========================================================
   RESET
========================================================= */

resetButton.addEventListener(
  "click",
  resetExperiment
);


restartExperiment.addEventListener(
  "click",
  resetExperiment
);


function resetExperiment() {

  /*
    Stop animations
  */

  state.flowRunning = false;


  if (state.animationFrame) {

    cancelAnimationFrame(
      state.animationFrame
    );

  }


  /*
    Reset state
  */

  state.currentStep = 1;

  state.unlockedStep = 1;

  state.experimentStarted = false;

  state.decellProgress = 0;

  state.decellComplete = false;

  state.flowRunning = false;

  state.flowComplete = false;

  state.dye = 60;

  state.observationTime = 10;

  state.distance = 0;

  state.velocity = 0;

  state.coverage = 0;


  /*
    Reset controls
  */

  dyeRange.value = 60;

  timeRange.value = 10;


  dyeValue.textContent =
    "60%";

  timeValue.textContent =
    "10";


  /*
    Reset decell
  */

  startDecellularization.disabled =
    false;


  startDecellularization.innerHTML =
    "<span>Start Decellularization Model</span><b>▶</b>";


  continueToFlow.classList.add(
    "hidden"
  );


  decellStatus.classList.remove(
    "running",
    "complete"
  );


  decellStatus.innerHTML =
    "<i></i> READY";


  updateDecellVisual(0);


  /*
    Reset flow
  */

  startFlow.classList.remove(
    "hidden"
  );


  stopFlow.classList.add(
    "hidden"
  );


  continueToAnalysis.classList.add(
    "hidden"
  );


  startFlow.innerHTML =
    "<span>Start Tracer Flow</span><b>▶</b>";


  flowStatus.classList.remove(
    "running",
    "complete"
  );


  flowStatus.innerHTML =
    "<i></i> READY";


  flowParticles.forEach(
    particle => {

      particle.style.opacity = 0;

      particle.setAttribute(
        "cx",
        "100"
      );

      particle.setAttribute(
        "cy",
        "330"
      );

    }
  );


  /*
    Reset navigation
  */

  stepButtons.forEach(
    button => {

      const step =
        Number(button.dataset.step);


      button.classList.remove(
        "completed"
      );


      if (step === 1) {

        button.classList.remove(
          "locked"
        );

        button.querySelector(
          ".step-status"
        ).textContent = "●";

      } else {

        button.classList.add(
          "locked"
        );

        button.querySelector(
          ".step-status"
        ).textContent = "○";

      }

    }
  );


  /*
    Reset mode to Guided
  */

  state.mode = "guided";

  guidedMode.classList.add("active");
  freeMode.classList.remove("active");


  /*
    Reset analysis
  */

  updateAnalysis();


  /*
    Return to beginning
  */

  setStep(1);

}



/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      if (state.flowRunning) {

        stopFlow.click();

      }

    }

  }
);
