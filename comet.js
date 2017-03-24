function Comet(x,y){
  this.pos = createVector(x,y);
  var initV = p5.Vector.random2D();
  initV.setMag(random(1.5,3));
  this.vel = initV;
  this.acc = createVector(0,0);
}

Comet.prototype.move = function(){
  this.vel.add(this.acc)
  this.pos.add(this.vel)
  this.acc.mult(0);
  // this.vel.limit(2);
}

Comet.prototype.apply = function(force){
  this.acc.add(force);
}

Comet.prototype.draw = function(){
  noStroke();
  fill(360);
  ellipse(this.pos.x, this.pos.y, 10,10)
}


// gforce = GRAVITY / distance^2  * direction vector (normalized)

// var dir = PVector.sub(vec1, vec2)
// var distSq = dir.magSq()
// distSq = constrain(distSq, 5, 25)
// dir.normalize()
// dir.mult(GRAVITY / distSq)
