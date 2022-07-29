/*----- constants -----*/

// reference of images to be used as symbols in the slot machine
const symbols = ["assets/symbols/anchor.svg", "assets/symbols/bomb.svg", "assets/symbols/coin.svg", "assets/symbols/flag.svg", "assets/symbols/hat.svg", "assets/symbols/skull.svg", "assets/symbols/treasure.svg", "assets/symbols/a.svg", "assets/symbols/10.svg"];
const numberOfReels = 3;
const music = new Audio("assets/sound/music.mp3");
const cashoutSFX = new Audio("assets/sound/cashout.wav");
const jackpotSFX = new Audio("assets/sound/jackpot.wav");
const wheelSFX = new Audio("assets/sound/wheel.mp3");
const clickSFX = new Audio("assets/sound/click.wav");


/*----- app's state (variables) -----*/
let balance = 100;
let bet = 5;
let winnings = 0;
let cashout = 0;
let autoPlayIsEnabled = false;



/*----- cached element references -----*/



/*----- event listeners -----*/


//add an event listener to the 'autoPlay' button that calls toggleAutoPlay when clicked
document.getElementById("autoplay").addEventListener("click", toggleAutoPlay);

//add an event listener to the 'autoPlay' button that calls autoplay when clicked
document.getElementById("autoplay").addEventListener("click", autoPlay);

// add an event listener to the 'increaseBet' button that calls increaseBet
document.getElementById("increaseBet").addEventListener("click", increaseBet);

// add an event listener to the 'decreaseBet' button that calls decreaseBet
document.getElementById("decreaseBet").addEventListener("click", decreaseBet);

// add an event listener to the 'cashout' button that calls cashOut when clicked
document.getElementById("cashout").addEventListener("click", cashOut);

// attach click event listeners to autoplay, increasebet, decreasebet, cashout, musicon, musicoff, soundon, soundoff buttons
// to play sound when clicked
document.getElementById("autoplay").addEventListener("click", playClickSFX);
document.getElementById("increaseBet").addEventListener("click", playClickSFX);
document.getElementById("decreaseBet").addEventListener("click", playClickSFX);
document.getElementById("cashout").addEventListener("click", playClickSFX);
document.getElementById("music").addEventListener("click", playClickSFX);
document.getElementById("sound").addEventListener("click", playClickSFX);



/*----- functions -----*/

// prompt the user to enter their starting balance
function promptUserForBalance() {
    let startingBalance;
    do {
        startingBalance = prompt("How much do you want to put into the slot machine?: \n (Minimum of 5 and maximum of 1000, only dollar bills can be inserted!)");
    } while (isNaN(startingBalance) || startingBalance === null || startingBalance === "" || startingBalance < 5 || startingBalance > 1000);

    return Math.floor(startingBalance);
}
// on page load, this function prompts the user for their starting balance and updates the initial balance accordingly
function initialBalance() {
    balance = promptUserForBalance();
    updateBalanceInfo();
}
initialBalance()

// function that updates the div with id 'balance' to the current value of balance
function updateBalanceInfo(){
    document.getElementById("balance").innerText = balance;
}

// set the innerText of divs in .infoConsole to their starting values
function setStartingScores() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("bet").innerText = bet;
    document.getElementById("winnings").innerText = winnings;
}
setStartingScores()



//create 3 divs with class slot-machine-window and append them to the div with class slot-machine
function createSlotMachineReels() {
    const slotMachine = document.getElementById("slot-machine");
    const slotMachineReel = document.createElement("div");
    slotMachineReel.className = "slot-machine-reel";
    slotMachine.appendChild(slotMachineReel);
}
// run createSlotMachineReels function for the numberOfReels times
for (let i = 0; i < numberOfReels; i++) {
    createSlotMachineReels();
}

// append a div with a class named 'window' to each div with class 'slot-machine-reel'
function createSlotMachineWindows() {
    const slotMachineReels = document.getElementsByClassName("slot-machine-reel");
    for (let i = 0; i < slotMachineReels.length; i++) {
        const slotMachineWindow = document.createElement("div");
        slotMachineWindow.className = "slot-machine-window";
        slotMachineReels[i].appendChild(slotMachineWindow);
    }
}
// attach the windows to the reels
createSlotMachineWindows();

