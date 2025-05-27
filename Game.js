var points = 1;
var lives = 3;
var c; 
var ctx; 
var problem = new Problem(1);
var flyers = [];
var X = 0;
var Y = 0;
var mousePos = {
    x: vw(50),
    y: vh(70)
};

var isGameOn;


function load() {


   YaGames.init()

    .then((ysdk) => {

        
        document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
        ysdk.features.LoadingAPI?.ready();
         ysdk.getLeaderboards()
  .then(lb => {
    // С использованием всех значений по умолчанию.
    lb.getLeaderboardEntries('largecatcher', { quantityTop: 5, includeUser: false })
      .then(res => {console.log(res); window.leaderboard=res;});

      lb.getLeaderboardPlayerEntry('largecatcher')
  .then(res => {console.log(res);
   window.prev_score=res.score;})
  .catch(err => {
    if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
      window.prev_score=0;}
    });
  });
  
 
        while (document.getElementById("lang").textContent == "Language") {
            console.log("Language loading");
            sleep(20);
        }
        newGame();

    })

    .catch(console.error);


    
}



function newGame() {
  document.getElementById("leaderboard").style.display="none";
  YaGames.init()

    .then((ysdk) => {
      

     
        // Informing about starting the gameplay.

        ysdk.features.GameplayAPI?.start();


    });  
    while (document.getElementById("lang").textContent == "Language") {
            console.log("Language loading");
            sleep(20);
        }  

  isGameOn=true;
  points = 1;
lives = 3;
  document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);

c = document.getElementById('canvas');
ctx = c.getContext('2d');
c = document.getElementById('canvas');
c.width = 90 * window.innerWidth / 100;
c.height = 85 * window.innerHeight / 100 || 766;
ctx = c.getContext('2d');
ctx.font="5vmin Arial";
problem = new Problem(1);
flyers = [];
X = 0;
Y = 0;

update();
}


window.addEventListener('load', load, false);

function update() {
  
    draw();
    window.requestAnimationFrame(update);
}

function draw() {

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (el of flyers) {
      el.draw(ctx);
    }

    if (isGameOn) 
  {
    problem.draw(ctx);
    posx = mousePos.x;
    posy = vh(70);
    ctx.fillStyle="rgba(255,255,255,0.5)";
    console.log(vw(5));
    //drawRoundRectangle(ctx,posx - vw(5)+(""+points).length/2, posy,(""+points).length+vw(5),vh(5),vmin(1));
    ctx.strokeText(points, posx - vw(5)+(""+points).length/2+vw(2), posy+vh(4));
  
    
    var check = checkCollision();
    if (check != 0) {
        if (check<0) lives--;
        document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
        if (check == 1) { 
          points += problem.correct_answer.changer;
          flyers.push(new Flyer("+"+problem.correct_answer.changer,"green",posx,posy));
        }
        else if (check == -1) {
          points += problem.other_answer.changer;
          flyers.push(new Flyer("+"+problem.other_answer.changer,"red",posx,posy));
          flyers.push(new Flyer("-🖤","black",posx,posy));
        } 
        else if (check == -2) {
          
          flyers.push(new Flyer("-🖤","black",posx,posy));
        } 

        if (points > window.prev_score)
        {
          YaGames.init()

    .then((ysdk) => {

      ysdk.getLeaderboards()
  .then(lb => {
   
    lb.setLeaderboardScore('largecatcher', Math.min(points,2147483647), points.toString());
    window.prev_score = points;
    
  });

    });
     
  }
        if (lives <= 0) {
          newGamePrompt();
          return;
        }
        problem = new Problem(points);
        problem.draw(ctx);
    }
  }
}

window.addEventListener('mousemove', updateMouse, false);


function newGamePrompt() {
  YaGames.init()

    .then((ysdk) => {

      ysdk.getLeaderboards()
  .then(lb => {
    
    lb.setLeaderboardScore('largecatcher', Math.min(Math.max(points,window.prev_score),2147483647), Math.max(points,window.prev_score).toString());
    window.prev_score = Math.max(points,window.prev_score);

    lb.getLeaderboardEntries('largecatcher', { quantityTop: 5, includeUser: false })
      .then(res => {console.log(res); window.leaderboard=res; drawLeaderboard();});
    
    
  });

        ysdk.features.GameplayAPI?.stop();

    });

  isGameOn=false;
  for (el of flyers) {
      el.draw(ctx);
    }

    document.getElementById("lives").textContent=setText("Вы проиграли. Начать заново?","You lost. Play again?")+String.fromCodePoint(10084).repeat(lives);
    b=document.createElement("button");
    document.getElementById("lives").appendChild(b);
    b.textContent=setText("Ага","Ok");
    b.onclick=function(){
      YaGames.init()

    .then((ysdk) => {

          ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {
           newGame();          

        },

        onError: function(error) {

          console.log(error);

        }

    }

})});

     
    };


}


function drawLeaderboard() {
  ll = document.getElementById("leaderboard");
  ll.style.display="table";



  while (ll.firstChild) {
            ll.removeChild(ll.lastChild);
        }

        var h = document.createElement("h1");
        h.textContent=setText("Большие числа","Largest numbers");
        h.style.textAlign="left";
        h.style.paddingLeft=vmin(2);

        ll.appendChild(h);


  for (i = 0; i < window.leaderboard.entries.length;i++) {
    var d = document.createElement("p");
    d.style.display="table-row";
var d1=document.createElement("div");
d1.style.display="table-cell";
d1.style.textAlign="left";
d1.style.paddingLeft=vmin(2);

var d2=document.createElement("div");
d2.style.display="table-cell";
d2.style.textAlign="right";
d2.style.paddingRight=vmin(2);

d1.textContent=window.leaderboard.entries[i].rank+". "+window.leaderboard.entries[i].player.publicName;

d2.textContent=window.leaderboard.entries[i].extraData;
d.appendChild(d1);
d.appendChild(d2);

    ll.appendChild(d);
  }
  
}

function resize() {
document.getElementById('canvas').width = 90 * window.innerWidth / 100;
document.getElementById('canvas').height = 85 * window.innerHeight / 100 || 766;
ctx = document.getElementById('canvas').getContext('2d');
ctx.font="5vmin Arial";

}