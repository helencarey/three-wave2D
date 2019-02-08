/* global THREE, graphicsGroup:true, svgLoaderToMesh, dim */

function createFoamGroup() {
  const foamGroup = new THREE.Group();
  foamGroup.name = 'foamGroup';

  // MESH CALLBACK ---------------------------
  function foamBaseCB() {
    const s = 0.75;
    foamGroup.scale.set(s, s, s);

    const xpos = (dim.col_W * -5) - 10;
    const ypos = (dim.row_H * -0.75) + 2;
    const zpos = 0;
    foamGroup.position.set(xpos, ypos, zpos);

    foamGroup.children.forEach((i) => {
      i.material.transparent = true;
      i.material.opacity = 0.75;
    });

    graphicsGroup.add(foamGroup);
  }

  // LOAD SVG ---------------------------
  function loadFoamBase() {
    svgLoaderToMesh(
      'assets/svg/foamBase.svg',
      'foamBase', foamGroup, foamBaseCB,
    );
  }

  loadFoamBase();
}
