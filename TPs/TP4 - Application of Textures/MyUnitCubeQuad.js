/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, coords) {
        super(scene);

        this.face1 = new MyQuad(this.scene);
        this.face2 = new MyQuad(this.scene);
        this.face3 = new MyQuad(this.scene);
        this.face4 = new MyQuad(this.scene);
        this.face5 = new MyQuad(this.scene);
        this.face6 = new MyQuad(this.scene);

    }
    display(){
        //Back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0, 1, 0);
        this.face1.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.face2.display();
        this.scene.popMatrix();

        //Down
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0.5, 0.5)
        this.face3.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 0, 1, 0);
        this.scene.translate(-0.5, 0, 0.5)
        this.face4.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.5, 0, 0.5)
        this.face5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0.5)
        this.face6.display();
        this.scene.popMatrix();
    }
	
	updateBuffers(complexity){};
}

