/**
 * zxx.js small JavaScript library for private use
 * Copyright (c) 2013 zhangxinxu(.com)
 * ---------------------------------------------
 * 2012-03-01	Version: 1.0
 */
 
(function(window, undefined) {

	
var $ = function(selector, context) {
	return new _zxx.prototype.init(selector, context);	
};

var _zxx = function() {};

_zxx.prototype = {
	constructor: $,
	init: function(selector, context) {
		/*
		 * add by zhangxinxu
		*/
		if (!selector) return [];
		if (selector.nodeType === 1) {
			this.context = [selector];	
		} else if (selector instanceof Array) {
			this.context = selector;	
		} else if (typeof selector == "object" && selector.hasOwnProperty("context") && selector.context instanceof Array) {
			this.context = selector.context;
		} else {
			this.context = mini(selector, context);
		}
		this.length = this.context.length;
		return this;
	},
	get: function(index) {
		return this.context[index];
	},
	eq: function(index) {
		return $(this.get(index));
	},
	each: function(fn) {
		this.context.forEach(function(el, index) {
			fn.call(el, index, el);
		});
		return this;
	},
	bind: function(type, fn, capture) {
		this.context.forEach(function(el) {
			Events.addEvent(el, type, fn, capture);
		});
		return this;
	},
	click: function(fn, capture) {
		return this.bind("click", fn, capture);
	},
	css: function(name, value) {
		if (name === undefined || this.length === 0) return this;
		if (value === undefined && typeof name === "string") {
			return this.context[0].currentStyle? this.context[0].currentStyle[name]
				: window.getComputedStyle(this.context[0], null)[name]; 	
		}
	
		if (typeof name === "string" && (value || value === 0)) {
			value = value + ((Number(value) || value == 0)? "px": "");
			name == "float" && (name = this.context[0].style.cssFloat !== undefined? "cssFloat": "styleFloat");
			this.context.forEach(function(el) {
				el.style[name] = value;	
			});	
		} else if (typeof name === "object") {
			var key;
			for (key in name) {
				this.css(key, name[key]);	
			}
		}
		return this;
	},
	attr: function(name, value) {
		if (name === undefined || this.length === 0) return this;
		if (name === "class") name = "className";
		if (name === "for") name = "htmlFor";
		if (value === undefined && typeof name === "string") {
			return this.context[0].getAttribute(name) || undefined;
		}
		value = value + "";
		if (typeof name === "string") {
			this.context.forEach(function(el) {
				el.setAttribute(name, value);
			});
		} else if (typeof name === "object") {
			var key;
			for (key in name) {
				this.attr(key, name[key]);	
			}
		}
		return this;
	},
	removeAttr: function(name, fn) {
		if (typeof name === "string") {
			if (name === "class") name = "className";
			if (name === "for") name = "htmlFor";
			this.context.forEach(function(el) {
				el.removeAttribute(name);
				if (typeof fn == "function") {
					fn.call(el);
				}
			});	
		} else if (name instanceof Array) {
			var i=0, len = name.length;
			for (; i<len; i+=1) {
				this.removeAttr(name[i], fn);	
			}
		}
		return this;
	},
	html: function(value) {
		if (value === undefined) {
			return this.length? this.context[0].innerHTML : '';
		} else {
			this.context.forEach(function(el) {
				el.innerHTML = value;
			});	
		}
		return this;
	},
	data: function(name, value) {
		if (value === undefined) {
			if (typeof name == "object") {
				var key;
				for (key in name) {
					this.data(key, name[key]);	
				}
			} else {
				if (this.length === 0 || !this.context[0]._data) return null;
				return this.context[0]._data[name];
			}
			
		} else if (/^string|number$/.test(typeof name)) {
			// 存储
			this.context.forEach(function(el) {
				el._data = el._data || {};
				el._data[name] = value;
			});
		} else if (name instanceof Array) {
			var i=0, len = name.length;
			for (; i<len; i+=1) {
				this.data(name[i], value);	
			}
		}
		return this;
	},
	show: function(display) {
		this.context.forEach(function(el) {
			display = display || $(el).data("_oldDisplay") || "block";
			el.style.display = display;
		});
		return this;
	},
	hide: function() {
		this.context.forEach(function(el) {
			var display = $(el).css("display");
			$(el).css("display", "none").data("_oldDisplay", display);
		});
		return this;
	},
	hasClass: function(name) {
		// 所有元素都要通过
		var hasClass = true;
		this.context.forEach(function(el) {
			if (hasClass === true && (" " + el.className + " ").replace(/[\t\r\n]/g, " ").indexOf(" " +  name + " ") === -1 ) {
				hasClass = false;
			}
		});
		return hasClass;
	},
	addClass: function(name) {
		this.context.forEach(function(el) {
			if ($(el).hasClass(name) == false) {
				/\s+$/.test(el.className)? (el.className += name): (el.className = el.className + " " + name);
			}
		});
		return this;
	},
	removeClass: function(name) {
		this.context.forEach(function(el) {
			if ($(el).hasClass(name)) {
				// 可能一个className中多个一样的类名: eg. class=" l l f12"
				var arrCl = el.className.split(" ");
				arrCl.forEach(function(cl, index) {
					if (cl && cl === name) {
						arrCl[index] = ""; 	
					}
				});
				el.className = arrCl.join(" ");
			}
		});
		return this;
	},
	val: function(value) {
		if (value == undefined) {
			if (this.length) {
				return this.context[0].value;
			}
		} else {
			this.context.forEach(function(el) {
				el.value = value;
			});
		}
		return this;
	},
	append: function(value) {
		var type = typeof value;
		if (value !== undefined) {
			this.context.forEach(function(el) {
				if (type === "string") {
					el.innerHTML = el.innerHTML + value;	
				} else if (type === "object") {
					if (value.nodeType === 1) {
						el.appendChild(value);	
					} else if (value.context && value.length) {
						value.context.forEach(function(elAppend) {
							el.appendChild(elAppend);		
						});
					}
				}
			});
		}
		return this;
	},
	extend: function(obj) {
		var key;	
		if (typeof obj === "object" && !(obj instanceof Array)) {
			for (key in obj) {
				_zxx.prototype[key] = obj[key];
			}
		}
		return this;
	}
};

$.fn = _zxx.prototype.init.prototype = _zxx.prototype;


$.extend = function() {
	var length = arguments.length
		, target = arguments[0] || {}, i = 1;
	if (length === 1) {
		target = $;
		--i;
	}
	for (; i<length; i+=1) {
		var key, obj = arguments[i];
		if (typeof obj === "object") {
			for (key in obj) {
				target[key] = obj[key];
			}
		}
	}
	return target;
};

$.extend({
	type: function(obj) {
		return typeof obj;
	},
	isFunction: function(obj) {
		$.type(obj) == "function";	
	},
	isArray: function(obj) {
		return toString.call(obj) === "[object Array]";
	}
});


if (![].forEach) {
	Array.prototype.forEach = function(fn) {
		var i, len;
		if (typeof fn === "function") {
			i=0, len = this.length;
			for (; i<len; i+=1) {
				fn(this[i], i);	
			}
		}
		return undefined
	};
}
if (!"".trim) {
	String.prototype.trim = function() {
		return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
	};	
}
if (!function(){}.bind) {
	Function.prototype.bind = function (context) {
		var method = this
			, slice = Array.prototype.slice
			, args = slice.call(arguments, 1);			
		return function () {
			return method.apply(context, args.concat(slice.call(arguments)));
		};
	};
}

/**
 * "mini" Selector Engine
 * Copyright (c) 2009 James Padolsey
 * -------------------------------------------------------
 * Dual licensed under the MIT and GPL licenses.
 *    - http://www.opensource.org/licenses/mit-license.php
 *    - http://www.gnu.org/copyleft/gpl.html
 * -------------------------------------------------------
 * Version: 0.01 (BETA)
 */


var mini = (function(){
    
    var snack = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        exprClassName = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        exprId = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        exprNodeName = /^([\w\*\-_]+)/,
        na = [null,null];
    
    function _find(selector, context) {
        
        /**
         * This is what you call via x()
         * Starts everything off...
         */
        
        context = context || document;
        
		
        var simple = /^[\w\-_#]+$/.test(selector);
        
        if (!simple && context.querySelectorAll) {
            return realArray(context.querySelectorAll(selector));
        }
        
        if (selector.indexOf(',') > -1) {
            var split = selector.split(/,/g), ret = [], sIndex = 0, len = split.length;
            for(; sIndex < len; ++sIndex) {
                ret = ret.concat( _find(split[sIndex], context) );
            }
            return unique(ret);
        }
        
        var parts = selector.match(snack),
            part = parts.pop(),
            id = (part.match(exprId) || na)[1],
            className = !id && (part.match(exprClassName) || na)[1],
            nodeName = !id && (part.match(exprNodeName) || na)[1],
            collection;
            
        if (className && !nodeName && context.getElementsByClassName) {
            
            collection = realArray(context.getElementsByClassName(className));
            
        } else {
            
            collection = !id && realArray(context.getElementsByTagName(nodeName || '*'));
            
            if (className) {
                collection = filterByAttr(collection, 'className', RegExp('(^|\\s)' + className + '(\\s|$)'));
            }
            
            if (id) {
                var byId = context.getElementById(id);
                return byId?[byId]:[];
            }
        }
        
        return parts[0] && collection[0] ? filterParents(parts, collection) : collection;
        
    }
    
    function realArray(c) {
        
        /**
         * Transforms a node collection into
         * a real array
         */
        
        try {
            return Array.prototype.slice.call(c);
        } catch(e) {
            var ret = [], i = 0, len = c.length;
            for (; i < len; ++i) {
                ret[i] = c[i];
            }
            return ret;
        }
        
    }
    
    function filterParents(selectorParts, collection, direct) {
        
        /**
         * This is where the magic happens.
         * Parents are stepped through (upwards) to
         * see if they comply with the selector.
         */
        
        var parentSelector = selectorParts.pop();
        
        if (parentSelector === '>') {
            return filterParents(selectorParts, collection, true);
        }
        
        var ret = [],
            r = -1,
            id = (parentSelector.match(exprId) || na)[1],
            className = !id && (parentSelector.match(exprClassName) || na)[1],
            nodeName = !id && (parentSelector.match(exprNodeName) || na)[1],
            cIndex = -1,
            node, parent,
            matches;
            
        nodeName = nodeName && nodeName.toLowerCase();
            
        while ( (node = collection[++cIndex]) ) {
            
            parent = node.parentNode;
            
            do {
                
                matches = !nodeName || nodeName === '*' || nodeName === parent.nodeName.toLowerCase();
                matches = matches && (!id || parent.id === id);
                matches = matches && (!className || RegExp('(^|\\s)' + className + '(\\s|$)').test(parent.className));
                
                if (direct || matches) { break; }
                
            } while ( (parent = parent.parentNode) );
            
            if (matches) {
                ret[++r] = node;
            }
        }
        
        return selectorParts[0] && ret[0] ? filterParents(selectorParts, ret) : ret;
        
    }
    
    
    var unique = (function(){   
        var uid = +new Date();               
        var data = (function(){         
            var n = 1;         
            return function(elem) {         
                var cacheIndex = elem[uid],
                    nextCacheIndex = n++;
         
                if(!cacheIndex) {
                    elem[uid] = nextCacheIndex;
                    return true;
                }         
                return false;        
            };         
        })();
        
        return function(arr) {        
            /**
             * Returns a unique array
             */
            
            var length = arr.length,
                ret = [],
                r = -1,
                i = 0,
                item;
                
            for (; i < length; ++i) {
                item = arr[i];
                if (data(item)) {
                    ret[++r] = item;
                }
            }
            
            uid += 1;
            return ret;
        };    
    })();
    
    function filterByAttr(collection, attr, regex) {
        /**
         * Filters a collection by an attribute.
         */        
        var i = -1, node, r = -1, ret = [];
        while ( (node = collection[++i]) ) {
            if (regex.test(node[attr])) {
                ret[++r] = node;
            }
        }
        return ret;
    }    
    return _find;
})();


// custom events by zhangxinxu(.com) http://www.zhangxinxu.com/wordpress/?p=2330 
var Events = (function() {
	return {
		addEvent: (function() {
			if (window.addEventListener) {
				return function(el, type, fn, capture) {
					el.addEventListener(type, fn, capture);
					var ev = document.createEvent("HTMLEvents");
					ev.initEvent(type, capture || false, false);
					
					if (!el["ev" + type]) {
						el["ev" + type] = ev;
					}  
				}
			} else if (window.attachEvent) {
				return function(el, type, fn, capture) {
					el.attachEvent("on" + type, function(e) {
						fn.call(el, e);	
					});    
					if (isNaN(el["cu" + type])) {
						// 自定义属性
						el["cu" + type] = 0; 
					}   
					var fnEv = function(event) {
						if (event.propertyName == "cu" + type) { fn.call(el); }
					};
					el.attachEvent("onpropertychange", fnEv);     
					if (!el["ev" + type]) {
						el["ev" + type] = [fnEv];
					} else {
						el["ev" + type].push(fnEv);    
					}	
				}
			}
			return function() {};	
		})(),
		fireEvent: (function() {
			if (document.dispatchEvent) {
				return function(el, type) {
					if (typeof type === "string" && el["ev" + type]) {
						el.dispatchEvent(el["ev" + type]);
					}	
				}
			} else if (document.attachEvent) {
				return function(el, type) {
					if (typeof type === "string") {
						el["cu" + type]++;
					}	
				}
			}
			return function() {};			
		})(),
		removeEvent:(function() {
			if (window.removeEventListener) {
				return function(el, type, fn, capture) {
					el.removeEventListener(type, fn, capture || false);
				};
			} else if (document.attachEvent) {
				return function(el, type, fn, capture) {
					el.detachEvent("on" + type, fn);
					var arrEv = el["ev" + type];
					if (arrEv instanceof Array) {
						for (var i=0; i<arrEv.length; i+=1) {
							el.detachEvent("onpropertychange", arrEv[i]);
						}
					}	
				}
			}
			return function() {};	
		})()
	};	
})(window);

window.$ = $;
})(window);

