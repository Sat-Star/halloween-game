var playerPosition = 1;
var isActive = 0;

const dice = document.getElementById("dice");
const face = document.getElementById("face");
const rollButton = document.getElementById("rollButton");
const image = document.getElementById("counter");
const quest = document.getElementById("question");
const opt = document.getElementById("options");

const qcont = document.getElementsByClassName("question-container")[0];
//qcont.style.display = 'none';

const refresh = document.getElementById("reload");

let rotation = 0;
refresh.addEventListener("click", function () {
    isActive = 0;
    rotation += 360;
    this.style.transform = `rotate(${rotation}deg)`;
    if(playerPosition<=31)
    document.getElementById("cell-" + (playerPosition)).innerHTML = (playerPosition);
    else if(playerPosition >= 31)
    document.getElementById("cell-31").innerHTML = 31;
    playerPosition = 1;
    document.getElementById("cell-" + playerPosition).innerHTML = "<img id='counter' class = 'img' src='icon.png'></img>" + playerPosition;

    qcont.style.display = 'block';
    quest.innerHTML = "WELCOME TO HALLOWEEN BOARD. CLICK ON THE DICE TO START<br><br>Wait and answer the question if your pointer lands on a GRAVEYARD";
    opt.innerHTML = "";
});


const trivia = {
    3: 'triv', 7: 'triv', 14: 'triv', 16: 'triv', 24: 'triv', 30: 'triv'
};

const riddle = {
    9: 'rid', 19: 'rid', 28: 'rid', 31: 'rid'
};

const qs = {
    3: 'What is the traditional Halloween activity where kids dress up in costumes and go door-to-door for candy?',
    7: 'In which country did the tradition of Halloween start?',
    14: 'What are witches said to ride on during Halloween night?',
    16: 'What is the name of the Mexican holiday that celebrates the Day of the Dead?',
    24: 'What do people typically bob for during Halloween games?',
    30: 'What is the name of the Celtic festival that Halloween is believed to have originated from?',

    9: `I don't have lungs, but I need air.
        The more I eat, the more I grow.
        I dance, I live, I drink, I die.
        I'm always hungry, ready to eat.
        I rarely thirst, I can barely drink.
        Shoot me, stab me I don't mind.
        Suffocate or drown me, I'll be no more.`,

    19: `I have a name but it isn't mine
        You don't think about me while in your prime
        People cry when I'm in their sight
        Others lie with me all day and night.
        What am I?`,

    28: `From the head down to toes, through every living being I flow.
        Some people might faint when they see me though! What am I?`,

    31: `CONGRATS !! YOU DID IT
        HAPPY HALLOWEEN`
};

const optionss = {
    3: `<div class="option" id = "opt1">A. Pumpkin carving </div>
        <div class="option" id = "opt2">B. Costume party </div>
        <div class="option" id = "opt3">C. Trick-or-treating</div>
        <div class="option" id = "opt4">D. Haunted house tour</div>`,

    7: `<div class="option" id = "opt1">A. United States</div>
        <div class="option" id = "opt2">B. Ireland</div>
        <div class="option" id = "opt3">C. France</div>
        <div class="option" id = "opt4">D. Mexico</div>`,

    14: `<div class="option" id = "opt1">A. Broomsticks</div>
        <div class="option" id = "opt2">B. Vacuum cleaners</div>
        <div class="option" id = "opt3">C. Skateboards</div>
        <div class="option" id = "opt4">D. Unicorns</div>`,

    16: `<div class="option" id = "opt1">A. Dia de los Muertos</div>
        <div class="option" id = "opt2">B. Fiesta de los Muertos</div>
        <div class="option" id = "opt3">C. Halloween de los Muertos</div>
        <div class="option" id = "opt4">D. Noche de los Muertos</div>`,

    24: `<div class="option" id = "opt1">A. Apples</div>
        <div class="option" id = "opt2">B. Candy bars</div>
        <div class="option" id = "opt3">C. Marshmallows</div>
        <div class="option" id = "opt4">D. Oranges</div>`,

    30: `<div class="option" id = "opt1">A. Samhain</div>
        <div class="option" id = "opt2">B. Beltane</div>
        <div class="option" id = "opt3">C. Lughnasadh</div>
        <div class="option" id = "opt4">D. Imbolc</div>`
};

