/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.diamond = new MyDiamond(this.scene);
        this.triangleOrange = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleRed = new MyTriangleSmall(this.scene);
        this.triangleBlue = new MyTriangleBig(this.scene);
        this.trianglePink = new MyTriangle(this.scene);
        this.trianglePurple = new MyTriangleSmall(this.scene);

        // Full Tangram material
        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Green (specular)
        /*
        this.material5 = new CGFappearance(this.scene);
        this.material5.setAmbient(0, 1, 0, 1.0);
        this.material5.setDiffuse(0, 1, 0, 1.0);
        this.material5.setSpecular(1, 1, 1, 0);
        this.material5.setShininess(10.0);
        */

        // Orange (specular)
        this.material6 = new CGFappearance(this.scene);
        this.material6.setAmbient(1, 155/255, 0, 1.0);
        this.material6.setDiffuse(1, 155/255, 0, 1.0);
        this.material6.setSpecular(1, 1, 1, 0);
        this.material6.setShininess(10.0);

        // Yellow (specular)
        this.material7 = new CGFappearance(this.scene);
        this.material7.setAmbient(1, 1, 0, 1.0);
        this.material7.setDiffuse(1, 1, 0, 1.0);
        this.material7.setSpecular(1, 1, 1, 0);
        this.material7.setShininess(10.0);

        // Red (specular)
        this.material8 = new CGFappearance(this.scene);
        this.material8.setAmbient(1, 27/255, 27/255, 1.0);
        this.material8.setDiffuse(1, 27/255, 27/255, 1.0);
        this.material8.setSpecular(1, 1, 1, 0);
        this.material8.setShininess(10.0);

        // Blue (specular)
        this.material9 = new CGFappearance(this.scene);
        this.material9.setAmbient(0, 155/255, 1, 1.0);
        this.material9.setDiffuse(0, 155/255, 1, 1.0);
        this.material9.setSpecular(1, 1, 1, 0);
        this.material9.setShininess(10.0);

        // Pink (specular)
        this.material10 = new CGFappearance(this.scene);
        this.material10.setAmbient(1, 155/255, 207/255, 1.0);
        this.material10.setDiffuse(1, 155/255, 207/255, 1.0);
        this.material10.setSpecular(1, 1, 1, 0);
        this.material10.setShininess(10.0);

        // Purple (specular)
        this.material11 = new CGFappearance(this.scene);
        this.material11.setAmbient(150/255, 80/255, 190/255, 1.0);
        this.material11.setDiffuse(150/255, 80/255, 190/255, 1.0);
        this.material11.setSpecular(1, 1, 1, 0);
        this.material11.setShininess(10.0);


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
        this.material6.apply();
        this.triangleOrange.display();
        this.scene.popMatrix();

        //Yellow parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2)/2, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
        this.scene.translate(-1.5, -0.5, 0);
        this.material7.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Red triangle
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.material8.apply();
        this.triangleRed.display();
        this.scene.popMatrix();

        //Blue triangle
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
        this.material9.apply();
        this.triangleBlue.display();
        this.scene.popMatrix();

        //Pink triangle
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
        this.material10.apply();
        this.trianglePink.display();
        this.scene.popMatrix();

        //Purple triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2, 3 * Math.sqrt(2)/2, 0);
        this.scene.rotate(-45 * Math.PI / 180 , 0, 0, 1);
        this.material11.apply();
        this.trianglePurple.display();
        this.scene.popMatrix();
    }
    updateBuffers(complexity){};
}
