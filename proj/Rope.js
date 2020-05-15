/**
 * Rope
 * @constructor
 * @param scene - Reference to MyScene object
 */
class Rope extends CGFobject {
	constructor(scene) {
        super(scene);
        this.cylinder = new MyCylinder(scene, 16);

        this.ropeMaterial = new CGFappearance(this.scene);
        this.ropeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.ropeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.ropeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.ropeMaterial.setShininess(10.0);
        this.ropeMaterial.loadTexture('images/rope.jpg');
        this.ropeMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    display(){
        this.scene.pushMatrix();
        
        this.scene.translate(0, 10.4, -1.8);
        this.scene.rotate(-Math.PI / 2 , 1, 0, 0);
        this.scene.scale(0.02, 1.8, 0.02);
        this.ropeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cylinder.display();

        this.scene.popMatrix();
    }
}