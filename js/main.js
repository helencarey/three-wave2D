/* global document:true, window:true, THREE:false */

let dim = undefined;
let parentElement, materials;
let camera, scene, renderer; // THREE stuff

// drawing groups
let graphicsGroup, bubGroup, sliderGroup, waveGroup, pauseGroup, playGroup;
//let controls, stats, gui, axesHelper, grid; // in debug.js

// let paused = false;
let targetF3 = 1440;

var fzText = document.querySelector('#fzText');

// ==============================================
//  INIT & RENDER
// ==============================================
function init() {

  // gets size of '#webgl' DOM ele
  // updates the Dim global obj
  updateDrawingDim();


  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(dim.edgeLeft, dim.edgeRight, dim.edgeTop, dim.edgeBottom, 1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(scene.position);
  scene.add(camera);

  //in utils.js --------------------------------------
  stats = initStats();
  initAxisHelper();
  initDrawGrid();


  // INIT MESHES ---------------------------------------

  /* createSceneMeshes()
      - calls makeMats() from mats.js
      - calls makeStaticMeshes() from mesh-static.js
        - creates all static meshes in ./js/mesh/static
          and adds then to the scene
  */
  createSceneMeshes();

  makeSimpleData();

  // builds the wave geomerty. see mesh-wave.js
  createWaveMesh();

  // IGNORE
  // createConfetti();
  // createSprites();
  // createPoints();
  //createPointCloud();
  //createParticles(4, true, 0.25, true, true, 0xffffff, 0xff5588);

  // -------------------------------------------------
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(1);
  const canvas = renderer.domElement; // needs to create a DOM ele for the renderer
  canvas.id = 'lpc-canvas';
  renderer.setSize(dim.W, dim.H);
  renderer.setClearColor(0x000000, 0);
  parentElement.appendChild(canvas);

  // -------------------------------------------------
  // CONTROLS  in lib/gui.js
  initControls();
  initGUI();

  // -------------------------------------------------
  //console.log(scene.children);
  // update(renderer, scene, camera);
  animate();
} // end init
// =====================================================


const animate = function () {
  requestAnimationFrame(animate);
  render();
  // renderer.render( scene, camera );
};

// MAIN RENDER LOOP -----------------------------------
// let c = 0; // counter

function render() {
  // show/hide
  axesHelper.visible = controls.showAxes;
  grid.visible = controls.showGrid;
  staticWaveGroup.visible = controls.showStaticWave;
  staticLeftTailGroup.visible = controls.showLeftTail;
  staticRightTailGroup.visible = controls.showRightTail;
  waveGroup.children[0].visible = controls.showLiveWireframe;

  // update wave
  if (!paused) {
    makeSimpleData(); // makes new data. see mesh-wave.js
    updateWave(); // updates wave's vertices. see mesh-wave.js
  }
  // c++;

  // IGNORE
  // step += 0.001;
  // cloud.rotation.x = step;
  // cloud.rotation.z = step;
  // cloud.rotation.y = step;


  // GUI
  stats.update();

  if (sliderGroup !== undefined) {
    sliderGroup.position.x = controls.sliderPosX;
    fzText.innerHTML = Math.floor(Draw.linScale(controls.sliderPosX, dim.col_W * -3, dim.col_W * 4, 0, 4500 ));
  }

  renderer.render(scene, camera);
}


// ============================================================
// DOM HANDLERS -----------------------------------------------
function onResize() {
  console.log( 'NO RESIZING. For dev, the parent of div#webGL has a fixed width. Cam and renderer should not need to be sized, unless screen dim go below 75% of min iPad dimensions -- and if thats the case, just hit refresh.');

  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
}

// function destroy() {}


// --------------------------------------------------------------
window.onload = init();

// listen for the resize events
window.addEventListener('resize', onResize, false);

// for raycaster
//document.addEventListener('mousedown', onDocumentMouseDown, false);
//document.addEventListener('mousemove', onDocumentMouseMove, false);
