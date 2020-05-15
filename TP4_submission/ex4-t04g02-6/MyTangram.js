/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.diamond = new MyDiamond(this.scene);
        this.triangleOrange = new MyTriangle(this.scene, 'orange');
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleRed = new MyTriangleSmall(this.scene, 'red');
        this.triangleBlue = new MyTriangleBig(this.scene);
        this.trianglePink = new MyTriangle(this.scene, 'pink');
        this.trianglePurple = new MyTriangleSmall(this.scene, 'purple');

        // Full Tangram material
        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangleOrange.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleRed.enableNormalViz();
        this.triangleBlue.enableNormalViz();
        this.trianglePink.enableNormalViz();
        this.trianglePurple.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangleOrange.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleRed.disableNormalViz();
        this.triangleBlue.disableNormalViz();
        this.trianglePink.disableNormalViz();
        this.trianglePurple.disableNormalViz();
    }

    display(){

        var translation_matrix = [1, 0, 0, 0, 
                                  0, 1, 0, 0,
                                  0, 0, 1, 0, 
                                  -Math.sqrt(2)/2, -Math.sqrt(2)/2, 0, 1];

        var rotation_matrix = [Math.cos(45 *Math.PI / 180), -Math.sin(45 *Math.PI / 180), 0, 0,
            Math.sin(45 *Math.PI / 180), Math.cos(45 *Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];

        //Green Square
        this.scene.pushMatrix();
        this.scene.multMatrix(translation_matrix);
        this.scene.multMatrix(rotation_matrix);
        this.tangramMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Orange triangle
        this.scene.pushMatrix();
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.translate(1, -1, 0);
        this.tangramMaterial.apply();
        this.triangleOrange.display();
        this.scene.popMatrix();

        //Yellow parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2)/2, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
        this.scene.translate(-1.5, -0.5, 0);
        this.tangramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Red triangle
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.tangramMaterial.apply();
        this.triangleRed.display();
        this.scene.popMatrix();

        //Blue triangle
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
        this.tangramMaterial.apply();
        this.triangleBlue.display();
        this.scene.popMatrix();

        //Pink triangle
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
        this.tangramMaterial.apply();
        this.trianglePink.display();
        this.scene.popMatrix();

        //Purple triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2, 3 * Math.sqrt(2)/2, 0);
        this.scene.rotate(-45 * Math.PI / 180 , 0, 0, 1);
        this.tangramMaterial.apply();
        this.trianglePurple.display();
        this.scene.popMatrix();
    }
    updateBuffers(complexity){};
}