document.getElementById("cell-" + playerPosition).innerHTML = "<img id='counter' class = 'img' src='icon.png'></img>" + playerPosition;

dice.addEventListener("click", () => {
    if (isActive == 0){
    dice.classList.remove("roll-animation");
    dice.offsetWidth;
    dice.classList.add("roll-animation");

    const rollResult = Math.floor(Math.random() * 6) + 1;
    move(rollResult);

    setTimeout(() => {
        dice.classList.remove("roll-animation");
        face.textContent = rollResult;
    }, 500);

    setTimeout(function () {
        checkP();
    }, rollResult * 1000);}
    else{
        alert("Please answer the question first");
    }
});

function move(rollResult) {
    var count = 0;

    function step() {
        if (count < rollResult) {
            count++;
            playerPosition++;
            if (playerPosition <= 31) {
                document.getElementById("cell-" + (playerPosition - 1)).innerHTML = (playerPosition - 1);
                document.getElementById("cell-" + playerPosition).innerHTML = "<img id='counter' class = 'img' src='icon.png'></img>" + playerPosition;
                setTimeout(function () {
                    document.getElementById("cell-" + playerPosition).innerHTML = "<img id='counter' class='img' src='icon.png'>" + playerPosition;
                    step();
                }, 800);
            }
            else {
                checkP();
            }
        }
    }
    step();
}

function checkP() {
    if (trivia[playerPosition] == 'triv') {
        isActive = 1;
        quest.innerHTML = qs[playerPosition];
        opt.innerHTML = optionss[playerPosition];
        qcont.style.display = 'block';
        //console.log(`Displaying question for playerPosition ${playerPosition}`);
    }
    else if (playerPosition >= 31) {
        document.getElementById("cell-31").innerHTML = "<img id='counter' class = 'img' src='icon.png'></img>" + 31;
        quest.innerHTML = "HALLOWEEN SUCCESSFULLY REACHED!<br>NOW, TRICK OR TREAT!";
        opt.innerHTML = "&#127875;";
        qcont.style.display = 'block';
    }
    else if (playerPosition !== 1) {
        qcont.style.display = 'none';
    }
    var answered = 0;
    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        option.addEventListener("click", () => {
            const userChoice = option.textContent;
            if (playerPosition == 3 && userChoice === "C. Trick-or-treating") {
                const green = document.getElementById('opt3');
                green.style.backgroundColor = 'green';
                answered = 1;
                isActive = 0;
            }
            else if (playerPosition == 7 && userChoice === "B. Ireland") {
                const green = document.getElementById('opt2');
                green.style.backgroundColor = 'green';
                answered = 1;
                isActive = 0;
            }
            else if (playerPosition == 14 && userChoice === "A. Broomsticks") {
                const green = document.getElementById('opt1');
                green.style.backgroundColor = 'green';
                answered = 1;
                isActive = 0;
            }
            else if (playerPosition == 16 && userChoice === "A. Dia de los Muertos") {
                const green = document.getElementById('opt1');
                green.style.backgroundColor = 'green';
                answered = 1;
                isActive = 0;
            }
            else if (playerPosition == 24 && userChoice === "A. Apples") {
                const green = document.getElementById('opt1');
                green.style.backgroundColor = 'green';
                answered = 1;
                isActive = 0;
            }
            else if (playerPosition == 30 && userChoice === "A. Samhain") {
                const green = document.getElementById('opt1');
                green.style.backgroundColor = 'green';
                answered = 1;
                isActive = 0;
            } else {
                option.style.backgroundColor = 'red';
                setTimeout(function () {
                    opt.innerHTML = `<div class = "option">INCORRECT, you move backward by <b>1 STEP</b><br>BETTER LUCK NEXT TIME</div>`;
                }, 1500);
                answered = 1;
                isActive = 0;
                playerPosition--;
                document.getElementById("cell-" + (playerPosition + 1)).innerHTML = (playerPosition + 1);
                document.getElementById("cell-" + playerPosition).innerHTML = "<img id='counter' class = 'img' src='icon.png'></img>" + playerPosition;
            }

            if (answered == 1) {
                setTimeout(function () {
                    qcont.style.display = 'none';
                }, 3000);
            }
        });
    });
}