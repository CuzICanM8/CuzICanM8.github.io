var gameStarted = false;
var user = {
  id: "",
  tank: 0,
}

var lobbyData = {
  serverName : "",
  players: [],
}
//preload sprites
function preload() {
  blueTowerSprite = loadImage(blueTower_img);
  redTowerSprite = loadImage(redTower_img);
}
//load id function
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
//load function to check for spaces
function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

//API
var apiKey = 'MVcWuQ.pdAqFQ:75jdmG4HZbfLZKR-GuVCuFJU4tnhiMpRwCAIz0qNmTc';
if(name === null) {
  name = makeid(6)
}

//Server setup

function createLobby() {
  //delete the buttons
  var elem = document.getElementById('createButton');
  elem.parentNode.removeChild(elem);
  var elem = document.getElementById('joinButton');
  elem.parentNode.removeChild(elem);
  //create input boxes
  var inputName = document.createElement("INPUT");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("value", "Enter your name");
  inputName.id = "Name";
  document.body.appendChild(inputName);

  var inputLobbyName = document.createElement("INPUT");
  inputLobbyName.setAttribute("type", "text");
  inputLobbyName.setAttribute("value", "Name your lobby");
  inputLobbyName.id = "LobbyName";
  document.body.appendChild(inputLobbyName);

  let submitButton = document.createElement("button");
  submitButton.innerHTML = "submit";
  submitButton.id = "submitButton";
  document.body.appendChild(submitButton);
  submitButton.onclick = function () {
    var username = document.getElementById("Name").value;
    var lobbyName = document.getElementById("LobbyName").value;
    if ((username != "Enter your name" && lobbyName != "Name your lobby") && (username != null && lobbyName != null)) {
      if(hasWhiteSpace(username) === false && hasWhiteSpace(lobbyName) === false) {
        if(containsSpecialChars(username) === false && containsSpecialChars(lobbyName) === false) {
          user.id = username;
          lobbyData.serverName = lobbyName;
          var elem = document.getElementById('Name');
          elem.parentNode.removeChild(elem);
          var elem = document.getElementById('LobbyName');
          elem.parentNode.removeChild(elem);
          var elem = document.getElementById('submitButton');
          elem.parentNode.removeChild(elem);
          gameInit();
        }
        else {
          alert("Please type in your name and server name without special characters.")
        }
      }
      else {
        alert("Please type in your name and server name without spaces.")
      }
    }
    else {
      alert("Please type your name and server name.")
    }
  };
  document.body.appendChild(submitButton);
}

function joinLobby() {
  //delete the buttons
  var elem = document.getElementById('createButton');
  elem.parentNode.removeChild(elem);
  var elem = document.getElementById('joinButton');
  elem.parentNode.removeChild(elem);
  //create input boxes
  var inputName = document.createElement("INPUT");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("value", "Enter your name");
  inputName.id = "Name"
  document.body.appendChild(inputName);

  var inputLobbyName = document.createElement("INPUT");
  inputLobbyName.setAttribute("type", "text");
  inputLobbyName.setAttribute("value", "Name of Lobby");
  inputLobbyName.id = "LobbyName";
  document.body.appendChild(inputLobbyName);

  let submitButton = document.createElement("button");
  submitButton.innerHTML = "submit";
  submitButton.id = "submitButton";
  document.body.appendChild(submitButton);
  submitButton.onclick = function () {
    var username = document.getElementById("Name").value;
    var lobbyName = document.getElementById("LobbyName").value;
    if ((username != "Enter your name" && lobbyName != "Name your lobby") && (username != null && lobbyName != null)) {
      if(hasWhiteSpace(username) === false && hasWhiteSpace(lobbyName) === false) {
        if(containsSpecialChars(username) === false && containsSpecialChars(lobbyName) === false) {
          user.id = username;
          lobbyData.serverName = lobbyName;
          var elem = document.getElementById('Name');
          elem.parentNode.removeChild(elem);
          var elem = document.getElementById('LobbyName');
          elem.parentNode.removeChild(elem);
          var elem = document.getElementById('submitButton');
          elem.parentNode.removeChild(elem);
          gameInit();
        }
        else {
          alert("Please type in your name and server name without special characters.")
        }
      }
      else {
        alert("Please type in your name and server name without spaces.")
      }
    }
    else {
      alert("Please type your name and server name.")
    }
  };
  document.body.appendChild(submitButton);
}


var realtime = new Ably.Realtime('rIDajQ.8vp1kA:pZn9VKgRCJvgGiRV78J8VnN5oZJZwuV0AJxBpVw4XGQ');
//Make words easier to type because typing is hard work and
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;

const drawBody = Helpers.drawBody;
const drawMouse = Helpers.drawMouse;

// create an engine
const engine = Matter.Engine.create();
const world = engine.world;
//Set world Width and Height
var w = window.innerWidth;
var h = window.innerHeight;
var screenRatio = w/h;
const worldWidth = 400;
const worldHeight = 700;

//Create arrays and variables for objects
var walls = [];
var towers = [];
var cards = [];
//Create variables for stuff
var blueLeftTower;
var blueRightTower;
var blueKingTower;

var redLeftTower;
var redRightTower;
var redKingTower;
//Allows selection of map

//Create options for new objects
var wallOptions = {
  mass: 500000000000,
  frictionStatic: 0,
  friction: 0,
  frictionAir: 0,
  ignoreGravity: true,
  isStatic: true,
  red: 255,
  green: 255,
  blue: 255,
  hp: 100,
}
var princessTowerOptions = {
  mass: 500000000000,
  frictionStatic: 0,
  friction: 0,
  frictionAir: 0,
  ignoreGravity: true,
  isStatic: true,
  red: 255,
  green: 255,
  blue: 255,
  hp: 1400,
}

