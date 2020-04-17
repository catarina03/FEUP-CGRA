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

        // Textures
        this.earth = new CGFtexture(this, 'images/earth.jpg');
        this.cubemap = new CGFtexture(this, 'images/cubemap.png');

        //Material
        this.material = new CGFappearance(this);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(this.earth);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.material2 = new CGFappearance(this);
        this.material2.setAmbient(0.1, 0.1, 0.1, 1);
        this.material2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.setTexture(this.cubemap);
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 16);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        
        // GUI
        this.displayNormals = false;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayVehicle = false;
        this.displayCube = true;
        this.speedFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
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
            this.scale(50, 50, 50);
            this.material2.apply();
            this.cube.display();

            if (this.displayNormals)
                this.cube.enableNormalViz();
            else this.cube.disableNormalViz();
        }
        

        //Vehicle
        if(this.displayVehicle)
            this.vehicle.display();
        // ---- END Primitive drawing section
    }
}