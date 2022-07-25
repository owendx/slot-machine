/*----- constants -----*/



/*----- app's state (variables) -----*/



/*----- cached element references -----*/



/*----- event listeners -----*/




/*----- functions -----*/



// we need formatted HTML strings for each symbol so we can append them to the DOM correctly
// lets set up an array and function to store the formatted HTML strings
let formattedHTMLImgStrings = [];
function prepareSymbols(){
    // Array to store all symbols used in reels
    let symbols = [];

// Create HTML Image Elements from images and push them into symbols array
    let image7 = new Image(50, 50);
    image7.src = 'imgs/7.png';
    symbols.push(image7);

    let bar = new Image(50, 50);
    bar.src = 'imgs/bar.png';
    symbols.push(bar);

    let clover = new Image(50, 50);
    clover.src = 'imgs/clover.png';
    symbols.push(clover);

    let diamond = new Image(50, 50);
    diamond.src = 'imgs/diamond.png';
    symbols.push(diamond);

    let heart = new Image(50, 50);
    heart.src = 'imgs/heart.png';
    symbols.push(heart);

    let shamrock = new Image(50, 50);
    shamrock.src = 'imgs/club.png';
    symbols.push(shamrock);

    let spade = new Image(50, 50);
    spade.src = 'imgs/spade.png';
    symbols.push(spade);

    let cherry = new Image(50, 50);
    cherry.src = 'imgs/cherry.png';
    symbols.push(cherry);

    let bell = new Image(50, 50);
    bell.src = 'imgs/bell.png';
    symbols.push(bell);


// We confirm that the symbol names can be retrieved from the src names, so lets set up a function for that
    function imgTemplateBuilder(img) {
        let nameOfSymbol = img.currentSrc.split(/[\\/]/).pop().replace(/\.[^/.]+$/, "");
        // return `<img src="${img.src}" alt="${img.alt}" width="${img.width}" height="${img.height}" id="${nameOfSymbol}">`;
        return `<img src="${img.src}" alt="${img.alt}" width="85" height="85" id="${nameOfSymbol}">`; // changed the width and height to 75px
    }

// lets push the formatted HTML strings to the array
    for (let i =0; i < symbols.length; i++) {
        formattedHTMLImgStrings.push(imgTemplateBuilder(symbols[i]));
    }

}
prepareSymbols()

// lets store all the divs with class .reelWindow into a variable called reelWindows
const reelWindows = document.querySelectorAll('.reelWindow');

// function that runs once the page loads
function initializer() {

    function generateDisplays() {
        // lets create an array to store the formatted HTML strings for the displays
        let symbolHTML = [];

        // first we declare an empty array and push the formatted HTML symbols into it
        const container = [];
        for (const symbol of formattedHTMLImgStrings) {
            container.push(symbol);
        }

        // here is a function that can shuffle the symbols in the container array
        function shuffle([...arr]) {
            let m = arr.length;
            while (m) {
                const i = Math.floor(Math.random() * m--);
                [arr[m], arr[i]] = [arr[i], arr[m]];
            }
            return arr;
        }
        // now we can call the function to shuffle the symbols and store the result in a new array
        symbolHTML.push(...shuffle(container));

        // now we can set the initial view of the reel windows by pushing the shuffled symbols into the displays
        // we need to push the formatted HTML strings into the display divs under each reelWindow
        // reelWindows is an array of divs with class .reelWindow, which has already been declared globally
        // now lets iterate over the reelWindows and push the formatted HTML strings into each display
        reelWindows.forEach(reelWindow => {
            let displaysOnThisReel = reelWindow.querySelectorAll('.display');

            let shuffledSymbols = shuffle(symbolHTML); // we must shuffle the symbols again before we push them into the displays
            for (let i = 0; i < displaysOnThisReel.length; i++) {
                displaysOnThisReel[i].innerHTML = shuffledSymbols[i];
            }
            let duplicatedReels = reelWindow.cloneNode(true);
            let duplicatedDisplays = duplicatedReels.querySelectorAll('.display');

            // console.log('these are the duplicated displays');
            // console.log(duplicatedDisplays);
            reelWindow.append(...duplicatedDisplays);

            let duplicatedReels2 = reelWindow.cloneNode(true);
            let duplicatedDisplays2 = duplicatedReels2.querySelectorAll('.display');
            reelWindow.append(...duplicatedDisplays2);

        });

        // now lets gather all the displays generated so far and put them into a variable called reelDisplays
        const reelDisplays = document.querySelectorAll('.display');

        // we need to assign id numbers to each display so we can reference them later
        for (let i = 0; i < reelDisplays.length; i++) {
            reelDisplays[i].id = `display${i + 1}`;
        }

    }
    generateDisplays()

    // function to handle translation animations of the reel windows/displays
    function translateReelWindow (){
        document.querySelectorAll('.display').forEach(display => {
            display.classList.add('translate');
        })
    }

    // lets set up functions to handle the blur animations of the reel windows/displays
    function blurDisplays() {
        document.querySelectorAll('.display').forEach(display => {
            display.classList.add('blur');
        })
    }

    function addEventListenersToDisplays() {
        // lets add event listeners to the reel displays
        document.querySelector('#spin').addEventListener('click', spin);
        document.querySelector('#spin').addEventListener('click', translateReelWindow);
        document.querySelector('#spin').addEventListener('click', blurDisplays);

    }
    addEventListenersToDisplays()


}
initializer()

