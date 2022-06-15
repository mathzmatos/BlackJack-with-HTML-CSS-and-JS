var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; // A, 2 + K -> 1 or 11  + 2 + 10

var escondida;
var deck;

var canHit = true; //

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++){
        for (let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }

    //console.log(deck);

}

function shuffleDeck(){
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    console.log(deck);
}

function startGame() {
    escondida = deck.pop();
    dealerSum += getValue(escondida);
    dealerAceCount += checkAce(escondida);
    //console.log(escondida);
    //console.log(dealerSum);
    while (dealerSum < 17) {

        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cartas/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cartas").append(cardImg);
    }

    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cartas/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("suas-cartas").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("pedir").addEventListener("click", pedir);
    document.getElementById("parar").addEventListener("click", parar);


}

function pedir() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cartas/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("suas-cartas").append(cardImg);


    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }
}

function parar() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("escondida").src= "./cartas/" + escondida + ".png";

    let message = "";

    if (yourSum > 21) {
        message = "Você Perdeu :( ";
    }

    else if (dealerSum > 21) {
        message = "Você Venceu!!!";
    }

    else if (yourSum == dealerSum) {
        message = "Empate.";
    }

    else if (yourSum > dealerSum) {
        message = "Você Venceu!";
    }

    else if (yourSum < dealerSum) {
        message = "Você Perdeu :( " ;
    }


    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("resultados").innerText = message;
}


function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) { // A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value);

}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0 ) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}