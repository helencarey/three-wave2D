let waveGeometry, waveMesh;

function updateWave(points, peaks, frequencyScaling) {
  //if (this.peakSegments === undefined) return;

  // Make an array of all the topmost points
  var shapeArr = [];
  for (var i=0; i<points.length; i++) {
    var point = points[i] * dim.wave.H;

    var px = Draw.linScale(i * frequencyScaling, 0, points.length-1, dim.wave.edgeLeft, dim.wave.edgeRight);

    shapeArr.push([px, point]);
  }

  //console.log(shapeArr);
  // Setup the geometry and its faces

  if (waveGeometry === undefined) {

    let tmpGeometry = new THREE.Geometry();

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
    } //end forloop

    //
    waveGeometry = new THREE.BufferGeometry().fromGeometry( tmpGeometry );
    waveGeometry.dynamic = true;
  }
/*
var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array((
	new THREE.Vector3(-10, 10, 0),
	new THREE.Vector3(-10, -10, 0),
	new THREE.Vector3(10, -10, 0)
]);
geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
*/



  // All this does is explicitly update all of the triangles that are being used to draw the
  // wave geometry. Imagine that between every two adjacent points along the top curve we draw
  // a long rectangle with a slanted top. The top-left corner of that rectangle is wave[i-1],
  // the top-right corner is wave[i], and the bottom left and bottom right are the same points
  // but on the bottom edge of the image. This rectangle strip has four points, but we draw it
  // as two triangles. Each of those triangles has three points, so there are 3 * 3 vertices
  // to update, for each of 2 triangles, for a total of 18 vertices per every point on the
  // wave curve.
  for (var i=1; i<shapeArr.length; i++) {
    var p = waveGeometry.attributes.position.array;
    var idx = (i-1) * 18;
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

  waveGeometry.attributes.position.needsUpdate = true;


  if (waveMesh === undefined) {
    let mat = materials.filter( obj => { return obj.name === "blueMat"} );
    waveMesh = new THREE.Mesh(waveGeometry, mat );
    waveMesh.name = "wave";
    scene.add( waveMesh );
  }
  /*
  // Update peaks
  for (var i = 0; i < this.maxNumPeaks; i++) {
    var px = 0, py = this.BOTTOM;
    if (i < peaks.length) {
      var peak = peaks[i];
      px = linScale(peak.X, -1, 1, 0, frequencyScaling);
      px = linScale(px, 0, 1, this.LEFT, this.RIGHT);
      py = linScale(peak.Y, 1, -1, this.TOP, this.BOTTOM);
    }
    this.peakSegments.geometry.vertices[2*i].x = px;
    this.peakSegments.geometry.vertices[2*i].y = py;
    this.peakSegments.geometry.vertices[2*i+1].x = px;
    this.peakSegments.geometry.vertices[2*i+1].y = this.BOTTOM;
  }

  this.peakSegments.geometry.verticesNeedUpdate = true;
  */
};
