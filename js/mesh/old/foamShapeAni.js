/*
function createFoamRig() {
  // foamChunk 256 x 32 px drawing

  let foamChunk = new THREE.Group();
  let edgeLeft = -128;
  let edgeTop = 16;
  let n = 0;
  let opacity = 0.33;

  let shapes = [
    {
      x: 33, y: -12, rx: 64, ry: 18, //drawing coord
      name: "e0",
      opacity: 0.5,
    },
    {
      x: 80, y: -16, rx: 73, ry: 20,  //drawing coord
      name: "e1",
      opacity: 0.5,
    },
    {
      x: 116, y: -16, rx: 73, ry: 25,
      name: "e2",
      opacity: 0.5,
    },
    {
      x: 161, y: -15, rx: 114, ry: 26,
      name: "e3",
      opacity: 0.5,
    },
    {
      x: 218, y: -13, rx: 73, ry: 20,
      name: "e4",
      opacity: 0.5,
    },
  ];


  shapes.forEach((i) => {

    let shape = new THREE.Shape();
    // (shape, x, y, rx, ry)
    shape = Draw.ellipse(
      shape,
      edgeLeft + i.x, edgeTop + i.y,
      i.rx, i.ry
    );
    const geom = new THREE.ShapeGeometry( shape );

    let mat = new THREE.MeshBasicMaterial({
      color: 0xccf2ec, // 0xffffff, //
      side: THREE.FrontSide,
      transparent: true,
      opacity: opacity,
    });

    let mesh = new THREE.Mesh(geom, mat);
    let zrot = 0;

    mesh.position.set(0,0,0);
    mesh.rotation.set(0, 0, 0);
    mesh.name = i.name;

    foamChunk.add(mesh);
  });

  foamChunk.scale.set(0.33, 0.33, 0.33 );
  foamChunk.position.set( 0, dim.row_H * -0.8, 0);
  scene.add(foamChunk);

}
*/
