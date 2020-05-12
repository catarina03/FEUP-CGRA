/**
 * MyCockpit
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCockpit extends CGFobject {
	constructor(scene) {
		super(scene);

		this.edge = new MySphere(this.scene, 16, 8);
		this.body = new MyCylinder(this.scene, 16);

		this.initMaterials();
	}

	initMaterials(){
		this.windows = new CGFappearance(this.scene);
		this.windows.setAmbient(0.7,0.7,0.7,1);
        this.windows.setDiffuse(0.6,0.6,0.6,1);
        this.windows.setSpecular(0.2,0.2,0.2,1);
        this.windows.setShininess(10);
        this.windows.loadTexture('images/cockpit_windows.png');
		this.windows.setTextureWrap('REPEAT','REPEAT');

		this.blackMaterial = new CGFappearance(this.scene);
		this.blackMaterial.setAmbient(0.2,0.2,0.2,1);
        this.blackMaterial.setDiffuse(0.6,0.6,0.6,1);
        this.blackMaterial.setSpecular(0.1,0.1,0.1,1);
        this.blackMaterial.setShininess(10);
        this.blackMaterial.loadTexture('images/black.png');
		this.blackMaterial.setTextureWrap('REPEAT','REPEAT');
	}

	display(){
		
		//Body of the cockpit
		this.scene.pushMatrix();
		this.windows.apply();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.scale(0.1, 0.5, 0.1);
		this.scene.translate(0, -0.5, 0);
		this.body.display();
		this.scene.popMatrix();

		//Front edge
		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(0, 0, 0.25);
		this.scene.scale(0.099, 0.099, 0.099);
		this.edge.display();
		this.scene.popMatrix();

		//Back edge
		this.scene.pushMatrix();
		this.blackMaterial.apply();
		this.scene.translate(0, 0, -0.25);
		this.scene.scale(0.099, 0.099, 0.099);
		this.edge.display();
		this.scene.popMatrix();

	}
}

