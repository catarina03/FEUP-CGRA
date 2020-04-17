/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

		var ang = 0;
		var vel = 0;
		var pos = [0,0,0];
	}
	initBuffers() {
		this.vertices = [
			-1, 0, -1,	//0
			1, 0, -1,	//1
			0, 0, 1	//2
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
		var matPos = [this.pos.x, 0, this.pos.z, 1];
		var matVel = [this.vel , 0, this.vel, 1];
		var matAng = [	
			Math.cos(this.ang), 0, Math.sin(this.ang), 0,
			0, 1, 0, 0,
			-Math.sin(this.ang), 0, Math.cos(this.ang), 0,
			0, 0, 0, 1
		]
		this.matPos += this.matAng * (this.matVel);
		
		this.pos = [this.matPos.x, 0, matPos.z];

	}
	accelerate(val)
	{
		this.vel += this.val;
	}
	turn(val)
	{
		if(this.vel > 0) this.ang += val;
			else this.ang += val;
	}
	reset()
	{
		this.ang = 0;
		this.vel = 0;
		this.pos = [0,0,0];
	}
}

