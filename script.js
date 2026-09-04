/* =========================================================
   FISSIONQUEST
   Interactive Nuclear Physics Website
========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let xp = 0;

let completedMissions = [];

let quizIndex = 0;

let quizScore = 0;

let chainRunning = false;

let chainGeneration = 0;

let chainNeutrons = 1;

let chainEnergy = 0;


/* =========================================================
   LOADING SCREEN
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loading =
            document.getElementById("loadingScreen");

        loading.classList.add("hidden");

    }, 1000);

});


/* =========================================================
   NAVIGATION
========================================================= */

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth"
    });

    const nav =
        document.getElementById("navMenu");

    nav.classList.remove("active");
}


function toggleMenu() {

    const nav =
        document.getElementById("navMenu");

    nav.classList.toggle("active");
}


function startMission() {

    addXP(50);

    scrollToSection("missions");

}


/* =========================================================
   XP SYSTEM
========================================================= */

function addXP(amount) {

    xp += amount;

    updateXP();

}


function updateXP() {

    const xpValue =
        document.getElementById("xpValue");

    const finalXP =
        document.getElementById("finalXP");

    const rankTitle =
        document.getElementById("rankTitle");

    const rankDescription =
        document.getElementById("rankDescription");


    if (xpValue) {

        xpValue.textContent = xp;

    }

    if (finalXP) {

        finalXP.textContent = xp;

    }


    if (xp >= 1500) {

        rankTitle.textContent =
            "NUCLEAR SCIENTIST";

        rankDescription.textContent =
            "You have mastered the nuclear physics mission.";

    }

    else if (xp >= 1000) {

        rankTitle.textContent =
            "REACTOR ENGINEER";

        rankDescription.textContent =
            "You understand the physics behind nuclear reactors.";

    }

    else if (xp >= 500) {

        rankTitle.textContent =
            "FISSION EXPERT";

        rankDescription.textContent =
            "You are beginning to master nuclear fission.";

    }

    else if (xp >= 100) {

        rankTitle.textContent =
            "NUCLEAR EXPLORER";

        rankDescription.textContent =
            "Keep exploring the nuclear world.";

    }

}


/* =========================================================
   MISSIONS
========================================================= */

function completeMission(number) {

    if (completedMissions.includes(number)) {

        showTemporaryMessage(
            "MISSION ALREADY COMPLETED"
        );

        return;
    }


    completedMissions.push(number);

    addXP(100);


    const card =
        document.querySelector(
            `[data-mission="${number}"]`
        );


    if (card) {

        const status =
            card.querySelector(
                ".mission-status"
            );

        if (status) {

            status.textContent =
                "COMPLETED";

            status.style.color =
                "var(--yellow)";
        }

    }


    showTemporaryMessage(
        `MISSION ${number} COMPLETE! +100 XP`
    );

}


/* =========================================================
   FISSION SIMULATOR
========================================================= */

function triggerFission() {

    const stage =
        document.getElementById("fissionStage");

    const button =
        document.getElementById("fireButton");

    const status =
        document.getElementById("simulationStatus");


    if (
        stage.classList.contains(
            "fission-active"
        )
    ) {

        return;

    }


    stage.classList.add(
        "fission-active"
    );

    button.disabled = true;

    status.textContent =
        "REACTION";

    status.style.color =
        "var(--yellow)";


    addXP(50);


    setTimeout(() => {

        status.textContent =
            "FISSION COMPLETE";

        status.style.color =
            "var(--green)";

    }, 1300);


    setTimeout(() => {

        stage.classList.remove(
            "fission-active"
        );

        button.disabled = false;

        status.textContent =
            "READY";

        status.style.color =
            "var(--green)";

    }, 3000);

}


/* =========================================================
   CHAIN REACTION GAME
========================================================= */

function startChainReaction() {

    if (chainRunning) return;

    chainRunning = true;

    chainGeneration = 0;

    chainNeutrons = 1;

    chainEnergy = 0;


    updateChainStats();


    const message =
        document.getElementById(
            "gameMessage"
        );

    message.textContent =
        "NEUTRON RELEASED — CHAIN REACTION STARTING...";


    runGeneration();

}


