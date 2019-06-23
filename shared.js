//BOTTOM MENU
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";
import { timeout } from "q";

//DATABASE

let databaseLink = "https://danskespil-6ea1.restdb.io/rest/userlist";

let personObject = {
  BirthDate: 0,
  Name: null,
  Email: null
};

function postData(personObject) {
  const postData = JSON.stringify(personObject);
  fetch(databaseLink, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cea5dcd5f86251ddebe1a94",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(data => data.json())
    .then(data => console.log(data));
}

//Variables
const burgerIcon = document.querySelector(".bottom-menu-middle");
const bottomMenuOverlay = document.querySelector("#bottom-menu-overlay");
const bottomMenuContent = document.querySelector(".bottom-menu-content");
const bottomOverlay = document.querySelector("#bottom-menu-overlay");
const game = document.querySelector("#game");

// storing the fixed game-container as variable, to be animated with greensock below
// const gameContainer = document.querySelector('.game-container');
// EDIT ABOVE: changing the animations from the game container to be the game page, which contains the game container
const gamePage = document.querySelector("#game-page");
const nameInputCTA = document.querySelector(".game-name-input-cta");

const winnerInputCont = document.querySelector("#game-form-input");

let menuStatus = burgerIcon.dataset.status;
let bottomMenuOverlayHeight = null;
let nameInput = document.querySelector("#name-input-field");

// Selecting the bottom menu, to be animated out when the game starts
const bottomMenu = document.querySelector("#bottom-menu");

window.addEventListener("DOMContentLoaded", () => {
  // ELF LOADS IN LANDING ANIMATION
  shuffle();
  elfSpeechAnimation();
  speechBubbleHeader = "Enter your birthday above to start playing.";
  setTimeout(() => {
    showSpeechBubble();
  }, 500);

  burgerIcon.addEventListener("click", () => {
    event.preventDefault();
    if (menuStatus == "closed") {
      openOverlayMenu();
    } else {
      closeOverlayMenu();
    }
  });

  nameInputCTA.addEventListener("click", checkNameInput);

  // AGE MODAL INITIAL EVENT LISTENER TO SEE IF BLANK
  playBtn.addEventListener("click", function(e) {
    if (!ageModalDay.value) {
      TweenMax.to(ageModalDay, 0, {
        boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
      });
      speechBubbleHeader = "Hey! You forgot to put in your age.";
      showSpeechBubble();
      console.log("hello");
    }
    if (!ageModalMonth.value) {
      TweenMax.to(ageModalMonth, 0, {
        boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
      });
      speechBubbleHeader = "Hey! You forgot to put in your age.";
      showSpeechBubble();
    }
    if (!ageModalYear.value) {
      TweenMax.to(ageModalYear, 0, {
        boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
      });
      speechBubbleHeader = "Hey! You forgot to put in your age.";
      showSpeechBubble();
    }
  });
});

// AGE MODAL PAGE VALIDATION !!
const ageModalDay = document.querySelector("#day");
const ageModalMonth = document.querySelector("#month");
const ageModalYear = document.querySelector("#year");

//// VALIDATING THE INPUT FOR DAY, MONTH, YEAR
// Regular expressions, how they should match
let regDay = /(0)([1-9])|(1|2)([0-9])|(3)(0|1)/;
let regMonth = /^(0[1-9]|1[012])$/;
let regYear = /^(19|20)\d{2}$/;

// The value of the inputs on the age modal
let userDay = ageModalDay.value;
let userMonth = ageModalMonth.value;
let userYear = ageModalYear.value;
// adding input listeners to each input field
// KEYPRESS CHECKING FOR NUMBERS ONLY!!

function keyPressCheck(event) {
  let char = event.which;
  if (char > 31 && (char < 48 || char > 57)) {
    event.preventDefault();
  }
}

// Maximum days check
// function maxDaysCheck(e, regDay){
//   if (){
//     e.preventDefault();
//   }
// }

// Adding keypress with event when ageModalDay has a value entered
ageModalDay.addEventListener("keypress", e => {
  keyPressCheck(e);

  if (userDay.length >= 1) {
    ageModalDay.addEventListener("keyup", () => {
      validateAge(userYear, userMonth, userDay);

      addPersonObjectAge();
    });
  }
});
ageModalMonth.addEventListener("keypress", e => {
  keyPressCheck(e);

  if (userMonth.length >= 1) {
    ageModalMonth.addEventListener("keyup", () => {
      validateAge(userYear, userMonth, userDay);

      addPersonObjectAge();
    });
  }
});
ageModalYear.addEventListener("keypress", e => {
  keyPressCheck(e);

  if (userYear.length >= 3) {
    ageModalYear.addEventListener("keyup", () => {
      validateAge(userYear, userMonth, userDay);

      addPersonObjectAge();
    });
  }
});

function addPersonObjectAge() {
  personObject.BirthDate = userYear + userMonth + userDay;
}

let speechBubbleHeader = null;
let speechBubbleSubHeader = null;

//See if user is over 18
// https://stackoverflow.com/questions/10008050/get-age-from-birthdate/10008175
function validateAge(userYear, userMonth, userDay) {
  let today_date = new Date();
  let today_year = today_date.getFullYear();
  let today_month = today_date.getMonth();
  let today_day = today_date.getDate();
  let age = today_year - userYear;
  if (today_month < userMonth - 1) {
    age--;
  }
  if (userMonth - 1 == today_month && today_day < userDay) {
    age--;
  }
  // TO DO 1
  if (age >= 18) {
    // playStart();

    if ((userDay.length < 2) | (userMonth.length < 2) | (userYear.length < 4)) {
    } else {
      playBtn.addEventListener("click", function(e) {
        playStart(e);
      });
    }

    playBtn.value = "START WINNING";
  } else {
    // The speech bubble will show

    playBtn.removeEventListener("click", function(e) {
      playStart(e);
    });
    playBtn.value = "SORRY, TOO YOUNG!";

    playBtn.disable;
    // TweenMax.to(ageModalDay, 1, {opacity:0})
    speechBubbleHeader = "Oh no! You have to be over 18 to play Casino.";
    speechBubbleSubHeader = "";
    showSpeechBubble();
  }
}

let elfSpeech = document.querySelector("#elf-speech");

function elfSpeechAnimation() {
  TweenMax.to(elfSpeech, 0, { opacity: 1, display: "block" });
  TweenMax.from(elfSpeech, 1, { x: -500 });
}

// let speechBubbleOverlay = document.querySelector(".speech-bubble-overlay");
let speechBubble = document.querySelector(".speech-bubble");
let speechBubbleHeaderNode = document.querySelector(".speech-bubble-header");
let speechBubbleSubHeaderNode = document.querySelector(
  ".speech-bubble-subheader"
);

// Showing the speech bubble
function showSpeechBubble() {
  //Add text to speech bubbles
  speechBubbleHeaderNode.innerHTML = speechBubbleHeader;
  speechBubbleSubHeaderNode.innerHTML = speechBubbleSubHeader;
  console.log("speech bubble shown");
  //rotate elf
  TweenMax.to(elfSpeech, 0.2, { rotation: -1 });
  setTimeout(() => {
    TweenMax.to(elfSpeech, 0.2, { rotation: 2 });
  }, 200);
  setTimeout(() => {
    TweenMax.to(elfSpeech, 0.2, { rotation: 0 });
  }, 401);

  //Show bubble
  speechBubble.style.display = "flex";

  //Animate bubble
  TweenMax.to(speechBubble, 1, { opacity: 1 });
  TweenMax.to(speechBubble, 0, { y: -1000 });
  TweenMax.to(speechBubble, 1, { y: 0 });

  speechBubble.addEventListener("click", hideSpeechBubble);
}

function hideSpeechBubble() {
  // TweenMax.to(speechBubbleOverlay, 0, { opacity: 1 });
  // TweenMax.to(speechBubble, 0, { opacity: 1 });
  // TweenMax.to(speechBubbleOverlay, 1, { opacity: 0 });
  TweenMax.to(speechBubble, 1, { opacity: 0, display: "none" });

  // setTimeout(() => {
  //   // speechBubbleOverlay.style.display = "none";
  //   speechBubble.style.display = "none";
  // }, 1000);
  speechBubble.removeEventListener("click", hideSpeechBubble);
}

// DAY, also FOCUSING on the next INPUT FIELD
ageModalDay.addEventListener("input", e => {
  // if (userDay.charAt(0) > 3){
  //   console.log('hello');  }
  // console.log(e);
  userDay = ageModalDay.value;
  if (!regDay.test(userDay)) {
    TweenMax.to(ageModalDay, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
    });
    return false;
  } else {
    TweenMax.to(ageModalDay, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(0,255,0,0.4)"
    });
    ageModalMonth.focus();
    return true;
  }
});
// MONTH, also FOCUSING on the next INPUT FIELD
ageModalMonth.addEventListener("input", () => {
  userMonth = ageModalMonth.value;
  if (!regMonth.test(userMonth)) {
    TweenMax.to(ageModalMonth, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
    });

    //console.log(ageModalMonth.value);
    return false;
  } else {
    TweenMax.to(ageModalMonth, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(0,255,0,0.4)"
    });
    ageModalYear.focus();
    return true;
  }
});
// YEAR, also FOCUSING on the next INPUT FIELD
ageModalYear.addEventListener("input", () => {
  userYear = ageModalYear.value;
  if (!regYear.test(userYear)) {
    TweenMax.to(ageModalYear, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
    });

    //console.log(ageModalYear.value);
    return false;
  } else {
    TweenMax.to(ageModalYear, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(0,255,0,0.4)"
    });
    // ageModalMonth.focus();
    return true;
  }
});

