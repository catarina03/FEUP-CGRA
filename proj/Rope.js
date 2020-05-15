/**
 * Rope
 * @constructor
 * @param scene - Reference to MyScene object
 */
class Rope extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers(){
        this.vertices = [
			0, 0, 1,	//0
			0, 0, -1,	//1
			0, 0, 1,	//2
        ];
        
        this.indices = [
			0, 1, 2,
			2, 0, 1
		];

    }
}