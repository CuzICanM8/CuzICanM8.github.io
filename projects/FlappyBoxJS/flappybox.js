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

var userID;
function checkUserID() {
  userID = getCookie("userID");
  if (userID != "") {
    alert("Welcome again " + userID);
  } else {
     userID = prompt("What is your name?")
     if (userID != "" && userID != null) {
       setCookie("username", userID, 30*12*10);
     }
  }
}

checkUserID()


//Game stuff
var gameOver = false;
var highScore = 0;
var localScore = 0;
var leaderboard = [];
var gamesPlayed = 0;
var button = 0;
var popupAlert = 0;

//reload page when user inputs

function reload() {
  location.reload();
}

//Play the game until it's over
if (gameOver === false) {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const MouseConstraint = Matter.MouseConstraint;

  const drawBody = Helpers.drawBody;
  const drawMouse = Helpers.drawMouse;




  Matter.use('matter-wrap');
  let pipes = [];
  let pipe;
  let flappybox;
  var worldWidth = window.innerWidth;
  var worldHeight = window.innerHeight;
  var notExponentialPipes = 0;
  var gap = 75;
  var spawnXInterval = worldWidth/5;
  var initialSpawnX = 500;
  var spawnX = initialSpawnX;
  // create an engine
  const engine = Matter.Engine.create();
  const world = engine.world;
  //Make some functions for later
  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function setup() {
    const canvas = createCanvas(worldWidth, worldHeight);
    //engine.gravity.y = 0;
    // config wrap area
    const wrap = {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    };

    flappybox = new Block(world,
      { x: worldWidth/3, y: worldHeight/2, w: 40, h: 40, color: 'grey' },
      { restitution: 0, plugin: { wrap: wrap } }
    );
    // setup mouse (This allows user to move the pipes so I greyed it out, because its fun its just cheating.)
  //  mouse = new Mouse(engine, canvas);

    // run the engine
    Matter.Runner.run(engine);
  }

  function createPipes(n) {
    spawnX = initialSpawnX;
    var pipeOptions = {
      frictionStatic: 0,
      friction: 0,
      frictionAir: 0,
      render: {
        fillStyle: 'red',
        strokeStyle: 'blue',
        lineWidth: 3
      }
    }
    for(i=0; i<n; i++) {
      spawnX += spawnXInterval;
      let centerHeight = randomIntFromInterval(0, worldHeight);
      let topPipeLength = (centerHeight);
      let bottomPipeLength = (worldHeight - centerHeight);
      const topPipe = Bodies.rectangle(spawnX, 0, 40, topPipeLength, pipeOptions);
      pipes.push(topPipe);
      World.add(engine.world, topPipe);
      Matter.Body.setVelocity(topPipe, {x : -5, y: 0})
      topPipe.ignoreGravity = true;
      topPipe.cleared = false;
      const bottomPipe = Bodies.rectangle(spawnX, worldHeight - 2, 40, bottomPipeLength, pipeOptions);
      pipes.push(bottomPipe);
      World.add(engine.world, bottomPipe);
      Matter.Body.setVelocity(bottomPipe, {x : -5, y: 0})
      bottomPipe.ignoreGravity = true;
      bottomPipe.cleared = false;
    }
  }
  createPipes(4)

  function draw() {
    background('#0398fc');

    flappybox.draw();
    //roof.draw();
    //ground.draw();
    for(i=0; i<pipes.length; i++){
      drawBody(pipes[i]);
      //I will use the angle of the box to check if a collision was made.
      if (flappybox.body.angle != 0) {
        //this checks if the user got a new highscore, and if so sets it.
        if(localScore > highScore) {
          highScore = localScore;
        }
        //this sets the cookie for the leaderboard.
        leaderboard = [userID, highScore, gamesPlayed];
        //Cookies stuff
        let userIDleaderboard = getCookie("leaderboard");
        if (userIDleaderboard != "") {
          if (popupAlert === 0) {
            alert("On game " + userIDleaderboard[2] + " your highscore was: " + userIDleaderboard[1] + " Goodjob, " + userIDleaderboard[0] + " !");
            popupAlert++;
          }
        } else {
           userIDleaderboard = leaderboard
           if (userIDleaderboard != "" && userIDleaderboard != null) {
             setCookie("leaderboard", userIDleaderboard, 30*12*10);
           }
        }
        //sets gameover true
        gameOver = true;
        //Creates button to restart game.
        //When clicked restart game
        if(button === 0 ) {
          let btn = document.createElement("button");
          btn.innerHTML = "Restart";
          document.body.appendChild(btn);
          btn.onclick = function () {
            reload();
          };
          document.body.appendChild(btn);
        }
        button++
      }
      if(notExponentialPipes == 1) {
        createPipes(1);
        notExponentialPipes = 0;
      }
      if (pipes[i].position.x < flappybox.body.position.x && pipes[i].cleared === false){
        if(gameOver === false) {
          pipes[i].cleared = true;
          localScore += .5;
          Math.round(localScore)
          notExponentialPipes += .5;
          if(pipes[i].position.x < 0) {
            World.remove(world, pipes[i]);
            pipes.splice(i, 1)
            i--;
          }
        }
      }
    }
    if (gameOver === false) {
      fill(255);
      textAlign(CENTER, CENTER);
      text(localScore, width/2, 50);
    }
    else {
      fill(255);
      textAlign(CENTER, CENTER);
      text("Scroll down and click on the 'restart' button to restart. Your final score was: " + localScore, width/2, 50);
    }
  }
  function mouseClicked() {
    if (gameOver === false) {
      if ((flappybox.body.position.x - flappybox.body.positionPrev.x) < 0) {
      }
      // use current direction and velocity for the jump
      Matter.Body.applyForce(
        flappybox.body,
        {x: flappybox.body.position.x, y: flappybox.body.position.y},
        {x: 0, y: -.05}
      );
    }
  }

  function keyPressed() {
    if (gameOver === false) {
    // is SPACE pressed?
      if (keyCode === 32) {
        if ((flappybox.body.position.x - flappybox.body.positionPrev.x) < 0) {
        }
        // use current direction and velocity for the jump
        Matter.Body.applyForce(
          flappybox.body,
          {x: flappybox.body.position.x, y: flappybox.body.position.y},
          {x: 0, y: -.05}
        );
      }
    }
  }
}