// Code for the landing page, number ticker and button etc
const numberTickerCTA = document.querySelector(".number-ticker-cta");
const numberTicker = document.querySelector(".number-ticker-container");
const numberTickerPage = document.querySelector("#number-ticker-landing-page");

numberTickerCTA.addEventListener("click", function(e) {
  startDescription(e);
  hideSpeechBubble();
  // TweenMax.to(elfSpeech,0.5, {display:'none'});
  TweenMax.to(numberTickerPage, 1, { display: "none", x: -1500 });
  // Elf Animation
  //elfDescriptionAnimation();
});

// Storing the game description here
const gameDescriptionPage = document.querySelector("#game-description-page");

//Function to run when the start button is clicked, under the number ticker
function startDescription(e) {
  e.preventDefault();
  console.log("it should run");
  TweenMax.from(gameDescriptionPage, 1, { x: 1500 });
  TweenMax.to(gameDescriptionPage, 1, { display: "grid" });

  // Bottom menu slides away
  TweenMax.to(bottomMenu, 1, { y: 500, display: "none" });
}

//Code for after description accept is clicked
const gameDescriptionCTA = document.querySelector(".game-description-cta");

gameDescriptionCTA.addEventListener("click", () => {
  // The game slides out
  // TweenMax.from(gamePage, 1, { x: 1500 });
  // TweenMax.to(gamePage, 1, { display: "grid" });
  TweenMax.from(gameNameInputPage, 1, { x: 1500 });
  TweenMax.to(gameNameInputPage, 1, { display: "grid" });

  document.addEventListener("keydown", event => {
    if (event.key == "Enter") {
      checkNameInput();
    }
  });
  TweenMax.to(gameDescriptionPage, 1, { display: "none", x: -1500 });

  //elfNameAnimation();
});

