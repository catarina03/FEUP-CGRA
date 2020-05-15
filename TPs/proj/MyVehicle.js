/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);

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
		this.flag = new MyPlane(scene);
	}

	update(t)
	{
		if (this.lastUpdate==0) this.lastUpdate = t;
        this.delta = (t - this.lastUpdate)/1000.0;
        this.lastUpdate = t;

		if (this.autoPilot){
			this.pilotAngle += this.delta * 360/5;
			this.pos[0] = this.center[0] - 5*Math.cos(this.pilotAngle * Math.PI /180);
			this.pos[2] = this.center[2] + 5*Math.sin(this.pilotAngle * Math.PI / 180);
			this.ang = this.pilotAngle;
			this.airship.ang = -30;
			this.airship.update(t);
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

		let x = this.pos[0] + Math.sin(directionalAngle)*this.radius;
		let z = this.pos[2] + Math.cos(directionalAngle)*this.radius; 
		
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
		this.ang += val;
		this.ang += val;
		this.ang %= 360;
	}

	reset()  
	{
		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];
		this.autoPilot = false;
		this.airship.velocity = 0;
	}

	display()
	{
		this.scene.pushMatrix();
		this.scene.translate(0, 10, 0);
		this.scene.scale(3, 3, 3);
		this.scene.translate(this.pos[0], 0, this.pos[2]);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);
		this.airship.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(this.pos[0], 10, this.pos[2] - 0.5);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);
		this.flag.display();
		this.scene.popMatrix();
	}

	getPosition(){
		return this.pos;
	}
}

