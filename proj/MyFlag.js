/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene);

		this.flagTex = new CGFtexture(this.scene,'images/penguin.png');
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        
        this.phase = 0;
        this.shader.setUniformsValues({phase: this.phase});
        this.shader.setUniformsValues({ flagTex: 4 });
        this.previousTime = 0;

    }

    update(t, speed){

        if (this.previousTime == 0) this.previousTime = t;
            
        this.deltaTime = (t - this.previousTime)/1000;
        this.previousTime = t;  

        this.deltaX = this.deltaTime * speed;

        this.phase += this.deltaX;
        this.shader.setUniformsValues({phase: this.phase});
    }

    display(){

        this.flagTex.bind(4);
        this.scene.setActiveShader(this.shader);

		this.scene.pushMatrix();

        //Apply texture
		this.scene.scale(3, 1.5, 1.5); //Flag Shape
        this.plane.display();

		this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