// append a div with class 'displaySet' to each div with class 'slot-machine-window'
function createDisplaySets() {
    const slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (let i = 0; i < slotMachineWindows.length; i++) {
        const displaySet = document.createElement("div");
        displaySet.className = "displaySet";
        slotMachineWindows[i].appendChild(displaySet);
    }
}
// attach the display sets to the windows
createDisplaySets();

// create 9 divs with class 'display' and append them to each div with class 'displaySet'
function createDisplays() {
    const displaySets = document.getElementsByClassName("displaySet");
    for (let i = 0; i < displaySets.length; i++) {
        for (let j = 0; j < 9; j++) {
            const display = document.createElement("div");
            display.className = `display display${j+1}`;
            // display.className = `display${j+1}`;
            displaySets[i].appendChild(display);
        }
    }
}
createDisplays()

// function that shuffle an array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// loop through slotMachineWindows and add a random image to each div under slotMachineWindows
function addRandomImages() {
    // store all the divs with class 'slot-machine-window to a variable
    let slotMachineWindows = document.getElementsByClassName("slot-machine-window");

    for (let i = 0; i < slotMachineWindows.length; i++) {
        // shuffle the symbols array
        let setOfImages = shuffle(symbols);
        // count the number of divs with class 'display' in each div with class 'slot-machine-window'
        let numberOfDisplays = slotMachineWindows[i].getElementsByClassName("display").length;
        // assign each value from setOfImages to each div with class 'display'
        for (let j = 0; j < numberOfDisplays; j++) {
            slotMachineWindows[i].getElementsByClassName("display")[j].innerHTML = `<img src="${setOfImages[j % setOfImages.length]}" alt="symbol">`;
        }
    }
}
addRandomImages();

// this function randomly adds class .nudgeReelLow OR .nudgeReelMed OR .nudgeReelHigh to each div with a class 'slot-machine-window'
// these classes are used to determine the speed/distance the reel will move when played
function nudgeReel() {
    const slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    // store the classes '.nudgeReelLow', '.nudgeReelMedium', and '.nudgeReelHigh' in an array
    const nudgeReelSpeeds = ["nudgeReelLow", "nudgeReelMed", "nudgeReelHigh"];

    // assign a random index from nudgeReelSpeeds to a class on each div with class 'slot-machine-window'
    function assignNudgeReel() {
        let j;
        // generate 3 random numbers between 0 and 2 and store them in an array
        const randomNumbers = [];
        for (j = 0; j < numberOfReels; j++) {
            randomNumbers.push(Math.floor(Math.random() * 3));
        }
        // we need to make sure that the same reel speed is not assigned across all reels
        // if this happens, it's impossible to win
        // first check if all values in the randomNumbers array are the same
        function allAreEqual(array) {
            return array.every(function(element, index) {
                return element === array[0];
            });
        }
        if (allAreEqual(randomNumbers)) {

            // if the same speed is generated for all reels, we need to change the speed of the first reel to something else
            // we do this by replacing the value of the first element in the randomNumbers array
            if ( randomNumbers[0] < 2 ) {
                randomNumbers[0] = randomNumbers[0] + 1;
            }
            else {
                randomNumbers[0] = randomNumbers[0] - 1;
            }
        }
        else {}

        // once a valid set of random numbers has been generated, go ahead and use these numbers as indexes to the nudgeReelSpeeds array
        // to assign "nudgeReelLow","nudgeReelMed" or "nudgeReelHigh" to the div with class 'slot-machine-window'
        for (j = 0; j < slotMachineWindows.length; j++) {
            slotMachineWindows[j].classList.add(nudgeReelSpeeds[randomNumbers[j]]);
        }
    }
    assignNudgeReel();

    // on transitionend, run the function shiftDisplays()
    for (let i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].addEventListener("transitionend", shiftDisplays);
    }
}

