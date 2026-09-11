/* ============================================================
   SPINACH VASCULAR LAB
   Main Interface
============================================================ */

* {
    box-sizing: border-box;
}

html {
    margin: 0;
    padding: 0;
    background: #080c0f;
}

body {
    margin: 0;
    padding: 0;
    min-height: 100vh;

    background:
        radial-gradient(
            circle at 50% -20%,
            rgba(74, 135, 101, 0.08),
            transparent 45%
        ),
        #080c0f;

    color: #e8eeee;

    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
}


/* ============================================================
   APP
============================================================ */

.app {
    min-height: 100vh;
}


/* ============================================================
   HEADER
============================================================ */

.topbar {

    height: 96px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 42px;

    background: rgba(12, 18, 21, 0.96);

    border-bottom:
        1px solid #202a2e;
}


.brand {

    display: flex;
    align-items: center;

    gap: 14px;
}


.brand-mark {

    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 25px;

    border-radius: 10px;

    background:
        linear-gradient(
            145deg,
            rgba(47, 117, 83, 0.35),
            rgba(18, 32, 27, 0.9)
        );

    border: 1px solid #263a31;
}


.brand h1 {

    margin: 0;

    font-size: 21px;

    font-weight: 650;

    letter-spacing: -0.3px;
}


.brand p {

    margin: 5px 0 0;

    color: #718087;

    font-size: 12px;

    letter-spacing: 0.2px;
}


.system-status {

    display: flex;
    align-items: center;

    gap: 9px;

    color: #758188;

    font-size: 11px;

    letter-spacing: 1.5px;
}


.online-dot {

    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: #69d69a;

    box-shadow:
        0 0 10px rgba(105, 214, 154, 0.7);
}


/* ============================================================
   BODY
============================================================ */

.app-body {

    display: flex;

    min-height:
        calc(100vh - 96px);
}


/* ============================================================
   SIDEBAR
============================================================ */

.sidebar {

    width: 250px;

    flex-shrink: 0;

    display: flex;
    flex-direction: column;

    padding: 38px 22px 24px;

    background: #0c1215;

    border-right:
        1px solid #202a2e;
}


.sidebar-title {

    margin:
        0 14px 18px;

    color: #68767d;

    font-size: 11px;

    letter-spacing: 2px;

    font-weight: 600;
}


.steps {

    display: flex;

    flex-direction: column;

    gap: 7px;
}


.step {

    width: 100%;

    min-height: 50px;

    border: 0;

    border-radius: 9px;

    background: transparent;

    color: #6f7b81;

    display: flex;

    align-items: center;

    gap: 14px;

    padding: 0 15px;

    font-size: 14px;

    cursor: pointer;

    text-align: left;

    transition:
        background 0.2s ease,
        color 0.2s ease;
}


.step:hover {

    background: #121b1e;

    color: #b8c4c8;
}


.step.active {

    color: #dce8e3;

    background:
        linear-gradient(
            90deg,
            rgba(67, 120, 91, 0.18),
            rgba(40, 75, 59, 0.14)
        );

    box-shadow:
        inset 2px 0 0 #69c991;
}


.step.completed {

    color: #83b69a;
}


.step-number {

    width: 19px;

    color: #607077;

    font-size: 12px;
}


.step.active .step-number {

    color: #69c991;
}


.sidebar-bottom {

    margin-top: auto;

    padding-top: 30px;
}


.sample-id-label {

    color: #68767d;

    font-size: 10px;

    letter-spacing: 1.7px;
}


.sample-id {

    margin-top: 9px;

    color: #cbd5d8;

    font-size: 14px;

    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
}


.reset-button {

    width: 100%;

    margin-top: 25px;

    height: 38px;

    border-radius: 6px;

    border: 1px solid #263239;

    background: transparent;

    color: #68767d;

    font-size: 10px;

    letter-spacing: 1px;

    cursor: pointer;

    transition: 0.2s;
}


.reset-button:hover {

    color: #b8c2c5;

    border-color: #435158;

    background: #12191d;
}


/* ============================================================
   MAIN
============================================================ */

.main {

    flex: 1;

    min-width: 0;

    padding:
        54px
        clamp(28px, 5vw, 82px)
        70px;
}


.step-section {

    display: none;

    max-width: 1180px;

    margin: 0 auto;
}


.step-section.active-section {

    display: block;

    animation:
        sectionAppear 0.35s ease;
}


