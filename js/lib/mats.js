/* global THREE:false, materials:true, next:false */

// ==============================================
// MATERIALS
// makes a bunch of mats and returns them to THREE's
// materials array
// -----------------------------------
const makeMats = ( cb ) => {

  materials = [];

  let colors = Draw.colors;

  const basicMats = [
    { name: 'blueMat', color: colors.blueMain },
    { name: 'blueNew', color: colors.blueNew },
    { name: 'yellowMat', color: colors.yellowMain },
    { name: 'yellowHL', color: colors.yellowHL },
    { name: 'whiteMat', color: colors.white },
    { name: 'brownMat', color: colors.brown },
    { name: 'bubShad', color: colors.bubShad },
    { name: 'bubBg', color: colors.bubBg },
    { name: 'ropeDark', color: colors.ropeDark },
    { name: 'ropeLight', color: colors.ropeLight },
  ]; // end basicMats


  // NOTE: Poor webGL support in most browsers for line attributes like
  // linecap, linejoin, even linewidth
  const lineMats = [
    { name: 'peakMat', color: colors.blueDark },
  ]; // end lineMats


  /* basic image-texture mats -------------------------
    Texture Props
    https://threejs.org/docs/#api/en/textures/Texture
    -----
    image dimensions must be powers of two (2, 4, 8, 16, 32, 64, 128, 256,
    512, 1024, 2048, ...) in terms of pixels... this is a limitation of
    WebGL, not three.js.
  */

  // const textureLoader = new THREE.TextureLoader();
  // const pngTextures = [
  //   { url: 'assets/png/postBig.png', name: 'postBig' },
  // ]; // end pngTextures


  /* MATERIAL MAKERS -----------------------------------
      notes:
  ----------------------------------------------------- */

  basicMats.forEach((i) => {
    const mat = new THREE.MeshBasicMaterial({
      color: i.color,
      name: i.name,
      // side: THREE.FrontSide,
      // side: THREE.BackSide,
      side: THREE.DoubleSide,
    });
    materials.push(mat);
  });

  lineMats.forEach((i) => {
    const mat = new THREE.LineBasicMaterial({
      color: i.color,
      name: i.name,
    });
    materials.push(mat);
  });

  // pngTextures.forEach((i) => {
  //   const texture = textureLoader.load(i.url);
  //   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  //   texture.repeat.set(1, 1);
  //
  //   const mat = new THREE.MeshBasicMaterial({
  //     name: i.name,
  //     map: texture,
  //     transparent: true,
  //     opacity: 1,
  //   });
  //   materials.push(mat);
  // });

  if (cb) { cb(); }

  return materials;
};
