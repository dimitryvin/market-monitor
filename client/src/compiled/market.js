/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
var Handlebars = (function() {
// handlebars/safe-string.js
var __module3__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module2__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(Object.prototype.hasOwnProperty.call(value, key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module3__);

// handlebars/exception.js
var __module4__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module1__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.3.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Exception("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) { 
                data.key = key; 
                data.index = i;
                data.first = (i === 0);
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module2__, __module4__);

// handlebars/runtime.js
var __module5__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Exception("No environment passed to template");
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
      var result = env.VM.invokePartial.apply(this, arguments);
      if (result != null) { return result; }

      if (env.compile) {
        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: env.VM.programWithDepth,
      noop: env.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        env.VM.checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module2__, __module4__, __module1__);

// handlebars.runtime.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module3__, __module4__, __module2__, __module5__);

  return __module0__;
})();

/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});


RegExp.escape=function(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');};(function($){'use strict'
$.csv={defaults:{separator:',',delimiter:'"',headers:true},hooks:{castToScalar:function(value,state){var hasDot=/\./;if(isNaN(value)){return value;}else{if(hasDot.test(value)){return parseFloat(value);}else{var integer=parseInt(value);if(isNaN(integer)){return null;}else{return integer;}}}}},parsers:{parse:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var data=[];var entry=[];var state=0;var value=''
var exit=false;function endOfEntry(){state=0;value='';if(options.start&&options.state.rowNum<options.start){entry=[];options.state.rowNum++;options.state.colNum=1;return;}
if(options.onParseEntry===undefined){data.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){data.push(hookVal);}}
entry=[];if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;options.state.colNum=1;}
function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});if(entry.length!==0){endOfValue();endOfEntry();}
return data;},splitLines:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
var entries=[];var state=0;var entry='';var exit=false;function endOfLine(){state=0;if(options.start&&options.state.rowNum<options.start){entry='';options.state.rowNum++;return;}
if(options.onParseEntry===undefined){entries.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){entries.push(hookVal);}}
entry='';if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){entry+=m0;state=0;break;}
if(m0===delimiter){entry+=m0;state=1;break;}
if(m0==='\n'){endOfLine();break;}
if(/^\r$/.test(m0)){break;}
entry+=m0;state=3;break;case 1:if(m0===delimiter){entry+=m0;state=2;break;}
entry+=m0;state=1;break;case 2:var prevChar=entry.substr(entry.length-1);if(m0===delimiter&&prevChar===delimiter){entry+=m0;state=1;break;}
if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');case 3:if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal quote [Row:'+options.state.rowNum+']');}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');default:throw new Error('CSVDataError: Unknown state [Row:'+options.state.rowNum+']');}});if(entry!==''){endOfLine();}
return entries;},parseEntry:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var entry=[];var state=0;var value='';function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
if(!options.match){var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);options.match=RegExp(matchSrc,'gm');}
csv.replace(options.match,function(m0){switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'||m0==='\r'){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});endOfValue();return entry;}},toArray:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var state=(options.state!==undefined?options.state:{});var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,state:state}
var entry=$.csv.parsers.parseEntry(csv,options);if(!config.callback){return entry;}else{config.callback('',entry);}},toArrays:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1}};data=$.csv.parsers.parse(csv,options);if(!config.callback){return data;}else{config.callback('',data);}},toObjects:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.headers='headers'in options?options.headers:$.csv.defaults.headers;options.start='start'in options?options.start:1;if(config.headers){options.start++;}
if(options.end&&config.headers){options.end++;}
var lines=[];var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1},match:false};var headerOptions={delimiter:config.delimiter,separator:config.separator,start:1,end:1,state:{rowNum:1,colNum:1}}
var headerLine=$.csv.parsers.splitLines(csv,headerOptions);var headers=$.csv.toArray(headerLine[0],options);var lines=$.csv.parsers.splitLines(csv,options);options.state.colNum=1;if(headers){options.state.rowNum=2;}else{options.state.rowNum=1;}
for(var i=0,len=lines.length;i<len;i++){var entry=$.csv.toArray(lines[i],options);var object={};for(var j in headers){object[headers[j]]=entry[j];}
data.push(object);options.state.rowNum++;}
if(!config.callback){return data;}else{config.callback('',data);}},fromArrays:function(arrays,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.escaper='escaper'in options?options.escaper:$.csv.defaults.escaper;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in arrays){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}},fromObjects2CSV:function(objects,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in objects){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}}};$.csvEntry2Array=$.csv.toArray;$.csv2Array=$.csv.toArrays;$.csv2Dictionary=$.csv.toObjects;})(jQuery);
(function(){function t(e,t){return(new Date(t,e+1,0)).getDate()}function n(e,t,n){return function(r,i,s){var o=e(r),u=[];o<r&&t(o);if(s>1)while(o<i){var a=new Date(+o);n(a)%s===0&&u.push(a),t(o)}else while(o<i)u.push(new Date(+o)),t(o);return u}}var e=window.nv||{};e.version="1.1.15b",e.dev=!0,window.nv=e,e.tooltip=e.tooltip||{},e.utils=e.utils||{},e.models=e.models||{},e.charts={},e.graphs=[],e.logs={},e.dispatch=d3.dispatch("render_start","render_end"),e.dev&&(e.dispatch.on("render_start",function(t){e.logs.startTime=+(new Date)}),e.dispatch.on("render_end",function(t){e.logs.endTime=+(new Date),e.logs.totalTime=e.logs.endTime-e.logs.startTime,e.log("total",e.logs.totalTime)})),e.log=function(){if(e.dev&&console.log&&console.log.apply)console.log.apply(console,arguments);else if(e.dev&&typeof console.log=="function"&&Function.prototype.bind){var t=Function.prototype.bind.call(console.log,console);t.apply(console,arguments)}return arguments[arguments.length-1]},e.render=function(n){n=n||1,e.render.active=!0,e.dispatch.render_start(),setTimeout(function(){var t,r;for(var i=0;i<n&&(r=e.render.queue[i]);i++)t=r.generate(),typeof r.callback==typeof Function&&r.callback(t),e.graphs.push(t);e.render.queue.splice(0,i),e.render.queue.length?setTimeout(arguments.callee,0):(e.dispatch.render_end(),e.render.active=!1)},0)},e.render.active=!1,e.render.queue=[],e.addGraph=function(t){typeof arguments[0]==typeof Function&&(t={generate:arguments[0],callback:arguments[1]}),e.render.queue.push(t),e.render.active||e.render()},e.identity=function(e){return e},e.strip=function(e){return e.replace(/(\s|&)/g,"")},d3.time.monthEnd=function(e){return new Date(e.getFullYear(),e.getMonth(),0)},d3.time.monthEnds=n(d3.time.monthEnd,function(e){e.setUTCDate(e.getUTCDate()+1),e.setDate(t(e.getMonth()+1,e.getFullYear()))},function(e){return e.getMonth()}),e.interactiveGuideline=function(){"use strict";function c(o){o.each(function(o){function g(){var e=d3.mouse(this),n=e[0],r=e[1],o=!0,a=!1;l&&(n=d3.event.offsetX,r=d3.event.offsetY,d3.event.target.tagName!=="svg"&&(o=!1),d3.event.target.className.baseVal.match("nv-legend")&&(a=!0)),o&&(n-=i.left,r-=i.top);if(n<0||r<0||n>p||r>d||d3.event.relatedTarget&&d3.event.relatedTarget.ownerSVGElement===undefined||a){if(l&&d3.event.relatedTarget&&d3.event.relatedTarget.ownerSVGElement===undefined&&d3.event.relatedTarget.className.match(t.nvPointerEventsClass))return;u.elementMouseout({mouseX:n,mouseY:r}),c.renderGuideLine(null);return}var f=s.invert(n);u.elementMousemove({mouseX:n,mouseY:r,pointXValue:f}),d3.event.type==="dblclick"&&u.elementDblclick({mouseX:n,mouseY:r,pointXValue:f})}var h=d3.select(this),p=n||960,d=r||400,v=h.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([o]),m=v.enter().append("g").attr("class"," nv-wrap nv-interactiveLineLayer");m.append("g").attr("class","nv-interactiveGuideLine");if(!f)return;f.on("mousemove",g,!0).on("mouseout",g,!0).on("dblclick",g),c.renderGuideLine=function(t){if(!a)return;var n=v.select(".nv-interactiveGuideLine").selectAll("line").data(t!=null?[e.utils.NaNtoZero(t)]:[],String);n.enter().append("line").attr("class","nv-guideline").attr("x1",function(e){return e}).attr("x2",function(e){return e}).attr("y1",d).attr("y2",0),n.exit().remove()}})}var t=e.models.tooltip(),n=null,r=null,i={left:0,top:0},s=d3.scale.linear(),o=d3.scale.linear(),u=d3.dispatch("elementMousemove","elementMouseout","elementDblclick"),a=!0,f=null,l=navigator.userAgent.indexOf("MSIE")!==-1;return c.dispatch=u,c.tooltip=t,c.margin=function(e){return arguments.length?(i.top=typeof e.top!="undefined"?e.top:i.top,i.left=typeof e.left!="undefined"?e.left:i.left,c):i},c.width=function(e){return arguments.length?(n=e,c):n},c.height=function(e){return arguments.length?(r=e,c):r},c.xScale=function(e){return arguments.length?(s=e,c):s},c.showGuideLine=function(e){return arguments.length?(a=e,c):a},c.svgContainer=function(e){return arguments.length?(f=e,c):f},c},e.interactiveBisect=function(e,t,n){"use strict";if(!e instanceof Array)return null;typeof n!="function"&&(n=function(e,t){return e.x});var r=d3.bisector(n).left,i=d3.max([0,r(e,t)-1]),s=n(e[i],i);typeof s=="undefined"&&(s=i);if(s===t)return i;var o=d3.min([i+1,e.length-1]),u=n(e[o],o);return typeof u=="undefined"&&(u=o),Math.abs(u-t)>=Math.abs(s-t)?i:o},e.nearestValueIndex=function(e,t,n){"use strict";var r=Infinity,i=null;return e.forEach(function(e,s){var o=Math.abs(t-e);o<=r&&o<n&&(r=o,i=s)}),i},function(){"use strict";window.nv.tooltip={},window.nv.models.tooltip=function(){function y(){if(a){var e=d3.select(a);e.node().tagName!=="svg"&&(e=e.select("svg"));var t=e.node()?e.attr("viewBox"):null;if(t){t=t.split(" ");var n=parseInt(e.style("width"))/t[2];l.left=l.left*n,l.top=l.top*n}}}function b(e){var t;a?t=d3.select(a):t=d3.select("body");var n=t.select(".nvtooltip");return n.node()===null&&(n=t.append("div").attr("class","nvtooltip "+(u?u:"xy-tooltip")).attr("id",h)),n.node().innerHTML=e,n.style("top",0).style("left",0).style("opacity",0),n.selectAll("div, table, td, tr").classed(p,!0),n.classed(p,!0),n.node()}function w(){if(!c)return;if(!g(n))return;y();var t=l.left,u=o!=null?o:l.top,h=b(m(n));f=h;if(a){var p=a.getElementsByTagName("svg")[0],d=p?p.getBoundingClientRect():a.getBoundingClientRect(),v={left:0,top:0};if(p){var E=p.getBoundingClientRect(),S=a.getBoundingClientRect(),x=E.top;if(x<0){var T=a.getBoundingClientRect();x=Math.abs(x)>T.height?0:x}v.top=Math.abs(x-S.top),v.left=Math.abs(E.left-S.left)}t+=a.offsetLeft+v.left-2*a.scrollLeft,u+=a.offsetTop+v.top-2*a.scrollTop}return s&&s>0&&(u=Math.floor(u/s)*s),e.tooltip.calcTooltipPosition([t,u],r,i,h),w}var t=null,n=null,r="w",i=50,s=25,o=null,u=null,a=null,f=null,l={left:null,top:null},c=!0,h="nvtooltip-"+Math.floor(Math.random()*1e5),p="nv-pointer-events-none",d=function(e,t){return e},v=function(e){return e},m=function(e){if(t!=null)return t;if(e==null)return"";var n=d3.select(document.createElement("table")),r=n.selectAll("thead").data([e]).enter().append("thead");r.append("tr").append("td").attr("colspan",3).append("strong").classed("x-value",!0).html(v(e.value));var i=n.selectAll("tbody").data([e]).enter().append("tbody"),s=i.selectAll("tr").data(function(e){return e.series}).enter().append("tr").classed("highlight",function(e){return e.highlight});s.append("td").classed("legend-color-guide",!0).append("div").style("background-color",function(e){return e.color}),s.append("td").classed("key",!0).html(function(e){return e.key}),s.append("td").classed("value",!0).html(function(e,t){return d(e.value,t)}),s.selectAll("td").each(function(e){if(e.highlight){var t=d3.scale.linear().domain([0,1]).range(["#fff",e.color]),n=.6;d3.select(this).style("border-bottom-color",t(n)).style("border-top-color",t(n))}});var o=n.node().outerHTML;return e.footer!==undefined&&(o+="<div class='footer'>"+e.footer+"</div>"),o},g=function(e){return e&&e.series&&e.series.length>0?!0:!1};return w.nvPointerEventsClass=p,w.content=function(e){return arguments.length?(t=e,w):t},w.tooltipElem=function(){return f},w.contentGenerator=function(e){return arguments.length?(typeof e=="function"&&(m=e),w):m},w.data=function(e){return arguments.length?(n=e,w):n},w.gravity=function(e){return arguments.length?(r=e,w):r},w.distance=function(e){return arguments.length?(i=e,w):i},w.snapDistance=function(e){return arguments.length?(s=e,w):s},w.classes=function(e){return arguments.length?(u=e,w):u},w.chartContainer=function(e){return arguments.length?(a=e,w):a},w.position=function(e){return arguments.length?(l.left=typeof e.left!="undefined"?e.left:l.left,l.top=typeof e.top!="undefined"?e.top:l.top,w):l},w.fixedTop=function(e){return arguments.length?(o=e,w):o},w.enabled=function(e){return arguments.length?(c=e,w):c},w.valueFormatter=function(e){return arguments.length?(typeof e=="function"&&(d=e),w):d},w.headerFormatter=function(e){return arguments.length?(typeof e=="function"&&(v=e),w):v},w.id=function(){return h},w},e.tooltip.show=function(t,n,r,i,s,o){var u=document.createElement("div");u.className="nvtooltip "+(o?o:"xy-tooltip");var a=s;if(!s||s.tagName.match(/g|svg/i))a=document.getElementsByTagName("body")[0];u.style.left=0,u.style.top=0,u.style.opacity=0,u.innerHTML=n,a.appendChild(u),s&&(t[0]=t[0]-s.scrollLeft,t[1]=t[1]-s.scrollTop),e.tooltip.calcTooltipPosition(t,r,i,u)},e.tooltip.findFirstNonSVGParent=function(e){while(e.tagName.match(/^g|svg$/i)!==null)e=e.parentNode;return e},e.tooltip.findTotalOffsetTop=function(e,t){var n=t;do isNaN(e.offsetTop)||(n+=e.offsetTop);while(e=e.offsetParent);return n},e.tooltip.findTotalOffsetLeft=function(e,t){var n=t;do isNaN(e.offsetLeft)||(n+=e.offsetLeft);while(e=e.offsetParent);return n},e.tooltip.calcTooltipPosition=function(t,n,r,i){var s=parseInt(i.offsetHeight),o=parseInt(i.offsetWidth),u=e.utils.windowSize().width,a=e.utils.windowSize().height,f=window.pageYOffset,l=window.pageXOffset,c,h;a=window.innerWidth>=document.body.scrollWidth?a:a-16,u=window.innerHeight>=document.body.scrollHeight?u:u-16,n=n||"s",r=r||20;var p=function(t){return e.tooltip.findTotalOffsetTop(t,h)},d=function(t){return e.tooltip.findTotalOffsetLeft(t,c)};switch(n){case"e":c=t[0]-o-r,h=t[1]-s/2;var v=d(i),m=p(i);v<l&&(c=t[0]+r>l?t[0]+r:l-v+c),m<f&&(h=f-m+h),m+s>f+a&&(h=f+a-m+h-s);break;case"w":c=t[0]+r,h=t[1]-s/2;var v=d(i),m=p(i);v+o>u&&(c=t[0]-o-r),m<f&&(h=f+5),m+s>f+a&&(h=f+a-m+h-s);break;case"n":c=t[0]-o/2-5,h=t[1]+r;var v=d(i),m=p(i);v<l&&(c=l+5),v+o>u&&(c=c-o/2+5),m+s>f+a&&(h=f+a-m+h-s);break;case"s":c=t[0]-o/2,h=t[1]-s-r;var v=d(i),m=p(i);v<l&&(c=l+5),v+o>u&&(c=c-o/2+5),f>m&&(h=f);break;case"none":c=t[0],h=t[1]-r;var v=d(i),m=p(i)}return i.style.left=c+"px",i.style.top=h+"px",i.style.opacity=1,i.style.position="absolute",i},e.tooltip.cleanup=function(){var e=document.getElementsByClassName("nvtooltip"),t=[];while(e.length)t.push(e[0]),e[0].style.transitionDelay="0 !important",e[0].style.opacity=0,e[0].className="nvtooltip-pending-removal";setTimeout(function(){while(t.length){var e=t.pop();e.parentNode.removeChild(e)}},500)}}(),e.utils.windowSize=function(){var e={width:640,height:480};return document.body&&document.body.offsetWidth&&(e.width=document.body.offsetWidth,e.height=document.body.offsetHeight),document.compatMode=="CSS1Compat"&&document.documentElement&&document.documentElement.offsetWidth&&(e.width=document.documentElement.offsetWidth,e.height=document.documentElement.offsetHeight),window.innerWidth&&window.innerHeight&&(e.width=window.innerWidth,e.height=window.innerHeight),e},e.utils.windowResize=function(e){if(e===undefined)return;var t=window.onresize;window.onresize=function(n){typeof t=="function"&&t(n),e(n)}},e.utils.getColor=function(t){return arguments.length?Object.prototype.toString.call(t)==="[object Array]"?function(e,n){return e.color||t[n%t.length]}:t:e.utils.defaultColor()},e.utils.defaultColor=function(){var e=d3.scale.category20().range();return function(t,n){return t.color||e[n%e.length]}},e.utils.customTheme=function(e,t,n){t=t||function(e){return e.key},n=n||d3.scale.category20().range();var r=n.length;return function(i,s){var o=t(i);return r||(r=n.length),typeof e[o]!="undefined"?typeof e[o]=="function"?e[o]():e[o]:n[--r]}},e.utils.pjax=function(t,n){function r(r){d3.html(r,function(r){var i=d3.select(n).node();i.parentNode.replaceChild(d3.select(r).select(n).node(),i),e.utils.pjax(t,n)})}d3.selectAll(t).on("click",function(){history.pushState(this.href,this.textContent,this.href),r(this.href),d3.event.preventDefault()}),d3.select(window).on("popstate",function(){d3.event.state&&r(d3.event.state)})},e.utils.calcApproxTextWidth=function(e){if(typeof e.style=="function"&&typeof e.text=="function"){var t=parseInt(e.style("font-size").replace("px","")),n=e.text().length;return n*t*.5}return 0},e.utils.NaNtoZero=function(e){return typeof e!="number"||isNaN(e)||e===null||e===Infinity?0:e},e.utils.optionsFunc=function(e){return e&&d3.map(e).forEach(function(e,t){typeof this[e]=="function"&&this[e](t)}.bind(this)),this},e.models.axis=function(){"use strict";function m(e){return e.each(function(e){var i=d3.select(this),m=i.selectAll("g.nv-wrap.nv-axis").data([e]),g=m.enter().append("g").attr("class","nvd3 nv-wrap nv-axis"),y=g.append("g"),b=m.select("g");p!==null?t.ticks(p):(t.orient()=="top"||t.orient()=="bottom")&&t.ticks(Math.abs(s.range()[1]-s.range()[0])/100),b.transition().call(t),v=v||t.scale();var w=t.tickFormat();w==null&&(w=v.tickFormat());var E=b.selectAll("text.nv-axislabel").data([o||null]);E.exit().remove();switch(t.orient()){case"top":E.enter().append("text").attr("class","nv-axislabel");var S=s.range().length==2?s.range()[1]:s.range()[s.range().length-1]+(s.range()[1]-s.range()[0]);E.attr("text-anchor","middle").attr("y",0).attr("x",S/2);if(u){var x=m.selectAll("g.nv-axisMaxMin").data(s.domain());x.enter().append("g").attr("class","nv-axisMaxMin").append("text"),x.exit().remove(),x.attr("transform",function(e,t){return"translate("+s(e)+",0)"}).select("text").attr("dy","-0.5em").attr("y",-t.tickPadding()).attr("text-anchor","middle").text(function(e,t){var n=w(e);return(""+n).match("NaN")?"":n}),x.transition().attr("transform",function(e,t){return"translate("+s.range()[t]+",0)"})}break;case"bottom":var T=36,N=30,C=b.selectAll("g").select("text");if(f%360){C.each(function(e,t){var n=this.getBBox().width;n>N&&(N=n)});var k=Math.abs(Math.sin(f*Math.PI/180)),T=(k?k*N:N)+30;C.attr("transform",function(e,t,n){return"rotate("+f+" 0,0)"}).style("text-anchor",f%360>0?"start":"end")}E.enter().append("text").attr("class","nv-axislabel");var S=s.range().length==2?s.range()[1]:s.range()[s.range().length-1]+(s.range()[1]-s.range()[0]);E.attr("text-anchor","middle").attr("y",T).attr("x",S/2);if(u){var x=m.selectAll("g.nv-axisMaxMin").data([s.domain()[0],s.domain()[s.domain().length-1]]);x.enter().append("g").attr("class","nv-axisMaxMin").append("text"),x.exit().remove(),x.attr("transform",function(e,t){return"translate("+(s(e)+(h?s.rangeBand()/2:0))+",0)"}).select("text").attr("dy",".71em").attr("y",t.tickPadding()).attr("transform",function(e,t,n){return"rotate("+f+" 0,0)"}).style("text-anchor",f?f%360>0?"start":"end":"middle").text(function(e,t){var n=w(e);return(""+n).match("NaN")?"":n}),x.transition().attr("transform",function(e,t){return"translate("+(s(e)+(h?s.rangeBand()/2:0))+",0)"})}c&&C.attr("transform",function(e,t){return"translate(0,"+(t%2==0?"0":"12")+")"});break;case"right":E.enter().append("text").attr("class","nv-axislabel"),E.style("text-anchor",l?"middle":"begin").attr("transform",l?"rotate(90)":"").attr("y",l?-Math.max(n.right,r)+12:-10).attr("x",l?s.range()[0]/2:t.tickPadding());if(u){var x=m.selectAll("g.nv-axisMaxMin").data(s.domain());x.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0),x.exit().remove(),x.attr("transform",function(e,t){return"translate(0,"+s(e)+")"}).select("text").attr("dy",".32em").attr("y",0).attr("x",t.tickPadding()).style("text-anchor","start").text(function(e,t){var n=w(e);return(""+n).match("NaN")?"":n}),x.transition().attr("transform",function(e,t){return"translate(0,"+s.range()[t]+")"}).select("text").style("opacity",1)}break;case"left":E.enter().append("text").attr("class","nv-axislabel"),E.style("text-anchor",l?"middle":"end").attr("transform",l?"rotate(-90)":"").attr("y",l?-Math.max(n.left,r)+d:-10).attr("x",l?-s.range()[0]/2:-t.tickPadding());if(u){var x=m.selectAll("g.nv-axisMaxMin").data(s.domain());x.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0),x.exit().remove(),x.attr("transform",function(e,t){return"translate(0,"+v(e)+")"}).select("text").attr("dy",".32em").attr("y",0).attr("x",-t.tickPadding()).attr("text-anchor","end").text(function(e,t){var n=w(e);return(""+n).match("NaN")?"":n}),x.transition().attr("transform",function(e,t){return"translate(0,"+s.range()[t]+")"}).select("text").style("opacity",1)}}E.text(function(e){return e}),u&&(t.orient()==="left"||t.orient()==="right")&&(b.selectAll("g").each(function(e,t){d3.select(this).select("text").attr("opacity",1);if(s(e)<s.range()[1]+10||s(e)>s.range()[0]-10)(e>1e-10||e<-1e-10)&&d3.select(this).attr("opacity",0),d3.select(this).select("text").attr("opacity",0)}),s.domain()[0]==s.domain()[1]&&s.domain()[0]==0&&m.selectAll("g.nv-axisMaxMin").style("opacity",function(e,t){return t?0:1}));if(u&&(t.orient()==="top"||t.orient()==="bottom")){var L=[];m.selectAll("g.nv-axisMaxMin").each(function(e,t){try{t?L.push(s(e)-this.getBBox().width-4):L.push(s(e)+this.getBBox().width+4)}catch(n){t?L.push(s(e)-4):L.push(s(e)+4)}}),b.selectAll("g").each(function(e,t){if(s(e)<L[0]||s(e)>L[1])e>1e-10||e<-1e-10?d3.select(this).remove():d3.select(this).select("text").remove()})}a&&b.selectAll(".tick").filter(function(e){return!parseFloat(Math.round(e.__data__*1e5)/1e6)&&e.__data__!==undefined}).classed("zero",!0),v=s.copy()}),m}var t=d3.svg.axis(),n={top:0,right:0,bottom:0,left:0},r=75,i=60,s=d3.scale.linear(),o=null,u=!0,a=!0,f=0,l=!0,c=!1,h=!1,p=null,d=12;t.scale(s).orient("bottom").tickFormat(function(e){return e});var v;return m.axis=t,d3.rebind(m,t,"orient","tickValues","tickSubdivide","tickSize","tickPadding","tickFormat"),d3.rebind(m,s,"domain","range","rangeBand","rangeBands"),m.options=e.utils.optionsFunc.bind(m),m.margin=function(e){return arguments.length?(n.top=typeof e.top!="undefined"?e.top:n.top,n.right=typeof e.right!="undefined"?e.right:n.right,n.bottom=typeof e.bottom!="undefined"?e.bottom:n.bottom,n.left=typeof e.left!="undefined"?e.left:n.left,m):n},m.width=function(e){return arguments.length?(r=e,m):r},m.ticks=function(e){return arguments.length?(p=e,m):p},m.height=function(e){return arguments.length?(i=e,m):i},m.axisLabel=function(e){return arguments.length?(o=e,m):o},m.showMaxMin=function(e){return arguments.length?(u=e,m):u},m.highlightZero=function(e){return arguments.length?(a=e,m):a},m.scale=function(e){return arguments.length?(s=e,t.scale(s),h=typeof s.rangeBands=="function",d3.rebind(m,s,"domain","range","rangeBand","rangeBands"),m):s},m.rotateYLabel=function(e){return arguments.length?(l=e,m):l},m.rotateLabels=function(e){return arguments.length?(f=e,m):f},m.staggerLabels=function(e){return arguments.length?(c=e,m):c},m.axisLabelDistance=function(e){return arguments.length?(d=e,m):d},m},e.models.bullet=function(){"use strict";function m(e){return e.each(function(e,n){var p=c-t.left-t.right,m=h-t.top-t.bottom,g=d3.select(this),y=i.call(this,e,n).slice().sort(d3.descending),b=s.call(this,e,n).slice().sort(d3.descending),w=o.call(this,e,n).slice().sort(d3.descending),E=u.call(this,e,n).slice(),S=a.call(this,e,n).slice(),x=f.call(this,e,n).slice(),T=d3.scale.linear().domain(d3.extent(d3.merge([l,y]))).range(r?[p,0]:[0,p]),N=this.__chart__||d3.scale.linear().domain([0,Infinity]).range(T.range());this.__chart__=T;var C=d3.min(y),k=d3.max(y),L=y[1],A=g.selectAll("g.nv-wrap.nv-bullet").data([e]),O=A.enter().append("g").attr("class","nvd3 nv-wrap nv-bullet"),M=O.append("g"),_=A.select("g");M.append("rect").attr("class","nv-range nv-rangeMax"),M.append("rect").attr("class","nv-range nv-rangeAvg"),M.append("rect").attr("class","nv-range nv-rangeMin"),M.append("rect").attr("class","nv-measure"),M.append("path").attr("class","nv-markerTriangle"),A.attr("transform","translate("+t.left+","+t.top+")");var D=function(e){return Math.abs(N(e)-N(0))},P=function(e){return Math.abs(T(e)-T(0))},H=function(e){return e<0?N(e):N(0)},B=function(e){return e<0?T(e):T(0)};_.select("rect.nv-rangeMax").attr("height",m).attr("width",P(k>0?k:C)).attr("x",B(k>0?k:C)).datum(k>0?k:C),_.select("rect.nv-rangeAvg").attr("height",m).attr("width",P(L)).attr("x",B(L)).datum(L),_.select("rect.nv-rangeMin").attr("height",m).attr("width",P(k)).attr("x",B(k)).attr("width",P(k>0?C:k)).attr("x",B(k>0?C:k)).datum(k>0?C:k),_.select("rect.nv-measure").style("fill",d).attr("height",m/3).attr("y",m/3).attr("width",w<0?T(0)-T(w[0]):T(w[0])-T(0)).attr("x",B(w)).on("mouseover",function(){v.elementMouseover({value:w[0],label:x[0]||"Current",pos:[T(w[0]),m/2]})}).on("mouseout",function(){v.elementMouseout({value:w[0],label:x[0]||"Current"})});var j=m/6;b[0]?_.selectAll("path.nv-markerTriangle").attr("transform",function(e){return"translate("+T(b[0])+","+m/2+")"}).attr("d","M0,"+j+"L"+j+","+ -j+" "+ -j+","+ -j+"Z").on("mouseover",function(){v.elementMouseover({value:b[0],label:S[0]||"Previous",pos:[T(b[0]),m/2]})}).on("mouseout",function(){v.elementMouseout({value:b[0],label:S[0]||"Previous"})}):_.selectAll("path.nv-markerTriangle").remove(),A.selectAll(".nv-range").on("mouseover",function(e,t){var n=E[t]||(t?t==1?"Mean":"Minimum":"Maximum");v.elementMouseover({value:e,label:n,pos:[T(e),m/2]})}).on("mouseout",function(e,t){var n=E[t]||(t?t==1?"Mean":"Minimum":"Maximum");v.elementMouseout({value:e,label:n})})}),m}var t={top:0,right:0,bottom:0,left:0},n="left",r=!1,i=function(e){return e.ranges},s=function(e){return e.markers},o=function(e){return e.measures},u=function(e){return e.rangeLabels?e.rangeLabels:[]},a=function(e){return e.markerLabels?e.markerLabels:[]},f=function(e){return e.measureLabels?e.measureLabels:[]},l=[0],c=380,h=30,p=null,d=e.utils.getColor(["#1f77b4"]),v=d3.dispatch("elementMouseover","elementMouseout");return m.dispatch=v,m.options=e.utils.optionsFunc.bind(m),m.orient=function(e){return arguments.length?(n=e,r=n=="right"||n=="bottom",m):n},m.ranges=function(e){return arguments.length?(i=e,m):i},m.markers=function(e){return arguments.length?(s=e,m):s},m.measures=function(e){return arguments.length?(o=e,m):o},m.forceX=function(e){return arguments.length?(l=e,m):l},m.width=function(e){return arguments.length?(c=e,m):c},m.height=function(e){return arguments.length?(h=e,m):h},m.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,m):t},m.tickFormat=function(e){return arguments.length?(p=e,m):p},m.color=function(t){return arguments.length?(d=e.utils.getColor(t),m):d},m},e.models.bulletChart=function(){"use strict";function m(e){return e.each(function(n,h){var g=d3.select(this),y=(a||parseInt(g.style("width"))||960)-i.left-i.right,b=f-i.top-i.bottom,w=this;m.update=function(){m(e)},m.container=this;if(!n||!s.call(this,n,h)){var E=g.selectAll(".nv-noData").data([p]);return E.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),E.attr("x",i.left+y/2).attr("y",18+i.top+b/2).text(function(e){return e}),m}g.selectAll(".nv-noData").remove();var S=s.call(this,n,h).slice().sort(d3.descending),x=o.call(this,n,h).slice().sort(d3.descending),T=u.call(this,n,h).slice().sort(d3.descending),N=g.selectAll("g.nv-wrap.nv-bulletChart").data([n]),C=N.enter().append("g").attr("class","nvd3 nv-wrap nv-bulletChart"),k=C.append("g"),L=N.select("g");k.append("g").attr("class","nv-bulletWrap"),k.append("g").attr("class","nv-titles"),N.attr("transform","translate("+i.left+","+i.top+")");var A=d3.scale.linear().domain([0,Math.max(S[0],x[0],T[0])]).range(r?[y,0]:[0,y]),O=this.__chart__||d3.scale.linear().domain([0,Infinity]).range(A.range());this.__chart__=A;var M=function(e){return Math.abs(O(e)-O(0))},_=function(e){return Math.abs(A(e)-A(0))},D=k.select(".nv-titles").append("g").attr("text-anchor","end").attr("transform","translate(-6,"+(f-i.top-i.bottom)/2+")");D.append("text").attr("class","nv-title").text(function(e){return e.title}),D.append("text").attr("class","nv-subtitle").attr("dy","1em").text(function(e){return e.subtitle}),t.width(y).height(b);var P=L.select(".nv-bulletWrap");d3.transition(P).call(t);var H=l||A.tickFormat(y/100),B=L.selectAll("g.nv-tick").data(A.ticks(y/50),function(e){return this.textContent||H(e)}),j=B.enter().append("g").attr("class","nv-tick").attr("transform",function(e){return"translate("+O(e)+",0)"}).style("opacity",1e-6);j.append("line").attr("y1",b).attr("y2",b*7/6),j.append("text").attr("text-anchor","middle").attr("dy","1em").attr("y",b*7/6).text(H);var F=d3.transition(B).attr("transform",function(e){return"translate("+A(e)+",0)"}).style("opacity",1);F.select("line").attr("y1",b).attr("y2",b*7/6),F.select("text").attr("y",b*7/6),d3.transition(B.exit()).attr("transform",function(e){return"translate("+A(e)+",0)"}).style("opacity",1e-6).remove(),d.on("tooltipShow",function(e){e.key=n.title,c&&v(e,w.parentNode)})}),d3.timer.flush(),m}var t=e.models.bullet(),n="left",r=!1,i={top:5,right:40,bottom:20,left:120},s=function(e){return e.ranges},o=function(e){return e.markers},u=function(e){return e.measures},a=null,f=55,l=null,c=!0,h=function(e,t,n,r,i){return"<h3>"+t+"</h3>"+"<p>"+n+"</p>"},p="No Data Available.",d=d3.dispatch("tooltipShow","tooltipHide"),v=function(t,n){var r=t.pos[0]+(n.offsetLeft||0)+i.left,s=t.pos[1]+(n.offsetTop||0)+i.top,o=h(t.key,t.label,t.value,t,m);e.tooltip.show([r,s],o,t.value<0?"e":"w",null,n)};return t.dispatch.on("elementMouseover.tooltip",function(e){d.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){d.tooltipHide(e)}),d.on("tooltipHide",function(){c&&e.tooltip.cleanup()}),m.dispatch=d,m.bullet=t,d3.rebind(m,t,"color"),m.options=e.utils.optionsFunc.bind(m),m.orient=function(e){return arguments.length?(n=e,r=n=="right"||n=="bottom",m):n},m.ranges=function(e){return arguments.length?(s=e,m):s},m.markers=function(e){return arguments.length?(o=e,m):o},m.measures=function(e){return arguments.length?(u=e,m):u},m.width=function(e){return arguments.length?(a=e,m):a},m.height=function(e){return arguments.length?(f=e,m):f},m.margin=function(e){return arguments.length?(i.top=typeof e.top!="undefined"?e.top:i.top,i.right=typeof e.right!="undefined"?e.right:i.right,i.bottom=typeof e.bottom!="undefined"?e.bottom:i.bottom,i.left=typeof e.left!="undefined"?e.left:i.left,m):i},m.tickFormat=function(e){return arguments.length?(l=e,m):l},m.tooltips=function(e){return arguments.length?(c=e,m):c},m.tooltipContent=function(e){return arguments.length?(h=e,m):h},m.noData=function(e){return arguments.length?(p=e,m):p},m},e.models.cumulativeLineChart=function(){"use strict";function D(b){return b.each(function(b){function q(e,t){d3.select(D.container).style("cursor","ew-resize")}function R(e,t){M.x=d3.event.x,M.i=Math.round(O.invert(M.x)),rt()}function U(e,t){d3.select(D.container).style("cursor","auto"),x.index=M.i,k.stateChange(x)}function rt(){nt.data([M]);var e=D.transitionDuration();D.transitionDuration(0),D.update(),D.transitionDuration(e)}var A=d3.select(this).classed("nv-chart-"+S,!0),H=this,B=(f||parseInt(A.style("width"))||960)-u.left-u.right,j=(l||parseInt(A.style("height"))||400)-u.top-u.bottom;D.update=function(){A.transition().duration(L).call(D)},D.container=this,x.disabled=b.map(function(e){return!!e.disabled});if(!T){var F;T={};for(F in x)x[F]instanceof Array?T[F]=x[F].slice(0):T[F]=x[F]}var I=d3.behavior.drag().on("dragstart",q).on("drag",R).on("dragend",U);if(!b||!b.length||!b.filter(function(e){return e.values.length}).length){var z=A.selectAll(".nv-noData").data([N]);return z.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),z.attr("x",u.left+B/2).attr("y",u.top+j/2).text(function(e){return e}),D}A.selectAll(".nv-noData").remove(),w=t.xScale(),E=t.yScale();if(!y){var W=b.filter(function(e){return!e.disabled}).map(function(e,n){var r=d3.extent(e.values,t.y());return r[0]<-0.95&&(r[0]=-0.95),[(r[0]-r[1])/(1+r[1]),(r[1]-r[0])/(1+r[0])]}),X=[d3.min(W,function(e){return e[0]}),d3.max(W,function(e){return e[1]})];t.yDomain(X)}else t.yDomain(null);O.domain([0,b[0].values.length-1]).range([0,B]).clamp(!0);var b=P(M.i,b),V=g?"none":"all",$=A.selectAll("g.nv-wrap.nv-cumulativeLine").data([b]),J=$.enter().append("g").attr("class","nvd3 nv-wrap nv-cumulativeLine").append("g"),K=$.select("g");J.append("g").attr("class","nv-interactive"),J.append("g").attr("class","nv-x nv-axis").style("pointer-events","none"),J.append("g").attr("class","nv-y nv-axis"),J.append("g").attr("class","nv-background"),J.append("g").attr("class","nv-linesWrap").style("pointer-events",V),J.append("g").attr("class","nv-avgLinesWrap").style("pointer-events","none"),J.append("g").attr("class","nv-legendWrap"),J.append("g").attr("class","nv-controlsWrap"),c&&(i.width(B),K.select(".nv-legendWrap").datum(b).call(i),u.top!=i.height()&&(u.top=i.height(),j=(l||parseInt(A.style("height"))||400)-u.top-u.bottom),K.select(".nv-legendWrap").attr("transform","translate(0,"+ -u.top+")"));if(m){var Q=[{key:"Re-scale y-axis",disabled:!y}];s.width(140).color(["#444","#444","#444"]).rightAlign(!1).margin({top:5,right:0,bottom:5,left:20}),K.select(".nv-controlsWrap").datum(Q).attr("transform","translate(0,"+ -u.top+")").call(s)}$.attr("transform","translate("+u.left+","+u.top+")"),d&&K.select(".nv-y.nv-axis").attr("transform","translate("+B+",0)");var G=b.filter(function(e){return e.tempDisabled});$.select(".tempDisabled").remove(),G.length&&$.append("text").attr("class","tempDisabled").attr("x",B/2).attr("y","-.71em").style("text-anchor","end").text(G.map(function(e){return e.key}).join(", ")+" values cannot be calculated for this time period."),g&&(o.width(B).height(j).margin({left:u.left,top:u.top}).svgContainer(A).xScale(w),$.select(".nv-interactive").call(o)),J.select(".nv-background").append("rect"),K.select(".nv-background rect").attr("width",B).attr("height",j),t.y(function(e){return e.display.y}).width(B).height(j).color(b.map(function(e,t){return e.color||a(e,t)}).filter(function(e,t){return!b[t].disabled&&!b[t].tempDisabled}));var Y=K.select(".nv-linesWrap").datum(b.filter(function(e){return!e.disabled&&!e.tempDisabled}));Y.call(t),b.forEach(function(e,t){e.seriesIndex=t});var Z=b.filter(function(e){return!e.disabled&&!!C(e)}),et=K.select(".nv-avgLinesWrap").selectAll("line").data(Z,function(e){return e.key}),tt=function(e){var t=E(C(e));return t<0?0:t>j?j:t};et.enter().append("line").style("stroke-width",2).style("stroke-dasharray","10,10").style("stroke",function(e,n){return t.color()(e,e.seriesIndex)}).attr("x1",0).attr("x2",B).attr("y1",tt).attr("y2",tt),et.style("stroke-opacity",function(e){var t=E(C(e));return t<0||t>j?0:1}).attr("x1",0).attr("x2",B).attr("y1",tt).attr("y2",tt),et.exit().remove();var nt=Y.selectAll(".nv-indexLine").data([M]);nt.enter().append("rect").attr("class","nv-indexLine").attr("width",3).attr("x",-2).attr("fill","red").attr("fill-opacity",.5).style("pointer-events","all").call(I),nt.attr("transform",function(e){return"translate("+O(e.i)+",0)"}).attr("height",j),h&&(n.scale(w).ticks(Math.min(b[0].values.length,B/70)).tickSize(-j,0),K.select(".nv-x.nv-axis").attr("transform","translate(0,"+E.range()[0]+")"),d3.transition(K.select(".nv-x.nv-axis")).call(n)),p&&(r.scale(E).ticks(j/36).tickSize(-B,0),d3.transition(K.select(".nv-y.nv-axis")).call(r)),K.select(".nv-background rect").on("click",function(){M.x=d3.mouse(this)[0],M.i=Math.round(O.invert(M.x)),x.index=M.i,k.stateChange(x),rt()}),t.dispatch.on("elementClick",function(e){M.i=e.pointIndex,M.x=O(M.i),x.index=M.i,k.stateChange(x),rt()}),s.dispatch.on("legendClick",function(e,t){e.disabled=!e.disabled,y=!e.disabled,x.rescaleY=y,k.stateChange(x),D.update()}),i.dispatch.on("stateChange",function(e){x.disabled=e.disabled,k.stateChange(x),D.update()}),o.dispatch.on("elementMousemove",function(i){t.clearHighlights();var s,f,l,c=[];b.filter(function(e,t){return e.seriesIndex=t,!e.disabled}).forEach(function(n,r){f=e.interactiveBisect(n.values,i.pointXValue,D.x()),t.highlightPoint(r,f,!0);var o=n.values[f];if(typeof o=="undefined")return;typeof s=="undefined"&&(s=o),typeof l=="undefined"&&(l=D.xScale()(D.x()(o,f))),c.push({key:n.key,value:D.y()(o,f),color:a(n,n.seriesIndex)})});if(c.length>2){var h=D.yScale().invert(i.mouseY),p=Math.abs(D.yScale().domain()[0]-D.yScale().domain()[1]),d=.03*p,m=e.nearestValueIndex(c.map(function(e){return e.value}),h,d);m!==null&&(c[m].highlight=!0)}var g=n.tickFormat()(D.x()(s,f),f);o.tooltip.position({left:l+u.left,top:i.mouseY+u.top}).chartContainer(H.parentNode).enabled(v).valueFormatter(function(e,t){return r.tickFormat()(e)}).data({value:g,series:c})(),o.renderGuideLine(l)}),o.dispatch.on("elementMouseout",function(e){k.tooltipHide(),t.clearHighlights()}),k.on("tooltipShow",function(e){v&&_(e,H.parentNode)}),k.on("changeState",function(e){typeof e.disabled!="undefined"&&(b.forEach(function(t,n){t.disabled=e.disabled[n]}),x.disabled=e.disabled),typeof e.index!="undefined"&&(M.i=e.index,M.x=O(M.i),x.index=e.index,nt.data([M])),typeof e.rescaleY!="undefined"&&(y=e.rescaleY),D.update()})}),D}function P(e,n){return n.map(function(n,r){if(!n.values)return n;var i=t.y()(n.values[e],e);return i<-0.95&&!A?(n.tempDisabled=!0,n):(n.tempDisabled=!1,n.values=
n.values.map(function(e,n){return e.display={y:(t.y()(e,n)-i)/(1+i)},e}),n)})}var t=e.models.line(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s=e.models.legend(),o=e.interactiveGuideline(),u={top:30,right:30,bottom:50,left:60},a=e.utils.defaultColor(),f=null,l=null,c=!0,h=!0,p=!0,d=!1,v=!0,m=!0,g=!1,y=!0,b=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},w,E,S=t.id(),x={index:0,rescaleY:y},T=null,N="No Data Available.",C=function(e){return e.average},k=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),L=250,A=!1;n.orient("bottom").tickPadding(7),r.orient(d?"right":"left"),s.updateState(!1);var O=d3.scale.linear(),M={i:0,x:0},_=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),a=n.tickFormat()(t.x()(i.point,i.pointIndex)),f=r.tickFormat()(t.y()(i.point,i.pointIndex)),l=b(i.series.key,a,f,i,D);e.tooltip.show([o,u],l,null,null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+u.left,e.pos[1]+u.top],k.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){k.tooltipHide(e)}),k.on("tooltipHide",function(){v&&e.tooltip.cleanup()}),D.dispatch=k,D.lines=t,D.legend=i,D.xAxis=n,D.yAxis=r,D.interactiveLayer=o,d3.rebind(D,t,"defined","isArea","x","y","xScale","yScale","size","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","useVoronoi","id"),D.options=e.utils.optionsFunc.bind(D),D.margin=function(e){return arguments.length?(u.top=typeof e.top!="undefined"?e.top:u.top,u.right=typeof e.right!="undefined"?e.right:u.right,u.bottom=typeof e.bottom!="undefined"?e.bottom:u.bottom,u.left=typeof e.left!="undefined"?e.left:u.left,D):u},D.width=function(e){return arguments.length?(f=e,D):f},D.height=function(e){return arguments.length?(l=e,D):l},D.color=function(t){return arguments.length?(a=e.utils.getColor(t),i.color(a),D):a},D.rescaleY=function(e){return arguments.length?(y=e,D):y},D.showControls=function(e){return arguments.length?(m=e,D):m},D.useInteractiveGuideline=function(e){return arguments.length?(g=e,e===!0&&(D.interactive(!1),D.useVoronoi(!1)),D):g},D.showLegend=function(e){return arguments.length?(c=e,D):c},D.showXAxis=function(e){return arguments.length?(h=e,D):h},D.showYAxis=function(e){return arguments.length?(p=e,D):p},D.rightAlignYAxis=function(e){return arguments.length?(d=e,r.orient(e?"right":"left"),D):d},D.tooltips=function(e){return arguments.length?(v=e,D):v},D.tooltipContent=function(e){return arguments.length?(b=e,D):b},D.state=function(e){return arguments.length?(x=e,D):x},D.defaultState=function(e){return arguments.length?(T=e,D):T},D.noData=function(e){return arguments.length?(N=e,D):N},D.average=function(e){return arguments.length?(C=e,D):C},D.transitionDuration=function(e){return arguments.length?(L=e,D):L},D.noErrorCheck=function(e){return arguments.length?(A=e,D):A},D},e.models.discreteBar=function(){"use strict";function E(e){return e.each(function(e){var i=n-t.left-t.right,E=r-t.top-t.bottom,S=d3.select(this);e.forEach(function(e,t){e.values.forEach(function(e){e.series=t})});var T=p&&d?[]:e.map(function(e){return e.values.map(function(e,t){return{x:u(e,t),y:a(e,t),y0:e.y0}})});s.domain(p||d3.merge(T).map(function(e){return e.x})).rangeBands(v||[0,i],.1),o.domain(d||d3.extent(d3.merge(T).map(function(e){return e.y}).concat(f))),c?o.range(m||[E-(o.domain()[0]<0?12:0),o.domain()[1]>0?12:0]):o.range(m||[E,0]),b=b||s,w=w||o.copy().range([o(0),o(0)]);var N=S.selectAll("g.nv-wrap.nv-discretebar").data([e]),C=N.enter().append("g").attr("class","nvd3 nv-wrap nv-discretebar"),k=C.append("g"),L=N.select("g");k.append("g").attr("class","nv-groups"),N.attr("transform","translate("+t.left+","+t.top+")");var A=N.select(".nv-groups").selectAll(".nv-group").data(function(e){return e},function(e){return e.key});A.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),A.exit().transition().style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),A.attr("class",function(e,t){return"nv-group nv-series-"+t}).classed("hover",function(e){return e.hover}),A.transition().style("stroke-opacity",1).style("fill-opacity",.75);var O=A.selectAll("g.nv-bar").data(function(e){return e.values});O.exit().remove();var M=O.enter().append("g").attr("transform",function(e,t,n){return"translate("+(s(u(e,t))+s.rangeBand()*.05)+", "+o(0)+")"}).on("mouseover",function(t,n){d3.select(this).classed("hover",!0),g.elementMouseover({value:a(t,n),point:t,series:e[t.series],pos:[s(u(t,n))+s.rangeBand()*(t.series+.5)/e.length,o(a(t,n))],pointIndex:n,seriesIndex:t.series,e:d3.event})}).on("mouseout",function(t,n){d3.select(this).classed("hover",!1),g.elementMouseout({value:a(t,n),point:t,series:e[t.series],pointIndex:n,seriesIndex:t.series,e:d3.event})}).on("click",function(t,n){g.elementClick({value:a(t,n),point:t,series:e[t.series],pos:[s(u(t,n))+s.rangeBand()*(t.series+.5)/e.length,o(a(t,n))],pointIndex:n,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(t,n){g.elementDblClick({value:a(t,n),point:t,series:e[t.series],pos:[s(u(t,n))+s.rangeBand()*(t.series+.5)/e.length,o(a(t,n))],pointIndex:n,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()});M.append("rect").attr("height",0).attr("width",s.rangeBand()*.9/e.length),c?(M.append("text").attr("text-anchor","middle"),O.select("text").text(function(e,t){return h(a(e,t))}).transition().attr("x",s.rangeBand()*.9/2).attr("y",function(e,t){return a(e,t)<0?o(a(e,t))-o(0)+12:-4})):O.selectAll("text").remove(),O.attr("class",function(e,t){return a(e,t)<0?"nv-bar negative":"nv-bar positive"}).style("fill",function(e,t){return e.color||l(e,t)}).style("stroke",function(e,t){return e.color||l(e,t)}).select("rect").attr("class",y).transition().attr("width",s.rangeBand()*.9/e.length),O.transition().attr("transform",function(e,t){var n=s(u(e,t))+s.rangeBand()*.05,r=a(e,t)<0?o(0):o(0)-o(a(e,t))<1?o(0)-1:o(a(e,t));return"translate("+n+", "+r+")"}).select("rect").attr("height",function(e,t){return Math.max(Math.abs(o(a(e,t))-o(d&&d[0]||0))||1)}),b=s.copy(),w=o.copy()}),E}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=Math.floor(Math.random()*1e4),s=d3.scale.ordinal(),o=d3.scale.linear(),u=function(e){return e.x},a=function(e){return e.y},f=[0],l=e.utils.defaultColor(),c=!1,h=d3.format(",.2f"),p,d,v,m,g=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),y="discreteBar",b,w;return E.dispatch=g,E.options=e.utils.optionsFunc.bind(E),E.x=function(e){return arguments.length?(u=e,E):u},E.y=function(e){return arguments.length?(a=e,E):a},E.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,E):t},E.width=function(e){return arguments.length?(n=e,E):n},E.height=function(e){return arguments.length?(r=e,E):r},E.xScale=function(e){return arguments.length?(s=e,E):s},E.yScale=function(e){return arguments.length?(o=e,E):o},E.xDomain=function(e){return arguments.length?(p=e,E):p},E.yDomain=function(e){return arguments.length?(d=e,E):d},E.xRange=function(e){return arguments.length?(v=e,E):v},E.yRange=function(e){return arguments.length?(m=e,E):m},E.forceY=function(e){return arguments.length?(f=e,E):f},E.color=function(t){return arguments.length?(l=e.utils.getColor(t),E):l},E.id=function(e){return arguments.length?(i=e,E):i},E.showValues=function(e){return arguments.length?(c=e,E):c},E.valueFormat=function(e){return arguments.length?(h=e,E):h},E.rectClass=function(e){return arguments.length?(y=e,E):y},E},e.models.discreteBarChart=function(){"use strict";function w(e){return e.each(function(e){var u=d3.select(this),p=this,E=(s||parseInt(u.style("width"))||960)-i.left-i.right,S=(o||parseInt(u.style("height"))||400)-i.top-i.bottom;w.update=function(){g.beforeUpdate(),u.transition().duration(y).call(w)},w.container=this;if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var T=u.selectAll(".nv-noData").data([m]);return T.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),T.attr("x",i.left+E/2).attr("y",i.top+S/2).text(function(e){return e}),w}u.selectAll(".nv-noData").remove(),d=t.xScale(),v=t.yScale().clamp(!0);var N=u.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([e]),C=N.enter().append("g").attr("class","nvd3 nv-wrap nv-discreteBarWithAxes").append("g"),k=C.append("defs"),L=N.select("g");C.append("g").attr("class","nv-x nv-axis"),C.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),C.append("g").attr("class","nv-barsWrap"),L.attr("transform","translate("+i.left+","+i.top+")"),l&&L.select(".nv-y.nv-axis").attr("transform","translate("+E+",0)"),t.width(E).height(S);var A=L.select(".nv-barsWrap").datum(e.filter(function(e){return!e.disabled}));A.transition().call(t),k.append("clipPath").attr("id","nv-x-label-clip-"+t.id()).append("rect"),L.select("#nv-x-label-clip-"+t.id()+" rect").attr("width",d.rangeBand()*(c?2:1)).attr("height",16).attr("x",-d.rangeBand()/(c?1:2));if(a){n.scale(d).ticks(E/100).tickSize(-S,0),L.select(".nv-x.nv-axis").attr("transform","translate(0,"+(v.range()[0]+(t.showValues()&&v.domain()[0]<0?16:0))+")"),L.select(".nv-x.nv-axis").transition().call(n);var O=L.select(".nv-x.nv-axis").selectAll("g");c&&O.selectAll("text").attr("transform",function(e,t,n){return"translate(0,"+(n%2==0?"5":"17")+")"})}f&&(r.scale(v).ticks(S/36).tickSize(-E,0),L.select(".nv-y.nv-axis").transition().call(r)),L.select(".nv-zeroLine line").attr("x1",0).attr("x2",E).attr("y1",v(0)).attr("y2",v(0)),g.on("tooltipShow",function(e){h&&b(e,p.parentNode)})}),w}var t=e.models.discreteBar(),n=e.models.axis(),r=e.models.axis(),i={top:15,right:10,bottom:50,left:60},s=null,o=null,u=e.utils.getColor(),a=!0,f=!0,l=!1,c=!1,h=!0,p=function(e,t,n,r,i){return"<h3>"+t+"</h3>"+"<p>"+n+"</p>"},d,v,m="No Data Available.",g=d3.dispatch("tooltipShow","tooltipHide","beforeUpdate"),y=250;n.orient("bottom").highlightZero(!1).showMaxMin(!1).tickFormat(function(e){return e}),r.orient(l?"right":"left").tickFormat(d3.format(",.1f"));var b=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),a=n.tickFormat()(t.x()(i.point,i.pointIndex)),f=r.tickFormat()(t.y()(i.point,i.pointIndex)),l=p(i.series.key,a,f,i,w);e.tooltip.show([o,u],l,i.value<0?"n":"s",null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+i.left,e.pos[1]+i.top],g.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){g.tooltipHide(e)}),g.on("tooltipHide",function(){h&&e.tooltip.cleanup()}),w.dispatch=g,w.discretebar=t,w.xAxis=n,w.yAxis=r,d3.rebind(w,t,"x","y","xDomain","yDomain","xRange","yRange","forceX","forceY","id","showValues","valueFormat"),w.options=e.utils.optionsFunc.bind(w),w.margin=function(e){return arguments.length?(i.top=typeof e.top!="undefined"?e.top:i.top,i.right=typeof e.right!="undefined"?e.right:i.right,i.bottom=typeof e.bottom!="undefined"?e.bottom:i.bottom,i.left=typeof e.left!="undefined"?e.left:i.left,w):i},w.width=function(e){return arguments.length?(s=e,w):s},w.height=function(e){return arguments.length?(o=e,w):o},w.color=function(n){return arguments.length?(u=e.utils.getColor(n),t.color(u),w):u},w.showXAxis=function(e){return arguments.length?(a=e,w):a},w.showYAxis=function(e){return arguments.length?(f=e,w):f},w.rightAlignYAxis=function(e){return arguments.length?(l=e,r.orient(e?"right":"left"),w):l},w.staggerLabels=function(e){return arguments.length?(c=e,w):c},w.tooltips=function(e){return arguments.length?(h=e,w):h},w.tooltipContent=function(e){return arguments.length?(p=e,w):p},w.noData=function(e){return arguments.length?(m=e,w):m},w.transitionDuration=function(e){return arguments.length?(y=e,w):y},w},e.models.distribution=function(){"use strict";function l(e){return e.each(function(e){var a=n-(i==="x"?t.left+t.right:t.top+t.bottom),l=i=="x"?"y":"x",c=d3.select(this);f=f||u;var h=c.selectAll("g.nv-distribution").data([e]),p=h.enter().append("g").attr("class","nvd3 nv-distribution"),d=p.append("g"),v=h.select("g");h.attr("transform","translate("+t.left+","+t.top+")");var m=v.selectAll("g.nv-dist").data(function(e){return e},function(e){return e.key});m.enter().append("g"),m.attr("class",function(e,t){return"nv-dist nv-series-"+t}).style("stroke",function(e,t){return o(e,t)});var g=m.selectAll("line.nv-dist"+i).data(function(e){return e.values});g.enter().append("line").attr(i+"1",function(e,t){return f(s(e,t))}).attr(i+"2",function(e,t){return f(s(e,t))}),m.exit().selectAll("line.nv-dist"+i).transition().attr(i+"1",function(e,t){return u(s(e,t))}).attr(i+"2",function(e,t){return u(s(e,t))}).style("stroke-opacity",0).remove(),g.attr("class",function(e,t){return"nv-dist"+i+" nv-dist"+i+"-"+t}).attr(l+"1",0).attr(l+"2",r),g.transition().attr(i+"1",function(e,t){return u(s(e,t))}).attr(i+"2",function(e,t){return u(s(e,t))}),f=u.copy()}),l}var t={top:0,right:0,bottom:0,left:0},n=400,r=8,i="x",s=function(e){return e[i]},o=e.utils.defaultColor(),u=d3.scale.linear(),a,f;return l.options=e.utils.optionsFunc.bind(l),l.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,l):t},l.width=function(e){return arguments.length?(n=e,l):n},l.axis=function(e){return arguments.length?(i=e,l):i},l.size=function(e){return arguments.length?(r=e,l):r},l.getData=function(e){return arguments.length?(s=d3.functor(e),l):s},l.scale=function(e){return arguments.length?(u=e,l):u},l.color=function(t){return arguments.length?(o=e.utils.getColor(t),l):o},l},e.models.historicalBar=function(){"use strict";function w(E){return E.each(function(w){var E=n-t.left-t.right,S=r-t.top-t.bottom,T=d3.select(this);s.domain(d||d3.extent(w[0].values.map(u).concat(f))),c?s.range(m||[E*.5/w[0].values.length,E*(w[0].values.length-.5)/w[0].values.length]):s.range(m||[0,E]),o.domain(v||d3.extent(w[0].values.map(a).concat(l))).range(g||[S,0]),s.domain()[0]===s.domain()[1]&&(s.domain()[0]?s.domain([s.domain()[0]-s.domain()[0]*.01,s.domain()[1]+s.domain()[1]*.01]):s.domain([-1,1])),o.domain()[0]===o.domain()[1]&&(o.domain()[0]?o.domain([o.domain()[0]+o.domain()[0]*.01,o.domain()[1]-o.domain()[1]*.01]):o.domain([-1,1]));var N=T.selectAll("g.nv-wrap.nv-historicalBar-"+i).data([w[0].values]),C=N.enter().append("g").attr("class","nvd3 nv-wrap nv-historicalBar-"+i),k=C.append("defs"),L=C.append("g"),A=N.select("g");L.append("g").attr("class","nv-bars"),N.attr("transform","translate("+t.left+","+t.top+")"),T.on("click",function(e,t){y.chartClick({data:e,index:t,pos:d3.event,id:i})}),k.append("clipPath").attr("id","nv-chart-clip-path-"+i).append("rect"),N.select("#nv-chart-clip-path-"+i+" rect").attr("width",E).attr("height",S),A.attr("clip-path",h?"url(#nv-chart-clip-path-"+i+")":"");var O=N.select(".nv-bars").selectAll(".nv-bar").data(function(e){return e},function(e,t){return u(e,t)});O.exit().remove();var M=O.enter().append("rect").attr("x",0).attr("y",function(t,n){return e.utils.NaNtoZero(o(Math.max(0,a(t,n))))}).attr("height",function(t,n){return e.utils.NaNtoZero(Math.abs(o(a(t,n))-o(0)))}).attr("transform",function(e,t){return"translate("+(s(u(e,t))-E/w[0].values.length*.45)+",0)"}).on("mouseover",function(e,t){if(!b)return;d3.select(this).classed("hover",!0),y.elementMouseover({point:e,series:w[0],pos:[s(u(e,t)),o(a(e,t))],pointIndex:t,seriesIndex:0,e:d3.event})}).on("mouseout",function(e,t){if(!b)return;d3.select(this).classed("hover",!1),y.elementMouseout({point:e,series:w[0],pointIndex:t,seriesIndex:0,e:d3.event})}).on("click",function(e,t){if(!b)return;y.elementClick({value:a(e,t),data:e,index:t,pos:[s(u(e,t)),o(a(e,t))],e:d3.event,id:i}),d3.event.stopPropagation()}).on("dblclick",function(e,t){if(!b)return;y.elementDblClick({value:a(e,t),data:e,index:t,pos:[s(u(e,t)),o(a(e,t))],e:d3.event,id:i}),d3.event.stopPropagation()});O.attr("fill",function(e,t){return p(e,t)}).attr("class",function(e,t,n){return(a(e,t)<0?"nv-bar negative":"nv-bar positive")+" nv-bar-"+n+"-"+t}).transition().attr("transform",function(e,t){return"translate("+(s(u(e,t))-E/w[0].values.length*.45)+",0)"}).attr("width",E/w[0].values.length*.9),O.transition().attr("y",function(t,n){var r=a(t,n)<0?o(0):o(0)-o(a(t,n))<1?o(0)-1:o(a(t,n));return e.utils.NaNtoZero(r)}).attr("height",function(t,n){return e.utils.NaNtoZero(Math.max(Math.abs(o(a(t,n))-o(0)),1))})}),w}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=Math.floor(Math.random()*1e4),s=d3.scale.linear(),o=d3.scale.linear(),u=function(e){return e.x},a=function(e){return e.y},f=[],l=[0],c=!1,h=!0,p=e.utils.defaultColor(),d,v,m,g,y=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),b=!0;return w.highlightPoint=function(e,t){d3.select(".nv-historicalBar-"+i).select(".nv-bars .nv-bar-0-"+e).classed("hover",t)},w.clearHighlights=function(){d3.select(".nv-historicalBar-"+i).select(".nv-bars .nv-bar.hover").classed("hover",!1)},w.dispatch=y,w.options=e.utils.optionsFunc.bind(w),w.x=function(e){return arguments.length?(u=e,w):u},w.y=function(e){return arguments.length?(a=e,w):a},w.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,w):t},w.width=function(e){return arguments.length?(n=e,w):n},w.height=function(e){return arguments.length?(r=e,w):r},w.xScale=function(e){return arguments.length?(s=e,w):s},w.yScale=function(e){return arguments.length?(o=e,w):o},w.xDomain=function(e){return arguments.length?(d=e,w):d},w.yDomain=function(e){return arguments.length?(v=e,w):v},w.xRange=function(e){return arguments.length?(m=e,w):m},w.yRange=function(e){return arguments.length?(g=e,w):g},w.forceX=function(e){return arguments.length?(f=e,w):f},w.forceY=function(e){return arguments.length?(l=e,w):l},w.padData=function(e){return arguments.length?(c=e,w):c},w.clipEdge=function(e){return arguments.length?(h=e,w):h},w.color=function(t){return arguments.length?(p=e.utils.getColor(t),w):p},w.id=function(e){return arguments.length?(i=e,w):i},w.interactive=function(e){return arguments.length?(b=!1,w):b},w},e.models.historicalBarChart=function(){"use strict";function x(e){return e.each(function(d){var T=d3.select(this),N=this,C=(u||parseInt(T.style("width"))||960)-s.left-s.right,k=(a||parseInt(T.style("height"))||400)-s.top-s.bottom;x.update=function(){T.transition().duration(E).call(x)},x.container=this,g.disabled=d.map(function(e){return!!e.disabled});if(!y){var L;y={};for(L in g)g[L]instanceof Array?y[L]=g[L].slice(0):y[L]=g[L]}if(!d||!d.length||!d.filter(function(e){return e.values.length}).length){var A=T.selectAll(".nv-noData").data([b]);return A.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),A.attr("x",s.left+C/2).attr("y",s.top+k/2).text(function(e){return e}),x}T.selectAll(".nv-noData").remove(),v=t.xScale(),m=t.yScale();var O=T.selectAll("g.nv-wrap.nv-historicalBarChart").data([d]),M=O.enter().append("g").attr("class","nvd3 nv-wrap nv-historicalBarChart").append("g"),_=O.select("g");M.append("g").attr("class","nv-x nv-axis"),M.append("g").attr("class","nv-y nv-axis"),M.append("g").attr("class","nv-barsWrap"),M.append("g").attr("class","nv-legendWrap"),f&&(i.width(C),_.select(".nv-legendWrap").datum(d).call(i),s.top!=i.height()&&(s.top=i.height(),k=(a||parseInt(T.style("height"))||400)-s.top-s.bottom),O.select(".nv-legendWrap").attr("transform","translate(0,"+ -s.top+")")),O.attr("transform","translate("+s.left+","+s.top+")"),h&&_.select(".nv-y.nv-axis").attr("transform","translate("+C+",0)"),t.width(C).height(k).color(d.map(function(e,t){return e.color||o(e,t)}).filter(function(e,t){return!d[t].disabled}));var D=_.select(".nv-barsWrap").datum(d.filter(function(e){return!e.disabled}));D.transition().call(t),l&&(n.scale(v).tickSize(-k,0),_.select(".nv-x.nv-axis").attr("transform","translate(0,"+m.range()[0]+")"),_.select(".nv-x.nv-axis").transition().call(n)),c&&(r.scale(m).ticks(k/36).tickSize(-C,0),_.select(".nv-y.nv-axis").transition().call(r)),i.dispatch.on("legendClick",function(t,n){t.disabled=!t.disabled,d.filter(function(e){return!e.disabled}).length||d.map(function(e){return e.disabled=!1,O.selectAll(".nv-series").classed("disabled",!1),e}),g.disabled=d.map(function(e){return!!e.disabled}),w.stateChange(g),e.transition().call(x)}),i.dispatch.on("legendDblclick",function(e){d.forEach(function(e){e.disabled=!0}),e.disabled=!1,g.disabled=d.map(function(e){return!!e.disabled}),w.stateChange(g),x.update()}),w.on("tooltipShow",function(e){p&&S(e,N.parentNode)}),w.on("changeState",function(e){typeof e.disabled!="undefined"&&(d.forEach(function(t,n){t.disabled=e.disabled[n]}),g.disabled=e.disabled),x.update()})}),x}var t=e.models.historicalBar(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s={top:30,right:90,bottom:50,left:90},o=e.utils.defaultColor(),u=null,a=null,f=!1,l=!0,c=!0,h=!1,p=!0,d=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},v,m,g={},y=null,b="No Data Available.",w=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),E=250;n.orient("bottom").tickPadding(7),r.orient(h?"right":"left");var S=function(i,s){if(s){var o=d3.select(s).select("svg"),u=o.node()?o.attr("viewBox"):null;if(u){u=u.split(" ");var a=parseInt(o.style("width"))/u[2];i.pos[0]=i.pos[0]*a,i.pos[1]=i.pos[1]*a}}var f=i.pos[0]+(s.offsetLeft||0),l=i.pos[1]+(s.offsetTop||0),c=n.tickFormat()(t.x()(i.point,i.pointIndex)),h=r.tickFormat()(t.y()(i.point,i.pointIndex)),p=d(i.series.key,c,h,i,x);e.tooltip.show([f,l],p,null,null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+s.left,e.pos[1]+s.top],w.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){w.tooltipHide(e)}),w.on("tooltipHide",function(){p&&e.tooltip.cleanup()}),x.dispatch=w,x.bars=t,x.legend=i,x.xAxis=n,x.yAxis=r,d3.rebind(x,t,"defined","isArea","x","y","size","xScale","yScale","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","id","interpolate","highlightPoint","clearHighlights","interactive"),x.options=e.utils.optionsFunc.bind(x),x.margin=function(e){return arguments.length?(s.top=typeof e.top!="undefined"?e.top:s.top,s.right=typeof e.right!="undefined"?e.right:s.right,s.bottom=typeof e.bottom!="undefined"?e.bottom:s.bottom,s.left=typeof e.left!="undefined"?e.left:s.left,x):s},x.width=function(e){return arguments.length?(u=e,x):u},x.height=function(e){return arguments.length?(a=e,x):a},x.color=function(t){return arguments.length?(o=e.utils.getColor(t),i.color(o),x):o},x.showLegend=function(e){return arguments.length?(f=e,x):f},x.showXAxis=function(e){return arguments.length?(l=e,x):l},x.showYAxis=function(e){return arguments.length?(c=e,x):c},x.rightAlignYAxis=function(e){return arguments.length?(h=e,r.orient(e?"right":"left"),x):h},x.tooltips=function(e){return arguments.length?(p=e,x):p},x.tooltipContent=function(e){return arguments.length?(d=e,x):d},x.state=function(e){return arguments.length?(g=e,x):g},x.defaultState=function(e){return arguments.length?(y=e,x):y},x.noData=function(e){return arguments.length?(b=e,x):b},x.transitionDuration=function(e){return arguments.length?(E=e,x):E},x},e.models.indentedTree=function(){"use strict";function g(e){return e.each(function(e){function k(e,t,n){d3.event.stopPropagation();if(d3.event.shiftKey&&!n)return d3.event.shiftKey=!1,e.values&&e.values.forEach(function(e){(e.values||e._values)&&k(e,0,!0)}),!0;if(!O(e))return!0;e.values?(e._values=e.values,e.values=null):(e.values=e._values,e._values=null),g.update()}function L(e){return e._values&&e._values.length?h:e.values&&e.values.length?p:""}function A(e){return e._values&&e._values.length}function O(e){var t=e.values||e._values;return t&&t.length}var t=1,n=d3.select(this),i=d3.layout.tree().children(function(e){return e.values}).size([r,f]);g.update=function(){n.transition().duration(600).call(g)},e[0]||(e[0]={key:a});var s=i.nodes(e[0]),y=d3.select(this).selectAll("div").data([[s]]),b=y.enter().append("div").attr("class","nvd3 nv-wrap nv-indentedtree"),w=b.append("table"),E=y.select("table").attr("width","100%").attr("class",c);if(o){var S=w.append("thead"),x=S.append("tr");l.forEach(function(e){x.append("th").attr("width",e.width?e.width:"10%").style("text-align",e.type=="numeric"?"right":"left").append("span").text(e.label)})}var T=E.selectAll("tbody").data(function(e){return e});T.enter().append("tbody"),t=d3.max(s,function(e){return e.depth}),i.size([r,t*f]);var N=T.selectAll("tr").data(function(e){return e.filter(function(e){return u&&!e.children?u(e):!0})},function(e,t){return e.id||e.id||++m});N.exit().remove(),N.select("img.nv-treeicon").attr("src",L).classed("folded",A);var C=N.enter().append("tr");l.forEach(function(e,t){var n=C.append("td").style("padding-left",function(e){return(t?0:e.depth*f+12+(L(e)?0:16))+"px"},"important").style("text-align",e.type=="numeric"?"right":"left");t==0&&n.append("img").classed("nv-treeicon",!0).classed("nv-folded",A).attr("src",L).style("width","14px").style("height","14px").style("padding","0 1px").style("display",function(e){return L(e)?"inline-block":"none"}).on("click",k),n.each(function(n){!t&&v(n)?d3.select(this).append("a").attr("href",v).attr("class",d3.functor(e.classes)).append("span"):d3.select(this).append("span"),d3.select(this).select("span").attr("class",d3.functor(e.classes)).text(function(t){return e.format?e.format(t):t[e.key]||"-"})}),e.showCount&&(n.append("span").attr("class","nv-childrenCount"),N.selectAll("span.nv-childrenCount").text(function(e){return e.values&&e.values.length||e._values&&e._values.length?"("+(e.values&&e.values.filter(function(e){return u?u(e):!0}).length||e._values&&e._values.filter(function(e){return u?u(e):!0}).length||0)+")":""}))}),N.order().on("click",function(e){d.elementClick({row:this,data:e,pos:[e.x,e.y]})}).on("dblclick",function(e){d.elementDblclick({row:this,data:e,pos:[e.x,e.y]})}).on("mouseover",function(e){d.elementMouseover({row:this,data:e,pos:[e.x,e.y]})}).on("mouseout",function(e){d.elementMouseout({row:this,data:e,pos:[e.x,e.y]})})}),g}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=e.utils.defaultColor(),s=Math.floor(Math.random()*1e4),o=!0,u=!1,a="No Data Available.",f=20,l=[{key:"key",label:"Name",type:"text"}],c=null,h="images/grey-plus.png",p="images/grey-minus.png",d=d3.dispatch("elementClick","elementDblclick","elementMouseover","elementMouseout"),v=function(e){return e.url},m=0;return g.options=e.utils.optionsFunc.bind(g),g.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,g):t},g.width=function(e){return arguments.length?(n=e,g):n},g.height=function(e){return arguments.length?(r=e,g):r},g.color=function(t){return arguments.length?(i=e.utils.getColor(t),scatter.color(i),g):i},g.id=function(e){return arguments.length?(s=e,g):s},g.header=function(e){return arguments.length?(o=e,g):o},g.noData=function(e){return arguments.length?(a=e,g):a},g.filterZero=function(e){return arguments.length?(u=e,g):u},g.columns=function(e){return arguments.length?(l=e,g):l},g.tableClass=function(e){return arguments.length?(c=e,g):c},g.iconOpen=function(e){return arguments.length?(h=e,g):h},g.iconClose=function(e){return arguments.length?(p=e,g):p},g.getUrl=function(e){return arguments.length?(v=e,g):v},g},e.models.legend=function(){"use strict";function c(h){return h.each(function(c){var h=n-t.left-t.right,p=d3.select(this),d=p.selectAll("g.nv-legend").data([c]),v=d.enter().append("g").attr("class","nvd3 nv-legend").append("g"),m=d.select("g");d.attr("transform","translate("+t.left+","+t.top+")");var g=m.selectAll(".nv-series").data(function(e){return e}),y=g.enter().append("g").attr("class","nv-series").on("mouseover",function(e,t){l.legendMouseover(e,t)}).on("mouseout",function(e,t){l.legendMouseout(e,t)}).on("click",function(e,t){l.legendClick(e,t),a&&(f?(c.forEach(function(e){e.disabled=!0}),e.disabled=!1):(e.disabled=!e.disabled,c.every(function(e){return e.disabled})&&c.forEach(function(e){e.disabled=!1})),l.stateChange({disabled:c.map(function(e){return!!e.disabled})}))}).on("dblclick",function(e,t){l.legendDblclick(e,t),a&&(c.forEach(function(e){e.disabled=!0}),e.disabled=!1,l.stateChange({disabled:c.map(function(e){return!!e.disabled})}))});y.append("circle").style("stroke-width",2).attr("class","nv-legend-symbol").attr("r",5),y.append("text").attr("text-anchor","start").attr("class","nv-legend-text").attr("dy",".32em").attr("dx","8"),g.classed("disabled",function(e){return e.disabled}),g.exit().remove(),g.select("circle").style("fill",function(e,t){return e.color||s(e,t)}).style("stroke",function(e,t){return e.color||s(e,t)}),g.select("text").text(i);if(o){var b=[];g.each(function(t,n){var r=d3.select(this).select("text"),i;try{i=r.getComputedTextLength();if(i<=0)throw Error()}catch(s){i=e.utils.calcApproxTextWidth(r)}b.push(i+28)});var w=0,E=0,S=[];while(E<h&&w<b.length)S[w]=b[w],E+=b[w++];w===0&&(w=1);while(E>h&&w>1){S=[],w--;for(var x=0;x<b.length;x++)b[x]>(S[x%w]||0)&&(S[x%w]=b[x]);E=S.reduce(function(e,t,n,r){return e+t})}var T=[];for(var N=0,C=0;N<w;N++)T[N]=C,C+=S[N];g.attr("transform",function(e,t){return"translate("+T[t%w]+","+(5+Math.floor(t/w)*20)+")"}),u?m.attr("transform","translate("+(n-t.right-E)+","+t.top+")"):m.attr("transform","translate(0,"+t.top+")"),r=t.top+t.bottom+Math.ceil(b.length/w)*20}else{var k=5,L=5,A=0,O;g.attr("transform",function(e,r){var i=d3.select(this).select("text").node().getComputedTextLength()+28;return O=L,n<t.left+t.right+O+i&&(L=O=5,k+=20),L+=i,L>A&&(A=L),"translate("+O+","+k+")"}),m.attr("transform","translate("+(n-t.right-A)+","+t.top+")"),r=t.top+t.bottom+k+15}}),c}var t={top:5,right:0,bottom:5,left:0},n=400,r=20,i=function(e){return e.key},s=e.utils.defaultColor(),o=!0,u=!0,a=!0,f=!1,l=d3.dispatch("legendClick","legendDblclick","legendMouseover","legendMouseout","stateChange");return c.dispatch=l,c.options=e.utils.optionsFunc.bind(c),c.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,c):t},c.width=function(e){return arguments.length?(n=e,c):n},c.height=function(e){return arguments.length?(r=e,c):r},c.key=function(e){return arguments.length?(i=e,c):i},c.color=function(t){return arguments.length?(s=e.utils.getColor(t),c):s},c.align=function(e){return arguments.length?(o=e,c):o},c.rightAlign=function(e){return arguments.length?(u=e,c):u},c.updateState=function(e){return arguments.length?(a=e,c):a},c.radioButtonMode=function(e){return arguments.length?(f=e,c):f},c},e.models.line=function(){"use strict";function m(g){return g.each(function(m){var g=r-n.left-n.right,b=i-n.top-n.bottom,w=d3.select(this);c=t.xScale(),h=t.yScale(),d=d||c,v=v||h;var E=w.selectAll("g.nv-wrap.nv-line").data([m]),S=E.enter().append("g").attr("class","nvd3 nv-wrap nv-line"),T=S.append("defs"),N=S.append("g"),C=E.select("g");N.append("g").attr("class","nv-groups"),N.append("g").attr("class","nv-scatterWrap"),E.attr("transform","translate("+n.left+","+n.top+")"),t.width(g).height(b);var k=E.select(".nv-scatterWrap");k.transition().call(t),T.append("clipPath").attr("id","nv-edge-clip-"+t.id()).append("rect"),E.select("#nv-edge-clip-"+t.id()+" rect").attr("width",g).attr("height",b),C.attr("clip-path",l?"url(#nv-edge-clip-"+t.id()+")":""),k.attr("clip-path",l?"url(#nv-edge-clip-"+t.id()+")":"");var L=E.select(".nv-groups").selectAll(".nv-group").data(function(e){return e},function(e){return e.key});L.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),L.exit().remove(),L.attr("class",function(e,t){return"nv-group nv-series-"+t}).classed("hover",function(e){return e.hover}).style("fill",function(e,t){return s(e,t)}).style("stroke",function(e,t){return s(e,t)}),L.transition().style("stroke-opacity",1).style("fill-opacity",.5);var A=L.selectAll("path.nv-area").data(function(e){return f(e)?[e]:[]});A.enter().append("path").attr("class","nv-area").attr("d",function(t){return d3.svg.area().interpolate(p).defined(a).x(function(t,n){return e.
utils.NaNtoZero(d(o(t,n)))}).y0(function(t,n){return e.utils.NaNtoZero(v(u(t,n)))}).y1(function(e,t){return v(h.domain()[0]<=0?h.domain()[1]>=0?0:h.domain()[1]:h.domain()[0])}).apply(this,[t.values])}),L.exit().selectAll("path.nv-area").remove(),A.transition().attr("d",function(t){return d3.svg.area().interpolate(p).defined(a).x(function(t,n){return e.utils.NaNtoZero(c(o(t,n)))}).y0(function(t,n){return e.utils.NaNtoZero(h(u(t,n)))}).y1(function(e,t){return h(h.domain()[0]<=0?h.domain()[1]>=0?0:h.domain()[1]:h.domain()[0])}).apply(this,[t.values])});var O=L.selectAll("path.nv-line").data(function(e){return[e.values]});O.enter().append("path").attr("class","nv-line").attr("d",d3.svg.line().interpolate(p).defined(a).x(function(t,n){return e.utils.NaNtoZero(d(o(t,n)))}).y(function(t,n){return e.utils.NaNtoZero(v(u(t,n)))})),O.transition().attr("d",d3.svg.line().interpolate(p).defined(a).x(function(t,n){return e.utils.NaNtoZero(c(o(t,n)))}).y(function(t,n){return e.utils.NaNtoZero(h(u(t,n)))})),d=c.copy(),v=h.copy()}),m}var t=e.models.scatter(),n={top:0,right:0,bottom:0,left:0},r=960,i=500,s=e.utils.defaultColor(),o=function(e){return e.x},u=function(e){return e.y},a=function(e,t){return!isNaN(u(e,t))&&u(e,t)!==null},f=function(e){return e.area},l=!1,c,h,p="linear";t.size(16).sizeDomain([16,256]);var d,v;return m.dispatch=t.dispatch,m.scatter=t,d3.rebind(m,t,"id","interactive","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","forceX","forceY","forceSize","clipVoronoi","useVoronoi","clipRadius","padData","highlightPoint","clearHighlights"),m.options=e.utils.optionsFunc.bind(m),m.margin=function(e){return arguments.length?(n.top=typeof e.top!="undefined"?e.top:n.top,n.right=typeof e.right!="undefined"?e.right:n.right,n.bottom=typeof e.bottom!="undefined"?e.bottom:n.bottom,n.left=typeof e.left!="undefined"?e.left:n.left,m):n},m.width=function(e){return arguments.length?(r=e,m):r},m.height=function(e){return arguments.length?(i=e,m):i},m.x=function(e){return arguments.length?(o=e,t.x(e),m):o},m.y=function(e){return arguments.length?(u=e,t.y(e),m):u},m.clipEdge=function(e){return arguments.length?(l=e,m):l},m.color=function(n){return arguments.length?(s=e.utils.getColor(n),t.color(s),m):s},m.interpolate=function(e){return arguments.length?(p=e,m):p},m.defined=function(e){return arguments.length?(a=e,m):a},m.isArea=function(e){return arguments.length?(f=d3.functor(e),m):f},m},e.models.lineChart=function(){"use strict";function N(m){return m.each(function(m){var C=d3.select(this),k=this,L=(a||parseInt(C.style("width"))||960)-o.left-o.right,A=(f||parseInt(C.style("height"))||400)-o.top-o.bottom;N.update=function(){C.transition().duration(x).call(N)},N.container=this,b.disabled=m.map(function(e){return!!e.disabled});if(!w){var O;w={};for(O in b)b[O]instanceof Array?w[O]=b[O].slice(0):w[O]=b[O]}if(!m||!m.length||!m.filter(function(e){return e.values.length}).length){var M=C.selectAll(".nv-noData").data([E]);return M.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),M.attr("x",o.left+L/2).attr("y",o.top+A/2).text(function(e){return e}),N}C.selectAll(".nv-noData").remove(),g=t.xScale(),y=t.yScale();var _=C.selectAll("g.nv-wrap.nv-lineChart").data([m]),D=_.enter().append("g").attr("class","nvd3 nv-wrap nv-lineChart").append("g"),P=_.select("g");D.append("rect").style("opacity",0),D.append("g").attr("class","nv-x nv-axis"),D.append("g").attr("class","nv-y nv-axis"),D.append("g").attr("class","nv-linesWrap"),D.append("g").attr("class","nv-legendWrap"),D.append("g").attr("class","nv-interactive"),P.select("rect").attr("width",L).attr("height",A>0?A:0),l&&(i.width(L),P.select(".nv-legendWrap").datum(m).call(i),o.top!=i.height()&&(o.top=i.height(),A=(f||parseInt(C.style("height"))||400)-o.top-o.bottom),_.select(".nv-legendWrap").attr("transform","translate(0,"+ -o.top+")")),_.attr("transform","translate("+o.left+","+o.top+")"),p&&P.select(".nv-y.nv-axis").attr("transform","translate("+L+",0)"),d&&(s.width(L).height(A).margin({left:o.left,top:o.top}).svgContainer(C).xScale(g),_.select(".nv-interactive").call(s)),t.width(L).height(A).color(m.map(function(e,t){return e.color||u(e,t)}).filter(function(e,t){return!m[t].disabled}));var H=P.select(".nv-linesWrap").datum(m.filter(function(e){return!e.disabled}));H.transition().call(t),c&&(n.scale(g).ticks(L/100).tickSize(-A,0),P.select(".nv-x.nv-axis").attr("transform","translate(0,"+y.range()[0]+")"),P.select(".nv-x.nv-axis").transition().call(n)),h&&(r.scale(y).ticks(A/36).tickSize(-L,0),P.select(".nv-y.nv-axis").transition().call(r)),i.dispatch.on("stateChange",function(e){b=e,S.stateChange(b),N.update()}),s.dispatch.on("elementMousemove",function(i){t.clearHighlights();var a,f,l,c=[];m.filter(function(e,t){return e.seriesIndex=t,!e.disabled}).forEach(function(n,r){f=e.interactiveBisect(n.values,i.pointXValue,N.x()),t.highlightPoint(r,f,!0);var s=n.values[f];if(typeof s=="undefined")return;typeof a=="undefined"&&(a=s),typeof l=="undefined"&&(l=N.xScale()(N.x()(s,f))),c.push({key:n.key,value:N.y()(s,f),color:u(n,n.seriesIndex)})});if(c.length>2){var h=N.yScale().invert(i.mouseY),p=Math.abs(N.yScale().domain()[0]-N.yScale().domain()[1]),d=.03*p,g=e.nearestValueIndex(c.map(function(e){return e.value}),h,d);g!==null&&(c[g].highlight=!0)}var y=n.tickFormat()(N.x()(a,f));s.tooltip.position({left:l+o.left,top:i.mouseY+o.top}).chartContainer(k.parentNode).enabled(v).valueFormatter(function(e,t){return r.tickFormat()(e)}).data({value:y,series:c})(),s.renderGuideLine(l)}),s.dispatch.on("elementMouseout",function(e){S.tooltipHide(),t.clearHighlights()}),S.on("tooltipShow",function(e){v&&T(e,k.parentNode)}),S.on("changeState",function(e){typeof e.disabled!="undefined"&&m.length===e.disabled.length&&(m.forEach(function(t,n){t.disabled=e.disabled[n]}),b.disabled=e.disabled),N.update()})}),N}var t=e.models.line(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s=e.interactiveGuideline(),o={top:30,right:20,bottom:50,left:60},u=e.utils.defaultColor(),a=null,f=null,l=!0,c=!0,h=!0,p=!1,d=!1,v=!0,m=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},g,y,b={},w=null,E="No Data Available.",S=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),x=250;n.orient("bottom").tickPadding(7),r.orient(p?"right":"left");var T=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),a=n.tickFormat()(t.x()(i.point,i.pointIndex)),f=r.tickFormat()(t.y()(i.point,i.pointIndex)),l=m(i.series.key,a,f,i,N);e.tooltip.show([o,u],l,null,null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+o.left,e.pos[1]+o.top],S.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){S.tooltipHide(e)}),S.on("tooltipHide",function(){v&&e.tooltip.cleanup()}),N.dispatch=S,N.lines=t,N.legend=i,N.xAxis=n,N.yAxis=r,N.interactiveLayer=s,d3.rebind(N,t,"defined","isArea","x","y","size","xScale","yScale","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","useVoronoi","id","interpolate"),N.options=e.utils.optionsFunc.bind(N),N.margin=function(e){return arguments.length?(o.top=typeof e.top!="undefined"?e.top:o.top,o.right=typeof e.right!="undefined"?e.right:o.right,o.bottom=typeof e.bottom!="undefined"?e.bottom:o.bottom,o.left=typeof e.left!="undefined"?e.left:o.left,N):o},N.width=function(e){return arguments.length?(a=e,N):a},N.height=function(e){return arguments.length?(f=e,N):f},N.color=function(t){return arguments.length?(u=e.utils.getColor(t),i.color(u),N):u},N.showLegend=function(e){return arguments.length?(l=e,N):l},N.showXAxis=function(e){return arguments.length?(c=e,N):c},N.showYAxis=function(e){return arguments.length?(h=e,N):h},N.rightAlignYAxis=function(e){return arguments.length?(p=e,r.orient(e?"right":"left"),N):p},N.useInteractiveGuideline=function(e){return arguments.length?(d=e,e===!0&&(N.interactive(!1),N.useVoronoi(!1)),N):d},N.tooltips=function(e){return arguments.length?(v=e,N):v},N.tooltipContent=function(e){return arguments.length?(m=e,N):m},N.state=function(e){return arguments.length?(b=e,N):b},N.defaultState=function(e){return arguments.length?(w=e,N):w},N.noData=function(e){return arguments.length?(E=e,N):E},N.transitionDuration=function(e){return arguments.length?(x=e,N):x},N},e.models.linePlusBarChart=function(){"use strict";function T(e){return e.each(function(e){var l=d3.select(this),c=this,v=(a||parseInt(l.style("width"))||960)-u.left-u.right,N=(f||parseInt(l.style("height"))||400)-u.top-u.bottom;T.update=function(){l.transition().call(T)},b.disabled=e.map(function(e){return!!e.disabled});if(!w){var C;w={};for(C in b)b[C]instanceof Array?w[C]=b[C].slice(0):w[C]=b[C]}if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var k=l.selectAll(".nv-noData").data([E]);return k.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),k.attr("x",u.left+v/2).attr("y",u.top+N/2).text(function(e){return e}),T}l.selectAll(".nv-noData").remove();var L=e.filter(function(e){return!e.disabled&&e.bar}),A=e.filter(function(e){return!e.bar});m=A.filter(function(e){return!e.disabled}).length&&A.filter(function(e){return!e.disabled})[0].values.length?t.xScale():n.xScale(),g=n.yScale(),y=t.yScale();var O=d3.select(this).selectAll("g.nv-wrap.nv-linePlusBar").data([e]),M=O.enter().append("g").attr("class","nvd3 nv-wrap nv-linePlusBar").append("g"),_=O.select("g");M.append("g").attr("class","nv-x nv-axis"),M.append("g").attr("class","nv-y1 nv-axis"),M.append("g").attr("class","nv-y2 nv-axis"),M.append("g").attr("class","nv-barsWrap"),M.append("g").attr("class","nv-linesWrap"),M.append("g").attr("class","nv-legendWrap"),p&&(o.width(v/2),_.select(".nv-legendWrap").datum(e.map(function(e){return e.originalKey=e.originalKey===undefined?e.key:e.originalKey,e.key=e.originalKey+(e.bar?" (left axis)":" (right axis)"),e})).call(o),u.top!=o.height()&&(u.top=o.height(),N=(f||parseInt(l.style("height"))||400)-u.top-u.bottom),_.select(".nv-legendWrap").attr("transform","translate("+v/2+","+ -u.top+")")),O.attr("transform","translate("+u.left+","+u.top+")"),t.width(v).height(N).color(e.map(function(e,t){return e.color||h(e,t)}).filter(function(t,n){return!e[n].disabled&&!e[n].bar})),n.width(v).height(N).color(e.map(function(e,t){return e.color||h(e,t)}).filter(function(t,n){return!e[n].disabled&&e[n].bar}));var D=_.select(".nv-barsWrap").datum(L.length?L:[{values:[]}]),P=_.select(".nv-linesWrap").datum(A[0]&&!A[0].disabled?A:[{values:[]}]);d3.transition(D).call(n),d3.transition(P).call(t),r.scale(m).ticks(v/100).tickSize(-N,0),_.select(".nv-x.nv-axis").attr("transform","translate(0,"+g.range()[0]+")"),d3.transition(_.select(".nv-x.nv-axis")).call(r),i.scale(g).ticks(N/36).tickSize(-v,0),d3.transition(_.select(".nv-y1.nv-axis")).style("opacity",L.length?1:0).call(i),s.scale(y).ticks(N/36).tickSize(L.length?0:-v,0),_.select(".nv-y2.nv-axis").style("opacity",A.length?1:0).attr("transform","translate("+v+",0)"),d3.transition(_.select(".nv-y2.nv-axis")).call(s),o.dispatch.on("stateChange",function(e){b=e,S.stateChange(b),T.update()}),S.on("tooltipShow",function(e){d&&x(e,c.parentNode)}),S.on("changeState",function(t){typeof t.disabled!="undefined"&&(e.forEach(function(e,n){e.disabled=t.disabled[n]}),b.disabled=t.disabled),T.update()})}),T}var t=e.models.line(),n=e.models.historicalBar(),r=e.models.axis(),i=e.models.axis(),s=e.models.axis(),o=e.models.legend(),u={top:30,right:60,bottom:50,left:60},a=null,f=null,l=function(e){return e.x},c=function(e){return e.y},h=e.utils.defaultColor(),p=!0,d=!0,v=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},m,g,y,b={},w=null,E="No Data Available.",S=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState");n.padData(!0),t.clipEdge(!1).padData(!0),r.orient("bottom").tickPadding(7).highlightZero(!1),i.orient("left"),s.orient("right");var x=function(n,o){var u=n.pos[0]+(o.offsetLeft||0),a=n.pos[1]+(o.offsetTop||0),f=r.tickFormat()(t.x()(n.point,n.pointIndex)),l=(n.series.bar?i:s).tickFormat()(t.y()(n.point,n.pointIndex)),c=v(n.series.key,f,l,n,T);e.tooltip.show([u,a],c,n.value<0?"n":"s",null,o)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+u.left,e.pos[1]+u.top],S.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){S.tooltipHide(e)}),n.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+u.left,e.pos[1]+u.top],S.tooltipShow(e)}),n.dispatch.on("elementMouseout.tooltip",function(e){S.tooltipHide(e)}),S.on("tooltipHide",function(){d&&e.tooltip.cleanup()}),T.dispatch=S,T.legend=o,T.lines=t,T.bars=n,T.xAxis=r,T.y1Axis=i,T.y2Axis=s,d3.rebind(T,t,"defined","size","clipVoronoi","interpolate"),T.options=e.utils.optionsFunc.bind(T),T.x=function(e){return arguments.length?(l=e,t.x(e),n.x(e),T):l},T.y=function(e){return arguments.length?(c=e,t.y(e),n.y(e),T):c},T.margin=function(e){return arguments.length?(u.top=typeof e.top!="undefined"?e.top:u.top,u.right=typeof e.right!="undefined"?e.right:u.right,u.bottom=typeof e.bottom!="undefined"?e.bottom:u.bottom,u.left=typeof e.left!="undefined"?e.left:u.left,T):u},T.width=function(e){return arguments.length?(a=e,T):a},T.height=function(e){return arguments.length?(f=e,T):f},T.color=function(t){return arguments.length?(h=e.utils.getColor(t),o.color(h),T):h},T.showLegend=function(e){return arguments.length?(p=e,T):p},T.tooltips=function(e){return arguments.length?(d=e,T):d},T.tooltipContent=function(e){return arguments.length?(v=e,T):v},T.state=function(e){return arguments.length?(b=e,T):b},T.defaultState=function(e){return arguments.length?(w=e,T):w},T.noData=function(e){return arguments.length?(E=e,T):E},T},e.models.lineWithFocusChart=function(){"use strict";function k(e){return e.each(function(e){function U(e){var t=+(e=="e"),n=t?1:-1,r=M/3;return"M"+.5*n+","+r+"A6,6 0 0 "+t+" "+6.5*n+","+(r+6)+"V"+(2*r-6)+"A6,6 0 0 "+t+" "+.5*n+","+2*r+"Z"+"M"+2.5*n+","+(r+8)+"V"+(2*r-8)+"M"+4.5*n+","+(r+8)+"V"+(2*r-8)}function z(){a.empty()||a.extent(w),I.data([a.empty()?g.domain():w]).each(function(e,t){var n=g(e[0])-v.range()[0],r=v.range()[1]-g(e[1]);d3.select(this).select(".left").attr("width",n<0?0:n),d3.select(this).select(".right").attr("x",g(e[1])).attr("width",r<0?0:r)})}function W(){w=a.empty()?null:a.extent();var n=a.empty()?g.domain():a.extent();if(Math.abs(n[0]-n[1])<=1)return;T.brush({extent:n,brush:a}),z();var s=H.select(".nv-focus .nv-linesWrap").datum(e.filter(function(e){return!e.disabled}).map(function(e,r){return{key:e.key,values:e.values.filter(function(e,r){return t.x()(e,r)>=n[0]&&t.x()(e,r)<=n[1]})}}));s.transition().duration(N).call(t),H.select(".nv-focus .nv-x.nv-axis").transition().duration(N).call(r),H.select(".nv-focus .nv-y.nv-axis").transition().duration(N).call(i)}var S=d3.select(this),L=this,A=(h||parseInt(S.style("width"))||960)-f.left-f.right,O=(p||parseInt(S.style("height"))||400)-f.top-f.bottom-d,M=d-l.top-l.bottom;k.update=function(){S.transition().duration(N).call(k)},k.container=this;if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var _=S.selectAll(".nv-noData").data([x]);return _.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),_.attr("x",f.left+A/2).attr("y",f.top+O/2).text(function(e){return e}),k}S.selectAll(".nv-noData").remove(),v=t.xScale(),m=t.yScale(),g=n.xScale(),y=n.yScale();var D=S.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([e]),P=D.enter().append("g").attr("class","nvd3 nv-wrap nv-lineWithFocusChart").append("g"),H=D.select("g");P.append("g").attr("class","nv-legendWrap");var B=P.append("g").attr("class","nv-focus");B.append("g").attr("class","nv-x nv-axis"),B.append("g").attr("class","nv-y nv-axis"),B.append("g").attr("class","nv-linesWrap");var j=P.append("g").attr("class","nv-context");j.append("g").attr("class","nv-x nv-axis"),j.append("g").attr("class","nv-y nv-axis"),j.append("g").attr("class","nv-linesWrap"),j.append("g").attr("class","nv-brushBackground"),j.append("g").attr("class","nv-x nv-brush"),b&&(u.width(A),H.select(".nv-legendWrap").datum(e).call(u),f.top!=u.height()&&(f.top=u.height(),O=(p||parseInt(S.style("height"))||400)-f.top-f.bottom-d),H.select(".nv-legendWrap").attr("transform","translate(0,"+ -f.top+")")),D.attr("transform","translate("+f.left+","+f.top+")"),t.width(A).height(O).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),n.defined(t.defined()).width(A).height(M).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),H.select(".nv-context").attr("transform","translate(0,"+(O+f.bottom+l.top)+")");var F=H.select(".nv-context .nv-linesWrap").datum(e.filter(function(e){return!e.disabled}));d3.transition(F).call(n),r.scale(v).ticks(A/100).tickSize(-O,0),i.scale(m).ticks(O/36).tickSize(-A,0),H.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+O+")"),a.x(g).on("brush",function(){var e=k.transitionDuration();k.transitionDuration(0),W(),k.transitionDuration(e)}),w&&a.extent(w);var I=H.select(".nv-brushBackground").selectAll("g").data([w||a.extent()]),q=I.enter().append("g");q.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",M),q.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",M);var R=H.select(".nv-x.nv-brush").call(a);R.selectAll("rect").attr("height",M),R.selectAll(".resize").append("path").attr("d",U),W(),s.scale(g).ticks(A/100).tickSize(-M,0),H.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+y.range()[0]+")"),d3.transition(H.select(".nv-context .nv-x.nv-axis")).call(s),o.scale(y).ticks(M/36).tickSize(-A,0),d3.transition(H.select(".nv-context .nv-y.nv-axis")).call(o),H.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+y.range()[0]+")"),u.dispatch.on("stateChange",function(e){k.update()}),T.on("tooltipShow",function(e){E&&C(e,L.parentNode)})}),k}var t=e.models.line(),n=e.models.line(),r=e.models.axis(),i=e.models.axis(),s=e.models.axis(),o=e.models.axis(),u=e.models.legend(),a=d3.svg.brush(),f={top:30,right:30,bottom:30,left:60},l={top:0,right:30,bottom:20,left:60},c=e.utils.defaultColor(),h=null,p=null,d=100,v,m,g,y,b=!0,w=null,E=!0,S=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},x="No Data Available.",T=d3.dispatch("tooltipShow","tooltipHide","brush"),N=250;t.clipEdge(!0),n.interactive(!1),r.orient("bottom").tickPadding(5),i.orient("left"),s.orient("bottom").tickPadding(5),o.orient("left");var C=function(n,s){var o=n.pos[0]+(s.offsetLeft||0),u=n.pos[1]+(s.offsetTop||0),a=r.tickFormat()(t.x()(n.point,n.pointIndex)),f=i.tickFormat()(t.y()(n.point,n.pointIndex)),l=S(n.series.key,a,f,n,k);e.tooltip.show([o,u],l,null,null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+f.left,e.pos[1]+f.top],T.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),T.on("tooltipHide",function(){E&&e.tooltip.cleanup()}),k.dispatch=T,k.legend=u,k.lines=t,k.lines2=n,k.xAxis=r,k.yAxis=i,k.x2Axis=s,k.y2Axis=o,d3.rebind(k,t,"defined","isArea","size","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","id"),k.options=e.utils.optionsFunc.bind(k),k.x=function(e){return arguments.length?(t.x(e),n.x(e),k):t.x},k.y=function(e){return arguments.length?(t.y(e),n.y(e),k):t.y},k.margin=function(e){return arguments.length?(f.top=typeof e.top!="undefined"?e.top:f.top,f.right=typeof e.right!="undefined"?e.right:f.right,f.bottom=typeof e.bottom!="undefined"?e.bottom:f.bottom,f.left=typeof e.left!="undefined"?e.left:f.left,k):f},k.margin2=function(e){return arguments.length?(l=e,k):l},k.width=function(e){return arguments.length?(h=e,k):h},k.height=function(e){return arguments.length?(p=e,k):p},k.height2=function(e){return arguments.length?(d=e,k):d},k.color=function(t){return arguments.length?(c=e.utils.getColor(t),u.color(c),k):c},k.showLegend=function(e){return arguments.length?(b=e,k):b},k.tooltips=function(e){return arguments.length?(E=e,k):E},k.tooltipContent=function(e){return arguments.length?(S=e,k):S},k.interpolate=function(e){return arguments.length?(t.interpolate(e),n.interpolate(e),k):t.interpolate()},k.noData=function(e){return arguments.length?(x=e,k):x},k.xTickFormat=function(e){return arguments.length?(r.tickFormat(e),s.tickFormat(e),k):r.tickFormat()},k.yTickFormat=function(e){return arguments.length?(i.tickFormat(e),o.tickFormat(e),k):i.tickFormat()},k.brushExtent=function(e){return arguments.length?(w=e,k):w},k.transitionDuration=function(e){return arguments.length?(N=e,k):N},k},e.models.linePlusBarWithFocusChart=function(){"use strict";function B(e){return e.each(function(e){function nt(e){var t=+(e=="e"),n=t?1:-1,r=q/3;return"M"+.5*n+","+r+"A6,6 0 0 "+t+" "+6.5*n+","+(r+6)+"V"+(2*r-6)+"A6,6 0 0 "+t+" "+.5*n+","+2*r+"Z"+"M"+2.5*n+","+(r+8)+"V"+(2*r-8)+"M"+4.5*n+","+(r+8)+"V"+(2*r-8)}function rt(){h.empty()||h.extent(x),Z.data([h.empty()?k.domain():x]).each(function(e,t){var n=k(e[0])-k.range()[0],r=k.range()[1]-k(e[1]);d3.select(this).select(".left").attr("width",n<0?0:n),d3.select(this).select(".right").attr("x",k(e[1])).attr("width",r<0?0:r)})}function it(){x=h.empty()?null:h.extent(),S=h.empty()?k.domain():h.extent(),D.brush({extent:S,brush:h}),rt(),r.width(F).height(I).color(e.map(function(e,t){return e.color||w(e,t)}).filter(function(t,n){return!e[n].disabled&&e[n].bar})),t.width(F).height(I).color(e.map(function(e,t){return e.color||w(e,t)}).filter(function(t,n){return!e[n].disabled&&!e[n].bar}));var n=J.select(".nv-focus .nv-barsWrap").datum(U.length?U.map(function(e,t){return{key:e.key,values:e.values.filter(function(e,t){return r.x()(e,t)>=S[0]&&r.x()(e,t)<=S[1]})}}):[{values:[]}]),i=J.select(".nv-focus .nv-linesWrap").datum(z[0].disabled?[{values:[]}]:z.map(function(e,n){return{key:e.key,values:e.values.filter(function(e,n){return t.x()(e,n)>=S[0]&&t.x()(e,n)<=S[1]})}}));U.length?C=r.xScale():C=t.xScale(),s.scale(C).ticks(F/100).tickSize(-I,0),s.domain([Math.ceil(S[0]),Math.floor(S[1])]),J.select(".nv-x.nv-axis").transition().duration(P).call(s),n.transition().duration(P).call(r),i.transition().duration(P).call(t),J.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+L.range()[0]+")"),u.scale(L).ticks(I/36).tickSize(-F,0),J.select(".nv-focus .nv-y1.nv-axis").style("opacity",U.length?1:0),a.scale(A).ticks(I/36).tickSize(U.length?0:-F,0),J.select(".nv-focus .nv-y2.nv-axis").style("opacity",z.length?1:0).attr("transform","translate("+C.range()[1]+",0)"),J.select(".nv-focus .nv-y1.nv-axis").transition().duration(P).call(u),J.select(".nv-focus .nv-y2.nv-axis").transition().duration(P).call(a)}var N=d3.select(this),j=this,F=(v||parseInt(N.style("width"))||960)-p.left-p.right,I=(m||parseInt(N.style("height"))||400)-p.top-p.bottom-g,q=g-d.top-d.bottom;B.update=function(){N.transition().duration(P).call(B)},B.container=this;if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var R=N.selectAll(".nv-noData").data([_]);return R.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),R.attr("x",p.left+F/2).attr("y",p.top+I/2).text(function(e){return e}),B}N.selectAll(".nv-noData").remove();var U=e.filter(function(e){return!e.disabled&&e.bar}),z=e.filter(function(e){return!e.bar});C=r.xScale(),k=o.scale(),L=r.yScale(),A=t.yScale(),O=i.yScale(),M=n.yScale();var W=e.filter(function(e){return!e.disabled&&e.bar}).map(function(e){return e.values.map(function(e,t){return{x:y(e,t),y:b(e,t)}})}),X=e.filter(function(e){return!e.disabled&&!e.bar}).map(function(e){return e.values.map(function(e,t){return{x:y(e,t),y:b(e,t)}})});C.range([0,F]),k.domain(d3.extent(d3.merge(W.concat(X)),function(e){return e.x})).range([0,F]);var V=N.selectAll("g.nv-wrap.nv-linePlusBar").data([e]),$=V.enter().append("g").attr("class","nvd3 nv-wrap nv-linePlusBar").append("g"),J=V.select("g");$.append("g").attr("class","nv-legendWrap");var K=$.append("g").attr("class","nv-focus");K.append("g").attr("class","nv-x nv-axis"),K.append("g").attr("class","nv-y1 nv-axis"),K.append("g").attr("class","nv-y2 nv-axis"),K.append("g").attr("class","nv-barsWrap"),K.append("g").attr("class","nv-linesWrap");var Q=$.append("g").attr("class","nv-context");Q.append("g").attr("class","nv-x nv-axis"),Q.append("g").attr("class","nv-y1 nv-axis"),Q.append("g").attr("class","nv-y2 nv-axis"),Q.append("g").attr("class","nv-barsWrap"),Q.append("g").attr("class","nv-linesWrap"),Q.append("g").attr("class","nv-brushBackground"),Q.append("g").attr("class","nv-x nv-brush"),E&&(c.width(F/2),J.select(".nv-legendWrap").datum(e.map(function(e){return e.originalKey=e.originalKey===undefined?e.key:e.originalKey,e.key=e.originalKey+(e.bar?" (left axis)":" (right axis)"),e})).call(c),p.top!=c.height()&&(p.top=c.height(),I=(m||parseInt(N.style("height"))||400)-p.top-p.bottom-g),J.select(".nv-legendWrap").attr("transform","translate("+F/2+","+ -p.top+")")),V.attr("transform","translate("+p.left+","+p.top+")"),i.width(F).height(q).color(e.map(function(e,t){return e.color||w(e,t)}).filter(function(t,n){return!e[n].disabled&&e[n].bar})),n.width(F).height(q).color(e.map(function(e,t){return e.color||w(e,t)}).filter(function(t,n){return!e[n].disabled&&!e[n].bar}));var G=J.select(".nv-context .nv-barsWrap").datum(U.length?U:[{values:[]}]),Y=J.select(".nv-context .nv-linesWrap").datum(z[0].disabled?[{values:[]}]:z);J.select(".nv-context").attr("transform","translate(0,"+(I+p.bottom+d.top)+")"),G.transition().call(i),Y.transition().call(n),h.x(k).on("brush",it),x&&h.extent(x);var Z=J.select(".nv-brushBackground").selectAll("g").data([x||h.extent()]),et=Z.enter().append("g");et.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",q),et.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",q);var tt=J.select(".nv-x.nv-brush").call(h);tt.selectAll("rect").attr("height",q),tt.selectAll(".resize").append("path").attr("d",nt),o.ticks(F/100).tickSize(-q,0),J.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+O.range()[0]+")"),J.select(".nv-context .nv-x.nv-axis").transition().call(o),f.scale(O).ticks(q/36).tickSize(-F,0),J.select(".nv-context .nv-y1.nv-axis").style("opacity",U.length?1:0).attr("transform","translate(0,"+k.range()[0]+")"),J.select(".nv-context .nv-y1.nv-axis").transition().call(f),l.scale(M).ticks(q/36).tickSize(U.length?0:-F,0),J.select(".nv-context .nv-y2.nv-axis").style("opacity",z.length?1:0).attr("transform","translate("+k.range()[1]+",0)"),J.select(".nv-context .nv-y2.nv-axis").transition().call(l),c.dispatch.on("stateChange",function(e){B.update()}),D.on("tooltipShow",function(e){T&&H(e,j.parentNode)}),it()}),B}var t=e.models.line(),n=e.models.line(),r=e.models.historicalBar(),i=e.models.historicalBar(),s=e.models.axis(),o=e.models.axis(),u=e.models.axis(),a=e.models.axis(),f=e.models.axis(),l=e.models.axis(),c=e.models.legend(),h=d3.svg.brush(),p={top:30,right:30,bottom:30,left:60},d={top:0,right:30,bottom:20,left:60},v=null,m=null,g=100,y=function(e){return e.x},b=function(e){return e.y},w=e.utils.defaultColor(),E=!0,S,x=null,T=!0,N=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},C,k,L,A,O,M,_="No Data Available.",D=d3.dispatch("tooltipShow","tooltipHide","brush"),P=0;t.clipEdge(!0),n.interactive(!1),s.orient("bottom").tickPadding(5),u.orient("left"),a.orient("right"),o.orient("bottom").tickPadding(5),f.orient("left"),l.orient("right");var H=function(n,r){S&&(n.pointIndex+=Math.ceil(S[0]));var i=n.pos[0]+(r.offsetLeft||0),o=n.pos[1]+(r.offsetTop||0),f=s.tickFormat()(t.x()(n.point,n.pointIndex)),l=(n.series.bar?u:a).tickFormat()(t.y()(n.point,n.pointIndex)),c=N(n.series.key,f,l,n,B);e.tooltip.show([i,o],c,n.value<0?"n":"s",null,r)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+p.left,e.pos[1]+p.top],D.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){D.tooltipHide(e)}),r.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+p.left,e.pos[1]+p.top],D.tooltipShow(e)}),r.dispatch.on("elementMouseout.tooltip",function(e){D.tooltipHide(e)}),D.on("tooltipHide",function(){T&&e.tooltip.cleanup()}),B.dispatch=D,B.legend=c,B.lines=t,B.lines2=n,B.bars=r,B.bars2=i,B.xAxis=s,B.x2Axis=o,B.y1Axis=u,B.y2Axis=a,B.y3Axis=f,B.y4Axis=l,d3.rebind(B,t,"defined","size","clipVoronoi","interpolate"),B.options=e.utils.optionsFunc.bind(B),B.x=function(e){return arguments.length?(y=e,t.x(e),r.x(e),B):y},B.y=function(e){return arguments.length?(b=e,t.y(e),r.y(e),B):b},B.margin=function(e){return arguments.length?(p.top=typeof e.top!="undefined"?e.top:p.top,p.right=typeof e.right!="undefined"?e.right:p.right,p.bottom=typeof e.bottom!="undefined"?e.bottom:p.bottom,p.left=typeof e.left!="undefined"?e.left:p.left,B):p},B.width=function(e){return arguments.length?(v=e,B):v},B.height=function(e){return arguments.length?(m=e,B):m},B.color=function(t){return arguments.length?(w=e.utils.getColor(t),c.color(w),B):w},B.showLegend=function(e){return arguments.length?(E=e,B):E},B.tooltips=function(e){return arguments.length?(T=e,B):T},B.tooltipContent=function(e){return arguments.length?(N=e,B):N},B.noData=function(e){return arguments.length?(_=e,B):_},B.brushExtent=function(e){return arguments.length?(x=e,B):x},B},e.models.multiBar=function(){"use strict";function C(e){return e.each(function(e){var C=n-t.left-t.right,k=r-t.top-t.bottom,L=d3.select(this);d&&e.length&&(d=[{values:e[0].values.map(function(e){return{x:e.x,y:0,series:e.series,size:.01}})}]),c&&(e=d3.layout.stack().offset(h).values(function(e){return e.values}).y(a)(!e.length&&d?d:e)),e.forEach(function(e,t){e.values.forEach(function(e){e.series=t})}),c&&e[0].values.map(function(t,n){var r=0,i=0;e.map(function(e){var t=e.values[n];t.size=Math.abs(t.y),t.y<0?(t.y1=i,i-=t.size):(t.y1=t.size+r,r+=t.size)})});var A=y&&b?[]:e.map(function(e){return e.values.map(function(e,t){return{x:u(e,t),y:a(e,t),y0:e.y0,y1:e.y1}})});i.domain(y||d3.merge(A).map(function(e){return e.x})).rangeBands(w||[0,C],S),s.domain(b||d3.extent(d3.merge(A).map(function(e){return c?e.y>0?e.y1:e.y1+e.y:e.y}).concat(f))).range(E||[k,0]),i.domain()[0]===i.domain()[1]&&(i.domain()[0]?i.domain([i.domain()[0]-i.domain()[0]*.01,i.domain()[1]+i.domain()[1]*.01]):i.domain([-1,1])),s.domain()[0]===s.domain()[1]&&(s.domain()[0]?s.domain([s.domain()[0]+s.domain()[0]*.01,s.domain()[1]-s.domain()[1]*.01]):s.domain([-1,1])),T=T||i,N=N||s;var O=L.selectAll("g.nv-wrap.nv-multibar").data([e]),M=O.enter().append("g").attr("class","nvd3 nv-wrap nv-multibar"),_=M.append("defs"),D=M.append("g"),P=O.select("g");D.append("g").attr("class","nv-groups"),O.attr("transform","translate("+t.left+","+t.top+")"),_.append("clipPath").attr("id","nv-edge-clip-"+o).append("rect"),O.select("#nv-edge-clip-"+o+" rect").attr("width",C).attr("height",k),P.attr("clip-path",l?"url(#nv-edge-clip-"+o+")":"");var H=O.select(".nv-groups").selectAll(".nv-group").data(function(e){return e},function(e,t){return t});H.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),H.exit().transition().selectAll("rect.nv-bar").delay(function(t,n){return n*g/e[0].values.length}).attr("y",function(e){return c?N(e.y0):N(0)}).attr("height",0).remove(),H.attr("class",function(e,t){return"nv-group nv-series-"+t}).classed("hover",function(e){return e.hover}).style("fill",function(e,t){return p(e,t)}).style("stroke",function(e,t){return p(e,t)}),H.transition().style("stroke-opacity",1).style("fill-opacity",.75);var B=H.selectAll("rect.nv-bar").data(function(t){return d&&!e.length?d.values:t.values});B.exit().remove();var j=B.enter().append("rect").attr("class",function(e,t){return a(e,t)<0?"nv-bar negative":"nv-bar positive"}).attr("x",function(t,n,r){return c?0:r*i.rangeBand()/e.length}).attr("y",function(e){return N(c?e.y0:0)}).attr("height",0).attr("width",i.rangeBand()/(c?1:e.length)).attr("transform",function(e,t){return"translate("+i(u(e,t))+",0)"});B.style("fill",function(e,t,n){return p(e,n,t)}).style("stroke",function(e,t,n){return p(e,n,t)}).on("mouseover",function(t,n){d3.select(this).classed("hover",!0),x.elementMouseover({value:a(t,n),point:t,series:e[t.series],pos:[i(u(t,n))+i.rangeBand()*(c?e.length/2:t.series+.5)/e.length,s(a(t,n)+(c?t.y0:0))],pointIndex:n,seriesIndex:t.series,e:d3.event})}).on("mouseout",function(t,n){d3.select(this).classed("hover",!1),x.elementMouseout({value:a(t,n),point:t,series:e[t.series],pointIndex:n,seriesIndex:t.series,e:d3.event})}).on("click",function(t,n){x.elementClick({value:a(t,n),point:t,series:e[t.series],pos:[i(u(t,n))+i.rangeBand()*(c?e.length/2:t.series+.5)/e.length
,s(a(t,n)+(c?t.y0:0))],pointIndex:n,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(t,n){x.elementDblClick({value:a(t,n),point:t,series:e[t.series],pos:[i(u(t,n))+i.rangeBand()*(c?e.length/2:t.series+.5)/e.length,s(a(t,n)+(c?t.y0:0))],pointIndex:n,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()}),B.attr("class",function(e,t){return a(e,t)<0?"nv-bar negative":"nv-bar positive"}).transition().attr("transform",function(e,t){return"translate("+i(u(e,t))+",0)"}),v&&(m||(m=e.map(function(){return!0})),B.style("fill",function(e,t,n){return d3.rgb(v(e,t)).darker(m.map(function(e,t){return t}).filter(function(e,t){return!m[t]})[n]).toString()}).style("stroke",function(e,t,n){return d3.rgb(v(e,t)).darker(m.map(function(e,t){return t}).filter(function(e,t){return!m[t]})[n]).toString()})),c?B.transition().delay(function(t,n){return n*g/e[0].values.length}).attr("y",function(e,t){return s(c?e.y1:0)}).attr("height",function(e,t){return Math.max(Math.abs(s(e.y+(c?e.y0:0))-s(c?e.y0:0)),1)}).attr("x",function(t,n){return c?0:t.series*i.rangeBand()/e.length}).attr("width",i.rangeBand()/(c?1:e.length)):B.transition().delay(function(t,n){return n*g/e[0].values.length}).attr("x",function(t,n){return t.series*i.rangeBand()/e.length}).attr("width",i.rangeBand()/e.length).attr("y",function(e,t){return a(e,t)<0?s(0):s(0)-s(a(e,t))<1?s(0)-1:s(a(e,t))||0}).attr("height",function(e,t){return Math.max(Math.abs(s(a(e,t))-s(0)),1)||0}),T=i.copy(),N=s.copy()}),C}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=d3.scale.ordinal(),s=d3.scale.linear(),o=Math.floor(Math.random()*1e4),u=function(e){return e.x},a=function(e){return e.y},f=[0],l=!0,c=!1,h="zero",p=e.utils.defaultColor(),d=!1,v=null,m,g=1200,y,b,w,E,S=.1,x=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),T,N;return C.dispatch=x,C.options=e.utils.optionsFunc.bind(C),C.x=function(e){return arguments.length?(u=e,C):u},C.y=function(e){return arguments.length?(a=e,C):a},C.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,C):t},C.width=function(e){return arguments.length?(n=e,C):n},C.height=function(e){return arguments.length?(r=e,C):r},C.xScale=function(e){return arguments.length?(i=e,C):i},C.yScale=function(e){return arguments.length?(s=e,C):s},C.xDomain=function(e){return arguments.length?(y=e,C):y},C.yDomain=function(e){return arguments.length?(b=e,C):b},C.xRange=function(e){return arguments.length?(w=e,C):w},C.yRange=function(e){return arguments.length?(E=e,C):E},C.forceY=function(e){return arguments.length?(f=e,C):f},C.stacked=function(e){return arguments.length?(c=e,C):c},C.stackOffset=function(e){return arguments.length?(h=e,C):h},C.clipEdge=function(e){return arguments.length?(l=e,C):l},C.color=function(t){return arguments.length?(p=e.utils.getColor(t),C):p},C.barColor=function(t){return arguments.length?(v=e.utils.getColor(t),C):v},C.disabled=function(e){return arguments.length?(m=e,C):m},C.id=function(e){return arguments.length?(o=e,C):o},C.hideable=function(e){return arguments.length?(d=e,C):d},C.delay=function(e){return arguments.length?(g=e,C):g},C.groupSpacing=function(e){return arguments.length?(S=e,C):S},C},e.models.multiBarChart=function(){"use strict";function A(e){return e.each(function(e){var b=d3.select(this),O=this,M=(u||parseInt(b.style("width"))||960)-o.left-o.right,_=(a||parseInt(b.style("height"))||400)-o.top-o.bottom;A.update=function(){b.transition().duration(k).call(A)},A.container=this,S.disabled=e.map(function(e){return!!e.disabled});if(!x){var D;x={};for(D in S)S[D]instanceof Array?x[D]=S[D].slice(0):x[D]=S[D]}if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var P=b.selectAll(".nv-noData").data([T]);return P.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),P.attr("x",o.left+M/2).attr("y",o.top+_/2).text(function(e){return e}),A}b.selectAll(".nv-noData").remove(),w=t.xScale(),E=t.yScale();var H=b.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([e]),B=H.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarWithLegend").append("g"),j=H.select("g");B.append("g").attr("class","nv-x nv-axis"),B.append("g").attr("class","nv-y nv-axis"),B.append("g").attr("class","nv-barsWrap"),B.append("g").attr("class","nv-legendWrap"),B.append("g").attr("class","nv-controlsWrap"),c&&(i.width(M-C()),t.barColor()&&e.forEach(function(e,t){e.color=d3.rgb("#ccc").darker(t*1.5).toString()}),j.select(".nv-legendWrap").datum(e).call(i),o.top!=i.height()&&(o.top=i.height(),_=(a||parseInt(b.style("height"))||400)-o.top-o.bottom),j.select(".nv-legendWrap").attr("transform","translate("+C()+","+ -o.top+")"));if(l){var F=[{key:"Grouped",disabled:t.stacked()},{key:"Stacked",disabled:!t.stacked()}];s.width(C()).color(["#444","#444","#444"]),j.select(".nv-controlsWrap").datum(F).attr("transform","translate(0,"+ -o.top+")").call(s)}H.attr("transform","translate("+o.left+","+o.top+")"),d&&j.select(".nv-y.nv-axis").attr("transform","translate("+M+",0)"),t.disabled(e.map(function(e){return e.disabled})).width(M).height(_).color(e.map(function(e,t){return e.color||f(e,t)}).filter(function(t,n){return!e[n].disabled}));var I=j.select(".nv-barsWrap").datum(e.filter(function(e){return!e.disabled}));I.transition().call(t);if(h){n.scale(w).ticks(M/100).tickSize(-_,0),j.select(".nv-x.nv-axis").attr("transform","translate(0,"+E.range()[0]+")"),j.select(".nv-x.nv-axis").transition().call(n);var q=j.select(".nv-x.nv-axis > g").selectAll("g");q.selectAll("line, text").style("opacity",1);if(m){var R=function(e,t){return"translate("+e+","+t+")"},U=5,z=17;q.selectAll("text").attr("transform",function(e,t,n){return R(0,n%2==0?U:z)});var W=d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;j.selectAll(".nv-x.nv-axis .nv-axisMaxMin text").attr("transform",function(e,t){return R(0,t===0||W%2!==0?z:U)})}v&&q.filter(function(t,n){return n%Math.ceil(e[0].values.length/(M/100))!==0}).selectAll("text, line").style("opacity",0),g&&q.selectAll(".tick text").attr("transform","rotate("+g+" 0,0)").style("text-anchor",g>0?"start":"end"),j.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity",1)}p&&(r.scale(E).ticks(_/36).tickSize(-M,0),j.select(".nv-y.nv-axis").transition().call(r)),i.dispatch.on("stateChange",function(e){S=e,N.stateChange(S),A.update()}),s.dispatch.on("legendClick",function(e,n){if(!e.disabled)return;F=F.map(function(e){return e.disabled=!0,e}),e.disabled=!1;switch(e.key){case"Grouped":t.stacked(!1);break;case"Stacked":t.stacked(!0)}S.stacked=t.stacked(),N.stateChange(S),A.update()}),N.on("tooltipShow",function(e){y&&L(e,O.parentNode)}),N.on("changeState",function(n){typeof n.disabled!="undefined"&&(e.forEach(function(e,t){e.disabled=n.disabled[t]}),S.disabled=n.disabled),typeof n.stacked!="undefined"&&(t.stacked(n.stacked),S.stacked=n.stacked),A.update()})}),A}var t=e.models.multiBar(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s=e.models.legend(),o={top:30,right:20,bottom:50,left:60},u=null,a=null,f=e.utils.defaultColor(),l=!0,c=!0,h=!0,p=!0,d=!1,v=!0,m=!1,g=0,y=!0,b=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" on "+t+"</p>"},w,E,S={stacked:!1},x=null,T="No Data Available.",N=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),C=function(){return l?180:0},k=250;t.stacked(!1),n.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(e){return e}),r.orient(d?"right":"left").tickFormat(d3.format(",.1f")),s.updateState(!1);var L=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),a=n.tickFormat()(t.x()(i.point,i.pointIndex)),f=r.tickFormat()(t.y()(i.point,i.pointIndex)),l=b(i.series.key,a,f,i,A);e.tooltip.show([o,u],l,i.value<0?"n":"s",null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+o.left,e.pos[1]+o.top],N.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){N.tooltipHide(e)}),N.on("tooltipHide",function(){y&&e.tooltip.cleanup()}),A.dispatch=N,A.multibar=t,A.legend=i,A.xAxis=n,A.yAxis=r,d3.rebind(A,t,"x","y","xDomain","yDomain","xRange","yRange","forceX","forceY","clipEdge","id","stacked","stackOffset","delay","barColor","groupSpacing"),A.options=e.utils.optionsFunc.bind(A),A.margin=function(e){return arguments.length?(o.top=typeof e.top!="undefined"?e.top:o.top,o.right=typeof e.right!="undefined"?e.right:o.right,o.bottom=typeof e.bottom!="undefined"?e.bottom:o.bottom,o.left=typeof e.left!="undefined"?e.left:o.left,A):o},A.width=function(e){return arguments.length?(u=e,A):u},A.height=function(e){return arguments.length?(a=e,A):a},A.color=function(t){return arguments.length?(f=e.utils.getColor(t),i.color(f),A):f},A.showControls=function(e){return arguments.length?(l=e,A):l},A.showLegend=function(e){return arguments.length?(c=e,A):c},A.showXAxis=function(e){return arguments.length?(h=e,A):h},A.showYAxis=function(e){return arguments.length?(p=e,A):p},A.rightAlignYAxis=function(e){return arguments.length?(d=e,r.orient(e?"right":"left"),A):d},A.reduceXTicks=function(e){return arguments.length?(v=e,A):v},A.rotateLabels=function(e){return arguments.length?(g=e,A):g},A.staggerLabels=function(e){return arguments.length?(m=e,A):m},A.tooltip=function(e){return arguments.length?(b=e,A):b},A.tooltips=function(e){return arguments.length?(y=e,A):y},A.tooltipContent=function(e){return arguments.length?(b=e,A):b},A.state=function(e){return arguments.length?(S=e,A):S},A.defaultState=function(e){return arguments.length?(x=e,A):x},A.noData=function(e){return arguments.length?(T=e,A):T},A.transitionDuration=function(e){return arguments.length?(k=e,A):k},A},e.models.multiBarHorizontal=function(){"use strict";function C(e){return e.each(function(e){var i=n-t.left-t.right,y=r-t.top-t.bottom,C=d3.select(this);p&&(e=d3.layout.stack().offset("zero").values(function(e){return e.values}).y(a)(e)),e.forEach(function(e,t){e.values.forEach(function(e){e.series=t})}),p&&e[0].values.map(function(t,n){var r=0,i=0;e.map(function(e){var t=e.values[n];t.size=Math.abs(t.y),t.y<0?(t.y1=i-t.size,i-=t.size):(t.y1=r,r+=t.size)})});var k=b&&w?[]:e.map(function(e){return e.values.map(function(e,t){return{x:u(e,t),y:a(e,t),y0:e.y0,y1:e.y1}})});s.domain(b||d3.merge(k).map(function(e){return e.x})).rangeBands(E||[0,y],.1),o.domain(w||d3.extent(d3.merge(k).map(function(e){return p?e.y>0?e.y1+e.y:e.y1:e.y}).concat(f))),d&&!p?o.range(S||[o.domain()[0]<0?m:0,i-(o.domain()[1]>0?m:0)]):o.range(S||[0,i]),T=T||s,N=N||d3.scale.linear().domain(o.domain()).range([o(0),o(0)]);var L=d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([e]),A=L.enter().append("g").attr("class","nvd3 nv-wrap nv-multibarHorizontal"),O=A.append("defs"),M=A.append("g"),_=L.select("g");M.append("g").attr("class","nv-groups"),L.attr("transform","translate("+t.left+","+t.top+")");var D=L.select(".nv-groups").selectAll(".nv-group").data(function(e){return e},function(e,t){return t});D.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),D.exit().transition().style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),D.attr("class",function(e,t){return"nv-group nv-series-"+t}).classed("hover",function(e){return e.hover}).style("fill",function(e,t){return l(e,t)}).style("stroke",function(e,t){return l(e,t)}),D.transition().style("stroke-opacity",1).style("fill-opacity",.75);var P=D.selectAll("g.nv-bar").data(function(e){return e.values});P.exit().remove();var H=P.enter().append("g").attr("transform",function(t,n,r){return"translate("+N(p?t.y0:0)+","+(p?0:r*s.rangeBand()/e.length+s(u(t,n)))+")"});H.append("rect").attr("width",0).attr("height",s.rangeBand()/(p?1:e.length)),P.on("mouseover",function(t,n){d3.select(this).classed("hover",!0),x.elementMouseover({value:a(t,n),point:t,series:e[t.series],pos:[o(a(t,n)+(p?t.y0:0)),s(u(t,n))+s.rangeBand()*(p?e.length/2:t.series+.5)/e.length],pointIndex:n,seriesIndex:t.series,e:d3.event})}).on("mouseout",function(t,n){d3.select(this).classed("hover",!1),x.elementMouseout({value:a(t,n),point:t,series:e[t.series],pointIndex:n,seriesIndex:t.series,e:d3.event})}).on("click",function(t,n){x.elementClick({value:a(t,n),point:t,series:e[t.series],pos:[s(u(t,n))+s.rangeBand()*(p?e.length/2:t.series+.5)/e.length,o(a(t,n)+(p?t.y0:0))],pointIndex:n,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(t,n){x.elementDblClick({value:a(t,n),point:t,series:e[t.series],pos:[s(u(t,n))+s.rangeBand()*(p?e.length/2:t.series+.5)/e.length,o(a(t,n)+(p?t.y0:0))],pointIndex:n,seriesIndex:t.series,e:d3.event}),d3.event.stopPropagation()}),H.append("text"),d&&!p?(P.select("text").attr("text-anchor",function(e,t){return a(e,t)<0?"end":"start"}).attr("y",s.rangeBand()/(e.length*2)).attr("dy",".32em").text(function(e,t){return g(a(e,t))}),P.transition().select("text").attr("x",function(e,t){return a(e,t)<0?-4:o(a(e,t))-o(0)+4})):P.selectAll("text").text(""),v&&!p?(H.append("text").classed("nv-bar-label",!0),P.select("text.nv-bar-label").attr("text-anchor",function(e,t){return a(e,t)<0?"start":"end"}).attr("y",s.rangeBand()/(e.length*2)).attr("dy",".32em").text(function(e,t){return u(e,t)}),P.transition().select("text.nv-bar-label").attr("x",function(e,t){return a(e,t)<0?o(0)-o(a(e,t))+4:-4})):P.selectAll("text.nv-bar-label").text(""),P.attr("class",function(e,t){return a(e,t)<0?"nv-bar negative":"nv-bar positive"}),c&&(h||(h=e.map(function(){return!0})),P.style("fill",function(e,t,n){return d3.rgb(c(e,t)).darker(h.map(function(e,t){return t}).filter(function(e,t){return!h[t]})[n]).toString()}).style("stroke",function(e,t,n){return d3.rgb(c(e,t)).darker(h.map(function(e,t){return t}).filter(function(e,t){return!h[t]})[n]).toString()})),p?P.transition().attr("transform",function(e,t){return"translate("+o(e.y1)+","+s(u(e,t))+")"}).select("rect").attr("width",function(e,t){return Math.abs(o(a(e,t)+e.y0)-o(e.y0))}).attr("height",s.rangeBand()):P.transition().attr("transform",function(t,n){return"translate("+(a(t,n)<0?o(a(t,n)):o(0))+","+(t.series*s.rangeBand()/e.length+s(u(t,n)))+")"}).select("rect").attr("height",s.rangeBand()/e.length).attr("width",function(e,t){return Math.max(Math.abs(o(a(e,t))-o(0)),1)}),T=s.copy(),N=o.copy()}),C}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=Math.floor(Math.random()*1e4),s=d3.scale.ordinal(),o=d3.scale.linear(),u=function(e){return e.x},a=function(e){return e.y},f=[0],l=e.utils.defaultColor(),c=null,h,p=!1,d=!1,v=!1,m=60,g=d3.format(",.2f"),y=1200,b,w,E,S,x=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),T,N;return C.dispatch=x,C.options=e.utils.optionsFunc.bind(C),C.x=function(e){return arguments.length?(u=e,C):u},C.y=function(e){return arguments.length?(a=e,C):a},C.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,C):t},C.width=function(e){return arguments.length?(n=e,C):n},C.height=function(e){return arguments.length?(r=e,C):r},C.xScale=function(e){return arguments.length?(s=e,C):s},C.yScale=function(e){return arguments.length?(o=e,C):o},C.xDomain=function(e){return arguments.length?(b=e,C):b},C.yDomain=function(e){return arguments.length?(w=e,C):w},C.xRange=function(e){return arguments.length?(E=e,C):E},C.yRange=function(e){return arguments.length?(S=e,C):S},C.forceY=function(e){return arguments.length?(f=e,C):f},C.stacked=function(e){return arguments.length?(p=e,C):p},C.color=function(t){return arguments.length?(l=e.utils.getColor(t),C):l},C.barColor=function(t){return arguments.length?(c=e.utils.getColor(t),C):c},C.disabled=function(e){return arguments.length?(h=e,C):h},C.id=function(e){return arguments.length?(i=e,C):i},C.delay=function(e){return arguments.length?(y=e,C):y},C.showValues=function(e){return arguments.length?(d=e,C):d},C.showBarLabels=function(e){return arguments.length?(v=e,C):v},C.valueFormat=function(e){return arguments.length?(g=e,C):g},C.valuePadding=function(e){return arguments.length?(m=e,C):m},C},e.models.multiBarHorizontalChart=function(){"use strict";function C(e){return e.each(function(e){var d=d3.select(this),m=this,k=(u||parseInt(d.style("width"))||960)-o.left-o.right,L=(a||parseInt(d.style("height"))||400)-o.top-o.bottom;C.update=function(){d.transition().duration(T).call(C)},C.container=this,b.disabled=e.map(function(e){return!!e.disabled});if(!w){var A;w={};for(A in b)b[A]instanceof Array?w[A]=b[A].slice(0):w[A]=b[A]}if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var O=d.selectAll(".nv-noData").data([E]);return O.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),O.attr("x",o.left+k/2).attr("y",o.top+L/2).text(function(e){return e}),C}d.selectAll(".nv-noData").remove(),g=t.xScale(),y=t.yScale();var M=d.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([e]),_=M.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarHorizontalChart").append("g"),D=M.select("g");_.append("g").attr("class","nv-x nv-axis"),_.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),_.append("g").attr("class","nv-barsWrap"),_.append("g").attr("class","nv-legendWrap"),_.append("g").attr("class","nv-controlsWrap"),c&&(i.width(k-x()),t.barColor()&&e.forEach(function(e,t){e.color=d3.rgb("#ccc").darker(t*1.5).toString()}),D.select(".nv-legendWrap").datum(e).call(i),o.top!=i.height()&&(o.top=i.height(),L=(a||parseInt(d.style("height"))||400)-o.top-o.bottom),D.select(".nv-legendWrap").attr("transform","translate("+x()+","+ -o.top+")"));if(l){var P=[{key:"Grouped",disabled:t.stacked()},{key:"Stacked",disabled:!t.stacked()}];s.width(x()).color(["#444","#444","#444"]),D.select(".nv-controlsWrap").datum(P).attr("transform","translate(0,"+ -o.top+")").call(s)}M.attr("transform","translate("+o.left+","+o.top+")"),t.disabled(e.map(function(e){return e.disabled})).width(k).height(L).color(e.map(function(e,t){return e.color||f(e,t)}).filter(function(t,n){return!e[n].disabled}));var H=D.select(".nv-barsWrap").datum(e.filter(function(e){return!e.disabled}));H.transition().call(t);if(h){n.scale(g).ticks(L/24).tickSize(-k,0),D.select(".nv-x.nv-axis").transition().call(n);var B=D.select(".nv-x.nv-axis").selectAll("g");B.selectAll("line, text")}p&&(r.scale(y).ticks(k/100).tickSize(-L,0),D.select(".nv-y.nv-axis").attr("transform","translate(0,"+L+")"),D.select(".nv-y.nv-axis").transition().call(r)),D.select(".nv-zeroLine line").attr("x1",y(0)).attr("x2",y(0)).attr("y1",0).attr("y2",-L),i.dispatch.on("stateChange",function(e){b=e,S.stateChange(b),C.update()}),s.dispatch.on("legendClick",function(e,n){if(!e.disabled)return;P=P.map(function(e){return e.disabled=!0,e}),e.disabled=!1;switch(e.key){case"Grouped":t.stacked(!1);break;case"Stacked":t.stacked(!0)}b.stacked=t.stacked(),S.stateChange(b),C.update()}),S.on("tooltipShow",function(e){v&&N(e,m.parentNode)}),S.on("changeState",function(n){typeof n.disabled!="undefined"&&(e.forEach(function(e,t){e.disabled=n.disabled[t]}),b.disabled=n.disabled),typeof n.stacked!="undefined"&&(t.stacked(n.stacked),b.stacked=n.stacked),C.update()})}),C}var t=e.models.multiBarHorizontal(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend().height(30),s=e.models.legend().height(30),o={top:30,right:20,bottom:50,left:60},u=null,a=null,f=e.utils.defaultColor(),l=!0,c=!0,h=!0,p=!0,d=!1,v=!0,m=function(e,t,n,r,i){return"<h3>"+e+" - "+t+"</h3>"+"<p>"+n+"</p>"},g,y,b={stacked:d},w=null,E="No Data Available.",S=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),x=function(){return l?180:0},T=250;t.stacked(d),n.orient("left").tickPadding(5).highlightZero(!1).showMaxMin(!1).tickFormat(function(e){return e}),r.orient("bottom").tickFormat(d3.format(",.1f")),s.updateState(!1);var N=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),a=n.tickFormat()(t.x()(i.point,i.pointIndex)),f=r.tickFormat()(t.y()(i.point,i.pointIndex)),l=m(i.series.key,a,f,i,C);e.tooltip.show([o,u],l,i.value<0?"e":"w",null,s)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+o.left,e.pos[1]+o.top],S.tooltipShow(e)}),t.dispatch.on("elementMouseout.tooltip",function(e){S.tooltipHide(e)}),S.on("tooltipHide",function(){v&&e.tooltip.cleanup()}),C.dispatch=S,C.multibar=t,C.legend=i,C.xAxis=n,C.yAxis=r,d3.rebind(C,t,"x","y","xDomain","yDomain","xRange","yRange","forceX","forceY","clipEdge","id","delay","showValues","showBarLabels","valueFormat","stacked","barColor"),C.options=e.utils.optionsFunc.bind(C),C.margin=function(e){return arguments.length?(o.top=typeof e.top!="undefined"?e.top:o.top,o.right=typeof e.right!="undefined"?e.right:o.right,o.bottom=typeof e.bottom!="undefined"?e.bottom:o.bottom,o.left=typeof e.left!="undefined"?e.left:o.left,C):o},C.width=function(e){return arguments.length?(u=e,C):u},C.height=function(e){return arguments.length?(a=e,C):a},C.color=function(t){return arguments.length?(f=e.utils.getColor(t),i.color(f),C):f},C.showControls=function(e){return arguments.length?(l=e,C):l},C.showLegend=function(e){return arguments.length?(c=e,C):c},C.showXAxis=function(e){return arguments.length?(h=e,C):h},C.showYAxis=function(e){return arguments.length?(p=e,C):p},C.tooltip=function(e){return arguments.length?(m=e,C):m},C.tooltips=function(e){return arguments.length?(v=e,C):v},C.tooltipContent=function(e){return arguments.length?(m=e,C):m},C.state=function(e){return arguments.length?(b=e,C):b},C.defaultState=function(e){return arguments.length?(w=e,C):w},C.noData=function(e){return arguments.length?(E=e,C):E},C.transitionDuration=function(e){return arguments.length?(T=e,C):T},C},e.models.multiChart=function(){"use strict";function C(e){return e.each(function(e){var u=d3.select(this),f=this;C.update=function(){u.transition().call(C)},C.container=this;var k=(r||parseInt(u.style("width"))||960)-t.left-t.right,L=(i||parseInt(u.style("height"))||400)-t.top-t.bottom,A=e.filter(function(e){return!e.disabled&&e.type=="line"&&e.yAxis==1}),O=e.filter(function(e){return!e.disabled&&e.type=="line"&&e.yAxis==2}),M=e.filter(function(e){return!e.disabled&&e.type=="bar"&&e.yAxis==1}),_=e.filter(function(e){return!e.disabled&&e.type=="bar"&&e.yAxis==2}),D=e.filter(function(e){return!e.disabled&&e.type=="area"&&e.yAxis==1}),P=e.filter(function(e){return!e.disabled&&e.type=="area"&&e.yAxis==2}),H=e.filter(function(e){return!e.disabled&&e.yAxis==1}).map(function(e){return e.values.map(function(e,t){return{x:e.x,y:e.y}})}),B=e.filter(function(e){return!e.disabled&&e.yAxis==2}).map(function(e){return e.values.map(function(e,t){return{x:e.x,y:e.y}})});a.domain(d3.extent(d3.merge(H.concat(B)),function(e){return e.x})).range([0,k]);var j=u.selectAll("g.wrap.multiChart").data([e]),F=j.enter().append("g").attr("class","wrap nvd3 multiChart").append("g");F.append("g").attr("class","x axis"),F.append("g").attr("class","y1 axis"),F.append("g").attr("class","y2 axis"),F.append("g").attr("class","lines1Wrap"),F.append("g").attr("class","lines2Wrap"),F.append("g").attr("class","bars1Wrap"),F.append("g").attr("class","bars2Wrap"),F.append("g").attr("class","stack1Wrap"),F.append("g").attr("class","stack2Wrap"),F.append("g").attr("class","legendWrap");var I=j.select("g");s&&(x.width(k/2),I.select(".legendWrap").datum(e.map(function(e){return e.originalKey=e.originalKey===undefined?e.key:e.originalKey,e.key=e.originalKey+(e.yAxis==1?"":" (right axis)"),e})).call(x),t.top!=x.height()&&(t.top=x.height(),L=(i||parseInt(u.style("height"))||400)-t.top-t.bottom),I.select(".legendWrap").attr("transform","translate("+k/2+","+ -t.top+")")),d.width(k).height(L).interpolate("monotone").color(e.map(function(e,t){return e.color||n[t%n.length]}).filter(function(t,n){return!e[n].disabled&&e[n].yAxis==1&&e[n].type=="line"})),v.width(k).height(L).interpolate("monotone").color(e.map(function(e,t){return e.color||n[t%n.length]}).filter(function(t,n){return!e[n].disabled&&e[n].yAxis==2&&e[n].type=="line"})),m.width(k).height(L).color(e.map(function(e,t){return e.color||n[t%n.length]}).filter(function(t,n){return!e[n].disabled&&e[n].yAxis==1&&e[n].type=="bar"})),g.width(k).height(L).color(e.map(function(e,t){return e.color||n[t%n.length]}).filter(function(t,n){return!e[n].disabled&&e[n].yAxis==2&&e[n].type=="bar"})),y.width(k).height(L).color(e.map(function(e,t){return e.color||n[t%n.length]}).filter(function(t,n){return!e[n].disabled&&e[n].yAxis==1&&e[n].type=="area"})),b.width(k).height(L).color(e.map(function(e,t){return e.color||n[t%n.length]}).filter(function(t,n){return!e[n].disabled&&e[n].yAxis==2&&e[n].type=="area"})),I.attr("transform","translate("+t.left+","+t.top+")");var q=I.select(".lines1Wrap").datum(A),R=I.select(".bars1Wrap").datum(M),U=I.select(".stack1Wrap").datum(D),z=I.select(".lines2Wrap").datum(O),W=I.select(".bars2Wrap").datum(_),X=I.select(".stack2Wrap").datum(P),V=D.length?D.map(function(e){return e.values}).reduce(function(e,t){return e.map(function(e,n){return{x:e.x,y:e.y+t[n].y}})}).concat([{x:0,y:0}]):[],$=P.length?P.map(function(e){return e.values}).reduce(function(e,t){return e.map(function(e,n){return{x:e.x,y:e.y+t[n].y}})}).concat([{x:0,y:0}]):[];h.domain(l||d3.extent(d3.merge(H).concat(V),function(e){return e.y})).range([0,L]),p.domain(c||d3.extent(d3.merge(B).concat($),function(e){return e.y})).range([0,L]),d.yDomain(h.domain()),m.yDomain(h.domain()),y.yDomain(h.domain()),v.yDomain(p.domain()),g.yDomain(p.domain()),b.yDomain(p.domain()),D.length&&d3.transition(U).call(y),P.length&&d3.transition(X).call(b),M.length&&d3.transition(R).call(m),_.length&&d3.transition(W).call(g),A.length&&d3.transition(q).call(d),O.length&&d3.transition(z).call(v),w.ticks(k/100).tickSize(-L,0),I.select(".x.axis").attr("transform","translate(0,"+L+")"),d3.transition(I.select(".x.axis")).call(w),E.ticks(L/36).tickSize(-k,0),d3.transition(I.select(".y1.axis")).call(E),S.ticks(L/36).tickSize(-k,0),d3.transition(I.select(".y2.axis")).call(S),I.select(".y2.axis").style("opacity",B.length?1:0).attr("transform","translate("+a.range()[1]+",0)"),x.dispatch.on("stateChange",function(e){C.update()}),T.on("tooltipShow",function(e){o&&N(e,f.parentNode)})}),C}var t={top:30,right:20,bottom:50,left:60},n=d3.scale.category20().range(),r=null,i=null,s=!0,o=!0,u=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" at "+t+"</p>"},a,f,l,c,a=d3.scale.linear(),h=d3.scale.linear(),p=d3.scale.linear(),d=e.models.line().yScale(h),v=e.models.line().yScale(p),m=e.models.multiBar().stacked(!1).yScale(h),g=e.models.multiBar().stacked(!1).yScale(p),y=e.models.stackedArea().yScale(h),b=e.models.stackedArea().yScale(p),w=e.models.axis().scale(a).orient("bottom").tickPadding(5),E=e.models.axis().scale(h).orient("left"),S=e.models.axis().scale(p).orient("right"),x=e.models.legend().height(30),T=d3.dispatch("tooltipShow","tooltipHide"),N=function(t,n){var r=t.pos[0]+(n.offsetLeft||0),i=t.pos[1]+(n.offsetTop||0),s=w.tickFormat()(d.x()(t.point,t.pointIndex)),o=(t.series.yAxis==2?S:E).tickFormat()(d.y()(t.point,t.pointIndex)),a=u(t.series.key,s,o,t,C);e.tooltip.show([r,i],a,undefined,undefined,n.offsetParent)};return d.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),d.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),v.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),v.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),m.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),m.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),g.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),g.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),y.dispatch.on("tooltipShow",function(e){if(!Math.round(y.y()(e.point)*100))return setTimeout(function(){d3.selectAll(".point.hover").classed("hover",!1)},0),!1;e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),y.dispatch.on("tooltipHide",function(e){T.tooltipHide(e)}),b.dispatch.on("tooltipShow",function(e){if(!Math.round(b.y()(e.point)*100))return setTimeout(function(){d3.selectAll(".point.hover").classed("hover",!1)},0),!1;e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),b.dispatch.on("tooltipHide",function(e){T.tooltipHide(e)}),d.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),d.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),v.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],T.tooltipShow(e)}),v.dispatch.on("elementMouseout.tooltip",function(e){T.tooltipHide(e)}),T.on("tooltipHide",function(){o&&e.tooltip.cleanup()}),C.dispatch=T,C.lines1=d,C.lines2=v,C.bars1=m,C.bars2=g,C.stack1=y,C.stack2=b,C.xAxis=w,C.yAxis1=E,C.yAxis2=S,C.options=e.utils.optionsFunc.bind(C),C.x=function(e){return arguments.length?(getX=e,d.x(e),m.x(e),C):getX},C.y=function(e){return arguments.length?(getY=e,d.y(e),m.y(e),C):getY},C.yDomain1=function(e){return arguments.length?(l=e,C):l},C.yDomain2=function(e){return arguments.length?(c=e,C):c},C.margin=function(e){return arguments.length?(t=e,C):t},C.width=function(e){return arguments.length?(r=e,C):r},C.height=function(e){return arguments.length?(i=e,C):i},C.color=function(e){return arguments.length?(n=e,x.color(e),C):n},C.showLegend=function(e){return arguments.length?(s=e,C):s},C.tooltips=function(e){return arguments.length?(o=e,C):o},C.tooltipContent=function(e){return arguments.length?(u=e,C):u},C},e.models.ohlcBar=function(){"use strict";function x(e){return e.each(function(e){var g=n-t.left-t.right,x=r-t.top-t.bottom,T=d3.select(this);s.domain(y||d3.extent(e[0].values.map(u).concat(p))),v?s.range(w||[g*.5/e[0].values.length,g*(e[0].values.length-.5)/e[0].values.length]):s.range(w||[0,g]),o.domain(b||[d3.min(e[0].values.map(h).concat(d)),d3.max(e[0].values.map(c).concat(d))]).range(E||[x,0]),s.domain()[0]===s.domain()[1]&&(s.domain()[0]?s.domain([s.domain()[0]-s.domain()[0]*.01,s.domain()[1]+s.domain()[1]*.01]):s.domain([-1,1])),o.domain()[0]===o.domain()[1]&&(o.domain()[0]?o.domain([o.domain()[0]+o.domain()[0]*.01,o.domain()[1]-o.domain()[1]*.01]):o.domain([-1,1]));var N=d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([e[0].values]),C=N.enter().append("g").attr("class","nvd3 nv-wrap nv-ohlcBar"),k=C.append("defs"),L=C.append("g"),A=N.select("g");L.append("g").attr("class","nv-ticks"),N.attr("transform","translate("+t.left+","+t.top+")"),T.on("click",function(e,t){S.chartClick({data:e,index:t,pos:d3.event,id:i})}),k.append("clipPath").attr("id","nv-chart-clip-path-"+i).append("rect"),N.select("#nv-chart-clip-path-"+i+" rect").attr("width",g).attr("height",x),A.attr("clip-path",m?"url(#nv-chart-clip-path-"+i+")":"");var O=N.select(".nv-ticks").selectAll(".nv-tick").data(function(e){return e});O.exit().remove();var M=O.enter().append("path").attr("class",function(e,t,n){return(f(e,t)>l(e,t)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+n+"-"+t}).attr("d",function(t,n){var r=g/e[0].values.length*.9;return"m0,0l0,"+(o(f(t,n))-o(c(t,n)))+"l"+ -r/2+",0l"+r/2+",0l0,"+(o(h(t,n))-o(f(t,n)))+"l0,"+(o(l(t,n))-o(h(t,n)))+"l"+r/2+",0l"+ -r/2+",0z"}).attr("transform",function(e,t){return"translate("+s(u(e,t))+","+o(c(e,t))+")"}).on("mouseover",function(t,n){d3.select(this).classed("hover",!0),S.elementMouseover({point:t,series:e[0],pos:[s(u(t,n)),o(a(t,n))],pointIndex:n,seriesIndex:0,e:d3.event})}).on("mouseout",function(t,n){d3.select(this).classed("hover",!1),S.elementMouseout({point:t,series:e[0],pointIndex:n,seriesIndex:0,e:d3.event})}).on("click",function(e,t){S.elementClick({value:a(e,t),data:e,index:t,pos:[s(u(e,t)),o(a(e,t))],e:d3.event,id:i}),d3.event.stopPropagation()}).on("dblclick",function(e,t){S.elementDblClick({value:a(e,t),data:e,index:t,pos:[s(u(e,t)),o(a(e,t))],e:d3.event,id:i}),d3.event.stopPropagation()});O.attr("class",function(e,t,n){return(f(e,t)>l(e,t)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+n+"-"+t}),d3.transition(O).attr("transform",function(e,t){return"translate("+s(u(e,t))+","+o(c(e,t))+")"}).attr("d",function(t,n){var r=g/e[0].values.length*.9;return"m0,0l0,"+(o(f(t,n))-o(c(t,n)))+"l"+ -r/2+",0l"+r/2+",0l0,"+(o(h(t,n))-o(f(t,n)))+"l0,"+(o(l(t,n))-o(h(t,n)))+"l"+r/2+",0l"+ -r/2+",0z"})}),x}var t={top:0
,right:0,bottom:0,left:0},n=960,r=500,i=Math.floor(Math.random()*1e4),s=d3.scale.linear(),o=d3.scale.linear(),u=function(e){return e.x},a=function(e){return e.y},f=function(e){return e.open},l=function(e){return e.close},c=function(e){return e.high},h=function(e){return e.low},p=[],d=[],v=!1,m=!0,g=e.utils.defaultColor(),y,b,w,E,S=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return x.dispatch=S,x.options=e.utils.optionsFunc.bind(x),x.x=function(e){return arguments.length?(u=e,x):u},x.y=function(e){return arguments.length?(a=e,x):a},x.open=function(e){return arguments.length?(f=e,x):f},x.close=function(e){return arguments.length?(l=e,x):l},x.high=function(e){return arguments.length?(c=e,x):c},x.low=function(e){return arguments.length?(h=e,x):h},x.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,x):t},x.width=function(e){return arguments.length?(n=e,x):n},x.height=function(e){return arguments.length?(r=e,x):r},x.xScale=function(e){return arguments.length?(s=e,x):s},x.yScale=function(e){return arguments.length?(o=e,x):o},x.xDomain=function(e){return arguments.length?(y=e,x):y},x.yDomain=function(e){return arguments.length?(b=e,x):b},x.xRange=function(e){return arguments.length?(w=e,x):w},x.yRange=function(e){return arguments.length?(E=e,x):E},x.forceX=function(e){return arguments.length?(p=e,x):p},x.forceY=function(e){return arguments.length?(d=e,x):d},x.padData=function(e){return arguments.length?(v=e,x):v},x.clipEdge=function(e){return arguments.length?(m=e,x):m},x.color=function(t){return arguments.length?(g=e.utils.getColor(t),x):g},x.id=function(e){return arguments.length?(i=e,x):i},x},e.models.pie=function(){"use strict";function S(e){return e.each(function(e){function q(e){var t=(e.startAngle+e.endAngle)*90/Math.PI-90;return t>90?t-180:t}function R(e){e.endAngle=isNaN(e.endAngle)?0:e.endAngle,e.startAngle=isNaN(e.startAngle)?0:e.startAngle,m||(e.innerRadius=0);var t=d3.interpolate(this._current,e);return this._current=t(0),function(e){return A(t(e))}}function U(e){e.innerRadius=0;var t=d3.interpolate({startAngle:0,endAngle:0},e);return function(e){return A(t(e))}}var o=n-t.left-t.right,f=r-t.top-t.bottom,S=Math.min(o,f)/2,x=S-S/5,T=d3.select(this),N=T.selectAll(".nv-wrap.nv-pie").data(e),C=N.enter().append("g").attr("class","nvd3 nv-wrap nv-pie nv-chart-"+u),k=C.append("g"),L=N.select("g");k.append("g").attr("class","nv-pie"),k.append("g").attr("class","nv-pieLabels"),N.attr("transform","translate("+t.left+","+t.top+")"),L.select(".nv-pie").attr("transform","translate("+o/2+","+f/2+")"),L.select(".nv-pieLabels").attr("transform","translate("+o/2+","+f/2+")"),T.on("click",function(e,t){E.chartClick({data:e,index:t,pos:d3.event,id:u})});var A=d3.svg.arc().outerRadius(x);y&&A.startAngle(y),b&&A.endAngle(b),m&&A.innerRadius(S*w);var O=d3.layout.pie().sort(null).value(function(e){return e.disabled?0:s(e)}),M=N.select(".nv-pie").selectAll(".nv-slice").data(O),_=N.select(".nv-pieLabels").selectAll(".nv-label").data(O);M.exit().remove(),_.exit().remove();var D=M.enter().append("g").attr("class","nv-slice").on("mouseover",function(e,t){d3.select(this).classed("hover",!0),E.elementMouseover({label:i(e.data),value:s(e.data),point:e.data,pointIndex:t,pos:[d3.event.pageX,d3.event.pageY],id:u})}).on("mouseout",function(e,t){d3.select(this).classed("hover",!1),E.elementMouseout({label:i(e.data),value:s(e.data),point:e.data,index:t,id:u})}).on("click",function(e,t){E.elementClick({label:i(e.data),value:s(e.data),point:e.data,index:t,pos:d3.event,id:u}),d3.event.stopPropagation()}).on("dblclick",function(e,t){E.elementDblClick({label:i(e.data),value:s(e.data),point:e.data,index:t,pos:d3.event,id:u}),d3.event.stopPropagation()});M.attr("fill",function(e,t){return a(e,t)}).attr("stroke",function(e,t){return a(e,t)});var P=D.append("path").each(function(e){this._current=e});M.select("path").transition().attr("d",A).attrTween("d",R);if(l){var H=d3.svg.arc().innerRadius(0);c&&(H=A),h&&(H=d3.svg.arc().outerRadius(A.outerRadius())),_.enter().append("g").classed("nv-label",!0).each(function(e,t){var n=d3.select(this);n.attr("transform",function(e){if(g){e.outerRadius=x+10,e.innerRadius=x+15;var t=(e.startAngle+e.endAngle)/2*(180/Math.PI);return(e.startAngle+e.endAngle)/2<Math.PI?t-=90:t+=90,"translate("+H.centroid(e)+") rotate("+t+")"}return e.outerRadius=S+10,e.innerRadius=S+15,"translate("+H.centroid(e)+")"}),n.append("rect").style("stroke","#fff").style("fill","#fff").attr("rx",3).attr("ry",3),n.append("text").style("text-anchor",g?(e.startAngle+e.endAngle)/2<Math.PI?"start":"end":"middle").style("fill","#000")});var B={},j=14,F=140,I=function(e){return Math.floor(e[0]/F)*F+","+Math.floor(e[1]/j)*j};_.transition().attr("transform",function(e){if(g){e.outerRadius=x+10,e.innerRadius=x+15;var t=(e.startAngle+e.endAngle)/2*(180/Math.PI);return(e.startAngle+e.endAngle)/2<Math.PI?t-=90:t+=90,"translate("+H.centroid(e)+") rotate("+t+")"}e.outerRadius=S+10,e.innerRadius=S+15;var n=H.centroid(e),r=I(n);return B[r]&&(n[1]-=j),B[I(n)]=!0,"translate("+n+")"}),_.select(".nv-label text").style("text-anchor",g?(d.startAngle+d.endAngle)/2<Math.PI?"start":"end":"middle").text(function(e,t){var n=(e.endAngle-e.startAngle)/(2*Math.PI),r={key:i(e.data),value:s(e.data),percent:d3.format("%")(n)};return e.value&&n>v?r[p]:""})}}),S}var t={top:0,right:0,bottom:0,left:0},n=500,r=500,i=function(e){return e.x},s=function(e){return e.y},o=function(e){return e.description},u=Math.floor(Math.random()*1e4),a=e.utils.defaultColor(),f=d3.format(",.2f"),l=!0,c=!0,h=!1,p="key",v=.02,m=!1,g=!1,y=!1,b=!1,w=.5,E=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return S.dispatch=E,S.options=e.utils.optionsFunc.bind(S),S.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,S):t},S.width=function(e){return arguments.length?(n=e,S):n},S.height=function(e){return arguments.length?(r=e,S):r},S.values=function(t){return e.log("pie.values() is no longer supported."),S},S.x=function(e){return arguments.length?(i=e,S):i},S.y=function(e){return arguments.length?(s=d3.functor(e),S):s},S.description=function(e){return arguments.length?(o=e,S):o},S.showLabels=function(e){return arguments.length?(l=e,S):l},S.labelSunbeamLayout=function(e){return arguments.length?(g=e,S):g},S.donutLabelsOutside=function(e){return arguments.length?(h=e,S):h},S.pieLabelsOutside=function(e){return arguments.length?(c=e,S):c},S.labelType=function(e){return arguments.length?(p=e,p=p||"key",S):p},S.donut=function(e){return arguments.length?(m=e,S):m},S.donutRatio=function(e){return arguments.length?(w=e,S):w},S.startAngle=function(e){return arguments.length?(y=e,S):y},S.endAngle=function(e){return arguments.length?(b=e,S):b},S.id=function(e){return arguments.length?(u=e,S):u},S.color=function(t){return arguments.length?(a=e.utils.getColor(t),S):a},S.valueFormat=function(e){return arguments.length?(f=e,S):f},S.labelThreshold=function(e){return arguments.length?(v=e,S):v},S},e.models.pieChart=function(){"use strict";function v(e){return e.each(function(e){var u=d3.select(this),a=this,f=(i||parseInt(u.style("width"))||960)-r.left-r.right,d=(s||parseInt(u.style("height"))||400)-r.top-r.bottom;v.update=function(){u.transition().call(v)},v.container=this,l.disabled=e.map(function(e){return!!e.disabled});if(!c){var m;c={};for(m in l)l[m]instanceof Array?c[m]=l[m].slice(0):c[m]=l[m]}if(!e||!e.length){var g=u.selectAll(".nv-noData").data([h]);return g.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),g.attr("x",r.left+f/2).attr("y",r.top+d/2).text(function(e){return e}),v}u.selectAll(".nv-noData").remove();var y=u.selectAll("g.nv-wrap.nv-pieChart").data([e]),b=y.enter().append("g").attr("class","nvd3 nv-wrap nv-pieChart").append("g"),w=y.select("g");b.append("g").attr("class","nv-pieWrap"),b.append("g").attr("class","nv-legendWrap"),o&&(n.width(f).key(t.x()),y.select(".nv-legendWrap").datum(e).call(n),r.top!=n.height()&&(r.top=n.height(),d=(s||parseInt(u.style("height"))||400)-r.top-r.bottom),y.select(".nv-legendWrap").attr("transform","translate(0,"+ -r.top+")")),y.attr("transform","translate("+r.left+","+r.top+")"),t.width(f).height(d);var E=w.select(".nv-pieWrap").datum([e]);d3.transition(E).call(t),n.dispatch.on("stateChange",function(e){l=e,p.stateChange(l),v.update()}),t.dispatch.on("elementMouseout.tooltip",function(e){p.tooltipHide(e)}),p.on("changeState",function(t){typeof t.disabled!="undefined"&&(e.forEach(function(e,n){e.disabled=t.disabled[n]}),l.disabled=t.disabled),v.update()})}),v}var t=e.models.pie(),n=e.models.legend(),r={top:30,right:20,bottom:20,left:20},i=null,s=null,o=!0,u=e.utils.defaultColor(),a=!0,f=function(e,t,n,r){return"<h3>"+e+"</h3>"+"<p>"+t+"</p>"},l={},c=null,h="No Data Available.",p=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),d=function(n,r){var i=t.description()(n.point)||t.x()(n.point),s=n.pos[0]+(r&&r.offsetLeft||0),o=n.pos[1]+(r&&r.offsetTop||0),u=t.valueFormat()(t.y()(n.point)),a=f(i,u,n,v);e.tooltip.show([s,o],a,n.value<0?"n":"s",null,r)};return t.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+r.left,e.pos[1]+r.top],p.tooltipShow(e)}),p.on("tooltipShow",function(e){a&&d(e)}),p.on("tooltipHide",function(){a&&e.tooltip.cleanup()}),v.legend=n,v.dispatch=p,v.pie=t,d3.rebind(v,t,"valueFormat","values","x","y","description","id","showLabels","donutLabelsOutside","pieLabelsOutside","labelType","donut","donutRatio","labelThreshold"),v.options=e.utils.optionsFunc.bind(v),v.margin=function(e){return arguments.length?(r.top=typeof e.top!="undefined"?e.top:r.top,r.right=typeof e.right!="undefined"?e.right:r.right,r.bottom=typeof e.bottom!="undefined"?e.bottom:r.bottom,r.left=typeof e.left!="undefined"?e.left:r.left,v):r},v.width=function(e){return arguments.length?(i=e,v):i},v.height=function(e){return arguments.length?(s=e,v):s},v.color=function(r){return arguments.length?(u=e.utils.getColor(r),n.color(u),t.color(u),v):u},v.showLegend=function(e){return arguments.length?(o=e,v):o},v.tooltips=function(e){return arguments.length?(a=e,v):a},v.tooltipContent=function(e){return arguments.length?(f=e,v):f},v.state=function(e){return arguments.length?(l=e,v):l},v.defaultState=function(e){return arguments.length?(c=e,v):c},v.noData=function(e){return arguments.length?(h=e,v):h},v},e.models.scatter=function(){"use strict";function I(q){return q.each(function(I){function Q(){if(!g)return!1;var e,i=d3.merge(I.map(function(e,t){return e.values.map(function(e,n){var r=f(e,n),i=l(e,n);return[o(r)+Math.random()*1e-7,u(i)+Math.random()*1e-7,t,n,e]}).filter(function(e,t){return b(e[4],t)})}));if(D===!0){if(x){var a=X.select("defs").selectAll(".nv-point-clips").data([s]).enter();a.append("clipPath").attr("class","nv-point-clips").attr("id","nv-points-clip-"+s);var c=X.select("#nv-points-clip-"+s).selectAll("circle").data(i);c.enter().append("circle").attr("r",T),c.exit().remove(),c.attr("cx",function(e){return e[0]}).attr("cy",function(e){return e[1]}),X.select(".nv-point-paths").attr("clip-path","url(#nv-points-clip-"+s+")")}i.length&&(i.push([o.range()[0]-20,u.range()[0]-20,null,null]),i.push([o.range()[1]+20,u.range()[1]+20,null,null]),i.push([o.range()[0]-20,u.range()[0]+20,null,null]),i.push([o.range()[1]+20,u.range()[1]-20,null,null]));var h=d3.geom.polygon([[-10,-10],[-10,r+10],[n+10,r+10],[n+10,-10]]),p=d3.geom.voronoi(i).map(function(e,t){return{data:h.clip(e),series:i[t][2],point:i[t][3]}}),d=X.select(".nv-point-paths").selectAll("path").data(p);d.enter().append("path").attr("class",function(e,t){return"nv-path-"+t}),d.exit().remove(),d.attr("d",function(e){return e.data.length===0?"M 0 0":"M"+e.data.join("L")+"Z"});var v=function(e,n){if(F)return 0;var r=I[e.series];if(typeof r=="undefined")return;var i=r.values[e.point];n({point:i,series:r,pos:[o(f(i,e.point))+t.left,u(l(i,e.point))+t.top],seriesIndex:e.series,pointIndex:e.point})};d.on("click",function(e){v(e,_.elementClick)}).on("mouseover",function(e){v(e,_.elementMouseover)}).on("mouseout",function(e,t){v(e,_.elementMouseout)})}else X.select(".nv-groups").selectAll(".nv-group").selectAll(".nv-point").on("click",function(e,n){if(F||!I[e.series])return 0;var r=I[e.series],i=r.values[n];_.elementClick({point:i,series:r,pos:[o(f(i,n))+t.left,u(l(i,n))+t.top],seriesIndex:e.series,pointIndex:n})}).on("mouseover",function(e,n){if(F||!I[e.series])return 0;var r=I[e.series],i=r.values[n];_.elementMouseover({point:i,series:r,pos:[o(f(i,n))+t.left,u(l(i,n))+t.top],seriesIndex:e.series,pointIndex:n})}).on("mouseout",function(e,t){if(F||!I[e.series])return 0;var n=I[e.series],r=n.values[t];_.elementMouseout({point:r,series:n,seriesIndex:e.series,pointIndex:t})});F=!1}var q=n-t.left-t.right,R=r-t.top-t.bottom,U=d3.select(this);I.forEach(function(e,t){e.values.forEach(function(e){e.series=t})});var W=N&&C&&A?[]:d3.merge(I.map(function(e){return e.values.map(function(e,t){return{x:f(e,t),y:l(e,t),size:c(e,t)}})}));o.domain(N||d3.extent(W.map(function(e){return e.x}).concat(d))),w&&I[0]?o.range(k||[(q*E+q)/(2*I[0].values.length),q-q*(1+E)/(2*I[0].values.length)]):o.range(k||[0,q]),u.domain(C||d3.extent(W.map(function(e){return e.y}).concat(v))).range(L||[R,0]),a.domain(A||d3.extent(W.map(function(e){return e.size}).concat(m))).range(O||[16,256]);if(o.domain()[0]===o.domain()[1]||u.domain()[0]===u.domain()[1])M=!0;o.domain()[0]===o.domain()[1]&&(o.domain()[0]?o.domain([o.domain()[0]-o.domain()[0]*.01,o.domain()[1]+o.domain()[1]*.01]):o.domain([-1,1])),u.domain()[0]===u.domain()[1]&&(u.domain()[0]?u.domain([u.domain()[0]-u.domain()[0]*.01,u.domain()[1]+u.domain()[1]*.01]):u.domain([-1,1])),isNaN(o.domain()[0])&&o.domain([-1,1]),isNaN(u.domain()[0])&&u.domain([-1,1]),P=P||o,H=H||u,B=B||a;var X=U.selectAll("g.nv-wrap.nv-scatter").data([I]),V=X.enter().append("g").attr("class","nvd3 nv-wrap nv-scatter nv-chart-"+s+(M?" nv-single-point":"")),$=V.append("defs"),J=V.append("g"),K=X.select("g");J.append("g").attr("class","nv-groups"),J.append("g").attr("class","nv-point-paths"),X.attr("transform","translate("+t.left+","+t.top+")"),$.append("clipPath").attr("id","nv-edge-clip-"+s).append("rect"),X.select("#nv-edge-clip-"+s+" rect").attr("width",q).attr("height",R>0?R:0),K.attr("clip-path",S?"url(#nv-edge-clip-"+s+")":""),F=!0;var G=X.select(".nv-groups").selectAll(".nv-group").data(function(e){return e},function(e){return e.key});G.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),G.exit().remove(),G.attr("class",function(e,t){return"nv-group nv-series-"+t}).classed("hover",function(e){return e.hover}),G.transition().style("fill",function(e,t){return i(e,t)}).style("stroke",function(e,t){return i(e,t)}).style("stroke-opacity",1).style("fill-opacity",.5);if(p){var Y=G.selectAll("circle.nv-point").data(function(e){return e.values},y);Y.enter().append("circle").style("fill",function(e,t){return e.color}).style("stroke",function(e,t){return e.color}).attr("cx",function(t,n){return e.utils.NaNtoZero(P(f(t,n)))}).attr("cy",function(t,n){return e.utils.NaNtoZero(H(l(t,n)))}).attr("r",function(e,t){return Math.sqrt(a(c(e,t))/Math.PI)}),Y.exit().remove(),G.exit().selectAll("path.nv-point").transition().attr("cx",function(t,n){return e.utils.NaNtoZero(o(f(t,n)))}).attr("cy",function(t,n){return e.utils.NaNtoZero(u(l(t,n)))}).remove(),Y.each(function(e,t){d3.select(this).classed("nv-point",!0).classed("nv-point-"+t,!0).classed("hover",!1)}),Y.transition().attr("cx",function(t,n){return e.utils.NaNtoZero(o(f(t,n)))}).attr("cy",function(t,n){return e.utils.NaNtoZero(u(l(t,n)))}).attr("r",function(e,t){return Math.sqrt(a(c(e,t))/Math.PI)})}else{var Y=G.selectAll("path.nv-point").data(function(e){return e.values});Y.enter().append("path").style("fill",function(e,t){return e.color}).style("stroke",function(e,t){return e.color}).attr("transform",function(e,t){return"translate("+P(f(e,t))+","+H(l(e,t))+")"}).attr("d",d3.svg.symbol().type(h).size(function(e,t){return a(c(e,t))})),Y.exit().remove(),G.exit().selectAll("path.nv-point").transition().attr("transform",function(e,t){return"translate("+o(f(e,t))+","+u(l(e,t))+")"}).remove(),Y.each(function(e,t){d3.select(this).classed("nv-point",!0).classed("nv-point-"+t,!0).classed("hover",!1)}),Y.transition().attr("transform",function(e,t){return"translate("+o(f(e,t))+","+u(l(e,t))+")"}).attr("d",d3.svg.symbol().type(h).size(function(e,t){return a(c(e,t))}))}clearTimeout(j),j=setTimeout(Q,300),P=o.copy(),H=u.copy(),B=a.copy()}),I}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=e.utils.defaultColor(),s=Math.floor(Math.random()*1e5),o=d3.scale.linear(),u=d3.scale.linear(),a=d3.scale.linear(),f=function(e){return e.x},l=function(e){return e.y},c=function(e){return e.size||1},h=function(e){return e.shape||"circle"},p=!0,d=[],v=[],m=[],g=!0,y=null,b=function(e){return!e.notActive},w=!1,E=.1,S=!1,x=!0,T=function(){return 25},N=null,C=null,k=null,L=null,A=null,O=null,M=!1,_=d3.dispatch("elementClick","elementMouseover","elementMouseout"),D=!0,P,H,B,j,F=!1;return I.clearHighlights=function(){d3.selectAll(".nv-chart-"+s+" .nv-point.hover").classed("hover",!1)},I.highlightPoint=function(e,t,n){d3.select(".nv-chart-"+s+" .nv-series-"+e+" .nv-point-"+t).classed("hover",n)},_.on("elementMouseover.point",function(e){g&&I.highlightPoint(e.seriesIndex,e.pointIndex,!0)}),_.on("elementMouseout.point",function(e){g&&I.highlightPoint(e.seriesIndex,e.pointIndex,!1)}),I.dispatch=_,I.options=e.utils.optionsFunc.bind(I),I.x=function(e){return arguments.length?(f=d3.functor(e),I):f},I.y=function(e){return arguments.length?(l=d3.functor(e),I):l},I.size=function(e){return arguments.length?(c=d3.functor(e),I):c},I.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,I):t},I.width=function(e){return arguments.length?(n=e,I):n},I.height=function(e){return arguments.length?(r=e,I):r},I.xScale=function(e){return arguments.length?(o=e,I):o},I.yScale=function(e){return arguments.length?(u=e,I):u},I.zScale=function(e){return arguments.length?(a=e,I):a},I.xDomain=function(e){return arguments.length?(N=e,I):N},I.yDomain=function(e){return arguments.length?(C=e,I):C},I.sizeDomain=function(e){return arguments.length?(A=e,I):A},I.xRange=function(e){return arguments.length?(k=e,I):k},I.yRange=function(e){return arguments.length?(L=e,I):L},I.sizeRange=function(e){return arguments.length?(O=e,I):O},I.forceX=function(e){return arguments.length?(d=e,I):d},I.forceY=function(e){return arguments.length?(v=e,I):v},I.forceSize=function(e){return arguments.length?(m=e,I):m},I.interactive=function(e){return arguments.length?(g=e,I):g},I.pointKey=function(e){return arguments.length?(y=e,I):y},I.pointActive=function(e){return arguments.length?(b=e,I):b},I.padData=function(e){return arguments.length?(w=e,I):w},I.padDataOuter=function(e){return arguments.length?(E=e,I):E},I.clipEdge=function(e){return arguments.length?(S=e,I):S},I.clipVoronoi=function(e){return arguments.length?(x=e,I):x},I.useVoronoi=function(e){return arguments.length?(D=e,D===!1&&(x=!1),I):D},I.clipRadius=function(e){return arguments.length?(T=e,I):T},I.color=function(t){return arguments.length?(i=e.utils.getColor(t),I):i},I.shape=function(e){return arguments.length?(h=e,I):h},I.onlyCircles=function(e){return arguments.length?(p=e,I):p},I.id=function(e){return arguments.length?(s=e,I):s},I.singlePoint=function(e){return arguments.length?(M=e,I):M},I},e.models.scatterChart=function(){"use strict";function F(e){return e.each(function(e){function K(){if(T)return X.select(".nv-point-paths").style("pointer-events","all"),!1;X.select(".nv-point-paths").style("pointer-events","none");var i=d3.mouse(this);h.distortion(x).focus(i[0]),p.distortion(x).focus(i[1]),X.select(".nv-scatterWrap").call(t),b&&X.select(".nv-x.nv-axis").call(n),w&&X.select(".nv-y.nv-axis").call(r),X.select(".nv-distributionX").datum(e.filter(function(e){return!e.disabled})).call(o),X.select(".nv-distributionY").datum(e.filter(function(e){return!e.disabled})).call(u)}var C=d3.select(this),k=this,L=(f||parseInt(C.style("width"))||960)-a.left-a.right,I=(l||parseInt(C.style("height"))||400)-a.top-a.bottom;F.update=function(){C.transition().duration(D).call(F)},F.container=this,A.disabled=e.map(function(e){return!!e.disabled});if(!O){var q;O={};for(q in A)A[q]instanceof Array?O[q]=A[q].slice(0):O[q]=A[q]}if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var R=C.selectAll(".nv-noData").data([_]);return R.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),R.attr("x",a.left+L/2).attr("y",a.top+I/2).text(function(e){return e}),F}C.selectAll(".nv-noData").remove(),P=P||h,H=H||p;var U=C.selectAll("g.nv-wrap.nv-scatterChart").data([e]),z=U.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+t.id()),W=z.append("g"),X=U.select("g");W.append("rect").attr("class","nvd3 nv-background"),W.append("g").attr("class","nv-x nv-axis"),W.append("g").attr("class","nv-y nv-axis"),W.append("g").attr("class","nv-scatterWrap"),W.append("g").attr("class","nv-distWrap"),W.append("g").attr("class","nv-legendWrap"),W.append("g").attr("class","nv-controlsWrap");if(y){var V=S?L/2:L;i.width(V),U.select(".nv-legendWrap").datum(e).call(i),a.top!=i.height()&&(a.top=i.height(),I=(l||parseInt(C.style("height"))||400)-a.top-a.bottom),U.select(".nv-legendWrap").attr("transform","translate("+(L-V)+","+ -a.top+")")}S&&(s.width(180).color(["#444"]),X.select(".nv-controlsWrap").datum(j).attr("transform","translate(0,"+ -a.top+")").call(s)),U.attr("transform","translate("+a.left+","+a.top+")"),E&&X.select(".nv-y.nv-axis").attr("transform","translate("+L+",0)"),t.width(L).height(I).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),d!==0&&t.xDomain(null),v!==0&&t.yDomain(null),U.select(".nv-scatterWrap").datum(e.filter(function(e){return!e.disabled})).call(t);if(d!==0){var $=h.domain()[1]-h.domain()[0];t.xDomain([h.domain()[0]-d*$,h.domain()[1]+d*$])}if(v!==0){var J=p.domain()[1]-p.domain()[0];t.yDomain([p.domain()[0]-v*J,p.domain()[1]+v*J])}(v!==0||d!==0)&&U.select(".nv-scatterWrap").datum(e.filter(function(e){return!e.disabled})).call(t),b&&(n.scale(h).ticks(n.ticks()&&n.ticks().length?n.ticks():L/100).tickSize(-I,0),X.select(".nv-x.nv-axis").attr("transform","translate(0,"+p.range()[0]+")").call(n)),w&&(r.scale(p).ticks(r.ticks()&&r.ticks().length?r.ticks():I/36).tickSize(-L,0),X.select(".nv-y.nv-axis").call(r)),m&&(o.getData(t.x()).scale(h).width(L).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),W.select(".nv-distWrap").append("g").attr("class","nv-distributionX"),X.select(".nv-distributionX").attr("transform","translate(0,"+p.range()[0]+")").datum(e.filter(function(e){return!e.disabled})).call(o)),g&&(u.getData(t.y()).scale(p).width(I).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),W.select(".nv-distWrap").append("g").attr("class","nv-distributionY"),X.select(".nv-distributionY").attr("transform","translate("+(E?L:-u.size())+",0)").datum(e.filter(function(e){return!e.disabled})).call(u)),d3.fisheye&&(X.select(".nv-background").attr("width",L).attr("height",I),X.select(".nv-background").on("mousemove",K),X.select(".nv-background").on("click",function(){T=!T}),t.dispatch.on("elementClick.freezeFisheye",function(){T=!T})),s.dispatch.on("legendClick",function(e,i){e.disabled=!e.disabled,x=e.disabled?0:2.5,X.select(".nv-background").style("pointer-events",e.disabled?"none":"all"),X.select(".nv-point-paths").style("pointer-events",e.disabled?"all":"none"),e.disabled?(h.distortion(x).focus(0),p.distortion(x).focus(0),X.select(".nv-scatterWrap").call(t),X.select(".nv-x.nv-axis").call(n),X.select(".nv-y.nv-axis").call(r)):T=!1,F.update()}),i.dispatch.on("stateChange",function(e){A.disabled=e.disabled,M.stateChange(A),F.update()}),t.dispatch.on("elementMouseover.tooltip",function(e){d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-distx-"+e.pointIndex).attr("y1",function(t,n){return e.pos[1]-I}),d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-disty-"+e.pointIndex).attr("x2",e.pos[0]+o.size()),e.pos=[e.pos[0]+a.left,e.pos[1]+a.top],M.tooltipShow(e)}),M.on("tooltipShow",function(e){N&&B(e,k.parentNode)}),M.on("changeState",function(t){typeof t.disabled!="undefined"&&(e.forEach(function(e,n){e.disabled=t.disabled[n]}),A.disabled=t.disabled),F.update()}),P=h.copy(),H=p.copy()}),F}var t=e.models.scatter(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s=e.models.legend(),o=e.models.distribution(),u=e.models.distribution(),a={top:30,right:20,bottom:50,left:75},f=null,l=null,c=e.utils.defaultColor(),h=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):t.xScale(),p=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):t.yScale(),d=0,v=0,m=!1,g=!1,y=!0,b=!0,w=!0,E=!1,S=!!d3.fisheye,x=0,T=!1,N=!0,C=function(e,t,n){return"<strong>"+t+"</strong>"},k=function(e,t,n){return"<strong>"+n+"</strong>"},L=null,A={},O=null,M=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),_="No Data Available.",D=250;t.xScale(h).yScale(p),n.orient("bottom").tickPadding(10),r.orient(E?"right":"left").tickPadding(10),o.axis("x"),u.axis("y"),s.updateState(!1);var P,H,B=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),f=i.pos[0]+(s.offsetLeft||0),l=p.range()[0]+a.top+(s.offsetTop||0),c=h.range()[0]+a.left+(s.offsetLeft||0),d=i.pos[1]+(s.offsetTop||0),v=n.tickFormat()(t.x()(i.point,i.pointIndex)),m=r.tickFormat()(t.y()(i.point,i.pointIndex));C!=null&&e.tooltip.show([f,l],C(i.series.key,v,m,i,F),"n",1,s,"x-nvtooltip"),k!=null&&e.tooltip.show([c,d],k(i.series.key,v,m,i,F),"e",1,s,"y-nvtooltip"),L!=null&&e.tooltip.show([o,u],L(i.series.key,v,m,i,F),i.value<0?"n":"s",null,s)},j=[{key:"Magnify",disabled:!0}];return t.dispatch.on("elementMouseout.tooltip",function(e){M.tooltipHide(e),d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-distx-"+e.pointIndex).attr("y1",0),d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-disty-"+e.pointIndex).attr("x2",u.size())}),M.on("tooltipHide",function(){N&&e.tooltip.cleanup()}),F.dispatch=M,F.scatter=t,F.legend=i,F.controls=s,F.xAxis=n,F.yAxis=r,F.distX=o,F.distY=u,d3.rebind(F,t,"id","interactive","pointActive","x","y","shape","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","sizeRange","forceX","forceY","forceSize","clipVoronoi","clipRadius","useVoronoi"),F.options=e.utils.optionsFunc.bind(F),F.margin=function(e){return arguments.length?(a.top=typeof e.top!="undefined"?e.top:a.top,a.right=typeof e.right!="undefined"?e.right:a.right,a.bottom=typeof e.bottom!="undefined"?e.bottom:a.bottom,a.left=typeof e.left!="undefined"?e.left:a.left,F):a},F.width=function(e){return arguments.length?(f=e,F):f},F.height=function(e){return arguments.length?(l=e,F):l},F.color=function(t){return arguments.length?(c=e.utils.getColor(t),i.color(c),o.color(c),u.color(c),F):c},F.showDistX=function(e){return arguments.length?(m=e,F):m},F.showDistY=function(e){return arguments.length?(g=e,F):g},F.showControls=function(e){return arguments.length?(S=e,F):S},F.showLegend=function(e){return arguments.length?(y=e,F):y},F.showXAxis=function(e){return arguments.length?(b=e,F):b},F.showYAxis=function(e){return arguments.length?(w=e,F):w},F.rightAlignYAxis=function(e){return arguments.length?(E=e,r.orient(e?"right":"left"),F):E},F.fisheye=function(e){return arguments.length?(x=e,F):x},F.xPadding=function(e){return arguments.length?(d=e,F):d},F.yPadding=function(e){return arguments.length?(v=e,F):v},F.tooltips=function(e){return arguments.length?(N=e,F):N},F.tooltipContent=function(e){return arguments.length?(L=e,F):L},F.tooltipXContent=function(e){return arguments.length?(C=e,F):C},F.tooltipYContent=function(e){return arguments.length?(k=e,F):k},F.state=function(e){return arguments.length?(A=e,F):A},F.defaultState=function(e){return arguments.length?(O=e,F):O},F.noData=function(e){return arguments.length?(_=e,F):_},F.transitionDuration=function(e){return arguments.length?(D=e,F):D},F},e.models.scatterPlusLineChart=function(){"use strict";function B(e){return e.each(function(e){function $(){if(S)return z.select(".nv-point-paths").style("pointer-events","all"),!1;z.select(".nv-point-paths").style("pointer-events","none");var i=d3.mouse(this);h.distortion(E).focus(i[0]),p.distortion(E).focus(i[1]),z.select(".nv-scatterWrap").datum(e.filter(function(e){return!e.disabled})).call(t),g&&z.select(".nv-x.nv-axis").call(n),y&&z.select(".nv-y.nv-axis").call(r),z.select(".nv-distributionX").datum(e.filter(function(e){return!e.disabled})).call(o),z.select(".nv-distributionY").datum(e.filter(function(e){return!e.disabled})).call(u)}var T=d3.select(this),N=this,C=(f||parseInt(T.style("width"))||960)-a.left-a.right,j=(l||parseInt(T.style("height"))||400)-a.top-a.bottom;B.update=function(){T.transition().duration(M).call(B)},B.container=this,k.disabled=e.map(function(e){return!!e.disabled});if(!L){var F;L={};for(F in k)k[F]instanceof Array?L[F]=k[F].slice(0):L[F]=k[F]}if(!e||!e.length||!e.filter(function(e){return e.values.length}).length){var I=T.selectAll(".nv-noData").data([O]);return I.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),I.attr("x",a.left+C/2).attr("y",a.top+j/2).text(function(e){return e}),B}T.selectAll(".nv-noData").remove(),h=t.xScale(),p=t.yScale(),_=_||h,D=D||p;var q=T.selectAll("g.nv-wrap.nv-scatterChart").data([e]),R=q.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+t.id()),U=R.append("g"),z=q.select("g");U.append("rect").attr("class","nvd3 nv-background").style("pointer-events","none"),U.append("g").attr("class","nv-x nv-axis"),U.append("g").attr("class","nv-y nv-axis"),U.append("g").attr("class","nv-scatterWrap"),U.append("g").attr("class","nv-regressionLinesWrap"),U.append("g").attr("class","nv-distWrap"),U.append("g").attr("class","nv-legendWrap"),U.append("g").attr("class","nv-controlsWrap"),q.attr("transform","translate("+a.left+","+a.top+")"),b&&z.select(".nv-y.nv-axis").attr("transform","translate("+C+",0)"),m&&(i.width(C/2),q.select(".nv-legendWrap").datum(e).call(i),a.top!=i.height()&&(a.top=i.height(),j=(l||parseInt(T.style("height"))||400)-a.top-a.bottom),q.select(".nv-legendWrap").attr("transform","translate("+C/2+","+ -a.top+")")),w&&(s.width(180).color(["#444"]),z.select(".nv-controlsWrap").datum(H).attr("transform","translate(0,"+ -a.top+")").call(s)),t.width(C).height(j).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),q.select(".nv-scatterWrap").datum(e.filter(function(e){return!e.disabled})).call(t),q.select(".nv-regressionLinesWrap").attr("clip-path","url(#nv-edge-clip-"+t.id()+")");var W=q.select(".nv-regressionLinesWrap").selectAll(".nv-regLines").data(function(e){return e});W.enter().append("g").attr("class","nv-regLines");var X=W.selectAll(".nv-regLine").data(function(e){return[e]}),V=X.enter().append("line").attr("class","nv-regLine").style("stroke-opacity",0);X.transition().attr("x1",h.range()[0]).attr("x2",h.range()[1]).attr("y1",function(e,t){return p(h.domain()[0]*e.slope+e.intercept)}).attr("y2",function(e,t){return p(h.domain()[1]*e.slope+e.intercept)}).style("stroke",function(e,t,n){return c(e,n)}).style("stroke-opacity",function(e,t){return e.disabled||typeof e.slope=="undefined"||typeof e.intercept=="undefined"?0:1}),g&&(n.scale(h).ticks(n.ticks()?n.ticks():C/100).tickSize(-j,0),z.select(".nv-x.nv-axis").attr("transform","translate(0,"+p.range()[0]+")").call(n)),y&&(r.scale(p).ticks(r.ticks()?r.ticks():j/36).tickSize(-C,0),z.select(".nv-y.nv-axis").call(r)),d&&(o.getData(t.x()).scale(h).width(C).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),U.select(".nv-distWrap").append("g").attr("class","nv-distributionX"),z.select(".nv-distributionX").attr("transform","translate(0,"+p.range()[0]+")").datum(e.filter(function(e){return!e.disabled})).call(o)),v&&(u.getData(t.y()).scale(p).width(
j).color(e.map(function(e,t){return e.color||c(e,t)}).filter(function(t,n){return!e[n].disabled})),U.select(".nv-distWrap").append("g").attr("class","nv-distributionY"),z.select(".nv-distributionY").attr("transform","translate("+(b?C:-u.size())+",0)").datum(e.filter(function(e){return!e.disabled})).call(u)),d3.fisheye&&(z.select(".nv-background").attr("width",C).attr("height",j),z.select(".nv-background").on("mousemove",$),z.select(".nv-background").on("click",function(){S=!S}),t.dispatch.on("elementClick.freezeFisheye",function(){S=!S})),s.dispatch.on("legendClick",function(e,i){e.disabled=!e.disabled,E=e.disabled?0:2.5,z.select(".nv-background").style("pointer-events",e.disabled?"none":"all"),z.select(".nv-point-paths").style("pointer-events",e.disabled?"all":"none"),e.disabled?(h.distortion(E).focus(0),p.distortion(E).focus(0),z.select(".nv-scatterWrap").call(t),z.select(".nv-x.nv-axis").call(n),z.select(".nv-y.nv-axis").call(r)):S=!1,B.update()}),i.dispatch.on("stateChange",function(e){k=e,A.stateChange(k),B.update()}),t.dispatch.on("elementMouseover.tooltip",function(e){d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-distx-"+e.pointIndex).attr("y1",e.pos[1]-j),d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-disty-"+e.pointIndex).attr("x2",e.pos[0]+o.size()),e.pos=[e.pos[0]+a.left,e.pos[1]+a.top],A.tooltipShow(e)}),A.on("tooltipShow",function(e){x&&P(e,N.parentNode)}),A.on("changeState",function(t){typeof t.disabled!="undefined"&&(e.forEach(function(e,n){e.disabled=t.disabled[n]}),k.disabled=t.disabled),B.update()}),_=h.copy(),D=p.copy()}),B}var t=e.models.scatter(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s=e.models.legend(),o=e.models.distribution(),u=e.models.distribution(),a={top:30,right:20,bottom:50,left:75},f=null,l=null,c=e.utils.defaultColor(),h=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):t.xScale(),p=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):t.yScale(),d=!1,v=!1,m=!0,g=!0,y=!0,b=!1,w=!!d3.fisheye,E=0,S=!1,x=!0,T=function(e,t,n){return"<strong>"+t+"</strong>"},N=function(e,t,n){return"<strong>"+n+"</strong>"},C=function(e,t,n,r){return"<h3>"+e+"</h3>"+"<p>"+r+"</p>"},k={},L=null,A=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),O="No Data Available.",M=250;t.xScale(h).yScale(p),n.orient("bottom").tickPadding(10),r.orient(b?"right":"left").tickPadding(10),o.axis("x"),u.axis("y"),s.updateState(!1);var _,D,P=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),f=i.pos[0]+(s.offsetLeft||0),l=p.range()[0]+a.top+(s.offsetTop||0),c=h.range()[0]+a.left+(s.offsetLeft||0),d=i.pos[1]+(s.offsetTop||0),v=n.tickFormat()(t.x()(i.point,i.pointIndex)),m=r.tickFormat()(t.y()(i.point,i.pointIndex));T!=null&&e.tooltip.show([f,l],T(i.series.key,v,m,i,B),"n",1,s,"x-nvtooltip"),N!=null&&e.tooltip.show([c,d],N(i.series.key,v,m,i,B),"e",1,s,"y-nvtooltip"),C!=null&&e.tooltip.show([o,u],C(i.series.key,v,m,i.point.tooltip,i,B),i.value<0?"n":"s",null,s)},H=[{key:"Magnify",disabled:!0}];return t.dispatch.on("elementMouseout.tooltip",function(e){A.tooltipHide(e),d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-distx-"+e.pointIndex).attr("y1",0),d3.select(".nv-chart-"+t.id()+" .nv-series-"+e.seriesIndex+" .nv-disty-"+e.pointIndex).attr("x2",u.size())}),A.on("tooltipHide",function(){x&&e.tooltip.cleanup()}),B.dispatch=A,B.scatter=t,B.legend=i,B.controls=s,B.xAxis=n,B.yAxis=r,B.distX=o,B.distY=u,d3.rebind(B,t,"id","interactive","pointActive","x","y","shape","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","sizeRange","forceX","forceY","forceSize","clipVoronoi","clipRadius","useVoronoi"),B.options=e.utils.optionsFunc.bind(B),B.margin=function(e){return arguments.length?(a.top=typeof e.top!="undefined"?e.top:a.top,a.right=typeof e.right!="undefined"?e.right:a.right,a.bottom=typeof e.bottom!="undefined"?e.bottom:a.bottom,a.left=typeof e.left!="undefined"?e.left:a.left,B):a},B.width=function(e){return arguments.length?(f=e,B):f},B.height=function(e){return arguments.length?(l=e,B):l},B.color=function(t){return arguments.length?(c=e.utils.getColor(t),i.color(c),o.color(c),u.color(c),B):c},B.showDistX=function(e){return arguments.length?(d=e,B):d},B.showDistY=function(e){return arguments.length?(v=e,B):v},B.showControls=function(e){return arguments.length?(w=e,B):w},B.showLegend=function(e){return arguments.length?(m=e,B):m},B.showXAxis=function(e){return arguments.length?(g=e,B):g},B.showYAxis=function(e){return arguments.length?(y=e,B):y},B.rightAlignYAxis=function(e){return arguments.length?(b=e,r.orient(e?"right":"left"),B):b},B.fisheye=function(e){return arguments.length?(E=e,B):E},B.tooltips=function(e){return arguments.length?(x=e,B):x},B.tooltipContent=function(e){return arguments.length?(C=e,B):C},B.tooltipXContent=function(e){return arguments.length?(T=e,B):T},B.tooltipYContent=function(e){return arguments.length?(N=e,B):N},B.state=function(e){return arguments.length?(k=e,B):k},B.defaultState=function(e){return arguments.length?(L=e,B):L},B.noData=function(e){return arguments.length?(O=e,B):O},B.transitionDuration=function(e){return arguments.length?(M=e,B):M},B},e.models.sparkline=function(){"use strict";function d(e){return e.each(function(e){var i=n-t.left-t.right,d=r-t.top-t.bottom,v=d3.select(this);s.domain(l||d3.extent(e,u)).range(h||[0,i]),o.domain(c||d3.extent(e,a)).range(p||[d,0]);var m=v.selectAll("g.nv-wrap.nv-sparkline").data([e]),g=m.enter().append("g").attr("class","nvd3 nv-wrap nv-sparkline"),b=g.append("g"),w=m.select("g");m.attr("transform","translate("+t.left+","+t.top+")");var E=m.selectAll("path").data(function(e){return[e]});E.enter().append("path"),E.exit().remove(),E.style("stroke",function(e,t){return e.color||f(e,t)}).attr("d",d3.svg.line().x(function(e,t){return s(u(e,t))}).y(function(e,t){return o(a(e,t))}));var S=m.selectAll("circle.nv-point").data(function(e){function n(t){if(t!=-1){var n=e[t];return n.pointIndex=t,n}return null}var t=e.map(function(e,t){return a(e,t)}),r=n(t.lastIndexOf(o.domain()[1])),i=n(t.indexOf(o.domain()[0])),s=n(t.length-1);return[i,r,s].filter(function(e){return e!=null})});S.enter().append("circle"),S.exit().remove(),S.attr("cx",function(e,t){return s(u(e,e.pointIndex))}).attr("cy",function(e,t){return o(a(e,e.pointIndex))}).attr("r",2).attr("class",function(e,t){return u(e,e.pointIndex)==s.domain()[1]?"nv-point nv-currentValue":a(e,e.pointIndex)==o.domain()[0]?"nv-point nv-minValue":"nv-point nv-maxValue"})}),d}var t={top:2,right:0,bottom:2,left:0},n=400,r=32,i=!0,s=d3.scale.linear(),o=d3.scale.linear(),u=function(e){return e.x},a=function(e){return e.y},f=e.utils.getColor(["#000"]),l,c,h,p;return d.options=e.utils.optionsFunc.bind(d),d.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,d):t},d.width=function(e){return arguments.length?(n=e,d):n},d.height=function(e){return arguments.length?(r=e,d):r},d.x=function(e){return arguments.length?(u=d3.functor(e),d):u},d.y=function(e){return arguments.length?(a=d3.functor(e),d):a},d.xScale=function(e){return arguments.length?(s=e,d):s},d.yScale=function(e){return arguments.length?(o=e,d):o},d.xDomain=function(e){return arguments.length?(l=e,d):l},d.yDomain=function(e){return arguments.length?(c=e,d):c},d.xRange=function(e){return arguments.length?(h=e,d):h},d.yRange=function(e){return arguments.length?(p=e,d):p},d.animate=function(e){return arguments.length?(i=e,d):i},d.color=function(t){return arguments.length?(f=e.utils.getColor(t),d):f},d},e.models.sparklinePlus=function(){"use strict";function v(e){return e.each(function(c){function O(){if(a)return;var e=C.selectAll(".nv-hoverValue").data(u),r=e.enter().append("g").attr("class","nv-hoverValue").style("stroke-opacity",0).style("fill-opacity",0);e.exit().transition().duration(250).style("stroke-opacity",0).style("fill-opacity",0).remove(),e.attr("transform",function(e){return"translate("+s(t.x()(c[e],e))+",0)"}).transition().duration(250).style("stroke-opacity",1).style("fill-opacity",1);if(!u.length)return;r.append("line").attr("x1",0).attr("y1",-n.top).attr("x2",0).attr("y2",b),r.append("text").attr("class","nv-xValue").attr("x",-6).attr("y",-n.top).attr("text-anchor","end").attr("dy",".9em"),C.select(".nv-hoverValue .nv-xValue").text(f(t.x()(c[u[0]],u[0]))),r.append("text").attr("class","nv-yValue").attr("x",6).attr("y",-n.top).attr("text-anchor","start").attr("dy",".9em"),C.select(".nv-hoverValue .nv-yValue").text(l(t.y()(c[u[0]],u[0])))}function M(){function r(e,n){var r=Math.abs(t.x()(e[0],0)-n),i=0;for(var s=0;s<e.length;s++)Math.abs(t.x()(e[s],s)-n)<r&&(r=Math.abs(t.x()(e[s],s)-n),i=s);return i}if(a)return;var e=d3.mouse(this)[0]-n.left;u=[r(c,Math.round(s.invert(e)))],O()}var m=d3.select(this),g=(r||parseInt(m.style("width"))||960)-n.left-n.right,b=(i||parseInt(m.style("height"))||400)-n.top-n.bottom;v.update=function(){v(e)},v.container=this;if(!c||!c.length){var w=m.selectAll(".nv-noData").data([d]);return w.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),w.attr("x",n.left+g/2).attr("y",n.top+b/2).text(function(e){return e}),v}m.selectAll(".nv-noData").remove();var E=t.y()(c[c.length-1],c.length-1);s=t.xScale(),o=t.yScale();var S=m.selectAll("g.nv-wrap.nv-sparklineplus").data([c]),T=S.enter().append("g").attr("class","nvd3 nv-wrap nv-sparklineplus"),N=T.append("g"),C=S.select("g");N.append("g").attr("class","nv-sparklineWrap"),N.append("g").attr("class","nv-valueWrap"),N.append("g").attr("class","nv-hoverArea"),S.attr("transform","translate("+n.left+","+n.top+")");var k=C.select(".nv-sparklineWrap");t.width(g).height(b),k.call(t);var L=C.select(".nv-valueWrap"),A=L.selectAll(".nv-currentValue").data([E]);A.enter().append("text").attr("class","nv-currentValue").attr("dx",p?-8:8).attr("dy",".9em").style("text-anchor",p?"end":"start"),A.attr("x",g+(p?n.right:0)).attr("y",h?function(e){return o(e)}:0).style("fill",t.color()(c[c.length-1],c.length-1)).text(l(E)),N.select(".nv-hoverArea").append("rect").on("mousemove",M).on("click",function(){a=!a}).on("mouseout",function(){u=[],O()}),C.select(".nv-hoverArea rect").attr("transform",function(e){return"translate("+ -n.left+","+ -n.top+")"}).attr("width",g+n.left+n.right).attr("height",b+n.top)}),v}var t=e.models.sparkline(),n={top:15,right:100,bottom:10,left:50},r=null,i=null,s,o,u=[],a=!1,f=d3.format(",r"),l=d3.format(",.2f"),c=!0,h=!0,p=!1,d="No Data Available.";return v.sparkline=t,d3.rebind(v,t,"x","y","xScale","yScale","color"),v.options=e.utils.optionsFunc.bind(v),v.margin=function(e){return arguments.length?(n.top=typeof e.top!="undefined"?e.top:n.top,n.right=typeof e.right!="undefined"?e.right:n.right,n.bottom=typeof e.bottom!="undefined"?e.bottom:n.bottom,n.left=typeof e.left!="undefined"?e.left:n.left,v):n},v.width=function(e){return arguments.length?(r=e,v):r},v.height=function(e){return arguments.length?(i=e,v):i},v.xTickFormat=function(e){return arguments.length?(f=e,v):f},v.yTickFormat=function(e){return arguments.length?(l=e,v):l},v.showValue=function(e){return arguments.length?(c=e,v):c},v.alignValue=function(e){return arguments.length?(h=e,v):h},v.rightAlignValue=function(e){return arguments.length?(p=e,v):p},v.noData=function(e){return arguments.length?(d=e,v):d},v},e.models.stackedArea=function(){"use strict";function g(e){return e.each(function(e){var a=n-t.left-t.right,b=r-t.top-t.bottom,w=d3.select(this);p=v.xScale(),d=v.yScale();var E=e;e.forEach(function(e,t){e.seriesIndex=t,e.values=e.values.map(function(e,n){return e.index=n,e.seriesIndex=t,e})});var S=e.filter(function(e){return!e.disabled});e=d3.layout.stack().order(l).offset(f).values(function(e){return e.values}).x(o).y(u).out(function(e,t,n){var r=u(e)===0?0:n;e.display={y:r,y0:t}})(S);var T=w.selectAll("g.nv-wrap.nv-stackedarea").data([e]),N=T.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedarea"),C=N.append("defs"),k=N.append("g"),L=T.select("g");k.append("g").attr("class","nv-areaWrap"),k.append("g").attr("class","nv-scatterWrap"),T.attr("transform","translate("+t.left+","+t.top+")"),v.width(a).height(b).x(o).y(function(e){return e.display.y+e.display.y0}).forceY([0]).color(e.map(function(e,t){return e.color||i(e,e.seriesIndex)}));var A=L.select(".nv-scatterWrap").datum(e);A.call(v),C.append("clipPath").attr("id","nv-edge-clip-"+s).append("rect"),T.select("#nv-edge-clip-"+s+" rect").attr("width",a).attr("height",b),L.attr("clip-path",h?"url(#nv-edge-clip-"+s+")":"");var O=d3.svg.area().x(function(e,t){return p(o(e,t))}).y0(function(e){return d(e.display.y0)}).y1(function(e){return d(e.display.y+e.display.y0)}).interpolate(c),M=d3.svg.area().x(function(e,t){return p(o(e,t))}).y0(function(e){return d(e.display.y0)}).y1(function(e){return d(e.display.y0)}),_=L.select(".nv-areaWrap").selectAll("path.nv-area").data(function(e){return e});_.enter().append("path").attr("class",function(e,t){return"nv-area nv-area-"+t}).attr("d",function(e,t){return M(e.values,e.seriesIndex)}).on("mouseover",function(e,t){d3.select(this).classed("hover",!0),m.areaMouseover({point:e,series:e.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:e.seriesIndex})}).on("mouseout",function(e,t){d3.select(this).classed("hover",!1),m.areaMouseout({point:e,series:e.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:e.seriesIndex})}).on("click",function(e,t){d3.select(this).classed("hover",!1),m.areaClick({point:e,series:e.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:e.seriesIndex})}),_.exit().remove(),_.style("fill",function(e,t){return e.color||i(e,e.seriesIndex)}).style("stroke",function(e,t){return e.color||i(e,e.seriesIndex)}),_.transition().attr("d",function(e,t){return O(e.values,t)}),v.dispatch.on("elementMouseover.area",function(e){L.select(".nv-chart-"+s+" .nv-area-"+e.seriesIndex).classed("hover",!0)}),v.dispatch.on("elementMouseout.area",function(e){L.select(".nv-chart-"+s+" .nv-area-"+e.seriesIndex).classed("hover",!1)}),g.d3_stackedOffset_stackPercent=function(e){var t=e.length,n=e[0].length,r=1/t,i,s,o,a=[];for(s=0;s<n;++s){for(i=0,o=0;i<E.length;i++)o+=u(E[i].values[s]);if(o)for(i=0;i<t;i++)e[i][s][1]/=o;else for(i=0;i<t;i++)e[i][s][1]=r}for(s=0;s<n;++s)a[s]=0;return a}}),g}var t={top:0,right:0,bottom:0,left:0},n=960,r=500,i=e.utils.defaultColor(),s=Math.floor(Math.random()*1e5),o=function(e){return e.x},u=function(e){return e.y},a="stack",f="zero",l="default",c="linear",h=!1,p,d,v=e.models.scatter(),m=d3.dispatch("tooltipShow","tooltipHide","areaClick","areaMouseover","areaMouseout");return v.size(2.2).sizeDomain([2.2,2.2]),v.dispatch.on("elementClick.area",function(e){m.areaClick(e)}),v.dispatch.on("elementMouseover.tooltip",function(e){e.pos=[e.pos[0]+t.left,e.pos[1]+t.top],m.tooltipShow(e)}),v.dispatch.on("elementMouseout.tooltip",function(e){m.tooltipHide(e)}),g.dispatch=m,g.scatter=v,d3.rebind(g,v,"interactive","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","forceX","forceY","forceSize","clipVoronoi","useVoronoi","clipRadius","highlightPoint","clearHighlights"),g.options=e.utils.optionsFunc.bind(g),g.x=function(e){return arguments.length?(o=d3.functor(e),g):o},g.y=function(e){return arguments.length?(u=d3.functor(e),g):u},g.margin=function(e){return arguments.length?(t.top=typeof e.top!="undefined"?e.top:t.top,t.right=typeof e.right!="undefined"?e.right:t.right,t.bottom=typeof e.bottom!="undefined"?e.bottom:t.bottom,t.left=typeof e.left!="undefined"?e.left:t.left,g):t},g.width=function(e){return arguments.length?(n=e,g):n},g.height=function(e){return arguments.length?(r=e,g):r},g.clipEdge=function(e){return arguments.length?(h=e,g):h},g.color=function(t){return arguments.length?(i=e.utils.getColor(t),g):i},g.offset=function(e){return arguments.length?(f=e,g):f},g.order=function(e){return arguments.length?(l=e,g):l},g.style=function(e){if(!arguments.length)return a;a=e;switch(a){case"stack":g.offset("zero"),g.order("default");break;case"stream":g.offset("wiggle"),g.order("inside-out");break;case"stream-center":g.offset("silhouette"),g.order("inside-out");break;case"expand":g.offset("expand"),g.order("default");break;case"stack_percent":g.offset(g.d3_stackedOffset_stackPercent),g.order("default")}return g},g.interpolate=function(e){return arguments.length?(c=e,g):c},g},e.models.stackedAreaChart=function(){"use strict";function M(y){return y.each(function(y){var _=d3.select(this),D=this,P=(a||parseInt(_.style("width"))||960)-u.left-u.right,H=(f||parseInt(_.style("height"))||400)-u.top-u.bottom;M.update=function(){_.transition().duration(A).call(M)},M.container=this,S.disabled=y.map(function(e){return!!e.disabled});if(!x){var B;x={};for(B in S)S[B]instanceof Array?x[B]=S[B].slice(0):x[B]=S[B]}if(!y||!y.length||!y.filter(function(e){return e.values.length}).length){var j=_.selectAll(".nv-noData").data([T]);return j.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),j.attr("x",u.left+P/2).attr("y",u.top+H/2).text(function(e){return e}),M}_.selectAll(".nv-noData").remove(),b=t.xScale(),w=t.yScale();var F=_.selectAll("g.nv-wrap.nv-stackedAreaChart").data([y]),I=F.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedAreaChart").append("g"),q=F.select("g");I.append("rect").style("opacity",0),I.append("g").attr("class","nv-x nv-axis"),I.append("g").attr("class","nv-y nv-axis"),I.append("g").attr("class","nv-stackedWrap"),I.append("g").attr("class","nv-legendWrap"),I.append("g").attr("class","nv-controlsWrap"),I.append("g").attr("class","nv-interactive"),q.select("rect").attr("width",P).attr("height",H);if(h){var R=c?P-C:P;i.width(R),q.select(".nv-legendWrap").datum(y).call(i),u.top!=i.height()&&(u.top=i.height(),H=(f||parseInt(_.style("height"))||400)-u.top-u.bottom),q.select(".nv-legendWrap").attr("transform","translate("+(P-R)+","+ -u.top+")")}if(c){var U=[{key:L.stacked||"Stacked",metaKey:"Stacked",disabled:t.style()!="stack",style:"stack"},{key:L.stream||"Stream",metaKey:"Stream",disabled:t.style()!="stream",style:"stream"},{key:L.expanded||"Expanded",metaKey:"Expanded",disabled:t.style()!="expand",style:"expand"},{key:L.stack_percent||"Stack %",metaKey:"Stack_Percent",disabled:t.style()!="stack_percent",style:"stack_percent"}];C=k.length/3*260,U=U.filter(function(e){return k.indexOf(e.metaKey)!==-1}),s.width(C).color(["#444","#444","#444"]),q.select(".nv-controlsWrap").datum(U).call(s),u.top!=Math.max(s.height(),i.height())&&(u.top=Math.max(s.height(),i.height()),H=(f||parseInt(_.style("height"))||400)-u.top-u.bottom),q.select(".nv-controlsWrap").attr("transform","translate(0,"+ -u.top+")")}F.attr("transform","translate("+u.left+","+u.top+")"),v&&q.select(".nv-y.nv-axis").attr("transform","translate("+P+",0)"),m&&(o.width(P).height(H).margin({left:u.left,top:u.top}).svgContainer(_).xScale(b),F.select(".nv-interactive").call(o)),t.width(P).height(H);var z=q.select(".nv-stackedWrap").datum(y);z.transition().call(t),p&&(n.scale(b).ticks(P/100).tickSize(-H,0),q.select(".nv-x.nv-axis").attr("transform","translate(0,"+H+")"),q.select(".nv-x.nv-axis").transition().duration(0).call(n)),d&&(r.scale(w).ticks(t.offset()=="wiggle"?0:H/36).tickSize(-P,0).setTickFormat(t.style()=="expand"||t.style()=="stack_percent"?d3.format("%"):E),q.select(".nv-y.nv-axis").transition().duration(0).call(r)),t.dispatch.on("areaClick.toggle",function(e){y.filter(function(e){return!e.disabled}).length===1?y.forEach(function(e){e.disabled=!1}):y.forEach(function(t,n){t.disabled=n!=e.seriesIndex}),S.disabled=y.map(function(e){return!!e.disabled}),N.stateChange(S),M.update()}),i.dispatch.on("stateChange",function(e){S.disabled=e.disabled,N.stateChange(S),M.update()}),s.dispatch.on("legendClick",function(e,n){if(!e.disabled)return;U=U.map(function(e){return e.disabled=!0,e}),e.disabled=!1,t.style(e.style),S.style=t.style(),N.stateChange(S),M.update()}),o.dispatch.on("elementMousemove",function(i){t.clearHighlights();var s,a,f,c=[];y.filter(function(e,t){return e.seriesIndex=t,!e.disabled}).forEach(function(n,r){a=e.interactiveBisect(n.values,i.pointXValue,M.x()),t.highlightPoint(r,a,!0);var o=n.values[a];if(typeof o=="undefined")return;typeof s=="undefined"&&(s=o),typeof f=="undefined"&&(f=M.xScale()(M.x()(o,a)));var u=t.style()=="expand"?o.display.y:M.y()(o,a);c.push({key:n.key,value:u,color:l(n,n.seriesIndex),stackedValue:o.display})}),c.reverse();if(c.length>2){var h=M.yScale().invert(i.mouseY),p=Infinity,d=null;c.forEach(function(e,t){h=Math.abs(h);var n=Math.abs(e.stackedValue.y0),r=Math.abs(e.stackedValue.y);if(h>=n&&h<=r+n){d=t;return}}),d!=null&&(c[d].highlight=!0)}var v=n.tickFormat()(M.x()(s,a)),m=t.style()=="expand"?function(e,t){return d3.format(".1%")(e)}:function(e,t){return r.tickFormat()(e)};o.tooltip.position({left:f+u.left,top:i.mouseY+u.top}).chartContainer(D.parentNode).enabled(g).valueFormatter(m).data({value:v,series:c})(),o.renderGuideLine(f)}),o.dispatch.on("elementMouseout",function(e){N.tooltipHide(),t.clearHighlights()}),N.on("tooltipShow",function(e){g&&O(e,D.parentNode)}),N.on("changeState",function(e){typeof e.disabled!="undefined"&&y.length===e.disabled.length&&(y.forEach(function(t,n){t.disabled=e.disabled[n]}),S.disabled=e.disabled),typeof e.style!="undefined"&&t.style(e.style),M.update()})}),M}var t=e.models.stackedArea(),n=e.models.axis(),r=e.models.axis(),i=e.models.legend(),s=e.models.legend(),o=e.interactiveGuideline(),u={top:30,right:25,bottom:50,left:60},a=null,f=null,l=e.utils.defaultColor(),c=!0,h=!0,p=!0,d=!0,v=!1,m=!1,g=!0,y=function(e,t,n,r,i){return"<h3>"+e+"</h3>"+"<p>"+n+" on "+t+"</p>"},b,w,E=d3.format(",.2f"),S={style:t.style()},x=null,T="No Data Available.",N=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),C=250,k=["Stacked","Stream","Expanded"],L={},A=250;n.orient("bottom").tickPadding(7),r.orient(v?"right":"left"),s.updateState(!1);var O=function(i,s){var o=i.pos[0]+(s.offsetLeft||0),u=i.pos[1]+(s.offsetTop||0),a=n.tickFormat()(t.x()(i.point,i.pointIndex)),f=r.tickFormat()(t.y()(i.point,i.pointIndex)),l=y(i.series.key,a,f,i,M);e.tooltip.show([o,u],l,i.value<0?"n":"s",null,s)};return t.dispatch.on("tooltipShow",function(e){e.pos=[e.pos[0]+u.left,e.pos[1]+u.top],N.tooltipShow(e)}),t.dispatch.on("tooltipHide",function(e){N.tooltipHide(e)}),N.on("tooltipHide",function(){g&&e.tooltip.cleanup()}),M.dispatch=N,M.stacked=t,M.legend=i,M.controls=s,M.xAxis=n,M.yAxis=r,M.interactiveLayer=o,d3.rebind(M,t,"x","y","size","xScale","yScale","xDomain","yDomain","xRange","yRange","sizeDomain","interactive","useVoronoi","offset","order","style","clipEdge","forceX","forceY","forceSize","interpolate"),M.options=e.utils.optionsFunc.bind(M),M.margin=function(e){return arguments.length?(u.top=typeof e.top!="undefined"?e.top:u.top,u.right=typeof e.right!="undefined"?e.right:u.right,u.bottom=typeof e.bottom!="undefined"?e.bottom:u.bottom,u.left=typeof e.left!="undefined"?e.left:u.left,M):u},M.width=function(e){return arguments.length?(a=e,M):a},M.height=function(e){return arguments.length?(f=e,M):f},M.color=function(n){return arguments.length?(l=e.utils.getColor(n),i.color(l),t.color(l),M):l},M.showControls=function(e){return arguments.length?(c=e,M):c},M.showLegend=function(e){return arguments.length?(h=e,M):h},M.showXAxis=function(e){return arguments.length?(p=e,M):p},M.showYAxis=function(e){return arguments.length?(d=e,M):d},M.rightAlignYAxis=function(e){return arguments.length?(v=e,r.orient(e?"right":"left"),M):v},M.useInteractiveGuideline=function(e){return arguments.length?(m=e,e===!0&&(M.interactive(!1),M.useVoronoi(!1)),M):m},M.tooltip=function(e){return arguments.length?(y=e,M):y},M.tooltips=function(e){return arguments.length?(g=e,M):g},M.tooltipContent=function(e){return arguments.length?(y=e,M):y},M.state=function(e){return arguments.length?(S=e,M):S},M.defaultState=function(e){return arguments.length?(x=e,M):x},M.noData=function(e){return arguments.length?(T=e,M):T},M.transitionDuration=function(e){return arguments.length?(A=e,M):A},M.controlsData=function(e){return arguments.length?(k=e,M):k},M.controlLabels=function(e){return arguments.length?typeof e!="object"?L:(L=e,M):L},r.setTickFormat=r.tickFormat,r.tickFormat=function(e){return arguments.length?(E=e,r):E},M}})();
//fgnass.github.com/spin.js#v2.0.0
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(b&&(b.insertBefore(f,b.firstChild||null),e(f,{left:d.left,top:d.top})),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});
var isNodeJS = false;
try{
    isNodeJS = typeof module !== 'undefined' && typeof module.exports !== 'undefined' && process !== 'undefined' && global !== 'undefined';
}catch(d)
{}

(function(globalScope) {

	var settings = {
		version: 1,
		repoBase: 'http://timber.io/repo/'
	};

	/* includes useful methods like mixin */
	var helperMethods = {

	/* combine attributes of obj into self */

	mixin: function(self, obj) {
		// force prototype to be mixin'd if given instead of object
		if(typeof obj == 'function' && typeof obj.prototype == 'object')
			return helperMethods.mixin(self, obj.prototype);
		for(var prop in obj)
			self[prop] = obj[prop];
		// chain game
		return self;
	},

	/* combine attributes of obj into self
	 * but do not overwrite already existing
	 * attributes.
	 */

	mixin_passive: function(self, obj) {
		// force prototype to be mixin'd if given instead of object
		if(typeof obj == 'function' && typeof obj.prototype == 'object')
			return helperMethods.mixin_passive(self, obj.prototype);
		for(var prop in obj)
			if(typeof self[prop] === 'undefined')
				self[prop] = obj[prop];
		// chain game
		return self;
	},

	/* determines if given string ends with
	 * later string
	 */

	endsWith: function(haystack, needle) {
		return haystack.substr(haystack.length - needle.length) === needle;
	}

}

Function.prototype.bind = function(obj) {
     var fn = this;
     return function() {
          return fn.apply(obj, arguments);
     }
}

	/* handles syncronous package management */
	function moduleSelector(sel) {
	// split string into 2 parts, module name and where to store the module
	var space = sel.indexOf(' ');
	var moduleName = space == -1 ? sel : sel.substr(0, space);
	var saveAt = sel.substr(space + 1);
	// remove and find extension
	var extension = 'js';
	var length = moduleName.length;
	if(helperMethods.endsWith(moduleName, '.js'))
		moduleName = moduleName.substr(0, length-3);
	else if(helperMethods.endsWith(moduleName, '.hbs')) {
		moduleName = moduleName.substr(0, length-4);
        extension = 'hbs';
    }else if(helperMethods.endsWith(moduleName, '.handlebars')) {
		moduleName = moduleName.substr(0, length-11);
        extension = 'handlebars';
    }

	// refine exactly where we are storing module
	var dot = saveAt.indexOf('.');
	var saveLoc;
	if(space == -1) {
        if(helperMethods.endsWith(saveAt, extension))
            saveAt = saveAt.substr(0, saveAt.length - extension.length - 1);
        saveAt = baseName(saveAt);
	}else if(dot > -1) {
		saveLoc = saveAt.substr(0, dot);
		saveAt = saveAt.substr(dot + 1);
	}else{
		saveLoc = saveAt;
	}
    // return the selector
	return {
		name: moduleName,
		saveParent: saveLoc,
		extension: extension,
        variableName: saveAt.charAt(0) === ':' ? saveAt.substr(1) : saveAt
	};
}

function basePath(path) {
	var slash = path.lastIndexOf('/');
	var base = path.substr(0, slash);
	return base == '' ? base : base + '/';
}

function baseName(str) {
	return str.substr(str.lastIndexOf('/')+1);
}

function resolvePath(filename, base) {

    // fetch from web
    if(filename.charAt(0) == ':')
		return settings.repoBase + '?v=' + settings.version + '&f=' + filename.substr(1);
    // root it up
	if(filename.charAt(0) === '/' || filename.substr(0, 5) === 'http:')
		return filename;
    // root from index.html
	if(filename.substr(0, 2) === '~/')
		return filename.substr(2);
    // macro
    if(typeof settings.paths !== 'undefined') {
        var slash = filename.indexOf('/');
        var front = filename.substr(0, slash);
        var path = settings.paths[front];
        if(typeof path !== 'undefined') {
            if(!helperMethods.endsWith(path, '/'))
                path = path + '/';
            return path + filename.substr(slash + 1);   
        }
    }
    // no base provided
    if(typeof base === 'undefined')
        return filename;
	var filename_parts = filename.split('/');
	var basename_parts = base.split('/');
	if(basename_parts[basename_parts.length-1] == '')
		basename_parts.pop();
	while(filename_parts.length > 0 && filename_parts[0] == '..') {
		filename_parts.shift();
		basename_parts.pop();
	}
	return basename_parts.join('/') + (basename_parts.length > 0 ? '/' : '') + filename_parts.join('/');
}

var pkgEnv = {
    cachedFiles: {},
    globalScope: globalScope
};

function getBasePath() {

    // return propagated base
    if(typeof pkgEnv.base !== 'undefined')
        return pkgEnv.base;
    
    // determine which script is running right now, get the 3rd item down the stack if currentScript doesnt exist
    var currentScript;
    if(true || "undefined" === typeof document.currentScript && "undefined" !== document) {
        var stack;
        try{
            throw new Error();
        }catch(e) {
            stack = e.stack;
        }
        currentScript = stack.match(/https?:\/\/[\s\S]+https?:\/\/[\s\S]+(https?.+):[0-9]+:[0-9]+/m).pop();
    }else{
        currentScript = document.currentScript.src;
    }

    // remove filename from path
    var currentScript = basePath(currentScript);

    // remove prefix from path
    if(!pkgEnv.homeDir)
        pkgEnv.homeDir = basePath(window.location.href);    
    currentScript = currentScript.substr(pkgEnv.homeDir.length);

    // return base
    if(currentScript !== null)
        return basePath(currentScript);

}

trick.addPath = function(key, filename) {
    var fullPath = resolvePath( filename, getBasePath() );
    if(typeof settings.paths === 'undefined')
        settings.paths = {};
    settings.paths[key] = fullPath;
}

if(isNodeJS) {

    // node needs the default base for requiring timber classes to be the base of where timber was initially included
    pkgEnv.base = basePath(module.parent.filename);

    // we need a way to fetch modules over the internet
    function webRequire(fullPath, base) {
        var httpsync = pkgEnv.httpsync;
        if(typeof httpsync === 'undefined') {
            try{
                httpsync = pkgEnv.httpsync = require('httpsync');
            }catch(e) {
                throw "\n\n\n\n===========================================================\n\nTimber requires the package httpsync, run the command: \n\n\tnpm -g install httpsync\n\n===========================================================\n\n\n\n";
            }
        }
        var code = httpsync.get(fullPath).end().data.toString();
        var sandbox = { console: console, setTimeout: setTimeout, clearTimeout: clearTimeout, require: require, process: process, Buffer: Buffer, timber: timber, exports: exports };
        sandbox.module = { exports: { __undefined: true } };
        var base = basePath(fullPath);
        sandbox.getModule = function(filename) { return pkgEnv.getModule_real(filename, base) };
        require('vm').runInNewContext(code, sandbox, fullPath);
        return typeof sandbox.module.exports !== 'undefined' && !sandbox.module.exports.__undefined ? sandbox.module.exports : sandbox.module;
    }

}
    
pkgEnv.getModule_real = function(filename, base) {

    // find the file
	var fullPath = resolvePath(filename, base);
	var basename = baseName(filename);
    
    // use cache to get file
	if(typeof pkgEnv.cachedFiles[basename] !== 'undefined')
		return pkgEnv.cachedFiles[basename];

    /* LOAD IN THE FILE FOR NODEJS */
    
    // special class loading for node
    if(isNodeJS) {
        var oldBase = pkgEnv.base;
        var oldLatestClass = pkgEnv.latestClass;
        pkgEnv.base = basePath(fullPath);
        var mod;
        // this package must be downloaded from the web
        if(fullPath.substr(0, 5) === 'http:') {
            mod = webRequire(fullPath, base);
        // laad package in
        }else{
            try{
                mod = require(fullPath);            
            }catch(e) { // couldnt find module, assume its a node module and include it
                var dotPos = filename.lastIndexOf('.');
                if(dotPos > -1)
                    filename = filename.substr(0, dotPos);
                mod = require(filename);
            }
        }
        // extract the fetched module and return it, also cache it
        if(typeof mod === 'object' && Object.keys(mod).length === 0)
            mod = pkgEnv.latestClass;
        pkgEnv.latestClass = oldLatestClass;
        pkgEnv.base = oldBase;
        return pkgEnv.cachedFiles[basename] = mod;
    }

    /* LOAD IN THE FILE FOR WEB */

	// open and send a synchronous request
	var xhrObj = new XMLHttpRequest();
	xhrObj.open('GET', fullPath, false);
	xhrObj.send('');

    // handle handlebars
    if(helperMethods.endsWith(fullPath, '.hbs') || helperMethods.endsWith(fullPath, '.handlebars')) {
        var handlebars = pkgEnv.getModule_real(':handlebars.js', '');
        return pkgEnv.cachedFiles[basename] = handlebars.compile(xhrObj.responseText);
    }

    return pkgEnv.cachedFiles[basename] = runInCurrentContext(xhrObj.responseText, fullPath);
}

function runInCurrentContext(code, fullPath) {

    // this is the virtual base of where the code is supposed to be running from
	var base = basePath(fullPath);

    // create new "simulated reference" environment
    function getModule(filename) {
        return pkgEnv.getModule_real(filename, base);
    }
    var module = { exports: { __undefined: true } };
    var prevLatestClass = pkgEnv.latestClass;
    delete pkgEnv.latestClass;
    var prevBase = pkgEnv.base;
    pkgEnv.base = base;
    var prevGlobalScope = pkgEnv.globalScope;
    pkgEnv.globalScope = {};
    var exports = true;

    // run the encapsulated code
    try{
        eval(code);
    }catch(e) {
        var line = e.stack.match(/>:([0-9]*):/);
        line = line.length > 0 ? " on line " + line.pop() : "";
        e.message = e.message + ' in file ' + fullPath + line;
        throw e;
    }
        
    // replace the global variables timber created in the above eval with psuedo global ones
    for(var name in pkgEnv.globalScope) {
        if(name[0] === "!") {
            globalScope[name.substr(1)] = pkgEnv.globalScope[name];
        }else{
            eval("var " + name + "=" + "pkgEnv.globalScope['" + name + "']");
        }
    }

    // restore previous "reference" environment
    pkgEnv.globalScope = prevGlobalScope;
    var thisClass = pkgEnv.latestClass;
    pkgEnv.latestClass = prevLatestClass;
    pkgEnv.base = prevBase;

    // determine where the module is within the eval and return it
    exports = module.exports;
    delete module.exports;
    if(typeof exports !== "undefined" && !exports.__undefined) {
        return exports;
    }else if(Object.keys(module).length > 0) {
        return module;
    }else{
        return thisClass;
    }
    
}

globalScope.getModule = function(filename) {
	return pkgEnv.getModule_real(filename, getBasePath());
}

if(typeof globalScope.require === 'undefined')
    globalScope.require = globalScope.getModule;


	/* classExtender takes a child function and a parent function, 
	 * and makes the child extend the parent, along with this.super
	 * support
	 */
	var generateSuper = function() {

	// this object will be populated with methods of the superclass bound to the child this scope
	var simulatedSuperInstance = {};

	// pointer to super
	var atInvokeSuper = this._super;

	// bind methods of the super to this object
	for(var prop in atInvokeSuper)
		if(typeof atInvokeSuper[prop] == 'function' && prop != 'constructor')
			simulatedSuperInstance[prop] = bind_for_super_propagation(atInvokeSuper[prop], this, atInvokeSuper._super);
	// manually pull the constructor from the superclass, it seems that for the top of inheritence doesnt get listed when looping props
	simulatedSuperInstance['constructor'] = bind_for_super_propagation(atInvokeSuper['constructor'], this, atInvokeSuper._super);

	// return the simulated super
	return simulatedSuperInstance;

}

// works the same as regular js bind, except it propagates the _super attribute once

var bind_for_super_propagation = function(fn, scope, tempParentProto) {
	return function() {
		'.super'; // we need further children to proxy this method too
		scope = scope ? scope : this;
		var atInvokeSuper = scope._super;
		scope._super = tempParentProto;
		var ret = fn.apply(scope, arguments);
		scope._super = atInvokeSuper;
		return ret;
	}
}

// allow inheritence

var classExtender = function(newClass, parent) {

	 // inherit from prototype
     newClass.prototype = Object.create(parent.prototype);

     // the child's prototype must know where its superclass protoype is so that the super method knows where to look for methods
     newClass.prototype._super = parent.prototype;

     // the child prototype needs the super method to access methods of the super class
     Object.defineProperty(newClass.prototype, 'super', {
		enumerable: false,
		configurable: true,
		set: function(data) {},
		get: generateSuper
	 });

     // when the subclass inherits a method from the superclass where the method uses the super method, super in this case must point to the superclass's superclass, we fix this by defining these methods directly on the subclass to essensially proxy call super so that the value of ._super propagates correctly
     var needsProxy = /\.super/;
     for(var prop in parent.prototype)
     	if( typeof parent.prototype[prop] == 'function' && needsProxy.test(parent.prototype[prop].toString()) )
     		newClass.prototype[prop] = bind_for_super_propagation(parent.prototype[prop], undefined, parent.prototype._super);

     // fix wrong constructor
     newClass.prototype.constructor = newClass;
     
}


	/* When psased a function, it performs lexical analysis, used
	 * for determining if that function has private scope
	 */
	var fn_parser = {

	cache: {},

	hasPrivateScope: function(fn) {
		var fn_str = fn.toString();
		var signature = fn.name + ':' + fn.length + ':' + fn_str.length;
		if(typeof this.cache[signature] !== 'undefined')
			return this.cache[signature];
		else
			return this.cache[signature] = fn_str.indexOf('this.private') > -1;
	},

	addPrivateScope: function(obj, privateScope) {

		if(typeof privateScope === 'undefined')
			privateScope = {};
		var self = this;

		Object.defineProperty(obj, 'private', {
		    enumerable: true,
		    configurable: true,
		    set: function(data) {},
		    get: function() {
		        return self.hasPrivateScope(arguments.callee.caller) ? privateScope : undefined;
		    }
		});

	}

};


	/* The base class for new timber classes, with core functionality
	 * such as binding, delay, el/$el creation, etc.
	 */
	function tricks(params) {

	var self = this;

        // give this timber deep copies of its defaults
        if(typeof this.deepProperties !== 'undefined') {
	    for(var prop in this.deepProperties)
		this[prop] = JSON.parse(this.deepProperties[prop]);
	    delete this.deepProperties;
	}
   
	// give this timber private scope
	var privateScope = helperMethods.mixin({}, this.private || {});
	fn_parser.addPrivateScope(this, privateScope);

	/* EVENT MANAGEMENT */

	var propChangeCallbacks = {};
	var realData = {};

	this.trigger = function(name, value, callback) {
		var callbacks = propChangeCallbacks[name];
		if(callbacks)
			for(var i in callbacks)
				callbacks[i].call(this, value, callback);
	}

	this.on = function(key, callback) {
		// if event is for property, cause assignment to trigger change
		if(key.substr(0, 7) === 'change:') {
			var varname = key.substr(7);
			if(typeof realData[varname] === 'undefined')
				realData[varname] = this[varname];
			Object.defineProperty(this, varname, {
			  enumerable: true,
			  configurable: true,
			  get: function() { return realData[varname] },
			  set: function(data) {
			  	realData[varname] = data;
			  	self.trigger(key, data, function(d) { realData[varname] = d });
			  	return data;
			  }
			});
		}
		// add event
		if(!propChangeCallbacks[key])
			propChangeCallbacks[key] = [ callback ];
		else
			propChangeCallbacks[key].push(callback);
	}

	// create objects if none were given
	if(!params)
		params = {};

	// do actions only relavent if tricks was inherited with the dom property enabled
	if(this.domless != true) {

        var jQuery = globalScope.jQuery || globalScope.$;
        
		// if the user gave us a selector use that one
		if(params.el) {
			// user given selector is jQuery selector
			if(params.el instanceof jQuery) {
				this.$el = params.el;
				this.el = params.el[0];
			// user given selector is not jquery
			}else if(typeof jQuery !== 'undefined') {
				this.$el = $(params.el);
				this.el = params.el;
			}
		// user gave us no selector so make one
		}else{
			if(typeof document !== 'undefined') {
				this.el = document.createElement(this.tagName ? this.tagName : 'div');
				if(typeof jQuery !== 'undefined')
					this.$el = jQuery(this.el);
			}
		}

		if(typeof this.className !== 'undefined')
			this.el.className = this.className;

		if(typeof this.id !== 'undefined')
			this.el.id = this.id;



	}

	/* handle events for the trick */

	if(typeof this.events !== 'undefined') {
		// determine method of adding the events
		var el = this.el;
		var $el = this.$el;
		// fix for webkitMatchesSelector
		if(!$el) {
			var matchesSelector = false;
			if(document.body.webkitMatchesSelector)
				var matchesSelector = 'webkitMatchesSelector';
			else if(document.body.mozMatchesSelector)
				var matchesSelector = 'mozMatchesSelector';
			else
				var matchesSelector = false;
		}
		// add eventts
		var events = this.events;
		for(var e in events) {
			// this preserves variables
			(function(){
				// grab a direct pointer to the callback we will invoke for this event
				var callback = events[e];
				if(typeof callback == 'string') {
					var callback_checking = self[callback];
					if(!callback_checking) {
						console.log('TRICKS: the event method "' + callback + '" was not found on the trick', self);
						return;
					}else{
						callback = callback_checking;
					}
				}
				// get the event name and selector from the prop we were given
				var space = e.indexOf(' ');
				if(space == -1) {
					var eventName = e;
				}else{
					var eventName = e.substr(0, space);
					var eventSelector = e.substr(space + 1);
				}
				// bind the event with jQuery if its available
				if($el) {
					$el.on(eventName, eventSelector, function(e) {
						callback.call(self, e, this);
					});
				// no jquery access, will have to do this old school
				}else{
					el.addEventListener(eventName, function(e) {
						// abort if we have no way to check matches on something
						if(!matchesSelector)
							return;
						// only allow 50 iterations incase something wacky happens
						var node = e.target;
						for(var i = 0; i < 50; i++) {
							if(!node) {
								break;
							}else if(space == -1 || node[matchesSelector](eventSelector)) {
								e.currentTarget = node; 
								callback.call(self, e, node);
								break;
							}else{
								node = node.parentNode;
								if(node === el)
									break;
							}
						}
					});
				}
			})();
		}
	}

}

/* take another object or function and steal its functions/prototypes and dump them into our prototype */

tricks.prototype.extend = function(/* arg1, arg2, ... */) {
	for(var i = 0; i < arguments.length; i++)
		helperMethods.mixin(Object.getPrototypeOf(this), arguments[i]);
}

/* PROPERTY MUTATION */

tricks.prototype.get = function(key) {
	return this[key];
}

tricks.prototype.set = function(key, value) {
	this[key] = value;
}

tricks.prototype.delay = function(time) {
	var dummy = {};
	var self = this;
	var fn = function(name) {
		return function() {
			setTimeout(function(){
				self[name].apply(self, arguments);
			}, time);
			return self;
		}
	}
	for(var prop in this)
		if(typeof this[prop] === 'function')
		dummy[prop] = fn(prop);
	return dummy;
}


	/* returns the "timber" method exposed in the window below, used to create new timbers */
	function trick(trickProps, isExtending) {

	// if this trick extends another trick(s) perform parent.extend(trickProps), instead of building new trick
	if(trickProps && trickProps['extends']) {
		var extending = trickProps['extends'];
		delete trickProps['extends'];
		if(extending instanceof Array && extending.length > 0) {
			var firstClass = extending.shift();
			if(typeof firstClass === 'string')
				firstClass = getModule(helperMethods.endsWith(firstClass, '.js') ? firstClass : firstClass + '.js');
			return firstClass.extend(trickProps, extending);
		}
		else{
			if(typeof extending === 'string')
				extending = getModule(helperMethods.endsWith(extending, '.js') ? extending : extending + '.js');
			return extending.extend(trickProps);
		}
	}

	// create constructor for the new trick
	var newTrick;
	newTrick = function(params) {
		// call the setupTrick method
		tricks.call(this, params);
		// invoke "init" constructor unless we're a singleton
		if( (typeof trickProps === 'undefined' || !trickProps.singleton) && typeof this.init === 'function')
			this.init.apply(this, arguments);
	}

	// give the trick .extend() like functionality
	newTrick.extend = extendTrick;

	// optimization, if trick invoked by extendTrick, the below will be overwritten anyway so dont run it
	if(isExtending)
        return newTrick;

	// give prototype for this function access to the tricks API
	newTrick.prototype = Object.create(tricks.prototype);

	// apply trickProps to the trick
	return applyTrickProps(newTrick, trickProps);

}

/* allow changing settings */
trick.config = function(givenSettings) {
    helperMethods.mixin(settings, givenSettings);
}

/* takes a timber and returns a singleton instance */
function makeSingletonInstace(newTrick) {
	var singleton;
	return function(params) {
		if(singleton)
			return singleton;
		singleton = new newTrick(params);
		if(typeof singleton.init === 'function')
			singleton.init.apply(singleton, arguments);
		return singleton;
	}
}

/* takes trickProps object and deflates it onto the trick prototype */
function applyTrickProps(newTrick, trickProps) {

	if(typeof trickProps === 'undefined')
		return newTrick;

	// rip out defaults
	if(typeof trickProps.defaults !== 'undefined') {
		var defaults = trickProps.defaults;
		delete trickProps.defaults;
	}

	// if newTrick already has private variables, combine them into new privates given
	if(typeof newTrick.prototype.private !== 'undefined' && typeof trickProps.private !== 'undefined') {
		helperMethods.mixin_passive(trickProps.private, newTrick.prototype.private);
	}

	// set all properties
	helperMethods.mixin(newTrick.prototype, trickProps);

	// now set defaults and make a dump of objects to deep copy
	if(typeof defaults !== 'undefined') {
		if(typeof newTrick.prototype.deepProperties === 'undefined')
		    var deepProperties = newTrick.prototype.deepProperties = {};
		else
		    var deepProperties = newTrick.prototype.deepProperties;
		for(var prop in defaults) {
		    if(defaults[prop] instanceof Object)
			deepProperties[prop] = JSON.stringify(defaults[prop]);
		    else
			newTrick.prototype[prop] = defaults[prop];
		}
		helperMethods.mixin(newTrick.prototype, defaults);
	}

	// setup requirements
	if(typeof trickProps.requires !== 'undefined') {
		var reqList = typeof trickProps.requires === 'string' ? [trickProps.requires] : trickProps.requires;
		for(var i in reqList) {
			var moduleDetails = moduleSelector(reqList[i]);
			var mod = getModule(moduleDetails.name + '.' + moduleDetails.extension);
			// store module
			if(moduleDetails.saveParent === 'this')
				newTrick.prototype[moduleDetails.variableName] = mod;
            else if(moduleDetails.saveParent === 'window' || pkgEnv.globalScope === globalScope)
                globalScope[moduleDetails.variableName] = mod;
			else{
                pkgEnv.globalScope['!' + moduleDetails.variableName] = globalScope[moduleDetails.variableName]; // temporarily overwrite global scope
                globalScope[moduleDetails.variableName] = mod;
		        pkgEnv.globalScope[moduleDetails.variableName] = mod;
            }
		}
		delete trickProps.requires;
	}

	// generate singleton
	if(trickProps.singleton)
		newTrick = makeSingletonInstace(newTrick);

	// store class on window
	pkgEnv.latestClass = newTrick;
    
	return newTrick;

}

/* allows for extending another trick */

function extendTrick(trickProps, mixins) { /* this = some trick function */

	// the class we inherit from directly is the first item in the array
	var newClass = trick(trickProps, true);
	classExtender(newClass, this);

	// mixin the other extendees
	if(typeof mixins !== 'undefined')
		for(var i = 0; i < mixins.length; i++) {
			var extending = mixins[i];
			if(typeof extending === 'string')
				extending = getModule(helperMethods.endsWith(extending, '.js') ? extending : extending + '.js');
            helperMethods.mixin_passive(newClass.prototype, extending);
		    // fix deep copy defaults
		    if(typeof extending.prototype.defaults !== 'undefined') {
			    // determine where on prototype to store deep vars
			    if(typeof newClass.prototype.deepProperties === 'undefined')
				    var deepProperties = newClass.prototype.deepProperties = {};
			    else
				    var deepProperties = newClass.prototype.deepProperties;
			    // add deep vars to prototype
			    for(var prop in defaults)
				    if(defaults[prop] instanceof Object && typeof deepProperties[prop] === 'undefined')
				        deepProperties[prop] = JSON.stringify(defaults[prop]);
				    
			}
				    
		}

	// only after everything should we apply trick props to our new class
	return applyTrickProps(newClass, trickProps);
}


	/* expose the timber builder to the global object */
    globalScope.timber = trick;

    /* expot to express */
    if( typeof module !== 'undefined' && typeof module.exports !== 'undefined' )
        module.exports = trick;
    
	/* expose timber to AMD */
	if (typeof globalScope.define === "function" && typeof globalScope.define.amd === "function") {
	  globalScope.define("timber", [], function() {
	    return trick;
	  });
	}

})( isNodeJS ? global : window );
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AppView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"parent-container\">\r\n	<div class=\"container\"></div>\r\n</div>";
  });
