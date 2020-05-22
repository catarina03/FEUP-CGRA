/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        //Sphere
        var sphere = this.gui.addFolder('Sphere')
        sphere.add(this.scene, 'displaySphere').name("Display sphere");

        //Cylinder
        var cylinder = this.gui.addFolder('Cylinder')
        cylinder.add(this.scene, 'displayCylinder').name("Display cylinder");
        cylinder.add(this.scene, 'displayNormalsCube').name("Display normals");

        //Cubemap
        var cubemap = this.gui.addFolder('CubeMap');
        cubemap.add(this.scene, 'selectedTexture', this.scene.texturesIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
        cubemap.add(this.scene, 'displayCube').name("Display cube map");
        cubemap.add(this.scene, 'displayNormalsCube').name("Display normals");
        
        //Vehicle
        var vehicle = this.gui.addFolder('Vehicle');
        vehicle.add(this.scene, 'displayVehicle').name("Display vehicle");
        vehicle.add(this.scene, 'displaySupplies').name("Display Supplies");
        vehicle.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        //Terrain
        var terrain = this.gui.addFolder('Terrain');
        terrain.add(this.scene, 'displayTerrain').name("Display terrain");
        terrain.add(this.scene, 'displayBillboard').name("Display Billboard");

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}