

var color = {10:"yellow",20:"green",30:"blue",40:"purple",50:"red"};
class Circle {
constructor(cost, init_phi, dir,speed, trajectory) {
	this.color=color[cost];
	this.cost=cost;
	this.init_phi=init_phi;
	this.radius=CIRCLE_RADIUS;
	this.birth=Date.now();
	this.speed = speed;
	this.dir=dir;
	this.trajectory=trajectory;
}

resize(circleRadius, nucleus, traj_rad, trajectory) {
	this.radius=circleRadius;
	this.trajectory=trajectory;

}

x() {
	return this.trajectory.x+this.trajectory.radius*Math.cos(this.phi());
}

y() {
	return this.trajectory.y+this.trajectory.radius*Math.sin(this.phi());
}

phi() {
	var time = Date.now();
	var res = incrementAngle(this.init_phi,(time-this.birth) / 1000 * this.speed * this.dir);
	//console.log("Phi is"+res);
	return res;
}


draw(ctx) {
	drawCircle(ctx, this.x(), this.y(), this.radius, this.color);
	ctx.font="bold 2vmin Arial";
	ctx.fillStyle="black";
	ctx.fillText(this.cost,this.trajectory.x+this.trajectory.radius*Math.cos(this.phi())-this.radius*0.4,this.trajectory.y+this.trajectory.radius*Math.sin(this.phi())+this.radius*0.25);
}

isTouched(line_start, line_end) {
	return lineInCircle(line_start.x, line_start.y, line_end.x,line_end.y, this.x(),this.y(), this.radius);
}



updateIfTouched(line_start,line_end) {
	this.color=color[this.cost];
	if (this.isTouched(line_start,line_end)) {
		return true;
	}
	return false;
} 


}