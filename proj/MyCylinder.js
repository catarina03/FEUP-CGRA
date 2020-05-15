/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.initBuffers(slices);
    }

    initBuffers(slices) {
        
        // Vertices
        this.vertices = [];
        var ang = 360/slices;
        ang = ang * Math.PI / 180;

        for (var i = 0; i < slices; i++) 
            this.vertices.push(Math.cos(i*ang), 0,Math.sin(i*ang));
        this.vertices.push(1, 0, 0);   //Repetir primeiros vertices para a textura
        
        for (var i = 0; i < slices; i++) 
            this.vertices.push(Math.cos(i*ang), 1, Math.sin(i*ang));
        this.vertices.push(1, 1, 0);  //Repetir primeiros vertices para a textura

        // Indices
        this.indices = [];

        for (var i = 0; i < slices; i++) 
            this.indices.push(i, i + slices+1, i + slices+2,
                              i + slices+2, i + 1, i);
        
        // Normals
        this.normals = [];

        for (var i = 0; i < slices; i++) 
            this.normals.push(Math.cos(i*ang), 0, Math.sin(i*ang));
        this.normals.push(1, 0, 0); 
        
        for (var i = 0; i < slices; i++)
            this.normals.push(Math.cos(i*ang), 0, Math.sin(i*ang));
        this.normals.push(1, 0, 0);

        // Tex
        var aux = 1/slices;

        this.texCoords = [];

        for (var i = 0; i < slices; i++)
            this.texCoords.push(1-i*aux, 1);
        this.texCoords.push(0, 1);
        for (var i = 0; i < slices; i++)
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