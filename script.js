/* ============================================================
   SPINACH VASCULAR LAB
   Simulation Engine
============================================================ */


/* ============================================================
   STATE
============================================================ */

const experiment = {

    mode: "guided",

    step: 1,

    decellularization: {

        efficiency: 70,

        preservation: 0,

        completed: false

    },

    flow: {

        concentration: 50,

        time: 30,

        distance: 0,

        velocity: 0,

        coverage: 0,

        completed: false

    }

};


let decellTimer = null;
let flowTimer = null;
let chart = null;


/* ============================================================
   ELEMENTS
============================================================ */

const stepSections = {

    1: document.getElementById("step1"),
    2: document.getElementById("step2"),
    3: document.getElementById("step3"),
    4: document.getElementById("step4")

};


const sidebarSteps =
    document.querySelectorAll(".step");


/* ============================================================
   STEP NAVIGATION
============================================================ */

function showStep(number) {

    experiment.step = number;


    Object.values(stepSections).forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    if (stepSections[number]) {

        stepSections[number]
            .classList.add("active-section");

    }


    sidebarSteps.forEach(button => {

        const step =
            Number(button.dataset.step);


        button.classList.remove(
            "active",
            "completed"
        );


        if (step === number) {

            button.classList.add("active");

        }


        if (step < number) {

            button.classList.add(
                "completed"
            );

        }

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ============================================================
   SIDEBAR
============================================================ */

sidebarSteps.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const target =
                Number(button.dataset.step);


            /* Guided Mode */

            if (
                experiment.mode === "guided"
            ) {

                if (target === 1) {

                    showStep(1);

                    return;

                }


                if (
                    target === 2
                ) {

                    showStep(2);

                    return;

                }


                if (
                    target === 3 &&
                    experiment.decellularization.completed
                ) {

                    showStep(3);

                    return;

                }


                if (
                    target === 4 &&
                    experiment.flow.completed
                ) {

                    showStep(4);

                    return;

                }


                return;

            }


            /* Free Mode */

            showStep(target);

        }
    );

});


/* ============================================================
   EXPERIMENT MODE
============================================================ */

const guidedButton =
    document.getElementById(
        "guided-mode"
    );


const freeButton =
    document.getElementById(
        "free-mode"
    );


guidedButton.addEventListener(
    "click",
    () => {

        experiment.mode =
            "guided";


        guidedButton.classList.add(
            "selected"
        );


        freeButton.classList.remove(
            "selected"
        );

    }
);


freeButton.addEventListener(
    "click",
    () => {

        experiment.mode =
            "free";


        freeButton.classList.add(
            "selected"
        );


        guidedButton.classList.remove(
            "selected"
        );

    }
);


/* ============================================================
   BEGIN EXPERIMENT
============================================================ */

const beginButton =
    document.getElementById(
        "begin-experiment"
    );


beginButton.addEventListener(
    "click",
    () => {

        showStep(2);

        document.getElementById(
            "decell-status"
        ).textContent = "READY";

    }
);


/* ============================================================
   DECELLULARIZATION SLIDER
============================================================ */

const decellSlider =
    document.getElementById(
        "decell-slider"
    );


const decellValue =
    document.getElementById(
        "decell-value"
    );


decellSlider.addEventListener(
    "input",
    () => {

        experiment
            .decellularization
            .efficiency =
            Number(decellSlider.value);


        decellValue.textContent =
            `${decellSlider.value}%`;

    }
);


/* ============================================================
   RUN DECELLULARIZATION
============================================================ */

const runDecellButton =
    document.getElementById(
        "run-decellularization"
    );


runDecellButton.addEventListener(
    "click",
    runDecellularization
);


