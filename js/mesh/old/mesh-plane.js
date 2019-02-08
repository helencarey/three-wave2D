
function create_planeMesh() {
  let mat = materials.filter( obj => { return obj.name === "blueMat"} );
  let wireMat = materials.filter( obj => { return obj.name === "peakMat"} );

  // DEBUG ==================================================================
  // setup the control parts of the ui
  var controls = new function () {
    var self = this;

    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.planeGeometry = new THREE.PlaneGeometry(20,20,4,4);
    this.width = this.planeGeometry.parameters.width;
    this.height = this.planeGeometry.parameters.height;
    this.widthSegments = this.planeGeometry.parameters.widthSegments;
    this.heightSegments = this.planeGeometry.parameters.heightSegments;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function() {
        return new THREE.PlaneGeometry(controls.width, controls.height, Math.round(controls.widthSegments), Math.round(controls.heightSegments));
      });
    };
  };


}

function update_planeMesh() {}