templates['HeaderView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	<li class=\"item\"><i class=\"fa "
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i> "
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\r\n	";
  return buffer;
  }

  buffer += "<div class=\"logo\"><strong>Market</strong>Monitor</div>\r\n\r\n<ul class=\"nav\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.navitems), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	\r\n</ul>";
  return buffer;
  });
templates['lists/items/StockItemView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.ticker)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.price)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.quantity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.beta)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>";
  return buffer;
  });
templates['lists/StockListView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<tr><th class=\"text\">Ticker</th><th class=\"number\">Price</th><th class=\"number\">Quantity</th><th class=\"number\">Low</th><th class=\"number\">High</th><th class=\"number\">Beta</th></tr>";
  });
templates['sections/PortfolioView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
templates['sections/StockView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\r\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n<div class=\"left\">\r\n	<div class=\"stock-info\">\r\n		<div class=\"stock-header\"><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.ticker)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong> &bull; "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n		<div class=\"stats\">\r\n			<div class=\"price\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.PreviousClose)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">Range: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.DaysLow)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.DaysHigh)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">52 week: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.YearLow)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.YearHigh)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">Open: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.Open)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">Vol / Avg: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.Volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " / "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.AverageDailyVolume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">Mkt Cap: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.MarketCapitalization)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">P/E: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.PERatio)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">EPS: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.DilutedEPS)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n			<div class=\"stat\">Shares: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.SharesOutstanding)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n		</div>\r\n		<div class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stock)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n	</div>\r\n	<div id=\"chart\"><svg style=\"height:500px\"></svg></div>\r\n</div>\r\n<div class=\"right\"></div>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.empty), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
templates['SideView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"nav-items\">\r\n	<li class=\"item\">+ Add Portfolio</li>\r\n	<li class=\"item\">Portfolio 1</li>\r\n	<li class=\"item\">Portfolio 2</li>\r\n	<li class=\"item\">Portfolio 3</li>\r\n	<li class=\"item\">Portfolio 4</li>\r\n</ul>";
  });
})();
var Boot = timber({

	domless: true,

	requires: [
		'views/AppView AppView'
	],

	init: function() {


		$.ajaxSetup({
			beforeSend: function(xhr, url, c) {
			 	if(this.toProxy(url.url))
			  		url.url = window.location.href.match(/^[a-zA-Z]+:\/\/([^\/^:]+)/)[0] + ':3001?url=' + url.url;
			}.bind(this)
		});

	},

	toProxy: function(url) {

		var proxyUrls = [
			'http://finance.yahoo.com',
			'http://ichart.yahoo.com',
			'http://www.reuters.com/finance/stocks/companyProfile'
		];

		var len = proxyUrls.length;
		for (var i = 0; i < len; i++) {
			if (url.indexOf(proxyUrls[i]) > -1)
				return true;
		}

		return false;

	},

	run: function() {

		var appView = new AppView();

		$('body').prepend(appView.el);

	}

});