function shiftDisplaysBy3(displaySet) {
    // remap the innerHTML of each div with class 'display' to a corresponding div with class 'display' under the div with class 'displaySet'
    // retrieve the innerHTML of div with class 'display1' under the div with class 'displaySet'
    let display1 = displaySet.getElementsByClassName("display1")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display2' under the div with class 'displaySet'
    let display2 = displaySet.getElementsByClassName("display2")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display3' under the div with class 'displaySet'
    let display3 = displaySet.getElementsByClassName("display3")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display4' under the div with class 'displaySet'
    let display4 = displaySet.getElementsByClassName("display4")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display5' under the div with class 'displaySet'
    let display5 = displaySet.getElementsByClassName("display5")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display6' under the div with class 'displaySet'
    let display6 = displaySet.getElementsByClassName("display6")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display7' under the div with class 'displaySet'
    let display7 = displaySet.getElementsByClassName("display7")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display8' under the div with class 'displaySet'
    let display8 = displaySet.getElementsByClassName("display8")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display9' under the div with class 'displaySet'
    let display9 = displaySet.getElementsByClassName("display9")[0].innerHTML;

    // clear the innerHTML of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display1")[0].innerHTML = "";
    displaySet.getElementsByClassName("display2")[0].innerHTML = "";
    displaySet.getElementsByClassName("display3")[0].innerHTML = "";
    displaySet.getElementsByClassName("display4")[0].innerHTML = "";
    displaySet.getElementsByClassName("display5")[0].innerHTML = "";
    displaySet.getElementsByClassName("display6")[0].innerHTML = "";
    displaySet.getElementsByClassName("display7")[0].innerHTML = "";
    displaySet.getElementsByClassName("display8")[0].innerHTML = "";
    displaySet.getElementsByClassName("display9")[0].innerHTML = "";

    // assign the innerHTML of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display6")[0].innerHTML = display9;
    // assign the innerText of display8 to the innerText of div with class 'display5'
    displaySet.getElementsByClassName("display5")[0].innerHTML = display8;
    // assign the innerText of display7 to the innerText of div with class 'display4'
    displaySet.getElementsByClassName("display4")[0].innerHTML = display7;
    // assign the innerText of display6 to the innerText of div with class 'display3'
    displaySet.getElementsByClassName("display3")[0].innerHTML = display6;
    // assign the innerText of display5 to the innerText of div with class 'display2'
    displaySet.getElementsByClassName("display2")[0].innerHTML = display5;
    // assign the innerText of display4 to the innerText of div with class 'display1'
    displaySet.getElementsByClassName("display1")[0].innerHTML = display4;
    // assign the innerText of display3 to the innerText of div with class 'display9'
    displaySet.getElementsByClassName("display9")[0].innerHTML = display3;
    // assign the innerText of display2 to the innerText of div with class 'display8'
    displaySet.getElementsByClassName("display8")[0].innerHTML = display2;
    // assign the innerText of display1 to the innerText of div with class 'display7'
    displaySet.getElementsByClassName("display7")[0].innerHTML = display1;
}
function shiftDisplaysBy5(displaySet) {
    // remap the innerHTML of each div with class 'display' to a corresponding div with class 'display' under the div with class 'displaySet'
    // retrieve the innerHTML of div with class 'display1' under the div with class 'displaySet'
    let display1 = displaySet.getElementsByClassName("display1")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display2' under the div with class 'displaySet'
    let display2 = displaySet.getElementsByClassName("display2")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display3' under the div with class 'displaySet'
    let display3 = displaySet.getElementsByClassName("display3")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display4' under the div with class 'displaySet'
    let display4 = displaySet.getElementsByClassName("display4")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display5' under the div with class 'displaySet'
    let display5 = displaySet.getElementsByClassName("display5")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display6' under the div with class 'displaySet'
    let display6 = displaySet.getElementsByClassName("display6")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display7' under the div with class 'displaySet'
    let display7 = displaySet.getElementsByClassName("display7")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display8' under the div with class 'displaySet'
    let display8 = displaySet.getElementsByClassName("display8")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display9' under the div with class 'displaySet'
    let display9 = displaySet.getElementsByClassName("display9")[0].innerHTML;

    // clear the innerHTML of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display1")[0].innerHTML = "";
    displaySet.getElementsByClassName("display2")[0].innerHTML = "";
    displaySet.getElementsByClassName("display3")[0].innerHTML = "";
    displaySet.getElementsByClassName("display4")[0].innerHTML = "";
    displaySet.getElementsByClassName("display5")[0].innerHTML = "";
    displaySet.getElementsByClassName("display6")[0].innerHTML = "";
    displaySet.getElementsByClassName("display7")[0].innerHTML = "";
    displaySet.getElementsByClassName("display8")[0].innerHTML = "";
    displaySet.getElementsByClassName("display9")[0].innerHTML = "";

    // assign the innerText of display9 to the innerText of div with class 'display4'
    displaySet.getElementsByClassName("display4")[0].innerHTML = display9;
    // assign the innerText of display8 to the innerText of div with class 'display3'
    displaySet.getElementsByClassName("display3")[0].innerHTML = display8;
    // assign the innerText of display7 to the innerText of div with class 'display2'
    displaySet.getElementsByClassName("display2")[0].innerHTML = display7;
    // assign the innerText of display6 to the innerText of div with class 'display1'
    displaySet.getElementsByClassName("display1")[0].innerHTML = display6;
    // assign the innerText of display5 to the innerText of div with class 'display9'
    displaySet.getElementsByClassName("display9")[0].innerHTML = display5;
    // assign the innerText of display4 to the innerText of div with class 'display8'
    displaySet.getElementsByClassName("display8")[0].innerHTML = display4;
    // assign the innerText of display3 to the innerText of div with class 'display7'
    displaySet.getElementsByClassName("display7")[0].innerHTML = display3;
    // assign the innerText of display2 to the innerText of div with class 'display6'
    displaySet.getElementsByClassName("display6")[0].innerHTML = display2;
    // assign the innerText of display1 to the innerText of div with class 'display5'
    displaySet.getElementsByClassName("display5")[0].innerHTML = display1;
}
function shiftDisplaysBy7(displaySet) {
    // remap the innerHTML of each div with class 'display' to a corresponding div with class 'display' under the div with class 'displaySet'
    // retrieve the innerHTML of div with class 'display1' under the div with class 'displaySet'
    let display1 = displaySet.getElementsByClassName("display1")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display2' under the div with class 'displaySet'
    let display2 = displaySet.getElementsByClassName("display2")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display3' under the div with class 'displaySet'
    let display3 = displaySet.getElementsByClassName("display3")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display4' under the div with class 'displaySet'
    let display4 = displaySet.getElementsByClassName("display4")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display5' under the div with class 'displaySet'
    let display5 = displaySet.getElementsByClassName("display5")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display6' under the div with class 'displaySet'
    let display6 = displaySet.getElementsByClassName("display6")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display7' under the div with class 'displaySet'
    let display7 = displaySet.getElementsByClassName("display7")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display8' under the div with class 'displaySet'
    let display8 = displaySet.getElementsByClassName("display8")[0].innerHTML;
    // retrieve the innerHTML of div with class 'display9' under the div with class 'displaySet'
    let display9 = displaySet.getElementsByClassName("display9")[0].innerHTML;

    // clear the innerHTML of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display1")[0].innerHTML = "";
    displaySet.getElementsByClassName("display2")[0].innerHTML = "";
    displaySet.getElementsByClassName("display3")[0].innerHTML = "";
    displaySet.getElementsByClassName("display4")[0].innerHTML = "";
    displaySet.getElementsByClassName("display5")[0].innerHTML = "";
    displaySet.getElementsByClassName("display6")[0].innerHTML = "";
    displaySet.getElementsByClassName("display7")[0].innerHTML = "";
    displaySet.getElementsByClassName("display8")[0].innerHTML = "";
    displaySet.getElementsByClassName("display9")[0].innerHTML = "";

    // assign the innerText of display9 to the innerText of div with class 'display2'
    displaySet.getElementsByClassName("display2")[0].innerHTML = display9;
    // assign the innerText of display8 to the innerText of div with class 'display1'
    displaySet.getElementsByClassName("display1")[0].innerHTML = display8;
    // assign the innerText of display7 to the innerText of div with class 'display9'
    displaySet.getElementsByClassName("display9")[0].innerHTML = display7;
    // assign the innerText of display6 to the innerText of div with class 'display8'
    displaySet.getElementsByClassName("display8")[0].innerHTML = display6;
    // assign the innerText of display5 to the innerText of div with class 'display7'
    displaySet.getElementsByClassName("display7")[0].innerHTML = display5;
    // assign the innerText of display4 to the innerText of div with class 'display6'
    displaySet.getElementsByClassName("display6")[0].innerHTML = display4;
    // assign the innerText of display3 to the innerText of div with class 'display5'
    displaySet.getElementsByClassName("display5")[0].innerHTML = display3;
    // assign the innerText of display2 to the innerText of div with class 'display4'
    displaySet.getElementsByClassName("display4")[0].innerHTML = display2;
    // assign the innerText of display1 to the innerText of div with class 'display3'
    displaySet.getElementsByClassName("display3")[0].innerHTML = display1;
}

