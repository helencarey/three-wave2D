
function svgLoaderToMesh(fileUrl, meshName, groupName, cb) {

  const loader = new THREE.SVGLoader();
  loader.load(fileUrl, (paths) => {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      const material = new THREE.MeshBasicMaterial({
        color: path.color,
        side: THREE.DoubleSide,
      });

      const shapes = path.toShapes(true);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ShapeBufferGeometry(shape);
        geometry.computeBoundingBox();
        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = 1 * Math.PI;
        mesh.name = meshName;

        groupName.add(mesh);
      } // end shape loop

      if ( cb && i === paths.length -1 ) {
          cb();
      }
    } // end paths loop
  }); // end loader.load
} // end svgLoaderToMesh
