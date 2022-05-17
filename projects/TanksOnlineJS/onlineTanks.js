var gameStarted = false;
var user = {
  id: "",
  tank: 0,
}

var lobbyData = {
  serverName : "",
  players: [],
}
//load sprites
function preload() {
  playerSpriteImg = loadImage(kv2SpriteAssembled);
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
var apiKey = 'rIDajQ.8vp1kA:pZn9VKgRCJvgGiRV78J8VnN5oZJZwuV0AJxBpVw4XGQ';
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

var seconds = 0;
var debug = 0;
var playerTank;
var enemyTank;
var otherPlayer;
var playerSprite;
var playerSpriteImg;

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
const worldWidth = 800;
const worldHeight = 600;

//Create arrays and variables for objects
var tanks = [];
var tank;
var walls = [];
var wall;
var objects = [];
var object;
var bullets = [];
var bullet;

//Create variables for stuff
var shootDelay = false;
var ramDelay = false;
//Allows selection of map
var maps = [map_Crosshair];
var slectedMap;

//Create options for new objects
var tankOptions = {
  frictionStatic: 0,
  friction: 0,
  frictionAir: 0,
  ignoreGravity: true,
  speed: 0,
  radians: 0,
  degrees: 0,
  slope: 0,
  slopeX: 0,
  slopeY: 0,
  red: 0,
  green: 255,
  blue: 0,
  rotSpeed: 5,
  trackFriction: 0.02,
  enableFriction: true,
  hp: 100,
  id: 0,
  shootDelay: false,
}
var bulletOptions = {
  frictionStatic: 0,
  friction: 0,
  frictionAir: 0,
  red: 0,
  green: 0,
  blue: 0,
  ignoreGravity: true,
  restitution: 1,
}
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

//Create functions for different stuff

//allow players to shoot
function shoot(spawnX, spawnY, radians, speed, r, g, b, w, h, player) {
  if (player.shootDelay === false) {
    const bullet = Bodies.rectangle(spawnX, spawnY, w, h, bulletOptions);
    bullets.push(bullet);
    World.add(engine.world, bullet);
    bullet.red = 255;
    bullet.green = 255;
    bullet.blue = 255;
    bullet.speed = speed;
    bullet.id = makeid(12);
    setInterval(function() {
      player.shootDelay = false;
    }, 2000)
    setInterval(function() {
      World.remove(world, bullet);
      bullets.splice(bullets.indexOf(bullet), 1);
    }, 5000)
    var moveDir = -1;
    const vec = new Phaser.Math.Vector2();
    vec.setToPolar(radians - 1.5708, 1);
    Matter.Body.setVelocity(bullet, {x : vec.x * speed * moveDir, y :  vec.y * speed * moveDir})
      Matter.Body.rotate(bullet, radians);
    if(player.id === user.id) {
      playerTank.shootDelay = true;
    }
    else {
      enemyTank.shootDelay = true;
    }
    var bulletData = {
      x: spawnX,
      y: spawnY,
      angle: radians,
      speed: speed,
      red: r,
      green: g,
      blue: b,
      width: w,
      height: h,
    }
    //tell other client that a bullet was fired
    var channel = realtime.channels.get(lobbyData.serverName + player.id + "bullet");
    channel.publish("update", { bulletData });
  }
}
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
function map_Crosshair() {
  //Top wall
  var wall = Bodies.rectangle(worldWidth/2, worldHeight/2-125, 50, 200, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);

  //Left wall
  var wall = Bodies.rectangle(worldWidth/2-125, worldHeight/2, 200, 50, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);

  //Right wall
  var wall = Bodies.rectangle(worldWidth/2+125, worldHeight/2, 200, 50, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);
  //Bottom wall
  var wall = Bodies.rectangle(worldWidth/2, worldHeight/2+125, 50, 200, wallOptions);
  walls.push(wall);
  World.add(engine.world, wall);
  map = map_Crosshair;
  map.spawn1 = {x : 125, y : 125}
  map.spawn2 = {x : 600, y: 500}

  createBorders();

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
  map_Crosshair();
  //init server

  // run the engine
  Matter.Runner.run(engine);
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
        tank = Bodies.rectangle(map.spawn1.x, map.spawn1.y, 25, 50, tankOptions);
        tanks.push(tank);
        World.add(engine.world, tank);
        tank.playerSprite = createSprite(tank.position.x, tank.position.y, 1, 1);
        tank.playerSprite.addImage(playerSpriteImg);
        user.tank = tank;
        tank.id = user.id;
        playerTank = tank;
        playerTank.shootDelay = false;

        tank = Bodies.rectangle(map.spawn2.x, map.spawn2.y, 25, 50, tankOptions);
        tanks.push(tank);
        World.add(engine.world, tank);
        tank.playerSprite = createSprite(tank.position.x, tank.position.y, 1, 1);
        tank.playerSprite.addImage(playerSpriteImg);
        enemyTank = tank;
        enemyTank.shootDelay = false;
      }
      else if (lobbyData.players[1].clientId === user.id) {
        tank = Bodies.rectangle(map.spawn2.x, map.spawn2.y, 25, 50, tankOptions);
        tanks.push(tank);
        World.add(engine.world, tank);
        tank.playerSprite = createSprite(tank.position.x, tank.position.y, 1, 1);
        tank.playerSprite.addImage(playerSpriteImg);
        user.tank = tank;
        tank.id = user.id;
        playerTank = tank;
        playerTank.shootDelay = false;

        tank = Bodies.rectangle(map.spawn1.x, map.spawn1.y, 25, 50, tankOptions);
        tanks.push(tank);
        World.add(engine.world, tank);
        tank.playerSprite = createSprite(tank.position.x, tank.position.y, 1, 1);
        tank.playerSprite.addImage(playerSpriteImg);
        enemyTank = tank;
        enemyTank.shootDelay = false;
      }
      gameStarted = true;
    }
  });
});
}