// after a nudgeReel is called, trigger the appropriate shiftDisplays function depending on which
// nudgeReelSpeed is assigned to the parent div with class 'slot-machine-window'
function shiftDisplays() {
    const slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (let i = 0; i < slotMachineWindows.length; i++) {
        if (slotMachineWindows[i].classList.contains("nudgeReelLow")) {
            shiftDisplaysBy3(slotMachineWindows[i].getElementsByClassName("displaySet")[0]);}
        else if (slotMachineWindows[i].classList.contains("nudgeReelMed")) {
            shiftDisplaysBy5(slotMachineWindows[i].getElementsByClassName("displaySet")[0]);}
        else if (slotMachineWindows[i].classList.contains("nudgeReelHigh")) {
            shiftDisplaysBy7(slotMachineWindows[i].getElementsByClassName("displaySet")[0]);}
    }
    removeNudgeReelClasses()
}

// add class .resetPosition to each div with class 'slot-machine-window'
function resetPosition() {
    let i;
    let slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].classList.add("resetPosition");
    }
    // on transitionend, remove the class 'resetPosition' from each div with class 'slot-machine-window'
    for (i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].addEventListener("transitionend", function() {
            this.classList.remove("resetPosition");
        })
    }
}

function removeNudgeReelClasses() {
    const slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (let i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].classList.remove("nudgeReelLow");
        slotMachineWindows[i].classList.remove("nudgeReelMed");
        slotMachineWindows[i].classList.remove("nudgeReelHigh");
        slotMachineWindows[i].classList.remove("resetPosition");
    }
}

