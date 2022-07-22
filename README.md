# Browser-Based Game: Slot Machine
**Author: Oluwaseun Talabi**

A slot machine powered by HTML, CSS and Javascript.

### Contents

- Wireframe
- Slot Machine Description
- Pseudocode

### Wireframe
<iframe style="border:none" width="800" height="450" src="https://whimsical.com/embed/YQNJ3geosQsdeWZVZGAAdx"></iframe>

[Link to view wireframe on Whimsical: https://whimsical.com/olu-s-slot-machine-YQNJ3geosQsdeWZVZGAAdx](https://whimsical.com/olu-s-slot-machine-YQNJ3geosQsdeWZVZGAAdx)

### Symbol List
There are **7 symbols** that may appear in the reels when the slot machine is played:
<img src="https://hedonic.life/wp-content/uploads/2022/07/slot-machine-symbols-2.png" />

### Slot Machine Description

The slot machine is rendered on the page using a design powered by CSS Grid and Flexbox. The slot machine features 4 reels loaded with 7 symbols. 

When the page is first loaded, the buttons and reels are not initially active. The live console/info box prompts the user to enter their name, via the textbox at the bottom of the machine.

After the player has entered their name, the live console/info box then prompts the player to enter the amount they want to bet.

Once the user enters their name and bet, the buttons on the slot machine become active, and the player's current balance is displayed. The player can now play the slot machine by clicking the 'SPIN' button. When the 'SPIN' button is pressed, the player's balance is deducted by the bet amount, and the 4 reels will begin to spin for a few seconds, gradually coming to a stop on a random symbol. If all 4 reels have matching symbols, the player's balance is credited; the credit amount is determined by the player's current bet.

The player can cash out and redeem any winnings earned by clicking the 'PAYOUT' button. When the 'PAYOUT' button is pressed, the players balance plus any winnings are encoded into a cash voucher code which is provided to the player via the live console/info box. The player can then use this cash voucher to credit their balance during their next play session with the slot machine. 

The player may continue playing the slot machine until their balance reaches 0. When this happens, a message on the live console/info box displays informing the player that they can no longer play the slot machine due to insufficient balance, and to add more funds if they wish to continue playing. Players can add funds to their balance by entering special voucher codes into the input box. These voucher codes can only be obtained by cashing out winnings in a payout or be provided directly by the slot machine's operator. 

For convenience, an 'AUTO PLAY' option has been included for players who want the slot machine reels to automatically spin on their own. Pressing the 'AUTO PLAY' options enables the auto play feature, pressing the 'AUTO PLAY' button once more disables auto play.

Pressing the RESET button will clear the current play session, including the player name as well as player balance, bet and winnings values. Note that **resetting the slot machine will not clear any existing cash voucher codes generated while the page has been open.** The only way to completely clear cash voucher codes from the slot machine memory is to refresh the page.

The user input box is also configured to be used as a debugging tool and can even accept certain 'cheat' codes from users.


### JavaScript Pseudocode


```
All variables represent default values on initialization
// Constants
const playerName = "";

// State Variables
let playerBalance = 100,000;
let winnings = 0;
let bet = 10,000;
let autoPlay = false;
let reel1 = null;
let reel2 = null;
let reel3 = null;
let reel4 = null;
let symbolList = ['bar.jpg', 'spade.jpg', '7.jpg', 'diamond.jpg', 'clover.jpg', 'star.jpg', '3leaf.jpg']
let payoutAmount = null;
let voucherCodes = [];
let cheatCodes = ["forceMatch", "creditBoost", "freePlay"];
let userInput = "";

// Cached Elements
const spinButtonEl = document.querySelector("#spinButton");
const payoutButtonEl = document.querySelector("#payoutButton");
const autoPlayButtonEl = document.querySelector("#autoPlayButton");
const resetButtonEl = document.querySelector("#resetButton");
const enterButtonEl = document.querySelector("#enterButton");
const liveConsoleEl = document.querySelector("#liveConsole");
const userInputEl = document.querySelector("#userInput");
const enterButton = document.querySelector("#enterButton");

// Event Listeners
spinButtonEl.addEventListener("click", play);
payoutButtonEl.addEventListener("click", payout);
autoPlayButtonEl.addEventListener("click", autoPlay);
resetButtonEl.addEventListener("click", reset);

// Functions
function play(){
	// activate reel spin
	// using javascript math/floor methods to generate four random numbers
	// use the four random numbers to determine what symbol each spinning reel should land on
	// decrease playerBalance by amount of bet
	playerBalance +- bet;
	
	if (autoPlay === true){
	//run play() function again
	}
	else{}
}

function match(){
	// this function checks if all 4 reels match, and if so,
	// increases the player's winnings by four times the player's bet.
	if (reel1 === reel2 === reel3 === reel4){
		winnings += (bet * 4);
	}


function payout(){
	// return value of (balance + winnings)
	// create a voucherCode with value (balance + winnings)
	// print voucherCode info to live console/info box
	// set value of playerBalance to 0
	// set value of winnings to 0
}

function autoPlay(){
	// if autoPlay === false, set it to true
	// else, set autoPlay back to false


function autoPlayScript(){
	// trigger play() function automatically
}	
	
function reset(){
	// clear all variables back to their default states (except for voucherCodes)
}

function cheatCommand(userInput){
	// alter the flow of the slot machine if certain user input strings are received
	if (userInput === 'forceMatch'){
		// the next reel spin will 100% result in a match, no matter what
		}
	else if (userInput === 'creditBoost'){
		// instant credit of $100,000 to playerBalance
		}
	else if (userInput === 'freePlay'){
		// playing the slot machine will no longer cause decrease in playerBalance
		}
	else {}
}
	

```