function draw() {
 if(gameStarted === true) {
    //Steering
    //Get the slope of the players tank from the radians.
    var moveDir = 1;
    const vec = new Phaser.Math.Vector2();
    vec.setToPolar(playerTank.angle + 1.5708, 1);
    //check for keyboard input
    //If W key pressed
    if (keyIsDown(87)) {
      if(playerTank.speed < 2) {
          playerTank.speed+=.02;
      }
      Matter.Body.setVelocity(playerTank, {x : vec.x * playerTank.speed * moveDir, y :  vec.y * playerTank.speed * moveDir});
    }
    else if (playerTank.enableFriction === true && playerTank.speed > 0) {
        playerTank.speed -= playerTank.trackFriction;
        Matter.Body.setVelocity(playerTank, {x : vec.x * playerTank.speed * moveDir, y :  vec.y * playerTank.speed * moveDir});
      }
    //If A key pressed
    if (keyIsDown(65) && playerTank.speed > .5) {
      Matter.Body.rotate(playerTank, (playerTank.rotSpeed*-1)/180);
    }
    //If S key  pressed
    if (keyIsDown(83)) {
      playerTank.speed-=.05;
      Matter.Body.setVelocity(playerTank, {x : vec.x * playerTank.speed * moveDir, y :  vec.y * playerTank.speed * moveDir});

    }
    //If D key pressed
    if (keyIsDown(68) && playerTank.speed > .5) {
      Matter.Body.rotate(playerTank, playerTank.rotSpeed/180);
    }
    //If SPACE key pressed
    //(spawnX, spawnY, radians, speed, r, g, b, w, h)
    if (keyIsDown(32)) {
      var xOffset = 0 * Math.cos(playerTank.angle) - 30 * Math.sin(playerTank.angle);
      var yOffset = 30 * Math.cos(playerTank.angle) + 0 * Math.sin(playerTank.angle);
      shoot(playerTank.position.x + xOffset, playerTank.position.y + yOffset, playerTank.angle, playerTank.speed + 10, 255, 255, 255, 4, 8, playerTank);
    }
    //IF Shift key pressed
    if (keyIsDown(16) && playerTank.speed > .5) {
      playerTank.rotSpeed = 10;
      playerTank.speed -= playerTank.speed/10;
      Matter.Body.setVelocity(playerTank, {x : vec.x * playerTank.speed * moveDir, y :  vec.y * playerTank.speed * moveDir});
    }
    else {
      playerTank.rotSpeed = 5
    }
    //Draw text
    fill(200);
    textAlign(CENTER, CENTER);
    text(debug, width/2, 50);

    background('#000000');
    for(i=0; i<tanks.length; i++) {
      //Loop for every tank

      //Draw sprite
      tanks[i].playerSprite.position.x = tanks[i].position.x;
      tanks[i].playerSprite.position.y = tanks[i].position.y;
      tanks[i].playerSprite.scale = .25;
      tanks[i].playerSprite.rotation = tanks[i].angle * (180/Math.PI);

      fill(tanks[i].red, tanks[i].green, tanks[i].blue);
      drawBody(tanks[i]);
    }
    for(i=0; i<bullets.length; i++) {
      fill(bullets[i].red, bullets[i].green, bullets[i].blue);
      drawBody(bullets[i]);
    }
    for(i=0; i<walls.length; i++) {
      fill(walls[i].red, walls[i].green, walls[i].blue);
      drawBody(walls[i]);
    }
    for(i=0; i<objects.length; i++) {
      fill(objects[i].red, objects[i].green, objects[i].blue);
      drawBody(objects[i].length);
    }
    for(i=0; i<objects.length; i++) {
      fill(tanks[i].red, tanks[i].green, tanks[i].blue);
      drawBody(tanks[i]);
    }
    //This somehow fixes all weird collisions with this library. It's like black magic.
    Matter.Body.setAngularVelocity(playerTank, 0);
    Matter.Body.setAngularVelocity(enemyTank, 0);

    for(i=0; i<lobbyData.players.length; i++) {
      if(lobbyData.players[i].clientId !== user.id) {
        otherPlayer = lobbyData.players[i].clientId;
      }
    }
    //Check for collisions with bullets and tanks.
    for(i=0; i<tanks.length; i++) {
      for(j=0; j<bullets.length; j++) {
          const collided = Matter.Collision.collides(tanks[i], bullets[j]);
          if (collided) {
            gameStarted = false;
            if(tanks[i].id === user.id) {
              alert('You lost, ' + user.id)
              var gameStatus = {
                loser: user.id,
                winner: otherPlayer,
              }
              var channel = realtime.channels.get(lobbyData.serverName + "gameStatus");
              channel.publish("update", { gameStatus });
            }
            else {
              alert('You beat ' + otherPlayer + ' good job, ' + user.id + '!');
            }
            World.remove(world, tanks[i]);
            World.remove(world, bullets[j]);
            bullets.splice(i, 1)
            bullets.splice(j, 1)
            if(j>0) {
              j--;
            }
            else {
              j=0;
            }
          }
        }
      }
  drawSprites();
  }
}

