function Planet(orbit_rate, origin,dist,r, year, startAngle) {
  this.angle = startAngle || 0;
  this.year = year; // earth is 365.26 days
  this.origin = origin
  this.dist = map(dist, 0, .06, 40, height/2 -50);
  this.hue = random(360);
  this.r = map(r,0.11,1.13,5,25)

  var v = p5.Vector.fromAngle(radians(this.angle));
  var myangle = createVector(this.dist * v.x, this.dist * v.y);
  this.pos = myangle.add(this.origin)

}

Planet.prototype.show = function() {
  // ring
  noFill();
  stroke(360, 0.07);
  ellipse(this.origin.x, this.origin.y, this.dist * 2)

  // planet
  fill(this.hue, 100,100);
  noStroke();
  ellipse(this.pos.x, this.pos.y, this.r * 2)
}

Planet.prototype.move = function() {
  var fps = 60;
  this.angle = (this.angle + 6 / orbit_rate / this.year) % 360

  var v = p5.Vector.fromAngle(radians(this.angle));
  var myangle = createVector(this.dist * v.x, this.dist * v.y);
  this.pos = myangle.add(this.origin)
}
