/*
function onDocumentMouseDown(event) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // find intersections
    raycaster.setFromCamera( mouse, camera );


    // var intersects = raycaster.intersectObjects( scene.children, true );
    var intersects = raycaster.intersectObjects( scene.children, true );

    // var intersects = raycaster.intersectObjects(  );

    if (intersects.length > 0) { // if the ray hits things
      for ( var i = 0; i < intersects.length; i++ ) {

        var INTERSECTED = intersects[i];
        console.log(INTERSECTED.object);
        //return INTERSECTED.object.name;
      }
    }
}


function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // find intersections
  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children, true );
  if (intersects.length > 0) { // if the ray hits things
    for ( var i = 0; i < intersects.length; i++ ) {

      var INTERSECTED = intersects[i];
      console.log(INTERSECTED.object.name);
      //return INTERSECTED.object.name;
    }
  }
}
*/
