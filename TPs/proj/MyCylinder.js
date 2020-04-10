/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCylinder extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        
        // Vertices
        this.vertices = [];
        var ang = 360/6;
        ang = ang * Math.PI / 180;

        for (var i = 0; i < 6; i++) 
            this.vertices.push(Math.cos(i*ang), 0,Math.sin(i*ang));
        this.vertices.push(1, 0, 0);   //Repetir primeiros vertices para a textura
        
        for (var i = 0; i < 6; i++) 
            this.vertices.push(Math.cos(i*ang), 1, Math.sin(i*ang));
        this.vertices.push(1, 1, 0);  //Repetir primeiros vertices para a textura

        // Indices
        this.indices = [];

        for (var i = 0; i < 6; i++) 
            this.indices.push(i, i + 7, i + 8,
                              i + 8, i + 1, i);
        
        // Normals
        this.normals = [];

        for (var i = 0; i < 6; i++) 
            this.normals.push(Math.cos(i*ang), 0, Math.sin(i*ang));
        this.normals.push(1, 0, 0); 
        
        for (var i = 0; i < 6; i++)
            this.normals.push(Math.cos(i*ang), 0, Math.sin(i*ang));
        this.normals.push(1, 0, 0);

        // Tex
        var aux = 1/6;

        this.texCoords = [];

        for (var i = 0; i < 6; i++)
            this.texCoords.push(1-i*aux, 1);
        this.texCoords.push(0, 1);
        for (var i = 0; i < 6; i++)
            this.texCoords.push(1-i*aux, 0);
        this.texCoords.push(0, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    display() {
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}