// function that updates the scores on info box and updates the credit balance
function creditWinnings() {
    winnings = winnings + (bet * 10);
    // update the innerText value of the div with id 'winnings'
    document.getElementById("winnings").innerText = winnings;

    // credit the balance with the value of winnings
    balance = balance + (bet * 10);
    // update the innerText value of the div with id 'balance'
    document.getElementById("balance").innerText = balance;
}

// function that checks if a row of 3 symbols matches and if so
// alerts the user and updates the balance and winnings
function checkMatch(){
    let i;
    // store all divs with class 'display' in a variable
    const displays = document.getElementsByClassName("display");

    // retrieve the innerHTML (image link) of all divs with class 'display1' and store them in an array called topRow
    const topRow = [];
    for (i = 0; i < displays.length; i++) {
        if (displays[i].className === "display display1") {
            topRow.push(displays[i].innerHTML);
        }
    }

    // retrieve the innerHTML (image link) of all divs with class 'display2' and store them in an array called middleRow
    const middleRow = [];
    for (i = 0; i < displays.length; i++) {
        if (displays[i].className === "display display2") {
            middleRow.push(displays[i].innerHTML);
        }
    }

    // retrieve the innerHTML (image link) of all divs with class 'display3' and store them in an array called bottomRow
    const bottomRow = [];
    for (i = 0; i < displays.length; i++) {
        if (displays[i].className === "display display3") {
            bottomRow.push(displays[i].innerHTML);
        }
    }

    // create an array of arrays containing the topRow, middleRow, and bottomRow
    const rows = [topRow, middleRow, bottomRow];

    // function that checks if all elements in an array are the same value
    function checkSame(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[0] !== array[i]) {
                return false;
            }
        }
        return true;
    }

    // now run checkSame on each array in rows
    for (i = 0; i < rows.length; i++) {
        if (checkSame(rows[i])) {
            playJackpotSFX();
            console.log('JACKPOT!')


            // change the opacity of the div with id 'container' to 0.1
            document.getElementById("container").style.opacity = 0.1;
            // retrieve the img with id 'jackpotHidden', and change its id to 'jackpotDisplayed'
            const jackpotHidden = document.getElementById("jackpotHidden");
            jackpotHidden.id = "jackpotDisplayed";


            // after 2 seconds, change the id of the img with id 'jackpotDisplayed' to 'jackpotHidden'
            setTimeout(function() {
                jackpotHidden.id = "jackpotHidden";
            }, 2000);
            // change the opacity of the div with id 'container' back to 1
            setTimeout(function() {
                document.getElementById("container").style.opacity = 1;
            }, 2000);







            creditWinnings()
        }
    }
    checkBalanceUnder5()
}

