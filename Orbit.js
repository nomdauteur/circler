class Orbit {

	constructor(center, radius, speed, direction) {
		this.birth=Date.now();
		this.center=center;
		this.radius=radius;
		this.speed=speed;
		this.direction=direction;
		this.circles=[];
		this.pocketsNo=Math.floor(Math.PI/Math.asin(CIRCLE_RADIUS/this.radius));
		this.flyers=[];
		
 
	}

	resize(circleRadius, nucleus, traj_rad,radius) {
		
		
		this.radius=radius;
		this.flyers=[];

		this.center=nucleus;

		for (var i=0;i<this.circles.length;i++) {
			this.circles[i].resize(circleRadius, nucleus, traj_rad,{"x":this.center.x, "y":this.center.y, "radius":this.radius});
		}
	}

	getFreePocket() {
		var res = -1;
		var delta_phi=2*Math.PI/this.pocketsNo/100;
		for (var i = Math.random()*2*Math.PI; i <= 2*Math.PI; i+=delta_phi) {
			var flag = true;
			for (var j of this.circles) {
				var j_center_x=this.center.x+this.radius*Math.cos(j.phi());
				var j_center_y=this.center.y+this.radius*Math.sin(j.phi());
				var i_center_x=this.center.x+this.radius*Math.cos(i);
				var i_center_y=this.center.y+this.radius*Math.sin(i);
				if ((i_center_x-j_center_x)*(i_center_x-j_center_x)+(i_center_y-j_center_y)*(i_center_y-j_center_y) < 4 * CIRCLE_RADIUS * CIRCLE_RADIUS) {

					flag=false;
				}
				//console.log(j.phi()/Math.PI + " +- "+delta_phi/Math.PI+" not contains " + i/Math.PI);
			}
			if (flag==true) {
				res = i;
			}
		}
		var time = Date.now();
		
		return res;
	}

	spawnCircle(cost) {

		var freePockets=this.pocketsNo-this.circles.length;
		if (freePockets<=0) return;
		var phi=this.getFreePocket();
		if (phi == -1) return;
		this.circles.push(new Circle(cost, phi, this.direction,this.speed, {"x":this.center.x, "y":this.center.y, "radius":this.radius}));
		
		
	}

	draw(ctx) {
		 drawCircle(ctx,this.center.x, this.center.y, this.radius,null);
    for (var circle of this.circles) {
    circle.draw(ctx);
  }
  ctx.font="bold 2vmin Arial";
  for (var flyer of this.flyers) {
    flyer.draw(ctx);
  }
	}

	

	updateIfTouched(line_start,line_end) {
		//console.log("Checking puncture by "+line_start.x+", "+line_start.y);
		var score = 0;
		for (var circle of this.circles) {
    var res = circle.updateIfTouched(line_start,line_end);
    if (res) {
    	score +=circle.cost;
    	this.flyers.push(new Flyer("+"+circle.cost, circle.color, circle.x(), circle.y()));
    	this.circles.splice(this.circles.indexOf(circle),1);
    }
	}

	for (var flyer of this.flyers) {
    if (!flyer.isAlive)
    	this.flyers.splice(this.flyers.indexOf(flyer),1);
    }
	
	return score;
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
		this.isAlive=true;
	}

	draw(context) {
		var currTime = new Date();
		this.delta = (currTime - this.startTime)/1000*60;
		if (currTime - this.startTime > 2000) this.isAlive=false;
		this.X = this.pos.x+this.delta*this.deltaX*vw(1/3);
		this.Y = this.pos.y+this.delta*this.deltaY*vh(1/3);
		context.fillStyle=this.color;
		context.fillText(this.text,this.X, this.Y);
		
	}
}