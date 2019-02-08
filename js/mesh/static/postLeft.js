/* global THREE:false, graphicsGroup:true, materials:false, dim:false, Draw:true, svgLoaderToMesh:true */

function createPostLeft() {
  const postBigGroup = new THREE.Group();
  postBigGroup.name = 'postLeftGroup';

  const ropeGroup = new THREE.Group();
  ropeGroup.name = 'ropeGroup';

  const fzSignGroup = new THREE.Group();
  fzSignGroup.name = 'fzSignGroup';

  function createRopes() {
    const ropeGroupTop = new THREE.Group();
    const r = 5;
    const h = dim.row_H * 0.09;

    function createRopeBG() {
      const w = dim.col_W * 0.78;

      let shape = new THREE.Shape();
      // roundedRect: (shape, x, y, w, h, r)
      shape = Draw.roundedRect(shape, 0, 0, w, h, r);

      const geom = new THREE.ShapeGeometry(shape);
      const mat = materials.filter(obj => obj.name === 'ropeDark');

      const rope = new THREE.Mesh(geom, mat);
      rope.position.set(0, 0, 2);

      ropeGroupTop.add(rope);
    }

    function createRopeHL() {
      const w = dim.col_W * 0.4;

      let shape = new THREE.Shape();
      shape = Draw.roundedRect(shape, 0, 0, w, h, r);
      const geom = new THREE.ShapeGeometry(shape);
      const mat = materials.filter(obj => obj.name === 'ropeLight');

      const ropeHL = new THREE.Mesh(geom, mat);
      ropeHL.position.set(0, 0, 3);

      ropeGroupTop.add(ropeHL);
    }

    createRopeBG();
    createRopeHL();

    const ropeGroupBottom = ropeGroupTop.clone();
    ropeGroupBottom.position.set(-1, -10, 0);
    ropeGroupBottom.rotation.set(0, 0, -0.1);

    ropeGroup.add(ropeGroupTop, ropeGroupBottom);

    const xpos = dim.col_W * -3.65;
    const ypos = dim.row_H * -0.4;
    const zpos = 1;
    const zrot = 0;
    ropeGroup.position.set(xpos, ypos, 0);
    ropeGroup.rotation.set(0, 0, -0.1);

    graphicsGroup.add(ropeGroup);

    //addPostBigGroup();
  } // end create_ropes()


  // MAIN MESH CALLBACK ---------------------------
  function postBigCB() {
    const s = 0.75;
    postBigGroup.scale.set(s, s, s);

    const xpos = (dim.col_W * -3.75) - 4;
    const ypos = (dim.row_H * 0.5);
    const zpos = 1;
    const zrot = 0;
    postBigGroup.position.set(xpos, ypos, zpos);
    postBigGroup.rotation.set(0, 0, zrot);

    graphicsGroup.add(postBigGroup);

    createRopes();
  }

  function fzSignCB() {
    const s = 0.75;
    fzSignGroup.scale.set(s, s, s);

    const xpos = dim.col_W * -3.8;
    const ypos = dim.row_H * 0.23;
    const zpos = 1;
    const zrot = 0;
    fzSignGroup.position.set(xpos, ypos, zpos);
    fzSignGroup.rotation.set(0, 0, zrot);

    graphicsGroup.add(fzSignGroup);
  }

  // LOAD SVG ---------------------------
  function loadPostBig() {
    svgLoaderToMesh(
      'assets/svg/quest/postBig.svg',
      'postBig', postBigGroup, postBigCB,
    );
  }

  function loadFzSign() {
    svgLoaderToMesh(
      'assets/svg/quest/fzSign.svg',
      'fzSign', fzSignGroup, fzSignCB,
    );
  }

  // ----------------------------------------
  //createPost();
  loadPostBig();
  loadFzSign();
}
