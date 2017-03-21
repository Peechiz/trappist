function Sun(r) {
  this.pos = createVector(0,0)
  this.hue = 0;
  this.r = map(r,0.11,1.13,5,25);
}

Sun.prototype.show = function(){
  fill(this.hue, 100,100);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r * 2)

  fill(this.hue, 100, 100, .5)
  ellipse(this.pos.x, this.pos.y, this.r * 2 + 5)

  fill(this.hue, 100, 100, .2)
  ellipse(this.pos.x, this.pos.y, this.r * 2 + 10)

  this.hue = (this.hue + 1) % 360
}
