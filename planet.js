function Planet(orbit_rate,dist,r, year) {
  this.angle = 0;
  this.year = year; // earth is 365.26 days
  this.origin = createVector(0,0)
  this.dist = map(dist, 0, .06, 0, height/2 -50);
  this.hue = random(360);
  this.r = map(r,0.76,1.13,5,25)

  var v = p5.Vector.fromAngle(radians(this.angle));
  var myangle = createVector(this.dist * v.x, this.dist * v.y);
  this.pos = myangle.add(this.origin)

}

Planet.prototype.show = function() {
  // ring
  noFill();
  stroke(360, 0.2);
  ellipse(this.origin.x, this.origin.y, this.dist * 2)

  // planet
  fill(this.hue, 100,100);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r * 2)
}

Planet.prototype.showLite = function() {
  // ring
  noFill();
  stroke(360, 0.1);
  ellipse(this.origin.x, this.origin.y, this.dist * 2)

  // planet
  fill(this.hue, 100,100, .7);
  noStroke();
  ellipse(this.pos.x, this.pos.y, 10)
}

Planet.prototype.move = function() {
  var fps = 60;
  this.angle = (this.angle + 6 / orbit_rate / this.year) % 360

  var v = p5.Vector.fromAngle(radians(this.angle));
  var myangle = createVector(this.dist * v.x, this.dist * v.y);
  this.pos = myangle.add(this.origin)
}
