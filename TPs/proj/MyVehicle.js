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
		this.radius = 5;
		this.autoPilot = false;
		this.lastUpdate = 0;
		this.delta = 0;

		this.airship = new MyAirshipBody(this.scene);
		this.flag = new MyPlane(scene);

		//this.flagTex = new CGFtexture(this.scene,'images/flag.jpg');
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        
        this.shader.setUniformsValues({ flagTex: 4 });

	}

	update(t){
		if (this.lastUpdate==0) this.lastUpdate = t;
        this.delta = (t - this.lastUpdate)/1000.0;
        this.lastUpdate = t;

        if (this.autoPilot){
			this.pilotAngle = this.ang;
            this.pos[0] = this.center[0] - this.radius*Math.cos(this.pilotAngle * Math.PI / 180);
            this.pos[2] = this.center[2] + this.radius*Math.sin(this.pilotAngle * Math.PI / 180);
			this.turn(this.delta * 360/5);
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
		this.scene.translate(this.pos[0], 0, this.pos[2]);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);
		this.scene.scale(2,2,2);

		this.airship.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 10, 0);
		this.scene.translate(this.pos[0]  - 1.8, 0, this.pos[2] - 1.8);
		this.scene.rotate(this.ang*Math.PI /180 + Math.PI/2, 0, 1, 0); //??
		this.scene.scale(2, 1, 1); //Flag Shape
		this.flag.display();
		this.scene.popMatrix();
	}

	getPosition(){
		return this.pos;
	}
}