// Code for the birthday input form
const playBtn = document.querySelector("#play-btn");
const ageModal = document.querySelector("#age-modal");
const birthdayForm = document.querySelector("#birthday-form");

//Function below will be run when the playBtn is clicked
function playStart(e) {
  //console.log("play button clicked");

  TweenMax.to(ageModal, 0, { opacity: 0, display: "none" });
  hideSpeechBubble();
  //TweenMax.to(elfSpeech, 0, { opacity: 0, display: "none" });
  playBtn.dataset.status = "clicked";
  speechBubbleHeader = `Now's your chance to win up to 1000 kroner!`;
  setTimeout(() => {
    showSpeechBubble();
  }, 1200);

  numberTickerCTA.addEventListener("click", () => {
    let coinArray = document.querySelectorAll(".number-ticker-coin");

    coinArray.forEach(coin => {
      coin.style.display = "none";
    });
  });

  // Preventing the page from reloading
}
// Code for name input form

//validate if it is filled
// source: https://www.w3resource.com/javascript/form/non-empty-field.php
function checkNameInput() {
  if (nameInput.value.length == 0) {
    speechBubbleHeader = "Oh no! You forgot to add your name!.";
    speechBubbleSubHeader = "";
    showSpeechBubble();
    return false;
  } else {
    personObject.Name = nameInput.value;
    console.log(personObject);
    TweenMax.to(gameNameInputPage, 1, { display: "none", x: -1500 });
    TweenMax.from(gamePage, 1, { display: "none", x: 1500 });
    TweenMax.to(gamePage, 1, { display: "grid" });
    hideSpeechBubble();
    7;
    TweenMax.to(elfSpeech, 0.5, { opacity: 0, display: "none" });
    setTimeout(() => {
      elfSpeechAnimation();
    }, 1000);
  }
}

