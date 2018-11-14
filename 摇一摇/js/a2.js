(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1030);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yao = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66CC00").s().p("AA9AZIiMAAQgMBkhVA7IgDgFQAsgtARgwQARgyABhQQABhRgCgtIAoASIgPAOIAABKIBuAAQAAhUgBgrIAmASIgOANIAABgIBFAAIAZgZIAdAjIkAAAQAAAngDAeICIAAIAMgRIAcAUIgNALQAABuABApIgaAMQACgxAAh2g");
	this.shape.setTransform(213.6,24.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66CC00").s().p("AihB6IAAj3IgBg+IAYAPIEHAAIAMgRIAaAVIgLALIAAEPQAAAhABAaIgYANIAAghIkLAAIAAAaIgYAKQABggAAgjgAiKAuIAABhIELAAIAAkyIiwAAIAbAQIgJAEIgPAYIBWAAIALgQIAZAYIgNAIQgcAngeAhQAzAlBCAGIAAAHQgZACgGARQg6gVgpgkQg6AthKAUgAiKAmQBNghArgoQgVgdgRglQgaAogdAcIgFgDQAagiASgmQASglADgSIhXAAgAgFguQAWgaAXgmIhZAAQAXApAVAXgAAeB8QgYgUhMgXIAAgHQBKAIAYAIQAYAHABAYQABAMgHAAQgGAAgLgJgAALA9QgOgRgmgYIACgEQAnAHAQAHQAQAHgDAVQgBALgFAAQgFAAgHgIg");
	this.shape_1.setTransform(173,24.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66CC00").s().p("Ai8C4QArg9ADhdQADhbgDg1IAdAPIB+AAIgIhZIAqARIgLANQAAAaADAhIBaAAIAXgXIAhAhIiSAAQAKBrAYAsQAOgTANggQANgeANgnIAiAaIgOAIQgcBDgeAqQAjApAlARIAUhHIAHACQgHAzAAAQQAAAQAIAPQAIAPgqgQQgrgPgpgzQgzA0g7AbIgCgHQBBgrAigvQghg9gKhzIiAAAIgCBOIBMAAIAOgQIAZAXIgPALQgFBigIAQQgIAPgXAKQgFgXgngPIAAgGIArAGQAMACAEgQQADgPADhQIhNAAQgFCHhAA3gABnh9QgFgSgcgjIAFgFQAjAUALALQAMAKgDALQgCALgKAGQgDACgCAAQgHAAgDgNg");
	this.shape_2.setTransform(129.8,24.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#66CC00").s().p("Ai9CoICyAAIAAh2Ig+AAQgVgBgSAFIgPgOIB0AAIAAhmIhkAAQglBHgeAdIgFgEQAcgpAUgzQAUgzAKgsIAlAVQgRAJgWA0IBgAAQAAhMgBgiIAnARIgOALIAABSIBeAAIAYgYIAgAhIiWAAIAABmIBKAAIAagZIAeAjIiCAAIAAB2IB2AAIAagbIAiAlIlGAAQgVAAgTAEg");
	this.shape_3.setTransform(88,23.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#66CC00").s().p("AiwCcIAAgHQAiAFALgBQALgBAAgTIAAh1QgnAggIALIgVgbQAOgCA2gfIAAhVIggAAIgUADIgNgNIBBAAQAAg7gCghIAmASIgOAMIAAA+IAQAAIASgSIAcAcIg+AAIAABKIAxggIADAGIg0AoIAACSQAAAbghANQAAgQgtgQgACECkIiWAAIgMANIgVgTIALgKQABgzgCgcIAkASIgNAJIAAA6IA/AAIAAhgIhEAAQgVAAgSAEIgPgOIB6AAIAAg7IgzAAQgaAbgeAUIgFgEQASgPASgaQAUgaAGgXIAcAUQgHAAgPARIBuAAIAVgUIAfAeIhgAAIAAA7IBGAAIAVgWIAgAgIh7AAIAABgIBBAAQAAgxgCgdIAkAQIgMAKQAAAyABAYIgXAKgABggvQAUgfAIgSQAJgTAHgXIAhAWQgNACgSAXQgSAXgXAXgAAzhHQgDgVgTgeIAEgEQAlAcAFAMQAEALgMANQgEAFgEAAQgFAAgDgOgAgOhHQgEgUgQgZIADgDQAcASAHAMQAIANgLANQgEAFgDAAQgGAAgCgNgAgqiGQA9gIAygNQAzgNANgMIAbAgQgWAAgvAGQgvAHhVAIg");
	this.shape_4.setTransform(45.6,24.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#66CC00").s().p("Ai6AFIEwAAIAhgZIAkAjIk6AAQgaAAgTAGg");
	this.shape_5.setTransform(4,21.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#66CC00").s().p("AivCcIAAgHQAgAFAMgBQAMgBAAgTIAAh1QgoAggIALIgWgbQAPgCA3gfIAAhVIgiAAIgTADIgNgNIBCAAQAAg7gCghIAmASIgQAMIAAA+IARAAIASgSIAcAcIg/AAIAABKIAyggIADAGIg1AoIAACSQABAbghANQAAgQgsgQgACECkIiWAAIgLANIgWgTIAMgKQgBgzgBgcIAkASIgNAJIAAA6IA/AAIAAhgIhEAAQgVAAgTAEIgOgOIB6AAIAAg7Ig0AAQgZAbgfAUIgEgEQASgPATgaQATgaAGgXIAdAUQgJAAgPARIBvAAIAVgUIAfAeIhgAAIAAA7IBGAAIAVgWIAfAgIh6AAIAABgIBBAAQAAgxgBgdIAkAQIgOAKQAAAyACAYIgXAKgABggvQATgfAJgSQAKgTAGgXIAhAWQgNACgSAXQgSAXgXAXgAAzhHQgCgVgVgeIAFgEQAkAcAGAMQAEALgMANQgEAFgEAAQgFAAgDgOgAgOhHQgEgUgRgZIAEgDQAcASAHAMQAIANgMANQgDAFgDAAQgGAAgCgNgAgriGQA+gIAygNQA0gNAMgMIAbAgQgWAAgvAGQgwAHhUAIg");
	this.shape_6.setTransform(-38.4,24.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.yao, new cjs.Rectangle(-80.2,0,336.3,50.6), null);


(lib.head = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = getMCSymbolPrototype(lib.head, null, null);


(lib.ewm = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = getMCSymbolPrototype(lib.ewm, null, null);


(lib.bg_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.bg();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.bg_1, new cjs.Rectangle(0,0,640,1030), null);


(lib.actName = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.text = new cjs.Text("", "42px 'TimesNewRomanPSMT'", "#66CC00");
	this.text.lineHeight = 49;
	this.text.lineWidth = 318;
	this.text.parent = this;
	this.text.setTransform(2,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

}).prototype = getMCSymbolPrototype(lib.actName, new cjs.Rectangle(0,0,322.4,50.6), null);


// stage content:
(lib.a2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		//http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// 图层 2
	this.head = new lib.head();
	this.head.parent = this;
	this.head.setTransform(179.3,348.7);

	this.actName = new lib.actName();
	this.actName.parent = this;
	this.actName.setTransform(391,1085.7,1,1,0,0,0,161.2,25.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66CC00").s().p("AgOBJQgOgIgBgRQgBgQAQgIQAOgIAOAJQAOAJgBAPQAAAQgOAIQgHAEgGAAQgHAAgHgEgAgRgZQgNgJABgQQABgQAPgGQANgIAPAIQAPAGAAASQAAARgRAHQgIAEgGAAQgIAAgIgFg");
	this.shape.setTransform(194,1092.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66CC00").s().p("AAiCqQgJgIgXgJIABgGQA1AKAEgEQAEgDAAgIQAAiygCglIAkASIgNALIAADCQAAAPgGAIQgHAIgUAKQgIgNgKgIgAhtACQgfBFgwArIgDgFQAZghAVgsQAVgrAMgpIgWAAQgVAAgSAEIgPgOIBPAAIAAhIIhKAIIAAgHQAmgGAlgMQAlgLAagQIAVAdQgSAAguALIAABMIAPAAIAUgTIAcAdIg/AAIAAAdQAcAPATAQQATAQgLAUQgKATgLgdQgLgegXgTQAACVACAvIgZAKQACgxAAiMgAg3CIQAegoASgqQARgqAFgZIAhATIgOAKQgkBUgyApgACeByQgFgVgOgcQgNgcgYglIADgFQAzA0APAZQAOAYgBAMQgCALgJAIQgCADgCAAQgGAAgFgQgAglgQQAegtAPgwQARgwAIghIAiAUQgLAGgaA7IB0AAIASgSIAcAgQgNAAgOAMQgOAMgVAcIgFgEIAXg0Ih6AAQgcA3gfAdg");
	this.shape_1.setTransform(164.3,1084.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66CC00").s().p("AgyBxIAAgzQg5Agg/AOIgBgFQBGgaAzgkIAAgQIASAGQAlgaApgmQApgmAcgrIiOAAQgQAVgQASQA0AWADAOQADAOgJAMQgJAMgHgSQgIgTgegfIAFgGIgCgBIgFAFIACACQgkAmgnAWIgFgFQAmgcAjgvQAkgwAQgzIAjAbIgRAGIgVAfICJAAIAOgSIAgAZIgSAKQgmA2goAjQgpAigkAZICRAAIANgQIAaAVIgNAKIAAA+QAAAZACAcIgZANIAAgZIijAAIAAAUIgZAKIAChMgAgbCVICjAAIAAhiIijAAgAhAhFIgCgCIAFgFIACABIgFAGIAAAAg");
	this.shape_2.setTransform(121,1084.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#66CC00").s().p("AhAC5QA1gkAYglQAaglAKguQALgsACg8IgeAAIgUAEIgMgNIA+AAQAAhFgCgkIAiAQIgLAMIAABNIBBAAIAOgPIAYAUIgNALQgCCtgJAjQgJAkgnALQgCgSgxgVIACgJQA4AOAJgHQAKgHAEgmQAEgnAEiJIhFAAQgCA/gMAwQgMAxggAmQgfAmg1AdgAi2BdQASgEAcgyQAcgyAGgdIg0AAIgSADIgNgNICaAAIAUgUIAcAeIhtAAIAbAUQgRAGgbAoQgbApgXAZICCgPQgRghgSgcIAFgDQA6A1ACASQADATgJAKQgKAKgDgMIgIgaQh4AWgSATgAisiGIB2AAIAUgTIAdAdIh3AAQgTAAgOAFg");
	this.shape_3.setTransform(80.1,1084.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#66CC00").s().p("ABzCLIiOAAIAAAkIgYALIABhXQAAgqgBgrIAYANIA9AAIAAhJIg6AAQgVAAgSAFIgPgPIBwAAIAAhSIhfAJIAAgHQBPgNArgLQAqgKAZgPIAZAhIgpAFIg4AIIAABTIBXAAIATgTIAcAdIiGAAIAABJIA5AAIARgQIAYAaIgQAKIAABAQAAAiABAfIgYAKgAgbCBICOAAIAAhcIiOAAgAiPCnQgUgHAKgiQAKghgKgJQgKgJgZgHIAAgGQAeADAHgBQAIgBAJgOQAJgOAsh9IAHACIgvCfQgGAUABAeIACApQAAAHgIAAQgEAAgHgCgAiagcQgHgXgcgfIADgFQA5AeAAATQAAATgJAGIgEACQgGAAgGgRgAh4h9QgHgWgZgeIAEgFQAuAXAFARQAGAQgLALQgDAEgEAAQgGAAgFgOg");
	this.shape_4.setTransform(39,1085.3);

	this.ewm = new lib.ewm();
	this.ewm.parent = this;
	this.ewm.setTransform(440.4,847.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ewm},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.actName},{t:this.head}]}).wait(2));

	// 图层 1
	this.instance = new lib.yao();
	this.instance.parent = this;
	this.instance.setTransform(313.4,638.5,1,1,0,0,0,87,25.3);

	this.instance_1 = new lib.bg_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(320,515,1,1,0,0,0,320,515);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(335.6,1181.2,536.6,497.7);
// library properties:
lib.properties = {
	width: 640,
	height: 1136,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/bg.jpg?1533721534546", id:"bg"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;