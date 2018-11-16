var animate = new radialProgress("#radial6", {
  fill: 0,
  size: 300,
  textSize: 28,
  textPostfix: "%"
});
var aFilled = 0;
var aInterval = setInterval(function() {
  aFilled += .72;
  aFilled = Math.round(aFilled)
  animate.fill(aFilled)
  if (aFilled >= 100) {
    clearInterval(aInterval);
  }
}, 50)
