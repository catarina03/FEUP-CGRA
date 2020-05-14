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

        this.face1 = new MyQuad(this.scene);
        this.face2 = new MyQuad(this.scene);
        this.face3 = new MyQuad(this.scene);
        this.face4 = new MyQuad(this.scene);
        this.face5 = new MyQuad(this.scene);
        this.face6 = new MyQuad(this.scene);
    }
	
    update(t){
        //Recalculate position according to elapsed time
        
        if(this.state == SupplyStates.FALLING){
            if (this.previousTime == 0) this.previousTime = t;
            
            this.deltaTime = (t - this.previousTime)/1000;
            this.previousTime = t;        

            this.deltaDistance = this.deltaTime * this.speed;
            this.position[1] -= this.deltaDistance;

            if(this.position[1] <= 0.35){
                this.position[1] == 0.35;
                this.state = SupplyStates.LANDED;
            }
        }
    }

    display(){

        if(this.state == SupplyStates.FALLING){
            
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2]);

            this.displayFalling();

            this.scene.popMatrix();
        }

        else if(this.state == SupplyStates.LANDED){
            this.displayLanded();
        }
    }

    displayFalling(){
        //Back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0, 1, 0);
        this.face1.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 0, 1, 0);
        this.scene.translate(-0.5, 0, 0.5)
        this.face2.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.5, 0, 0.5)
        this.face3.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.face4.display();
        this.scene.popMatrix();

        //Up
        this.scene.pushMatrix();
        this.scene.rotate( -Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0.5)
        this.face5.display();
        this.scene.popMatrix();

        //Down
        this.scene.pushMatrix();
        this.scene.rotate( Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0.5, 0.5)
        this.face6.display();
        this.scene.popMatrix();
    }

    displayLanded(){}

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

