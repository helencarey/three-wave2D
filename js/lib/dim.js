// dependencies: none

function Dim(ele) {
  this.W = ele.clientWidth;
  this.H = ele.clientHeight;
  this.aspect = this.W / this.H;

  this.edgeLeft = this.W / -2;
  this.edgeRight = this.W / 2;
  this.edgeTop = this.H / 2;
  this.edgeBottom = this.H / -2;

  this.row_H = this.H / 4;
  this.col_W = this.W / 12;

  // wave boundaries
  this.wave = {
    edgeLeft: this.edgeLeft + (this.col_W * 3),
    edgeTop: this.edgeTop - (this.row_H * 0.75),
    edgeRight: this.edgeRight - (this.col_W * 2),
    edgeBottom: this.edgeBottom + (this.row_H * 2),
    H: Math.abs(this.edgeBottom) + this.edgeTop,
    W: Math.abs(this.edgeLeft) + this.edgeRight,
  };

  this.defaultTargetX = Draw.linScale(targetF3, 0, 4500, this.col_W * -3, this.col_W * 4 );

  return this
}

// ===================================================
// Called from Main

function updateDrawingDim() {
  parentElement = document.querySelector('#webgl');

  if (dim != undefined) {
    dim = undefined;
  }

  dim = new Dim(parentElement);
}
