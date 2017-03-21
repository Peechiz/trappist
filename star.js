function Star(x,y) {
  this.pos = createVector(x,y);
  this.hue = p5.prototype.random(60,255);
  this.step = p5.prototype.random(1,3);

  this.twinkle = function() {

    if (this.hue < 60 || this.hue > 255){
      this.step *= -1;
    }
    this.hue += this.step

  }

  this.draw = function() {
    this.twinkle();
    strokeWeight(2);
    stroke(this.hue);
    noFill();
    point(this.pos.x, this.pos.y)
    //ellipse(this.pos.x, this.pos.y, 100,100)
  }
}
