function rotateX(x, y, angle) {
  return {"x":x * Math.cos(angle) - y * Math.sin(angle), "y":x * Math.sin(angle) + y * Math.cos(angle)}
}

function drawSpear(ctx,head,tail) {
	ctx.beginPath();
	ctx.moveTo(head.x, head.y); 
    ctx.lineTo(tail.x,tail.y);  
    ctx.stroke(); 

    
    //spear head
    var head_1={"x":head.x+(head.x-tail.x)*0.2,"y":head.y+(head.y-tail.y)*0.2};
    var head_2={"x":head.x+(head.y-tail.y)*0.1,"y":head.y-(head.x-tail.x)*0.1};
    var head_3={"x":head.x-(head.y-tail.y)*0.1,"y":head.y+(head.x-tail.x)*0.1};
    ctx.moveTo(head_1.x,head_1.y);
    ctx.lineTo(head_2.x,head_2.y);
    ctx.lineTo(head_3.x,head_3.y);
    ctx.lineTo(head_1.x,head_1.y);
    ctx.fillStyle="black";
    ctx.fill();	
}

class Spear {
	constructor(mousePos, nucleus, traj_rad,level) { //level's 1 3 or 5

		this.nucleus=nucleus;
		this.traj_rad=traj_rad;
		this.move(mousePos);
		this.isThrown=false;
		this.level=level;
		this.isAlive=true;
	}

	resize(circleRadius, new_nucleus, traj_rad) {
		
		this.speed_x*=(new_nucleus.x/this.nucleus.x);
		this.speed_y*=(new_nucleus.y/this.nucleus.y);
		
		this.nucleus=new_nucleus;
		this.traj_rad=traj_rad;
		this.move(this.lastMousePos);

	} 

	spears() {
		if (!this.isAlive) return -1;
		var spears = [];
		spears.push({"head":this.head,"tail":this.tail,"no":1});
		if (this.level>1) {
			spears.push({"head":this.head2,"tail":this.tail2,"no":2});
			spears.push({"head":this.head3,"tail":this.tail3,"no":3});
		}
		if (this.level>3) {
			spears.push({"head":this.head4,"tail":this.tail4,"no":4});
			spears.push({"head":this.head5,"tail":this.tail5,"no":5});
		}

		return spears;
	}

	throw() {
		this.timeThrown=Date.now();
		this.lastTime=Date.now();
		this.isThrown=true;
		var delta_x = this.nucleus.x-this.head.x;
		var delta_y = this.nucleus.y-this.head.y;
		this.speed_x = delta_x/10;
		this.speed_y = delta_y/10;

	}

	move(mousePos) {
		this.lastMousePos=mousePos;
		if (!this.isAlive) return;
		if (!this.isThrown) {
		
		if (this.nucleus.x==mousePos.x && this.nucleus.y<mousePos.y) this.ro=3/2*Math.PI;		
		else if (this.nucleus.x==mousePos.x && this.nucleus.y>=mousePos.y) this.ro=1/2*Math.PI;		
		else { this.ro =  Math.atan((this.nucleus.y-mousePos.y)/(this.nucleus.x-mousePos.x));
			if (this.nucleus.x > mousePos.x && this.nucleus.y > mousePos.y) this.ro=incrementAngle(this.ro,Math.PI);
			if (this.nucleus.x > mousePos.x && this.nucleus.y < mousePos.y) this.ro=incrementAngle(this.ro,Math.PI);
			
			
		}

		this.head={"x":this.nucleus.x+this.traj_rad*Math.cos(this.ro),"y":this.nucleus.y+this.traj_rad*Math.sin(this.ro)};
		this.tail={"x":this.nucleus.x+1.2*this.traj_rad*Math.cos(this.ro),"y":this.nucleus.y+1.2*this.traj_rad*Math.sin(this.ro)};

		if (this.level>1) {
			var delta2=rotateX(this.head.x-this.tail.x,this.head.y-this.tail.y,Math.PI/20);
			this.head2={"x":this.tail.x+delta2.x,"y":this.tail.y+delta2.y};
			this.tail2={"x":this.tail.x,"y":this.tail.y};
			var delta3=rotateX(this.head.x-this.tail.x,this.head.y-this.tail.y,-Math.PI/20);
			this.head3={"x":this.tail.x+delta3.x,"y":this.tail.y+delta3.y};
			this.tail3={"x":this.tail.x,"y":this.tail.y};
			
		}
		if (this.level>3) {
			var delta4=rotateX(this.head.x-this.tail.x,this.head.y-this.tail.y,Math.PI/10);
			this.head4={"x":this.tail.x+delta4.x,"y":this.tail.y+delta4.y};
			this.tail4={"x":this.tail.x,"y":this.tail.y};
			var delta5=rotateX(this.head.x-this.tail.x,this.head.y-this.tail.y,-Math.PI/10);
			this.head5={"x":this.tail.x+delta5.x,"y":this.tail.y+delta5.y};
			this.tail5={"x":this.tail.x,"y":this.tail.y};
		}
		}

		if (this.isThrown) {

			var time=Date.now();
			if (time-this.timeThrown>2000) {this.isAlive=false;}
			this.head.x+=this.speed_x* (time-this.lastTime) /100;
			this.head.y+=this.speed_y* (time-this.lastTime) /100;
			this.tail.x+=this.speed_x* (time-this.lastTime) /100;
			this.tail.y+=this.speed_y* (time-this.lastTime) /100;
			
			if(this.level>1) {

				var speed_2=rotateX(this.speed_x,this.speed_y,Math.PI/20);
				var speed_3=rotateX(this.speed_x,this.speed_y,-Math.PI/20);
				//console.log(this.speed_x+", "+this.speed_y+" becomes "+speed_2.x+", "+speed_2.y);
			this.head2.x+=speed_2.x* (time-this.lastTime) /100;
			this.head2.y+=speed_2.y* (time-this.lastTime) /100;
			this.tail2.x+=speed_2.x* (time-this.lastTime) /100;
			this.tail2.y+=speed_2.y* (time-this.lastTime) /100;
			this.head3.x+=speed_3.x* (time-this.lastTime) /100;
			this.head3.y+=speed_3.y* (time-this.lastTime) /100;
			this.tail3.x+=speed_3.x* (time-this.lastTime) /100;
			this.tail3.y+=speed_3.y* (time-this.lastTime) /100;
			
			}
			if(this.level>3) {
				var speed_4=rotateX(this.speed_x,this.speed_y,Math.PI/10);
				var speed_5=rotateX(this.speed_x,this.speed_y,-Math.PI/10);
				this.head4.x+=speed_4.x* (time-this.lastTime) /100;
			this.head4.y+=speed_4.y* (time-this.lastTime) /100;
			this.tail4.x+=speed_4.x* (time-this.lastTime) /100;
			this.tail4.y+=speed_4.y* (time-this.lastTime) /100;
			this.head5.x+=speed_5.x* (time-this.lastTime) /100;
			this.head5.y+=speed_5.y* (time-this.lastTime) /100;
			this.tail5.x+=speed_5.x* (time-this.lastTime) /100;
			this.tail5.y+=speed_5.y* (time-this.lastTime) /100;
			}

			this.lastTime=time;

		}
		
	}

	draw(ctx) {
		if (!this.isAlive) return;
		drawSpear(ctx,this.head,this.tail);
		if (this.level>1) {
			drawSpear(ctx,this.head2,this.tail2);
			drawSpear(ctx,this.head3,this.tail3);
		}
		if (this.level>3) {
			drawSpear(ctx,this.head4,this.tail4);
			drawSpear(ctx,this.head5,this.tail5);
		}
	}
}