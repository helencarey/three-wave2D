/* global THREE:false, graphicsGroup:true, dim:false, svgLoaderToMesh:true */

function createPostRight() {
  const s = 0.75;

  const postRightGroup = new THREE.Group(); // parent group
  postRightGroup.name = 'postRightGroup';

  const postSmallGroup = new THREE.Group(); // 3 mesh
  postSmallGroup.name = 'postSmallGroup';

  const resetBtnGroup = new THREE.Group(); // 5 mesh
  resetBtnGroup.name = 'resetBtnGroup';

  // MESH CALLBACKS ---------------------------
  function postSmallCB() {
    postSmallGroup.scale.set(s, s, s);

    const xpos = dim.col_W * 3.9;
    const ypos = dim.row_H * -0.25;
    const zpos = 1;
    const zrot = -0.09;
    postSmallGroup.position.set(xpos, ypos, zpos);
    postSmallGroup.rotation.set(0, 0, zrot);
  }

  function resetBtnCB() {
    resetBtnGroup.scale.set(s, s, s);

    const xpos = dim.col_W * 3.46;
    const ypos = dim.row_H * -0.365;
    const zpos = 1;
    const zrot = -0.09;
    resetBtnGroup.position.set(xpos, ypos, zpos);
    resetBtnGroup.rotation.set(0, 0, zrot);
  }

  // LOAD SVG ---------------------------
  function loadPostSmall() {
    svgLoaderToMesh(
      'assets/svg/quest/postSmall.svg',
      'postSmall',
      postSmallGroup, postSmallCB,
    );
  }
  function loadresetBtn() {
    svgLoaderToMesh(
      'assets/svg/quest/signWood.svg',
      'resetBtn', resetBtnGroup,
      resetBtnCB,
    );
  }

  loadPostSmall();
  loadresetBtn();

  postRightGroup.add(postSmallGroup, resetBtnGroup);

  graphicsGroup.add(postRightGroup);
}
