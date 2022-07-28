//settings for the slot machine
let numberOfReels = 3;
let balance = 100;
let bet = 5;
let winnings = 0;
let cashout = 0;
let autoPlayIsEnabled = false;
let welcomeMessage = "Welcome to the slot machine!";


// set the innerText of divs in .infoConsole to their starting values
function setStartingScores() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("bet").innerText = bet;
    document.getElementById("winnings").innerText = winnings;
}
setStartingScores()

// set the innerText of div with id info with welcomeMessage
function setWelcomeMessage() {
    document.getElementById("info").innerText = welcomeMessage;
}
setWelcomeMessage()

function clearInfo() {
    setTimeout(function(){
        document.getElementById("info").innerText = "";
    }, 2050);
}

//create 3 divs with class slot-machine-window and append them to the div with class slot-machine
function createSlotMachineReels() {
    const slotMachine = document.getElementById("slot-machine");
    const slotMachineReel = document.createElement("div");
    slotMachineReel.className = "slot-machine-reel";
    slotMachine.appendChild(slotMachineReel);
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


// run createSlotMachineReels function for the numberOfReels times
for (let i = 0; i < numberOfReels; i++) {
    createSlotMachineReels();
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



// attach the display set duplicates to the windows
// createDisplaySetsDuplicates();

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

// generate an array with the numbers 1-9
function generateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < 9; i++) {
        randomNumbers.push(i + 1);
    }
    return randomNumbers;
}

// shuffle the array
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

// store all the divs with class 'slot-machine-window to a variable
let slotMachineWindows = document.getElementsByClassName("slot-machine-window");

// loop through slotMachineWindows and add a random number to each div under slotMachineWindows
function addRandomNumbers() {
    for (let i = 0; i < slotMachineWindows.length; i++) {
        let setOfNumbers = shuffle(generateRandomNumbers());
        // count the number of divs with class 'display' in each div with class 'slot-machine-window'
        let numberOfDisplays = slotMachineWindows[i].getElementsByClassName("display").length;
        // assign each value from setOfNumbers to each div with class 'display'
        for (let j = 0; j < numberOfDisplays; j++) {
            slotMachineWindows[i].getElementsByClassName("display")[j].innerHTML = setOfNumbers[j % setOfNumbers.length];
        }
    }}
addRandomNumbers();


// add class .nudgeReel to a random div with class 'slot-machine-window'
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
        // check if all values in the randomNumbers array are the same
        function allAreEqual(array) {
            return array.every(function(element, index) {
                return element === array[0];
            });
        }
        if (allAreEqual(randomNumbers)) {

            // replace the value of the first element in the randomNumbers array
            if ( randomNumbers[0] < 2 ) {
                randomNumbers[0] = randomNumbers[0] + 1;
            }
            else {
                randomNumbers[0] = randomNumbers[0] - 1;
            }
        }
        else {}

        // once a valid set of random numbers has been generated, assign the class to the div with class 'slot-machine-window'
        // using the values in the nudgeReelSpeed array using randomNumber array values as indexes
        // use the values in the randomNumbers array as indexes to the nudgeReelSpeeds array
        // to assign a nudgeReel class to each div with class 'slot-machine-window'
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
    // remap the innerText of each div with class 'display' to a corresponding div with class 'display' under the div with class 'displaySet'
    // retrieve the innerText of div with class 'display1' under the div with class 'displaySet'
    var display1 = displaySet.getElementsByClassName("display1")[0].innerText;
    // retrieve the innerText of div with class 'display2' under the div with class 'displaySet'
    var display2 = displaySet.getElementsByClassName("display2")[0].innerText;
    // retrieve the innerText of div with class 'display3' under the div with class 'displaySet'
    var display3 = displaySet.getElementsByClassName("display3")[0].innerText;
    // retrieve the innerText of div with class 'display4' under the div with class 'displaySet'
    var display4 = displaySet.getElementsByClassName("display4")[0].innerText;
    // retrieve the innerText of div with class 'display5' under the div with class 'displaySet'
    var display5 = displaySet.getElementsByClassName("display5")[0].innerText;
    // retrieve the innerText of div with class 'display6' under the div with class 'displaySet'
    var display6 = displaySet.getElementsByClassName("display6")[0].innerText;
    // retrieve the innerText of div with class 'display7' under the div with class 'displaySet'
    var display7 = displaySet.getElementsByClassName("display7")[0].innerText;
    // retrieve the innerText of div with class 'display8' under the div with class 'displaySet'
    var display8 = displaySet.getElementsByClassName("display8")[0].innerText;
    // retrieve the innerText of div with class 'display9' under the div with class 'displaySet'
    var display9 = displaySet.getElementsByClassName("display9")[0].innerText;

    // clear the innerText values of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display1")[0].innerText = "";
    displaySet.getElementsByClassName("display2")[0].innerText = "";
    displaySet.getElementsByClassName("display3")[0].innerText = "";
    displaySet.getElementsByClassName("display4")[0].innerText = "";
    displaySet.getElementsByClassName("display5")[0].innerText = "";
    displaySet.getElementsByClassName("display6")[0].innerText = "";
    displaySet.getElementsByClassName("display7")[0].innerText = "";
    displaySet.getElementsByClassName("display8")[0].innerText = "";
    displaySet.getElementsByClassName("display9")[0].innerText = "";

    // assign the innerText of display9 to the innerText of div with class 'display6'
    displaySet.getElementsByClassName("display6")[0].innerText = display9;
    // assign the innerText of display8 to the innerText of div with class 'display5'
    displaySet.getElementsByClassName("display5")[0].innerText = display8;
    // assign the innerText of display7 to the innerText of div with class 'display4'
    displaySet.getElementsByClassName("display4")[0].innerText = display7;
    // assign the innerText of display6 to the innerText of div with class 'display3'
    displaySet.getElementsByClassName("display3")[0].innerText = display6;
    // assign the innerText of display5 to the innerText of div with class 'display2'
    displaySet.getElementsByClassName("display2")[0].innerText = display5;
    // assign the innerText of display4 to the innerText of div with class 'display1'
    displaySet.getElementsByClassName("display1")[0].innerText = display4;
    // assign the innerText of display3 to the innerText of div with class 'display9'
    displaySet.getElementsByClassName("display9")[0].innerText = display3;
    // assign the innerText of display2 to the innerText of div with class 'display8'
    displaySet.getElementsByClassName("display8")[0].innerText = display2;
    // assign the innerText of display1 to the innerText of div with class 'display7'
    displaySet.getElementsByClassName("display7")[0].innerText = display1;


}