@keyframes sectionAppear {

    from {
        opacity: 0;
        transform: translateY(7px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


/* ============================================================
   HEADINGS
============================================================ */

.section-heading {

    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    gap: 30px;

    margin-bottom: 42px;
}


.eyebrow {

    color: #62c88f;

    font-size: 11px;

    letter-spacing: 3px;

    font-weight: 650;

    margin-bottom: 10px;
}


.section-heading h2 {

    margin: 0;

    font-size: clamp(30px, 3vw, 43px);

    line-height: 1.08;

    letter-spacing: -1.4px;

    font-weight: 650;

    color: #edf2f2;
}


.section-heading p {

    max-width: 650px;

    margin: 12px 0 0;

    color: #738087;

    font-size: 15px;

    line-height: 1.6;
}


.ready-badge,
.process-badge,
.complete-badge {

    padding: 9px 14px;

    border-radius: 7px;

    font-size: 10px;

    letter-spacing: 1.5px;

    white-space: nowrap;
}


.ready-badge {

    color: #68ce94;

    border: 1px solid #294335;
}


.process-badge {

    color: #9ba8ad;

    border: 1px solid #293338;
}


.complete-badge {

    color: #69d39a;

    border: 1px solid #31533f;

    background: rgba(59, 117, 83, 0.08);
}


/* ============================================================
   GRID
============================================================ */

.sample-grid {

    display: grid;

    grid-template-columns:
        minmax(0, 1.6fr)
        minmax(310px, 0.8fr);

    gap: 28px;
}


/* ============================================================
   PANELS
============================================================ */

.panel {

    background:
        linear-gradient(
            145deg,
            rgba(18, 26, 29, 0.98),
            rgba(13, 19, 22, 0.98)
        );

    border:
        1px solid #253137;

    border-radius: 12px;

    box-shadow:
        0 18px 50px rgba(0, 0, 0, 0.15);

    overflow: hidden;
}


/* ============================================================
   PANEL HEADER
============================================================ */

.panel-top {

    height: 49px;

    padding: 0 20px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    border-bottom:
        1px solid #202a2e;

    color: #66757b;

    font-size: 10px;

    letter-spacing: 1.7px;
}


/* ============================================================
   SAMPLE VIEW
============================================================ */

.sample-stage {

    position: relative;

    height: 570px;

    min-height: 450px;

    overflow: hidden;

    display: flex;

    align-items: center;

    justify-content: center;

    background:

        radial-gradient(
            ellipse at center,
            rgba(45, 76, 58, 0.16),
            transparent 58%
        ),

        #0a1013;
}


/* subtle grid */

.sample-stage::before {

    content: "";

    position: absolute;

    inset: 0;

    opacity: 0.16;

    background-image:
        linear-gradient(
            rgba(120, 150, 140, 0.04) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(120, 150, 140, 0.04) 1px,
            transparent 1px
        );

    background-size: 45px 45px;

    pointer-events: none;
}


/* ============================================================
   SPINACH LEAF
============================================================ */

.leaf {

    position: relative;

    width: min(73%, 520px);

    aspect-ratio: 1.34 / 1;

    transform:
        rotate(-18deg);

    border-radius:
        70% 32% 70% 34% /
        55% 40% 65% 45%;

    background:

        radial-gradient(
            ellipse at 45% 38%,
            #61966b 0%,
            #356848 34%,
            #183b2b 68%,
            #10291f 100%
        );

    box-shadow:

        inset 18px 15px 45px rgba(139, 194, 137, 0.18),

        inset -25px -20px 50px rgba(0, 0, 0, 0.38),

        0 35px 70px rgba(0, 0, 0, 0.35);

    transition:
        filter 0.4s ease,
        opacity 0.4s ease;
}


/* leaf highlight */

.leaf::before {

    content: "";

    position: absolute;

    inset: 13% 16%;

    border-radius: inherit;

    background:
        radial-gradient(
            ellipse at 40% 35%,
            rgba(165, 215, 157, 0.2),
            transparent 50%
        );

    pointer-events: none;
}


/* ============================================================
   VEINS
============================================================ */

.main-vein {

    position: absolute;

    left: 9%;
    top: 48%;

    width: 82%;

    height: 5px;

    border-radius: 100px;

    background:
        linear-gradient(
            90deg,
            rgba(214, 235, 191, 0.9),
            rgba(164, 201, 156, 0.72),
            rgba(120, 164, 126, 0.25)
        );

    box-shadow:
        0 0 9px rgba(190, 224, 175, 0.2);

    z-index: 3;
}


.branch {

    position: absolute;

    width: 2px;

    height: 31%;

    left: 40%;

    top: 18%;

    transform-origin: bottom center;

    border-radius: 20px;

    background:
        linear-gradient(
            to top,
            rgba(204, 229, 183, 0.75),
            rgba(135, 176, 134, 0.15)
        );

    z-index: 2;
}


.branch-a {
    left: 27%;
    transform: rotate(29deg);
}

.branch-b {
    left: 38%;
    height: 38%;
    transform: rotate(43deg);
}

.branch-c {
    left: 49%;
    height: 35%;
    transform: rotate(28deg);
}

.branch-d {
    left: 61%;
    height: 31%;
    transform: rotate(42deg);
}

.branch-e {
    left: 72%;
    height: 27%;
    transform: rotate(35deg);
}

.branch-f {
    left: 32%;
    top: 49%;
    height: 30%;
    transform: rotate(-45deg);
}

.branch-g {
    left: 50%;
    top: 49%;
    height: 28%;
    transform: rotate(-34deg);
}

.branch-h {
    left: 66%;
    top: 49%;
    height: 25%;
    transform: rotate(-43deg);
}


/* ============================================================
   STAGE LABEL
============================================================ */

.stage-label {

    position: absolute;

    left: 20px;
    bottom: 18px;

    color: #536268;

    font-size: 9px;

    letter-spacing: 1.3px;

    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
}


/* ============================================================
   INFORMATION PANEL
============================================================ */

.information-panel,
.control-panel {

    padding: 31px;
}


.information-panel h3,
.control-panel h3 {

    margin: 0 0 30px;

    font-size: 19px;

    font-weight: 600;
}


/* ============================================================
   INFO LIST
============================================================ */

.info-list {

    margin-bottom: 27px;
}


.info-row {

    min-height: 55px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    border-bottom:
        1px solid #222d31;

    color: #68777d;

    font-size: 13px;
}


.info-row strong {

    color: #ccd4d6;

    font-weight: 500;

    text-align: right;
}


.info-row .positive {

    color: #70c997;
}


/* ============================================================
   MODE
============================================================ */

.mode-box {

    margin:
        22px 0 25px;
}


.mode-title {

    margin-bottom: 10px;

    color: #627077;

    font-size: 10px;

    letter-spacing: 1.5px;
}


.mode-options {

    display: flex;

    flex-direction: column;

    gap: 8px;
}


.mode-button {

    padding: 13px 14px;

    border-radius: 8px;

    border: 1px solid #263237;

    background: #0c1316;

    color: #829096;

    text-align: left;

    cursor: pointer;

    transition: 0.2s;
}


.mode-button:hover {

    border-color: #3c5147;
}


.mode-button.selected {

    border-color: #3b7756;

    background:
        rgba(57, 111, 79, 0.13);

    color: #d4dfda;
}


.mode-button strong {

    display: block;

    margin-bottom: 4px;

    font-size: 12px;
}


.mode-button span {

    font-size: 10px;

    color: #627077;
}


/* ============================================================
   BUTTONS
============================================================ */

.primary-button {

    width: 100%;

    height: 52px;

    border: 1px solid #5bc48a;

    border-radius: 8px;

    background:
        linear-gradient(
            180deg,
            #397455,
            #2d6147
        );

    color: #eaf4ee;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    transition:
        transform 0.15s,
        box-shadow 0.2s,
        background 0.2s;
}


.primary-button:hover {

    background:
        linear-gradient(
            180deg,
            #438360,
            #326e50
        );

    box-shadow:
        0 8px 24px rgba(65, 151, 101, 0.14);
}


.primary-button:active {

    transform: scale(0.99);
}


.primary-button:disabled {

    opacity: 0.5;

    cursor: not-allowed;

    box-shadow: none;
}


.secondary-button {

    height: 48px;

    padding: 0 25px;

    border-radius: 8px;

    border: 1px solid #344047;

    background: #10171a;

    color: #9aa7ac;

    cursor: pointer;
}


/* ============================================================
   CONTROLS
============================================================ */

.control-block {

    margin-bottom: 30px;
}


.control-title {

    display: flex;

    justify-content: space-between;

    gap: 15px;

    margin-bottom: 15px;

    color: #859298;

    font-size: 12px;
}


.control-title strong {

    color: #69cb93;

    font-weight: 600;
}


input[type="range"] {

    width: 100%;

    appearance: none;

    height: 4px;

    border-radius: 10px;

    background: #273237;

    outline: none;
}


input[type="range"]::-webkit-slider-thumb {

    appearance: none;

    width: 17px;

    height: 17px;

    border-radius: 50%;

    background: #69c991;

    border: 3px solid #102018;

    box-shadow:
        0 0 0 1px #69c991;

    cursor: pointer;
}


input[type="range"]::-moz-range-thumb {

    width: 14px;

    height: 14px;

    border-radius: 50%;

    background: #69c991;

    border: 2px solid #102018;

    cursor: pointer;
}


.range-labels {

    margin-top: 8px;

    display: flex;

    justify-content: space-between;

    color: #526067;

    font-size: 9px;

    letter-spacing: 1px;
}


/* ============================================================
   PROGRESS
============================================================ */

.progress-track {

    height: 8px;

    overflow: hidden;

    border-radius: 20px;

    background: #1a2428;
}


.progress-fill {

    width: 0%;

    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            #3c8e62,
            #71d49d
        );

    transition:
        width 0.08s linear;
}


/* ============================================================
   RESULT
============================================================ */

.result-card {

    margin:
        10px 0 18px;

    padding: 19px;

    border-radius: 8px;

    border: 1px solid #273337;

    background: #0c1316;
}


.result-card span {

    display: block;

    color: #68767c;

    font-size: 9px;

    letter-spacing: 1.4px;
}


.result-card strong {

    display: block;

    margin-top: 7px;

    color: #d5e3dc;

    font-size: 26px;

    font-weight: 550;
}


.result-message {

    min-height: 75px;

    margin-bottom: 22px;

    padding: 14px;

    border-left:
        2px solid #355644;

    background: rgba(39, 67, 51, 0.08);

    color: #7e8c91;

    font-size: 11px;

    line-height: 1.65;
}


/* ============================================================
   PROCESS OVERLAY
============================================================ */

.process-overlay {

    position: absolute;

    bottom: 20px;
    right: 20px;

    padding: 7px 10px;

    border-radius: 5px;

    color: #637177;

    background: rgba(8, 13, 15, 0.7);

    border: 1px solid #263136;

    font-size: 9px;

    letter-spacing: 1px;
}


/* ============================================================
   FLOW
============================================================ */

.flow-stage {

    position: relative;
}


.flow-stage .leaf {

    transition:
        filter 0.5s ease;
}


.flow-legend {

    position: absolute;

    right: 20px;
    bottom: 18px;

    display: flex;

    align-items: center;

    gap: 8px;

    color: #657279;

    font-size: 9px;

    letter-spacing: 1px;
}


.legend-dot {

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: #e65e6b;

    box-shadow:
        0 0 8px rgba(230, 94, 107, 0.8);
}


/* ============================================================
   DYE
============================================================ */

.dye-path {

    position: absolute;

    width: 9px;
    height: 9px;

    border-radius: 50%;

    background: #ed5e69;

    box-shadow:
        0 0 8px rgba(237, 94, 105, 0.9),
        0 0 18px rgba(237, 94, 105, 0.35);

    z-index: 10;

    animation:
        dyePulse 0.8s ease-in-out infinite;
}


@keyframes dyePulse {

    0%,
    100% {
        transform: scale(0.8);
    }

    50% {
        transform: scale(1.3);
    }
}


.vein-dye {

    position: absolute;

    height: 5px;

    border-radius: 10px;

    background:
        linear-gradient(
            90deg,
            rgba(232, 83, 96, 0.2),
            rgba(236, 91, 103, 0.9),
            rgba(236, 91, 103, 0.25)
        );

    box-shadow:
        0 0 8px rgba(235, 85, 99, 0.45);

    z-index: 4;

    animation:
        dyeSpread 1.2s ease forwards;
}


@keyframes dyeSpread {

    from {
        width: 0;
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}


/* ============================================================
   TELEMETRY
============================================================ */

.telemetry-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 9px;

    margin:
        12px 0 24px;
}


.telemetry {

    min-height: 82px;

    padding: 14px;

    border:
        1px solid #253137;

    border-radius: 7px;

    background: #0b1215;
}


.telemetry span {

    display: block;

    color: #5d6b71;

    font-size: 8px;

    letter-spacing: 1px;
}


.telemetry strong {

    display: block;

    margin-top: 10px;

    color: #cbd7d3;

    font-size: 17px;

    font-weight: 550;
}


/* ============================================================
   ANALYSIS METRICS
============================================================ */

.metrics-grid {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 15px;

    margin-bottom: 22px;
}


.metric {

    min-height: 125px;

    padding: 20px;

    border-radius: 10px;

    border: 1px solid #263238;

    background:
        linear-gradient(
            145deg,
            #121a1d,
            #0d1417
        );
}


.metric span {

    color: #647278;

    font-size: 9px;

    letter-spacing: 1.2px;

    line-height: 1.5;
}


.metric strong {

    display: block;

    margin-top: 16px;

    color: #d9e4e0;

    font-size: 25px;

    font-weight: 550;
}


/* ============================================================
   CHART
============================================================ */

.chart-panel {

    margin-bottom: 20px;
}


.chart-wrapper {

    height: 360px;

    padding: 25px;
}


/* ============================================================
   INTERPRETATION
============================================================ */

.interpretation {

    padding: 25px;

    margin-bottom: 20px;

    color: #849197;

    font-size: 12px;

    line-height: 1.75;
}


.interpretation-title {

    margin-bottom: 12px;

    color: #69c991;

    font-size: 10px;

    letter-spacing: 1.7px;

    font-weight: 650;
}


.interpretation strong {

    color: #cfd9d7;
}


/* ============================================================
   RESPONSIVE
============================================================ */

@media (max-width: 1000px) {

    .sidebar {
        width: 205px;
    }

    .main {
        padding: 40px 30px 60px;
    }

    .sample-grid {
        grid-template-columns: 1fr;
    }

    .sample-stage {
        height: 470px;
    }

    .metrics-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }
}


@media (max-width: 700px) {

    .topbar {

        height: 78px;

        padding: 0 18px;
    }

    .brand-mark {
        width: 35px;
        height: 35px;
        font-size: 19px;
    }

    .brand h1 {
        font-size: 15px;
    }

    .brand p {
        font-size: 9px;
    }

    .system-status {
        display: none;
    }


    .app-body {
        display: block;
    }


    .sidebar {

        width: 100%;

        height: auto;

        padding:
            15px
            15px
            12px;

        border-right: 0;

        border-bottom:
            1px solid #202a2e;
    }


    .sidebar-title {
        display: none;
    }


    .steps {

        display: grid;

        grid-template-columns:
            repeat(4, 1fr);

        gap: 5px;
    }


    .step {

        min-height: 43px;

        justify-content: center;

        padding: 5px;

        gap: 5px;

        font-size: 10px;

        flex-direction: column;
    }


    .step-number {
        width: auto;

        font-size: 9px;
    }


    .sidebar-bottom {

        display: flex;

        align-items: center;

        gap: 10px;

        padding-top: 10px;
    }


    .sample-id-label {
        display: none;
    }


    .sample-id {
        margin: 0;

        font-size: 10px;
    }


    .reset-button {

        width: auto;

        margin: 0 0 0 auto;

        height: 30px;

        padding: 0 10px;

        font-size: 8px;
    }


    .main {

        padding:
            32px
            16px
            50px;
    }


    .section-heading {

        margin-bottom: 25px;

        gap: 15px;
    }


    .section-heading h2 {
        font-size: 28px;
    }


    .section-heading p {
        font-size: 12px;
    }


    .ready-badge,
    .process-badge,
    .complete-badge {
        padding: 7px 9px;

        font-size: 8px;
    }


    .sample-stage {

        height: 380px;

        min-height: 300px;
    }


    .leaf {
        width: 75%;
    }


    .information-panel,
    .control-panel {
        padding: 22px;
    }


    .metrics-grid {

        grid-template-columns:
            1fr 1fr;
    }


    .metric {

        min-height: 105px;

        padding: 15px;
    }


    .metric strong {
        font-size: 20px;
    }


    .telemetry-grid {
        grid-template-columns:
            1fr 1fr 1fr;
    }


    .telemetry {
        padding: 10px;
    }


    .telemetry strong {
        font-size: 13px;
    }


    .chart-wrapper {
        height: 280px;

        padding: 15px;
    }
}


@media (max-width: 430px) {

    .metrics-grid {
        grid-template-columns: 1fr;
    }

    .sample-stage {
        height: 320px;
    }

    .section-heading h2 {
        font-size: 25px;
    }

    .telemetry-grid {
        gap: 5px;
    }

    .telemetry {
        min-height: 70px;
    }
}
