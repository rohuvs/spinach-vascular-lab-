// ============================================================
// SPINACH VASCULAR LAB
// Virtual Decellularization & Vascular Simulation
// ============================================================

// ------------------------------------------------------------
// Experiment State
// ------------------------------------------------------------

let experimentData = {
    sampleId: "SP-2026-001",

    decellularization: {
        efficiency: 70,
        preservation: 0,
        completed: false
    },

    flow: {
        dyeConcentration: 50,
        observationTime: 30,
        distance: 0,
        velocity: 0,
        coverage: 0,
        completed: false
    },

    currentStep: 1
};

let flowInterval = null;
let chart = null;


// ------------------------------------------------------------
// DOM Helper
// ------------------------------------------------------------

function $(id) {
    return document.getElementById(id);
}


// ------------------------------------------------------------
// STEP Navigation
// ------------------------------------------------------------

function showStep(stepNumber) {

    experimentData.currentStep = stepNumber;

    const sections = [
        document.querySelector("#step1"),
        document.querySelector("#step2"),
        document.querySelector("#step3"),
        document.querySelector("#step4")
    ];

    sections.forEach((section, index) => {

        if (!section) return;

        if (index === stepNumber - 1) {
            section.style.display = "block";
            section.classList.add("active-step");
        } else {
            section.style.display = "none";
            section.classList.remove("active-step");
        }
    });


    // --------------------------------------------------------
    // Sidebar
    // --------------------------------------------------------

    const sidebarSteps = document.querySelectorAll(".step");

    sidebarSteps.forEach((step, index) => {

        step.classList.remove("active");
        step.classList.remove("completed");

        if (index === stepNumber - 1) {
            step.classList.add("active");
        }

        if (index < stepNumber - 1) {
            step.classList.add("completed");
        }
    });


    // --------------------------------------------------------
    // Update step indicators
    // --------------------------------------------------------

    const stepLabels = document.querySelectorAll("[data-step]");

    stepLabels.forEach(label => {

        const number = Number(label.dataset.step);

        if (number === stepNumber) {
            label.classList.add("active");
        } else {
            label.classList.remove("active");
        }
    });


    // --------------------------------------------------------
    // Scroll to top
    // --------------------------------------------------------

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ------------------------------------------------------------
// STEP 01
// Sample Preparation
// ------------------------------------------------------------

function startDecellularization() {

    experimentData.currentStep = 2;

    showStep(2);

    const status = document.querySelector(".status");

    if (status) {
        status.textContent = "DECELLULARIZATION READY";
    }

    // Automatically focus the experimental control
    const decellPanel = document.querySelector("#step2");

    if (decellPanel) {
        decellPanel.classList.add("experiment-started");

        setTimeout(() => {
            decellPanel.classList.remove("experiment-started");
        }, 1200);
    }
}


// ------------------------------------------------------------
// STEP 02
// Decellularization Slider
// ------------------------------------------------------------

const decellSlider = $("decell-efficiency");

if (decellSlider) {

    experimentData.decellularization.efficiency =
        Number(decellSlider.value);

    decellSlider.addEventListener("input", function () {

        experimentData.decellularization.efficiency =
            Number(this.value);

        updateDecellValue();
    });
}


function updateDecellValue() {

    const value = experimentData.decellularization.efficiency;

    const output =
        $("decell-efficiency-value") ||
        $("efficiency-value") ||
        $("decell-value");

    if (output) {
        output.textContent = `${value}%`;
    }
}


// ------------------------------------------------------------
// Run Decellularization Simulation
// ------------------------------------------------------------

function runDecellularization() {

    const efficiency =
        experimentData.decellularization.efficiency;

    const leaf =
        document.querySelector(".leaf");

    const veins =
        document.querySelectorAll(".vein");

    const progress =
        $("decell-progress");

    const result =
        $("decell-result");

    const preservationBox =
        $("preservation");

    // Prevent duplicate animation
    if (window.decellRunning) return;

    window.decellRunning = true;


    // --------------------------------------------------------
    // Initial UI
    // --------------------------------------------------------

    const runButton =
        document.querySelector(
            "#run-decellularization"
        );

    if (runButton) {
        runButton.disabled = true;
        runButton.textContent = "PROCESSING...";
    }


    let progressValue = 0;

    const interval = setInterval(() => {

        progressValue += 2;

        if (progress) {
            progress.style.width = `${progressValue}%`;
        }


        // ----------------------------------------------------
        // Visual decellularization
        // ----------------------------------------------------

        if (leaf) {

            const fadeAmount =
                Math.min(progressValue / 100, 1);

            // Higher efficiency = stronger loss of green tissue
            const tissueOpacity =
                1 - fadeAmount * (efficiency / 100) * 0.85;

            leaf.style.filter =
                `saturate(${Math.max(
                    0.15,
                    tissueOpacity
                )}) brightness(${1 + fadeAmount * 0.18})`;
        }


        // Veins become more visible
        veins.forEach(vein => {

            const visibility =
                0.35 +
                (progressValue / 100) *
                0.65;

            vein.style.opacity = visibility;
        });


        if (progressValue >= 100) {

            clearInterval(interval);

            finishDecellularization();
        }

    }, 40);
}


// ------------------------------------------------------------
// Finish Decellularization
// ------------------------------------------------------------

function finishDecellularization() {

    const efficiency =
        experimentData.decellularization.efficiency;


    // --------------------------------------------------------
    // Educational simulation model
    // --------------------------------------------------------

    const preservation =
        Math.round(
            58 +
            efficiency * 0.38
        );


    experimentData.decellularization.preservation =
        Math.min(99, preservation);

    experimentData.decellularization.completed = true;


    // --------------------------------------------------------
    // Update result
    // --------------------------------------------------------

    const preservationBox =
        $("preservation");

    if (preservationBox) {

        preservationBox.textContent =
            `${experimentData.decellularization.preservation}%`;
    }


    const result =
        $("decell-result");

    if (result) {

        result.innerHTML = `
            <strong>Decellularization complete</strong>
            <br>
            Cellular tissue removal:
            ${efficiency}%
            <br>
            Estimated vascular structure preservation:
            ${experimentData.decellularization.preservation}%
        `;
    }


    // --------------------------------------------------------
    // Button
    // --------------------------------------------------------

    const runButton =
        document.querySelector(
            "#run-decellularization"
        );

    if (runButton) {

        runButton.disabled = false;
        runButton.textContent = "DECELLULARIZATION COMPLETE";
    }


    window.decellRunning = false;


    // --------------------------------------------------------
    // Move to next step
    // --------------------------------------------------------

    setTimeout(() => {

        showStep(3);

        const status =
            document.querySelector(".status");

        if (status) {
            status.textContent =
                "VASCULAR FLOW READY";
        }

    }, 1200);
}


// ------------------------------------------------------------
// STEP 03
// Dye Concentration
// ------------------------------------------------------------

const dyeSlider =
    $("dye-concentration");

if (dyeSlider) {

    experimentData.flow.dyeConcentration =
        Number(dyeSlider.value);

    dyeSlider.addEventListener("input", function () {

        experimentData.flow.dyeConcentration =
            Number(this.value);

        const output =
            $("dye-value") ||
            $("dye-concentration-value");

        if (output) {
            output.textContent = `${this.value}%`;
        }
    });
}


// ------------------------------------------------------------
// Observation Time
// ------------------------------------------------------------

const timeSlider =
    $("observation-time");

if (timeSlider) {

    experimentData.flow.observationTime =
        Number(timeSlider.value);

    timeSlider.addEventListener("input", function () {

        experimentData.flow.observationTime =
            Number(this.value);

        const output =
            $("time-value") ||
            $("observation-time-value");

        if (output) {
            output.textContent = `${this.value}s`;
        }
    });
}


// ------------------------------------------------------------
// Start Vascular Flow
// ------------------------------------------------------------

function startFlow() {

    if (!experimentData.decellularization.completed) {

        alert(
            "Please complete decellularization first."
        );

        return;
    }


    // Prevent duplicate flow
    if (flowInterval) {
        clearInterval(flowInterval);
        flowInterval = null;
    }


    const button =
        document.querySelector(
            "#inject-dye"
        );


    if (button) {

        button.disabled = true;
        button.textContent = "DYE INJECTION...";
    }


    const leaf =
        document.querySelector(".leaf");


    // --------------------------------------------------------
    // Activate vascular network
    // --------------------------------------------------------

    const veins =
        document.querySelectorAll(".vein");

    veins.forEach(vein => {

        vein.classList.add("flow-active");

        vein.style.transition =
            "all 0.8s ease";
    });


    if (leaf) {
        leaf.classList.add("flow-running");
    }


    // --------------------------------------------------------
    // Create moving dye particles
    // --------------------------------------------------------

    createFlowParticles();


    // --------------------------------------------------------
    // Simulation values
    // --------------------------------------------------------

    const concentration =
        experimentData.flow.dyeConcentration;

    const observationTime =
        experimentData.flow.observationTime;


    // Distance model
    const distance =
        4.5 +
        concentration * 0.11 +
        observationTime * 0.32;


    // Velocity
    const velocity =
        distance /
        Math.max(observationTime, 1);


    // Network coverage
    const coverage =
        18 +
        concentration * 0.43 +
        observationTime * 0.72;


    experimentData.flow.distance =
        Math.round(distance * 10) / 10;

    experimentData.flow.velocity =
        Math.round(velocity * 100) / 100;

    experimentData.flow.coverage =
        Math.min(
            99,
            Math.round(coverage)
        );


    // --------------------------------------------------------
    // Animate experimental progress
    // --------------------------------------------------------

    let progress = 0;

    flowInterval = setInterval(() => {

        progress += 2;


        updateFlowTelemetry(
            progress
        );


        if (progress >= 100) {

            clearInterval(flowInterval);

            flowInterval = null;

            finishFlow();
        }

    }, 50);
}


// ------------------------------------------------------------
// Flow Telemetry
// ------------------------------------------------------------

function updateFlowTelemetry(progress) {

    const distance =
        experimentData.flow.distance;

    const velocity =
        experimentData.flow.velocity;

    const coverage =
        experimentData.flow.coverage;


    const distanceElement =
        $("flow-distance");

    const velocityElement =
        $("flow-velocity");

    const coverageElement =
        $("flow-coverage");


    const currentDistance =
        distance * (progress / 100);

    const currentCoverage =
        coverage * (progress / 100);


    if (distanceElement) {

        distanceElement.textContent =
            `${currentDistance.toFixed(1)} mm`;
    }


    if (velocityElement) {

        velocityElement.textContent =
            `${velocity.toFixed(2)} mm/s`;
    }


    if (coverageElement) {

        coverageElement.textContent =
            `${Math.round(currentCoverage)}%`;
    }
}


// ------------------------------------------------------------
// Create Dye Particles
// ------------------------------------------------------------

function createFlowParticles() {

    const leaf =
        document.querySelector(".leaf");

    if (!leaf) return;


    // Remove previous particles
    document
        .querySelectorAll(".flow-particle")
        .forEach(particle => particle.remove());


    const positions = [

        { left: "28%", top: "51%" },
        { left: "37%", top: "48%" },
        { left: "46%", top: "45%" },
        { left: "55%", top: "42%" },
        { left: "64%", top: "39%" },
        { left: "73%", top: "36%" }

    ];


    positions.forEach((position, index) => {

        const particle =
            document.createElement("span");

        particle.className =
            "flow-particle";


        particle.style.left =
            position.left;

        particle.style.top =
            position.top;


        particle.style.animationDelay =
            `${index * 0.45}s`;


        leaf.appendChild(particle);
    });
}


// ------------------------------------------------------------
// Finish Vascular Flow
// ------------------------------------------------------------

function finishFlow() {

    experimentData.flow.completed = true;


    const button =
        document.querySelector(
            "#inject-dye"
        );


    if (button) {

        button.disabled = false;

        button.textContent =
            "FLOW SIMULATION COMPLETE";
    }


    // Update final telemetry

    updateFlowTelemetry(100);


    // --------------------------------------------------------
    // Move to Analysis
    // --------------------------------------------------------

    setTimeout(() => {

        showStep(4);

        updateAnalysis();

        const status =
            document.querySelector(".status");

        if (status) {

            status.textContent =
                "ANALYSIS COMPLETE";
        }

    }, 1400);
}


// ------------------------------------------------------------
// STEP 04
// Analysis
// ------------------------------------------------------------

function updateAnalysis() {

    const data =
        experimentData.flow;


    // --------------------------------------------------------
    // Metrics
    // --------------------------------------------------------

    const distance =
        data.distance.toFixed(1);

    const velocity =
        data.velocity.toFixed(2);

    const coverage =
        data.coverage;


    // Try multiple possible IDs
    const distanceElement =
        $("analysis-distance") ||
        $("result-distance");

    const velocityElement =
        $("analysis-velocity") ||
        $("result-velocity");

    const coverageElement =
        $("analysis-coverage") ||
        $("result-coverage");


    if (distanceElement) {
        distanceElement.textContent =
            `${distance} mm`;
    }


    if (velocityElement) {
        velocityElement.textContent =
            `${velocity} mm/s`;
    }


    if (coverageElement) {
        coverageElement.textContent =
            `${coverage}%`;
    }


    // --------------------------------------------------------
    // Scientific interpretation
    // --------------------------------------------------------

    const interpretation =
        document.querySelector(
            ".scientific-note"
        );


    if (interpretation) {

        interpretation.innerHTML = `
            <strong>Scientific Interpretation</strong>
            <p>
                The simulated decellularization process removes
                cellular tissue while preserving a substantial
                portion of the leaf's vascular structure.
            </p>

            <p>
                During simulated perfusion, the dye follows the
                preserved vein network. Greater network coverage
                indicates that the simulated fluid reached a larger
                portion of the vascular structure.
            </p>

            <p>
                <strong>Important:</strong>
                These values are model-generated educational
                simulation results, not measurements from a real
                laboratory experiment.
            </p>

            <p>
                Spinach leaf veins are not equivalent to living
                human blood vessels. This simulation focuses on
                structural branching and fluid-transport concepts.
            </p>
        `;
    }


    createChart();
}


// ------------------------------------------------------------
// Chart
// ------------------------------------------------------------

function createChart() {

    const canvas =
        document.querySelector(
            "#flowChart"
        ) ||
        document.querySelector(
            "#analysisChart"
        );


    if (!canvas) return;


    // Destroy old chart
    if (chart) {

        chart.destroy();

        chart = null;
    }


    const ctx =
        canvas.getContext("2d");


    const totalTime =
        experimentData.flow.observationTime;


    const finalCoverage =
        experimentData.flow.coverage;


    const labels = [];
    const values = [];


    const points = 7;


    for (let i = 0; i < points; i++) {

        const time =
            Math.round(
                totalTime *
                (i / (points - 1))
            );


        const coverage =
            Math.round(
                finalCoverage *
                (i / (points - 1))
            );


        labels.push(`${time}s`);
        values.push(coverage);
    }


    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label:
                        "Simulated dye network coverage (%)",

                    data: values,

                    tension: 0.35,

                    fill: true,

                    pointRadius: 4,

                    pointHoverRadius: 6
                }

            ]
        },


        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1000
            },


            plugins: {

                legend: {

                    display: true
                }
            },


            scales: {

                y: {

                    min: 0,

                    max: 100,

                    title: {

                        display: true,

                        text:
                            "Network Coverage (%)"
                    }
                },


                x: {

                    title: {

                        display: true,

                        text:
                            "Observation Time"
                    }
                }
            }
        }
    });
}


