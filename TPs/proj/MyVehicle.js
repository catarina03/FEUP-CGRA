/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];

		this.body = new MySphere(this.scene, 16, 8);
		this.cockpit = new MyCockpit(this.scene);
		this.rudder1 = new MyRudder(this.scene);
		this.rudder2 = new MyRudder(this.scene);
		this.rudder3 = new MyRudder(this.scene);
		this.rudder4 = new MyRudder(this.scene);
	}
	initBuffers() {
		this.vertices = [
			-1, 0, -0.5,	//0
			1, 0, -0.5,	//1
			0, 0, 0.5	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	update()
	{
		this.pos[0] += this.vel * Math.sin(this.ang * Math.PI / 180);
		this.pos[2] += this.vel * Math.cos(this.ang * Math.PI / 180);
	}

	accelerate(val)
	{
		this.vel += val;
		if (this.vel < 0) this.vel = 0;
	}

	turn(val)
	{
		if(this.vel >= 0)this.ang += val;
		else this.ang -= val;
	}

	reset()
	{
		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];
	}

	display()
	{
		//Body of the Airship
		this.scene.pushMatrix();
		//this.scene.translate(0, 10, 0);
		this.scene.scale(0.5, 0.5, 1);
		this.body.display();
		this.scene.popMatrix();

		//Rudders
		this.scene.pushMatrix();
		this.scene.translate(-0.4, 0, -0.9);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.4, 0, -0.9);
		this.scene.scale(-0.3, 0, 0.3);
		this.rudder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.4, -0.9);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -0.4, -0.9);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder4.display();
		this.scene.popMatrix();

		//Cockpit of the Airship
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.cockpit.display();
		this.scene.popMatrix();


		//this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
		//this.scene.translate(this.pos[0], 0, this.pos[2]);
		//this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);

		//super.display();
		//this.scene.popMatrix();
	}
}