function runDecellularization() {

    if (decellTimer) {

        clearInterval(decellTimer);

    }


    const efficiency =
        experiment
            .decellularization
            .efficiency;


    const leaf =
        document.getElementById(
            "decell-leaf"
        );


    const progressBar =
        document.getElementById(
            "decell-progress"
        );


    const progressText =
        document.getElementById(
            "decell-progress-text"
        );


    const status =
        document.getElementById(
            "decell-status"
        );


    const overlay =
        document.getElementById(
            "decell-overlay"
        );


    const result =
        document.getElementById(
            "decell-result"
        );


    runDecellButton.disabled = true;

    runDecellButton.textContent =
        "PROCESSING...";


    status.textContent =
        "PROCESSING";


    overlay.textContent =
        "CELLULAR REMOVAL";


    let progress = 0;


    decellTimer =
        setInterval(
            () => {

                progress += 1;


                progressBar.style.width =
                    `${progress}%`;


                progressText.textContent =
                    `${progress}%`;


                /*
                 * Higher efficiency =
                 * stronger loss of green tissue
                 */

                const tissueRemoval =
                    (
                        progress / 100
                    ) *
                    (
                        efficiency / 100
                    );


                const saturation =
                    Math.max(
                        0.12,
                        1 -
                        tissueRemoval * 0.9
                    );


                const brightness =
                    1 +
                    tissueRemoval * 0.18;


                if (leaf) {

                    leaf.style.filter =
                        `
                        saturate(${saturation})
                        brightness(${brightness})
                        `;
                }


                if (progress >= 100) {

                    clearInterval(
                        decellTimer
                    );

                    finishDecellularization();

                }

            },

            45
        );

}


/* ============================================================
   FINISH DECELLULARIZATION
============================================================ */

function finishDecellularization() {

    const efficiency =
        experiment
            .decellularization
            .efficiency;


    /*
     * Educational model.
     *
     * This is NOT experimental data.
     */

    const preservation =
        Math.min(
            99,
            Math.round(
                55 +
                efficiency * 0.4
            )
        );


    experiment
        .decellularization
        .preservation =
            preservation;


    experiment
        .decellularization
        .completed =
            true;


    document.getElementById(
        "preservation"
    ).textContent =
        `${preservation}%`;


    document.getElementById(
        "decell-status"
    ).textContent =
        "COMPLETE";


    document.getElementById(
        "decell-overlay"
    ).textContent =
        "DECELLULARIZED";


    document.getElementById(
        "decell-result"
    ).innerHTML =

        `
        <strong>
            Decellularization complete.
        </strong>
        <br><br>
        Simulated cellular removal:
        ${efficiency}%.
        <br>
        Estimated vascular structure preservation:
        ${preservation}%.
        `;


    runDecellButton.disabled = false;

    runDecellButton.textContent =
        "RUN AGAIN";


    /*
     * Guided Mode automatically continues.
     */

    if (
        experiment.mode === "guided"
    ) {

        setTimeout(
            () => {

                showStep(3);

            },
            1000
        );

    }

}


/* ============================================================
   DYE SLIDER
============================================================ */

const dyeSlider =
    document.getElementById(
        "dye-slider"
    );


const dyeValue =
    document.getElementById(
        "dye-value"
    );


dyeSlider.addEventListener(
    "input",
    () => {

        experiment.flow.concentration =
            Number(dyeSlider.value);


        dyeValue.textContent =
            `${dyeSlider.value}%`;

    }
);


/* ============================================================
   TIME SLIDER
============================================================ */

const timeSlider =
    document.getElementById(
        "time-slider"
    );


const timeValue =
    document.getElementById(
        "time-value"
    );


timeSlider.addEventListener(
    "input",
    () => {

        experiment.flow.time =
            Number(timeSlider.value);


        timeValue.textContent =
            `${timeSlider.value} s`;

    }
);


/* ============================================================
   FLOW SIMULATION
============================================================ */

const injectButton =
    document.getElementById(
        "inject-dye"
    );


injectButton.addEventListener(
    "click",
    startFlow
);


