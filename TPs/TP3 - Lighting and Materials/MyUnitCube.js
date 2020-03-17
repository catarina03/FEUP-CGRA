/**
 * MyUnit
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
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

            0.5, -0.5, 0.5,	    //8
			0.5, -0.5, -0.5,	//9
			-0.5, -0.5, -0.5,	//10
            -0.5, -0.5, 0.5,	//11
            0.5, 0.5, 0.5,	    //12
			0.5, 0.5, -0.5,	    //13
			-0.5, 0.5, -0.5,	//14
            -0.5, 0.5, 0.5,	    //15

            0.5, -0.5, 0.5,	    //16
			0.5, -0.5, -0.5,	//17
			-0.5, -0.5, -0.5,	//18
            -0.5, -0.5, 0.5,	//19
            0.5, 0.5, 0.5,	    //20
			0.5, 0.5, -0.5,	    //21
			-0.5, 0.5, -0.5,	//22
            -0.5, 0.5, 0.5	    //23
		];

        //Counter-clockwise reference of vertices
        
        var aux_list = [];
        this.indices = [];

        for (let i = 0; i < 4; i++){
            aux_list = [
                i, (i+1)%4, i+4,
                (i+1)%4, (i+1)%4 + 4, i+4
            ];
            for (let j = 0; j < 6; j++){
                this.indices.push(aux_list[j]);
            }
        }
        aux_list = [3, 1, 0,
                    3, 2, 1,
                    4, 6, 7,
                    4, 5, 6] //up and down vertices

        this.indices.push(...aux_list);

        this.normals = [
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1
            

        ];

        /*
        this.normals.push(1, -1, 1);
        this.normals.push(1, -1, -1);
        this.normals.push(-1, -1, -1);
        this.normals.push(-1, -1, 1);
        this.normals.push(1, 1, 1);
        this.normals.push(1, 1, -1);
        this.normals.push(-1, 1, -1);
        this.normals.push(-1, 1, 1); */
        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
