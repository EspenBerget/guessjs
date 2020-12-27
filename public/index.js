
const main = document.getElementsByTagName("main")[0];
const timer = document.getElementById("timer");
const timerText = document.getElementById("timer-text");

function setTimerDuration(seconds) {
    timer.style.animationDuration = seconds;
}

function addCard(text) {
    let scene = document.createElement('div');
    let card  = document.createElement('div');
    let front = document.createElement('div');
    let back  = document.createElement('div');

    scene.className = "scene";
    card.className = "card";
    front.className= "face front";
    back.className = "face back";

    front.innerHTML = "?";
    back.innerHTML  = text;
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => {
        if (!card.classList.contains("is-flipped")) {
            if (pick.length >= 2) {
                return
            }
            card.classList.add("is-flipped");
            pick.push(card);
            testPick();
            if (timeout === null) {
                timerText.innerHTML = "go!";
                setTimerDuration("1s");
                timeout = setTimeout(() => { alert("You lose!"); reset(); }, 60000);
                t1 = setTimeout(() => setTimerDuration("0.7s"), 30000);
                t2 = setTimeout(() => setTimerDuration("0.4s"), 50000);
                t3 = setTimeout(() => setTimerDuration("0.2s"), 57000);
            }
        } 
    });

    scene.appendChild(card);
    main.appendChild(scene);

    return card;
}

let model = [
    ["A", false],
    ["A", false],
    ["B", false],
    ["B", false],
    ["C", false],
    ["C", false],
    ["D", false],
    ["D", false],
    ["E", false],
    ["E", false],
    ["F", false],
    ["F", false],
    ["G", false],
    ["G", false],
    ["H", false],
    ["H", false],
    ["I", false],
    ["I", false],
    ["J", false],
    ["J", false],
];

let pick = [];
let solved = 0;
let timeout = null;
let t1 = null;
let t2 = null;
let t3 = null;

function renderGame() {
    model.forEach(([v, _]) => addCard(v));
}

function flipBackCards() {
    pick.forEach(v => v.classList.remove("is-flipped"));
}

function flipBackAll() {
    let cards = document.getElementsByClassName("card");
    for (let c of cards) {
        c.classList.remove("is-flipped");
    }
}

function randomGame() {
    for (let i = model.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [model[i], model[j]] = [model[j], model[i]];
    }
}

function reset() {
    setTimerDuration("5s");
    timerText.innerHTML = "ready?";
    timeout = null;
    flipBackAll();
    pick = [];
    solved = 0;
    randomGame();
}

function youWin() {
    clearTimeout(timeout);
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    alert("You Win!");
    reset();
}

function testPick() {
    if (pick.length === 2) {
        let vs = pick.map(c => c.innerHTML);
        if (vs.every(v => v === vs[0])) {
            solved += 1;
            pick = [];
        } else {
            setTimeout(() => {flipBackCards(); pick = []}, 1000);
        }
    }

    if (solved === 10) {
        setTimeout(youWin, 800);
    }
}

reset();
renderGame();