function startFlow() {

    /*
     * In Guided Mode, require
     * decellularization first.
     */

    if (
        experiment.mode === "guided" &&
        !experiment.decellularization.completed
    ) {

        alert(
            "Complete decellularization first."
        );

        showStep(2);

        return;

    }


    if (flowTimer) {

        clearInterval(flowTimer);

    }


    injectButton.disabled = true;

    injectButton.textContent =
        "DYE INJECTION...";


    document.getElementById(
        "flow-status"
    ).textContent =
        "ACTIVE";


    /*
     * Calculate model output.
     */

    const concentration =
        experiment.flow.concentration;


    const time =
        experiment.flow.time;


    const preservation =
        experiment
            .decellularization
            .preservation;


    /*
     * Distance:
     *
     * More concentration,
     * longer observation time,
     * and better preserved network
     * increase simulated transport.
     */

    const distance =
        (
            3.5 +
            concentration * 0.075 +
            time * 0.24
        ) *
        (
            0.75 +
            preservation / 400
        );


    const velocity =
        distance /
        Math.max(time, 1);


    const coverage =
        Math.min(
            99,
            Math.round(
                12 +
                concentration * 0.38 +
                time * 0.68 +
                preservation * 0.12
            )
        );


    experiment.flow.distance =
        Number(
            distance.toFixed(2)
        );


    experiment.flow.velocity =
        Number(
            velocity.toFixed(3)
        );


    experiment.flow.coverage =
        coverage;


    animateFlow();

}


/* ============================================================
   FLOW ANIMATION
============================================================ */

function animateFlow() {

    const leaf =
        document.getElementById(
            "flow-leaf"
        );


    const stage =
        document.getElementById(
            "flow-stage"
        );


    /*
     * Remove previous dye.
     */

    document
        .querySelectorAll(
            ".dye-path, .vein-dye"
        )
        .forEach(
            element =>
                element.remove()
        );


    /*
     * Create several dye segments.
     */

    const segments = [

        {
            left: "14%",
            top: "48%",
            width: "20%"
        },

        {
            left: "30%",
            top: "46%",
            width: "18%"
        },

        {
            left: "45%",
            top: "44%",
            width: "17%"
        },

        {
            left: "59%",
            top: "42%",
            width: "14%"
        },

        {
            left: "70%",
            top: "40%",
            width: "10%"
        }

    ];


    segments.forEach(
        (segment, index) => {

            const dye =
                document.createElement(
                    "div"
                );


            dye.className =
                "vein-dye";


            dye.style.left =
                segment.left;


            dye.style.top =
                segment.top;


            dye.style.width =
                "0";


            dye.style.transform =
                "rotate(0deg)";


            dye.style.animationDelay =
                `${index * 0.45}s`;


            leaf.appendChild(
                dye
            );


            setTimeout(
                () => {

                    dye.style.width =
                        segment.width;

                },

                index * 450
            );

        }
    );


    /*
     * Moving particles
     */

    const particlePositions = [

        ["12%", "47%"],
        ["25%", "47%"],
        ["38%", "45%"],
        ["51%", "43%"],
        ["63%", "41%"],
        ["75%", "39%"]

    ];


    particlePositions.forEach(
        (position, index) => {

            const particle =
                document.createElement(
                    "div"
                );


            particle.className =
                "dye-path";


            particle.style.left =
                position[0];


            particle.style.top =
                position[1];


            particle.style.animationDelay =
                `${index * 0.45}s`;


            leaf.appendChild(
                particle
            );

        }
    );


    /*
     * Telemetry animation.
     */

    let progress = 0;


    flowTimer =
        setInterval(
            () => {

                progress += 2;


                const ratio =
                    progress / 100;


                document.getElementById(
                    "flow-distance"
                ).textContent =
                    `${(
                        experiment.flow.distance *
                        ratio
                    ).toFixed(1)} mm`;


                document.getElementById(
                    "flow-velocity"
                ).textContent =
                    `${experiment.flow.velocity.toFixed(2)} mm/s`;


                document.getElementById(
                    "flow-coverage"
                ).textContent =
                    `${Math.round(
                        experiment.flow.coverage *
                        ratio
                    )}%`;


                if (progress >= 100) {

                    clearInterval(
                        flowTimer
                    );


                    finishFlow();

                }

            },

            50
        );

}


/* ============================================================
   FINISH FLOW
============================================================ */

