/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 20);

        // Full Terrain material
        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.terrainMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setShininess(10.0);
        this.terrainMaterial.loadTexture('images/terrain.jpg');
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');

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