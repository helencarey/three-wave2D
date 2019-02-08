/* global THREE, svgLoaderToMesh, scene, dim, wavePlaceholderGroup:true, staticWaveGroup:true, staticLeftTailGroup:true, staticRightTailGroup:true */


// Each of these placeholders are only 1 path. so they can be accessed via 'getObjectByName,' which only returns the 1st child obj w/ a matching name.

function createWaveStatic() {
  wavePlaceholderGroup = new THREE.Group();
  wavePlaceholderGroup.name = 'wavePlaceholderGroup';

  staticWaveGroup = new THREE.Group();
  staticWaveGroup.name = 'staticWaveGroup';

  staticLeftTailGroup = new THREE.Group();
  staticLeftTailGroup.name = 'staticLeftTailGroup';

  staticRightTailGroup = new THREE.Group();
  staticRightTailGroup.name = 'staticRightTailGroup';

  const s = 0.75; // web scale factor

  function waveCB() {
    const staticWaveMesh = wavePlaceholderGroup.getObjectByName('staticWaveMesh');

    staticWaveMesh.scale.set(s, s, s);

    const xpos = dim.col_W * -3;
    const ypos = 0;
    staticWaveMesh.position.set(xpos, ypos, 0);

    staticWaveGroup.add(staticWaveMesh);
    scene.add(staticWaveGroup);
  }

  function leftTailCB() {
    const lTailMesh = wavePlaceholderGroup.getObjectByName('leftTailPlaceholder');

    lTailMesh.scale.set(s, s, s);

    const xpos = dim.col_W * -6;
    const ypos = 0;
    lTailMesh.position.set(xpos, ypos, 0);

    staticLeftTailGroup.add(lTailMesh);
    scene.add(staticLeftTailGroup);
  }

  function rightTailCB() {
    const rTailMesh = wavePlaceholderGroup.getObjectByName('rightTailPlaceholder');

    rTailMesh.scale.set(s, s, s);

    const xpos = dim.col_W * 4;
    const ypos = -2;
    rTailMesh.position.set(xpos, ypos, 0);

    staticRightTailGroup.add(rTailMesh);
    scene.add(staticRightTailGroup);
  }

  // LOAD SVG ---------------------------
  svgLoaderToMesh(
    'assets/svg/waveMain.svg',
    'staticWaveMesh', wavePlaceholderGroup, waveCB,
  );
  svgLoaderToMesh(
    'assets/svg/waveTail-left.svg',
    'leftTailPlaceholder', wavePlaceholderGroup, leftTailCB,
  );
  svgLoaderToMesh(
    'assets/svg/waveTail-right.svg',
    'rightTailPlaceholder', wavePlaceholderGroup, rightTailCB,
  );

  scene.add(wavePlaceholderGroup);
}
