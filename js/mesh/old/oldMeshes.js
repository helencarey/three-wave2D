function create_waveBase() {
	let geom = new THREE.PlaneGeometry( dim.W, (dim.row_H * 0.75)/2 );

	let mat = materials.filter( obj => { return obj.name === "blueMat"} );

	let mesh = new THREE.Mesh( geom, mat );
	let xpos = 0;
	let ypos = -((dim.row_H * 0.5) + 10);
	let zrot = 0;
	mesh.position.set(0, ypos, 0);
	mesh.rotation.set(0, 0, zrot);
	mesh.name = "waveBase";

	graphicsGroup.add(mesh);
}

function create_ellipse() {
	let shape = new THREE.Shape();
	// ellipse: (shape, x, y, rx, ry)
	shape = Draw.ellipse(shape, 0, 0, 16, 8);

	let geom = new THREE.ShapeGeometry( shape );
	let mat = materials.filter( obj => { return obj.name === "whiteMat"} );

	let mesh = new THREE.Mesh( geom, mat );
	let xpos = (dim.col_W * 1);
	let ypos = (dim.row_H * -1.2);
	let zrot = 0;

	mesh.position.set( xpos, ypos, 1);
	mesh.rotation.set(0, 0, zrot);
	mesh.name = "ellipse";

	graphicsGroup.add(mesh);
}

function test() {
	// var material = new THREE.MeshStandardMaterial( { color : 0x00cc00 } );
	let mat = materials.filter( obj => { return obj.name === "whiteMat"} );

	//create a triangular geometry
	var geometry = new THREE.Geometry();
	geometry.vertices.push( new THREE.Vector3( -50, -50, 0 ) );
	geometry.vertices.push( new THREE.Vector3(  50, -50, 0 ) );
	geometry.vertices.push( new THREE.Vector3(  50,  50, 0 ) );

	//create a new face using vertices 0, 1, 2
	var normal = new THREE.Vector3( 0, 1, 0 ); //optional
	var color = new THREE.Color( 0xffaa00 ); //optional
	var materialIndex = 0; //optional
	var face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex );

	//add the face to the geometry's faces array
	geometry.faces.push( face );

	//the face normals and vertex normals can be calculated automatically if not supplied above
	// geometry.computeFaceNormals();
	// geometry.computeVertexNormals();

	scene.add( new THREE.Mesh( geometry, mat ) );
}

// TEMPLATE ---------
function create_meshName() {
	let geom = new THREE.PlaneGeometry( 20, 144 );
	let mat = materials.filter( obj => { return obj.name === "name"} );

	let mesh = new THREE.Mesh( geom, mat );
	let xpos = (dim.col_W * 1);
	let ypos = (dim.row_H * 1);
	let zrot = 0;

	mesh.position.set( xpos, ypos, 0);
	mesh.rotation.set(0, 0, zrot);
	mesh.name = "name";

	graphicsGroup.add(mesh);
}
