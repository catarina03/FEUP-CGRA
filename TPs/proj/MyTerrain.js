/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 20);


    }
    display(){
        this.scene.pushMatrix();
        this.scene.scale(5,5,5);
        //this.scene.rotate(-90, 1, 0, 0);
        this.terrainMaterial.apply();
        this.plane.display();
        this.scene.popMatrix();
    }
}