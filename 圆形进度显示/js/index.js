new radialProgress("#radial1", {
  fill: 90,
  size: 300,
  textSize: 120
});
new radialProgress("#radial2", {
  fill: 80,
  size: 300,
  textSize: 28
});
new radialProgress("#radial3", {
  fill: 100,
  size: 300,
  textSize: 28
});
new radialProgress("#radial4", {
  fill: 75,
  size: 300,
  textSize: 28,
  ringSize: 20,
  ringColor: "green",
  shade: "blue"
});
new radialProgress("#radial5", {
  fill: 50,
  size: 300,
  textSize: 28,
  ringSize: 20,
  background: "yellow",
  textColor: "#000"
});
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
var animate2 = new radialProgress("#radial7", {
  fill: 0,
  size: 300,
  textSize: 28,
  textPostfix: "%"
});
var aFilled2 = 0;
var aInterval2 = setInterval(function() {
  aFilled2 += .72;
  aFilled2 = Math.round(aFilled2)
  animate2.set({
    ringColor: "hsl(" + aFilled2 + ",100%,50%)"
  });
  animate2.fill(aFilled2)
  if (aFilled2 >= 100) {
    clearInterval(aInterval2);
  }
}, 50)

var animate3 = new radialProgress("#radial8", {
  fill: 0,
  size: 300,
  textSize: 28,
  textPostfix: "%",
  ringSize: 20
});
var aFilled3 = 0;
var aInterval3 = setInterval(function() {
  aFilled3 += .72;
  aFilled3 = Math.round(aFilled3)
  animate3.set({
    ringColor: "hsl(" + aFilled3 + ",100%,50%)",
    textColor: "hsl(" + (100 - aFilled3) + ",100%,50%)"
  });
  animate3.fill(aFilled3)
  if (aFilled3 >= 100) {
    clearInterval(aInterval3);
  }
}, 100)