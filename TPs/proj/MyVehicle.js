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
		this.scene.pushMatrix();
		this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
		this.scene.translate(this.pos[0], 0, this.pos[2]);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);

		super.display();
		this.scene.popMatrix();
	}
}

