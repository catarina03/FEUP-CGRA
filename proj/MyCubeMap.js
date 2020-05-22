/**
 * MyUnit
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            //Bottom: y = -0.5
			0.5, -0.5, 0.5,	    //0
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
            -0.5, -0.5, 0.5,	//3

            //Top: y = 0.5
            0.5, 0.5, 0.5,	    //4
			0.5, 0.5, -0.5,	    //5
			-0.5, 0.5, -0.5,	//6
            -0.5, 0.5, 0.5,	    //7
            
            //Right: x = 0.5
            0.5, -0.5, 0.5,	    //0 ou 8
			0.5, -0.5, -0.5,	//1 ou 9
			0.5, 0.5, -0.5,	    //5 ou 10
            0.5, 0.5, 0.5,	    //4 ou 11

            //Left: x = -0.5
			-0.5, -0.5, -0.5,	//2 ou 12
            -0.5, -0.5, 0.5,	//3 ou 13
            -0.5, 0.5, 0.5,	    //7 ou 14
			-0.5, 0.5, -0.5,	//6 ou 15

            //Back: 0.5
            -0.5, -0.5, 0.5,	//3 ou 16
            0.5, -0.5, 0.5,	    //0 ou 17
            0.5, 0.5, 0.5,	    //4 ou 18
            -0.5, 0.5, 0.5,	    //7 ou 19

            //Front: z = -0.5
			0.5, -0.5, -0.5,	//1 ou 20
			-0.5, -0.5, -0.5,	//2 ou 21
			-0.5, 0.5, -0.5,	//6 ouo 22
            0.5, 0.5, -0.5	    //5 ou 23
            
		];

        //Counter-clockwise reference of vertices
        
        var aux_list = [];
        this.indices = [
            //Bottom
            0, 2, 3,
            2, 0, 1,

            //Top
            4, 6, 5,
            6, 4, 7,

            //Right
            8, 10, 9,
            10, 8, 11,

            //Left
            12, 14, 13,
            14, 12, 15,

            //Back
            16, 18, 17,
            18, 16, 19,

            //Front
            20, 22, 21,
            22, 20, 23
            
        ];


        //Normals
        this.normals = [];

        for (let i = 0; i < 4; i++){
            this.normals.push(0, 1, 0);
        }
        for (let i = 0; i < 4; i++){
            this.normals.push(0, -1, 0);
        }
        for (let i = 0; i < 4; i++){
            this.normals.push(-1, 0, 0);
        }
        for (let i = 0; i < 4; i++){
            this.normals.push(1, 0, 0);
        }
        for (let i = 0; i < 4; i++){
            this.normals.push(0, 0, -1);
        }
        for (let i = 0; i < 4; i++){
            this.normals.push(0, 0, 1);
        }


        //Texture coordinates
        this.texCoords = [];

        //Bottom
        this.texCoords.push(0.49, 0.99);
        this.texCoords.push(0.49, 0.664);
        this.texCoords.push(0.26, 0.664);
        this.texCoords.push(0.26, 0.99);

        //Top
        this.texCoords.push(0.499, 0.002);
        this.texCoords.push(0.499, 0.332);
        this.texCoords.push(0.251, 0.332);
        this.texCoords.push(0.251, 0.002);
        
        //Right
        this.texCoords.push(0.75, 0.664);
        this.texCoords.push(0.5, 0.664);
        this.texCoords.push(0.5, 0.335);
        this.texCoords.push(0.75, 0.335);

        //Left
        this.texCoords.push(0.25, 0.664);
        this.texCoords.push(0.00, 0.664);
        this.texCoords.push(0.00, 0.335);
        this.texCoords.push(0.25, 0.335);

        //Back
        this.texCoords.push(1.00, 0.664);
        this.texCoords.push(0.75, 0.664);
        this.texCoords.push(0.75, 0.335);
        this.texCoords.push(1.00, 0.335);

        //Front
        this.texCoords.push(0.50, 0.664);
        this.texCoords.push(0.25, 0.664);
        this.texCoords.push(0.25, 0.335);
        this.texCoords.push(0.50, 0.335);
        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
        //this.initNormalVizBuffers();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