// variable to count spin counts
let spinCount = 0;

function spin() {
    let allRows = [];

    if (true) {
        // now lets build a function that checks the values of each row
        function checkMatch() {
            function symbolPusher() {
                // this is the first row of displays
                let visibleDisplay1 = document.querySelector('#display5');
                let visibleDisplay2 = document.querySelector('#display41');
                let visibleDisplay3 = document.querySelector('#display77');

                // this is the second row of displays
                let visibleDisplay4 = document.querySelector('#display6');
                let visibleDisplay5 = document.querySelector('#display42');
                let visibleDisplay6 = document.querySelector('#display78');

                // this is the third row of displays
                let visibleDisplay7 = document.querySelector('#display7');
                let visibleDisplay8 = document.querySelector('#display43');
                let visibleDisplay9 = document.querySelector('#display79');

                // this is the fourth row of displays
                let visibleDisplay10 = document.querySelector('#display8');
                let visibleDisplay11 = document.querySelector('#display44');
                let visibleDisplay12 = document.querySelector('#display80');


                // lets declare an array to store the values of each row of displays
                let firstRow = [];
                let secondRow = [];
                let thirdRow = [];
                let fourthRow = [];

                // push the innerHTML values of the first row of displays into the array
                firstRow.push(visibleDisplay1.innerHTML);
                firstRow.push(visibleDisplay2.innerHTML);
                firstRow.push(visibleDisplay3.innerHTML);

                // push the innerHTML values of the second row of displays into the array
                secondRow.push(visibleDisplay4.innerHTML);
                secondRow.push(visibleDisplay5.innerHTML);
                secondRow.push(visibleDisplay6.innerHTML);

                // push the innerHTML values of the third row of displays into the array
                thirdRow.push(visibleDisplay7.innerHTML);
                thirdRow.push(visibleDisplay8.innerHTML);
                thirdRow.push(visibleDisplay9.innerHTML);

                // push the innerHTML values of the fourth row of displays into the array
                fourthRow.push(visibleDisplay10.innerHTML);
                fourthRow.push(visibleDisplay11.innerHTML);
                fourthRow.push(visibleDisplay12.innerHTML);


                // this function can convert the innerHTML values of the displays into the split off values of the symbols
                function innerHTMLSymbolConverter(innerHTML) {
                    return innerHTML.split(/[\\/]/).pop().replace(/\.[^/.]+$/, "");
                }

                // lets convert the innerHTML of the firstRow array into symbols iterating over them with the innerHTMLSymbolConverter function
                firstRow.forEach((display, index) => {
                    firstRow[index] = innerHTMLSymbolConverter(display);
                })
                // lets convert the innerHTML of the secondRow array into symbols iterating over them with the innerHTMLSymbolConverter function
                secondRow.forEach((display, index) => {
                    secondRow[index] = innerHTMLSymbolConverter(display);
                })
                // lets convert the innerHTML of the thirdRow array into symbols iterating over them with the innerHTMLSymbolConverter function
                thirdRow.forEach((display, index) => {
                    thirdRow[index] = innerHTMLSymbolConverter(display);
                })
                // lets convert the innerHTML of the fourthRow array into symbols iterating over them with the innerHTMLSymbolConverter function
                fourthRow.forEach((display, index) => {
                    fourthRow[index] = innerHTMLSymbolConverter(display);
                })

                // lets push the rows of displays into an array to make it easier to check if all the displays match

                allRows.push(firstRow);
                allRows.push(secondRow);
                allRows.push(thirdRow);
                allRows.push(fourthRow);
                // this function checks if all elements in an array match
                function allAreEqual(array) {
                    return array.every(element => {
                        if (element === array[0]) {
                            return true;
                        }
                    });
                }



                // now lets check if the symbols match using allAreEqual function by iterating over allRows array
                for (const row of allRows) {
                    let rowIndex = Object.keys({
                        0: firstRow,
                        1: secondRow,
                        2: thirdRow,
                        3: fourthRow
                    })[allRows.indexOf(row)];
                    rowIndex = Number(rowIndex);
                    let rowNumber = rowIndex + 1;
                    console.log(rowNumber);
                    console.log(row);
                    if (allAreEqual(row)) {
                        console.log(`YOU HAVE A MATCH!`)
                        matchFound(rowNumber);
                        // return true;
                    } else {
                        console.log(`NO MATCH`)
                    }
                    console.log(`\n`)
                }

                // function that triggers when a match is found
                function matchFound(rowNumber) {
                    // add a match class to the row of displays that matched
                    if (rowNumber === 1) {
                        document.querySelector('#display5').classList.add('match');
                        document.querySelector('#display41').classList.add('match');
                        document.querySelector('#display77').classList.add('match');
                    } else if (rowNumber === 2) {
                        document.querySelector('#display6').classList.add('match');
                        document.querySelector('#display42').classList.add('match');
                        document.querySelector('#display78').classList.add('match');
                    } else if (rowNumber === 3) {
                        document.querySelector('#display7').classList.add('match');
                        document.querySelector('#display43').classList.add('match');
                        document.querySelector('#display79').classList.add('match');
                    } else if (rowNumber === 4) {
                        document.querySelector('#display8').classList.add('match');
                        document.querySelector('#display44').classList.add('match');
                        document.querySelector('#display80').classList.add('match');
                    }
                }
            }
            symbolPusher();

        }
        checkMatch();
        spinCount = spinCount + 1;
    }

    else {


        console.log(spinCount);
        console.log('YOU ALREADY PLAYED');
        console.log('WE ARE SETTING UP THE NEXT ROUND...')

        let previousSpins = [];
        // function to copy the symbols from the previous spin to the current spin
        function copySymbols() {
            // lets get the symbols from the previous spin and store them in an array
            let previousDisplays = document.querySelectorAll('.display');
            previousDisplays.forEach(display => {
                // console.log(display.innerHTML);
                previousSpins.push(display.innerHTML);
            })

            // lets now copy the symbols from the previous spin to the current spin
            for (let i = 0; i < previousSpins.length; i++) {
                if (i + 12 < 108) {
                    let targetDisplay = document.querySelectorAll('.display')[i + 12]; // target the display that is 12 positions after the previous spin
                    targetDisplay.innerHTML = previousSpins[i];
                    console.log(targetDisplay.innerHTML);
                }
                else {
                    console.log('ERROR')
                }

            }
        }
        copySymbols();
        spinCount = 0;
    }
}