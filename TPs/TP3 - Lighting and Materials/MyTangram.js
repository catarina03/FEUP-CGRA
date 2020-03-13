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
        this.scene.materials[4].apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Orange triangle
        this.scene.pushMatrix();
        this.scene.scale(Math.sqrt(2), Math.sqrt(2), 1);
        this.scene.translate(1, -1, 0);
        this.scene.materials[5].apply();
        this.triangleOrange.display();
        this.scene.popMatrix();

        //Yellow parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2)/2, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
        this.scene.translate(-1.5, -0.5, 0);
        this.scene.materials[6].apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Red triangle
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.scene.materials[7].apply();
        this.triangleRed.display();
        this.scene.popMatrix();

        //Blue triangle
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
        this.scene.materials[8].apply();
        this.triangleBlue.display();
        this.scene.popMatrix();

        //Pink triangle
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
        this.scene.materials[9].apply();
        this.trianglePink.display();
        this.scene.popMatrix();

        //Purple triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2, 3 * Math.sqrt(2)/2, 0);
        this.scene.rotate(-45 * Math.PI / 180 , 0, 0, 1);
        this.scene.materials[10].apply();
        this.trianglePurple.display();
        this.scene.popMatrix();
    }
    updateBuffers(complexity){};
}
