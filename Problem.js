START_Y = 10;

class Problem {
	constructor(points) {
		this.problem = points;
		this.correct_answer={"label":"","changer":0,"offset":0};
		this.other_answer={"label":"","changer":0,"offset":0};
		this.width=vw(40);
		this.height=vh(5);


  var base=(points < 10000) ? 2 : ((points < 500000) ? 6 : 9);
  this.speed=(points < 10000) ? 1/3 : ((points < 500000) ? 4/9 : 2/3);

  var multiplier=Math.floor(Math.random()*base)+2;
  var addition=points*(multiplier-1)+(-base+Math.floor(Math.random()*2*base));
  if (points + addition == points * multiplier) {
    var fluc = Math.random();
    if (fluc > 0.5) addition+=1;
    else addition-=1;
  }
  if (points == 1) {addition=multiplier};
  var mult_answer = "x "+multiplier;
  var add_answer = "+ "+addition;
  if (points + addition > points * multiplier) {
    this.correct_answer.label=add_answer;
    this.correct_answer.changer=addition;
    this.other_answer.label=mult_answer;
    this.other_answer.changer=points*(multiplier-1);
  }
  else {
    this.correct_answer.label=mult_answer;
    this.correct_answer.changer=points*(multiplier-1);
    this.other_answer.label=add_answer;
    this.other_answer.changer=addition;
  }

  var shuffle = Math.random();
  if (shuffle < 0.5) {
  	this.correct_answer.offset = 0;
  	this.other_answer.offset = this.width;
  }
  else {
  	this.correct_answer.offset = this.width;
  	this.other_answer.offset = 0;
  }


  this.startTime = new Date();
  this.correct_answer.x=this.correct_answer.offset+Math.random()*(this.width-this.correct_answer.label.length*4)+this.correct_answer.label.length*2;
		this.other_answer.x=this.other_answer.offset+Math.random()*(this.width-this.other_answer.label.length*4)+this.other_answer.label.length*2;
	}

	draw(context) {
		var currTime = new Date();
		this.delta = (currTime - this.startTime)/1000*60;
		this.curr_y = START_Y+this.delta*vh(this.speed);
		context.fillStyle="rgba(255,255,255,0.5)";
		//drawRoundRectangle(context,this.correct_answer.offset+1,this.curr_y,this.width-2,this.height,5);
		//drawRoundRectangle(context,this.other_answer.offset+1,this.curr_y,this.width-2,this.height,5);

		context.strokeText(this.correct_answer.label,this.correct_answer.x,this.curr_y+this.height-vmin(1));
		context.strokeText(this.other_answer.label,this.other_answer.x,this.curr_y+this.height-vmin(1));
	}
}


class Flyer {
	constructor(text, color, x,y) {
		this.text=text;
		this.color=color;
		this.pos={"x":x,"y":y};
		this.startTime = new Date();
		var r = Math.floor(Math.random()*4);
		this.deltaX = (r % 2 == 0) ? 1 : -1;
		this.deltaY = (r <2) ? 1 : -1;
	}

	draw(context) {
		var currTime = new Date();
		this.delta = (currTime - this.startTime)/1000*60;
		this.X = this.pos.x+this.delta*this.deltaX*vw(1/3);
		this.Y = this.pos.y+this.delta*this.deltaY*vh(1/3);
		context.fillStyle=this.color;
		context.fillText(this.text,this.X, this.Y);
		
	}
}