$(function() {

	var boot = new Boot();
	boot.run();

});

var StockCollection = timber({

	domless: true,

	defaults: {
		items: []
	},

	init: function(options) {

		options = options || {};

		if (options.data)
			this.set(options.data);
	},

	set: function(data) {
		this.data = data;

		this.parse();
	},

	parse: function() {

		var len = this.data.length;

		for (var i = 0; i < len; i++) {

			this.items.push(new StockItemModel({ data: this.data[i] }));

		}

	},

	get: function(index) {
		return this.items[index];
	},

	size: function() {
		return this.data.length;
	}

});

var StockItemModel = timber({

	domless: true,

	defaults: {
		data: {}
	},

	init: function(options) {

		options = options || {};

		this.data = options.data;

	},

	getData: function() {
		return this.data;		
	}

});
timber({

	singleton: true,
	domless: true,

	init: function() {},

	getVar: function(VarSearch) {
		var SearchString = window.location.search.substring(1);
		var VariableArray = SearchString.split('&');
		
		for(var i = 0; i < VariableArray.length; i++){
		    var KeyValuePair = VariableArray[i].split('=');
		    if(KeyValuePair[0] == VarSearch){
		        return KeyValuePair[1];
		    }
		}

	},

	CSVToArray: function( strData, strDelimiter ){
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);


		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){

			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[ 1 ];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){

				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push( [] );

			}


			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[ 2 ]){

				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				var strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);

			} else {

				// We found a non-quoted value.
				var strMatchedValue = arrMatches[ 3 ];

			}


			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}

		// Return the parsed data.
		return( arrData );
	}

});
timber({

	domless: true,
	singleton: true,

	requires: [		
		'~/js/utilities/Utils Utils'
	],

	defaults: {

		//https://code.google.com/p/yahoo-finance-managed/wiki/enumQuoteProperty
		lookup: {
			AfterHoursChangeRealtime: "c8",
			AnnualizedGain: "g3",
			Ask: "a0",
			AskRealtime: "b2",
			AskSize: "a5",
			AverageDailyVolume: "a2",
			Bid: "b0",
			BidRealtime: "b3",
			BidSize: "b6",
			BookValuePerShare: "b4",
			Change: "c1",
			ChangeFromFiftydayMovingAverage: "m7",
			ChangeFromTwoHundreddayMovingAverage: "m5",
			ChangeFromYearHigh: "k4",
			ChangeFromYearLow: "j5",
			ChangeInPercent: "p2",
			ChangeInPercentFromYearHigh: "k5",
			ChangeInPercentRealtime: "k2",
			ChangeRealtime: "c6",
			Change_ChangeInPercent: "c0",
			Commission: "c3",
			Currency: "c4",
			DaysHigh: "h0",
			DaysLow: "g0",
			DaysRange: "m0",
			DaysRangeRealtime: "m2",
			DaysValueChange: "w1",
			DaysValueChangeRealtime: "w4",
			DilutedEPS: "e0",
			DividendPayDate: "r1",
			EBITDA: "j4",
			EPSEstimateCurrentYear: "e7",
			EPSEstimateNextQuarter: "e9",
			EPSEstimateNextYear: "e8",
			ExDividendDate: "q0",
			FiftydayMovingAverage: "m3",
			HighLimit: "l2",
			HoldingsGain: "g4",
			HoldingsGainPercent: "g1",
			HoldingsGainPercentRealtime: "g5",
			HoldingsGainRealtime: "g6",
			HoldingsValue: "v1",
			HoldingsValueRealtime: "v7",
			LastTradeDate: "d1",
			LastTradePriceOnly: "l1",
			LastTradeRealtimeWithTime: "k1",
			LastTradeSize: "k3",
			LastTradeTime: "t1",
			LastTradeWithTime: "l0",
			LowLimit: "l3",
			MarketCapRealtime: "j3",
			MarketCapitalization: "j1",
			MoreInfo: "i0",
			Name: "n0",
			Notes: "n4",
			OneyrTargetPrice: "t8",
			Open: "o0",
			OrderBookRealtime: "i5",
			PEGRatio: "r5",
			PERatio: "r0",
			PERatioRealtime: "r2",
			PercentChangeFromFiftydayMovingAverage: "m8",
			PercentChangeFromTwoHundreddayMovingAverage: "m6",
			PercentChangeFromYearLow: "j6",
			PreviousClose: "p0",
			PriceBook: "p6",
			PriceEPSEstimateCurrentYear: "r6",
			PriceEPSEstimateNextYear: "r7",
			PricePaid: "p1",
			PriceSales: "p5",
			Revenue: "s6",
			SharesFloat: "f6",
			SharesOutstanding: "j2",
			SharesOwned: "s1",
			ShortRatio: "s7",
			StockExchange: "x0",
			Symbol: "s0",
			TickerTrend: "t7",
			TradeDate: "d2",
			TradeLinks: "t6",
			TradeLinksAdditional: "f0",
			TrailingAnnualDividendYield: "d0",
			TrailingAnnualDividendYieldInPercent: "y0",
			TwoHundreddayMovingAverage: "m4",
			Volume: "v0",
			YearHigh: "k0",
			YearLow: "j0",
			YearRange: "w0",
			a0: "Ask",
			a2: "AverageDailyVolume",
			a5: "AskSize",
			b0: "Bid",
			b2: "AskRealtime",
			b3: "BidRealtime",
			b4: "BookValuePerShare",
			b6: "BidSize",
			c0: "Change_ChangeInPercent",
			c1: "Change",
			c3: "Commission",
			c4: "Currency",
			c6: "ChangeRealtime",
			c8: "AfterHoursChangeRealtime",
			d0: "TrailingAnnualDividendYield",
			d1: "LastTradeDate",
			d2: "TradeDate",
			e0: "DilutedEPS",
			e7: "EPSEstimateCurrentYear",
			e8: "EPSEstimateNextYear",
			e9: "EPSEstimateNextQuarter",
			f0: "TradeLinksAdditional",
			f6: "SharesFloat",
			g0: "DaysLow",
			g1: "HoldingsGainPercent",
			g3: "AnnualizedGain",
			g4: "HoldingsGain",
			g5: "HoldingsGainPercentRealtime",
			g6: "HoldingsGainRealtime",
			h0: "DaysHigh",
			i0: "MoreInfo",
			i5: "OrderBookRealtime",
			j0: "YearLow",
			j1: "MarketCapitalization",
			j2: "SharesOutstanding",
			j3: "MarketCapRealtime",
			j4: "EBITDA",
			j5: "ChangeFromYearLow",
			j6: "PercentChangeFromYearLow",
			k0: "YearHigh",
			k1: "LastTradeRealtimeWithTime",
			k2: "ChangeInPercentRealtime",
			k3: "LastTradeSize",
			k4: "ChangeFromYearHigh",
			k5: "ChangeInPercentFromYearHigh",
			l0: "LastTradeWithTime",
			l1: "LastTradePriceOnly",
			l2: "HighLimit",
			l3: "LowLimit",
			m0: "DaysRange",
			m2: "DaysRangeRealtime",
			m3: "FiftydayMovingAverage",
			m4: "TwoHundreddayMovingAverage",
			m5: "ChangeFromTwoHundreddayMovingAverage",
			m6: "PercentChangeFromTwoHundreddayMovingAverage",
			m7: "ChangeFromFiftydayMovingAverage",
			m8: "PercentChangeFromFiftydayMovingAverage",
			n0: "Name",
			n4: "Notes",
			o0: "Open",
			p0: "PreviousClose",
			p1: "PricePaid",
			p2: "ChangeInPercent",
			p5: "PriceSales",
			p6: "PriceBook",
			q0: "ExDividendDate",
			r0: "PERatio",
			r1: "DividendPayDate",
			r2: "PERatioRealtime",
			r5: "PEGRatio",
			r6: "PriceEPSEstimateCurrentYear",
			r7: "PriceEPSEstimateNextYear",
			s0: "Symbol",
			s1: "SharesOwned",
			s6: "Revenue",
			s7: "ShortRatio",
			t1: "LastTradeTime",
			t6: "TradeLinks",
			t7: "TickerTrend",
			t8: "OneyrTargetPrice",
			v0: "Volume",
			v1: "HoldingsValue",
			v7: "HoldingsValueRealtime",
			w0: "YearRange",
			w1: "DaysValueChange",
			w4: "DaysValueChangeRealtime",
			x0: "StockExchange",
			y0: "TrailingAnnualDividendYieldInPercent"
		}
	},

	//builds the yahoo request params for their csv with the above lookup table
	buildF: function(params) {

		var len = params.length;

		var query = [];
		for (var i = 0; i < params.length; i++) {
			query.push(this.lookup[params[i]]);
		}

		return query.join('');

	},

	getStock: function(stock, callback) {

		var requestsRunning = 0;

		var fields = [
			"Name",
			"PreviousClose",
			"DaysLow",
			"DaysHigh",
			"YearLow",
			"YearHigh",
			"Open",
			"Volume",
			"AverageDailyVolume",
			"MarketCapRealtime",
			"MarketCapitalization",
			"PERatioRealtime",
			"PERatio",
			"DilutedEPS",

			//make sure this is last
			"SharesOutstanding"
		];

		//holder
		var parsed = {};

		requestsRunning++;
		$.ajax({

			type: "GET",
			url: "http://finance.yahoo.com/d/quotes.csv",
			data: {
				s: stock,
				f: this.buildF(fields)
			},
			success: function(data) {
				var preParsed = Utils().CSVToArray(data)[0];

				// -1 to parse S/O
				var len = fields.length - 1;
				for (var i = 0; i < len; i++) {
					parsed[fields[i]] = preParsed[0];
					preParsed.shift();
				}

				parsed[fields[fields.length-1]] = preParsed.join('').trim();
				parsed.ticker = stock;

				requestsRunning--;

				runCallback();
			}

		});

		requestsRunning++;
		$.ajax({
			url: "http://www.reuters.com/finance/stocks/companyProfile",
			data: { symbol: stock },
			success: function(data) {
				requestsRunning--;
				
				parsed.Description = /<div class="moduleBody">[^<]*<p>([\s\S]*?)<\/p>/mi.exec(data)[1];

				runCallback();
			}

		});

		requestsRunning++;
		$.ajax({

			url: "http://ichart.yahoo.com/table.csv",
			type: "GET",
			data: { 
				s: stock,
				a: 3, //#month - 1 | start
				b: 15, //day | start
				c: 2000, //year | start
				d: 3, //#month - 1 | end
				e: 15, //day | end
				f: 2010, //year | end
				g: "w", //trade period d w m
				ignore: ".csv"
			},
			success: function(data) {
				var preParsed = Utils().CSVToArray(data);

				var histData = [ { key: stock, values: [] } ];

				var len = preParsed.length;
				for (var i = 2; i < len; i++) {
					histData[0].values.push({ date: new Date(preParsed[i][0]).getTime(), price: preParsed[i][6] });
				}

				parsed.histData = histData;

				requestsRunning--;
				runCallback();
			}

		});

		function runCallback() {
			if (requestsRunning == 0)
				callback(parsed);
		}
 
	}

});
var AppView = timber({

    className: 'app-container',

    requires: [
        '~/templates/AppView.handlebars template',
        '~/js/views/SideView SideView',
        '~/js/views/HeaderView HeaderView',
        '~/js/views/sections/StockView StockView'
    ],

    init: function() {
        this.render();
    },

    render: function() {

        this.$el.html(template()); 

        var headerView = new HeaderView();
        var sideView = new SideView();

        this.$el.find('.parent-container').prepend(sideView.el);
        this.$el.prepend(headerView.el);


        //TEMP
        var stockView = new StockView();
        this.setView(stockView);

    },

    setView: function(view) {
        this.$el.find('.container').html(view.el);
    }

});
var HeaderView = timber({

	className: 'main-header',

	tagName: "header",

	requires: [
		'../../templates/HeaderView.handlebars template'
	],

	defaults: {
		navitems: [
			{
				title: "Portfolios",
				icon: "fa-folder-open"
			},
			{
				title: "Trends",
				icon: "fa-flask"
			},
			{
				title: "Settings",
				icon: "fa-cog"
			}
		]
	},

	init: function() {

		this.render();

	},

	render: function() {

		this.$el.html(template({
			navitems: this.navitems
		})); 

	}

})
var SideView = timber({

	requires: [
		'../../templates/SideView.handlebars template'
	],

	className: 'side-view',

	tagName: "div",

	init: function() {

		this.render();

	},

	render: function() {

		this.$el.html(template()); 

	}

})
var StockListView = timber({

	className: 'stock-list',

	tagName: "table",

	init: function(options) {

		options = options || {};

		if (options.collection)
			this.collection = options.collection;

		this.render();

	},

	events: {
		'click tr': 'showStock'
	},

	showStock: function() {

		new StockView();

	},

	render: function() {

		this.$el.html(Handlebars.templates['lists/StockListView']({ 
			empty: this.collection.size()  
		}));

		if (this.collection.size() > 0)
			this.populate();
	},
 
	populate: function() {
		var len = this.collection.size();

		for (var i = 0; i < len; i++) {
			this.$el.append(new StockItemView({ model: this.collection.get(i) }).el);
		}
	}

});
var StockItemView = timber({

	tagName: "tr",
	className: "stock",

	init: function(options) {

		this.model = options.model;

		this.render();

	},

	render: function() {

		this.$el.html(Handlebars.templates['lists/items/StockItemView']({ data: this.model.getData() }));

	}

});
var PortfolioView = timber({

	tagName: "div",
	className: "portfolio-container",

	init: function() {

		this.render();		

	},

	render: function() {

        var secs = [
            {
                "ticker": "AAPL",
                "price": 26,
                "quantity": 10,
                "low": 26,
                "high": 26,
                "beta": -4
            },
            {
                "ticker": "F",
                "price": 27,
                "quantity": 91,
                "low": 25,
                "high": 21,
                "beta": 3
            },
            {
                "ticker": "TSLA",
                "price": 25,
                "quantity": 47,
                "low": 30,
                "high": 28,
                "beta": 1
            },
            {
                "ticker": "VHT",
                "price": 23,
                "quantity": 61,
                "low": 20,
                "high": 24,
                "beta": -1
            },
            {
                "ticker": "VGLT",
                "price": 40,
                "quantity": 33,
                "low": 29,
                "high": 36,
                "beta": 4
            }, {
                "ticker": "AAPL",
                "price": 26,
                "quantity": 10,
                "low": 26,
                "high": 26,
                "beta": -4
            }
        ];


        var stockCollection = new StockCollection({ data: secs });

        var stockListView = new StockListView({ collection: stockCollection });

        this.$el.append(stockListView.el);


	}


});
timber({

	className: 'stock-container',

	tagName: "div",

	requires: [
		'~/templates/sections/StockView.handlebars template',
		'~/js/utilities/YahooAPI YahooAPI',
		'~/lib/js/spinner.min.js a',
		'~/js/utilities/Utils Utils',
		'~/lib/js/nv.d3.min.js b'
	],

	init: function() {

		YahooAPI().getStock(Utils().getVar('stock'), function(stock) {

			this.stockData = stock;

			this.render();

		}.bind(this));

		this.render();

	},

	render: function() {

		this.$el.animate({ opacity: 0 }, 100, function() {

			this.$el.html(template({ empty: !this.stockData, stock: this.stockData })).animate({ opacity: 1 }, 100);

			if (!this.stockData) {
				setTimeout(function() { 
					var opts = {
						lines: 13, // The number of lines to draw
						length: 20, // The length of each line
						width: 10, // The line thickness
						radius: 30, // The radius of the inner circle
						corners: 1, // Corner roundness (0..1)
						rotate: 0, // The rotation offset
						direction: 1, // 1: clockwise, -1: counterclockwise
						color: '#000', // #rgb or #rrggbb or array of colors
						speed: 1, // Rounds per second
						trail: 60, // Afterglow percentage
						shadow: false, // Whether to render a shadow
						hwaccel: false, // Whether to use hardware acceleration
						className: 'spinner', // The CSS class to assign to the spinner
						zIndex: 2e9, // The z-index (defaults to 2000000000)
						top: this.$el.height() / 2 + 'px', // Top position relative to parent in px
						left: this.$el.width() / 2 + 'px' // Left position relative to parent in px
					};

					var target = this.el;
					var spinner = new Spinner(opts).spin(target);
				}.bind(this), 0);
			} else {
				nv.addGraph(function() {
					this.chart = nv.models.lineWithFocusChart()				
						.x(function(d) { return d.date; })
						.y(function(d) { return d.price; });

					this.chart.xAxis
						.tickFormat(function(d) {
							return d3.time.format('%x')(new Date(d))
						});


					this.chart.x2Axis
						.tickFormat(function(d) {
							return d3.time.format('%x')(new Date(d))
						});

					this.chart.yAxis
						.tickFormat(d3.format(',.2f'));

					this.chart.y2Axis
						.tickFormat(d3.format(',.2f'));

					d3.select('#chart svg')
						.datum(this.stockData.histData)
						.transition().duration(500)
						.call(this.chart);

					nv.utils.windowResize(this.chart.update);

					return chart;
				}.bind(this));

			}

		}.bind(this));

		


	}

});