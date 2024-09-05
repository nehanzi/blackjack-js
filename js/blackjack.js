

const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

kinds.forEach(k => {
    suits.forEach(s => {
        if (k === 'Ace'){valu = 11;}
        else if (k.length >= 4) {valu = 10;}
        else {valu = k};
        const card = {
            name: `${k} of ${s}`,
            file: `${k}-of-${s}.png`,
            kind: k,
            suit: s,
            valu: valu,
            // valu: k === "Ace" ? 11 : k.length >= 4 ? 10 : k,
        };

        deck.push(card);
    })
})
console.log(deck)

let holeCard = "";
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];
console.log(shoe)

shoe.sort(() => Math.random()-.5);

for (let i = 0; i < shoe.length; i++){
    let temp = shoe[i];
    let r = Math.floor(Math.random()*shoe.length);
    shoe[i] = shoe[r]
    shoe[r] = temp;
}
 
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);
const hitBtn = document.getElementById('hit-btn');
hitBtn.addEventListener('click', hit);
const standBtn = document.getElementById('stand-btn');
standBtn.addEventListener('click', stand);

const feedbackH2 = document.querySelector('h2');
const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');
const playerScoreSpan = document.getElementById('player-score-span');
const dealerScoreSpan = document.getElementById('dealer-score-span');
let playerHand = [];
let dealerHand = [];

let playerScore = 0;
let dealerScore = 0;
let dealCounter;

function cantHit(){
    hitBtn.disabled = true;
    hitBtn.classList.add('disabled-btn');
    standBtn.disabled = true;
    standBtn.classList.add('disabled-btn');
}

function canHit(){
    hitBtn.disabled = false;
    hitBtn.classList.remove('disabled-btn');
    standBtn.disabled = false;
    standBtn.classList.remove('disabled-btn');
}

function enableDeal(){
    dealBtn.disabled = false;
    dealBtn.classList.remove('disabled-btn');
}




function deal(){

        enableDeal()

        playerCardsDiv.innerHTML = "";
        dealerCardsDiv.innerHTML = "";


        playerScore = 0;
        dealerScore = 0;


        playerScoreSpan.innerHTML = "Player Score: 0";
        dealerScoreSpan.innerHTML = "Dealer Shows: 0";
        feedbackH2.innerHTML = "";


        playerHand = [];
        dealerHand = [];
        dealCounter = 0;



    let dealInterval = setInterval(() => {
        dealCounter++;
        if(dealCounter <= 4) {
            const cardImg = new Image();
            let cardObj = shoe.pop();
            
            // 2AceTest
            // let cardObj = {
            //     name: "Ace of Diamonds",
            //     file: "Ace-of-Diamonds.png",
            //     kind: "Ace",
            //     suit: "Diamonds",
            //     valu: 11,
            // };
            // 2AceTest


            cardImg.src = `images/cards350px/${cardObj.file}`;

    if(dealCounter % 2 === 1) {
        playerScore += cardObj.valu;
        playerCardsDiv.appendChild(cardImg);
        playerHand.push(cardObj);
        if (playerScore === 22){
            playerScore = 12;
            playerHand[1].valu = 1;
        }
        playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
        console.log("Player Hand:", playerHand);

    } else {
        dealerScore += cardObj.valu;
        dealerHand.push(cardObj);
        if (playerScore === 22){
            playerScore = 12;
            playerHand[1].valu = 1;}
        
        console.log("Dealer Hand: ", dealerHand);
        if(dealCounter === 4) {
            cardImg.src = 'images/cards350px/0-Back-of-Card-Red.png';
            holeCard = dealerHand[1].file;
            console.log('holeCard:', holeCard);

            // 21Test
            // playerScore = 21;
            // dealerScore = 21;
            // 21Test
          
            setTimeout(() => {
                if(dealerScore === 21 && playerScore === 21) {
                    feedbackH2.innerHTML = "It's a PUSH..!";
                    cardImg.src = `images/cards350px/${holeCard}`;
                    enableDeal();
                } else if(playerScore === 21) {
                    feedbackH2.innerHTML = "BLACKJACK! You WIN..!";
                    enableDeal();
                    cantHit();
                } else if(dealerScore === 21) {
                    dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
                    feedbackH2.innerHTML = "Dealer Blackjack. You LOSE..!";
                    cardImg.src = `images/cards350px/${holeCard}`;
                    enableDeal();
                } else {
                    feedbackH2.innerHTML = "Hit or Stand..?";
                    canHit();
                }
            }, 1000);


        } else {
            dealerScoreSpan.innerHTML = `Dealer Shows: ${dealerScore}`;
        }
        dealerCardsDiv.appendChild(cardImg);
        cardImg.style.width = "75px";
    }
    } else {
        clearInterval(dealInterval);
    }
    }, 1000);

    dealBtn.disabled = true;
    dealBtn.classList.add('disabled-btn');
}

