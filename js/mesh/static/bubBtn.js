/* global THREE, bubGroup:true, pauseGroup:true, playGroup:true, svgLoaderToMesh, scene, materials, dim */

function createBubBtn() {
  bubGroup = new THREE.Group();
  bubGroup.name = 'bubGroup';

  function createBubs() {
    const seg = 32;

    function createBubShad() {
      const r = dim.col_W * 0.28;

      const geom = new THREE.CircleGeometry(r, seg);
      const mat = materials.filter(obj => obj.name === 'bubShad');

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(2, -2, 0);
      mesh.name = 'bubShad';

      bubGroup.add(mesh);
      createBubBg();
    }

    function createBubBg() {
      const r = dim.col_W * 0.28;

      const geom = new THREE.CircleGeometry(r, seg);
      const mat = materials.filter(obj => obj.name === 'bubBg');

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(0, 0, 1);
      mesh.name = 'bubBg';

      bubGroup.add(mesh);
      createBubHl();
    }

    function createBubHl() {
      const r = dim.col_W * 0.08;

      const geom = new THREE.CircleGeometry(r, seg);

      const mat = materials.filter(obj => obj.name === 'whiteMat');
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(-5, 7, 2);
      mesh.name = 'bubHl';

      bubGroup.add(mesh);
    }

    createBubShad();
    createBubBg();
    createBubHl();

    bubGroup.position.set(dim.col_W * 3.25, ((dim.row_H * 1) + 4), 4);
  } // end createBubs

  function createPauseBtn() {
    pauseGroup = new THREE.Group();
    const s = 0.28; // scale factor

    const pauseIcon = svgLoaderToMesh(
      'assets/svg/pauseIcon.svg',
      'pauseIcon', pauseGroup,
    );

    pauseGroup.scale.set(s, s, s);
    pauseGroup.position.set(-9.5, 9, 3);
    pauseGroup.visible = true;

    bubGroup.add(pauseGroup);
  } // createPauseBtn()

  function createPlayBtn() {
    playGroup = new THREE.Group();
    const s = 0.3; // scale factor

    const playBG = svgLoaderToMesh(
      'assets/svg/playIcon.svg',
      'playIcon', playGroup,
    );

    playGroup.scale.set(s, s, s);
    playGroup.position.set(-9, 10, 2);
    playGroup.visible = false;

    bubGroup.add(playGroup);
  } // createPlayBtn()

  // ---------------------------
  createBubs();
  createPauseBtn();
  createPlayBtn();

  scene.add(bubGroup);
} // end createBubBtn()