// New greensock animation when page is loaded

function openOverlayMenu() {
  bottomMenuContent.style.height = "100%";
  bottomMenuOverlay.style.height = `92.5%`;

  menuStatus = "open";
  console.log(menuStatus);
}

function closeOverlayMenu() {
  bottomMenuContent.style.height = "0";

  setTimeout(() => {
    bottomMenuOverlay.style.height = "0";
  }, 300);
  menuStatus = "closed";

  setTimeout(() => {
    bottomOverlay.style.height = "0";
  }, 300);
  console.log(menuStatus);
}

// THE MEMORY GAME

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Score variable
let playerScore = 0;
let playerWrong = 0;
let playerCorrect = 0;

//turns variable
let turnsCounter = 20;
const turns = document.querySelector("#turns");
const turnsCount = document.querySelector("#turns span");

turnsCount.textContent = turnsCounter;
//Level variables, to change style based on score
// let prizeLvl1 = document.querySelector("#lvl1");
// let prizeLvl2 = document.querySelector("#lvl2");
// let prizeLvl3 = document.querySelector("#lvl3");
// let prizeLvl4 = document.querySelector("#lvl4");

// SCORE VARIABLES
let score0 = document.querySelector(".score-0");
let score100 = document.querySelector(".score-100");
let score250 = document.querySelector(".score-250");
let score500 = document.querySelector(".score-500");
let score1000 = document.querySelector(".score-1000");
let scoreContainer = document.querySelector("#score-main");
// STYLING THE HEARTS
let playerHeart1 = document.querySelector("#heart-1");
let playerHeart2 = document.querySelector("#heart-2");
let playerHeart3 = document.querySelector("#heart-3");
let playerHeart4 = document.querySelector("#heart-4");
let playerHeart5 = document.querySelector("#heart-5");

// ARRAY OF THESE HEARTS
let playerHearts = [
  playerHeart1,
  playerHeart2,
  playerHeart3,
  playerHeart4,
  playerHeart5
];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
  // checkTurns();
}

// When two cards are flipped, the users turns will be lowered by one, and when those turns reach zero, the game is hidden, TO DO IMPORTANT
// function checkTurns() {
//   turnsCounter--;
//   // if (turnsCounter === 9 ) {
//   //   // playerHeart1.src = `img/halfheart.svg`;
//   //   TweenMax.to(playerHeart1, 0.5, {opacity:0.5});
//   //   console.log('lol turn down')
//   // } else if
//   // DOING A SWITCH CASE TO CHANGE THE OPACITY OF HEARTS BASED ON HOW MANY TURNS THERE ARE

//   turnsCount.textContent = turnsCounter;
//   if (turnsCounter === 0) {
//     s
//   }
// }

function checkForMatch() {
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  // Disables the cards if they are correct, unflips the cards if they dont match, running functions based on this.
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  // Adding 1 to player score, because the cards have matched
  playerScore++;
  console.log(playerScore);
  // Applying styling to levels based on score
  if (playerScore === 1) {
    scoreContainer.removeChild(score0);

    TweenMax.to(score100, 0, { display: "block" });
    TweenMax.from(score100, 1, { y: -1000, x: -100, scale: 6 });
    // prizeLvl2.classList.remove("inactive");
    // prizeLvl2.classList.add("active");
  } else if (playerScore === 3) {
    scoreContainer.removeChild(score100);

    TweenMax.to(score250, 0, { display: "block" });
    TweenMax.from(score250, 1, { y: -1000, x: -100, scale: 6 });
  } else if (playerScore === 5) {
    scoreContainer.removeChild(score250);

    TweenMax.to(score500, 0, { display: "block" });
    TweenMax.from(score500, 1, { y: -1000, x: -100, scale: 6 });
  } else if (playerScore === 6) {
    scoreContainer.removeChild(score500);

    TweenMax.to(score1000, 0, { display: "block" });
    TweenMax.from(score1000, 1, { y: -1000, x: -100, scale: 6 });
    // TIME OUT FOR EMAIL PAGE
    setTimeout(() => {
      showWinnerFormPage();
    }, 1500);
  }
}