// ------------------------------------------------------------
// Reset Experiment
// ------------------------------------------------------------

function resetExperiment() {

    // Stop animations
    if (flowInterval) {

        clearInterval(flowInterval);

        flowInterval = null;
    }


    window.decellRunning = false;


    // Reset data

    experimentData = {

        sampleId: "SP-2026-001",

        decellularization: {

            efficiency: 70,

            preservation: 0,

            completed: false
        },

        flow: {

            dyeConcentration: 50,

            observationTime: 30,

            distance: 0,

            velocity: 0,

            coverage: 0,

            completed: false
        },

        currentStep: 1
    };


    // Reset sliders

    if (decellSlider) {

        decellSlider.value = 70;
    }


    if (dyeSlider) {

        dyeSlider.value = 50;
    }


    if (timeSlider) {

        timeSlider.value = 30;
    }


    updateDecellValue();


    // Reset leaf

    const leaf =
        document.querySelector(".leaf");


    if (leaf) {

        leaf.style.filter = "";
        leaf.classList.remove("flow-running");
    }


    // Reset veins

    document
        .querySelectorAll(".vein")
        .forEach(vein => {

            vein.classList.remove(
                "flow-active"
            );

            vein.style.opacity = "";
        });


    // Remove particles

    document
        .querySelectorAll(".flow-particle")
        .forEach(particle => {

            particle.remove();
        });


    // Reset buttons

    const decellButton =
        document.querySelector(
            "#run-decellularization"
        );


    if (decellButton) {

        decellButton.disabled = false;

        decellButton.textContent =
            "RUN SIMULATION";
    }


    const flowButton =
        document.querySelector(
            "#inject-dye"
        );


    if (flowButton) {

        flowButton.disabled = false;

        flowButton.textContent =
            "INJECT DYE";
    }


    // Reset analysis values

    const values = [

        "flow-distance",
        "flow-velocity",
        "flow-coverage",
        "analysis-distance",
        "analysis-velocity",
        "analysis-coverage",
        "result-distance",
        "result-velocity",
        "result-coverage",
        "preservation"

    ];


    values.forEach(id => {

        const element = $(id);

        if (element) {

            element.textContent = "--";
        }
    });


    // Destroy chart

    if (chart) {

        chart.destroy();

        chart = null;
    }


    // Back to STEP 01

    showStep(1);


    const status =
        document.querySelector(".status");

    if (status) {

        status.textContent =
            "SYSTEM ONLINE";
    }
}


