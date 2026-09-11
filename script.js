/* =========================================

   SPINACH VASCULAR LAB

   Educational Simulation

========================================= */

/* =========================================

   EXPERIMENT STATE

========================================= */

const experiment = {

    currentStep: 1,

    started: false,

    treatmentStarted: false,

    washingCompleted: false,

    flowStarted: false,

    analysisReady: false,

    treatmentProgress: 0,

    cellularRemoval: 0,

    structuralPreservation: 100,

    tracerConcentration: 50,

    observationTime: 30,

    tracerDistance: 0,

    tracerCoverage: 0,

    modelVelocity: 0,

    chart: null

};

/* =========================================

   STEP NAVIGATION

========================================= */

function showStep(step) {

    const sections =

        document.querySelectorAll(".experiment-step");

    sections.forEach(section => {

        section.classList.remove("active");

    });

    const target =

        document.getElementById(`step-${step}`);

    if (target) {

        target.classList.add("active");

    }

    const buttons =

        document.querySelectorAll(".step-button");

    buttons.forEach(button => {

        button.classList.remove("active");

        if (

            Number(button.dataset.step) === step

        ) {

            button.classList.add("active");

        }

    });

    experiment.currentStep = step;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* =========================================

   STEP 1

========================================= */

function beginExperiment() {

    experiment.started = true;

    showStep(2);

    const status =

        document.getElementById("decell-status");

    status.textContent = "READY";

    updateDecellularizationUI();

}

/* =========================================

   TREATMENT SLIDER

========================================= */

const treatmentSlider =

    document.getElementById("treatment-slider");

if (treatmentSlider) {

    treatmentSlider.addEventListener(

        "input",

        function () {

            const value =

                Number(this.value);

            experiment.treatmentProgress =

                value;

            updateTreatmentFromSlider();

        }

    );

}

/* =========================================

   TREATMENT MODEL

========================================= */

function updateTreatmentFromSlider() {

    const progress =

        experiment.treatmentProgress;

    /*

       This is intentionally a MODEL.

       It does not claim that a particular

       treatment percentage corresponds to

       a real chemical concentration/time.

    */

    experiment.cellularRemoval =

        Math.round(progress * 0.92);

    /*

       We assume that structural preservation

       remains relatively high while treatment

       progresses, but may decrease slightly

       at extreme treatment levels.

       This is an educational model, not

       experimental data.

    */

    experiment.structuralPreservation =

        Math.max(

            82,

            Math.round(

                100 - Math.max(0, progress - 70) * 0.45

            )

        );

    document.getElementById(

        "treatment-progress-text"

    ).textContent =

        `${progress}%`;

    document.getElementById(

        "cell-removal-value"

    ).textContent =

        `${experiment.cellularRemoval}%`;

    document.getElementById(

        "structure-value"

    ).textContent =

        `${experiment.structuralPreservation}%`;

    document.getElementById(

        "preservation-display"

    ).textContent =

        `${experiment.structuralPreservation}%`;

    document.getElementById(

        "cell-removal-bar"

    ).style.width =

        `${experiment.cellularRemoval}%`;

    document.getElementById(

        "structure-bar"

    ).style.width =

        `${experiment.structuralPreservation}%`;

    const leaf =

        document.querySelector(".decell-leaf");

    if (leaf) {

        leaf.className =

            "leaf decell-leaf";

        if (progress > 0) {

            const level =

                Math.round(progress / 10) * 10;

            leaf.classList.add(

                `treatment-${level}`

            );

        }

    }

    const result =

        document.getElementById(

            "decell-result"

        );

    if (progress === 0) {

        result.textContent =

            "Treatment has not started.";

    }

    else if (progress < 30) {

        result.textContent =

            "Early cellular-material removal is being modeled. The leaf remains visibly green.";

    }

    else if (progress < 60) {

        result.textContent =

            "The model shows decreasing cellular pigmentation while the main vascular structure remains visible.";

    }

    else if (progress < 90) {

        result.textContent =

            "Most cellular coloration has been removed in the model. The major vein network remains visible.";

    }

    else {

        result.textContent =

            "The model predicts substantial cellular-material removal with preserved structural pathways. This visual result alone cannot prove complete decellularization.";

    }

    if (progress > 0) {

        document.getElementById(

            "decell-status"

        ).textContent =

            "RUNNING";

    }

    if (progress >= 100) {

        experiment.treatmentStarted = true;

        document.getElementById(

            "decell-status"

        ).textContent =

            "COMPLETE";

        document.getElementById(

            "treatment-button"

        ).textContent =

            "TREATMENT COMPLETE";

        document.getElementById(

            "treatment-button"

        ).disabled =

            true;

        document.getElementById(

            "wash-button"

        ).classList.remove("hidden");

    }

}

/* =========================================

   START TREATMENT

========================================= */

function startTreatment() {

    if (experiment.treatmentStarted) {

        return;

    }

    const button =

        document.getElementById(

            "treatment-button"

        );

    button.disabled = true;

    button.textContent =

        "TREATMENT IN PROGRESS";

    let progress = 0;

    const interval =

        setInterval(() => {

            progress += 2;

            treatmentSlider.value =

                progress;

            experiment.treatmentProgress =

                progress;

            updateTreatmentFromSlider();

            if (progress >= 100) {

                clearInterval(interval);

                button.textContent =

                    "TREATMENT COMPLETE";

            }

        }, 70);

}

/* =========================================

   WASHING

========================================= */

function completeWashing() {

    experiment.washingCompleted = true;

    const status =

        document.getElementById(

            "decell-status"

        );

    status.textContent =

        "WASHED";

    const result =

        document.getElementById(

            "decell-result"

        );

    result.textContent =

        "Virtual washing is complete. The model now treats the sample as a processed, rehydrated scaffold for the flow simulation.";

    const button =

        document.getElementById(

            "wash-button"

        );

    button.textContent =

        "WASH COMPLETE";

    button.disabled = true;

    setTimeout(() => {

        showStep(3);

    }, 700);

}

/* =========================================

   FLOW SLIDERS

========================================= */

const dyeSlider =

    document.getElementById("dye-slider");

const timeSlider =

    document.getElementById("time-slider");

if (dyeSlider) {

    dyeSlider.addEventListener(

        "input",

        function () {

            experiment.tracerConcentration =

                Number(this.value);

            document.getElementById(

                "dye-value"

            ).textContent =

                `${this.value}%`;

        }

    );

}

if (timeSlider) {

    timeSlider.addEventListener(

        "input",

        function () {

            experiment.observationTime =

                Number(this.value);

            document.getElementById(

                "time-value"

            ).textContent =

                this.value;

        }

    );

}

/* =========================================

   FLOW MODEL

========================================= */

function calculateFlowModel() {

    const concentration =

        experiment.tracerConcentration;

    const time =

        experiment.observationTime;

    /*

       Educational transport model.

       It deliberately does NOT use a claim

       that this equals real physiological flow.

    */

    const baseDistance =

        0.55 * time;

    const concentrationFactor =

        0.55 + concentration / 200;

    experiment.tracerDistance =

        Math.min(

            55,

            baseDistance * concentrationFactor

        );

    experiment.modelVelocity =

        experiment.tracerDistance / time;

    experiment.tracerCoverage =

        Math.min(

            100,

            Math.round(

                experiment.tracerDistance * 1.7

            )

        );

}

/* =========================================

   INJECT DYE

========================================= */

function injectDye() {

    if (!experiment.washingCompleted) {

        /*

           Normally unreachable because the user

           reaches this page through the wash step.

        */

        alert(

            "Please complete the decellularization and washing stages first."

        );

        return;

    }

    experiment.flowStarted = true;

    calculateFlowModel();

    document.getElementById(

        "flow-status"

    ).textContent =

        "FLOW ACTIVE";

    document.getElementById(

        "flow-label"

    ).textContent =

        "TRACER MOVING THROUGH NETWORK";

    updateFlowReadout();

    animateTracer();

    const button =

        document.getElementById(

            "inject-button"

        );

    button.disabled = true;

    button.textContent =

        "TRACER INJECTED";

    setTimeout(() => {

        button.textContent =

            "FLOW OBSERVED";

        document.getElementById(

            "analysis-button"

        ).classList.remove("hidden");

        experiment.analysisReady = true;

    }, 3200);

}

/* =========================================

   FLOW READOUT

========================================= */

function updateFlowReadout() {

    document.getElementById(

        "distance-value"

    ).textContent =

        experiment.tracerDistance.toFixed(1);

    document.getElementById(

        "velocity-value"

    ).textContent =

        experiment.modelVelocity.toFixed(2);

    document.getElementById(

        "coverage-value"

    ).textContent =

        experiment.tracerCoverage;

}

/* =========================================

   TRACER ANIMATION

========================================= */

function animateTracer() {

    const layer =

        document.getElementById(

            "dye-layer"

        );

    layer.innerHTML = "";

    /*

       Approximate vein coordinates inside

       the visualization.

       These are visual model coordinates,

       not measured anatomical coordinates.

    */

    const path = [

        [50, 73],

        [50, 65],

        [50, 57],

        [50, 49],

        [50, 42],

        [47, 36],

        [42, 32],

        [36, 29],

        [31, 26]

    ];

    path.forEach(

        (point, index) => {

            const particle =

                document.createElement("div");

            particle.className =

                "flow-particle";

            particle.style.left =

                `${point[0]}%`;

            particle.style.top =

                `${point[1]}%`;

            particle.style.opacity =

                "0";

            particle.style.animationDelay =

                `${index * 0.22}s`;

            layer.appendChild(

                particle

            );

            setTimeout(() => {

                particle.style.opacity =

                    "1";

            }, index * 220);

        }

    );

    /*

       Add branch particles after the main

       pathway becomes visible.

    */

    setTimeout(() => {

        createBranchParticles();

    }, 1800);

}

/* =========================================

   BRANCH PARTICLES

========================================= */

function createBranchParticles() {

    const layer =

        document.getElementById(

            "dye-layer"

        );

    const branches = [

        [42, 34],

        [35, 40],

        [57, 44],

        [37, 50],

        [62, 54],

        [39, 61]

    ];

    branches.forEach(

        (point, index) => {

            const particle =

                document.createElement("div");

            particle.className =

                "flow-particle";

            particle.style.left =

                `${point[0]}%`;

            particle.style.top =

                `${point[1]}%`;

            particle.style.opacity =

                "0";

            layer.appendChild(

                particle

            );

            setTimeout(() => {

                particle.style.opacity =

                    "1";

            }, index * 170);

        }

    );

}

/* =========================================

   ANALYSIS

========================================= */

function goToAnalysis() {

    if (!experiment.analysisReady) {

        return;

    }

    updateAnalysis();

    showStep(4);

}

/* =========================================

   UPDATE ANALYSIS

========================================= */

function updateAnalysis() {

    calculateFlowModel();

    document.getElementById(

        "metric-removal"

    ).textContent =

        `${experiment.cellularRemoval}%`;

    document.getElementById(

        "metric-preservation"

    ).textContent =

        `${experiment.structuralPreservation}%`;

    document.getElementById(

        "metric-coverage"

    ).textContent =

        `${experiment.tracerCoverage}%`;

    document.getElementById(

        "metric-velocity"

    ).textContent =

        experiment.modelVelocity.toFixed(2);

    const observation =

        document.getElementById(

            "observation-text"

        );

    observation.innerHTML = `

        The simulation models substantial removal of

        cellular material while retaining a visible

        branching structure.

        <br><br>

        After the virtual washing stage, the tracer

        reaches the modeled main vein and branches.

        <br><br>

        The calculated model velocity is

        <strong>${experiment.modelVelocity.toFixed(2)} mm/s</strong>,

        based only on the simulated distance and

        observation time.

    `;

    const interpretation =

        document.getElementById(

            "interpretation-text"

        );

    interpretation.innerHTML = `

        The simulation is consistent with the intended

        hypothesis at the <strong>model level</strong>:

        the structural network is represented as being

        retained after cellular-material removal, and a

        liquid tracer can be represented as traveling

        through that network.

        <br><br>

        However, this does <strong>not</strong> demonstrate

        complete decellularization or equivalence to human

        blood vessels. Those conclusions require actual

        experimental measurements such as DNA/protein

        quantification, histological assessment, and

        independent perfusion testing.

    `;

    const summary =

        document.getElementById(

            "final-summary"

        );

    summary.textContent =

        "The virtual experiment produced the expected model behavior: cellular material decreased, the modeled leaf vascular structure remained largely preserved, and tracer transport through the network was observed. These are simulated observations rather than measurements from a real spinach leaf.";

    createChart();

}

/* =========================================

   CHART

========================================= */

function createChart() {

    const canvas =

        document.getElementById(

            "flowChart"

        );

    if (!canvas) {

        return;

    }

    if (experiment.chart) {

        experiment.chart.destroy();

    }

    const totalTime =

        experiment.observationTime;

    const labels = [];

    const data = [];

    const points = 7;

    for (

        let i = 0;

        i <= points;

        i++

    ) {

        const time =

            Math.round(

                (totalTime / points) * i

            );

        labels.push(

            `${time}s`

        );

        const coverage =

            Math.min(

                100,

                Math.round(

                    experiment.tracerCoverage *

                    (i / points)

                )

            );

        data.push(

            coverage

        );

    }

    experiment.chart =

        new Chart(

            canvas.getContext("2d"),

            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:

                                "Simulated tracer coverage",

                            data: data,

                            borderColor:

                                "#6fd39a",

                            backgroundColor:

                                "rgba(111,211,154,0.10)",

                            borderWidth: 2,

                            tension: 0.35,

                            fill: true,

                            pointRadius: 3,

                            pointBackgroundColor:

                                "#6fd39a"

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            labels: {

                                color: "#7e8a90",

                                font: {

                                    size: 10

                                }

                            }

                        }

                    },

                    scales: {

                        x: {

                            ticks: {

                                color: "#69767c",

                                font: {

                                    size: 10

                                }

                            },

                            grid: {

                                color:

                                    "rgba(90,105,110,0.12)"

                            }

                        },

                        y: {

                            beginAtZero: true,

                            max: 100,

                            title: {

                                display: true,

                                text:

                                    "Coverage (%)",

                                color: "#69767c"

                            },

                            ticks: {

                                color: "#69767c"

                            },

                            grid: {

                                color:

                                    "rgba(90,105,110,0.12)"

                            }

                        }

                    }

                }

            }

        );

}

