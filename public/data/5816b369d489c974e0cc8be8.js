(function () {
	'use strict';

	var props = {"id":"5816b369d489c974e0cc8be8","status":"open","theme":{"fieldTitleText":"#222222","footerBackground":"#FFFFFF","footerText":"#222222","formBackground":"#FFFFFF","headerBackground":"#FFFFFF","headerIntroText":"#444444","headerText":"#222222","inputBackground":"#FFFFFF","inputText":"#222222","progressBar":"#44AA44","progressBarBackground":"#CCCCCC","requiredAsterisk":"#939393","selectedItemBackground":"#2E343B","selectedItemText":"#FAFAFA","submitButtonBackground":"#F67D6E","submitButtonText":"#FFFFFF"},"settings":{"baseUrl":"http://localhost:4444/widgets/","inactiveMessage":"We are not currently accepting submissions. Thank you.","recaptcha":false,"saveDestination":"http://localhost:16183/v1/form/5816b369d489c974e0cc8be8/submission","showFieldNumbers":true},"header":{"description":"The election is over. It’s time to plan for a new administration. \n\n\nHow do you feel about the transition? Which issues should top the agenda? Tell the president-elect what you think.","heading":"Tell the President","title":"Tell the President (2)"},"footer":{"conditions":""},"finishedScreen":{"description":"Thank you for helping us with our journalism. We read all submissions, and will be in touch if we have any more questions.","title":"Thanks."},"steps":[{"id":"25080377-a1de-4616-a911-1e90549561c3","name":"first_step","widgets":[{"id":"c5dba9b7-ba42-44a4-8466-fc2c667617cd","type":"field","identity":false,"component":"MultipleChoice","title":"How do you feel as the new president prepares to take office?","description":"","wrapper":{"required":true},"props":{"groupSubmissions":true,"includeInGroups":true,"multipleChoice":false,"options":[{"placeholder":false,"title":"😍"},{"placeholder":false,"title":"😀"},{"placeholder":false,"title":"😐"},{"placeholder":false,"title":"😟"},{"placeholder":false,"title":"😞"},{"placeholder":false,"title":"😡"},{"placeholder":false,"title":"😳"},{"placeholder":false,"title":"🤔"},{"placeholder":false,"title":"🇺🇸"}],"otherAllowed":false}},{"title":"Which issue should be highest on the new president’s agenda?","friendlyType":"Multiple choice","type":"field","component":"MultipleChoice","identity":false,"wrapper":{"required":true},"props":{"multipleChoice":false,"otherAllowed":false,"options":[{"title":"The Economy","placeholder":false},{"title":"Cyber Security","placeholder":false},{"title":"Trade","placeholder":false},{"title":"Education","placeholder":false},{"title":"Energy and the Environment","placeholder":false},{"title":"Health Care","placeholder":false},{"title":"Crime","placeholder":false},{"title":"Defense and National Security","placeholder":false},{"title":"Immigration","placeholder":false},{"title":"Foreign Policy","placeholder":false},{"title":"Social Issues","placeholder":false}],"groupSubmissions":true,"includeInGroups":true},"id":"e9fbc117-e71e-4b98-a53e-74a897693280"},{"title":"If the new president achieves one thing in the next four years, what should it be?","friendlyType":"Long Answer","type":"field","component":"TextArea","identity":false,"wrapper":{"required":true},"props":{"maxLength":140,"includeInGroups":true},"id":"bc92bba1-ae82-4dfb-9261-ed062fe8db8b"},{"title":"Please provide your name for display","friendlyType":"Short Answer","type":"field","component":"TextField","identity":true,"wrapper":{"required":true},"props":{"includeInGroups":true},"id":"cceb81a8-7feb-43d8-b285-35217947c592"},{"title":"Please provide your location for display","friendlyType":"Short Answer","type":"field","component":"TextField","identity":false,"wrapper":{"required":true},"props":{"includeInGroups":true},"id":"a889cabd-6057-446f-9f3a-ce908230b6c7"}]}],"stats":{"responses":0},"created_by":null,"updated_by":null,"deleted_by":null,"date_created":"2016-10-30T22:58:49.677-04:00","date_updated":"2016-10-30T23:02:02.205609975-04:00","date_deleted":"0001-01-01T00:00:00Z"}, renderTarget = "#ask-form"

	function __$styleInject(css) {
	  css = css || '';
	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';
	  if (style.styleSheet){
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	  head.appendChild(style);
	}

	var babelHelpers = {};
	babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	babelHelpers.createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	babelHelpers.defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	babelHelpers.extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	babelHelpers.inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	babelHelpers.possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	babelHelpers;


	function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

	/** Virtual DOM Node */
	function VNode(nodeName, attributes, children) {
		/** @type {string|function} */
		this.nodeName = nodeName;

		/** @type {object<string>|undefined} */
		this.attributes = attributes;

		/** @type {array<VNode>|undefined} */
		this.children = children;

		/** Reference to the given key. */
		this.key = attributes && attributes.key;
	}

	/** Copy own-properties from `props` onto `obj`.
	 *	@returns obj
	 *	@private
	 */
	function extend(obj, props) {
		if (props) {
			for (var i in props) {
				if (props[i] !== undefined) {
					obj[i] = props[i];
				}
			}
		}
		return obj;
	}

	/** Fast clone. Note: does not filter out non-own properties.
	 *	@see https://esbench.com/bench/56baa34f45df6895002e03b6
	 */
	function clone(obj) {
		return extend({}, obj);
	}

	/** Get a deep property value from the given object, expressed in dot-notation.
	 *	@private
	 */
	function delve(obj, key) {
		for (var p = key.split('.'), i = 0; i < p.length && obj; i++) {
			obj = obj[p[i]];
		}
		return obj;
	}

	/** Convert an Array-like object to an Array
	 *	@private
	 */
	function toArray(obj, offset) {
		return [].slice.call(obj, offset);
	}

	/** @private is the given object a Function? */
	function isFunction(obj) {
		return 'function' === typeof obj;
	}

	/** @private is the given object a String? */
	function isString(obj) {
		return 'string' === typeof obj;
	}

	/** Check if a value is `null` or `undefined`.
	 *	@private
	 */
	function empty(x) {
		return x === undefined || x === null;
	}

	/** Check if a value is `null`, `undefined`, or explicitly `false`. */
	function falsey(value) {
		return value === false || empty(value);
	}

	/** Convert a hashmap of CSS classes to a space-delimited className string
	 *	@private
	 */
	function hashToClassName(c) {
		var str = '';
		for (var prop in c) {
			if (c[prop]) {
				if (str) str += ' ';
				str += prop;
			}
		}
		return str;
	}

	/** Just a memoized String#toLowerCase */
	var lcCache = {};
	var toLowerCase = function toLowerCase(s) {
		return lcCache[s] || (lcCache[s] = s.toLowerCase());
	};

	/** Call a function asynchronously, as soon as possible.
	 *	@param {Function} callback
	 */
	var resolved = typeof Promise !== 'undefined' && Promise.resolve();
	var defer = resolved ? function (f) {
		resolved.then(f);
	} : setTimeout;

	/** Global options
	 *	@public
	 *	@namespace options {Object}
	 */
	var options = {

		/** If `true`, `prop` changes trigger synchronous component updates.
	  *	@name syncComponentUpdates
	  *	@type Boolean
	  *	@default true
	  */
		//syncComponentUpdates: true,

		/** Processes all created VNodes.
	  *	@param {VNode} vnode	A newly-created VNode to normalize/process
	  */
		vnode: empty
	};

	var SHARED_TEMP_ARRAY = [];

	/** JSX/hyperscript reviver
	 *	@see http://jasonformat.com/wtf-is-jsx
	 *	@public
	 *  @example
	 *  /** @jsx h *\/
	 *  import { render, h } from 'preact';
	 *  render(<span>foo</span>, document.body);
	 */
	function h$1(nodeName, attributes, firstChild) {
		var len = arguments.length,
		    children = void 0,
		    arr = void 0,
		    lastSimple = void 0;

		if (len > 2) {
			var type = typeof firstChild === 'undefined' ? 'undefined' : babelHelpers.typeof(firstChild);
			if (len === 3 && type !== 'object' && type !== 'function') {
				if (!falsey(firstChild)) {
					children = [String(firstChild)];
				}
			} else {
				children = [];
				for (var i = 2; i < len; i++) {
					var _p = arguments[i];
					if (falsey(_p)) continue;
					if (_p.join) arr = _p;else (arr = SHARED_TEMP_ARRAY)[0] = _p;
					for (var j = 0; j < arr.length; j++) {
						var child = arr[j],
						    simple = !(falsey(child) || isFunction(child) || child instanceof VNode);
						if (simple && !isString(child)) child = String(child);
						if (simple && lastSimple) {
							children[children.length - 1] += child;
						} else if (!falsey(child)) {
							children.push(child);
							lastSimple = simple;
						}
					}
				}
			}
		} else if (attributes && attributes.children) {
			return h$1(nodeName, attributes, attributes.children);
		}

		if (attributes) {
			if (attributes.children) {
				delete attributes.children;
			}

			if (!isFunction(nodeName)) {
				// normalize className to class.
				if ('className' in attributes) {
					attributes.class = attributes.className;
					delete attributes.className;
				}

				lastSimple = attributes.class;
				if (lastSimple && !isString(lastSimple)) {
					attributes.class = hashToClassName(lastSimple);
				}

				// lastSimple = attributes.style;
				// if (lastSimple && !isString(lastSimple)) {
				// 	attributes.style = styleObjToCss(lastSimple);
				// }
			}
		}

		var p = new VNode(nodeName, attributes || undefined, children);
		if (options.vnode) options.vnode(p);
		return p;
	}

	function cloneElement(vnode, props) {
		return h$1(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? toArray(arguments, 2) : vnode.children);
	}

	// render modes

	var NO_RENDER = 0;
	var SYNC_RENDER = 1;
	var FORCE_RENDER = 2;
	var ASYNC_RENDER = 3;

	var EMPTY = {};

	var ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_';

	// DOM properties that should NOT have "px" added when numeric
	var NON_DIMENSION_PROPS = {
		boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
		flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
		opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
	};

	/** Create an Event handler function that sets a given state property.
	 *	@param {Component} component	The component whose state should be updated
	 *	@param {string} key				A dot-notated key path to update in the component's state
	 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
	 *	@returns {function} linkedStateHandler
	 *	@private
	 */
	function createLinkedState(component, key, eventPath) {
		var path = key.split('.'),
		    p0 = path[0];
		return function (e) {
			var t = e && e.currentTarget || this,
			    s = component.state,
			    obj = s,
			    v = void 0,
			    i = void 0;
			if (isString(eventPath)) {
				v = delve(e, eventPath);
				if (empty(v) && (t = t._component)) {
					v = delve(t, eventPath);
				}
			} else {
				v = t.nodeName ? (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value : e;
			}
			if (isFunction(v)) v = v.call(t);
			if (path.length > 1) {
				for (i = 0; i < path.length - 1; i++) {
					obj = obj[path[i]] || (obj[path[i]] = {});
				}
				obj[path[i]] = v;
				v = s[p0];
			}
			component.setState(babelHelpers.defineProperty({}, p0, v));
		};
	}

	var items = [];
	var itemsOffline = [];
	function enqueueRender(component) {
		if (items.push(component) !== 1) return;

		(options.debounceRendering || defer)(rerender);
	}

	function rerender() {
		if (!items.length) return;

		var currentItems = items,
		    p = void 0;

		// swap online & offline
		items = itemsOffline;
		itemsOffline = currentItems;

		while (p = currentItems.pop()) {
			if (p._dirty) renderComponent(p);
		}
	}

	/** Check if a VNode is a reference to a stateless functional component.
	 *	A function component is represented as a VNode whose `nodeName` property is a reference to a function.
	 *	If that function is not a Component (ie, has no `.render()` method on a prototype), it is considered a stateless functional component.
	 *	@param {VNode} vnode	A VNode
	 *	@private
	 */
	function isFunctionalComponent(vnode) {
	  var nodeName = vnode && vnode.nodeName;
	  return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
	}

	/** Construct a resultant VNode from a VNode referencing a stateless functional component.
	 *	@param {VNode} vnode	A VNode with a `nodeName` property that is a reference to a function.
	 *	@private
	 */
	function buildFunctionalComponent(vnode, context) {
	  return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
	}

	function ensureNodeData(node, data) {
		return node[ATTR_KEY] || (node[ATTR_KEY] = data || {});
	}

	function getNodeType(node) {
		if (node instanceof Text) return 3;
		if (node instanceof Element) return 1;
		return 0;
	}

	/** Removes a given DOM Node from its parent. */
	function removeNode(node) {
		var p = node.parentNode;
		if (p) p.removeChild(node);
	}

	/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
	 *	If `value` is `null`, the attribute/handler will be removed.
	 *	@param {Element} node	An element to mutate
	 *	@param {string} name	The name/key to set, such as an event or attribute name
	 *	@param {any} value		An attribute value, such as a function to be used as an event handler
	 *	@param {any} previousValue	The last value that was set for this name/node pair
	 *	@private
	 */
	function setAccessor(node, name, value, old, isSvg) {
		ensureNodeData(node)[name] = value;

		if (name === 'key' || name === 'children' || name === 'innerHTML') return;

		if (name === 'class' && !isSvg) {
			node.className = value || '';
		} else if (name === 'style') {
			if (!value || isString(value) || isString(old)) {
				node.style.cssText = value || '';
			}
			if (value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object') {
				if (!isString(old)) {
					for (var i in old) {
						if (!(i in value)) node.style[i] = '';
					}
				}
				for (var _i in value) {
					node.style[_i] = typeof value[_i] === 'number' && !NON_DIMENSION_PROPS[_i] ? value[_i] + 'px' : value[_i];
				}
			}
		} else if (name === 'dangerouslySetInnerHTML') {
			if (value) node.innerHTML = value.__html;
		} else if (name.match(/^on/i)) {
			var l = node._listeners || (node._listeners = {});
			name = toLowerCase(name.substring(2));
			if (value) {
				if (!l[name]) node.addEventListener(name, eventProxy);
			} else if (l[name]) {
				node.removeEventListener(name, eventProxy);
			}
			l[name] = value;
		} else if (name !== 'type' && !isSvg && name in node) {
			setProperty(node, name, empty(value) ? '' : value);
			if (falsey(value)) node.removeAttribute(name);
		} else {
			var ns = isSvg && name.match(/^xlink\:?(.+)/);
			if (falsey(value)) {
				if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]));else node.removeAttribute(name);
			} else if ((typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) !== 'object' && !isFunction(value)) {
				if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value);else node.setAttribute(name, value);
			}
		}
	}

	/** Attempt to set a DOM property to the given value.
	 *	IE & FF throw for certain property-value combinations.
	 */
	function setProperty(node, name, value) {
		try {
			node[name] = value;
		} catch (e) {}
	}

	/** Proxy an event to hooked event handlers
	 *	@private
	 */
	function eventProxy(e) {
		return this._listeners[e.type](options.event && options.event(e) || e);
	}

	/** Get a node's attributes as a hashmap.
	 *	@private
	 */
	function getRawNodeAttributes(node) {
		var attrs = {};
		for (var i = node.attributes.length; i--;) {
			attrs[node.attributes[i].name] = node.attributes[i].value;
		}
		return attrs;
	}

	/** Check if two nodes are equivalent.
	 *	@param {Element} node
	 *	@param {VNode} vnode
	 *	@private
	 */
	function isSameNodeType(node, vnode) {
		if (isString(vnode)) {
			return getNodeType(node) === 3;
		}
		if (isString(vnode.nodeName)) {
			return isNamedNode(node, vnode.nodeName);
		}
		if (isFunction(vnode.nodeName)) {
			return node._componentConstructor === vnode.nodeName || isFunctionalComponent(vnode);
		}
	}

	function isNamedNode(node, nodeName) {
		return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
	}

	/**
	 * Reconstruct Component-style `props` from a VNode.
	 * Ensures default/fallback values from `defaultProps`:
	 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
	 * @param {VNode} vnode
	 * @returns {Object} props
	 */
	function getNodeProps(vnode) {
		var defaultProps = vnode.nodeName.defaultProps,
		    props = clone(defaultProps || vnode.attributes);

		if (defaultProps) extend(props, vnode.attributes);

		if (vnode.children) props.children = vnode.children;

		return props;
	}

	/** DOM node pool, keyed on nodeName. */

	var nodes = {};

	function collectNode(node) {
		cleanNode(node);
		var name = toLowerCase(node.nodeName),
		    list = nodes[name];
		if (list) list.push(node);else nodes[name] = [node];
	}

	function createNode(nodeName, isSvg) {
		var name = toLowerCase(nodeName),
		    node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
		ensureNodeData(node);
		node.normalizedNodeName = name;
		return node;
	}

	function cleanNode(node) {
		removeNode(node);

		if (getNodeType(node) !== 1) return;

		// When reclaiming externally created nodes, seed the attribute cache: (Issue #97)

		ensureNodeData(node, getRawNodeAttributes(node));

		node._component = node._componentConstructor = null;

		// if (node.childNodes.length>0) {
		// 	console.trace(`Warning: Recycler collecting <${node.nodeName}> with ${node.childNodes.length} children.`);
		// 	for (let i=node.childNodes.length; i--; ) collectNode(node.childNodes[i]);
		// }
	}

	/** Diff recursion count, used to track the end of the diff cycle. */
	var mounts = [];

	/** Diff recursion count, used to track the end of the diff cycle. */
	var diffLevel = 0;

	var isSvgMode = false;

	function flushMounts() {
		var c = void 0;
		while (c = mounts.pop()) {
			if (c.componentDidMount) c.componentDidMount();
		}
	}

	/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
	 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
	 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
	 *	@returns {Element} dom			The created/mutated element
	 *	@private
	 */
	function diff(dom, vnode, context, mountAll, parent, rootComponent, nextSibling) {
		diffLevel++;
		var ret = idiff(dom, vnode, context, mountAll, rootComponent);
		if (parent && ret.parentNode !== parent) {
			parent.insertBefore(ret, nextSibling || null);
		}
		if (! --diffLevel) flushMounts();
		return ret;
	}

	function idiff(dom, vnode, context, mountAll, rootComponent) {
		var originalAttributes = vnode && vnode.attributes;

		while (isFunctionalComponent(vnode)) {
			vnode = buildFunctionalComponent(vnode, context);
		}

		if (empty(vnode)) {
			vnode = '';
			if (rootComponent) {
				if (dom) {
					if (dom.nodeType === 8) return dom;
					collectNode(dom);
				}
				return document.createComment(vnode);
			}
		}

		if (isString(vnode)) {
			if (dom) {
				if (getNodeType(dom) === 3 && dom.parentNode) {
					dom.nodeValue = vnode;
					return dom;
				}
				collectNode(dom);
			}
			return document.createTextNode(vnode);
		}

		var out = dom,
		    nodeName = vnode.nodeName,
		    svgMode = void 0;

		if (isFunction(nodeName)) {
			return buildComponentFromVNode(dom, vnode, context, mountAll);
		}

		if (!isString(nodeName)) {
			nodeName = String(nodeName);
		}

		svgMode = toLowerCase(nodeName) === 'svg';

		if (svgMode) isSvgMode = true;

		if (!dom) {
			out = createNode(nodeName, isSvgMode);
		} else if (!isNamedNode(dom, nodeName)) {
			out = createNode(nodeName, isSvgMode);
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // reclaim element nodes
			recollectNodeTree(dom);
		}

		// fast-path for elements containing a single TextNode:
		if (vnode.children && vnode.children.length === 1 && typeof vnode.children[0] === 'string' && out.childNodes.length === 1 && out.firstChild instanceof Text) {
			out.firstChild.nodeValue = vnode.children[0];
		} else if (vnode.children || out.firstChild) {
			innerDiffNode(out, vnode.children, context, mountAll);
		}

		diffAttributes(out, vnode.attributes);

		if (originalAttributes && originalAttributes.ref) {
			(out[ATTR_KEY].ref = originalAttributes.ref)(out);
		}

		if (svgMode) isSvgMode = false;

		return out;
	}

	/** Apply child and attribute changes between a VNode and a DOM Node to the DOM. */
	function innerDiffNode(dom, vchildren, context, mountAll) {
		var originalChildren = dom.childNodes,
		    children = [],
		    keyed = {},
		    keyedLen = 0,
		    min = 0,
		    len = originalChildren.length,
		    childrenLen = 0,
		    vlen = vchildren && vchildren.length,
		    j = void 0,
		    c = void 0,
		    vchild = void 0,
		    child = void 0;

		if (len) {
			for (var i = 0; i < len; i++) {
				var _child = originalChildren[i],
				    key = vlen ? (c = _child._component) ? c.__key : (c = _child[ATTR_KEY]) ? c.key : null : null;
				if (key || key === 0) {
					keyedLen++;
					keyed[key] = _child;
				} else {
					children[childrenLen++] = _child;
				}
			}
		}

		if (vlen) {
			for (var _i = 0; _i < vlen; _i++) {
				vchild = vchildren[_i];
				child = null;

				// if (isFunctionalComponent(vchild)) {
				// 	vchild = buildFunctionalComponent(vchild);
				// }

				// attempt to find a node based on key matching
				if (keyedLen && vchild.attributes) {
					var _key = vchild.key;
					if (!empty(_key) && _key in keyed) {
						child = keyed[_key];
						keyed[_key] = undefined;
						keyedLen--;
					}
				}

				// attempt to pluck a node of the same type from the existing children
				if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						c = children[j];
						if (c && isSameNodeType(c, vchild)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

				// morph the matched/found/created DOM child to match vchild (deep)
				child = idiff(child, vchild, context, mountAll);

				if (child !== originalChildren[_i]) {
					dom.insertBefore(child, originalChildren[_i] || null);
				}
			}
		}

		if (keyedLen) {
			/*eslint guard-for-in:0*/
			for (var _i2 in keyed) {
				if (keyed[_i2]) {
					children[min = childrenLen++] = keyed[_i2];
				}
			}
		}

		// remove orphaned children
		if (min < childrenLen) {
			removeOrphanedChildren(children);
		}
	}

	/** Reclaim children that were unreferenced in the desired VTree */
	function removeOrphanedChildren(children, unmountOnly) {
		for (var i = children.length; i--;) {
			var child = children[i];
			if (child) {
				recollectNodeTree(child, unmountOnly);
			}
		}
	}

	/** Reclaim an entire tree of nodes, starting at the root. */
	function recollectNodeTree(node, unmountOnly) {
		// @TODO: Need to make a call on whether Preact should remove nodes not created by itself.
		// Currently it *does* remove them. Discussion: https://github.com/developit/preact/issues/39
		//if (!node[ATTR_KEY]) return;

		var component = node._component;
		if (component) {
			unmountComponent(component, !unmountOnly);
		} else {
			if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);

			if (!unmountOnly) {

				collectNode(node);
			}

			if (node.childNodes && node.childNodes.length) {
				removeOrphanedChildren(node.childNodes, unmountOnly);
			}
		}
	}

	/** Apply differences in attributes from a VNode to the given DOM Node. */
	function diffAttributes(dom, attrs) {
		var old = dom[ATTR_KEY] || getRawNodeAttributes(dom);

		// removeAttributes(dom, old, attrs || EMPTY);
		for (var name in old) {
			if (!attrs || !(name in attrs)) {
				setAccessor(dom, name, null, old[name], isSvgMode);
			}
		}

		// new & updated
		if (attrs) {
			for (var _name in attrs) {
				if (!(_name in old) || attrs[_name] != old[_name] || (_name === 'value' || _name === 'checked') && attrs[_name] != dom[_name]) {
					setAccessor(dom, _name, attrs[_name], old[_name], isSvgMode);
				}
			}
		}
	}

	/** Retains a pool of Components for re-use, keyed on component name.
	 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
	 *	@private
	 */
	var components = {};

	function collectComponent(component) {
		var name = component.constructor.name,
		    list = components[name];
		if (list) list.push(component);else components[name] = [component];
	}

	function createComponent(Ctor, props, context) {
		var inst = new Ctor(props, context),
		    list = components[Ctor.name];
		inst.props = props;
		inst.context = context;
		if (list) {
			for (var i = list.length; i--;) {
				if (list[i].constructor === Ctor) {
					inst.nextBase = list[i].nextBase;
					list.splice(i, 1);
					break;
				}
			}
		}
		return inst;
	}

	/** Mark component as dirty and queue up a render.
	 *	@param {Component} component
	 *	@private
	 */
	function triggerComponentRender(component) {
		if (!component._dirty) {
			component._dirty = true;
			enqueueRender(component);
		}
	}

	/** Set a component's `props` (generally derived from JSX attributes).
	 *	@param {Object} props
	 *	@param {Object} [opts]
	 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
	 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
	 */
	function setComponentProps(component, props, opts, context, mountAll) {
		var b = component.base;
		if (component._disableRendering) return;
		component._disableRendering = true;

		if (component.__ref = props.ref) delete props.ref;
		if (component.__key = props.key) delete props.key;

		if (empty(b) || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}

		if (context && context !== component.context) {
			if (!component.prevContext) component.prevContext = component.context;
			component.context = context;
		}

		if (!component.prevProps) component.prevProps = component.props;
		component.props = props;

		component._disableRendering = false;

		if (opts !== NO_RENDER) {
			if (opts === SYNC_RENDER || options.syncComponentUpdates !== false || !b) {
				renderComponent(component, SYNC_RENDER, mountAll);
			} else {
				triggerComponentRender(component);
			}
		}

		if (component.__ref) component.__ref(component);
	}

	/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
	 *	@param {Component} component
	 *	@param {Object} [opts]
	 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
	 *	@private
	 */
	function renderComponent(component, opts, mountAll) {
		if (component._disableRendering) return;

		var skip = void 0,
		    rendered = void 0,
		    props = component.props,
		    state = component.state,
		    context = component.context,
		    previousProps = component.prevProps || props,
		    previousState = component.prevState || state,
		    previousContext = component.prevContext || context,
		    isUpdate = component.base,
		    initialBase = isUpdate || component.nextBase,
		    baseParent = initialBase && initialBase.parentNode,
		    initialComponent = initialBase && initialBase._component,
		    initialChildComponent = component._component;

		// if updating
		if (isUpdate) {
			component.props = previousProps;
			component.state = previousState;
			component.context = previousContext;
			if (opts !== FORCE_RENDER && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
				skip = true;
			} else if (component.componentWillUpdate) {
				component.componentWillUpdate(props, state, context);
			}
			component.props = props;
			component.state = state;
			component.context = context;
		}

		component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
		component._dirty = false;

		if (!skip) {
			if (component.render) rendered = component.render(props, state, context);

			// context to pass to the child, can be updated via (grand-)parent component
			if (component.getChildContext) {
				context = extend(clone(context), component.getChildContext());
			}

			while (isFunctionalComponent(rendered)) {
				rendered = buildFunctionalComponent(rendered, context);
			}

			var childComponent = rendered && rendered.nodeName,
			    toUnmount = void 0,
			    base = void 0;

			if (isFunction(childComponent) && childComponent.prototype.render) {
				// set up high order component link

				var inst = initialChildComponent,
				    childProps = getNodeProps(rendered);

				if (inst && inst.constructor === childComponent) {
					setComponentProps(inst, childProps, SYNC_RENDER, context);
				} else {
					toUnmount = inst;
					inst = createComponent(childComponent, childProps, context);
					inst._parentComponent = component;
					component._component = inst;
					setComponentProps(inst, childProps, NO_RENDER, context);
					renderComponent(inst, SYNC_RENDER);
				}

				base = inst.base;
			} else {
				var cbase = initialBase;

				// destroy high order component link
				toUnmount = initialChildComponent;
				if (toUnmount) {
					cbase = component._component = null;
				}

				if (initialBase || opts === SYNC_RENDER) {
					if (cbase) cbase._component = null;
					base = diff(cbase, rendered, context, mountAll || !isUpdate, baseParent, true, initialBase && initialBase.nextSibling);
				}
			}

			if (initialBase && base !== initialBase) {
				if (!toUnmount && initialComponent === component && !initialChildComponent && initialBase.parentNode) {
					initialBase._component = null;
					recollectNodeTree(initialBase);
				}
			}

			if (toUnmount) {
				unmountComponent(toUnmount, true);
			}

			component.base = base;
			if (base) {
				var componentRef = component,
				    t = component;
				while (t = t._parentComponent) {
					componentRef = t;
				}
				base._component = componentRef;
				base._componentConstructor = componentRef.constructor;
			}
		}

		if (!isUpdate || mountAll) {
			mounts.unshift(component);
			if (!diffLevel) flushMounts();
		} else if (!skip && component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}

		var cb = component._renderCallbacks,
		    fn = void 0;
		if (cb) while (fn = cb.pop()) {
			fn.call(component);
		}return rendered;
	}

	/** Apply the Component referenced by a VNode to the DOM.
	 *	@param {Element} dom	The DOM node to mutate
	 *	@param {VNode} vnode	A Component-referencing VNode
	 *	@returns {Element} dom	The created/mutated element
	 *	@private
	 */
	function buildComponentFromVNode(dom, vnode, context, mountAll) {
		var c = dom && dom._component,
		    oldDom = dom,
		    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
		    isOwner = isDirectOwner,
		    props = getNodeProps(vnode);
		while (c && !isOwner && (c = c._parentComponent)) {
			isOwner = c.constructor === vnode.nodeName;
		}

		if (isOwner && (!mountAll || c._component)) {
			setComponentProps(c, props, ASYNC_RENDER, context, mountAll);
			dom = c.base;
		} else {
			if (c && !isDirectOwner) {
				unmountComponent(c, true);
				dom = oldDom = null;
			}

			c = createComponent(vnode.nodeName, props, context);
			if (dom && !c.nextBase) c.nextBase = dom;
			setComponentProps(c, props, SYNC_RENDER, context, mountAll);
			dom = c.base;

			if (oldDom && dom !== oldDom) {
				oldDom._component = null;
				recollectNodeTree(oldDom);
			}
		}

		return dom;
	}

	/** Remove a component from the DOM and recycle it.
	 *	@param {Element} dom			A DOM node from which to unmount the given Component
	 *	@param {Component} component	The Component instance to unmount
	 *	@private
	 */
	function unmountComponent(component, remove) {
		// console.log(`${remove?'Removing':'Unmounting'} component: ${component.constructor.name}`);
		var base = component.base;

		component._disableRendering = true;

		if (component.componentWillUnmount) component.componentWillUnmount();

		component.base = null;

		// recursively tear down & recollect high-order component children:
		var inner = component._component;
		if (inner) {
			unmountComponent(inner, remove);
		} else if (base) {
			if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);

			component.nextBase = base;

			if (remove) {
				removeNode(base);
				collectComponent(component);
			}
			removeOrphanedChildren(base.childNodes, !remove);
		}

		if (component.__ref) component.__ref(null);
		if (component.componentDidUnmount) component.componentDidUnmount();
	}

	/** Base Component class, for he ES6 Class method of creating Components
	 *	@public
	 *
	 *	@example
	 *	class MyFoo extends Component {
	 *		render(props, state) {
	 *			return <div />;
	 *		}
	 *	}
	 */
	function Component(props, context) {
		/** @private */
		this._dirty = true;
		/** @public */
		this._disableRendering = false;
		/** @public */
		this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
		/** @public */
		this.context = context;
		/** @type {object} */
		this.props = props;
		/** @type {object} */
		this.state = this.getInitialState && this.getInitialState() || {};
	}

	extend(Component.prototype, {

		/** Returns a `boolean` value indicating if the component should re-render when receiving the given `props` and `state`.
	  *	@param {object} nextProps
	  *	@param {object} nextState
	  *	@param {object} nextContext
	  *	@returns {Boolean} should the component re-render
	  *	@name shouldComponentUpdate
	  *	@function
	  */
		// shouldComponentUpdate() {
		// 	return true;
		// },


		/** Returns a function that sets a state property when called.
	  *	Calling linkState() repeatedly with the same arguments returns a cached link function.
	  *
	  *	Provides some built-in special cases:
	  *		- Checkboxes and radio buttons link their boolean `checked` value
	  *		- Inputs automatically link their `value` property
	  *		- Event paths fall back to any associated Component if not found on an element
	  *		- If linked value is a function, will invoke it and use the result
	  *
	  *	@param {string} key				The path to set - can be a dot-notated deep key
	  *	@param {string} [eventPath]		If set, attempts to find the new state value at a given dot-notated path within the object passed to the linkedState setter.
	  *	@returns {function} linkStateSetter(e)
	  *
	  *	@example Update a "text" state value when an input changes:
	  *		<input onChange={ this.linkState('text') } />
	  *
	  *	@example Set a deep state value on click
	  *		<button onClick={ this.linkState('touch.coords', 'touches.0') }>Tap</button
	  */
		linkState: function linkState(key, eventPath) {
			var c = this._linkedStates || (this._linkedStates = {}),
			    cacheKey = key + '|' + eventPath;
			return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
		},


		/** Update component state by copying properties from `state` to `this.state`.
	  *	@param {object} state		A hash of state properties to update with new values
	  */
		setState: function setState(state, callback) {
			var s = this.state;
			if (!this.prevState) this.prevState = clone(s);
			extend(s, isFunction(state) ? state(s, this.props) : state);
			if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
			triggerComponentRender(this);
		},


		/** Immediately perform a synchronous re-render of the component.
	  *	@private
	  */
		forceUpdate: function forceUpdate() {
			renderComponent(this, FORCE_RENDER);
		},


		/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
	  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
	  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
	  *	@param {object} state		The component's current state
	  *	@param {object} context		Context object (if a parent component has provided context)
	  *	@returns VNode
	  */
		render: function render() {
			return null;
		}
	});

	/** Render JSX into a `parent` Element.
	 *	@param {VNode} vnode		A (JSX) VNode to render
	 *	@param {Element} parent		DOM element to render into
	 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
	 *	@public
	 *
	 *	@example
	 *	// render a div into <body>:
	 *	render(<div id="hello">hello!</div>, document.body);
	 *
	 *	@example
	 *	// render a "Thing" component into #foo:
	 *	const Thing = ({ name }) => <span>{ name }</span>;
	 *	render(<Thing name="one" />, document.querySelector('#foo'));
	 */
	function render(vnode, parent, merge) {
	  return diff(merge, vnode, {}, false, parent);
	}

	var preact = {
		h: h$1,
		cloneElement: cloneElement,
		Component: Component,
		render: render,
		rerender: rerender,
		options: options
	};

	var h$5 = preact.h;
	var Component$4 = preact.Component;
	var AskField = function (_Component) {
	  babelHelpers.inherits(AskField, _Component);

	  function AskField(props, context) {
	    babelHelpers.classCallCheck(this, AskField);

	    var _this = babelHelpers.possibleConstructorReturn(this, (AskField.__proto__ || Object.getPrototypeOf(AskField)).call(this, props, context));

	    _this.state = {
	      value: null,
	      isValid: false,
	      completed: false,
	      focused: false
	    };
	    _this.checkInterface();
	    return _this;
	  }

	  babelHelpers.createClass(AskField, [{
	    key: 'checkInterface',
	    value: function checkInterface() {
	      var _this2 = this;

	      var interfaceMethods = ['validate', 'getValue'];
	      interfaceMethods.map(function (method) {
	        if (typeof _this2[method] !== 'function') {
	          console.warn('Warning: [' + _this2.constructor.name + '] has no [' + method + '] method. See: https://github.com/coralproject/elkhorn/blob/master/docs/warnings/askfieldinterface.md');
	        }
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { moveForward: false };

	      // whitelist state properties for save
	      this.props.onUpdate({
	        index: this.props.index,
	        value: this.state.value,
	        isValid: this.state.isValid,
	        completed: this.state.completed,
	        validationMessage: this.props.validationMessage || 'Please check this field',
	        moveForward: options.moveForward || false
	      });
	    }
	  }]);
	  return AskField;
	}(Component$4);

	var h$4 = preact.h;
	var Component$3 = preact.Component;
	var TextArea = function (_AskField) {
	  babelHelpers.inherits(TextArea, _AskField);

	  function TextArea(props, context) {
	    babelHelpers.classCallCheck(this, TextArea);

	    var _this = babelHelpers.possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props, context));

	    _this.state = {
	      focused: false,
	      value: _this.props.text || '',
	      isValid: true,
	      height: '100px'
	    };

	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onKeyUp = _this.onKeyUp.bind(_this);
	    return _this;
	  }

	  babelHelpers.createClass(TextArea, [{
	    key: 'onKeyUp',
	    value: function onKeyUp(e) {
	      if (e.keyCode === 13 && !e.shiftKey) {
	        // ENTER
	        this.update({ moveForward: true });
	      } else {
	        var height = Math.max(parseInt(e.target.style.height), e.target.scrollHeight - 40);
	        this.setState({
	          value: e.target.value,
	          height: height
	        });
	      }
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      if (this.state.value.length) {
	        this.setState({
	          focused: false,
	          completed: true,
	          isValid: true
	        });
	      } else {
	        this.setState({
	          focused: false,
	          completed: false
	        });
	      }
	      this.update({
	        moveForward: true
	      });
	    }
	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$2.base, this.state.isValid ? styles$2.valid : styles$2.error, this.props.submitted && this.props.wrapper.required && !this.state.isCompleted ? styles$2.error : styles$2.valid, this.state.focused ? styles$2.focused : {}, { height: this.state.height }, { backgroundColor: this.props.theme.inputBackground });
	    }

	    // Interface methods

	  }, {
	    key: 'validate',
	    value: function validate() {
	      var isValid = true;
	      var isCompleted = this.state.value.length;

	      if (this.props.maxLength) {
	        isValid = this.state.value.length <= this.props.maxLength;
	      }

	      if (this.props.minLength) {
	        isValid = this.state.value.length >= this.props.minLength;
	      }

	      this.setState({
	        isValid: isValid,
	        completed: isCompleted
	      });

	      return this.props.wrapper.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return {
	        text: this.state.value.length ? this.state.value : ''
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          placeholder = _props.placeholder,
	          maxLength = _props.maxLength,
	          minLength = _props.minLength,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;
	      var value = this.state.value;


	      return h$4(
	        'div',
	        null,
	        h$4('textarea', {
	          id: component + '--' + fieldNumber,
	          style: this.getStyles(),
	          placeholder: placeholder,
	          defaultValue: value,
	          onBlur: this.onBlur,
	          onKeyUp: this.onKeyUp,
	          maxLength: maxLength ? maxLength : false
	        }),
	        maxLength ? h$4(
	          'div',
	          { style: styles$2.remaining },
	          maxLength - value.length,
	          ' chars remaining.'
	        ) : null
	      );
	    }
	  }]);
	  return TextArea;
	}(AskField);

	var styles$2 = {
	  base: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    borderRadius: '4px'
	  },
	  focused: {
	    // borderBottom: '2px solid #009688'
	  },
	  remaining: {
	    color: '#999',
	    fontSize: '10pt',
	    textAlign: 'right',
	    width: '100%',
	    marginTop: '5px'
	  },
	  error: {
	    border: '1px solid red'
	  }
	};

	var h$6 = preact.h;
	var Component$5 = preact.Component;
	var TextField = function (_AskField) {
	  babelHelpers.inherits(TextField, _AskField);

	  function TextField(props, context) {
	    babelHelpers.classCallCheck(this, TextField);

	    // extend the state from AskWidget
	    var _this = babelHelpers.possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props, context));

	    _this.state = babelHelpers.extends(_this.state, {
	      value: _this.props.text || '',
	      isValid: true,
	      error: {}
	    });

	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onKeyUp = _this.onKeyUp.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }

	  // Event listeners

	  babelHelpers.createClass(TextField, [{
	    key: 'onKeyUp',
	    value: function onKeyUp(e) {
	      switch (e.keyCode) {
	        case 13:
	          // Enter
	          this.validateAndSave();
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      this.setState({
	        value: e.target.value.trim()
	      });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      this.validateAndSave();
	    }

	    // Compute styles for different field states

	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$3.base, this.state.isValid ? styles$3.valid : styles$3.error, this.props.submitted && this.props.wrapper.required && !this.state.isCompleted ? styles$3.error : styles$3.valid, this.state.focused ? styles$3.focused : {}, { backgroundColor: this.props.theme.inputBackground });
	    }
	  }, {
	    key: 'validateAndSave',
	    value: function validateAndSave(options) {
	      this.validate();
	      this.update(options);
	    }

	    // Interface methods

	  }, {
	    key: 'validate',
	    value: function validate() {
	      var isValid = true;
	      var isCompleted = false;

	      // This is very unlikely
	      if (this.state.value.length > this.props.maxLength) {
	        this.props.setValidationMessage('Your response should have no more than ' + this.props.maxLength + ' characters.');
	      }

	      // This condition would override the previous message
	      if (this.state.value.length < this.props.minLength) {
	        this.props.setValidationMessage('Your response should have at least ' + this.props.minLength + ' characters.');
	      }

	      if (this.props.maxLength) {
	        isValid = this.state.value.length <= this.props.maxLength;
	      }

	      if (this.state.value.length && this.props.minLength) {
	        isValid = this.state.value.length >= this.props.minLength;
	      }

	      isCompleted = !!this.state.value.length;

	      this.setState({
	        isValid: isValid,
	        completed: isCompleted
	      });

	      return this.props.wrapper.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return { text: this.state.value.length ? this.state.value : '' };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          placeholder = _props.placeholder,
	          maxLength = _props.maxLength,
	          minLength = _props.minLength,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;
	      var value = this.state.value;


	      return h$6(
	        'div',
	        null,
	        h$6('input', {
	          id: component + '--' + fieldNumber,
	          className: 'text-field',
	          type: 'text',
	          style: this.getStyles(),
	          placeholder: placeholder,
	          defaultValue: value,
	          onBlur: this.onBlur,
	          onChange: this.onChange,
	          onKeyUp: this.onKeyUp,
	          maxLength: maxLength ? maxLength : false
	        }),
	        maxLength ? h$6(
	          'div',
	          { style: styles$3.remaining },
	          maxLength - value.length,
	          ' chars remaining.'
	        ) : null
	      );
	    }
	  }]);
	  return TextField;
	}(AskField);

	var styles$3 = {
	  base: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    borderRadius: '4px'
	  },
	  focused: {
	    // borderBottom: '2px solid #009688'
	  },
	  remaining: {
	    color: '#999',
	    fontSize: '10pt',
	    padding: '0px',
	    textAlign: 'right',
	    width: '100%',
	    marginTop: '5px'
	  },
	  error: {
	    border: '1px solid red'
	  }
	};

	var h$7 = preact.h;
	var Component$6 = preact.Component;
	var PhoneNumber = function (_AskField) {
	  babelHelpers.inherits(PhoneNumber, _AskField);

	  function PhoneNumber(props, context) {
	    babelHelpers.classCallCheck(this, PhoneNumber);

	    // extend the state from AskWidget
	    var _this = babelHelpers.possibleConstructorReturn(this, (PhoneNumber.__proto__ || Object.getPrototypeOf(PhoneNumber)).call(this, props, context));

	    _this.state = babelHelpers.extends(_this.state, {
	      value: _this.props.text || ''
	    });

	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }

	  // Event listeners

	  babelHelpers.createClass(PhoneNumber, [{
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      switch (e.keyCode) {
	        case 13:
	          // Enter
	          this.validateAndSave();
	          break;
	        default:
	          this.setState({ value: e.target.value });
	          break;
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      this.setState({ value: e.target.value });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      this.validateAndSave();
	    }

	    // Compute styles for different field states

	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$4.base, this.props.isValid ? styles$4.valid : styles$4.error, this.state.focused ? styles$4.focused : {}, { backgroundColor: this.props.theme.inputBackground });
	    }
	  }, {
	    key: 'validateAndSave',
	    value: function validateAndSave(options) {
	      this.validate();
	      this.update(options);
	    }

	    // Interface methods

	  }, {
	    key: 'validate',
	    value: function validate() {
	      var isValid = true;
	      var isCompleted = !!this.state.value.length;

	      if (isCompleted && this.props.validateAs) {
	        switch (this.props.validateAs) {
	          case 'phonenumber':
	            break;
	        }
	      }

	      this.setState({ isValid: isValid, completed: isCompleted });

	      return this.props.wrapper.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return { text: this.state.value.length ? this.state.value : '' };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;


	      return h$7(
	        'div',
	        null,
	        h$7('input', {
	          type: 'text',
	          id: component + '--' + fieldNumber,
	          title: this.props.title,
	          style: this.getStyles(),
	          placeholder: this.props.placeholder,
	          defaultValue: this.state.value,
	          onBlur: this.onBlur,
	          onChange: this.onChange,
	          onKeyDown: this.onKeyDown,
	          maxLength: this.props.maxLength ? this.props.maxLength : false
	        }),
	        this.props.maxLength ? h$7(
	          'div',
	          { style: styles$4.remaining },
	          this.props.maxLength - this.state.value.length,
	          ' chars remaining.'
	        ) : null
	      );
	    }
	  }]);
	  return PhoneNumber;
	}(AskField);

	var styles$4 = {
	  base: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    borderRadius: '4px'
	  },
	  focused: {
	    // borderBottom: '2px solid #009688'
	  },
	  remaining: {
	    color: '#999',
	    fontSize: '10pt',
	    padding: '0px',
	    textAlign: 'right',
	    width: '100%',
	    marginTop: '5px'
	  }
	};

	var h$8 = preact.h;
	var Component$7 = preact.Component;
	var NumberField = function (_AskField) {
	  babelHelpers.inherits(NumberField, _AskField);

	  function NumberField(props, context) {
	    babelHelpers.classCallCheck(this, NumberField);

	    // extend the state from AskWidget
	    var _this = babelHelpers.possibleConstructorReturn(this, (NumberField.__proto__ || Object.getPrototypeOf(NumberField)).call(this, props, context));

	    _this.state = babelHelpers.extends(_this.state, {
	      value: _this.props.text || ''
	    });

	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    return _this;
	  }

	  // Event listeners

	  babelHelpers.createClass(NumberField, [{
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      switch (e.keyCode) {
	        case 13:
	          // Enter
	          this.validateAndSave();
	          break;
	        default:
	          this.setState({ value: e.target.value });
	          break;
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      this.setState({ value: e.target.value });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      this.validateAndSave();
	    }

	    // Compute styles for different field states

	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$5.base, this.props.isValid ? styles$5.valid : styles$5.error, this.state.focused ? styles$5.focused : {}, { backgroundColor: this.props.theme.inputBackground });
	    }
	  }, {
	    key: 'validateAndSave',
	    value: function validateAndSave(options) {
	      this.validate();
	      this.update(options);
	    }

	    // Interface methods

	  }, {
	    key: 'validate',
	    value: function validate() {
	      var isValid = true;
	      var isCompleted = !!this.state.value.length;
	      var num = parseFloat(this.state.value.replace(',', '.'));

	      if (isCompleted && this.props.validateAs) {
	        switch (this.props.validateAs) {
	          case 'number':
	            isValid = !isNaN(num) && isFinite(num) && !!this.state.value.match(/^(\-)?\d+$/);

	            if (!isValid) {
	              this.props.setValidationMessage('Please, type a valid number.');
	            }

	            break;
	        }
	      }

	      if (typeof this.props.minValue !== 'undefined' || typeof this.props.maxValue !== 'undefined') {
	        if (num < this.props.minValue || num > this.props.maxValue) {
	          isValid = false;
	          this.props.setValidationMessage(this.getHelpMessage());
	        }
	      }

	      this.setState({ isValid: isValid, completed: isCompleted });

	      return this.props.wrapper.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return { text: this.state.value.length ? this.state.value : '' };
	    }
	  }, {
	    key: 'getHelpMessage',
	    value: function getHelpMessage() {
	      var helpMessage = this.props.placeholder;
	      if (this.props.minValue && this.props.maxValue) {
	        helpMessage = 'This number cannot be higher than ' + this.props.maxValue + ' or lower than ' + this.props.minValue + '.';
	      } else {
	        if (this.props.maxValue) {
	          helpMessage = 'Please type a number below ' + (this.props.maxValue + 1);
	        }
	        if (this.props.minValue) {
	          helpMessage = 'Please type a number above ' + (this.props.minValue - 1);
	        }
	      }
	      return helpMessage;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;


	      return h$8(
	        'div',
	        null,
	        h$8('input', {
	          id: component + '--' + fieldNumber,
	          type: 'text',
	          style: this.getStyles(),
	          placeholder: this.props.placeholder,
	          defaultValue: this.state.value,
	          onBlur: this.onBlur,
	          onChange: this.onChange,
	          onKeyDown: this.onKeyDown
	        })
	      );
	    }
	  }]);
	  return NumberField;
	}(AskField);

	var styles$5 = {
	  base: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    borderRadius: '4px'
	  },
	  focused: {
	    // borderBottom: '2px solid #009688'
	  },
	  remaining: {
	    color: '#999',
	    fontSize: '10pt',
	    padding: '0px',
	    textAlign: 'right',
	    width: '100%',
	    marginTop: '5px'
	  }
	};

	var h$9 = preact.h;
	var Component$8 = preact.Component;
	var EmailField = function (_AskField) {
	  babelHelpers.inherits(EmailField, _AskField);

	  function EmailField(props, context) {
	    babelHelpers.classCallCheck(this, EmailField);

	    // extend the state from AskWidget
	    var _this = babelHelpers.possibleConstructorReturn(this, (EmailField.__proto__ || Object.getPrototypeOf(EmailField)).call(this, props, context));

	    _this.state = babelHelpers.extends(_this.state, {
	      value: _this.props.text || ''
	    });

	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }

	  // Event listeners

	  babelHelpers.createClass(EmailField, [{
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      switch (e.keyCode) {
	        case 13:
	          // Enter
	          this.validateAndSave();
	          break;
	        default:
	          this.setState({ value: e.target.value });
	          break;
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      this.setState({ value: e.target.value });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      this.validateAndSave();
	    }

	    // Compute styles for different field states

	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$6.base, this.props.isValid ? styles$6.valid : styles$6.error, this.state.focused ? styles$6.focused : {}, { backgroundColor: this.props.theme.inputBackground });
	    }
	  }, {
	    key: 'validateAndSave',
	    value: function validateAndSave(options) {
	      this.validate();
	      this.update(options);
	    }

	    // Interface methods

	  }, {
	    key: 'validate',
	    value: function validate() {

	      var isValid = true,
	          isCompleted = false;

	      isCompleted = !!this.state.value.length;

	      if (isCompleted && this.props.validateAs) {
	        switch (this.props.validateAs) {
	          case "email":
	            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))?$/;
	            isValid = emailRegex.test(this.state.value);
	            break;
	        }
	      }

	      this.setState({ isValid: isValid, completed: isCompleted });

	      return !!this.props.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return { text: this.state.value.length ? this.state.value : '' };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;


	      return h$9(
	        'div',
	        null,
	        h$9('input', {
	          id: component + '--' + fieldNumber,
	          type: 'text',
	          style: this.getStyles(),
	          placeholder: this.props.placeholder,
	          defaultValue: this.state.value,
	          onBlur: this.onBlur,
	          onChange: this.onChange,
	          onKeyDown: this.onKeyDown,
	          maxLength: !!this.props.maxLength ? this.props.maxLength : false
	        }),
	        !!this.props.maxLength ? h$9(
	          'div',
	          { style: styles$6.remaining },
	          this.props.maxLength - this.state.value.length,
	          ' chars remaining.'
	        ) : null
	      );
	    }
	  }]);
	  return EmailField;
	}(AskField);

	var styles$6 = {
	  base: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    borderRadius: '4px'
	  },
	  focused: {
	    //borderBottom: '2px solid #009688'
	  },
	  remaining: {
	    color: '#999',
	    fontSize: '10pt',
	    padding: '0px',
	    textAlign: 'right',
	    width: '100%',
	    marginTop: '5px'
	  }
	};

	var h$11 = preact.h;
	var Component$10 = preact.Component;
	var CalendarIcon = function (_Component) {
	  babelHelpers.inherits(CalendarIcon, _Component);

	  function CalendarIcon() {
	    babelHelpers.classCallCheck(this, CalendarIcon);
	    return babelHelpers.possibleConstructorReturn(this, (CalendarIcon.__proto__ || Object.getPrototypeOf(CalendarIcon)).apply(this, arguments));
	  }

	  babelHelpers.createClass(CalendarIcon, [{
	    key: 'render',
	    value: function render() {
	      return h$11(
	        'svg',
	        { width: '40', height: '40', x: '0px', y: '0px', viewBox: '0 0 88 125' },
	        h$11('path', { d: 'M0,32v59.906C0,96.377,3.582,100,8,100h72c4.418,0,8-3.623,8-8.094V32H0z M22,94H6V78h16V94z M22,74H6V58h16V74z M22,54H6 V38h16V54z M42,94H26V78h16V94z M42,74H26V58h16V74z M42,54H26V38h16V54z M62,94H46V78h16V94z M62,74H46V58h16V74z M62,54H46V38h16 V54z M82,94H66V78h16V94z M82,74H66V58h16V74z M82,54H66V38h16V54z' }),
	        h$11('path', { d: 'M80,12H67V3c0-1.657-1.344-3-3-3c-1.657,0-3,1.343-3,3v9H27V3c0-1.657-1.344-3-3-3c-1.657,0-3,1.343-3,3v9H8 c-4.418,0-8,3.623-8,8.093V27v0v1h88v-1v0v-6.907C88,15.623,84.418,12,80,12z M24,26c-3.313,0-6-2.687-6-6 c0-2.219,1.209-4.152,3-5.19V20c0,1.657,1.343,3,3,3c1.656,0,3-1.343,3-3v-5.191c1.792,1.038,3,2.972,3,5.191 C30,23.313,27.314,26,24,26z M64,26c-3.313,0-6-2.687-6-6c0-2.219,1.209-4.152,3-5.19V20c0,1.657,1.343,3,3,3c1.656,0,3-1.343,3-3 v-5.191c1.792,1.038,3,2.972,3,5.191C70,23.313,67.314,26,64,26z' })
	      );
	    }
	  }]);
	  return CalendarIcon;
	}(Component$10);

	var flatpickr = __commonjs(function (module) {
	"use strict";

	var _typeof = typeof Symbol === "function" && babelHelpers.typeof(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
	};

	var flatpickr = function flatpickr(selector, config) {
		var elements = void 0;

		var createInstance = function createInstance(element) {
			if (element._flatpickr) {
				element._flatpickr.destroy();
			}

			element._flatpickr = new flatpickr.init(element, config);
			return element._flatpickr;
		};

		if (selector.nodeName) {
			return createInstance(selector);
		}
		/*
	 Utilize the performance of native getters if applicable
	 https://jsperf.com/getelementsbyclassname-vs-queryselectorall/18
	 https://jsperf.com/jquery-vs-javascript-performance-comparison/22
	 */
		else if (/^#[a-zA-Z0-9\-_]*$/.test(selector)) {
				return createInstance(document.getElementById(selector.slice(1)));
			} else if (/^\.[a-zA-Z0-9\-_]*$/.test(selector)) {
				elements = document.getElementsByClassName(selector.slice(1));
			} else {
				elements = document.querySelectorAll(selector);
			}

		var instances = [];

		for (var i = 0; i < elements.length; i++) {
			instances.push(createInstance(elements[i]));
		}

		if (instances.length === 1) {
			return instances[0];
		}

		return {
			calendars: instances,
			byID: function byID(id) {
				return document.getElementById(id)._flatpickr;
			}
		};
	};

	/**
	 * @constructor
	 */
	flatpickr.init = function (element, instanceConfig) {
		function createElement(tag, className, content) {
			var newElement = document.createElement(tag);

			if (content) {
				newElement.textContent = content;
			}

			if (className) {
				newElement.className = className;
			}

			return newElement;
		}

		var debounce = function debounce(func, wait, immediate) {
			var timeout = void 0;
			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var context = this;

				var later = function later() {
					timeout = null;
					if (!immediate) {
						func.apply(context, args);
					}
				};

				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (immediate && !timeout) {
					func.apply(context, args);
				}
			};
		};

		// functions
		var self = this;
		var parseConfig = void 0,
		    init = void 0,
		    wrap = void 0,
		    uDate = void 0,
		    equalDates = void 0,
		    pad = void 0,
		    monthToStr = void 0,
		    isEnabled = void 0,
		    buildMonthNavigation = void 0,
		    buildWeekdays = void 0,
		    buildCalendar = void 0,
		    buildDays = void 0,
		    buildWeeks = void 0,
		    buildTime = void 0,
		    timeWrapper = void 0,
		    yearScroll = void 0,
		    updateValue = void 0,
		    amPMToggle = void 0,
		    onKeyDown = void 0,
		    onResize = void 0,
		    updateNavigationCurrentMonth = void 0,
		    handleYearChange = void 0,
		    changeMonth = void 0,
		    getDaysinMonth = void 0,
		    documentClick = void 0,
		    selectDate = void 0,
		    getRandomCalendarIdStr = void 0,
		    bind = void 0,
		    triggerChange = void 0;

		// elements & variables
		var calendarContainer = void 0,
		    weekdayContainer = void 0,
		    timeContainer = void 0,
		    navigationCurrentMonth = void 0,
		    monthsNav = void 0,
		    prevMonthNav = void 0,
		    currentYearElement = void 0,
		    currentMonthElement = void 0,
		    nextMonthNav = void 0,
		    calendar = void 0,
		    weekNumbers = void 0,
		    now = new Date(),
		    wrapperElement = void 0,
		    clickEvt = void 0;

		self.formats = {
			// weekday name, short, e.g. Thu
			D: function D() {
				return self.l10n.weekdays.shorthand[self.formats.w()];
			},

			// full month name e.g. January
			F: function F() {
				return monthToStr(self.formats.n() - 1, false);
			},

			// hours with leading zero e.g. 03
			H: function H() {
				return pad(self.selectedDateObj.getHours());
			},

			// day (1-30) with ordinal suffix e.g. 1st, 2nd
			J: function J() {
				return self.formats.j() + self.l10n.ordinal(self.formats.j());
			},

			// AM/PM
			K: function K() {
				return self.selectedDateObj.getHours() > 11 ? "PM" : "AM";
			},

			// shorthand month e.g. Jan, Sep, Oct, etc
			M: function M() {
				return monthToStr(self.formats.n() - 1, true);
			},

			// seconds 00-59
			S: function S() {
				return pad(self.selectedDateObj.getSeconds());
			},

			// unix timestamp
			U: function U() {
				return self.selectedDateObj.getTime() / 1000;
			},

			// full year e.g. 2016
			Y: function Y() {
				return self.selectedDateObj.getFullYear();
			},

			// day in month, padded (01-30)
			d: function d() {
				return pad(self.formats.j());
			},

			// hour from 1-12 (am/pm)
			h: function h() {
				return self.selectedDateObj.getHours() % 12 ? self.selectedDateObj.getHours() % 12 : 12;
			},

			// minutes, padded with leading zero e.g. 09
			i: function i() {
				return pad(self.selectedDateObj.getMinutes());
			},

			// day in month (1-30)
			j: function j() {
				return self.selectedDateObj.getDate();
			},

			// weekday name, full, e.g. Thursday
			l: function l() {
				return self.l10n.weekdays.longhand[self.formats.w()];
			},

			// padded month number (01-12)
			m: function m() {
				return pad(self.formats.n());
			},

			// the month number (1-12)
			n: function n() {
				return self.selectedDateObj.getMonth() + 1;
			},

			// seconds 0-59
			s: function s() {
				return self.selectedDateObj.getSeconds();
			},

			// number of the day of the week
			w: function w() {
				return self.selectedDateObj.getDay();
			},

			// last two digits of year e.g. 16 for 2016
			y: function y() {
				return String(self.formats.Y()).substring(2);
			}
		};

		self.defaultConfig = {
			/* if true, dates will be parsed, formatted, and displayed in UTC.
	  preloading date strings w/ timezones is recommended but not necessary */
			utc: false,

			// wrap: see https://chmln.github.io/flatpickr/#strap
			wrap: false,

			// enables week numbers
			weekNumbers: false,

			allowInput: false,

			/*
	  	clicking on input opens the date(time)picker.
	  	disable if you wish to open the calendar manually with .open()
	  */
			clickOpens: true,

			// display time picker in 24 hour mode
			time_24hr: false,

			// enables the time picker functionality
			enableTime: false,

			// noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
			noCalendar: false,

			// more date format chars at https://chmln.github.io/flatpickr/#dateformat
			dateFormat: "Y-m-d",

			// altInput - see https://chmln.github.io/flatpickr/#altinput
			altInput: false,

			// the created altInput element will have this class.
			altInputClass: "",

			// same as dateFormat, but for altInput
			altFormat: "F j, Y", // defaults to e.g. June 10, 2016

			// defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
			defaultDate: null,

			// the minimum date that user can pick (inclusive)
			minDate: null,

			// the maximum date that user can pick (inclusive)
			maxDate: null,

			// dateparser that transforms a given string to a date object
			parseDate: null,

			// see https://chmln.github.io/flatpickr/#disable
			enable: [],

			// see https://chmln.github.io/flatpickr/#disable
			disable: [],

			// display the short version of month names - e.g. Sep instead of September
			shorthandCurrentMonth: false,

			// displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
			inline: false,

			// position calendar inside wrapper and next to the input element
			// leave at false unless you know what you"re doing
			static: false,

			// code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
			prevArrow: "&lt;",
			nextArrow: "&gt;",

			// enables seconds in the time picker
			enableSeconds: false,

			// step size used when scrolling/incrementing the hour element
			hourIncrement: 1,

			// step size used when scrolling/incrementing the minute element
			minuteIncrement: 5,

			// onChange callback when user selects a date or time
			onChange: null, // function (dateObj, dateStr) {}

			// called every time calendar is opened
			onOpen: null, // function (dateObj, dateStr) {}

			// called every time calendar is closed
			onClose: null, // function (dateObj, dateStr) {}

			onValueUpdate: null
		};

		init = function init() {
			instanceConfig = instanceConfig || {};

			self.element = element;

			parseConfig();

			self.input = self.config.wrap ? element.querySelector("[data-input]") : element;
			self.input.classList.add("flatpickr-input");

			if (self.config.defaultDate) {
				self.config.defaultDate = uDate(self.config.defaultDate);
			}

			if (self.input.value || self.config.defaultDate) {
				self.selectedDateObj = uDate(self.config.defaultDate || self.input.value);
			}

			wrap();
			buildCalendar();
			bind();

			self.uDate = uDate;
			self.jumpToDate();
			updateValue();
		};

		parseConfig = function parseConfig() {
			self.config = {};

			Object.keys(self.defaultConfig).forEach(function (key) {
				if (instanceConfig.hasOwnProperty(key)) {
					self.config[key] = instanceConfig[key];
				} else if (self.element.dataset && self.element.dataset.hasOwnProperty(key.toLowerCase())) {
					self.config[key] = self.element.dataset[key.toLowerCase()];
				} else if (!self.element.dataset && self.element.hasAttribute("data-" + key)) {
					self.config[key] = self.element.getAttribute("data-" + key);
				} else {
					self.config[key] = flatpickr.init.prototype.defaultConfig[key] || self.defaultConfig[key];
				}

				if (typeof self.defaultConfig[key] === "boolean") {
					self.config[key] = self.config[key] === true || self.config[key] === "" || self.config[key] === "true";
				}

				if (key === "enableTime" && self.config[key]) {
					self.defaultConfig.dateFormat = !self.config.time_24hr ? "Y-m-d h:i K" : "Y-m-d H:i";
					self.defaultConfig.altFormat = !self.config.time_24hr ? "F j Y, h:i K" : "F j, Y H:i";
				} else if (key === "noCalendar" && self.config[key]) {
					self.defaultConfig.dateFormat = "h:i K";
					self.defaultConfig.altFormat = "h:i K";
				}
			});
		};

		getRandomCalendarIdStr = function getRandomCalendarIdStr() {
			var randNum = void 0,
			    idStr = void 0;
			do {
				randNum = Math.round(Math.random() * Math.pow(10, 10));
				idStr = "flatpickr-" + randNum;
			} while (document.getElementById(idStr) !== null);

			return idStr;
		};

		uDate = function uDate(date, timeless) {
			timeless = timeless || false;

			if (date === "today") {
				date = new Date();
				timeless = true;
			} else if (typeof date === "string") {
				date = date.trim();

				if (self.config.parseDate) {
					date = self.config.parseDate(date);
				} else if (/^\d\d\d\d\-\d{1,2}\-\d\d$/.test(date)) {
					// this utc datestring gets parsed, but incorrectly by Date.parse
					date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2"));
				} else if (Date.parse(date)) {
					date = new Date(date);
				} else if (/^\d\d\d\d\-\d\d\-\d\d/.test(date)) {
					// disable special utc datestring
					date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2"));
				} else if (/^(\d?\d):(\d\d)/.test(date)) {
					// time-only picker
					var matches = date.match(/^(\d?\d):(\d\d)(:(\d\d))?/),
					    seconds = matches[4] !== undefined ? matches[4] : 0;

					date = new Date();
					date.setHours(matches[1], matches[2], seconds, 0);
				} else {
					console.error("flatpickr: invalid date string " + date);
					console.info(self.element);
				}
			}

			if (!(date instanceof Date) || !date.getTime()) {
				return null;
			}

			if (self.config.utc && !date.fp_isUTC) {
				date = date.fp_toUTC();
			}

			if (timeless) {
				date.setHours(0, 0, 0, 0);
			}

			return date;
		};

		equalDates = function equalDates(date1, date2) {
			return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
		};

		wrap = function wrap() {
			wrapperElement = createElement("div", "flatpickr-wrapper");

			if (self.config.inline || self.config.static) {
				// Wrap input and place calendar underneath
				self.element.parentNode.insertBefore(wrapperElement, self.element);
				wrapperElement.appendChild(self.element);

				wrapperElement.classList.add(self.config.inline ? "inline" : "static");
			} else {
				// Insert at bottom of BODY tag to display outside
				// of relative positioned elements with css "overflow: hidden;"
				// property set.
				document.body.appendChild(wrapperElement);
			}

			if (self.config.altInput) {
				// replicate self.element
				self.altInput = createElement(self.input.nodeName, self.config.altInputClass + " flatpickr-input");
				self.altInput.placeholder = self.input.placeholder;
				self.altInput.type = "text";

				self.input.type = "hidden";
				self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
			}
		};

		getDaysinMonth = function getDaysinMonth() {
			var month = arguments.length <= 0 || arguments[0] === undefined ? self.currentMonth : arguments[0];

			var yr = self.currentYear;

			if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) {
				return 29;
			}

			return self.l10n.daysInMonth[month];
		};

		updateValue = function updateValue(e) {
			if (self.config.noCalendar && !self.selectedDateObj) {
				// picking time only and method triggered from picker
				self.selectedDateObj = new Date();
			} else if (!self.selectedDateObj) {
				return;
			}

			if (e) {
				e.target.blur();
			}

			var timeHasChanged = void 0;

			if (self.config.enableTime) {
				var previousTimestamp = self.selectedDateObj.getTime();

				// update time
				var hours = parseInt(self.hourElement.value, 10) || 0,
				    seconds = void 0;

				var minutes = (60 + (parseInt(self.minuteElement.value, 10) || 0)) % 60;

				if (self.config.enableSeconds) {
					seconds = (60 + parseInt(self.secondElement.value, 10) || 0) % 60;
				}

				if (!self.config.time_24hr) {
					// the real number of hours for the date object
					hours = hours % 12 + 12 * (self.amPM.innerHTML === "PM");
				}

				self.selectedDateObj.setHours(hours, minutes, seconds === undefined ? self.selectedDateObj.getSeconds() : seconds);

				self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);
				self.minuteElement.value = pad(minutes);

				if (seconds !== undefined) {
					self.secondElement.value = pad(seconds);
				}

				timeHasChanged = self.selectedDateObj.getTime() !== previousTimestamp;
			}

			self.input.value = self.formatDate(self.config.dateFormat);

			if (self.altInput) {
				self.altInput.value = self.formatDate(self.config.altFormat);
			}

			if (e && (timeHasChanged || e.target.classList.contains("flatpickr-day"))) {
				triggerChange();
			}

			if (self.config.onValueUpdate) {
				self.config.onValueUpdate(self.selectedDateObj, self.input.value, self);
			}
		};

		pad = function pad(num) {
			return ("0" + num).slice(-2);
		};

		self.formatDate = function (dateFormat) {
			var formattedDate = "";
			var formatPieces = dateFormat.split("");

			for (var i = 0; i < formatPieces.length; i++) {
				var c = formatPieces[i];
				if (self.formats.hasOwnProperty(c) && formatPieces[i - 1] !== "\\") {
					formattedDate += self.formats[c]();
				} else if (c !== "\\") {
					formattedDate += c;
				}
			}

			return formattedDate;
		};

		monthToStr = function monthToStr(date, shorthand) {
			if (shorthand || self.config.shorthandCurrentMonth) {
				return self.l10n.months.shorthand[date];
			}

			return self.l10n.months.longhand[date];
		};

		isEnabled = function isEnabled(dateToCheck) {
			if (self.config.minDate && dateToCheck < self.config.minDate || self.config.maxDate && dateToCheck > self.config.maxDate) {
				return false;
			}

			dateToCheck = uDate(dateToCheck, true); // timeless

			var bool = self.config.enable.length > 0,
			    array = bool ? self.config.enable : self.config.disable;

			var d = void 0;

			for (var i = 0; i < array.length; i++) {
				d = array[i];

				if (d instanceof Function && d(dateToCheck)) {
					// disabled by function
					return bool;
				} else if ( // disabled weekday
				typeof d === "string" && /^wkd/.test(d) && dateToCheck.getDay() === (parseInt(d.slice(-1), 10) + self.l10n.firstDayOfWeek - 1) % 7) {
					return bool;
				} else if ((d instanceof Date || typeof d === "string" && !/^wkd/.test(d)) && uDate(d, true).getTime() === dateToCheck.getTime()) {
					// disabled by date string
					return bool;
				} else if ( // disabled by range
				(typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.hasOwnProperty("from") && dateToCheck >= uDate(d.from) && dateToCheck <= uDate(d.to)) {
					return bool;
				}
			}

			return !bool;
		};

		yearScroll = function yearScroll(event) {
			event.preventDefault();

			var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.deltaY));
			self.currentYear = event.target.value = parseInt(event.target.value, 10) + delta;
			self.redraw();
		};

		timeWrapper = function timeWrapper(e) {
			e.preventDefault();

			var min = parseInt(e.target.min, 10),
			    max = parseInt(e.target.max, 10),
			    step = parseInt(e.target.step, 10),
			    value = parseInt(e.target.value, 10);

			var newValue = value;

			if (e.type === "wheel") {
				newValue = value + step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
			}

			if (newValue <= min) {
				newValue = max - step;
			} else if (newValue >= max) {
				newValue = min + step;
			}

			e.target.value = pad(newValue);
		};

		updateNavigationCurrentMonth = function updateNavigationCurrentMonth() {
			currentMonthElement.textContent = monthToStr(self.currentMonth) + " ";
			currentYearElement.value = self.currentYear;
		};

		handleYearChange = function handleYearChange() {
			if (self.currentMonth < 0 || self.currentMonth > 11) {
				self.currentYear += self.currentMonth % 11;
				self.currentMonth = (self.currentMonth + 12) % 12;
			}
		};

		documentClick = function documentClick(e) {
			var isCalendarElement = wrapperElement.contains(e.relatedTarget || e.target),
			    isInput = self.element.contains(e.relatedTarget || e.target) || e.relatedTarget || e.target === self.altInput;

			if (self.isOpen && !isCalendarElement && !isInput) {
				self.close();
			}
		};

		changeMonth = function changeMonth(offset) {
			self.currentMonth += offset;

			handleYearChange();
			updateNavigationCurrentMonth();
			buildDays();
			(self.config.noCalendar ? timeContainer : calendar).focus();
		};

		selectDate = function selectDate(e) {
			e.preventDefault();
			e.stopPropagation();

			if (self.config.allowInput && e.target === (self.altInput || self.input) && e.which === 13) {
				self.setDate((self.altInput || self.input).value);
				self.redraw();
			} else if (e.target.classList.contains("flatpickr-day")) {
				var isPrevMonthDay = e.target.classList.contains("prevMonthDay"),
				    isNextMonthDay = e.target.classList.contains("nextMonthDay"),
				    monthNum = self.currentMonth - isPrevMonthDay + isNextMonthDay;

				if (isPrevMonthDay || isNextMonthDay) {
					changeMonth(+isNextMonthDay - isPrevMonthDay);
				}

				self.selectedDateObj = new Date(self.currentYear, monthNum, e.target.innerHTML);

				updateValue(e);
				buildDays();

				if (!self.config.enableTime) {
					self.close();
				}
			}
		};

		buildCalendar = function buildCalendar() {
			calendarContainer = createElement("div", "flatpickr-calendar");
			calendarContainer.id = getRandomCalendarIdStr();

			calendar = createElement("div", "flatpickr-days");
			calendar.tabIndex = -1;

			if (!self.config.noCalendar) {
				buildMonthNavigation();
				buildWeekdays();

				if (self.config.weekNumbers) {
					buildWeeks();
				}

				buildDays();

				calendarContainer.appendChild(calendar);
			}

			wrapperElement.appendChild(calendarContainer);

			if (self.config.enableTime) {
				buildTime();
			}
		};

		buildMonthNavigation = function buildMonthNavigation() {
			monthsNav = createElement("div", "flatpickr-month");

			prevMonthNav = createElement("span", "flatpickr-prev-month");
			prevMonthNav.innerHTML = self.config.prevArrow;

			currentMonthElement = createElement("span", "cur_month");

			currentYearElement = createElement("input", "cur_year");
			currentYearElement.type = "number";
			currentYearElement.title = self.l10n.scrollTitle;

			nextMonthNav = createElement("span", "flatpickr-next-month");
			nextMonthNav.innerHTML = self.config.nextArrow;

			navigationCurrentMonth = createElement("span", "flatpickr-current-month");
			navigationCurrentMonth.appendChild(currentMonthElement);
			navigationCurrentMonth.appendChild(currentYearElement);

			monthsNav.appendChild(prevMonthNav);
			monthsNav.appendChild(navigationCurrentMonth);
			monthsNav.appendChild(nextMonthNav);

			calendarContainer.appendChild(monthsNav);
			updateNavigationCurrentMonth();
		};

		buildWeekdays = function buildWeekdays() {
			weekdayContainer = createElement("div", "flatpickr-weekdays");
			var firstDayOfWeek = self.l10n.firstDayOfWeek;

			var weekdays = self.l10n.weekdays.shorthand.slice();

			if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
				weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
			}

			if (self.config.weekNumbers) {
				weekdayContainer.innerHTML = "<span>" + self.l10n.weekAbbreviation + "</span>";
			}

			weekdayContainer.innerHTML += "<span>" + weekdays.join("</span><span>") + "</span>";

			calendarContainer.appendChild(weekdayContainer);
		};

		buildWeeks = function buildWeeks() {
			calendarContainer.classList.add("hasWeeks");

			weekNumbers = createElement("div", "flatpickr-weeks");
			calendarContainer.appendChild(weekNumbers);
		};

		buildDays = function buildDays() {
			var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7,
			    daysInMonth = getDaysinMonth(),
			    prevMonthDays = getDaysinMonth((self.currentMonth - 1 + 12) % 12),
			    days = document.createDocumentFragment();

			var dayNumber = prevMonthDays + 1 - firstOfMonth,
			    currentDate = void 0,
			    dateIsDisabled = void 0;

			if (self.config.weekNumbers) {
				weekNumbers.innerHTML = "";
			}

			calendar.innerHTML = "";

			self.config.minDate = uDate(self.config.minDate, true);
			self.config.maxDate = uDate(self.config.maxDate, true);

			// prepend days from the ending of previous month
			for (; dayNumber <= prevMonthDays; dayNumber++) {
				var curDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber, 0, 0, 0, 0, 0),
				    dateIsEnabled = isEnabled(curDate),
				    dayElem = createElement("span", dateIsEnabled ? "flatpickr-day prevMonthDay" : "disabled", dayNumber);

				if (dateIsEnabled) {
					dayElem.tabIndex = 0;
				}

				days.appendChild(dayElem);
			}

			// Start at 1 since there is no 0th day
			for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
				currentDate = new Date(self.currentYear, self.currentMonth, dayNumber, 0, 0, 0, 0, 0);

				if (self.config.weekNumbers && dayNumber % 7 === 1) {
					weekNumbers.appendChild(createElement("span", "disabled flatpickr-day", currentDate.fp_getWeek()));
				}

				dateIsDisabled = !isEnabled(currentDate);

				var dayElement = createElement("span", dateIsDisabled ? "disabled" : "flatpickr-day", dayNumber);

				if (!dateIsDisabled) {
					dayElement.tabIndex = 0;

					if (equalDates(currentDate, now)) {
						dayElement.classList.add("today");
					}

					if (self.selectedDateObj && equalDates(currentDate, self.selectedDateObj)) {
						dayElement.classList.add("selected");
					}
				}

				days.appendChild(dayElement);
			}

			// append days from the next month
			for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++) {
				var _curDate = new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth, 0, 0, 0, 0, 0),
				    _dateIsEnabled = isEnabled(_curDate),
				    _dayElement = createElement("span", _dateIsEnabled ? "nextMonthDay flatpickr-day" : "disabled", dayNum % daysInMonth);

				if (self.config.weekNumbers && dayNum % 7 === 1) {
					weekNumbers.appendChild(createElement("span", "disabled", _curDate.fp_getWeek()));
				}

				if (_dateIsEnabled) {
					_dayElement.tabIndex = 0;
				}

				days.appendChild(_dayElement);
			}

			calendar.appendChild(days);
		};

		buildTime = function buildTime() {
			timeContainer = createElement("div", "flatpickr-time");
			timeContainer.tabIndex = -1;
			var separator = createElement("span", "flatpickr-time-separator", ":");

			self.hourElement = createElement("input", "flatpickr-hour");
			self.minuteElement = createElement("input", "flatpickr-minute");

			self.hourElement.tabIndex = self.minuteElement.tabIndex = 0;
			self.hourElement.type = self.minuteElement.type = "number";

			self.hourElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getHours()) : 12;

			self.minuteElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getMinutes()) : "00";

			self.hourElement.step = self.config.hourIncrement;
			self.minuteElement.step = self.config.minuteIncrement;

			self.hourElement.min = -self.config.time_24hr;
			self.hourElement.max = self.config.time_24hr ? 24 : 13;

			self.minuteElement.min = -self.minuteElement.step;
			self.minuteElement.max = 60;

			self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;

			timeContainer.appendChild(self.hourElement);
			timeContainer.appendChild(separator);
			timeContainer.appendChild(self.minuteElement);

			if (self.config.enableSeconds) {
				timeContainer.classList.add("has-seconds");

				self.secondElement = createElement("input", "flatpickr-second");
				self.secondElement.type = "number";
				self.secondElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getSeconds()) : "00";

				self.secondElement.step = self.minuteElement.step;
				self.secondElement.min = self.minuteElement.min;
				self.secondElement.max = self.minuteElement.max;

				timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
				timeContainer.appendChild(self.secondElement);
			}

			if (!self.config.time_24hr) {
				// add self.amPM if appropriate
				self.amPM = createElement("span", "flatpickr-am-pm", ["AM", "PM"][self.hourElement.value > 11 | 0]);
				self.amPM.title = self.l10n.toggleTitle;
				self.amPM.tabIndex = 0;
				timeContainer.appendChild(self.amPM);
			}

			calendarContainer.appendChild(timeContainer);
		};

		bind = function bind() {
			document.addEventListener("keydown", onKeyDown);
			window.addEventListener("resize", onResize);

			if (self.config.clickOpens) {
				(self.altInput || self.input).addEventListener("click", self.open);
				(self.altInput || self.input).addEventListener("focus", self.open);
			}

			if (self.config.wrap && self.element.querySelector("[data-open]")) {
				self.element.querySelector("[data-open]").addEventListener("click", self.open);
			}

			if (self.config.wrap && self.element.querySelector("[data-close]")) {
				self.element.querySelector("[data-close]").addEventListener("click", self.close);
			}

			if (self.config.wrap && self.element.querySelector("[data-toggle]")) {
				self.element.querySelector("[data-toggle]").addEventListener("click", self.toggle);
			}

			if (self.config.wrap && self.element.querySelector("[data-clear]")) {
				self.element.querySelector("[data-clear]").addEventListener("click", self.clear);
			}

			if (!self.config.noCalendar) {
				prevMonthNav.addEventListener("click", function () {
					changeMonth(-1);
				});

				nextMonthNav.addEventListener("click", function () {
					changeMonth(1);
				});

				currentYearElement.addEventListener("wheel", yearScroll);
				currentYearElement.addEventListener("focus", currentYearElement.select);

				currentYearElement.addEventListener("input", function (event) {
					self.currentYear = parseInt(event.target.value, 10);
					self.redraw();
				});

				calendar.addEventListener("click", selectDate);
			}

			document.addEventListener("click", documentClick, true);
			document.addEventListener("focus", documentClick, true);

			if (self.config.enableTime) {
				self.hourElement.addEventListener("wheel", timeWrapper);
				self.minuteElement.addEventListener("wheel", timeWrapper);

				self.hourElement.addEventListener("input", timeWrapper);
				self.minuteElement.addEventListener("input", timeWrapper);

				self.hourElement.addEventListener("mouseout", updateValue);
				self.minuteElement.addEventListener("mouseout", updateValue);

				self.hourElement.addEventListener("change", updateValue);
				self.minuteElement.addEventListener("change", updateValue);

				self.hourElement.addEventListener("focus", self.hourElement.select);
				self.minuteElement.addEventListener("focus", self.minuteElement.select);

				if (self.config.enableSeconds) {
					self.secondElement.addEventListener("wheel", timeWrapper);
					self.secondElement.addEventListener("input", timeWrapper);
					self.secondElement.addEventListener("mouseout", updateValue);
					self.secondElement.addEventListener("change", updateValue);
					self.secondElement.addEventListener("focus", self.secondElement.select);
				}

				if (!self.config.time_24hr) {
					self.amPM.addEventListener("click", amPMToggle);

					self.amPM.addEventListener("wheel", amPMToggle);
					self.amPM.addEventListener("mouseout", updateValue);

					self.amPM.addEventListener("keydown", function (e) {
						if (e.which === 38 || e.which === 40) {
							amPMToggle(e);
						}
					});
				}
			}

			if (document.createEvent) {
				clickEvt = document.createEvent("MouseEvent");
				// without all these args ms edge spergs out
				clickEvt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			} else {
				clickEvt = new MouseEvent("click", {
					view: window,
					bubbles: true,
					cancelable: true
				});
			}
		};

		self.open = function () {
			if (self.isOpen || (self.altInput || self.input).disabled || self.config.inline) {
				return;
			} else if (!self.config.static) {
				self.positionCalendar();
			}

			self.isOpen = true;

			wrapperElement.classList.add("open");

			if (!self.config.allowInput) {
				(self.altInput || self.input).blur();
				(self.config.noCalendar ? timeContainer : calendar).focus();
			}

			(self.altInput || self.input).classList.add("active");

			if (self.config.onOpen) {
				self.config.onOpen(self.selectedDateObj, self.input.value, self);
			}
		};

		// For calendars inserted in BODY (as opposed to inline wrapper)
		// it"s necessary to properly calculate top/left position.
		self.positionCalendar = function () {
			var calendarHeight = calendarContainer.offsetHeight,
			    input = self.altInput || self.input,
			    inputBounds = input.getBoundingClientRect(),
			    distanceFromBottom = window.innerHeight - inputBounds.bottom + input.offsetHeight;

			var top = void 0,
			    left = window.pageXOffset + inputBounds.left;

			if (distanceFromBottom < calendarHeight) {
				top = window.pageYOffset - calendarHeight + inputBounds.top - 2;
				calendarContainer.classList.remove("arrowTop");
				calendarContainer.classList.add("arrowBottom");
			} else {
				top = window.pageYOffset + input.offsetHeight + inputBounds.top + 2;
				calendarContainer.classList.remove("arrowBottom");
				calendarContainer.classList.add("arrowTop");
			}

			wrapperElement.style.top = top + "px";
			wrapperElement.style.left = left + "px";
		};

		self.toggle = function () {
			if (self.isOpen) {
				self.close();
			} else {
				self.open();
			}
		};

		self.close = function () {
			self.isOpen = false;
			wrapperElement.classList.remove("open");
			(self.altInput || self.input).classList.remove("active");

			if (self.config.onClose) {
				self.config.onClose(self.selectedDateObj, self.input.value, self);
			}
		};

		self.clear = function () {
			self.input.value = "";

			if (self.altInput) {
				self.altInput.value = "";
			}

			self.selectedDateObj = null;

			triggerChange();
			self.jumpToDate();
		};

		triggerChange = function triggerChange() {
			self.input.dispatchEvent(clickEvt);

			if (self.config.onChange) {
				self.config.onChange(self.selectedDateObj, self.input.value, self);
			}
		};

		self.destroy = function () {
			document.removeEventListener("click", documentClick, false);

			if (self.altInput) {
				self.altInput.parentNode.removeChild(self.altInput);
			}

			if (self.config.inline) {
				var parent = self.element.parentNode,
				    removedElement = parent.removeChild(self.element);

				parent.removeChild(calendarContainer);
				parent.parentNode.replaceChild(removedElement, parent);
			} else {
				document.getElementsByTagName("body")[0].removeChild(wrapperElement);
			}
		};

		self.redraw = function () {
			if (self.config.noCalendar) {
				return;
			}

			updateNavigationCurrentMonth();
			buildDays();
		};

		self.jumpToDate = function (jumpDate) {
			jumpDate = uDate(jumpDate || self.selectedDateObj || self.config.defaultDate || self.config.minDate || now);

			self.currentYear = jumpDate.getFullYear();
			self.currentMonth = jumpDate.getMonth();
			self.redraw();
		};

		self.setDate = function (date, triggerChangeEvent) {
			date = uDate(date);

			if (date instanceof Date && date.getTime()) {
				self.selectedDateObj = uDate(date);
				self.jumpToDate(self.selectedDateObj);
				updateValue();

				if (triggerChangeEvent) {
					triggerChange();
				}
			}
		};

		self.setTime = function (hour, minute, triggerChangeEvent) {
			if (!self.selectedDateObj) {
				return;
			}

			self.hourElement.value = parseInt(hour, 10) % 24;
			self.minuteElement.value = parseInt(minute || 0, 10) % 60;

			if (!self.config.time_24hr) {
				self.amPM.innerHTML = hour > 11 ? "PM" : "AM";
			}

			updateValue();

			if (triggerChangeEvent) {
				triggerChange();
			}
		};

		self.set = function (key, value) {
			if (key in self.config) {
				self.config[key] = value;
				self.jumpToDate();
			}
		};

		amPMToggle = function amPMToggle(e) {
			e.preventDefault();
			self.amPM.textContent = ["AM", "PM"][self.amPM.innerHTML === "AM" | 0];
		};

		onKeyDown = function onKeyDown(e) {
			if (!self.isOpen || self.config.enableTime && timeContainer.contains(e.target)) {
				return;
			}

			switch (e.which) {
				case 13:
					selectDate(e);
					break;

				case 27:
					self.close();
					break;

				case 37:
					changeMonth(-1);
					break;

				case 38:
					e.preventDefault();
					self.currentYear++;
					self.redraw();
					break;

				case 39:
					changeMonth(1);
					break;

				case 40:
					e.preventDefault();
					self.currentYear--;
					self.redraw();
					break;

				default:
					break;
			}
		};

		onResize = debounce(function () {
			if (self.isOpen && !self.config.inline && !self.config.static) {
				self.positionCalendar();
			}
		}, 300);

		try {
			init();
		} catch (error) {
			// skip and carry on
			console.error(error);
			console.info(self.element);
		}

		return self;
	};

	flatpickr.init.prototype = {

		defaultConfig: {},

		l10n: {
			weekdays: {
				shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			months: {
				shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
			},
			daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			firstDayOfWeek: 0,
			ordinal: function ordinal(nth) {
				var s = nth % 100;
				if (s > 3 && s < 21) return "th";
				switch (s % 10) {
					case 1:
						return "st";
					case 2:
						return "nd";
					case 3:
						return "rd";
					default:
						return "th";
				}
			},
			weekAbbreviation: "Wk",
			scrollTitle: "Scroll to increment",
			toggleTitle: "Click to toggle"
		}

	};

	Date.prototype.fp_incr = function (days) {
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
	};

	Date.prototype.fp_isUTC = false;
	Date.prototype.fp_toUTC = function () {
		var newDate = new Date(this.getTime() + this.getTimezoneOffset() * 60000);
		newDate.fp_isUTC = true;

		return newDate;
	};

	Date.prototype.fp_getWeek = function () {
		var date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);

		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	};

	// classList polyfill
	if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== "undefined") {
		Object.defineProperty(HTMLElement.prototype, "classList", {
			get: function get() {
				var selfElements = this;
				function update(fn) {
					return function (value) {
						var classes = selfElements.className.split(/\s+/);
						var index = classes.indexOf(value);

						fn(classes, index, value);
						selfElements.className = classes.join(" ");
					};
				}

				var ret = {
					add: update(function (classes, index, value) {
						return ~index || classes.push(value);
					}),
					remove: update(function (classes, index) {
						return ~index && classes.splice(index, 1);
					}),
					toggle: update(function (classes, index, value) {
						if (~index) {
							classes.splice(index, 1);
						} else {
							classes.push(value);
						}
					}),
					contains: function contains(value) {
						return !!~selfElements.className.split(/\s+/).indexOf(value);
					}
				};

				return ret;
			}
		});
	}

	if (typeof module !== "undefined") {
		module.exports = flatpickr;
	}
	});

	var flatpickr$1 = (flatpickr && typeof flatpickr === 'object' && 'default' in flatpickr ? flatpickr['default'] : flatpickr);

	__$styleInject(".flatpickr-input,.flatpickr-wrapper input{z-index:1;cursor:pointer}.flatpickr-wrapper{position:absolute;display:none}.flatpickr-wrapper.inline,.flatpickr-wrapper.inline .flatpickr-calendar,.flatpickr-wrapper.static{position:relative}.flatpickr-wrapper.static .flatpickr-calendar{position:absolute}.flatpickr-wrapper.inline,.flatpickr-wrapper.open{display:inline-block}.flatpickr-wrapper.inline .flatpickr-calendar,.flatpickr-wrapper.open .flatpickr-calendar{z-index:99999;visibility:visible}.flatpickr-calendar{background:#fff;border:1px solid #ddd;font-size:90%;border-radius:3px;position:absolute;top:100%;left:0;visibility:hidden;width:256px}.flatpickr-calendar.hasWeeks{width:288px}.flatpickr-calendar.hasWeeks .flatpickr-weekdays span{width:12.5%}.flatpickr-calendar:after,.flatpickr-calendar:before{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:after,.flatpickr-calendar.arrowTop:before{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#ddd}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:after,.flatpickr-calendar.arrowBottom:before{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#ddd}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-month{background:0 0;color:#000;padding:4px 5px 2px;text-align:center;position:relative}.flatpickr-next-month,.flatpickr-prev-month{text-decoration:none;cursor:pointer;position:absolute;top:.5rem}.flatpickr-next-month i,.flatpickr-prev-month i{position:relative}.flatpickr-next-month:hover,.flatpickr-prev-month:hover{color:#f99595}.flatpickr-prev-month{float:left;left:.5rem}.flatpickr-next-month{float:right;right:.5rem}.flatpickr-current-month{font-size:135%;font-weight:300;color:rgba(0,0,0,.7);display:inline-block}.flatpickr-current-month .cur_month{font-weight:700;color:#000}.flatpickr-current-month .cur_year{background:0 0;box-sizing:border-box;color:inherit;cursor:default;padding:0 0 0 2px;margin:0;width:3.15em;display:inline;font-size:inherit;font-weight:300;line-height:inherit;height:initial;border:0}.flatpickr-current-month .cur_year:hover{background:rgba(0,0,0,.05)}.flatpickr-weekdays{font-size:90%;background:0 0;padding:2px 0 4px;text-align:center}.flatpickr-weekdays span{opacity:.54;text-align:center;display:inline-block;width:14.28%;font-weight:700}.flatpickr-weeks{width:32px;float:left}.flatpickr-days{padding-top:1px;outline:0}.flatpickr-days span,.flatpickr-weeks span{background:0 0;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:#393939;cursor:pointer;display:inline-block;font-weight:300;width:34px;height:34px;line-height:33px;margin:0 1px 1px;text-align:center}.flatpickr-days span.disabled,.flatpickr-days span.disabled:hover,.flatpickr-days span.nextMonthDay,.flatpickr-days span.prevMonthDay,.flatpickr-weeks span.disabled,.flatpickr-weeks span.disabled:hover,.flatpickr-weeks span.nextMonthDay,.flatpickr-weeks span.prevMonthDay{color:rgba(57,57,57,.3);background:0 0;border-color:transparent;cursor:default}.flatpickr-days span.nextMonthDay:focus,.flatpickr-days span.nextMonthDay:hover,.flatpickr-days span.prevMonthDay:focus,.flatpickr-days span.prevMonthDay:hover,.flatpickr-days span:focus,.flatpickr-days span:hover,.flatpickr-weeks span.nextMonthDay:focus,.flatpickr-weeks span.nextMonthDay:hover,.flatpickr-weeks span.prevMonthDay:focus,.flatpickr-weeks span.prevMonthDay:hover,.flatpickr-weeks span:focus,.flatpickr-weeks span:hover{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-days span.today,.flatpickr-weeks span.today{border-color:#f99595}.flatpickr-days span.today:focus,.flatpickr-days span.today:hover,.flatpickr-weeks span.today:focus,.flatpickr-weeks span.today:hover{border-color:#f99595;background:#f99595;color:#fff}.flatpickr-days span.selected,.flatpickr-days span.selected:focus,.flatpickr-days span.selected:hover,.flatpickr-weeks span.selected,.flatpickr-weeks span.selected:focus,.flatpickr-weeks span.selected:hover{background:#446cb3;color:#fff;border-color:#446cb3}.flatpickr-am-pm,.flatpickr-time input[type=number],.flatpickr-time-separator{height:38px;display:inline-block;line-height:38px;color:#393939}.flatpickr-time{overflow:auto;text-align:center;border-top:0;outline:0}.flatpickr-time input[type=number]{background:0 0;-webkit-appearance:none;-moz-appearance:textfield;box-shadow:none;border:0;border-radius:0;width:33%;min-width:33%;text-align:center;margin:0;padding:0;cursor:pointer;font-weight:700}.flatpickr-am-pm:focus,.flatpickr-am-pm:hover,.flatpickr-time input[type=number]:focus,.flatpickr-time input[type=number]:hover{background:#f0f0f0}.flatpickr-time input[type=number].flatpickr-minute{width:26%;font-weight:300}.flatpickr-time input[type=number].flatpickr-second{font-weight:300}.flatpickr-time input[type=number]:focus{outline:0;border:0}.flatpickr-time.has-seconds input[type=number]{width:25%;min-width:25%}.flatpickr-days+.flatpickr-time{border-top:1px solid #ddd}.flatpickr-am-pm{outline:0;width:21%;padding:0 2%;cursor:pointer;text-align:left;font-weight:300}@media all and (-ms-high-contrast:none){.flatpickr-month{padding:0}}");

	var h$10 = preact.h;
	var Component$9 = preact.Component;
	var DateField = function (_AskField) {
	  babelHelpers.inherits(DateField, _AskField);

	  function DateField(props, context) {
	    babelHelpers.classCallCheck(this, DateField);

	    // extend the state from AskWidget

	    var _this = babelHelpers.possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, props, context));

	    _this.state = {
	      value: '',
	      isValid: false,
	      completed: false,
	      year: '',
	      month: '',
	      day: ''
	    };

	    _this.onDateChange = _this.onDateChange.bind(_this);
	    return _this;
	  }

	  babelHelpers.createClass(DateField, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this.datepicker = flatpickr$1(this._calendarGroup, { utc: true });
	      this.datepicker.set('onChange', function (d) {
	        return _this2.onFlatPickrChange(d);
	      });
	    }
	  }, {
	    key: 'onFlatPickrChange',
	    value: function onFlatPickrChange(timestamp) {
	      var flatPickrDate = new Date(timestamp);

	      this.setState({
	        value: timestamp,
	        day: flatPickrDate.getDate(),
	        month: flatPickrDate.getMonth() + 1,
	        year: flatPickrDate.getFullYear()
	      });

	      this.validateAndSave();
	    }
	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$7.base, this.props.isValid ? styles$7.valid : styles$7.error, this.state.focused ? styles$7.focused : {}, { backgroundColor: this.props.theme.inputBackground });
	    }
	  }, {
	    key: 'validateAndSave',
	    value: function validateAndSave(options) {
	      if (this.validate()) {
	        this.setState({
	          value: this.buildValue()
	        });
	      } else {
	        this.setState({
	          value: '--'
	        });
	      }
	      this.update(options);
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {
	      var isValid = this.isDateValid(),
	          completed = this.isCompleted();

	      this.setState({
	        isValid: isValid,
	        completed: completed
	      });

	      // If it's required: I'll check if it's valid and completed. If not, just needs to be valid.
	      return this.props.wrapper.required ? isValid && completed : isValid;
	    }
	  }, {
	    key: 'buildValue',
	    value: function buildValue() {
	      var _state = this.state,
	          month = _state.month,
	          day = _state.day,
	          year = _state.year;

	      return month + '-' + day + '-' + year;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return { value: this.buildValue() };
	    }
	  }, {
	    key: 'daysInMonth',
	    value: function daysInMonth(month, year) {
	      return new Date(year, month, 0).getDate();
	    }
	  }, {
	    key: 'onDateChange',
	    value: function onDateChange() {
	      var year = this._year.value;
	      var month = this._month.value;
	      var day = this._day.value;

	      this.setState({
	        year: year,
	        month: month,
	        day: day
	      });

	      this.validateAndSave();
	    }
	  }, {
	    key: 'isCompleted',
	    value: function isCompleted() {
	      return !!(this._year.value && this._month.value && this._day.value);
	    }
	  }, {
	    key: 'isDateValid',
	    value: function isDateValid() {
	      var isValid = true;
	      var _state2 = this.state,
	          year = _state2.year,
	          month = _state2.month,
	          day = _state2.day;


	      if (year && (year < 1916 || year > 2056)) {
	        isValid = false;
	      }

	      if (month && (month < 1 || month > 12)) {
	        isValid = false;
	      }

	      if (day && (day < 1 || day > this.daysInMonth(month, year))) {
	        isValid = false;
	      }

	      return isValid;
	    }
	  }, {
	    key: 'getDateInputStyles',
	    value: function getDateInputStyles(part) {
	      return babelHelpers.extends({}, styles$7.dateInput, styles$7[part]);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props = this.props,
	          title = _props.title,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;

	      var fieldIdentifier = component + '--' + fieldNumber;

	      return h$10(
	        'div',
	        { style: styles$7.base },
	        h$10(
	          'div',
	          { style: styles$7.dateFields },
	          h$10(
	            'fieldset',
	            { style: styles$7.fieldset, id: fieldIdentifier },
	            h$10(
	              'label',
	              { 'for': fieldIdentifier + '__month', style: styles$7.visuallyhidden },
	              'Month'
	            ),
	            h$10('input', {
	              id: fieldIdentifier + '__month',
	              ref: function ref(el) {
	                return _this3._month = el;
	              },
	              type: 'number',
	              step: '1',
	              placeholder: 'MM',
	              min: '1',
	              max: '12',
	              value: this.state.month,
	              onChange: this.onDateChange,
	              style: this.getDateInputStyles('month')
	            }),
	            h$10(
	              'label',
	              { 'for': fieldIdentifier + '__day', style: styles$7.visuallyhidden },
	              'Day'
	            ),
	            h$10('input', {
	              id: fieldIdentifier + '__day',
	              min: '1',
	              max: this.daysInMonth(),
	              ref: function ref(el) {
	                return _this3._day = el;
	              },
	              type: 'number',
	              step: '1',
	              placeholder: 'DD',
	              value: this.state.day,
	              onChange: this.onDateChange,
	              style: this.getDateInputStyles('day')
	            }),
	            h$10(
	              'label',
	              { 'for': fieldIdentifier + '__year', style: styles$7.visuallyhidden },
	              'Year'
	            ),
	            h$10('input', {
	              id: fieldIdentifier + '__year',
	              ref: function ref(el) {
	                return _this3._year = el;
	              },
	              type: 'number',
	              step: '1',
	              placeholder: 'YYYY',
	              value: this.state.year,
	              onChange: this.onDateChange,
	              style: this.getDateInputStyles('year')
	            })
	          )
	        ),
	        h$10(
	          'div',
	          {
	            tabIndex: '-1',
	            style: styles$7.calendarButton,
	            ref: function ref(el) {
	              return _this3._calendarGroup = el;
	            },
	            'data-wrap': true, 'data-clickOpens': 'false',
	            'aria-hidden': 'true'
	          },
	          h$10('input', { type: 'text', 'data-input': true, style: styles$7.hideInput }),
	          h$10(
	            'a',
	            { 'data-toggle': true },
	            h$10(CalendarIcon, null)
	          )
	        ),
	        h$10('div', { style: styles$7.clear })
	      );
	    }
	  }]);
	  return DateField;
	}(AskField);

	var styles$7 = {
	  base: {
	    maxWidth: '600px',
	    position: 'relative'
	  },
	  fieldset: {
	    border: 'none',
	    padding: 0,
	    margin: 0
	  },
	  textInput: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s'
	  },
	  dateInput: {
	    display: 'inline-block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '10px',
	    width: '60px',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    marginRight: '5px',
	    marginBottom: '10px',
	    textAlign: 'center'
	  },
	  month: {
	    borderRadius: '4px 0 0 4px'
	  },
	  day: {},
	  year: {
	    width: '120px',
	    borderRadius: '0 4px 4px 0'
	  },
	  calendarButton: {
	    display: 'inline-block',
	    width: '40px',
	    height: '50px',
	    background: 'none',
	    border: 'none',
	    padding: '5px 0 0 0',
	    margin: '0',
	    'float': 'left',
	    position: 'relative',
	    cursor: 'pointer'
	  },
	  dateFields: {
	    'float': 'left'
	  },
	  clear: {
	    clear: 'both'
	  },
	  hideInput: {
	    border: 'none',
	    visibility: 'hidden',
	    height: '0',
	    width: '0',
	    margin: '0',
	    padding: '0'
	  },
	  visuallyhidden: {
	    border: 0,
	    clip: 'rect(0 0 0 0)',
	    height: 1,
	    margin: -1,
	    overflow: 'hidden',
	    padding: 0,
	    position: 'absolute',
	    width: 1
	  }
	};

	var h$12 = preact.h;
	var Component$11 = preact.Component;
	var LocationDropdown = function (_AskField) {
	  babelHelpers.inherits(LocationDropdown, _AskField);

	  function LocationDropdown(props, context) {
	    babelHelpers.classCallCheck(this, LocationDropdown);

	    // extend the state from AskWidget

	    var _this = babelHelpers.possibleConstructorReturn(this, (LocationDropdown.__proto__ || Object.getPrototypeOf(LocationDropdown)).call(this, props, context));

	    _this.state = babelHelpers.extends(_this.state, {
	      selectedState: false,
	      zip: false,
	      streetAddress: false,
	      city: false
	    });

	    // FIXME: hardcoded, should this come in props?
	    _this.stateHash = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	    return _this;
	  }

	  // Event listeners

	  babelHelpers.createClass(LocationDropdown, [{
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      switch (e.keyCode) {
	        case 13:
	          // Enter
	          this.validateAndSave();
	          break;
	        default:
	          this.setState({ value: e.target.value });
	          break;
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      this.setState({ value: e.target.value });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      this.validateAndSave();
	    }
	  }, {
	    key: 'onStateChange',
	    value: function onStateChange(e) {
	      this.setState({ selectedState: e.target.value });
	      this.validateAndSave();
	    }
	  }, {
	    key: 'onStreetChange',
	    value: function onStreetChange(e) {
	      this.setState({ streetAddress: e.target.value });
	      this.validateAndSave();
	    }
	  }, {
	    key: 'onCityChange',
	    value: function onCityChange(e) {
	      this.setState({ city: e.target.value });
	      this.validateAndSave();
	    }
	  }, {
	    key: 'onZipChange',
	    value: function onZipChange(e) {
	      this.setState({ zip: e.target.value });
	      this.validateAndSave();
	    }

	    // Compute styles for different field states

	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$8.base, this.props.isValid ? styles$8.valid : styles$8.error, this.state.focused ? styles$8.focused : {}, { backgroundColor: this.props.theme.inputBackground });
	    }
	  }, {
	    key: 'validateAndSave',
	    value: function validateAndSave(options) {
	      this.validate();
	      this.update(options);
	    }

	    // Interface methods

	  }, {
	    key: 'validate',
	    value: function validate() {
	      var isValid = true;
	      var isCompleted = false;

	      isCompleted = !!this.state.streetAddress.length && !!this.state.selectedState.length && !!this.state.city.length && !!this.state.zip.length;

	      this.setState({ isValid: isValid, completed: isCompleted });

	      return this.props.wrapper.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return {
	        streetAddress: this.state.streetAddress,
	        city: this.state.city,
	        selectedState: this.state.selectedState,
	        zip: this.state.zip
	      };
	    }
	  }, {
	    key: 'onDatePickerChange',
	    value: function onDatePickerChange(dateString, _ref) {
	      var dateMoment = _ref.dateMoment,
	          timestamp = _ref.timestamp;

	      this.setState({ selectedDate: dateString, selectedDateString: dateString, dateSelected: true });
	      this.validateAndSave();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return h$12(
	        'div',
	        { style: styles$8.base },
	        h$12(
	          'div',
	          null,
	          h$12('input', {
	            style: styles$8.textInput,
	            onChange: this.onStreetChange.bind(this),
	            onBlur: this.onStreetChange.bind(this),
	            placeholder: 'Street Address',
	            value: this.state.streetAddress,
	            type: 'text' })
	        ),
	        h$12(
	          'div',
	          null,
	          h$12('input', {
	            onChange: this.onCityChange.bind(this),
	            onBlur: this.onCityChange.bind(this),
	            style: [styles$8.textInput, styles$8.city],
	            value: this.state.city,
	            type: 'text',
	            placeholder: 'City' }),
	          h$12(
	            'select',
	            {
	              style: [styles$8.textInput, styles$8.state],
	              onChange: this.onStateChange.bind(this),
	              onBlur: this.onStateChange.bind(this)
	            },
	            h$12(
	              'option',
	              { disabled: true, selected: true },
	              'State'
	            ),
	            this.stateHash.map(function (state) {
	              return h$12(
	                'option',
	                { value: state, selected: _this2.state.selectedState === state },
	                state
	              );
	            })
	          ),
	          h$12('input', {
	            onChange: this.onZipChange.bind(this),
	            onBlur: this.onZipChange.bind(this),
	            value: this.state.zip,
	            style: [styles$8.textInput, styles$8.zip],
	            type: 'text',
	            placeholder: 'Zip code' })
	        ),
	        h$12('div', { style: styles$8.clearBoth })
	      );
	    }
	  }]);
	  return LocationDropdown;
	}(AskField);

	var styles$8 = {
	  base: {
	    maxWidth: '600px'
	  },
	  city: {
	    width: '20%',
	    'float': 'left',
	    margin: '0'
	  },
	  zip: {
	    width: '20%',
	    margin: '0',
	    'float': 'right'
	  },
	  state: {
	    width: '58%',
	    margin: '0 1%',
	    'float': 'left'
	  },
	  textInput: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    padding: '2%',
	    width: '100%',
	    outline: 'none',
	    resize: 'none',
	    border: '1px solid #ccc',
	    transition: 'border .5s',
	    margin: '0 0 5px 0'
	  },
	  clearBoth: {
	    'clear': 'both'
	  }
	};

	var Component$12 = preact.Component;
	var h$13 = preact.h;
	var MultipleChoice = function (_AskField) {
	  babelHelpers.inherits(MultipleChoice, _AskField);

	  function MultipleChoice(props, context) {
	    babelHelpers.classCallCheck(this, MultipleChoice);

	    var _this = babelHelpers.possibleConstructorReturn(this, (MultipleChoice.__proto__ || Object.getPrototypeOf(MultipleChoice)).call(this, props, context));

	    _this.state = {
	      rating: 0,
	      focused: -1,
	      value: [],
	      otherSelected: false,
	      otherValue: false
	    };

	    _this.onOtherClick = _this.onOtherClick.bind(_this);
	    _this.onOtherChange = _this.onOtherChange.bind(_this);
	    return _this;
	  }

	  babelHelpers.createClass(MultipleChoice, [{
	    key: 'onOtherClick',
	    value: function onOtherClick(e) {
	      var otherValue = this.state.otherValue ? [this.state.otherValue] : [];
	      this.setState({ otherSelected: !this.state.otherSelected, value: this.props.multipleChoice ? this.state.value : otherValue });
	      this.validate();
	      this.update({ moveForward: false });
	    }
	  }, {
	    key: 'onOtherChange',
	    value: function onOtherChange(e) {
	      this.setState({ otherValue: e.target.value });
	      this.validate();
	      this.update({ moveForward: false });
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(i, e) {
	      var newValue = this.state.value.slice();
	      // if the clicked element is not present, add it
	      if (newValue.indexOf(i) === -1) {
	        if (this.props.pickUpTo) {
	          if (newValue.length < this.props.pickUpTo) {
	            newValue.push(i);
	          } else {
	            e.preventDefault();
	          }
	        } else {
	          if (this.props.multipleChoice) {
	            newValue.push(i);
	          } else {
	            // make it always an array
	            newValue = [i];
	          }
	        }
	      } else {
	        // if not present, remove it
	        newValue.splice(newValue.indexOf(i), 1);
	      }
	      // If it's not multiple choice, unset otherSelected when choosing an option from the list
	      var newState = { focused: i, value: newValue, otherSelected: this.props.multipleChoice ? this.state.otherSelected : false };
	      if (this.state.value.length >= 0) {
	        newState = babelHelpers.extends({}, newState, { completed: true, isValid: true });
	      } else {
	        newState = babelHelpers.extends({}, newState, { completed: false });
	      }
	      this.setState(newState);
	      this.validate();
	      this.update({ moveForward: false });
	    }

	    // Style computing

	  }, {
	    key: 'getOptionStyle',
	    value: function getOptionStyle(i) {
	      return babelHelpers.extends({}, styles$9.option, i === this.state.focused ? styles$9.focused : {}, { backgroundColor: this.props.theme.inputBackground }, this.state.value.indexOf(i) > -1 ? { // clicked
	        backgroundColor: this.props.theme.selectedItemBackground,
	        color: this.props.theme.selectedItemText
	      } : {});
	    }
	  }, {
	    key: 'getOtherStyle',
	    value: function getOtherStyle() {
	      return babelHelpers.extends({}, styles$9.option, { backgroundColor: this.props.theme.inputBackground }, this.state.otherSelected ? { // clicked
	        backgroundColor: this.props.theme.selectedItemBackground,
	        color: this.props.theme.selectedItemText
	      } : {});
	    }
	  }, {
	    key: 'getStyles',
	    value: function getStyles() {
	      return babelHelpers.extends({}, styles$9.base, this.props.isValid ? styles$9.valid : styles$9.error);
	    }

	    // Template partials

	  }, {
	    key: 'getOptions',
	    value: function getOptions() {
	      var _this2 = this;

	      var _props = this.props,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber,
	          options = _props.options;


	      return options.map(function (option, i) {
	        return h$13(
	          'label',
	          {
	            className: 'ask-form-option',
	            style: _this2.getOptionStyle(i),
	            key: i,
	            'for': component + '--' + fieldNumber + '__field--' + i
	          },
	          h$13('input', {
	            tabIndex: i,
	            id: component + '--' + fieldNumber + '__field--' + i,
	            style: styles$9.optionCheck,
	            onClick: _this2.onClick.bind(_this2, i),
	            name: 'field-' + _this2.props.id,
	            type: _this2.props.multipleChoice ? 'checkbox' : 'radio',
	            key: i
	          }),
	          _this2.getCharIndex(i),
	          '. ',
	          option.title,
	          _this2.state.value.indexOf(i) > -1 ? h$13(
	            'span',
	            { style: styles$9.selectedMark, 'aria-hidden': 'true' },
	            '\xD7'
	          ) : null
	        );
	      });
	    }

	    // Interface Methods

	  }, {
	    key: 'validate',
	    value: function validate() {
	      var validateRequired = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var isValid = true;
	      var isCompleted = false;

	      isCompleted = !!this.state.value.length || this.state.otherSelected && !!this.state.otherValue.length;

	      this.setState({ isValid: isValid, completed: isCompleted });

	      return this.props.wrapper.required ? isValid && isCompleted : isValid;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      var _this3 = this;

	      var selectedOptions = [];
	      var optionTitle;

	      if (!!this.state.value && this.state.value.length) {
	        this.state.value.map(function (index) {
	          optionTitle = _this3.props.options[index].title;
	          selectedOptions.push({
	            index: index,
	            title: optionTitle
	          });
	        });
	      }

	      if (this.state.otherSelected) {
	        selectedOptions.push({
	          title: this.state.otherValue,
	          index: this.props.options.length
	        });
	      }

	      return { options: selectedOptions };
	    }
	  }, {
	    key: 'getCharIndex',
	    value: function getCharIndex(i) {
	      return String.fromCharCode(65 + i);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          component = _props2.component,
	          fieldNumber = _props2.fieldNumber;


	      return h$13(
	        'div',
	        null,
	        h$13(
	          'fieldset',
	          {
	            id: component + '--' + fieldNumber,
	            style: styles$9.base },
	          h$13(
	            'legend',
	            { style: styles$9.accesibleLegend },
	            this.props.title
	          ),
	          this.props.options && !!this.props.options.length ? h$13(
	            'div',
	            { style: styles$9.optionsWrapper },
	            this.getOptions(),
	            this.props.otherAllowed ? h$13(
	              'label',
	              {
	                style: this.getOtherStyle(),
	                key: this.props.options.length,
	                'for': component + '--' + fieldNumber + '__field--other'
	              },
	              h$13('input', {
	                id: component + '--' + fieldNumber + '__field--other',
	                style: styles$9.optionCheck,
	                onClick: this.onOtherClick,
	                tabIndex: '0',
	                name: 'field-' + this.props.id,
	                type: this.props.multipleChoice ? 'checkbox' : 'radio',
	                key: this.props.options.length
	              }),
	              this.getCharIndex(this.props.options.length),
	              '. ',
	              this.props.otherText ? this.props.otherText : 'Other',
	              this.state.otherSelected ? h$13(
	                'span',
	                { style: styles$9.selectedMark, 'aria-hidden': 'true' },
	                '\xD7'
	              ) : null
	            ) : null,
	            this.props.otherAllowed && this.state.otherSelected ? h$13('input', { type: 'text', placeholder: 'Please specify...', onChange: this.onOtherChange, style: styles$9.otherInput }) : null
	          ) : null
	        ),
	        this.props.pickUpTo ? h$13(
	          'div',
	          { style: styles$9.bottomLegend },
	          this.state.value.length,
	          ' of ',
	          this.props.pickUpTo,
	          ' selected.'
	        ) : null
	      );
	    }
	  }]);
	  return MultipleChoice;
	}(AskField);

	var styles$9 = {
	  base: {
	    display: 'block',
	    color: '#888',
	    width: '100%',
	    border: 'none',
	    minHeight: '100px',
	    padding: '0'
	  },
	  option: {
	    display: 'inline-block',
	    fontSize: '14pt',
	    cursor: 'pointer',
	    color: '#777',
	    lineHeight: '50px',
	    transition: 'background .2s',
	    background: 'white',
	    border: '1px solid #ccc',
	    padding: '0px 20px',
	    margin: '0 1% 10px 0',
	    textAlign: 'left',
	    borderRadius: '4px'
	  },
	  clicked: {
	    background: '#222',
	    color: 'white'
	  },
	  focused: {
	    border: '1px solid #47a'
	  },
	  optionTitle: {
	    fontSize: '15pt',
	    margin: '0',
	    padding: '0',
	    lineHeight: '1'
	  },
	  optionDescription: {
	    margin: '0',
	    padding: '0',
	    lineHeight: '1'
	  },
	  optionCheck: {
	    position: 'absolute',
	    top: '18px',
	    left: '-20000px'
	  },
	  bottomLegend: {
	    color: '#999',
	    fontSize: '10pt',
	    padding: '0px',
	    textAlign: 'right',
	    width: '100%',
	    marginTop: '5px'
	  },
	  otherLabel: {
	    display: 'inline-block',
	    marginRight: '20px'
	  },
	  otherInput: {
	    height: '40px',
	    lineHeight: '40px',
	    padding: '0 10px',
	    border: '1px solid #ccc',
	    margin: '20px 0',
	    display: 'block',
	    width: '100%',
	    fontSize: '10pt'
	  },
	  optionsWrapper: {
	    marginRight: '-1%'
	  },
	  selectedMark: {
	    fontWeight: 'bold',
	    paddingLeft: '5px',
	    fontSize: '14pt'
	  }
	};

	var types = {
	  TextArea: TextArea,
	  TextField: TextField,
	  PhoneNumber: PhoneNumber,
	  NumberField: NumberField,
	  EmailField: EmailField,
	  DateField: DateField,
	  LocationDropdown: LocationDropdown,
	  MultipleChoice: MultipleChoice
	};

	var h$14 = preact.h;
	var Component$13 = preact.Component;
	var WarningIcon = function (_Component) {
	  babelHelpers.inherits(WarningIcon, _Component);

	  function WarningIcon() {
	    babelHelpers.classCallCheck(this, WarningIcon);
	    return babelHelpers.possibleConstructorReturn(this, (WarningIcon.__proto__ || Object.getPrototypeOf(WarningIcon)).apply(this, arguments));
	  }

	  babelHelpers.createClass(WarningIcon, [{
	    key: 'render',
	    value: function render() {
	      return h$14(
	        'svg',
	        { width: '20', height: '20', x: '0px', y: '0px', viewBox: '128 128 256 256' },
	        h$14('path', { fill: '#D0021B', d: 'M256.5,136C193.263,136,142,187.263,142,250.5c0,63.236,51.263,114.5,114.5,114.5c63.236,0,114.5-51.264,114.5-114.5  C371,187.263,319.736,136,256.5,136z M271,311.411h-26.55v-26.55H271V311.411z M271,275.035h-26.55v-88.362H271V275.035z' })
	      );
	    }
	  }]);
	  return WarningIcon;
	}(Component$13);

	var Types = types;

	var h$3 = preact.h;
	var Component$2 = preact.Component;
	var AskFieldWrapper = function (_Component) {
	  babelHelpers.inherits(AskFieldWrapper, _Component);

	  function AskFieldWrapper(props, context) {
	    babelHelpers.classCallCheck(this, AskFieldWrapper);

	    var _this = babelHelpers.possibleConstructorReturn(this, (AskFieldWrapper.__proto__ || Object.getPrototypeOf(AskFieldWrapper)).call(this, props, context));

	    _this._field = null;
	    _this.state = { validationMessage: props.props.validationMessage };

	    _this.onMouseDown = _this.onMouseDown.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.saveRef = _this.saveRef.bind(_this);
	    _this.setValidationMessage = _this.setValidationMessage.bind(_this);
	    return _this;
	  }

	  babelHelpers.createClass(AskFieldWrapper, [{
	    key: 'getStyles',
	    value: function getStyles() {
	      var fieldStyles = {};
	      if (this.props.type === 'field') {
	        fieldStyles = babelHelpers.extends(fieldStyles, this.props.hasFocus ? styles$1.focused : styles$1.blurred, this.props.settings.showFieldNumbers ? styles$1.withNumber : '');
	      }

	      return babelHelpers.extends({}, styles$1.formFieldWrapper, fieldStyles, { backgroundColor: this.props.theme.formBackground });
	    }
	  }, {
	    key: 'getTitleStyles',
	    value: function getTitleStyles() {
	      return babelHelpers.extends({}, styles$1.fieldTitle, this.state.showOutline ? {} : styles$1.noOutline, this.props.hasFocus ? styles$1.focusedTitle : {}, this.state.completed && !this.state.isValid ? styles$1.invalidTitle : {}, { color: this.props.theme.fieldTitleText });
	    }
	  }, {
	    key: 'saveRef',
	    value: function saveRef(component) {
	      this._field = component;
	    }
	  }, {
	    key: 'setValidationMessage',
	    value: function setValidationMessage(message) {
	      this.setState({ validationMessage: message });
	    }
	  }, {
	    key: 'onMouseDown',
	    value: function onMouseDown(e) {
	      // as recommended by The Paciello Group:
	      // https://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/
	      this.setState({ showOutline: false });
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      this.setState({ showOutline: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var widgetSpec = this.props;
	      var wrappedField = h$3(Types[widgetSpec.component], babelHelpers.extends({}, widgetSpec.props, this.props,
	      // Ref takes a callback and passes the component as an argument.
	      // What? See: https://github.com/developit/preact/blob/4de2fb9be5201b84f281d0f9d2fcef1017bedd11/src/vdom/component.js#L65
	      //    ...and: https://github.com/developit/preact/blob/master/src/hooks.js
	      {
	        ref: this.saveRef,
	        setValidationMessage: this.setValidationMessage
	      }));

	      var _props = this.props,
	          title = _props.title,
	          component = _props.component,
	          fieldNumber = _props.fieldNumber;


	      return h$3(
	        'li',
	        {
	          key: this.props.index,
	          style: this.getStyles()
	        },
	        this.props.type === 'field' ? h$3(
	          'label',
	          {
	            'for': component + '--' + fieldNumber,
	            style: styles$1.label
	          },
	          h$3(
	            'h3',
	            {
	              onMouseDown: this.onMouseDown,
	              onKeyDown: this.onKeyDown,
	              title: 'Field number ' + this.props.fieldNumber,
	              tabindex: '0',
	              style: this.getTitleStyles()
	            },
	            this.props.type === 'field' && this.props.settings.showFieldNumbers ? h$3(
	              'span',
	              { style: styles$1.fieldNumber },
	              this.props.fieldNumber,
	              '.'
	            ) : null,
	            this.props.title,
	            this.props.wrapper.required ? h$3(
	              'span',
	              {
	                'aria-label': 'This field is required.',
	                style: babelHelpers.extends({}, styles$1.requiredAsterisk, { color: this.props.theme.requiredAsterisk }) },
	              ' *'
	            ) : null
	          ),
	          this.props.description ? h$3(
	            'p',
	            null,
	            this.props.description
	          ) : null,
	          wrappedField
	        ) : wrappedField,
	        h$3(
	          'div',
	          { role: 'alert', 'aria-atomic': 'true' },
	          this.props.completed && !this.props.isValid ? h$3(
	            'div',
	            {
	              tabindex: '0',
	              style: styles$1.validation },
	            h$3(WarningIcon, null),
	            ' ',
	            this.state.validationMessage
	          ) : null
	        ),
	        h$3(
	          'div',
	          { role: 'alert', 'aria-atomic': 'true' },
	          this.props.wrapper.required && !this.props.completed && this.props.submitted ? h$3(
	            'div',
	            {
	              tabindex: '0',
	              style: styles$1.validation },
	            h$3(WarningIcon, null),
	            ' This question is required.'
	          ) : null
	        )
	      );
	    }
	  }]);
	  return AskFieldWrapper;
	}(Component$2);

	var styles$1 = {
	  label: {
	    display: 'block'
	  },
	  formFieldWrapper: {
	    position: 'relative',
	    background: 'white'
	  },
	  withNumber: {
	    padding: '15px 40px 20px 40px'
	  },
	  fieldNumber: {
	    color: 'black',
	    marginRight: '5px',
	    fontWeight: 'bold',
	    fontSize: '14pt'
	  },
	  fieldTitle: {
	    display: 'block',
	    fontSize: '14pt',
	    color: 'black',
	    fontWeight: '700',
	    marginBottom: '10px'
	  },
	  focusedTitle: {
	    color: 'black'
	  },
	  invalidTitle: {
	    color: '#900'
	  },
	  validation: {
	    color: '#D0021B',
	    padding: '10px 0',
	    fontSize: '.9em'
	  },
	  fieldsetReset: {
	    border: '0',
	    padding: '0.01em 0 0 0',
	    margin: '0',
	    minWidth: '0',
	    display: 'table-cell'
	  },
	  requiredAsterisk: {
	    color: '#939393',
	    fontSize: '20pt',
	    lineHeight: '10px'
	  },
	  requiredAsteriskBottom: {
	    color: '#E55',
	    textAlign: 'right',
	    fontSize: '10pt',
	    lineHeight: '10px',
	    marginTop: 10
	  },
	  noOutline: {
	    outline: 'none'
	  }
	};

	var h$15 = preact.h;
	var Component$14 = preact.Component;
	var Header = function (_Component) {
	  babelHelpers.inherits(Header, _Component);

	  function Header() {
	    babelHelpers.classCallCheck(this, Header);
	    return babelHelpers.possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	  }

	  babelHelpers.createClass(Header, [{
	    key: 'getHeaderStyles',
	    value: function getHeaderStyles() {
	      return babelHelpers.extends({}, styles$10.base, {
	        backgroundColor: this.props.theme.headerBackground
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return h$15(
	        'header',
	        { style: this.getHeaderStyles(), tabindex: '0' },
	        h$15(
	          'h1',
	          {
	            tabindex: '0',
	            style: babelHelpers.extends({}, styles$10.title, { color: this.props.theme.headerText }) },
	          this.props.title
	        ),
	        h$15(
	          'h2',
	          {
	            tabindex: '0',
	            style: babelHelpers.extends({}, styles$10.description, { color: this.props.theme.headerIntroText }) },
	          this.props.description
	        )
	      );
	    }
	  }]);
	  return Header;
	}(Component$14);

	var styles$10 = {
	  base: {
	    display: 'block',
	    background: '#fff',
	    padding: '40px'
	  },
	  title: {
	    fontSize: '22pt',
	    fontWeight: '700',
	    color: '#222',
	    textAlign: 'left',
	    marginBottom: '20px'
	  },
	  description: {
	    fontSize: '12pt',
	    fontWeight: '400',
	    color: '#444',
	    textAlign: 'left',
	    lineHeight: '1.2'
	  }
	};

	var h$16 = preact.h;
	var Component$15 = preact.Component;
	var Footer = function (_Component) {
	  babelHelpers.inherits(Footer, _Component);

	  function Footer() {
	    babelHelpers.classCallCheck(this, Footer);
	    return babelHelpers.possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	  }

	  babelHelpers.createClass(Footer, [{
	    key: 'render',
	    value: function render() {
	      return h$16(
	        'footer',
	        { style: styles$11.footer },
	        h$16(
	          'div',
	          { style: styles$11.footerContent },
	          this.props.recaptcha ? h$16(Recaptcha, { recaptcha: this.props.recaptcha }) : '',
	          h$16('div', { tabindex: '0', style: styles$11.footerConditions, dangerouslySetInnerHTML: { __html: this.props.conditions } }),
	          h$16(
	            'div',
	            { style: styles$11.footerActions },
	            h$16(
	              'button',
	              {
	                className: 'submit-button',
	                style: babelHelpers.extends({}, styles$11.submit, {
	                  background: this.props.theme.submitButtonBackground,
	                  text: this.props.theme.submitButtonText
	                }),
	                onClick: this.props.onSubmit },
	              'Submit'
	            ),
	            this.props.hasErrors ? h$16(
	              'div',
	              { style: styles$11.footerError },
	              h$16(WarningIcon, null),
	              ' There are one or more errors with your responses. Please see above.'
	            ) : null
	          )
	        )
	      );
	    }
	  }]);
	  return Footer;
	}(Component$15);

	var Recaptcha = function (_Component2) {
	  babelHelpers.inherits(Recaptcha, _Component2);

	  function Recaptcha() {
	    babelHelpers.classCallCheck(this, Recaptcha);
	    return babelHelpers.possibleConstructorReturn(this, (Recaptcha.__proto__ || Object.getPrototypeOf(Recaptcha)).apply(this, arguments));
	  }

	  babelHelpers.createClass(Recaptcha, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return h$16(
	        'div',
	        null,
	        h$16('script', { src: 'https://www.google.com/recaptcha/api.js' }),
	        h$16('div', { 'class': 'g-recaptcha', 'data-sitekey': this.props.recaptcha })
	      );
	    }
	  }]);
	  return Recaptcha;
	}(Component$15);

	var styles$11 = {
	  base: {
	    display: 'block',
	    background: '#fff',
	    padding: '40px'
	  },
	  h1: {
	    fontSize: '22pt',
	    fontWeight: '700',
	    color: '#222',
	    textAlign: 'center'
	  },
	  description: {
	    fontFamily: 'Martel',
	    fontSize: '12pt',
	    fontWeight: '400',
	    color: '#444',
	    textAlign: 'center'
	  },
	  footer: {
	    width: '100%'
	  },
	  footerContent: {
	    padding: '30px 40px'
	  },
	  footerActions: {
	    textAlign: 'right'
	  },
	  footerConditions: {
	    margin: '0 0 20px 0'
	  },
	  footerError: {
	    color: '#D0021B',
	    fontSize: '.9em',
	    textAlign: 'left',
	    marginTop: '10px'
	  },
	  submit: {
	    background: '#F67D6E',
	    fontSize: '11pt',
	    display: 'block',
	    width: '100%',
	    padding: '0px 20px',
	    lineHeight: '40px',
	    fontWeight: 'bold',
	    borderRadius: '4px',
	    border: 'none',
	    color: 'white',
	    textTransform: 'uppercase',
	    cursor: 'pointer'
	  }
	};

	var h$17 = preact.h;
	var Component$16 = preact.Component;
	var FinishedScreen = function (_Component) {
	  babelHelpers.inherits(FinishedScreen, _Component);

	  function FinishedScreen(props, context) {
	    babelHelpers.classCallCheck(this, FinishedScreen);

	    var _this = babelHelpers.possibleConstructorReturn(this, (FinishedScreen.__proto__ || Object.getPrototypeOf(FinishedScreen)).call(this, props, context));

	    _this.state = {};
	    return _this;
	  }

	  babelHelpers.createClass(FinishedScreen, [{
	    key: 'render',
	    value: function render() {
	      return h$17(
	        'div',
	        {
	          className: 'final-screen',
	          style: styles$12.finishedScreen
	        },
	        h$17(
	          'h1',
	          null,
	          this.props.title
	        ),
	        h$17(
	          'p',
	          null,
	          this.props.description
	        )
	      );
	    }
	  }]);
	  return FinishedScreen;
	}(Component$16);

	var styles$12 = {
	  finishedScreen: {
	    display: 'block',
	    background: '#fff',
	    padding: '40px',
	    textAlign: 'center'
	  }
	};

	/*global XMLHttpRequest, ActiveXObject */

	var xhr = (function (url, method, post, cb) {
	  var contenttype = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'application/json';

	  var xhr = void 0;
	  try {
	    xhr = new XMLHttpRequest();
	  } catch (e) {
	    try {
	      xhr = new ActiveXObject('Msxml2.XMLHTTP');
	    } catch (e) {
	      return null;
	    }
	  }

	  var requestTimeout = setTimeout(function () {
	    xhr.abort();
	    cb(new Error('xhr: aborted by a timeout'), '', xhr);
	  }, 10000);

	  xhr.onreadystatechange = function () {
	    if (xhr.readyState !== 4) return;
	    clearTimeout(requestTimeout);
	    cb(xhr.status !== 200 ? new Error('xhr: server respnse status is' + xhr.status) : false, xhr.responseText, xhr);
	  };

	  xhr.open(method ? method.toUpperCase() : 'GET', url, true);
	  xhr.withCredentials = false;

	  if (post) {
	    xhr.setRequestHeader('Content-type', contenttype);
	    xhr.send(post);
	  } else {
	    xhr.send();
	  }
	});

	var h$2 = preact.h;
	var Component$1 = preact.Component;
	var defaultTheme = {
	  'headerBackground': '#448899',
	  'headerText': '#FFFFFF',
	  'headerIntroText': '#EEEEEE',
	  'formBackground': '#EEEEEE',
	  'footerBackground': '#DDDDDD',
	  'requiredAsterisk': '#FF44FF',
	  'inputBackground': '#F0F0F0',
	  'inputText': '#222222',
	  'footerText': '#222222',
	  'fieldTitleText': '#222222',
	  'progressBar': '#44AA44',
	  'progressBarBackground': '#CCCCCC',
	  'submitButtonBackground': '#444499',
	  'submitButtonText': '#FFFFFF',
	  'selectedItemBackground': '#111111',
	  'selectedItemText': '#FAFAFA'
	};

	var AskComposer = function (_Component) {
	  babelHelpers.inherits(AskComposer, _Component);

	  function AskComposer(props, context) {
	    babelHelpers.classCallCheck(this, AskComposer);

	    var _this = babelHelpers.possibleConstructorReturn(this, (AskComposer.__proto__ || Object.getPrototypeOf(AskComposer)).call(this, props, context));

	    _this.state = babelHelpers.extends({
	      currentStep: 0,
	      completedSteps: [],
	      finished: false,
	      page: _this.props.steps[0]
	    }, _this.props);

	    _this._fieldRefs = [];
	    return _this;
	  }

	  babelHelpers.createClass(AskComposer, [{
	    key: 'onUpdate',
	    value: function onUpdate(payload) {
	      var pageCopy = babelHelpers.extends({}, this.state.page);
	      pageCopy.widgets[payload.index] = babelHelpers.extends({}, pageCopy.widgets[payload.index], payload);
	      var nextStep = payload.moveForward ? this.state.currentStep + 1 : this.state.currentStep;
	      this.setState({ page: pageCopy, currentStep: nextStep });
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {
	      var _this2 = this;

	      // Assume valid until proven otherwise
	      var askIsValid = true;
	      var fieldIsValid = true;

	      this.state.page.widgets.map(function (child, index) {
	        // Type checking before calling
	        if (typeof _this2._fieldRefs[index]._field.validate === 'function') {
	          // We delegate validation to the components
	          fieldIsValid = _this2._fieldRefs[index]._field.validate(true);
	          // If any of the fields is invalid, the form is invalid
	          if (fieldIsValid === false) askIsValid = false;
	        }
	      });

	      var recaptchaElem = document.getElementById('g-recaptcha-response') || {};
	      if (this.props.recaptcha && !recaptchaElem.value) {
	        askIsValid = false;
	      }

	      return askIsValid;
	    }
	  }, {
	    key: 'nextStep',
	    value: function nextStep() {
	      this.setState({ currentStep: this.state.currentStep + 1 });
	    }
	  }, {
	    key: 'setFocus',
	    value: function setFocus(index) {
	      this.setState({ currentStep: index });
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(index) {
	      this.setState({ submitted: true });
	      if (this.validate()) {
	        this.send();
	      }
	    }
	  }, {
	    key: 'send',
	    value: function send() {
	      var _this3 = this;

	      var payload = [];
	      var field;
	      var fieldValue;
	      this.state.page.widgets.map(function (child, index) {
	        field = _this3._fieldRefs[index]._field;
	        if (typeof field.getValue === 'function') {
	          fieldValue = field.getValue();
	          payload.push({
	            widget_id: field.props.id,
	            answer: fieldValue
	          });
	        }
	      });

	      console.info('Payload to be sent to the server', payload);
	      var recaptchaElem = document.getElementById('g-recaptcha-response') || {};
	      var formId = this.props.id;
	      xhr('' + this.props.settings.saveDestination, 'POST', JSON.stringify({
	        replies: payload,
	        recaptcha: recaptchaElem.value || undefined
	      }), function (err, data, xhr) {
	        if (xhr.status === 200) {
	          _this3.setState({ finished: true });
	        }
	      });
	    }
	  }, {
	    key: 'renderForm',
	    value: function renderForm() {
	      var _this4 = this;

	      // field count is artificial, not the widget index
	      var fieldCount = 0;
	      var completedCount = 0;
	      var theme = this.props.theme || defaultTheme;
	      var hasErrors = false;

	      return !this.state.finished ? h$2(
	        'div',
	        null,
	        h$2(
	          'ul',
	          { style: styles.fieldList },
	          this.state.page.widgets.map(function (child, index) {
	            if (child.type === 'field') {
	              fieldCount++;
	            }
	            if (child.completed && child.isValid) completedCount++;
	            if (child.completed && !child.isValid) hasErrors = true;

	            return h$2(AskFieldWrapper, babelHelpers.extends({
	              key: index,
	              ref: function ref(widgetWrapper) {
	                _this4._fieldRefs[index] = widgetWrapper;
	              },
	              index: index,
	              fieldNumber: fieldCount,
	              hasFocus: _this4.state.currentStep === index,
	              onUpdate: _this4.onUpdate.bind(_this4),
	              settings: _this4.state.settings,
	              submitted: _this4.state.submitted,
	              theme: theme
	            }, child));
	          })
	        ),
	        h$2(Footer, {
	          hasErrors: hasErrors,
	          recaptcha: this.props.recaptcha,
	          theme: theme,
	          completedCount: completedCount,
	          fieldCount: fieldCount,
	          conditions: this.props.footer.conditions,
	          onSubmit: this.onSubmit.bind(this) })
	      ) : h$2(FinishedScreen, {
	        title: this.state.finishedScreen.title,
	        description: this.state.finishedScreen.description
	      });
	    }
	  }, {
	    key: 'renderInactive',
	    value: function renderInactive() {
	      return h$2(
	        'p',
	        { style: styles.inactiveMessage },
	        this.props.settings.inactiveMessage
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      var isInactive = this.props.status === 'closed' && !this.props.preview;
	      var theme = this.props.theme || defaultTheme;

	      return h$2(
	        'div',
	        { style: styles.base, ref: function ref(composer) {
	            _this5._composer = composer;
	          } },
	        h$2(Header, {
	          title: this.props.header.heading || '',
	          description: this.props.header.description,
	          theme: theme }),
	        isInactive ? this.renderInactive() : this.renderForm()
	      );
	    }
	  }]);
	  return AskComposer;
	}(Component$1);

	var styles = {
	  base: {
	    position: 'relative'
	  },
	  fieldList: {
	    listStyleType: 'none',
	    padding: '0',
	    margin: '0'
	  },
	  inactiveMessage: {
	    fontSize: '15pt',
	    textAlign: 'center'
	  }
	};

	__$styleInject("#app {\n\theight: 100%;\n}\n\n#ask-form {\n  margin: auto;\n}\n\n#ask-form h3 {\n\tfont-size: 11pt;\n\tmargin: 0 0 10px 0 ;\n\tcolor: #999;\n}\n\n#ask-form .ask-form-option {\n  width: 100%;\n  box-sizing: border-box;\n}\n\n@media (min-width: 480px) {\n  #ask-form .ask-form-option {\n    width: 49%;\n  }\n}\n");

	var h = preact.h;

	var target = document.querySelector(renderTarget);

	preact.render(h(
	  'div',
	  null,
	  h(AskComposer, props)
	), target || document.querySelector('#ask-form'));

}());