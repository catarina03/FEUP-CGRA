/**
 * MyEngine
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyEngine extends CGFobject {
	constructor(scene) {
		super(scene);
		this.sphere = new MySphere(this.scene, 16, 8);
		this.rudder = new MyRudder(this.scene);

		this.ang = 0;
	}

	updateHelix(angle){
		this.ang = angle;
	}

	display(){
		this.scene.pushMatrix();
		this.scene.scale(0.33, 0.33, 1);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.ang * Math.PI/180, 0, 0, 1);
		this.scene.translate(-0.25, 0.5, -1);
		this.scene.scale(0.33, 0.33, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.rudder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.ang * Math.PI/180, 0, 0, 1);
		this.scene.translate(0.25, -0.5, -1);
		this.scene.scale(-0.33, -0.33, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.rudder.display();
		this.scene.popMatrix();
	}
}

