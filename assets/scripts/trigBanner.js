
function startBanner() {
  var c = document.getElementById("trigBan")
  var ban = document.getElementById("front-ban")
  var w, h, frame = 0

  const MAX_ROWS = 200
  const MAX_COLS = 200

  var grid = Array(MAX_ROWS * MAX_COLS)
  var incrementGradient = false
  var gradientStep = 4
  var gradientSpeed = 5
  
  var ctx = c.getContext('2d')

  const framesPerSecond = 12

  const trigRad = 35, trigGap = 5, trigRound = 5, trigStroke = 0, defaultColor = "#000", defaultOutline = "#FFF"

  const gradientColors = [
    makeColor(186, 225, 255),
    makeColor(255,179,186),
    makeColor(255,223,186),
    makeColor(255,255,186),
    makeColor(186,255,201)]
  const gradientSteps = 64

  var calculatedGradient
  var gradientLength = gradientSteps
  var gradientOffset = 0

  function makeColor(r, g, b) {
    return {r: r, g: g, b: b}
  }

  function rgb(col) {
    r = Math.floor(col.r)
    g = Math.floor(col.g)
    b = Math.floor(col.b)
    return ["rgb(",r,",",g,",",b,")"].join("")
  }

  function makeColorGrad(cols, steps) {
    colors = Array(steps)
    for (var idx = 0; idx < steps; idx++) {
      colors[idx] = rgb(colorGrad(cols, idx / steps))
    }
    return colors
  }

  function colorGrad(cols, step) {
    step = Math.min(1, Math.max(0, step))
    step *= cols.length - 1
    var col1 = cols[Math.floor(step)]
    var col2 = cols[Math.ceil(step)]
    
    step %= 1
    
    var r1 = col1.r ** 2, r2 = col2.r ** 2
    var g1 = col1.g ** 2, g2 = col2.g ** 2
    var b1 = col1.b ** 2, b2 = col2.b ** 2
    
    return makeColor(
      Math.sqrt(r1 + (r2 - r1) * step), 
      Math.sqrt(g1 + (g2 - g1) * step),
      Math.sqrt(b1 + (b2 - b1) * step)
    ) 
  }

  function getTrigCoords(center, radius, angle) {
    trigs = []
    var i = 0
    
    for (i = 0; i < 3; i++) {
      var rot = angle + i * 2 * Math.PI / 3
      trigs.push(makePoint(center.x + radius * getCos(rot), 
                           center.y + radius * getSin(rot)))
    }
    return trigs
  }

  function roundedPolyQuick(ctx, points, cornerRadius) {
    ctx.lineJoin = "round"
    ctx.lineWidth = cornerRadius
    ctx.moveTo(Math.floor(points[0].x), Math.floor(points[0].y))
    for (var idx = 1; idx < points.length; idx++) {
      ctx.lineTo(Math.floor(points[idx].x), Math.floor(points[idx].y))
    }
    ctx.closePath()
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
  function roundedPoly(points, radiusAll) {
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

    draw_cmds = []
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
      lenOut = Math.abs(Math.cos(halfAngle) * radius / getSin(halfAngle));
      //-----------------------------------------

      //-----------------------------------------
      // Special part A
      if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
        lenOut = Math.min(v1.len / 2, v2.len / 2);
        cRadius = Math.abs(lenOut * Math.sin(halfAngle) / getCos(halfAngle));
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
      draw_cmds.push([x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection])
      //-----------------------------------------
      p1 = p2;
      p2 = p3;
    }
    return draw_cmds
  }

  function makePoint(x, y) {
    return {x: x, y: y}
  }
  
  function pointDelta(p1, p2) {
    return makePoint(p2.x - p1.x, p2.y - p1.y)
  }

  class Triangle {
    constructor (center, radius, angle, fillColor, lineColor, lineWidth, cornerRounding) {
      this.center = center
      this.radius = radius
      this.angle = angle
      this.fillColor = fillColor
      this.lineColor = lineColor
      this.lineWidth = lineWidth
      this.cornerRounding = cornerRounding
    }
    
    calcDraw () {
      this.draw_cmds = roundedPoly(getTrigCoords(this.center, this.radius, this.angle), this.cornerRounding);
    }
    
    getTranslated (newCenter) {
      var newTrig = new Triangle(newCenter, this.radius, this.angle, this.fillColor, this.lineColor, this.lineWidth, this.conrnerRounding)
      newTrig.draw_cmds = []
      var delta = pointDelta(this.center, newCenter)
      var dx = delta.x
      var dy = delta.y
      
      for (var cmd_idx = 0; cmd_idx < this.draw_cmds.length; cmd_idx++) {
        var cmd = this.draw_cmds[cmd_idx]
        newTrig.draw_cmds.push([cmd[0] + dx, cmd[1] + dy, cmd[2], cmd[3], cmd[4]])
      }
      return newTrig
    }

    draw (ctx) {
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.fillColor;
      ctx.strokeStyle = this.fillColor;
      ctx.beginPath();
      if (!this.draw_cmds) {
        this.calcDraw()
      }
      this.draw_cmds.map((cmds) => ctx.arc(cmds[0], cmds[1], cmds[2], cmds[3], cmds[4]))
      ctx.closePath();
      //ctx.stroke();
      ctx.fill();
    }
  }
  
  function updateDims() {
    w = c.width = c.scrollWidth;
    h = c.height = c.scrollHeight;
  }

  var cosMemo = {}
  var sinMemo = {}

  function getCos(rot) {
    if (!(rot in cosMemo)) {
      cosMemo[rot] = Math.cos(rot)
    }
    return cosMemo[rot]
  }

  function getSin(rot) {
    if (!(rot in sinMemo)) {
      sinMemo[rot] = Math.sin(rot)
    }
    return sinMemo[rot]
  }

  function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    
    var horizOffset = Math.sqrt(3) * trigRad + trigGap
    var vertOffset = trigRad * 3 / 2 + trigGap * 2
    
    var rows = Math.min(Math.ceil(h / vertOffset), MAX_ROWS)
    var cols = Math.min(Math.ceil(w / horizOffset + 1) * 2, MAX_COLS)
    
    var min_x = 0, max_x = (Math.floor(cols / 2) + 0.5) * horizOffset,
        min_y = 0, max_y = rows * vertOffset + trigRad / 2
    var min_point = makePoint(min_x, min_y),
        max_point = makePoint(max_x, max_y)
    var max_dist = dist(min_point, max_point)

    var render = 0

    var rect = c.getBoundingClientRect()
    var real_mouse = {x : 0, y : mousePos.y + rect.y}
    var ban_rect = ban.getBoundingClientRect()
    var ban_pos = {x : 0, y : ban_rect.y + ban_rect.height / 2}

    var ban_dist = dist(real_mouse, ban_pos)
    var selColor = 
      Math.max(
        (0, 
        Math.min(
          gradientLength - 1, 
          Math.floor(ban_dist / max_dist * gradientLength)))
       + gradientOffset)
    selColor = Math.min(selColor, calculatedGradient.length - 1)
    
    ban.style.backgroundColor = calculatedGradient[selColor]
    
    for (var row = 0; row < rows; row ++) {
      for (var col = 0; col < cols; col ++) {
        //center, radius, angle, fillColor, lineColor, lineWidth, cornerRounding
        if (row + col > frame) {
          continue
        }
        
        var trig = getTriangle(row, col, vertOffset, horizOffset)
        var center = trig.center
        var selColor = 
          Math.max(
            (0, 
            Math.min(
              gradientLength - 1, 
              Math.floor(dist(center, mousePos) / max_dist * gradientLength)))
           + gradientOffset)
        selColor = Math.min(selColor, calculatedGradient.length - 1)
        var triCol = calculatedGradient[selColor]
        trig.fillColor = triCol
        trig.draw(ctx)
        
        render ++
      }
    }
  }

  var even_trig = new Triangle(makePoint(0, 0), trigRad, Math.PI / 2, 
    defaultColor, defaultOutline, trigStroke, trigRound), 
    odd_trig = new Triangle(makePoint(0, 0), trigRad, Math.PI * 3 / 2,
    defaultColor, defaultOutline, trigStroke, trigRound)
  even_trig.calcDraw()
  odd_trig.calcDraw()

  function getTriangle(row, col, vertOffset, horizOffset) {
    var point = row * MAX_COLS + col
    
    if (!grid[point]) {
      var center = makePoint(
        (Math.floor(col / 2)  + (col % 2) * 0.5 + (row % 2) * -0.5) * horizOffset,
        row * vertOffset + (col % 2 == 0 ? 0 : trigRad / 2) - (col % 2 == 0 ? 1 : 0) * trigGap)
      var trig = col % 2 == 0 ? even_trig.getTranslated(center) : odd_trig.getTranslated(center)
      grid[point] = trig
    }
    
    return grid[point]
  }

  function anim() {
    setTimeout(function() {
      
      if (incrementGradient) {
        gradientOffset += gradientSpeed
      }
      
      if (gradientOffset >= gradientSteps) {
        incrementGradient = false;
      }
      
      window.requestAnimationFrame( anim )
      
      ++frame
      
      updateDims()
      
      render()
    }, 1000 / framesPerSecond);
  }

  function init() {
    updateDims()
    updateGradient()
    if (c != null) {
      anim()
    }
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
  window.addEventListener('touchmove', function(evt) {
    mousePos = getMousePos(c, evt.changedTouches[0]);
  }, false);


  var last_known_scroll_position = 0

  window.addEventListener('scroll', function(evt) {
    var newpos = window.scrollY
    var deltay = newpos - last_known_scroll_position
    last_known_scroll_position = newpos
    mousePos.y += deltay
  }, false);
  
  function updateGradient() {
    if (incrementGradient == false) {
      gradientStep += 1
      if (gradientStep >= gradientColors.length) {
        gradientStep %= gradientColors.length
      }
      calculatedGradient = makeColorGrad([gradientColors[gradientStep != 0 ? gradientStep - 1 : gradientColors.length - 1], gradientColors[gradientStep], gradientColors[(gradientStep + 1) % gradientColors.length]], gradientSteps * 2)
      incrementGradient = true
      gradientOffset = 0
    }
  }
  
  window.addEventListener('click', function(evt) {
    var rect = c.getBoundingClientRect();
    if (rect.y + rect.height >= 0) {
      updateGradient();
    }
  })
  
  window.addEventListener('touchend', function(evt) {
    var rect = c.getBoundingClientRect();
    if (rect.y + rect.height >= 0) {
      updateGradient();
    }
  })
  
  init()
}

window.addEventListener('load', () => {
  startBanner()
});
