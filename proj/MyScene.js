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
        this.night = new CGFtexture(this, 'images/night.png');


        //Material
        this.material = new CGFappearance(this);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(this.earth);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.cubeMaterial = new CGFappearance(this);
        this.cubeMaterial.setAmbient(0.7, 0.7, 0.7, 1);
        this.cubeMaterial.setDiffuse(0, 0, 0, 1);
        this.cubeMaterial.setSpecular(0, 0, 0, 1);
        this.cubeMaterial.setShininess(10.0);
        this.cubeMaterial.setEmission(0.7, 0.7, 0.7, 1);
        this.cubeMaterial.setTexture(this.night); //default
        this.cubeMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 16);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);

        this.nSuppliesDelivered = 0;
        this.supplies = [];
        for(var i = 0; i < 5; i++){
            this.supplies.push(new MySupply(this));
        }

        // GUI
        this.displayAxis = true;
        this.displayNormalsCube = false;
        this.displayNormalsCylinder = false;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayVehicle =true;
        this.displayCube = true;
        this.displayTerrain = true;
        this.displayBillboard = true;
        this.displaySupplies = true;
        this.selectedTexture = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.zoom = 1;

        this.textures = [this.night, this.cubemap, this.test, this.lava];

        this.texturesIds = {
            'Night': 0,
            'CubeMap': 1,
            'Test': 2,
            'Lava': 3
        };

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.8, 0.1, 300, vec3.fromValues(27, 15, 15), vec3.fromValues(0, 7, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setGlobalAmbientLight(0.1, 0.1, 0.1, 1);
        this.setShininess(10.0);
    }
    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            if (!this.vehicle.autoPilot)
                this.vehicle.accelerate(0.05 );
        }

        if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            keysPressed=true;
            if (!this.vehicle.autoPilot)
                this.vehicle.accelerate(-0.05);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            keysPressed=true;
            if (!this.vehicle.autoPilot)
                this.vehicle.turn(-10);
        }

        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            keysPressed=true;
            if (!this.vehicle.autoPilot)
                this.vehicle.turn(10);
        }

        if (this.gui.isKeyPressed("KeyP")){
            text+=" P ";
            keysPressed=true;
            if (!this.vehicle.autoPilot)
                this.vehicle.startAutoPilot();
            else
                this.vehicle.stopAutoPilot();
        }

        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset();

            for(var i = 0; i < 5; i++)
                this.supplies[i].reset();
            
            this.nSuppliesDelivered = 0;
            this.billboard.update(this.nSuppliesDelivered);
        }

        if (this.gui.isKeyPressed("KeyL")){
            text+=" L ";
            keysPressed=true;
            if(this.nSuppliesDelivered < 5){
                this.supplies[this.nSuppliesDelivered].drop(this.vehicle.getPosition()); 
                this.supplies[this.nSuppliesDelivered].counter = this.nSuppliesDelivered;
                this.nSuppliesDelivered++;
                this.billboard.update(this.nSuppliesDelivered);
            }
        }

        if (keysPressed){
            console.log(text);
        }	
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        if(this.displayVehicle){
            this.checkKeys();
            this.vehicle.update(t, this.speedFactor);
            for(var i = 0; i < 5; i++)
                this.supplies[i].update(t);
        }
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

        this.scale(this.zoom, this.zoom, this.zoom);

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();


        // ---- BEGIN Primitive drawing section

        //Vehicle
        if(this.displayVehicle){
            this.vehicle.display();
            if(this.displaySupplies)
                for(var i = 0; i < 5; i++)
                    this.supplies[i].display();
        }
        
        //Terrain
        if(this.displayTerrain){

            //Billboard
            if(this.displayBillboard)
                this.billboard.display();       

            this.terrain.display();
        }

        //Sphere
        if(this.displaySphere){
            this.material.apply();
            this.incompleteSphere.display();
        }
            
        //Cylinder
        if(this.displayCylinder){
            this.material.apply();
            this.cylinder.display();

            if (this.displayNormalsCylinder)
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

            if (this.displayNormalsCube)
                this.cube.enableNormalViz();
            else this.cube.disableNormalViz();
        }
        
        // ---- END Primitive drawing section

        
    }
}