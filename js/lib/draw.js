/* global THREE:false */

// ==============================================
// DRAWING HELPERS
// -----------------------------------

const Draw = {

  // UTILS ---------------------------------------------
  linScale: function ( v, inlow, inhigh, outlow, outhigh ) {
    const range = outhigh - outlow;
    const domain = inhigh - inlow;
    let ov = (v - inlow) / domain;
    ov = (ov * range) + outlow;

    return ov;
  },

  clamp: function ( val, min, max ) {
    return Math.max( min, Math.min( max, val ) );
  },

  //https://en.wikipedia.org/wiki/Smoothstep
  smoothstep: function ( x, min, max ) {
    if ( x <= min ) return 0;
    if ( x >= max ) return 1;
    x = ( x - min ) / ( max - min );

    return x * x * ( 3 - 2 * x );
  },

  randFloat: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randInt: function (min, max) { // min-max inclusive
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // https://en.wikipedia.org/wiki/Linear_interpolation
  lerp: function ( x, y, t ) {
    return ( 1 - t ) * x + t * y;
  },

  // COLORS ---------------------------------------------
  colors: {
    yellowMain: 0xFFC95F,
    yellowHL: 0xffe592,
    blueMain: 0x53C8E9, // not in use
    blueLight: 0xC5F3FF, // not in use
    blueDark: 0x018B9D,
    blueNew: 0x50d3d6,
    white: 0xffffff,
    grayTxt: 0x4d4d4d,
    brown: 0xa3907e,
    ropeDark: 0xe3d5ba,
    ropeLight: 0xf3e7cd,
    bubShad: 0xb4e9ed,
    bubBg: 0xf0f9fc,
    foam: 0xccf2ec,
  }, // end colors



  // SHAPES ---------------------------------------------
  roundedRect: (shape, x, y, w, h, r) => {
    shape.moveTo(x, y + r); // starts in upper right corner
    shape.lineTo(x, y + h - r);
    shape.quadraticCurveTo(x, y + h, x + r, y + h);
    shape.lineTo(x + w - r, y + h);
    shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
    shape.lineTo(x + w, y + r);
    shape.quadraticCurveTo(x + w, y, x + w - r, y);
    shape.lineTo(x + r, y);
    shape.quadraticCurveTo(x, y, x, y + r);

    return shape;
  },

  // circle: (shape, x, y, r) => {
  //   shape.moveTo(x, y);
  //   shape.absarc(x, y, r, 0, 2 * Math.PI);
  //
  //   return shape;
  // },

  ellipse: (shape, x, y, rx, ry) => {
    shape.moveTo(x, y);
    shape.ellipse(x, y, rx, ry);

    return shape;
  }
};