function unflipCards() {
  lockBoard = true;
  playerWrong++;
  // console.log(playerWrong);
  // REDUCING THE OPACITY WHEN PLAYERS ARE WRONG
  switch (playerWrong) {
    case 1:
      TweenMax.to(playerHeart1, 0.5, { opacity: 0.5 });
      break;
    case 2:
      TweenMax.to(playerHeart1, 0.5, { opacity: 0 });
      break;
    case 3:
      TweenMax.to(playerHeart2, 0.5, { opacity: 0.5 });
      break;
    case 4:
      TweenMax.to(playerHeart2, 0.5, { opacity: 0 });
      break;
    case 5:
      TweenMax.to(playerHeart3, 0.5, { opacity: 0.5 });
      break;
    case 6:
      TweenMax.to(playerHeart3, 0.5, { opacity: 0 });
      break;
    case 7:
      TweenMax.to(playerHeart4, 0.5, { opacity: 0.5 });
      break;
    case 8:
      TweenMax.to(playerHeart4, 0.5, { opacity: 0 });
      break;
    case 9:
      TweenMax.to(playerHeart5, 0.5, { opacity: 0.5 });
      break;
    case 10:
      TweenMax.to(playerHeart5, 0.5, { opacity: 0 });

      // SHOWING THE EMAIL FORM IF PLAYERS DONT HAVE ANY MORE HEARTS
      showEmailInput();
      emailHeader.innerHTML = "We've got more hearts for you!";
      emailInputCTA.value = "TRY AGAIN";
      emailStatus = true;
      break;
    case 20:
      cards.forEach(card => card.removeEventListener("click", flipCard));
  }

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 750);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener("click", flipCard));

// GAME NAME INPUT AREA BELOW

// VALIDATING THE INPUT FOR NAME
let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
let fullName = nameInput.value;

nameInput.addEventListener("input", () => {
  fullName = nameInput.value;
  if (!regName.test(fullName)) {
    TweenMax.to(nameInput, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
    });

    //console.log(nameInput.value);
    return false;
  } else {
    TweenMax.to(nameInput, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(0,255,0,0.4)"
    });
    return true;
  }
});

// ELF ANIMATIONS

let elfDescription = document.querySelector("#elf-description");
function elfDescriptionAnimation() {
  setTimeout(() => {
    TweenMax.to(elfDescription, 0, { opacity: 1 }),
      TweenMax.from(elfDescription, 1, { x: -1500 });
  }, 1000);
}

let elfNameInput = document.querySelector("#elf-name-input");
function elfNameAnimation() {
  setTimeout(() => {
    TweenMax.to(elfNameInput, 0, { opacity: 1 }),
      TweenMax.from(elfNameInput, 1, { x: -1500 });
  }, 1000);
}

// EMAIL VALIDATION FOR EMAIL INPUT PAGE //
const emailInputField = document.querySelector("#email-input-field");
let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let userEmail = emailInputField.value;

emailInputField.addEventListener("input", () => {
  userEmail = emailInputField.value;
  if (!regEmail.test(userEmail)) {
    TweenMax.to(emailInputField, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(245,23,19,0.4)"
    });

    console.log(emailInputField.value);
    return false;
  } else {
    TweenMax.to(emailInputField, 0, {
      boxShadow: "inset 0px 0px 2px 2px rgba(0,255,0,0.4)"
    });
    return true;
  }
});

// VARIABLES TO ANIMATE ON EMAIL PAGE - DURING GAMEPLAY
const emailInputCTA = document.querySelector(".game-input-input-cta");
const gameNameInputPage = document.querySelector("#game-name-input-page");
const gameEmailInputCont = document.querySelector("#game-email-input");
const gameEmailInputPage = document.querySelector("#email-input-page");

// OTHER EMAIL VARIABLES
let emailStatus = new Boolean();
let emailHeader = document.querySelector(".game-email-input-header");

// SHOWING THE EMAIL FIELD
function showEmailInput() {
  if (turnsCounter === 0) {
  }
  speechBubbleHeader = `It really is your lucky day!`;
  setTimeout(() => {
    showSpeechBubble();
  }, 1000);

  gameEmailInputPage.style.display = "grid";
  TweenMax.to(gameEmailInputPage, 1, { opacity: 1 });
  TweenMax.from(gameEmailInputPage, 1, { y: 2000 });
  // WHEN THE EMAIL INPUT IS ACCEPTED TO CONTINUE, THE USER GETS MORE TURNS
  emailInputCTA.addEventListener("click", () => {
    gameEmailInputPage.style.opacity = "0";

    personObject.Email = emailInputField.value;

    // FUNCTION TO RESET THE GAME AFTER THE EMAIL IS INPUT
    resetAfterEmail();
    hideSpeechBubble();
    setTimeout(() => {
      gameEmailInputPage.style.display = "none";
    }, 300);
  });
}

