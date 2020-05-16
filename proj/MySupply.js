const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene, coords) {
        super(scene);

        this.position = [0, 0, 0];
        this.speed = 0;
        this.state = SupplyStates.INACTIVE;

		this.previousTime = 0;

        this.face = new MyQuad(this.scene);

        this.box = new CGFappearance(this.scene);
		this.box.setAmbient(0.5,0.5,0.5,1);
        this.box.setDiffuse(0.8,0.8,0.8,1);
        this.box.setSpecular(0.1,0.1,0.1,1);
        this.box.setShininess(10);
        this.box.loadTexture('images/box.jpeg');
        this.box.setTextureWrap('REPEAT','REPEAT');
    }
	
    update(t){
        //Recalculate position according to elapsed time
        
        if(this.state == SupplyStates.FALLING){
            if (this.previousTime == 0) this.previousTime = t;
            
            this.deltaTime = (t - this.previousTime)/1000;
            this.previousTime = t;        

            this.deltaDistance = this.deltaTime * this.speed;
            this.position[1] -= this.deltaDistance;

            if(this.position[1] <= 0){
                this.position[1] = 0.05;
                this.state = SupplyStates.LANDED;
            }
        }
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);

        if(this.state == SupplyStates.FALLING)
            this.displayFalling();

        else if(this.state == SupplyStates.LANDED)
            this.displayLanded();

        this.scene.popMatrix();

    }

    displayFalling(){
        //Back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0, 1, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 0, 1, 0);
        this.scene.translate(-0.5, 0, 0.5);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.5, 0, 0.5);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();

        //Up
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0.5);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();

        //Down
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0.5, 0.5);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
    }

    displayLanded(){
        //Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
        
        //Right
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
        
        //Left
        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0.5);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
        
        //Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.5);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
        
        //Up
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2.5);
        this.scene.rotate( -Math.PI / 2, 1, 0, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
        
        //Down
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate( -Math.PI / 2, 1, 0, 0);
        this.box.apply();
        this.face.display();
        this.scene.popMatrix();
    }

    drop(dropPosition){
        this.position[0] = dropPosition[0];
        this.position[1] = 10;
        this.position[2] = dropPosition[2];
        this.speed = this.position[1] / 3;
        this.state = SupplyStates.FALLING;
    }

    reset(){
        this.position = [0,0,0];
        this.speed = 0;
        this.state = SupplyStates.INACTIVE;
        this.previousTime = 0;
        this.currentTime = 0;
        this.deltaTime = 0;
        this.deltaDistance = 0;
    }

}

