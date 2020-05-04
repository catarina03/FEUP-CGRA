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

		this.ang = 0; 
		this.velocity = 0;

		this.initMaterials();
	}

	update(t){
		this.engine_right.updateHelix(t * this.velocity);
		this.engine_left.updateHelix(t * this.velocity);
	}

	updateRudders(value){
		this.ang += value;
	}

	accelerate(vel){
		this.velocity = vel;
	}

	initMaterials(){
		this.bodyMaterial = new CGFappearance(this.scene);
		this.bodyMaterial.setAmbient(0.7,0.7,0.7,1);
        this.bodyMaterial.setDiffuse(0.9,0.9,0.9,1);
        this.bodyMaterial.setSpecular(0.2,0.2,0.2,1);
        this.bodyMaterial.setShininess(10);
        this.bodyMaterial.loadTexture('images/sealBody2.jpg');
        this.bodyMaterial.setTextureWrap('REPEAT','REPEAT');
	}

	display(){
		//Body of the Airship
		this.scene.pushMatrix();
		this.bodyMaterial.apply();
		//this.scene.translate(0, 10, 0);
		this.scene.scale(0.5, 0.5, 1);
		this.body.display();
		this.scene.popMatrix();


		//Rudders
		//Horizontal
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

		//Vertical
		this.scene.pushMatrix();
		this.scene.translate(0, 0.4, -0.8);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -0.4, -0.8);
		this.scene.rotate(this.ang*Math.PI /180, 0, 1, 0);
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
		this.engine_right.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.12, -0.515, -0.25);
		this.scene.scale(0.08, 0.08, 0.08);
		this.engine_left.display();
		this.scene.popMatrix();
	}
}

