
// IGNORE THIS FILE !!!!
// just messing around

function createSprites() { // memory hog don't do this
  let foamBottom = (dim.row_H * -0.25);//-4; //dim.edgeBottom +
  let foamTop = foamBottom + (foamBottom/-2);
  console.log('top: ' + foamTop);
  console.log('bottom: ' + foamBottom);

  for (var x = dim.edgeLeft; x < dim.edgeRight; x++) {

    //for (var y = -10; y < 10; y++) {
      for (var y = foamBottom; y < foamTop; y++) {

      var material = new THREE.SpriteMaterial({
        color: Math.random() * 0xffffff
      });

      var sprite = new THREE.Sprite(material);
      sprite.position.set(x * 4, y * 4, 0);
      scene.add(sprite);
    }
  }
}

function createPoints() {  // better-ish
  let foamBottom = (dim.row_H * -0.25);//-4; //dim.edgeBottom +
  let foamTop = foamBottom + (foamBottom/-2);
  console.log('top: ' + foamTop);
  console.log('bottom: ' + foamBottom);

  var geom = new THREE.Geometry();
  var material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    color: 0xffffff
  });

  for (var x = dim.edgeLeft; x < dim.edgeRight; x++) {
    for (var y = foamBottom; y < foamTop; y++) {
      var particle = new THREE.Vector3(x * 4, y * 4, 0);
      geom.vertices.push(particle);
      let r = randomInt( 0, 100 );
      let g = randomInt( 100, 255 );
      let b = randomInt( 180, 255 );
      //let a = randomFloat( );

      let colorStr = "rgb(" + r + ", " + g + ", " + b + ")";
      //console.log();
      let color = new THREE.Color( colorStr );
      geom.colors.push( color );
    }
  }

  var cloud = new THREE.Points(geom, material);
  scene.add(cloud);
}

function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, colorValue, vertexColorValue) {

  var geom = new THREE.Geometry();
  var material = new THREE.PointsMaterial({
    size: 3,
    transparent: transparent,
    opacity: opacity,
    vertexColors: vertexColors,

    sizeAttenuation: true,
    color: new THREE.Color(colorValue)
  });

  var range = dim.W;
  var domain = dim.H;
  for (var i = 0; i < 700; i++) {
    var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2,
    Math.random() * range - range / 2);
    geom.vertices.push(particle);
    var color = new THREE.Color(vertexColorValue);
    var asHSL = {};
    color.getHSL(asHSL);
    color.setHSL(asHSL.h, asHSL.s, asHSL.l * Math.random());
    geom.colors.push(color);

  }

  cloud = new THREE.Points(geom, material);
  cloud.name = "particles";
  cloud.position.y = 100;
  scene.add(cloud);

}




function getRGB() {
  let r = randomInt( 0, 100 );
  let g = randomInt( 100, 255 );
  let b = randomInt( 180, 255 );
  let colorStr = "rgb(" + r + ", " + g + ", " + b + ")";
  console.log(colorStr);
}