/* =========================================

   DECELLULARIZATION UI

========================================= */

function updateDecellularizationUI() {

    document.getElementById(

        "treatment-slider"

    ).value =

        experiment.treatmentProgress;

    updateTreatmentFromSlider();

}

/* =========================================

   RESET

========================================= */

function resetExperiment() {

    experiment.currentStep = 1;

    experiment.started = false;

    experiment.treatmentStarted = false;

    experiment.washingCompleted = false;

    experiment.flowStarted = false;

    experiment.analysisReady = false;

    experiment.treatmentProgress = 0;

    experiment.cellularRemoval = 0;

    experiment.structuralPreservation = 100;

    experiment.tracerConcentration = 50;

    experiment.observationTime = 30;

    experiment.tracerDistance = 0;

    experiment.tracerCoverage = 0;

    experiment.modelVelocity = 0;

    /* treatment */

    const treatment =

        document.getElementById(

            "treatment-slider"

        );

    treatment.value = 0;

    const treatmentButton =

        document.getElementById(

            "treatment-button"

        );

    treatmentButton.disabled = false;

    treatmentButton.textContent =

        "START TREATMENT";

    document.getElementById(

        "wash-button"

    ).classList.add("hidden");

    document.getElementById(

        "decell-status"

    ).textContent =

        "READY";

    /* flow */

    document.getElementById(

        "dye-slider"

    ).value = 50;

    document.getElementById(

        "time-slider"

    ).value = 30;

    document.getElementById(

        "dye-value"

    ).textContent =

        "50%";

    document.getElementById(

        "time-value"

    ).textContent =

        "30";

    document.getElementById(

        "distance-value"

    ).textContent =

        "0.0";

    document.getElementById(

        "velocity-value"

    ).textContent =

        "0.00";

    document.getElementById(

        "coverage-value"

    ).textContent =

        "0";

    document.getElementById(

        "flow-status"

    ).textContent =

        "READY";

    document.getElementById(

        "flow-label"

    ).textContent =

        "WAITING FOR INJECTION";

    const injectButton =

        document.getElementById(

            "inject-button"

        );

    injectButton.disabled = false;

    injectButton.textContent =

        "INJECT TRACER";

    document.getElementById(

        "analysis-button"

    ).classList.add("hidden");

    document.getElementById(

        "dye-layer"

    ).innerHTML = "";

    /* analysis */

    document.getElementById(

        "metric-removal"

    ).textContent =

        "0%";

    document.getElementById(

        "metric-preservation"

    ).textContent =

        "100%";

    document.getElementById(

        "metric-coverage"

    ).textContent =

        "0%";

    document.getElementById(

        "metric-velocity"

    ).textContent =

        "0.00";

    document.getElementById(

        "observation-text"

    ).textContent =

        "No simulation has been completed yet.";

    document.getElementById(

        "interpretation-text"

    ).textContent =

        "Complete the simulated experiment to generate an interpretation.";

    document.getElementById(

        "final-summary"

    ).textContent =

        "Complete all simulated stages to obtain the final interpretation.";

    if (experiment.chart) {

        experiment.chart.destroy();

        experiment.chart = null;

    }

    updateDecellularizationUI();

    showStep(1);

}

/* =========================================

   INITIALIZE

========================================= */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        updateDecellularizationUI();

        showStep(1);

    }

);