function runGeneration() {

    if (!chainRunning) return;


    chainGeneration++;

    chainNeutrons =
        Math.min(
            Math.pow(2, chainGeneration),
            64
        );

    chainEnergy +=
        chainNeutrons * 20;


    updateChainStats();

    createChainNeutrons(
        chainNeutrons
    );


    const message =
        document.getElementById(
            "gameMessage"
        );


    if (chainGeneration < 5) {

        message.textContent =
            `Generation ${chainGeneration}: `
            +
            `${chainNeutrons} neutrons released!`;

        setTimeout(
            runGeneration,
            1000
        );

    }

    else {

        message.textContent =
            "⚠ REACTION GROWING — CONTROL IS ESSENTIAL!";

        addXP(100);

        setTimeout(() => {

            chainRunning = false;

        }, 1000);

    }

}


function createChainNeutrons(count) {

    const area =
        document.getElementById(
            "chainArea"
        );


    const visualCount =
        Math.min(count, 24);


    for (
        let i = 0;
        i < visualCount;
        i++
    ) {

        const neutron =
            document.createElement(
                "div"
            );

        neutron.className =
            "game-neutron";

        neutron.textContent = "n";


        const angle =
            Math.random()
            * Math.PI
            * 2;

        const distance =
            80 +
            Math.random() * 130;


        const x =
            Math.cos(angle)
            * distance;

        const y =
            Math.sin(angle)
            * distance;


        neutron.style.left =
            "50%";

        neutron.style.top =
            "50%";


        neutron.style.setProperty(
            "--tx",
            `${x}px`
        );

        neutron.style.setProperty(
            "--ty",
            `${y}px`
        );


        area.appendChild(
            neutron
        );


        setTimeout(() => {

            neutron.remove();

        }, 1000);

    }

}


function resetChainReaction() {

    chainRunning = false;

    chainGeneration = 0;

    chainNeutrons = 1;

    chainEnergy = 0;


    updateChainStats();


    const message =
        document.getElementById(
            "gameMessage"
        );

    message.textContent =
        "Fire the first neutron to begin.";


    document
        .querySelectorAll(
            ".game-neutron"
        )
        .forEach(
            n => n.remove()
        );

}


function updateChainStats() {

    document.getElementById(
        "generation"
    ).textContent =
        chainGeneration;


    document.getElementById(
        "neutronCount"
    ).textContent =
        chainNeutrons;


    document.getElementById(
        "energyCount"
    ).textContent =
        chainEnergy;

}


/* =========================================================
   REACTOR COMPONENTS
========================================================= */

const componentData = {

    fuel: {

        title: "Nuclear Fuel",

        text:
            "Nuclear fuel contains fissile material such as uranium-235. "
            +
            "When a suitable neutron is absorbed, the nucleus can undergo fission "
            +
            "and release energy and additional neutrons."

    },


    moderator: {

        title: "Moderator",

        text:
            "A moderator slows down fast neutrons. "
            +
            "In many thermal reactors, slower neutrons have a higher probability "
            +
            "of causing fission in uranium-235."

    },


    control: {

        title: "Control Rods",

        text:
            "Control rods contain materials that absorb neutrons. "
            +
            "By inserting or withdrawing the rods, the neutron population "
            +
            "and reactor power can be controlled."

    },


    coolant: {

        title: "Coolant",

        text:
            "The coolant removes heat from the reactor core. "
            +
            "That heat can then be transferred to another part of the system "
            +
            "to produce steam and generate electricity."

    },


    containment: {

        title: "Containment",

        text:
            "The containment structure provides a strong physical barrier "
            +
            "around important reactor systems. "
            +
            "It is part of the multiple layers of protection used in nuclear facilities."

    }

};


function showComponent(type) {

    const data =
        componentData[type];

    if (!data) return;


    document.getElementById(
        "componentInfo"
    ).innerHTML = `

        <span class="eyebrow">
            REACTOR COMPONENT
        </span>

        <h3>
            ${data.title}
        </h3>

        <p>
            ${data.text}
        </p>

    `;


    addXP(10);

}


/* =========================================================
   PWR / BWR QUIZ
========================================================= */

let reactorAnswered = false;


