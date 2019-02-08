let tri, triWaveGeom, shapeArr, wireframe, lines;
let frequencyScaling = 1;

const pointCount = 64; //256;
const noisiness = 0.1;
const wavebase = 64;

const dummyPoints = [];
for (let i = 0; i < pointCount; i++) {
  dummyPoints.push(0);
}

function makeSimpleData() {

  for (let i = 0; i < pointCount; i++) {
    if (i == 0 || i == (pointCount - 1)) dummyPoints[i] = 0;
    else {
      const p = (Math.random() - 0.5) * noisiness;
      if ((dummyPoints[i] + p) > 0) {
        dummyPoints[i] = dummyPoints[i] + p;
        let vrg = dummyPoints[i - 1] + dummyPoints[i] + dummyPoints[i + 1];
        dummyPoints[i] = vrg / 3;
      } else
        dummyPoints[i] = 0;
    }
  } // end for

  // populate shape array, which holds the topmost x,y points
  shapeArr = [];

  shapeArr.push([dim.wave.edgeLeft, 0 ]);

  for (var i=0; i<dummyPoints.length; i++) {
    var point = (dummyPoints[i] * (dim.wave.H)) + wavebase;

    var px = Draw.linScale(i * frequencyScaling, 0, dummyPoints.length-1, dim.wave.edgeLeft, dim.wave.edgeRight);

    shapeArr.push([px, point]);
  }

  shapeArr.push([dim.wave.edgeRight, 0 ]);

} // end makeSimpleData


function createWaveMesh() {

  waveGroup = new THREE.Group();
  waveGroup.name = 'waveGroup';

  let mat = materials.filter( obj => { return obj.name === "blueNew"} );

  if (triWaveGeom === undefined) {

    let tmpGeometry = new THREE.Geometry(); // orig

    for ( let i = 1; i<shapeArr.length; i++ ) {

        tmpGeometry.vertices.push(new THREE.Vector3(shapeArr[i-1][0], dim.wave.edgeBottom, 0));

        tmpGeometry.vertices.push(new THREE.Vector3(shapeArr[i][0], shapeArr[i][1], 0));

      if (i > 0) {
        tmpGeometry.faces.push(new THREE.Face3(
          (i-1) * 2,
          (i-1) * 2 + 1,
          (i-1) * 2 + 2)
        );
        tmpGeometry.faces.push(new THREE.Face3(
          (i-1) * 2 + 2,
          (i-1) * 2 + 1,
          (i-1) * 2 + 3)
        );
      }

    } // end for

    triWaveGeom = new THREE.BufferGeometry().fromGeometry( tmpGeometry );
  } // end if geom === undefined

  wireframe = new THREE.WireframeGeometry( triWaveGeom );
  lines = new THREE.LineSegments( wireframe );
  lines.material.color.set(  0x487c85 ); //0xffffff 0x018B9D   0xe86348
  lines.material.opacity = 0.25;
  lines.material.transparent = true;
  lines.geometry.attributes.position.needsUpdate = true;


  //var triLines = new THREE.Mesh( line );
  tri = new THREE.Mesh( triWaveGeom, mat );
  tri.name = "tri";
  tri.geometry.attributes.position.needsUpdate = true;
  //console.log(tri.geometry.attributes.position);

  waveGroup.add( lines, tri );
  // waveGroup.add( tri )

  const xpos = 0;
  const ypos = (dim.row_H * -0.75) -2;
  const zpos = 0;
  waveGroup.position.set(xpos, ypos, zpos);

  scene.add(waveGroup);
  //console.log(triWaveGeom.vertices);
}

// function createLeftTail() {}
// function createRightTail() {}


function updateWave() {
  //console.log(triWaveGeom.vertices);
  //console.log(triWaveGeom.attributes.position);
  //console.log(triWaveGeom.attributes.position.array);
  //console.log(wireframe.attributes.position);

  for (var i=1; i<shapeArr.length; i++) {

    let p = triWaveGeom.attributes.position.array;

    let idx = (i-1) * 18;
    p[idx++] = shapeArr[i-1][0]; // Bottom-left
    p[idx++] = dim.wave.edgeBottom; //bottomEdge;
    p[idx++] = 0;
    p[idx++] = shapeArr[i-1][0]; // Top-left
    p[idx++] = shapeArr[i-1][1];
    p[idx++] = 0;
    p[idx++] = shapeArr[i][0]; // Top-right
    p[idx++] = shapeArr[i][1];
    p[idx++] = 0;
    p[idx++] = shapeArr[i-1][0]; // Bottom-left
    p[idx++] = dim.wave.edgeBottom; //bottomEdge;
    p[idx++] = 0;
    p[idx++] = shapeArr[i][0]; // Bottom-right
    p[idx++] = dim.wave.edgeBottom; //bottomEdge;
    p[idx++] = 0;
    p[idx++] = shapeArr[i][0]; // Top-right
    p[idx++] = shapeArr[i][1];
    p[idx++] = 0;
  }

  // this will throw warnigs, but nbd
  wireframe.attributes.position = triWaveGeom.attributes.position;

  wireframe.attributes.position.needsUpdate = true;
  triWaveGeom.attributes.position.needsUpdate = true;
};