// FINAL WINNER PAGE VARIABLES, AND ANIMATIONS WHEN THE RIGHT BUTTONS ARE CLICKED OR THE WINNER WINS
const gameWinnerFormPage = document.querySelector("#game-winner-form-page");

function showWinnerFormPage() {
  gameWinnerFormPage.style.display = "grid";
  TweenMax.to(gameWinnerFormPage, 1, { opacity: 1 });

  //ADD VALUE FOR NAME
  const finalName = document.querySelector("#name-final");
  finalName.value = personObject.Name;
  speechBubbleHeader = `You'll receive your prize in your email address. Thanks for playing!`;
  setTimeout(() => {
    showSpeechBubble();
  }, 1000);
  //ADD VALUE FOR EMAIL IF IT IS ALREADY ADDED
  if (emailStatus == true) {
    const finalEmail = document.querySelector("#email-final");
    finalEmail.value = personObject.Email;
  }

  //ADD VALUE FOR BIRTHDATE
  const dayFinal = document.querySelector("#day-final");
  dayFinal.value = personObject.BirthDate.slice(6, 8);
  const monthFinal = document.querySelector("#month-final");
  monthFinal.value = personObject.BirthDate.slice(4, 6);
  const yearFinal = document.querySelector("#year-final");
  yearFinal.value = personObject.BirthDate.slice(0, 4);
}

// FUNCTION TO RESET THE GAME AFTER THE EMAIL IS INPUT
function resetAfterEmail() {
  //Reset counters
  hasFlippedCard = false;
  lockBoard = false;
  firstCard, secondCard;

  // Score variable

  playerWrong = 0;

  // CHANGING THE OPACITY OF EACH HEART INSIDE OF THE HEARTS ARRAY BACK TO 1
  playerHearts.forEach(heart => (heart.style.opacity = "1"));

  //turns variable
  turnsCounter = 10;
  console.log(turnsCounter);
  resetBoard();
  shuffle();
  cards.forEach(card => card.addEventListener("click", flipCard));
}

// FUNCTION FOR SETTING THE MAIN TO BE THE SAME SIZE OF VIEWPORT HEIGHT
let documentHeight = document.documentElement.clientHeight;
console.log(documentHeight);

document.querySelector("main").style.height = `${documentHeight}px`;
ageModal.style.height = `${documentHeight}px`;
numberTickerPage.style.height = `${documentHeight}px`;
gameDescriptionPage.style.height = `${documentHeight}px`;
gameEmailInputPage.style.height = `${documentHeight}px`;
gameWinnerFormPage.style.height = `${documentHeight}px`;
document.querySelector(
  "#game-name-input-page"
).style.height = `${documentHeight}px`;
document.querySelector("#game-page").style.height = `${documentHeight}px`;

// ON SUBMIT, PREVENTING DOUBLE SUBMITTING FUNCTION
const submitBtn1 = document.querySelectorAll("input[type=submit]")[0];
const submitBtn2 = document.querySelectorAll("input[type=submit]")[1];
const submitBtn3 = document.querySelectorAll("input[type=submit]")[2];

submitBtn1.addEventListener("submit", () => {
  submitBtn1.disabled = true;
});
submitBtn2.addEventListener("submit", () => {
  submitBtn2.disabled = true;
});
// submitBtn3.addEventListener('submit', ()=>{submitBtn3.disabled=true}); ERROR NOT FOUND, PROBABLY BECAUSE DISPLAY:NONE

// .addEventListener('submit', ()=>("input[type=submit]")[0].disabled=true});

// let coinGroup = document.querySelector('#coin_copy');

// TweenMax.to(coinGroup, 10, {x:-1500});

//WINNER FORM
const gameWinnerCTA = document.querySelector(".game-winner-cta");
const finalEmail = document.querySelector("#email-final");

gameWinnerCTA.addEventListener("click", () => {
  event.preventDefault();

  personObject.Email = finalEmail.value;
  postData(personObject);

  gameWinnerCTA.disabled = "true";
});

// ANIMATING SCORES
// let scoreAmountArray = document.querySelectorAll('.score-amount');
// let scoreEquals = document.querySelectorAll('.equals');

// let scoreSVG = document.querySelectorAll('.score-svg-description');

// function scoreAnimateDescriptionPage () {
//   scoreAmountArray.forEach(scoreAmount => {
//     TweenMax.from(scoreAmount, 1, {opacity:0})
//   })
// }
