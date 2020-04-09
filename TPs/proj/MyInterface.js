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

        this.gui.add(this.scene, 'displayNormals').name("Display normals");
        this.gui.add(this.scene, 'displaySphere').name("Display sphere");
        this.gui.add(this.scene, 'displayCylinder').name("Display cylinder");
        this.gui.add(this.scene, 'displayVehicle').name("Display vehicle");

        return true;
    }
}