function hit() {
    feedbackH2.innerHTML = "";
    const cardImg = new Image();
    const cardObj = shoe.pop();
    cardImg.src = `images/cards350px/${cardObj.file}`;
    playerCardsDiv.appendChild(cardImg)
    playerHand.push(cardObj)
    playerScore += cardObj.valu;
    playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
    

    if(playerScore > 21) {

        let indexOfAce11 = playerHand.findIndex(item => item.valu === 11);
        console.log('index of Ace 11: ', indexOfAce11);

        if (indexOfAce11 != -1){
            playerHand[indexOfAce11].valu = 1;
            playerScore -= 10;
            playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
            feedbackH2.innerHTML = `${playerScore}!  Hit or Stand..?`;
            canHit();

        } else {
            feedbackH2.innerHTML = "You BUST!";
            enableDeal()
            cantHit();
        }
    }
    else if (playerScore === 21) {
        feedbackH2.innerHTML = "BLACKJACK! You WIN..!";
        enableDeal();
        cantHit();
    } else if (playerScore < 21) {
        canHit();
        feedbackH2.innerHTML = `${playerScore}! Hit or Stand..?`;
    } else {
        feedbackH2.innerHTML = 'Hit or Stand..?';
        canHit();
    }
    
}

function evaluate(){
    if (playerScore === dealerScore){
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "It's a PUSH!";
        enableDeal();
        cantHit();
    } else if (playerScore > dealerScore){
        dealerCardsDiv.children[1].src = `images/cards350px/${holeCard}`
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "You WIN!";
        enableDeal();
        cantHit();
    } else if (dealerScore === 21) {
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "Dealer BlackJack. You LOSE!";
        enableDeal();
        cantHit();
    } else if (playerScore === 21) {
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "BLACKJACK!";
        enableDeal();
        cantHit();
    } else if (dealerScore > 21) {
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "Dealer BUST! You WIN!";
        enableDeal();
        cantHit();
    } else if (playerScore > 21) {
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "You BUST!";
        enableDeal();
        cantHit();
    } else {
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = "You LOSE!"
        enableDeal();
        cantHit();
    }
}

function stand() {
    cantHit();
    setTimeout(() => {
    feedbackH2.innerHTML = "";
    dealerCardsDiv.children[1].src = `images/cards350px/${holeCard}`;
    evaluate();
    
    if (dealerScore > 21) {
        feedbackH2.innerHTML = 'Dealer BUST! You WIN!'
        evaluate();
        
    } else if (dealerScore <= 16) {
        const cardImg = new Image();
        const cardObj = shoe.pop();
        cardImg.src = `images/cards350px/${cardObj.file}`;
        cardImg.style.width = "75px";
        dealerCardsDiv.appendChild(cardImg)
        dealerScore += cardObj.valu;
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
        feedbackH2.innerHTML = 'Hit or Stand..?';
        evaluate();
        
    } else if (dealerScore <= 21) {
        evaluate();
        
    } else {
        feedbackH2.innerHTML = 'Hit or Stand..?';
        canHit();
    }
}, 1000)
}