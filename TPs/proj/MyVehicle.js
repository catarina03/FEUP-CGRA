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

		this.airship = new MyAirshipBody(this.scene);

	}

	/*
	initBuffers() {
		this.initGLBuffers();
	}
	*/

	update(t)
	{
		this.pos[0] += this.vel * Math.sin(this.ang * Math.PI / 180);
		this.pos[2] += this.vel * Math.cos(this.ang * Math.PI / 180);
		this.airship.update(t);
	}

	accelerate(val)
	{
		this.vel += val;
		if (this.vel < 0) this.vel = 0;

		this.airship.accelerate(val);
	}

	turn(val)
	{
		if(this.vel >= 0){
			this.ang += val;
			this.airship.updateRudders(val);
		}
		else{
			this.ang -= val;
			this.airship.updateRudders(-val);
		} 
	}

	reset()
	{
		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];
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

