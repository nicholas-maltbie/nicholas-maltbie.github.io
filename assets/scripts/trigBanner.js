var c = document.getElementById("trigBan")
var w, h, frame

const ctx = c.getContext('2d')

const trigRad = 20, trigGap = 2, trigRound = 5, trigStroke = 0, defaultColor = "#333", defaultOutline = "#FFF"

const col1 = makeColor(0, 0, 0), col2 = makeColor(255, 255, 255)

function makeColor(r, g, b) {
  return {r: r, g: g, b: b}
}

function rgb(col) {
  r = Math.floor(col.r)
  g = Math.floor(col.g)
  b = Math.floor(col.b)
  return ["rgb(",r,",",g,",",b,")"].join("")
}

function colorGrad(col1, col2, step) {
  var r1 = col1.r ** 2, r2 = col2.r ** 2
  var g1 = col1.g ** 2, g2 = col2.g ** 2
  var b1 = col1.b ** 2, b2 = col2.b ** 2
  
  return makeColor(
    Math.sqrt(r1 + (r2 - r1) * step), 
    Math.sqrt(g1 + (g2 - g1) * step),
    Math.sqrt(b1 + (b2 - b1) * step)
  ) 
}

// Fine function Blindman67 on stackoverflow 
//   https://stackoverflow.com/questions/44855794/html5-canvas-triangle-with-rounded-corners
//   I should be better at math being CS student but it's been a while since
//   trig and algebra classes. 
// ctx is the context to add the path to
// points is a array of points [{x :?, y: ?},...
// radius is the max rounding radius 
// this creates a closed polygon.
// To draw you must call between 
//    ctx.beginPath();
//    roundedPoly(ctx, points, radius);
//    ctx.stroke();
//    ctx.fill();
// as it only adds a path and does not render. 
function roundedPoly(ctx, points, radiusAll) {
  var i, x, y, len, p1, p2, p3, v1, v2, sinA, sinA90, radDirection, drawDirection, angle, halfAngle, cRadius, lenOut,radius;
  // convert 2 points into vector form, polar form, and normalised 
  var asVec = function(p, pp, v) {
    v.x = pp.x - p.x;
    v.y = pp.y - p.y;
    v.len = Math.sqrt(v.x * v.x + v.y * v.y);
    v.nx = v.x / v.len;
    v.ny = v.y / v.len;
    v.ang = Math.atan2(v.ny, v.nx);
  }
  radius = radiusAll;
  v1 = {};
  v2 = {};
  len = points.length;
  p1 = points[len - 1];
  // for each point
  for (i = 0; i < len; i++) {
    p2 = points[(i) % len];
    p3 = points[(i + 1) % len];
    //-----------------------------------------
    // Part 1
    asVec(p2, p1, v1);
    asVec(p2, p3, v2);
    sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    angle = Math.asin(sinA);
    //-----------------------------------------
    radDirection = 1;
    drawDirection = false;
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }
    if(p2.radius !== undefined){
        radius = p2.radius;
    }else{
        radius = radiusAll;
    }
    //-----------------------------------------
    // Part 2
    halfAngle = angle / 2;
    //-----------------------------------------

    //-----------------------------------------
    // Part 3
    lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle));
    //-----------------------------------------

    //-----------------------------------------
    // Special part A
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }
    //-----------------------------------------
    // Part 4
    x = p2.x + v2.nx * lenOut;
    y = p2.y + v2.ny * lenOut;
    //-----------------------------------------
    // Part 5
    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;
    //-----------------------------------------
    // Part 6
    ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection);
    //-----------------------------------------
    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
}

function makePoint(x, y) {
  return {x: x, y: y}
}

class Triangle {
  constructor (center, radius, angle, fillColor, lineColor, lineWidth, cornerRounding) {
    this.center = center;
    this.radius = radius;
    this.angle = angle;
    this.fillColor = fillColor;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.cornerRounding = cornerRounding;
  }

  draw (ctx) {
    drawTrig(this.center, this.radius, this.angle, this.fillColor, this.lineColor, this.lineWidth, this.cornerRounding)
  }
    
}

function updateDims() {
  w = c.width = c.scrollWidth;
  h = c.height = c.scrollHeight;
}

function getTrigCoords(center, radius, angle) {
  trigs = []
  var i = 0
  for (i = 0; i < 3; i++) {
    trigs.push(makePoint(center.x + radius * Math.cos(angle + i * 2 * Math.PI / 3), 
                         center.y + radius * Math.sin(angle + i * 2 * Math.PI / 3)))
  }
  return trigs
}

function drawTrig(center, radius, angle, fillColor, lineColor, lineWidth, cornerRounding) {
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  roundedPoly(ctx, getTrigCoords(center, radius, angle), cornerRounding);
  ctx.stroke();
  ctx.fill();
}

function dist(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

function render() {
  ctx.clearRect(0, 0, w, h);
  
  var even_angle = Math.PI / 2
  var odd_angle = Math.PI * 3 / 2
  
  var horizOffset = Math.sqrt(3) * trigRad + trigGap * 2
  var vertOffset = trigRad * 3 / 2 + trigGap
  
  var rows = Math.ceil(h / vertOffset)
  var cols = Math.ceil(w / horizOffset + 1) * 2
  
  var min_x = 0, max_x = (Math.floor(cols / 2) + 0.5) * horizOffset,
      min_y = 0, max_y = rows * vertOffset + trigRad / 2
  var min_point = makePoint(min_x, min_y),
      max_point = makePoint(max_x, max_y)
  var max_dist = dist(min_point, max_point)
  
  for (var row = 0; row < rows; row ++) {
    for (var col = 0; col < cols; col ++) {
      var center = makePoint(
        (Math.floor(col / 2)  + ((row + col) % 2) / 2) * horizOffset,
        row * vertOffset + (col % 2 == 0 ? 0 : trigRad / 2))
      //center, radius, angle, fillColor, lineColor, lineWidth, cornerRounding
      var triCol = rgb(colorGrad(col1, col2, dist(center, mousePos) / max_dist))
      
      var trig = new Triangle(center, 
        trigRad, 
        col % 2 == 0 ? even_angle : odd_angle, 
        triCol, 
        defaultOutline, 
        trigStroke, 
        trigRound)
      trig.draw()
    }
  }
}

function anim() {
  window.requestAnimationFrame( anim )
  
  ++frame
  
  updateDims()
  
  render()
}

function init() {
  updateDims()
}

var mousePos = makePoint(0, 0)

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

window.addEventListener('mousemove', function(evt) {
  mousePos = getMousePos(c, evt);
}, false);

init()
anim()
