console.log('hello touchme!');

var colorWheel = 0.0
var t1a;
var sun;
var stars = [];
var planets;
var comets = [];
var orbit_rate = 5; // TODO attach this to a slider

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight * .75);
  canvas.parent("p5canvas");
  colorMode(HSB);
  angleMode(DEGREES);

  var origin = createVector(width/2, height/2);


  // earth
  // var earth = new Planet(origin, 1, 1, 365.26);

  // origin, distance to star, radius, orbital period in days
  t1a = new Sun(origin, .117);
  var t1b = new Planet(orbit_rate, origin, .011, 1.09, 1.51 );
  var t1c = new Planet(orbit_rate, origin, .015, 1.06, 2.42 );
  var t1d = new Planet(orbit_rate, origin, .021, .77, 4.05);
  var t1e = new Planet(orbit_rate, origin, .028, .92, 6.10);
  var t1r = new Planet(orbit_rate, origin, .037, 1.04, 9.21);
  var t1g = new Planet(orbit_rate, origin, .045, 1.13, 12.35);
  var t1h = new Planet(orbit_rate, origin, .06, .76, 20);

  planets = [t1b,t1c,t1d,t1e,t1r,t1g,t1h]

  sun = createVector(width/2, height/2);

  for (var i = 0; i < 100; i++) {
    var x = random(width)
    var y = random(height)
    var star = new Star(x,y);
    stars.push(star);
  }
}

function draw() {
  background(0, 0, 0, 0.3);

  stars.forEach(star => {
    star.draw();
  })

  // this "sun"
  t1a.show();
  // noStroke();
  // fill(colorWheel, 100,100)
  // ellipse(width/2,height/2,50,50);





  // planet1
  planets.forEach(planet => {
    planet.show();
    planet.move()
  })


  colorWheel += 0.5;
  colorWheel = colorWheel % 355;
}
