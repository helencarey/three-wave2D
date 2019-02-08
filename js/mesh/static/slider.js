/* global THREE, sliderGroup:true, svgLoaderToMesh, scene,
materials, dim */

function createSlider() {
  sliderGroup = new THREE.Group();
  sliderGroup.name = 'sliderGroup';

  const starGroup = new THREE.Group();
  starGroup.name = 'starGroup';

  // MESHES --------------------------------------
  function createNeedle() {
    const geom = new THREE.PlaneGeometry(2, ((dim.row_H * 1.75) + 3));
    const mat = materials.filter(obj => obj.name === 'yellowMat');

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(0, 10, 1);
    mesh.name = 'needle';

    sliderGroup.add(mesh);
    createNeedleHL();
  }

  function createNeedleHL() {
    const geom = new THREE.PlaneGeometry(1, ((dim.row_H * 1.75) + 3));
    const mat = materials.filter(obj => obj.name === 'yellowHL');

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(-1, 10, 1);
    mesh.name = 'needle';

    sliderGroup.add(mesh);
  }

  function starCB() {
    const s = dim.col_W / 100; // star should be col_W * 1
    starGroup.scale.set(s, s, s);

    const xpos = dim.col_W * -0.5;
    const ypos = dim.row_H * -0.75;
    starGroup.position.set(xpos, ypos, 1);

    sliderGroup.add(starGroup);
  }


  // LOAD SVG ---------------------------
  function loadStar() {
    svgLoaderToMesh(
      'assets/svg/star.svg',
      'star', starGroup, starCB,
    );
  }

  // ---------------------------
  createNeedle();
  loadStar();

  sliderGroup.position.x = dim.defaultTargetX;
  scene.add(sliderGroup);
}
