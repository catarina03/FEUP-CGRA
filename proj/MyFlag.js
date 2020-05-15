/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);

		this.plane = new MyPlane(scene);

		//this.flagTex = new CGFtexture(this.scene,'images/flag.jpg');
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        
        this.shader.setUniformsValues({ flagTex: 4 });

    }

    update(t){

    }

    display(){
		this.scene.pushMatrix();


        //Apply texture
		this.scene.scale(2, 1, 1); //Flag Shape
        this.plane.display();

		this.scene.popMatrix();

    }
}
