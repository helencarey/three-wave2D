/* global THREE:false,  */

// ==============================================
// synchronously makes each non-dynamic meshes and
// adds them to their proper Group and then the Scene
function makeStaticMeshes() {
  graphicsGroup = new THREE.Group();
  graphicsGroup.name = 'graphicsGroup';

  createWaveStatic(); // wavePlaceholders.js

  createFoamGroup(); //added to graphicsGroup

  createPostRight();
  createPostLeft();

  createBubBtn();

  createSlider();

  graphicsGroup.position.z = 0;
  scene.add(graphicsGroup);
} // makeStaticMeshes


// ==================================================
// CALLED FROM MAIN =====================================================
function createSceneMeshes() {
  makeMats( makeStaticMeshes );
};
