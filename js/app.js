/*----- constants -----*/



/*----- app's state (variables) -----*/



/*----- cached element references -----*/



/*----- event listeners -----*/




/*----- functions -----*/


//settings for the slot machine
let numberOfReels = 3;

//create 3 divs with class slot-machine-window and append them to the div with class slot-machine
function createSlotMachineReels() {
    var slotMachine = document.getElementById("slot-machine");
    var slotMachineReel = document.createElement("div");
    slotMachineReel.className = "slot-machine-reel";
    slotMachine.appendChild(slotMachineReel);
}

// append a div with a class named 'window' to each div with class 'slot-machine-reel'
function createSlotMachineWindows() {
    var slotMachineReels = document.getElementsByClassName("slot-machine-reel");
    for (var i = 0; i < slotMachineReels.length; i++) {
        var slotMachineWindow = document.createElement("div");
        slotMachineWindow.className = "slot-machine-window";
        slotMachineReels[i].appendChild(slotMachineWindow);
    }
}


// run createSlotMachineReels function for the numberOfReels times
for (var i = 0; i < numberOfReels; i++) {
    createSlotMachineReels();
}

// attach the windows to the reels
createSlotMachineWindows();

// append a div with class 'displaySet' to each div with class 'slot-machine-window'
function createDisplaySets() {
    var slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (var i = 0; i < slotMachineWindows.length; i++) {
        var displaySet = document.createElement("div");
        displaySet.className = "displaySet";
        slotMachineWindows[i].appendChild(displaySet);
    }
}

// attatch the display sets to the windows
createDisplaySets();

// append a div with class 'displaySetDuplicate' to each div with class 'slot-machine-window'
function createDisplaySetsDuplicates() {
    var slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (var i = 0; i < slotMachineWindows.length; i++) {
        var displaySetDuplicate = document.createElement("div");
        displaySetDuplicate.className = "displaySetDuplicate";
        slotMachineWindows[i].appendChild(displaySetDuplicate);
    }
}

// attach the display set duplicates to the windows
createDisplaySetsDuplicates();

// create 9 divs with class 'display' and append them to each div with class 'displaySet'
function createDisplays() {
    var displaySets = document.getElementsByClassName("displaySet");
    for (var i = 0; i < displaySets.length; i++) {
        for (var j = 0; j < 9; j++) {
            var display = document.createElement("div");
            display.className = `display display${j+1}`;
            // display.className = `display${j+1}`;
            displaySets[i].appendChild(display);
        }
    }
}

createDisplays()

// create 9 divs with class 'display' and append them to each div with class 'displaySetDuplicate'
function createDisplaysDuplicates() {
    var displaySets = document.getElementsByClassName("displaySetDuplicate");
    for (var i = 0; i < displaySets.length; i++) {
        for (var j = 0; j < 9; j++) {
            var display = document.createElement("div");
            display.className = `display display${j+1}`;
            // display.id = `display${j+1}`;
            displaySets[i].appendChild(display);
        }
    }
}

createDisplaysDuplicates()

// generate an array with the numbers 1-9
function generateRandomNumbers() {
    var randomNumbers = [];
    for (var i = 0; i < 9; i++) {
        randomNumbers.push(i + 1);
    }
    return randomNumbers;
}

// shuffle the array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

console.log(shuffle(generateRandomNumbers()));


// store all the divs with class 'slot-machine-window to a variable
let slotMachineWindows = document.getElementsByClassName("slot-machine-window");

// loop through slotMachineWindows and add a random number to each div under slotMachineWindows
function addRandomNumbers() {
    for (var i = 0; i < slotMachineWindows.length; i++) {
        let setOfNumbers = shuffle(generateRandomNumbers());
        // let setOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // used for unshuffled number testing
        // count the number of divs with class 'display' in each div with class 'slot-machine-window'
        let numberOfDisplays = slotMachineWindows[i].getElementsByClassName("display").length;
        // assign each value from setOfNumbers to each div with class 'display'
        for (var j = 0; j < numberOfDisplays; j++) {
            slotMachineWindows[i].getElementsByClassName("display")[j].innerHTML = setOfNumbers[j % setOfNumbers.length];
        }
    }}
addRandomNumbers();



// when the 'spin' button is clicked, the class 'displaySetSpin' is added to each div with class 'displaySet' and
// the class 'displaySetDuplicateSpin' is added to each div with class 'displaySetDuplicate'
function spin() {
    var displaySets = document.getElementsByClassName("displaySet");
    var displaySetsDuplicate = document.getElementsByClassName("displaySetDuplicate");
    // add the class 'displaySetSpinHigh' to each div with class 'display' under each div with class 'displaySet'
    for (var i = 0; i < displaySets.length; i++) {
        displaySets[i].classList.add("displaySetSpin");
    }
    // add the class 'displaySetDuplicateSpinHigh' to each div with class 'display' under each div with class 'displaySetDuplicate'
    for (var i = 0; i < displaySetsDuplicate.length; i++) {
        displaySetsDuplicate[i].classList.add("displaySetDuplicateSpin");
    }

    // on animationend, remove the class 'displaySetSpinHigh' from each div with class 'display' under each div with class 'displaySet'
    for (var i = 0; i < displaySets.length; i++) {
        displaySets[i].addEventListener("animationend", function() {
                this.classList.remove("displaySetSpin");
            }
        );
    }
    // on animationend, remove the class 'displaySetDuplicateSpinHigh' from each div with class 'display' under each div with class 'displaySetDuplicate'
    for (var i = 0; i < displaySetsDuplicate.length; i++) {
        displaySetsDuplicate[i].addEventListener("animationend", function() {
                this.classList.remove("displaySetDuplicateSpin");
            }
        );
    }


}