function shiftDisplaysBy5(displaySet) {
    // remap the innerText of each div with class 'display' to a corresponding div with class 'display' under the div with class 'displaySet'
    // retrieve the innerText of div with class 'display1' under the div with class 'displaySet'
    var display1 = displaySet.getElementsByClassName("display1")[0].innerText;
    // retrieve the innerText of div with class 'display2' under the div with class 'displaySet'
    var display2 = displaySet.getElementsByClassName("display2")[0].innerText;
    // retrieve the innerText of div with class 'display3' under the div with class 'displaySet'
    var display3 = displaySet.getElementsByClassName("display3")[0].innerText;
    // retrieve the innerText of div with class 'display4' under the div with class 'displaySet'
    var display4 = displaySet.getElementsByClassName("display4")[0].innerText;
    // retrieve the innerText of div with class 'display5' under the div with class 'displaySet'
    var display5 = displaySet.getElementsByClassName("display5")[0].innerText;
    // retrieve the innerText of div with class 'display6' under the div with class 'displaySet'
    var display6 = displaySet.getElementsByClassName("display6")[0].innerText;
    // retrieve the innerText of div with class 'display7' under the div with class 'displaySet'
    var display7 = displaySet.getElementsByClassName("display7")[0].innerText;
    // retrieve the innerText of div with class 'display8' under the div with class 'displaySet'
    var display8 = displaySet.getElementsByClassName("display8")[0].innerText;
    // retrieve the innerText of div with class 'display9' under the div with class 'displaySet'
    var display9 = displaySet.getElementsByClassName("display9")[0].innerText;

    // clear the innerText values of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display1")[0].innerText = "";
    displaySet.getElementsByClassName("display2")[0].innerText = "";
    displaySet.getElementsByClassName("display3")[0].innerText = "";
    displaySet.getElementsByClassName("display4")[0].innerText = "";
    displaySet.getElementsByClassName("display5")[0].innerText = "";
    displaySet.getElementsByClassName("display6")[0].innerText = "";
    displaySet.getElementsByClassName("display7")[0].innerText = "";
    displaySet.getElementsByClassName("display8")[0].innerText = "";
    displaySet.getElementsByClassName("display9")[0].innerText = "";

    // assign the innerText of display9 to the innerText of div with class 'display4'
    displaySet.getElementsByClassName("display4")[0].innerText = display9;
    // assign the innerText of display8 to the innerText of div with class 'display3'
    displaySet.getElementsByClassName("display3")[0].innerText = display8;
    // assign the innerText of display7 to the innerText of div with class 'display2'
    displaySet.getElementsByClassName("display2")[0].innerText = display7;
    // assign the innerText of display6 to the innerText of div with class 'display1'
    displaySet.getElementsByClassName("display1")[0].innerText = display6;
    // assign the innerText of display5 to the innerText of div with class 'display9'
    displaySet.getElementsByClassName("display9")[0].innerText = display5;
    // assign the innerText of display4 to the innerText of div with class 'display8'
    displaySet.getElementsByClassName("display8")[0].innerText = display4;
    // assign the innerText of display3 to the innerText of div with class 'display7'
    displaySet.getElementsByClassName("display7")[0].innerText = display3;
    // assign the innerText of display2 to the innerText of div with class 'display6'
    displaySet.getElementsByClassName("display6")[0].innerText = display2;
    // assign the innerText of display1 to the innerText of div with class 'display5'
    displaySet.getElementsByClassName("display5")[0].innerText = display1;

}

