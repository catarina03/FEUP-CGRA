/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(this.scene, 20);
        this.terrainTex = new CGFtexture(this.scene,'images/terrain.jpg');
        this.terrainMap = new CGFtexture(this.scene,'images/heightmap.jpg');
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        
        this.shader.setUniformsValues({ terrainTex: 2 });
        this.shader.setUniformsValues({ terrainMap: 3 });

    }
    display(){
        this.terrainTex.bind(2);
        this.terrainMap.bind(3);

        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();
        this.scene.rotate(3 * Math.PI/2, 1, 0, 0);
        this.scene.scale(50,50,1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}