/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene);

		//this.initBuffers();
    }
    
    display(){

        //Joists
        this.scene.pushMatrix();
        this.scene.translate(-6, 0.5, 0);
        this.scene.scale(0.2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4, 0.5, 0);
        this.scene.scale(0.2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();

        //Bases
        this.scene.pushMatrix();
        this.scene.translate(-5, 1.5, 0);
        this.scene.scale(2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();
    }
	
}