function answerReactor(answer) {

    if (reactorAnswered) return;

    reactorAnswered = true;


    const feedback =
        document.getElementById(
            "reactorFeedback"
        );


    if (answer === "BWR") {

        feedback.textContent =
            "✓ CORRECT! In a BWR, water boils directly inside the reactor vessel.";

        feedback.style.color =
            "var(--green)";

        addXP(75);

    }

    else {

        feedback.textContent =
            "✕ Not quite. The description matches a BWR because water boils directly in the reactor vessel.";

        feedback.style.color =
            "var(--red)";

    }


    setTimeout(() => {

        reactorAnswered = false;

    }, 2500);

}


/* =========================================================
   INFORMATION MODALS
========================================================= */

function openInfo(type) {

    const modal =
        document.getElementById(
            "infoModal"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );

    const content =
        document.getElementById(
            "modalContent"
        );

    const eyebrow =
        document.getElementById(
            "modalEyebrow"
        );


    if (type === "impact") {

        eyebrow.textContent =
            "MISSION 04";

        title.textContent =
            "Nuclear Energy & Society";


        content.innerHTML = `

            <p>
                Nuclear fission can provide a large amount
                of electricity from a relatively small quantity
                of fuel.
            </p>

            <ul>

                <li>
                    Nuclear power plants generate electricity
                    using heat from nuclear reactions.
                </li>

                <li>
                    Normal nuclear electricity generation
                    does not involve burning fossil fuel.
                </li>

                <li>
                    Radioactive waste requires controlled
                    handling and long-term management.
                </li>

                <li>
                    Nuclear safety relies on multiple layers
                    of protection and engineered systems.
                </li>

            </ul>

        `;

    }


    else if (type === "future") {

        eyebrow.textContent =
            "MISSION 05";

        title.textContent =
            "The Future of Nuclear Energy";


        content.innerHTML = `

            <p>
                Nuclear researchers are investigating
                advanced reactor concepts that may provide
                new approaches to safety, efficiency and fuel use.
            </p>

            <ul>

                <li>
                    Small Modular Reactors (SMRs)
                </li>

                <li>
                    Generation IV reactor concepts
                </li>

                <li>
                    Molten Salt Reactors
                </li>

                <li>
                    Fast Neutron Reactors
                </li>

            </ul>

        `;

    }


    modal.classList.add(
        "active"
    );

}


function closeModal() {

    document
        .getElementById(
            "infoModal"
        )
        .classList.remove(
            "active"
        );

}


document
    .getElementById("infoModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeModal();

            }

        }
    );


/* =========================================================
   FINAL QUIZ
========================================================= */

const quizData = [

    {

        question:
            "What is nuclear fission?",

        options: [

            "The joining of two light nuclei",

            "The splitting of a heavy nucleus",

            "The movement of electrons",

            "The heating of a nucleus"

        ],

        answer: 1

    },


    {

        question:
            "Which isotope is commonly used as fuel in thermal fission reactors?",

        options: [

            "Hydrogen-1",

            "Carbon-12",

            "Uranium-235",

            "Oxygen-16"

        ],

        answer: 2

    },


    {

        question:
            "What particle initiates the fission of uranium-235?",

        options: [

            "Electron",

            "Photon",

            "Neutron",

            "Proton"

        ],

        answer: 2

    },


    {

        question:
            "What happens to neutrons during a chain reaction?",

        options: [

            "They can cause additional fission events",

            "They become electrons",

            "They disappear immediately",

            "They stop nuclear reactions"

        ],

        answer: 0

    },


    {

        question:
            "What is the main role of control rods?",

        options: [

            "Increase the temperature",

            "Absorb neutrons",

            "Create electricity directly",

            "Produce uranium"

        ],

        answer: 1

    },


    {

        question:
            "What is the main purpose of a reactor coolant?",

        options: [

            "Remove heat from the core",

            "Create neutrons",

            "Split electrons",

            "Store radioactive waste"

        ],

        answer: 0

    },


    {

        question:
            "In a simplified reactor model, what does k ≈ 1 represent?",

        options: [

            "A decreasing chain reaction",

            "A self-sustaining steady chain reaction",

            "A reactor with no neutrons",

            "Complete reactor shutdown"

        ],

        answer: 1

    },


    {

        question:
            "Which reactor type boils water directly inside the reactor vessel?",

        options: [

            "PWR",

            "BWR",

            "Both always",

            "Neither"

        ],

        answer: 1

    }

];


