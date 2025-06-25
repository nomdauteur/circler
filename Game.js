var field;
var c; 
var ctx; 
var score=0;
var mousePos = {
    x: vw(50),
    y: vh(100)
};

var spearManager;

CIRCLE_RADIUS=vmin(3);

var NUCLEUS = {
  x: vw(50),
  y: vh(45)
}

var MOUSE_CIRCLE_RADIUS = vmin(40);

var isGameOn;

var LAST_ADDED;

function resize() {
  
  CIRCLE_RADIUS=vmin(3);

NUCLEUS = {
  x: vw(50),
  y: vh(45)
}

MOUSE_CIRCLE_RADIUS = vmin(40);

  
  field.resize(CIRCLE_RADIUS,NUCLEUS,MOUSE_CIRCLE_RADIUS);

  
document.getElementById('canvas').width = 90 * window.innerWidth / 100;
document.getElementById('canvas').height = 90 * window.innerHeight / 100 || 766;
ctx = document.getElementById('canvas').getContext('2d');
ctx.font="bold 5vmin Arial";

}
window.addEventListener('load', load, false);



function load() {
  c = document.getElementById('canvas');
c.width = 90 * window.innerWidth / 100;
c.height = 90 * window.innerHeight / 100 || 766;
ctx = c.getContext('2d');
ctx.font="bold 5vmin Arial";

  YaGames.init()

    .then((ysdk) => {
        
        document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
        document.getElementById("newGame").textContent=setText("Новая игра","New game");
    //document.getElementById("score").textContent=setText("Счет: ","Score: ");
        ysdk.features.LoadingAPI?.ready();
        
window.addEventListener('mouseup', updateSpear, false);

window.addEventListener('mousemove', updateMouse, false);

window.addEventListener('touchmove', touchMoveMouse, false);

         newGame();
        while (document.getElementById("lang").textContent == "Language") {
            sleep(20);
        }

    })
    .catch(console.error);
   
}

function updateSpear(event) {
      //updateMouse(event);
    
      if (!field.spearManager.isThrown()) {
      field.spearManager.throw();
    }
  }

function newGame() {
   YaGames.init()

    .then((ysdk) => {

          ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {
          isGameOn=true;
c = document.getElementById('canvas');
c.width = 90 * window.innerWidth / 100;
c.height = 90 * window.innerHeight / 100 || 766;
ctx = c.getContext('2d');
ctx.font="bold 5vmin Arial";
field = new Field(ctx,NUCLEUS,MOUSE_CIRCLE_RADIUS,mousePos);
  

update();

        },

        onError: function(error) {

          console.log(error);

        }

    }
  });

  
});

 
}



function update() {
  if (!isGameOn) {
       isGameOn=false;
       YaGames.init()

    .then((ysdk) => {     

        ysdk.features.GameplayAPI?.stop(); 
      });
  
    document.getElementById("score").textContent=setText("Вы проиграли. Начать заново?","You lost. Play again?");
   
    return;
  }
  document.getElementById('canvas').width = 90 * window.innerWidth / 100;
document.getElementById('canvas').height = 90 * window.innerHeight / 100 || 766;
ctx = document.getElementById('canvas').getContext('2d');
ctx.font="bold 5vmin Arial";
field.step(mousePos);
displayScore(field);
     
    window.requestAnimationFrame(update);
}

function draw() {
field.draw();
 
    
}




function displayScore(field) {
  document.getElementById("score").textContent=setText("Счет: ","Score: ")+field.score +"   "+setText("Бросков: ","Throws: ")+field.spearManager.spearsCount +"   "+setText("До нового броска: ","New throw in: ")+field.spearManager.tillNextSpearLeft();
  }