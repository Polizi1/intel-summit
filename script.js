// ==========================================
// INTEL SUSTAINABILITY SUMMIT CHECK-IN
// ==========================================

const attendanceGoal = 50;

let attendance = 0;

let teamCounts = {
    water: 0,
    zero: 0,
    power: 0
};

let attendees = [];

let celebrationShown = false;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");


// ==========================================
// CREATE ATTENDEE LIST
// ==========================================

const attendeeSection = document.createElement("div");

attendeeSection.id = "attendeeSection";

attendeeSection.innerHTML = `
    <h3>📋 Summit Attendees</h3>

    <div id="attendeeLists">

        <div>
            <h4>🌊 Team Water Wise</h4>
            <ul id="waterAttendees"></ul>
        </div>

        <div>
            <h4>🌿 Team Net Zero</h4>
            <ul id="zeroAttendees"></ul>
        </div>

        <div>
            <h4>⚡ Team Renewables</h4>
            <ul id="powerAttendees"></ul>
        </div>

    </div>
`;

document.querySelector(".team-stats").after(attendeeSection);


// Get attendee lists
const waterAttendees =
    document.getElementById("waterAttendees");

const zeroAttendees =
    document.getElementById("zeroAttendees");

const powerAttendees =
    document.getElementById("powerAttendees");


// ==========================================
// ATTENDEE LIST STYLING
// ==========================================

const listStyle = document.createElement("style");

listStyle.textContent = `

#attendeeSection {
    margin-top: 40px;
    padding: 25px;
    text-align: center;
}

#attendeeSection h3 {
    font-size: 28px;
    margin-bottom: 25px;
}

#attendeeLists {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

#attendeeLists > div {
    padding: 20px;
    border-radius: 15px;
    background: #f5f5f5;
}

#attendeeLists h4 {
    margin-bottom: 15px;
}

#attendeeLists ul {
    list-style: none;
    padding: 0;
}

#attendeeLists li {
    padding: 8px;
    margin: 5px 0;
    background: white;
    border-radius: 8px;
}

@media (max-width: 700px) {
    #attendeeLists {
        grid-template-columns: 1fr;
    }
}

`;

document.head.appendChild(listStyle);


// ==========================================
// CHECK-IN
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const team = teamSelect.value;

    if (name === "" || team === "") {
        return;
    }


    // Determine team name
    let teamName;

    if (team === "water") {
        teamName = "Team Water Wise";
    }

    else if (team === "zero") {
        teamName = "Team Net Zero";
    }

    else {
        teamName = "Team Renewables";
    }


    // Update attendance
    attendance++;

    teamCounts[team]++;


    // Add attendee
    attendees.push({
        name: name,
        team: teamName
    });


    // Personalized greeting
    greeting.textContent =
        `Welcome, ${name}! 🎉 You are checked in with ${teamName}!`;


    // Update website
    updatePage();


    // Save information
    saveData();


    // Clear form
    nameInput.value = "";
    teamSelect.value = "";


    // ======================================
    // CHECK GOAL
    // ======================================

    if (
        attendance >= attendanceGoal &&
        !celebrationShown
    ) {

        celebrationShown = true;

        showCelebration();

    }

});


// ==========================================
// UPDATE PAGE
// ==========================================

function updatePage() {

    attendeeCount.textContent = attendance;

    waterCount.textContent = teamCounts.water;

    zeroCount.textContent = teamCounts.zero;

    powerCount.textContent = teamCounts.power;


    // Progress bar
    const percentage =
        Math.min(
            (attendance / attendanceGoal) * 100,
            100
        );

    progressBar.style.width =
        percentage + "%";


    updateAttendeeList();

}


// ==========================================
// UPDATE ATTENDEE LIST
// ==========================================

function updateAttendeeList() {

    waterAttendees.innerHTML = "";
    zeroAttendees.innerHTML = "";
    powerAttendees.innerHTML = "";


    attendees.forEach(function(attendee) {

        const listItem =
            document.createElement("li");

        listItem.textContent =
            attendee.name;


        if (attendee.team === "Team Water Wise") {

            waterAttendees.appendChild(listItem);

        }

        else if (attendee.team === "Team Net Zero") {

            zeroAttendees.appendChild(listItem);

        }

        else if (attendee.team === "Team Renewables") {

            powerAttendees.appendChild(listItem);

        }

    });

}


// ==========================================
// SAVE DATA
// ==========================================

function saveData() {

    const data = {

        attendance: attendance,

        teamCounts: teamCounts,

        attendees: attendees

    };

    localStorage.setItem(
        "intelSummitData",
        JSON.stringify(data)
    );

}


// ==========================================
// LOAD DATA
// ==========================================

