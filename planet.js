function Planet(orbit_rate, dist,r, year, isEarth) {
  this.isEarth = isEarth;
  this.angle = random(360);
  this.year = year; // earth is 365.26 days
  this.origin = createVector(0,0)
  this.dist = map(dist, 0, .06, 0, height/2 -50);
  this.hue = random(360);
  this.r = map(r,0.76,1.13,5,25)
  this._gravity = map(this.r * this.r, 25, 625, .005, .03);

  this.slide_r = function(scl){
    if (this.isEarth){
      if (scl <= .66) {
        var inv = map(scl, .005, .66, 3000, 1);
        this.r = inv;
      } else {
        this.r = 100;
      }
    }
  }

  var v = p5.Vector.fromAngle(radians(this.angle));
  var myangle = createVector(this.dist * v.x, this.dist * v.y);
  this.pos = myangle.add(this.origin);

}

Planet.prototype.show = function(scl) {
  // ring
  noFill();
  if (this.isEarth){
    stroke(360);
    strokeWeight(2);
  } else {
    stroke(360, 0.2);
  }
  ellipse(this.origin.x, this.origin.y, this.dist * 2)

  this.slide_r(scl);

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

Planet.prototype.gravity = function(comet){
  var force = p5.Vector.sub(this.pos, comet.pos);
  var d = force.mag();
  d = constrain(d, 5, 25)
  force.normalize();
  var strength = this._gravity / d * d;
  force.mult(strength);
  return force;
}
