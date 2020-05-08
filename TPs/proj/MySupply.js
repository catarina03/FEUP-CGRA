/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySuplly extends CGFobject {
	constructor(scene, coords) {
        super(scene);

        this.face1 = new MyQuad(this.scene);
        this.face2 = new MyQuad(this.scene);
        this.face3 = new MyQuad(this.scene);
        this.face4 = new MyQuad(this.scene);
        this.face5 = new MyQuad(this.scene);
        this.face6 = new MyQuad(this.scene);

        // Side material
        this.sideMaterial = new CGFappearance(this.scene);
        this.sideMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sideMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setShininess(10.0);
        this.sideMaterial.loadTexture('images/mineSide.png');
        this.sideMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Up material
        this.upMaterial = new CGFappearance(this.scene);
        this.upMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.upMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.upMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.upMaterial.setShininess(10.0);
        this.upMaterial.loadTexture('images/mineTop.png');
        this.upMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Down material
        this.downMaterial = new CGFappearance(this.scene);
        this.downMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.downMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.downMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.downMaterial.setShininess(10.0);
        this.downMaterial.loadTexture('images/mineBottom.png');
        this.downMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    display(){
        //Back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0, 1, 0);
        this.sideMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.face1.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 0, 1, 0);
        this.scene.translate(-0.5, 0, 0.5)
        this.face2.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.5, 0, 0.5)
        this.face3.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.face4.display();
        this.scene.popMatrix();

        //Up
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0.5)
        this.upMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);  
        this.face5.display();
        this.scene.popMatrix();

        //Down
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0.5, 0.5)
        this.downMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.face6.display();
        this.scene.popMatrix();
    }
	
	updateBuffers(complexity){};
}