function shiftDisplaysBy7(displaySet) {
    // remap the innerText of each div with class 'display' to a corresponding div with class 'display' under the div with class 'displaySet'
    // retrieve the innerText of div with class 'display1' under the div with class 'displaySet'
    var display1 = displaySet.getElementsByClassName("display1")[0].innerText;
    // retrieve the innerText of div with class 'display2' under the div with class 'displaySet'
    var display2 = displaySet.getElementsByClassName("display2")[0].innerText;
    // retrieve the innerText of div with class 'display3' under the div with class 'displaySet'
    var display3 = displaySet.getElementsByClassName("display3")[0].innerText;
    // retrieve the innerText of div with class 'display4' under the div with class 'displaySet'
    var display4 = displaySet.getElementsByClassName("display4")[0].innerText;
    // retrieve the innerText of div with class 'display5' under the div with class 'displaySet'
    var display5 = displaySet.getElementsByClassName("display5")[0].innerText;
    // retrieve the innerText of div with class 'display6' under the div with class 'displaySet'
    var display6 = displaySet.getElementsByClassName("display6")[0].innerText;
    // retrieve the innerText of div with class 'display7' under the div with class 'displaySet'
    var display7 = displaySet.getElementsByClassName("display7")[0].innerText;
    // retrieve the innerText of div with class 'display8' under the div with class 'displaySet'
    var display8 = displaySet.getElementsByClassName("display8")[0].innerText;
    // retrieve the innerText of div with class 'display9' under the div with class 'displaySet'
    var display9 = displaySet.getElementsByClassName("display9")[0].innerText;

    // clear the innerText values of each div with class 'display' under the div with class 'displaySet'
    displaySet.getElementsByClassName("display1")[0].innerText = "";
    displaySet.getElementsByClassName("display2")[0].innerText = "";
    displaySet.getElementsByClassName("display3")[0].innerText = "";
    displaySet.getElementsByClassName("display4")[0].innerText = "";
    displaySet.getElementsByClassName("display5")[0].innerText = "";
    displaySet.getElementsByClassName("display6")[0].innerText = "";
    displaySet.getElementsByClassName("display7")[0].innerText = "";
    displaySet.getElementsByClassName("display8")[0].innerText = "";
    displaySet.getElementsByClassName("display9")[0].innerText = "";

    // assign the innerText of display9 to the innerText of div with class 'display2'
    displaySet.getElementsByClassName("display2")[0].innerText = display9;
    // assign the innerText of display8 to the innerText of div with class 'display1'
    displaySet.getElementsByClassName("display1")[0].innerText = display8;
    // assign the innerText of display7 to the innerText of div with class 'display9'
    displaySet.getElementsByClassName("display9")[0].innerText = display7;
    // assign the innerText of display6 to the innerText of div with class 'display8'
    displaySet.getElementsByClassName("display8")[0].innerText = display6;
    // assign the innerText of display5 to the innerText of div with class 'display7'
    displaySet.getElementsByClassName("display7")[0].innerText = display5;
    // assign the innerText of display4 to the innerText of div with class 'display6'
    displaySet.getElementsByClassName("display6")[0].innerText = display4;
    // assign the innerText of display3 to the innerText of div with class 'display5'
    displaySet.getElementsByClassName("display5")[0].innerText = display3;
    // assign the innerText of display2 to the innerText of div with class 'display4'
    displaySet.getElementsByClassName("display4")[0].innerText = display2;
    // assign the innerText of display1 to the innerText of div with class 'display3'
    displaySet.getElementsByClassName("display3")[0].innerText = display1;

}


// after a nudgeReel is called, trigger the appropriate shiftDisplaysBy function depending on which
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