function answerQuiz(selected) {

    const question =
        quizData[quizIndex];

    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const buttons =
        document.querySelectorAll(
            "#quizOptions button"
        );


    buttons.forEach(
        button =>
            button.disabled = true
    );


    if (
        selected === question.answer
    ) {

        quizScore++;

        addXP(100);

        feedback.textContent =
            "✓ CORRECT! +100 XP";

        feedback.style.color =
            "var(--green)";

    }

    else {

        feedback.textContent =
            "✕ Not quite. Review the concept and keep going.";

        feedback.style.color =
            "var(--red)";

    }


    setTimeout(() => {

        quizIndex++;

        if (
            quizIndex <
            quizData.length
        ) {

            loadQuiz();

        }

        else {

            finishQuiz();

        }

    }, 1200);

}


function loadQuiz() {

    const question =
        quizData[quizIndex];


    document.getElementById(
        "quizQuestion"
    ).textContent =
        question.question;


    const options =
        document.getElementById(
            "quizOptions"
        );


    options.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                option;

            button.onclick =
                () =>
                    answerQuiz(index);

            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "quizProgress"
    ).textContent =
        `QUESTION ${quizIndex + 1} / ${quizData.length}`;


    document.getElementById(
        "quizProgressBar"
    ).style.width =
        `${((quizIndex + 1) / quizData.length) * 100}%`;


    document.getElementById(
        "quizFeedback"
    ).textContent =
        "";

}


function finishQuiz() {

    const quizContent =
        document.getElementById(
            "quizContent"
        );

    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const percentage =
        Math.round(
            (
                quizScore /
                quizData.length
            ) * 100
        );


    let title;


    if (percentage >= 90) {

        title =
            "NUCLEAR SCIENTIST 🏆";

    }

    else if (percentage >= 70) {

        title =
            "REACTOR ENGINEER ⚛";

    }

    else if (percentage >= 50) {

        title =
            "FISSION EXPLORER 🔬";

    }

    else {

        title =
            "KEEP EXPLORING 🚀";

    }


    quizContent.innerHTML = `

        <div style="
            text-align:center;
            padding:30px 0;
        ">

            <div style="
                font-size:60px;
                margin-bottom:15px;
            ">
                🏆
            </div>

            <span class="eyebrow">
                MISSION COMPLETE
            </span>

            <h3 style="
                margin-top:10px;
            ">
                ${title}
            </h3>

            <p style="
                color:var(--muted);
                margin-top:10px;
            ">
                You scored
                <strong>
                    ${quizScore}
                </strong>
                out of
                <strong>
                    ${quizData.length}
                </strong>
                questions.
            </p>

            <p style="
                color:var(--cyan);
                font-size:28px;
                margin-top:10px;
            ">
                ${percentage}%
            </p>

        </div>

    `;


    feedback.textContent =
        "You have completed the FissionQuest final challenge!";


    addXP(250);


    document.getElementById(
        "quizProgress"
    ).textContent =
        "MISSION COMPLETE";


    document.getElementById(
        "quizProgressBar"
    ).style.width =
        "100%";

}


/* =========================================================
   TEMPORARY MESSAGE
========================================================= */

function showTemporaryMessage(
    message
) {

    const old =
        document.querySelector(
            ".temporary-message"
        );

    if (old) old.remove();


    const element =
        document.createElement(
            "div"
        );

    element.className =
        "temporary-message";


    element.textContent =
        message;


    element.style.position =
        "fixed";

    element.style.left =
        "50%";

    element.style.bottom =
        "30px";

    element.style.transform =
        "translateX(-50%)";

    element.style.zIndex =
        "5000";

    element.style.padding =
        "13px 20px";

    element.style.border =
        "1px solid rgba(86,224,255,0.4)";

    element.style.background =
        "#0c151e";

    element.style.color =
        "var(--cyan)";

    element.style.borderRadius =
        "10px";

    element.style.fontSize =
        "11px";

    element.style.fontWeight =
        "700";

    element.style.letterSpacing =
        "1px";

    element.style.boxShadow =
        "0 10px 40px rgba(0,0,0,0.5)";


    document.body.appendChild(
        element
    );


    setTimeout(() => {

        element.remove();

    }, 2200);

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".mission-card, .intro-card, .impact-card"
    )
    .forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            revealObserver.observe(
                element
            );

        }
    );


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateXP();

loadQuiz();