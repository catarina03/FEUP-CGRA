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
			0.5, -0.5, 0.5,	    //0
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
            -0.5, -0.5, 0.5,	//3
            0.5, 0.5, 0.5,	    //4
			0.5, 0.5, -0.5,	    //5
			-0.5, 0.5, -0.5,	//6
            -0.5, 0.5, 0.5,	    //7

            0.5, -0.5, 0.5,	    //0
			0.5, -0.5, -0.5,	//1
			0.5, 0.5, -0.5,	    //5
            0.5, 0.5, 0.5,	    //4
			-0.5, -0.5, -0.5,	//2
            -0.5, -0.5, 0.5,	//3
            -0.5, 0.5, 0.5,	    //7
			-0.5, 0.5, -0.5,	//6

            -0.5, -0.5, 0.5,	//3
            0.5, -0.5, 0.5,	    //0
            0.5, 0.5, 0.5,	    //4
            -0.5, 0.5, 0.5,	    //7
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
			-0.5, 0.5, -0.5,	//6
			0.5, 0.5, -0.5	    //5
		];

        //Counter-clockwise reference of vertices
        
        var aux_list = [];
        this.indices = [];

        for (let i = 0; i < 4; i++){
            aux_list = [
                i+4, (i+1)%4, i,
                i+4, (i+1)%4 + 4, (i+1)%4
            ];
            for (let j = 0; j < 6; j++){
                this.indices.push(aux_list[j]);
            }
        }
        aux_list = [0, 1, 3,
                    1, 2, 3,

                    7, 6, 4,
                    6, 5, 4] //up and down vertices

        this.indices.push(...aux_list);


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
        this.texCoords.push(0.25, 1);
        this.texCoords.push(0.5, 1);
        this.texCoords.push(0.5, 0.66);
        this.texCoords.push(0.25, 0.66);

        //Top
        this.texCoords.push(0.25, 0.33);
        this.texCoords.push(0.5, 0.33);
        this.texCoords.push(0.5, 0);
        this.texCoords.push(0.25, 0);
        
        //Right
        this.texCoords.push(0.75, 0.66);
        this.texCoords.push(0.5, 0.66);
        this.texCoords.push(0.5, 0.33);
        this.texCoords.push(0.75, 0.33);

        //Left
        this.texCoords.push(0, 0.66);
        this.texCoords.push(0.25, 0.66);
        this.texCoords.push(0.25, 0.33);
        this.texCoords.push(0, 0.33);

        //Back
        this.texCoords.push(0.75, 0.66);
        this.texCoords.push(1, 0.66);
        this.texCoords.push(1, 0.33);
        this.texCoords.push(0.75, 0.33);

        //Front
        this.texCoords.push(0.5, 0.33);
        this.texCoords.push(0.5, 0.66);
        this.texCoords.push(0.25, 0.66);
        this.texCoords.push(0.25, 0.33);

        
        

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