function finishFlow() {

    experiment.flow.completed =
        true;


    document.getElementById(
        "flow-status"
    ).textContent =
        "COMPLETE";


    injectButton.disabled =
        false;


    injectButton.textContent =
        "RUN AGAIN";


    if (
        experiment.mode === "guided"
    ) {

        setTimeout(
            () => {

                showStep(4);

                updateAnalysis();

            },

            1200
        );

    }

}


/* ============================================================
   ANALYSIS
============================================================ */

function updateAnalysis() {

    document.getElementById(
        "analysis-preservation"
    ).textContent =
        `${experiment.decellularization.preservation}%`;


    document.getElementById(
        "analysis-distance"
    ).textContent =
        `${experiment.flow.distance.toFixed(1)} mm`;


    document.getElementById(
        "analysis-velocity"
    ).textContent =
        `${experiment.flow.velocity.toFixed(2)} mm/s`;


    document.getElementById(
        "analysis-coverage"
    ).textContent =
        `${experiment.flow.coverage}%`;


    /*
     * Scientific interpretation
     */

    const preservation =
        experiment.decellularization.preservation;


    const coverage =
        experiment.flow.coverage;


    let interpretation = "";


    if (
        preservation >= 80 &&
        coverage >= 60
    ) {

        interpretation =

            `
            <strong>
                High structural preservation and broad
                simulated network coverage were observed.
            </strong>
            <br><br>

            The model suggests that the simulated
            decellularization condition preserved a substantial
            portion of the spinach leaf's vascular architecture.
            The simulated dye subsequently reached a relatively
            large fraction of the network.
            `;

    }

    else if (
        preservation >= 65
    ) {

        interpretation =

            `
            <strong>
                Moderate structural preservation was observed.
            </strong>
            <br><br>

            The simulated vascular network remained sufficiently
            preserved for dye transport to occur through multiple
            branches. Increasing preservation or observation time
            could increase simulated network coverage.
            `;

    }

    else {

        interpretation =

            `
            <strong>
                Limited structural preservation was observed.
            </strong>
            <br><br>

            The model predicts reduced transport through the
            vascular network when cellular removal is accompanied
            by greater structural disruption.
            `;

    }


    interpretation +=

        `
        <br><br>

        <strong>Important limitation:</strong>
        These values are generated by an educational simulation
        model and are not measurements from a real laboratory
        experiment. Spinach leaf veins are structurally different
        from living human blood vessels, so this model represents
        branching and fluid-transport concepts rather than a
        direct human vascular equivalent.
        `;


    document.getElementById(
        "interpretation-text"
    ).innerHTML =
        interpretation;


    createChart();

}


/* ============================================================
   CHART
============================================================ */

function createChart() {

    const canvas =
        document.getElementById(
            "flowChart"
        );


    if (!canvas) return;


    if (chart) {

        chart.destroy();

    }


    const totalTime =
        experiment.flow.time;


    const finalCoverage =
        experiment.flow.coverage;


    const labels = [];
    const values = [];


    for (
        let i = 0;
        i <= 6;
        i++
    ) {

        const ratio =
            i / 6;


        labels.push(
            `${Math.round(
                totalTime * ratio
            )} s`
        );


        values.push(
            Math.round(
                finalCoverage * ratio
            )
        );

    }


    chart =
        new Chart(
            canvas.getContext("2d"),
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Simulated network coverage (%)",

                            data: values,

                            borderColor:
                                "#69c991",

                            backgroundColor:
                                "rgba(105, 201, 145, 0.10)",

                            borderWidth: 2,

                            fill: true,

                            tension: 0.35,

                            pointRadius: 3,

                            pointHoverRadius: 5

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    plugins: {

                        legend: {

                            labels: {

                                color: "#819096",

                                font: {

                                    size: 11

                                }

                            }

                        }

                    },


                    scales: {

                        x: {

                            ticks: {

                                color: "#637178"

                            },

                            grid: {

                                color:
                                    "rgba(100,120,120,0.08)"

                            }

                        },


                        y: {

                            min: 0,

                            max: 100,

                            ticks: {

                                color: "#637178",

                                callback:
                                    value =>
                                        `${value}%`

                            },

                            grid: {

                                color:
                                    "rgba(100,120,120,0.08)"

                            }

                        }

                    }

                }

            }
        );

}


