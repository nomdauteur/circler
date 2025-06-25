class Field {
	constructor(ctx, nucleus, radius, mousePos) {
		this.context=ctx;
		this.nucleus=nucleus;
		this.radius=radius;
		this.orbits=[];
		this.orbitsCount=1;
		this.points=0;
		this.score=0;
		this.orbitGrower=[50,200,1000,5000,0];
		this.orbitMaxCount=5;
		this.spearManager = new SpearManager(nucleus,radius,mousePos);
		this.isAlive=true;
		this.init();


	}

	init() {
		 YaGames.init()

    .then((ysdk) => {
        // Informing about starting the gameplay.

        ysdk.features.GameplayAPI?.start();


    });
		LAST_ADDED = new Date();
		this.orbits.push(new Orbit(this.nucleus,this.radius/7*this.orbitsCount, Math.random()*5*Math.PI/6+Math.PI/6, (this.orbitsCount % 2 == 0) ? 1 : -1));
		for (var i = 0; i < Math.random()*10; i++) {
        	this.orbits[0].spawnCircle(Math.floor(Math.random()*5)*10+10);
    	}

	//this.draw();
	}

	step(mousePos) {
		var gameOn=this.spearManager.move(mousePos);
		if (gameOn==-1) this.gameOver();
		var time_elapsed = Date.now() - LAST_ADDED;
  		if (time_elapsed>2000) {
  			for (var orbit of this.orbits) {
      		for (var i = 0; i < Math.random()*3; i++) {
        	orbit.spawnCircle(Math.floor(Math.random()*5)*10+10);
    		}
    		}
    	LAST_ADDED = new Date();
  		}
  		this.draw();
	}

	draw() {
		this.context.clearRect(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);
    	ctx.fillStyle = "rgba(255,247,240,255)";
    	ctx.fillRect(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);
    	ctx.font="5vmin Arial";

    	drawCircle(this.context,this.nucleus.x, this.nucleus.y, vmin(0.5),"black");
  		this.context.lineWidth="2vmin";

    	for (var orbit of this.orbits) {
    		orbit.draw(this.context);
  		}

  		this.spearManager.draw(this.context);

  		if (this.spearManager.isThrown())
  		for (orbit of this.orbits) {
    		if (this.spearManager.spears() !=-1)
    		for (var s of this.spearManager.spears()) {
      			var deltaScore=orbit.updateIfTouched(s.head,s.tail);
    		this.score += deltaScore;
    		if (this.score>1000) this.finable=2000;
    		if (this.score>5000) this.finable=1000;
    		this.updateByScore(deltaScore);
    		this.spearManager.updateScore(deltaScore);
  			}
		}

	}

	updateByScore(deltaScore) {
		this.points+=deltaScore;
		this.unlock();
		
	}

	

	unlock() {
		if ((this.points >= this.orbitGrower[this.orbitsCount-1]) && (this.orbitsCount < this.orbitMaxCount)) {
			this.points-=this.orbitGrower[this.orbitsCount-1];
			this.orbitsCount++;
			this.orbits.push(new Orbit(this.nucleus,this.radius/7*this.orbitsCount, Math.random()*5*Math.PI/6+Math.PI/6, (this.orbitsCount % 2 == 0) ? 1 : -1));
			for (var i = 0; i < Math.random()*10; i++) {
        	this.orbits[this.orbitsCount-1].spawnCircle(Math.floor(Math.random()*5)*10+10);
    	}
		}
	}


	gameOver() {
		isGameOn=false;

	}

	resize(circleRadius, nucleus, traj_rad) {
		this.nucleus=nucleus;
		this.radius=traj_rad;
		for (var i = 0; i < this.orbits.length;i++) {
			this.orbits[i].resize(circleRadius, nucleus, traj_rad,this.radius/7*(i+1));
		}
		this.spearManager.resize(circleRadius, nucleus, traj_rad);

	}


}