function updateAPI() {
  //Update the API server
  for(i=0; i<lobbyData.players.length; i++) {
    if(lobbyData.players[i].clientId !== user.id) {
      otherPlayer = lobbyData.players[i].clientId;
    }
  }

  var playerData = {
    //tank
    id: user.id,
    angle: playerTank.angle,
    speed: playerTank.speed,
    x: playerTank.position.x,
    y: playerTank.position.y,
    //bullets
    bulletas: []
  }

  for(i=0; i<bullets.length; i++) {
    var bulleta = {
      x: bullets[i].position.x,
      y: bullets[i].position.y,
      angle: bullets[i].angle,
      speed: bullets[i].speed,
    }
    playerData.bulletas.push(bulleta);
  }

  var channel = realtime.channels.get(lobbyData.serverName + user.id);
  channel.publish("update", { playerData });

  var channel = realtime.channels.get(lobbyData.serverName + otherPlayer);
  channel.subscribe(function(msg) {
    Matter.Body.setAngle(enemyTank, msg.data.playerData.angle);
    var moveDir = 1;
    const vec = new Phaser.Math.Vector2();
    vec.setToPolar(msg.data.playerData.angle + 1.5708, 1);
    Matter.Body.setPosition(enemyTank, {x: msg.data.playerData.x, y: msg.data.playerData.y});
    Matter.Body.setVelocity(enemyTank, {x : vec.x * msg.data.playerData.speed * moveDir, y :  vec.y * msg.data.playerData.speed * moveDir});


  });
  //check if bullets have been fired, and if so then spawn a bullet with the same data.
  var channel = realtime.channels.get(lobbyData.serverName + otherPlayer + "bullet");
  channel.subscribe(function(msg) {
    shoot(msg.data.bulletData.x, msg.data.bulletData.y, msg.data.bulletData.angle, msg.data.bulletData.speed, msg.data.bulletData.red, msg.data.bulletData.blue, msg.data.bulletData.blue, msg.data.bulletData.width, msg.data.bulletData.height, enemyTank);
  });

  //check if someone lost the game
  var channel = realtime.channels.get(lobbyData.serverName + "gameStatus");
  channel.subscribe(function(msg) {
    if(msg.data.gameStatus.winner === user.id) {
      alert("YOU WON!");
    }
    else {
      alert("you lost");
    }
  });
}

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
