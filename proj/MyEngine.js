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

		this.initMaterials();
	}

	initMaterials(){
		this.sphereMaterial = new CGFappearance(this.scene);
		this.sphereMaterial.setAmbient(0.2,0.2,0.2,1);
        this.sphereMaterial.setDiffuse(0.6,0.6,0.6,1);
        this.sphereMaterial.setSpecular(0.1,0.1,0.1,1);
        this.sphereMaterial.setShininess(10);
        this.sphereMaterial.loadTexture('images/black.png');
		this.sphereMaterial.setTextureWrap('REPEAT','REPEAT');

		this.helixMaterial = new CGFappearance(this.scene);
		this.helixMaterial.setAmbient(0.3,0.3,0.3,1);
        this.helixMaterial.setDiffuse(0.1,0.1,0.1,1);
        this.helixMaterial.setSpecular(1,1,1,1);
        this.helixMaterial.setShininess(10);
        this.helixMaterial.loadTexture('images/black.png');
		this.helixMaterial.setTextureWrap('REPEAT','REPEAT');
	}

	updateHelix(angle){
		this.ang = angle;
	}

	display(){
		//Sphere
		this.scene.pushMatrix();
		this.scene.scale(0.33, 0.33, 1);
		this.sphereMaterial.apply();
		this.sphere.display();
		this.scene.popMatrix();

		//Helixes
		this.scene.pushMatrix();
		this.scene.rotate(this.ang * Math.PI/180, 0, 0, 1);
		this.scene.translate(-0.25, 0.5, -1);
		this.scene.scale(0.33, 0.33, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.helixMaterial.apply();
		this.rudder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.ang * Math.PI/180, 0, 0, 1);
		this.scene.translate(0.25, -0.5, -1);
		this.scene.scale(-0.33, -0.33, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.helixMaterial.apply();
		this.rudder.display();
		this.scene.popMatrix();
	}
}

