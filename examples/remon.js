
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Remon = factory());
}(this, function () { 'use strict';

	const ENVIRONMENT = 'dev';

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function getMergeFunction(key, options) {
		if (!options.customMerge) {
			return deepmerge
		}
		var customMerge = options.customMerge(key);
		return typeof customMerge === 'function' ? customMerge : deepmerge
	}

	function getEnumerableOwnPropertySymbols(target) {
		return Object.getOwnPropertySymbols
			? Object.getOwnPropertySymbols(target).filter(function(symbol) {
				return target.propertyIsEnumerable(symbol)
			})
			: []
	}

	function getKeys(target) {
		return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
	}

	function propertyIsOnObject(object, property) {
		try {
			return property in object
		} catch(_) {
			return false
		}
	}

	// Protects from prototype poisoning and unexpected merging up the prototype chain.
	function propertyIsUnsafe(target, key) {
		return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
			&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
				&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			getKeys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		getKeys(source).forEach(function(key) {
			if (propertyIsUnsafe(target, key)) {
				return
			}

			if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			} else {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;
		// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
		// implementations can use it. The caller may not replace it.
		options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	var cjs = deepmerge_1;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var platform = createCommonjsModule(function (module, exports) {
	(function() {

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Used as a reference to the global object. */
	  var root = (objectTypes[typeof window] && window) || this;

	  /** Detect free variable `exports`. */
	  var freeExports = exports;

	  /** Detect free variable `module`. */
	  var freeModule = module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
	  var freeGlobal = freeExports && freeModule && typeof commonjsGlobal == 'object' && commonjsGlobal;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
	    root = freeGlobal;
	  }

	  /**
	   * Used as the maximum length of an array-like object.
	   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   */
	  var maxSafeInteger = Math.pow(2, 53) - 1;

	  /** Regular expression to detect Opera. */
	  var reOpera = /\bOpera/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check for own properties of an object. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Used to resolve the internal `[[Class]]` of values. */
	  var toString = objectProto.toString;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Capitalizes a string value.
	   *
	   * @private
	   * @param {string} string The string to capitalize.
	   * @returns {string} The capitalized string.
	   */
	  function capitalize(string) {
	    string = String(string);
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }

	  /**
	   * A utility function to clean up the OS name.
	   *
	   * @private
	   * @param {string} os The OS name to clean up.
	   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
	   * @param {string} [label] A label for the OS.
	   */
	  function cleanupOS(os, pattern, label) {
	    // Platform tokens are defined at:
	    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    var data = {
	      '10.0': '10',
	      '6.4':  '10 Technical Preview',
	      '6.3':  '8.1',
	      '6.2':  '8',
	      '6.1':  'Server 2008 R2 / 7',
	      '6.0':  'Server 2008 / Vista',
	      '5.2':  'Server 2003 / XP 64-bit',
	      '5.1':  'XP',
	      '5.01': '2000 SP1',
	      '5.0':  '2000',
	      '4.0':  'NT',
	      '4.90': 'ME'
	    };
	    // Detect Windows version from platform tokens.
	    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
	        (data = data[/[\d.]+$/.exec(os)])) {
	      os = 'Windows ' + data;
	    }
	    // Correct character case and cleanup string.
	    os = String(os);

	    if (pattern && label) {
	      os = os.replace(RegExp(pattern, 'i'), label);
	    }

	    os = format(
	      os.replace(/ ce$/i, ' CE')
	        .replace(/\bhpw/i, 'web')
	        .replace(/\bMacintosh\b/, 'Mac OS')
	        .replace(/_PowerPC\b/i, ' OS')
	        .replace(/\b(OS X) [^ \d]+/i, '$1')
	        .replace(/\bMac (OS X)\b/, '$1')
	        .replace(/\/(\d)/, ' $1')
	        .replace(/_/g, '.')
	        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
	        .replace(/\bx86\.64\b/gi, 'x86_64')
	        .replace(/\b(Windows Phone) OS\b/, '$1')
	        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
	        .split(' on ')[0]
	    );

	    return os;
	  }

	  /**
	   * An iteration utility for arrays and objects.
	   *
	   * @private
	   * @param {Array|Object} object The object to iterate over.
	   * @param {Function} callback The function called per iteration.
	   */
	  function each(object, callback) {
	    var index = -1,
	        length = object ? object.length : 0;

	    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
	      while (++index < length) {
	        callback(object[index], index, object);
	      }
	    } else {
	      forOwn(object, callback);
	    }
	  }

	  /**
	   * Trim and conditionally capitalize string values.
	   *
	   * @private
	   * @param {string} string The string to format.
	   * @returns {string} The formatted string.
	   */
	  function format(string) {
	    string = trim(string);
	    return /^(?:webOS|i(?:OS|P))/.test(string)
	      ? string
	      : capitalize(string);
	  }

	  /**
	   * Iterates over an object's own properties, executing the `callback` for each.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} callback The function executed per own property.
	   */
	  function forOwn(object, callback) {
	    for (var key in object) {
	      if (hasOwnProperty.call(object, key)) {
	        callback(object[key], key, object);
	      }
	    }
	  }

	  /**
	   * Gets the internal `[[Class]]` of a value.
	   *
	   * @private
	   * @param {*} value The value.
	   * @returns {string} The `[[Class]]`.
	   */
	  function getClassOf(value) {
	    return value == null
	      ? capitalize(value)
	      : toString.call(value).slice(8, -1);
	  }

	  /**
	   * Host objects can return type values that are different from their actual
	   * data type. The objects we are concerned with usually return non-primitive
	   * types of "object", "function", or "unknown".
	   *
	   * @private
	   * @param {*} object The owner of the property.
	   * @param {string} property The property to check.
	   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
	   */
	  function isHostType(object, property) {
	    var type = object != null ? typeof object[property] : 'number';
	    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
	      (type == 'object' ? !!object[property] : true);
	  }

	  /**
	   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
	   *
	   * @private
	   * @param {string} string The string to qualify.
	   * @returns {string} The qualified string.
	   */
	  function qualify(string) {
	    return String(string).replace(/([ -])(?!$)/g, '$1?');
	  }

	  /**
	   * A bare-bones `Array#reduce` like utility function.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} callback The function called per iteration.
	   * @returns {*} The accumulated result.
	   */
	  function reduce(array, callback) {
	    var accumulator = null;
	    each(array, function(value, index) {
	      accumulator = callback(accumulator, value, index, array);
	    });
	    return accumulator;
	  }

	  /**
	   * Removes leading and trailing whitespace from a string.
	   *
	   * @private
	   * @param {string} string The string to trim.
	   * @returns {string} The trimmed string.
	   */
	  function trim(string) {
	    return String(string).replace(/^ +| +$/g, '');
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a new platform object.
	   *
	   * @memberOf platform
	   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
	   *  context object.
	   * @returns {Object} A platform object.
	   */
	  function parse(ua) {

	    /** The environment context object. */
	    var context = root;

	    /** Used to flag when a custom context is provided. */
	    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

	    // Juggle arguments.
	    if (isCustomContext) {
	      context = ua;
	      ua = null;
	    }

	    /** Browser navigator object. */
	    var nav = context.navigator || {};

	    /** Browser user agent string. */
	    var userAgent = nav.userAgent || '';

	    ua || (ua = userAgent);

	    /** Used to detect if browser is like Chrome. */
	    var likeChrome = isCustomContext
	      ? !!nav.likeChrome
	      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

	    /** Internal `[[Class]]` value shortcuts. */
	    var objectClass = 'Object',
	        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
	        enviroClass = isCustomContext ? objectClass : 'Environment',
	        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
	        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

	    /** Detect Java environments. */
	    var java = /\bJava/.test(javaClass) && context.java;

	    /** Detect Rhino. */
	    var rhino = java && getClassOf(context.environment) == enviroClass;

	    /** A character to represent alpha. */
	    var alpha = java ? 'a' : '\u03b1';

	    /** A character to represent beta. */
	    var beta = java ? 'b' : '\u03b2';

	    /** Browser document object. */
	    var doc = context.document || {};

	    /**
	     * Detect Opera browser (Presto-based).
	     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
	     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
	     */
	    var opera = context.operamini || context.opera;

	    /** Opera `[[Class]]`. */
	    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
	      ? operaClass
	      : (opera = null);

	    /*------------------------------------------------------------------------*/

	    /** Temporary variable used over the script's lifetime. */
	    var data;

	    /** The CPU architecture. */
	    var arch = ua;

	    /** Platform description array. */
	    var description = [];

	    /** Platform alpha/beta indicator. */
	    var prerelease = null;

	    /** A flag to indicate that environment features should be used to resolve the platform. */
	    var useFeatures = ua == userAgent;

	    /** The browser/environment version. */
	    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

	    /** A flag to indicate if the OS ends with "/ Version" */
	    var isSpecialCasedOS;

	    /* Detectable layout engines (order is important). */
	    var layout = getLayout([
	      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
	      'Trident',
	      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
	      'iCab',
	      'Presto',
	      'NetFront',
	      'Tasman',
	      'KHTML',
	      'Gecko'
	    ]);

	    /* Detectable browser names (order is important). */
	    var name = getName([
	      'Adobe AIR',
	      'Arora',
	      'Avant Browser',
	      'Breach',
	      'Camino',
	      'Electron',
	      'Epiphany',
	      'Fennec',
	      'Flock',
	      'Galeon',
	      'GreenBrowser',
	      'iCab',
	      'Iceweasel',
	      'K-Meleon',
	      'Konqueror',
	      'Lunascape',
	      'Maxthon',
	      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
	      'Midori',
	      'Nook Browser',
	      'PaleMoon',
	      'PhantomJS',
	      'Raven',
	      'Rekonq',
	      'RockMelt',
	      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
	      'SeaMonkey',
	      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Sleipnir',
	      'SlimBrowser',
	      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
	      'Sunrise',
	      'Swiftfox',
	      'Waterfox',
	      'WebPositive',
	      'Opera Mini',
	      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
	      'Opera',
	      { 'label': 'Opera', 'pattern': 'OPR' },
	      'Chrome',
	      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
	      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
	      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
	      { 'label': 'IE', 'pattern': 'IEMobile' },
	      { 'label': 'IE', 'pattern': 'MSIE' },
	      'Safari'
	    ]);

	    /* Detectable products (order is important). */
	    var product = getProduct([
	      { 'label': 'BlackBerry', 'pattern': 'BB10' },
	      'BlackBerry',
	      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
	      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
	      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
	      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
	      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
	      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
	      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
	      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
	      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
	      'Google TV',
	      'Lumia',
	      'iPad',
	      'iPod',
	      'iPhone',
	      'Kindle',
	      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Nexus',
	      'Nook',
	      'PlayBook',
	      'PlayStation Vita',
	      'PlayStation',
	      'TouchPad',
	      'Transformer',
	      { 'label': 'Wii U', 'pattern': 'WiiU' },
	      'Wii',
	      'Xbox One',
	      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
	      'Xoom'
	    ]);

	    /* Detectable manufacturers. */
	    var manufacturer = getManufacturer({
	      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
	      'Archos': {},
	      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
	      'Asus': { 'Transformer': 1 },
	      'Barnes & Noble': { 'Nook': 1 },
	      'BlackBerry': { 'PlayBook': 1 },
	      'Google': { 'Google TV': 1, 'Nexus': 1 },
	      'HP': { 'TouchPad': 1 },
	      'HTC': {},
	      'LG': {},
	      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
	      'Motorola': { 'Xoom': 1 },
	      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
	      'Nokia': { 'Lumia': 1 },
	      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
	      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
	    });

	    /* Detectable operating systems (order is important). */
	    var os = getOS([
	      'Windows Phone',
	      'Android',
	      'CentOS',
	      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
	      'Debian',
	      'Fedora',
	      'FreeBSD',
	      'Gentoo',
	      'Haiku',
	      'Kubuntu',
	      'Linux Mint',
	      'OpenBSD',
	      'Red Hat',
	      'SuSE',
	      'Ubuntu',
	      'Xubuntu',
	      'Cygwin',
	      'Symbian OS',
	      'hpwOS',
	      'webOS ',
	      'webOS',
	      'Tablet OS',
	      'Tizen',
	      'Linux',
	      'Mac OS X',
	      'Macintosh',
	      'Mac',
	      'Windows 98;',
	      'Windows '
	    ]);

	    /*------------------------------------------------------------------------*/

	    /**
	     * Picks the layout engine from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected layout engine.
	     */
	    function getLayout(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }

	    /**
	     * Picks the manufacturer from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An object of guesses.
	     * @returns {null|string} The detected manufacturer.
	     */
	    function getManufacturer(guesses) {
	      return reduce(guesses, function(result, value, key) {
	        // Lookup the manufacturer by product or scan the UA for the manufacturer.
	        return result || (
	          value[product] ||
	          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
	          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
	        ) && key;
	      });
	    }

	    /**
	     * Picks the browser name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected browser name.
	     */
	    function getName(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }

	    /**
	     * Picks the OS name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected OS name.
	     */
	    function getOS(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
	            )) {
	          result = cleanupOS(result, pattern, guess.label || guess);
	        }
	        return result;
	      });
	    }

	    /**
	     * Picks the product name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected product name.
	     */
	    function getProduct(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
	              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
	              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
	            )) {
	          // Split by forward slash and append product version if needed.
	          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
	            result[0] += ' ' + result[1];
	          }
	          // Correct character case and cleanup string.
	          guess = guess.label || guess;
	          result = format(result[0]
	            .replace(RegExp(pattern, 'i'), guess)
	            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
	            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
	        }
	        return result;
	      });
	    }

	    /**
	     * Resolves the version using an array of UA patterns.
	     *
	     * @private
	     * @param {Array} patterns An array of UA patterns.
	     * @returns {null|string} The detected version.
	     */
	    function getVersion(patterns) {
	      return reduce(patterns, function(result, pattern) {
	        return result || (RegExp(pattern +
	          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
	      });
	    }

	    /**
	     * Returns `platform.description` when the platform object is coerced to a string.
	     *
	     * @name toString
	     * @memberOf platform
	     * @returns {string} Returns `platform.description` if available, else an empty string.
	     */
	    function toStringPlatform() {
	      return this.description || '';
	    }

	    /*------------------------------------------------------------------------*/

	    // Convert layout to an array so we can add extra details.
	    layout && (layout = [layout]);

	    // Detect product names that contain their manufacturer's name.
	    if (manufacturer && !product) {
	      product = getProduct([manufacturer]);
	    }
	    // Clean up Google TV.
	    if ((data = /\bGoogle TV\b/.exec(product))) {
	      product = data[0];
	    }
	    // Detect simulators.
	    if (/\bSimulator\b/i.test(ua)) {
	      product = (product ? product + ' ' : '') + 'Simulator';
	    }
	    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
	    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
	      description.push('running in Turbo/Uncompressed mode');
	    }
	    // Detect IE Mobile 11.
	    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
	      data = parse(ua.replace(/like iPhone OS/, ''));
	      manufacturer = data.manufacturer;
	      product = data.product;
	    }
	    // Detect iOS.
	    else if (/^iP/.test(product)) {
	      name || (name = 'Safari');
	      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
	        ? ' ' + data[1].replace(/_/g, '.')
	        : '');
	    }
	    // Detect Kubuntu.
	    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
	      os = 'Kubuntu';
	    }
	    // Detect Android browsers.
	    else if ((manufacturer && manufacturer != 'Google' &&
	        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
	        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
	      name = 'Android Browser';
	      os = /\bAndroid\b/.test(os) ? os : 'Android';
	    }
	    // Detect Silk desktop/accelerated modes.
	    else if (name == 'Silk') {
	      if (!/\bMobi/i.test(ua)) {
	        os = 'Android';
	        description.unshift('desktop mode');
	      }
	      if (/Accelerated *= *true/i.test(ua)) {
	        description.unshift('accelerated');
	      }
	    }
	    // Detect PaleMoon identifying as Firefox.
	    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
	      description.push('identifying as Firefox ' + data[1]);
	    }
	    // Detect Firefox OS and products running Firefox.
	    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
	      os || (os = 'Firefox OS');
	      product || (product = data[1]);
	    }
	    // Detect false positives for Firefox/Safari.
	    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
	      // Escape the `/` for Firefox 1.
	      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
	        // Clear name of false positives.
	        name = null;
	      }
	      // Reassign a generic name.
	      if ((data = product || manufacturer || os) &&
	          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
	        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
	      }
	    }
	    // Add Chrome version to description for Electron.
	    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
	      description.push('Chromium ' + data);
	    }
	    // Detect non-Opera (Presto-based) versions (order is important).
	    if (!version) {
	      version = getVersion([
	        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
	        'Version',
	        qualify(name),
	        '(?:Firefox|Minefield|NetFront)'
	      ]);
	    }
	    // Detect stubborn layout engines.
	    if ((data =
	          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
	          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
	          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
	          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
	          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
	        )) {
	      layout = [data];
	    }
	    // Detect Windows Phone 7 desktop mode.
	    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
	      name += ' Mobile';
	      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
	      description.unshift('desktop mode');
	    }
	    // Detect Windows Phone 8.x desktop mode.
	    else if (/\bWPDesktop\b/i.test(ua)) {
	      name = 'IE Mobile';
	      os = 'Windows Phone 8.x';
	      description.unshift('desktop mode');
	      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
	    }
	    // Detect IE 11 identifying as other browsers.
	    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
	      if (name) {
	        description.push('identifying as ' + name + (version ? ' ' + version : ''));
	      }
	      name = 'IE';
	      version = data[1];
	    }
	    // Leverage environment features.
	    if (useFeatures) {
	      // Detect server-side environments.
	      // Rhino has a global function while others have a global object.
	      if (isHostType(context, 'global')) {
	        if (java) {
	          data = java.lang.System;
	          arch = data.getProperty('os.arch');
	          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
	        }
	        if (rhino) {
	          try {
	            version = context.require('ringo/engine').version.join('.');
	            name = 'RingoJS';
	          } catch(e) {
	            if ((data = context.system) && data.global.system == context.system) {
	              name = 'Narwhal';
	              os || (os = data[0].os || null);
	            }
	          }
	          if (!name) {
	            name = 'Rhino';
	          }
	        }
	        else if (
	          typeof context.process == 'object' && !context.process.browser &&
	          (data = context.process)
	        ) {
	          if (typeof data.versions == 'object') {
	            if (typeof data.versions.electron == 'string') {
	              description.push('Node ' + data.versions.node);
	              name = 'Electron';
	              version = data.versions.electron;
	            } else if (typeof data.versions.nw == 'string') {
	              description.push('Chromium ' + version, 'Node ' + data.versions.node);
	              name = 'NW.js';
	              version = data.versions.nw;
	            }
	          }
	          if (!name) {
	            name = 'Node.js';
	            arch = data.arch;
	            os = data.platform;
	            version = /[\d.]+/.exec(data.version);
	            version = version ? version[0] : null;
	          }
	        }
	      }
	      // Detect Adobe AIR.
	      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
	        name = 'Adobe AIR';
	        os = data.flash.system.Capabilities.os;
	      }
	      // Detect PhantomJS.
	      else if (getClassOf((data = context.phantom)) == phantomClass) {
	        name = 'PhantomJS';
	        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
	      }
	      // Detect IE compatibility modes.
	      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
	        // We're in compatibility mode when the Trident version + 4 doesn't
	        // equal the document mode.
	        version = [version, doc.documentMode];
	        if ((data = +data[1] + 4) != version[1]) {
	          description.push('IE ' + version[1] + ' mode');
	          layout && (layout[1] = '');
	          version[1] = data;
	        }
	        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
	      }
	      // Detect IE 11 masking as other browsers.
	      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
	        description.push('masking as ' + name + ' ' + version);
	        name = 'IE';
	        version = '11.0';
	        layout = ['Trident'];
	        os = 'Windows';
	      }
	      os = os && format(os);
	    }
	    // Detect prerelease phases.
	    if (version && (data =
	          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
	          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
	          /\bMinefield\b/i.test(ua) && 'a'
	        )) {
	      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
	      version = version.replace(RegExp(data + '\\+?$'), '') +
	        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
	    }
	    // Detect Firefox Mobile.
	    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
	      name = 'Firefox Mobile';
	    }
	    // Obscure Maxthon's unreliable version.
	    else if (name == 'Maxthon' && version) {
	      version = version.replace(/\.[\d.]+/, '.x');
	    }
	    // Detect Xbox 360 and Xbox One.
	    else if (/\bXbox\b/i.test(product)) {
	      if (product == 'Xbox 360') {
	        os = null;
	      }
	      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
	        description.unshift('mobile mode');
	      }
	    }
	    // Add mobile postfix.
	    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
	        (os == 'Windows CE' || /Mobi/i.test(ua))) {
	      name += ' Mobile';
	    }
	    // Detect IE platform preview.
	    else if (name == 'IE' && useFeatures) {
	      try {
	        if (context.external === null) {
	          description.unshift('platform preview');
	        }
	      } catch(e) {
	        description.unshift('embedded');
	      }
	    }
	    // Detect BlackBerry OS version.
	    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
	    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
	          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
	          version
	        )) {
	      data = [data, /BB10/.test(ua)];
	      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
	      version = null;
	    }
	    // Detect Opera identifying/masking itself as another browser.
	    // http://www.opera.com/support/kb/view/843/
	    else if (this != forOwn && product != 'Wii' && (
	          (useFeatures && opera) ||
	          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
	          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
	          (name == 'IE' && (
	            (os && !/^Win/.test(os) && version > 5.5) ||
	            /\bWindows XP\b/.test(os) && version > 8 ||
	            version == 8 && !/\bTrident\b/.test(ua)
	          ))
	        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
	      // When "identifying", the UA contains both Opera and the other browser's name.
	      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
	      if (reOpera.test(name)) {
	        if (/\bIE\b/.test(data) && os == 'Mac OS') {
	          os = null;
	        }
	        data = 'identify' + data;
	      }
	      // When "masking", the UA contains only the other browser's name.
	      else {
	        data = 'mask' + data;
	        if (operaClass) {
	          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
	        } else {
	          name = 'Opera';
	        }
	        if (/\bIE\b/.test(data)) {
	          os = null;
	        }
	        if (!useFeatures) {
	          version = null;
	        }
	      }
	      layout = ['Presto'];
	      description.push(data);
	    }
	    // Detect WebKit Nightly and approximate Chrome/Safari versions.
	    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	      // Correct build number for numeric comparison.
	      // (e.g. "532.5" becomes "532.05")
	      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
	      // Nightly builds are postfixed with a "+".
	      if (name == 'Safari' && data[1].slice(-1) == '+') {
	        name = 'WebKit Nightly';
	        prerelease = 'alpha';
	        version = data[1].slice(0, -1);
	      }
	      // Clear incorrect browser versions.
	      else if (version == data[1] ||
	          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	        version = null;
	      }
	      // Use the full Chrome version when available.
	      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
	      // Detect Blink layout engine.
	      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
	        layout = ['Blink'];
	      }
	      // Detect JavaScriptCore.
	      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
	      if (!useFeatures || (!likeChrome && !data[1])) {
	        layout && (layout[1] = 'like Safari');
	        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
	      } else {
	        layout && (layout[1] = 'like Chrome');
	        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
	      }
	      // Add the postfix of ".x" or "+" for approximate versions.
	      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
	      // Obscure version for some Safari 1-2 releases.
	      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
	        version = data;
	      }
	    }
	    // Detect Opera desktop modes.
	    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
	      name += ' ';
	      description.unshift('desktop mode');
	      if (data == 'zvav') {
	        name += 'Mini';
	        version = null;
	      } else {
	        name += 'Mobile';
	      }
	      os = os.replace(RegExp(' *' + data + '$'), '');
	    }
	    // Detect Chrome desktop mode.
	    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
	      description.unshift('desktop mode');
	      name = 'Chrome Mobile';
	      version = null;

	      if (/\bOS X\b/.test(os)) {
	        manufacturer = 'Apple';
	        os = 'iOS 4.3+';
	      } else {
	        os = null;
	      }
	    }
	    // Strip incorrect OS versions.
	    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
	        ua.indexOf('/' + data + '-') > -1) {
	      os = trim(os.replace(data, ''));
	    }
	    // Add layout engine.
	    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
	        /Browser|Lunascape|Maxthon/.test(name) ||
	        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
	        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
	      // Don't add layout details to description if they are falsey.
	      (data = layout[layout.length - 1]) && description.push(data);
	    }
	    // Combine contextual information.
	    if (description.length) {
	      description = ['(' + description.join('; ') + ')'];
	    }
	    // Append manufacturer to description.
	    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
	      description.push('on ' + manufacturer);
	    }
	    // Append product to description.
	    if (product) {
	      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
	    }
	    // Parse the OS into an object.
	    if (os) {
	      data = / ([\d.+]+)$/.exec(os);
	      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
	      os = {
	        'architecture': 32,
	        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
	        'version': data ? data[1] : null,
	        'toString': function() {
	          var version = this.version;
	          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
	        }
	      };
	    }
	    // Add browser/OS architecture.
	    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
	      if (os) {
	        os.architecture = 64;
	        os.family = os.family.replace(RegExp(' *' + data), '');
	      }
	      if (
	          name && (/\bWOW64\b/i.test(ua) ||
	          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
	      ) {
	        description.unshift('32-bit');
	      }
	    }
	    // Chrome 39 and above on OS X is always 64-bit.
	    else if (
	        os && /^OS X/.test(os.family) &&
	        name == 'Chrome' && parseFloat(version) >= 39
	    ) {
	      os.architecture = 64;
	    }

	    ua || (ua = null);

	    /*------------------------------------------------------------------------*/

	    /**
	     * The platform object.
	     *
	     * @name platform
	     * @type Object
	     */
	    var platform = {};

	    /**
	     * The platform description.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.description = ua;

	    /**
	     * The name of the browser's layout engine.
	     *
	     * The list of common layout engines include:
	     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.layout = layout && layout[0];

	    /**
	     * The name of the product's manufacturer.
	     *
	     * The list of manufacturers include:
	     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
	     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
	     * "Nokia", "Samsung" and "Sony"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.manufacturer = manufacturer;

	    /**
	     * The name of the browser/environment.
	     *
	     * The list of common browser names include:
	     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
	     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
	     * "Opera Mini" and "Opera"
	     *
	     * Mobile versions of some browsers have "Mobile" appended to their name:
	     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.name = name;

	    /**
	     * The alpha/beta release indicator.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.prerelease = prerelease;

	    /**
	     * The name of the product hosting the browser.
	     *
	     * The list of common products include:
	     *
	     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
	     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.product = product;

	    /**
	     * The browser's user agent string.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.ua = ua;

	    /**
	     * The browser/environment version.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.version = name && version;

	    /**
	     * The name of the operating system.
	     *
	     * @memberOf platform
	     * @type Object
	     */
	    platform.os = os || {

	      /**
	       * The CPU architecture the OS is built for.
	       *
	       * @memberOf platform.os
	       * @type number|null
	       */
	      'architecture': null,

	      /**
	       * The family of the OS.
	       *
	       * Common values include:
	       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
	       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
	       * "Android", "iOS" and "Windows Phone"
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'family': null,

	      /**
	       * The version of the OS.
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'version': null,

	      /**
	       * Returns the OS string.
	       *
	       * @memberOf platform.os
	       * @returns {string} The OS string.
	       */
	      'toString': function() { return 'null'; }
	    };

	    platform.parse = parse;
	    platform.toString = toStringPlatform;

	    if (platform.version) {
	      description.unshift(version);
	    }
	    if (platform.name) {
	      description.unshift(name);
	    }
	    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
	      description.push(product ? '(' + os + ')' : 'on ' + os);
	    }
	    if (description.length) {
	      platform.description = description.join(' ');
	    }
	    return platform;
	  }

	  /*--------------------------------------------------------------------------*/

	  // Export platform.
	  var platform = parse();

	  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
	  if (freeExports && freeModule) {
	    // Export for CommonJS support.
	    forOwn(platform, function(value, key) {
	      freeExports[key] = value;
	    });
	  }
	  else {
	    // Export to the global object.
	    root.platform = platform;
	  }
	}.call(commonjsGlobal));
	});

	/* eslint new-cap: ['error', { 'capIsNewExceptions': ['CredentialConfig'] }] */

	/**
	 * The following is an example of Config literal that can be set in advance when creating a Remon object.
	 * ~~~
	 * {
	 *  credential: {
	 *    key: '',
	 *    serviceId: ''
	 *  },
	 *  view: {
	 *    local: 'localVideoTag',
	 *    remote: 'remoteVideoTag',
	 *    localStream: 'externalStreamId',
	 *  },
	 *  media: {
	 *    video: {},
	 *    audio: {},
	 *    screen: {}
	 *  }
	 *  rtc: {
	 *    audioType: '[voice|music]',
	 *    simulcast: bool,
	 *  },
	 *  sdk: {
	 *    logLevel: '[ERROR|WARN|INFO|DEBUG]'
	 *  }
	 * }
	 * ~~~
	 * * credential: Must be filled in to use the Remon SDK. You need to register the RemoteMonster with the serviceId and key you receive. If this item is missing, it can be used for testing or development purposes.
	 * * view: Enter the id value of the video tag to represent the local and remote streams on the web page in 'local' and 'remote', respectively. If you don't get local stream through camera but get screen capture screen or stream through canvas, you can input the stream's id to localStream instead of 'local'.
	 * * media: You can set several options for getting a local stream. The video tag is for getting a local camera and the audio tag is for getting a local microphone. The screen tag is an option you can use to capture the screen. Details of each option are available at https://developer.mozilla.org/en/docs/Web/API/MediaStreamConstraints and https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/ See getDisplayMedia.
	 * * rtc: You can set various rtc related options. audioType may determine whether or not the sound of local audio is heard well. If simulcast is set to true, the receiver sends out various quality images so that the receiver can select the desired quality images. If you want to use a TURN server only communication, you can use the selectiveCandidate config.
	 * @module Config
	 */
	var configure = (function Configure() {
	  var config = {
	    rtc: {
	      selectiveCandidate: undefined,
	      iceServers: [
	        // { urls: "stun:stun.l.google.com:19302" },
	      ],
	      localStream: undefined,
	      localVideo: undefined,
	      audioType: "voice",
	      simulcast: false,
	      sdpSemantics: "unified-plan",
	    },
	    signalingServer: {
	      url: "wss://signal.remotemonster.com/ws"
	    },
	    appServer: {
	      url: "https://signal.remotemonster.com/rest"
	    },
	    logServer: {
	      url: "https://signal.remotemonster.com:2001/topics",
	      logSending : true,
	      qualityLogSending: true
	    },
	    sentry:{ 
	      dsn: 'https://56f0921bd1754963a845f50a104b938c@sentry.remotemonster.com/3',
	      logSending : true,
	    },
	    sdk: {
	      logLevel: undefined,
	      country: undefined,
	      version: undefined
	    },
	    credential: {
	      key: undefined,
	      serviceId: undefined
	    },
	    view: {
	      local: undefined,
	      remote: undefined,
	      localStream: undefined // external stream
	    },
	    media: {
	      video: true,
	      audio: true,
	      screen: false
	    }
	  };

	  return config;
	})();

	class Context1 {
	  constructor() {
	    this.token;
	    this.channel = {
	      name: undefined,
	      peers: [],
	      serviceId: undefined,
	      startTime: undefined,
	      status: undefined,
	      type: undefined,
	      id: undefined,
	      msType: "Ms"
	    };
	    this.sentry;
	    this.config;
	    this.peers = [];
	    this.audioTransceiver;
	    this.videoTransceiver;
	    this.videoCodec;
	    this.audioCodec;
	    this.remoteVideo;
	    this.remoteStream;
	    this.screenStream; // screenCapture stream
	    this.devices;
	    this.isCaller;
	    this.startTime;
	    this.endTime;
	    this.serviceId;
	    this.peerConnection;
	    this.signalingConnection;
	    this.state;
	    this.hasAddTrack;
	    this.eventManager;
	    this.health;
	    this.useVideo = true;
	    this.useAudio = true;
	    this.currentVideoDeviceId;
	    this.useRecord = false;
	    this.remoteRecorder;
	    this.localRecorder;
	    this.mediaManager;
	    this.hasLocalStream = false;
	    this.isConnectToSignal = false;
	    this.broadcast = false;
	    this.videoBandwidth;
	    this.audioBandwidth;
	    this.sdkVersion;
	    this.simulcast;
	    this.currentSimulcast = "HIGH";
	    this.sdpSemantics;
	    this.qualityChecker;
	    this.env; // device 환경에 대한 정보
	  }
	}

	const logger = (function Logger() {
	  const prefix = "[RM]";
	  // const logServerUrl = `https://matiz.remotemonster.com:2001/topics`;
	  const logLevelPreset = [
	    "SILENT",
	    "ERROR",
	    "WARN",
	    "INFO",
	    "DEBUG",
	    "VERBOSE"
	  ];

	  let level;
	  let context;
	  let logServerUrl;
	  let logSending;
	  let qualityLogSending;

	  function init(ctx) {
	    if (!logLevelPreset.includes(ctx.logLevel)) {
	      throw new Error("Logger:UnmatchedLogLevel");
	    }
	    context = ctx;
	    level = ctx.logLevel;
	    logServerUrl = ctx.logServer.url;
	    logSending = ctx.logServer.logSending;
	    qualityLogSending= ctx.config.logServer.qualityLogSending;
	    // console.log("logServer:", logServerUrl);
	  }

	  function e(...message) {
	    if (level === "SILENT") {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }
	    return console.error(prefix + "E>", ...message);
	  }

	  function w(...message) {
	    if (level === "SILENT" || level === "ERROR") {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }

	    return console.warn(prefix + "W>", ...message);
	  }

	  function g(...message) {
	    if (level === "SILENT" || level === "ERROR" || level === "WARN") {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }

	    return console.group(prefix + "G>", ...message);
	  }

	  function gEnd() {
	    if (level === "SILENT" || level === "ERROR" || level === "WARN") {
	      return;
	    }

	    return console.groupEnd();
	  }

	  function l(...message) {
	    if (level === "SILENT" || level === "ERROR" || level === "WARN") {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }
	    return console.info(prefix + "I>", ...message);
	  }

	  function i(...message) {
	    if (level === "SILENT" || level === "ERROR" || level === "WARN") {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }
	    return console.info(prefix + "I>", ...message);
	  }

	  function d(...message) {
	    if (
	      level === "SILENT" ||
	      level === "ERROR" ||
	      level === "WARN" ||
	      level === "INFO"
	    ) {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }
	    return console.log(prefix + "D>", ...message);
	  }
	  function evt(...message) {
	    if(logSending){
	      fetch(logServerUrl, {
	        method: "PUT",
	        mode: "cors",
	        headers: {
	          "Content-Type": "application/json; charset=utf-8",
	          "Access-Control-Allow-Origin": "*"
	        },
	        body: message
	      });
	    }
	  }
	  function qualityLog(message){
	    if (!logSending) return;
	    if (!qualityLogSending) return;
	    
	    const msg= {
	      topic: 'quality',
	      messages: message.type === 'quality.middle' ? message :{
	        stats: message,
	        logLevel: 'info',
	        type: message.type || 'quality.start',
	        svcId: context.serviceId,
	        env: context.env,
	        state: context.state,
	      }
	    };
	    if (context.channel && context.channel.id && message.type !== 'quality.middle') {
	      msg.messages.chId = context.channel.id;
	      msg.messages.chType= context.channel.type;
	    }
	    if (context.token) msg.messages.sessionId= context.token;
	    fetch(logServerUrl, {
	      method: "PUT",
	      mode: "cors",
	      headers: {
	        "Content-Type": "application/json; charset=utf-8",
	        "Access-Control-Allow-Origin": "*"
	      },
	      body: JSON.stringify(msg)
	    });
	  }
	  function errorEvt(ctx, code, message) {
	    if(logSending){
	      var eventMsg = {
	        topic: "log",
	        messages: {
	          log: message,
	          logLevel: "error",
	          errorCode: code
	        }
	      };
	      if (ctx.serviceId) eventMsg.messages.svcId = ctx.serviceId;
	      if (ctx.channel && ctx.channel.id) eventMsg.messages.chId = ctx.channel.id;
	      if (ctx.token) eventMsg.messages.pId = ctx.token;
	      fetch(logServerUrl, {
	        method: "PUT",
	        mode: "cors",
	        headers: {
	          "Content-Type": "application/json; charset=utf-8",
	          "Access-Control-Allow-Origin": "*"
	        },
	        body: JSON.stringify(eventMsg)
	      });
	    }
	  }
	  function v(...message) {
	    if (
	      level === "SILENT" ||
	      level === "ERROR" ||
	      level === "WARN" ||
	      level === "INFO" ||
	      level === "DEBUG"
	    ) {
	      return;
	    }
	    if (context.eventManager.hasEventListener("onLog")) {
	      context.eventManager.dispatchEvent("onLog", message);
	    }
	    return console.debug(prefix + "V>", ...message);
	  }

	  return Object.freeze({
	    init,
	    e,
	    w,
	    g,
	    gEnd,
	    l,
	    i,
	    d,
	    v,
	    evt,
	    errorEvt,
	    qualityLog
	  });
	})();

	/* eslint-disable no-console, consistent-return */
	const util = (function Util() {
	  function validateConfig(context, targetConfig) {
	    const mandatorySpec = Object.seal({
	      credential: {
	        key: undefined,
	        serviceId: undefined
	      }
	    });

	    Object.keys(mandatorySpec).forEach(category => {
	      Object.keys(mandatorySpec[category]).forEach(item => {
	        if (targetConfig[category][item]) {
	          mandatorySpec[category][item] = true;
	        } else {
	          mandatorySpec[category][item] = false;
	        }
	      });
	    });

	    Object.keys(mandatorySpec).forEach(category => {
	      Object.keys(mandatorySpec[category]).forEach(item => {
	        if (mandatorySpec[category][item] === false) {
	          if (context.eventManager.hasEventListener("onError")) {
	            context.eventManager.dispatchEvent(
	              "onError",
	              "InvalidParameterError"
	            );
	          }
	        }
	      });
	    });
	  }

	  function MediaDeviceCheck(context, targetConfig){
	    if(!navigator.mediaDevices){
	      if(context.eventManager.hasEventListener("onError")){
	        context.eventManager.dispatchEvent(
	          "onError",
	          "SSL authentication(https) is required."
	        );
	      }
	    }
	  }
	  function cloneObject(obj) {
	    var clone = {};
	    for(var i in obj) {
	        if(typeof(obj[i])=="object" && obj[i] != null)
	            clone[i] = cloneObject(obj[i]);
	        else
	            clone[i] = obj[i];
	    }
	    return clone;
	}

	  function bind(fn, context) {
	    if (!fn || !context) {
	      throw new Error(
	        "Failed to execute 'bind' on 'utils': 2 arguments required, but only " +
	          arguments.length +
	          " present."
	      );
	    }
	    return function() {
	      fn.apply(context, Array.prototype.slice.call(arguments));
	    };
	  }

	  function setMediaBitrate(sdp, media, bitrate) {
	    var lines = sdp.split("\n");
	    var line = -1;
	    for (var i = 0; i < lines.length; i++) {
	      if (lines[i].indexOf("m=" + media) === 0) {
	        line = i;
	        break;
	      }
	    }
	    if (line === -1) {
	      console.debug("Could not find the m line for", media);
	      return sdp;
	    }
	    console.debug("Found the m line for", media, "at line", line);

	    // Pass the m line
	    line++;

	    // Skip i and c lines
	    while (lines[line].indexOf("i=") === 0 || lines[line].indexOf("c=") === 0) {
	      line++;
	    }

	    // If we're on a b line, replace it
	    if (lines[line].indexOf("b") === 0) {
	      console.debug("Replaced b line at line", line);
	      lines[line] = "b=AS:" + bitrate;
	      return lines.join("\n");
	    }

	    // Add a new b line
	    console.debug("Adding new b line before line", line);
	    var newLines = lines.slice(0, line);
	    newLines.push("b=AS:" + bitrate);
	    newLines = newLines.concat(lines.slice(line, lines.length));
	    return newLines.join("\n");
	  }

	  function getVideoFractionLostRating(loss) {
	    if (loss < 40 || !loss) return 1;
	    else if (loss < 55) return 2;
	    else if (loss < 70) return 3;
	    else if (loss < 90) return 4;
	    else return 5;
	  }
	  function getAudioFractionLostRating(loss) {
	    if (loss < 50 || !loss) return 1;
	    else if (loss < 150) return 2;
	    else if (loss < 250) return 3;
	    else if (loss < 350) return 4;
	    else return 5;
	  }

	  /**
	   * @param Array elements
	   * @param String boundary
	   * @return String
	   */
	  function buildMessage(filename, binary, boundary) {
	    var CRLF = "\r\n";
	    var parts = [];
	    var part = "";
	    var fileName = filename;

	    /*
	     * Content-Disposition header contains name of the field
	     * used to upload the file and also the name of the file as
	     * it was on the user's computer.
	     */
	    part += "Content-Disposition: form-data; ";
	    part += 'name=files"; ';
	    part += 'filename="' + fileName + '"' + CRLF;

	    /*
	     * Content-Type header contains the mime-type of the file
	     * to send. Although we could build a map of mime-types
	     * that match certain file extensions, we'll take the easy
	     * approach and send a general binary header:
	     * application/octet-stream
	     */
	    part += "Content-Type: application/octet-stream";
	    part += CRLF + CRLF; // marks end of the headers part

	    /*
	     * File contents read as binary data, obviously
	     */
	    //part += element.files[0].getAsBinary() + CRLF;
	    part += binary + CRLF;
	    parts.push(part);

	    var request = "--" + boundary + CRLF;
	    request += parts.join("--" + boundary + CRLF);
	    request += "--" + boundary + "--" + CRLF;

	    return request;
	  }
	  return Object.freeze({
	    validateConfig,
	    MediaDeviceCheck,
	    bind,
	    buildMessage,
	    setMediaBitrate,
	    getVideoFractionLostRating,
	    getAudioFractionLostRating,
	    cloneObject
	  });
	})();

	class RemonRecorder {
	  constructor(ctx, stream, postfix) {
	    this.context = ctx;
	    this.isStart = false;
	    this.postfix = postfix;
	    this.audioFile;
	    this.stream = new MediaStream(stream.getAudioTracks());
	    this.type = platform.name === "Firefox" ? "audio/ogg" : "audio/webm";
	    //this.recorder = new MediaRecorder(this.stream, {audioBitsPerSecond: 128000, mimeType : this.type});

	    this.recorder = new MediaRecorder(this.stream, {
	      audioBitsPerSecond: 64000,
	      videoBitsPerSecond: 16000,
	      mimeType: this.type
	    });
	    this.array = [];
	    //this.recordingCb = null;
	    //this.stopCb = null;

	    this.recorder.ondataavailable = e => {
	      this.array.push(e.data);
	    };
	    this.recorder.onstop = e => {
	      if (this.context.recordUrl === "local") return;
	      this.audioFile = new Blob(this.array, { type: this.type });
	      // var link = document.createElement('a');
	      // link.href = window.URL.createObjectURL(audioFile);
	      // link.download = this.context.token+ '.ogg';
	      // link.click();
	      var req = new XMLHttpRequest();
	      const that = this;
	      req.open("POST", this.context.recordUrl, true);
	      //req.setRequestHeader("X-FILENAME",this.context.serviceId+"."+this.context.token.substring(0,6) + postfix+".ogg");
	      req.setRequestHeader(
	        "X-FILENAME",
	        this.context.serviceId +
	          "." +
	          this.context.channel.id +
	          postfix +
	          ".ogg"
	      );
	      req.onload = function(oEvent) {
	        logger.d("upload is completed");
	        that.context.eventManager.dispatchEvent("onRecordEvent", {
	          event: "uploaded",
	          id: that.context.channel.id + that.postfix,
	          size: that.audioFile.size
	        });
	      };
	      req.onerror = function(evt) {
	        logger.e("upload is failed");
	        logger.e(evt);
	        that.context.eventManager.dispatchEvent("onRecordEvent", {
	          event: "error",
	          id: that.context.channel.id + that.postfix,
	          size: that.audioFile.size,
	          error: evt
	        });
	      };
	      req.onprogress = function(evt) {
	        that.context.eventManager.dispatchEvent("onRecordEvent", {
	          event: "progress",
	          id: that.context.channel.id + that.postfix,
	          size: evt.loaded
	        });
	      };

	      this.context.eventManager.dispatchEvent("onRecordEvent", {
	        event: "upload",
	        id: this.context.channel.id + this.postfix,
	        size: this.audioFile.size,
	        file: this.audioFile
	      });
	      req.send(this.audioFile);
	    };
	  }

	  start() {
	    this.isStart = true;
	    this.recorder.start(3000);
	  }

	  stop() {
	    if (!this.isStart) return;
	    let msg = {
	      event: "stop",
	      id: this.context.channel.id + this.postfix,
	      size: this.array.length
	    };
	    if (this.context.recordUrl === "local") {
	      msg.file = new Blob(this.array, { type: this.type });
	    }
	    this.context.eventManager.dispatchEvent("onRecordEvent", msg);
	    this.recorder.stop();
	    this.isStart = false;
	  }
	}

	class Media {
	  constructor(ctx) {
	    this.context = ctx;
	    logger.init(ctx);
	  }

	  bindLocalStreamToPeerConnection(peerConnection) {
	    // FIXME: Chrome, adapter does not support addTrack
	    if (this.context.useVideo == false && this.context.useAudio == false) {
	      console.log("no media setting");
	      return;
	    }
	    if (this.context.hasAddTrack) {
	      if (
	        this.context.simulcast &&
	        parseInt(platform.version.split(".")[0], 10) >= 74 &&
	        platform.name === "Chrome"
	      ) {
	        this.context.config.rtc.localStream.getAudioTracks().forEach(track =>
	          peerConnection.addTransceiver(track, {
	            streams: [this.context.config.rtc.localStream]
	          })
	        );
	        this.context.config.rtc.localStream.getVideoTracks().forEach(track =>
	          peerConnection.addTransceiver(track, {
	            sendEncodings: [
	              { rid: "h", active: true, maxBitrate: 1500000 },
	              {
	                rid: "m",
	                active: true,
	                maxBitrate: 300000,
	                scaleResolutionDownBy: 2
	              },
	              {
	                rid: "l",
	                active: true,
	                maxBitrate: 100000,
	                scaleResolutionDownBy: 4
	              }
	            ],
	            streams: [this.context.config.rtc.localStream]
	          })
	        );
	      } else {
	        this.context.config.rtc.localStream
	          .getTracks()
	          .forEach(track =>
	            peerConnection.addTrack(track, this.context.config.rtc.localStream)
	          );
	      }
	      logger.i("Local track added:", peerConnection.getSenders());
	    } else {
	      peerConnection.addStream(this.context.config.rtc.localStream);
	      logger.i("Local stream added:", peerConnection.getLocalStreams());
	    }

	    if (this.context.eventManager.hasEventListener("onAddLocalStream")) {
	      this.context.eventManager.dispatchEvent(
	        "onAddLocalStream",
	        this.context.config.rtc.localStream
	      );
	    }
	  }

	  gotDevicesInfo(devices) {
	    this.context.devices = devices;
	  }
	  isLocalPrepared() {
	    if (!this.context.useVideo) return true;
	    if (
	      this.context.config.media.audio == false &&
	      this.context.config.media.video == false
	    ) {
	      return true;
	    }
	    if (!this.context.config.rtc.localVideo) return true;
	    if (this.context.config.rtc.localVideo.srcObject) {
	      return true;
	    }
	    return false;
	  }

	  async createLocalStream(ctx, constraints) {
	    logger.i("start create localstream");
	    var stream;
	    if (constraints.audio == false && constraints.video == false) {
	      console.log("no audio and video");
	      return;
	    }
	    if (!ctx) return;
	    if (this.context.config.view.localStream) {
	      this.context.config.rtc.localStream = this.context.config.view.localStream;
	      ctx.hasLocalStream = true;
	      return;
	    }

	    try {
	      logger.d("try to get user media %j", constraints);
	      if (this.context.config.media.screen){
	        stream = await navigator.mediaDevices.getDisplayMedia({
	          video: { width:constraints.video.width, height: constraints.video.height, frameRate: constraints.video.frameRate },
	          audio: constraints.audio
	        });
	      }else{
	        stream = await navigator.mediaDevices.getUserMedia(constraints);
	      }
	      if (
	        this.context.config.rtc.localVideo !== null &&
	        typeof this.context.config.rtc.localVideo !== "undefined"
	      ) {
	        logger.d("type of localvideo: " + typeof this.context.config.rtc.localVideo);
	        logger.d("localvideo: " + this.context.config.rtc.localVideo);
	        logger.d("stream: " + stream);
	        try {
	          this.context.config.rtc.localVideo.srcObject = stream;
	        } catch (e) {
	          console.log(e);
	        }
	      } else {
	        logger.w("no local video");
	      }

	      this.context.config.rtc.localStream = stream;
	      ctx.eventManager.dispatchEvent(
	        "onDisplayUserMedia",
	        this.context.config.rtc.localStream
	      );
	      if (ctx.eventManager.hasEventListener("onStateChange")) {
	        ctx.eventManager.dispatchEvent("onStateChange", "LOCALMEDIA");
	      }
	      ctx.hasLocalStream = true;
	      if (
	        ctx.isConnectToSignal &&
	        ctx.eventManager.hasEventListener("onInit")
	      ) {
	        ctx.eventManager.dispatchEvent("onInit", ctx.token);
	      }
	      //Config.rtc.localStream = stream;
	      logger.i("config stream");
	      logger.i(this.context.config.rtc.localStream);
	      if (ctx.useRecord) {
	        ctx.localRecorder = new RemonRecorder(ctx, stream, "LL");
	      }
	    } catch (e) {
	      logger.errorEvt(ctx, "4182", "create media stream is failed: %j", e);
	      console.log(e);
	      if (ctx.eventManager.hasEventListener("onError")) {
	        ctx.eventManager.dispatchEvent(
	          "onError",
	          "UserMediaDeviceFailedError",
	          e
	        );
	        ctx.eventManager.dispatchEvent(
	          "onError",
	          "4182",
	          "UserMediaDeviceFailedError:" + e,
	        );
	      }
	      logger.e(e);
	    }
	  }

	  // gotDevices(deviceInfos) {
	  //   // Handles being called several times to update labels. Preserve values.
	  //   var values = selectors.map(function(select) {
	  //     return select.value;
	  //   });
	  //   selectors.forEach(function(select) {
	  //     while (select.firstChild) {
	  //       select.removeChild(select.firstChild);
	  //     }
	  //   });
	  //   for (var i = 0; i !== deviceInfos.length; ++i) {
	  //     var deviceInfo = deviceInfos[i];
	  //     var option = document.createElement('option');
	  //     option.value = deviceInfo.deviceId;
	  //     if (deviceInfo.kind === 'audioinput') {
	  //       option.text = deviceInfo.label ||
	  //           'microphone ' + (audioInputSelect.length + 1);
	  //       audioInputSelect.appendChild(option);
	  //     } else if (deviceInfo.kind === 'audiooutput') {
	  //       option.text = deviceInfo.label || 'speaker ' +
	  //           (audioOutputSelect.length + 1);
	  //       audioOutputSelect.appendChild(option);
	  //     } else if (deviceInfo.kind === 'videoinput') {
	  //       option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
	  //       videoSelect.appendChild(option);
	  //     } else {
	  //       console.log('Some other kind of source/device: ', deviceInfo);
	  //     }
	  //   }
	  //   selectors.forEach(function(select, selectorIndex) {
	  //     if (Array.prototype.slice.call(select.childNodes).some(function(n) {
	  //       return n.value === values[selectorIndex];
	  //     })) {
	  //       select.value = values[selectorIndex];
	  //     }
	  //   });
	  // }

	  bindRemoteStreamToView(event) {
	    logger.g(
	      "Media: Bind remote stream: Bind remote media to video element and regist to context"
	    );
	    logger.d("event:", event);

	    let stream;
	    // FIXME: Chrome, adapter does not support addTrack
	    if (this.context.hasAddTrack) {
	      stream = event.streams[0];
	    } else {
	      stream = event.stream;
	    }
	    logger.d("Stream:", stream);
	    this.context.remoteVideo.srcObject = stream;
	    this.context.remoteStream = stream;

	    logger.gEnd();
	  }

	  mediaStreamTrackSwitch(stream) {
	    let getMatchedMediaTypeTracks;

	    function type(mediaType) {
	      if (mediaType === "Video" || mediaType === "Audio") {
	        getMatchedMediaTypeTracks = `get${mediaType}Tracks`;
	      } else {
	        throw new Error("MediaStreamSwitcher:InvailedMediaType");
	      }
	      return this;
	    }

	    function enabled(bool) {
	      switch (bool) {
	        case true: {
	          /* eslint-disable no-param-reassign */
	          stream[getMatchedMediaTypeTracks]().forEach(track => {
	            track.enabled = true;
	          });
	          /* eslint-disable no-param-reassign */
	          break;
	        }
	        case false: {
	          /* eslint-disable no-param-reassign */
	          stream[getMatchedMediaTypeTracks]().forEach(track => {
	            track.enabled = false;
	          });
	          /* eslint-disable no-param-reassign */
	          break;
	        }
	        default: {
	          throw new Error("MediaStreamSwitcher:InvalidCommand");
	        }
	      }
	    }

	    return Object.freeze({
	      type,
	      enabled
	    });
	  }

	  setAudioOutput(sinkId) {
	    if (!this.context.config.rtc.localVideo) {
	      this.context.config.rtc.localVideo
	        .setSinkId(sinkId)
	        .then(() => {
	          logger.d("Devices: Audio output device attached success:", sinkId);
	        })
	        .catch(() => {
	          logger.e("Devices: Audio output device attached failed:", sinkId);
	          logger.errorEvt(
	            this.context,
	            "1007",
	            "Devices: Audio output device attached failed:"
	          );
	        });
	    }
	  }

	  setUserDevices(audioSource, videoSource) {
	    if (window.stream) {
	      window.stream.getTracks().forEach(function(track) {
	        track.stop();
	      });
	    }
	    this.context.config.rtc.localVideo.srcObject.getVideoTracks()[0].stop();

	    const constraints = this.context.config.media;
	    if (audioSource) {
	      // constraints.video = false;
	      if (constraints.audio === true) constraints.audio = {};
	      constraints.audio.deviceId = { exact: audioSource };
	    } else if (videoSource) {
	      // constraints.audio = false;
	      if (constraints.video === true) constraints.video = {};
	      constraints.video.deviceId = { exact: videoSource };
	    }

	    this.changeLocalStream(constraints);
	  }

	  async captureScreen(width, height, frameRate, audio) {
	    // let frameRate = Config.media.frameRate? Config.media.frameRate: 30;
	    this.context.screenStream = await navigator.mediaDevices.getDisplayMedia({
	      video: { width, height, frameRate: { max: frameRate } },
	      audio
	    });
	    const videoTrack = audio
	      ? this.context.screenStream.getTracks()[1]
	      : this.context.screenStream.getTracks()[0];
	    this.context.videoTransceiver.sender.replaceTrack(videoTrack);
	    this.context.config.rtc.localStream.getTracks().forEach((track)=>{
	      if(track.kind === "video") track.enabled = false;
	    });
	    if (this.context.screenStream.getAudioTracks().length > 0){
	          this.context.audioTransceiver.sender.replaceTrack(
	            this.mergeAudioStreams(
	              this.context.screenStream,
	              this.context.config.rtc.localStream
	            )
	          );
	          this.context.config.rtc.localStream.getTracks().forEach((track)=>{
	            if(track.kind === "audio"){
	              track.enabled = false;
	            }
	          });
	    }
	    this.context.config.rtc.localVideo.srcObject = this.context.screenStream;
	  }
	  stopCaptureScreen() {
	    try {
	      this.showLocalVideo();
	    } catch (e) {
	      logger.e(e);
	    }
	  }
	  async showLocalVideo() {
	    if (!this.context.config.rtc.localStream)
	      throw "There is no localstream to show.";
	    this.context.screenStream.getTracks().forEach((track)=>{track.stop();});
	    this.context.config.rtc.localStream.getTracks().forEach((track)=>{ 
	      if(track.kind === "audio") track.enabled = true; 
	      if(track.kind === "video") track.enabled = true;
	    });
	    this.context.config.rtc.localStream.getTracks().forEach((track)=>{
	      if(track.kind === "audio"){
	        this.context.audioTransceiver.sender.replaceTrack(track);
	      }else if(track.kind === "video"){
	        this.context.videoTransceiver.sender.replaceTrack(track);
	      }
	    });
	    this.context.config.rtc.localVideo.srcObject = this.context.config.rtc.localStream;
	  }
	  async changeLocalStream(constraints) {
	    let stream;
	    try {
	      logger.d("try to get user media %j", constraints);
	      stream = await navigator.mediaDevices.getUserMedia(constraints);
	      this.context.config.rtc.localVideo.srcObject = stream;
	      this.context.peerConnection
	        .getTransceivers()[1]
	        .sender.replaceTrack(stream.getVideoTracks()[0]);
	      // Config.rtc.localStream = stream;
	      // this.context.eventManager.dispatchEvent(
	      //   "onDisplayUserMedia",
	      //   Config.rtc.localStream
	      // );
	      if (this.context.eventManager.hasEventListener("onStateChange")) {
	        this.context.eventManager.dispatchEvent("onStateChange", "LOCALMEDIA");
	      }
	      this.context.hasLocalStream = true;

	      //Config.rtc.localStream = stream;
	      logger.i("config stream");
	      logger.i(this.context.config.rtc.localStream);
	    } catch (e) {
	      logger.errorEvt(this.context, "4182", "create media stream is failed: %j", e);
	      console.log(e);
	      if (this.context.eventManager.hasEventListener("onError")) {
	        this.context.eventManager.dispatchEvent(
	          "onError",
	          "UserMediaDeviceFailedError",
	          e
	        );
	        this.context.eventManager.dispatchEvent(
	          "onError",
	          "4182",
	          "UserMediaDeviceFailedError:" + e,
	        );
	      }
	      logger.e(e);
	    }
	  }

	  mergeAudioStreams(stream1, stream2) {
	    const context = new AudioContext();
	    const source1 = context.createMediaStreamSource(stream1);
	    const source2 = context.createMediaStreamSource(stream2);
	    const destination = context.createMediaStreamDestination();

	    const gain1 = context.createGain();
	    const gain2 = context.createGain();

	    gain1.gain.value = 0.7;
	    gain2.gain.value = 0.7;

	    source1.connect(gain1).connect(destination);
	    // Connect source2
	    source2.connect(gain2).connect(destination);

	    return destination.stream.getAudioTracks()[0];
	  }
	}

	class QualityChecker {
	  constructor(ctx) {
	    this.context = ctx;
	    this.result = {
	        channelId: this.context.channel.id,
	        startTime: this.context.startTime,
	        endTime: new Date().getTime(),
	        videoPacketsReceived:0,
	        videoPacketsLoss:0,
	        audioPacketsReceived:0,
	        audioPacketsLoss:0,
	        audioPacketsSent:0,
	        videoPacketsSent:0,
	        type: 'quality.end'
	       };
	  }

	  async check() {
	    //if (!this.context.peerConnection) return;
	    logger.d("QualityCheck is start w/interval");
	    let stats = await this.context.peerConnection.getStats(null);
	    let statInfo ={};
	    let remoteCandidateId;
	    let localCandidateId;
	    stats.forEach(report => {
	      statInfo[report.id] = report;
	    });
	    if (platform.name === "Safari" || platform.name === "safari") {
	      Object.keys(statInfo).forEach((id)=>{
	        if (statInfo[id].type === "inbound-rtp") {
	          if (statInfo[id].mediaType === "audio") {
	            // audio stream
	            this.result.audioPacketsReceived = statInfo[id].packetsReceived;
	            this.result.audioPacketsLoss= statInfo[id].packetsLost;
	          } else {
	            // video stream
	            this.result.videoPacketsReceived= statInfo[id].packetsReceived;
	            this.result.videoPacketsLoss= statInfo[id].packetsLost;
	          }
	        }else if (statInfo[id].type === "outbound-rtp"){
	          if (statInfo[id].mediaType === "audio") {
	            // audio stream
	            this.result.audioPacketsSent = statInfo[id].packetsSent;
	          } else {
	            // video stream
	            this.result.videoPacketsSent= statInfo[id].packetsSent;
	          }
	        }
	        else if(statInfo[id].type === "candidate-pair" && statInfo[id].state === "succeeded"){
	            localCandidateId = statInfo[id].localCandidateId;
	            remoteCandidateId = statInfo[id].remoteCandidateId;
	          if(localCandidateId && remoteCandidateId){
	            this.result.localCandidate = statInfo[localCandidateId].candidateType;
	            this.result.protocol = statInfo[localCandidateId].protocol;
	            this.result.remoteCandidate = statInfo[remoteCandidateId].candidateType;
	          }
	        }
	      });
	    }
	    else if (platform.name === "Firefox") {
	      Object.keys(statInfo).forEach((id)=>{
	        if (statInfo[id].type === "inbound-rtp") {
	          if (statInfo[id].kind === "audio") {
	            // audio stream
	            this.result.audioPacketsReceived = statInfo[id].packetsReceived;
	            this.result.audioPacketsLoss= statInfo[id].packetsLost;
	          }else {
	            // video stream
	            this.result.videoPacketsReceived= statInfo[id].packetsReceived;
	            this.result.videoPacketsLoss= statInfo[id].packetsLost;
	          }
	        }else if (statInfo[id].type === "outbound-rtp"){
	          if (statInfo[id].kind === "audio") {
	            // audio stream
	            this.result.audioPacketsSent = statInfo[id].packetsSent;
	          }else {
	            // video stream
	            this.result.videoPacketsSent= statInfo[id].packetsSent;
	          }
	        }
	        else if(statInfo[id].type === "candidate-pair" && statInfo[id].state === "succeeded"){
	            localCandidateId = statInfo[id].localCandidateId;
	            remoteCandidateId = statInfo[id].remoteCandidateId;
	          if(localCandidateId && remoteCandidateId){
	            this.result.localCandidate = statInfo[localCandidateId].candidateType;
	            this.result.protocol = statInfo[localCandidateId].protocol;
	            this.result.remoteCandidate = statInfo[remoteCandidateId].candidateType;
	          }
	        }
	      });
	    }else if (platform.name === "Chrome") {
	      Object.keys(statInfo).forEach(id => {
	          if (statInfo[id].type === "inbound-rtp") {
	            if (statInfo[id].kind === "audio") {
	              // audio stream
	              this.result.audioPacketsReceived = statInfo[id].packetsReceived;
	              this.result.audioPacketsLoss = statInfo[id].packetsLost;
	            } else {
	              // video stream
	              this.result.videoPacketsReceived = statInfo[id].packetsReceived;
	              this.result.videoPacketsLoss = statInfo[id].packetsLost;
	            }
	          } 
	          else if (statInfo[id].type === "outbound-rtp") {
	            if (statInfo[id].kind === "audio") {
	              // audio stream
	              this.result.audioPacketsSent = statInfo[id].packetsSent;
	            } else {
	              // video stream
	              this.result.videoPacketsSent = statInfo[id].packetsSent;
	            }
	          }
	          else if(statInfo[id].type === "candidate-pair" && statInfo[id].state === "succeeded"){
	              localCandidateId = statInfo[id].localCandidateId;
	              remoteCandidateId = statInfo[id].remoteCandidateId;
	            if(localCandidateId && remoteCandidateId){
	              this.result.localCandidate = statInfo[localCandidateId].candidateType;
	              this.result.protocol = statInfo[localCandidateId].protocol;
	              this.result.remoteCandidate = statInfo[remoteCandidateId].candidateType;
	          }
	        }
	      });
	    }
	    // const clonedList = Object.assign({},this.result)
	    // console.log(clonedList)
	    logger.qualityLog(this.result);
	    return;
	  }

	}

	/**
	 * Call back events for Remon class<br>
	 * * onInit(token): It is called when connection between client and signal server is connected and authentication is completed. Return value is token by authentication process.
	 * * onCreateChannel(channelId): It's called when you execute connectCall method with channelId and there's no such channel id. Remon will create a room with the channel Id and onCreateChannel method is called.
	 * * onConnectChannel(channelId): It's called when you execute connectCall method with channel ID and there's such channel ID. Remon will connect peers. After this event, signalling with peers will be executed.
	 * * onComplete(): Called when signaling is complete and the stream is well connected. From this time, the video can be transmitted or viewed.
	 * * onDisplayUserMedia(stream): Called when a local stream has been obtained. You can get a local stream from this event.
	 * * onAddLocalStream(stream): Similar to onDisplayUserMedia, but occurs when signaling is complete.
	 * * onAddRemoteStream(stream): Occurs when signaling is complete and a remote stream can be received. You can take a remote stream as an argument.
	 * * onStateChange(state): State is classified into INIT, CONNECT, WAIT, COMPLETE, CLOSE, etc. according to the connection state. This event is called when the state is changed.
	 * * onDisconnectChannel(): Occurs when a connection is terminated by the other side or the network, not by me.
	 * * onMessage(msg): If the other party sent an arbitrary message through the Remon.sendMessage method, You can receive it via this event.
	 * * onError(err): All errors can be received in this event.
	 * * onStat(stat): When communicating or broadcasting, you can check the current quality of the stream every 3 seconds. There are several stat entries, but the easiest way to know the current quality is 'ratings' property.
	 * * onSearch(msg): Event that can check the result when calling search method such as fetchCall or fetchCast.
	 * * onClose(): Occurs when the close command that I explicitly called actually completes.
	 * * onRoomEvent(msg): Occurs when using conference mode. When someone enters or leaves the room, join and leave events occur and you can connect to the user through the join method through the channel information.
	 * * onJoin(): Occurs when the viewer of the broadcast calls the joinCast command, when the command actually completes and can receive the stream.
	 * * onRecordEvent({event,id,size,file}): Several events about the recording process when a client wants to record or record. Among the parameters to receive, event values include stop, upload, error, and uploaded.
	 * @module Listener
	 */
	function EventManager() {
	  const definedEvents = [
	    "onInit",
	    "onConnectChannel",
	    "onCreateChannel",
	    "onComplete",
	    "onConnect", // for remon 2.0 call interface when create channel is successful
	    "onDisplayUserMedia",
	    "onAddLocalStream",
	    "onAddRemoteStream",
	    "onStateChange",
	    "onDisconnectChannel",
	    "onMessage",
	    "onError",
	    "onStat",
	    "onSearch",
	    "onClose",
	    "onRoomEvent",
	    "onLog",
	    "onJoin", // for remon 2.0 cast interface when create and join room is successful
	    "onCreate", // for remon 2.0 cast interface when create and join room is successful
	    "onRecordEvent",
	    "onReconnect", // when signal reconnect is success
	    "ack", 
	  ];
	  const listeners = new Map(definedEvents.map(item => [item]));

	  function addEventListener({ type, listenerItem }) {
	    if (typeof listenerItem !== "function") {
	      throw new Error("EventManager:listenerMustBeAFunction");
	    } else if (!definedEvents.includes(type)) {
	      throw new Error("EventManager:UnmatchedEvent");
	    } else {
	      listeners.set(type, listenerItem);
	    }
	  }

	  function hasEventListener(type) {
	    if (!definedEvents.includes(type)) {
	      throw new Error("EventManager:UnmatchedEvent");
	    } else if (typeof listeners.get(type) === "undefined") {
	      return false;
	    } else {
	      return true;
	    }
	  }

	  function removeEventListener(type) {
	    if (definedEvents.includes(type) && listeners.has(type)) {
	      listeners.set(type, undefined);
	    } else {
	      throw new Error("EventManager:UnmatchedEventOrDidNotContainAnylistener");
	    }
	  }

	  function getEventListeners() {
	    return listeners;
	  }

	  function dispatchEvent(type, ...args) {
	    if (!definedEvents.includes(type)) {
	      throw new Error("EventManager:UnmatchedEvent");
	    } else if (typeof listeners.get(type) === "undefined") {
	      //throw new Error('EventManager:Undefinedlistener');
	      return;
	    } else {
	      return listeners.get(type)(...args);
	    }
	  }

	  return Object.freeze({
	    addEventListener,
	    hasEventListener,
	    removeEventListener,
	    getEventListeners,
	    dispatchEvent
	  });
	}

	const signalingStates = (function SignalingStates() {
	  const states = [
	    "INIT",
	    "WAIT",
	    "CONNECT",
	    "COMPLETE",
	    "CLOSE",
	    "EXIT",
	    "FAIL"
	  ];

	  return Object.freeze(states);
	})();

	class Health {
	  constructor(ctx) {
	    this.interval = 5000;
	    this.statsReportTimer = null;
	    this.context = ctx;
	    this.oldStats = null;
	    this.result = {
	      /*AB = AudioBytes*/
	      nowLocalABSent:0,
	      //oldLocalABSent: 0,

	      /*VB = VideoBytes*/
	      nowLocalVBSent:0,
	      //oldLocalVBSent: 0,

	      nowRemoteABReceived:0,
	      //oldRemoteABReceived:0,

	      nowRemoteVBReceived:0,
	      //oldRemoteVBReceived:0,
	      diffRemoteVPReceived: 0,

	      /*AP = AudioPackets*/
	      nowLocalAPSent: 0,
	      //oldLocalAPSent: 0,

	      /*VP = VideoPackets*/
	      nowLocalVPSent: 0,
	      //oldLocalVPSent: 0,

	      nowRemoteAPReceived: 0,
	      //oldRemoteAPReceived: 0,
	      diffRemoteAPReceived: 0,

	      nowRemoteVPReceived: 0,
	      //oldRemoteVPReceived: 0,

	      oldRemoteAudioPacketsLost: 0,
	      oldRemoteVideoPacketsLost: 0,
	      diffVideoPacketsLost: 0,




	      oldRemoteAudioFractionLost: 0,
	      oldRemoteVideoFractionLost: 0,
	      diffAudioPacketsLost:0,

	      localFrameWidth:0,
	      localFrameHeight: 0,
	      
	      remoteFrameWidth: 0,
	      remoteFrameHeight:0,
	      
	      oldFramesReceived: 0,
	      
	      nowLocalFrameRate: 0,
	      oldLocalFrameRate: 0,
	      
	      nowRemoteFrameRate: 0,
	      oldRemoteFrameRate: 0,
	      
	      oldFramesSent: 0
	    };
	    this.oldResult = {};
	    this.qualityResult = {
	        timestamp: undefined,
	        svcId:   this.context.channel.serviceId                    ,
	        chId: this.context.channel.id,
	        type: 'quality.middle',
	        videoPacketsReceived:0,
	        videoPacketsLoss:0,
	        audioPacketsReceived:0,
	        audioPacketsLoss:0,
	        audioPacketsSent:0,
	        videoPacketsSent:0,
	        framesDecoded:0,
	        insertedSamplesForDeceleration:0,
	        removedSamplesForAcceleration:0,
	    };
	    this.fractionLost = {
	      audio: [
	        { rating: 1, fromFractionLost: 0, toFractionLost: 50 },
	        { rating: 2, fromFractionLost: 51, toFractionLost: 150 },
	        { rating: 3, fromFractionLost: 151, toFractionLost: 250 },
	        { rating: 4, fromFractionLost: 251, toFractionLost: 350 },
	        { rating: 5, fromFractionLost: 351, toFractionLost: 9999999 }
	      ],
	      video: [
	        { rating: 1, fromFractionLost: 0, toFractionLost: 40 },
	        { rating: 2, fromFractionLost: 41, toFractionLost: 55 },
	        { rating: 3, fromFractionLost: 56, toFractionLost: 70 },
	        { rating: 4, fromFractionLost: 71, toFractionLost: 90 },
	        { rating: 5, fromFractionLost: 91, toFractionLost: 9999999 }
	      ]
	    };
	  }
	  stop() {
	    if (this.statsReportTimer) {
	      window.clearInterval(this.statsReportTimer);
	      this.statsReportTimer = null;
	    }
	  }

	  start() {
	    //if (this.context.isCaller === true) return; // master만 health 던지자
	    logger.i("Health is start w/interval:" + this.interval);
	    if (this.statsReportTimer) {
	      window.clearInterval(this.statsReportTimer);
	      this.statsReportTimer = null;
	    }
	    this.statsReportTimer = window.setInterval(
	        //this.getStats function have to run on this
	        util.bind(this.getStats, this), this.interval
	    );
	  }


	  getMaxRating() {
	    var i = 0,
	      maxRating = 0;
	    for (i = 0; i < arguments.length; i++) {
	      if (arguments[i] > maxRating) maxRating = arguments[i];
	    }
	    return maxRating;
	  }

	  getRttRating(rtt) {
	    var rttRating = 0;
	    if (rtt >= 1000) {
	      rttRating = 5;
	    } else if (rtt >= 800) {
	      rttRating = 4;
	    } else if (rtt >= 600) {
	      rttRating = 3;
	    } else if (rtt >= 400) {
	      rttRating = 2;
	    } else if (rtt < 400) {
	      rttRating = 1;
	    }
	    return rttRating;
	  }

	  getVideoFractionLostRating(loss) {
	    if (loss < 40) return 1;
	    else if (loss < 55) return 2;
	    else if (loss < 70) return 3;
	    else if (loss < 90) return 4;
	    else return 5;
	  }
	  getAudioFractionLostRating(loss) {
	    if (loss < 50) return 1;
	    else if (loss < 150) return 2;
	    else if (loss < 250) return 3;
	    else if (loss < 350) return 4;
	    else return 5;
	  }

	  getFractionLostRating(loss, fl) {
	    var f = fl;
	    for (let i = 0; i < f.length; i++) {
	      if (f[i].fromFractionLost <= loss && f[i].toFractionLost >= loss) {
	        return f[i].rating;
	      }
	    }
	    return 1;
	  }

	  async getStats() {
	    if (platform.name === "Safari" || platform.name === "safari") ;
	    else if (platform.name === "Firefox") {
	      let stats = await this.context.peerConnection.getStats(null);
	      let statInfo ={};
	      let selectedCandidatePairId;
	      let remoteCandidateId;
	      let localCandidateId;
	      stats.forEach(report => {
	        statInfo[report.id] = report;
	      });
	      Object.keys(statInfo).forEach((id)=>{
	        if (statInfo[id].type === "inbound-rtp") {
	          if (statInfo[id].kind === "audio") {
	            // audio stream
	            this.qualityResult.audioPacketsReceived = statInfo[id].packetsReceived;
	            this.qualityResult.audioPacketsLoss= statInfo[id].packetsLost;



	            this.result.nowRemoteAPReceived = statInfo[id].packetsReceived;
	            this.result.nowRemoteABReceived = statInfo[id].bytesReceived;
	            this.result.remoteAudioPacketsLost =
	              typeof this.result.remoteAudioPacketsLost !== "undefined"
	                ? (statInfo[id].packetsLost - this.result.oldRemoteAudioPacketsLost)
	                : 0;
	            this.result.oldRemoteAudioPacketsLost =
	              typeof this.result.oldRemoteAudioPacketsLost !== "undefined" 
	              ? statInfo[id].packetsLost
	              : 0;

	            this.result.diffAudioPacketsLost = this.result.remoteAudioPacketsLost > 0 ? 
	            this.result.remoteAudioPacketsLost / ( this.interval/1000 ) : 0;

	            this.result.diffRemoteAPReceived =
	            ((this.result.nowRemoteAPReceived - this.result.oldRemoteAPReceived)) / ( this.interval/1000 );

	            this.result.remoteAudioFractionLost = 
	              typeof this.result.remoteAudioFractionLost !== "undefined"
	                ? parseInt(
	                  ((this.result.diffAudioPacketsLost) /
	                    (this.result.diffRemoteAPReceived + this.result.diffAudioPacketsLost)) *
	                    255 || 0
	                ):0;
	                
	            this.result.oldRemoteAPReceived = this.result.nowRemoteAPReceived;
	          } else {
	            // video stream
	            this.qualityResult.videoPacketsReceived = statInfo[id].packetsReceived;
	            this.qualityResult.videoPacketsLoss= statInfo[id].packetsLost;
	            this.qualityResult.framesDecoded = statInfo[id].framesDecoded;

	            this.result.nowRemoteVPReceived = statInfo[id].packetsReceived;
	            this.result.nowRemoteVBReceived = statInfo[id].bytesReceived;
	            this.result.remoteVideoPacketsLost =
	              typeof this.result.remoteVideoPacketsLost !== "undefined"
	                ? (statInfo[id].packetsLost - this.result.oldRemoteVideoPacketsLost)
	                : 0;
	            this.result.oldRemoteVideoPacketsLost  = 
	              typeof this.result.oldRemoteVideoPacketsLost !== "undefined" 
	              ? statInfo[id].packetsLost
	              : 0;


	            this.result.diffVideoPacketsLost = this.result.remoteVideoPacketsLost > 0 ? 
	            this.result.remoteVideoPacketsLost / ( this.interval/1000 ) : 0;

	            this.result.diffRemoteVPReceived =
	            ((this.result.nowRemoteVPReceived - this.result.oldRemoteVPReceived) )/ ( this.interval/1000 );

	            this.result.remoteVideoFractionLost = 
	              typeof this.result.remoteVideoFractionLost !== "undefined"
	                ? parseInt(
	                  ((this.result.diffVideoPacketsLost) /
	                    (this.result.diffRemoteVPReceived + this.result.diffVideoPacketsLost)) *
	                    255 || 0
	                ):0;
	         
	            this.result.oldRemoteVPReceived = this.result.nowRemoteVPReceived;
	          }
	        }
	        else if(statInfo[id].type === "outbound-rtp"){
	            // outbound stream
	            if (statInfo[id].kind === "audio") {
	              // audio stream
	              this.qualityResult.audioPacketsSent = statInfo[id].packetsSent;

	              this.result.nowLocalAPSent = statInfo[id].packetsSent;
	              this.result.nowLocalABSent = statInfo[id].bytesSent;
	              this.result.audioRtt = statInfo[id].remoteId ? statInfo[statInfo[id].remoteId].roundTripTime : 0;
	            } else {
	              // video stream
	              this.qualityResult.videoPacketsSent = statInfo[id].packetsSent;

	              this.result.nowLocalVPSent = statInfo[id].packetsSent;
	              this.result.nowLocalVBSent = statInfo[id].bytesSent;
	              this.result.videoRtt = statInfo[id].remoteId ? statInfo[statInfo[id].remoteId].roundTripTime : 0;
	            }
	        }else if(statInfo[id].type === "candidate-pair" && statInfo[id].state === "succeeded"){
	          //set localCandidateId, remoteCandidateId
	         
	            selectedCandidatePairId = statInfo[id].selectedCandidatePairId;
	            localCandidateId = statInfo[id].localCandidateId;
	            remoteCandidateId = statInfo[id].remoteCandidateId;
	          //set this.result.localCandidate, this.result.remoteCandidate (connection type)
	          if(localCandidateId && remoteCandidateId){
	            this.result.localCandidate = statInfo[localCandidateId].candidateType;
	            //Firefox not support
	            //this.result.localNetworkType = statInfo[localCandidateId].networkType;
	            this.result.protocol = statInfo[localCandidateId].protocol;
	            this.result.remoteCandidate = statInfo[remoteCandidateId].candidateType;
	          }
	        }
	      });
	      // 나중에 이 밑의 코드는 Chrome쪽과 통합해야함.
	      this.result.remoteAudioFractionRating = util.getAudioFractionLostRating(
	        this.result.remoteAudioFractionLost
	      );
	      this.result.remoteVideoFractionRating = util.getVideoFractionLostRating(
	        this.result.remoteVideoFractionLost
	      );
	     
	      this.result.fractionRating = this.result.remoteVideoFractionRating;
	      this.result.audioRttRating = this.getRttRating(this.result.audioRtt * 1000);
	      this.result.videoRttRating = this.getRttRating(this.result.videoRtt * 1000);
	      this.result.rating = this.getMaxRating(
	        this.result.audioRttRating,
	        this.result.videoRttRating,
	        this.result.remoteAudioFractionRating,
	        this.result.remoteVideoFractionRating,
	        // this.result.localAudioFractionRating,
	        // this.result.localVideoFractionRating
	      );


	      if (this.context.eventManager.hasEventListener("onStat")) {
	        this.context.eventManager.dispatchEvent("onStat", this.result);
	      }
	      // framerate가 2번 연속 0이면 reduceSimulcast 호출
	      // 근데 그러고도 한참을 계속 framerate가 0일것 같은데...
	      // 일단 시도해보고 결정
	      if (
	        this.result.nowRemoteFrameRate == 0 &&
	        this.result.oldRemoteFrameRate == 0 && this.remoteVideo && this.remoteStream
	      ) {
	        this.context.signalingConnection.reduceVideoQuality();
	      }
	      let message = this.context.signalingConnection.createMessage({
	        command: "health",
	        body: JSON.stringify(this.result)
	      });
	      var eventMsg = {
	        topic: "health"
	      };
	      eventMsg.messages = this.result;
	      eventMsg.messages.serviceId = this.context.serviceId;
	      eventMsg.messages.pId = this.context.token;
	      eventMsg.messages.chType = this.context.channel.type;
	      eventMsg.messages.chId = this.context.channel.id;
	      logger.evt(JSON.stringify(eventMsg));
	     
	      if (message) {
	        if (!this.context.database) {
	          this.context.signalingConnection.send(
	            JSON.stringify(message)
	          );
	        }
	      }
	      
	    }
	    else if (platform.name === "Chrome" || platform.name === "Chrome Mobile" ) {
	      let stats = await this.context.peerConnection.getStats(null);
	      let statInfo = {};
	      let transportId = 'RTCTransport_0_1';
	      let selectedCandidatePairId;
	      let localCandidateId;
	      let remoteCandidateId;
	      this.oldResult = { ...this.result };      stats.forEach(report => {
	          if(report.type === "transport"){
	            transportId = report.id;
	          }
	          statInfo[report.id] = report;
	      });
	      //set localCandidateId, remoteCandidateId
	      if (statInfo[transportId] && statInfo[transportId].selectedCandidatePairId){
	        selectedCandidatePairId = statInfo[transportId].selectedCandidatePairId;
	        localCandidateId = statInfo[selectedCandidatePairId].localCandidateId;
	        remoteCandidateId = statInfo[selectedCandidatePairId].remoteCandidateId;
	      }
	      //set this.result.localCandidate, this.result.remoteCandidate (connection type)
	      if(localCandidateId && remoteCandidateId){
	        this.result.localCandidate = statInfo[localCandidateId].candidateType;
	        this.result.localNetworkType = statInfo[localCandidateId].networkType;
	        this.result.protocol = statInfo[localCandidateId].protocol;
	        this.result.remoteCandidate = statInfo[remoteCandidateId].candidateType;
	      }
	      Object.keys(statInfo).forEach(id => {
	        if (statInfo[id].type === "inbound-rtp") {
	          if (statInfo[id].kind === "audio") {
	            // audio stream
	            this.qualityResult.audioPacketsReceived = statInfo[id].packetsReceived;
	            this.qualityResult.audioPacketsLoss= statInfo[id].packetsLost;
	            
	            this.result.nowRemoteAPReceived = statInfo[id].packetsReceived;
	            this.result.nowRemoteABReceived = statInfo[id].bytesReceived;
	            this.result.remoteAudioPacketsLost =
	              typeof this.result.remoteAudioPacketsLost !== "undefined"
	                ? (statInfo[id].packetsLost - this.result.oldRemoteAudioPacketsLost)
	                : 0;
	            this.result.oldRemoteAudioPacketsLost =
	            typeof this.result.oldRemoteAudioPacketsLost !== "undefined" 
	            ? statInfo[id].packetsLost
	            : 0;
	            
	            this.result.diffAudioPacketsLost = this.result.remoteAudioPacketsLost > 0 ? 
	            this.result.remoteAudioPacketsLost / ( this.interval/1000 ) : 0;

	            this.result.diffRemoteAPReceived =
	            ((this.result.nowRemoteAPReceived - this.result.oldRemoteAPReceived)) / ( this.interval/1000 );

	            this.result.remoteAudioFractionLost = 
	              typeof this.result.remoteAudioFractionLost !== "undefined"
	                ? parseInt(
	                  ((this.result.diffAudioPacketsLost) /
	                    (this.diffRemoteAPReceived + this.result.diffAudioPacketsLost)) *
	                    255 || 0
	                ):0;
	                
	            this.result.oldRemoteAPReceived = this.result.nowRemoteAPReceived;
	            this.result.remoteAudioCodec = statInfo[statInfo[id].codecId] ? statInfo[statInfo[id].codecId].mimeType : "";
	          } else {
	            // video stream
	            this.qualityResult.videoPacketsReceived = statInfo[id].packetsReceived;
	            this.qualityResult.videoPacketsLoss= statInfo[id].packetsLost;
	            this.qualityResult.framesDecoded = statInfo[id].framesDecoded;

	            this.result.nowRemoteVPReceived = statInfo[id].packetsReceived;
	            this.result.nowRemoteVBReceived = statInfo[id].bytesReceived;
	            this.result.remoteVideoPacketsLost =
	              typeof this.result.remoteVideoPacketsLost !== "undefined"
	                ? (statInfo[id].packetsLost - this.result.oldRemoteVideoPacketsLost ) 
	                : 0;
	            this.result.oldRemoteVideoPacketsLost  = 
	            typeof this.result.oldRemoteVideoPacketsLost !== "undefined" 
	            ? statInfo[id].packetsLost
	            : 0;

	            this.result.diffVideoPacketsLost = this.result.remoteVideoPacketsLost > 0 ? 
	            this.result.remoteVideoPacketsLost / ( this.interval/1000 ) : 0;
	            
	            this.result.diffRemoteVPReceived =
	            ((this.result.nowRemoteVPReceived - this.result.oldRemoteVPReceived)) / ( this.interval/1000 );


	            this.result.remoteVideoFractionLost = 
	              typeof this.result.remoteVideoFractionLost !== "undefined"
	                ? parseInt(
	                  ((this.result.diffVideoPacketsLost) /
	                    (this.result.diffRemoteVPReceived + this.result.diffVideoPacketsLost)) *
	                    255 || 0
	                ):0;
	            this.result.oldRemoteVPReceived = this.result.nowRemoteVPReceived;
	            this.result.remoteVideoCodec = statInfo[statInfo[id].codecId] ? statInfo[statInfo[id].codecId].mimeType : "";//statInfo[statInfo[id].codecId].mimeType;
	          }
	        } 
	        else if (statInfo[id].type === "outbound-rtp") {
	          // outbound stream
	          if (statInfo[id].kind === "audio") {
	            // audio stream
	            this.qualityResult.audioPacketsSent = statInfo[id].packetsSent;

	            this.result.nowLocalAPSent = statInfo[id].packetsSent;
	            this.result.nowLocalABSent = statInfo[id].bytesSent;
	            this.result.localAudioCodec = statInfo[statInfo[id].codecId].mimeType;
	            this.result.audioRtt = statInfo[`RTCRemoteInboundRtpAudioStream`+ `_` + `${statInfo[id].ssrc}`] ? 
	            statInfo[`RTCRemoteInboundRtpAudioStream`+ `_` + `${statInfo[id].ssrc}`].roundTripTime : 0 ;
	          } else {
	            // video stream
	            this.qualityResult.videoPacketsSent = statInfo[id].packetsSent;

	            this.result.nowLocalVPSent = statInfo[id].packetsSent;
	            this.result.nowLocalVBSent = statInfo[id].bytesSent;
	            this.result.localVideoCodec = statInfo[statInfo[id].codecId].mimeType;
	            this.result.videoRtt = statInfo[`RTCRemoteInboundRtpVideoStream`+ `_` + `${statInfo[id].ssrc}`]?
	            statInfo[`RTCRemoteInboundRtpVideoStream`+ `_` + `${statInfo[id].ssrc}`].roundTripTime : 0 ;
	          }
	        } 
	        else if (statInfo[id].type === "track") {
	          if (statInfo[id].remoteSource === true) {
	            // remote track
	            if (statInfo[id].kind === "audio") {
	              // audio track
	              this.qualityResult.insertedSamplesForDeceleration = statInfo[id].insertedSamplesForDeceleration;
	              this.qualityResult.removedSamplesForAcceleration = statInfo[id].removedSamplesForAcceleration;
	              this.result.remoteAudioLevel = statInfo[id].audioLevel;
	              this.result.remoteTotalAudioEnergy = statInfo[id].totalAudioEnergy;
	            } else {
	              // video track
	              // console.log('------video track -----');
	              // console.log( statInfo[id])
	              this.result.remoteFrameWidth = statInfo[id].frameWidth;
	              this.result.remoteFrameHeight = statInfo[id].frameHeight;
	              if (statInfo[id].framesReceived)
	                this.result.nowRemoteFrameRate = (statInfo[id].framesReceived - this.result.oldFramesReceived) / (this.interval / 1000);
	              this.result.oldFramesReceived = statInfo[id].framesReceived;
	              this.result.oldRemoteFrameRate =  this.result.nowRemoteFrameRate;
	            }
	          } else {
	            // local track
	            if (statInfo[id].kind === "audio") {
	              // audio
	              this.result.localAudioLevel = statInfo[statInfo[id].mediaSourceId].audioLevel;
	              this.result.localTotalAudioEnergy = statInfo[statInfo[id].mediaSourceId].totalAudioEnergy;
	            } else {
	              // video
	              this.result.localFrameWidth = statInfo[id].frameWidth;
	              this.result.localFrameHeight = statInfo[id].frameHeight;
	              if (statInfo[id].framesSent)
	                this.result.nowLocalFrameRate =(statInfo[id].framesSent - this.result.oldFramesSent) / (this.interval / 1000);                  
	              this.result.oldFramesSent = statInfo[id].framesSent;
	              this.result.oldLocalFrameRate = this.result.nowLocalFrameRate;
	            }
	          }
	        } 
	      });
	      // 나중에 이 밑의 코드는 firefox쪽과 통합해야함.

	      this.result.remoteAudioFractionRating = util.getAudioFractionLostRating(
	        this.result.remoteAudioFractionLost
	      );
	      this.result.remoteVideoFractionRating = util.getVideoFractionLostRating(
	        this.result.remoteVideoFractionLost
	      );
	     
	      this.result.fractionRating = this.result.remoteVideoFractionRating;
	    
	      this.result.audioRttRating = this.getRttRating(this.result.audioRtt * 1000);
	      this.result.videoRttRating = this.getRttRating(this.result.videoRtt * 1000);


	      this.result.rating = this.getMaxRating(
	        this.result.audioRttRating,
	        this.result.videoRttRating,
	        this.result.remoteAudioFractionRating,
	        this.result.remoteVideoFractionRating,
	        // this.result.localAudioFractionRating,
	        // this.result.localVideoFractionRatingoldRemoteAudioPacketsLost
	      );


	      if (this.context.eventManager.hasEventListener("onStat")) {
	        this.context.eventManager.dispatchEvent("onStat", this.result);
	      }
	      // framerate가 2번 연속 0이면 reduceSimulcast 호출
	      // 근데 그러고도 한참을 계속 framerate가 0일것 같은데...
	      // 일단 시도해보고 결정
	      if (
	        this.result.nowRemoteFrameRate == 0 &&
	        this.result.oldRemoteFrameRate == 0 && this.remoteVideo && this.remoteStream
	      ) {
	        this.context.signalingConnection.reduceVideoQuality();
	      }
	      let message = this.context.signalingConnection.createMessage({
	        command: "health",
	        body: JSON.stringify(this.result)
	      });
	      var eventMsg = {
	        topic: "health"
	      };
	      eventMsg.messages = this.result;
	      eventMsg.messages.serviceId = this.context.serviceId;
	      eventMsg.messages.pId = this.context.token;
	      eventMsg.messages.chType = this.context.channel.type;
	      eventMsg.messages.chId = this.context.channel.id;
	      logger.evt(JSON.stringify(eventMsg));
	     
	      if (message) {
	        if (!this.context.database) {
	          this.context.signalingConnection.send(
	            JSON.stringify(message)
	          );
	        }
	      }
	    }
	    this.qualityResult.timestamp = new Date().getTime();
	    logger.qualityLog(this.qualityResult);
	    // const clonedList = Object.assign({},this.qualityResult)
	    // console.log(clonedList)
	  }
	}

	var WORKER_ENABLED = !!(commonjsGlobal === commonjsGlobal.window && commonjsGlobal.URL && commonjsGlobal.Blob && commonjsGlobal.Worker);

	function bindPeerConnectionEvents({ context, media, config }) {
	  function handleIceCandidateEvent(event) {
	    logger.i("PeerCon: HandleICECandidateEvent");
	    logger.d("Event:", event);
	    logger.d("-> Candidate:", event.candidate);

	    const message = context.signalingConnection.createMessage({
	      command: "ice",
	      body: JSON.stringify(event.candidate)
	    });

	    if (event.candidate) {
	      logger.d("Message ->: ", message);
	      if (context.channel.type === "BROADCAST") {
	        message.channel.type = "BROADCAST";
	      }
	      if (typeof message !== "undefined"){

	        if(config.rtc.selectiveCandidate){
	          if( config.rtc.selectiveCandidate.mode === ('default')){
	            context.signalingConnection.send(JSON.stringify(message));
	          }else if(config.rtc.selectiveCandidate.mode === ('auto') && ( event.candidate.type === 'relay' ||  event.candidate.type === 'srflx' )){
	            context.signalingConnection.send(JSON.stringify(message));
	          }else if(config.rtc.selectiveCandidate.mode === ('relay') &&  event.candidate.type === 'relay' ){
	            context.signalingConnection.send(JSON.stringify(message));
	          }else if(config.rtc.selectiveCandidate.mode === ('route') &&  event.candidate.type === 'srflx' ){
	            context.signalingConnection.send(JSON.stringify(message));
	          }
	        }
	        else{
	            context.signalingConnection.send(JSON.stringify(message));
	        }
	         
	      }
	      const eventMsg = {
	        topic: "log",
	        messages: {
	          log: "iceType:local " + event.candidate,
	          logLevel: "info",
	          sdkVersion: context.sdkVersion,
	          svcId: context.serviceId,
	          pId: context.token,
	          chId: context.channel.id
	        }
	      };
	      logger.evt(JSON.stringify(eventMsg));
	    }
	  }

	  function handleIceGatheringStateChangeEvent() {
	    logger.i("PeerCon: Handle ice gathering state event");
	    logger.d(`Event: ${context.peerConnection.iceGatheringState}:`, event);
	  }

	  function handleSignalingStateChangeEvent(event) {
	    logger.i("PeerCon: Handle signaling state change event");
	    logger.d(`Event: ${context.peerConnection.signalingState}:`, event);
	    switch (context.peerConnection.signalingState) {
	      case "stable": {
	        context.endTime = new Date().getTime();
	        if (context.eventManager.hasEventListener("onAddRemoteStream")) {
	          context.eventManager.dispatchEvent(
	            "onAddRemoteStream",
	            context.remoteStream
	          );
	        }
	        break;
	      }
	      case "have-local-offer": {
	        break;
	      }
	      case "have-remote-offer": {
	        break;
	      }
	      case "have-local-pranswer": {
	        break;
	      }
	      case "have-remote-pranswer": {
	        break;
	      }
	      case "closed": {
	        break;
	      }
	      default: {
	        logger.e(
	          "Unknown signaling state event:",
	          context.peerConnection.signalingState
	        );
	        break;
	      }
	    }
	  }

	  function handleNegotiationNeededEvent(event) {
	    logger.w("PeerCon: Handle negotiation needed event");
	    logger.w("Event:", event);
	  }

	  function handleIceConnectionStateChangeEvent(event) {
	    logger.i("PeerCon: Handle ICE state change event");
	    logger.i(`Event: ${context.peerConnection.iceConnectionState}:`, event);

	    let message;
	    switch (context.peerConnection.iceConnectionState) {
	      case "connected": {
	        logger.i("ice State:connected");
	        if (context.eventManager.hasEventListener("onStateChange")) {
	          context.eventManager.dispatchEvent("onStateChange", "COMPLETE");
	        }
	        if (context.eventManager.hasEventListener("onComplete")) {
	          context.eventManager.dispatchEvent("onComplete");
	        }
	        context.state = "COMPLETE";
	        message = context.signalingConnection.createMessage({
	          command: "stateChange",
	          body: "COMPLETE"
	        });
	        if (
	          context.peerConnection.__proto__.hasOwnProperty("getTransceivers")
	        ) {
	          context.audioTransceiver = context.peerConnection.getTransceivers()[0];
	          if (
	            context.useVideo &&
	            context.peerConnection.getTransceivers().length > 1
	          )
	            context.videoTransceiver = context.peerConnection.getTransceivers()[1];
	        }
	        if (context.remoteVideo && context.remoteStream)
	          context.remoteVideo.srcObject = context.remoteStream;
	        if (!context.health || context.health.statsReportTimer === null){
	          var health = new Health(context);
	          health.start();
	          context.health = health;
	        }

	        // if (
	        //   context.channel.type === "BROADCAST" ||
	        //   context.channel.type === "VIEWER"
	        // )
	        // return;
	        break;
	      }
	      case "failed": {
	        // 간혹 browser가 refresh될때 netty는 이것을 감지못하나 ice failed가 발생한다. 이것 역시 상대 peer로부터 발생한 close이벤트라고 판단해야할까?
	        logger.i("ice State:failed");
	        logger.errorEvt(context, "1001", "ice state is failed"); 
	        if(context.eventManager.hasEventListener("onError")) {
	          context.eventManager.dispatchEvent("onError", "4245","ICEFailed");
	        }
	        if (context.state !== 'COMPLETE' && !context.qualityChecker){
	          context.qualityChecker= new QualityChecker(context);
	          context.qualityChecker.check();
	        }
	        break;
	      }
	      case "closed": {
	        logger.i("ice State:closed");

	        if (this.context.eventManager.hasEventListener("onError")) {
	          this.context.eventManager.dispatchEvent("onError", "4343", "ICEClosed");
	        }
	        if (context.eventManager.hasEventListener("onClose")) {
	          context.eventManager.dispatchEvent("onClose", {
	            message: "ICEClosed",
	            closeType: "UNKNOWN"
	          });
	        }
	        if (context.state !== "CLOSE") closeResource();
	        // context.signalingConnection.close();
	        return;
	        //message = context.signalingConnection.createMessage({ command: 'stateChange', body: 'CLOSE' });
	        break;
	      }
	      case "disconnected": {
	        logger.i("ice State:disconnected");
	        let hasOnError = context.eventManager.hasEventListener("onError");
	        if(hasOnError) {
	          context.eventManager.dispatchEvent("onError", "4344","ICEDisconnected");
	        }
	        
	        if (context.channel.type === "P2P"){
	          setTimeout(() => {
	            if(context.peerConnection.iceConnectionState !== "connected"){
	              if(hasOnError) {
	                context.eventManager.dispatchEvent("onError", "4343","ICEDisconnected After 3 seconds");
	              }
	              if(context.eventManager.hasEventListener("onClose")) {
	                context.eventManager.dispatchEvent("onClose", {
	                  message: "ICEDisconnected",
	                  closeType: "UNKNOWN"
	                });
	              }
	            }else{
	              if(hasOnError) {
	                context.eventManager.dispatchEvent("onError", "4345","ICEDisconnected but Connected in 3 seconds");
	              }
	            }
	          }, 3000);
	        } 
	        break;
	      }
	      case "completed": {
	        logger.v("iceconState:completed");
	        break;
	      }
	      case "checking": {
	        logger.v("iceconState:checking");
	        break;
	      }
	      default: {
	        logger.e(
	          "Unknown ice connection change event:",
	          context.peerConnection.iceConnectionState
	        );
	        break;
	      }
	    }
	    logger.v("Message ->:", message);
	    logger.i("Sending ice state to other");
	    if (typeof message !== "undefined")
	      context.signalingConnection.send(JSON.stringify(message));
	  }

	  function closeResource() {
	    if (context.health) context.health.stop();
	    if (context.peerConnection) context.peerConnection.close();
	    else return;
	    if (context.signalingConnection) context.signalingConnection.close();
	    else return;
	    context.state = "CLOSE";
	    if (context.useRecord && context.remoteRecorder) {
	      context.remoteRecorder.stop();
	      context.remoteRecorder = null;
	    }
	    if (context.useRecord && context.localRecorder) {
	      context.localRecorder.stop();
	      context.localRecorder = null;
	      context.useRecord = false;
	    }
	    if (context.remoteVideo.srcObject) {
	      context.remoteVideo.srcObject.getTracks().forEach(track => track.stop());
	    }

	    if (context.remoteVideo) context.remoteVideo.srcObject = null;
	    if (context.hasAddTrack) {
	      context.peerConnection.ontrack = null;
	    } else {
	      context.peerConnection.onaddstream = null;
	    }
	    context.peerConnection.onremovestream = null;
	    context.peerConnection.onicecandidate = null;
	    context.peerConnection.oniceconnectionstatechange = null;
	    context.peerConnection.onsignalingstatechange = null;
	    context.peerConnection.onicegatheringstatechange = null;
	    context.peerConnection.onnegotiationneeded = null;
	    context.peerConnection = null;
	  }
	  function handleRemoveStreamEvent(event) {
	    logger.v("PeerCon: Handle remove stream event");
	  }
	  function handleRemoteStreamEvent(event) {
	    logger.g("PeerCon: Bind remote stream");
	    logger.v("bindRemoteStream:", event);

	    let stream;
	    // FIXME: Chrome, adapter does not support addTrack
	    if (context.hasAddTrack) {
	      logger.v("PeerCon: context has track");
	      if (!context.remoteStream) {
	        context.remoteStream = new MediaStream();
	        context.remoteStream.addTrack(event.track);
	        if (!context.useVideo) stream = context.remoteStream;
	      } else {
	        context.remoteStream.addTrack(event.track);
	        stream = context.remoteStream;
	      }
	    } else {
	      logger.v("PeerCon: context has stream");
	      stream = event.stream;
	      context.remoteStream = stream;
	    }
	    //if (context.useVideo)

	    // if (platform.name === "Safari" || platform.name === "safari") {
	    //   context.remoteVideo.paused && context.remoteVideo.play();
	    // }

	    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    //   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
	    //   window.URL = window.URL || window.webkitURL;
	    //context.remonRecorder = new Recorder((new window.AudioContext).createMediaStreamSource(stream));
	    //context.remonRecorder.record();
	    if (context.useRecord && !context.remoteRecorder && stream) {
	      console.log("record is start");
	      context.remoteRecorder = new RemonRecorder(context, stream, "RR");
	      context.remoteRecorder.start();
	      context.localRecorder.start();
	    }
	    logger.gEnd();
	  }
	  function handleIceCandidateErrorEvent(event) {
	    logger.i("PeerCon: Handle ICE candidate error event",event);
	    logger.errorEvt(context, "1001", `ICE candidate error event occured hostCandidate : ${event.hostCandidate} url : ${event.url} errorCode: ${event.errorCode} errorText ${event.errorText}` );
	   
	  }
	  /* eslint-disable no-param-reassign */
	  context.peerConnection.onicecandidate = handleIceCandidateEvent;
	  context.peerConnection.onicegatheringstatechange = handleIceGatheringStateChangeEvent;
	  context.peerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
	  context.peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
	  context.peerConnection.oniceconnectionstatechange = handleIceConnectionStateChangeEvent;
	  context.peerConnection.onicecandidateerror = handleIceCandidateErrorEvent;
	  // FIXME: Chrome, adapter does not support addTrack
	  // NOTE: ontrack called twice. Maybe for audio, video. Is it right?
	  if (context.hasAddTrack) {
	    logger.i("PeerCon: context has addTrack");
	    context.peerConnection.ontrack = handleRemoteStreamEvent;
	  } else {
	    logger.i("PeerCon: context has onAddstream");
	    context.peerConnection.onaddstream = handleRemoteStreamEvent;
	  }
	  context.peerConnection.onremovestream = handleRemoveStreamEvent;
	  /* eslint-enable no-param-reassign */
	}

	// Copyright Joyent, Inc. and other Node contributors.

	var R = typeof Reflect === 'object' ? Reflect : null;
	var ReflectApply = R && typeof R.apply === 'function'
	  ? R.apply
	  : function ReflectApply(target, receiver, args) {
	    return Function.prototype.apply.call(target, receiver, args);
	  };

	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === 'function') {
	  ReflectOwnKeys = R.ownKeys;
	} else if (Object.getOwnPropertySymbols) {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target)
	      .concat(Object.getOwnPropertySymbols(target));
	  };
	} else {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target);
	  };
	}

	function ProcessEmitWarning(warning) {
	  if (console && console.warn) console.warn(warning);
	}

	var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
	  return value !== value;
	};

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	var events = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._eventsCount = 0;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	var defaultMaxListeners = 10;

	Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
	  enumerable: true,
	  get: function() {
	    return defaultMaxListeners;
	  },
	  set: function(arg) {
	    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
	      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
	    }
	    defaultMaxListeners = arg;
	  }
	});

	EventEmitter.init = function() {

	  if (this._events === undefined ||
	      this._events === Object.getPrototypeOf(this)._events) {
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
	    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
	  }
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	EventEmitter.prototype.emit = function emit(type) {
	  var args = [];
	  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
	  var doError = (type === 'error');

	  var events = this._events;
	  if (events !== undefined)
	    doError = (doError && events.error === undefined);
	  else if (!doError)
	    return false;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    var er;
	    if (args.length > 0)
	      er = args[0];
	    if (er instanceof Error) {
	      // Note: The comments on the `throw` lines are intentional, they show
	      // up in Node's output if this results in an unhandled exception.
	      throw er; // Unhandled 'error' event
	    }
	    // At least give some kind of context to the user
	    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
	    err.context = er;
	    throw err; // Unhandled 'error' event
	  }

	  var handler = events[type];

	  if (handler === undefined)
	    return false;

	  if (typeof handler === 'function') {
	    ReflectApply(handler, this, args);
	  } else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      ReflectApply(listeners[i], this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }

	  events = target._events;
	  if (events === undefined) {
	    events = target._events = Object.create(null);
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener !== undefined) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (existing === undefined) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] =
	        prepend ? [listener, existing] : [existing, listener];
	      // If we've already got an array, just append.
	    } else if (prepend) {
	      existing.unshift(listener);
	    } else {
	      existing.push(listener);
	    }

	    // Check for listener leak
	    m = $getMaxListeners(target);
	    if (m > 0 && existing.length > m && !existing.warned) {
	      existing.warned = true;
	      // No error code for this since it is a Warning
	      // eslint-disable-next-line no-restricted-syntax
	      var w = new Error('Possible EventEmitter memory leak detected. ' +
	                          existing.length + ' ' + String(type) + ' listeners ' +
	                          'added. Use emitter.setMaxListeners() to ' +
	                          'increase limit');
	      w.name = 'MaxListenersExceededWarning';
	      w.emitter = target;
	      w.type = type;
	      w.count = existing.length;
	      ProcessEmitWarning(w);
	    }
	  }

	  return target;
	}

	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function onceWrapper() {
	  var args = [];
	  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
	  if (!this.fired) {
	    this.target.removeListener(this.type, this.wrapFn);
	    this.fired = true;
	    ReflectApply(this.listener, this.target, args);
	  }
	}

	function _onceWrap(target, type, listener) {
	  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
	  var wrapped = onceWrapper.bind(state);
	  wrapped.listener = listener;
	  state.wrapFn = wrapped;
	  return wrapped;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function') {
	        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	      }
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// Emits a 'removeListener' event if and only if the listener was removed.
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function') {
	        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	      }

	      events = this._events;
	      if (events === undefined)
	        return this;

	      list = events[type];
	      if (list === undefined)
	        return this;

	      if (list === listener || list.listener === listener) {
	        if (--this._eventsCount === 0)
	          this._events = Object.create(null);
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length - 1; i >= 0; i--) {
	          if (list[i] === listener || list[i].listener === listener) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (position === 0)
	          list.shift();
	        else {
	          spliceOne(list, position);
	        }

	        if (list.length === 1)
	          events[type] = list[0];

	        if (events.removeListener !== undefined)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events, i;

	      events = this._events;
	      if (events === undefined)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (events.removeListener === undefined) {
	        if (arguments.length === 0) {
	          this._events = Object.create(null);
	          this._eventsCount = 0;
	        } else if (events[type] !== undefined) {
	          if (--this._eventsCount === 0)
	            this._events = Object.create(null);
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        var key;
	        for (i = 0; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = Object.create(null);
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners !== undefined) {
	        // LIFO order
	        for (i = listeners.length - 1; i >= 0; i--) {
	          this.removeListener(type, listeners[i]);
	        }
	      }

	      return this;
	    };

	function _listeners(target, type, unwrap) {
	  var events = target._events;

	  if (events === undefined)
	    return [];

	  var evlistener = events[type];
	  if (evlistener === undefined)
	    return [];

	  if (typeof evlistener === 'function')
	    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

	  return unwrap ?
	    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}

	EventEmitter.prototype.listeners = function listeners(type) {
	  return _listeners(this, type, true);
	};

	EventEmitter.prototype.rawListeners = function rawListeners(type) {
	  return _listeners(this, type, false);
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events !== undefined) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener !== undefined) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};

	function arrayClone(arr, n) {
	  var copy = new Array(n);
	  for (var i = 0; i < n; ++i)
	    copy[i] = arr[i];
	  return copy;
	}

	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++)
	    list[index] = list[index + 1];
	  list.pop();
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	function connector(url, timeoutMs, numRetries, callback) {
	  let t;
	  let ws;
	  let remainRetries = numRetries;
	  let isConnecting = true;
	  connect();

	  function connect() {
	    if (remainRetries <= 0) {
	      callback("timeout", null);
	      isConnecting = false;
	      return;
	    }

	    logger.i("try connect signaling. remainRetries:"+ remainRetries);
	    ws = new WebSocket(url);
	    ws.onopen = () => {
	      clearTimeout(t);
	      callback(null, ws);
	      isConnecting = false;
	      return;
	    };
	    ws.onerror = () => {};
	    ws.onclose = () => {};

	    t = setTimeout(() => {
	      retry();
	    }, timeoutMs);
	  }

	  function retry() {
	    ws.onerror = null;
	    ws.onclose = null;
	    ws.close();
	    clearTimeout(t);

	    setTimeout(() => {
	      remainRetries--;
	      connect();
	    }, 0);
	  }

	  function cancel() {
	    if (isConnecting === false) return;

	    ws.onerror = null;
	    ws.onclose = null;
	    ws.close();
	    clearTimeout(t);
	    callback("cancel", null);
	    return;
	  }

	  return {
	    cancel: cancel
	  };
	}

	class SignalingConnection extends events {
	  constructor({ url, context }) {
	    super();
	    logger.init(context);

	    this.wsUrl = url;
	    this.connectTimeoutMs = 1000;
	    this.connectRetries = 5;
	    this.context = context;
	    this.ws = null;
	    this.connector;
	    this.onMessageHandler = null;
	    this.context.isConnectToSignal = false;
	    this.needReconnect = false;
	  }

	  connect() {
	    logger.i("Signaling: Connect");

	    this.context.isConnectToSignal = false;
	    this.connector = connector(
	      this.wsUrl,
	      this.connectTimeoutMs,
	      this.connectRetries,
	      (error, ws) => {
	        if (error) {
	          console.log("websocket connection fail. error:" + error);
	          if (error === "timeout") {
	            this.emit("disconnect");
	          }
	          return;
	        }

	        this.ws = ws;
	        this.ws.onmessage = this.onMessageHandler;
	        this.ws.onopen = null;
	        this.ws.onclose = this.handleCloseEvent.bind(this);
	        this.ws.onerror = this.handleErrorEvent.bind(this);

	        if (this.needReconnect === false) {
	          logger.i("Signaling: Success connect to the signaling server");
	          logger.v("OpenEvent:", event);
	          this.context.isConnectToSignal = true;

	          if (this.context.eventManager.hasEventListener("onInit")) {
	            this.context.eventManager.dispatchEvent(
	              "onInit",
	              this.context.token
	            );
	          }
	          if (this.context.eventManager.hasEventListener("onStateChange")) {
	            this.context.eventManager.dispatchEvent("onStateChange", "INIT");
	          }
	          this.emit("connect");
	        } else {
	          logger.i("Signaling: Success re-connect to the signaling server");
	          logger.v("Re-OpenEvent:", event);
	          this.context.isConnectToSignal = true;

	          this.emit("reconnect");
	        }
	        this.needReconnect = true;
	      }
	    );
	  }

	  send(...args) {
	    if (this.ws === null || this.ws === undefined) return;

	    try {
	      this.ws.send(...args);
	    } catch (e) {}
	  }

	  setDisconnectHandler() {
	    const msg = { command: "disconnect" };
	    msg.peertype = this.context.channel.type;
	  }

	  /**
	   * 명시적인 close인 경우 처리
	   */
	  close() {
	    if (this.connector) {
	      this.connector.cancel();
	    }
	    this.needReconnect = false;
	    if (this.ws === null || this.ws === undefined) return;
	    if (this.ws.readyState === WebSocket.OPEN) {
	      // 'OPEN'
	      // client는 무조건 disconnectChannel를 전송하고 종료되야 한다.
	      const message = this.createMessage({ command: "disconnect" });
	      logger.v("DisconnectCh Message ->:", message);
	      this.send(JSON.stringify(message));
	      console.log(
	        "DisconnectCh:" + JSON.stringify(message) + " " + this.ws.readyState
	      );
	    }
	    this.ws.close();
	    delete this.ws;
	  }

	  onOffline() {
	    if (this.needReconnect === false) return;
	    if (this.ws) {
	      this.ws.onclose = null;
	      this.ws.onerror = null;
	      this.ws.close();
	      delete this.ws;
	    }

	    this.connect();
	  }

	  onMessage(handler) {
	    this.onMessageHandler = handler;
	  }

	  handleCloseEvent(event) {
	    logger.i("Signaling: Closed the signaling connection");
	    logger.v("Event:", event);

	    this.context.isConnectToSignal = false;

	    if (this.needReconnect) {
	      // websocket이 종료되면 reconnect를 시도한다.
	      this.connect();
	    }
	  }

	  handleErrorEvent(event) {
	    logger.e("Signaling: Error from the signaling connection.");
	    //console.log("error event:" + JSON.stringify(event));
	    logger.e("Event", event);

	    // TODO: 이건 어떻게 처리해야 하나???
	    // if (this.isConnectToSignal)
	    //   if (this.context.eventManager.hasEventListener("onError")) {
	    //     this.context.eventManager.dispatchEvent(
	    //       "onError",
	    //       "WebSocketFailedError"
	    //     )
	    //   }
	  }

	  createMessage({ command, body }) {
	    logger.d("Signaling: Create Message %j", body);

	    const template = {
	      command,
	      token: this.context.token,
	      serviceId: this.context.serviceId,
	      channel: {
	        id: this.context.channel.id,
	        name: this.context.channel.name,
	        type: this.context.channel.type
	      }
	    };

	    if (body) {
	      template.body = body;
	    }
	    logger.v("createMessage: " + JSON.stringify(template));
	    return template;
	  }

	  connectChannel(channelId) {
	    logger.i("Signaling: Connect channel: As a caller");
	    this.context.startTime = new Date().getTime();
	    this.context.isCaller = true;
	    this.context.channel.id = channelId;

	    const message = this.createMessage({ command: "connect" });
	    logger.v("ConnectCh Message ->:", message);

	    this.send(JSON.stringify(message));
	  }

	  reconnectChannel() {
	    logger.i("Signaling: re-connect channel:");
	    const message = this.createMessage({ command: "reconnect" });
	    logger.i("Re-Connect Ch Message ->:", message);
	    this.send(JSON.stringify(message));
	  }

	  createViewerChannel(channelId) {
	    logger.i("Signaling: Create channel: As a viewer");
	    this.context.startTime = new Date().getTime();
	    this.context.isCaller = false;
	    this.context.channel.id = channelId;

	    const message = this.createMessage({ command: "create" });
	    message.channel.type = "VIEWER";
	    message.channel.id = channelId;
	    logger.v("ConnectCh Message ->:", message);
	    this.send(JSON.stringify(message));
	  }

	  createConferenceRoom(roomId) {
	    logger.i("SignalingConnection.js:createConferenceRoom");
	    this.context.startTime = new Date().getTime();
	    this.context.isCaller = false;
	    // this.context.channel.id = this.context.channel.name = roomname;

	    const message = this.createMessage({ command: "create" });
	    message.roomId = roomId;
	    message.channel.type = "ROOM";
	    message.channel.videoCodec = this.context.videoCodec;
	    message.channel.audioCodec = this.context.audioCodec;
	    message.channel.simulcast = this.context.simulcast;
	    // message.channel.id = roomname;

	    logger.v("SignalingConnection.js:createConferenceRoom:ConnectCh Message ->:", message);
	    logger.i("SignalingConnection.js:createConferenceRoom:room id: " + this.context.channel.id);
	    this.send(JSON.stringify(message));
	  }

	  createBroadcastChannel(roomname) {
	    logger.i("Signaling: Create channel: As a presenter");
	    this.context.startTime = new Date().getTime();
	    this.context.isCaller = false;
	    this.context.channel.id = this.context.channel.name = roomname;

	    const message = this.createMessage({ command: "create" });
	    message.channel.type = "BROADCAST";
	    message.channel.videoCodec = this.context.videoCodec;
	    message.channel.audioCodec = this.context.audioCodec;
	    message.channel.simulcast = this.context.simulcast;
	    message.channel.id = roomname;

	    logger.v("ConnectCh Message ->:", message);
	    logger.i("channel id: " + this.context.channel.id);
	    this.send(JSON.stringify(message));
	  }

	  disconnectChannel() {
	    logger.i("Signaling: Close channel:");
	    const message = this.createMessage({ command: "disconnect" });
	    logger.v("DisconnectCh Message ->:", message);
	    //("DisconnectCh:" + JSON.stringify(message));
	    this.send(JSON.stringify(message));
	  }

	  setSimulcastPriority(priority) {
	    logger.i("Signaling: Set Simulcast Priority", priority);
	    const message = this.createMessage({
	      command: "switchStream",
	      body:
	        priority === "HIGH" || "MEDIUM" || "LOW"
	          ? priority
	          : this.context.eventManager.dispatchEvent(
	              "onError",
	              "not_exist_simulcastPriority"
	            )
	    });
	    this.context.currentSimulcast = priority;
	    message.channel.type = "VIEVER";
	    message.channel.id = this.context.channel.id;
	    logger.v("SetSimulcastPriority Message ->:", message);
	    this.send(JSON.stringify(message));
	  }

	  reduceVideoQuality() {
	    let q = this.context.currentSimulcast;
	    if (q === "HIGH") q = "MEDIUM";
	    else if (q === "MEDIUM") q = "LOW";
	    else return;
	    this.setSimulcastPriority(q);
	  }

	  isOpened() {
	    return this.context.isConnectToSignal;
	  }
	}

	function bindSignalingConnectionEvents({ context, media, config }) {
	  const signalingEvents = {
	    async onCreate(message) {
	      logger.i("Signaling: On create channel");
	      context.isCaller = false;
	      
	      switch (message.code) {
	        case "500": {
	          context.eventManager.dispatchEvent("onError", "Signaling: 500 Error");
	          break;
	        }
	        case "502": {
	          context.eventManager.dispatchEvent(
	            "onError",
	            "Signaling: 502 Error: Unknown token"
	          );
	          break;
	        }
	        case "530": {
	          context.eventManager.dispatchEvent(
	            "onError",
	            "Signaling: 530 Error: No media server"
	          );
	          break;
	        }
	        default: {
	          logger.i("Signaling:", message.code);
	        }
	      }

	      if (context.eventManager.hasEventListener("onStateChange")) {
	        context.eventManager.dispatchEvent("onStateChange", "WAIT");
	      }
	      if (!message.channel) {
	        if (context.eventManager.hasEventListener("onError")) {
	          context.eventManager.dispatchEvent("onError", "ConnectChannelFailedError");
	        }
	      }

	      context.channel = message.channel;
	      logger.i("Channel id:", context.channel.id);
	      logger.i("Channel type: ", context.channel.type);

	      if (config.media.recvonly !== true) {
	        logger.d("try to create local stream");
	        await context.mediaManager.createLocalStream(context, config.media);
	        context.mediaManager.bindLocalStreamToPeerConnection(
	          context.peerConnection
	        );
	        logger.i("success to create and bind local stream to pc");
	      }

	      if (context.eventManager.hasEventListener("onCreateChannel")) {
	        context.eventManager.dispatchEvent(
	          "onCreateChannel",
	          context.channel.id
	        );
	      }
	      // added for remon 2.0 call interface when create channel is successful
	      if (
	        context.eventManager.hasEventListener("onConnect") &&
	        context.channel.type === "P2P"
	      ) {
	        context.eventManager.dispatchEvent("onConnect", context.channel.id);
	      }
	      // added cast interface when create and join room is successful
	      if (
	        context.eventManager.hasEventListener("onCreate") &&
	        (context.channel.type === "BROADCAST"|| context.channel.type === "ROOM")
	      ) {
	        context.eventManager.dispatchEvent("onCreate", context.channel.id);
	      } else if (
	        context.eventManager.hasEventListener("onJoin") &&
	        context.channel.type === "VIEWER"
	      ) {
	        context.eventManager.dispatchEvent("onJoin", context.channel.id);
	      }
	      if (context.channel.type === "BROADCAST" || context.channel.type === "ROOM") {
	        createPresenterOffer();
	      } else if (context.channel.type === "VIEWER") {
	        createViewerOffer();
	      }
	    },

	    async onConnect(message) {
	      logger.i("Signaling: On connect channel");
	      context.isCaller = true;
	      context.channel = message.channel;
	      context.state= 'CONNECT';
	      logger.i("Channel id:", context.channel.id);
	      logger.d("Channel type: ", context.channel.type);
	      logger.d("isCaller: true");
	      if (context.eventManager.hasEventListener("onStateChange")) {
	        context.eventManager.dispatchEvent("onStateChange", "CONNECT");
	      }
	      if (!message.channel) {
	        if (context.eventManager.hasEventListener("onError")) {
	          context.eventManager.dispatchEvent("onError", "ConnectChannelFailedError");
	        }
	        return;
	      }

	      if (config.media.recvonly !== true) {
	        logger.d("try to create local stream");
	        await context.mediaManager.createLocalStream(context, config.media);
	        context.mediaManager.bindLocalStreamToPeerConnection(
	          context.peerConnection
	        );
	        logger.i("success to create and bind local stream to pc");
	      }

	      if (context.eventManager.hasEventListener("onConnectChannel")) {
	        context.eventManager.dispatchEvent(
	          "onConnectChannel",
	          context.channel.id
	        );
	      }

	      let offerOptions = {
	        offerToReceiveAudio: 1,
	        offerToReceiveVideo: 1
	      };

	      context.peerConnection
	        .createOffer(offerOptions)
	        .then(handleDescription)
	        .catch(error => {
	          logger.e("PeerConnection: Create offer failed:", error);
	          logger.errorEvt(context, "4231", "Create offer failed:" + error);
	          if (context.eventManager.hasEventListener("onError")) {
	            context.eventManager.dispatchEvent("onError", "ICEFailedError");
	            context.eventManager.dispatchEvent("onError", "4231", "Create offer failed :"+ error);
	            return;
	          }
	        });
	    },

	    onReconnect(message) {
	      logger.i("Signaling: On re-connect channel");
	      // this.onConnect(message);
	      if (context.eventManager.hasEventListener("onReconnect")) {
	        context.eventManager.dispatchEvent("onReconnect", message.body);
	      }
	    },

	    onSdp(message) {
	      logger.i("Signaling: On sdp");
	      const description = new RTCSessionDescription(JSON.parse(message.body));
	      var eventMsg = {
	        topic: "log",
	        messages: {
	          log: "sdpType:" + description.type + " " + message.body,
	          logLevel: "info",
	          sdkVersion: context.sdkVersion,
	          svcId: context.serviceId,
	          pId: context.token,
	          chId: context.channel.id
	        }
	      };
	      logger.evt(JSON.stringify(eventMsg));
	      logger.d("-> Remote Description:", description);
	      if (
	        context.videoBandwidth &&
	        !(platform.name === "Safari" || platform.name === "safari")
	      ) {
	        description.sdp = util.setMediaBitrate(
	          description.sdp,
	          "video",
	          context.videoBandwidth
	        );
	      }
	      if (
	        config.rtc.audioType === "music" &&
	        !(platform.name === "Safari" || platform.name === "safari")
	      ) {
	        description.sdp = addStereoModeToRemoteDescription(description.sdp);
	      }
	      context.peerConnection
	        .setRemoteDescription(description)
	        .then(() => {
	          logger.i("Remote Description Setted");
	        })
	        .catch(error => {
	          logger.e("PeerConnection: Remote description set failed:", error);
	          logger.errorEvt(context, "1009", "set remote sdp is failed:" + error);
	          if (context.eventManager.hasEventListener("onError")) {
	            context.eventManager.dispatchEvent("onError", "ICEFailedError");
	            context.eventManager.dispatchEvent("onError", "4233", "set remote sdp is failed");
	            return;
	          }
	        });

	      logger.d("Am I a caller?:", context.isCaller);
	      logger.d("channel info?:", context.channel);
	      //if (!context.isCaller && context.channel.type !=="BROADCAST" && context.channel.type !=="VIEWER") {
	      if (!context.isCaller && description.type === "offer") {
	        //} && context.channel.msType ==='Ms') {
	        logger.i("Create answer");
	        context.peerConnection
	          .createAnswer()
	          .then(handleDescription)
	          .catch(error => {
	            logger.e("PeerConnection: Create Answer failed:", error);
	            if (context.eventManager.hasEventListener("onError")) {
	              context.eventManager.dispatchEvent("onError", "ICEFailedError");
	              return;
	            }
	          });
	      }
	    },
	    async onDisconnectChannel(message) {
	      logger.i("Signaling: onDisconnectChannel");
	      // if (
	      //   context.channel.type === "P2P" ||
	      //   (context.channel.type === "BROADCAST" && message === "room")
	      // )
	      await closeResource();
	      if (context.eventManager.hasEventListener("onDisconnectChannel")) {
	        context.eventManager.dispatchEvent("onDisconnectChannel", message.body);
	      }
	      if (context.eventManager.hasEventListener("onClose")) {
	        context.eventManager.dispatchEvent("onClose", {
	          message: message.body,
	          closeType: "OTHER"
	        });
	      }
	    },
	    onRoomEvent(message){
	      logger.i("Signaling: onRoomEvent:"+ message.body);
	      if (context.eventManager.hasEventListener("onRoomEvent")){
	        context.eventManager.dispatchEvent("onRoomEvent", {event: message.body, channel: message.channel});
	      }
	    },
	    ping(message) {
	      message.command = "pong";
	      context.signalingConnection.send(JSON.stringify(message));
	    },
	    onStateChange(message) {
	      if (!signalingStates.includes(message.body)) {
	        logger(logger.e("Unknown signaling state:" + message.body));
	      } else {
	        if (message.body === context.state) return;
	        context.state = message.body;
	        if (context.eventManager.hasEventListener("onStateChange")) {
	          context.eventManager.dispatchEvent("onStateChange", message.body);
	        }

	        switch (message.body) {
	          case "INIT": {
	            logger.i(">STATE:INIT");
	            break;
	          }
	          case "WAIT": {
	            logger.i(">STATE:WAIT");
	            break;
	          }
	          case "CONNECT": {
	            logger.i(">STATE:CONNECT");
	            break;
	          }
	          case "COMPLETE": {
	            logger.i(">STATE:COMPLETE");
	            if (context.eventManager.hasEventListener("onStateChange")) {
	              context.eventManager.dispatchEvent("onStateChange", "COMPLETE");
	            }
	            if (context.eventManager.hasEventListener("onComplete")) {
	              context.eventManager.dispatchEvent("onComplete");
	            }
	            var eventMsg = {
	              topic: "log",
	              messages: {
	                log: "IceConnectionState: CONNECTED",
	                logLevel: "info",
	                os: platform.os.family,
	                osVersion: platform.os.version || "0",
	                device: platform.name,
	                deviceVersion: platform.version || "0",
	                networkType: Navigator.connection,
	                svcId: context.serviceId,
	                pId: context.token,
	                sdkVersion: context.sdkVersion,
	                status: "COMPLETE",
	                chId: context.channel.id
	              }
	            };
	            logger.evt(JSON.stringify(eventMsg));
	            break;
	          }
	          case "CLOSE": {
	            logger.i(">STATE:CLOSE");
	            closeResource();

	            if (context.eventManager.hasEventListener("onStateChange")) {
	              context.eventManager.dispatchEvent("onStateChange", "CLOSE");
	            }
	            if (context.eventManager.hasEventListener("onError")) {
	              context.eventManager.dispatchEvent("onError", "4241", "Disconnected from Signal Server");
	            }

	            if (context.eventManager.hasEventListener("onClose")) {
	              context.eventManager.dispatchEvent("onClose", {
	                closeType: "OTHER_UNEXPECTED"
	              });
	            }
	            //if (context.eventManager.hasEventListener('onDisconnectChannel')) { context.eventManager.dispatchEvent('onDisconnectChannel'); }
	            break;
	          }
	          case "FAIL": {
	            logger.i(">STATE:FAIL");
	            closeResource();
	            if (context.eventManager.hasEventListener("onError")) {
	              context.eventManager.dispatchEvent("onError", "ICEFailedError");
	            }
	            break;
	          }
	          default: {
	            break;
	          }
	        }
	      }

	      logger.gEnd();
	    },

	    onIce(message) {
	      const candidate = new RTCIceCandidate(JSON.parse(message.body));
	      logger.d("Candidate:", JSON.stringify(candidate));
	      var eventMsg = {
	        topic: "log",
	        messages: {
	          log: "iceType:remote " + message.body,
	          logLevel: "info",
	          sdkVersion: context.sdkVersion,
	          svcId: context.serviceId,
	          pId: context.token,
	          chId: context.channel.id
	        }
	      };
	      logger.evt(JSON.stringify(eventMsg));
	      context.peerConnection
	        .addIceCandidate(candidate)
	        .then(() => {
	          logger.d("Add ICE candidate success");
	        })
	        .catch(error => {
	          logger.e("Peer Connection: Add ICE candidate failed", error);
	          logger.errorEvt(context, "1001", "add ice candidate failed:" + error);
	          if (context.eventManager.hasEventListener("onError")) {
	            context.eventManager.dispatchEvent("onError", "ICEFailedError");
	            context.eventManager.dispatchEvent("onError", "4246", "add ice candidate failed");
	          }
	        });
	    },

	    onMessage(message) {
	      logger.d("Signaling: On message: " + message.body);
	      if (context.eventManager.hasEventListener("onMessage")) {
	        context.eventManager.dispatchEvent("onMessage", message.body);
	      }
	    },
	    onSearch(message) {
	      logger.d("Signaling: On search: " + message.body);
	      if (context.eventManager.hasEventListener("onSearch")) {
	        context.eventManager.dispatchEvent("onSearch", message.body);
	      }
	    },
	    ack(message){
	      //l.d("Signling: On Ack: " + message.body);
	    },
	    onError(message) {
	      logger.e("Signaling error -> Message:", message);
	      if (context.eventManager.hasEventListener("onError")) {
	        context.eventManager.dispatchEvent("onError", JSON.stringify(message.code), JSON.stringify(message.body));
	      }
	      var eventMsg = {
	        topic: "log",
	        messages: {
	          log: message,
	          logLevel: "error",
	          errorCode: "1000",
	          sdkVersion: context.sdkVersion,
	          svcId: context.serviceId,
	          pId: context.token,
	          chId: context.channel.id
	        }
	      };
	      logger.evt(JSON.stringify(eventMsg));
	    }
	  };
	  function createViewerOffer() {
	    logger.i("createViewerOffer is called " + platform.name);
	    let offerOptions = {
	      offerToReceiveAudio: 1,
	      offerToReceiveVideo: 1
	    };

	    // if (platform.name === "Safari" || platform.name === "safari") {
	    //   l.d("safari mode is on");

	    //   //context.peerConnection.addTransceiver('audio');
	    //   context.peerConnection.addTransceiver("video").setDirection("recvonly");
	    // }
	    //if (context.channel.msType ==='Ms'){
	    context.peerConnection
	      .createOffer(offerOptions)
	      .then(handleBroadcastOffer)
	      .catch(error => {
	        logger.e("PeerConnection: Create offer failed:", error);
	        logger.errorEvt(context, "1009", "create offer is failed:" + error);
	        if (context.eventManager.hasEventListener("onError")) {
	          context.eventManager.dispatchEvent("onError", "ICEFailedError");
	          return;
	        }
	      });
	  }
	  function createPresenterOffer() {
	    let offerOptions = {
	      offerToReceiveAudio: false,
	      offerToReceiveVideo: false
	    };
	    if (config.rtc.audioType === "music") {
	      offerOptions.voiceActivityDetection = false;
	    }

	    if (context.channel.type === "BROADCAST") {
	      if (platform.name === "Firefox" && context.simulcast) {
	        // 보통 SDP의 순서가 audio, video이기 때문에 0은 오디오, 1은 비디오
	        // TODO: 오디오, 비디오 순서가 뒤바뀌는 경우 처리
	        const mediaType = 1; // video
	        let sender = context.peerConnection.getSenders()[mediaType];
	        let parameters = sender.getParameters();
	        sender
	          .setParameters({
	            encodings: [
	              {
	                rid: "high",
	                active: true,
	                priority: "high",
	                maxBitrate: 2500000
	              },
	              {
	                rid: "medium",
	                active: true,
	                priority: "medium",
	                maxBitrate: 500000
	              },
	              {
	                rid: "low",
	                active: true,
	                priority: "low",
	                maxBitrate: 100000
	              }
	            ]
	          })
	          .then(() => {
	            console.log(
	              context.peerConnection.getSenders()[mediaType].getParameters()
	            );
	          });
	      }
	    }
	    context.peerConnection
	      .createOffer(offerOptions)
	      .then(handleDescription)
	      .catch(error => {
	        logger.e("PeerConnection: Create offer failed:", error);
	        logger.errorEvt(context, "1009", "create offer is failed:" + error);
	        if (context.eventManager.hasEventListener("onError")) {
	          context.eventManager.dispatchEvent("onError", "ICEFailedError");
	          return;
	        }
	      });
	  }

	  function handleBroadcastOffer(description) {
	    logger.i("Local Description:", description);
	    if (config.rtc.audioType === "music") {
	      description.sdp = replaceToStereoMode(description.sdp);
	    }
	    if (!context.videoCodec) {
	      logger.v("Signaling: video codec: H264");
	      description.sdp = replaceCodec(description.sdp, /m=video(:?.*)?/, "H264");
	    } else {
	      logger.v("Signaling: video codec: " + context.videoCodec);
	      description.sdp = replaceCodec(
	        description.sdp,
	        /m=video(:?.*)?/,
	        context.videoCodec
	      );
	    }
	    const message = context.signalingConnection.createMessage({
	      command: "sdp",
	      body: JSON.stringify(description)
	    });
	    message.channel.type = context.channel.type;
	    context.signalingConnection.send(JSON.stringify(message));
	  }

	  function handleDescription(description) {
	    logger.i("new Local Description:", description);
	    if (!context.videoCodec) {
	      logger.v("Signaling: video codec: H264");
	      description.sdp = replaceCodec(description.sdp, /m=video(:?.*)?/, "H264");
	    } else {
	      logger.v("Signaling: video codec: " + context.videoCodec);
	      description.sdp = replaceCodec(
	        description.sdp,
	        /m=video(:?.*)?/,
	        context.videoCodec
	      );
	    }
	    if (context.videoBandwidth) {
	      description.sdp = util.setMediaBitrate(
	        description.sdp,
	        "video",
	        context.videoBandwidth
	      );
	    }

	    if (context.channel.type === "BROADCAST") {
	      if (
	        platform.name === "Chrome" &&
	        parseInt(platform.version.split(".")[0], 10) < 74 &&
	        context.simulcast
	      ) {
	        description.sdp = mungeSdpForSimulcasting(description.sdp);
	      }
	    }

	    if (config.rtc.audioType === "music") {
	      description.sdp = replaceToStereoMode(description.sdp);
	    }
	    const message = context.signalingConnection.createMessage({
	      command: "sdp",
	      body: JSON.stringify(description)
	    });
	    message.channel.type = context.channel.type;
	    context.peerConnection
	      .setLocalDescription(description)
	      .then(() => {
	        logger.v(
	          "Local Description Setted:",
	          context.peerConnection.localDescription
	        );
	        logger.i("Message ->:", message);
	        context.signalingConnection.send(JSON.stringify(message));
	      })
	      .catch(error => {
	        logger.e("PeerConnection: set Local description failed", error);
	        logger.errorEvt(context, "4232", "set local offer is failed:" + error);
	        if (context.eventManager.hasEventListener("onError")) {
	          context.eventManager.dispatchEvent("onError", "ConnectChannelFailedError");
	          context.eventManager.dispatchEvent("onError", "4232", "set local offer is failed");
	        }
	      });
	  }

	  async function closeResource() {
	    logger.i("close resources");
	    
	    if (context.health) context.health.stop();
	    
	    context.state = "CLOSE";
	    if (context.useRecord && context.remoteRecorder) {
	      context.remoteRecorder.stop();
	      context.remoteRecorder = null;
	    }
	    if (context.useRecord && context.localRecorder) {
	      context.localRecorder.stop();
	      context.localRecorder = null;
	      context.useRecord = false;
	    }
	    if (context.remoteVideo.srcObject) {
	      context.remoteVideo.srcObject.getTracks().forEach(track => track.stop());
	    }

	    if (context.remoteVideo) context.remoteVideo.srcObject = null;
	    if (!context.signalingConnection) return;
	    if (!context.peerConnection) return;
	    if (!context.qualityChecker){
	      context.qualityChecker= new QualityChecker(context);
	      await context.qualityChecker.check();
	    }
	    context.peerConnection.close();
	    context.signalingConnection.close();
	    if(context.peerConnection){
	      if (context.hasAddTrack) {
	        context.peerConnection.ontrack = null;
	      } else {
	        context.peerConnection.onaddstream = null;
	      }
	      context.peerConnection.onremovestream = null;
	      context.peerConnection.onicecandidate = null;
	      context.peerConnection.oniceconnectionstatechange = null;
	      context.peerConnection.onsignalingstatechange = null;
	      context.peerConnection.onicegatheringstatechange = null;
	      context.peerConnection.onnegotiationneeded = null;
	      
	      context.peerConnection= null;
	    }
	    
	  }
	  function handleMessageEvent(event) {
	    logger.d("Signaling: Got command from server");

	    const message = JSON.parse(event.data);
	    const type = message.command;

	    logger.v(`-> Message: ${message.command}:`, message);

	    signalingEvents[type](message);
	  }

	  function replaceToStereoMode(sdp) {
	    return sdp.replace(
	      "a=fmtp:111 minptime=10;useinbandfec=1",
	      "a=fmtp:111 useinbandfec=1;minptime=10;stereo=1;cbr=1;maxaveragebitrate=128000"
	    );
	  }
	  function addStereoModeToRemoteDescription(sdp) {
	    return sdp.replace(
	      "a=rtpmap:111 opus/48000/2",
	      "a=rtpmap:111 opus/48000/2\na=fmtp:111 maxaveragebitrate=128000;stereo=1;cbr=1"
	    );
	  }

	  function replaceCodec(sdp, mLineReg, preferCodec) {
	    var mLine,
	      newMLine = [],
	      sdpCodec,
	      mLineSplit,
	      reg = new RegExp("a=rtpmap:(\\d+) " + preferCodec + "/\\d+");

	    mLine = sdp.match(mLineReg);
	    if (!mLine) {
	      return sdp;
	    }

	    sdpCodec = sdp.match(reg);
	    if (!sdpCodec) {
	      return sdp;
	    }

	    mLine = mLine[0];
	    sdpCodec = sdpCodec[1];

	    mLineSplit = mLine.split(" ");
	    newMLine.push(mLineSplit[0]);
	    newMLine.push(mLineSplit[1]);
	    newMLine.push(mLineSplit[2]);
	    newMLine.push(sdpCodec);

	    for (var i = 3; i < mLineSplit.length; i++) {
	      if (mLineSplit[i] !== sdpCodec) {
	        newMLine.push(mLineSplit[i]);
	      }
	    }
	    return sdp.replace(mLine, newMLine.join(" "));
	  }

	  // Helper method to munge an SDP to enable simulcasting (Chrome only)
	  function mungeSdpForSimulcasting(sdp) {
	    // Let's munge the SDP to add the attributes for enabling simulcasting
	    // (based on https://gist.github.com/ggarber/a19b4c33510028b9c657)
	    var lines = sdp.split("\r\n");
	    var video = false;
	    var ssrc = [-1],
	      ssrc_fid = [-1];
	    var cname = null,
	      msid = null,
	      mslabel = null,
	      label = null;
	    var insertAt = -1;
	    for (var i = 0; i < lines.length; i++) {
	      var mline = lines[i].match(/m=(\w+) */);
	      if (mline) {
	        var medium = mline[1];
	        if (medium === "video") {
	          // New video m-line: make sure it's the first one
	          if (ssrc[0] < 0) {
	            video = true;
	          } else {
	            // We're done, let's add the new attributes here
	            insertAt = i;
	            break;
	          }
	        } else {
	          // New non-video m-line: do we have what we were looking for?
	          if (ssrc[0] > -1) {
	            // We're done, let's add the new attributes here
	            insertAt = i;
	            break;
	          }
	        }
	        continue;
	      }
	      if (!video) continue;
	      var fid = lines[i].match(/a=ssrc-group:FID (\d+) (\d+)/);
	      if (fid) {
	        ssrc[0] = fid[1];
	        ssrc_fid[0] = fid[2];
	        lines.splice(i, 1);
	        i--;
	        continue;
	      }
	      if (ssrc[0]) {
	        var match = lines[i].match("a=ssrc:" + ssrc[0] + " cname:(.+)");
	        if (match) {
	          cname = match[1];
	        }
	        match = lines[i].match("a=ssrc:" + ssrc[0] + " msid:(.+)");
	        if (match) {
	          msid = match[1];
	        }
	        match = lines[i].match("a=ssrc:" + ssrc[0] + " mslabel:(.+)");
	        if (match) {
	          mslabel = match[1];
	        }
	        match = lines[i].match("a=ssrc:" + ssrc + " label:(.+)");
	        if (match) {
	          label = match[1];
	        }
	        if (lines[i].indexOf("a=ssrc:" + ssrc_fid) === 0) {
	          lines.splice(i, 1);
	          i--;
	          continue;
	        }
	        if (lines[i].indexOf("a=ssrc:" + ssrc[0]) === 0) {
	          lines.splice(i, 1);
	          i--;
	          continue;
	        }
	      }
	      if (lines[i].length == 0) {
	        lines.splice(i, 1);
	        i--;
	        continue;
	      }
	    }
	    if (ssrc[0] < 0) {
	      // Couldn't find a FID attribute, let's just take the first video SSRC we find
	      insertAt = -1;
	      video = false;
	      for (var i = 0; i < lines.length; i++) {
	        var mline = lines[i].match(/m=(\w+) */);
	        if (mline) {
	          var medium = mline[1];
	          if (medium === "video") {
	            // New video m-line: make sure it's the first one
	            if (ssrc[0] < 0) {
	              video = true;
	            } else {
	              // We're done, let's add the new attributes here
	              insertAt = i;
	              break;
	            }
	          } else {
	            // New non-video m-line: do we have what we were looking for?
	            if (ssrc[0] > -1) {
	              // We're done, let's add the new attributes here
	              insertAt = i;
	              break;
	            }
	          }
	          continue;
	        }
	        if (!video) continue;
	        if (ssrc[0] < 0) {
	          var value = lines[i].match(/a=ssrc:(\d+)/);
	          if (value) {
	            ssrc[0] = value[1];
	            lines.splice(i, 1);
	            i--;
	            continue;
	          }
	        } else {
	          var match = lines[i].match("a=ssrc:" + ssrc[0] + " cname:(.+)");
	          if (match) {
	            cname = match[1];
	          }
	          match = lines[i].match("a=ssrc:" + ssrc[0] + " msid:(.+)");
	          if (match) {
	            msid = match[1];
	          }
	          match = lines[i].match("a=ssrc:" + ssrc[0] + " mslabel:(.+)");
	          if (match) {
	            mslabel = match[1];
	          }
	          match = lines[i].match("a=ssrc:" + ssrc[0] + " label:(.+)");
	          if (match) {
	            label = match[1];
	          }
	          if (lines[i].indexOf("a=ssrc:" + ssrc_fid[0]) === 0) {
	            lines.splice(i, 1);
	            i--;
	            continue;
	          }
	          if (lines[i].indexOf("a=ssrc:" + ssrc[0]) === 0) {
	            lines.splice(i, 1);
	            i--;
	            continue;
	          }
	        }
	        if (lines[i].length == 0) {
	          lines.splice(i, 1);
	          i--;
	          continue;
	        }
	      }
	    }
	    if (ssrc[0] < 0) {
	      // Still nothing, let's just return the SDP we were asked to munge
	      logger.e("Couldn't find the video SSRC, simulcasting NOT enabled");
	      return sdp;
	    }
	    if (insertAt < 0) {
	      // Append at the end
	      insertAt = lines.length;
	    }
	    // Generate a couple of SSRCs (for retransmissions too)
	    // Note: should we check if there are conflicts, here?
	    ssrc[1] = Math.floor(Math.random() * 0xffffffff);
	    ssrc[2] = Math.floor(Math.random() * 0xffffffff);
	    ssrc_fid[1] = Math.floor(Math.random() * 0xffffffff);
	    ssrc_fid[2] = Math.floor(Math.random() * 0xffffffff);
	    // Add attributes to the SDP
	    for (var i = 0; i < ssrc.length; i++) {
	      if (cname) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc[i] + " cname:" + cname);
	        insertAt++;
	      }
	      if (msid) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc[i] + " msid:" + msid);
	        insertAt++;
	      }
	      if (mslabel) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc[i] + " mslabel:" + mslabel);
	        insertAt++;
	      }
	      if (label) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc[i] + " label:" + label);
	        insertAt++;
	      }
	      // Add the same info for the retransmission SSRC
	      if (cname) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc_fid[i] + " cname:" + cname);
	        insertAt++;
	      }
	      if (msid) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc_fid[i] + " msid:" + msid);
	        insertAt++;
	      }
	      if (mslabel) {
	        lines.splice(
	          insertAt,
	          0,
	          "a=ssrc:" + ssrc_fid[i] + " mslabel:" + mslabel
	        );
	        insertAt++;
	      }
	      if (label) {
	        lines.splice(insertAt, 0, "a=ssrc:" + ssrc_fid[i] + " label:" + label);
	        insertAt++;
	      }
	    }
	    lines.splice(
	      insertAt,
	      0,
	      "a=ssrc-group:FID " + ssrc[2] + " " + ssrc_fid[2]
	    );
	    lines.splice(
	      insertAt,
	      0,
	      "a=ssrc-group:FID " + ssrc[1] + " " + ssrc_fid[1]
	    );
	    lines.splice(
	      insertAt,
	      0,
	      "a=ssrc-group:FID " + ssrc[0] + " " + ssrc_fid[0]
	    );
	    lines.splice(
	      insertAt,
	      0,
	      "a=ssrc-group:SIM " + ssrc[0] + " " + ssrc[1] // 방송 품질 이슈로 2개 스트림만 사용
	    );
	    sdp = lines.join("\r\n");
	    if (!sdp.endsWith("\r\n")) sdp += "\r\n";
	    return sdp;
	  }

	  context.signalingConnection.onMessage(handleMessageEvent);
	}

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	let logDisabled_ = true;
	let deprecationWarnings_ = true;

	/**
	 * Extract browser version out of the provided user agent string.
	 *
	 * @param {!string} uastring userAgent string.
	 * @param {!string} expr Regular expression used as match criteria.
	 * @param {!number} pos position in the version string to be returned.
	 * @return {!number} browser version.
	 */
	function extractVersion(uastring, expr, pos) {
	  const match = uastring.match(expr);
	  return match && match.length >= pos && parseInt(match[pos], 10);
	}

	// Wraps the peerconnection event eventNameToWrap in a function
	// which returns the modified event object (or false to prevent
	// the event).
	function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
	  if (!window.RTCPeerConnection) {
	    return;
	  }
	  const proto = window.RTCPeerConnection.prototype;
	  const nativeAddEventListener = proto.addEventListener;
	  proto.addEventListener = function(nativeEventName, cb) {
	    if (nativeEventName !== eventNameToWrap) {
	      return nativeAddEventListener.apply(this, arguments);
	    }
	    const wrappedCallback = (e) => {
	      const modifiedEvent = wrapper(e);
	      if (modifiedEvent) {
	        cb(modifiedEvent);
	      }
	    };
	    this._eventMap = this._eventMap || {};
	    this._eventMap[cb] = wrappedCallback;
	    return nativeAddEventListener.apply(this, [nativeEventName,
	      wrappedCallback]);
	  };

	  const nativeRemoveEventListener = proto.removeEventListener;
	  proto.removeEventListener = function(nativeEventName, cb) {
	    if (nativeEventName !== eventNameToWrap || !this._eventMap
	        || !this._eventMap[cb]) {
	      return nativeRemoveEventListener.apply(this, arguments);
	    }
	    const unwrappedCb = this._eventMap[cb];
	    delete this._eventMap[cb];
	    return nativeRemoveEventListener.apply(this, [nativeEventName,
	      unwrappedCb]);
	  };

	  Object.defineProperty(proto, 'on' + eventNameToWrap, {
	    get() {
	      return this['_on' + eventNameToWrap];
	    },
	    set(cb) {
	      if (this['_on' + eventNameToWrap]) {
	        this.removeEventListener(eventNameToWrap,
	            this['_on' + eventNameToWrap]);
	        delete this['_on' + eventNameToWrap];
	      }
	      if (cb) {
	        this.addEventListener(eventNameToWrap,
	            this['_on' + eventNameToWrap] = cb);
	      }
	    },
	    enumerable: true,
	    configurable: true
	  });
	}

	function disableLog(bool) {
	  if (typeof bool !== 'boolean') {
	    return new Error('Argument type: ' + typeof bool +
	        '. Please use a boolean.');
	  }
	  logDisabled_ = bool;
	  return (bool) ? 'adapter.js logging disabled' :
	      'adapter.js logging enabled';
	}

	/**
	 * Disable or enable deprecation warnings
	 * @param {!boolean} bool set to true to disable warnings.
	 */
	function disableWarnings(bool) {
	  if (typeof bool !== 'boolean') {
	    return new Error('Argument type: ' + typeof bool +
	        '. Please use a boolean.');
	  }
	  deprecationWarnings_ = !bool;
	  return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
	}

	function log() {
	  if (typeof window === 'object') {
	    if (logDisabled_) {
	      return;
	    }
	    if (typeof console !== 'undefined' && typeof console.log === 'function') {
	      console.log.apply(console, arguments);
	    }
	  }
	}

	/**
	 * Shows a deprecation warning suggesting the modern and spec-compatible API.
	 */
	function deprecated(oldMethod, newMethod) {
	  if (!deprecationWarnings_) {
	    return;
	  }
	  console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
	      ' instead.');
	}

	/**
	 * Browser detector.
	 *
	 * @return {object} result containing browser and version
	 *     properties.
	 */
	function detectBrowser(window) {
	  const {navigator} = window;

	  // Returned result object.
	  const result = {browser: null, version: null};

	  // Fail early if it's not a browser
	  if (typeof window === 'undefined' || !window.navigator) {
	    result.browser = 'Not a browser.';
	    return result;
	  }

	  if (navigator.mozGetUserMedia) { // Firefox.
	    result.browser = 'firefox';
	    result.version = extractVersion(navigator.userAgent,
	        /Firefox\/(\d+)\./, 1);
	  } else if (navigator.webkitGetUserMedia) {
	    // Chrome, Chromium, Webview, Opera.
	    // Version matches Chrome/WebRTC version.
	    result.browser = 'chrome';
	    result.version = extractVersion(navigator.userAgent,
	        /Chrom(e|ium)\/(\d+)\./, 2);
	  } else if (navigator.mediaDevices &&
	      navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) { // Edge.
	    result.browser = 'edge';
	    result.version = extractVersion(navigator.userAgent,
	        /Edge\/(\d+).(\d+)$/, 2);
	  } else if (window.RTCPeerConnection &&
	      navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) { // Safari.
	    result.browser = 'safari';
	    result.version = extractVersion(navigator.userAgent,
	        /AppleWebKit\/(\d+)\./, 1);
	  } else { // Default fallthrough: not supported.
	    result.browser = 'Not a supported browser.';
	    return result;
	  }

	  return result;
	}

	/**
	 * Remove all empty objects and undefined values
	 * from a nested object -- an enhanced and vanilla version
	 * of Lodash's `compact`.
	 */
	function compactObject(data) {
	  if (typeof data !== 'object') {
	    return data;
	  }

	  return Object.keys(data).reduce(function(accumulator, key) {
	    const isObject = typeof data[key] === 'object';
	    const value = isObject ? compactObject(data[key]) : data[key];
	    const isEmptyObject = isObject && !Object.keys(value).length;
	    if (value === undefined || isEmptyObject) {
	      return accumulator;
	    }

	    return Object.assign(accumulator, {[key]: value});
	  }, {});
	}

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	const logging = log;

	function shimGetUserMedia(window) {
	  const navigator = window && window.navigator;

	  if (!navigator.mediaDevices) {
	    return;
	  }

	  const browserDetails = detectBrowser(window);

	  const constraintsToChrome_ = function(c) {
	    if (typeof c !== 'object' || c.mandatory || c.optional) {
	      return c;
	    }
	    const cc = {};
	    Object.keys(c).forEach(key => {
	      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	        return;
	      }
	      const r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
	      if (r.exact !== undefined && typeof r.exact === 'number') {
	        r.min = r.max = r.exact;
	      }
	      const oldname_ = function(prefix, name) {
	        if (prefix) {
	          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
	        }
	        return (name === 'deviceId') ? 'sourceId' : name;
	      };
	      if (r.ideal !== undefined) {
	        cc.optional = cc.optional || [];
	        let oc = {};
	        if (typeof r.ideal === 'number') {
	          oc[oldname_('min', key)] = r.ideal;
	          cc.optional.push(oc);
	          oc = {};
	          oc[oldname_('max', key)] = r.ideal;
	          cc.optional.push(oc);
	        } else {
	          oc[oldname_('', key)] = r.ideal;
	          cc.optional.push(oc);
	        }
	      }
	      if (r.exact !== undefined && typeof r.exact !== 'number') {
	        cc.mandatory = cc.mandatory || {};
	        cc.mandatory[oldname_('', key)] = r.exact;
	      } else {
	        ['min', 'max'].forEach(mix => {
	          if (r[mix] !== undefined) {
	            cc.mandatory = cc.mandatory || {};
	            cc.mandatory[oldname_(mix, key)] = r[mix];
	          }
	        });
	      }
	    });
	    if (c.advanced) {
	      cc.optional = (cc.optional || []).concat(c.advanced);
	    }
	    return cc;
	  };

	  const shimConstraints_ = function(constraints, func) {
	    if (browserDetails.version >= 61) {
	      return func(constraints);
	    }
	    constraints = JSON.parse(JSON.stringify(constraints));
	    if (constraints && typeof constraints.audio === 'object') {
	      const remap = function(obj, a, b) {
	        if (a in obj && !(b in obj)) {
	          obj[b] = obj[a];
	          delete obj[a];
	        }
	      };
	      constraints = JSON.parse(JSON.stringify(constraints));
	      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
	      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
	      constraints.audio = constraintsToChrome_(constraints.audio);
	    }
	    if (constraints && typeof constraints.video === 'object') {
	      // Shim facingMode for mobile & surface pro.
	      let face = constraints.video.facingMode;
	      face = face && ((typeof face === 'object') ? face : {ideal: face});
	      const getSupportedFacingModeLies = browserDetails.version < 66;

	      if ((face && (face.exact === 'user' || face.exact === 'environment' ||
	                    face.ideal === 'user' || face.ideal === 'environment')) &&
	          !(navigator.mediaDevices.getSupportedConstraints &&
	            navigator.mediaDevices.getSupportedConstraints().facingMode &&
	            !getSupportedFacingModeLies)) {
	        delete constraints.video.facingMode;
	        let matches;
	        if (face.exact === 'environment' || face.ideal === 'environment') {
	          matches = ['back', 'rear'];
	        } else if (face.exact === 'user' || face.ideal === 'user') {
	          matches = ['front'];
	        }
	        if (matches) {
	          // Look for matches in label, or use last cam for back (typical).
	          return navigator.mediaDevices.enumerateDevices()
	          .then(devices => {
	            devices = devices.filter(d => d.kind === 'videoinput');
	            let dev = devices.find(d => matches.some(match =>
	              d.label.toLowerCase().includes(match)));
	            if (!dev && devices.length && matches.includes('back')) {
	              dev = devices[devices.length - 1]; // more likely the back cam
	            }
	            if (dev) {
	              constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
	                                                        {ideal: dev.deviceId};
	            }
	            constraints.video = constraintsToChrome_(constraints.video);
	            logging('chrome: ' + JSON.stringify(constraints));
	            return func(constraints);
	          });
	        }
	      }
	      constraints.video = constraintsToChrome_(constraints.video);
	    }
	    logging('chrome: ' + JSON.stringify(constraints));
	    return func(constraints);
	  };

	  const shimError_ = function(e) {
	    if (browserDetails.version >= 64) {
	      return e;
	    }
	    return {
	      name: {
	        PermissionDeniedError: 'NotAllowedError',
	        PermissionDismissedError: 'NotAllowedError',
	        InvalidStateError: 'NotAllowedError',
	        DevicesNotFoundError: 'NotFoundError',
	        ConstraintNotSatisfiedError: 'OverconstrainedError',
	        TrackStartError: 'NotReadableError',
	        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
	        MediaDeviceKillSwitchOn: 'NotAllowedError',
	        TabCaptureError: 'AbortError',
	        ScreenCaptureError: 'AbortError',
	        DeviceCaptureError: 'AbortError'
	      }[e.name] || e.name,
	      message: e.message,
	      constraint: e.constraint || e.constraintName,
	      toString() {
	        return this.name + (this.message && ': ') + this.message;
	      }
	    };
	  };

	  const getUserMedia_ = function(constraints, onSuccess, onError) {
	    shimConstraints_(constraints, c => {
	      navigator.webkitGetUserMedia(c, onSuccess, e => {
	        if (onError) {
	          onError(shimError_(e));
	        }
	      });
	    });
	  };
	  navigator.getUserMedia = getUserMedia_.bind(navigator);

	  // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
	  // function which returns a Promise, it does not accept spec-style
	  // constraints.
	  const origGetUserMedia = navigator.mediaDevices.getUserMedia.
	      bind(navigator.mediaDevices);
	  navigator.mediaDevices.getUserMedia = function(cs) {
	    return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
	      if (c.audio && !stream.getAudioTracks().length ||
	          c.video && !stream.getVideoTracks().length) {
	        stream.getTracks().forEach(track => {
	          track.stop();
	        });
	        throw new DOMException('', 'NotFoundError');
	      }
	      return stream;
	    }, e => Promise.reject(shimError_(e))));
	  };
	}

	/*
	 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	function shimGetDisplayMedia(window, getSourceId) {
	  if (window.navigator.mediaDevices &&
	    'getDisplayMedia' in window.navigator.mediaDevices) {
	    return;
	  }
	  if (!(window.navigator.mediaDevices)) {
	    return;
	  }
	  // getSourceId is a function that returns a promise resolving with
	  // the sourceId of the screen/window/tab to be shared.
	  if (typeof getSourceId !== 'function') {
	    console.error('shimGetDisplayMedia: getSourceId argument is not ' +
	        'a function');
	    return;
	  }
	  window.navigator.mediaDevices.getDisplayMedia = function(constraints) {
	    return getSourceId(constraints)
	      .then(sourceId => {
	        const widthSpecified = constraints.video && constraints.video.width;
	        const heightSpecified = constraints.video && constraints.video.height;
	        const frameRateSpecified = constraints.video &&
	          constraints.video.frameRate;
	        constraints.video = {
	          mandatory: {
	            chromeMediaSource: 'desktop',
	            chromeMediaSourceId: sourceId,
	            maxFrameRate: frameRateSpecified || 3
	          }
	        };
	        if (widthSpecified) {
	          constraints.video.mandatory.maxWidth = widthSpecified;
	        }
	        if (heightSpecified) {
	          constraints.video.mandatory.maxHeight = heightSpecified;
	        }
	        return window.navigator.mediaDevices.getUserMedia(constraints);
	      });
	  };
	}

	/* iterates the stats graph recursively. */
	function walkStats(stats, base, resultSet) {
	  if (!base || resultSet.has(base.id)) {
	    return;
	  }
	  resultSet.set(base.id, base);
	  Object.keys(base).forEach(name => {
	    if (name.endsWith('Id')) {
	      walkStats(stats, stats.get(base[name]), resultSet);
	    } else if (name.endsWith('Ids')) {
	      base[name].forEach(id => {
	        walkStats(stats, stats.get(id), resultSet);
	      });
	    }
	  });
	}

	/* filter getStats for a sender/receiver track. */
	function filterStats(result, track, outbound) {
	  const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
	  const filteredResult = new Map();
	  if (track === null) {
	    return filteredResult;
	  }
	  const trackStats = [];
	  result.forEach(value => {
	    if (value.type === 'track' &&
	        value.trackIdentifier === track.id) {
	      trackStats.push(value);
	    }
	  });
	  trackStats.forEach(trackStat => {
	    result.forEach(stats => {
	      if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
	        walkStats(result, stats, filteredResult);
	      }
	    });
	  });
	  return filteredResult;
	}

	function shimMediaStream(window) {
	  window.MediaStream = window.MediaStream || window.webkitMediaStream;
	}

	function shimOnTrack(window) {
	  if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
	      window.RTCPeerConnection.prototype)) {
	    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	      get() {
	        return this._ontrack;
	      },
	      set(f) {
	        if (this._ontrack) {
	          this.removeEventListener('track', this._ontrack);
	        }
	        this.addEventListener('track', this._ontrack = f);
	      },
	      enumerable: true,
	      configurable: true
	    });
	    const origSetRemoteDescription =
	        window.RTCPeerConnection.prototype.setRemoteDescription;
	    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
	      if (!this._ontrackpoly) {
	        this._ontrackpoly = (e) => {
	          // onaddstream does not fire when a track is added to an existing
	          // stream. But stream.onaddtrack is implemented so we use that.
	          e.stream.addEventListener('addtrack', te => {
	            let receiver;
	            if (window.RTCPeerConnection.prototype.getReceivers) {
	              receiver = this.getReceivers()
	                .find(r => r.track && r.track.id === te.track.id);
	            } else {
	              receiver = {track: te.track};
	            }

	            const event = new Event('track');
	            event.track = te.track;
	            event.receiver = receiver;
	            event.transceiver = {receiver};
	            event.streams = [e.stream];
	            this.dispatchEvent(event);
	          });
	          e.stream.getTracks().forEach(track => {
	            let receiver;
	            if (window.RTCPeerConnection.prototype.getReceivers) {
	              receiver = this.getReceivers()
	                .find(r => r.track && r.track.id === track.id);
	            } else {
	              receiver = {track};
	            }
	            const event = new Event('track');
	            event.track = track;
	            event.receiver = receiver;
	            event.transceiver = {receiver};
	            event.streams = [e.stream];
	            this.dispatchEvent(event);
	          });
	        };
	        this.addEventListener('addstream', this._ontrackpoly);
	      }
	      return origSetRemoteDescription.apply(this, arguments);
	    };
	  } else {
	    // even if RTCRtpTransceiver is in window, it is only used and
	    // emitted in unified-plan. Unfortunately this means we need
	    // to unconditionally wrap the event.
	    wrapPeerConnectionEvent(window, 'track', e => {
	      if (!e.transceiver) {
	        Object.defineProperty(e, 'transceiver',
	          {value: {receiver: e.receiver}});
	      }
	      return e;
	    });
	  }
	}

	function shimGetSendersWithDtmf(window) {
	  // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
	  if (typeof window === 'object' && window.RTCPeerConnection &&
	      !('getSenders' in window.RTCPeerConnection.prototype) &&
	      'createDTMFSender' in window.RTCPeerConnection.prototype) {
	    const shimSenderWithDtmf = function(pc, track) {
	      return {
	        track,
	        get dtmf() {
	          if (this._dtmf === undefined) {
	            if (track.kind === 'audio') {
	              this._dtmf = pc.createDTMFSender(track);
	            } else {
	              this._dtmf = null;
	            }
	          }
	          return this._dtmf;
	        },
	        _pc: pc
	      };
	    };

	    // augment addTrack when getSenders is not available.
	    if (!window.RTCPeerConnection.prototype.getSenders) {
	      window.RTCPeerConnection.prototype.getSenders = function() {
	        this._senders = this._senders || [];
	        return this._senders.slice(); // return a copy of the internal state.
	      };
	      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	      window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	        let sender = origAddTrack.apply(this, arguments);
	        if (!sender) {
	          sender = shimSenderWithDtmf(this, track);
	          this._senders.push(sender);
	        }
	        return sender;
	      };

	      const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
	      window.RTCPeerConnection.prototype.removeTrack = function(sender) {
	        origRemoveTrack.apply(this, arguments);
	        const idx = this._senders.indexOf(sender);
	        if (idx !== -1) {
	          this._senders.splice(idx, 1);
	        }
	      };
	    }
	    const origAddStream = window.RTCPeerConnection.prototype.addStream;
	    window.RTCPeerConnection.prototype.addStream = function(stream) {
	      this._senders = this._senders || [];
	      origAddStream.apply(this, [stream]);
	      stream.getTracks().forEach(track => {
	        this._senders.push(shimSenderWithDtmf(this, track));
	      });
	    };

	    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
	    window.RTCPeerConnection.prototype.removeStream = function(stream) {
	      this._senders = this._senders || [];
	      origRemoveStream.apply(this, [stream]);

	      stream.getTracks().forEach(track => {
	        const sender = this._senders.find(s => s.track === track);
	        if (sender) { // remove sender
	          this._senders.splice(this._senders.indexOf(sender), 1);
	        }
	      });
	    };
	  } else if (typeof window === 'object' && window.RTCPeerConnection &&
	             'getSenders' in window.RTCPeerConnection.prototype &&
	             'createDTMFSender' in window.RTCPeerConnection.prototype &&
	             window.RTCRtpSender &&
	             !('dtmf' in window.RTCRtpSender.prototype)) {
	    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
	    window.RTCPeerConnection.prototype.getSenders = function() {
	      const senders = origGetSenders.apply(this, []);
	      senders.forEach(sender => sender._pc = this);
	      return senders;
	    };

	    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
	      get() {
	        if (this._dtmf === undefined) {
	          if (this.track.kind === 'audio') {
	            this._dtmf = this._pc.createDTMFSender(this.track);
	          } else {
	            this._dtmf = null;
	          }
	        }
	        return this._dtmf;
	      }
	    });
	  }
	}

	function shimSenderReceiverGetStats(window) {
	  if (!(typeof window === 'object' && window.RTCPeerConnection &&
	      window.RTCRtpSender && window.RTCRtpReceiver)) {
	    return;
	  }

	  // shim sender stats.
	  if (!('getStats' in window.RTCRtpSender.prototype)) {
	    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
	    if (origGetSenders) {
	      window.RTCPeerConnection.prototype.getSenders = function() {
	        const senders = origGetSenders.apply(this, []);
	        senders.forEach(sender => sender._pc = this);
	        return senders;
	      };
	    }

	    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	    if (origAddTrack) {
	      window.RTCPeerConnection.prototype.addTrack = function() {
	        const sender = origAddTrack.apply(this, arguments);
	        sender._pc = this;
	        return sender;
	      };
	    }
	    window.RTCRtpSender.prototype.getStats = function() {
	      const sender = this;
	      return this._pc.getStats().then(result =>
	        /* Note: this will include stats of all senders that
	         *   send a track with the same id as sender.track as
	         *   it is not possible to identify the RTCRtpSender.
	         */
	        filterStats(result, sender.track, true));
	    };
	  }

	  // shim receiver stats.
	  if (!('getStats' in window.RTCRtpReceiver.prototype)) {
	    const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
	    if (origGetReceivers) {
	      window.RTCPeerConnection.prototype.getReceivers = function() {
	        const receivers = origGetReceivers.apply(this, []);
	        receivers.forEach(receiver => receiver._pc = this);
	        return receivers;
	      };
	    }
	    wrapPeerConnectionEvent(window, 'track', e => {
	      e.receiver._pc = e.srcElement;
	      return e;
	    });
	    window.RTCRtpReceiver.prototype.getStats = function() {
	      const receiver = this;
	      return this._pc.getStats().then(result =>
	        filterStats(result, receiver.track, false));
	    };
	  }

	  if (!('getStats' in window.RTCRtpSender.prototype &&
	      'getStats' in window.RTCRtpReceiver.prototype)) {
	    return;
	  }

	  // shim RTCPeerConnection.getStats(track).
	  const origGetStats = window.RTCPeerConnection.prototype.getStats;
	  window.RTCPeerConnection.prototype.getStats = function() {
	    if (arguments.length > 0 &&
	        arguments[0] instanceof window.MediaStreamTrack) {
	      const track = arguments[0];
	      let sender;
	      let receiver;
	      let err;
	      this.getSenders().forEach(s => {
	        if (s.track === track) {
	          if (sender) {
	            err = true;
	          } else {
	            sender = s;
	          }
	        }
	      });
	      this.getReceivers().forEach(r => {
	        if (r.track === track) {
	          if (receiver) {
	            err = true;
	          } else {
	            receiver = r;
	          }
	        }
	        return r.track === track;
	      });
	      if (err || (sender && receiver)) {
	        return Promise.reject(new DOMException(
	          'There are more than one sender or receiver for the track.',
	          'InvalidAccessError'));
	      } else if (sender) {
	        return sender.getStats();
	      } else if (receiver) {
	        return receiver.getStats();
	      }
	      return Promise.reject(new DOMException(
	        'There is no sender or receiver for the track.',
	        'InvalidAccessError'));
	    }
	    return origGetStats.apply(this, arguments);
	  };
	}

	function shimAddTrackRemoveTrackWithNative(window) {
	  // shim addTrack/removeTrack with native variants in order to make
	  // the interactions with legacy getLocalStreams behave as in other browsers.
	  // Keeps a mapping stream.id => [stream, rtpsenders...]
	  window.RTCPeerConnection.prototype.getLocalStreams = function() {
	    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
	    return Object.keys(this._shimmedLocalStreams)
	      .map(streamId => this._shimmedLocalStreams[streamId][0]);
	  };

	  const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	  window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	    if (!stream) {
	      return origAddTrack.apply(this, arguments);
	    }
	    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

	    const sender = origAddTrack.apply(this, arguments);
	    if (!this._shimmedLocalStreams[stream.id]) {
	      this._shimmedLocalStreams[stream.id] = [stream, sender];
	    } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
	      this._shimmedLocalStreams[stream.id].push(sender);
	    }
	    return sender;
	  };

	  const origAddStream = window.RTCPeerConnection.prototype.addStream;
	  window.RTCPeerConnection.prototype.addStream = function(stream) {
	    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

	    stream.getTracks().forEach(track => {
	      const alreadyExists = this.getSenders().find(s => s.track === track);
	      if (alreadyExists) {
	        throw new DOMException('Track already exists.',
	            'InvalidAccessError');
	      }
	    });
	    const existingSenders = this.getSenders();
	    origAddStream.apply(this, arguments);
	    const newSenders = this.getSenders()
	      .filter(newSender => existingSenders.indexOf(newSender) === -1);
	    this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
	  };

	  const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
	  window.RTCPeerConnection.prototype.removeStream = function(stream) {
	    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
	    delete this._shimmedLocalStreams[stream.id];
	    return origRemoveStream.apply(this, arguments);
	  };

	  const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
	  window.RTCPeerConnection.prototype.removeTrack = function(sender) {
	    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
	    if (sender) {
	      Object.keys(this._shimmedLocalStreams).forEach(streamId => {
	        const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
	        if (idx !== -1) {
	          this._shimmedLocalStreams[streamId].splice(idx, 1);
	        }
	        if (this._shimmedLocalStreams[streamId].length === 1) {
	          delete this._shimmedLocalStreams[streamId];
	        }
	      });
	    }
	    return origRemoveTrack.apply(this, arguments);
	  };
	}

	function shimAddTrackRemoveTrack(window) {
	  if (!window.RTCPeerConnection) {
	    return;
	  }
	  const browserDetails = detectBrowser(window);
	  // shim addTrack and removeTrack.
	  if (window.RTCPeerConnection.prototype.addTrack &&
	      browserDetails.version >= 65) {
	    return shimAddTrackRemoveTrackWithNative(window);
	  }

	  // also shim pc.getLocalStreams when addTrack is shimmed
	  // to return the original streams.
	  const origGetLocalStreams = window.RTCPeerConnection.prototype
	      .getLocalStreams;
	  window.RTCPeerConnection.prototype.getLocalStreams = function() {
	    const nativeStreams = origGetLocalStreams.apply(this);
	    this._reverseStreams = this._reverseStreams || {};
	    return nativeStreams.map(stream => this._reverseStreams[stream.id]);
	  };

	  const origAddStream = window.RTCPeerConnection.prototype.addStream;
	  window.RTCPeerConnection.prototype.addStream = function(stream) {
	    this._streams = this._streams || {};
	    this._reverseStreams = this._reverseStreams || {};

	    stream.getTracks().forEach(track => {
	      const alreadyExists = this.getSenders().find(s => s.track === track);
	      if (alreadyExists) {
	        throw new DOMException('Track already exists.',
	            'InvalidAccessError');
	      }
	    });
	    // Add identity mapping for consistency with addTrack.
	    // Unless this is being used with a stream from addTrack.
	    if (!this._reverseStreams[stream.id]) {
	      const newStream = new window.MediaStream(stream.getTracks());
	      this._streams[stream.id] = newStream;
	      this._reverseStreams[newStream.id] = stream;
	      stream = newStream;
	    }
	    origAddStream.apply(this, [stream]);
	  };

	  const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
	  window.RTCPeerConnection.prototype.removeStream = function(stream) {
	    this._streams = this._streams || {};
	    this._reverseStreams = this._reverseStreams || {};

	    origRemoveStream.apply(this, [(this._streams[stream.id] || stream)]);
	    delete this._reverseStreams[(this._streams[stream.id] ?
	        this._streams[stream.id].id : stream.id)];
	    delete this._streams[stream.id];
	  };

	  window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	    if (this.signalingState === 'closed') {
	      throw new DOMException(
	        'The RTCPeerConnection\'s signalingState is \'closed\'.',
	        'InvalidStateError');
	    }
	    const streams = [].slice.call(arguments, 1);
	    if (streams.length !== 1 ||
	        !streams[0].getTracks().find(t => t === track)) {
	      // this is not fully correct but all we can manage without
	      // [[associated MediaStreams]] internal slot.
	      throw new DOMException(
	        'The adapter.js addTrack polyfill only supports a single ' +
	        ' stream which is associated with the specified track.',
	        'NotSupportedError');
	    }

	    const alreadyExists = this.getSenders().find(s => s.track === track);
	    if (alreadyExists) {
	      throw new DOMException('Track already exists.',
	          'InvalidAccessError');
	    }

	    this._streams = this._streams || {};
	    this._reverseStreams = this._reverseStreams || {};
	    const oldStream = this._streams[stream.id];
	    if (oldStream) {
	      // this is using odd Chrome behaviour, use with caution:
	      // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
	      // Note: we rely on the high-level addTrack/dtmf shim to
	      // create the sender with a dtmf sender.
	      oldStream.addTrack(track);

	      // Trigger ONN async.
	      Promise.resolve().then(() => {
	        this.dispatchEvent(new Event('negotiationneeded'));
	      });
	    } else {
	      const newStream = new window.MediaStream([track]);
	      this._streams[stream.id] = newStream;
	      this._reverseStreams[newStream.id] = stream;
	      this.addStream(newStream);
	    }
	    return this.getSenders().find(s => s.track === track);
	  };

	  // replace the internal stream id with the external one and
	  // vice versa.
	  function replaceInternalStreamId(pc, description) {
	    let sdp = description.sdp;
	    Object.keys(pc._reverseStreams || []).forEach(internalId => {
	      const externalStream = pc._reverseStreams[internalId];
	      const internalStream = pc._streams[externalStream.id];
	      sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
	          externalStream.id);
	    });
	    return new RTCSessionDescription({
	      type: description.type,
	      sdp
	    });
	  }
	  function replaceExternalStreamId(pc, description) {
	    let sdp = description.sdp;
	    Object.keys(pc._reverseStreams || []).forEach(internalId => {
	      const externalStream = pc._reverseStreams[internalId];
	      const internalStream = pc._streams[externalStream.id];
	      sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
	          internalStream.id);
	    });
	    return new RTCSessionDescription({
	      type: description.type,
	      sdp
	    });
	  }
	  ['createOffer', 'createAnswer'].forEach(function(method) {
	    const nativeMethod = window.RTCPeerConnection.prototype[method];
	    window.RTCPeerConnection.prototype[method] = function() {
	      const args = arguments;
	      const isLegacyCall = arguments.length &&
	          typeof arguments[0] === 'function';
	      if (isLegacyCall) {
	        return nativeMethod.apply(this, [
	          (description) => {
	            const desc = replaceInternalStreamId(this, description);
	            args[0].apply(null, [desc]);
	          },
	          (err) => {
	            if (args[1]) {
	              args[1].apply(null, err);
	            }
	          }, arguments[2]
	        ]);
	      }
	      return nativeMethod.apply(this, arguments)
	      .then(description => replaceInternalStreamId(this, description));
	    };
	  });

	  const origSetLocalDescription =
	      window.RTCPeerConnection.prototype.setLocalDescription;
	  window.RTCPeerConnection.prototype.setLocalDescription = function() {
	    if (!arguments.length || !arguments[0].type) {
	      return origSetLocalDescription.apply(this, arguments);
	    }
	    arguments[0] = replaceExternalStreamId(this, arguments[0]);
	    return origSetLocalDescription.apply(this, arguments);
	  };

	  // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

	  const origLocalDescription = Object.getOwnPropertyDescriptor(
	      window.RTCPeerConnection.prototype, 'localDescription');
	  Object.defineProperty(window.RTCPeerConnection.prototype,
	      'localDescription', {
	        get() {
	          const description = origLocalDescription.get.apply(this);
	          if (description.type === '') {
	            return description;
	          }
	          return replaceInternalStreamId(this, description);
	        }
	      });

	  window.RTCPeerConnection.prototype.removeTrack = function(sender) {
	    if (this.signalingState === 'closed') {
	      throw new DOMException(
	        'The RTCPeerConnection\'s signalingState is \'closed\'.',
	        'InvalidStateError');
	    }
	    // We can not yet check for sender instanceof RTCRtpSender
	    // since we shim RTPSender. So we check if sender._pc is set.
	    if (!sender._pc) {
	      throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
	          'does not implement interface RTCRtpSender.', 'TypeError');
	    }
	    const isLocal = sender._pc === this;
	    if (!isLocal) {
	      throw new DOMException('Sender was not created by this connection.',
	          'InvalidAccessError');
	    }

	    // Search for the native stream the senders track belongs to.
	    this._streams = this._streams || {};
	    let stream;
	    Object.keys(this._streams).forEach(streamid => {
	      const hasTrack = this._streams[streamid].getTracks()
	        .find(track => sender.track === track);
	      if (hasTrack) {
	        stream = this._streams[streamid];
	      }
	    });

	    if (stream) {
	      if (stream.getTracks().length === 1) {
	        // if this is the last track of the stream, remove the stream. This
	        // takes care of any shimmed _senders.
	        this.removeStream(this._reverseStreams[stream.id]);
	      } else {
	        // relying on the same odd chrome behaviour as above.
	        stream.removeTrack(sender.track);
	      }
	      this.dispatchEvent(new Event('negotiationneeded'));
	    }
	  };
	}

	function shimPeerConnection(window) {
	  if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
	    // very basic support for old versions.
	    window.RTCPeerConnection = window.webkitRTCPeerConnection;
	  }
	  if (!window.RTCPeerConnection) {
	    return;
	  }

	  const origGetStats = window.RTCPeerConnection.prototype.getStats;
	  window.RTCPeerConnection.prototype.getStats = function(selector,
	      successCallback, errorCallback) {
	    const args = arguments;

	    // If selector is a function then we are in the old style stats so just
	    // pass back the original getStats format to avoid breaking old users.
	    if (arguments.length > 0 && typeof selector === 'function') {
	      return origGetStats.apply(this, arguments);
	    }

	    // When spec-style getStats is supported, return those when called with
	    // either no arguments or the selector argument is null.
	    if (origGetStats.length === 0 && (arguments.length === 0 ||
	        typeof arguments[0] !== 'function')) {
	      return origGetStats.apply(this, []);
	    }

	    const fixChromeStats_ = function(response) {
	      const standardReport = {};
	      const reports = response.result();
	      reports.forEach(report => {
	        const standardStats = {
	          id: report.id,
	          timestamp: report.timestamp,
	          type: {
	            localcandidate: 'local-candidate',
	            remotecandidate: 'remote-candidate'
	          }[report.type] || report.type
	        };
	        report.names().forEach(name => {
	          standardStats[name] = report.stat(name);
	        });
	        standardReport[standardStats.id] = standardStats;
	      });

	      return standardReport;
	    };

	    // shim getStats with maplike support
	    const makeMapStats = function(stats) {
	      return new Map(Object.keys(stats).map(key => [key, stats[key]]));
	    };

	    if (arguments.length >= 2) {
	      const successCallbackWrapper_ = function(response) {
	        args[1](makeMapStats(fixChromeStats_(response)));
	      };

	      return origGetStats.apply(this, [successCallbackWrapper_,
	        arguments[0]]);
	    }

	    // promise-support
	    return new Promise((resolve, reject) => {
	      origGetStats.apply(this, [
	        function(response) {
	          resolve(makeMapStats(fixChromeStats_(response)));
	        }, reject]);
	    }).then(successCallback, errorCallback);
	  };

	  // shim implicit creation of RTCSessionDescription/RTCIceCandidate
	  ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	      .forEach(function(method) {
	        const nativeMethod = window.RTCPeerConnection.prototype[method];
	        window.RTCPeerConnection.prototype[method] = function() {
	          arguments[0] = new ((method === 'addIceCandidate') ?
	              window.RTCIceCandidate :
	              window.RTCSessionDescription)(arguments[0]);
	          return nativeMethod.apply(this, arguments);
	        };
	      });

	  // support for addIceCandidate(null or undefined)
	  const nativeAddIceCandidate =
	      window.RTCPeerConnection.prototype.addIceCandidate;
	  window.RTCPeerConnection.prototype.addIceCandidate = function() {
	    if (!arguments[0]) {
	      if (arguments[1]) {
	        arguments[1].apply(null);
	      }
	      return Promise.resolve();
	    }
	    return nativeAddIceCandidate.apply(this, arguments);
	  };
	}

	function fixNegotiationNeeded(window) {
	  wrapPeerConnectionEvent(window, 'negotiationneeded', e => {
	    const pc = e.target;
	    if (pc.signalingState !== 'stable') {
	      return;
	    }
	    return e;
	  });
	}

	var chromeShim = /*#__PURE__*/Object.freeze({
		shimMediaStream: shimMediaStream,
		shimOnTrack: shimOnTrack,
		shimGetSendersWithDtmf: shimGetSendersWithDtmf,
		shimSenderReceiverGetStats: shimSenderReceiverGetStats,
		shimAddTrackRemoveTrackWithNative: shimAddTrackRemoveTrackWithNative,
		shimAddTrackRemoveTrack: shimAddTrackRemoveTrack,
		shimPeerConnection: shimPeerConnection,
		fixNegotiationNeeded: fixNegotiationNeeded,
		shimGetUserMedia: shimGetUserMedia,
		shimGetDisplayMedia: shimGetDisplayMedia
	});

	/*
	 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	// Edge does not like
	// 1) stun: filtered after 14393 unless ?transport=udp is present
	// 2) turn: that does not have all of turn:host:port?transport=udp
	// 3) turn: with ipv6 addresses
	// 4) turn: occurring muliple times
	function filterIceServers(iceServers, edgeVersion) {
	  let hasTurn = false;
	  iceServers = JSON.parse(JSON.stringify(iceServers));
	  return iceServers.filter(server => {
	    if (server && (server.urls || server.url)) {
	      var urls = server.urls || server.url;
	      if (server.url && !server.urls) {
	        deprecated('RTCIceServer.url', 'RTCIceServer.urls');
	      }
	      const isString = typeof urls === 'string';
	      if (isString) {
	        urls = [urls];
	      }
	      urls = urls.filter(url => {
	        // filter STUN unconditionally.
	        if (url.indexOf('stun:') === 0) {
	          return false;
	        }

	        const validTurn = url.startsWith('turn') &&
	            !url.startsWith('turn:[') &&
	            url.includes('transport=udp');
	        if (validTurn && !hasTurn) {
	          hasTurn = true;
	          return true;
	        }
	        return validTurn && !hasTurn;
	      });

	      delete server.url;
	      server.urls = isString ? urls[0] : urls;
	      return !!urls.length;
	    }
	  });
	}

	var sdp = createCommonjsModule(function (module) {

	// SDP helpers.
	var SDPUtils = {};

	// Generate an alphanumeric identifier for cname or mids.
	// TODO: use UUIDs instead? https://gist.github.com/jed/982883
	SDPUtils.generateIdentifier = function() {
	  return Math.random().toString(36).substr(2, 10);
	};

	// The RTCP CNAME used by all peerconnections from the same JS.
	SDPUtils.localCName = SDPUtils.generateIdentifier();

	// Splits SDP into lines, dealing with both CRLF and LF.
	SDPUtils.splitLines = function(blob) {
	  return blob.trim().split('\n').map(function(line) {
	    return line.trim();
	  });
	};
	// Splits SDP into sessionpart and mediasections. Ensures CRLF.
	SDPUtils.splitSections = function(blob) {
	  var parts = blob.split('\nm=');
	  return parts.map(function(part, index) {
	    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
	  });
	};

	// returns the session description.
	SDPUtils.getDescription = function(blob) {
	  var sections = SDPUtils.splitSections(blob);
	  return sections && sections[0];
	};

	// returns the individual media sections.
	SDPUtils.getMediaSections = function(blob) {
	  var sections = SDPUtils.splitSections(blob);
	  sections.shift();
	  return sections;
	};

	// Returns lines that start with a certain prefix.
	SDPUtils.matchPrefix = function(blob, prefix) {
	  return SDPUtils.splitLines(blob).filter(function(line) {
	    return line.indexOf(prefix) === 0;
	  });
	};

	// Parses an ICE candidate line. Sample input:
	// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
	// rport 55996"
	SDPUtils.parseCandidate = function(line) {
	  var parts;
	  // Parse both variants.
	  if (line.indexOf('a=candidate:') === 0) {
	    parts = line.substring(12).split(' ');
	  } else {
	    parts = line.substring(10).split(' ');
	  }

	  var candidate = {
	    foundation: parts[0],
	    component: parseInt(parts[1], 10),
	    protocol: parts[2].toLowerCase(),
	    priority: parseInt(parts[3], 10),
	    ip: parts[4],
	    address: parts[4], // address is an alias for ip.
	    port: parseInt(parts[5], 10),
	    // skip parts[6] == 'typ'
	    type: parts[7]
	  };

	  for (var i = 8; i < parts.length; i += 2) {
	    switch (parts[i]) {
	      case 'raddr':
	        candidate.relatedAddress = parts[i + 1];
	        break;
	      case 'rport':
	        candidate.relatedPort = parseInt(parts[i + 1], 10);
	        break;
	      case 'tcptype':
	        candidate.tcpType = parts[i + 1];
	        break;
	      case 'ufrag':
	        candidate.ufrag = parts[i + 1]; // for backward compability.
	        candidate.usernameFragment = parts[i + 1];
	        break;
	      default: // extension handling, in particular ufrag
	        candidate[parts[i]] = parts[i + 1];
	        break;
	    }
	  }
	  return candidate;
	};

	// Translates a candidate object into SDP candidate attribute.
	SDPUtils.writeCandidate = function(candidate) {
	  var sdp = [];
	  sdp.push(candidate.foundation);
	  sdp.push(candidate.component);
	  sdp.push(candidate.protocol.toUpperCase());
	  sdp.push(candidate.priority);
	  sdp.push(candidate.address || candidate.ip);
	  sdp.push(candidate.port);

	  var type = candidate.type;
	  sdp.push('typ');
	  sdp.push(type);
	  if (type !== 'host' && candidate.relatedAddress &&
	      candidate.relatedPort) {
	    sdp.push('raddr');
	    sdp.push(candidate.relatedAddress);
	    sdp.push('rport');
	    sdp.push(candidate.relatedPort);
	  }
	  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
	    sdp.push('tcptype');
	    sdp.push(candidate.tcpType);
	  }
	  if (candidate.usernameFragment || candidate.ufrag) {
	    sdp.push('ufrag');
	    sdp.push(candidate.usernameFragment || candidate.ufrag);
	  }
	  return 'candidate:' + sdp.join(' ');
	};

	// Parses an ice-options line, returns an array of option tags.
	// a=ice-options:foo bar
	SDPUtils.parseIceOptions = function(line) {
	  return line.substr(14).split(' ');
	};

	// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
	// a=rtpmap:111 opus/48000/2
	SDPUtils.parseRtpMap = function(line) {
	  var parts = line.substr(9).split(' ');
	  var parsed = {
	    payloadType: parseInt(parts.shift(), 10) // was: id
	  };

	  parts = parts[0].split('/');

	  parsed.name = parts[0];
	  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
	  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
	  // legacy alias, got renamed back to channels in ORTC.
	  parsed.numChannels = parsed.channels;
	  return parsed;
	};

	// Generate an a=rtpmap line from RTCRtpCodecCapability or
	// RTCRtpCodecParameters.
	SDPUtils.writeRtpMap = function(codec) {
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  var channels = codec.channels || codec.numChannels || 1;
	  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
	      (channels !== 1 ? '/' + channels : '') + '\r\n';
	};

	// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
	// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
	// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
	SDPUtils.parseExtmap = function(line) {
	  var parts = line.substr(9).split(' ');
	  return {
	    id: parseInt(parts[0], 10),
	    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
	    uri: parts[1]
	  };
	};

	// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
	// RTCRtpHeaderExtension.
	SDPUtils.writeExtmap = function(headerExtension) {
	  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
	      (headerExtension.direction && headerExtension.direction !== 'sendrecv'
	          ? '/' + headerExtension.direction
	          : '') +
	      ' ' + headerExtension.uri + '\r\n';
	};

	// Parses an ftmp line, returns dictionary. Sample input:
	// a=fmtp:96 vbr=on;cng=on
	// Also deals with vbr=on; cng=on
	SDPUtils.parseFmtp = function(line) {
	  var parsed = {};
	  var kv;
	  var parts = line.substr(line.indexOf(' ') + 1).split(';');
	  for (var j = 0; j < parts.length; j++) {
	    kv = parts[j].trim().split('=');
	    parsed[kv[0].trim()] = kv[1];
	  }
	  return parsed;
	};

	// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeFmtp = function(codec) {
	  var line = '';
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  if (codec.parameters && Object.keys(codec.parameters).length) {
	    var params = [];
	    Object.keys(codec.parameters).forEach(function(param) {
	      if (codec.parameters[param]) {
	        params.push(param + '=' + codec.parameters[param]);
	      } else {
	        params.push(param);
	      }
	    });
	    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
	  }
	  return line;
	};

	// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
	// a=rtcp-fb:98 nack rpsi
	SDPUtils.parseRtcpFb = function(line) {
	  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
	  return {
	    type: parts.shift(),
	    parameter: parts.join(' ')
	  };
	};
	// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeRtcpFb = function(codec) {
	  var lines = '';
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
	    // FIXME: special handling for trr-int?
	    codec.rtcpFeedback.forEach(function(fb) {
	      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
	      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
	          '\r\n';
	    });
	  }
	  return lines;
	};

	// Parses an RFC 5576 ssrc media attribute. Sample input:
	// a=ssrc:3735928559 cname:something
	SDPUtils.parseSsrcMedia = function(line) {
	  var sp = line.indexOf(' ');
	  var parts = {
	    ssrc: parseInt(line.substr(7, sp - 7), 10)
	  };
	  var colon = line.indexOf(':', sp);
	  if (colon > -1) {
	    parts.attribute = line.substr(sp + 1, colon - sp - 1);
	    parts.value = line.substr(colon + 1);
	  } else {
	    parts.attribute = line.substr(sp + 1);
	  }
	  return parts;
	};

	SDPUtils.parseSsrcGroup = function(line) {
	  var parts = line.substr(13).split(' ');
	  return {
	    semantics: parts.shift(),
	    ssrcs: parts.map(function(ssrc) {
	      return parseInt(ssrc, 10);
	    })
	  };
	};

	// Extracts the MID (RFC 5888) from a media section.
	// returns the MID or undefined if no mid line was found.
	SDPUtils.getMid = function(mediaSection) {
	  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
	  if (mid) {
	    return mid.substr(6);
	  }
	};

	SDPUtils.parseFingerprint = function(line) {
	  var parts = line.substr(14).split(' ');
	  return {
	    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
	    value: parts[1]
	  };
	};

	// Extracts DTLS parameters from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the fingerprint line as input. See also getIceParameters.
	SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
	  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
	      'a=fingerprint:');
	  // Note: a=setup line is ignored since we use the 'auto' role.
	  // Note2: 'algorithm' is not case sensitive except in Edge.
	  return {
	    role: 'auto',
	    fingerprints: lines.map(SDPUtils.parseFingerprint)
	  };
	};

	// Serializes DTLS parameters to SDP.
	SDPUtils.writeDtlsParameters = function(params, setupType) {
	  var sdp = 'a=setup:' + setupType + '\r\n';
	  params.fingerprints.forEach(function(fp) {
	    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
	  });
	  return sdp;
	};
	// Parses ICE information from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the ice-ufrag and ice-pwd lines as input.
	SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  // Search in session part, too.
	  lines = lines.concat(SDPUtils.splitLines(sessionpart));
	  var iceParameters = {
	    usernameFragment: lines.filter(function(line) {
	      return line.indexOf('a=ice-ufrag:') === 0;
	    })[0].substr(12),
	    password: lines.filter(function(line) {
	      return line.indexOf('a=ice-pwd:') === 0;
	    })[0].substr(10)
	  };
	  return iceParameters;
	};

	// Serializes ICE parameters to SDP.
	SDPUtils.writeIceParameters = function(params) {
	  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
	      'a=ice-pwd:' + params.password + '\r\n';
	};

	// Parses the SDP media section and returns RTCRtpParameters.
	SDPUtils.parseRtpParameters = function(mediaSection) {
	  var description = {
	    codecs: [],
	    headerExtensions: [],
	    fecMechanisms: [],
	    rtcp: []
	  };
	  var lines = SDPUtils.splitLines(mediaSection);
	  var mline = lines[0].split(' ');
	  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
	    var pt = mline[i];
	    var rtpmapline = SDPUtils.matchPrefix(
	        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
	    if (rtpmapline) {
	      var codec = SDPUtils.parseRtpMap(rtpmapline);
	      var fmtps = SDPUtils.matchPrefix(
	          mediaSection, 'a=fmtp:' + pt + ' ');
	      // Only the first a=fmtp:<pt> is considered.
	      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
	      codec.rtcpFeedback = SDPUtils.matchPrefix(
	          mediaSection, 'a=rtcp-fb:' + pt + ' ')
	        .map(SDPUtils.parseRtcpFb);
	      description.codecs.push(codec);
	      // parse FEC mechanisms from rtpmap lines.
	      switch (codec.name.toUpperCase()) {
	        case 'RED':
	        case 'ULPFEC':
	          description.fecMechanisms.push(codec.name.toUpperCase());
	          break;
	        default: // only RED and ULPFEC are recognized as FEC mechanisms.
	          break;
	      }
	    }
	  }
	  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
	    description.headerExtensions.push(SDPUtils.parseExtmap(line));
	  });
	  // FIXME: parse rtcp.
	  return description;
	};

	// Generates parts of the SDP media section describing the capabilities /
	// parameters.
	SDPUtils.writeRtpDescription = function(kind, caps) {
	  var sdp = '';

	  // Build the mline.
	  sdp += 'm=' + kind + ' ';
	  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
	  sdp += ' UDP/TLS/RTP/SAVPF ';
	  sdp += caps.codecs.map(function(codec) {
	    if (codec.preferredPayloadType !== undefined) {
	      return codec.preferredPayloadType;
	    }
	    return codec.payloadType;
	  }).join(' ') + '\r\n';

	  sdp += 'c=IN IP4 0.0.0.0\r\n';
	  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

	  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
	  caps.codecs.forEach(function(codec) {
	    sdp += SDPUtils.writeRtpMap(codec);
	    sdp += SDPUtils.writeFmtp(codec);
	    sdp += SDPUtils.writeRtcpFb(codec);
	  });
	  var maxptime = 0;
	  caps.codecs.forEach(function(codec) {
	    if (codec.maxptime > maxptime) {
	      maxptime = codec.maxptime;
	    }
	  });
	  if (maxptime > 0) {
	    sdp += 'a=maxptime:' + maxptime + '\r\n';
	  }
	  sdp += 'a=rtcp-mux\r\n';

	  if (caps.headerExtensions) {
	    caps.headerExtensions.forEach(function(extension) {
	      sdp += SDPUtils.writeExtmap(extension);
	    });
	  }
	  // FIXME: write fecMechanisms.
	  return sdp;
	};

	// Parses the SDP media section and returns an array of
	// RTCRtpEncodingParameters.
	SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
	  var encodingParameters = [];
	  var description = SDPUtils.parseRtpParameters(mediaSection);
	  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
	  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

	  // filter a=ssrc:... cname:, ignore PlanB-msid
	  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	  .map(function(line) {
	    return SDPUtils.parseSsrcMedia(line);
	  })
	  .filter(function(parts) {
	    return parts.attribute === 'cname';
	  });
	  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
	  var secondarySsrc;

	  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
	  .map(function(line) {
	    var parts = line.substr(17).split(' ');
	    return parts.map(function(part) {
	      return parseInt(part, 10);
	    });
	  });
	  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
	    secondarySsrc = flows[0][1];
	  }

	  description.codecs.forEach(function(codec) {
	    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
	      var encParam = {
	        ssrc: primarySsrc,
	        codecPayloadType: parseInt(codec.parameters.apt, 10)
	      };
	      if (primarySsrc && secondarySsrc) {
	        encParam.rtx = {ssrc: secondarySsrc};
	      }
	      encodingParameters.push(encParam);
	      if (hasRed) {
	        encParam = JSON.parse(JSON.stringify(encParam));
	        encParam.fec = {
	          ssrc: primarySsrc,
	          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
	        };
	        encodingParameters.push(encParam);
	      }
	    }
	  });
	  if (encodingParameters.length === 0 && primarySsrc) {
	    encodingParameters.push({
	      ssrc: primarySsrc
	    });
	  }

	  // we support both b=AS and b=TIAS but interpret AS as TIAS.
	  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
	  if (bandwidth.length) {
	    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
	      bandwidth = parseInt(bandwidth[0].substr(7), 10);
	    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
	      // use formula from JSEP to convert b=AS to TIAS value.
	      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
	          - (50 * 40 * 8);
	    } else {
	      bandwidth = undefined;
	    }
	    encodingParameters.forEach(function(params) {
	      params.maxBitrate = bandwidth;
	    });
	  }
	  return encodingParameters;
	};

	// parses http://draft.ortc.org/#rtcrtcpparameters*
	SDPUtils.parseRtcpParameters = function(mediaSection) {
	  var rtcpParameters = {};

	  // Gets the first SSRC. Note tha with RTX there might be multiple
	  // SSRCs.
	  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	      .map(function(line) {
	        return SDPUtils.parseSsrcMedia(line);
	      })
	      .filter(function(obj) {
	        return obj.attribute === 'cname';
	      })[0];
	  if (remoteSsrc) {
	    rtcpParameters.cname = remoteSsrc.value;
	    rtcpParameters.ssrc = remoteSsrc.ssrc;
	  }

	  // Edge uses the compound attribute instead of reducedSize
	  // compound is !reducedSize
	  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
	  rtcpParameters.reducedSize = rsize.length > 0;
	  rtcpParameters.compound = rsize.length === 0;

	  // parses the rtcp-mux attrіbute.
	  // Note that Edge does not support unmuxed RTCP.
	  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
	  rtcpParameters.mux = mux.length > 0;

	  return rtcpParameters;
	};

	// parses either a=msid: or a=ssrc:... msid lines and returns
	// the id of the MediaStream and MediaStreamTrack.
	SDPUtils.parseMsid = function(mediaSection) {
	  var parts;
	  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
	  if (spec.length === 1) {
	    parts = spec[0].substr(7).split(' ');
	    return {stream: parts[0], track: parts[1]};
	  }
	  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	  .map(function(line) {
	    return SDPUtils.parseSsrcMedia(line);
	  })
	  .filter(function(msidParts) {
	    return msidParts.attribute === 'msid';
	  });
	  if (planB.length > 0) {
	    parts = planB[0].value.split(' ');
	    return {stream: parts[0], track: parts[1]};
	  }
	};

	// Generate a session ID for SDP.
	// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
	// recommends using a cryptographically random +ve 64-bit value
	// but right now this should be acceptable and within the right range
	SDPUtils.generateSessionId = function() {
	  return Math.random().toString().substr(2, 21);
	};

	// Write boilder plate for start of SDP
	// sessId argument is optional - if not supplied it will
	// be generated randomly
	// sessVersion is optional and defaults to 2
	// sessUser is optional and defaults to 'thisisadapterortc'
	SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
	  var sessionId;
	  var version = sessVer !== undefined ? sessVer : 2;
	  if (sessId) {
	    sessionId = sessId;
	  } else {
	    sessionId = SDPUtils.generateSessionId();
	  }
	  var user = sessUser || 'thisisadapterortc';
	  // FIXME: sess-id should be an NTP timestamp.
	  return 'v=0\r\n' +
	      'o=' + user + ' ' + sessionId + ' ' + version +
	        ' IN IP4 127.0.0.1\r\n' +
	      's=-\r\n' +
	      't=0 0\r\n';
	};

	SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
	  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

	  // Map ICE parameters (ufrag, pwd) to SDP.
	  sdp += SDPUtils.writeIceParameters(
	      transceiver.iceGatherer.getLocalParameters());

	  // Map DTLS parameters to SDP.
	  sdp += SDPUtils.writeDtlsParameters(
	      transceiver.dtlsTransport.getLocalParameters(),
	      type === 'offer' ? 'actpass' : 'active');

	  sdp += 'a=mid:' + transceiver.mid + '\r\n';

	  if (transceiver.direction) {
	    sdp += 'a=' + transceiver.direction + '\r\n';
	  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
	    sdp += 'a=sendrecv\r\n';
	  } else if (transceiver.rtpSender) {
	    sdp += 'a=sendonly\r\n';
	  } else if (transceiver.rtpReceiver) {
	    sdp += 'a=recvonly\r\n';
	  } else {
	    sdp += 'a=inactive\r\n';
	  }

	  if (transceiver.rtpSender) {
	    // spec.
	    var msid = 'msid:' + stream.id + ' ' +
	        transceiver.rtpSender.track.id + '\r\n';
	    sdp += 'a=' + msid;

	    // for Chrome.
	    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	        ' ' + msid;
	    if (transceiver.sendEncodingParameters[0].rtx) {
	      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	          ' ' + msid;
	      sdp += 'a=ssrc-group:FID ' +
	          transceiver.sendEncodingParameters[0].ssrc + ' ' +
	          transceiver.sendEncodingParameters[0].rtx.ssrc +
	          '\r\n';
	    }
	  }
	  // FIXME: this should be written by writeRtpDescription.
	  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	      ' cname:' + SDPUtils.localCName + '\r\n';
	  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
	    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	        ' cname:' + SDPUtils.localCName + '\r\n';
	  }
	  return sdp;
	};

	// Gets the direction from the mediaSection or the sessionpart.
	SDPUtils.getDirection = function(mediaSection, sessionpart) {
	  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
	  var lines = SDPUtils.splitLines(mediaSection);
	  for (var i = 0; i < lines.length; i++) {
	    switch (lines[i]) {
	      case 'a=sendrecv':
	      case 'a=sendonly':
	      case 'a=recvonly':
	      case 'a=inactive':
	        return lines[i].substr(2);
	      default:
	        // FIXME: What should happen here?
	    }
	  }
	  if (sessionpart) {
	    return SDPUtils.getDirection(sessionpart);
	  }
	  return 'sendrecv';
	};

	SDPUtils.getKind = function(mediaSection) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  var mline = lines[0].split(' ');
	  return mline[0].substr(2);
	};

	SDPUtils.isRejected = function(mediaSection) {
	  return mediaSection.split(' ', 2)[1] === '0';
	};

	SDPUtils.parseMLine = function(mediaSection) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  var parts = lines[0].substr(2).split(' ');
	  return {
	    kind: parts[0],
	    port: parseInt(parts[1], 10),
	    protocol: parts[2],
	    fmt: parts.slice(3).join(' ')
	  };
	};

	SDPUtils.parseOLine = function(mediaSection) {
	  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
	  var parts = line.substr(2).split(' ');
	  return {
	    username: parts[0],
	    sessionId: parts[1],
	    sessionVersion: parseInt(parts[2], 10),
	    netType: parts[3],
	    addressType: parts[4],
	    address: parts[5]
	  };
	};

	// a very naive interpretation of a valid SDP.
	SDPUtils.isValidSDP = function(blob) {
	  if (typeof blob !== 'string' || blob.length === 0) {
	    return false;
	  }
	  var lines = SDPUtils.splitLines(blob);
	  for (var i = 0; i < lines.length; i++) {
	    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
	      return false;
	    }
	    // TODO: check the modifier a bit more.
	  }
	  return true;
	};

	// Expose public methods.
	{
	  module.exports = SDPUtils;
	}
	});

	function fixStatsType(stat) {
	  return {
	    inboundrtp: 'inbound-rtp',
	    outboundrtp: 'outbound-rtp',
	    candidatepair: 'candidate-pair',
	    localcandidate: 'local-candidate',
	    remotecandidate: 'remote-candidate'
	  }[stat.type] || stat.type;
	}

	function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
	  var sdp$$1 = sdp.writeRtpDescription(transceiver.kind, caps);

	  // Map ICE parameters (ufrag, pwd) to SDP.
	  sdp$$1 += sdp.writeIceParameters(
	      transceiver.iceGatherer.getLocalParameters());

	  // Map DTLS parameters to SDP.
	  sdp$$1 += sdp.writeDtlsParameters(
	      transceiver.dtlsTransport.getLocalParameters(),
	      type === 'offer' ? 'actpass' : dtlsRole || 'active');

	  sdp$$1 += 'a=mid:' + transceiver.mid + '\r\n';

	  if (transceiver.rtpSender && transceiver.rtpReceiver) {
	    sdp$$1 += 'a=sendrecv\r\n';
	  } else if (transceiver.rtpSender) {
	    sdp$$1 += 'a=sendonly\r\n';
	  } else if (transceiver.rtpReceiver) {
	    sdp$$1 += 'a=recvonly\r\n';
	  } else {
	    sdp$$1 += 'a=inactive\r\n';
	  }

	  if (transceiver.rtpSender) {
	    var trackId = transceiver.rtpSender._initialTrackId ||
	        transceiver.rtpSender.track.id;
	    transceiver.rtpSender._initialTrackId = trackId;
	    // spec.
	    var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
	        trackId + '\r\n';
	    sdp$$1 += 'a=' + msid;
	    // for Chrome. Legacy should no longer be required.
	    sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	        ' ' + msid;

	    // RTX
	    if (transceiver.sendEncodingParameters[0].rtx) {
	      sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	          ' ' + msid;
	      sdp$$1 += 'a=ssrc-group:FID ' +
	          transceiver.sendEncodingParameters[0].ssrc + ' ' +
	          transceiver.sendEncodingParameters[0].rtx.ssrc +
	          '\r\n';
	    }
	  }
	  // FIXME: this should be written by writeRtpDescription.
	  sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	      ' cname:' + sdp.localCName + '\r\n';
	  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
	    sdp$$1 += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
	        ' cname:' + sdp.localCName + '\r\n';
	  }
	  return sdp$$1;
	}

	// Edge does not like
	// 1) stun: filtered after 14393 unless ?transport=udp is present
	// 2) turn: that does not have all of turn:host:port?transport=udp
	// 3) turn: with ipv6 addresses
	// 4) turn: occurring muliple times
	function filterIceServers$1(iceServers, edgeVersion) {
	  var hasTurn = false;
	  iceServers = JSON.parse(JSON.stringify(iceServers));
	  return iceServers.filter(function(server) {
	    if (server && (server.urls || server.url)) {
	      var urls = server.urls || server.url;
	      if (server.url && !server.urls) {
	        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
	      }
	      var isString = typeof urls === 'string';
	      if (isString) {
	        urls = [urls];
	      }
	      urls = urls.filter(function(url) {
	        var validTurn = url.indexOf('turn:') === 0 &&
	            url.indexOf('transport=udp') !== -1 &&
	            url.indexOf('turn:[') === -1 &&
	            !hasTurn;

	        if (validTurn) {
	          hasTurn = true;
	          return true;
	        }
	        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
	            url.indexOf('?transport=udp') === -1;
	      });

	      delete server.url;
	      server.urls = isString ? urls[0] : urls;
	      return !!urls.length;
	    }
	  });
	}

	// Determines the intersection of local and remote capabilities.
	function getCommonCapabilities(localCapabilities, remoteCapabilities) {
	  var commonCapabilities = {
	    codecs: [],
	    headerExtensions: [],
	    fecMechanisms: []
	  };

	  var findCodecByPayloadType = function(pt, codecs) {
	    pt = parseInt(pt, 10);
	    for (var i = 0; i < codecs.length; i++) {
	      if (codecs[i].payloadType === pt ||
	          codecs[i].preferredPayloadType === pt) {
	        return codecs[i];
	      }
	    }
	  };

	  var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
	    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
	    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
	    return lCodec && rCodec &&
	        lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
	  };

	  localCapabilities.codecs.forEach(function(lCodec) {
	    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
	      var rCodec = remoteCapabilities.codecs[i];
	      if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
	          lCodec.clockRate === rCodec.clockRate) {
	        if (lCodec.name.toLowerCase() === 'rtx' &&
	            lCodec.parameters && rCodec.parameters.apt) {
	          // for RTX we need to find the local rtx that has a apt
	          // which points to the same local codec as the remote one.
	          if (!rtxCapabilityMatches(lCodec, rCodec,
	              localCapabilities.codecs, remoteCapabilities.codecs)) {
	            continue;
	          }
	        }
	        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
	        // number of channels is the highest common number of channels
	        rCodec.numChannels = Math.min(lCodec.numChannels,
	            rCodec.numChannels);
	        // push rCodec so we reply with offerer payload type
	        commonCapabilities.codecs.push(rCodec);

	        // determine common feedback mechanisms
	        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
	          for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
	            if (lCodec.rtcpFeedback[j].type === fb.type &&
	                lCodec.rtcpFeedback[j].parameter === fb.parameter) {
	              return true;
	            }
	          }
	          return false;
	        });
	        // FIXME: also need to determine .parameters
	        //  see https://github.com/openpeer/ortc/issues/569
	        break;
	      }
	    }
	  });

	  localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
	    for (var i = 0; i < remoteCapabilities.headerExtensions.length;
	         i++) {
	      var rHeaderExtension = remoteCapabilities.headerExtensions[i];
	      if (lHeaderExtension.uri === rHeaderExtension.uri) {
	        commonCapabilities.headerExtensions.push(rHeaderExtension);
	        break;
	      }
	    }
	  });

	  // FIXME: fecMechanisms
	  return commonCapabilities;
	}

	// is action=setLocalDescription with type allowed in signalingState
	function isActionAllowedInSignalingState(action, type, signalingState) {
	  return {
	    offer: {
	      setLocalDescription: ['stable', 'have-local-offer'],
	      setRemoteDescription: ['stable', 'have-remote-offer']
	    },
	    answer: {
	      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
	      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
	    }
	  }[type][action].indexOf(signalingState) !== -1;
	}

	function maybeAddCandidate(iceTransport, candidate) {
	  // Edge's internal representation adds some fields therefore
	  // not all fieldѕ are taken into account.
	  var alreadyAdded = iceTransport.getRemoteCandidates()
	      .find(function(remoteCandidate) {
	        return candidate.foundation === remoteCandidate.foundation &&
	            candidate.ip === remoteCandidate.ip &&
	            candidate.port === remoteCandidate.port &&
	            candidate.priority === remoteCandidate.priority &&
	            candidate.protocol === remoteCandidate.protocol &&
	            candidate.type === remoteCandidate.type;
	      });
	  if (!alreadyAdded) {
	    iceTransport.addRemoteCandidate(candidate);
	  }
	  return !alreadyAdded;
	}


	function makeError(name, description) {
	  var e = new Error(description);
	  e.name = name;
	  // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
	  e.code = {
	    NotSupportedError: 9,
	    InvalidStateError: 11,
	    InvalidAccessError: 15,
	    TypeError: undefined,
	    OperationError: undefined
	  }[name];
	  return e;
	}

	var rtcpeerconnection = function(window, edgeVersion) {
	  // https://w3c.github.io/mediacapture-main/#mediastream
	  // Helper function to add the track to the stream and
	  // dispatch the event ourselves.
	  function addTrackToStreamAndFireEvent(track, stream) {
	    stream.addTrack(track);
	    stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
	        {track: track}));
	  }

	  function removeTrackFromStreamAndFireEvent(track, stream) {
	    stream.removeTrack(track);
	    stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
	        {track: track}));
	  }

	  function fireAddTrack(pc, track, receiver, streams) {
	    var trackEvent = new Event('track');
	    trackEvent.track = track;
	    trackEvent.receiver = receiver;
	    trackEvent.transceiver = {receiver: receiver};
	    trackEvent.streams = streams;
	    window.setTimeout(function() {
	      pc._dispatchEvent('track', trackEvent);
	    });
	  }

	  var RTCPeerConnection = function(config) {
	    var pc = this;

	    var _eventTarget = document.createDocumentFragment();
	    ['addEventListener', 'removeEventListener', 'dispatchEvent']
	        .forEach(function(method) {
	          pc[method] = _eventTarget[method].bind(_eventTarget);
	        });

	    this.canTrickleIceCandidates = null;

	    this.needNegotiation = false;

	    this.localStreams = [];
	    this.remoteStreams = [];

	    this._localDescription = null;
	    this._remoteDescription = null;

	    this.signalingState = 'stable';
	    this.iceConnectionState = 'new';
	    this.connectionState = 'new';
	    this.iceGatheringState = 'new';

	    config = JSON.parse(JSON.stringify(config || {}));

	    this.usingBundle = config.bundlePolicy === 'max-bundle';
	    if (config.rtcpMuxPolicy === 'negotiate') {
	      throw(makeError('NotSupportedError',
	          'rtcpMuxPolicy \'negotiate\' is not supported'));
	    } else if (!config.rtcpMuxPolicy) {
	      config.rtcpMuxPolicy = 'require';
	    }

	    switch (config.iceTransportPolicy) {
	      case 'all':
	      case 'relay':
	        break;
	      default:
	        config.iceTransportPolicy = 'all';
	        break;
	    }

	    switch (config.bundlePolicy) {
	      case 'balanced':
	      case 'max-compat':
	      case 'max-bundle':
	        break;
	      default:
	        config.bundlePolicy = 'balanced';
	        break;
	    }

	    config.iceServers = filterIceServers$1(config.iceServers || [], edgeVersion);

	    this._iceGatherers = [];
	    if (config.iceCandidatePoolSize) {
	      for (var i = config.iceCandidatePoolSize; i > 0; i--) {
	        this._iceGatherers.push(new window.RTCIceGatherer({
	          iceServers: config.iceServers,
	          gatherPolicy: config.iceTransportPolicy
	        }));
	      }
	    } else {
	      config.iceCandidatePoolSize = 0;
	    }

	    this._config = config;

	    // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
	    // everything that is needed to describe a SDP m-line.
	    this.transceivers = [];

	    this._sdpSessionId = sdp.generateSessionId();
	    this._sdpSessionVersion = 0;

	    this._dtlsRole = undefined; // role for a=setup to use in answers.

	    this._isClosed = false;
	  };

	  Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
	    configurable: true,
	    get: function() {
	      return this._localDescription;
	    }
	  });
	  Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
	    configurable: true,
	    get: function() {
	      return this._remoteDescription;
	    }
	  });

	  // set up event handlers on prototype
	  RTCPeerConnection.prototype.onicecandidate = null;
	  RTCPeerConnection.prototype.onaddstream = null;
	  RTCPeerConnection.prototype.ontrack = null;
	  RTCPeerConnection.prototype.onremovestream = null;
	  RTCPeerConnection.prototype.onsignalingstatechange = null;
	  RTCPeerConnection.prototype.oniceconnectionstatechange = null;
	  RTCPeerConnection.prototype.onconnectionstatechange = null;
	  RTCPeerConnection.prototype.onicegatheringstatechange = null;
	  RTCPeerConnection.prototype.onnegotiationneeded = null;
	  RTCPeerConnection.prototype.ondatachannel = null;

	  RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
	    if (this._isClosed) {
	      return;
	    }
	    this.dispatchEvent(event);
	    if (typeof this['on' + name] === 'function') {
	      this['on' + name](event);
	    }
	  };

	  RTCPeerConnection.prototype._emitGatheringStateChange = function() {
	    var event = new Event('icegatheringstatechange');
	    this._dispatchEvent('icegatheringstatechange', event);
	  };

	  RTCPeerConnection.prototype.getConfiguration = function() {
	    return this._config;
	  };

	  RTCPeerConnection.prototype.getLocalStreams = function() {
	    return this.localStreams;
	  };

	  RTCPeerConnection.prototype.getRemoteStreams = function() {
	    return this.remoteStreams;
	  };

	  // internal helper to create a transceiver object.
	  // (which is not yet the same as the WebRTC 1.0 transceiver)
	  RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
	    var hasBundleTransport = this.transceivers.length > 0;
	    var transceiver = {
	      track: null,
	      iceGatherer: null,
	      iceTransport: null,
	      dtlsTransport: null,
	      localCapabilities: null,
	      remoteCapabilities: null,
	      rtpSender: null,
	      rtpReceiver: null,
	      kind: kind,
	      mid: null,
	      sendEncodingParameters: null,
	      recvEncodingParameters: null,
	      stream: null,
	      associatedRemoteMediaStreams: [],
	      wantReceive: true
	    };
	    if (this.usingBundle && hasBundleTransport) {
	      transceiver.iceTransport = this.transceivers[0].iceTransport;
	      transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
	    } else {
	      var transports = this._createIceAndDtlsTransports();
	      transceiver.iceTransport = transports.iceTransport;
	      transceiver.dtlsTransport = transports.dtlsTransport;
	    }
	    if (!doNotAdd) {
	      this.transceivers.push(transceiver);
	    }
	    return transceiver;
	  };

	  RTCPeerConnection.prototype.addTrack = function(track, stream) {
	    if (this._isClosed) {
	      throw makeError('InvalidStateError',
	          'Attempted to call addTrack on a closed peerconnection.');
	    }

	    var alreadyExists = this.transceivers.find(function(s) {
	      return s.track === track;
	    });

	    if (alreadyExists) {
	      throw makeError('InvalidAccessError', 'Track already exists.');
	    }

	    var transceiver;
	    for (var i = 0; i < this.transceivers.length; i++) {
	      if (!this.transceivers[i].track &&
	          this.transceivers[i].kind === track.kind) {
	        transceiver = this.transceivers[i];
	      }
	    }
	    if (!transceiver) {
	      transceiver = this._createTransceiver(track.kind);
	    }

	    this._maybeFireNegotiationNeeded();

	    if (this.localStreams.indexOf(stream) === -1) {
	      this.localStreams.push(stream);
	    }

	    transceiver.track = track;
	    transceiver.stream = stream;
	    transceiver.rtpSender = new window.RTCRtpSender(track,
	        transceiver.dtlsTransport);
	    return transceiver.rtpSender;
	  };

	  RTCPeerConnection.prototype.addStream = function(stream) {
	    var pc = this;
	    if (edgeVersion >= 15025) {
	      stream.getTracks().forEach(function(track) {
	        pc.addTrack(track, stream);
	      });
	    } else {
	      // Clone is necessary for local demos mostly, attaching directly
	      // to two different senders does not work (build 10547).
	      // Fixed in 15025 (or earlier)
	      var clonedStream = stream.clone();
	      stream.getTracks().forEach(function(track, idx) {
	        var clonedTrack = clonedStream.getTracks()[idx];
	        track.addEventListener('enabled', function(event) {
	          clonedTrack.enabled = event.enabled;
	        });
	      });
	      clonedStream.getTracks().forEach(function(track) {
	        pc.addTrack(track, clonedStream);
	      });
	    }
	  };

	  RTCPeerConnection.prototype.removeTrack = function(sender) {
	    if (this._isClosed) {
	      throw makeError('InvalidStateError',
	          'Attempted to call removeTrack on a closed peerconnection.');
	    }

	    if (!(sender instanceof window.RTCRtpSender)) {
	      throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
	          'does not implement interface RTCRtpSender.');
	    }

	    var transceiver = this.transceivers.find(function(t) {
	      return t.rtpSender === sender;
	    });

	    if (!transceiver) {
	      throw makeError('InvalidAccessError',
	          'Sender was not created by this connection.');
	    }
	    var stream = transceiver.stream;

	    transceiver.rtpSender.stop();
	    transceiver.rtpSender = null;
	    transceiver.track = null;
	    transceiver.stream = null;

	    // remove the stream from the set of local streams
	    var localStreams = this.transceivers.map(function(t) {
	      return t.stream;
	    });
	    if (localStreams.indexOf(stream) === -1 &&
	        this.localStreams.indexOf(stream) > -1) {
	      this.localStreams.splice(this.localStreams.indexOf(stream), 1);
	    }

	    this._maybeFireNegotiationNeeded();
	  };

	  RTCPeerConnection.prototype.removeStream = function(stream) {
	    var pc = this;
	    stream.getTracks().forEach(function(track) {
	      var sender = pc.getSenders().find(function(s) {
	        return s.track === track;
	      });
	      if (sender) {
	        pc.removeTrack(sender);
	      }
	    });
	  };

	  RTCPeerConnection.prototype.getSenders = function() {
	    return this.transceivers.filter(function(transceiver) {
	      return !!transceiver.rtpSender;
	    })
	    .map(function(transceiver) {
	      return transceiver.rtpSender;
	    });
	  };

	  RTCPeerConnection.prototype.getReceivers = function() {
	    return this.transceivers.filter(function(transceiver) {
	      return !!transceiver.rtpReceiver;
	    })
	    .map(function(transceiver) {
	      return transceiver.rtpReceiver;
	    });
	  };


	  RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
	      usingBundle) {
	    var pc = this;
	    if (usingBundle && sdpMLineIndex > 0) {
	      return this.transceivers[0].iceGatherer;
	    } else if (this._iceGatherers.length) {
	      return this._iceGatherers.shift();
	    }
	    var iceGatherer = new window.RTCIceGatherer({
	      iceServers: this._config.iceServers,
	      gatherPolicy: this._config.iceTransportPolicy
	    });
	    Object.defineProperty(iceGatherer, 'state',
	        {value: 'new', writable: true}
	    );

	    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
	    this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
	      var end = !event.candidate || Object.keys(event.candidate).length === 0;
	      // polyfill since RTCIceGatherer.state is not implemented in
	      // Edge 10547 yet.
	      iceGatherer.state = end ? 'completed' : 'gathering';
	      if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
	        pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
	      }
	    };
	    iceGatherer.addEventListener('localcandidate',
	      this.transceivers[sdpMLineIndex].bufferCandidates);
	    return iceGatherer;
	  };

	  // start gathering from an RTCIceGatherer.
	  RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
	    var pc = this;
	    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
	    if (iceGatherer.onlocalcandidate) {
	      return;
	    }
	    var bufferedCandidateEvents =
	      this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
	    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
	    iceGatherer.removeEventListener('localcandidate',
	      this.transceivers[sdpMLineIndex].bufferCandidates);
	    iceGatherer.onlocalcandidate = function(evt) {
	      if (pc.usingBundle && sdpMLineIndex > 0) {
	        // if we know that we use bundle we can drop candidates with
	        // ѕdpMLineIndex > 0. If we don't do this then our state gets
	        // confused since we dispose the extra ice gatherer.
	        return;
	      }
	      var event = new Event('icecandidate');
	      event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

	      var cand = evt.candidate;
	      // Edge emits an empty object for RTCIceCandidateComplete‥
	      var end = !cand || Object.keys(cand).length === 0;
	      if (end) {
	        // polyfill since RTCIceGatherer.state is not implemented in
	        // Edge 10547 yet.
	        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
	          iceGatherer.state = 'completed';
	        }
	      } else {
	        if (iceGatherer.state === 'new') {
	          iceGatherer.state = 'gathering';
	        }
	        // RTCIceCandidate doesn't have a component, needs to be added
	        cand.component = 1;
	        // also the usernameFragment. TODO: update SDP to take both variants.
	        cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

	        var serializedCandidate = sdp.writeCandidate(cand);
	        event.candidate = Object.assign(event.candidate,
	            sdp.parseCandidate(serializedCandidate));

	        event.candidate.candidate = serializedCandidate;
	        event.candidate.toJSON = function() {
	          return {
	            candidate: event.candidate.candidate,
	            sdpMid: event.candidate.sdpMid,
	            sdpMLineIndex: event.candidate.sdpMLineIndex,
	            usernameFragment: event.candidate.usernameFragment
	          };
	        };
	      }

	      // update local description.
	      var sections = sdp.getMediaSections(pc._localDescription.sdp);
	      if (!end) {
	        sections[event.candidate.sdpMLineIndex] +=
	            'a=' + event.candidate.candidate + '\r\n';
	      } else {
	        sections[event.candidate.sdpMLineIndex] +=
	            'a=end-of-candidates\r\n';
	      }
	      pc._localDescription.sdp =
	          sdp.getDescription(pc._localDescription.sdp) +
	          sections.join('');
	      var complete = pc.transceivers.every(function(transceiver) {
	        return transceiver.iceGatherer &&
	            transceiver.iceGatherer.state === 'completed';
	      });

	      if (pc.iceGatheringState !== 'gathering') {
	        pc.iceGatheringState = 'gathering';
	        pc._emitGatheringStateChange();
	      }

	      // Emit candidate. Also emit null candidate when all gatherers are
	      // complete.
	      if (!end) {
	        pc._dispatchEvent('icecandidate', event);
	      }
	      if (complete) {
	        pc._dispatchEvent('icecandidate', new Event('icecandidate'));
	        pc.iceGatheringState = 'complete';
	        pc._emitGatheringStateChange();
	      }
	    };

	    // emit already gathered candidates.
	    window.setTimeout(function() {
	      bufferedCandidateEvents.forEach(function(e) {
	        iceGatherer.onlocalcandidate(e);
	      });
	    }, 0);
	  };

	  // Create ICE transport and DTLS transport.
	  RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
	    var pc = this;
	    var iceTransport = new window.RTCIceTransport(null);
	    iceTransport.onicestatechange = function() {
	      pc._updateIceConnectionState();
	      pc._updateConnectionState();
	    };

	    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
	    dtlsTransport.ondtlsstatechange = function() {
	      pc._updateConnectionState();
	    };
	    dtlsTransport.onerror = function() {
	      // onerror does not set state to failed by itself.
	      Object.defineProperty(dtlsTransport, 'state',
	          {value: 'failed', writable: true});
	      pc._updateConnectionState();
	    };

	    return {
	      iceTransport: iceTransport,
	      dtlsTransport: dtlsTransport
	    };
	  };

	  // Destroy ICE gatherer, ICE transport and DTLS transport.
	  // Without triggering the callbacks.
	  RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
	      sdpMLineIndex) {
	    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
	    if (iceGatherer) {
	      delete iceGatherer.onlocalcandidate;
	      delete this.transceivers[sdpMLineIndex].iceGatherer;
	    }
	    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
	    if (iceTransport) {
	      delete iceTransport.onicestatechange;
	      delete this.transceivers[sdpMLineIndex].iceTransport;
	    }
	    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
	    if (dtlsTransport) {
	      delete dtlsTransport.ondtlsstatechange;
	      delete dtlsTransport.onerror;
	      delete this.transceivers[sdpMLineIndex].dtlsTransport;
	    }
	  };

	  // Start the RTP Sender and Receiver for a transceiver.
	  RTCPeerConnection.prototype._transceive = function(transceiver,
	      send, recv) {
	    var params = getCommonCapabilities(transceiver.localCapabilities,
	        transceiver.remoteCapabilities);
	    if (send && transceiver.rtpSender) {
	      params.encodings = transceiver.sendEncodingParameters;
	      params.rtcp = {
	        cname: sdp.localCName,
	        compound: transceiver.rtcpParameters.compound
	      };
	      if (transceiver.recvEncodingParameters.length) {
	        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
	      }
	      transceiver.rtpSender.send(params);
	    }
	    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
	      // remove RTX field in Edge 14942
	      if (transceiver.kind === 'video'
	          && transceiver.recvEncodingParameters
	          && edgeVersion < 15019) {
	        transceiver.recvEncodingParameters.forEach(function(p) {
	          delete p.rtx;
	        });
	      }
	      if (transceiver.recvEncodingParameters.length) {
	        params.encodings = transceiver.recvEncodingParameters;
	      } else {
	        params.encodings = [{}];
	      }
	      params.rtcp = {
	        compound: transceiver.rtcpParameters.compound
	      };
	      if (transceiver.rtcpParameters.cname) {
	        params.rtcp.cname = transceiver.rtcpParameters.cname;
	      }
	      if (transceiver.sendEncodingParameters.length) {
	        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
	      }
	      transceiver.rtpReceiver.receive(params);
	    }
	  };

	  RTCPeerConnection.prototype.setLocalDescription = function(description) {
	    var pc = this;

	    // Note: pranswer is not supported.
	    if (['offer', 'answer'].indexOf(description.type) === -1) {
	      return Promise.reject(makeError('TypeError',
	          'Unsupported type "' + description.type + '"'));
	    }

	    if (!isActionAllowedInSignalingState('setLocalDescription',
	        description.type, pc.signalingState) || pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not set local ' + description.type +
	          ' in state ' + pc.signalingState));
	    }

	    var sections;
	    var sessionpart;
	    if (description.type === 'offer') {
	      // VERY limited support for SDP munging. Limited to:
	      // * changing the order of codecs
	      sections = sdp.splitSections(description.sdp);
	      sessionpart = sections.shift();
	      sections.forEach(function(mediaSection, sdpMLineIndex) {
	        var caps = sdp.parseRtpParameters(mediaSection);
	        pc.transceivers[sdpMLineIndex].localCapabilities = caps;
	      });

	      pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	        pc._gather(transceiver.mid, sdpMLineIndex);
	      });
	    } else if (description.type === 'answer') {
	      sections = sdp.splitSections(pc._remoteDescription.sdp);
	      sessionpart = sections.shift();
	      var isIceLite = sdp.matchPrefix(sessionpart,
	          'a=ice-lite').length > 0;
	      sections.forEach(function(mediaSection, sdpMLineIndex) {
	        var transceiver = pc.transceivers[sdpMLineIndex];
	        var iceGatherer = transceiver.iceGatherer;
	        var iceTransport = transceiver.iceTransport;
	        var dtlsTransport = transceiver.dtlsTransport;
	        var localCapabilities = transceiver.localCapabilities;
	        var remoteCapabilities = transceiver.remoteCapabilities;

	        // treat bundle-only as not-rejected.
	        var rejected = sdp.isRejected(mediaSection) &&
	            sdp.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

	        if (!rejected && !transceiver.rejected) {
	          var remoteIceParameters = sdp.getIceParameters(
	              mediaSection, sessionpart);
	          var remoteDtlsParameters = sdp.getDtlsParameters(
	              mediaSection, sessionpart);
	          if (isIceLite) {
	            remoteDtlsParameters.role = 'server';
	          }

	          if (!pc.usingBundle || sdpMLineIndex === 0) {
	            pc._gather(transceiver.mid, sdpMLineIndex);
	            if (iceTransport.state === 'new') {
	              iceTransport.start(iceGatherer, remoteIceParameters,
	                  isIceLite ? 'controlling' : 'controlled');
	            }
	            if (dtlsTransport.state === 'new') {
	              dtlsTransport.start(remoteDtlsParameters);
	            }
	          }

	          // Calculate intersection of capabilities.
	          var params = getCommonCapabilities(localCapabilities,
	              remoteCapabilities);

	          // Start the RTCRtpSender. The RTCRtpReceiver for this
	          // transceiver has already been started in setRemoteDescription.
	          pc._transceive(transceiver,
	              params.codecs.length > 0,
	              false);
	        }
	      });
	    }

	    pc._localDescription = {
	      type: description.type,
	      sdp: description.sdp
	    };
	    if (description.type === 'offer') {
	      pc._updateSignalingState('have-local-offer');
	    } else {
	      pc._updateSignalingState('stable');
	    }

	    return Promise.resolve();
	  };

	  RTCPeerConnection.prototype.setRemoteDescription = function(description) {
	    var pc = this;

	    // Note: pranswer is not supported.
	    if (['offer', 'answer'].indexOf(description.type) === -1) {
	      return Promise.reject(makeError('TypeError',
	          'Unsupported type "' + description.type + '"'));
	    }

	    if (!isActionAllowedInSignalingState('setRemoteDescription',
	        description.type, pc.signalingState) || pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not set remote ' + description.type +
	          ' in state ' + pc.signalingState));
	    }

	    var streams = {};
	    pc.remoteStreams.forEach(function(stream) {
	      streams[stream.id] = stream;
	    });
	    var receiverList = [];
	    var sections = sdp.splitSections(description.sdp);
	    var sessionpart = sections.shift();
	    var isIceLite = sdp.matchPrefix(sessionpart,
	        'a=ice-lite').length > 0;
	    var usingBundle = sdp.matchPrefix(sessionpart,
	        'a=group:BUNDLE ').length > 0;
	    pc.usingBundle = usingBundle;
	    var iceOptions = sdp.matchPrefix(sessionpart,
	        'a=ice-options:')[0];
	    if (iceOptions) {
	      pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
	          .indexOf('trickle') >= 0;
	    } else {
	      pc.canTrickleIceCandidates = false;
	    }

	    sections.forEach(function(mediaSection, sdpMLineIndex) {
	      var lines = sdp.splitLines(mediaSection);
	      var kind = sdp.getKind(mediaSection);
	      // treat bundle-only as not-rejected.
	      var rejected = sdp.isRejected(mediaSection) &&
	          sdp.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
	      var protocol = lines[0].substr(2).split(' ')[2];

	      var direction = sdp.getDirection(mediaSection, sessionpart);
	      var remoteMsid = sdp.parseMsid(mediaSection);

	      var mid = sdp.getMid(mediaSection) || sdp.generateIdentifier();

	      // Reject datachannels which are not implemented yet.
	      if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
	          protocol === 'UDP/DTLS/SCTP'))) {
	        // TODO: this is dangerous in the case where a non-rejected m-line
	        //     becomes rejected.
	        pc.transceivers[sdpMLineIndex] = {
	          mid: mid,
	          kind: kind,
	          protocol: protocol,
	          rejected: true
	        };
	        return;
	      }

	      if (!rejected && pc.transceivers[sdpMLineIndex] &&
	          pc.transceivers[sdpMLineIndex].rejected) {
	        // recycle a rejected transceiver.
	        pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
	      }

	      var transceiver;
	      var iceGatherer;
	      var iceTransport;
	      var dtlsTransport;
	      var rtpReceiver;
	      var sendEncodingParameters;
	      var recvEncodingParameters;
	      var localCapabilities;

	      var track;
	      // FIXME: ensure the mediaSection has rtcp-mux set.
	      var remoteCapabilities = sdp.parseRtpParameters(mediaSection);
	      var remoteIceParameters;
	      var remoteDtlsParameters;
	      if (!rejected) {
	        remoteIceParameters = sdp.getIceParameters(mediaSection,
	            sessionpart);
	        remoteDtlsParameters = sdp.getDtlsParameters(mediaSection,
	            sessionpart);
	        remoteDtlsParameters.role = 'client';
	      }
	      recvEncodingParameters =
	          sdp.parseRtpEncodingParameters(mediaSection);

	      var rtcpParameters = sdp.parseRtcpParameters(mediaSection);

	      var isComplete = sdp.matchPrefix(mediaSection,
	          'a=end-of-candidates', sessionpart).length > 0;
	      var cands = sdp.matchPrefix(mediaSection, 'a=candidate:')
	          .map(function(cand) {
	            return sdp.parseCandidate(cand);
	          })
	          .filter(function(cand) {
	            return cand.component === 1;
	          });

	      // Check if we can use BUNDLE and dispose transports.
	      if ((description.type === 'offer' || description.type === 'answer') &&
	          !rejected && usingBundle && sdpMLineIndex > 0 &&
	          pc.transceivers[sdpMLineIndex]) {
	        pc._disposeIceAndDtlsTransports(sdpMLineIndex);
	        pc.transceivers[sdpMLineIndex].iceGatherer =
	            pc.transceivers[0].iceGatherer;
	        pc.transceivers[sdpMLineIndex].iceTransport =
	            pc.transceivers[0].iceTransport;
	        pc.transceivers[sdpMLineIndex].dtlsTransport =
	            pc.transceivers[0].dtlsTransport;
	        if (pc.transceivers[sdpMLineIndex].rtpSender) {
	          pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
	              pc.transceivers[0].dtlsTransport);
	        }
	        if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
	          pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
	              pc.transceivers[0].dtlsTransport);
	        }
	      }
	      if (description.type === 'offer' && !rejected) {
	        transceiver = pc.transceivers[sdpMLineIndex] ||
	            pc._createTransceiver(kind);
	        transceiver.mid = mid;

	        if (!transceiver.iceGatherer) {
	          transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
	              usingBundle);
	        }

	        if (cands.length && transceiver.iceTransport.state === 'new') {
	          if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
	            transceiver.iceTransport.setRemoteCandidates(cands);
	          } else {
	            cands.forEach(function(candidate) {
	              maybeAddCandidate(transceiver.iceTransport, candidate);
	            });
	          }
	        }

	        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

	        // filter RTX until additional stuff needed for RTX is implemented
	        // in adapter.js
	        if (edgeVersion < 15019) {
	          localCapabilities.codecs = localCapabilities.codecs.filter(
	              function(codec) {
	                return codec.name !== 'rtx';
	              });
	        }

	        sendEncodingParameters = transceiver.sendEncodingParameters || [{
	          ssrc: (2 * sdpMLineIndex + 2) * 1001
	        }];

	        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
	        var isNewTrack = false;
	        if (direction === 'sendrecv' || direction === 'sendonly') {
	          isNewTrack = !transceiver.rtpReceiver;
	          rtpReceiver = transceiver.rtpReceiver ||
	              new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

	          if (isNewTrack) {
	            var stream;
	            track = rtpReceiver.track;
	            // FIXME: does not work with Plan B.
	            if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
	              if (!streams[remoteMsid.stream]) {
	                streams[remoteMsid.stream] = new window.MediaStream();
	                Object.defineProperty(streams[remoteMsid.stream], 'id', {
	                  get: function() {
	                    return remoteMsid.stream;
	                  }
	                });
	              }
	              Object.defineProperty(track, 'id', {
	                get: function() {
	                  return remoteMsid.track;
	                }
	              });
	              stream = streams[remoteMsid.stream];
	            } else {
	              if (!streams.default) {
	                streams.default = new window.MediaStream();
	              }
	              stream = streams.default;
	            }
	            if (stream) {
	              addTrackToStreamAndFireEvent(track, stream);
	              transceiver.associatedRemoteMediaStreams.push(stream);
	            }
	            receiverList.push([track, rtpReceiver, stream]);
	          }
	        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
	          transceiver.associatedRemoteMediaStreams.forEach(function(s) {
	            var nativeTrack = s.getTracks().find(function(t) {
	              return t.id === transceiver.rtpReceiver.track.id;
	            });
	            if (nativeTrack) {
	              removeTrackFromStreamAndFireEvent(nativeTrack, s);
	            }
	          });
	          transceiver.associatedRemoteMediaStreams = [];
	        }

	        transceiver.localCapabilities = localCapabilities;
	        transceiver.remoteCapabilities = remoteCapabilities;
	        transceiver.rtpReceiver = rtpReceiver;
	        transceiver.rtcpParameters = rtcpParameters;
	        transceiver.sendEncodingParameters = sendEncodingParameters;
	        transceiver.recvEncodingParameters = recvEncodingParameters;

	        // Start the RTCRtpReceiver now. The RTPSender is started in
	        // setLocalDescription.
	        pc._transceive(pc.transceivers[sdpMLineIndex],
	            false,
	            isNewTrack);
	      } else if (description.type === 'answer' && !rejected) {
	        transceiver = pc.transceivers[sdpMLineIndex];
	        iceGatherer = transceiver.iceGatherer;
	        iceTransport = transceiver.iceTransport;
	        dtlsTransport = transceiver.dtlsTransport;
	        rtpReceiver = transceiver.rtpReceiver;
	        sendEncodingParameters = transceiver.sendEncodingParameters;
	        localCapabilities = transceiver.localCapabilities;

	        pc.transceivers[sdpMLineIndex].recvEncodingParameters =
	            recvEncodingParameters;
	        pc.transceivers[sdpMLineIndex].remoteCapabilities =
	            remoteCapabilities;
	        pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

	        if (cands.length && iceTransport.state === 'new') {
	          if ((isIceLite || isComplete) &&
	              (!usingBundle || sdpMLineIndex === 0)) {
	            iceTransport.setRemoteCandidates(cands);
	          } else {
	            cands.forEach(function(candidate) {
	              maybeAddCandidate(transceiver.iceTransport, candidate);
	            });
	          }
	        }

	        if (!usingBundle || sdpMLineIndex === 0) {
	          if (iceTransport.state === 'new') {
	            iceTransport.start(iceGatherer, remoteIceParameters,
	                'controlling');
	          }
	          if (dtlsTransport.state === 'new') {
	            dtlsTransport.start(remoteDtlsParameters);
	          }
	        }

	        // If the offer contained RTX but the answer did not,
	        // remove RTX from sendEncodingParameters.
	        var commonCapabilities = getCommonCapabilities(
	          transceiver.localCapabilities,
	          transceiver.remoteCapabilities);

	        var hasRtx = commonCapabilities.codecs.filter(function(c) {
	          return c.name.toLowerCase() === 'rtx';
	        }).length;
	        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
	          delete transceiver.sendEncodingParameters[0].rtx;
	        }

	        pc._transceive(transceiver,
	            direction === 'sendrecv' || direction === 'recvonly',
	            direction === 'sendrecv' || direction === 'sendonly');

	        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
	        if (rtpReceiver &&
	            (direction === 'sendrecv' || direction === 'sendonly')) {
	          track = rtpReceiver.track;
	          if (remoteMsid) {
	            if (!streams[remoteMsid.stream]) {
	              streams[remoteMsid.stream] = new window.MediaStream();
	            }
	            addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
	            receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
	          } else {
	            if (!streams.default) {
	              streams.default = new window.MediaStream();
	            }
	            addTrackToStreamAndFireEvent(track, streams.default);
	            receiverList.push([track, rtpReceiver, streams.default]);
	          }
	        } else {
	          // FIXME: actually the receiver should be created later.
	          delete transceiver.rtpReceiver;
	        }
	      }
	    });

	    if (pc._dtlsRole === undefined) {
	      pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
	    }

	    pc._remoteDescription = {
	      type: description.type,
	      sdp: description.sdp
	    };
	    if (description.type === 'offer') {
	      pc._updateSignalingState('have-remote-offer');
	    } else {
	      pc._updateSignalingState('stable');
	    }
	    Object.keys(streams).forEach(function(sid) {
	      var stream = streams[sid];
	      if (stream.getTracks().length) {
	        if (pc.remoteStreams.indexOf(stream) === -1) {
	          pc.remoteStreams.push(stream);
	          var event = new Event('addstream');
	          event.stream = stream;
	          window.setTimeout(function() {
	            pc._dispatchEvent('addstream', event);
	          });
	        }

	        receiverList.forEach(function(item) {
	          var track = item[0];
	          var receiver = item[1];
	          if (stream.id !== item[2].id) {
	            return;
	          }
	          fireAddTrack(pc, track, receiver, [stream]);
	        });
	      }
	    });
	    receiverList.forEach(function(item) {
	      if (item[2]) {
	        return;
	      }
	      fireAddTrack(pc, item[0], item[1], []);
	    });

	    // check whether addIceCandidate({}) was called within four seconds after
	    // setRemoteDescription.
	    window.setTimeout(function() {
	      if (!(pc && pc.transceivers)) {
	        return;
	      }
	      pc.transceivers.forEach(function(transceiver) {
	        if (transceiver.iceTransport &&
	            transceiver.iceTransport.state === 'new' &&
	            transceiver.iceTransport.getRemoteCandidates().length > 0) {
	          console.warn('Timeout for addRemoteCandidate. Consider sending ' +
	              'an end-of-candidates notification');
	          transceiver.iceTransport.addRemoteCandidate({});
	        }
	      });
	    }, 4000);

	    return Promise.resolve();
	  };

	  RTCPeerConnection.prototype.close = function() {
	    this.transceivers.forEach(function(transceiver) {
	      /* not yet
	      if (transceiver.iceGatherer) {
	        transceiver.iceGatherer.close();
	      }
	      */
	      if (transceiver.iceTransport) {
	        transceiver.iceTransport.stop();
	      }
	      if (transceiver.dtlsTransport) {
	        transceiver.dtlsTransport.stop();
	      }
	      if (transceiver.rtpSender) {
	        transceiver.rtpSender.stop();
	      }
	      if (transceiver.rtpReceiver) {
	        transceiver.rtpReceiver.stop();
	      }
	    });
	    // FIXME: clean up tracks, local streams, remote streams, etc
	    this._isClosed = true;
	    this._updateSignalingState('closed');
	  };

	  // Update the signaling state.
	  RTCPeerConnection.prototype._updateSignalingState = function(newState) {
	    this.signalingState = newState;
	    var event = new Event('signalingstatechange');
	    this._dispatchEvent('signalingstatechange', event);
	  };

	  // Determine whether to fire the negotiationneeded event.
	  RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
	    var pc = this;
	    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
	      return;
	    }
	    this.needNegotiation = true;
	    window.setTimeout(function() {
	      if (pc.needNegotiation) {
	        pc.needNegotiation = false;
	        var event = new Event('negotiationneeded');
	        pc._dispatchEvent('negotiationneeded', event);
	      }
	    }, 0);
	  };

	  // Update the ice connection state.
	  RTCPeerConnection.prototype._updateIceConnectionState = function() {
	    var newState;
	    var states = {
	      'new': 0,
	      closed: 0,
	      checking: 0,
	      connected: 0,
	      completed: 0,
	      disconnected: 0,
	      failed: 0
	    };
	    this.transceivers.forEach(function(transceiver) {
	      if (transceiver.iceTransport && !transceiver.rejected) {
	        states[transceiver.iceTransport.state]++;
	      }
	    });

	    newState = 'new';
	    if (states.failed > 0) {
	      newState = 'failed';
	    } else if (states.checking > 0) {
	      newState = 'checking';
	    } else if (states.disconnected > 0) {
	      newState = 'disconnected';
	    } else if (states.new > 0) {
	      newState = 'new';
	    } else if (states.connected > 0) {
	      newState = 'connected';
	    } else if (states.completed > 0) {
	      newState = 'completed';
	    }

	    if (newState !== this.iceConnectionState) {
	      this.iceConnectionState = newState;
	      var event = new Event('iceconnectionstatechange');
	      this._dispatchEvent('iceconnectionstatechange', event);
	    }
	  };

	  // Update the connection state.
	  RTCPeerConnection.prototype._updateConnectionState = function() {
	    var newState;
	    var states = {
	      'new': 0,
	      closed: 0,
	      connecting: 0,
	      connected: 0,
	      completed: 0,
	      disconnected: 0,
	      failed: 0
	    };
	    this.transceivers.forEach(function(transceiver) {
	      if (transceiver.iceTransport && transceiver.dtlsTransport &&
	          !transceiver.rejected) {
	        states[transceiver.iceTransport.state]++;
	        states[transceiver.dtlsTransport.state]++;
	      }
	    });
	    // ICETransport.completed and connected are the same for this purpose.
	    states.connected += states.completed;

	    newState = 'new';
	    if (states.failed > 0) {
	      newState = 'failed';
	    } else if (states.connecting > 0) {
	      newState = 'connecting';
	    } else if (states.disconnected > 0) {
	      newState = 'disconnected';
	    } else if (states.new > 0) {
	      newState = 'new';
	    } else if (states.connected > 0) {
	      newState = 'connected';
	    }

	    if (newState !== this.connectionState) {
	      this.connectionState = newState;
	      var event = new Event('connectionstatechange');
	      this._dispatchEvent('connectionstatechange', event);
	    }
	  };

	  RTCPeerConnection.prototype.createOffer = function() {
	    var pc = this;

	    if (pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not call createOffer after close'));
	    }

	    var numAudioTracks = pc.transceivers.filter(function(t) {
	      return t.kind === 'audio';
	    }).length;
	    var numVideoTracks = pc.transceivers.filter(function(t) {
	      return t.kind === 'video';
	    }).length;

	    // Determine number of audio and video tracks we need to send/recv.
	    var offerOptions = arguments[0];
	    if (offerOptions) {
	      // Reject Chrome legacy constraints.
	      if (offerOptions.mandatory || offerOptions.optional) {
	        throw new TypeError(
	            'Legacy mandatory/optional constraints not supported.');
	      }
	      if (offerOptions.offerToReceiveAudio !== undefined) {
	        if (offerOptions.offerToReceiveAudio === true) {
	          numAudioTracks = 1;
	        } else if (offerOptions.offerToReceiveAudio === false) {
	          numAudioTracks = 0;
	        } else {
	          numAudioTracks = offerOptions.offerToReceiveAudio;
	        }
	      }
	      if (offerOptions.offerToReceiveVideo !== undefined) {
	        if (offerOptions.offerToReceiveVideo === true) {
	          numVideoTracks = 1;
	        } else if (offerOptions.offerToReceiveVideo === false) {
	          numVideoTracks = 0;
	        } else {
	          numVideoTracks = offerOptions.offerToReceiveVideo;
	        }
	      }
	    }

	    pc.transceivers.forEach(function(transceiver) {
	      if (transceiver.kind === 'audio') {
	        numAudioTracks--;
	        if (numAudioTracks < 0) {
	          transceiver.wantReceive = false;
	        }
	      } else if (transceiver.kind === 'video') {
	        numVideoTracks--;
	        if (numVideoTracks < 0) {
	          transceiver.wantReceive = false;
	        }
	      }
	    });

	    // Create M-lines for recvonly streams.
	    while (numAudioTracks > 0 || numVideoTracks > 0) {
	      if (numAudioTracks > 0) {
	        pc._createTransceiver('audio');
	        numAudioTracks--;
	      }
	      if (numVideoTracks > 0) {
	        pc._createTransceiver('video');
	        numVideoTracks--;
	      }
	    }

	    var sdp$$1 = sdp.writeSessionBoilerplate(pc._sdpSessionId,
	        pc._sdpSessionVersion++);
	    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	      // For each track, create an ice gatherer, ice transport,
	      // dtls transport, potentially rtpsender and rtpreceiver.
	      var track = transceiver.track;
	      var kind = transceiver.kind;
	      var mid = transceiver.mid || sdp.generateIdentifier();
	      transceiver.mid = mid;

	      if (!transceiver.iceGatherer) {
	        transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
	            pc.usingBundle);
	      }

	      var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
	      // filter RTX until additional stuff needed for RTX is implemented
	      // in adapter.js
	      if (edgeVersion < 15019) {
	        localCapabilities.codecs = localCapabilities.codecs.filter(
	            function(codec) {
	              return codec.name !== 'rtx';
	            });
	      }
	      localCapabilities.codecs.forEach(function(codec) {
	        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
	        // by adding level-asymmetry-allowed=1
	        if (codec.name === 'H264' &&
	            codec.parameters['level-asymmetry-allowed'] === undefined) {
	          codec.parameters['level-asymmetry-allowed'] = '1';
	        }

	        // for subsequent offers, we might have to re-use the payload
	        // type of the last offer.
	        if (transceiver.remoteCapabilities &&
	            transceiver.remoteCapabilities.codecs) {
	          transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
	            if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
	                codec.clockRate === remoteCodec.clockRate) {
	              codec.preferredPayloadType = remoteCodec.payloadType;
	            }
	          });
	        }
	      });
	      localCapabilities.headerExtensions.forEach(function(hdrExt) {
	        var remoteExtensions = transceiver.remoteCapabilities &&
	            transceiver.remoteCapabilities.headerExtensions || [];
	        remoteExtensions.forEach(function(rHdrExt) {
	          if (hdrExt.uri === rHdrExt.uri) {
	            hdrExt.id = rHdrExt.id;
	          }
	        });
	      });

	      // generate an ssrc now, to be used later in rtpSender.send
	      var sendEncodingParameters = transceiver.sendEncodingParameters || [{
	        ssrc: (2 * sdpMLineIndex + 1) * 1001
	      }];
	      if (track) {
	        // add RTX
	        if (edgeVersion >= 15019 && kind === 'video' &&
	            !sendEncodingParameters[0].rtx) {
	          sendEncodingParameters[0].rtx = {
	            ssrc: sendEncodingParameters[0].ssrc + 1
	          };
	        }
	      }

	      if (transceiver.wantReceive) {
	        transceiver.rtpReceiver = new window.RTCRtpReceiver(
	            transceiver.dtlsTransport, kind);
	      }

	      transceiver.localCapabilities = localCapabilities;
	      transceiver.sendEncodingParameters = sendEncodingParameters;
	    });

	    // always offer BUNDLE and dispose on return if not supported.
	    if (pc._config.bundlePolicy !== 'max-compat') {
	      sdp$$1 += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
	        return t.mid;
	      }).join(' ') + '\r\n';
	    }
	    sdp$$1 += 'a=ice-options:trickle\r\n';

	    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	      sdp$$1 += writeMediaSection(transceiver, transceiver.localCapabilities,
	          'offer', transceiver.stream, pc._dtlsRole);
	      sdp$$1 += 'a=rtcp-rsize\r\n';

	      if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
	          (sdpMLineIndex === 0 || !pc.usingBundle)) {
	        transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
	          cand.component = 1;
	          sdp$$1 += 'a=' + sdp.writeCandidate(cand) + '\r\n';
	        });

	        if (transceiver.iceGatherer.state === 'completed') {
	          sdp$$1 += 'a=end-of-candidates\r\n';
	        }
	      }
	    });

	    var desc = new window.RTCSessionDescription({
	      type: 'offer',
	      sdp: sdp$$1
	    });
	    return Promise.resolve(desc);
	  };

	  RTCPeerConnection.prototype.createAnswer = function() {
	    var pc = this;

	    if (pc._isClosed) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not call createAnswer after close'));
	    }

	    if (!(pc.signalingState === 'have-remote-offer' ||
	        pc.signalingState === 'have-local-pranswer')) {
	      return Promise.reject(makeError('InvalidStateError',
	          'Can not call createAnswer in signalingState ' + pc.signalingState));
	    }

	    var sdp$$1 = sdp.writeSessionBoilerplate(pc._sdpSessionId,
	        pc._sdpSessionVersion++);
	    if (pc.usingBundle) {
	      sdp$$1 += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
	        return t.mid;
	      }).join(' ') + '\r\n';
	    }
	    sdp$$1 += 'a=ice-options:trickle\r\n';

	    var mediaSectionsInOffer = sdp.getMediaSections(
	        pc._remoteDescription.sdp).length;
	    pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
	      if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
	        return;
	      }
	      if (transceiver.rejected) {
	        if (transceiver.kind === 'application') {
	          if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
	            sdp$$1 += 'm=application 0 DTLS/SCTP 5000\r\n';
	          } else {
	            sdp$$1 += 'm=application 0 ' + transceiver.protocol +
	                ' webrtc-datachannel\r\n';
	          }
	        } else if (transceiver.kind === 'audio') {
	          sdp$$1 += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
	              'a=rtpmap:0 PCMU/8000\r\n';
	        } else if (transceiver.kind === 'video') {
	          sdp$$1 += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
	              'a=rtpmap:120 VP8/90000\r\n';
	        }
	        sdp$$1 += 'c=IN IP4 0.0.0.0\r\n' +
	            'a=inactive\r\n' +
	            'a=mid:' + transceiver.mid + '\r\n';
	        return;
	      }

	      // FIXME: look at direction.
	      if (transceiver.stream) {
	        var localTrack;
	        if (transceiver.kind === 'audio') {
	          localTrack = transceiver.stream.getAudioTracks()[0];
	        } else if (transceiver.kind === 'video') {
	          localTrack = transceiver.stream.getVideoTracks()[0];
	        }
	        if (localTrack) {
	          // add RTX
	          if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
	              !transceiver.sendEncodingParameters[0].rtx) {
	            transceiver.sendEncodingParameters[0].rtx = {
	              ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
	            };
	          }
	        }
	      }

	      // Calculate intersection of capabilities.
	      var commonCapabilities = getCommonCapabilities(
	          transceiver.localCapabilities,
	          transceiver.remoteCapabilities);

	      var hasRtx = commonCapabilities.codecs.filter(function(c) {
	        return c.name.toLowerCase() === 'rtx';
	      }).length;
	      if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
	        delete transceiver.sendEncodingParameters[0].rtx;
	      }

	      sdp$$1 += writeMediaSection(transceiver, commonCapabilities,
	          'answer', transceiver.stream, pc._dtlsRole);
	      if (transceiver.rtcpParameters &&
	          transceiver.rtcpParameters.reducedSize) {
	        sdp$$1 += 'a=rtcp-rsize\r\n';
	      }
	    });

	    var desc = new window.RTCSessionDescription({
	      type: 'answer',
	      sdp: sdp$$1
	    });
	    return Promise.resolve(desc);
	  };

	  RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
	    var pc = this;
	    var sections;
	    if (candidate && !(candidate.sdpMLineIndex !== undefined ||
	        candidate.sdpMid)) {
	      return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
	    }

	    // TODO: needs to go into ops queue.
	    return new Promise(function(resolve, reject) {
	      if (!pc._remoteDescription) {
	        return reject(makeError('InvalidStateError',
	            'Can not add ICE candidate without a remote description'));
	      } else if (!candidate || candidate.candidate === '') {
	        for (var j = 0; j < pc.transceivers.length; j++) {
	          if (pc.transceivers[j].rejected) {
	            continue;
	          }
	          pc.transceivers[j].iceTransport.addRemoteCandidate({});
	          sections = sdp.getMediaSections(pc._remoteDescription.sdp);
	          sections[j] += 'a=end-of-candidates\r\n';
	          pc._remoteDescription.sdp =
	              sdp.getDescription(pc._remoteDescription.sdp) +
	              sections.join('');
	          if (pc.usingBundle) {
	            break;
	          }
	        }
	      } else {
	        var sdpMLineIndex = candidate.sdpMLineIndex;
	        if (candidate.sdpMid) {
	          for (var i = 0; i < pc.transceivers.length; i++) {
	            if (pc.transceivers[i].mid === candidate.sdpMid) {
	              sdpMLineIndex = i;
	              break;
	            }
	          }
	        }
	        var transceiver = pc.transceivers[sdpMLineIndex];
	        if (transceiver) {
	          if (transceiver.rejected) {
	            return resolve();
	          }
	          var cand = Object.keys(candidate.candidate).length > 0 ?
	              sdp.parseCandidate(candidate.candidate) : {};
	          // Ignore Chrome's invalid candidates since Edge does not like them.
	          if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
	            return resolve();
	          }
	          // Ignore RTCP candidates, we assume RTCP-MUX.
	          if (cand.component && cand.component !== 1) {
	            return resolve();
	          }
	          // when using bundle, avoid adding candidates to the wrong
	          // ice transport. And avoid adding candidates added in the SDP.
	          if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
	              transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
	            if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
	              return reject(makeError('OperationError',
	                  'Can not add ICE candidate'));
	            }
	          }

	          // update the remoteDescription.
	          var candidateString = candidate.candidate.trim();
	          if (candidateString.indexOf('a=') === 0) {
	            candidateString = candidateString.substr(2);
	          }
	          sections = sdp.getMediaSections(pc._remoteDescription.sdp);
	          sections[sdpMLineIndex] += 'a=' +
	              (cand.type ? candidateString : 'end-of-candidates')
	              + '\r\n';
	          pc._remoteDescription.sdp =
	              sdp.getDescription(pc._remoteDescription.sdp) +
	              sections.join('');
	        } else {
	          return reject(makeError('OperationError',
	              'Can not add ICE candidate'));
	        }
	      }
	      resolve();
	    });
	  };

	  RTCPeerConnection.prototype.getStats = function(selector) {
	    if (selector && selector instanceof window.MediaStreamTrack) {
	      var senderOrReceiver = null;
	      this.transceivers.forEach(function(transceiver) {
	        if (transceiver.rtpSender &&
	            transceiver.rtpSender.track === selector) {
	          senderOrReceiver = transceiver.rtpSender;
	        } else if (transceiver.rtpReceiver &&
	            transceiver.rtpReceiver.track === selector) {
	          senderOrReceiver = transceiver.rtpReceiver;
	        }
	      });
	      if (!senderOrReceiver) {
	        throw makeError('InvalidAccessError', 'Invalid selector.');
	      }
	      return senderOrReceiver.getStats();
	    }

	    var promises = [];
	    this.transceivers.forEach(function(transceiver) {
	      ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
	          'dtlsTransport'].forEach(function(method) {
	            if (transceiver[method]) {
	              promises.push(transceiver[method].getStats());
	            }
	          });
	    });
	    return Promise.all(promises).then(function(allStats) {
	      var results = new Map();
	      allStats.forEach(function(stats) {
	        stats.forEach(function(stat) {
	          results.set(stat.id, stat);
	        });
	      });
	      return results;
	    });
	  };

	  // fix low-level stat names and return Map instead of object.
	  var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
	    'RTCIceTransport', 'RTCDtlsTransport'];
	  ortcObjects.forEach(function(ortcObjectName) {
	    var obj = window[ortcObjectName];
	    if (obj && obj.prototype && obj.prototype.getStats) {
	      var nativeGetstats = obj.prototype.getStats;
	      obj.prototype.getStats = function() {
	        return nativeGetstats.apply(this)
	        .then(function(nativeStats) {
	          var mapStats = new Map();
	          Object.keys(nativeStats).forEach(function(id) {
	            nativeStats[id].type = fixStatsType(nativeStats[id]);
	            mapStats.set(id, nativeStats[id]);
	          });
	          return mapStats;
	        });
	      };
	    }
	  });

	  // legacy callback shims. Should be moved to adapter.js some days.
	  var methods = ['createOffer', 'createAnswer'];
	  methods.forEach(function(method) {
	    var nativeMethod = RTCPeerConnection.prototype[method];
	    RTCPeerConnection.prototype[method] = function() {
	      var args = arguments;
	      if (typeof args[0] === 'function' ||
	          typeof args[1] === 'function') { // legacy
	        return nativeMethod.apply(this, [arguments[2]])
	        .then(function(description) {
	          if (typeof args[0] === 'function') {
	            args[0].apply(null, [description]);
	          }
	        }, function(error) {
	          if (typeof args[1] === 'function') {
	            args[1].apply(null, [error]);
	          }
	        });
	      }
	      return nativeMethod.apply(this, arguments);
	    };
	  });

	  methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
	  methods.forEach(function(method) {
	    var nativeMethod = RTCPeerConnection.prototype[method];
	    RTCPeerConnection.prototype[method] = function() {
	      var args = arguments;
	      if (typeof args[1] === 'function' ||
	          typeof args[2] === 'function') { // legacy
	        return nativeMethod.apply(this, arguments)
	        .then(function() {
	          if (typeof args[1] === 'function') {
	            args[1].apply(null);
	          }
	        }, function(error) {
	          if (typeof args[2] === 'function') {
	            args[2].apply(null, [error]);
	          }
	        });
	      }
	      return nativeMethod.apply(this, arguments);
	    };
	  });

	  // getStats is special. It doesn't have a spec legacy method yet we support
	  // getStats(something, cb) without error callbacks.
	  ['getStats'].forEach(function(method) {
	    var nativeMethod = RTCPeerConnection.prototype[method];
	    RTCPeerConnection.prototype[method] = function() {
	      var args = arguments;
	      if (typeof args[1] === 'function') {
	        return nativeMethod.apply(this, arguments)
	        .then(function() {
	          if (typeof args[1] === 'function') {
	            args[1].apply(null);
	          }
	        });
	      }
	      return nativeMethod.apply(this, arguments);
	    };
	  });

	  return RTCPeerConnection;
	};

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimGetUserMedia$1(window) {
	  const navigator = window && window.navigator;

	  const shimError_ = function(e) {
	    return {
	      name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
	      message: e.message,
	      constraint: e.constraint,
	      toString() {
	        return this.name;
	      }
	    };
	  };

	  // getUserMedia error shim.
	  const origGetUserMedia = navigator.mediaDevices.getUserMedia.
	      bind(navigator.mediaDevices);
	  navigator.mediaDevices.getUserMedia = function(c) {
	    return origGetUserMedia(c).catch(e => Promise.reject(shimError_(e)));
	  };
	}

	/*
	 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimGetDisplayMedia$1(window) {
	  if (!('getDisplayMedia' in window.navigator)) {
	    return;
	  }
	  if (!(window.navigator.mediaDevices)) {
	    return;
	  }
	  if (window.navigator.mediaDevices &&
	    'getDisplayMedia' in window.navigator.mediaDevices) {
	    return;
	  }
	  window.navigator.mediaDevices.getDisplayMedia =
	    window.navigator.getDisplayMedia.bind(window.navigator.mediaDevices);
	}

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimPeerConnection$1(window) {
	  const browserDetails = detectBrowser(window);

	  if (window.RTCIceGatherer) {
	    if (!window.RTCIceCandidate) {
	      window.RTCIceCandidate = function(args) {
	        return args;
	      };
	    }
	    if (!window.RTCSessionDescription) {
	      window.RTCSessionDescription = function(args) {
	        return args;
	      };
	    }
	    // this adds an additional event listener to MediaStrackTrack that signals
	    // when a tracks enabled property was changed. Workaround for a bug in
	    // addStream, see below. No longer required in 15025+
	    if (browserDetails.version < 15025) {
	      const origMSTEnabled = Object.getOwnPropertyDescriptor(
	          window.MediaStreamTrack.prototype, 'enabled');
	      Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
	        set(value) {
	          origMSTEnabled.set.call(this, value);
	          const ev = new Event('enabled');
	          ev.enabled = value;
	          this.dispatchEvent(ev);
	        }
	      });
	    }
	  }

	  // ORTC defines the DTMF sender a bit different.
	  // https://github.com/w3c/ortc/issues/714
	  if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
	    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
	      get() {
	        if (this._dtmf === undefined) {
	          if (this.track.kind === 'audio') {
	            this._dtmf = new window.RTCDtmfSender(this);
	          } else if (this.track.kind === 'video') {
	            this._dtmf = null;
	          }
	        }
	        return this._dtmf;
	      }
	    });
	  }
	  // Edge currently only implements the RTCDtmfSender, not the
	  // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
	  if (window.RTCDtmfSender && !window.RTCDTMFSender) {
	    window.RTCDTMFSender = window.RTCDtmfSender;
	  }

	  const RTCPeerConnectionShim = rtcpeerconnection(window,
	      browserDetails.version);
	  window.RTCPeerConnection = function(config) {
	    if (config && config.iceServers) {
	      config.iceServers = filterIceServers(config.iceServers,
	        browserDetails.version);
	      log('ICE servers after filtering:', config.iceServers);
	    }
	    return new RTCPeerConnectionShim(config);
	  };
	  window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
	}

	function shimReplaceTrack(window) {
	  // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
	  if (window.RTCRtpSender &&
	      !('replaceTrack' in window.RTCRtpSender.prototype)) {
	    window.RTCRtpSender.prototype.replaceTrack =
	        window.RTCRtpSender.prototype.setTrack;
	  }
	}

	var edgeShim = /*#__PURE__*/Object.freeze({
		shimPeerConnection: shimPeerConnection$1,
		shimReplaceTrack: shimReplaceTrack,
		shimGetUserMedia: shimGetUserMedia$1,
		shimGetDisplayMedia: shimGetDisplayMedia$1
	});

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimGetUserMedia$2(window) {
	  const browserDetails = detectBrowser(window);
	  const navigator = window && window.navigator;
	  const MediaStreamTrack = window && window.MediaStreamTrack;

	  navigator.getUserMedia = function(constraints, onSuccess, onError) {
	    // Replace Firefox 44+'s deprecation warning with unprefixed version.
	    deprecated('navigator.getUserMedia',
	        'navigator.mediaDevices.getUserMedia');
	    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
	  };

	  if (!(browserDetails.version > 55 &&
	      'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
	    const remap = function(obj, a, b) {
	      if (a in obj && !(b in obj)) {
	        obj[b] = obj[a];
	        delete obj[a];
	      }
	    };

	    const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
	        bind(navigator.mediaDevices);
	    navigator.mediaDevices.getUserMedia = function(c) {
	      if (typeof c === 'object' && typeof c.audio === 'object') {
	        c = JSON.parse(JSON.stringify(c));
	        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
	        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
	      }
	      return nativeGetUserMedia(c);
	    };

	    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
	      const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
	      MediaStreamTrack.prototype.getSettings = function() {
	        const obj = nativeGetSettings.apply(this, arguments);
	        remap(obj, 'mozAutoGainControl', 'autoGainControl');
	        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
	        return obj;
	      };
	    }

	    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
	      const nativeApplyConstraints =
	        MediaStreamTrack.prototype.applyConstraints;
	      MediaStreamTrack.prototype.applyConstraints = function(c) {
	        if (this.kind === 'audio' && typeof c === 'object') {
	          c = JSON.parse(JSON.stringify(c));
	          remap(c, 'autoGainControl', 'mozAutoGainControl');
	          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
	        }
	        return nativeApplyConstraints.apply(this, [c]);
	      };
	    }
	  }
	}

	/*
	 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimGetDisplayMedia$2(window, preferredMediaSource) {
	  if (window.navigator.mediaDevices &&
	    'getDisplayMedia' in window.navigator.mediaDevices) {
	    return;
	  }
	  if (!(window.navigator.mediaDevices)) {
	    return;
	  }
	  window.navigator.mediaDevices.getDisplayMedia = function(constraints) {
	    if (!(constraints && constraints.video)) {
	      const err = new DOMException('getDisplayMedia without video ' +
	          'constraints is undefined');
	      err.name = 'NotFoundError';
	      // from https://heycam.github.io/webidl/#idl-DOMException-error-names
	      err.code = 8;
	      return Promise.reject(err);
	    }
	    if (constraints.video === true) {
	      constraints.video = {mediaSource: preferredMediaSource};
	    } else {
	      constraints.video.mediaSource = preferredMediaSource;
	    }
	    return window.navigator.mediaDevices.getUserMedia(constraints);
	  };
	}

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimOnTrack$1(window) {
	  if (typeof window === 'object' && window.RTCTrackEvent &&
	      ('receiver' in window.RTCTrackEvent.prototype) &&
	      !('transceiver' in window.RTCTrackEvent.prototype)) {
	    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
	      get() {
	        return {receiver: this.receiver};
	      }
	    });
	  }
	}

	function shimPeerConnection$2(window) {
	  const browserDetails = detectBrowser(window);

	  if (typeof window !== 'object' ||
	      !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
	    return; // probably media.peerconnection.enabled=false in about:config
	  }
	  if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
	    // very basic support for old versions.
	    window.RTCPeerConnection = window.mozRTCPeerConnection;
	  }

	  // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
	  ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	      .forEach(function(method) {
	        const nativeMethod = window.RTCPeerConnection.prototype[method];
	        window.RTCPeerConnection.prototype[method] = function() {
	          arguments[0] = new ((method === 'addIceCandidate') ?
	              window.RTCIceCandidate :
	              window.RTCSessionDescription)(arguments[0]);
	          return nativeMethod.apply(this, arguments);
	        };
	      });

	  // support for addIceCandidate(null or undefined)
	  const nativeAddIceCandidate =
	      window.RTCPeerConnection.prototype.addIceCandidate;
	  window.RTCPeerConnection.prototype.addIceCandidate = function() {
	    if (!arguments[0]) {
	      if (arguments[1]) {
	        arguments[1].apply(null);
	      }
	      return Promise.resolve();
	    }
	    return nativeAddIceCandidate.apply(this, arguments);
	  };

	  const modernStatsTypes = {
	    inboundrtp: 'inbound-rtp',
	    outboundrtp: 'outbound-rtp',
	    candidatepair: 'candidate-pair',
	    localcandidate: 'local-candidate',
	    remotecandidate: 'remote-candidate'
	  };

	  const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
	  window.RTCPeerConnection.prototype.getStats = function(
	    selector,
	    onSucc,
	    onErr
	  ) {
	    return nativeGetStats.apply(this, [selector || null])
	      .then(stats => {
	        if (browserDetails.version < 53 && !onSucc) {
	          // Shim only promise getStats with spec-hyphens in type names
	          // Leave callback version alone; misc old uses of forEach before Map
	          try {
	            stats.forEach(stat => {
	              stat.type = modernStatsTypes[stat.type] || stat.type;
	            });
	          } catch (e) {
	            if (e.name !== 'TypeError') {
	              throw e;
	            }
	            // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
	            stats.forEach((stat, i) => {
	              stats.set(i, Object.assign({}, stat, {
	                type: modernStatsTypes[stat.type] || stat.type
	              }));
	            });
	          }
	        }
	        return stats;
	      })
	      .then(onSucc, onErr);
	  };
	}

	function shimSenderGetStats(window) {
	  if (!(typeof window === 'object' && window.RTCPeerConnection &&
	      window.RTCRtpSender)) {
	    return;
	  }
	  if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
	    return;
	  }
	  const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
	  if (origGetSenders) {
	    window.RTCPeerConnection.prototype.getSenders = function() {
	      const senders = origGetSenders.apply(this, []);
	      senders.forEach(sender => sender._pc = this);
	      return senders;
	    };
	  }

	  const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
	  if (origAddTrack) {
	    window.RTCPeerConnection.prototype.addTrack = function() {
	      const sender = origAddTrack.apply(this, arguments);
	      sender._pc = this;
	      return sender;
	    };
	  }
	  window.RTCRtpSender.prototype.getStats = function() {
	    return this.track ? this._pc.getStats(this.track) :
	        Promise.resolve(new Map());
	  };
	}

	function shimReceiverGetStats(window) {
	  if (!(typeof window === 'object' && window.RTCPeerConnection &&
	      window.RTCRtpSender)) {
	    return;
	  }
	  if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
	    return;
	  }
	  const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
	  if (origGetReceivers) {
	    window.RTCPeerConnection.prototype.getReceivers = function() {
	      const receivers = origGetReceivers.apply(this, []);
	      receivers.forEach(receiver => receiver._pc = this);
	      return receivers;
	    };
	  }
	  wrapPeerConnectionEvent(window, 'track', e => {
	    e.receiver._pc = e.srcElement;
	    return e;
	  });
	  window.RTCRtpReceiver.prototype.getStats = function() {
	    return this._pc.getStats(this.track);
	  };
	}

	function shimRemoveStream(window) {
	  if (!window.RTCPeerConnection ||
	      'removeStream' in window.RTCPeerConnection.prototype) {
	    return;
	  }
	  window.RTCPeerConnection.prototype.removeStream = function(stream) {
	    deprecated('removeStream', 'removeTrack');
	    this.getSenders().forEach(sender => {
	      if (sender.track && stream.getTracks().includes(sender.track)) {
	        this.removeTrack(sender);
	      }
	    });
	  };
	}

	function shimRTCDataChannel(window) {
	  // rename DataChannel to RTCDataChannel (native fix in FF60):
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
	  if (window.DataChannel && !window.RTCDataChannel) {
	    window.RTCDataChannel = window.DataChannel;
	  }
	}

	var firefoxShim = /*#__PURE__*/Object.freeze({
		shimOnTrack: shimOnTrack$1,
		shimPeerConnection: shimPeerConnection$2,
		shimSenderGetStats: shimSenderGetStats,
		shimReceiverGetStats: shimReceiverGetStats,
		shimRemoveStream: shimRemoveStream,
		shimRTCDataChannel: shimRTCDataChannel,
		shimGetUserMedia: shimGetUserMedia$2,
		shimGetDisplayMedia: shimGetDisplayMedia$2
	});

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimLocalStreamsAPI(window) {
	  if (typeof window !== 'object' || !window.RTCPeerConnection) {
	    return;
	  }
	  if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
	    window.RTCPeerConnection.prototype.getLocalStreams = function() {
	      if (!this._localStreams) {
	        this._localStreams = [];
	      }
	      return this._localStreams;
	    };
	  }
	  if (!('addStream' in window.RTCPeerConnection.prototype)) {
	    const _addTrack = window.RTCPeerConnection.prototype.addTrack;
	    window.RTCPeerConnection.prototype.addStream = function(stream) {
	      if (!this._localStreams) {
	        this._localStreams = [];
	      }
	      if (!this._localStreams.includes(stream)) {
	        this._localStreams.push(stream);
	      }
	      stream.getTracks().forEach(track => _addTrack.call(this, track, stream));
	    };

	    window.RTCPeerConnection.prototype.addTrack = function(track, stream) {
	      if (stream) {
	        if (!this._localStreams) {
	          this._localStreams = [stream];
	        } else if (!this._localStreams.includes(stream)) {
	          this._localStreams.push(stream);
	        }
	      }
	      return _addTrack.call(this, track, stream);
	    };
	  }
	  if (!('removeStream' in window.RTCPeerConnection.prototype)) {
	    window.RTCPeerConnection.prototype.removeStream = function(stream) {
	      if (!this._localStreams) {
	        this._localStreams = [];
	      }
	      const index = this._localStreams.indexOf(stream);
	      if (index === -1) {
	        return;
	      }
	      this._localStreams.splice(index, 1);
	      const tracks = stream.getTracks();
	      this.getSenders().forEach(sender => {
	        if (tracks.includes(sender.track)) {
	          this.removeTrack(sender);
	        }
	      });
	    };
	  }
	}

	function shimRemoteStreamsAPI(window) {
	  if (typeof window !== 'object' || !window.RTCPeerConnection) {
	    return;
	  }
	  if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
	    window.RTCPeerConnection.prototype.getRemoteStreams = function() {
	      return this._remoteStreams ? this._remoteStreams : [];
	    };
	  }
	  if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
	    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
	      get() {
	        return this._onaddstream;
	      },
	      set(f) {
	        if (this._onaddstream) {
	          this.removeEventListener('addstream', this._onaddstream);
	          this.removeEventListener('track', this._onaddstreampoly);
	        }
	        this.addEventListener('addstream', this._onaddstream = f);
	        this.addEventListener('track', this._onaddstreampoly = (e) => {
	          e.streams.forEach(stream => {
	            if (!this._remoteStreams) {
	              this._remoteStreams = [];
	            }
	            if (this._remoteStreams.includes(stream)) {
	              return;
	            }
	            this._remoteStreams.push(stream);
	            const event = new Event('addstream');
	            event.stream = stream;
	            this.dispatchEvent(event);
	          });
	        });
	      }
	    });
	    const origSetRemoteDescription =
	      window.RTCPeerConnection.prototype.setRemoteDescription;
	    window.RTCPeerConnection.prototype.setRemoteDescription = function() {
	      const pc = this;
	      if (!this._onaddstreampoly) {
	        this.addEventListener('track', this._onaddstreampoly = function(e) {
	          e.streams.forEach(stream => {
	            if (!pc._remoteStreams) {
	              pc._remoteStreams = [];
	            }
	            if (pc._remoteStreams.indexOf(stream) >= 0) {
	              return;
	            }
	            pc._remoteStreams.push(stream);
	            const event = new Event('addstream');
	            event.stream = stream;
	            pc.dispatchEvent(event);
	          });
	        });
	      }
	      return origSetRemoteDescription.apply(pc, arguments);
	    };
	  }
	}

	function shimCallbacksAPI(window) {
	  if (typeof window !== 'object' || !window.RTCPeerConnection) {
	    return;
	  }
	  const prototype = window.RTCPeerConnection.prototype;
	  const createOffer = prototype.createOffer;
	  const createAnswer = prototype.createAnswer;
	  const setLocalDescription = prototype.setLocalDescription;
	  const setRemoteDescription = prototype.setRemoteDescription;
	  const addIceCandidate = prototype.addIceCandidate;

	  prototype.createOffer = function(successCallback, failureCallback) {
	    const options = (arguments.length >= 2) ? arguments[2] : arguments[0];
	    const promise = createOffer.apply(this, [options]);
	    if (!failureCallback) {
	      return promise;
	    }
	    promise.then(successCallback, failureCallback);
	    return Promise.resolve();
	  };

	  prototype.createAnswer = function(successCallback, failureCallback) {
	    const options = (arguments.length >= 2) ? arguments[2] : arguments[0];
	    const promise = createAnswer.apply(this, [options]);
	    if (!failureCallback) {
	      return promise;
	    }
	    promise.then(successCallback, failureCallback);
	    return Promise.resolve();
	  };

	  let withCallback = function(description, successCallback, failureCallback) {
	    const promise = setLocalDescription.apply(this, [description]);
	    if (!failureCallback) {
	      return promise;
	    }
	    promise.then(successCallback, failureCallback);
	    return Promise.resolve();
	  };
	  prototype.setLocalDescription = withCallback;

	  withCallback = function(description, successCallback, failureCallback) {
	    const promise = setRemoteDescription.apply(this, [description]);
	    if (!failureCallback) {
	      return promise;
	    }
	    promise.then(successCallback, failureCallback);
	    return Promise.resolve();
	  };
	  prototype.setRemoteDescription = withCallback;

	  withCallback = function(candidate, successCallback, failureCallback) {
	    const promise = addIceCandidate.apply(this, [candidate]);
	    if (!failureCallback) {
	      return promise;
	    }
	    promise.then(successCallback, failureCallback);
	    return Promise.resolve();
	  };
	  prototype.addIceCandidate = withCallback;
	}

	function shimGetUserMedia$3(window) {
	  const navigator = window && window.navigator;

	  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	    // shim not needed in Safari 12.1
	    const mediaDevices = navigator.mediaDevices;
	    const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
	    navigator.mediaDevices.getUserMedia = (constraints) => {
	      return _getUserMedia(shimConstraints(constraints));
	    };
	  }

	  if (!navigator.getUserMedia && navigator.mediaDevices &&
	    navigator.mediaDevices.getUserMedia) {
	    navigator.getUserMedia = function(constraints, cb, errcb) {
	      navigator.mediaDevices.getUserMedia(constraints)
	      .then(cb, errcb);
	    }.bind(navigator);
	  }
	}

	function shimConstraints(constraints) {
	  if (constraints && constraints.video !== undefined) {
	    return Object.assign({},
	      constraints,
	      {video: compactObject(constraints.video)}
	    );
	  }

	  return constraints;
	}

	function shimRTCIceServerUrls(window) {
	  // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
	  const OrigPeerConnection = window.RTCPeerConnection;
	  window.RTCPeerConnection = function(pcConfig, pcConstraints) {
	    if (pcConfig && pcConfig.iceServers) {
	      const newIceServers = [];
	      for (let i = 0; i < pcConfig.iceServers.length; i++) {
	        let server = pcConfig.iceServers[i];
	        if (!server.hasOwnProperty('urls') &&
	            server.hasOwnProperty('url')) {
	          deprecated('RTCIceServer.url', 'RTCIceServer.urls');
	          server = JSON.parse(JSON.stringify(server));
	          server.urls = server.url;
	          delete server.url;
	          newIceServers.push(server);
	        } else {
	          newIceServers.push(pcConfig.iceServers[i]);
	        }
	      }
	      pcConfig.iceServers = newIceServers;
	    }
	    return new OrigPeerConnection(pcConfig, pcConstraints);
	  };
	  window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
	  // wrap static methods. Currently just generateCertificate.
	  if ('generateCertificate' in window.RTCPeerConnection) {
	    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	      get() {
	        return OrigPeerConnection.generateCertificate;
	      }
	    });
	  }
	}

	function shimTrackEventTransceiver(window) {
	  // Add event.transceiver member over deprecated event.receiver
	  if (typeof window === 'object' && window.RTCPeerConnection &&
	      ('receiver' in window.RTCTrackEvent.prototype) &&
	      // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
	      // defined for some reason even when window.RTCTransceiver is not.
	      !window.RTCTransceiver) {
	    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
	      get() {
	        return {receiver: this.receiver};
	      }
	    });
	  }
	}

	function shimCreateOfferLegacy(window) {
	  const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
	  window.RTCPeerConnection.prototype.createOffer = function(offerOptions) {
	    if (offerOptions) {
	      if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
	        // support bit values
	        offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
	      }
	      const audioTransceiver = this.getTransceivers().find(transceiver =>
	        transceiver.sender.track &&
	        transceiver.sender.track.kind === 'audio');
	      if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
	        if (audioTransceiver.direction === 'sendrecv') {
	          if (audioTransceiver.setDirection) {
	            audioTransceiver.setDirection('sendonly');
	          } else {
	            audioTransceiver.direction = 'sendonly';
	          }
	        } else if (audioTransceiver.direction === 'recvonly') {
	          if (audioTransceiver.setDirection) {
	            audioTransceiver.setDirection('inactive');
	          } else {
	            audioTransceiver.direction = 'inactive';
	          }
	        }
	      } else if (offerOptions.offerToReceiveAudio === true &&
	          !audioTransceiver) {
	        this.addTransceiver('audio');
	      }

	      if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
	        // support bit values
	        offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
	      }
	      const videoTransceiver = this.getTransceivers().find(transceiver =>
	        transceiver.sender.track &&
	        transceiver.sender.track.kind === 'video');
	      if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
	        if (videoTransceiver.direction === 'sendrecv') {
	          if (videoTransceiver.setDirection) {
	            videoTransceiver.setDirection('sendonly');
	          } else {
	            videoTransceiver.direction = 'sendonly';
	          }
	        } else if (videoTransceiver.direction === 'recvonly') {
	          if (videoTransceiver.setDirection) {
	            videoTransceiver.setDirection('inactive');
	          } else {
	            videoTransceiver.direction = 'inactive';
	          }
	        }
	      } else if (offerOptions.offerToReceiveVideo === true &&
	          !videoTransceiver) {
	        this.addTransceiver('video');
	      }
	    }
	    return origCreateOffer.apply(this, arguments);
	  };
	}

	var safariShim = /*#__PURE__*/Object.freeze({
		shimLocalStreamsAPI: shimLocalStreamsAPI,
		shimRemoteStreamsAPI: shimRemoteStreamsAPI,
		shimCallbacksAPI: shimCallbacksAPI,
		shimGetUserMedia: shimGetUserMedia$3,
		shimConstraints: shimConstraints,
		shimRTCIceServerUrls: shimRTCIceServerUrls,
		shimTrackEventTransceiver: shimTrackEventTransceiver,
		shimCreateOfferLegacy: shimCreateOfferLegacy
	});

	/*
	 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	function shimRTCIceCandidate(window) {
	  // foundation is arbitrarily chosen as an indicator for full support for
	  // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
	  if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'foundation' in
	      window.RTCIceCandidate.prototype)) {
	    return;
	  }

	  const NativeRTCIceCandidate = window.RTCIceCandidate;
	  window.RTCIceCandidate = function(args) {
	    // Remove the a= which shouldn't be part of the candidate string.
	    if (typeof args === 'object' && args.candidate &&
	        args.candidate.indexOf('a=') === 0) {
	      args = JSON.parse(JSON.stringify(args));
	      args.candidate = args.candidate.substr(2);
	    }

	    if (args.candidate && args.candidate.length) {
	      // Augment the native candidate with the parsed fields.
	      const nativeCandidate = new NativeRTCIceCandidate(args);
	      const parsedCandidate = sdp.parseCandidate(args.candidate);
	      const augmentedCandidate = Object.assign(nativeCandidate,
	          parsedCandidate);

	      // Add a serializer that does not serialize the extra attributes.
	      augmentedCandidate.toJSON = function() {
	        return {
	          candidate: augmentedCandidate.candidate,
	          sdpMid: augmentedCandidate.sdpMid,
	          sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
	          usernameFragment: augmentedCandidate.usernameFragment,
	        };
	      };
	      return augmentedCandidate;
	    }
	    return new NativeRTCIceCandidate(args);
	  };
	  window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

	  // Hook up the augmented candidate in onicecandidate and
	  // addEventListener('icecandidate', ...)
	  wrapPeerConnectionEvent(window, 'icecandidate', e => {
	    if (e.candidate) {
	      Object.defineProperty(e, 'candidate', {
	        value: new window.RTCIceCandidate(e.candidate),
	        writable: 'false'
	      });
	    }
	    return e;
	  });
	}

	function shimMaxMessageSize(window) {
	  if (window.RTCSctpTransport || !window.RTCPeerConnection) {
	    return;
	  }
	  const browserDetails = detectBrowser(window);

	  if (!('sctp' in window.RTCPeerConnection.prototype)) {
	    Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
	      get() {
	        return typeof this._sctp === 'undefined' ? null : this._sctp;
	      }
	    });
	  }

	  const sctpInDescription = function(description) {
	    const sections = sdp.splitSections(description.sdp);
	    sections.shift();
	    return sections.some(mediaSection => {
	      const mLine = sdp.parseMLine(mediaSection);
	      return mLine && mLine.kind === 'application'
	          && mLine.protocol.indexOf('SCTP') !== -1;
	    });
	  };

	  const getRemoteFirefoxVersion = function(description) {
	    // TODO: Is there a better solution for detecting Firefox?
	    const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
	    if (match === null || match.length < 2) {
	      return -1;
	    }
	    const version = parseInt(match[1], 10);
	    // Test for NaN (yes, this is ugly)
	    return version !== version ? -1 : version;
	  };

	  const getCanSendMaxMessageSize = function(remoteIsFirefox) {
	    // Every implementation we know can send at least 64 KiB.
	    // Note: Although Chrome is technically able to send up to 256 KiB, the
	    //       data does not reach the other peer reliably.
	    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
	    let canSendMaxMessageSize = 65536;
	    if (browserDetails.browser === 'firefox') {
	      if (browserDetails.version < 57) {
	        if (remoteIsFirefox === -1) {
	          // FF < 57 will send in 16 KiB chunks using the deprecated PPID
	          // fragmentation.
	          canSendMaxMessageSize = 16384;
	        } else {
	          // However, other FF (and RAWRTC) can reassemble PPID-fragmented
	          // messages. Thus, supporting ~2 GiB when sending.
	          canSendMaxMessageSize = 2147483637;
	        }
	      } else if (browserDetails.version < 60) {
	        // Currently, all FF >= 57 will reset the remote maximum message size
	        // to the default value when a data channel is created at a later
	        // stage. :(
	        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
	        canSendMaxMessageSize =
	          browserDetails.version === 57 ? 65535 : 65536;
	      } else {
	        // FF >= 60 supports sending ~2 GiB
	        canSendMaxMessageSize = 2147483637;
	      }
	    }
	    return canSendMaxMessageSize;
	  };

	  const getMaxMessageSize = function(description, remoteIsFirefox) {
	    // Note: 65536 bytes is the default value from the SDP spec. Also,
	    //       every implementation we know supports receiving 65536 bytes.
	    let maxMessageSize = 65536;

	    // FF 57 has a slightly incorrect default remote max message size, so
	    // we need to adjust it here to avoid a failure when sending.
	    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
	    if (browserDetails.browser === 'firefox'
	         && browserDetails.version === 57) {
	      maxMessageSize = 65535;
	    }

	    const match = sdp.matchPrefix(description.sdp,
	      'a=max-message-size:');
	    if (match.length > 0) {
	      maxMessageSize = parseInt(match[0].substr(19), 10);
	    } else if (browserDetails.browser === 'firefox' &&
	                remoteIsFirefox !== -1) {
	      // If the maximum message size is not present in the remote SDP and
	      // both local and remote are Firefox, the remote peer can receive
	      // ~2 GiB.
	      maxMessageSize = 2147483637;
	    }
	    return maxMessageSize;
	  };

	  const origSetRemoteDescription =
	      window.RTCPeerConnection.prototype.setRemoteDescription;
	  window.RTCPeerConnection.prototype.setRemoteDescription = function() {
	    this._sctp = null;

	    if (sctpInDescription(arguments[0])) {
	      // Check if the remote is FF.
	      const isFirefox = getRemoteFirefoxVersion(arguments[0]);

	      // Get the maximum message size the local peer is capable of sending
	      const canSendMMS = getCanSendMaxMessageSize(isFirefox);

	      // Get the maximum message size of the remote peer.
	      const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

	      // Determine final maximum message size
	      let maxMessageSize;
	      if (canSendMMS === 0 && remoteMMS === 0) {
	        maxMessageSize = Number.POSITIVE_INFINITY;
	      } else if (canSendMMS === 0 || remoteMMS === 0) {
	        maxMessageSize = Math.max(canSendMMS, remoteMMS);
	      } else {
	        maxMessageSize = Math.min(canSendMMS, remoteMMS);
	      }

	      // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
	      // attribute.
	      const sctp = {};
	      Object.defineProperty(sctp, 'maxMessageSize', {
	        get() {
	          return maxMessageSize;
	        }
	      });
	      this._sctp = sctp;
	    }

	    return origSetRemoteDescription.apply(this, arguments);
	  };
	}

	function shimSendThrowTypeError(window) {
	  if (!(window.RTCPeerConnection &&
	      'createDataChannel' in window.RTCPeerConnection.prototype)) {
	    return;
	  }

	  // Note: Although Firefox >= 57 has a native implementation, the maximum
	  //       message size can be reset for all data channels at a later stage.
	  //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

	  function wrapDcSend(dc, pc) {
	    const origDataChannelSend = dc.send;
	    dc.send = function() {
	      const data = arguments[0];
	      const length = data.length || data.size || data.byteLength;
	      if (dc.readyState === 'open' &&
	          pc.sctp && length > pc.sctp.maxMessageSize) {
	        throw new TypeError('Message too large (can send a maximum of ' +
	          pc.sctp.maxMessageSize + ' bytes)');
	      }
	      return origDataChannelSend.apply(dc, arguments);
	    };
	  }
	  const origCreateDataChannel =
	    window.RTCPeerConnection.prototype.createDataChannel;
	  window.RTCPeerConnection.prototype.createDataChannel = function() {
	    const dataChannel = origCreateDataChannel.apply(this, arguments);
	    wrapDcSend(dataChannel, this);
	    return dataChannel;
	  };
	  wrapPeerConnectionEvent(window, 'datachannel', e => {
	    wrapDcSend(e.channel, e.target);
	    return e;
	  });
	}


	/* shims RTCConnectionState by pretending it is the same as iceConnectionState.
	 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
	 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
	 * since DTLS failures would be hidden. See
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
	 * for the Firefox tracking bug.
	 */
	function shimConnectionState(window) {
	  if (!window.RTCPeerConnection ||
	      'connectionState' in window.RTCPeerConnection.prototype) {
	    return;
	  }
	  const proto = window.RTCPeerConnection.prototype;
	  Object.defineProperty(proto, 'connectionState', {
	    get() {
	      return {
	        completed: 'connected',
	        checking: 'connecting'
	      }[this.iceConnectionState] || this.iceConnectionState;
	    },
	    enumerable: true,
	    configurable: true
	  });
	  Object.defineProperty(proto, 'onconnectionstatechange', {
	    get() {
	      return this._onconnectionstatechange || null;
	    },
	    set(cb) {
	      if (this._onconnectionstatechange) {
	        this.removeEventListener('connectionstatechange',
	            this._onconnectionstatechange);
	        delete this._onconnectionstatechange;
	      }
	      if (cb) {
	        this.addEventListener('connectionstatechange',
	            this._onconnectionstatechange = cb);
	      }
	    },
	    enumerable: true,
	    configurable: true
	  });

	  ['setLocalDescription', 'setRemoteDescription'].forEach((method) => {
	    const origMethod = proto[method];
	    proto[method] = function() {
	      if (!this._connectionstatechangepoly) {
	        this._connectionstatechangepoly = e => {
	          const pc = e.target;
	          if (pc._lastConnectionState !== pc.connectionState) {
	            pc._lastConnectionState = pc.connectionState;
	            const newEvent = new Event('connectionstatechange', e);
	            pc.dispatchEvent(newEvent);
	          }
	          return e;
	        };
	        this.addEventListener('iceconnectionstatechange',
	          this._connectionstatechangepoly);
	      }
	      return origMethod.apply(this, arguments);
	    };
	  });
	}

	function removeAllowExtmapMixed(window) {
	  /* remove a=extmap-allow-mixed for Chrome < M71 */
	  if (!window.RTCPeerConnection) {
	    return;
	  }
	  const browserDetails = detectBrowser(window);
	  if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
	    return;
	  }
	  const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
	  window.RTCPeerConnection.prototype.setRemoteDescription = function(desc) {
	    if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
	      desc.sdp = desc.sdp.split('\n').filter((line) => {
	        return line.trim() !== 'a=extmap-allow-mixed';
	      }).join('\n');
	    }
	    return nativeSRD.apply(this, arguments);
	  };
	}

	var commonShim = /*#__PURE__*/Object.freeze({
		shimRTCIceCandidate: shimRTCIceCandidate,
		shimMaxMessageSize: shimMaxMessageSize,
		shimSendThrowTypeError: shimSendThrowTypeError,
		shimConnectionState: shimConnectionState,
		removeAllowExtmapMixed: removeAllowExtmapMixed
	});

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	// Shimming starts here.
	function adapterFactory({window} = {}, options = {
	  shimChrome: true,
	  shimFirefox: true,
	  shimEdge: true,
	  shimSafari: true,
	}) {
	  // Utils.
	  const logging = log;
	  const browserDetails = detectBrowser(window);

	  const adapter = {
	    browserDetails,
	    commonShim,
	    extractVersion: extractVersion,
	    disableLog: disableLog,
	    disableWarnings: disableWarnings
	  };

	  // Shim browser if found.
	  switch (browserDetails.browser) {
	    case 'chrome':
	      if (!chromeShim || !shimPeerConnection ||
	          !options.shimChrome) {
	        logging('Chrome shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming chrome.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = chromeShim;

	      shimGetUserMedia(window);
	      shimMediaStream(window);
	      shimPeerConnection(window);
	      shimOnTrack(window);
	      shimAddTrackRemoveTrack(window);
	      shimGetSendersWithDtmf(window);
	      shimSenderReceiverGetStats(window);
	      fixNegotiationNeeded(window);

	      shimRTCIceCandidate(window);
	      shimConnectionState(window);
	      shimMaxMessageSize(window);
	      shimSendThrowTypeError(window);
	      removeAllowExtmapMixed(window);
	      break;
	    case 'firefox':
	      if (!firefoxShim || !shimPeerConnection$2 ||
	          !options.shimFirefox) {
	        logging('Firefox shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming firefox.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = firefoxShim;

	      shimGetUserMedia$2(window);
	      shimPeerConnection$2(window);
	      shimOnTrack$1(window);
	      shimRemoveStream(window);
	      shimSenderGetStats(window);
	      shimReceiverGetStats(window);
	      shimRTCDataChannel(window);

	      shimRTCIceCandidate(window);
	      shimConnectionState(window);
	      shimMaxMessageSize(window);
	      shimSendThrowTypeError(window);
	      break;
	    case 'edge':
	      if (!edgeShim || !shimPeerConnection$1 || !options.shimEdge) {
	        logging('MS edge shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming edge.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = edgeShim;

	      shimGetUserMedia$1(window);
	      shimGetDisplayMedia$1(window);
	      shimPeerConnection$1(window);
	      shimReplaceTrack(window);

	      // the edge shim implements the full RTCIceCandidate object.

	      shimMaxMessageSize(window);
	      shimSendThrowTypeError(window);
	      break;
	    case 'safari':
	      if (!safariShim || !options.shimSafari) {
	        logging('Safari shim is not included in this adapter release.');
	        return adapter;
	      }
	      logging('adapter.js shimming safari.');
	      // Export to the adapter global object visible in the browser.
	      adapter.browserShim = safariShim;

	      shimRTCIceServerUrls(window);
	      shimCreateOfferLegacy(window);
	      shimCallbacksAPI(window);
	      shimLocalStreamsAPI(window);
	      shimRemoteStreamsAPI(window);
	      shimTrackEventTransceiver(window);
	      shimGetUserMedia$3(window);

	      shimRTCIceCandidate(window);
	      shimMaxMessageSize(window);
	      shimSendThrowTypeError(window);
	      removeAllowExtmapMixed(window);
	      break;
	    default:
	      logging('Unsupported browser!');
	      break;
	  }

	  return adapter;
	}

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */

	const adapter = adapterFactory({window});

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	/** Console logging verbosity for the SDK. */
	var LogLevel;
	(function (LogLevel) {
	    /** No logs will be generated. */
	    LogLevel[LogLevel["None"] = 0] = "None";
	    /** Only SDK internal errors will be logged. */
	    LogLevel[LogLevel["Error"] = 1] = "Error";
	    /** Information useful for debugging the SDK will be logged. */
	    LogLevel[LogLevel["Debug"] = 2] = "Debug";
	    /** All SDK actions will be logged. */
	    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
	})(LogLevel || (LogLevel = {}));

	/** JSDoc */
	var Severity;
	(function (Severity) {
	    /** JSDoc */
	    Severity["Fatal"] = "fatal";
	    /** JSDoc */
	    Severity["Error"] = "error";
	    /** JSDoc */
	    Severity["Warning"] = "warning";
	    /** JSDoc */
	    Severity["Log"] = "log";
	    /** JSDoc */
	    Severity["Info"] = "info";
	    /** JSDoc */
	    Severity["Debug"] = "debug";
	    /** JSDoc */
	    Severity["Critical"] = "critical";
	})(Severity || (Severity = {}));
	// tslint:disable:completed-docs
	// tslint:disable:no-unnecessary-qualifier no-namespace
	(function (Severity) {
	    /**
	     * Converts a string-based level into a {@link Severity}.
	     *
	     * @param level string representation of Severity
	     * @returns Severity
	     */
	    function fromString(level) {
	        switch (level) {
	            case 'debug':
	                return Severity.Debug;
	            case 'info':
	                return Severity.Info;
	            case 'warn':
	            case 'warning':
	                return Severity.Warning;
	            case 'error':
	                return Severity.Error;
	            case 'fatal':
	                return Severity.Fatal;
	            case 'critical':
	                return Severity.Critical;
	            case 'log':
	            default:
	                return Severity.Log;
	        }
	    }
	    Severity.fromString = fromString;
	})(Severity || (Severity = {}));

	/** The status of an event. */
	var Status;
	(function (Status) {
	    /** The status could not be determined. */
	    Status["Unknown"] = "unknown";
	    /** The event was skipped due to configuration or callbacks. */
	    Status["Skipped"] = "skipped";
	    /** The event was sent to Sentry successfully. */
	    Status["Success"] = "success";
	    /** The client is currently rate limited and will try again later. */
	    Status["RateLimit"] = "rate_limit";
	    /** The event could not be processed. */
	    Status["Invalid"] = "invalid";
	    /** A server-side error ocurred during submission. */
	    Status["Failed"] = "failed";
	})(Status || (Status = {}));
	// tslint:disable:completed-docs
	// tslint:disable:no-unnecessary-qualifier no-namespace
	(function (Status) {
	    /**
	     * Converts a HTTP status code into a {@link Status}.
	     *
	     * @param code The HTTP response status code.
	     * @returns The send status or {@link Status.Unknown}.
	     */
	    function fromHttpCode(code) {
	        if (code >= 200 && code < 300) {
	            return Status.Success;
	        }
	        if (code === 429) {
	            return Status.RateLimit;
	        }
	        if (code >= 400 && code < 500) {
	            return Status.Invalid;
	        }
	        if (code >= 500) {
	            return Status.Failed;
	        }
	        return Status.Unknown;
	    }
	    Status.fromHttpCode = fromHttpCode;
	})(Status || (Status = {}));

	var setPrototypeOf = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties); // tslint:disable-line:no-unbound-method
	/**
	 * setPrototypeOf polyfill using __proto__
	 */
	function setProtoOf(obj, proto) {
	    // @ts-ignore
	    obj.__proto__ = proto;
	    return obj;
	}
	/**
	 * setPrototypeOf polyfill using mixin
	 */
	function mixinProperties(obj, proto) {
	    for (var prop in proto) {
	        if (!obj.hasOwnProperty(prop)) {
	            // @ts-ignore
	            obj[prop] = proto[prop];
	        }
	    }
	    return obj;
	}

	/** An error emitted by Sentry SDKs and related utilities. */
	var SentryError = /** @class */ (function (_super) {
	    __extends(SentryError, _super);
	    function SentryError(message) {
	        var _newTarget = this.constructor;
	        var _this = _super.call(this, message) || this;
	        _this.message = message;
	        // tslint:disable:no-unsafe-any
	        _this.name = _newTarget.prototype.constructor.name;
	        setPrototypeOf(_this, _newTarget.prototype);
	        return _this;
	    }
	    return SentryError;
	}(Error));

	/**
	 * Checks whether given value's type is one of a few Error or Error-like
	 * {@link isError}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isError(wat) {
	    switch (Object.prototype.toString.call(wat)) {
	        case '[object Error]':
	            return true;
	        case '[object Exception]':
	            return true;
	        case '[object DOMException]':
	            return true;
	        default:
	            return wat instanceof Error;
	    }
	}
	/**
	 * Checks whether given value's type is ErrorEvent
	 * {@link isErrorEvent}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isErrorEvent(wat) {
	    return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
	}
	/**
	 * Checks whether given value's type is DOMError
	 * {@link isDOMError}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isDOMError(wat) {
	    return Object.prototype.toString.call(wat) === '[object DOMError]';
	}
	/**
	 * Checks whether given value's type is DOMException
	 * {@link isDOMException}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isDOMException(wat) {
	    return Object.prototype.toString.call(wat) === '[object DOMException]';
	}
	/**
	 * Checks whether given value's type is a string
	 * {@link isString}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isString(wat) {
	    return Object.prototype.toString.call(wat) === '[object String]';
	}
	/**
	 * Checks whether given value's is a primitive (undefined, null, number, boolean, string)
	 * {@link isPrimitive}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isPrimitive(wat) {
	    return wat === null || (typeof wat !== 'object' && typeof wat !== 'function');
	}
	/**
	 * Checks whether given value's type is an object literal
	 * {@link isPlainObject}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isPlainObject(wat) {
	    return Object.prototype.toString.call(wat) === '[object Object]';
	}
	/**
	 * Checks whether given value's type is an regexp
	 * {@link isRegExp}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isRegExp(wat) {
	    return Object.prototype.toString.call(wat) === '[object RegExp]';
	}
	/**
	 * Checks whether given value has a then function.
	 * @param wat A value to be checked.
	 */
	function isThenable(wat) {
	    // tslint:disable:no-unsafe-any
	    return Boolean(wat && wat.then && typeof wat.then === 'function');
	    // tslint:enable:no-unsafe-any
	}
	/**
	 * Checks whether given value's type is a SyntheticEvent
	 * {@link isSyntheticEvent}.
	 *
	 * @param wat A value to be checked.
	 * @returns A boolean representing the result.
	 */
	function isSyntheticEvent(wat) {
	    // tslint:disable-next-line:no-unsafe-any
	    return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
	}

	/**
	 * Requires a module which is protected _against bundler minification.
	 *
	 * @param request The module path to resolve
	 */
	function dynamicRequire(mod, request) {
	    // tslint:disable-next-line: no-unsafe-any
	    return mod.require(request);
	}
	/**
	 * Checks whether we're in the Node.js or Browser environment
	 *
	 * @returns Answer to given question
	 */
	function isNodeEnv() {
	    // tslint:disable:strict-type-predicates
	    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
	}
	var fallbackGlobalObject = {};
	/**
	 * Safely get global scope object
	 *
	 * @returns Global scope object
	 */
	function getGlobalObject() {
	    return (isNodeEnv()
	        ? global
	        : typeof window !== 'undefined'
	            ? window
	            : typeof self !== 'undefined'
	                ? self
	                : fallbackGlobalObject);
	}
	/**
	 * UUID4 generator
	 *
	 * @returns string Generated UUID4.
	 */
	function uuid4() {
	    var global = getGlobalObject();
	    var crypto = global.crypto || global.msCrypto;
	    if (!(crypto === void 0) && crypto.getRandomValues) {
	        // Use window.crypto API if available
	        var arr = new Uint16Array(8);
	        crypto.getRandomValues(arr);
	        // set 4 in byte 7
	        // tslint:disable-next-line:no-bitwise
	        arr[3] = (arr[3] & 0xfff) | 0x4000;
	        // set 2 most significant bits of byte 9 to '10'
	        // tslint:disable-next-line:no-bitwise
	        arr[4] = (arr[4] & 0x3fff) | 0x8000;
	        var pad = function (num) {
	            var v = num.toString(16);
	            while (v.length < 4) {
	                v = "0" + v;
	            }
	            return v;
	        };
	        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
	    }
	    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
	    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        // tslint:disable-next-line:no-bitwise
	        var r = (Math.random() * 16) | 0;
	        // tslint:disable-next-line:no-bitwise
	        var v = c === 'x' ? r : (r & 0x3) | 0x8;
	        return v.toString(16);
	    });
	}
	/**
	 * Parses string form of URL into an object
	 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
	 * // intentionally using regex and not <a/> href parsing trick because React Native and other
	 * // environments where DOM might not be available
	 * @returns parsed URL object
	 */
	function parseUrl(url) {
	    if (!url) {
	        return {};
	    }
	    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
	    if (!match) {
	        return {};
	    }
	    // coerce to undefined values to empty string so we don't get 'undefined'
	    var query = match[6] || '';
	    var fragment = match[8] || '';
	    return {
	        host: match[4],
	        path: match[5],
	        protocol: match[2],
	        relative: match[5] + query + fragment,
	    };
	}
	/**
	 * Extracts either message or type+value from an event that can be used for user-facing logs
	 * @returns event's description
	 */
	function getEventDescription(event) {
	    if (event.message) {
	        return event.message;
	    }
	    if (event.exception && event.exception.values && event.exception.values[0]) {
	        var exception = event.exception.values[0];
	        if (exception.type && exception.value) {
	            return exception.type + ": " + exception.value;
	        }
	        return exception.type || exception.value || event.event_id || '<unknown>';
	    }
	    return event.event_id || '<unknown>';
	}
	/** JSDoc */
	function consoleSandbox(callback) {
	    var global = getGlobalObject();
	    var levels = ['debug', 'info', 'warn', 'error', 'log', 'assert'];
	    if (!('console' in global)) {
	        return callback();
	    }
	    var originalConsole = global.console;
	    var wrappedLevels = {};
	    // Restore all wrapped console methods
	    levels.forEach(function (level) {
	        if (level in global.console && originalConsole[level].__sentry__) {
	            wrappedLevels[level] = originalConsole[level].__sentry_wrapped__;
	            originalConsole[level] = originalConsole[level].__sentry_original__;
	        }
	    });
	    // Perform callback manipulations
	    var result = callback();
	    // Revert restoration to wrapped state
	    Object.keys(wrappedLevels).forEach(function (level) {
	        originalConsole[level] = wrappedLevels[level];
	    });
	    return result;
	}
	/**
	 * Adds exception values, type and value to an synthetic Exception.
	 * @param event The event to modify.
	 * @param value Value of the exception.
	 * @param type Type of the exception.
	 * @param mechanism Mechanism of the exception.
	 * @hidden
	 */
	function addExceptionTypeValue(event, value, type, mechanism) {
	    if (mechanism === void 0) { mechanism = {
	        handled: true,
	        type: 'generic',
	    }; }
	    event.exception = event.exception || {};
	    event.exception.values = event.exception.values || [];
	    event.exception.values[0] = event.exception.values[0] || {};
	    event.exception.values[0].value = event.exception.values[0].value || value || '';
	    event.exception.values[0].type = event.exception.values[0].type || type || 'Error';
	    event.exception.values[0].mechanism = event.exception.values[0].mechanism || mechanism;
	}

	// TODO: Implement different loggers for different environments
	var global$1 = getGlobalObject();
	/** Prefix for logging strings */
	var PREFIX = 'Sentry Logger ';
	/** JSDoc */
	var Logger = /** @class */ (function () {
	    /** JSDoc */
	    function Logger() {
	        this._enabled = false;
	    }
	    /** JSDoc */
	    Logger.prototype.disable = function () {
	        this._enabled = false;
	    };
	    /** JSDoc */
	    Logger.prototype.enable = function () {
	        this._enabled = true;
	    };
	    /** JSDoc */
	    Logger.prototype.log = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (!this._enabled) {
	            return;
	        }
	        consoleSandbox(function () {
	            global$1.console.log(PREFIX + "[Log]: " + args.join(' ')); // tslint:disable-line:no-console
	        });
	    };
	    /** JSDoc */
	    Logger.prototype.warn = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (!this._enabled) {
	            return;
	        }
	        consoleSandbox(function () {
	            global$1.console.warn(PREFIX + "[Warn]: " + args.join(' ')); // tslint:disable-line:no-console
	        });
	    };
	    /** JSDoc */
	    Logger.prototype.error = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (!this._enabled) {
	            return;
	        }
	        consoleSandbox(function () {
	            global$1.console.error(PREFIX + "[Error]: " + args.join(' ')); // tslint:disable-line:no-console
	        });
	    };
	    return Logger;
	}());
	// Ensure we only have a single logger instance, even if multiple versions of @sentry/utils are being used
	global$1.__SENTRY__ = global$1.__SENTRY__ || {};
	var logger$1 = global$1.__SENTRY__.logger || (global$1.__SENTRY__.logger = new Logger());

	// tslint:disable:no-unsafe-any
	/**
	 * Memo class used for decycle json objects. Uses WeakSet if available otherwise array.
	 */
	var Memo = /** @class */ (function () {
	    function Memo() {
	        // tslint:disable-next-line
	        this._hasWeakSet = typeof WeakSet === 'function';
	        this._inner = this._hasWeakSet ? new WeakSet() : [];
	    }
	    /**
	     * Sets obj to remember.
	     * @param obj Object to remember
	     */
	    Memo.prototype.memoize = function (obj) {
	        if (this._hasWeakSet) {
	            if (this._inner.has(obj)) {
	                return true;
	            }
	            this._inner.add(obj);
	            return false;
	        }
	        // tslint:disable-next-line:prefer-for-of
	        for (var i = 0; i < this._inner.length; i++) {
	            var value = this._inner[i];
	            if (value === obj) {
	                return true;
	            }
	        }
	        this._inner.push(obj);
	        return false;
	    };
	    /**
	     * Removes object from internal storage.
	     * @param obj Object to forget
	     */
	    Memo.prototype.unmemoize = function (obj) {
	        if (this._hasWeakSet) {
	            this._inner.delete(obj);
	        }
	        else {
	            for (var i = 0; i < this._inner.length; i++) {
	                if (this._inner[i] === obj) {
	                    this._inner.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    };
	    return Memo;
	}());

	/**
	 * Wrap a given object method with a higher-order function
	 *
	 * @param source An object that contains a method to be wrapped.
	 * @param name A name of method to be wrapped.
	 * @param replacement A function that should be used to wrap a given method.
	 * @returns void
	 */
	function fill(source, name, replacement) {
	    if (!(name in source)) {
	        return;
	    }
	    var original = source[name];
	    var wrapped = replacement(original);
	    // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
	    // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
	    // tslint:disable-next-line:strict-type-predicates
	    if (typeof wrapped === 'function') {
	        try {
	            wrapped.prototype = wrapped.prototype || {};
	            Object.defineProperties(wrapped, {
	                __sentry__: {
	                    enumerable: false,
	                    value: true,
	                },
	                __sentry_original__: {
	                    enumerable: false,
	                    value: original,
	                },
	                __sentry_wrapped__: {
	                    enumerable: false,
	                    value: wrapped,
	                },
	            });
	        }
	        catch (_Oo) {
	            // This can throw if multiple fill happens on a global object like XMLHttpRequest
	            // Fixes https://github.com/getsentry/sentry-javascript/issues/2043
	        }
	    }
	    source[name] = wrapped;
	}
	/**
	 * Encodes given object into url-friendly format
	 *
	 * @param object An object that contains serializable values
	 * @returns string Encoded
	 */
	function urlEncode(object) {
	    return Object.keys(object)
	        .map(
	    // tslint:disable-next-line:no-unsafe-any
	    function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
	        .join('&');
	}
	/**
	 * Transforms Error object into an object literal with all it's attributes
	 * attached to it.
	 *
	 * Based on: https://github.com/ftlabs/js-abbreviate/blob/fa709e5f139e7770a71827b1893f22418097fbda/index.js#L95-L106
	 *
	 * @param error An Error containing all relevant information
	 * @returns An object with all error properties
	 */
	function objectifyError(error) {
	    // These properties are implemented as magical getters and don't show up in `for-in` loop
	    var err = {
	        message: error.message,
	        name: error.name,
	        stack: error.stack,
	    };
	    for (var i in error) {
	        if (Object.prototype.hasOwnProperty.call(error, i)) {
	            err[i] = error[i];
	        }
	    }
	    return err;
	}
	/** Calculates bytes size of input string */
	function utf8Length(value) {
	    // tslint:disable-next-line:no-bitwise
	    return ~-encodeURI(value).split(/%..|./).length;
	}
	/** Calculates bytes size of input object */
	function jsonSize(value) {
	    return utf8Length(JSON.stringify(value));
	}
	/** JSDoc */
	function normalizeToSize(object, 
	// Default Node.js REPL depth
	depth, 
	// 100kB, as 200kB is max payload size, so half sounds reasonable
	maxSize) {
	    if (depth === void 0) { depth = 3; }
	    if (maxSize === void 0) { maxSize = 100 * 1024; }
	    var serialized = normalize(object, depth);
	    if (jsonSize(serialized) > maxSize) {
	        return normalizeToSize(object, depth - 1, maxSize);
	    }
	    return serialized;
	}
	/** Transforms any input value into a string form, either primitive value or a type of the input */
	function serializeValue(value) {
	    var type = Object.prototype.toString.call(value);
	    // Node.js REPL notation
	    if (typeof value === 'string') {
	        return value;
	    }
	    if (type === '[object Object]') {
	        return '[Object]';
	    }
	    if (type === '[object Array]') {
	        return '[Array]';
	    }
	    var normalized = normalizeValue(value);
	    return isPrimitive(normalized) ? normalized : type;
	}
	/**
	 * normalizeValue()
	 *
	 * Takes unserializable input and make it serializable friendly
	 *
	 * - translates undefined/NaN values to "[undefined]"/"[NaN]" respectively,
	 * - serializes Error objects
	 * - filter global objects
	 */
	function normalizeValue(value, key) {
	    if (key === 'domain' && typeof value === 'object' && value._events) {
	        return '[Domain]';
	    }
	    if (key === 'domainEmitter') {
	        return '[DomainEmitter]';
	    }
	    if (typeof global !== 'undefined' && value === global) {
	        return '[Global]';
	    }
	    if (typeof window !== 'undefined' && value === window) {
	        return '[Window]';
	    }
	    if (typeof document !== 'undefined' && value === document) {
	        return '[Document]';
	    }
	    // tslint:disable-next-line:strict-type-predicates
	    if (typeof Event !== 'undefined' && value instanceof Event) {
	        return Object.getPrototypeOf(value) ? value.constructor.name : 'Event';
	    }
	    // React's SyntheticEvent thingy
	    if (isSyntheticEvent(value)) {
	        return '[SyntheticEvent]';
	    }
	    if (Number.isNaN(value)) {
	        return '[NaN]';
	    }
	    if (value === void 0) {
	        return '[undefined]';
	    }
	    if (typeof value === 'function') {
	        return "[Function: " + (value.name || '<unknown-function-name>') + "]";
	    }
	    return value;
	}
	/**
	 * Walks an object to perform a normalization on it
	 *
	 * @param key of object that's walked in current iteration
	 * @param value object to be walked
	 * @param depth Optional number indicating how deep should walking be performed
	 * @param memo Optional Memo class handling decycling
	 */
	function walk(key, value, depth, memo) {
	    if (depth === void 0) { depth = +Infinity; }
	    if (memo === void 0) { memo = new Memo(); }
	    // If we reach the maximum depth, serialize whatever has left
	    if (depth === 0) {
	        return serializeValue(value);
	    }
	    // If value implements `toJSON` method, call it and return early
	    // tslint:disable:no-unsafe-any
	    if (value !== null && value !== undefined && typeof value.toJSON === 'function') {
	        return value.toJSON();
	    }
	    // tslint:enable:no-unsafe-any
	    // If normalized value is a primitive, there are no branches left to walk, so we can just bail out, as theres no point in going down that branch any further
	    var normalized = normalizeValue(value, key);
	    if (isPrimitive(normalized)) {
	        return normalized;
	    }
	    // Create source that we will use for next itterations, either objectified error object (Error type with extracted keys:value pairs) or the input itself
	    var source = (isError(value) ? objectifyError(value) : value);
	    // Create an accumulator that will act as a parent for all future itterations of that branch
	    var acc = Array.isArray(value) ? [] : {};
	    // If we already walked that branch, bail out, as it's circular reference
	    if (memo.memoize(value)) {
	        return '[Circular ~]';
	    }
	    // Walk all keys of the source
	    for (var innerKey in source) {
	        // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
	        if (!Object.prototype.hasOwnProperty.call(source, innerKey)) {
	            continue;
	        }
	        // Recursively walk through all the child nodes
	        acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo);
	    }
	    // Once walked through all the branches, remove the parent from memo storage
	    memo.unmemoize(value);
	    // Return accumulated values
	    return acc;
	}
	/**
	 * normalize()
	 *
	 * - Creates a copy to prevent original input mutation
	 * - Skip non-enumerablers
	 * - Calls `toJSON` if implemented
	 * - Removes circular references
	 * - Translates non-serializeable values (undefined/NaN/Functions) to serializable format
	 * - Translates known global objects/Classes to a string representations
	 * - Takes care of Error objects serialization
	 * - Optionally limit depth of final output
	 */
	function normalize(input, depth) {
	    try {
	        // tslint:disable-next-line:no-unsafe-any
	        return JSON.parse(JSON.stringify(input, function (key, value) { return walk(key, value, depth); }));
	    }
	    catch (_oO) {
	        return '**non-serializable**';
	    }
	}

	// Slightly modified (no IE8 support, ES6) and transcribed to TypeScript

	/** A simple queue that holds promises. */
	var PromiseBuffer = /** @class */ (function () {
	    function PromiseBuffer(_limit) {
	        this._limit = _limit;
	        /** Internal set of queued Promises */
	        this._buffer = [];
	    }
	    /**
	     * Says if the buffer is ready to take more requests
	     */
	    PromiseBuffer.prototype.isReady = function () {
	        return this._limit === undefined || this.length() < this._limit;
	    };
	    /**
	     * Add a promise to the queue.
	     *
	     * @param task Can be any Promise<T>
	     * @returns The original promise.
	     */
	    PromiseBuffer.prototype.add = function (task) {
	        var _this = this;
	        if (!this.isReady()) {
	            return Promise.reject(new SentryError('Not adding Promise due to buffer limit reached.'));
	        }
	        if (this._buffer.indexOf(task) === -1) {
	            this._buffer.push(task);
	        }
	        task
	            .then(function () { return _this.remove(task); })
	            .catch(function () {
	            return _this.remove(task).catch(function () {
	                // We have to add this catch here otherwise we have an unhandledPromiseRejection
	                // because it's a new Promise chain.
	            });
	        });
	        return task;
	    };
	    /**
	     * Remove a promise to the queue.
	     *
	     * @param task Can be any Promise<T>
	     * @returns Removed promise.
	     */
	    PromiseBuffer.prototype.remove = function (task) {
	        var removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];
	        return removedTask;
	    };
	    /**
	     * This function returns the number of unresolved promises in the queue.
	     */
	    PromiseBuffer.prototype.length = function () {
	        return this._buffer.length;
	    };
	    /**
	     * This will drain the whole queue, returns true if queue is empty or drained.
	     * If timeout is provided and the queue takes longer to drain, the promise still resolves but with false.
	     *
	     * @param timeout Number in ms to wait until it resolves with false.
	     */
	    PromiseBuffer.prototype.drain = function (timeout) {
	        var _this = this;
	        return new Promise(function (resolve) {
	            var capturedSetTimeout = setTimeout(function () {
	                if (timeout && timeout > 0) {
	                    resolve(false);
	                }
	            }, timeout);
	            Promise.all(_this._buffer)
	                .then(function () {
	                clearTimeout(capturedSetTimeout);
	                resolve(true);
	            })
	                .catch(function () {
	                resolve(true);
	            });
	        });
	    };
	    return PromiseBuffer;
	}());

	/**
	 * Truncates given string to the maximum characters count
	 *
	 * @param str An object that contains serializable values
	 * @param max Maximum number of characters in truncated string
	 * @returns string Encoded
	 */
	function truncate(str, max) {
	    if (max === void 0) { max = 0; }
	    // tslint:disable-next-line:strict-type-predicates
	    if (typeof str !== 'string' || max === 0) {
	        return str;
	    }
	    return str.length <= max ? str : str.substr(0, max) + "...";
	}
	/**
	 * Join values in array
	 * @param input array of values to be joined together
	 * @param delimiter string to be placed in-between values
	 * @returns Joined values
	 */
	function safeJoin(input, delimiter) {
	    if (!Array.isArray(input)) {
	        return '';
	    }
	    var output = [];
	    // tslint:disable-next-line:prefer-for-of
	    for (var i = 0; i < input.length; i++) {
	        var value = input[i];
	        try {
	            output.push(String(value));
	        }
	        catch (e) {
	            output.push('[value cannot be serialized]');
	        }
	    }
	    return output.join(delimiter);
	}
	/** Merges provided array of keys into */
	function keysToEventMessage(keys, maxLength) {
	    if (maxLength === void 0) { maxLength = 40; }
	    if (!keys.length) {
	        return '[object has no keys]';
	    }
	    if (keys[0].length >= maxLength) {
	        return truncate(keys[0], maxLength);
	    }
	    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
	        var serialized = keys.slice(0, includedKeys).join(', ');
	        if (serialized.length > maxLength) {
	            continue;
	        }
	        if (includedKeys === keys.length) {
	            return serialized;
	        }
	        return truncate(serialized, maxLength);
	    }
	    return '';
	}
	/**
	 * Checks if the value matches a regex or includes the string
	 * @param value The string value to be checked against
	 * @param pattern Either a regex or a string that must be contained in value
	 */
	function isMatchingPattern(value, pattern) {
	    if (isRegExp(pattern)) {
	        return pattern.test(value);
	    }
	    if (typeof pattern === 'string') {
	        return value.includes(pattern);
	    }
	    return false;
	}

	/**
	 * Tells whether current environment supports Fetch API
	 * {@link supportsFetch}.
	 *
	 * @returns Answer to the given question.
	 */
	function supportsFetch() {
	    if (!('fetch' in getGlobalObject())) {
	        return false;
	    }
	    try {
	        // tslint:disable-next-line:no-unused-expression
	        new Headers();
	        // tslint:disable-next-line:no-unused-expression
	        new Request('');
	        // tslint:disable-next-line:no-unused-expression
	        new Response();
	        return true;
	    }
	    catch (e) {
	        return false;
	    }
	}
	/**
	 * Tells whether current environment supports Fetch API natively
	 * {@link supportsNativeFetch}.
	 *
	 * @returns true if `window.fetch` is natively implemented, false otherwise
	 */
	function supportsNativeFetch() {
	    if (!supportsFetch()) {
	        return false;
	    }
	    var isNativeFunc = function (func) { return func.toString().indexOf('native') !== -1; };
	    var global = getGlobalObject();
	    var result = null;
	    var doc = global.document;
	    if (doc) {
	        var sandbox = doc.createElement('iframe');
	        sandbox.hidden = true;
	        try {
	            doc.head.appendChild(sandbox);
	            if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
	                // tslint:disable-next-line no-unbound-method
	                result = isNativeFunc(sandbox.contentWindow.fetch);
	            }
	            doc.head.removeChild(sandbox);
	        }
	        catch (err) {
	            logger$1.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
	        }
	    }
	    if (result === null) {
	        // tslint:disable-next-line no-unbound-method
	        result = isNativeFunc(global.fetch);
	    }
	    return result;
	}
	/**
	 * Tells whether current environment supports Referrer Policy API
	 * {@link supportsReferrerPolicy}.
	 *
	 * @returns Answer to the given question.
	 */
	function supportsReferrerPolicy() {
	    // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
	    // https://caniuse.com/#feat=referrer-policy
	    // It doesn't. And it throw exception instead of ignoring this parameter...
	    // REF: https://github.com/getsentry/raven-js/issues/1233
	    if (!supportsFetch()) {
	        return false;
	    }
	    try {
	        // tslint:disable:no-unused-expression
	        new Request('_', {
	            referrerPolicy: 'origin',
	        });
	        return true;
	    }
	    catch (e) {
	        return false;
	    }
	}
	/**
	 * Tells whether current environment supports History API
	 * {@link supportsHistory}.
	 *
	 * @returns Answer to the given question.
	 */
	function supportsHistory() {
	    // NOTE: in Chrome App environment, touching history.pushState, *even inside
	    //       a try/catch block*, will cause Chrome to output an error to console.error
	    // borrowed from: https://github.com/angular/angular.js/pull/13945/files
	    var global = getGlobalObject();
	    var chrome = global.chrome;
	    // tslint:disable-next-line:no-unsafe-any
	    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
	    var hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
	    return !isChromePackagedApp && hasHistoryApi;
	}

	/** SyncPromise internal states */
	var States;
	(function (States) {
	    /** Pending */
	    States["PENDING"] = "PENDING";
	    /** Resolved / OK */
	    States["RESOLVED"] = "RESOLVED";
	    /** Rejected / Error */
	    States["REJECTED"] = "REJECTED";
	})(States || (States = {}));
	/** JSDoc */
	var SyncPromise = /** @class */ (function () {
	    function SyncPromise(callback) {
	        var _this = this;
	        /** JSDoc */
	        this._state = States.PENDING;
	        /** JSDoc */
	        this._handlers = [];
	        /** JSDoc */
	        this._resolve = function (value) {
	            _this._setResult(value, States.RESOLVED);
	        };
	        /** JSDoc */
	        this._reject = function (reason) {
	            _this._setResult(reason, States.REJECTED);
	        };
	        /** JSDoc */
	        this._setResult = function (value, state) {
	            if (_this._state !== States.PENDING) {
	                return;
	            }
	            if (isThenable(value)) {
	                value.then(_this._resolve, _this._reject);
	                return;
	            }
	            _this._value = value;
	            _this._state = state;
	            _this._executeHandlers();
	        };
	        /** JSDoc */
	        this._executeHandlers = function () {
	            if (_this._state === States.PENDING) {
	                return;
	            }
	            if (_this._state === States.REJECTED) {
	                // tslint:disable-next-line:no-unsafe-any
	                _this._handlers.forEach(function (h) { return h.onFail && h.onFail(_this._value); });
	            }
	            else {
	                // tslint:disable-next-line:no-unsafe-any
	                _this._handlers.forEach(function (h) { return h.onSuccess && h.onSuccess(_this._value); });
	            }
	            _this._handlers = [];
	            return;
	        };
	        /** JSDoc */
	        this._attachHandler = function (handler) {
	            _this._handlers = _this._handlers.concat(handler);
	            _this._executeHandlers();
	        };
	        try {
	            callback(this._resolve, this._reject);
	        }
	        catch (e) {
	            this._reject(e);
	        }
	    }
	    /** JSDoc */
	    SyncPromise.prototype.then = function (onfulfilled, onrejected) {
	        var _this = this;
	        // public then<U>(onSuccess?: HandlerOnSuccess<T, U>, onFail?: HandlerOnFail<U>): SyncPromise<T | U> {
	        return new SyncPromise(function (resolve, reject) {
	            _this._attachHandler({
	                onFail: function (reason) {
	                    if (!onrejected) {
	                        reject(reason);
	                        return;
	                    }
	                    try {
	                        resolve(onrejected(reason));
	                        return;
	                    }
	                    catch (e) {
	                        reject(e);
	                        return;
	                    }
	                },
	                onSuccess: function (result) {
	                    if (!onfulfilled) {
	                        resolve(result);
	                        return;
	                    }
	                    try {
	                        resolve(onfulfilled(result));
	                        return;
	                    }
	                    catch (e) {
	                        reject(e);
	                        return;
	                    }
	                },
	            });
	        });
	    };
	    /** JSDoc */
	    SyncPromise.prototype.catch = function (onFail) {
	        // tslint:disable-next-line:no-unsafe-any
	        return this.then(function (val) { return val; }, onFail);
	    };
	    /** JSDoc */
	    SyncPromise.prototype.toString = function () {
	        return "[object SyncPromise]";
	    };
	    /** JSDoc */
	    SyncPromise.resolve = function (value) {
	        return new SyncPromise(function (resolve) {
	            resolve(value);
	        });
	    };
	    /** JSDoc */
	    SyncPromise.reject = function (reason) {
	        return new SyncPromise(function (_, reject) {
	            reject(reason);
	        });
	    };
	    return SyncPromise;
	}());

	var TRACEPARENT_REGEXP = /^[ \t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \t]*$/;
	/**
	 * Span containg all data about a span
	 */
	var Span = /** @class */ (function () {
	    function Span(_traceId, _spanId, _sampled, _parent) {
	        if (_traceId === void 0) { _traceId = uuid4(); }
	        if (_spanId === void 0) { _spanId = uuid4().substring(16); }
	        this._traceId = _traceId;
	        this._spanId = _spanId;
	        this._sampled = _sampled;
	        this._parent = _parent;
	    }
	    /**
	     * Setter for parent
	     */
	    Span.prototype.setParent = function (parent) {
	        this._parent = parent;
	        return this;
	    };
	    /**
	     * Setter for sampled
	     */
	    Span.prototype.setSampled = function (sampled) {
	        this._sampled = sampled;
	        return this;
	    };
	    /**
	     * Continues a trace
	     * @param traceparent Traceparent string
	     */
	    Span.fromTraceparent = function (traceparent) {
	        var matches = traceparent.match(TRACEPARENT_REGEXP);
	        if (matches) {
	            var sampled = void 0;
	            if (matches[3] === '1') {
	                sampled = true;
	            }
	            else if (matches[3] === '0') {
	                sampled = false;
	            }
	            var parent_1 = new Span(matches[1], matches[2], sampled);
	            return new Span(matches[1], undefined, sampled, parent_1);
	        }
	        return undefined;
	    };
	    /**
	     * @inheritDoc
	     */
	    Span.prototype.toTraceparent = function () {
	        var sampled = '';
	        if (this._sampled === true) {
	            sampled = '-1';
	        }
	        else if (this._sampled === false) {
	            sampled = '-0';
	        }
	        return this._traceId + "-" + this._spanId + sampled;
	    };
	    /**
	     * @inheritDoc
	     */
	    Span.prototype.toJSON = function () {
	        return {
	            parent: (this._parent && this._parent.toJSON()) || undefined,
	            sampled: this._sampled,
	            span_id: this._spanId,
	            trace_id: this._traceId,
	        };
	    };
	    return Span;
	}());

	/**
	 * Holds additional event information. {@link Scope.applyToEvent} will be
	 * called by the client before an event will be sent.
	 */
	var Scope = /** @class */ (function () {
	    function Scope() {
	        /** Flag if notifiying is happening. */
	        this._notifyingListeners = false;
	        /** Callback for client to receive scope changes. */
	        this._scopeListeners = [];
	        /** Callback list that will be called after {@link applyToEvent}. */
	        this._eventProcessors = [];
	        /** Array of breadcrumbs. */
	        this._breadcrumbs = [];
	        /** User */
	        this._user = {};
	        /** Tags */
	        this._tags = {};
	        /** Extra */
	        this._extra = {};
	        /** Contexts */
	        this._context = {};
	    }
	    /**
	     * Add internal on change listener. Used for sub SDKs that need to store the scope.
	     * @hidden
	     */
	    Scope.prototype.addScopeListener = function (callback) {
	        this._scopeListeners.push(callback);
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.addEventProcessor = function (callback) {
	        this._eventProcessors.push(callback);
	        return this;
	    };
	    /**
	     * This will be called on every set call.
	     */
	    Scope.prototype._notifyScopeListeners = function () {
	        var _this = this;
	        if (!this._notifyingListeners) {
	            this._notifyingListeners = true;
	            setTimeout(function () {
	                _this._scopeListeners.forEach(function (callback) {
	                    callback(_this);
	                });
	                _this._notifyingListeners = false;
	            });
	        }
	    };
	    /**
	     * This will be called after {@link applyToEvent} is finished.
	     */
	    Scope.prototype._notifyEventProcessors = function (processors, event, hint, index) {
	        var _this = this;
	        if (index === void 0) { index = 0; }
	        return new SyncPromise(function (resolve$$1, reject) {
	            var processor = processors[index];
	            // tslint:disable-next-line:strict-type-predicates
	            if (event === null || typeof processor !== 'function') {
	                resolve$$1(event);
	            }
	            else {
	                var result = processor(__assign({}, event), hint);
	                if (isThenable(result)) {
	                    result
	                        .then(function (final) { return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve$$1); })
	                        .catch(reject);
	                }
	                else {
	                    _this._notifyEventProcessors(processors, result, hint, index + 1)
	                        .then(resolve$$1)
	                        .catch(reject);
	                }
	            }
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setUser = function (user) {
	        this._user = normalize(user);
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setTags = function (tags) {
	        this._tags = __assign({}, this._tags, normalize(tags));
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setTag = function (key, value) {
	        var _a;
	        this._tags = __assign({}, this._tags, (_a = {}, _a[key] = normalize(value), _a));
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setExtras = function (extra) {
	        this._extra = __assign({}, this._extra, normalize(extra));
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setExtra = function (key, extra) {
	        var _a;
	        this._extra = __assign({}, this._extra, (_a = {}, _a[key] = normalize(extra), _a));
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setFingerprint = function (fingerprint) {
	        this._fingerprint = normalize(fingerprint);
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setLevel = function (level) {
	        this._level = normalize(level);
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setTransaction = function (transaction) {
	        this._transaction = transaction;
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setContext = function (name, context) {
	        this._context[name] = context ? normalize(context) : undefined;
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.setSpan = function (span) {
	        this._span = span;
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.startSpan = function (parentSpan) {
	        var span = new Span();
	        span.setParent(parentSpan);
	        this.setSpan(span);
	        return span;
	    };
	    /**
	     * Internal getter for Span, used in Hub.
	     * @hidden
	     */
	    Scope.prototype.getSpan = function () {
	        return this._span;
	    };
	    /**
	     * Inherit values from the parent scope.
	     * @param scope to clone.
	     */
	    Scope.clone = function (scope) {
	        var newScope = new Scope();
	        Object.assign(newScope, scope, {
	            _scopeListeners: [],
	        });
	        if (scope) {
	            newScope._breadcrumbs = __spread(scope._breadcrumbs);
	            newScope._tags = __assign({}, scope._tags);
	            newScope._extra = __assign({}, scope._extra);
	            newScope._context = __assign({}, scope._context);
	            newScope._user = scope._user;
	            newScope._level = scope._level;
	            newScope._span = scope._span;
	            newScope._transaction = scope._transaction;
	            newScope._fingerprint = scope._fingerprint;
	            newScope._eventProcessors = __spread(scope._eventProcessors);
	        }
	        return newScope;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.clear = function () {
	        this._breadcrumbs = [];
	        this._tags = {};
	        this._extra = {};
	        this._user = {};
	        this._context = {};
	        this._level = undefined;
	        this._transaction = undefined;
	        this._fingerprint = undefined;
	        this._span = undefined;
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
	        var timestamp = new Date().getTime() / 1000;
	        var mergedBreadcrumb = __assign({ timestamp: timestamp }, breadcrumb);
	        this._breadcrumbs =
	            maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
	                ? __spread(this._breadcrumbs, [normalize(mergedBreadcrumb)]).slice(-maxBreadcrumbs)
	                : __spread(this._breadcrumbs, [normalize(mergedBreadcrumb)]);
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * @inheritDoc
	     */
	    Scope.prototype.clearBreadcrumbs = function () {
	        this._breadcrumbs = [];
	        this._notifyScopeListeners();
	        return this;
	    };
	    /**
	     * Applies fingerprint from the scope to the event if there's one,
	     * uses message if there's one instead or get rid of empty fingerprint
	     */
	    Scope.prototype._applyFingerprint = function (event) {
	        // Make sure it's an array first and we actually have something in place
	        event.fingerprint = event.fingerprint
	            ? Array.isArray(event.fingerprint)
	                ? event.fingerprint
	                : [event.fingerprint]
	            : [];
	        // If we have something on the scope, then merge it with event
	        if (this._fingerprint) {
	            event.fingerprint = event.fingerprint.concat(this._fingerprint);
	        }
	        // If we have no data at all, remove empty array default
	        if (event.fingerprint && !event.fingerprint.length) {
	            delete event.fingerprint;
	        }
	    };
	    /**
	     * Applies the current context and fingerprint to the event.
	     * Note that breadcrumbs will be added by the client.
	     * Also if the event has already breadcrumbs on it, we do not merge them.
	     * @param event Event
	     * @param hint May contain additional informartion about the original exception.
	     * @hidden
	     */
	    Scope.prototype.applyToEvent = function (event, hint) {
	        if (this._extra && Object.keys(this._extra).length) {
	            event.extra = __assign({}, this._extra, event.extra);
	        }
	        if (this._tags && Object.keys(this._tags).length) {
	            event.tags = __assign({}, this._tags, event.tags);
	        }
	        if (this._user && Object.keys(this._user).length) {
	            event.user = __assign({}, this._user, event.user);
	        }
	        if (this._context && Object.keys(this._context).length) {
	            event.contexts = __assign({}, this._context, event.contexts);
	        }
	        if (this._level) {
	            event.level = this._level;
	        }
	        if (this._transaction) {
	            event.transaction = this._transaction;
	        }
	        if (this._span) {
	            event.contexts = event.contexts || {};
	            event.contexts.trace = this._span;
	        }
	        this._applyFingerprint(event);
	        event.breadcrumbs = __spread((event.breadcrumbs || []), this._breadcrumbs);
	        event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;
	        return this._notifyEventProcessors(__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
	    };
	    return Scope;
	}());
	/**
	 * Retruns the global event processors.
	 */
	function getGlobalEventProcessors() {
	    var global = getGlobalObject();
	    global.__SENTRY__ = global.__SENTRY__ || {};
	    global.__SENTRY__.globalEventProcessors = global.__SENTRY__.globalEventProcessors || [];
	    return global.__SENTRY__.globalEventProcessors;
	}
	/**
	 * Add a EventProcessor to be kept globally.
	 * @param callback EventProcessor to add
	 */
	function addGlobalEventProcessor(callback) {
	    getGlobalEventProcessors().push(callback);
	}

	/**
	 * API compatibility version of this hub.
	 *
	 * WARNING: This number should only be incresed when the global interface
	 * changes a and new methods are introduced.
	 *
	 * @hidden
	 */
	var API_VERSION = 3;
	/**
	 * Default maximum number of breadcrumbs added to an event. Can be overwritten
	 * with {@link Options.maxBreadcrumbs}.
	 */
	var DEFAULT_BREADCRUMBS = 30;
	/**
	 * Absolute maximum number of breadcrumbs added to an event. The
	 * `maxBreadcrumbs` option cannot be higher than this value.
	 */
	var MAX_BREADCRUMBS = 100;
	/**
	 * @inheritDoc
	 */
	var Hub = /** @class */ (function () {
	    /**
	     * Creates a new instance of the hub, will push one {@link Layer} into the
	     * internal stack on creation.
	     *
	     * @param client bound to the hub.
	     * @param scope bound to the hub.
	     * @param version number, higher number means higher priority.
	     */
	    function Hub(client, scope, _version) {
	        if (scope === void 0) { scope = new Scope(); }
	        if (_version === void 0) { _version = API_VERSION; }
	        this._version = _version;
	        /** Is a {@link Layer}[] containing the client and scope */
	        this._stack = [];
	        this._stack.push({ client: client, scope: scope });
	    }
	    /**
	     * Internal helper function to call a method on the top client if it exists.
	     *
	     * @param method The method to call on the client.
	     * @param args Arguments to pass to the client function.
	     */
	    Hub.prototype._invokeClient = function (method) {
	        var _a;
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var top = this.getStackTop();
	        if (top && top.client && top.client[method]) {
	            (_a = top.client)[method].apply(_a, __spread(args, [top.scope]));
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.isOlderThan = function (version) {
	        return this._version < version;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.bindClient = function (client) {
	        var top = this.getStackTop();
	        top.client = client;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.pushScope = function () {
	        // We want to clone the content of prev scope
	        var stack = this.getStack();
	        var parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
	        var scope = Scope.clone(parentScope);
	        this.getStack().push({
	            client: this.getClient(),
	            scope: scope,
	        });
	        return scope;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.popScope = function () {
	        return this.getStack().pop() !== undefined;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.withScope = function (callback) {
	        var scope = this.pushScope();
	        try {
	            callback(scope);
	        }
	        finally {
	            this.popScope();
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.getClient = function () {
	        return this.getStackTop().client;
	    };
	    /** Returns the scope of the top stack. */
	    Hub.prototype.getScope = function () {
	        return this.getStackTop().scope;
	    };
	    /** Returns the scope stack for domains or the process. */
	    Hub.prototype.getStack = function () {
	        return this._stack;
	    };
	    /** Returns the topmost scope layer in the order domain > local > process. */
	    Hub.prototype.getStackTop = function () {
	        return this._stack[this._stack.length - 1];
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.captureException = function (exception, hint) {
	        var eventId = (this._lastEventId = uuid4());
	        var finalHint = hint;
	        // If there's no explicit hint provided, mimick the same thing that would happen
	        // in the minimal itself to create a consistent behavior.
	        // We don't do this in the client, as it's the lowest level API, and doing this,
	        // would prevent user from having full control over direct calls.
	        if (!hint) {
	            var syntheticException = void 0;
	            try {
	                throw new Error('Sentry syntheticException');
	            }
	            catch (exception) {
	                syntheticException = exception;
	            }
	            finalHint = {
	                originalException: exception,
	                syntheticException: syntheticException,
	            };
	        }
	        this._invokeClient('captureException', exception, __assign({}, finalHint, { event_id: eventId }));
	        return eventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.captureMessage = function (message, level, hint) {
	        var eventId = (this._lastEventId = uuid4());
	        var finalHint = hint;
	        // If there's no explicit hint provided, mimick the same thing that would happen
	        // in the minimal itself to create a consistent behavior.
	        // We don't do this in the client, as it's the lowest level API, and doing this,
	        // would prevent user from having full control over direct calls.
	        if (!hint) {
	            var syntheticException = void 0;
	            try {
	                throw new Error(message);
	            }
	            catch (exception) {
	                syntheticException = exception;
	            }
	            finalHint = {
	                originalException: message,
	                syntheticException: syntheticException,
	            };
	        }
	        this._invokeClient('captureMessage', message, level, __assign({}, finalHint, { event_id: eventId }));
	        return eventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.captureEvent = function (event, hint) {
	        var eventId = (this._lastEventId = uuid4());
	        this._invokeClient('captureEvent', event, __assign({}, hint, { event_id: eventId }));
	        return eventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.lastEventId = function () {
	        return this._lastEventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
	        var top = this.getStackTop();
	        if (!top.scope || !top.client) {
	            return;
	        }
	        var _a = (top.client.getOptions && top.client.getOptions()) || {}, _b = _a.beforeBreadcrumb, beforeBreadcrumb = _b === void 0 ? null : _b, _c = _a.maxBreadcrumbs, maxBreadcrumbs = _c === void 0 ? DEFAULT_BREADCRUMBS : _c;
	        if (maxBreadcrumbs <= 0) {
	            return;
	        }
	        var timestamp = new Date().getTime() / 1000;
	        var mergedBreadcrumb = __assign({ timestamp: timestamp }, breadcrumb);
	        var finalBreadcrumb = beforeBreadcrumb
	            ? consoleSandbox(function () { return beforeBreadcrumb(mergedBreadcrumb, hint); })
	            : mergedBreadcrumb;
	        if (finalBreadcrumb === null) {
	            return;
	        }
	        top.scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.setUser = function (user) {
	        var top = this.getStackTop();
	        if (!top.scope) {
	            return;
	        }
	        top.scope.setUser(user);
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.setTags = function (tags) {
	        var top = this.getStackTop();
	        if (!top.scope) {
	            return;
	        }
	        top.scope.setTags(tags);
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.setExtras = function (extras) {
	        var top = this.getStackTop();
	        if (!top.scope) {
	            return;
	        }
	        top.scope.setExtras(extras);
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.setTag = function (key, value) {
	        var top = this.getStackTop();
	        if (!top.scope) {
	            return;
	        }
	        top.scope.setTag(key, value);
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.setExtra = function (key, extra) {
	        var top = this.getStackTop();
	        if (!top.scope) {
	            return;
	        }
	        top.scope.setExtra(key, extra);
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.setContext = function (name, context) {
	        var top = this.getStackTop();
	        if (!top.scope) {
	            return;
	        }
	        top.scope.setContext(name, context);
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.configureScope = function (callback) {
	        var top = this.getStackTop();
	        if (top.scope && top.client) {
	            callback(top.scope);
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.run = function (callback) {
	        var oldHub = makeMain(this);
	        try {
	            callback(this);
	        }
	        finally {
	            makeMain(oldHub);
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.getIntegration = function (integration) {
	        var client = this.getClient();
	        if (!client) {
	            return null;
	        }
	        try {
	            return client.getIntegration(integration);
	        }
	        catch (_oO) {
	            logger$1.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
	            return null;
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    Hub.prototype.traceHeaders = function () {
	        var top = this.getStackTop();
	        if (top.scope && top.client) {
	            var span = top.scope.getSpan();
	            if (span) {
	                return {
	                    'sentry-trace': span.toTraceparent(),
	                };
	            }
	        }
	        return {};
	    };
	    return Hub;
	}());
	/** Returns the global shim registry. */
	function getMainCarrier() {
	    var carrier = getGlobalObject();
	    carrier.__SENTRY__ = carrier.__SENTRY__ || {
	        hub: undefined,
	    };
	    return carrier;
	}
	/**
	 * Replaces the current main hub with the passed one on the global object
	 *
	 * @returns The old replaced hub
	 */
	function makeMain(hub) {
	    var registry = getMainCarrier();
	    var oldHub = getHubFromCarrier(registry);
	    setHubOnCarrier(registry, hub);
	    return oldHub;
	}
	/**
	 * Returns the default hub instance.
	 *
	 * If a hub is already registered in the global carrier but this module
	 * contains a more recent version, it replaces the registered version.
	 * Otherwise, the currently registered hub will be returned.
	 */
	function getCurrentHub() {
	    // Get main carrier (global for every environment)
	    var registry = getMainCarrier();
	    // If there's no hub, or its an old API, assign a new one
	    if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
	        setHubOnCarrier(registry, new Hub());
	    }
	    // Prefer domains over global if they are there
	    try {
	        // We need to use `dynamicRequire` because `require` on it's own will be optimized by webpack.
	        // We do not want this to happen, we need to try to `require` the domain node module and fail if we are in browser
	        // for example so we do not have to shim it and use `getCurrentHub` universally.
	        var domain = dynamicRequire(module, 'domain');
	        var activeDomain = domain.active;
	        // If there no active domain, just return global hub
	        if (!activeDomain) {
	            return getHubFromCarrier(registry);
	        }
	        // If there's no hub on current domain, or its an old API, assign a new one
	        if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
	            var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
	            setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, Scope.clone(registryHubTopStack.scope)));
	        }
	        // Return hub that lives on a domain
	        return getHubFromCarrier(activeDomain);
	    }
	    catch (_Oo) {
	        // Return hub that lives on a global object
	        return getHubFromCarrier(registry);
	    }
	}
	/**
	 * This will tell whether a carrier has a hub on it or not
	 * @param carrier object
	 */
	function hasHubOnCarrier(carrier) {
	    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
	        return true;
	    }
	    return false;
	}
	/**
	 * This will create a new {@link Hub} and add to the passed object on
	 * __SENTRY__.hub.
	 * @param carrier object
	 * @hidden
	 */
	function getHubFromCarrier(carrier) {
	    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
	        return carrier.__SENTRY__.hub;
	    }
	    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
	    carrier.__SENTRY__.hub = new Hub();
	    return carrier.__SENTRY__.hub;
	}
	/**
	 * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
	 * @param carrier object
	 * @param hub Hub
	 */
	function setHubOnCarrier(carrier, hub) {
	    if (!carrier) {
	        return false;
	    }
	    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
	    carrier.__SENTRY__.hub = hub;
	    return true;
	}

	/**
	 * This calls a function on the current hub.
	 * @param method function to call on hub.
	 * @param args to pass to function.
	 */
	function callOnHub(method) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var hub = getCurrentHub();
	    if (hub && hub[method]) {
	        // tslint:disable-next-line:no-unsafe-any
	        return hub[method].apply(hub, __spread(args));
	    }
	    throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
	}
	/**
	 * Captures an exception event and sends it to Sentry.
	 *
	 * @param exception An exception-like object.
	 * @returns The generated eventId.
	 */
	function captureException(exception) {
	    var syntheticException;
	    try {
	        throw new Error('Sentry syntheticException');
	    }
	    catch (exception) {
	        syntheticException = exception;
	    }
	    return callOnHub('captureException', exception, {
	        originalException: exception,
	        syntheticException: syntheticException,
	    });
	}
	/**
	 * Creates a new scope with and executes the given operation within.
	 * The scope is automatically removed once the operation
	 * finishes or throws.
	 *
	 * This is essentially a convenience function for:
	 *
	 *     pushScope();
	 *     callback();
	 *     popScope();
	 *
	 * @param callback that will be enclosed into push/popScope.
	 */
	function withScope(callback) {
	    callOnHub('withScope', callback);
	}

	/** Regular expression used to parse a Dsn. */
	var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/;
	/** Error message */
	var ERROR_MESSAGE = 'Invalid Dsn';
	/** The Sentry Dsn, identifying a Sentry instance and project. */
	var Dsn = /** @class */ (function () {
	    /** Creates a new Dsn component */
	    function Dsn(from) {
	        if (typeof from === 'string') {
	            this._fromString(from);
	        }
	        else {
	            this._fromComponents(from);
	        }
	        this._validate();
	    }
	    /**
	     * Renders the string representation of this Dsn.
	     *
	     * By default, this will render the public representation without the password
	     * component. To get the deprecated private _representation, set `withPassword`
	     * to true.
	     *
	     * @param withPassword When set to true, the password will be included.
	     */
	    Dsn.prototype.toString = function (withPassword) {
	        if (withPassword === void 0) { withPassword = false; }
	        // tslint:disable-next-line:no-this-assignment
	        var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId, protocol = _a.protocol, user = _a.user;
	        return (protocol + "://" + user + (withPassword && pass ? ":" + pass : '') +
	            ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId));
	    };
	    /** Parses a string into this Dsn. */
	    Dsn.prototype._fromString = function (str) {
	        var match = DSN_REGEX.exec(str);
	        if (!match) {
	            throw new SentryError(ERROR_MESSAGE);
	        }
	        var _a = __read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, lastPath = _a[5];
	        var path = '';
	        var projectId = lastPath;
	        var split = projectId.split('/');
	        if (split.length > 1) {
	            path = split.slice(0, -1).join('/');
	            projectId = split.pop();
	        }
	        Object.assign(this, { host: host, pass: pass, path: path, projectId: projectId, port: port, protocol: protocol, user: user });
	    };
	    /** Maps Dsn components into this instance. */
	    Dsn.prototype._fromComponents = function (components) {
	        this.protocol = components.protocol;
	        this.user = components.user;
	        this.pass = components.pass || '';
	        this.host = components.host;
	        this.port = components.port || '';
	        this.path = components.path || '';
	        this.projectId = components.projectId;
	    };
	    /** Validates this Dsn and throws on error. */
	    Dsn.prototype._validate = function () {
	        var _this = this;
	        ['protocol', 'user', 'host', 'projectId'].forEach(function (component) {
	            if (!_this[component]) {
	                throw new SentryError(ERROR_MESSAGE);
	            }
	        });
	        if (this.protocol !== 'http' && this.protocol !== 'https') {
	            throw new SentryError(ERROR_MESSAGE);
	        }
	        if (this.port && Number.isNaN(parseInt(this.port, 10))) {
	            throw new SentryError(ERROR_MESSAGE);
	        }
	    };
	    return Dsn;
	}());

	var SENTRY_API_VERSION = '7';
	/** Helper class to provide urls to different Sentry endpoints. */
	var API = /** @class */ (function () {
	    /** Create a new instance of API */
	    function API(dsn) {
	        this.dsn = dsn;
	        this._dsnObject = new Dsn(dsn);
	    }
	    /** Returns the Dsn object. */
	    API.prototype.getDsn = function () {
	        return this._dsnObject;
	    };
	    /** Returns a string with auth headers in the url to the store endpoint. */
	    API.prototype.getStoreEndpoint = function () {
	        return "" + this._getBaseUrl() + this.getStoreEndpointPath();
	    };
	    /** Returns the store endpoint with auth added in url encoded. */
	    API.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
	        var dsn = this._dsnObject;
	        var auth = {
	            sentry_key: dsn.user,
	            sentry_version: SENTRY_API_VERSION,
	        };
	        // Auth is intentionally sent as part of query string (NOT as custom HTTP header)
	        // to avoid preflight CORS requests
	        return this.getStoreEndpoint() + "?" + urlEncode(auth);
	    };
	    /** Returns the base path of the url including the port. */
	    API.prototype._getBaseUrl = function () {
	        var dsn = this._dsnObject;
	        var protocol = dsn.protocol ? dsn.protocol + ":" : '';
	        var port = dsn.port ? ":" + dsn.port : '';
	        return protocol + "//" + dsn.host + port;
	    };
	    /** Returns only the path component for the store endpoint. */
	    API.prototype.getStoreEndpointPath = function () {
	        var dsn = this._dsnObject;
	        return (dsn.path ? "/" + dsn.path : '') + "/api/" + dsn.projectId + "/store/";
	    };
	    /** Returns an object that can be used in request headers. */
	    API.prototype.getRequestHeaders = function (clientName, clientVersion) {
	        var dsn = this._dsnObject;
	        var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
	        header.push("sentry_timestamp=" + new Date().getTime());
	        header.push("sentry_client=" + clientName + "/" + clientVersion);
	        header.push("sentry_key=" + dsn.user);
	        if (dsn.pass) {
	            header.push("sentry_secret=" + dsn.pass);
	        }
	        return {
	            'Content-Type': 'application/json',
	            'X-Sentry-Auth': header.join(', '),
	        };
	    };
	    /** Returns the url to the report dialog endpoint. */
	    API.prototype.getReportDialogEndpoint = function (dialogOptions) {
	        if (dialogOptions === void 0) { dialogOptions = {}; }
	        var dsn = this._dsnObject;
	        var endpoint = "" + this._getBaseUrl() + (dsn.path ? "/" + dsn.path : '') + "/api/embed/error-page/";
	        var encodedOptions = [];
	        encodedOptions.push("dsn=" + dsn.toString());
	        for (var key in dialogOptions) {
	            if (key === 'user') {
	                if (!dialogOptions.user) {
	                    continue;
	                }
	                if (dialogOptions.user.name) {
	                    encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
	                }
	                if (dialogOptions.user.email) {
	                    encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
	                }
	            }
	            else {
	                encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
	            }
	        }
	        if (encodedOptions.length) {
	            return endpoint + "?" + encodedOptions.join('&');
	        }
	        return endpoint;
	    };
	    return API;
	}());

	var installedIntegrations = [];
	/** Gets integration to install */
	function getIntegrationsToSetup(options) {
	    var defaultIntegrations = (options.defaultIntegrations && __spread(options.defaultIntegrations)) || [];
	    var userIntegrations = options.integrations;
	    var integrations = [];
	    if (Array.isArray(userIntegrations)) {
	        var userIntegrationsNames_1 = userIntegrations.map(function (i) { return i.name; });
	        var pickedIntegrationsNames_1 = [];
	        // Leave only unique default integrations, that were not overridden with provided user integrations
	        defaultIntegrations.forEach(function (defaultIntegration) {
	            if (userIntegrationsNames_1.indexOf(defaultIntegration.name) === -1 &&
	                pickedIntegrationsNames_1.indexOf(defaultIntegration.name) === -1) {
	                integrations.push(defaultIntegration);
	                pickedIntegrationsNames_1.push(defaultIntegration.name);
	            }
	        });
	        // Don't add same user integration twice
	        userIntegrations.forEach(function (userIntegration) {
	            if (pickedIntegrationsNames_1.indexOf(userIntegration.name) === -1) {
	                integrations.push(userIntegration);
	                pickedIntegrationsNames_1.push(userIntegration.name);
	            }
	        });
	    }
	    else if (typeof userIntegrations === 'function') {
	        integrations = userIntegrations(defaultIntegrations);
	        integrations = Array.isArray(integrations) ? integrations : [integrations];
	    }
	    else {
	        return __spread(defaultIntegrations);
	    }
	    return integrations;
	}
	/** Setup given integration */
	function setupIntegration(integration) {
	    if (installedIntegrations.indexOf(integration.name) !== -1) {
	        return;
	    }
	    integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
	    installedIntegrations.push(integration.name);
	    logger$1.log("Integration installed: " + integration.name);
	}
	/**
	 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
	 * integrations are added unless they were already provided before.
	 * @param integrations array of integration instances
	 * @param withDefault should enable default integrations
	 */
	function setupIntegrations(options) {
	    var integrations = {};
	    getIntegrationsToSetup(options).forEach(function (integration) {
	        integrations[integration.name] = integration;
	        setupIntegration(integration);
	    });
	    return integrations;
	}

	/**
	 * Base implementation for all JavaScript SDK clients.
	 *
	 * Call the constructor with the corresponding backend constructor and options
	 * specific to the client subclass. To access these options later, use
	 * {@link Client.getOptions}. Also, the Backend instance is available via
	 * {@link Client.getBackend}.
	 *
	 * If a Dsn is specified in the options, it will be parsed and stored. Use
	 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
	 * invalid, the constructor will throw a {@link SentryException}. Note that
	 * without a valid Dsn, the SDK will not send any events to Sentry.
	 *
	 * Before sending an event via the backend, it is passed through
	 * {@link BaseClient.prepareEvent} to add SDK information and scope data
	 * (breadcrumbs and context). To add more custom information, override this
	 * method and extend the resulting prepared event.
	 *
	 * To issue automatically created events (e.g. via instrumentation), use
	 * {@link Client.captureEvent}. It will prepare the event and pass it through
	 * the callback lifecycle. To issue auto-breadcrumbs, use
	 * {@link Client.addBreadcrumb}.
	 *
	 * @example
	 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
	 *   public constructor(options: NodeOptions) {
	 *     super(NodeBackend, options);
	 *   }
	 *
	 *   // ...
	 * }
	 */
	var BaseClient = /** @class */ (function () {
	    /**
	     * Initializes this client instance.
	     *
	     * @param backendClass A constructor function to create the backend.
	     * @param options Options for the client.
	     */
	    function BaseClient(backendClass, options) {
	        /** Array of used integrations. */
	        this._integrations = {};
	        /** Is the client still processing a call? */
	        this._processing = false;
	        this._backend = new backendClass(options);
	        this._options = options;
	        if (options.dsn) {
	            this._dsn = new Dsn(options.dsn);
	        }
	        if (this._isEnabled()) {
	            this._integrations = setupIntegrations(this._options);
	        }
	    }
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.captureException = function (exception, hint, scope) {
	        var _this = this;
	        var eventId = hint && hint.event_id;
	        this._processing = true;
	        this._getBackend()
	            .eventFromException(exception, hint)
	            .then(function (event) { return _this._processEvent(event, hint, scope); })
	            .then(function (finalEvent) {
	            // We need to check for finalEvent in case beforeSend returned null
	            eventId = finalEvent && finalEvent.event_id;
	            _this._processing = false;
	        })
	            .catch(function (reason) {
	            logger$1.error(reason);
	            _this._processing = false;
	        });
	        return eventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
	        var _this = this;
	        var eventId = hint && hint.event_id;
	        this._processing = true;
	        var promisedEvent = isPrimitive(message)
	            ? this._getBackend().eventFromMessage("" + message, level, hint)
	            : this._getBackend().eventFromException(message, hint);
	        promisedEvent
	            .then(function (event) { return _this._processEvent(event, hint, scope); })
	            .then(function (finalEvent) {
	            // We need to check for finalEvent in case beforeSend returned null
	            eventId = finalEvent && finalEvent.event_id;
	            _this._processing = false;
	        })
	            .catch(function (reason) {
	            logger$1.error(reason);
	            _this._processing = false;
	        });
	        return eventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.captureEvent = function (event, hint, scope) {
	        var _this = this;
	        var eventId = hint && hint.event_id;
	        this._processing = true;
	        this._processEvent(event, hint, scope)
	            .then(function (finalEvent) {
	            // We need to check for finalEvent in case beforeSend returned null
	            eventId = finalEvent && finalEvent.event_id;
	            _this._processing = false;
	        })
	            .catch(function (reason) {
	            logger$1.error(reason);
	            _this._processing = false;
	        });
	        return eventId;
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.getDsn = function () {
	        return this._dsn;
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.getOptions = function () {
	        return this._options;
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.flush = function (timeout) {
	        var _this = this;
	        return this._isClientProcessing(timeout).then(function (status) {
	            clearInterval(status.interval);
	            return _this._getBackend()
	                .getTransport()
	                .close(timeout)
	                .then(function (transportFlushed) { return status.ready && transportFlushed; });
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.close = function (timeout) {
	        var _this = this;
	        return this.flush(timeout).then(function (result) {
	            _this.getOptions().enabled = false;
	            return result;
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.getIntegrations = function () {
	        return this._integrations || {};
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseClient.prototype.getIntegration = function (integration) {
	        try {
	            return this._integrations[integration.id] || null;
	        }
	        catch (_oO) {
	            logger$1.warn("Cannot retrieve integration " + integration.id + " from the current Client");
	            return null;
	        }
	    };
	    /** Waits for the client to be done with processing. */
	    BaseClient.prototype._isClientProcessing = function (timeout) {
	        var _this = this;
	        return new Promise(function (resolve$$1) {
	            var ticked = 0;
	            var tick = 1;
	            var interval = 0;
	            clearInterval(interval);
	            interval = setInterval(function () {
	                if (!_this._processing) {
	                    resolve$$1({
	                        interval: interval,
	                        ready: true,
	                    });
	                }
	                else {
	                    ticked += tick;
	                    if (timeout && ticked >= timeout) {
	                        resolve$$1({
	                            interval: interval,
	                            ready: false,
	                        });
	                    }
	                }
	            }, tick);
	        });
	    };
	    /** Returns the current backend. */
	    BaseClient.prototype._getBackend = function () {
	        return this._backend;
	    };
	    /** Determines whether this SDK is enabled and a valid Dsn is present. */
	    BaseClient.prototype._isEnabled = function () {
	        return this.getOptions().enabled !== false && this._dsn !== undefined;
	    };
	    /**
	     * Adds common information to events.
	     *
	     * The information includes release and environment from `options`,
	     * breadcrumbs and context (extra, tags and user) from the scope.
	     *
	     * Information that is already present in the event is never overwritten. For
	     * nested objects, such as the context, keys are merged.
	     *
	     * @param event The original event.
	     * @param hint May contain additional informartion about the original exception.
	     * @param scope A scope containing event metadata.
	     * @returns A new event with more information.
	     */
	    BaseClient.prototype._prepareEvent = function (event, scope, hint) {
	        var _a = this.getOptions(), environment = _a.environment, release = _a.release, dist = _a.dist, _b = _a.maxValueLength, maxValueLength = _b === void 0 ? 250 : _b;
	        var prepared = __assign({}, event);
	        if (prepared.environment === undefined && environment !== undefined) {
	            prepared.environment = environment;
	        }
	        if (prepared.release === undefined && release !== undefined) {
	            prepared.release = release;
	        }
	        if (prepared.dist === undefined && dist !== undefined) {
	            prepared.dist = dist;
	        }
	        if (prepared.message) {
	            prepared.message = truncate(prepared.message, maxValueLength);
	        }
	        var exception = prepared.exception && prepared.exception.values && prepared.exception.values[0];
	        if (exception && exception.value) {
	            exception.value = truncate(exception.value, maxValueLength);
	        }
	        var request = prepared.request;
	        if (request && request.url) {
	            request.url = truncate(request.url, maxValueLength);
	        }
	        if (prepared.event_id === undefined) {
	            prepared.event_id = uuid4();
	        }
	        this._addIntegrations(prepared.sdk);
	        // We prepare the result here with a resolved Event.
	        var result = SyncPromise.resolve(prepared);
	        // This should be the last thing called, since we want that
	        // {@link Hub.addEventProcessor} gets the finished prepared event.
	        if (scope) {
	            // In case we have a hub we reassign it.
	            result = scope.applyToEvent(prepared, hint);
	        }
	        return result;
	    };
	    /**
	     * This function adds all used integrations to the SDK info in the event.
	     * @param sdkInfo The sdkInfo of the event that will be filled with all integrations.
	     */
	    BaseClient.prototype._addIntegrations = function (sdkInfo) {
	        var integrationsArray = Object.keys(this._integrations);
	        if (sdkInfo && integrationsArray.length > 0) {
	            sdkInfo.integrations = integrationsArray;
	        }
	    };
	    /**
	     * Processes an event (either error or message) and sends it to Sentry.
	     *
	     * This also adds breadcrumbs and context information to the event. However,
	     * platform specific meta data (such as the User's IP address) must be added
	     * by the SDK implementor.
	     *
	     *
	     * @param event The event to send to Sentry.
	     * @param hint May contain additional informartion about the original exception.
	     * @param scope A scope containing event metadata.
	     * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
	     */
	    BaseClient.prototype._processEvent = function (event, hint, scope) {
	        var _this = this;
	        var _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
	        if (!this._isEnabled()) {
	            return SyncPromise.reject('SDK not enabled, will not send event.');
	        }
	        // 1.0 === 100% events are sent
	        // 0.0 === 0% events are sent
	        if (typeof sampleRate === 'number' && Math.random() > sampleRate) {
	            return SyncPromise.reject('This event has been sampled, will not send event.');
	        }
	        return new SyncPromise(function (resolve$$1, reject) {
	            _this._prepareEvent(event, scope, hint).then(function (prepared) {
	                if (prepared === null) {
	                    reject('An event processor returned null, will not send event.');
	                    return;
	                }
	                var finalEvent = prepared;
	                try {
	                    var isInternalException = hint && hint.data && hint.data.__sentry__ === true;
	                    if (isInternalException || !beforeSend) {
	                        _this._getBackend().sendEvent(finalEvent);
	                        resolve$$1(finalEvent);
	                        return;
	                    }
	                    var beforeSendResult = beforeSend(prepared, hint);
	                    if (typeof beforeSendResult === 'undefined') {
	                        logger$1.error('`beforeSend` method has to return `null` or a valid event.');
	                    }
	                    else if (isThenable(beforeSendResult)) {
	                        _this._handleAsyncBeforeSend(beforeSendResult, resolve$$1, reject);
	                    }
	                    else {
	                        finalEvent = beforeSendResult;
	                        if (finalEvent === null) {
	                            logger$1.log('`beforeSend` returned `null`, will not send event.');
	                            resolve$$1(null);
	                            return;
	                        }
	                        // From here on we are really async
	                        _this._getBackend().sendEvent(finalEvent);
	                        resolve$$1(finalEvent);
	                    }
	                }
	                catch (exception) {
	                    _this.captureException(exception, {
	                        data: {
	                            __sentry__: true,
	                        },
	                        originalException: exception,
	                    });
	                    reject('`beforeSend` throw an error, will not send event.');
	                }
	            });
	        });
	    };
	    /**
	     * Resolves before send Promise and calls resolve/reject on parent SyncPromise.
	     */
	    BaseClient.prototype._handleAsyncBeforeSend = function (beforeSend, resolve$$1, reject) {
	        var _this = this;
	        beforeSend
	            .then(function (processedEvent) {
	            if (processedEvent === null) {
	                reject('`beforeSend` returned `null`, will not send event.');
	                return;
	            }
	            // From here on we are really async
	            _this._getBackend().sendEvent(processedEvent);
	            resolve$$1(processedEvent);
	        })
	            .catch(function (e) {
	            reject("beforeSend rejected with " + e);
	        });
	    };
	    return BaseClient;
	}());

	/** Noop transport */
	var NoopTransport = /** @class */ (function () {
	    function NoopTransport() {
	    }
	    /**
	     * @inheritDoc
	     */
	    NoopTransport.prototype.sendEvent = function (_) {
	        return Promise.resolve({
	            reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
	            status: Status.Skipped,
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    NoopTransport.prototype.close = function (_) {
	        return Promise.resolve(true);
	    };
	    return NoopTransport;
	}());

	/**
	 * This is the base implemention of a Backend.
	 * @hidden
	 */
	var BaseBackend = /** @class */ (function () {
	    /** Creates a new backend instance. */
	    function BaseBackend(options) {
	        this._options = options;
	        if (!this._options.dsn) {
	            logger$1.warn('No DSN provided, backend will not do anything.');
	        }
	        this._transport = this._setupTransport();
	    }
	    /**
	     * Sets up the transport so it can be used later to send requests.
	     */
	    BaseBackend.prototype._setupTransport = function () {
	        return new NoopTransport();
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseBackend.prototype.eventFromException = function (_exception, _hint) {
	        throw new SentryError('Backend has to implement `eventFromException` method');
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseBackend.prototype.eventFromMessage = function (_message, _level, _hint) {
	        throw new SentryError('Backend has to implement `eventFromMessage` method');
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseBackend.prototype.sendEvent = function (event) {
	        this._transport.sendEvent(event).catch(function (reason) {
	            logger$1.error("Error while sending event: " + reason);
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseBackend.prototype.getTransport = function () {
	        return this._transport;
	    };
	    return BaseBackend;
	}());

	/**
	 * Internal function to create a new SDK client instance. The client is
	 * installed and then bound to the current scope.
	 *
	 * @param clientClass The client class to instanciate.
	 * @param options Options to pass to the client.
	 */
	function initAndBind(clientClass, options) {
	    if (options.debug === true) {
	        logger$1.enable();
	    }
	    getCurrentHub().bindClient(new clientClass(options));
	}

	var originalFunctionToString;
	/** Patch toString calls to return proper name for wrapped functions */
	var FunctionToString = /** @class */ (function () {
	    function FunctionToString() {
	        /**
	         * @inheritDoc
	         */
	        this.name = FunctionToString.id;
	    }
	    /**
	     * @inheritDoc
	     */
	    FunctionToString.prototype.setupOnce = function () {
	        originalFunctionToString = Function.prototype.toString;
	        Function.prototype.toString = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var context = this.__sentry__ ? this.__sentry_original__ : this;
	            // tslint:disable-next-line:no-unsafe-any
	            return originalFunctionToString.apply(context, args);
	        };
	    };
	    /**
	     * @inheritDoc
	     */
	    FunctionToString.id = 'FunctionToString';
	    return FunctionToString;
	}());

	// "Script error." is hard coded into browsers for errors that it can't read.
	// this is the result of a script being pulled in from an external domain and CORS.
	var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
	/** Inbound filters configurable by the user */
	var InboundFilters = /** @class */ (function () {
	    function InboundFilters(_options) {
	        if (_options === void 0) { _options = {}; }
	        this._options = _options;
	        /**
	         * @inheritDoc
	         */
	        this.name = InboundFilters.id;
	    }
	    /**
	     * @inheritDoc
	     */
	    InboundFilters.prototype.setupOnce = function () {
	        addGlobalEventProcessor(function (event) {
	            var hub = getCurrentHub();
	            if (!hub) {
	                return event;
	            }
	            var self = hub.getIntegration(InboundFilters);
	            if (self) {
	                var client = hub.getClient();
	                var clientOptions = client ? client.getOptions() : {};
	                var options = self._mergeOptions(clientOptions);
	                if (self._shouldDropEvent(event, options)) {
	                    return null;
	                }
	            }
	            return event;
	        });
	    };
	    /** JSDoc */
	    InboundFilters.prototype._shouldDropEvent = function (event, options) {
	        if (this._isSentryError(event, options)) {
	            logger$1.warn("Event dropped due to being internal Sentry Error.\nEvent: " + getEventDescription(event));
	            return true;
	        }
	        if (this._isIgnoredError(event, options)) {
	            logger$1.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + getEventDescription(event));
	            return true;
	        }
	        if (this._isBlacklistedUrl(event, options)) {
	            logger$1.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event));
	            return true;
	        }
	        if (!this._isWhitelistedUrl(event, options)) {
	            logger$1.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event));
	            return true;
	        }
	        return false;
	    };
	    /** JSDoc */
	    InboundFilters.prototype._isSentryError = function (event, options) {
	        if (options === void 0) { options = {}; }
	        if (!options.ignoreInternal) {
	            return false;
	        }
	        try {
	            // tslint:disable-next-line:no-unsafe-any
	            return event.exception.values[0].type === 'SentryError';
	        }
	        catch (_oO) {
	            return false;
	        }
	    };
	    /** JSDoc */
	    InboundFilters.prototype._isIgnoredError = function (event, options) {
	        if (options === void 0) { options = {}; }
	        if (!options.ignoreErrors || !options.ignoreErrors.length) {
	            return false;
	        }
	        return this._getPossibleEventMessages(event).some(function (message) {
	            // Not sure why TypeScript complains here...
	            return options.ignoreErrors.some(function (pattern) { return isMatchingPattern(message, pattern); });
	        });
	    };
	    /** JSDoc */
	    InboundFilters.prototype._isBlacklistedUrl = function (event, options) {
	        if (options === void 0) { options = {}; }
	        // TODO: Use Glob instead?
	        if (!options.blacklistUrls || !options.blacklistUrls.length) {
	            return false;
	        }
	        var url = this._getEventFilterUrl(event);
	        return !url ? false : options.blacklistUrls.some(function (pattern) { return isMatchingPattern(url, pattern); });
	    };
	    /** JSDoc */
	    InboundFilters.prototype._isWhitelistedUrl = function (event, options) {
	        if (options === void 0) { options = {}; }
	        // TODO: Use Glob instead?
	        if (!options.whitelistUrls || !options.whitelistUrls.length) {
	            return true;
	        }
	        var url = this._getEventFilterUrl(event);
	        return !url ? true : options.whitelistUrls.some(function (pattern) { return isMatchingPattern(url, pattern); });
	    };
	    /** JSDoc */
	    InboundFilters.prototype._mergeOptions = function (clientOptions) {
	        if (clientOptions === void 0) { clientOptions = {}; }
	        return {
	            blacklistUrls: __spread((this._options.blacklistUrls || []), (clientOptions.blacklistUrls || [])),
	            ignoreErrors: __spread((this._options.ignoreErrors || []), (clientOptions.ignoreErrors || []), DEFAULT_IGNORE_ERRORS),
	            ignoreInternal: typeof this._options.ignoreInternal !== 'undefined' ? this._options.ignoreInternal : true,
	            whitelistUrls: __spread((this._options.whitelistUrls || []), (clientOptions.whitelistUrls || [])),
	        };
	    };
	    /** JSDoc */
	    InboundFilters.prototype._getPossibleEventMessages = function (event) {
	        if (event.message) {
	            return [event.message];
	        }
	        if (event.exception) {
	            try {
	                // tslint:disable-next-line:no-unsafe-any
	                var _a = event.exception.values[0], type = _a.type, value = _a.value;
	                return ["" + value, type + ": " + value];
	            }
	            catch (oO) {
	                logger$1.error("Cannot extract message for event " + getEventDescription(event));
	                return [];
	            }
	        }
	        return [];
	    };
	    /** JSDoc */
	    InboundFilters.prototype._getEventFilterUrl = function (event) {
	        try {
	            if (event.stacktrace) {
	                // tslint:disable:no-unsafe-any
	                var frames_1 = event.stacktrace.frames;
	                return frames_1[frames_1.length - 1].filename;
	            }
	            if (event.exception) {
	                // tslint:disable:no-unsafe-any
	                var frames_2 = event.exception.values[0].stacktrace.frames;
	                return frames_2[frames_2.length - 1].filename;
	            }
	            return null;
	        }
	        catch (oO) {
	            logger$1.error("Cannot extract url for event " + getEventDescription(event));
	            return null;
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    InboundFilters.id = 'InboundFilters';
	    return InboundFilters;
	}());



	var CoreIntegrations = /*#__PURE__*/Object.freeze({
		FunctionToString: FunctionToString,
		InboundFilters: InboundFilters
	});

	// tslint:disable
	/**
	 * TraceKit - Cross brower stack traces
	 *
	 * This was originally forked from github.com/occ/TraceKit, but has since been
	 * largely modified and is now maintained as part of Sentry JS SDK.
	 *
	 * NOTE: Last merge with upstream repository
	 * Jul 11,2018 - #f03357c
	 *
	 * https://github.com/csnover/TraceKit
	 * @license MIT
	 * @namespace TraceKit
	 */
	var window$1 = getGlobalObject();
	var TraceKit = {
	    _report: false,
	    _collectWindowErrors: false,
	    _computeStackTrace: false,
	    _linesOfContext: false,
	};
	// var TraceKit: TraceKitInterface = {};
	// var TraceKit = {};
	// global reference to slice
	var UNKNOWN_FUNCTION = '?';
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
	var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
	/**
	 * A better form of hasOwnProperty<br/>
	 * Example: `_has(MainHostObject, property) === true/false`
	 *
	 * @param {Object} object to check property
	 * @param {string} key to check
	 * @return {Boolean} true if the object has the key and it is not inherited
	 */
	function _has(object, key) {
	    return Object.prototype.hasOwnProperty.call(object, key);
	}
	/**
	 * A safe form of location.href<br/>
	 *
	 * @return {string} location.href
	 */
	function getLocationHref() {
	    if (typeof document === 'undefined' || document.location == null)
	        return '';
	    return document.location.href;
	}
	/**
	 * Cross-browser processing of unhandled exceptions
	 *
	 * Syntax:
	 * ```js
	 *   TraceKit.report.subscribe(function(stackInfo) { ... })
	 *   TraceKit.report(exception)
	 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
	 * ```
	 *
	 * Supports:
	 *   - Firefox: full stack trace with line numbers, plus column number
	 *     on top frame; column number is not guaranteed
	 *   - Opera: full stack trace with line and column numbers
	 *   - Chrome: full stack trace with line and column numbers
	 *   - Safari: line and column number for the top frame only; some frames
	 *     may be missing, and column number is not guaranteed
	 *   - IE: line and column number for the top frame only; some frames
	 *     may be missing, and column number is not guaranteed
	 *
	 * In theory, TraceKit should work on all of the following versions:
	 *   - IE5.5+ (only 8.0 tested)
	 *   - Firefox 0.9+ (only 3.5+ tested)
	 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
	 *     Exceptions Have Stacktrace to be enabled in opera:config)
	 *   - Safari 3+ (only 4+ tested)
	 *   - Chrome 1+ (only 5+ tested)
	 *   - Konqueror 3.5+ (untested)
	 *
	 * Requires TraceKit._computeStackTrace.
	 *
	 * Tries to catch all unhandled exceptions and report them to the
	 * subscribed handlers. Please note that TraceKit.report will rethrow the
	 * exception. This is REQUIRED in order to get a useful stack trace in IE.
	 * If the exception does not reach the top of the browser, you will only
	 * get a stack trace from the point where TraceKit.report was called.
	 *
	 * Handlers receive a TraceKit.StackTrace object as described in the
	 * TraceKit._computeStackTrace docs.
	 *
	 * @memberof TraceKit
	 * @namespace
	 */
	TraceKit._report = (function reportModuleWrapper() {
	    var handlers = [], lastException = null, lastExceptionStack = null;
	    /**
	     * Add a crash handler.
	     * @param {Function} handler
	     * @memberof TraceKit.report
	     */
	    function _subscribe(handler) {
	        // NOTE: We call both handlers manually in browser/integrations/globalhandler.ts
	        // So user can choose which one he wants to attach
	        // installGlobalHandler();
	        // installGlobalUnhandledRejectionHandler();
	        handlers.push(handler);
	    }
	    /**
	     * Dispatch stack information to all handlers.
	     * @param {TraceKit.StackTrace} stack
	     * @param {boolean} isWindowError Is this a top-level window error?
	     * @param {Error=} error The error that's being handled (if available, null otherwise)
	     * @memberof TraceKit.report
	     * @throws An exception if an error occurs while calling an handler.
	     */
	    function _notifyHandlers(stack, isWindowError, error) {
	        var exception = null;
	        if (isWindowError && !TraceKit._collectWindowErrors) {
	            return;
	        }
	        for (var i in handlers) {
	            if (_has(handlers, i)) {
	                try {
	                    handlers[i](stack, isWindowError, error);
	                }
	                catch (inner) {
	                    exception = inner;
	                }
	            }
	        }
	        if (exception) {
	            throw exception;
	        }
	    }
	    var _oldOnerrorHandler, _onErrorHandlerInstalled;
	    /**
	     * Ensures all global unhandled exceptions are recorded.
	     * Supported by Gecko and IE.
	     * @param {string} message Error message.
	     * @param {string} url URL of script that generated the exception.
	     * @param {(number|string)} lineNo The line number at which the error occurred.
	     * @param {(number|string)=} columnNo The column number at which the error occurred.
	     * @param {Error=} errorObj The actual Error object.
	     * @memberof TraceKit.report
	     */
	    function _traceKitWindowOnError(message, url, lineNo, columnNo, errorObj) {
	        var stack = null;
	        // If 'errorObj' is ErrorEvent, get real Error from inside
	        errorObj = isErrorEvent(errorObj) ? errorObj.error : errorObj;
	        // If 'message' is ErrorEvent, get real message from inside
	        message = isErrorEvent(message) ? message.message : message;
	        if (lastExceptionStack) {
	            TraceKit._computeStackTrace._augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
	            processLastException();
	        }
	        else if (errorObj && isError(errorObj)) {
	            stack = TraceKit._computeStackTrace(errorObj);
	            stack.mechanism = 'onerror';
	            _notifyHandlers(stack, true, errorObj);
	        }
	        else {
	            var location = {
	                url: url,
	                line: lineNo,
	                column: columnNo,
	            };
	            var name;
	            var msg = message; // must be new var or will modify original `arguments`
	            if ({}.toString.call(message) === '[object String]') {
	                var groups = message.match(ERROR_TYPES_RE);
	                if (groups) {
	                    name = groups[1];
	                    msg = groups[2];
	                }
	            }
	            location.func = UNKNOWN_FUNCTION;
	            location.context = null;
	            stack = {
	                name: name,
	                message: msg,
	                mode: 'onerror',
	                mechanism: 'onerror',
	                stack: [
	                    __assign({}, location, { 
	                        // Firefox sometimes doesn't return url correctly and this is an old behavior
	                        // that I prefer to port here as well.
	                        // It can be altered only here, as previously it's using `location.url` for other things — Kamil
	                        url: location.url || getLocationHref() }),
	                ],
	            };
	            _notifyHandlers(stack, true, null);
	        }
	        if (_oldOnerrorHandler) {
	            // @ts-ignore
	            return _oldOnerrorHandler.apply(this, arguments);
	        }
	        return false;
	    }
	    /**
	     * Ensures all unhandled rejections are recorded.
	     * @param {PromiseRejectionEvent} e event.
	     * @memberof TraceKit.report
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
	     */
	    function _traceKitWindowOnUnhandledRejection(e) {
	        var err = e;
	        // You cannot itterate over non-objects, but we want to check
	        // for the existence in any value, not for the value itself
	        try {
	            err = e && 'reason' in e ? e.reason : e;
	        }
	        catch (_oO) { }
	        var stack = TraceKit._computeStackTrace(err);
	        stack.mechanism = 'onunhandledrejection';
	        _notifyHandlers(stack, true, err);
	    }
	    /**
	     * Install a global onerror handler
	     * @memberof TraceKit.report
	     */
	    function _installGlobalHandler() {
	        if (_onErrorHandlerInstalled === true) {
	            return;
	        }
	        _oldOnerrorHandler = window$1.onerror;
	        window$1.onerror = _traceKitWindowOnError;
	        _onErrorHandlerInstalled = true;
	    }
	    /**
	     * Install a global onunhandledrejection handler
	     * @memberof TraceKit.report
	     */
	    function _installGlobalUnhandledRejectionHandler() {
	        window$1.onunhandledrejection = _traceKitWindowOnUnhandledRejection;
	    }
	    /**
	     * Process the most recent exception
	     * @memberof TraceKit.report
	     */
	    function processLastException() {
	        var _lastExceptionStack = lastExceptionStack, _lastException = lastException;
	        lastExceptionStack = null;
	        lastException = null;
	        _notifyHandlers(_lastExceptionStack, false, _lastException);
	    }
	    /**
	     * Reports an unhandled Error to TraceKit.
	     * @param {Error} ex
	     * @memberof TraceKit.report
	     * @throws An exception if an incomplete stack trace is detected (old IE browsers).
	     */
	    function _report(ex) {
	        if (lastExceptionStack) {
	            if (lastException === ex) {
	                return; // already caught by an inner catch block, ignore
	            }
	            else {
	                processLastException();
	            }
	        }
	        var stack = TraceKit._computeStackTrace(ex);
	        lastExceptionStack = stack;
	        lastException = ex;
	        // If the stack trace is incomplete, wait for 2 seconds for
	        // slow slow IE to see if onerror occurs or not before reporting
	        // this exception; otherwise, we will end up with an incomplete
	        // stack trace
	        setTimeout(function () {
	            if (lastException === ex) {
	                processLastException();
	            }
	        }, stack.incomplete ? 2000 : 0);
	        throw ex; // re-throw to propagate to the top level (and cause window.onerror)
	    }
	    _report._subscribe = _subscribe;
	    _report._installGlobalHandler = _installGlobalHandler;
	    _report._installGlobalUnhandledRejectionHandler = _installGlobalUnhandledRejectionHandler;
	    return _report;
	})();
	/**
	 * An object representing a single stack frame.
	 * @typedef {Object} StackFrame
	 * @property {string} url The JavaScript or HTML file URL.
	 * @property {string} func The function name, or empty for anonymous functions (if guessing did not work).
	 * @property {string[]?} args The arguments passed to the function, if known.
	 * @property {number=} line The line number, if known.
	 * @property {number=} column The column number, if known.
	 * @property {string[]} context An array of source code lines; the middle element corresponds to the correct line#.
	 * @memberof TraceKit
	 */
	/**
	 * An object representing a JavaScript stack trace.
	 * @typedef {Object} StackTrace
	 * @property {string} name The name of the thrown exception.
	 * @property {string} message The exception error message.
	 * @property {TraceKit.StackFrame[]} stack An array of stack frames.
	 * @property {string} mode 'stack', 'stacktrace', 'multiline', 'callers', 'onerror', or 'failed' -- method used to collect the stack trace.
	 * @memberof TraceKit
	 */
	/**
	 * TraceKit._computeStackTrace: cross-browser stack traces in JavaScript
	 *
	 * Syntax:
	 *   ```js
	 *   s = TraceKit._computeStackTrace(exception) // consider using TraceKit.report instead (see below)
	 *   ```
	 *
	 * Supports:
	 *   - Firefox:  full stack trace with line numbers and unreliable column
	 *               number on top frame
	 *   - Opera 10: full stack trace with line and column numbers
	 *   - Opera 9-: full stack trace with line numbers
	 *   - Chrome:   full stack trace with line and column numbers
	 *   - Safari:   line and column number for the topmost stacktrace element
	 *               only
	 *   - IE:       no line numbers whatsoever
	 *
	 * Tries to guess names of anonymous functions by looking for assignments
	 * in the source code. In IE and Safari, we have to guess source file names
	 * by searching for function bodies inside all page scripts. This will not
	 * work for scripts that are loaded cross-domain.
	 * Here be dragons: some function names may be guessed incorrectly, and
	 * duplicate functions may be mismatched.
	 *
	 * TraceKit._computeStackTrace should only be used for tracing purposes.
	 * Logging of unhandled exceptions should be done with TraceKit.report,
	 * which builds on top of TraceKit._computeStackTrace and provides better
	 * IE support by utilizing the window.onerror event to retrieve information
	 * about the top of the stack.
	 *
	 * Note: In IE and Safari, no stack trace is recorded on the Error object,
	 * so computeStackTrace instead walks its *own* chain of callers.
	 * This means that:
	 *  * in Safari, some methods may be missing from the stack trace;
	 *  * in IE, the topmost function in the stack trace will always be the
	 *    caller of computeStackTrace.
	 *
	 * This is okay for tracing (because you are likely to be calling
	 * computeStackTrace from the function you want to be the topmost element
	 * of the stack trace anyway), but not okay for logging unhandled
	 * exceptions (because your catch block will likely be far away from the
	 * inner function that actually caused the exception).
	 *
	 * @memberof TraceKit
	 * @namespace
	 */
	TraceKit._computeStackTrace = (function _computeStackTraceWrapper() {
	    // Contents of Exception in various browsers.
	    //
	    // SAFARI:
	    // ex.message = Can't find variable: qq
	    // ex.line = 59
	    // ex.sourceId = 580238192
	    // ex.sourceURL = http://...
	    // ex.expressionBeginOffset = 96
	    // ex.expressionCaretOffset = 98
	    // ex.expressionEndOffset = 98
	    // ex.name = ReferenceError
	    //
	    // FIREFOX:
	    // ex.message = qq is not defined
	    // ex.fileName = http://...
	    // ex.lineNumber = 59
	    // ex.columnNumber = 69
	    // ex.stack = ...stack trace... (see the example below)
	    // ex.name = ReferenceError
	    //
	    // CHROME:
	    // ex.message = qq is not defined
	    // ex.name = ReferenceError
	    // ex.type = not_defined
	    // ex.arguments = ['aa']
	    // ex.stack = ...stack trace...
	    //
	    // INTERNET EXPLORER:
	    // ex.message = ...
	    // ex.name = ReferenceError
	    //
	    // OPERA:
	    // ex.message = ...message... (see the example below)
	    // ex.name = ReferenceError
	    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
	    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'
	    /**
	     * Computes stack trace information from the stack property.
	     * Chrome and Gecko use this property.
	     * @param {Error} ex
	     * @return {?TraceKit.StackTrace} Stack trace information.
	     * @memberof TraceKit._computeStackTrace
	     */
	    function _computeStackTraceFromStackProp(ex) {
	        if (!ex || !ex.stack) {
	            return null;
	        }
	        // Chromium based browsers: Chrome, Brave, new Opera, new Edge
	        var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, 
	        // gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
	        // generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
	        // We need this specific case for now because we want no other regex to match.
	        gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, 
	        // Used to additionally parse URL/line/column from eval frames
	        isEval, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [], submatch, parts, element, reference = /^(.*) is undefined$/.exec(ex.message);
	        for (var i = 0, j = lines.length; i < j; ++i) {
	            if ((parts = chrome.exec(lines[i]))) {
	                var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
	                isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
	                if (isEval && (submatch = chromeEval.exec(parts[2]))) {
	                    // throw out eval line/column and use top-most line/column number
	                    parts[2] = submatch[1]; // url
	                    parts[3] = submatch[2]; // line
	                    parts[4] = submatch[3]; // column
	                }
	                element = {
	                    url: parts[2],
	                    func: parts[1] || UNKNOWN_FUNCTION,
	                    args: isNative ? [parts[2]] : [],
	                    line: parts[3] ? +parts[3] : null,
	                    column: parts[4] ? +parts[4] : null,
	                };
	            }
	            else if ((parts = winjs.exec(lines[i]))) {
	                element = {
	                    url: parts[2],
	                    func: parts[1] || UNKNOWN_FUNCTION,
	                    args: [],
	                    line: +parts[3],
	                    column: parts[4] ? +parts[4] : null,
	                };
	            }
	            else if ((parts = gecko.exec(lines[i]))) {
	                isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
	                if (isEval && (submatch = geckoEval.exec(parts[3]))) {
	                    // throw out eval line/column and use top-most line number
	                    parts[1] = parts[1] || "eval";
	                    parts[3] = submatch[1];
	                    parts[4] = submatch[2];
	                    parts[5] = ''; // no column when eval
	                }
	                else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
	                    // FireFox uses this awesome columnNumber property for its top frame
	                    // Also note, Firefox's column number is 0-based and everything else expects 1-based,
	                    // so adding 1
	                    // NOTE: this hack doesn't work if top-most frame is eval
	                    stack[0].column = ex.columnNumber + 1;
	                }
	                element = {
	                    url: parts[3],
	                    func: parts[1] || UNKNOWN_FUNCTION,
	                    args: parts[2] ? parts[2].split(',') : [],
	                    line: parts[4] ? +parts[4] : null,
	                    column: parts[5] ? +parts[5] : null,
	                };
	            }
	            else {
	                continue;
	            }
	            if (!element.func && element.line) {
	                element.func = UNKNOWN_FUNCTION;
	            }
	            element.context = null;
	            stack.push(element);
	        }
	        if (!stack.length) {
	            return null;
	        }
	        if (stack[0] && stack[0].line && !stack[0].column && reference) {
	            stack[0].column = null;
	        }
	        return {
	            mode: 'stack',
	            name: ex.name,
	            message: ex.message,
	            stack: stack,
	        };
	    }
	    /**
	     * Computes stack trace information from the stacktrace property.
	     * Opera 10+ uses this property.
	     * @param {Error} ex
	     * @return {?TraceKit.StackTrace} Stack trace information.
	     * @memberof TraceKit._computeStackTrace
	     */
	    function _computeStackTraceFromStacktraceProp(ex) {
	        // Access and store the stacktrace property before doing ANYTHING
	        // else to it because Opera is not very good at providing it
	        // reliably in other circumstances.
	        var stacktrace = ex.stacktrace;
	        if (!stacktrace) {
	            return;
	        }
	        var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, lines = stacktrace.split('\n'), stack = [], parts;
	        for (var line = 0; line < lines.length; line += 2) {
	            var element = null;
	            if ((parts = opera10Regex.exec(lines[line]))) {
	                element = {
	                    url: parts[2],
	                    line: +parts[1],
	                    column: null,
	                    func: parts[3],
	                    args: [],
	                };
	            }
	            else if ((parts = opera11Regex.exec(lines[line]))) {
	                element = {
	                    url: parts[6],
	                    line: +parts[1],
	                    column: +parts[2],
	                    func: parts[3] || parts[4],
	                    args: parts[5] ? parts[5].split(',') : [],
	                };
	            }
	            if (element) {
	                if (!element.func && element.line) {
	                    element.func = UNKNOWN_FUNCTION;
	                }
	                if (element.line) {
	                    element.context = null;
	                }
	                if (!element.context) {
	                    element.context = [lines[line + 1]];
	                }
	                stack.push(element);
	            }
	        }
	        if (!stack.length) {
	            return null;
	        }
	        return {
	            mode: 'stacktrace',
	            name: ex.name,
	            message: ex.message,
	            stack: stack,
	        };
	    }
	    /**
	     * NOT TESTED.
	     * Computes stack trace information from an error message that includes
	     * the stack trace.
	     * Opera 9 and earlier use this method if the option to show stack
	     * traces is turned on in opera:config.
	     * @param {Error} ex
	     * @return {?TraceKit.StackTrace} Stack information.
	     * @memberof TraceKit._computeStackTrace
	     */
	    function _computeStackTraceFromOperaMultiLineMessage(ex) {
	        // TODO: Clean this function up
	        // Opera includes a stack trace into the exception message. An example is:
	        //
	        // Statement on line 3: Undefined variable: undefinedFunc
	        // Backtrace:
	        //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js: In function zzz
	        //         undefinedFunc(a);
	        //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function yyy
	        //           zzz(x, y, z);
	        //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function xxx
	        //           yyy(a, a, a);
	        //   Line 1 of function script
	        //     try { xxx('hi'); return false; } catch(ex) { TraceKit.report(ex); }
	        //   ...
	        var lines = ex.message.split('\n');
	        if (lines.length < 4) {
	            return null;
	        }
	        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, lineRE3 = /^\s*Line (\d+) of function script\s*$/i, stack = [], scripts = window$1 && window$1.document && window$1.document.getElementsByTagName('script'), inlineScriptBlocks = [], parts;
	        for (var s in scripts) {
	            if (_has(scripts, s) && !scripts[s].src) {
	                inlineScriptBlocks.push(scripts[s]);
	            }
	        }
	        for (var line = 2; line < lines.length; line += 2) {
	            var item = null;
	            if ((parts = lineRE1.exec(lines[line]))) {
	                item = {
	                    url: parts[2],
	                    func: parts[3],
	                    args: [],
	                    line: +parts[1],
	                    column: null,
	                };
	            }
	            else if ((parts = lineRE2.exec(lines[line]))) {
	                item = {
	                    url: parts[3],
	                    func: parts[4],
	                    args: [],
	                    line: +parts[1],
	                    column: null,
	                };
	            }
	            else if ((parts = lineRE3.exec(lines[line]))) {
	                var url = getLocationHref().replace(/#.*$/, '');
	                item = {
	                    url: url,
	                    func: '',
	                    args: [],
	                    line: parts[1],
	                    column: null,
	                };
	            }
	            if (item) {
	                if (!item.func) {
	                    item.func = UNKNOWN_FUNCTION;
	                }
	                // if (context) alert("Context mismatch. Correct midline:\n" + lines[i+1] + "\n\nMidline:\n" + midline + "\n\nContext:\n" + context.join("\n") + "\n\nURL:\n" + item.url);
	                item.context = [lines[line + 1]];
	                stack.push(item);
	            }
	        }
	        if (!stack.length) {
	            return null; // could not parse multiline exception message as Opera stack trace
	        }
	        return {
	            mode: 'multiline',
	            name: ex.name,
	            message: lines[0],
	            stack: stack,
	        };
	    }
	    /**
	     * Adds information about the first frame to incomplete stack traces.
	     * Safari and IE require this to get complete data on the first frame.
	     * @param {TraceKit.StackTrace} stackInfo Stack trace information from
	     * one of the compute* methods.
	     * @param {string} url The URL of the script that caused an error.
	     * @param {(number|string)} lineNo The line number of the script that
	     * caused an error.
	     * @param {string=} message The error generated by the browser, which
	     * hopefully contains the name of the object that caused the error.
	     * @return {boolean} Whether or not the stack information was
	     * augmented.
	     * @memberof TraceKit._computeStackTrace
	     */
	    function _augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
	        var initial = {
	            url: url,
	            line: lineNo,
	        };
	        if (initial.url && initial.line) {
	            stackInfo.incomplete = false;
	            if (!initial.func) {
	                initial.func = UNKNOWN_FUNCTION;
	            }
	            if (!initial.context) {
	                initial.context = null;
	            }
	            var reference = / '([^']+)' /.exec(message);
	            if (reference) {
	                initial.column = null;
	            }
	            if (stackInfo.stack.length > 0) {
	                if (stackInfo.stack[0].url === initial.url) {
	                    if (stackInfo.stack[0].line === initial.line) {
	                        return false; // already in stack trace
	                    }
	                    else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
	                        stackInfo.stack[0].line = initial.line;
	                        stackInfo.stack[0].context = initial.context;
	                        return false;
	                    }
	                }
	            }
	            stackInfo.stack.unshift(initial);
	            stackInfo.partial = true;
	            return true;
	        }
	        else {
	            stackInfo.incomplete = true;
	        }
	        return false;
	    }
	    /**
	     * Computes stack trace information by walking the arguments.caller
	     * chain at the time the exception occurred. This will cause earlier
	     * frames to be missed but is the only way to get any stack trace in
	     * Safari and IE. The top frame is restored by
	     * {@link augmentStackTraceWithInitialElement}.
	     * @param {Error} ex
	     * @return {TraceKit.StackTrace=} Stack trace information.
	     * @memberof TraceKit._computeStackTrace
	     */
	    function _computeStackTraceByWalkingCallerChain(ex, depth) {
	        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, stack = [], funcs = {}, recursion = false, parts, item;
	        for (var curr = _computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
	            if (curr === _computeStackTrace || curr === TraceKit._report) {
	                continue;
	            }
	            item = {
	                url: null,
	                func: UNKNOWN_FUNCTION,
	                args: [],
	                line: null,
	                column: null,
	            };
	            if (curr.name) {
	                item.func = curr.name;
	            }
	            else if ((parts = functionName.exec(curr.toString()))) {
	                item.func = parts[1];
	            }
	            if (typeof item.func === 'undefined') {
	                try {
	                    item.func = parts.input.substring(0, parts.input.indexOf('{'));
	                }
	                catch (e) { }
	            }
	            if (funcs['' + curr]) {
	                recursion = true;
	            }
	            else {
	                funcs['' + curr] = true;
	            }
	            stack.push(item);
	        }
	        if (depth) {
	            stack.splice(0, depth);
	        }
	        var result = {
	            mode: 'callers',
	            name: ex.name,
	            message: ex.message,
	            stack: stack,
	        };
	        _augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
	        return result;
	    }
	    /**
	     * Computes a stack trace for an exception.
	     * @param {Error} ex
	     * @param {(string|number)=} depth
	     * @memberof TraceKit._computeStackTrace
	     */
	    function computeStackTrace(ex, depth) {
	        var stack = null;
	        var popSize = ex && ex.framesToPop;
	        depth = depth == null ? 0 : +depth;
	        try {
	            // This must be tried first because Opera 10 *destroys*
	            // its stacktrace property if you try to access the stack
	            // property first!!
	            stack = _computeStackTraceFromStacktraceProp(ex);
	            if (stack) {
	                return popFrames(stack, popSize);
	            }
	        }
	        catch (e) { }
	        try {
	            stack = _computeStackTraceFromStackProp(ex);
	            if (stack) {
	                return popFrames(stack, popSize);
	            }
	        }
	        catch (e) { }
	        try {
	            stack = _computeStackTraceFromOperaMultiLineMessage(ex);
	            if (stack) {
	                return popFrames(stack, popSize);
	            }
	        }
	        catch (e) { }
	        try {
	            stack = _computeStackTraceByWalkingCallerChain(ex, depth + 1);
	            if (stack) {
	                return popFrames(stack, popSize);
	            }
	        }
	        catch (e) { }
	        return {
	            original: ex,
	            name: ex && ex.name,
	            message: ex && ex.message,
	            mode: 'failed',
	        };
	    }
	    function popFrames(stacktrace, popSize) {
	        if (Number.isNaN(popSize)) {
	            return stacktrace;
	        }
	        try {
	            return __assign({}, stacktrace, { stack: stacktrace.stack.slice(popSize) });
	        }
	        catch (e) {
	            return stacktrace;
	        }
	    }
	    computeStackTrace._augmentStackTraceWithInitialElement = _augmentStackTraceWithInitialElement;
	    computeStackTrace._computeStackTraceFromStackProp = _computeStackTraceFromStackProp;
	    return computeStackTrace;
	})();
	TraceKit._collectWindowErrors = true;
	TraceKit._linesOfContext = 11;
	var _subscribe = TraceKit._report._subscribe;
	var _installGlobalHandler = TraceKit._report._installGlobalHandler;
	var _installGlobalUnhandledRejectionHandler = TraceKit._report._installGlobalUnhandledRejectionHandler;
	var _computeStackTrace = TraceKit._computeStackTrace;

	var STACKTRACE_LIMIT = 50;
	/**
	 * This function creates an exception from an TraceKitStackTrace
	 * @param stacktrace TraceKitStackTrace that will be converted to an exception
	 * @hidden
	 */
	function exceptionFromStacktrace(stacktrace) {
	    var frames = prepareFramesForEvent(stacktrace.stack);
	    var exception = {
	        type: stacktrace.name,
	        value: stacktrace.message,
	    };
	    if (frames && frames.length) {
	        exception.stacktrace = { frames: frames };
	    }
	    // tslint:disable-next-line:strict-type-predicates
	    if (exception.type === undefined && exception.value === '') {
	        exception.value = 'Unrecoverable error caught';
	    }
	    return exception;
	}
	/**
	 * @hidden
	 */
	function eventFromPlainObject(exception, syntheticException) {
	    var exceptionKeys = Object.keys(exception).sort();
	    var event = {
	        extra: {
	            __serialized__: normalizeToSize(exception),
	        },
	        message: "Non-Error exception captured with keys: " + keysToEventMessage(exceptionKeys),
	    };
	    if (syntheticException) {
	        var stacktrace = _computeStackTrace(syntheticException);
	        var frames_1 = prepareFramesForEvent(stacktrace.stack);
	        event.stacktrace = {
	            frames: frames_1,
	        };
	    }
	    return event;
	}
	/**
	 * @hidden
	 */
	function eventFromStacktrace(stacktrace) {
	    var exception = exceptionFromStacktrace(stacktrace);
	    return {
	        exception: {
	            values: [exception],
	        },
	    };
	}
	/**
	 * @hidden
	 */
	function prepareFramesForEvent(stack) {
	    if (!stack || !stack.length) {
	        return [];
	    }
	    var localStack = stack;
	    var firstFrameFunction = localStack[0].func || '';
	    var lastFrameFunction = localStack[localStack.length - 1].func || '';
	    // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
	    if (firstFrameFunction.includes('captureMessage') || firstFrameFunction.includes('captureException')) {
	        localStack = localStack.slice(1);
	    }
	    // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
	    if (lastFrameFunction.includes('sentryWrapped')) {
	        localStack = localStack.slice(0, -1);
	    }
	    // The frame where the crash happened, should be the last entry in the array
	    return localStack
	        .map(function (frame) { return ({
	        colno: frame.column,
	        filename: frame.url || localStack[0].url,
	        function: frame.func || '?',
	        in_app: true,
	        lineno: frame.line,
	    }); })
	        .slice(0, STACKTRACE_LIMIT)
	        .reverse();
	}

	/** Base Transport class implementation */
	var BaseTransport = /** @class */ (function () {
	    function BaseTransport(options) {
	        this.options = options;
	        /** A simple buffer holding all requests. */
	        this._buffer = new PromiseBuffer(30);
	        this.url = new API(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
	    }
	    /**
	     * @inheritDoc
	     */
	    BaseTransport.prototype.sendEvent = function (_) {
	        throw new SentryError('Transport Class has to implement `sendEvent` method');
	    };
	    /**
	     * @inheritDoc
	     */
	    BaseTransport.prototype.close = function (timeout) {
	        return this._buffer.drain(timeout);
	    };
	    return BaseTransport;
	}());

	var global$2 = getGlobalObject();
	/** `fetch` based transport */
	var FetchTransport = /** @class */ (function (_super) {
	    __extends(FetchTransport, _super);
	    function FetchTransport() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /**
	     * @inheritDoc
	     */
	    FetchTransport.prototype.sendEvent = function (event) {
	        var defaultOptions = {
	            body: JSON.stringify(event),
	            method: 'POST',
	            // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
	            // https://caniuse.com/#feat=referrer-policy
	            // It doesn't. And it throw exception instead of ignoring this parameter...
	            // REF: https://github.com/getsentry/raven-js/issues/1233
	            referrerPolicy: (supportsReferrerPolicy() ? 'origin' : ''),
	        };
	        return this._buffer.add(global$2.fetch(this.url, defaultOptions).then(function (response) { return ({
	            status: Status.fromHttpCode(response.status),
	        }); }));
	    };
	    return FetchTransport;
	}(BaseTransport));

	/** `XHR` based transport */
	var XHRTransport = /** @class */ (function (_super) {
	    __extends(XHRTransport, _super);
	    function XHRTransport() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /**
	     * @inheritDoc
	     */
	    XHRTransport.prototype.sendEvent = function (event) {
	        var _this = this;
	        return this._buffer.add(new Promise(function (resolve, reject) {
	            var request = new XMLHttpRequest();
	            request.onreadystatechange = function () {
	                if (request.readyState !== 4) {
	                    return;
	                }
	                if (request.status === 200) {
	                    resolve({
	                        status: Status.fromHttpCode(request.status),
	                    });
	                }
	                reject(request);
	            };
	            request.open('POST', _this.url);
	            request.send(JSON.stringify(event));
	        }));
	    };
	    return XHRTransport;
	}(BaseTransport));

	/**
	 * The Sentry Browser SDK Backend.
	 * @hidden
	 */
	var BrowserBackend = /** @class */ (function (_super) {
	    __extends(BrowserBackend, _super);
	    function BrowserBackend() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /**
	     * @inheritDoc
	     */
	    BrowserBackend.prototype._setupTransport = function () {
	        if (!this._options.dsn) {
	            // We return the noop transport here in case there is no Dsn.
	            return _super.prototype._setupTransport.call(this);
	        }
	        var transportOptions = __assign({}, this._options.transportOptions, { dsn: this._options.dsn });
	        if (this._options.transport) {
	            return new this._options.transport(transportOptions);
	        }
	        if (supportsFetch()) {
	            return new FetchTransport(transportOptions);
	        }
	        return new XHRTransport(transportOptions);
	    };
	    /**
	     * @inheritDoc
	     */
	    BrowserBackend.prototype.eventFromException = function (exception, hint) {
	        var _this = this;
	        var event;
	        if (isErrorEvent(exception) && exception.error) {
	            // If it is an ErrorEvent with `error` property, extract it to get actual Error
	            var errorEvent = exception;
	            exception = errorEvent.error; // tslint:disable-line:no-parameter-reassignment
	            event = eventFromStacktrace(_computeStackTrace(exception));
	            return SyncPromise.resolve(this._buildEvent(event, hint));
	        }
	        if (isDOMError(exception) || isDOMException(exception)) {
	            // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
	            // then we just extract the name and message, as they don't provide anything else
	            // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
	            // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
	            var domException = exception;
	            var name_1 = domException.name || (isDOMError(domException) ? 'DOMError' : 'DOMException');
	            var message_1 = domException.message ? name_1 + ": " + domException.message : name_1;
	            return this.eventFromMessage(message_1, Severity.Error, hint).then(function (messageEvent) {
	                addExceptionTypeValue(messageEvent, message_1);
	                return SyncPromise.resolve(_this._buildEvent(messageEvent, hint));
	            });
	        }
	        if (isError(exception)) {
	            // we have a real Error object, do nothing
	            event = eventFromStacktrace(_computeStackTrace(exception));
	            return SyncPromise.resolve(this._buildEvent(event, hint));
	        }
	        if (isPlainObject(exception) && hint && hint.syntheticException) {
	            // If it is plain Object, serialize it manually and extract options
	            // This will allow us to group events based on top-level keys
	            // which is much better than creating new group when any key/value change
	            var objectException = exception;
	            event = eventFromPlainObject(objectException, hint.syntheticException);
	            addExceptionTypeValue(event, 'Custom Object', undefined, {
	                handled: true,
	                synthetic: true,
	                type: 'generic',
	            });
	            event.level = Severity.Error;
	            return SyncPromise.resolve(this._buildEvent(event, hint));
	        }
	        // If none of previous checks were valid, then it means that
	        // it's not a DOMError/DOMException
	        // it's not a plain Object
	        // it's not a valid ErrorEvent (one with an error property)
	        // it's not an Error
	        // So bail out and capture it as a simple message:
	        var stringException = exception;
	        return this.eventFromMessage(stringException, undefined, hint).then(function (messageEvent) {
	            addExceptionTypeValue(messageEvent, "" + stringException, undefined, {
	                handled: true,
	                synthetic: true,
	                type: 'generic',
	            });
	            messageEvent.level = Severity.Error;
	            return SyncPromise.resolve(_this._buildEvent(messageEvent, hint));
	        });
	    };
	    /**
	     * This is an internal helper function that creates an event.
	     */
	    BrowserBackend.prototype._buildEvent = function (event, hint) {
	        return __assign({}, event, { event_id: hint && hint.event_id });
	    };
	    /**
	     * @inheritDoc
	     */
	    BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
	        if (level === void 0) { level = Severity.Info; }
	        var event = {
	            event_id: hint && hint.event_id,
	            level: level,
	            message: message,
	        };
	        if (this._options.attachStacktrace && hint && hint.syntheticException) {
	            var stacktrace = _computeStackTrace(hint.syntheticException);
	            var frames_1 = prepareFramesForEvent(stacktrace.stack);
	            event.stacktrace = {
	                frames: frames_1,
	            };
	        }
	        return SyncPromise.resolve(event);
	    };
	    return BrowserBackend;
	}(BaseBackend));

	var SDK_NAME = 'sentry.javascript.browser';
	var SDK_VERSION = '5.6.3';

	/**
	 * The Sentry Browser SDK Client.
	 *
	 * @see BrowserOptions for documentation on configuration options.
	 * @see SentryClient for usage documentation.
	 */
	var BrowserClient = /** @class */ (function (_super) {
	    __extends(BrowserClient, _super);
	    /**
	     * Creates a new Browser SDK instance.
	     *
	     * @param options Configuration options for this SDK.
	     */
	    function BrowserClient(options) {
	        if (options === void 0) { options = {}; }
	        return _super.call(this, BrowserBackend, options) || this;
	    }
	    /**
	     * @inheritDoc
	     */
	    BrowserClient.prototype._prepareEvent = function (event, scope, hint) {
	        event.platform = event.platform || 'javascript';
	        event.sdk = __assign({}, event.sdk, { name: SDK_NAME, packages: __spread(((event.sdk && event.sdk.packages) || []), [
	                {
	                    name: 'npm:@sentry/browser',
	                    version: SDK_VERSION,
	                },
	            ]), version: SDK_VERSION });
	        return _super.prototype._prepareEvent.call(this, event, scope, hint);
	    };
	    /**
	     * Show a report dialog to the user to send feedback to a specific event.
	     *
	     * @param options Set individual options for the dialog
	     */
	    BrowserClient.prototype.showReportDialog = function (options) {
	        if (options === void 0) { options = {}; }
	        // doesn't work without a document (React Native)
	        var document = getGlobalObject().document;
	        if (!document) {
	            return;
	        }
	        if (!this._isEnabled()) {
	            logger$1.error('Trying to call showReportDialog with Sentry Client is disabled');
	            return;
	        }
	        var dsn = options.dsn || this.getDsn();
	        if (!options.eventId) {
	            logger$1.error('Missing `eventId` option in showReportDialog call');
	            return;
	        }
	        if (!dsn) {
	            logger$1.error('Missing `Dsn` option in showReportDialog call');
	            return;
	        }
	        var script = document.createElement('script');
	        script.async = true;
	        script.src = new API(dsn).getReportDialogEndpoint(options);
	        if (options.onLoad) {
	            script.onload = options.onLoad;
	        }
	        (document.head || document.body).appendChild(script);
	    };
	    return BrowserClient;
	}(BaseClient));

	var debounceDuration = 1000;
	var keypressTimeout;
	var lastCapturedEvent;
	var ignoreOnError = 0;
	/**
	 * @hidden
	 */
	function shouldIgnoreOnError() {
	    return ignoreOnError > 0;
	}
	/**
	 * @hidden
	 */
	function ignoreNextOnError() {
	    // onerror should trigger before setTimeout
	    ignoreOnError += 1;
	    setTimeout(function () {
	        ignoreOnError -= 1;
	    });
	}
	/**
	 * Instruments the given function and sends an event to Sentry every time the
	 * function throws an exception.
	 *
	 * @param fn A function to wrap.
	 * @returns The wrapped function.
	 * @hidden
	 */
	function wrap(fn, options, before) {
	    if (options === void 0) { options = {}; }
	    // tslint:disable-next-line:strict-type-predicates
	    if (typeof fn !== 'function') {
	        return fn;
	    }
	    try {
	        // We don't wanna wrap it twice
	        if (fn.__sentry__) {
	            return fn;
	        }
	        // If this has already been wrapped in the past, return that wrapped function
	        if (fn.__sentry_wrapped__) {
	            return fn.__sentry_wrapped__;
	        }
	    }
	    catch (e) {
	        // Just accessing custom props in some Selenium environments
	        // can cause a "Permission denied" exception (see raven-js#495).
	        // Bail on wrapping and return the function as-is (defers to window.onerror).
	        return fn;
	    }
	    var sentryWrapped = function () {
	        // tslint:disable-next-line:strict-type-predicates
	        if (before && typeof before === 'function') {
	            before.apply(this, arguments);
	        }
	        var args = Array.prototype.slice.call(arguments);
	        // tslint:disable:no-unsafe-any
	        try {
	            var wrappedArguments = args.map(function (arg) { return wrap(arg, options); });
	            if (fn.handleEvent) {
	                // Attempt to invoke user-land function
	                // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
	                //       means the sentry.javascript SDK caught an error invoking your application code. This
	                //       is expected behavior and NOT indicative of a bug with sentry.javascript.
	                return fn.handleEvent.apply(this, wrappedArguments);
	            }
	            // Attempt to invoke user-land function
	            // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
	            //       means the sentry.javascript SDK caught an error invoking your application code. This
	            //       is expected behavior and NOT indicative of a bug with sentry.javascript.
	            return fn.apply(this, wrappedArguments);
	            // tslint:enable:no-unsafe-any
	        }
	        catch (ex) {
	            ignoreNextOnError();
	            withScope(function (scope) {
	                scope.addEventProcessor(function (event) {
	                    var processedEvent = __assign({}, event);
	                    if (options.mechanism) {
	                        addExceptionTypeValue(processedEvent, undefined, undefined, options.mechanism);
	                    }
	                    processedEvent.extra = __assign({}, processedEvent.extra, { arguments: normalize(args, 3) });
	                    return processedEvent;
	                });
	                captureException(ex);
	            });
	            throw ex;
	        }
	    };
	    // Accessing some objects may throw
	    // ref: https://github.com/getsentry/sentry-javascript/issues/1168
	    try {
	        for (var property in fn) {
	            if (Object.prototype.hasOwnProperty.call(fn, property)) {
	                sentryWrapped[property] = fn[property];
	            }
	        }
	    }
	    catch (_oO) { } // tslint:disable-line:no-empty
	    fn.prototype = fn.prototype || {};
	    sentryWrapped.prototype = fn.prototype;
	    Object.defineProperty(fn, '__sentry_wrapped__', {
	        enumerable: false,
	        value: sentryWrapped,
	    });
	    // Signal that this function has been wrapped/filled already
	    // for both debugging and to prevent it to being wrapped/filled twice
	    Object.defineProperties(sentryWrapped, {
	        __sentry__: {
	            enumerable: false,
	            value: true,
	        },
	        __sentry_original__: {
	            enumerable: false,
	            value: fn,
	        },
	    });
	    // Restore original function name (not all browsers allow that)
	    try {
	        var descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name');
	        if (descriptor.configurable) {
	            Object.defineProperty(sentryWrapped, 'name', {
	                get: function () {
	                    return fn.name;
	                },
	            });
	        }
	    }
	    catch (_oO) {
	        /*no-empty*/
	    }
	    return sentryWrapped;
	}
	var debounceTimer = 0;
	/**
	 * Wraps addEventListener to capture UI breadcrumbs
	 * @param eventName the event name (e.g. "click")
	 * @returns wrapped breadcrumb events handler
	 * @hidden
	 */
	function breadcrumbEventHandler(eventName, debounce) {
	    if (debounce === void 0) { debounce = false; }
	    return function (event) {
	        // reset keypress timeout; e.g. triggering a 'click' after
	        // a 'keypress' will reset the keypress debounce so that a new
	        // set of keypresses can be recorded
	        keypressTimeout = undefined;
	        // It's possible this handler might trigger multiple times for the same
	        // event (e.g. event propagation through node ancestors). Ignore if we've
	        // already captured the event.
	        if (!event || lastCapturedEvent === event) {
	            return;
	        }
	        lastCapturedEvent = event;
	        var captureBreadcrumb = function () {
	            // try/catch both:
	            // - accessing event.target (see getsentry/raven-js#838, #768)
	            // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
	            //   can throw an exception in some circumstances.
	            var target;
	            try {
	                target = event.target ? _htmlTreeAsString(event.target) : _htmlTreeAsString(event);
	            }
	            catch (e) {
	                target = '<unknown>';
	            }
	            if (target.length === 0) {
	                return;
	            }
	            getCurrentHub().addBreadcrumb({
	                category: "ui." + eventName,
	                message: target,
	            }, {
	                event: event,
	                name: eventName,
	            });
	        };
	        if (debounceTimer) {
	            clearTimeout(debounceTimer);
	        }
	        if (debounce) {
	            debounceTimer = setTimeout(captureBreadcrumb);
	        }
	        else {
	            captureBreadcrumb();
	        }
	    };
	}
	/**
	 * Wraps addEventListener to capture keypress UI events
	 * @returns wrapped keypress events handler
	 * @hidden
	 */
	function keypressEventHandler() {
	    // TODO: if somehow user switches keypress target before
	    //       debounce timeout is triggered, we will only capture
	    //       a single breadcrumb from the FIRST target (acceptable?)
	    return function (event) {
	        var target;
	        try {
	            target = event.target;
	        }
	        catch (e) {
	            // just accessing event properties can throw an exception in some rare circumstances
	            // see: https://github.com/getsentry/raven-js/issues/838
	            return;
	        }
	        var tagName = target && target.tagName;
	        // only consider keypress events on actual input elements
	        // this will disregard keypresses targeting body (e.g. tabbing
	        // through elements, hotkeys, etc)
	        if (!tagName || (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)) {
	            return;
	        }
	        // record first keypress in a series, but ignore subsequent
	        // keypresses until debounce clears
	        if (!keypressTimeout) {
	            breadcrumbEventHandler('input')(event);
	        }
	        clearTimeout(keypressTimeout);
	        keypressTimeout = setTimeout(function () {
	            keypressTimeout = undefined;
	        }, debounceDuration);
	    };
	}
	/**
	 * Given a child DOM element, returns a query-selector statement describing that
	 * and its ancestors
	 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
	 * @returns generated DOM path
	 */
	function _htmlTreeAsString(elem) {
	    var currentElem = elem;
	    var MAX_TRAVERSE_HEIGHT = 5;
	    var MAX_OUTPUT_LEN = 80;
	    var out = [];
	    var height = 0;
	    var len = 0;
	    var separator = ' > ';
	    var sepLength = separator.length;
	    var nextStr;
	    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
	        nextStr = _htmlElementAsString(currentElem);
	        // bail out if
	        // - nextStr is the 'html' element
	        // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
	        //   (ignore this limit if we are on the first iteration)
	        if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
	            break;
	        }
	        out.push(nextStr);
	        len += nextStr.length;
	        currentElem = currentElem.parentNode;
	    }
	    return out.reverse().join(separator);
	}
	/**
	 * Returns a simple, query-selector representation of a DOM element
	 * e.g. [HTMLElement] => input#foo.btn[name=baz]
	 * @returns generated DOM path
	 */
	function _htmlElementAsString(elem) {
	    var out = [];
	    var className;
	    var classes;
	    var key;
	    var attr;
	    var i;
	    if (!elem || !elem.tagName) {
	        return '';
	    }
	    out.push(elem.tagName.toLowerCase());
	    if (elem.id) {
	        out.push("#" + elem.id);
	    }
	    className = elem.className;
	    if (className && isString(className)) {
	        classes = className.split(/\s+/);
	        for (i = 0; i < classes.length; i++) {
	            out.push("." + classes[i]);
	        }
	    }
	    var attrWhitelist = ['type', 'name', 'title', 'alt'];
	    for (i = 0; i < attrWhitelist.length; i++) {
	        key = attrWhitelist[i];
	        attr = elem.getAttribute(key);
	        if (attr) {
	            out.push("[" + key + "=\"" + attr + "\"]");
	        }
	    }
	    return out.join('');
	}

	/** Global handlers */
	var GlobalHandlers = /** @class */ (function () {
	    /** JSDoc */
	    function GlobalHandlers(options) {
	        /**
	         * @inheritDoc
	         */
	        this.name = GlobalHandlers.id;
	        this._options = __assign({ onerror: true, onunhandledrejection: true }, options);
	    }
	    /**
	     * @inheritDoc
	     */
	    GlobalHandlers.prototype.setupOnce = function () {
	        Error.stackTraceLimit = 50;
	        _subscribe(function (stack, _, error) {
	            var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
	            if (shouldIgnoreOnError() || isFailedOwnDelivery) {
	                return;
	            }
	            var self = getCurrentHub().getIntegration(GlobalHandlers);
	            if (self) {
	                getCurrentHub().captureEvent(self._eventFromGlobalHandler(stack, error), {
	                    data: { stack: stack },
	                    originalException: error,
	                });
	            }
	        });
	        if (this._options.onerror) {
	            logger$1.log('Global Handler attached: onerror');
	            _installGlobalHandler();
	        }
	        if (this._options.onunhandledrejection) {
	            logger$1.log('Global Handler attached: onunhandledrejection');
	            _installGlobalUnhandledRejectionHandler();
	        }
	    };
	    /**
	     * This function creates an Event from an TraceKitStackTrace.
	     *
	     * @param stacktrace TraceKitStackTrace to be converted to an Event.
	     */
	    GlobalHandlers.prototype._eventFromGlobalHandler = function (stacktrace, error) {
	        if (!isString(stacktrace.message) && stacktrace.mechanism !== 'onunhandledrejection') {
	            // There are cases where stacktrace.message is an Event object
	            // https://github.com/getsentry/sentry-javascript/issues/1949
	            // In this specific case we try to extract stacktrace.message.error.message
	            var message = stacktrace.message;
	            stacktrace.message =
	                message.error && isString(message.error.message) ? message.error.message : 'No error message';
	        }
	        if (stacktrace.mechanism === 'onunhandledrejection' && (stacktrace.incomplete || stacktrace.mode === 'failed')) {
	            return this._eventFromIncompleteRejection(stacktrace, error);
	        }
	        var event = eventFromStacktrace(stacktrace);
	        var data = {
	            mode: stacktrace.mode,
	        };
	        if (stacktrace.message) {
	            data.message = stacktrace.message;
	        }
	        if (stacktrace.name) {
	            data.name = stacktrace.name;
	        }
	        var client = getCurrentHub().getClient();
	        var maxValueLength = (client && client.getOptions().maxValueLength) || 250;
	        var fallbackValue = stacktrace.original
	            ? truncate(JSON.stringify(normalize(stacktrace.original)), maxValueLength)
	            : '';
	        var fallbackType = stacktrace.mechanism === 'onunhandledrejection' ? 'UnhandledRejection' : 'Error';
	        // This makes sure we have type/value in every exception
	        addExceptionTypeValue(event, fallbackValue, fallbackType, {
	            data: data,
	            handled: false,
	            type: stacktrace.mechanism,
	        });
	        return event;
	    };
	    /**
	     * This function creates an Event from an TraceKitStackTrace that has part of it missing.
	     *
	     * @param stacktrace TraceKitStackTrace to be converted to an Event.
	     */
	    GlobalHandlers.prototype._eventFromIncompleteRejection = function (stacktrace, error) {
	        var event = {
	            level: Severity.Error,
	        };
	        if (isPrimitive(error)) {
	            event.exception = {
	                values: [
	                    {
	                        type: 'UnhandledRejection',
	                        value: "Non-Error promise rejection captured with value: " + error,
	                    },
	                ],
	            };
	        }
	        else {
	            event.exception = {
	                values: [
	                    {
	                        type: 'UnhandledRejection',
	                        value: "Non-Error promise rejection captured with keys: " + keysToEventMessage(Object.keys(error).sort()),
	                    },
	                ],
	            };
	            event.extra = {
	                __serialized__: normalizeToSize(error),
	            };
	        }
	        if (event.exception.values && event.exception.values[0]) {
	            event.exception.values[0].mechanism = {
	                data: __assign({ mode: stacktrace.mode }, (stacktrace.incomplete && { incomplete: stacktrace.incomplete }), (stacktrace.message && { message: stacktrace.message }), (stacktrace.name && { name: stacktrace.name })),
	                handled: false,
	                type: stacktrace.mechanism,
	            };
	        }
	        return event;
	    };
	    /**
	     * @inheritDoc
	     */
	    GlobalHandlers.id = 'GlobalHandlers';
	    return GlobalHandlers;
	}());

	/** Wrap timer functions and event targets to catch errors and provide better meta data */
	var TryCatch = /** @class */ (function () {
	    function TryCatch() {
	        /** JSDoc */
	        this._ignoreOnError = 0;
	        /**
	         * @inheritDoc
	         */
	        this.name = TryCatch.id;
	    }
	    /** JSDoc */
	    TryCatch.prototype._wrapTimeFunction = function (original) {
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var originalCallback = args[0];
	            args[0] = wrap(originalCallback, {
	                mechanism: {
	                    data: { function: getFunctionName(original) },
	                    handled: true,
	                    type: 'instrument',
	                },
	            });
	            return original.apply(this, args);
	        };
	    };
	    /** JSDoc */
	    TryCatch.prototype._wrapRAF = function (original) {
	        return function (callback) {
	            return original(wrap(callback, {
	                mechanism: {
	                    data: {
	                        function: 'requestAnimationFrame',
	                        handler: getFunctionName(original),
	                    },
	                    handled: true,
	                    type: 'instrument',
	                },
	            }));
	        };
	    };
	    /** JSDoc */
	    TryCatch.prototype._wrapEventTarget = function (target) {
	        var global = getGlobalObject();
	        var proto = global[target] && global[target].prototype;
	        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
	            return;
	        }
	        fill(proto, 'addEventListener', function (original) {
	            return function (eventName, fn, options) {
	                try {
	                    // tslint:disable-next-line:no-unbound-method strict-type-predicates
	                    if (typeof fn.handleEvent === 'function') {
	                        fn.handleEvent = wrap(fn.handleEvent.bind(fn), {
	                            mechanism: {
	                                data: {
	                                    function: 'handleEvent',
	                                    handler: getFunctionName(fn),
	                                    target: target,
	                                },
	                                handled: true,
	                                type: 'instrument',
	                            },
	                        });
	                    }
	                }
	                catch (err) {
	                    // can sometimes get 'Permission denied to access property "handle Event'
	                }
	                return original.call(this, eventName, wrap(fn, {
	                    mechanism: {
	                        data: {
	                            function: 'addEventListener',
	                            handler: getFunctionName(fn),
	                            target: target,
	                        },
	                        handled: true,
	                        type: 'instrument',
	                    },
	                }), options);
	            };
	        });
	        fill(proto, 'removeEventListener', function (original) {
	            return function (eventName, fn, options) {
	                var callback = fn;
	                try {
	                    callback = callback && (callback.__sentry_wrapped__ || callback);
	                }
	                catch (e) {
	                    // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
	                }
	                return original.call(this, eventName, callback, options);
	            };
	        });
	    };
	    /**
	     * Wrap timer functions and event targets to catch errors
	     * and provide better metadata.
	     */
	    TryCatch.prototype.setupOnce = function () {
	        this._ignoreOnError = this._ignoreOnError;
	        var global = getGlobalObject();
	        fill(global, 'setTimeout', this._wrapTimeFunction.bind(this));
	        fill(global, 'setInterval', this._wrapTimeFunction.bind(this));
	        fill(global, 'requestAnimationFrame', this._wrapRAF.bind(this));
	        [
	            'EventTarget',
	            'Window',
	            'Node',
	            'ApplicationCache',
	            'AudioTrackList',
	            'ChannelMergerNode',
	            'CryptoOperation',
	            'EventSource',
	            'FileReader',
	            'HTMLUnknownElement',
	            'IDBDatabase',
	            'IDBRequest',
	            'IDBTransaction',
	            'KeyOperation',
	            'MediaController',
	            'MessagePort',
	            'ModalWindow',
	            'Notification',
	            'SVGElementInstance',
	            'Screen',
	            'TextTrack',
	            'TextTrackCue',
	            'TextTrackList',
	            'WebSocket',
	            'WebSocketWorker',
	            'Worker',
	            'XMLHttpRequest',
	            'XMLHttpRequestEventTarget',
	            'XMLHttpRequestUpload',
	        ].forEach(this._wrapEventTarget.bind(this));
	    };
	    /**
	     * @inheritDoc
	     */
	    TryCatch.id = 'TryCatch';
	    return TryCatch;
	}());
	/**
	 * Safely extract function name from itself
	 */
	function getFunctionName(fn) {
	    try {
	        return (fn && fn.name) || '<anonymous>';
	    }
	    catch (e) {
	        // Just accessing custom props in some Selenium environments
	        // can cause a "Permission denied" exception (see raven-js#495).
	        return '<anonymous>';
	    }
	}

	var global$3 = getGlobalObject();
	var lastHref;
	/** Default Breadcrumbs instrumentations */
	var Breadcrumbs = /** @class */ (function () {
	    /**
	     * @inheritDoc
	     */
	    function Breadcrumbs(options) {
	        /**
	         * @inheritDoc
	         */
	        this.name = Breadcrumbs.id;
	        this._options = __assign({ console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, options);
	    }
	    /** JSDoc */
	    Breadcrumbs.prototype._instrumentConsole = function () {
	        if (!('console' in global$3)) {
	            return;
	        }
	        ['debug', 'info', 'warn', 'error', 'log', 'assert'].forEach(function (level) {
	            if (!(level in global$3.console)) {
	                return;
	            }
	            fill(global$3.console, level, function (originalConsoleLevel) {
	                return function () {
	                    var args = [];
	                    for (var _i = 0; _i < arguments.length; _i++) {
	                        args[_i] = arguments[_i];
	                    }
	                    var breadcrumbData = {
	                        category: 'console',
	                        data: {
	                            extra: {
	                                arguments: normalize(args, 3),
	                            },
	                            logger: 'console',
	                        },
	                        level: Severity.fromString(level),
	                        message: safeJoin(args, ' '),
	                    };
	                    if (level === 'assert') {
	                        if (args[0] === false) {
	                            breadcrumbData.message = "Assertion failed: " + (safeJoin(args.slice(1), ' ') || 'console.assert');
	                            breadcrumbData.data.extra.arguments = normalize(args.slice(1), 3);
	                        }
	                    }
	                    Breadcrumbs.addBreadcrumb(breadcrumbData, {
	                        input: args,
	                        level: level,
	                    });
	                    // this fails for some browsers. :(
	                    if (originalConsoleLevel) {
	                        Function.prototype.apply.call(originalConsoleLevel, global$3.console, args);
	                    }
	                };
	            });
	        });
	    };
	    /** JSDoc */
	    Breadcrumbs.prototype._instrumentDOM = function () {
	        if (!('document' in global$3)) {
	            return;
	        }
	        // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
	        // to the document. Do this before we instrument addEventListener.
	        global$3.document.addEventListener('click', breadcrumbEventHandler('click'), false);
	        global$3.document.addEventListener('keypress', keypressEventHandler(), false);
	        // After hooking into document bubbled up click and keypresses events, we also hook into user handled click & keypresses.
	        ['EventTarget', 'Node'].forEach(function (target) {
	            var proto = global$3[target] && global$3[target].prototype;
	            if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
	                return;
	            }
	            fill(proto, 'addEventListener', function (original) {
	                return function (eventName, fn, options) {
	                    if (fn && fn.handleEvent) {
	                        if (eventName === 'click') {
	                            fill(fn, 'handleEvent', function (innerOriginal) {
	                                return function (event) {
	                                    breadcrumbEventHandler('click')(event);
	                                    return innerOriginal.call(this, event);
	                                };
	                            });
	                        }
	                        if (eventName === 'keypress') {
	                            fill(fn, 'handleEvent', function (innerOriginal) {
	                                return function (event) {
	                                    keypressEventHandler()(event);
	                                    return innerOriginal.call(this, event);
	                                };
	                            });
	                        }
	                    }
	                    else {
	                        if (eventName === 'click') {
	                            breadcrumbEventHandler('click', true)(this);
	                        }
	                        if (eventName === 'keypress') {
	                            keypressEventHandler()(this);
	                        }
	                    }
	                    return original.call(this, eventName, fn, options);
	                };
	            });
	            fill(proto, 'removeEventListener', function (original) {
	                return function (eventName, fn, options) {
	                    var callback = fn;
	                    try {
	                        callback = callback && (callback.__sentry_wrapped__ || callback);
	                    }
	                    catch (e) {
	                        // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
	                    }
	                    return original.call(this, eventName, callback, options);
	                };
	            });
	        });
	    };
	    /** JSDoc */
	    Breadcrumbs.prototype._instrumentFetch = function () {
	        if (!supportsNativeFetch()) {
	            return;
	        }
	        fill(global$3, 'fetch', function (originalFetch) {
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                var fetchInput = args[0];
	                var method = 'GET';
	                var url;
	                if (typeof fetchInput === 'string') {
	                    url = fetchInput;
	                }
	                else if ('Request' in global$3 && fetchInput instanceof Request) {
	                    url = fetchInput.url;
	                    if (fetchInput.method) {
	                        method = fetchInput.method;
	                    }
	                }
	                else {
	                    url = String(fetchInput);
	                }
	                if (args[1] && args[1].method) {
	                    method = args[1].method;
	                }
	                var client = getCurrentHub().getClient();
	                var dsn = client && client.getDsn();
	                if (dsn) {
	                    var filterUrl = new API(dsn).getStoreEndpoint();
	                    // if Sentry key appears in URL, don't capture it as a request
	                    // but rather as our own 'sentry' type breadcrumb
	                    if (filterUrl && url.includes(filterUrl)) {
	                        if (method === 'POST' && args[1] && args[1].body) {
	                            addSentryBreadcrumb(args[1].body);
	                        }
	                        return originalFetch.apply(global$3, args);
	                    }
	                }
	                var fetchData = {
	                    method: isString(method) ? method.toUpperCase() : method,
	                    url: url,
	                };
	                return originalFetch
	                    .apply(global$3, args)
	                    .then(function (response) {
	                    fetchData.status_code = response.status;
	                    Breadcrumbs.addBreadcrumb({
	                        category: 'fetch',
	                        data: fetchData,
	                        type: 'http',
	                    }, {
	                        input: args,
	                        response: response,
	                    });
	                    return response;
	                })
	                    .catch(function (error) {
	                    Breadcrumbs.addBreadcrumb({
	                        category: 'fetch',
	                        data: fetchData,
	                        level: Severity.Error,
	                        type: 'http',
	                    }, {
	                        error: error,
	                        input: args,
	                    });
	                    throw error;
	                });
	            };
	        });
	    };
	    /** JSDoc */
	    Breadcrumbs.prototype._instrumentHistory = function () {
	        var _this = this;
	        if (!supportsHistory()) {
	            return;
	        }
	        var captureUrlChange = function (from, to) {
	            var parsedLoc = parseUrl(global$3.location.href);
	            var parsedTo = parseUrl(to);
	            var parsedFrom = parseUrl(from);
	            // Initial pushState doesn't provide `from` information
	            if (!parsedFrom.path) {
	                parsedFrom = parsedLoc;
	            }
	            // because onpopstate only tells you the "new" (to) value of location.href, and
	            // not the previous (from) value, we need to track the value of the current URL
	            // state ourselves
	            lastHref = to;
	            // Use only the path component of the URL if the URL matches the current
	            // document (almost all the time when using pushState)
	            if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
	                // tslint:disable-next-line:no-parameter-reassignment
	                to = parsedTo.relative;
	            }
	            if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
	                // tslint:disable-next-line:no-parameter-reassignment
	                from = parsedFrom.relative;
	            }
	            Breadcrumbs.addBreadcrumb({
	                category: 'navigation',
	                data: {
	                    from: from,
	                    to: to,
	                },
	            });
	        };
	        // record navigation (URL) changes
	        var oldOnPopState = global$3.onpopstate;
	        global$3.onpopstate = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var currentHref = global$3.location.href;
	            captureUrlChange(lastHref, currentHref);
	            if (oldOnPopState) {
	                return oldOnPopState.apply(_this, args);
	            }
	        };
	        /**
	         * @hidden
	         */
	        function historyReplacementFunction(originalHistoryFunction) {
	            // note history.pushState.length is 0; intentionally not declaring
	            // params to preserve 0 arity
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                var url = args.length > 2 ? args[2] : undefined;
	                // url argument is optional
	                if (url) {
	                    // coerce to string (this is what pushState does)
	                    captureUrlChange(lastHref, String(url));
	                }
	                return originalHistoryFunction.apply(this, args);
	            };
	        }
	        fill(global$3.history, 'pushState', historyReplacementFunction);
	        fill(global$3.history, 'replaceState', historyReplacementFunction);
	    };
	    /** JSDoc */
	    Breadcrumbs.prototype._instrumentXHR = function () {
	        if (!('XMLHttpRequest' in global$3)) {
	            return;
	        }
	        /**
	         * @hidden
	         */
	        function wrapProp(prop, xhr) {
	            // TODO: Fix XHR types
	            if (prop in xhr && typeof xhr[prop] === 'function') {
	                fill(xhr, prop, function (original) {
	                    return wrap(original, {
	                        mechanism: {
	                            data: {
	                                function: prop,
	                                handler: (original && original.name) || '<anonymous>',
	                            },
	                            handled: true,
	                            type: 'instrument',
	                        },
	                    });
	                });
	            }
	        }
	        var xhrproto = XMLHttpRequest.prototype;
	        fill(xhrproto, 'open', function (originalOpen) {
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                var url = args[1];
	                this.__sentry_xhr__ = {
	                    method: isString(args[0]) ? args[0].toUpperCase() : args[0],
	                    url: args[1],
	                };
	                var client = getCurrentHub().getClient();
	                var dsn = client && client.getDsn();
	                if (dsn) {
	                    var filterUrl = new API(dsn).getStoreEndpoint();
	                    // if Sentry key appears in URL, don't capture it as a request
	                    // but rather as our own 'sentry' type breadcrumb
	                    if (isString(url) && (filterUrl && url.includes(filterUrl))) {
	                        this.__sentry_own_request__ = true;
	                    }
	                }
	                return originalOpen.apply(this, args);
	            };
	        });
	        fill(xhrproto, 'send', function (originalSend) {
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                var xhr = this; // tslint:disable-line:no-this-assignment
	                if (xhr.__sentry_own_request__) {
	                    addSentryBreadcrumb(args[0]);
	                }
	                /**
	                 * @hidden
	                 */
	                function onreadystatechangeHandler() {
	                    if (xhr.readyState === 4) {
	                        if (xhr.__sentry_own_request__) {
	                            return;
	                        }
	                        try {
	                            // touching statusCode in some platforms throws
	                            // an exception
	                            if (xhr.__sentry_xhr__) {
	                                xhr.__sentry_xhr__.status_code = xhr.status;
	                            }
	                        }
	                        catch (e) {
	                            /* do nothing */
	                        }
	                        Breadcrumbs.addBreadcrumb({
	                            category: 'xhr',
	                            data: xhr.__sentry_xhr__,
	                            type: 'http',
	                        }, {
	                            xhr: xhr,
	                        });
	                    }
	                }
	                ['onload', 'onerror', 'onprogress'].forEach(function (prop) {
	                    wrapProp(prop, xhr);
	                });
	                if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
	                    fill(xhr, 'onreadystatechange', function (original) {
	                        return wrap(original, {
	                            mechanism: {
	                                data: {
	                                    function: 'onreadystatechange',
	                                    handler: (original && original.name) || '<anonymous>',
	                                },
	                                handled: true,
	                                type: 'instrument',
	                            },
	                        }, onreadystatechangeHandler);
	                    });
	                }
	                else {
	                    // if onreadystatechange wasn't actually set by the page on this xhr, we
	                    // are free to set our own and capture the breadcrumb
	                    xhr.onreadystatechange = onreadystatechangeHandler;
	                }
	                return originalSend.apply(this, args);
	            };
	        });
	    };
	    /**
	     * Helper that checks if integration is enabled on the client.
	     * @param breadcrumb Breadcrumb
	     * @param hint BreadcrumbHint
	     */
	    Breadcrumbs.addBreadcrumb = function (breadcrumb, hint) {
	        if (getCurrentHub().getIntegration(Breadcrumbs)) {
	            getCurrentHub().addBreadcrumb(breadcrumb, hint);
	        }
	    };
	    /**
	     * Instrument browser built-ins w/ breadcrumb capturing
	     *  - Console API
	     *  - DOM API (click/typing)
	     *  - XMLHttpRequest API
	     *  - Fetch API
	     *  - History API
	     */
	    Breadcrumbs.prototype.setupOnce = function () {
	        if (this._options.console) {
	            this._instrumentConsole();
	        }
	        if (this._options.dom) {
	            this._instrumentDOM();
	        }
	        if (this._options.xhr) {
	            this._instrumentXHR();
	        }
	        if (this._options.fetch) {
	            this._instrumentFetch();
	        }
	        if (this._options.history) {
	            this._instrumentHistory();
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    Breadcrumbs.id = 'Breadcrumbs';
	    return Breadcrumbs;
	}());
	/** JSDoc */
	function addSentryBreadcrumb(serializedData) {
	    // There's always something that can go wrong with deserialization...
	    try {
	        var event_1 = JSON.parse(serializedData);
	        Breadcrumbs.addBreadcrumb({
	            category: 'sentry',
	            event_id: event_1.event_id,
	            level: event_1.level || Severity.fromString('error'),
	            message: getEventDescription(event_1),
	        }, {
	            event: event_1,
	        });
	    }
	    catch (_oO) {
	        logger$1.error('Error while adding sentry type breadcrumb');
	    }
	}

	var DEFAULT_KEY = 'cause';
	var DEFAULT_LIMIT = 5;
	/** Adds SDK info to an event. */
	var LinkedErrors = /** @class */ (function () {
	    /**
	     * @inheritDoc
	     */
	    function LinkedErrors(options) {
	        if (options === void 0) { options = {}; }
	        /**
	         * @inheritDoc
	         */
	        this.name = LinkedErrors.id;
	        this._key = options.key || DEFAULT_KEY;
	        this._limit = options.limit || DEFAULT_LIMIT;
	    }
	    /**
	     * @inheritDoc
	     */
	    LinkedErrors.prototype.setupOnce = function () {
	        addGlobalEventProcessor(function (event, hint) {
	            var self = getCurrentHub().getIntegration(LinkedErrors);
	            if (self) {
	                return self._handler(event, hint);
	            }
	            return event;
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    LinkedErrors.prototype._handler = function (event, hint) {
	        if (!event.exception || !event.exception.values || !hint || !(hint.originalException instanceof Error)) {
	            return event;
	        }
	        var linkedErrors = this._walkErrorTree(hint.originalException, this._key);
	        event.exception.values = __spread(linkedErrors, event.exception.values);
	        return event;
	    };
	    /**
	     * @inheritDoc
	     */
	    LinkedErrors.prototype._walkErrorTree = function (error, key, stack) {
	        if (stack === void 0) { stack = []; }
	        if (!(error[key] instanceof Error) || stack.length + 1 >= this._limit) {
	            return stack;
	        }
	        var stacktrace = _computeStackTrace(error[key]);
	        var exception = exceptionFromStacktrace(stacktrace);
	        return this._walkErrorTree(error[key], key, __spread([exception], stack));
	    };
	    /**
	     * @inheritDoc
	     */
	    LinkedErrors.id = 'LinkedErrors';
	    return LinkedErrors;
	}());

	var global$4 = getGlobalObject();
	/** UserAgent */
	var UserAgent = /** @class */ (function () {
	    function UserAgent() {
	        /**
	         * @inheritDoc
	         */
	        this.name = UserAgent.id;
	    }
	    /**
	     * @inheritDoc
	     */
	    UserAgent.prototype.setupOnce = function () {
	        addGlobalEventProcessor(function (event) {
	            if (getCurrentHub().getIntegration(UserAgent)) {
	                if (!global$4.navigator || !global$4.location) {
	                    return event;
	                }
	                // HTTP Interface: https://docs.sentry.io/clientdev/interfaces/http/?platform=javascript
	                var request = event.request || {};
	                request.url = request.url || global$4.location.href;
	                request.headers = request.headers || {};
	                request.headers['User-Agent'] = global$4.navigator.userAgent;
	                return __assign({}, event, { request: request });
	            }
	            return event;
	        });
	    };
	    /**
	     * @inheritDoc
	     */
	    UserAgent.id = 'UserAgent';
	    return UserAgent;
	}());



	var BrowserIntegrations = /*#__PURE__*/Object.freeze({
		GlobalHandlers: GlobalHandlers,
		TryCatch: TryCatch,
		Breadcrumbs: Breadcrumbs,
		LinkedErrors: LinkedErrors,
		UserAgent: UserAgent
	});

	var defaultIntegrations = [
	    new InboundFilters(),
	    new FunctionToString(),
	    new TryCatch(),
	    new Breadcrumbs(),
	    new GlobalHandlers(),
	    new LinkedErrors(),
	    new UserAgent(),
	];
	/**
	 * The Sentry Browser SDK Client.
	 *
	 * To use this SDK, call the {@link init} function as early as possible when
	 * loading the web page. To set context information or send manual events, use
	 * the provided methods.
	 *
	 * @example
	 *
	 * ```
	 *
	 * import { init } from '@sentry/browser';
	 *
	 * init({
	 *   dsn: '__DSN__',
	 *   // ...
	 * });
	 * ```
	 *
	 * @example
	 * ```
	 *
	 * import { configureScope } from '@sentry/browser';
	 * configureScope((scope: Scope) => {
	 *   scope.setExtra({ battery: 0.7 });
	 *   scope.setTag({ user_mode: 'admin' });
	 *   scope.setUser({ id: '4711' });
	 * });
	 * ```
	 *
	 * @example
	 * ```
	 *
	 * import { addBreadcrumb } from '@sentry/browser';
	 * addBreadcrumb({
	 *   message: 'My Breadcrumb',
	 *   // ...
	 * });
	 * ```
	 *
	 * @example
	 *
	 * ```
	 *
	 * import * as Sentry from '@sentry/browser';
	 * Sentry.captureMessage('Hello, world!');
	 * Sentry.captureException(new Error('Good bye'));
	 * Sentry.captureEvent({
	 *   message: 'Manual',
	 *   stacktrace: [
	 *     // ...
	 *   ],
	 * });
	 * ```
	 *
	 * @see {@link BrowserOptions} for documentation on configuration options.
	 */
	function init(options) {
	    if (options === void 0) { options = {}; }
	    if (options.defaultIntegrations === undefined) {
	        options.defaultIntegrations = defaultIntegrations;
	    }
	    if (options.release === undefined) {
	        var window_1 = getGlobalObject();
	        // This supports the variable that sentry-webpack-plugin injects
	        if (window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id) {
	            options.release = window_1.SENTRY_RELEASE.id;
	        }
	    }
	    initAndBind(BrowserClient, options);
	}

	var windowIntegrations = {};
	// This block is needed to add compatibility with the integrations packages when used with a CDN
	// tslint:disable: no-unsafe-any
	var _window = getGlobalObject();
	if (_window.Sentry && _window.Sentry.Integrations) {
	    windowIntegrations = _window.Sentry.Integrations;
	}
	// tslint:enable: no-unsafe-any
	var INTEGRATIONS = __assign({}, windowIntegrations, CoreIntegrations, BrowserIntegrations);

	// import "webrtc-adapter";


	/**
	 * Most important class for using RemoteMonster API. It can be use to P2P communication and broadcast. You can receive callback events from listener.
	 * One Remon object processes only one stream. If you want to handle multiple communication channels or broadcast channels, you must create and use multiple Remon objects.
	 */
	class Remon {
	  /**
	   * create Remon object with config object and listener object.
	   * example: var v = new Remon({config: rtcConfig, listener: rtcListener});
	   */
	  constructor({ config, listener }) {
	    this.version = "2.5.13";

	    this.context = new Context1();
	    this.context.startTime = new Date();
	    this.context.sentry =
	    config.sentry && (config.sentry.dsn || config.sentry.hasOwnProperty('logSending'))
	      ? {...configure.sentry,...config.sentry}
	      : configure.sentry;

	    this.context.sdkVersion = this.version;
	    this.config = cjs(configure, config);
	    this.context.logServer =
	      config.logServer && (config.logServer.url || config.logServer.hasOwnProperty('logSending'))
	        ? {...configure.logServer,...config.logServer}
	        : configure.logServer;
	    this.context.eventManager = EventManager();
	    if (listener) {
	      Object.keys(listener).forEach(type => {
	        const listenerItem = listener[type];
	        this.context.eventManager.addEventListener({ type, listenerItem });
	      });
	    }
	    
	    
	    this.config.view.localStream= config.view.localStream || undefined;
	      
	    this.context.config = this.config;
	    this.context.sdpSemantics =
	      this.config.rtc && this.config.rtc.sdpSemantics
	        ? this.config.rtc.sdpSemantics
	        : configure.rtc.sdpSemantics;
	    this.context.simulcast =
	      this.config.rtc && this.config.rtc.simulcast
	        ? this.config.rtc.simulcast
	        : configure.rtc.simulcast;
	    this.context.logLevel =
	      this.config.dev && this.config.dev.logLevel
	        ? this.config.dev.logLevel
	        : "INFO";

	    // util.validateConfig(this.context, this.config);
	    util.MediaDeviceCheck(this.context, this.config);
	    this.media = new Media(this.context);
	    this.context.mediaManager = this.media;
	    this.uri = configure.appServer.url;
	    this.key = this.config.credential.key;
	    this.serviceId = this.config.credential.serviceId;
	    this.context.key = this.key;
	    this.context.serviceId = this.serviceId;
	    this.context.state = "INIT";

	    logger.init(this.context);

	    
	    if(this.config.rtc.selectiveCandidate && this.config.rtc.selectiveCandidate.serverUrls){
	      this.config.rtc.iceServers = cjs([],this.config.rtc.selectiveCandidate.serverUrls);
	    }

	    if (!this.config.media)
	      this.config.media = { audio: true, video: true, record: false };
	    if (this.config.media.record) {
	      this.context.useRecord = this.config.media.record;
	      if (this.config.media.recordUrl)
	        this.context.recordUrl = this.config.media.recordUrl;
	      else
	        this.context.recordUrl = "https://demo.remotemonster.com/rest/record";
	    }

	    if (this.config.media.video.codec)
	      this.context.videoCodec = this.config.media.video.codec;
	    if (this.config.media.audio.codec)
	      this.context.audioCodec = this.config.media.audio.codec;
	    if (this.config.media.video === false) this.context.useVideo = false;
	    if (this.config.media.audio === false) this.context.useAudio = false;
	    if (this.config.media.video.maxBandwidth)
	      this.context.videoBandwidth = this.config.media.video.maxBandwidth;
	    if (this.config.media.audio.maxBandwidth)
	      this.context.audioBandwidth = this.config.media.audio.maxBandwidth;
	    if (this.config.credential.resturl) {
	      this.config.credential.resturl = this.config.credential.resturl.replace(
	        "/init",
	        ""
	      );
	      configure.appServer.url = this.config.credential.resturl;
	      this.uri = configure.appServer.url;
	    }
	    if (this.config.credential.wsurl)
	      // Config.signalingServer.url = this.config.credential.wsurl;
	      this.config.signalingServer.url = this.config.credential.wsurl;
	    if(this.context.sentry && this.context.sentry.logSending){
	      try {
	        init({dsn : this.context.sentry.dsn});
	      } catch (e) {
	        logger.e("Sentry setting failed:", e.message);
	        logger.errorEvt(this.context, "1004", "Sentry setting failed:" + e.message);
	        console.log('error occured! during setting sentry! error message : ', e.message);
	      }
	    }
	    //this.init();
	  }

	  async init() {
	    logger.d("init is called");
	    const that = this;
	    const ctx = this.context;
	    const cfg = this.config;
	    this.context.env= {
	      os: platform.os.family,
	        osVersion: platform.os.version || "0",
	        device: platform.name,
	        deviceVersion: platform.version || "0",
	        networkType: Navigator.connection,
	        sdkVersion: that.version
	    };
	    let messageBody = {
	      credential: { key: that.key, serviceId: that.serviceId },
	      env: this.context.env
	    };
	    if (that.config.sdk && that.config.sdk.country)
	      messageBody.env.country = that.config.sdk.country;
	    if (that.config.credential.token)
	      messageBody.credential.token = that.config.credential.token;
	    if (that.config.media.roomid) messageBody.id = that.config.media.roomid;
	    var message = {
	      method: "POST",
	      headers: {
	        Accept: "application/json, text/plain, */*",
	        "Content-Type": "application/json"
	      },
	      body: JSON.stringify(messageBody)
	    };
	    try {
	      var response = await fetch(this.uri + "/init", message);
	      var responseJson = await response.json();
	      switch (response.status) {
	        case 401:
	            if (this.context.eventManager.hasEventListener("onError")) {
	              this.context.eventManager.dispatchEvent("onError", "4204", responseJson.Error);
	            }
	          return false;
	      }
	    } catch (e) {
	      if (ctx.eventManager.hasEventListener("onError")) {
	        ctx.eventManager.dispatchEvent("onError", "WebSocketFailedError", e);
	        ctx.eventManager.dispatchEvent("onError", "4201","initFailedError", e);
	      }
	      logger.e("Init: failed:", e);
	      logger.errorEvt(ctx, "1004", "auth init failed:" + e);
	      return false;
	    }
	    logger.d("-> Message:", responseJson);
	    Object.keys(responseJson).forEach(responseJsonKey => {
	      switch (responseJsonKey) {
	        case "iceServers": {
	          if(!that.config.rtc.selectiveCandidate || 
	             (that.config.rtc.selectiveCandidate && (that.config.rtc.selectiveCandidate.mode === 'default' || !that.config.rtc.selectiveCandidate.serverUrls ))
	            )
	          {
	            responseJson[responseJsonKey].forEach(x =>
	              that.config.rtc.iceServers.push(x)
	            );
	          }
	          break;
	        }
	        case "token": {
	          ctx.token = responseJson[responseJsonKey];
	          break;
	        }
	        case "key": {
	          ctx.channel.id = responseJson[responseJsonKey];
	          break;
	        }
	        case "name": {
	          ctx.channel.name = responseJson[responseJsonKey];
	          break;
	        }
	        case "sigurl": {
	          if (!that.config.credential.wsurl)
	            that.config.signalingServer.url = responseJson[responseJsonKey];
	          break;
	        }
	        default:
	      }
	    });
	    var eventMsg = {
	      topic: "log",
	      messages: {
	        log: "Peer Id is created : " + ctx.token,
	        logLevel: "info",
	        os: platform.os.family,
	        osVersion: platform.os.version || "0",
	        device: platform.name,
	        deviceVersion: platform.version || "0",
	        networkType: Navigator.connection,
	        sdkVersion: this.version,
	        svcId: ctx.serviceId,
	        pId: ctx.token,
	        config: JSON.stringify(ctx.config),
	        status: "INIT"
	      }
	    };
	    logger.evt(JSON.stringify(eventMsg));
	    //Signal-server connection
	    ctx.signalingConnection = new SignalingConnection({
	      url: this.config.signalingServer.url,
	      context: ctx
	    });
	    ctx.signalingConnection.connect();
	    ctx.signalingConnection.on("reconnect", () => {
	      this.onReconnectSignalConnection();
	    });
	    ctx.signalingConnection.on("disconnect", () => {
	      this.onDisconnectSignalConnection();
	      logger.errorEvt(ctx, "1004", "socket timeout");
	    });
	    window.addEventListener(
	      "offline",
	      () => {
	        logger.i("Browser: offline");
	        // if (this.context.eventManager.hasEventListener("onError")) {
	        //   this.context.eventManager.dispatchEvent("onError", "disconnected");
	        // }
	        // this.close("UNKNOWN");
	        this.context.signalingConnection.onOffline();
	      },
	      false
	    );

	    if (cfg.rtc.audioType === "music") {
	      cfg.opt = {
	        mandatory: {
	          googHighpassFilter: false,
	          googEchoCancellation: false,
	          googEchoCancellation2: false,
	          googAutoGainControl: false,
	          googAutoGainControl2: false,
	          googNoiseSuppression: false,
	          googNoiseSuppression2: false,
	          googTypingNoiseDetection: false,
	          echoCancellation: false
	        },
	        optional: [{ googCpuOveruseDetection: false }]
	      };
	    } else {
	      cfg.opt = {
	        optional: [{ googCpuOveruseDetection: false }]
	      };
	    }
	    // ctx.peerConnection = new RTCPeerConnection(Config.rtc, cfg.opt);
	    const c = { ...configure.rtc, ...cfg.rtc };
	    // create RTCPeerConnection Object
	    ctx.peerConnection = new RTCPeerConnection(c, cfg.opt);
	    ctx.hasAddTrack = ctx.peerConnection.addTrack !== undefined;
	    bindSignalingConnectionEvents({
	      context: ctx,
	      media: that.media,
	      config: cfg
	    });
	    bindPeerConnectionEvents({ context: ctx, media: that.media, config: cfg });
	    logger.i("config", c);
	    if (cfg.view && typeof cfg.view.local !== "undefined")
	      ctx.config.rtc.localVideo = document.querySelector(`${cfg.view.local}`);
	    if (cfg.view && typeof cfg.view.remote !== "undefined") {
	      ctx.remoteVideo = document.querySelector(`${cfg.view.remote}`);
	    }
	    if (cfg.media.recvonly) {
	      ctx.remoteVideo = document.querySelector(`${cfg.view.remote}`);
	    }

	    const MAX_RETRIES = 11;
	    for (let i = 5; i <= MAX_RETRIES; i++) {
	      // ctx.signalingConnection connection state와 localmedia 들어왔는지, ctx.peerConnection이 제대로 생성되었는지 체크 후 return
	      if (
	        ctx.signalingConnection.isOpened()
	        // ctx.mediaManager.isLocalPrepared()
	      ) {
	        break;
	      } else {
	        const timeout = Math.pow(2, i);
	        logger.v("wating for init %i", i);
	        await this.wait(timeout);
	      }
	    }
	    // if (ctx.eventManager.hasEventListener("onError")) {
	    //   ctx.eventManager.dispatchEvent("onError", "Error is successfully dispatched");
	    // }
	    try {
	      ctx.devices = await navigator.mediaDevices.enumerateDevices();
	      ctx.currentVideoDeviceId = 0; //ctx.devices[0].deviceId;
	    } catch (e) {
	      console.log(e);
	      logger.errorEvt(ctx, "1007", "failed to get media devices: " + e);
	    }
	    return true;
	  }

	  /**
	   * Create P2P channel, if there is no P2P channel with the id. Join the P2P channel, if there is P2P channel with the id.
	   * example: remon.connectCall("roomname1");
	   */
	  async connectCall(args) {
	    logger.d("connect is called");
	    await this.connectChannel(args);
	  }

	  /**
	   * Create P2P channel, if there is no P2P channel with the id. Join the P2P channel, if there is P2P channel with the id.
	   * example: remon.connectChannel("roomname1");
	   */
	  async connectChannel(args) {
	    logger.d("createChannel is called");
	    this.config.rtc.audioType = "voice";
	    this.context.channel.type= 'P2P';
	    this.context.channel.id = args;
	    // check key, serviceId before init
	    if(!this.config.credential.key || !this.config.credential.serviceId){
	      if (this.context.eventManager.hasEventListener("onError")) {
	        this.context.eventManager.dispatchEvent("onError", "4101", "undefinedServiceId Or undefinedServiceKey");
	      }
	      if (this.context.eventManager.hasEventListener("onClose")) {
	        this.context.eventManager.dispatchEvent("onClose", {
	          message: "undefinedServiceId Or undefinedServiceKey",
	          closeType: "UNKNOWN"
	        });
	      }
	      return;
	    }
	    if(await this.init()){
	      logger.qualityLog({type:"quality.start", config: this.context.config});
	      this.context.signalingConnection.connectChannel(args);
	      return;
	    }else{
	      return;
	    }
	  }

	  /**
	   * Create a broadcast room with a room id
	   * @param (string) roomname id of broadcast room. If this parameter is missing, an arbitrary room id is sent via the onCreateChannel event.
	   */
	  async createCast(roomname) {
	    logger.d("createCast is called");
	    this.context.channel.type= 'BROADCAST';
	    if (!this.config.rtc.audioType) this.config.rtc.audioType = "music";
	    this.context.channel.id = roomname;
	    await this.init();
	    logger.qualityLog({type:"quality.start", config: this.context.config});
	    this.context.signalingConnection.createBroadcastChannel(roomname);
	  }


	  /**
	   * Create a conference call room with a room id
	   * @param {} roomid
	   */
	  async createRoom(roomId) {
	    logger.d(`Remon.js:createRoom(${roomId})`);
	    this.context.channel.type= 'ROOM';
	    await this.init();
	    logger.qualityLog({type:"quality.start", config: this.context.config});
	    this.context.signalingConnection.createConferenceRoom(roomId);
	  }
	  /**
	   * Join a room by room id.
	   * @param (string) room id
	   */
	  async joinCast(roomid) {
	    logger.d("joinCast is called");
	    this.config.rtc.audioType = "music";
	    this.context.channel.type = "VIEWER";
	    this.context.channel.id = roomid;
	    this.config.media.recvonly = true;
	    await this.init();
	    logger.qualityLog({type:"quality.start", config: this.context.config});
	    // 2019.08.31 현재 버전의 safari에서 recvonly mode에서 getusermedia 실행해야만 candidate생성하는 policy가 있어서 적용.
	    if (platform.name === "Safari" || platform.name === "safari") {
	      await navigator.mediaDevices.getUserMedia({audio: true});
	    }
	    this.context.signalingConnection.createViewerChannel(roomid);
	  }

	  /**
	   * retrieve current stream health information
	   */
	  getHealth() {
	    return this.context.health.result;
	  }
	  /**
	   * retrieve current remon state information
	   */
	  getState() {
	    return this.context.state;
	  }
	  /**
	   * retrieve current sdk version
	   */
	  getVersion() {
	    return this.version;
	  }
	  /**
	   * get channel id
	   */
	  getChannelId() {
	    return this.context.channel.id;
	  }
	  /**
	   * mute local video
	   * @param (bool)
	   */
	  pauseLocalVideo(bool) {
	    logger.d("pauseLocalVideo is called");
	    this.media
	      .mediaStreamTrackSwitch(this.context.config.rtc.localStream)
	      .type("Video")
	      .enabled(!!bool);
	  }
	  /**
	   * mute remote video
	   * @param (bool) bool
	   */
	  pauseRemoteVideo(bool) {
	    logger.d("pauseRemoteVideo is called");
	    this.media
	      .mediaStreamTrackSwitch(this.context.remoteStream)
	      .type("Video")
	      .enabled(!!bool);
	  }

	  /**
	   * switch camera with deviceId
	   */
	  switchCamera(cameraId) {
	    logger.d("cameraSwitch is called");
	    let cameraList = [];
	    this.context.devices.map(x => {
	      if (x.kind === "videoinput") cameraList.push(x);
	    });
	    if (this.context.currentVideoDeviceId + 1 === cameraList.length) {
	      this.context.currentVideoDeviceId = 0;
	    } else this.context.currentVideoDeviceId++;
	    this.media.setUserDevices(
	      null,
	      cameraList[this.context.currentVideoDeviceId].deviceId
	    );
	    // this.media.setUserDevices(null, this.context.devices[1].deviceId);
	    // this.media.setUserDevices(this.context, 'default', cameraId);
	  }
	  /**
	   * change Video input
	   * @param cameraId string
	   */
	  setVideoDevice(cameraId) {
	    this.media.setUserDevices(null, cameraId);
	  }
	  /**
	   * change audio input
	   * @param {string} micId
	   */
	  setAudioDevice(micId) {
	    this.media.setUserDevices(micId, null);
	  }

	  /**
	   * mute local audio and mic stream
	   * @param {bool} bool
	   */
	  muteLocalAudio(bool) {
	    this.context.audioTransceiver.sender.track.enabled = !bool;
	    // this.media
	    //   .mediaStreamTrackSwitch(Config.rtc.localStream)
	    //   .type("Audio")
	    //   .enabled(!!bool);
	  }
	  /**
	   * Capture the screen and use it as the source of local media
	   */
	  async captureScreen(width = 640, height = 480, frameRate = 30, audio = true) {
	    this.media.captureScreen(width, height, frameRate, audio);
	  }

	  /**
	   * Stop the captureScreen
	   */
	  stopCaptureScreen() {
	    this.media.stopCaptureScreen();
	  }

	  /**
	   * mute remote audio stream
	   * @param {*} bool
	   */
	  muteRemoteAudio(bool) {
	    this.media
	      .mediaStreamTrackSwitch(this.context.remoteStream)
	      .type("Audio")
	      .enabled(!!bool);
	  }
	  /**
	   * Returns a list of currently waiting calls.
	   * @param {*} id
	   */
	  async fetchCalls(id) {
	    return await this.search(id);
	  }

	  /**
	   * Returns a list of currently being broadcast .
	   */
	  async fetchCasts() {
	    return await this.liveRooms();
	  }

	  async fetchRooms(id) {
	    const roomList = await this.searchRoom(id);
	    return roomList.filter( x=> x.id.indexOf(this.context.token) < 0)
	  }

	  /**
	   * Set video quality between HIGH, MEDIUM, LOW
	   * @param {*} quality
	   */
	  setVideoQuality(quality) {
	    this.context.signalingConnection.setSimulcastPriority(quality);
	  }

	  /**
	   * Reduce current video quality as 1 step
	   */
	  reduceVideoQuality() {
	    let q = this.context.currentSimulcast;
	    if (q === "HIGH") q = "MIDIUM";
	    else if (q === "MIDIUM") q = "LOW";
	    else return;
	    this.setVideoQuality(q);
	  }

	  search(id) {
	    logger.d("search call by" + id);
	    const message = {
	      method: "GET",
	      headers: {
	        "Content-Type": "application/json"
	      }
	    };
	    return new Promise((resolve, reject) => {
	      fetch(
	        this.uri + "/call/" + this.config.credential.serviceId,
	        message
	      ).then(response => {
	        response
	          .json()
	          .then(responseJson => {
	            if (this.context.eventManager.hasEventListener("onSearch")) {
	              this.context.eventManager.dispatchEvent("onSearch", responseJson);
	            }
	            resolve(responseJson);
	          })
	          .catch(err => {
	            reject(err);
	            logger.errorEvt(this.context, "1008", "search is  failed:" + err);
	          });
	      });
	    });
	  }
	  searchRoom(id) {
	    logger.d(`Room.js:searchRoom(${id})`);
	    const msg = { method: "GET", headers: {"Content-Type": "application/json"}};
	    return new Promise((resolve, reject) => {
	      fetch(
	        this.uri + "/rooms/" + this.config.credential.serviceId + "/"+ id,
	        msg
	      ).then(response => {
	        response.json().then(resp => {
	          resolve(resp);
	        }).catch(err => {
	          reject(err);
	        });
	      });
	    })
	  }

	  liveRooms() {
	    const message = {
	      method: "GET",
	      headers: {
	        "Content-Type": "application/json"
	      }
	    };
	    return new Promise((resolve, reject) => {
	      fetch(
	        this.uri + "/room/" + this.config.credential.serviceId,
	        message
	      ).then(response => {
	        response
	          .json()
	          .then(responseJson => {
	            resolve(responseJson);
	          })
	          .catch(err => {
	            reject(err);
	            logger.errorEvt(this.context, "1008", "search is  failed:" + err);
	          });
	      });
	    });
	  }
	  /**
	   * It's only function for P2P communication. send message to peer
	   * @param (string) userMessage message to peer
	   */
	  sendMessage(userMessage) {
	    logger.g("Signaling: Send user message");
	    const message = this.context.signalingConnection.createMessage({
	      command: "message",
	      body: userMessage,
	      code: ""
	    });
	    logger.d("Message ->:", message);
	    this.context.signalingConnection.send(JSON.stringify(message));
	  }

	  onReconnectSignalConnection() {
	    logger.i("event: onReconnectSignalConnection");
	    this.context.signalingConnection.reconnectChannel();
	  }

	  onDisconnectSignalConnection() {
	    logger.i("event: onDisconnectSignalConnection");
	    if (this.context.eventManager.hasEventListener("onStateChange")) {
	      this.context.eventManager.dispatchEvent("onStateChange", "CLOSE");
	    }
	    this.close("UNKNOWN");
	  }

	  /**
	   * close all Remon's resources
	   */
	  async close(closeType) {
	    logger.i("Remon.close: "+ this.context.channel.id);


	    if (this.context.useRecord && this.context.remoteRecorder) {
	      this.context.remoteRecorder.stop();
	      this.context.remoteRecorder = null;
	    }
	    if (this.context.useRecord && this.context.localRecorder) {
	      this.context.localRecorder.stop();
	      this.context.localRecorder = null;
	      this.context.useRecord = false;
	    }
	    if (this.context.remoteVideo && this.context.remoteVideo.srcObject) {
	      this.context.remoteVideo.srcObject
	        .getTracks()
	        .forEach(track => track.stop());
	      this.context.remoteVideo.srcObject = null;
	    }

	    if (
	      this.context.config.rtc.localVideo &&
	      this.context.config.rtc.localVideo.srcObject
	    ) {
	      this.context.config.rtc.localVideo.srcObject
	        .getTracks()
	        .forEach(track => track.stop());
	      this.context.config.rtc.localVideo.srcObject = undefined;
	    }
	    if (this.context.health) this.context.health.stop();
	    if (!this.context.signalingConnection) return;
	    //this.context.localVideo.srcObject = null;
	    // FIXME: Chrome, adapter does not support addTrack.
	    if (!this.context.peerConnection) return;
	    
	    if (this.context.hasAddTrack) {
	      this.context.peerConnection.ontrack = null;
	    } else {
	      this.context.peerConnection.onaddstream = null;
	    }
	    this.context.peerConnection.onremovestream = null;
	    this.context.peerConnection.onicecandidate = null;
	    this.context.peerConnection.oniceconnectionstatechange = null;
	    this.context.peerConnection.onsignalingstatechange = null;
	    this.context.peerConnection.onicegatheringstatechange = null;
	    this.context.peerConnection.onnegotiationneeded = null;
	    if (!this.context.qualityChecker){
	      this.context.qualityChecker= new QualityChecker(this.context);
	      await this.context.qualityChecker.check();
	    }
	    if (this.context.peerConnection.signalingState !== "closed") {
	      this.context.peerConnection.close();
	    }
	    this.context.peerConnection = null;
	    this.context.signalingConnection.close();

	    if (closeType) {
	      this.context.eventManager.dispatchEvent("onClose", {
	        closeType
	      });
	    } else {
	      this.context.eventManager.dispatchEvent("onClose", {
	        closeType: "MINE"
	      });
	    }

	    var eventMsg = {
	      topic: "log",
	      messages: {
	        log: "remon is closed",
	        logLevel: "info",
	        sdkVersion: this.version,
	        svcId: this.context.serviceId,
	        pId: this.context.token,
	        chId: this.context.channel.id,
	        status: "CLOSE"
	      }
	    };
	    logger.evt(JSON.stringify(eventMsg));
	  }

	  wait(timeout) {
	    return new Promise(resolve => {
	      setTimeout(() => {
	        resolve();
	      }, timeout);
	    });
	  }
	}

	return Remon;

}));
//# sourceMappingURL=remon.js.map
