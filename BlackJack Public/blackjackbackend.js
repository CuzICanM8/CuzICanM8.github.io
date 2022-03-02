//Get cookies for API
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user.userID = getCookie("userID");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = {
       userID : makeid(6);
     }
     if (user != "" && user != null) {
       setCookie("username", user, 30*12*10);
     }
  }
}
checkCookie()
//The actual game

let player1Ace = 11
let player2Ace = 11
const two = 2
const three = 3
const four = 4
const five = 5
const six = 6
const seven = 7
const eight = 8
const nine = 9
const jack = 10
const king = 10
const queen = 10
let winner = ""
let player1Sum = 0
let player2Sum = 0
const player1Deck = [player1Ace, two, three, four, five, six, seven, eight, nine, jack, king, queen]
const player2Deck = [player2Ace, two, three, four, five, six, seven, eight, nine, jack, king, queen]
let player1Cards = [player1Deck[Math.floor(Math.random()*player1Deck.length)], player1Deck[Math.floor(Math.random()*player1Deck.length)]]
let player2Cards = [player2Deck[Math.floor(Math.random()*player2Deck.length)], player2Deck[Math.floor(Math.random()*player2Deck.length)]]
const player1 = user
const player2 = "Player 2"
const numbOfPlayers = 1
const playing = true
checkCards()

function start(players) {
  if (players === 1) {

  }
}
start(1)
function hit(who) {
  if (who === 1) {
    player1Cards.push(player1Deck[Math.floor(Math.random()*player1Deck.length)])
    if (numbOfPlayers === 1) {
      hit(2)
    }
  }
  else if (who === 2) {
    player2Cards.push(player2Deck[Math.floor(Math.random()*player2Deck.length)])
  }
  checkCards()
}

function stand(who) {
  updateHeader()
  if (winner === "") {
    if (numbOfPlayers === 1) {
      hit(2)
    }
  }
}

function checkCards() {
  player1Sum = player1Cards.reduce((partialSum, a) => partialSum + a, 0);
  player2Sum = player2Cards.reduce((partialSum, a) => partialSum + a, 0);
  if (player1Sum > 21) {
    winner = player2
  }
  else if (player2Sum > 21) {
    winner = player1
  }
  updateHeader()
}

function updateHeader() {
  if (winner === "") {
    document.getElementById("header1").innerHTML = player1 + " has " + player1Sum + " " + player2 + " has " + player2Sum
  }
  else {
    document.getElementById("header1").innerHTML = winner + " has won!"
  }
}