/* ============================================================
   RESET
============================================================ */

const resetButton =
    document.getElementById(
        "reset-experiment"
    );


resetButton.addEventListener(
    "click",
    resetExperiment
);


const newExperimentButton =
    document.getElementById(
        "new-experiment"
    );


newExperimentButton.addEventListener(
    "click",
    resetExperiment
);


function resetExperiment() {

    /*
     * Stop timers.
     */

    if (decellTimer) {

        clearInterval(
            decellTimer
        );

    }


    if (flowTimer) {

        clearInterval(
            flowTimer
        );

    }


    decellTimer = null;
    flowTimer = null;


    /*
     * Reset state.
     */

    experiment.step = 1;

    experiment.mode = "guided";


    experiment.decellularization =
        {

            efficiency: 70,

            preservation: 0,

            completed: false

        };


    experiment.flow =
        {

            concentration: 50,

            time: 30,

            distance: 0,

            velocity: 0,

            coverage: 0,

            completed: false

        };


    /*
     * Reset controls.
     */

    decellSlider.value = 70;

    decellValue.textContent =
        "70%";


    dyeSlider.value = 50;

    dyeValue.textContent =
        "50%";


    timeSlider.value = 30;

    timeValue.textContent =
        "30 s";


    /*
     * Reset leaf.
     */

    [
        "decell-leaf",
        "flow-leaf"
    ].forEach(
        id => {

            const leaf =
                document.getElementById(id);


            if (leaf) {

                leaf.style.filter =
                    "";

            }

        }
    );


    /*
     * Remove dye.
     */

    document
        .querySelectorAll(
            ".dye-path, .vein-dye"
        )
        .forEach(
            element =>
                element.remove()
        );


    /*
     * Reset progress.
     */

    document.getElementById(
        "decell-progress"
    ).style.width =
        "0%";


    document.getElementById(
        "decell-progress-text"
    ).textContent =
        "0%";


    document.getElementById(
        "preservation"
    ).textContent =
        "--";


    document.getElementById(
        "decell-status"
    ).textContent =
        "READY";


    document.getElementById(
        "decell-overlay"
    ).textContent =
        "CELLULAR TISSUE";


    document.getElementById(
        "decell-result"
    ).innerHTML =
        `
        Adjust the efficiency and run
        the virtual decellularization process.
        `;


    /*
     * Reset flow.
     */

    document.getElementById(
        "flow-status"
    ).textContent =
        "READY";


    document.getElementById(
        "flow-distance"
    ).textContent =
        "--";


    document.getElementById(
        "flow-velocity"
    ).textContent =
        "--";


    document.getElementById(
        "flow-coverage"
    ).textContent =
        "--";


    injectButton.disabled =
        false;


    injectButton.textContent =
        "Inject Dye";


    runDecellButton.disabled =
        false;


    runDecellButton.textContent =
        "Run Simulation";


    /*
     * Reset mode.
     */

    guidedButton.classList.add(
        "selected"
    );


    freeButton.classList.remove(
        "selected"
    );


    /*
     * Reset chart.
     */

    if (chart) {

        chart.destroy();

        chart = null;

    }


    /*
     * Reset analysis.
     */

    document.getElementById(
        "analysis-preservation"
    ).textContent =
        "--";


    document.getElementById(
        "analysis-distance"
    ).textContent =
        "--";


    document.getElementById(
        "analysis-velocity"
    ).textContent =
        "--";


    document.getElementById(
        "analysis-coverage"
    ).textContent =
        "--";


    document.getElementById(
        "interpretation-text"
    ).textContent =
        "Complete the simulation to generate an interpretation of the results.";


    /*
     * Back to Sample.
     */

    showStep(1);

}


/* ============================================================
   INITIALIZE
============================================================ */

showStep(1);