var kingTowerOptions = {
  mass: 500000000000,
  frictionStatic: 0,
  friction: 0,
  frictionAir: 0,
  ignoreGravity: true,
  isStatic: true,
  red: 255,
  green: 255,
  blue: 255,
  hp: 2400,
}
//Create functions for different stuff


//Create maps
function createBorders() {
  //Top wall
  var wall = Bodies.rectangle(worldWidth/2, 0, worldWidth, 10, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);

  //Left wall
  var wall = Bodies.rectangle(0, worldHeight/2, 10, worldHeight, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);

  //Right wall
  var wall = Bodies.rectangle(worldWidth, worldHeight/2, 10, worldHeight, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);
  //Bottom wall
  var wall = Bodies.rectangle(worldWidth/2, worldHeight, worldWidth, 10, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);
}

var maps = {
  arena1: {
    init: function() {
      //princess towers
      //top left tower
      var tower = Bodies.rectangle(75, 150, 50, 50, princessTowerOptions);
      towers.push(tower);
      World.add(engine.world, tower);
      redLeftTower = tower;
      tower.playerSprite = createSprite(tower.position.x, tower.position.y, 1, 1);
      tower.playerSprite.addImage(redTowerSprite);
      tower.playerSprite.scale = 0.5;
      //top right tower
      var tower = Bodies.rectangle(325, 150, 50, 50, princessTowerOptions);
      towers.push(tower);
      World.add(engine.world, tower);
      redRightTower = tower;
      tower.playerSprite = createSprite(tower.position.x, tower.position.y, 1, 1);
      tower.playerSprite.addImage(redTowerSprite);
      tower.playerSprite.scale = 0.5;
      //bottom left tower
      var tower = Bodies.rectangle(75, 550, 50, 50, princessTowerOptions);
      towers.push(tower);
      World.add(engine.world, tower);
      tower.playerSprite = createSprite(tower.position.x, tower.position.y, 1, 1);
      tower.playerSprite.addImage(blueTowerSprite);
      tower.playerSprite.scale = 0.5;
      blueLeftTower = tower;
      //bottom right tower
      var tower = Bodies.rectangle(325, 550, 50, 50, princessTowerOptions);
      towers.push(tower);
      World.add(engine.world, tower);
      blueRightTower = tower;
      tower.playerSprite = createSprite(tower.position.x, tower.position.y, 1, 1);
      tower.playerSprite.addImage(blueTowerSprite);
      blueLeftTower = tower;
      tower.playerSprite.scale = 0.5;
      //King towers
      //top tower
      var tower = Bodies.rectangle(200, 75, 60, 60, princessTowerOptions);
      towers.push(tower);
      World.add(engine.world, tower);
      redKingTower = tower;
      tower.playerSprite = createSprite(tower.position.x, tower.position.y, 1, 1);
      tower.playerSprite.addImage(redTowerSprite);
      tower.playerSprite.scale = 0.65;
      //bottom tower
      var tower = Bodies.rectangle(200, 625, 60, 60, princessTowerOptions);
      towers.push(tower);
      World.add(engine.world, tower);
      blueKingTower = tower
      tower.playerSprite = createSprite(tower.position.x, tower.position.y, 1, 1);
      tower.playerSprite.addImage(blueTowerSprite);
      blueLeftTower = tower;
      tower.playerSprite.scale = 0.65;
    }
  }
}

function setup() {
  const canvas = createCanvas(worldWidth, worldHeight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);


  //This allows objects to warp across the screen.
  const wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };


  //create the map
  createBorders();
  // run the engine
  Matter.Runner.run(engine);
  maps.arena1.init();
}

function gameInit() {
  var realtime = new Ably.Realtime({key: apiKey, clientId: user.id});
  var channel = realtime.channels.get(lobbyData.serverName);
  channel.attach(function(err) {
    if(err) { return console.error("Error attaching to the channel"); }
    channel.presence.enter('hello', function(err) {
      if(err) { return console.error("Error entering presence"); }
    });
  });
  channel.presence.get(function(err, members) {
    if(err) { return console.error("Error fetching presence data"); }
    var first = members[0];
  });
  channel.presence.subscribe(function(presenceMsg) {
    channel.presence.get(function(err, members) {;
      if(members.length === 2) {
        lobbyData.players = members.slice(0);
        if (lobbyData.players[0].clientId === user.id) {
          alert("Player 1");
        }
        else if (lobbyData.players[1].clientId === user.id) {
          alert("Player 2")
        }
      }
    });
  });
}

gameStarted = true;

function draw() {
  background('green');
  if (gameStarted) {
    for(var i = 0; i < walls.length; i++) {
      fill(255, 255, 255);
      drawBody(walls[i]);
    }
    for(var i = 0; i < towers.length; i++) {
      fill(255, 255 ,255);
      drawBody(towers[i]);
    }
  }
  drawSprites();
}

function updateAPI() {
  //Update the API server
  for(i=0; i<lobbyData.players.length; i++) {
    if(lobbyData.players[i].clientId !== user.id) {
      otherPlayer = lobbyData.players[i].clientId;
    }
  }
}

seconds = 0;
var clock = setInterval(function() {
  seconds+=.1;
  if(gameStarted) {
    updateAPI();
  }
}, 100)
//functions
function radiansToDegrees(radians) {
  return radians * (180/Math.PI);
}
