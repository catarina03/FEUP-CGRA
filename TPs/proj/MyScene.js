/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Textures
        this.earth = new CGFtexture(this, 'images/earth.jpg');
        this.test = new CGFtexture(this, 'images/test.png');
        this.cubemap = new CGFtexture(this, 'images/cubemap.png');
        this.lava = new CGFtexture(this, 'images/lava.png');


        //Material
        this.material = new CGFappearance(this);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(this.earth);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeMaterial = new CGFappearance(this);
        this.cubeMaterial.setAmbient(1, 1, 1, 1);
        this.cubeMaterial.setDiffuse(0, 0, 0, 1);
        this.cubeMaterial.setSpecular(0, 0, 0, 1);
        this.cubeMaterial.setShininess(10.0);
        this.cubeMaterial.setTexture(this.cubemap); //default
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 16);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        //this.experiment = new MySphere(this)


        // GUI
        this.displayAxis = true;
        this.displayNormals = false;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayVehicle =true;
        this.displayCube = false;
        this.displayTerrain = false;
        this.selectedTexture = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;

        this.textures = [this.test, this.cubemap, this.lava];

        this.texturesIds = {
            'Test': 0,
            'CubeMap': 1,
            'Lava': 2
        };

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.vehicle.accelerate(0.05 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            keysPressed=true;
            this.vehicle.accelerate(-0.05 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            keysPressed=true;
            this.vehicle.turn(-10);
        }

        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            keysPressed=true;
            this.vehicle.turn(10);
        }

        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset();
        }
        
        this.vehicle.update();

        if (keysPressed){
            console.log(text);
        }
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
        this.checkKeys();
    }

    updateAppliedTexture() {
        this.cubeMaterial.setTexture(this.textures[this.selectedTexture]);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        //this.lights[0].update() 
        
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere){
            this.material.apply();
            this.incompleteSphere.display();
        }
            
        //Cylinder
        if(this.displayCylinder){
            this.material.apply();
            this.cylinder.display();

            if (this.displayNormals)
                this.cylinder.enableNormalViz();
            else  this.cylinder.disableNormalViz();
        }
        

        //UnitCube
        if (this.displayCube){
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cubeMaterial.apply();
            this.cube.display();
            this.popMatrix();

            if (this.displayNormals)
                this.cube.enableNormalViz();
            else this.cube.disableNormalViz();
        }
        

        //Vehicle
        if(this.displayVehicle)
            this.vehicle.display();

        
        //Terrain
        if(this.displayTerrain){
            this.pushMatrix();
            this.translate(0,-2,0);
            this.material.apply();
            this.terrain.display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }
}