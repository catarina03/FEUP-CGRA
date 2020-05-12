/**
 * MyAirshipBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyAirshipBody extends CGFobject {
	constructor(scene) {
		super(scene);

		this.body = new MySphere(this.scene, 16, 8);
		this.rudder = new MyRudder(this.scene);
		this.cockpit = new MyCockpit(this.scene);
		this.engine = new MyEngine(this.scene);

		this.ang = 0; 
		this.velocity = 0;

		this.initMaterials();
	}

	update(t){
		this.engine.ang = t * (this.velocity + 0.03);
	}

	updateRudders(){ 
		if (this.scene.gui.isKeyPressed("KeyD")){
			this.ang = 45;
		}
		else {
			if (this.scene.gui.isKeyPressed("KeyA")){
				this.ang = -45;
			}
			else{
				this.ang = 0;
			}
		}
	}

	accelerate(val){
		this.velocity += val;
		if (this.velocity < 0) this.velocity = 0;
	}

	initMaterials(){
		this.bodyMaterial = new CGFappearance(this.scene);
		this.bodyMaterial.setAmbient(0.8,0.8,0.8,1);
        this.bodyMaterial.setDiffuse(0.9,0.9,0.9,1);
        this.bodyMaterial.setSpecular(0.3,0.3,0.3,1);
        this.bodyMaterial.setShininess(10);
        this.bodyMaterial.loadTexture('images/sealBody.jpg');
		this.bodyMaterial.setTextureWrap('REPEAT','REPEAT');
		
		this.grayMaterial = new CGFappearance(this.scene);
		this.grayMaterial.setAmbient(0.7,0.7,0.7,1);
        this.grayMaterial.setDiffuse(0.6,0.6,0.6,1);
        this.grayMaterial.setSpecular(0.2,0.2,0.2,1);
        this.grayMaterial.setShininess(10);
        this.grayMaterial.loadTexture('images/gray.jpg');
		this.grayMaterial.setTextureWrap('REPEAT','REPEAT');
		
		this.blackMaterial = new CGFappearance(this.scene);
		this.blackMaterial.setAmbient(0.2,0.2,0.2,1);
        this.blackMaterial.setDiffuse(0.6,0.6,0.6,1);
        this.blackMaterial.setSpecular(0.1,0.1,0.1,1);
        this.blackMaterial.setShininess(10);
        this.blackMaterial.loadTexture('images/black.png');
		this.blackMaterial.setTextureWrap('REPEAT','REPEAT');
	}

	display(){
		//Body of the Airship
		this.scene.pushMatrix();
		this.bodyMaterial.apply();
		this.scene.scale(0.5, 0.5, 1);
		this.body.display();
		this.scene.popMatrix();


		//Rudders
		//Horizontal
		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(-0.4, 0, -0.8);
		this.scene.scale(0.3, 0, 0.3);
		this.rudder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(0.4, 0, -0.8);
		this.scene.scale(-0.3, 0, 0.3);
		this.rudder.display();
		this.scene.popMatrix();

		//Vertical
		this.scene.pushMatrix();		
		this.blackMaterial.apply();
		this.scene.translate(0, 0.4, -0.5);
		this.scene.rotate(this.ang * Math.PI/180, 0, 1, 0);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.scene.translate(0, 0, -1);
		this.rudder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(0, -0.4, -0.5);
		this.scene.rotate(this.ang * Math.PI/180, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.3, 0, 0.3);
		this.scene.translate(0, 0, -1);
		this.rudder.display();
		this.scene.popMatrix();


		//Cockpit of the Airship
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.cockpit.display();
		this.scene.popMatrix();


		//Engines of airship
		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(0.12, -0.515, -0.25);
		this.scene.scale(0.08, 0.08, 0.08);
		this.engine.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(-0.12, -0.515, -0.25);
		this.scene.scale(0.08, 0.08, 0.08);
		this.engine.display();
		this.scene.popMatrix();
	}
}

