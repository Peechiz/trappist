console.log('hello trappist!');

var t1a;
var sun;
var stars = [];
var comets = [];
var trappist;
var solarsystem;

var showHome = false;

var rate;
var orbit_rate = 5;

var zoom;
var zoomLevel;
var origin;
var mapZoom;

var label;
var planet_label;

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
    label.html('Our Solar System')
  })

  trappist = select('#trappist')
  trappist.mousePressed(function(){
    showHome = false;
    label.html('Trappist-1 System')
  })

  zoom = select('#zoom')
  zoom.input(function(){
    zoomLevel = this.value();
  })

  rate = select('#rate')
  rate.input(function(){
    orbit_rate = map(this.value(), 0,100, 6,.7)
    // console.log(orbit_rate);
  })



  // earth
  // var earth = new Planet(origin, 1, 1, 365.26);

// -------------------------------------------
// -------- SETUP SOLAR SYSTEMS --------
// -------------------------------------------

// ### TRAPPIST ###

  // name, orbit_rate, distance to star, radius, year in days
  t1a = new Sun(.117);
  var t1b = new Planet('Trappist-1b', orbit_rate, .011, 1.09, 1.51);
  var t1c = new Planet('Trappist-1c', orbit_rate, .015, 1.06, 2.42);
  var t1d = new Planet('Trappist-1d', orbit_rate, .021, .77, 4.05);
  var t1e = new Planet('Trappist-1e', orbit_rate, .028, .92, 6.10);
  var t1r = new Planet('Trappist-1r', orbit_rate, .037, 1.04, 9.21);
  var t1g = new Planet('Trappist-1g', orbit_rate, .045, 1.13, 12.35);
  var t1h = new Planet('Trappist-1h', orbit_rate, .06, .76, 20);

  trappist = [t1b,t1c,t1d,t1e,t1r,t1g,t1h]

// ### "THE" SOLAR SYSTEM

  theSun = new Sun(origin, 110)
  var mercury = new Planet('Mercury', orbit_rate, .39, .382, 88, true);
  var venus = new Planet('Venus', orbit_rate, .72, .949, 224, true);
  var earth = new Planet('Earth', orbit_rate, 1, 1, 365.26, true);
  var mars = new Planet('Mars', orbit_rate, 1.52, .532, 687, true);
  var jupiter = new Planet('Jupiter', orbit_rate, 5.2, 11.209, 365*11.86, true);
  var saturn = new Planet('Saturn', orbit_rate, 9.54, 9.44, 365 * 29, true);
  var uranus = new Planet('Uranus', orbit_rate, 19.18, 4, 365 * 84, true);
  var neptune = new Planet('Neptune', orbit_rate, 30.06, 3.88, 365 * 164.8, true);

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

  // -------------------------------------------
  // -------- LABEL SETUP ------------------
  // -------------------------------------------

  label = createP('Trappist-1 System');
  planet_label = createP('');
  planet_label.id('planet');
  label.id('system')
  var container = select('#container')
  container.child('system')
  container.child('planet')
  label.position(10,10);
  planet_label.position(10,40);

}







// -------------------------------------------
// -------------------------------------------
// -------------- DRAW LOOP ------------------
// -------------------------------------------
// -------------------------------------------


function draw() {
  background(0, 0, 0, 0.3);

  mapZoom = map(zoomLevel, 0, 100, .002, 1.95);
  if (!mapZoom){
    mapZoom = .9775;
  }
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
      // move shit to the center & scale
      translate(width/2, height/2)
      scale(mapZoom);

      // this "sun"
      t1a.show();

      // toggle between trappist and our soloar system
      if (!showHome){
        trappist.forEach(planet => {
          planet.show();
          displayLabel(planet, mapZoom);
          planet.move();
        })

        var hit;
        for (var i = comets.length -1; i >= 0; i--) {
          comets[i].draw();

          for (var j = trappist.length -1; j >= 0; j--) {

            if (comets[i]){
              hit = collideCircleCircle(
                comets[i].pos.x,
                comets[i].pos.y,
                10, // comet radius
                trappist[j].pos.x,
                trappist[j].pos.y,
                trappist[j].r * 2
              )


              var f = trappist[j].gravity(comets[i]);
              comets[i].apply(f);
              if (hit) {
                trappist[j].hue = random(360);
                comets.splice(comets[i],1)
                break;
              }
            }
          }

          if (comets[i]){
            comets[i].move();
          }

        }
        // solarsystem.forEach(planet => {
        //   planet.showLite();
        //   planet.move()
        // })
      } else {
        planet_label.html('');
        trappist.forEach(planet => {
          planet.showLite();
          planet.move()
        })
        solarsystem.forEach(planet => {
          planet.show(mapZoom);
          // displayLabel(planet);
          // BUG: label doesn't display once zoom slider adjusted.
          planet.move();
        })
      }
  pop();
}

// on click, make comets
function mouseClicked(){
  var x = touchX || mouseX
  var y = touchY || mouseY

  if (x >= 0 && x <= width && y>=0 && y <= height){
    y -= height/2
    x -= width/2

    var c = new Comet(x,y);
    comets.push(c);
    // console.log('COMET!');
  }
}

function displayLabel(planet, zoom) {
  //collidePointCircle(pointX, pointY, circleX, circleY, diameter)

  var mx = (mouseX  - width/2) / zoom
  var my = (mouseY - height/2) / zoom

  var hit = collidePointCircle(mx, my, planet.pos.x, planet.pos.y, planet.r * 2);

  if (hit) {
    planet_label.html(planet.name)
  }
}


var infoBtn = document.querySelector('#infoBtn')
var info = document.querySelector('#info')
var noInfo = document.querySelector('#noInfo')
infoBtn.addEventListener('click', function(){
  info.style.display = 'flex'
})
noInfo.addEventListener('click', function(){
  info.style.display = 'none'
})