function displayInfo() {
    // change the opacity of the div with id 'container' to 0.1
    document.getElementById("container").style.opacity = 0.1;
    // retrieve the div with id 'infoOverlay', and change its id to 'infoOverlayDisplayed'
    let infoOverlayHidden = document.getElementById("infoOverlayHidden");
    infoOverlayHidden.id = "infoOverlayDisplayed";


    // after 2 seconds, change the id of the img with id 'infoOverlayDisplayed' back to 'infoOverlayHidden'
    setTimeout(function() {
        infoOverlayHidden.id = "infoOverlayHidden";
    }, 7000);
    // change the opacity of the div with id 'container' back to 1
    setTimeout(function() {
        document.getElementById("container").style.opacity = 1;
    }, 7000);
    // after 7 seconds, change the innerText value of the div with id 'infoOverlayDisplayed' to ' '
    setTimeout(function() {
        document.getElementById("infoOverlayHidden").innerText = " ";
    }, 7000);

}
// increase bet by 5
function increaseBet(){
    // if user tries to increase bet to more than their current balance, alert them
    if (bet + 5 > balance) {
        // update the innerText of the div with id 'infoOverlayHidden'
        document.getElementById("infoOverlayHidden").innerText = `You don't have enough money to increase your bet by 5!  \n Your balance is currently $${balance}! \n Your bet can't be higher than your balance! \n Decrease your bet to $${balance} or below to continue playing!`;
        autoPlayIsEnabled = false;
        displayInfo();}

    else {
        // increases the value of bet by increments of 5
        bet = bet + 5;
        // update the innerText value of the div with id 'bet'
        document.getElementById("bet").innerText = bet;
    }
}

// decrease bet by 5
function decreaseBet(){
    if (bet > 5) {
        // decreases the value of bet by increments of 5
        bet = bet - 5;
        // update the innerText value of the div with id 'bet'
        document.getElementById("bet").innerText = bet;
    }
    else {

        // update the innerText of the div with id 'infoOverlayHidden'
        document.getElementById("infoOverlayHidden").innerText = `You can't bet less than $5!`;
        displayInfo();
    }
}

// function that informs user their bet is too high if they try to play with a bet higher than their balance
function betTooHigh() {
    // if true, alert the user that their bet is too high

    // update the innerText of the div with id 'infoOverlayHidden'
    document.getElementById("infoOverlayHidden").innerText = `Your bet is too high! \n Your bet is currently $${bet} \n You only have $${balance} in your balance \n Please lower your bet to $${balance} or below to play`;
    displayInfo();
    // set autoPlayIsEnabled to false
    autoPlayIsEnabled = false;

}

// function contains all the code that runs when the slot machine is played
function play() {

    // check if balance is less than or equal to 0
    if (balance <= 0) {
        // if true, alert the user that they have no more credits

        // update the innerText of the div with id 'infoOverlayHidden'
        document.getElementById("infoOverlayHidden").innerText = `You have no more credits to play!`;
        displayInfo();
        // set autoPlayIsEnabled to false
        autoPlayIsEnabled = false;
    }
    // check if balance is less than the value of bet
    else if (balance < bet) {
        betTooHigh()
    }

    else {
        // play wheel sound
        playWheelSFX();
        // decrease balance by the current value of bet
        balance = balance - bet;
        // update the innerText value of the div with id 'balance'
        updateBalanceInfo()

        // call the function that spins the reels of the slot machine!
        nudgeReel()

        // call the function that spins the wheel!
        startSpinWheelAnimation()


        // run checkMatch function 2.1 seconds after nudgeReel function is finished
        setTimeout(checkMatch, 2050);

    }
}

// function that toggles autoPlayIsEnabled between true and false
function toggleAutoPlay() {
    autoPlayIsEnabled = !autoPlayIsEnabled;
    console.log(`autoPlayIsEnabled: ${autoPlayIsEnabled}`);
}

