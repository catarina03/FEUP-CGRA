/**
 * MyEngine
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyEngine extends CGFobject {
	constructor(scene) {
		super(scene);
		this.sphere = new MySphere(this.scene, 16, 8);
		this.rudder_top = new MyRudder(this.scene);
		this.rudder_bottom = new MyRudder(this.scene);
	}
	display(){
		this.scene.pushMatrix();
		this.scene.scale(0.33, 0.33, 1);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.25, 0.5, -1);
		this.scene.scale(0.33, 0.33, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.rudder_top.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.25, -0.5, -1);
		this.scene.scale(-0.33, -0.33, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.rudder_bottom.display();
		this.scene.popMatrix();
	}
}

