/* global document:true, Stats:false */

/** -------------------------------------------------------
Initialize the global stats dom ele
* @param {Number} type   0: fps, 1: ms, 2: mb, 3+: custom
* @returns {Object} stats
*/
function initStats(type) {
  const panelType = (typeof type !== 'undefined' && type)
      && (!Number.isNaN(type)) ? parseInt(type, 10) : 0;

  const stats = new Stats();
  stats.showPanel(panelType);

  document.body.appendChild(stats.dom);

  return stats;
}

function initAxisHelper() {
  axesHelper = new THREE.AxesHelper( dim.col_W * 2 );
  axesHelper.visible = true;
  scene.add( axesHelper );
}

function initDrawGrid() {
  grid = new THREE.Group();
  grid.name = "grid";
  grid.visible = false;

  let c = new THREE.Color( 0xff00ff ) //0x000000
  let gridMat = new THREE.LineBasicMaterial( { color: c, transparent: true, opacity: 0.5} );

  function makeVLines(xpos) {
    let geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(
      xpos, dim.edgeBottom, 0 ));

    geom.vertices.push(new THREE.Vector3(
      xpos, dim.edgeTop, 0) );

    let line = new THREE.Line( geom, gridMat );
    grid.add(line);
  }

  function makeHLines(ypos) {
    let geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(
      dim.edgeLeft, ypos, 0 ));

    geom.vertices.push(new THREE.Vector3(
      dim.edgeRight, ypos, 0) );

    let line = new THREE.Line( geom, gridMat );
    grid.add(line);
  }

  for ( let i = 1; i < 12; i++ ) {
    let xpos = dim.edgeLeft + (dim.col_W * i);
    makeVLines(xpos);
  }
  for ( let i = 0; i < 6; i++ ) {
    let ypos = dim.edgeBottom + (dim.row_H * i);
    makeHLines(ypos);
  }
  grid.position.z = -1;
  scene.add(grid);
}


// =================================================
// DAT GUI & CONTROLLER

let controls, stats, gui, axesHelper, grid;
let paused = false;
let showOnlyWebGL = false;
let staticWaveGroup, staticLeftTailGroup, staticRightTailGroup;



function initControls() {

  controls = {};

  controls.sliderPosX = dim.defaultTargetX;

  controls.pressReset = function() {
    controls.sliderPosX = dim.defaultTargetX;
  }

  controls.pressPause = () => {
    console.log('Wave is PAUSED');
    pauseGroup.visible = false;
    playGroup.visible = true;
    paused = true;
  };

  controls.pressPlay = () => {
    console.log('playing');
    playGroup.visible = false;
    pauseGroup.visible = true;
    paused = false;
  };

  // ---------------------------------------------
  controls.showLiveWireframe = false;
  // TODO: show/hide wave mesh wireframe
  // TODO show/hide dynamic foam
  controls.showStaticWave = false;
  controls.showLeftTail = false;
  controls.showRightTail = false;

  // ----------------------------------------------
  //TODO: add visibility to to render loop
  // controls.showOnlyWebGL = false;

  controls.showAxes = false;

  controls.showGrid = false;

  controls.consoleLogScene = () => {
    console.log(scene.children);
  };

  return controls
}

// ----------------------------------
function initGUI() {
  gui = new dat.GUI();
  //gui.open();

  tFolder = gui.addFolder("Simulate Touch Controls");
  //tFolder.open();

  if (sliderGroup !== undefined) {
    let sliderLow = dim.wave.edgeLeft + (dim.col_W);
    let sliderHigh = dim.wave.edgeRight - (dim.col_W);
    tFolder.add( controls, 'sliderPosX', sliderLow, sliderHigh );
    tFolder.add( controls, 'pressReset');
  }

  // TODO: if wave
  tFolder.add( controls, 'pressPause');
  tFolder.add( controls, 'pressPlay');


  // --------------------------------
  wFolder = gui.addFolder("Wave Builder");
  wFolder.close();

  wFolder.add( controls, 'showLiveWireframe');
  wFolder.add( controls, 'showStaticWave');
  wFolder.add( controls, 'showLeftTail');
  wFolder.add( controls, 'showRightTail');


  // --------------------------------
  dbFolder = gui.addFolder("Grids & Debugging");
  dbFolder.close();

  // dbFolder.add( controls, 'showOnlyWebGL');
  dbFolder.add( controls, 'showAxes');
  dbFolder.add( controls, 'showGrid');
  dbFolder.add( controls, 'consoleLogScene');

  return gui
}
