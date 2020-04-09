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
        
        for (var i = 0; i < 6; i++) 
            this.vertices.push(Math.cos(i*ang), 1, Math.sin(i*ang));
        


        // Generating indices
        this.indices = [
            // Base de Baixo
            0, 4, 5,
            0, 1, 4,
            1, 3, 4,
            1, 2, 3,
            // Base de Cima
            11, 10, 6,
            10, 7, 6,
            10, 9, 7,
            9, 8, 7,

        ];

        for (var i = 0; i < 5; i++) 
            this.indices.push(i, i + 6, i + 7,
                              i + 7, i + 1, i);
        this.indices.push(5, 11, 6,
                           6, 0, 5)
        

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