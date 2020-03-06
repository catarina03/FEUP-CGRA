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
            -0.5, 0.5, 0.5	    //7
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
        
        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