// run play function every 2.4 seconds if autoPlayIsEnabled is true
function autoPlay() {
    if (autoPlayIsEnabled) {
        play();
        setTimeout(autoPlay, 2400);
    }
}

// cashout function to add the current value of winnings to the balance
function cashOut() {
    playCashoutSFX();
    cashout = balance;

    //alert the user the amount of money they have won

    // update the innerText value of infoOverlayHidden
    document.getElementById("infoOverlayHidden").innerText = `You have won $${winnings} \n You have cashed out a total of $${cashout}`;
    displayInfo();


    // reset winnings to 0 and balance to 0
    winnings = 0;
    document.getElementById("winnings").innerText = winnings;
    balance = 0;
    document.getElementById("balance").innerText = balance;
}

// check if balance is < 5 and if so, update the info div with a message telling the user to cash out
function checkBalanceUnder5() {
    if (balance < 5) {
        // prompt the user to cash out
        // update the innerText value of infoOverlayHidden
        document.getElementById("infoOverlayHidden").innerText = `You have less than $5 in your balance. Please cash out now. Thank you!`;
        displayInfo();
    }
}

// set bet to the current value of balance
function setMaxBet() {
    if (balance >= 5) {
        bet = balance;
        document.getElementById("bet").innerText = bet;
    }
    else {

        // update the innerText of the div with id 'infoOverlayHidden'
        document.getElementById("infoOverlayHidden").innerText = `You can't bet less than $5!`;
        displayInfo();
    }

}

// attach setMaxBet() as a click eventlistener to the button with id 'maxbet'
document.getElementById("maxbet").addEventListener("click", setMaxBet);

// add a click event listener to the img with 'id' spinWheel that calls the play function
document.getElementById("spinWheel").addEventListener("click", play);

function startSpinWheelAnimation(){
    document.getElementById("spinWheel").classList.add("spinning");
}

function endSpinWheelAnimation() {
    // add an animationend event listener to the img with 'id' spinWheel that removes class .spinning from the img
    document.getElementById("spinWheel").addEventListener("animationend", function() {
        document.getElementById("spinWheel").classList.remove("spinning");
    });
}
endSpinWheelAnimation()

music.muted = true;
music.loop = false;
wheelSFX.muted = true;

// add an eventlistener that checks if the user has clicked the button with id 'music'
document.getElementById("music").addEventListener("click", function() {
    // check if music is muted
    if (music.muted) {
        // if true, unmute music
        music.muted = false;
        // call music play
        music.play();
        // change the src of the img with id 'music' to the src of the img with name 'musicoff
        document.getElementById("music").src = "assets/slotmachineframe/musicoff.svg";
    }
    else {
        // if false, mute music
        music.muted = true;
        // call music pause
        music.pause();
        // change the src of the img with id 'music' to the src of the img with name 'musicon
        document.getElementById("music").src = "assets/slotmachineframe/musicon.svg";
    }

});


// add an eventlistener that checks if the button with id 'sound' is clicked
document.getElementById("sound").addEventListener("click", function() {
    // check if sound is muted
    if (wheelSFX.muted) {
        // if true, unmute sound
        wheelSFX.muted = false;
        cashoutSFX.muted = false;
        jackpotSFX.muted = false;
        clickSFX.muted = false;

        // change the src of the img with id 'sound' to the src of the img with name 'soundoff
        document.getElementById("sound").src = "assets/slotmachineframe/soundoff.svg";
    }
    else {
        // if false, mute sound
        wheelSFX.muted = true;
        cashoutSFX.muted = true;
        jackpotSFX.muted = true;
        clickSFX.muted = true;

        // change the src of the img with id 'sound' to the src of the img with name 'soundon
        document.getElementById("sound").src = "assets/slotmachineframe/soundon.svg";
    }
})

// function that plays back the clickSFX sound
function playClickSFX() {
    clickSFX.play();
}

// function that plays back the wheelSFX sound
function playWheelSFX() {
    wheelSFX.play();
}

// function that plays back the cashoutSFX sound
function playCashoutSFX() {
    cashoutSFX.play();
}

// function that plays back the jackpotSFX sound
function playJackpotSFX() {
    jackpotSFX.play();
}
