// ------------------------------------------------------------
// Sidebar Step Click
// ------------------------------------------------------------

document
    .querySelectorAll(".step")
    .forEach((step, index) => {

        step.addEventListener("click", () => {

            const targetStep =
                index + 1;


            // Do not allow skipping unfinished experiment

            if (targetStep === 2) {

                showStep(2);

                return;
            }


            if (
                targetStep === 3 &&
                experimentData.decellularization.completed
            ) {

                showStep(3);

                return;
            }


            if (
                targetStep === 4 &&
                experimentData.flow.completed
            ) {

                showStep(4);

                return;
            }


            if (targetStep === 1) {

                showStep(1);

                return;
            }

        });

    });


// ------------------------------------------------------------
// Button Event Binding
// ------------------------------------------------------------

const beginButton =
    document.querySelector(
        "#begin-decellularization"
    );


if (beginButton) {

    beginButton.addEventListener(
        "click",
        startDecellularization
    );
}


const runDecellButton =
    document.querySelector(
        "#run-decellularization"
    );


if (runDecellButton) {

    runDecellButton.addEventListener(
        "click",
        runDecellularization
    );
}


const injectButton =
    document.querySelector(
        "#inject-dye"
    );


if (injectButton) {

    injectButton.addEventListener(
        "click",
        startFlow
    );
}


const resetButton =
    document.querySelector(
        "#reset-experiment"
    );


if (resetButton) {

    resetButton.addEventListener(
        "click",
        resetExperiment
    );
}


// ------------------------------------------------------------
// Initial State
// ------------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDecellValue();

        showStep(1);

    }
);
