/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene, 64);
        this.back = new MyPlane(scene, 64 );

        this.penguin = new CGFtexture(this.scene,'images/penguin.png');
        this.feup = new CGFtexture(this.scene,'images/feup_logo.jpg');
        this.selectedFlagTexture = 0;
        this.flagTextures = [this.penguin, this.feup]; 
        this.texturesFlagIds = {
            'Penguin': 0,
            'FEUP': 1
        }

        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shaderInv = new CGFshader(this.scene.gl, "shaders/flagInv.vert", "shaders/flag.frag");

        this.phase = 0;
        
        this.shader.setUniformsValues({phase: this.phase});
        this.shader.setUniformsValues({ flagTex: 4 });
        
        this.shaderInv.setUniformsValues({phase: this.phase});
        this.shaderInv.setUniformsValues({ flagTex: 4 });
        
        this.previousTime = 0;
    }

    update(t, speed){
        if (this.previousTime == 0) this.previousTime = t;
        this.deltaTime = (t - this.previousTime)/1000;
        this.previousTime = t;  

        this.deltaX = 5.0* this.deltaTime * (speed * 10 + 2.0);
        this.phase += this.deltaX/2;
        
        this.shader.setUniformsValues({phase: this.phase});
        this.shaderInv.setUniformsValues({phase: this.phase});

    }

    display(){

        this.flagTextures[this.selectedFlagTexture].bind(4);
        this.scene.setActiveShader(this.shader);

		this.scene.pushMatrix();
		this.scene.scale(2, 1, 1); //Flag Shape
        this.plane.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shaderInv);
        this.scene.scale(2, 1, 1); //Flag Shape
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.back.display();
		this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}
