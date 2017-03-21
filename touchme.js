console.log('hello touchme!');

var t1a;
var sun;
var stars = [];
var trappist;
var solarsystem;
var comets = [];

var showHome = false;

var rate;
var orbit_rate = 5; // TODO attach this to a slider


var zoom;
var zoomLevel;
var origin;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight * .75);
  canvas.parent("p5canvas");
  colorMode(HSB);
  angleMode(DEGREES);

  origin = createVector(0, 0);


// -------------------------------------------
// -------- BUTTONS AND SLIDERS SETUP --------
// -------------------------------------------

  home = select('#home')
  home.mousePressed(function(){
    showHome = true;
  })

  trappist = select('#trappist')
  trappist.mousePressed(function(){
    showHome = false;
  })

  zoom = select('#zoom')
  zoom.input(function(){
    zoomLevel = this.value();
  })

  rate = select('#rate')
  rate.input(function(){
    orbit_rate = map(this.value(), 0,100, .7,6)
    console.log(orbit_rate);
  })



  // earth
  // var earth = new Planet(origin, 1, 1, 365.26);

// -------------------------------------------
// -------- SETUP SOLAR SYSTEMS --------
// -------------------------------------------

// ### TRAPPIST ###

  // distance to star, radius, year in days
  t1a = new Sun(.117);
  var t1b = new Planet(orbit_rate, .011, 1.09, 1.51);
  var t1c = new Planet(orbit_rate, .015, 1.06, 2.42 );
  var t1d = new Planet(orbit_rate, .021, .77, 4.05);
  var t1e = new Planet(orbit_rate, .028, .92, 6.10);
  var t1r = new Planet(orbit_rate, .037, 1.04, 9.21);
  var t1g = new Planet(orbit_rate, .045, 1.13, 12.35);
  var t1h = new Planet(orbit_rate, .06, .76, 20);

  trappist = [t1b,t1c,t1d,t1e,t1r,t1g,t1h]

// ### "THE" SOLAR SYSTEM

  theSun = new Sun(origin, 110)
  var mercury = new Planet(orbit_rate, .39, .382, 88);
  var venus = new Planet(orbit_rate, .72, .949, 224);
  var earth = new Planet(orbit_rate, 1, 1, 365.26);
  var mars = new Planet(orbit_rate, 1.52, .532, 687);
  var jupiter = new Planet(orbit_rate, 5.2, 11.209, 365*11.86);
  var saturn = new Planet(orbit_rate, 9.54, 9.44, 365 * 29);
  var uranus = new Planet(orbit_rate, 19.18, 4, 365 * 84);
  var neptune = new Planet(orbit_rate, 30.06, 3.88, 365 * 164.8);

  solarsystem = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];



// -------------------------------------------
// -------- STARFIELD SETUP ------------------
// -------------------------------------------

  // create starfield background;
  for (var i = 0; i < 100; i++) {
    var x = random(width)
    var y = random(height)
    var star = new Star(x,y);
    stars.push(star);
  }
}

function draw() {
  background(0, 0, 0, 0.3);

  var mapZoom = map(zoomLevel, 0, 100, .1, 1.9);
  var starZoom = map(zoomLevel, 0, 100, .9, 1.1);

  push();
      var x = width - width * starZoom;
      var y = height - height * starZoom;
      scale(starZoom);
      translate(x/2,y/2);

      stars.forEach(star => {
        star.draw();
      })
  pop();


  push();
      // move shit to the center
      translate(width/2, height/2)

      // this "sun"
      scale(mapZoom);

      t1a.show();
      if (!showHome){
        trappist.forEach(planet => {
          planet.show();
          planet.move()
        })
        // solarsystem.forEach(planet => {
        //   planet.showLite();
        //   planet.move()
        // })
      } else {
        trappist.forEach(planet => {
          planet.showLite();
          planet.move()
        })
        // solarsystem.forEach(planet => {
        //   planet.show();
        //   planet.move();
        // })
      }
  pop();
}
