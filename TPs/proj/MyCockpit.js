/**
 * MyCockpit
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCockpit extends CGFobject {
	constructor(scene) {
		super(scene);

		this.front_edge = new MySphere(this.scene, 16, 8);
		this.body = new MyCylinder(this.scene, 16);
		this.back_edge = new MySphere(this.scene, 16, 8);
	}
	display(){
		
		//Body of the cockpit
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.1, 0.5, 0.1);
		this.scene.translate(0, -0.5, 0);
		this.body.display();
		this.scene.popMatrix();

		//Front edge
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.25);
		this.scene.scale(0.1, 0.1, 0.1);
		this.front_edge.display();
		this.scene.popMatrix();

		//Back edge
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.25);
		this.scene.scale(0.1, 0.1, 0.1);
		this.back_edge.display();
		this.scene.popMatrix();

	}
}