// add class .nudgeReel to a random div with class 'slot-machine-window'
function nudgeReel() {
    var slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    // store the classes '.nudgeReelLow', '.nudgeReelMedium', and '.nudgeReelHigh' in an array
    var nudgeReelSpeeds = ["nudgeReelLow", "nudgeReelMed", "nudgeReelHigh"];
    // assign a random index from nudgeReelSpeeds to a class on each div with class 'slot-machine-window'
    for (var i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].classList.add(nudgeReelSpeeds[Math.floor(Math.random() * nudgeReelSpeeds.length)]);
    }

    // on transitionend, run the function shiftDisplays()
    for (var i = 0; i < slotMachineWindows.length; i++) {
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
    var slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (var i = 0; i < slotMachineWindows.length; i++) {
        if (slotMachineWindows[i].classList.contains("nudgeReelLow")) {
            // retrieve the child div with class 'displaySet' and pass it to shiftDisplaysBy3
            shiftDisplaysBy3(slotMachineWindows[i].getElementsByClassName("displaySet")[0]);
            // retrieve the child div with class 'displaySetDuplicate' and pass it to shiftDisplaysBy3
            shiftDisplaysBy3(slotMachineWindows[i].getElementsByClassName("displaySetDuplicate")[0]);}

        else if (slotMachineWindows[i].classList.contains("nudgeReelMed")) {
            // retrieve the child div with class 'displaySet' and pass it to shiftDisplaysBy5
            shiftDisplaysBy5(slotMachineWindows[i].getElementsByClassName("displaySet")[0]);
            // retrieve the child div with class 'displaySetDuplicate' and pass it to shiftDisplaysBy5
            shiftDisplaysBy5(slotMachineWindows[i].getElementsByClassName("displaySetDuplicate")[0]);}

        else if (slotMachineWindows[i].classList.contains("nudgeReelHigh")) {
            // retrieve the child div with class 'displaySet' and pass it to shiftDisplaysBy6
            shiftDisplaysBy7(slotMachineWindows[i].getElementsByClassName("displaySet")[0]);
            // retrieve the child div with class 'displaySetDuplicate' and pass it to shiftDisplaysBy6
            shiftDisplaysBy7(slotMachineWindows[i].getElementsByClassName("displaySetDuplicate")[0]);}

    }


// add class .resetPosition to each div with class 'slot-machine-window'
//     resetPosition();
    removeNudgeReelClasses()


}
// add class .resetPosition to each div with class 'slot-machine-window'
function resetPosition() {
    var slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (var i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].classList.add("resetPosition");
    }
    // on transitionend, remove the class 'resetPosition' from each div with class 'slot-machine-window'
    for (var i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].addEventListener("transitionend", function() {
            this.classList.remove("resetPosition");
        })
    }
// remove the class 'nudgeReelLow', 'nudgeReelMed', and 'nudgeReelHigh' from each div with class 'slot-machine-window'

}
function removeNudgeReelClasses() {
    var slotMachineWindows = document.getElementsByClassName("slot-machine-window");
    for (var i = 0; i < slotMachineWindows.length; i++) {
        slotMachineWindows[i].classList.remove("nudgeReelLow");
        slotMachineWindows[i].classList.remove("nudgeReelMed");
        slotMachineWindows[i].classList.remove("nudgeReelHigh");
        slotMachineWindows[i].classList.remove("resetPosition");
    }
}


// add function nudgeReel to the 'spin' button on click
document.getElementById("spin").addEventListener("click", nudgeReel);


// when the button with id 'spinX' is clicked, the class 'spinner' is added to each div with class 'displaySet' and
function spinnerX() {
    var displaySets = document.getElementsByClassName("displaySet");
    var displaySetsDuplicate = document.getElementsByClassName("displaySetDuplicate");
    // add the class 'spinner' to each div with class 'displaySet'
    for (var i = 0; i < displaySets.length; i++) {
        displaySets[i].classList.add("spinner");
    }

    // add the class 'spinner' to each div with class 'displaySetDuplicate'
    for (var i = 0; i < displaySetsDuplicate.length; i++) {
        displaySetsDuplicate[i].classList.add("spinner");

    }

    // on animationend, remove the class 'spinner' from each div with class 'displaySet'
    for (var i = 0; i < displaySets.length; i++) {
        displaySets[i].addEventListener("animationend", function() {
                this.classList.remove("spinner");
            }
        );
    }
    // on animationend, remove the class 'spinner' from each div with class 'displaySetDuplicate'
    for (var i = 0; i < displaySetsDuplicate.length; i++) {
        displaySetsDuplicate[i].addEventListener("animationend", function() {
                this.classList.remove("spinner");
            }
        );
    }


}