function checkMatch(){
    let i;
// store all divs with class 'display' in a variable
    const displays = document.getElementsByClassName("display");

    // retrieve all innerText of all divs with class 'display1' and store them in an array
    const topRow = [];
    for (i = 0; i < displays.length; i++) {
        if (displays[i].className === "display display1") {
            topRow.push(displays[i].innerText);
        }
    }

    // retrieve all innerText of all divs with class 'display2' and store them in an array
    const middleRow = [];
    for (i = 0; i < displays.length; i++) {
        if (displays[i].className === "display display2") {
            middleRow.push(displays[i].innerText);
        }
    }

    // retrieve all innerText of all divs with class 'display3' and store them in an array
    const bottomRow = [];
    for (i = 0; i < displays.length; i++) {
        if (displays[i].className === "display display3") {
            bottomRow.push(displays[i].innerText);
        }
    }

    // create an array of arrays containing the topRow, middleRow, and bottomRow
    const rows = [topRow, middleRow, bottomRow];
    console.log(rows);

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
            console.log('JACKPOT!')
            // update the info box with the winningMessage
            document.getElementById("info").innerText = `JACKPOT! You have won $${bet * 4}!`;

            // alert message to screen informing user of a win and how much they won
            alert(`JACKPOT!!! You just won $${bet * 4}!`);
            creditWinnings()
        }
    }
}


// function that updates the scores on info box and updates the credit balance
function creditWinnings() {
    winnings = winnings + (bet * 4);
    // update the innerText value of the div with id 'winnings'
    document.getElementById("winnings").innerText = winnings;

    // credit the balance with the value of winnings
    balance = balance + (bet * 4);

}

function increaseBet(){
    // increases the value of bet by increments of 5
    bet = bet + 5;
    // update the innerText value of the div with id 'bet'
    document.getElementById("bet").innerText = bet;
}
function decreaseBet(){
    if (bet > 5) {
        // decreases the value of bet by increments of 5
        bet = bet - 5;
        // update the innerText value of the div with id 'bet'
        document.getElementById("bet").innerText = bet;
    }
    else {
        alert("You can't bet less than $5!");
    }

}

// add an event listener to the 'increaseBet' button that calls increaseBet
document.getElementById("increaseBet").addEventListener("click", increaseBet);

// add an event listener to the 'decreaseBet' button that calls decreaseBet
document.getElementById("decreaseBet").addEventListener("click", decreaseBet);

// add an event listener to the 'spin' button that calls play when clicked
document.getElementById("spin").addEventListener("click", play);


// function contains all the code that runs when the slot machine is played
function play() {
    // check if balance is less than or equal to 0
    if (balance <= 0) {
        // if true, alert the user that they have no more credits
        alert("You have no more credits to play!");
        // set autoPlayIsEnabled to false
        autoPlayIsEnabled = false;
    }
    // check if balance is less than the value of bet
    else if (balance < bet) {
        // if true, alert the user that their bet is too high
        alert(`Your bet is too high! \n Your bet is currently $${bet} \n You only have $${balance} in your balance \n Please lower your bet to $${balance} or below to play`);
        // set autoPlayIsEnabled to false
        autoPlayIsEnabled = false;
    }

    else {
        // decrease balance by the current value of bet
        balance = balance - bet;
        // update the innerText value of the div with id 'balance'
        document.getElementById("balance").innerText = balance;

        nudgeReel()

        // update the info div to say 'now spinning....'
        document.getElementById("info").innerText = "Now spinning...";

        // run checkMatch function 2.1 seconds after nudgeReel function is finished
        setTimeout(checkMatch, 2050);

        // clear the info div 2.1 seconds after nudgeReel function is finished
        clearInfo();
    }
}

// function that toggles autoPlayIsEnabled between true and false
function toggleAutoPlay() {
    autoPlayIsEnabled = !autoPlayIsEnabled;
    console.log(`autoPlayIsEnabled: ${autoPlayIsEnabled}`);
}

//add an event listener to the 'autoPlay' button that calls toggleAutoPlay when clicked
document.getElementById("autoplay").addEventListener("click", toggleAutoPlay);

//add an event listener to the 'autoPlay' button that calls autoplay when clicked
document.getElementById("autoplay").addEventListener("click", autoPlay);


// run play function every 2.4 seconds if autoPlayIsEnabled is true
function autoPlay() {
    if (autoPlayIsEnabled) {
        play();
        setTimeout(autoPlay, 2400);
    }
}

// cashout function to add the current value of winnings to the balance
function cashOut() {
    cashout = balance;
    document.getElementById("cashoutWindow").innerText = cashout;
    //alert the user the amount of money they have won
    alert(`You have won $${winnings} \n You have cashed out a total of $${cashout}`);

    // update the innerText of info div to say 'You have cashed out a total of $${cashout}. Thank you for playing!'
    document.getElementById("info").innerText = `You have cashed out a total of $${cashout}. Thank you for playing!`;

    // reset winnings to 0 and balance to 0
    winnings = 0;
    document.getElementById("winnings").innerText = winnings;
    balance = 0;
    document.getElementById("balance").innerText = balance;
}

// add an event listener to the 'cashout' button that calls cashOut when clicked
document.getElementById("cashout").addEventListener("click", cashOut);