function loadData() {

    const savedData =
        localStorage.getItem("intelSummitData");


    if (savedData) {

        try {

            const data =
                JSON.parse(savedData);

            attendance =
                data.attendance || 0;

            teamCounts =
                data.teamCounts || {
                    water: 0,
                    zero: 0,
                    power: 0
                };

            attendees =
                data.attendees || [];

        }

        catch (error) {

            attendance = 0;

            teamCounts = {
                water: 0,
                zero: 0,
                power: 0
            };

            attendees = [];

        }

    }


    updatePage();


    // If saved attendance is already at 50,
    // show the celebration too.
    if (
        attendance >= attendanceGoal &&
        !celebrationShown
    ) {

        celebrationShown = true;

        showCelebration();

    }

}


// ==========================================
// WE DID IT POPUP 🎉
// ==========================================

function showCelebration() {

    // Find highest team count
    const highestCount =
        Math.max(
            teamCounts.water,
            teamCounts.zero,
            teamCounts.power
        );


    let winningTeams = [];


    if (teamCounts.water === highestCount) {

        winningTeams.push(
            "🌊 Team Water Wise"
        );

    }


    if (teamCounts.zero === highestCount) {

        winningTeams.push(
            "🌿 Team Net Zero"
        );

    }


    if (teamCounts.power === highestCount) {

        winningTeams.push(
            "⚡ Team Renewables"
        );

    }


    // Create popup
    const popup =
        document.createElement("div");

    popup.id =
        "celebrationPopup";


    popup.innerHTML = `

        <div class="celebration-box">

            <div class="celebration-icons">
                🎉 ✨ 🎉
            </div>

            <h2>
                WE DID IT!
            </h2>

            <p>
                50 attendees have checked in!
            </p>

            <p>
                Thank you for helping make
                the Sustainability Summit
                a success! 💚
            </p>

            <p class="winning-team">
                🏆 Winning Team(s): 🏆
                <br>
                ${winningTeams.join("<br>")}
            </p>

            <button id="celebrateButton">
                Let's Celebrate! 🎉
            </button>

        </div>

    `;


    document.body.appendChild(popup);


    // ======================================
    // POPUP STYLE
    // ======================================

    const style =
        document.createElement("style");


    style.textContent = `

        #celebrationPopup {

            position: fixed;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background: rgba(0, 0, 0, 0.6);

            display: flex;

            justify-content: center;

            align-items: center;

            z-index: 9999;

        }


        .celebration-box {

            background: white;

            padding: 40px;

            border-radius: 25px;

            text-align: center;

            width: 90%;

            max-width: 500px;

            box-shadow:
                0 15px 50px
                rgba(0, 0, 0, 0.3);

        }


        .celebration-icons {

            font-size: 45px;

        }


        .celebration-box h2 {

            font-size: 38px;

            margin: 15px 0;

        }


        .winning-team {

            font-weight: bold;

            font-size: 18px;

            line-height: 1.7;

        }


        #celebrateButton {

            border: none;

            padding: 14px 28px;

            border-radius: 25px;

            cursor: pointer;

            font-size: 16px;

            font-weight: bold;

            margin-top: 15px;

        }

    `;


    document.head.appendChild(style);


    // ======================================
    // CELEBRATE BUTTON
    // ======================================

    document
        .getElementById("celebrateButton")
        .addEventListener(
            "click",
            function() {

                popup.remove();

                startConfetti();

            }
        );


    // START CONFETTI AUTOMATICALLY 🎉
    startConfetti();

}


// ==========================================
// CONFETTI 🎉
// ==========================================

function startConfetti() {

    // Remove old confetti first
    const oldConfetti =
        document.getElementById("confetti");

    if (oldConfetti) {
        oldConfetti.remove();
    }


    const container =
        document.createElement("div");

    container.id =
        "confetti";

    document.body.appendChild(container);


    const confettiStyle =
        document.createElement("style");


    confettiStyle.textContent = `

        #confetti {

            position: fixed;

            inset: 0;

            pointer-events: none;

            overflow: hidden;

            z-index: 10000;

        }


        .confettiPiece {

            position: absolute;

            top: -20px;

            width: 10px;

            height: 18px;

            animation:
                confettiFall
                linear
                forwards;

        }


        @keyframes confettiFall {

            from {

                transform:
                    translateY(0)
                    rotate(0deg);

            }

            to {

                transform:
                    translateY(110vh)
                    rotate(720deg);

            }

        }

    `;


    document.head.appendChild(confettiStyle);


    const colors = [

        "#0071c5",
        "#00a651",
        "#ffcc00",
        "#ff69b4",
        "#9b59b6"

    ];


    // Create 150 confetti pieces
    for (
        let i = 0;
        i < 150;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "confettiPiece";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.animationDuration =
            Math.random() * 3 + 2 + "s";


        piece.style.animationDelay =
            Math.random() * 2 + "s";


        container.appendChild(piece);

    }


    // Remove confetti after 7 seconds
    setTimeout(function() {

        container.remove();

    }, 7000);

    const centerButtonStyle = document.createElement("style");

centerButtonStyle.textContent = `
    #celebrateButton {
        display: block;
        margin: 15px auto 0;
    }
`;

document.head.appendChild(centerButtonStyle);

}


// ==========================================
// START APP
// ==========================================

loadData();