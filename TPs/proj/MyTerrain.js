/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(this.scene, 20);

        this.terrainTex = new CGFtexture(this.scene,'images/terrainTex.jpg');
        this.terrainMap = new CGFtexture(this.scene,'images/terrainMap.jpg');
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        
        this.shader.setUniformsValues({ terrainTex: 2 });
        this.shader.setUniformsValues({ terrainMap: 3 });

    }
    display(){
        
        this.terrainTex.bind(2);
        this.terrainMap.bind(3);

        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}