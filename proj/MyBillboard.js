/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene);
        
        this.initMaterials();
    }

    initMaterials(){
		this.greyMaterial = new CGFappearance(this.scene);
		this.greyMaterial.setAmbient(0.2,0.2,0.2,1);
        this.greyMaterial.setDiffuse(0.6,0.6,0.6,1);
        this.greyMaterial.setSpecular(0.1,0.1,0.1,1);
        this.greyMaterial.setShininess(10);
        this.greyMaterial.loadTexture('images/grey.jpg');
        this.greyMaterial.setTextureWrap('REPEAT','REPEAT');
        
        this.whiteMaterial = new CGFappearance(this.scene);
		this.whiteMaterial.setAmbient(0.5,0.5,0.5,1);
        this.whiteMaterial.setDiffuse(0.6,0.6,0.6,1);
        this.whiteMaterial.setSpecular(0.1,0.1,0.1,1);
        this.whiteMaterial.setShininess(10);
        this.whiteMaterial.loadTexture('images/white.png');
        this.whiteMaterial.setTextureWrap('REPEAT','REPEAT');
        
        this.billboardMaterial = new CGFappearance(this.scene);
		this.billboardMaterial.setAmbient(0.5,0.5,0.5,1);
        this.billboardMaterial.setDiffuse(0.8,0.8,0.8,1);
        this.billboardMaterial.setSpecular(0.1,0.1,0.1,1);
        this.billboardMaterial.setShininess(10);
        this.billboardMaterial.loadTexture('images/supplies_delivered.png');
		this.billboardMaterial.setTextureWrap('REPEAT','REPEAT');
	}
    
    display(){

        //Joists
        this.scene.pushMatrix();
        this.scene.translate(17.9, 6.75, 8.6);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.1, 1, 1);
        this.greyMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(17.9, 6.75, 8.6);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.1, -1, 1);
        this.greyMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(19.1, 6.75, 7.4);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.1, 1, 1);
        this.greyMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(19.1, 6.75, 7.4);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.1, -1, 1);
        this.greyMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        //Bases
        this.scene.pushMatrix();
        this.scene.translate(18.5, 7.75, 8);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(2, 1, 1);
        this.billboardMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(18.5, 7.75, 8);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(2, -1, 1);
        this.whiteMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();
    }
	
}