function Sun(origin, r) {
  this.pos = origin;
  this.hue = 0;
  this.r = map(r,0.11,1.13,5,25);
}

Sun.prototype.show = function(){
  fill(this.hue, 100,100);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r * 2)

  for (var i = 0; i < 30; i++) {
    var myAlpha = map(i, 0, 30, 0, 255);
    noStroke();
    fill(this.hue,100,100,myAlpha)
    //ellipse(this.pos.x, this.pos.y, this.r + i*2, this.r + i*2)
  }

  this.hue = this.hue + 1 % 360
}
