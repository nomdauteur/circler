
class SpearManager {
	constructor(nucleus, traj_rad, mousePos) {
		this.nucleus = nucleus;
		this.radius = traj_rad;
		this.currentSpear= new Spear(mousePos,nucleus,traj_rad,1);
		this.points=0;
		this.spearsCount=3;
		this.pointsTillNextSpear=100;
		this.lastDeducted=Date.now();
		this.finable=3000;
	}

	tillNextSpearLeft() {
		return this.pointsTillNextSpear-this.points;
	}

	updateScore(score) {
		this.points+=score;
		
		if (this.points >= this.pointsTillNextSpear) {
			this.spearsCount++;
			this.points-=this.pointsTillNextSpear;
			this.pointsTillNextSpear=Math.floor(this.pointsTillNextSpear*1.1);
		}
	}

	checkAlive(mousePos) {
		if (this.currentSpear.isAlive) return true;
		else {
			this.spearsCount--;
			if (this.spearsCount>0) { 
			var level = (this.points <= this.pointsTillNextSpear/2) ? 1 : ((this.points <= 3*this.pointsTillNextSpear/4) ? 3 : 5);
			if (this.tillNextSpearLeft()>300) level=3;
			if (this.tillNextSpearLeft()>500) level=5;
			this.currentSpear = new Spear(mousePos,this.nucleus,this.radius,level);
			this.lastDeducted=Date.now();

			return true;
			}
			else return false;
		}
	}

	spears() {
		if (this.currentSpear.isAlive)
		return this.currentSpear.spears();
		return -1;
	}

	isThrown() {
		return this.currentSpear.isThrown;
	}

	throw() {
		this.currentSpear.throw();
	}

	move(mousePos) {
		var alive = this.checkAlive();
		if (!alive) return -1;
		this.currentSpear.move(mousePos);
		return 1;
	}

	resize(circleRadius, nucleus, traj_rad) {
		this.nucleus = nucleus;
		this.radius = traj_rad;
		this.currentSpear.resize(circleRadius, nucleus, traj_rad);
	}

	draw(ctx) {
		//console.log(this.currentSpear);
		if ((Date.now()-this.lastDeducted>this.finable) && !this.isThrown()) {
			this.points-=50;
			this.lastDeducted=Date.now();
		}
		this.currentSpear.draw(ctx);
	}

}