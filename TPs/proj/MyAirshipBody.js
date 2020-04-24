/**
 * MyAirshipBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyAirshipBody extends CGFobject {
	constructor(scene) {
		super(scene);

		this.body = new MySphere(this.scene, 16, 8);
		this.rudder1 = new MyRudder(this.scene);
		this.rudder2 = new MyRudder(this.scene);
		this.rudder3 = new MyRudder(this.scene);
		this.rudder4 = new MyRudder(this.scene);
		this.cockpit = new MyCockpit(this.scene);
		this.engine_right = new MyEngine(this.scene);
		this.engine_left = new MyEngine(this.scene);
	}
	display(){
		//Body of the Airship
		this.scene.pushMatrix();
		//this.scene.translate(0, 10, 0);
		this.scene.scale(0.5, 0.5, 1);
		this.body.display();
		this.scene.popMatrix();


		//Rudders
		this.scene.pushMatrix();
		this.scene.translate(-0.4, 0, -0.8);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.4, 0, -0.8);
		this.scene.scale(-0.3, 0, 0.3);
		this.rudder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.4, -0.8);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -0.4, -0.8);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder4.display();
		this.scene.popMatrix();


		//Cockpit of the Airship
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.cockpit.display();
		this.scene.popMatrix();


		//Engines of airship
		this.scene.pushMatrix();
		this.scene.translate(0.12, -0.515, -0.25);
		this.scene.scale(0.08, 0.08, 0.08);
		this.engine_left.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.12, -0.515, -0.25);
		this.scene.scale(0.08, 0.08, 0.08);
		this.engine_left.display();
		this.scene.popMatrix();
	}
}

