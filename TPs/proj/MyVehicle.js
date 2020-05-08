/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);
		//this.initBuffers();

		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];

		this.center = [0, 0, 0];
		this.pilotAngle = 0;
		this.position = 0;
		this.orientation = 0;
		this.radius = 5;
		this.autoPilot = false;

		this.lastUpdate = 0;
		this.delta = 0;

		this.airship = new MyAirshipBody(this.scene);
	}

	/*
	initBuffers() {
		this.initGLBuffers();
	}
	*/

	update(t)
	{
		if (this.lastUpdate==0) this.lastUpdate = t;
        this.delta = (t - this.lastUpdate)/1000.0;
        this.lastUpdate = t;

		if (this.autoPilot){
			this.pilotAngle += this.delta * 360/5;
			this.pos[0] = this.center[0] + 5*Math.sin(this.pilotAngle * Math.PI /180);
			this.pos[2] = this.center[2] + 5*Math.cos(this.pilotAngle * Math.PI / 180);
			this.ang = (this.pilotAngle + 90);
			this.airship.update(t);
			this.airship.updateRudders();
		}
		else{
			this.pos[0] += this.vel * Math.sin(this.ang * Math.PI / 180);
			this.pos[2] += this.vel * Math.cos(this.ang * Math.PI / 180);
			this.airship.update(t);
			this.airship.updateRudders();
		}
	}

	startAutoPilot(){
		this.autoPilot = true; 

		this.pilotAngle = (this.ang - 90) * Math.PI/180;
		var directionalAngle = (this.ang + 90) * Math.PI/180;

		let x = this.pos[0] + Math.sin(directionalAngle)*this.radius; //(Math.sqrt(2)/2);
		let z = this.pos[2] + Math.cos(directionalAngle)*this.radius; //(Math.sqrt(2)/2);
		
		this.center = [x, 0, z];
	}

	accelerate(val)
	{
		this.vel += val;
		if (this.vel < 0) this.vel = 0;

		this.airship.accelerate(val);
	}

	turn(val)
	{
		//this.ang %= 360;
		//if (!this.autoPilot){
			if(this.vel >= 0){
				this.ang += val;
				this.ang += val;
				this.ang %= 360;
				//this.airship.turn(-val);
			}
			//else{
			//	this.ang -= val;
				//this.airship.turn(-val);
			//}
			/*
		}
		else{
			this.ang += val;
			this.ang %= 360;
		}
		*/
	}

	reset()    //RESET THE RUDDERS TOO
	{
		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];
		this.autoPilot = false;
		this.airship.ang = 0;
	}

	display()
	{
		this.scene.pushMatrix();
		this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
		this.scene.translate(this.pos[0], 0, this.pos[2]);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);
		this.airship.display();
		this.scene.popMatrix();
	}
}

