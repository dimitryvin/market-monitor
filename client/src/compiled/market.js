if(!AmCharts)var AmCharts={themes:{},maps:{},inheriting:{},charts:[],onReadyArray:[],useUTC:!1,updateRate:40,uid:0};
AmCharts.Class=function(a){var b=function(){arguments[0]!==AmCharts.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(AmCharts.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,
a,b);this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events)for(a=a.events[b],b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var c=this.events[a],g=0,h=c.length;g<h;g++){var k=c[g];k.handler.call(k.scope,b)}});for(var c in a)b.prototype[c]=a[c];return b};AmCharts.addChart=function(a){AmCharts.charts.push(a)};AmCharts.removeChart=function(a){for(var b=AmCharts.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)};
AmCharts.IEversion=0;AmCharts.isModern=!0;AmCharts.navigator=navigator.userAgent.toLowerCase();-1!=AmCharts.navigator.indexOf("msie")&&(AmCharts.IEversion=parseInt(AmCharts.navigator.split("msie")[1]),document.documentMode&&(AmCharts.IEversion=Number(document.documentMode)),9>AmCharts.IEversion&&(AmCharts.isModern=!1));AmCharts.dx=0;AmCharts.dy=0;if(document.addEventListener||window.opera)AmCharts.isNN=!0,AmCharts.isIE=!1,AmCharts.dx=0.5,AmCharts.dy=0.5;
document.attachEvent&&(AmCharts.isNN=!1,AmCharts.isIE=!0,AmCharts.isModern||(AmCharts.dx=0,AmCharts.dy=0));window.chrome&&(AmCharts.chrome=!0);AmCharts.handleResize=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&c.div&&c.handleResize()}};AmCharts.handleMouseUp=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleReleaseOutside(a)}};AmCharts.handleMouseMove=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleMouseMove(a)}};
AmCharts.resetMouseOver=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};AmCharts.ready=function(a){AmCharts.onReadyArray.push(a)};AmCharts.handleLoad=function(){AmCharts.isReady=!0;for(var a=AmCharts.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(AmCharts.processDelay)?c():setTimeout(c,AmCharts.processDelay*b)}};AmCharts.getUniqueId=function(){AmCharts.uid++;return"AmChartsEl-"+AmCharts.uid};
AmCharts.isNN&&(document.addEventListener("mousemove",AmCharts.handleMouseMove,!0),window.addEventListener("resize",AmCharts.handleResize,!0),document.addEventListener("mouseup",AmCharts.handleMouseUp,!0),window.addEventListener("load",AmCharts.handleLoad,!0));AmCharts.isIE&&(document.attachEvent("onmousemove",AmCharts.handleMouseMove),window.attachEvent("onresize",AmCharts.handleResize),document.attachEvent("onmouseup",AmCharts.handleMouseUp),window.attachEvent("onload",AmCharts.handleLoad));
AmCharts.clear=function(){var a=AmCharts.charts;if(a)for(var b=0;b<a.length;b++)a[b].clear();AmCharts.charts=null;AmCharts.isNN&&(document.removeEventListener("mousemove",AmCharts.handleMouseMove,!0),window.removeEventListener("resize",AmCharts.handleResize,!0),document.removeEventListener("mouseup",AmCharts.handleMouseUp,!0),window.removeEventListener("load",AmCharts.handleLoad,!0));AmCharts.isIE&&(document.detachEvent("onmousemove",AmCharts.handleMouseMove),window.detachEvent("onresize",AmCharts.handleResize),
document.detachEvent("onmouseup",AmCharts.handleMouseUp),window.detachEvent("onload",AmCharts.handleLoad))};
AmCharts.makeChart=function(a,b,c){var d=b.type,e=b.theme;AmCharts.isString(e)&&(e=AmCharts.themes[e],b.theme=e);var f;switch(d){case "serial":f=new AmCharts.AmSerialChart(e);break;case "xy":f=new AmCharts.AmXYChart(e);break;case "pie":f=new AmCharts.AmPieChart(e);break;case "radar":f=new AmCharts.AmRadarChart(e);break;case "gauge":f=new AmCharts.AmAngularGauge(e);break;case "funnel":f=new AmCharts.AmFunnelChart(e);break;case "map":f=new AmCharts.AmMap(e);break;case "stock":f=new AmCharts.AmStockChart(e)}AmCharts.extend(f,
b);AmCharts.isReady?isNaN(c)?f.write(a):setTimeout(function(){AmCharts.realWrite(f,a)},c):AmCharts.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){AmCharts.realWrite(f,a)},c)});return f};AmCharts.realWrite=function(a,b){a.write(b)};AmCharts.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case "true":case "yes":case "1":return!0;case "false":case "no":case "0":case null:return!1;default:return Boolean(a)}};AmCharts.removeFromArray=function(a,b){var c;for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};AmCharts.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};
AmCharts.wrappedText=function(a,b,c,d,e,f,g,h,k){var l=AmCharts.text(a,b,c,d,e,f,g),m="\n";AmCharts.isModern||(m="<br>");if(10<k)return l;if(l){var p=l.getBBox();if(p.width>h){l.remove();for(var l=[],n=0;-1<(index=b.indexOf(" ",n));)l.push(index),n=index+1;for(var s=Math.round(b.length/2),q=1E3,r,n=0;n<l.length;n++){var u=Math.abs(l[n]-s);u<q&&(r=l[n],q=u)}if(isNaN(r)){h=Math.ceil(p.width/h);for(n=1;n<h;n++)r=Math.round(b.length/h*n),b=b.substr(0,r)+m+b.substr(r);return AmCharts.text(a,b,c,d,e,f,
g)}b=b.substr(0,r)+m+b.substr(r+1);return AmCharts.wrappedText(a,b,c,d,e,f,g,h,k+1)}return l}};AmCharts.getStyle=function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};AmCharts.removePx=function(a){if(void 0!=a)return Number(a.substring(0,a.length-2))};
AmCharts.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else{var c=document.getElementsByName(b)[0];c?c.src=a:window.open(a)}else window.location.href=a};AmCharts.ifArray=function(a){return a&&0<a.length?!0:!1};AmCharts.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var d=b[c];if(d){if(d[a])d[a]();var e=d.length;if(0<e){var f;for(f=0;f<e;f++){var g=d[f];if(g&&g[a])g[a]()}}}}};
AmCharts.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};AmCharts.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};
AmCharts.toCoordinate=function(a,b,c){var d;void 0!==a&&(a=String(a),c&&c<b&&(b=c),d=Number(a),-1!=a.indexOf("!")&&(d=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(d=b*Number(a.substr(0,a.length-1))/100));return d};AmCharts.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};AmCharts.isDefined=function(a){return void 0===a?!1:!0};AmCharts.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};AmCharts.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};
AmCharts.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var d=c.length;if(d<b){var e;for(e=0;e<b-d;e++)c="0"+c}d=c.substring(0,c.length-b);""===d&&(d=0);return d+"."+c.substring(c.length-b,c.length)}return String(c)};
AmCharts.formatDuration=function(a,b,c,d,e,f){var g=AmCharts.intervals,h=f.decimalSeparator;if(a>=g[b].contains){var k=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b&&(k=AmCharts.formatNumber(k,f),1==k.split(h)[0].length&&(k="0"+k));("mm"==b||"hh"==b)&&10>k&&(k="0"+k);c=k+""+d[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return AmCharts.formatDuration(a,b,c,d,e,f)}"ss"==b&&(a=AmCharts.formatNumber(a,f),1==a.split(h)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+
d[b]+""+c;if(g[e].count>g[b].count)for(a=g[b].count;a<g[e].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+d[b]+""+c:"DD"==b&&(c="0"+d[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1));return c};
AmCharts.formatNumber=function(a,b,c,d,e){a=AmCharts.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var h=String(a),k=!1;-1!=h.indexOf("e")&&(k=!0);0<=c&&!k&&(h=AmCharts.toFixed(a,c));var l="";if(k)l=h;else{var h=h.split("."),k=String(h[0]),m;for(m=k.length;0<=m;m-=3)l=m!=k.length?0!==m?k.substring(m-3,m)+b+l:k.substring(m-3,m)+l:k.substring(m-3,m);void 0!==h[1]&&(l=l+f+h[1]);void 0!==c&&0<c&&"0"!=l&&(l=AmCharts.addZeroes(l,
f,c))}l=g+l;""===g&&!0===d&&0!==a&&(l="+"+l);!0===e&&(l+="%");return l};AmCharts.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",AmCharts.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};
AmCharts.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var d=0;b=a[0].split(".");b[1]&&(d=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-d;c++)b+="0"}return b};
AmCharts.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E);Math.pow(10,c);mantissa=String(mantissa).split(".").join(b);return String(mantissa)+"e"+c};AmCharts.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};
AmCharts.hitTest=function(a,b,c){var d=!1,e=a.x,f=a.x+a.width,g=a.y,h=a.y+a.height,k=AmCharts.isInRectangle;d||(d=k(e,g,b));d||(d=k(e,h,b));d||(d=k(f,g,b));d||(d=k(f,h,b));d||!0===c||(d=AmCharts.hitTest(b,a,!0));return d};AmCharts.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};AmCharts.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};
AmCharts.findPosX=function(a){var b=a,c=a.offsetLeft;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetLeft;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollLeft||0}return c};AmCharts.findPosY=function(a){var b=a,c=a.offsetTop;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetTop;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollTop||0}return c};AmCharts.findIfFixed=function(a){if(a.offsetParent)for(;a=a.offsetParent;)if("fixed"==AmCharts.getStyle(a,"position"))return!0;return!1};
AmCharts.findIfAuto=function(a){return a.style&&"auto"==AmCharts.getStyle(a,"overflow")?!0:a.parentNode?AmCharts.findIfAuto(a.parentNode):!1};AmCharts.findScrollLeft=function(a,b){a.scrollLeft&&(b+=a.scrollLeft);return a.parentNode?AmCharts.findScrollLeft(a.parentNode,b):b};AmCharts.findScrollTop=function(a,b){a.scrollTop&&(b+=a.scrollTop);return a.parentNode?AmCharts.findScrollTop(a.parentNode,b):b};
AmCharts.formatValue=function(a,b,c,d,e,f,g,h){if(b){void 0===e&&(e="");var k;for(k=0;k<c.length;k++){var l=c[k],m=b[l];void 0!==m&&(m=f?AmCharts.addPrefix(m,h,g,d):AmCharts.formatNumber(m,d),a=a.replace(RegExp("\\[\\["+e+""+l+"\\]\\]","g"),m))}}return a};AmCharts.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),d;for(d=0;d<c.length;d++){var e=c[d],e=e.substr(2,e.length-4);void 0!==b[e]&&(a=a.replace(RegExp("\\[\\["+e+"\\]\\]","g"),b[e]))}}return a};
AmCharts.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];void 0===d&&(d="");a=a.replace(c,d)}return a};AmCharts.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};
AmCharts.addPrefix=function(a,b,c,d,e){var f=AmCharts.formatNumber(a,d),g="",h,k,l;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(h=b.length-1;-1<h;h--){if(a>=b[h].number&&(k=a/b[h].number,l=Number(d.precision),1>l&&(l=1),c=AmCharts.roundTo(k,l),l=AmCharts.formatNumber(c,{precision:-1,decimalSeparator:d.decimalSeparator,thousandsSeparator:d.thousandsSeparator}),!e||k==c)){f=g+""+l+""+b[h].prefix;break}}else for(h=0;h<c.length;h++)if(a<=c[h].number){k=a/c[h].number;l=Math.abs(Math.round(Math.log(k)*
Math.LOG10E));k=AmCharts.roundTo(k,l);f=g+""+k+""+c[h].prefix;break}return f};AmCharts.remove=function(a){a&&a.remove()};AmCharts.recommended=function(){var a="js";document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")||swfobject&&swfobject.hasFlashPlayerVersion("8")&&(a="flash");return a};AmCharts.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};
AmCharts.getObjById=function(a,b){var c,d;for(d=0;d<a.length;d++){var e=a[d];e.id==b&&(c=e)}return c};AmCharts.applyTheme=function(a,b,c){b||(b=AmCharts.theme);b&&b[c]&&AmCharts.extend(a,b[c])};AmCharts.isString=function(a){return"string"==typeof a?!0:!1};AmCharts.extend=function(a,b,c){for(var d in b)c?a.hasOwnProperty(d)||(a[d]=b[d]):a[d]=b[d];return a};
AmCharts.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};AmCharts.processObject=function(a,b,c){!1===a instanceof b&&(a=AmCharts.extend(new b(c),a));return a};AmCharts.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};AmCharts.fixBrakes=function(a){if(AmCharts.isModern){var b=RegExp("<br>","g");a&&(a=a.replace(b,"\n"))}else a=AmCharts.fixNewLines(a);return a};
AmCharts.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)AmCharts.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a)a[c]&&("object"==typeof a[c]&&AmCharts.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(d){}}};
AmCharts.bounce=function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+0.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+0.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+0.984375)+c};AmCharts.easeInSine=function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c};AmCharts.easeOutSine=function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c};
AmCharts.easeOutElastic=function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(0===b)return c;if(1==(b/=e))return c+d;f||(f=0.3*e);g<Math.abs(d)?(g=d,a=f/4):a=f/(2*Math.PI)*Math.asin(d/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*e-a)*Math.PI/f)+d+c};AmCharts.AxisBase=AmCharts.Class({construct:function(a){this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=0.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=!0;this.valueRollOverColor="#CC0000";this.offset=
0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=0.07;this.autoWrap=!1;this.titleAlign="middle";AmCharts.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==
a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,this.gridCountR=Math.max(a,1)):this.gridCountR=this.gridCount;
this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var d=this.titleFontSize;isNaN(d)&&(d=b.fontSize+1);this.titleLabel=AmCharts.text(b.container,a,c,b.fontFamily,d,this.titleAlign,this.titleBold)}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,d=this.labelsSet,e={};0<d.length()?e=d.getBBox():(e.x=0,e.y=0,e.width=this.viW,e.height=
this.viH);d.push(a);var d=e.x,f=e.y;AmCharts.VML&&(this.rotate?d-=this.x:f-=this.y);var g=e.width,e=e.height,h=this.viW,k=this.viH,l=0,m=a.getBBox().height/2,p=this.inside,n=this.titleAlign;switch(this.position){case "top":b="left"==n?-1:"right"==n?h:h/2;c=f-10-m;break;case "bottom":b="left"==n?-1:"right"==n?h:h/2;c=f+e+10+m;break;case "left":b=d-10-m;p&&(b-=5);c="left"==n?k+1:"right"==n?-1:k/2;l=-90;break;case "right":b=d+g+10+m-3,p&&(b+=7),c="left"==n?k+2:"right"==n?-2:k/2,l=-90}this.marginsChanged?
(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!==l&&a.rotate(l)}},pushAxisItem:function(a,b){var c=a.graphics();0<c.length()&&(b?this.labelsSet.push(c):this.set.push(c));(c=a.getLabel())&&this.labelsSet.push(c)},addGuide:function(a){var b=this.guides;-1==b.indexOf(a)&&b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),
c=b.x+b.width/2,b=b.y+b.height/2,d=a.fillColor;void 0===d&&(d=a.lineColor);this.chart.showBalloon(a.balloonText,d,!0,c,b)},handleGuideOut:function(a){this.chart.hideBalloon()},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a=this.labelsSet.getBBox();AmCharts.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height});return a},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.labelsSet);
var a=this.axisLine;a&&AmCharts.remove(a.set);AmCharts.remove(this.grid0)}});AmCharts.ValueAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");AmCharts.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=
0;this.radarCategoriesEnabled=!0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.minMaxMultiplier=1;this.logGridLimit=2;AmCharts.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();this.synchronizationMultiplier&&
this.synchronizeWith?(AmCharts.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0)):(this.foundGraphs=!1,this.getMinMax())},draw:function(){AmCharts.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;"duration"==this.type&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);if(this.logarithmic&&(0>=this.getMin(0,this.data.length-
1)||0>=this.minimum))this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});else{this.grid0=null;var c,d,e=a.dx,f=a.dy,g=!1,h=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==this.max)g=!0;else{var k=this.labelFrequency,l=this.showFirstLabel,m=this.showLastLabel,p=1,n=0,s=Math.round((this.max-this.min)/this.step)+1,q;!0===h?(q=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/q,
q>this.logGridLimit&&(s=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,n=Math.round(Math.log(this.minReal)*Math.LOG10E),s>this.gridCountR&&(p=Math.ceil(s/this.gridCountR)))):this.stepWidth=this.axisWidth/(this.max-this.min);var r=0;1>this.step&&-1<this.step&&(r=AmCharts.getDecimals(this.step));this.integersOnly&&(r=0);r>this.maxDecCount&&(r=this.maxDecCount);var u=this.precision;isNaN(u)||(r=u);this.max=AmCharts.roundTo(this.max,this.maxDecCount);this.min=AmCharts.roundTo(this.min,this.maxDecCount);
var v={};v.precision=r;v.decimalSeparator=a.nf.decimalSeparator;v.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=v;var t,w=this.guides,y=w.length;if(0<y){c=this.fillAlpha;for(d=this.fillAlpha=0;d<y;d++){var E=w[d],z=NaN,A=E.above;isNaN(E.toValue)||(z=this.getCoordinate(E.toValue),t=new this.axisItemRenderer(this,z,"",!0,NaN,NaN,E),this.pushAxisItem(t,A));var I=NaN;isNaN(E.value)||(I=this.getCoordinate(E.value),t=new this.axisItemRenderer(this,I,E.label,!0,NaN,(z-I)/2,E),this.pushAxisItem(t,
A));isNaN(z-I)||(t=new this.guideFillRenderer(this,I,z,E),this.pushAxisItem(t,A),t=t.graphics(),E.graphics=t,E.balloonText&&this.addEventListeners(t,E))}this.fillAlpha=c}w=!1;for(d=n;d<s;d+=p)y=AmCharts.roundTo(this.step*d+this.min,r),-1!=String(y).indexOf("e")&&(w=!0,String(y).split("e"));this.duration&&(this.maxInterval=AmCharts.getMaxInterval(this.max,this.duration));var r=this.step,G,y=this.minorGridAlpha;this.minorGridEnabled&&(G=this.getMinorGridStep(r,this.stepWidth*r));for(d=n;d<s;d+=p)if(n=
r*d+this.min,n=AmCharts.roundTo(n,this.maxDecCount+1),!this.integersOnly||Math.round(n)==n)if(isNaN(u)||Number(AmCharts.toFixed(n,u))==n){!0===h&&(0===n&&(n=this.minReal),q>this.logGridLimit&&(n=Math.pow(10,d)),w=-1!=String(n).indexOf("e")?!0:!1);this.useScientificNotation&&(w=!0);this.usePrefixes&&(w=!1);w?(t=-1==String(n).indexOf("e")?n.toExponential(15):String(n),c=t.split("e"),t=Number(c[0]),c=Number(c[1]),t=AmCharts.roundTo(t,14),10==t&&(t=1,c+=1),t=t+"e"+c,0===n&&(t="0"),1==n&&(t="1")):(h&&
(t=String(n).split("."),t[1]?(v.precision=t[1].length,0>d&&(v.precision=Math.abs(d))):v.precision=-1),t=this.usePrefixes?AmCharts.addPrefix(n,a.prefixesOfBigNumbers,a.prefixesOfSmallNumbers,v,!0):AmCharts.formatNumber(n,v,v.precision));this.duration&&(t=AmCharts.formatDuration(n,this.duration,"",this.durationUnits,this.maxInterval,v));this.recalculateToPercents?t+="%":(c=this.unit)&&(t="left"==this.unitPosition?c+t:t+c);Math.round(d/k)!=d/k&&(t=void 0);if(0===d&&!l||d==s-1&&!m)t=" ";c=this.getCoordinate(n);
this.labelFunction&&(t=this.labelFunction(n,t,this).toString());t=new this.axisItemRenderer(this,c,t);this.pushAxisItem(t);if(n==this.baseValue&&"radar"!=a.type){var B,K,A=this.viW,z=this.viH;t=this.viX;E=this.viY;"H"==this.orientation?0<=c&&c<=A+1&&(B=[c,c,c+e],K=[z,0,f]):0<=c&&c<=z+1&&(B=[0,A,A+e],K=[c,c,c+f]);B&&(c=AmCharts.fitToBounds(2*this.gridAlpha,0,1),c=AmCharts.line(a.container,B,K,this.gridColor,c,1,this.dashLength),c.translate(t,E),this.grid0=c,a.axesSet.push(c),c.toBack())}if(!isNaN(G)&&
0<y&&d<s-1){t=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(c=1;c<r/G;c++)E=this.getCoordinate(n+G*c),E=new this.axisItemRenderer(this,E,"",!1,0,0,!1,!1,0,!0),this.pushAxisItem(E);this.gridAlpha=t}}d=this.baseValue;this.min>this.baseValue&&this.max>this.baseValue&&(d=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(d=this.max);h&&d<this.minReal&&(d=this.minReal);this.baseCoord=this.getCoordinate(d);d={type:"axisChanged",target:this,chart:a};d.min=h?this.minReal:this.min;d.max=
this.max;this.fire("axisChanged",d);this.axisCreated=!0}h=this.axisLine.set;d=this.labelsSet;this.positionTitle();"radar"!=a.type?(a=this.viX,e=this.viY,b.translate(a,e),d.translate(a,e)):h.toFront();!this.visible||g?(b.hide(),h.hide(),d.hide()):(b.show(),h.show(),d.show());this.axisY=this.y-this.viY;this.axisX=this.x-this.viX}},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var d=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=0;e<c.length;e++){var f=a/c[e],g=Math.floor(Math.log(Math.abs(f))*
Math.LOG10E);if(!(0<Math.abs(d-g)))if(1>a){if(g=Math.pow(10,-g)*f,g==Math.round(g))return f}else if(f==Math.round(f))return f}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],d=[],e=[],f=[],g,h=this.chart.graphs,k,l,m,p,n=this.baseValue,s=!1;if("line"==a||"step"==a||"smoothedLine"==a)s=!0;if(s&&("regular"==b||"100%"==b))for(p=0;p<h.length;p++)m=h[p],m.hidden||(l=m.type,m.chart==this.chart&&m.valueAxis==
this&&a==l&&m.stackable&&(k&&(m.stackGraph=k),k=m));for(k=this.start;k<=this.end;k++){var q=0;for(p=0;p<h.length;p++)if(m=h[p],!m.hidden&&(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,!isNaN(g)))){var r=AmCharts.getDecimals(g);q<r&&(q=r);isNaN(f[k])?f[k]=Math.abs(g):f[k]+=Math.abs(g);f[k]=AmCharts.roundTo(f[k],q);r=m.fillToGraph;s&&r&&(r=this.data[k].axes[this.id].graphs[r.id])&&(l.values.open=r.values.value);"regular"==
b&&(s&&(isNaN(c[k])?(c[k]=g,l.values.close=g,l.values.open=this.baseValue):(isNaN(g)?l.values.close=c[k]:l.values.close=g+c[k],l.values.open=c[k],c[k]=l.values.close)),"column"!=a||isNaN(g)||(m.newStack&&(e[k]=NaN,d[k]=NaN),l.values.close=g,0>g?(l.values.close=g,isNaN(d[k])?l.values.open=n:(l.values.close+=d[k],l.values.open=d[k]),d[k]=l.values.close):(l.values.close=g,isNaN(e[k])?l.values.open=n:(l.values.close+=e[k],l.values.open=e[k]),e[k]=l.values.close)))}}for(k=this.start;k<=this.end;k++)for(p=
0;p<h.length;p++)m=h[p],m.hidden||(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,isNaN(g)||(c=g/f[k]*100,l.values.percents=c,l.values.total=f[k],"100%"==b&&(isNaN(d[k])&&(d[k]=0),isNaN(e[k])&&(e[k]=0),0>c?(l.values.close=AmCharts.fitToBounds(c+d[k],-100,100),l.values.open=d[k],d[k]=l.values.close):(l.values.close=AmCharts.fitToBounds(c+e[k],-100,100),l.values.open=e[k],e[k]=l.values.close)))))},recalculate:function(){var a=
this.chart.graphs,b;for(b=0;b<a.length;b++){var c=a[b];if(c.valueAxis==this){var d="value";if("candlestick"==c.type||"ohlc"==c.type)d="open";var e,f,g=this.end+2,g=AmCharts.fitToBounds(this.end+1,0,this.data.length-1),h=this.start;0<h&&h--;var k;f=this.start;c.compareFromStart&&(f=0);for(k=f;k<=g&&(f=this.data[k].axes[this.id].graphs[c.id],e=f.values[d],isNaN(e));k++);for(d=h;d<=g;d++){f=this.data[d].axes[this.id].graphs[c.id];f.percents={};var h=f.values,l;for(l in h)f.percents[l]="percents"!=l?
h[l]/e*100-100:h[l]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,d;for(d=0;d<c.length;d++){var e=c[d].type;("line"==e||"step"==e||"smoothedLine"==e)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);a=this.minMaxMultiplier;this.min=this.getMin(this.start,this.end);this.max=this.getMax();a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;
if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=this.maxTemp);this.minReal=this.min;this.maxReal=this.max;
0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;c=this.max-this.min;d=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/d)*d+d);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/d)*d-d);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&
(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;d=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/d)*d;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=this.fixStepE(c);d=Math.ceil(this.step/c);5<d&&(d=10);5>=d&&2<d&&(d=5);this.step=Math.ceil(this.step/(c*d))*c*d;1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=AmCharts.roundTo(this.step,
this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<
this.minReal?this.min+this.step:this.min);c=Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E;this.logarithmic&&(2<c?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(b=Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},fixStepE:function(a){a=a.toExponential(0).split("e");var b=Number(a[1]);
9==Number(a[0])&&b++;return this.generateNumber(1,b)},generateNumber:function(a,b){var c="",d;d=0>b?Math.abs(b)-1:Math.abs(b);var e;for(e=0;e<d;e++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)},getMin:function(a,b){var c,d;for(d=a;d<=b;d++){var e=this.data[d].axes[this.id].graphs,f;for(f in e)if(e.hasOwnProperty(f)){var g=this.chart.getGraphById(f);if(g.includeInMinMax&&(!g.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);this.foundGraphs=!0;g=e[f].values;this.recalculateToPercents&&
(g=e[f].percents);var h;if(this.minMaxField)h=g[this.minMaxField],h<c&&(c=h);else for(var k in g)g.hasOwnProperty(k)&&"percents"!=k&&"total"!=k&&(h=g[k],h<c&&(c=h))}}}return c},getMax:function(){var a,b;for(b=this.start;b<=this.end;b++){var c=this.data[b].axes[this.id].graphs,d;for(d in c)if(c.hasOwnProperty(d)){var e=this.chart.getGraphById(d);if(e.includeInMinMax&&(!e.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;e=c[d].values;this.recalculateToPercents&&(e=c[d].percents);
var f;if(this.minMaxField)f=e[this.minMaxField],f>a&&(a=f);else for(var g in e)e.hasOwnProperty(g)&&"percents"!=g&&"total"!=g&&(f=e[g],f>a&&(a=f))}}}return a},dispatchZoomEvent:function(a,b){var c={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(c.type,c)},zoomToValues:function(a,b){if(b<a){var c=b;b=a;a=c}a<this.min&&(a=this.min);b>this.max&&(b=this.max);c={type:"axisSelfZoomed"};c.chart=this.chart;c.valueAxis=this;c.multiplier=this.axisWidth/Math.abs(this.getCoordinate(b)-
this.getCoordinate(a));c.position="V"==this.orientation?this.reversed?this.getCoordinate(a):this.getCoordinate(b):this.reversed?this.getCoordinate(b):this.getCoordinate(a);this.fire(c.type,c)},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,d=this.reversed,e=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(e?!0===d?(b-a)/c:a/c:!0===d?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===d?e?f-(a-b)/c:a/c+f:e?a/c+f:f-(a-b)/c},getCoordinate:function(a){if(isNaN(a))return NaN;
var b=this.rotate,c=this.reversed,d=this.axisWidth,e=this.stepWidth,f=this.min,g=this.minReal;!0===this.logarithmic?(a=Math.log(a)*Math.LOG10E-Math.log(g)*Math.LOG10E,b=b?!0===c?d-e*a:e*a:!0===c?e*a:d-e*a):b=!0===c?b?d-e*(a-f):e*(a-f):b?e*(a-f):d-e*(a-f);b=this.rotate?b+(this.x-this.viX):b+(this.y-this.viY);return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",this.handleSynchronization)},handleSynchronization:function(a){var b=
this.synchronizeWith;a=b.min;var c=b.max,b=b.step,d=this.synchronizationMultiplier;d&&(this.min=a*d,this.max=c*d,this.step=b*d,a=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),a=Math.abs(Math.log(Math.abs(a))*Math.LOG10E),this.maxDecCount=a=Math.round(a),this.draw())}});AmCharts.RecAxis=AmCharts.Class({construct:function(a){var b=a.chart,c=a.axisThickness,d=a.axisColor,e=a.axisAlpha,f=a.offset,g=a.dx,h=a.dy,k=a.viX,l=a.viY,m=a.viH,p=a.viW,n=b.container;"H"==a.orientation?(d=AmCharts.line(n,[0,p],[0,0],d,e,c),this.axisWidth=a.width,"bottom"==a.position?(a=c/2+f+m+l-1,c=k):(a=-c/2-f+l+h,c=g+k)):(this.axisWidth=a.height,"right"==a.position?(d=AmCharts.line(n,[0,0,-g],[0,m,m-h],d,e,c),a=l+h,c=c/2+f+g+p+k-1):(d=AmCharts.line(n,[0,0],[0,m],d,e,c),a=l,c=-c/2-f+k));d.translate(c,
a);b.axesSet.push(d);this.set=d}});AmCharts.RecItem=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l){b=Math.round(b);void 0==c&&(c="");k||(k=0);void 0==d&&(d=!0);var m=a.chart.fontFamily,p=a.fontSize;void 0==p&&(p=a.chart.fontSize);var n=a.color;void 0==n&&(n=a.chart.color);var s=a.chart.container,q=s.set();this.set=q;var r=a.axisThickness,u=a.axisColor,v=a.axisAlpha,t=a.tickLength,w=a.gridAlpha,y=a.gridThickness,E=a.gridColor,z=a.dashLength,A=a.fillColor,I=a.fillAlpha,G=a.labelsEnabled,B=a.labelRotation,K=a.counter,M=a.inside,
ca=a.dx,W=a.dy,Na=a.orientation,ga=a.position,ma=a.previousCoord,U=a.viH,X=a.viW,$=a.offset,ra,P;g?(G=!0,isNaN(g.tickLength)||(t=g.tickLength),void 0!=g.lineColor&&(E=g.lineColor),void 0!=g.color&&(n=g.color),isNaN(g.lineAlpha)||(w=g.lineAlpha),isNaN(g.dashLength)||(z=g.dashLength),isNaN(g.lineThickness)||(y=g.lineThickness),!0===g.inside&&(M=!0),isNaN(g.labelRotation)||(B=g.labelRotation),isNaN(g.fontSize)||(p=g.fontSize),g.position&&(ga=g.position)):""===c&&(t=0);P="start";e&&(P="middle");var Y=
B*Math.PI/180,pa,H=0,F=0,V=0,da=pa=0,ha=0;"V"==Na&&(B=0);var x;G&&(x=a.autoWrap&&0===B?AmCharts.wrappedText(s,c,n,m,p,P,h,e,0):AmCharts.text(s,c,n,m,p,P,h),P=x.getBBox(),da=P.width,ha=P.height);if("H"==Na){if(0<=b&&b<=X+1&&(0<t&&0<v&&b+k<=X+1&&(ra=AmCharts.line(s,[b+k,b+k],[0,t],u,v,y),q.push(ra)),0<w&&(P=AmCharts.line(s,[b,b+ca,b+ca],[U,U+W,W],E,w,y,z),q.push(P))),F=0,H=b,g&&90==B&&(H-=p),!1===d?(P="start",F="bottom"==ga?M?F+t:F-t:M?F-t:F+t,H+=3,e&&(H+=e/2,P="middle"),0<B&&(P="middle")):P="middle",
1==K&&0<I&&!g&&!l&&ma<X&&(d=AmCharts.fitToBounds(b,0,X),ma=AmCharts.fitToBounds(ma,0,X),pa=d-ma,0<pa&&(fill=AmCharts.rect(s,pa,a.height,A,I),fill.translate(d-pa+ca,W),q.push(fill))),"bottom"==ga?(F+=U+p/2+$,M?0<B?(F=U-da/2*Math.sin(Y)-t-3,H+=da/2*Math.cos(Y)-4+2):0>B?(F=U+da*Math.sin(Y)-t-3+2,H+=-da*Math.cos(Y)-ha*Math.sin(Y)-4):F-=t+p+3+3:0<B?(F=U+da/2*Math.sin(Y)+t+3,H-=da/2*Math.cos(Y)):0>B?(F=U+t+3-da/2*Math.sin(Y)+2,H+=da/2*Math.cos(Y)):F+=t+r+3+3):(F+=W+p/2-$,H+=ca,M?0<B?(F=da/2*Math.sin(Y)+
t+3,H-=da/2*Math.cos(Y)):F+=t+3:0<B?(F=-(da/2)*Math.sin(Y)-t-6,H+=da/2*Math.cos(Y)):F-=t+p+3+r+3),"bottom"==ga?pa=(M?U-t-1:U+r-1)+$:(V=ca,pa=(M?W:W-t-r+1)-$),f&&(H+=f),W=H,0<B&&(W+=da/2*Math.cos(Y)),x&&(ga=0,M&&(ga=da/2*Math.cos(Y)),W+ga>X+2||0>W))x.remove(),x=null}else{0<=b&&b<=U+1&&(0<t&&0<v&&b+k<=U+1&&(ra=AmCharts.line(s,[0,t],[b+k,b+k],u,v,y),q.push(ra)),0<w&&(P=AmCharts.line(s,[0,ca,X+ca],[b,b+W,b+W],E,w,y,z),q.push(P)));P="end";if(!0===M&&"left"==ga||!1===M&&"right"==ga)P="start";F=b-p/2;1==
K&&0<I&&!g&&!l&&(d=AmCharts.fitToBounds(b,0,U),ma=AmCharts.fitToBounds(ma,0,U),Y=d-ma,fill=AmCharts.polygon(s,[0,a.width,a.width,0],[0,0,Y,Y],A,I),fill.translate(ca,d-Y+W),q.push(fill));F+=p/2;"right"==ga?(H+=ca+X+$,F+=W,M?(H-=t+4,f||(F-=p/2+3)):(H+=t+4+r,F-=2)):M?(H+=t+4-$,f||(F-=p/2+3),g&&(H+=ca,F+=W)):(H+=-t-r-4-2-$,F-=2);ra&&("right"==ga?(V+=ca+$+X,pa+=W,V=M?V-r:V+r):(V-=$,M||(V-=t+r)));f&&(F+=f);M=-3;"right"==ga&&(M+=W);x&&(F>U+1||F<M)&&(x.remove(),x=null)}ra&&ra.translate(V,pa);!1===a.visible&&
(ra&&ra.remove(),x&&(x.remove(),x=null));x&&(x.attr({"text-anchor":P}),x.translate(H,F),0!==B&&x.rotate(-B,a.chart.backgroundColor),a.allLabels.push(x)," "!=c&&(this.label=x));l||(a.counter=0===K?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}});AmCharts.RecFill=AmCharts.Class({construct:function(a,b,c,d){var e=a.dx,f=a.dy,g=a.orientation,h=0;if(c<b){var k=b;b=c;c=k}var l=d.fillAlpha;isNaN(l)&&(l=0);k=a.chart.container;d=d.fillColor;"V"==g?(b=AmCharts.fitToBounds(b,0,a.viH),c=AmCharts.fitToBounds(c,0,a.viH)):(b=AmCharts.fitToBounds(b,0,a.viW),c=AmCharts.fitToBounds(c,0,a.viW));c-=b;isNaN(c)&&(c=4,h=2,l=0);0>c&&"object"==typeof d&&(d=d.join(",").split(",").reverse());"V"==g?(a=AmCharts.rect(k,a.width,c,d,l),a.translate(e,b-h+f)):(a=AmCharts.rect(k,
c,a.height,d,l),a.translate(b-h+e,f));this.set=k.set([a])},graphics:function(){return this.set},getLabel:function(){}});AmCharts.AmChart=AmCharts.Class({construct:function(a){this.theme=a;this.version="3.4.8";AmCharts.addChart(this);this.createEvents("dataUpdated","init","rendered","drawn");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.usePrefixes=!1;this.precision=-1;this.percentPrecision=2;this.decimalSeparator=
".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.legendDiv=b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.handDrawThickness=
1;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},{number:1E-6,prefix:"\u03bc"},{number:0.001,prefix:"m"}];this.panEventsEnabled=!0;AmCharts.bezierX=
3;AmCharts.bezierY=6;this.product="amcharts";this.animations=[];this.balloon=new AmCharts.AmBalloon(this.theme);this.balloon.chart=this;AmCharts.applyTheme(this,a,"AmChart")},drawChart:function(){this.drawBackground();this.redrawLabels();this.drawTitles();this.brr()},drawBackground:function(){AmCharts.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,d=this.set;AmCharts.isModern||0!==c||(c=0.001);var e=this.updateWidth();this.realWidth=e;var f=this.updateHeight();
this.realHeight=f;this.background=b=AmCharts.polygon(a,[0,e-1,e-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.push(b);if(b=this.backgroundImage)this.path&&(b=this.path+b),this.bgImg=a=a.image(b,0,0,e,f),d.push(a)},drawTitles:function(){var a=this.titles;if(AmCharts.ifArray(a)){var b=20,c;for(c=0;c<a.length;c++){var d=a[c],e=d.color;void 0===e&&(e=this.color);var f=d.size;isNaN(f)&&(f=this.fontSize+2);isNaN(d.alpha);var g=this.marginLeft,e=AmCharts.text(this.container,d.text,e,this.fontFamily,
f);e.translate(g+(this.realWidth-this.marginRight-g)/2,b);g=!0;void 0!==d.bold&&(g=d.bold);g&&e.attr({"font-weight":"bold"});e.attr({opacity:d.alpha});b+=f+6;this.freeLabelsSet.push(e)}}},write:function(a){a="object"!=typeof a?document.getElementById(a):a;a.innerHTML="";this.div=a;a.style.overflow="hidden";a.style.textAlign="left";var b=this.chartDiv,c=this.legendDiv,d=this.legend,e=c.style,f=b.style;this.measure();var g,h=document.createElement("div");g=h.style;g.position="relative";this.containerDiv=
h;a.appendChild(h);var k=this.exportConfig;k&&AmCharts.AmExport&&!this.AmExport&&(this.AmExport=new AmCharts.AmExport(this,k));if(d)switch(d=this.addLegend(d,d.divId),d.position){case "bottom":h.appendChild(b);h.appendChild(c);break;case "top":h.appendChild(c);h.appendChild(b);break;case "absolute":g.width=a.style.width;g.height=a.style.height;e.position="absolute";f.position="absolute";void 0!==d.left&&(e.left=d.left+"px");void 0!==d.right&&(e.right=d.right+"px");void 0!==d.top&&(e.top=d.top+"px");
void 0!==d.bottom&&(e.bottom=d.bottom+"px");d.marginLeft=0;d.marginRight=0;h.appendChild(b);h.appendChild(c);break;case "right":g.width=a.style.width;g.height=a.style.height;e.position="relative";f.position="absolute";h.appendChild(b);h.appendChild(c);break;case "left":g.width=a.style.width;g.height=a.style.height;e.position="absolute";f.position="relative";h.appendChild(b);h.appendChild(c);break;case "outside":h.appendChild(b)}else h.appendChild(b);this.listenersAdded||(this.addListeners(),this.listenersAdded=
!0);this.initChart()},createLabelsSet:function(){AmCharts.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf=
{precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.divIsFixed=AmCharts.findIfFixed(this.chartDiv);this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;this.destroy();this.startInterval();a=0;document.attachEvent&&!window.opera&&(a=1);this.dmouseX=this.dmouseY=0;var b=document.getElementsByTagName("html")[0];
b&&window.getComputedStyle&&(b=window.getComputedStyle(b,null))&&(this.dmouseY=AmCharts.removePx(b.getPropertyValue("margin-top")),this.dmouseX=AmCharts.removePx(b.getPropertyValue("margin-left")));this.mouseMode=a;a=new AmCharts.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);a.handDrawn=this.handDrawn;a.handDrawScatter=this.handDrawScatter;a.handDrawThickness=this.handDrawThickness;this.container=a;if(AmCharts.VML||AmCharts.SVG)a=this.container,this.set=a.set(),this.gridSet=a.set(),this.cursorLineSet=
a.set(),this.graphsBehindSet=a.set(),this.bulletBehindSet=a.set(),this.columnSet=a.set(),this.graphsSet=a.set(),this.trendLinesSet=a.set(),this.axesLabelsSet=a.set(),this.axesSet=a.set(),this.cursorSet=a.set(),this.scrollbarsSet=a.set(),this.bulletSet=a.set(),this.freeLabelsSet=a.set(),this.balloonsSet=a.set(),this.balloonsSet.setAttr("id","balloons"),this.zoomButtonSet=a.set(),this.linkSet=a.set(),this.renderFix()},measure:function(){var a=this.div,b=this.chartDiv,c=a.offsetWidth,d=a.offsetHeight,
e=this.container;a.clientHeight&&(c=a.clientWidth,d=a.clientHeight);var f=AmCharts.removePx(AmCharts.getStyle(a,"padding-left")),g=AmCharts.removePx(AmCharts.getStyle(a,"padding-right")),h=AmCharts.removePx(AmCharts.getStyle(a,"padding-top")),k=AmCharts.removePx(AmCharts.getStyle(a,"padding-bottom"));isNaN(f)||(c-=f);isNaN(g)||(c-=g);isNaN(h)||(d-=h);isNaN(k)||(d-=k);f=a.style;a=f.width;f=f.height;-1!=a.indexOf("px")&&(c=AmCharts.removePx(a));-1!=f.indexOf("px")&&(d=AmCharts.removePx(f));a=AmCharts.toCoordinate(this.width,
c);f=AmCharts.toCoordinate(this.height,d);this.balloon=AmCharts.processObject(this.balloon,AmCharts.AmBalloon,this.theme);this.balloon.chart=this;if(a!=this.previousWidth||f!=this.previousHeight)b.style.width=a+"px",b.style.height=f+"px",e&&e.setSize(a,f);this.balloon.setBounds(2,2,a-2,f);this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=d},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.interval&&clearInterval(this.interval);this.interval=NaN},clearTimeOuts:function(){var a=
this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){AmCharts.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.interval&&clearInterval(this.interval);this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||AmCharts.removeChart(this)},setMouseCursor:function(a){"auto"==
a&&AmCharts.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container){var b=a.y,c=a.text,d=a.align,e=a.size,f=a.color,g=a.rotation,h=a.alpha,k=a.bold,l=AmCharts.toCoordinate(a.x,this.realWidth),b=AmCharts.toCoordinate(b,this.realHeight);l||(l=0);b||(b=0);void 0===f&&(f=this.color);isNaN(e)&&(e=this.fontSize);
d||(d="start");"left"==d&&(d="start");"right"==d&&(d="end");"center"==d&&(d="middle",g?b=this.realHeight-b+b/2:l=this.realWidth/2-l);void 0===h&&(h=1);void 0===g&&(g=0);b+=e/2;c=AmCharts.text(this.container,c,f,this.fontFamily,e,d,k,h);c.translate(l,b);0!==g&&c.rotate(g);a.url&&(c.setAttr("cursor","pointer"),c.click(function(){AmCharts.getURL(a.url)}));this.labelsSet.push(c);this.labels.push(c)}},addLabel:function(a,b,c,d,e,f,g,h,k,l){a={x:a,y:b,text:c,align:d,size:e,color:f,alpha:h,rotation:g,bold:k,
url:l};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var d=this.legendDiv,
e=d.offsetWidth;isNaN(c.width)||(e=c.width);var f=d.offsetHeight,d=d.style,g=this.chartDiv.style,c=c.position;if("right"==c||"left"==c){a-=e;if(0>a||isNaN(a))a=0;g.width=a+"px";"left"==c?g.left=e+"px":d.left=a+"px";d.top=(b-f)/2+"px"}}return a},getTitleHeight:function(){var a=0,b=this.titles;if(0<b.length){var a=15,c;for(c=0;c<b.length;c++){var d=b[c].size;isNaN(d)&&(d=this.fontSize+2);a+=d+6}}return a},addTitle:function(a,b,c,d,e){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:d,bold:e};
this.titles.push(a);return a},addMouseWheel:function(){var a=this;window.addEventListener&&(window.addEventListener("DOMMouseScroll",function(b){a.handleWheel.call(a,b)},!1),document.addEventListener("mousewheel",function(b){a.handleWheel.call(a,b)},!1))},handleWheel:function(a){if(this.mouseIsOver){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()}},handleWheelReal:function(a){},addListeners:function(){var a=
this,b=a.chartDiv;document.addEventListener?(a.panEventsEnabled&&"ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b);a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0)),b.addEventListener("mousedown",function(b){a.handleMouseDown.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,
b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){var a;this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,a="dataUpdated",this.fire(a,{type:a,chart:this}));this.chartCreated||(a="init",this.fire(a,{type:a,chart:this}));this.chartRendered||
(a="rendered",this.fire(a,{type:a,chart:this}),this.chartRendered=!0);a="drawn";this.fire(a,{type:a,chart:this})},validateSize:function(){var a=this;a.measure();var b=a.legend;if((a.realWidth!=a.previousWidth||a.realHeight!=a.previousHeight)&&0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},100);a.timeOuts.push(c);a.legendInitTO=c}a.marginsUpdated="xy"!=a.type?!1:!0;clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},
150);a.timeOuts.push(c);a.initTO=c}a.renderFix();b&&b.renderFix()},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated="xy"!=this.type?!1:!0,this.initChart(a))},validateNow:function(){this.chartRendered=
this.listenersAdded=!1;this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearInterval(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide()},showBalloon:function(a,b,c,d,e){var f=this;clearTimeout(f.balloonTO);clearInterval(f.hoverInt);f.balloonTO=
setTimeout(function(){f.showBalloonReal.call(f,a,b,c,d,e)},1)},showBalloonReal:function(a,b,c,d,e){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(d,e),f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-AmCharts.findPosX(b),this.mouseY=a.pageY-AmCharts.findPosY(b))},handleMouseOver:function(a){AmCharts.resetMouseOver();
this.mouseIsOver=!0},handleMouseOut:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=this.chartDiv;a||(a=window.event);var c,d;if(a){this.posX=AmCharts.findPosX(b);this.posY=AmCharts.findPosY(b);switch(this.mouseMode){case 1:c=a.clientX-this.posX;d=a.clientY-this.posY;if(!this.divIsFixed){var b=document.body,e,f;b&&(e=b.scrollLeft,y1=b.scrollTop);if(b=document.documentElement)f=b.scrollLeft,y2=b.scrollTop;e=Math.max(e,f);f=Math.max(y1,
y2);c+=e;d+=f}break;case 0:this.divIsFixed?(c=a.clientX-this.posX,d=a.clientY-this.posY):(c=a.pageX-this.posX,d=a.pageY-this.posY)}a.touches&&(a=a.touches.item(0),c=a.pageX-this.posX,d=a.pageY-this.posY);this.mouseX=c-this.dmouseX;this.mouseY=d-this.dmouseY}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){AmCharts.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(a){},handleMouseDown:function(a){AmCharts.resetMouseOver();this.mouseIsOver=
!0;a&&a.preventDefault&&a.preventDefault()},addLegend:function(a,b){a=AmCharts.processObject(a,AmCharts.AmLegend,this.theme);a.divId=b;var c;c="object"!=typeof b&&b?document.getElementById(b):b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;c=this.handleLegendEvent;this.listenTo(a,"showItem",c);this.listenTo(a,"hideItem",c);this.listenTo(a,"clickMarker",c);this.listenTo(a,"rollOverItem",c);this.listenTo(a,"rollOutItem",c);this.listenTo(a,"rollOverMarker",
c);this.listenTo(a,"rollOutMarker",c);this.listenTo(a,"clickLabel",c);return a},removeLegend:function(){this.legend=void 0;this.legendDiv.innerHTML=""},handleResize:function(){(AmCharts.isPercents(this.width)||AmCharts.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(AmCharts.hasSVG)return this.container},animate:function(a,b,c,d,e,f,g){a["an_"+b]&&AmCharts.removeFromArray(this.animations,
a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:d,time:e,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},startInterval:function(){var a=this;clearInterval(a.interval);a.interval=setInterval(function(){a.updateAnimations.call(a)},AmCharts.updateRate)},stopAnim:function(a){AmCharts.removeFromArray(this.animations,a)},updateAnimations:function(){var a;this.container&&this.container.update();for(a=this.animations.length-
1;0<=a;a--){var b=this.animations[a],c=1E3*b.time/AmCharts.updateRate,d=b.frame+1,e=b.obj,f=b.attribute;if(d<=c){b.frame++;var g=Number(b.from),h=Number(b.to)-g,c=AmCharts[b.effect](0,d,g,h,c);0===h?this.animations.splice(a,1):e.node.style[f]=c+b.suffix}else e.node.style[f]=Number(b.to)+b.suffix,this.animations.splice(a,1)}},brr:function(){var a=window.location.hostname.split("."),b;2<=a.length&&(b=a[a.length-2]+"."+a[a.length-1]);this.amLink&&(a=this.amLink.parentNode)&&a.removeChild(this.amLink);
a=this.creditsPosition;if("amcharts.com"!=b){var c=b=0,d=this.realWidth,e=this.realHeight;if("serial"==this.type||"xy"==this.type)b=this.marginLeftReal,c=this.marginTopReal,d=b+this.plotAreaWidth,e=c+this.plotAreaHeight;var f="http://www.amcharts.com/javascript-charts/",g="JavaScript charts",h="JS chart by amCharts";"ammap"==this.product&&(f="http://www.ammap.com/javascript-maps/",g="Interactive JavaScript maps",h="JS map by amCharts");var k=document.createElement("a"),h=document.createTextNode(h);
k.setAttribute("href",f);k.setAttribute("title",g);k.appendChild(h);this.chartDiv.appendChild(k);this.amLink=k;f=k.style;f.position="absolute";f.textDecoration="none";f.color=this.color;f.fontFamily=this.fontFamily;f.fontSize=this.fontSize+"px";f.opacity=0.7;f.display="block";var g=k.offsetWidth,k=k.offsetHeight,h=5+b,l=c+5;"bottom-left"==a&&(h=5+b,l=e-k-3);"bottom-right"==a&&(h=d-g-5,l=e-k-3);"top-right"==a&&(h=d-g-5,l=c+5);f.left=h+"px";f.top=l+"px"}}});AmCharts.Slice=AmCharts.Class({construct:function(){}});
AmCharts.SerialDataItem=AmCharts.Class({construct:function(){}});AmCharts.GraphDataItem=AmCharts.Class({construct:function(){}});AmCharts.Guide=AmCharts.Class({construct:function(a){this.cname="Guide";AmCharts.applyTheme(this,a,this.cname)}});AmCharts.AmGraph=AmCharts.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";
this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.hideBulletsCount=this.bulletOffset=0;this.labelPosition="top";this.cornerRadiusTop=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=
0;this.periodValue="";this.clustered=!0;this.periodSpan=1;this.y=this.x=0;this.minDistance=1;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this.chart;isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});var b=a.container;this.container=b;this.destroy();var c=b.set(),d=b.set();this.behindColumns?(a.graphsBehindSet.push(c),
a.bulletBehindSet.push(d)):(a.graphsSet.push(c),a.bulletSet.push(d));var e=this.bulletAxis;AmCharts.isString(e)&&(this.bulletAxis=a.getValueAxisById(e));this.bulletSet=d;this.scrollbar||(e=a.marginLeftReal,a=a.marginTopReal,c.translate(e,a),d.translate(e,a));b=b.set();AmCharts.remove(this.columnsSet);c.push(b);this.set=c;this.columnsSet=b;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];AmCharts.ifArray(this.data)&&(c=!1,"xy"==this.chart.type?this.xAxis.axisCreated&&
this.yAxis.axisCreated&&(c=!0):this.valueAxis.axisCreated&&(c=!0),!this.hidden&&c&&this.createGraph())},createGraph:function(){var a=this,b=a.chart;"inside"==a.labelPosition&&"column"!=a.type&&(a.labelPosition="bottom");a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=
a.lineAlpha);clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(b.type){case "serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set));break;case "radar":a.createRadarGraph();break;case "xy":a.createXYGraph(),a.positiveClip(a.set)}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=
[],b=[],c=this.xAxis,d=this.yAxis;this.pmh=d.viH+1;this.pmw=c.viW+1;this.pmy=this.pmx=0;var e;for(e=this.start;e<=this.end;e++){var f=this.data[e].axes[c.id].graphs[this.id],g=f.values,h=g.x,k=g.y,g=c.getCoordinate(h),l=d.getCoordinate(k);!isNaN(h)&&!isNaN(k)&&(a.push(g),b.push(l),(h=this.createBullet(f,g,l,e))||(h=0),k=this.labelText)&&(f=this.createLabel(f,g,l,k),this.allBullets.push(f),this.positionLabel(g,l,f,this.labelPosition,h))}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=
this.valueAxis.stackType,b=[],c=[],d,e,f;for(f=this.start;f<=this.end;f++){var g=this.data[f].axes[this.valueAxis.id].graphs[this.id],h;h="none"==a||"3d"==a?g.values.value:g.values.close;if(isNaN(h))this.drawLineGraph(b,c),b=[],c=[];else{var k=this.y-(this.valueAxis.getCoordinate(h)-this.height),l=180-360/(this.end-this.start+1)*f;h=k*Math.sin(l/180*Math.PI);k*=Math.cos(l/180*Math.PI);b.push(h);c.push(k);(l=this.createBullet(g,h,k,f))||(l=0);var m=this.labelText;m&&(g=this.createLabel(g,h,k,m),this.allBullets.push(g),
this.positionLabel(h,k,g,this.labelPosition,l));isNaN(d)&&(d=h);isNaN(e)&&(e=k)}}b.push(d);c.push(e);this.drawLineGraph(b,c);this.launchAnimation()},positionLabel:function(a,b,c,d,e){var f=c.getBBox();switch(d){case "left":a-=(f.width+e)/2+2;break;case "top":b-=(e+f.height)/2+1;break;case "right":a+=(f.width+e)/2+2;break;case "bottom":b+=(e+f.height)/2+1}c.translate(a,b)},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=
this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,d=this.data,e=this.chart.container,f=this.valueAxis,g=this.type,h=this.columnWidthReal,k=this.showBulletsAt;isNaN(this.columnWidth)||(h=this.columnWidth);isNaN(h)&&(h=0.8);var l=this.width,m=this.height,p=this.y,n=this.rotate,s=this.columnCount,q=AmCharts.toCoordinate(this.cornerRadiusTop,h/2),r=this.connect,u=[],v=[],t,w,y,E,z=this.chart.graphs.length,A,I=this.dx/this.depthCount,G=this.dy/this.depthCount,
B=f.stackType,K=this.labelPosition,M=this.start,ca=this.end,W=this.scrollbar,Na=this.categoryAxis,ga=this.baseCoord,ma=this.negativeBase,U=this.columnIndex,X=this.lineThickness,$=this.lineAlpha,ra=this.lineColorR,P=this.dashLength,Y=this.set,pa=K,H=this.getGradRotation(),F=this.chart.columnSpacing,V=Na.cellWidth,da=(V*h-s)/s;F>da&&(F=da);var ha,x,Wa,eb=m+1,fb=l+1,Xa=0,gb=0,hb,ib,Ya,Za,Ob=this.fillColorsR,Oa=this.negativeFillColors,Da=this.negativeLineColor,Pa=this.fillAlphas,Qa=this.negativeFillAlphas;
"object"==typeof Pa&&(Pa=Pa[0]);"object"==typeof Qa&&(Qa=Qa[0]);var $a=f.getCoordinate(f.min);f.logarithmic&&($a=f.getCoordinate(f.minReal));this.minCoord=$a;this.resetBullet&&(this.bullet="none");if(!W&&("line"==g||"smoothedLine"==g||"step"==g)&&(1==d.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),Oa||void 0!=Da)){var Ha=ma;Ha>f.max&&(Ha=f.max);Ha<f.min&&(Ha=f.min);f.logarithmic&&(Ha=f.minReal);var ya=f.getCoordinate(Ha),yb=f.getCoordinate(f.max);n?(eb=m,fb=Math.abs(yb-
ya),hb=m,ib=Math.abs($a-ya),Za=gb=0,f.reversed?(Xa=0,Ya=ya):(Xa=ya,Ya=0)):(fb=l,eb=Math.abs(yb-ya),ib=l,hb=Math.abs($a-ya),Ya=Xa=0,f.reversed?(Za=p,gb=ya):Za=ya+1)}var za=Math.round;this.pmx=za(Xa);this.pmy=za(gb);this.pmh=za(eb);this.pmw=za(fb);this.nmx=za(Ya);this.nmy=za(Za);this.nmh=za(hb);this.nmw=za(ib);AmCharts.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);h="column"==g?(V*h-F*(s-1))/s:V*h;1>h&&(h=1);var J;if("line"==g||"step"==g||"smoothedLine"==g){if(0<M){for(J=M-1;-1<J;J--)if(ha=d[J],
x=ha.axes[f.id].graphs[b],Wa=x.values.value,!isNaN(Wa)){M=J;break}if(this.lineColorField)for(J=M;-1<J;J--)if(ha=d[J],x=ha.axes[f.id].graphs[b],x.lineColor){this.bulletColorSwitched=this.lineColorSwitched=x.lineColor;break}if(this.fillColorsField)for(J=M;-1<J;J--)if(ha=d[J],x=ha.axes[f.id].graphs[b],x.fillColors){this.fillColorsSwitched=x.fillColors;break}if(this.dashLengthField)for(J=M;-1<J;J--)if(ha=d[J],x=ha.axes[f.id].graphs[b],!isNaN(x.dashLength)){this.dashLengthSwitched=x.dashLength;break}}if(ca<
d.length-1)for(J=ca+1;J<d.length;J++)if(ha=d[J],x=ha.axes[f.id].graphs[b],Wa=x.values.value,!isNaN(Wa)){ca=J;break}}ca<d.length-1&&ca++;var Q=[],R=[],Ea=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==B||"100%"==B||this.fillToGraph)Ea=!0;var zb=this.noStepRisers,ab=-1E3,bb=-1E3,cb=this.minDistance;for(J=M;J<=ca;J++){ha=d[J];x=ha.axes[f.id].graphs[b];x.index=J;var S,T,O,aa,ia=NaN,D=NaN,C=NaN,N=NaN,L=NaN,Ia=NaN,Aa=NaN,Ja=NaN,Ba=NaN,ba=NaN,fa=NaN,ja=NaN,ka=NaN,Z=NaN,jb=NaN,
kb=NaN,na=NaN,qa=void 0,Ca=Ob,Ra=Pa,sa=ra,oa,ta,Sa=this.pattern;void 0!=x.pattern&&(Sa=x.pattern);void 0!=x.color&&(Ca=x.color);x.fillColors&&(Ca=x.fillColors);isNaN(x.alpha)||(Ra=x.alpha);isNaN(x.dashLength)||(P=x.dashLength);var ua=x.values;f.recalculateToPercents&&(ua=x.percents);if(ua){Z=this.stackable&&"none"!=B&&"3d"!=B?ua.close:ua.value;if("candlestick"==g||"ohlc"==g)Z=ua.close,kb=ua.low,Aa=f.getCoordinate(kb),jb=ua.high,Ba=f.getCoordinate(jb);na=ua.open;C=f.getCoordinate(Z);isNaN(na)||(L=
f.getCoordinate(na));if(!W)switch(this.showBalloonAt){case "close":x.y=C;break;case "open":x.y=L;break;case "high":x.y=Ba;break;case "low":x.y=Aa}var ia=ha.x[Na.id],Ka=this.periodSpan-1,la=Math.floor(V/2)+Math.floor(Ka*V/2),va=la,Ab=0;"left"==this.stepDirection&&(Ab=(2*V+Ka*V)/2,ia-=Ab);"start"==this.pointPosition&&(ia-=V/2+Math.floor(Ka*V/2),la=0,va=Math.floor(V)+Math.floor(Ka*V));"end"==this.pointPosition&&(ia+=V/2+Math.floor(Ka*V/2),la=Math.floor(V)+Math.floor(Ka*V),va=0);if(zb){var lb=this.columnWidth;
isNaN(lb)||(la*=lb,va*=lb)}W||(x.x=ia);-1E5>ia&&(ia=-1E5);ia>l+1E5&&(ia=l+1E5);n?(D=C,N=L,L=C=ia,isNaN(na)&&!this.fillToGraph&&(N=ga),Ia=Aa,Ja=Ba):(N=D=ia,isNaN(na)&&!this.fillToGraph&&(L=ga));Z<na&&(x.isNegative=!0,Oa&&(Ca=Oa),Qa&&(Ra=Qa),void 0!=Da&&(sa=Da));switch(g){case "line":if(isNaN(Z))r||(this.drawLineGraph(u,v,Q,R),u=[],v=[],Q=[],R=[]);else{x.isNegative=Z<ma?!0:!1;if(Math.abs(D-ab)>=cb||Math.abs(C-bb)>=cb)u.push(D),v.push(C),ab=D,bb=C;ba=D;fa=C;ja=D;ka=C;!Ea||isNaN(L)||isNaN(N)||(Q.push(N),
R.push(L));void 0==x.lineColor&&void 0==x.fillColors&&isNaN(x.dashLength)||(this.drawLineGraph(u,v,Q,R),u=[D],v=[C],Q=[],R=[],!Ea||isNaN(L)||isNaN(N)||(Q.push(N),R.push(L)),this.lineColorSwitched=x.lineColor,this.fillColorsSwitched=x.fillColors,this.dashLengthSwitched=x.dashLength);x.gap&&(this.drawLineGraph(u,v,Q,R),u=[],v=[],Q=[],R=[])}break;case "smoothedLine":if(isNaN(Z))r||(this.drawSmoothedGraph(u,v,Q,R),u=[],v=[],Q=[],R=[]);else{x.isNegative=Z<ma?!0:!1;if(Math.abs(D-ab)>=cb||Math.abs(C-bb)>=
cb)u.push(D),v.push(C),ab=D,bb=C;ba=D;fa=C;ja=D;ka=C;!Ea||isNaN(L)||isNaN(N)||(Q.push(N),R.push(L));void 0==x.lineColor&&void 0==x.fillColors&&isNaN(x.dashLength)||(this.drawSmoothedGraph(u,v,Q,R),u=[D],v=[C],Q=[],R=[],!Ea||isNaN(L)||isNaN(N)||(Q.push(N),R.push(L)),this.lineColorSwitched=x.lineColor,this.fillColorsSwitched=x.fillColors,this.dashLengthSwitched=x.dashLength);x.gap&&(this.drawSmoothedGraph(u,v,Q,R),u=[],v=[],Q=[],R=[])}break;case "step":if(!isNaN(Z)){if(x.isNegative=Z<ma?!0:!1,void 0==
x.lineColor&&void 0==x.fillColors&&isNaN(x.dashLength)||(this.drawLineGraph(u,v,Q,R),u=[],v=[],Q=[],R=[],this.lineColorSwitched=x.lineColor,this.fillColorsSwitched=x.fillColors,this.dashLengthSwitched=x.dashLength),n?(isNaN(t)||(u.push(t),v.push(C-la)),v.push(C-la),u.push(D),v.push(C+va),u.push(D),!Ea||isNaN(L)||isNaN(N)||(Q.push(y),R.push(L-la),Q.push(N),R.push(L-la),Q.push(N),R.push(L+va))):(isNaN(w)||(v.push(w),u.push(t),v.push(w),u.push(D-la)),u.push(D-la),v.push(C),u.push(D+va),v.push(C),!Ea||
isNaN(L)||isNaN(N)||(Q.push(N-la),R.push(E),Q.push(N-la),R.push(L),Q.push(N+va),R.push(L))),t=D,w=C,y=N,E=L,ba=D,fa=C,ja=D,ka=C,zb||x.gap)t=w=NaN,this.drawLineGraph(u,v,Q,R),u=[],v=[],Q=[],R=[]}else if(!r){if(1>=this.periodSpan||1<this.periodSpan&&D-t>la+va)t=w=NaN;this.drawLineGraph(u,v,Q,R);u=[];v=[];Q=[];R=[]}break;case "column":oa=sa;void 0!=x.lineColor&&(oa=x.lineColor);if(!isNaN(Z)){Z<ma?(x.isNegative=!0,Oa&&(Ca=Oa),void 0!=Da&&(oa=Da)):x.isNegative=!1;var Bb=f.min,Cb=f.max;if(!(Z<Bb&&na<Bb||
Z>Cb&&na>Cb))if(n){"3d"==B?(T=C-0.5*(h+F)+F/2+G*U,S=N+I*U):(T=Math.floor(C-(s/2-U)*(h+F)+F/2),S=N);O=h;ba=D;fa=T+h/2;ja=D;ka=T+h/2;T+O>m&&(O=m-T);0>T&&(O+=T,T=0);aa=D-N;var Pb=S;S=AmCharts.fitToBounds(S,0,l);aa+=Pb-S;aa=AmCharts.fitToBounds(aa,-S,l-S+I*U);if(T<m&&0<O&&(qa=new AmCharts.Cuboid(e,aa,O,I-a.d3x,G-a.d3y,Ca,Ra,X,oa,$,H,q,n,P,Sa),"bottom"!=K&&"inside"!=K&&"middle"!=K))if(K=f.reversed?"left":"right",0>Z)K=f.reversed?"right":"left";else if("regular"==B||"100%"==B)ba+=this.dx}else{"3d"==B?(S=
D-0.5*(h+F)+F/2+I*U,T=L+G*U):(S=D-(s/2-U)*(h+F)+F/2,T=L);O=h;ba=S+h/2;fa=C;ja=S+h/2;ka=C;S+O>l+U*I&&(O=l-S+U*I);0>S&&(O+=S,S=0);aa=C-L;var Qb=T;T=AmCharts.fitToBounds(T,this.dy,m);aa+=Qb-T;aa=AmCharts.fitToBounds(aa,-T+G*U,m-T);if(S<l+U*I&&0<O)if(qa=new AmCharts.Cuboid(e,O,aa,I-a.d3x,G-a.d3y,Ca,Ra,X,oa,this.lineAlpha,H,q,n,P,Sa),0>Z&&"middle"!=K&&"inside"!=K)K="bottom";else if(K=pa,"regular"==B||"100%"==B)fa+=this.dy}if(qa&&(ta=qa.set,ta.translate(S,T),this.columnsSet.push(ta),(x.url||this.showHandOnHover)&&
ta.setAttr("cursor","pointer"),!W)){"none"==B&&(A=n?(this.end+1-J)*z-c:z*J+c);"3d"==B&&(n?(A=(z-c)*(this.end+1-J),ba+=I*this.columnIndex,ja+=I*this.columnIndex,x.y+=I*this.columnIndex):(A=(z-c)*(J+1),ba+=3,fa+=G*this.columnIndex+7,ka+=G*this.columnIndex,x.y+=G*this.columnIndex));if("regular"==B||"100%"==B)"inside"!=K&&(K="middle"),A=n?0<ua.value?(this.end+1-J)*z+c:(this.end+1-J)*z-c:0<ua.value?z*J+c:z*J-c;this.columnsArray.push({column:qa,depth:A});x.x=n?T+O/2:S+O/2;this.ownColumns.push(qa);this.animateColumns(qa,
J,D,N,C,L);this.addListeners(ta,x)}}break;case "candlestick":if(!isNaN(na)&&!isNaN(Z)){var db,mb;oa=sa;void 0!=x.lineColor&&(oa=x.lineColor);if(n){if(T=C-h/2,S=N,O=h,T+O>m&&(O=m-T),0>T&&(O+=T,T=0),T<m&&0<O){var nb,ob;Z>na?(nb=[D,Ja],ob=[N,Ia]):(nb=[N,Ja],ob=[D,Ia]);!isNaN(Ja)&&!isNaN(Ia)&&C<m&&0<C&&(db=AmCharts.line(e,nb,[C,C],oa,$,X),mb=AmCharts.line(e,ob,[C,C],oa,$,X));aa=D-N;qa=new AmCharts.Cuboid(e,aa,O,I,G,Ca,Pa,X,oa,$,H,q,n,P,Sa)}}else if(S=D-h/2,T=L+X/2,O=h,S+O>l&&(O=l-S),0>S&&(O+=S,S=0),aa=
C-L,S<l&&0<O){var qa=new AmCharts.Cuboid(e,O,aa,I,G,Ca,Ra,X,oa,$,H,q,n,P,Sa),pb,qb;Z>na?(pb=[C,Ba],qb=[L,Aa]):(pb=[L,Ba],qb=[C,Aa]);!isNaN(Ba)&&!isNaN(Aa)&&D<l&&0<D&&(db=AmCharts.line(e,[D,D],pb,oa,$,X),mb=AmCharts.line(e,[D,D],qb,oa,$,X))}qa&&(ta=qa.set,Y.push(ta),ta.translate(S,T-X/2),(x.url||this.showHandOnHover)&&ta.setAttr("cursor","pointer"),db&&(Y.push(db),Y.push(mb)),ba=D,fa=C,n?(ka=C,ja=D,"open"==k&&(ja=N),"high"==k&&(ja=Ja),"low"==k&&(ja=Ia)):(ka=C,"open"==k&&(ka=L),"high"==k&&(ka=Ba),"low"==
k&&(ka=Aa),ja=D),W||(x.x=n?T+O/2:S+O/2,this.animateColumns(qa,J,D,N,C,L),this.addListeners(ta,x)))}break;case "ohlc":if(!(isNaN(na)||isNaN(jb)||isNaN(kb)||isNaN(Z))){Z<na&&(x.isNegative=!0,void 0!=Da&&(sa=Da));var rb,sb,tb;if(n){var ub=C-h/2,ub=AmCharts.fitToBounds(ub,0,m),Db=AmCharts.fitToBounds(C,0,m),vb=C+h/2,vb=AmCharts.fitToBounds(vb,0,m);sb=AmCharts.line(e,[N,N],[ub,Db],sa,$,X,P);0<C&&C<m&&(rb=AmCharts.line(e,[Ia,Ja],[C,C],sa,$,X,P));tb=AmCharts.line(e,[D,D],[Db,vb],sa,$,X,P)}else{var wb=D-
h/2,wb=AmCharts.fitToBounds(wb,0,l),Eb=AmCharts.fitToBounds(D,0,l),xb=D+h/2,xb=AmCharts.fitToBounds(xb,0,l);sb=AmCharts.line(e,[wb,Eb],[L,L],sa,$,X,P);0<D&&D<l&&(rb=AmCharts.line(e,[D,D],[Aa,Ba],sa,$,X,P));tb=AmCharts.line(e,[Eb,xb],[C,C],sa,$,X,P)}Y.push(sb);Y.push(rb);Y.push(tb);ba=D;fa=C;ja=D;ka=C}}if(!W&&!isNaN(Z)){var Fb=this.hideBulletsCount;if(this.end-this.start<=Fb||0===Fb){var Fa=this.createBullet(x,ja,ka,J);Fa||(Fa=0);var Gb=this.labelText;if(Gb){var ea=this.createLabel(x,0,0,Gb),wa=0,
xa=0,Hb=ea.getBBox(),La=Hb.width,Ga=Hb.height;switch(K){case "left":wa=-(La/2+Fa/2+3);break;case "top":xa=-(Ga/2+Fa/2+3);break;case "right":wa=Fa/2+2+La/2;break;case "bottom":n&&"column"==g?(ba=ga,0>Z||0<Z&&f.reversed?(wa=-6,ea.attr({"text-anchor":"end"})):(wa=6,ea.attr({"text-anchor":"start"}))):(xa=Fa/2+Ga/2,ea.x=-(La/2+2));break;case "middle":"column"==g&&(n?(xa=-(Ga/2)+this.fontSize/2,wa=-(D-N)/2-I,0>aa&&(wa+=I),Math.abs(D-N)<La&&!this.showAllValueLabels&&(ea.remove(),ea=null)):(xa=-(C-L)/2,0>
aa&&(xa-=G),Math.abs(C-L)<Ga&&!this.showAllValueLabels&&(ea.remove(),ea=null)));break;case "inside":n?(xa=-(Ga/2)+this.fontSize/2,wa=0>aa?La/2+6:-La/2-6):xa=0>aa?Ga:-Ga}if(ea){if(isNaN(fa)||isNaN(ba))ea.remove(),ea=null;else if(ba+=wa,fa+=xa,ea.translate(ba,fa),n){if(0>fa||fa>m)ea.remove(),ea=null}else{var Ib=0;"3d"==B&&(Ib=I*U);if(0>ba||ba>l+Ib)ea.remove(),ea=null}ea&&this.allBullets.push(ea)}}if("regular"==B||"100%"==B){var Jb=f.totalText;if(Jb){var Ma=this.createLabel(x,0,0,Jb,f.totalTextColor);
this.allBullets.push(Ma);var Kb=Ma.getBBox(),Lb=Kb.width,Mb=Kb.height,Ta,Ua,Nb=f.totals[J];Nb&&Nb.remove();var Va=0;"column"!=g&&(Va=Fa);n?(Ua=C,Ta=0>Z?D-Lb/2-2-Va:D+Lb/2+3+Va):(Ta=D,Ua=0>Z?C+Mb/2+Va:C-Mb/2-3-Va);Ma.translate(Ta,Ua);f.totals[J]=Ma;n?(0>Ua||Ua>m)&&Ma.remove():(0>Ta||Ta>l)&&Ma.remove()}}}}}}if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(u,v,Q,R):this.drawLineGraph(u,v,Q,R),W||this.launchAnimation();this.bulletsHidden&&this.hideBullets()},animateColumns:function(a,
b,c,d,e,f){var g=this;c=g.chart.startDuration;0<c&&!g.animationPlayed&&(g.seqAn?(a.set.hide(),g.animationArray.push(a),a=setTimeout(function(){g.animate.call(g)},c/(g.end-g.start+1)*(b-g.start)*1E3),g.timeOuts.push(a)):g.animate(a))},createLabel:function(a,b,c,d,e){var f=this.chart,g=a.labelColor;g||(g=this.color);g||(g=f.color);e&&(g=e);e=this.fontSize;void 0===e&&(this.fontSize=e=f.fontSize);a=f.formatString(d,a);a=AmCharts.cleanFromEmpty(a);f=AmCharts.text(this.container,a,g,f.fontFamily,e);f.translate(b,
c);this.bulletSet.push(f);return f},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,d){var e=this;if(1<a.length){var f=e.set,g=e.container,h=g.set(),k=g.set();f.push(k);f.push(h);var l=e.lineAlpha,m=e.lineThickness,f=e.fillAlphas,p=e.lineColorR,n=e.negativeLineAlpha;isNaN(n)&&(n=l);var s=e.lineColorSwitched;s&&(p=s);var s=e.fillColorsR,q=e.fillColorsSwitched;q&&(s=q);var r=
e.dashLength;(q=e.dashLengthSwitched)&&(r=q);var q=e.negativeLineColor,u=e.negativeFillColors,v=e.negativeFillAlphas,t=e.baseCoord;0!==e.negativeBase&&(t=e.valueAxis.getCoordinate(e.negativeBase));l=AmCharts.line(g,a,b,p,l,m,r,!1,!0);h.push(l);h.click(function(a){e.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){e.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){e.handleGraphEvent(a,"rollOutGraph")});void 0!==q&&(m=AmCharts.line(g,a,b,q,n,m,r,!1,!0),k.push(m));if(0<f||0<v)if(m=
a.join(";").split(";"),n=b.join(";").split(";"),"serial"==e.chart.type&&(0<c.length?(c.reverse(),d.reverse(),m=a.concat(c),n=b.concat(d)):e.rotate?(n.push(n[n.length-1]),m.push(t),n.push(n[0]),m.push(t),n.push(n[0]),m.push(m[0])):(m.push(m[m.length-1]),n.push(t),m.push(m[0]),n.push(t),m.push(a[0]),n.push(n[0]))),a=e.gradientRotation,0<f&&(b=AmCharts.polygon(g,m,n,s,f,1,"#000",0,a),b.pattern(e.pattern),h.push(b)),u||void 0!==q)isNaN(v)&&(v=f),u||(u=q),g=AmCharts.polygon(g,m,n,u,v,1,"#000",0,a),g.pattern(e.pattern),
k.push(g),k.click(function(a){e.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){e.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){e.handleGraphEvent(a,"rollOutGraph")});e.applyMask(k,h)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,d){if(1<a.length){var e=this.set,f=this.container,g=f.set(),h=f.set();e.push(h);e.push(g);var k=this.lineAlpha,l=this.lineThickness,
e=this.dashLength,m=this.fillAlphas,p=this.lineColorR,n=this.fillColorsR,s=this.negativeLineColor,q=this.negativeFillColors,r=this.negativeFillAlphas,u=this.baseCoord,v=this.lineColorSwitched;v&&(p=v);(v=this.fillColorsSwitched)&&(n=v);v=this.negativeLineAlpha;isNaN(v)&&(v=k);k=new AmCharts.Bezier(f,a,b,p,k,l,n,0,e);g.push(k.path);void 0!==s&&(l=new AmCharts.Bezier(f,a,b,s,v,l,n,0,e),h.push(l.path));0<m&&(k=a.join(";").split(";"),p=b.join(";").split(";"),l="",0<c.length?(c.push("M"),d.push("M"),c.reverse(),
d.reverse(),k=a.concat(c),p=b.concat(d)):(this.rotate?(l+=" L"+u+","+b[b.length-1],l+=" L"+u+","+b[0]):(l+=" L"+a[a.length-1]+","+u,l+=" L"+a[0]+","+u),l+=" L"+a[0]+","+b[0]),c=new AmCharts.Bezier(f,k,p,NaN,0,0,n,m,e,l),c.path.pattern(this.pattern),g.push(c.path),q||void 0!==s)&&(r||(r=m),q||(q=s),a=new AmCharts.Bezier(f,a,b,NaN,0,0,q,r,e,l),a.path.pattern(this.pattern),h.push(a.path));this.applyMask(h,g)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=
a.set,d=a.bulletSet;AmCharts.VML||(c.attr({opacity:a.startAlpha}),d.attr({opacity:a.startAlpha}));c.hide();d.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,d=this.x,e=this.y;b.show();c.show();var f=a.startDuration,a=a.startEffect;b&&(this.rotate?(b.translate(-1E3,e),c.translate(-1E3,e)):(b.translate(d,-1E3),c.translate(d,-1E3)),b.animate({opacity:1,translate:d+
","+e},f,a),c.animate({opacity:1,translate:d+","+e},f,a))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=AmCharts[AmCharts.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;
void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c,d){d=this.container;var e=this.bulletOffset,f=this.bulletSize;isNaN(a.bulletSize)||(f=a.bulletSize);var g=a.values.value,h=this.maxValue,k=this.minValue,l=this.maxBulletSize,m=this.minBulletSize;isNaN(h)||(isNaN(g)||(f=(g-k)/(h-k)*(l-m)+m),k==h&&(f=l));h=f;this.bulletAxis&&(f=a.values.error,isNaN(f)||(g=f),f=this.bulletAxis.stepWidth*g);f<this.minBulletSize&&
(f=this.minBulletSize);this.rotate?b=a.isNegative?b-e:b+e:c=a.isNegative?c+e:c-e;var p,m=this.bulletColorR;a.lineColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(m=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(m=this.bulletColorNegative);void 0!==a.color&&(m=a.color);var n;"xy"==this.chart.type&&this.valueField&&(n=this.pattern,a.pattern&&(n=a.pattern));e=this.bullet;a.bullet&&(e=a.bullet);var g=this.bulletBorderThickness,k=this.bulletBorderColorR,
l=this.bulletBorderAlpha,s=this.bulletAlpha;k||(k=m);this.useLineColorForBulletBorder&&(k=this.lineColorR);var q=a.alpha;isNaN(q)||(s=q);if("none"!=this.bullet||a.bullet)p=AmCharts.bullet(d,e,f,m,s,g,k,l,h,0,n);if(this.customBullet||a.customBullet)n=this.customBullet,a.customBullet&&(n=a.customBullet),n&&(p&&p.remove(),"function"==typeof n?(p=new n,p.chart=this.chart,a.bulletConfig&&(p.availableSpace=c,p.graph=this,a.bulletConfig.minCoord=this.minCoord-c,p.bulletConfig=a.bulletConfig),p.write(d),
p=p.set):(this.chart.path&&(n=this.chart.path+n),p=d.set(),d=d.image(n,0,0,f,f),p.push(d),this.centerCustomBullets&&d.translate(-f/2,-f/2)));p&&((a.url||this.showHandOnHover)&&p.setAttr("cursor","pointer"),"serial"==this.chart.type&&(0>b-0||b-0>this.width||c<-f/2||c-0>this.height)&&(p.remove(),p=null),p&&(this.bulletSet.push(p),p.translate(b,c),this.addListeners(p,a),this.allBullets.push(p)),a.bx=b,a.by=c);a.bulletGraphics=p;return f},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=
!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,
a)})},handleRollOver:function(a,b){if(a){var c=this.chart,d={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOverGraphItem",d);c.fire("rollOverGraphItem",d);clearTimeout(c.hoverInt);d=this.showBalloon;c.chartCursor&&"serial"==c.type&&(d=!1,!c.chartCursor.valueBalloonsEnabled&&this.showBalloon&&(d=!0));if(d){var d=c.formatString(this.balloonText,a,!0),e=this.balloonFunction;e&&(d=e(a,a.graph));d=AmCharts.cleanFromEmpty(d);e=c.getBalloonColor(this,
a);c.balloon.showBullet=!1;c.balloon.pointerOrientation="V";var f=a.x,g=a.y;c.rotate&&(f=a.y,g=a.x);c.showBalloon(d,e,!0,f+c.marginLeftReal,g+c.marginTopReal)}}this.handleGraphEvent(b,"rollOverGraph")},handleRollOut:function(a,b){this.chart.hideBalloon();if(a){var c={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOutGraphItem",c);this.chart.fire("rollOutGraphItem",c)}this.handleGraphEvent(b,"rollOutGraph")},handleClick:function(a,b){if(a){var c=
{type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("clickGraphItem",c);this.chart.fire("clickGraphItem",c);AmCharts.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")},handleGraphEvent:function(a,b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(b,c);this.chart.fire(b,c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};
this.fire("rightClickGraphItem",c);this.chart.fire("rightClickGraphItem",c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("doubleClickGraphItem",c);this.chart.fire("doubleClickGraphItem",c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var d=b[c].set;d&&d.setAttr("opacity",
a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]}});AmCharts.ChartCursor=AmCharts.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","draw","selected","moved");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=0.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition=
"middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=0.3;this.zooming=!1;this.adjustment=0;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container;a.rotate=b.rotate;a.container=c;c=c.set();c.translate(a.x,a.y);a.set=c;b.cursorSet.push(c);c=new AmCharts.AmBalloon;c.chart=b;a.categoryBalloon=c;AmCharts.copyProperties(b.balloon,c);c.cornerRadius=
0;c.shadowAlpha=0;c.borderThickness=1;c.borderAlpha=1;c.showBullet=!1;var d=a.categoryBalloonColor;void 0===d&&(d=a.cursorColor);c.fillColor=d;c.fillAlpha=a.categoryBalloonAlpha;c.borderColor=d;c.color=a.color;a.rotate&&(c.pointerOrientation="H");a.extraWidth=0;a.prevX=[];a.prevY=[];a.prevTX=[];a.prevTY=[];if(a.valueBalloonsEnabled)for(c=0;c<b.graphs.length;c++)d=new AmCharts.AmBalloon,d.chart=b,AmCharts.copyProperties(b.balloon,d),b.graphs[c].valueBalloon=d;"cursor"==a.type?a.createCursor():a.createCrosshair();
a.interval=setInterval(function(){a.detectMovement.call(a)},40)},updateData:function(){var a=this.chart;this.data=a.chartData;this.firstTime=a.firstTime;this.lastTime=a.lastTime},createCursor:function(){var a=this.chart,b=this.cursorAlpha,c=a.categoryAxis,d=c.position,e=c.inside,f=c.axisThickness,g=this.categoryBalloon,h,k,l=a.dx,m=a.dy,p=this.x,n=this.y,s=this.width,q=this.height,a=a.rotate,r=c.tickLength;g.pointerWidth=r;a?(h=[0,s,s+l],k=[0,0,m]):(h=[l,0,0],k=[m,0,q]);this.line=b=AmCharts.line(this.container,
h,k,this.cursorColor,b,1);(h=this.fullRectSet)?(h.push(b),h.translate(this.x,this.y)):this.set.push(b);a?(e&&(g.pointerWidth=0),"right"==d?e?g.setBounds(p,n+m,p+s+l,n+q+m):g.setBounds(p+s+l+f,n+m,p+s+1E3,n+q+m):e?g.setBounds(p,n,s+p,q+n):g.setBounds(-1E3,-1E3,p-r-f,n+q+15)):(g.maxWidth=s,c.parseDates&&(r=0,g.pointerWidth=0),"top"==d?e?g.setBounds(p+l,n+m,s+l+p,q+n):g.setBounds(p+l,-1E3,s+l+p,n+m-r-f):e?g.setBounds(p,n,s+p,q+n-r):g.setBounds(p,n+q+r+f-1,p+s,n+q+r+f));this.hideCursor()},createCrosshair:function(){var a=
this.cursorAlpha,b=this.container,c=AmCharts.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=AmCharts.line(b,[0,this.width],[0,0],this.cursorColor,a,1);this.set.push(c);this.set.push(a);this.vLine=c;this.hLine=a;this.hideCursor()},detectMovement:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,c=a.mouseY-this.y;0<b&&b<this.width&&0<c&&c<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||a.setMouseCursor("move")),this.rolledOver=
!0,this.setPosition()):this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},getMousePosition:function(){var a,b=this.width,c=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>c&&(a=c)):(a=a.mouseX-this.x,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,b=a.mouseX-this.x,c=a.mouseY-this.y,d=this.vLine,e=this.hLine,b=AmCharts.fitToBounds(b,0,this.width),c=AmCharts.fitToBounds(c,0,
this.height);0<this.cursorAlpha&&(d.show(),e.show(),d.translate(b,0),e.translate(0,c));this.zooming&&(a.hideXScrollbar&&(b=NaN),a.hideYScrollbar&&(c=NaN),this.updateSelectionSize(b,c));this.fireMoved();a.mouseIsOver||this.zooming||this.hideCursor()},fireMoved:function(){var a=this.chart,b={type:"moved",target:this};b.chart=a;b.zooming=this.zooming;b.x=a.mouseX-this.x;b.y=a.mouseY-this.y;this.fire("moved",b)},updateSelectionSize:function(a,b){AmCharts.remove(this.selection);var c=this.selectionPosX,
d=this.selectionPosY,e=0,f=0,g=this.width,h=this.height;isNaN(a)||(c>a&&(e=a,g=c-a),c<a&&(e=c,g=a-c),c==a&&(e=a,g=0),g+=this.extraWidth,e-=this.extraWidth/2);isNaN(b)||(d>b&&(f=b,h=d-b),d<b&&(f=d,h=b-d),d==b&&(f=b,h=0),h+=this.extraWidth,f-=this.extraWidth/2);0<g&&0<h&&(c=AmCharts.rect(this.container,g,h,this.cursorColor,this.selectionAlpha),c.translate(e+this.x,f+this.y),this.selection=c)},arrangeBalloons:function(){var a=this.valueBalloons,b=this.x,c=this.y,d=this.height+c;a.sort(this.compareY);
var e;for(e=0;e<a.length;e++){var f=a[e].balloon;f.setBounds(b,c,b+this.width,d);f.prevX=this.prevX[e];f.prevY=this.prevY[e];f.prevTX=this.prevTX[e];f.prevTY=this.prevTY[e];f.draw();d=f.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();var b,c=this.x,d,e,f=a.length;for(e=0;e<f;e++){var g=a[e].balloon;b=g.bottom;var h=g.bottom-g.yPos,k=f-e-1;0<e&&b-h<d+3&&(g.setBounds(c,d+3,c+this.width,d+h+3),g.prevX=this.prevX[k],
g.prevY=this.prevY[k],g.prevTX=this.prevTX[k],g.prevTY=this.prevTY[k],g.draw());g.set&&g.set.show();this.prevX[k]=g.prevX;this.prevY[k]=g.prevY;this.prevTX[k]=g.prevTX;this.prevTY[k]=g.prevTY;d=g.bottom}},showBullets:function(){AmCharts.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;var b=this.chart.graphs,c;for(c=0;c<b.length;c++){var d=b[c];if(!d.hidden&&d.balloonText){var e=this.data[this.index].axes[d.valueAxis.id].graphs[d.id],f=e.y;
if(!isNaN(f)){var g,h;g=e.x;this.rotate?(h=f,f=g):h=g;d=AmCharts.circle(a,this.bulletSize/2,this.chart.getBalloonColor(d,e,!0),d.cursorBulletAlpha);d.translate(h,f);this.allBullets.push(d)}}}},destroy:function(){this.clear();AmCharts.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();this.destroyValueBalloons();AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},destroyValueBalloons:function(){var a=this.valueBalloons;if(a){var b;for(b=0;b<a.length;b++)a[b].balloon.hide()}},
zoom:function(a,b,c,d){var e=this.chart;this.destroyValueBalloons();this.zooming=!1;var f;this.rotate?this.selectionPosY=f=e.mouseY:this.selectionPosX=f=e.mouseX;this.start=a;this.end=b;this.startTime=c;this.endTime=d;this.zoomed=!0;d=e.categoryAxis;e=this.rotate;b=this.width;c=this.height;a=d.stepWidth;this.fullWidth&&(f=1,d.parseDates&&!d.equalSpacing&&(f=d.minDuration()),e?this.extraWidth=c=a*f:(this.extraWidth=b=a*f,this.categoryBalloon.minWidth=b),this.line&&this.line.remove(),this.line=AmCharts.rect(this.container,
b,c,this.cursorColor,this.cursorAlpha,0),this.fullRectSet&&this.fullRectSet.push(this.line));this.stepWidth=a;this.tempVal=this.valueBalloonsEnabled;this.valueBalloonsEnabled=!1;this.setPosition();this.valueBalloonsEnabled=this.tempVal;this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0===a&&(a=!0);this.hideObj(this.set);this.hideObj(this.categoryBalloon);this.hideObj(this.line);this.hideObj(this.vLine);this.hideObj(this.hLine);this.hideObj(this.allBullets);this.destroyValueBalloons();
this.selectWithoutZooming||AmCharts.remove(this.selection);this.previousIndex=NaN;a&&this.fire("onHideCursor",{type:"onHideCursor",chart:this.chart,target:this});this.drawing||this.chart.setMouseCursor("auto");this.normalizeBulletSize()},setPosition:function(a,b){void 0===b&&(b=!0);if("cursor"==this.type){if(AmCharts.ifArray(this.data)){isNaN(a)&&(a=this.getMousePosition());if((a!=this.previousMousePosition||!0===this.zoomed||this.oneBalloonOnly)&&!isNaN(a)){var c=this.chart.categoryAxis.xToIndex(a);
if(c!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)this.updateCursor(c,b),this.zoomed=!1}this.previousMousePosition=a}}else this.updateCrosshair()},normalizeBulletSize:function(){var a=this.resizedBullets;if(a)for(var b=0;b<a.length;b++){var c=a[b],d=c.bulletGraphics;d&&d.translate(c.bx,c.by,1)}},updateCursor:function(a,b){var c=this.chart,d=this.fullWidth,e=c.mouseX-this.x,f=c.mouseY-this.y;this.drawingNow&&(AmCharts.remove(this.drawingLine),this.drawingLine=
AmCharts.line(this.container,[this.x+this.drawStartX,this.x+e],[this.y+this.drawStartY,this.y+f],this.cursorColor,1,1));if(this.enabled){void 0===b&&(b=!0);this.index=a+=this.adjustment;var g=c.categoryAxis,h=c.dx,k=c.dy,l=this.x+1,m=this.y+1,p=this.width,n=this.height,s=this.data[a];this.fireMoved();if(s){var q=s.x[g.id],r=c.rotate,u=g.inside,v=this.stepWidth,t=this.categoryBalloon,w=this.firstTime,y=this.lastTime,E=this.cursorPosition,z=g.position,A=this.zooming,I=this.panning,G=c.graphs,B=g.axisThickness;
if(c.mouseIsOver||A||I||this.forceShow)if(this.forceShow=!1,I){var h=this.panClickPos,c=this.panClickEndTime,A=this.panClickStartTime,K=this.panClickEnd,l=this.panClickStart,e=(r?h-f:h-e)/v;if(!g.parseDates||g.equalSpacing)e=Math.round(e);0!==e&&(h={type:"zoomed",target:this},h.chart=this.chart,g.parseDates&&!g.equalSpacing?(c+e>y&&(e=y-c),A+e<w&&(e=w-A),h.start=Math.round(A+e),h.end=Math.round(c+e),this.fire(h.type,h)):K+e>=this.data.length||0>l+e||(h.start=l+e,h.end=K+e,this.fire(h.type,h)))}else{"start"==
E?q-=g.cellWidth/2:"mouse"==E&&c.mouseIsOver&&(q=r?f-2:e-2);if(r){if(0>q)if(A)q=0;else{this.hideCursor();return}if(q>n+1)if(A)q=n+1;else{this.hideCursor();return}}else{if(0>q)if(A)q=0;else{this.hideCursor();return}if(q>p)if(A)q=p;else{this.hideCursor();return}}if(0<this.cursorAlpha){var M=this.line;r?(w=0,y=q+k,d&&(y-=g.cellWidth/2)):(w=q,y=0,d&&(w-=g.cellWidth/2));v=this.animationDuration;0<v&&!this.zooming?isNaN(this.previousX)?M.translate(w,y):(M.translate(this.previousX,this.previousY),M.animate({translate:w+
","+y},v,"easeOutSine")):M.translate(w,y);this.previousX=w;this.previousY=y;M.show()}this.linePos=r?q+k:q;A&&(d&&M.hide(),r?this.updateSelectionSize(NaN,q):this.updateSelectionSize(q,NaN));v=!0;A&&(v=!1);this.categoryBalloonEnabled&&v?(r?(u&&("right"==z?t.setBounds(l,m+k,l+p+h,m+q+k):t.setBounds(l,m+k,l+p+h,m+q)),"right"==z?u?t.setPosition(l+p+h,m+q+k):t.setPosition(l+p+h+B,m+q+k):u?t.setPosition(l,m+q):t.setPosition(l-B,m+q)):"top"==z?u?t.setPosition(l+q+h,m+k):t.setPosition(l+q+h,m+k-B+1):u?t.setPosition(l+
q,m+n):t.setPosition(l+q,m+n+B-1),(w=this.categoryBalloonFunction)?t.showBalloon(w(s.category)):g.parseDates?(g=AmCharts.formatDate(s.category,this.categoryBalloonDateFormat),-1!=g.indexOf("fff")&&(g=AmCharts.formatMilliseconds(g,s.category)),t.showBalloon(g)):t.showBalloon(AmCharts.fixNewLines(s.category))):t.hide();G&&this.bulletsEnabled&&this.showBullets();if(this.oneBalloonOnly){k=Infinity;for(t=0;t<G.length;t++)g=G[t],g.showBalloon&&!g.hidden&&g.balloonText&&(w=s.axes[g.valueAxis.id].graphs[g.id],
y=w.y,isNaN(y)||(r?Math.abs(e-y)<k&&(k=Math.abs(e-y),K=g):Math.abs(f-y)<k&&(k=Math.abs(f-y),K=g)));this.mostCloseGraph&&(K=this.mostCloseGraph)}if(a!=this.previousIndex||K!=this.previousMostCloseGraph)if(this.normalizeBulletSize(),this.destroyValueBalloons(),this.resizedBullets=[],G&&this.valueBalloonsEnabled&&v&&c.balloon.enabled){this.valueBalloons=v=[];for(t=0;t<G.length;t++)if(g=G[t],(!this.oneBalloonOnly||g==K)&&g.showBalloon&&!g.hidden&&g.balloonText&&("step"==g.type&&"left"==g.stepDirection&&
(s=this.data[a+1]),s)){w=s.axes[g.valueAxis.id].graphs[g.id];y=w.y;if(this.showNextAvailable&&isNaN(y)&&a+1<this.data.length)for(k=a+1;k<this.data.length;k++)if(q=this.data[k])if(w=q.axes[g.valueAxis.id].graphs[g.id],y=w.y,!isNaN(y))break;if(!isNaN(y)){q=w.x;u=!0;if(r){if(k=y,0>q||q>n)u=!1}else if(k=q,q=y,0>k||k>p+h+1)u=!1;u&&(1!=this.graphBulletSize&&AmCharts.isModern&&(u=w.bulletGraphics)&&(u.getBBox(),u.translate(w.bx,w.by,this.graphBulletSize),this.resizedBullets.push(w)),u=g.valueBalloon,z=c.getBalloonColor(g,
w),u.setBounds(l,m,l+p,m+n),u.pointerOrientation="H",u.changeColor(z),void 0!==g.balloonAlpha&&(u.fillAlpha=g.balloonAlpha),void 0!==g.balloonTextColor&&(u.color=g.balloonTextColor),u.setPosition(k+l,q+m),k=c.formatString(g.balloonText,w,!0),(q=g.balloonFunction)&&(k=q(w,g).toString()),""!==k&&(r?u.showBalloon(k):(u.text=k,u.show=!0)),!r&&u.set&&u.set.hide(),v.push({yy:y,balloon:u}))}}r||this.arrangeBalloons()}b?(h={type:"changed"},h.index=a,h.chart=this.chart,h.zooming=A,h.mostCloseGraph=K,h.position=
r?f:e,h.target=this,c.fire("changed",h),this.fire("changed",h),this.skipZoomDispatch=!1):(this.skipZoomDispatch=!0,c.updateLegendValues(a));this.previousIndex=a;this.previousMostCloseGraph=K}}}else this.hideCursor()},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&a!=this.zooming&&this.handleMouseDown("fake");a||a==this.zooming||this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();
else{this.index=void 0;var a={type:"changed",index:void 0,target:this};a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=this.data,c;if(a){var d=a.mouseX-this.x,e=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;AmCharts.remove(this.drawingLine);c=this.drawStartX;var f=this.drawStartY;if(2<Math.abs(c-d)||2<Math.abs(f-e))c={type:"draw",target:this,chart:a,initialX:c,initialY:f,finalX:d,
finalY:e},this.fire(c.type,c)}if(this.enabled&&0<b.length){if(this.pan)this.rolledOver=!1;else if(this.zoomable&&this.zooming){c=this.selectWithoutZooming?{type:"selected"}:{type:"zoomed"};c.target=this;c.chart=a;if("cursor"==this.type)this.rotate?this.selectionPosY=e:this.selectionPosX=e=d,2>Math.abs(e-this.initialMouse)&&this.fromIndex==this.index||(this.index<this.fromIndex?(c.end=this.fromIndex,c.start=this.index):(c.end=this.index,c.start=this.fromIndex),e=a.categoryAxis,e.parseDates&&!e.equalSpacing&&
(c.start=b[c.start].time,c.end=a.getEndTime(b[c.end].time)),this.skipZoomDispatch||this.fire(c.type,c));else{var g=this.initialMouseX,h=this.initialMouseY;3>Math.abs(d-g)&&3>Math.abs(e-h)||(b=Math.min(g,d),f=Math.min(h,e),d=Math.abs(g-d),e=Math.abs(h-e),a.hideXScrollbar&&(b=0,d=this.width),a.hideYScrollbar&&(f=0,e=this.height),c.selectionHeight=e,c.selectionWidth=d,c.selectionY=f,c.selectionX=b,this.skipZoomDispatch||this.fire(c.type,c))}this.selectWithoutZooming||AmCharts.remove(this.selection)}this.panning=
this.zooming=this.skipZoomDispatch=!1}}},showCursorAt:function(a){var b=this.chart.categoryAxis;a=b.parseDates?b.dateToCoordinate(a):b.categoryToCoordinate(a);this.previousMousePosition=NaN;this.forceShow=!0;this.setPosition(a,!1)},handleMouseDown:function(a){if(this.zoomable||this.pan||this.drawing){var b=this.rotate,c=this.chart,d=c.mouseX-this.x,e=c.mouseY-this.y;if(0<d&&d<this.width&&0<e&&e<this.height||"fake"==a)this.setPosition(),this.selectWithoutZooming&&AmCharts.remove(this.selection),this.drawing?
(this.drawStartY=e,this.drawStartX=d,this.drawingNow=!0):this.pan?(this.zoomable=!1,c.setMouseCursor("move"),this.panning=!0,this.panClickPos=b?e:d,this.panClickStart=this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=e,this.selectionPosY=this.linePos):(this.initialMouse=d,this.selectionPosX=this.linePos)):(this.initialMouseX=d,this.initialMouseY=e,this.selectionPosX=
d,this.selectionPosY=e),this.zooming=!0)}}});AmCharts.SimpleChartScrollbar=AmCharts.Class({construct:function(a){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconWidth=18;this.dragIconHeight=25;AmCharts.applyTheme(this,a,"SimpleChartScrollbar")},draw:function(){var a=
this;a.destroy();a.interval=setInterval(function(){a.updateScrollbar.call(a)},40);var b=a.chart.container,c=a.rotate,d=a.chart,e=b.set();a.set=e;d.scrollbarsSet.push(e);var f,g;c?(f=a.scrollbarHeight,g=d.plotAreaHeight):(g=a.scrollbarHeight,f=d.plotAreaWidth);a.width=f;if((a.height=g)&&f){var h=AmCharts.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);a.bg=h;e.push(h);h=AmCharts.rect(b,f,g,"#000",0.005);e.push(h);a.invisibleBg=h;h.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});
h=AmCharts.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);a.selectedBG=h;e.push(h);f=AmCharts.rect(b,f,g,"#000",0.005);a.dragger=f;e.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});f=d.pathToImages;c?(h=f+"dragIconH.gif",f=a.dragIconWidth,c=a.dragIconHeight):(h=f+
"dragIcon.gif",c=a.dragIconWidth,f=a.dragIconHeight);g=b.image(h,0,0,c,f);var h=b.image(h,0,0,c,f),k=10,l=20;d.panEventsEnabled&&(k=25,l=a.scrollbarHeight);var m=AmCharts.rect(b,k,l,"#000",0.005),p=AmCharts.rect(b,k,l,"#000",0.005);p.translate(-(k-c)/2,-(l-f)/2);m.translate(-(k-c)/2,-(l-f)/2);c=b.set([g,p]);b=b.set([h,m]);a.iconLeft=c;a.iconRight=b;c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.leftDragStart()}).touchend(function(){a.leftDragStop()});
b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.rightDragStart()}).touchend(function(){a.rightDragStop()});AmCharts.ifArray(d.chartData)?e.show():e.hide();a.hideDragIcons();a.clipDragger(!1)}e.translate(a.x,a.y)},updateScrollbarSize:function(a,b){var c=this.dragger,d,e,f,g;this.rotate?(d=0,e=a,f=this.width+1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",e)):(d=a,
e=0,f=b-a,g=this.height+1,c.setAttr("width",b-a),c.setAttr("x",d));this.clipAndUpdate(d,e,f,g)},updateScrollbar:function(){var a,b=!1,c,d,e=this.x,f=this.y,g=this.dragger,h=this.getDBox();c=h.x+e;d=h.y+f;var k=h.width,h=h.height,l=this.rotate,m=this.chart,p=this.width,n=this.height,s=m.mouseX,q=m.mouseY;a=this.initialMouse;m.mouseIsOver&&(this.dragging&&(m=this.initialCoord,l?(a=m+(q-a),0>a&&(a=0),m=n-h,a>m&&(a=m),g.setAttr("y",a)):(a=m+(s-a),0>a&&(a=0),m=p-k,a>m&&(a=m),g.setAttr("x",a))),this.resizingRight&&
(l?(a=q-d,a+d>n+f&&(a=n-d+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=0.1),g.setAttr("height",a))):(a=s-c,a+c>p+e&&(a=p-c+e),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=0.1),g.setAttr("width",a)))),this.resizingLeft&&(l?(c=d,d=q,d<f&&(d=f),d>n+f&&(d=n+f),a=!0===b?c-d:h+c-d,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("y",c+h-f)):(0===a&&(a=0.1),g.setAttr("y",d-f),g.setAttr("height",a))):(d=s,d<e&&(d=e),d>p+e&&(d=p+e),a=!0===b?c-d:k+c-d,0>a?(this.resizingRight=
!0,this.resizingLeft=!1,g.setAttr("x",c+k-e)):(0===a&&(a=0.1),g.setAttr("x",d-e),g.setAttr("width",a)))),this.clipDragger(!0))},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,d=b.y,e=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,e=this.width+1,this.clipY!=d||this.clipH!=b)f=!0}else if(d=0,b=this.height+1,this.clipX!=c||this.clipW!=e)f=!0;f&&(this.clipAndUpdate(c,d,e,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,
c,d){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=d;this.selectedBG.clipRect(a,b,c,d);this.updateDragIconPositions();this.maskGraphs(a,b,c,d)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,d=b.y,e=b.width,b=b.height;this.rotate?(c=d,e=this.height/b):e=this.width/e;a={type:"zoomed",position:c,chart:a,target:this,multiplier:e};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=
a.x,c=a.y,d=this.iconLeft,e=this.iconRight,f,g,h=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,d.translate(this.x+(h-g)/2,this.y+c-f/2),e.translate(this.x+(h-g)/2,this.y+c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,d.translate(this.x+b-g/2,this.y+(h-f)/2),e.translate(this.x+b-g/2+a.width,this.y+(h-f)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&
!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.dragger.stop();this.multiplier=a;this.position=b;this.updateScrollbarSize(b,this.rotate?b+this.height/a:b+this.width/a)},destroy:function(){this.clear();AmCharts.remove(this.set);AmCharts.remove(this.iconRight);AmCharts.remove(this.iconLeft)},clear:function(){clearInterval(this.interval)},
handleDragStart:function(){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)},handleDragStop:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();this.updateScrollbar()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();
this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},
handleBgClick:function(){if(!this.resizingRight&&!this.resizingLeft){this.zooming=!0;var a,b,c=this.scrollDuration,d=this.dragger;a=this.getDBox();var e=a.height,f=a.width;b=this.chart;var g=this.y,h=this.x,k=this.rotate;k?(a="y",b=b.mouseY-e/2-g,b=AmCharts.fitToBounds(b,0,this.height-e)):(a="x",b=b.mouseX-f/2-h,b=AmCharts.fitToBounds(b,0,this.width-f));this.updateOnReleaseOnly?(this.skipEvent=!1,d.setAttr(a,b),this.dispatchScrollbarEvent(),this.clipDragger()):(b=Math.round(b),k?d.animate({y:b},c,
">"):d.animate({x:b},c,">"))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();this.mouseIsOver=this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.updateScrollbar()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=
!1;this.hideDragIcons()}});AmCharts.ChartScrollbar=AmCharts.Class({inherits:AmCharts.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";AmCharts.ChartScrollbar.base.construct.call(this,a);this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=0.7;this.skipEvent=this.autoGridCount=
!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.offset=0;AmCharts.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new AmCharts.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.markPeriodChange=b.categoryAxis.markPeriodChange;a.boldPeriodBeginning=b.categoryAxis.boldPeriodBeginning;a.axisItemRenderer=AmCharts.RecItem;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.inside=!0;a.fontSize=
this.fontSize;a.tickLength=0;a.axisAlpha=0;AmCharts.isString(this.graph)&&(this.graph=AmCharts.getObjById(b.graphs,this.graph));if(a=this.graph){var c=this.valueAxis;c||(this.valueAxis=c=new AmCharts.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=AmCharts.RecItem,c.axisRenderer=AmCharts.RecAxis,c.guideFillRenderer=AmCharts.RecFill,c.labelsEnabled=!1,c.chart=b);b=this.unselectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=
a.noStepRisers);b=this.selectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers)}this.scrollbarCreated=!0},draw:function(){var a=this;AmCharts.ChartScrollbar.base.draw.call(a);a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,d=a.categoryAxis,e=a.rotate,f=a.x,g=a.y,h=a.width,k=a.height,l=b.categoryAxis,m=a.set;d.setOrientation(!e);d.parseDates=l.parseDates;d.rotate=e;d.equalSpacing=l.equalSpacing;d.minPeriod=l.minPeriod;
d.startOnAxis=l.startOnAxis;d.viW=h;d.viH=k;d.width=h;d.height=k;d.gridCount=a.gridCount;d.gridColor=a.gridColor;d.gridAlpha=a.gridAlpha;d.color=a.color;d.tickLength=0;d.axisAlpha=0;d.autoGridCount=a.autoGridCount;d.parseDates&&!d.equalSpacing&&d.timeZoom(b.firstTime,b.lastTime);d.zoom(0,c.length-1);if(l=a.graph){var p=a.valueAxis,n=l.valueAxis;p.id=n.id;p.rotate=e;p.setOrientation(e);p.width=h;p.height=k;p.viW=h;p.viH=k;p.dataProvider=c;p.reversed=n.reversed;p.logarithmic=n.logarithmic;p.gridAlpha=
0;p.axisAlpha=0;m.push(p.set);e?(p.y=g,p.x=0):(p.x=f,p.y=0);var f=Infinity,g=-Infinity,s;for(s=0;s<c.length;s++){var q=c[s].axes[n.id].graphs[l.id].values,r;for(r in q)if(q.hasOwnProperty(r)&&"percents"!=r&&"total"!=r){var u=q[r];u<f&&(f=u);u>g&&(g=u)}}Infinity!=f&&(p.minimum=f);-Infinity!=g&&(p.maximum=g+0.1*(g-f));f==g&&(p.minimum-=1,p.maximum+=1);void 0!==a.minimum&&(p.minimum=a.minimum);void 0!==a.maximum&&(p.maximum=a.maximum);p.zoom(0,c.length-1);r=a.unselectedGraph;r.id=l.id;r.rotate=e;r.chart=
b;r.data=c;r.valueAxis=p;r.chart=l.chart;r.categoryAxis=a.categoryAxis;r.periodSpan=l.periodSpan;r.valueField=l.valueField;r.openField=l.openField;r.closeField=l.closeField;r.highField=l.highField;r.lowField=l.lowField;r.lineAlpha=a.graphLineAlpha;r.lineColorR=a.graphLineColor;r.fillAlphas=a.graphFillAlpha;r.fillColorsR=a.graphFillColor;r.connect=l.connect;r.hidden=l.hidden;r.width=h;r.height=k;r.pointPosition=l.pointPosition;r.stepDirection=l.stepDirection;r.periodSpan=l.periodSpan;n=a.selectedGraph;
n.id=l.id;n.rotate=e;n.chart=b;n.data=c;n.valueAxis=p;n.chart=l.chart;n.categoryAxis=d;n.periodSpan=l.periodSpan;n.valueField=l.valueField;n.openField=l.openField;n.closeField=l.closeField;n.highField=l.highField;n.lowField=l.lowField;n.lineAlpha=a.selectedGraphLineAlpha;n.lineColorR=a.selectedGraphLineColor;n.fillAlphas=a.selectedGraphFillAlpha;n.fillColorsR=a.selectedGraphFillColor;n.connect=l.connect;n.hidden=l.hidden;n.width=h;n.height=k;n.pointPosition=l.pointPosition;n.stepDirection=l.stepDirection;
n.periodSpan=l.periodSpan;b=a.graphType;b||(b=l.type);r.type=b;n.type=b;c=c.length-1;r.zoom(0,c);n.zoom(0,c);n.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});r.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});m.push(r.set);m.push(n.set)}m.push(d.set);m.push(d.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();
a.iconRight.toFront()},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!AmCharts.toBoolean(c);this.zoomScrollbar();this.skipEvent||this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,d=this.dragger.getBBox();b=d.x;c=d.y;var e=d.width,f=d.height,d=this.chart;this.rotate?(b=c,c=f):c=e;e=
{type:"zoomed",target:this};e.chart=d;var f=this.categoryAxis,g=this.stepWidth;if(f.parseDates&&!f.equalSpacing){if(a=d.firstTime,f.minDuration(),d=Math.round(b/g)+a,a=this.dragging?d+this.timeDifference:Math.round((b+c)/g)+a,d>a&&(d=a),d!=this.startTime||a!=this.endTime)this.startTime=d,this.endTime=a,e.start=d,e.end=a,e.startDate=new Date(d),e.endDate=new Date(a),this.fire(e.type,e)}else if(f.startOnAxis||(b+=g/2),c-=this.stepWidth/2,d=f.xToIndex(b),b=f.xToIndex(b+c),d!=this.start||this.end!=b)f.startOnAxis&&
(this.resizingRight&&d==b&&b++,this.resizingLeft&&d==b&&(0<d?d--:b=1)),this.start=d,this.end=this.dragging?this.start+this.difference:b,e.start=this.start,e.end=this.end,f.parseDates&&(a[this.start]&&(e.startDate=new Date(a[this.start].time)),a[this.end]&&(e.endDate=new Date(a[this.end].time))),this.fire(e.type,e)}},zoomScrollbar:function(){var a,b;a=this.chart;var c=a.chartData,d=this.categoryAxis;d.parseDates&&!d.equalSpacing?(c=d.stepWidth,d=a.firstTime,a=c*(this.startTime-d),b=c*(this.endTime-
d)):(a=c[this.start].x[d.id],b=c[this.end].x[d.id],c=d.stepWidth,d.startOnAxis||(d=c/2,a-=d,b+=d));this.stepWidth=c;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,c,d){var e=this.selectedGraph;e&&e.set.clipRect(a,b,c,d)},handleDragStart:function(){AmCharts.ChartScrollbar.base.handleDragStart.call(this);this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);
this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}});AmCharts.AmBalloon=AmCharts.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=0.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maximumWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=0.4;this.shadowColor="#000000";
this.fadeOutDuration=this.animationDuration=0.3;this.fixedPosition=!1;this.offsetY=6;this.offsetX=1;this.textAlign="center";AmCharts.isModern||(this.offsetY*=1.5);AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY;this.deltaSignX=this.deltaSignY=1;var c=this.chart;AmCharts.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);if(!isNaN(a)){var d=this.follow,e=c.container,f=this.set;AmCharts.remove(f);this.removeDiv();
this.set=f=e.set();c.balloonsSet.push(f);if(this.show){var g=this.l,h=this.t,k=this.r,l=this.b,m=this.balloonColor,p=this.fillColor,n=this.borderColor,s=p;void 0!=m&&(this.adjustBorderColor?s=n=m:p=m);var q=this.horizontalPadding,r=this.verticalPadding,u=this.pointerWidth,v=this.pointerOrientation,t=this.cornerRadius,w=c.fontFamily,y=this.fontSize;void 0==y&&(y=c.fontSize);var m=document.createElement("div"),E=m.style;E.position="absolute";var z=this.minWidth,A="";isNaN(z)||(A="min-width:"+(z-2*q)+
"px; ");m.innerHTML='<div style="text-align:'+this.textAlign+"; "+A+"max-width:"+this.maxWidth+"px; font-size:"+y+"px; color:"+this.color+"; font-family:"+w+'">'+this.text+"</div>";c.chartDiv.appendChild(m);this.textDiv=m;y=m.offsetWidth;w=m.offsetHeight;m.clientHeight&&(y=m.clientWidth,w=m.clientHeight);w+=2*r;A=y+2*q;!isNaN(z)&&A<z&&(A=z);window.opera&&(w+=2);var I=!1,y=this.offsetY;c.handDrawn&&(y+=c.handDrawScatter+2);"H"!=v?(z=a-A/2,b<h+w+10&&"down"!=v?(I=!0,d&&(b+=y),y=b+u,this.deltaSignY=-1):
(d&&(b-=y),y=b-w-u,this.deltaSignY=1)):(2*u>w&&(u=w/2),y=b-w/2,a<g+(k-g)/2?(z=a+u,this.deltaSignX=-1):(z=a-A-u,this.deltaSignX=1));y+w>=l&&(y=l-w);y<h&&(y=h);z<g&&(z=g);z+A>k&&(z=k-A);var h=y+r,l=z+q,r=this.shadowAlpha,G=this.shadowColor,q=this.borderThickness,B=this.bulletSize,K;0<t||0===u?(0<r&&(a=AmCharts.rect(e,A,w,p,0,q+1,G,r,this.cornerRadius),AmCharts.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),p=AmCharts.rect(e,A,w,p,this.fillAlpha,q,n,this.borderAlpha,this.cornerRadius),this.showBullet&&
(K=AmCharts.circle(e,B,s,this.fillAlpha),f.push(K))):(s=[],t=[],"H"!=v?(g=a-z,g>A-u&&(g=A-u),g<u&&(g=u),s=[0,g-u,a-z,g+u,A,A,0,0],t=I?[0,0,b-y,0,0,w,w,0]:[w,w,b-y,w,w,0,0,w]):(s=b-y,s>w-u&&(s=w-u),s<u&&(s=u),t=[0,s-u,b-y,s+u,w,w,0,0],s=a<g+(k-g)/2?[0,0,z<a?0:a-z,0,0,A,A,0]:[A,A,z+A>a?A:a-z,A,A,0,0,A]),0<r&&(a=AmCharts.polygon(e,s,t,p,0,q,G,r),a.translate(1,1),f.push(a)),p=AmCharts.polygon(e,s,t,p,this.fillAlpha,q,n,this.borderAlpha));this.bg=p;f.push(p);p.toFront();e=1*this.deltaSignX;E.left=l+"px";
E.top=h+"px";f.translate(z-e,y);p=p.getBBox();this.bottom=y+w+1;this.yPos=p.y+y;K&&K.translate(this.pointToX-z+e,b-y);b=this.animationDuration;0<this.animationDuration&&!d&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY),f.animate({translate:z-e+","+y},b,"easeOutSine"),m&&(E.left=this.prevTX+"px",E.top=this.prevTY+"px",this.xAnim=c.animate({node:m},"left",this.prevTX,l,b,"easeOutSine","px"),this.yAnim=c.animate({node:m},"top",this.prevTY,h,b,"easeOutSine","px")));this.prevX=z-e;this.prevY=
y;this.prevTX=l;this.prevTY=h}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var d=c.getBBox(),a=a-d.width/2,e=b-d.height-10;a<this.l&&(a=this.l);a>this.r-d.width&&(a=this.r-d.width);e<this.t&&(e=b+10);c.translate(a,e);b=this.textDiv.style;b.left=a+this.horizontalPadding+
"px";b.top=e+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,d){this.l=a;this.t=b;this.r=c;this.b=d;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){this.text=a;this.show=!0;this.destroyTO&&clearTimeout(this.destroyTO);a=this.chart;this.fadeAnim1&&a.stopAnim(this.fadeAnim1);this.fadeAnim2&&a.stopAnim(this.fadeAnim2);this.draw()},hide:function(){var a=this,b=a.fadeOutDuration,c=a.chart;if(0<b){a.destroyTO=setTimeout(function(){a.destroy.call(a)},
1E3*b);a.follow=!1;a.show=!1;var d=a.set;d&&(d.setAttr("opacity",a.fillAlpha),a.fadeAnim1=d.animate({opacity:0},b,"easeInSine"));a.textDiv&&(a.fadeAnim2=c.animate({node:a.textDiv},"opacity",1,0,b,"easeInSine",""))}else a.show=!1,a.follow=!1,a.destroy()},setPosition:function(a,b,c){this.pointToX=a;this.pointToY=b;c&&(a==this.previousX&&b==this.previousY||this.draw());this.previousX=a;this.previousY=b},followCursor:function(a){var b=this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!==
b.pShowBullet&&(b.showBullet=b.pShowBullet);clearInterval(b.interval);var c=b.chart.mouseX,d=b.chart.mouseY;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=d,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);AmCharts.remove(this.set);this.removeDiv();this.set=null}});AmCharts.AmCoordinateChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(a){AmCharts.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;AmCharts.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){AmCharts.AmCoordinateChart.base.initChart.call(this);var a=this.categoryAxis;a&&(this.categoryAxis=AmCharts.processObject(a,AmCharts.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();AmCharts.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&
this.gridSet.toFront()},createValueAxes:function(){if(0===this.valueAxes.length){var a=new AmCharts.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(){var a=this.graphs,b,c={},d=this.seriesIdField;d||(d=this.categoryField);this.chartData=[];var e=this.dataProvider;if(e){var f=!1,g,h=this.categoryAxis,k;h&&(f=h.parseDates,k=h.forceShowField,g=h.categoryFunction);var l,m,p,n;f&&(b=AmCharts.extractPeriod(h.minPeriod),l=b.period,
m=b.count,n=AmCharts.getPeriodDuration(l,m));var s={};this.lookupTable=s;var q,r=this.dataDateFormat,u;for(q=0;q<e.length;q++){var v={},t=e[q];b=t[this.categoryField];v.dataContext=t;v.category=g?g(b,t,h):String(b);k&&(v.forceShow=t[k]);s[t[d]]=v;f&&(b=h.categoryFunction?h.categoryFunction(b,t,h):b instanceof Date?"fff"==h.minPeriod?AmCharts.useUTC?new Date(b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate(),b.getUTCHours(),b.getUTCMinutes(),b.getUTCSeconds(),b.getUTCMilliseconds()):new Date(b.getFullYear(),
b.getMonth(),b.getDate(),b.getHours(),b.getMinutes(),b.getSeconds(),b.getMilliseconds()):new Date(b):r?AmCharts.stringToDate(b,r):new Date(b),b=AmCharts.resetDateToMin(b,l,m,h.firstDayOfWeek),v.category=b,v.time=b.getTime());var w=this.valueAxes;v.axes={};v.x={};var y;for(y=0;y<w.length;y++){var E=w[y].id;v.axes[E]={};v.axes[E].graphs={};var z;for(z=0;z<a.length;z++){b=a[z];var A=b.id,I=b.periodValue;if(b.valueAxis.id==E){v.axes[E].graphs[A]={};var G={};G.index=q;var B=t;b.dataProvider&&(B=c);G.values=
this.processValues(B,b,I);!b.connect&&u&&v.time-p>1.1*n&&(u.gap=!0);this.processFields(b,G,B);G.category=v.category;G.serialDataItem=v;G.graph=b;v.axes[E].graphs[A]=G}}}this.chartData[q]=v;p=v.time;u=G}}for(c=0;c<a.length;c++)b=a[c],b.dataProvider&&this.parseGraphData(b)},processValues:function(a,b,c){var d={},e,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);e=Number(a[b.valueField+c]);isNaN(e)||(d.value=e);e=Number(a[b.errorField+c]);isNaN(e)||(d.error=e);f&&(c="Open");e=Number(a[b.openField+
c]);isNaN(e)||(d.open=e);f&&(c="Close");e=Number(a[b.closeField+c]);isNaN(e)||(d.close=e);f&&(c="Low");e=Number(a[b.lowField+c]);isNaN(e)||(d.low=e);f&&(c="High");e=Number(a[b.highField+c]);isNaN(e)||(d.high=e);return d},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var d;for(d=0;d<b.length;d++){var e=b[d],f=this.lookupTable[String(e[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(e,
a,a.periodValue),this.processFields(a,g,e))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var d=b[c];d&&d.valueAxis==a&&this.removeGraph(d)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,
this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.ValueAxis,this.theme);a[b]=c;c.chart=this;c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;
if(a)for(var c=0;c<a.length;c++){var d=a[c];(void 0!==d.category||void 0!==d.date)&&b&&b.addGuide(d);d.valueAxis?d.valueAxis.addGuide(d):isNaN(d.value)||this.valueAxes[0].addGuide(d)}},processGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;AmCharts.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id=
"graphAuto"+b+"_"+(new Date).getTime())}},formatString:function(a,b,c){var d=b.graph,e=d.valueAxis;e.duration&&b.values.value&&(e=AmCharts.formatDuration(b.values.value,e.duration,"",e.durationUnits,e.maxInterval,e.numberFormatter),a=a.split("[[value]]").join(e));a=AmCharts.massReplace(a,{"[[title]]":d.title,"[[description]]":b.description});a=c?AmCharts.fixNewLines(a):AmCharts.fixBrakes(a);return a=AmCharts.cleanFromEmpty(a)},getBalloonColor:function(a,b,c){var d=a.lineColor,e=a.balloonColor;c&&
(e=d);c=a.fillColorsR;"object"==typeof c?d=c[0]:void 0!==c&&(d=c);b.isNegative&&(c=a.negativeLineColor,a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(d=c));void 0!==b.color&&(d=b.color);void 0===e&&(e=d);return e},getGraphById:function(a){return AmCharts.getObjById(this.graphs,a)},getValueAxisById:function(a){return AmCharts.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var d=a.itemColors,e=b.index;b.color=e<d.length?d[e]:AmCharts.randomColor()}d=
"lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern".split(" ");for(e=0;e<d.length;e++){var f=d[e],g=a[f+"Field"];g&&(g=c[g],AmCharts.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:AmCharts.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:
a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=this.patterns)a.pattern=c[b]},handleLegendEvent:function(a){var b=a.type;a=a.dataItem;if(!this.legend.data&&a){var c=a.hidden,d=a.showBalloon;switch(b){case "clickMarker":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "clickLabel":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "rollOverItem":c||this.highlightGraph(a);break;case "rollOutItem":c||
this.unhighlightGraph();break;case "hideItem":this.hideGraph(a);break;case "showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs,c,d=0.2;this.legend&&(d=this.legend.rollOverGraphAlpha);if(1!=d)for(c=0;c<b.length;c++){var e=b[c];e!=a&&e.changeOpacity(d)}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.hidden=!1;this.dataChanged=!0;this.marginsUpdated=
!1;this.chartCreated&&this.initChart()},hideGraph:function(a){this.dataChanged=!0;this.marginsUpdated=!1;a.hidden=!0;this.chartCreated&&this.initChart()},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();
this.validateNow()}});AmCharts.AmSlicedChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(a){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");AmCharts.AmSlicedChart.base.construct.call(this,a);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";this.groupedPulled=
!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=0.2;this.hideLabelsPercent=0;this.urlTarget="_self";this.autoMarginOffset=
10;this.gradientRatio=[];AmCharts.applyTheme(this,a,"AmSlicedChart")},initChart:function(){AmCharts.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.setLegendData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type;a=a.dataItem;if(!this.legend.data&&a){var c=a.hidden;switch(b){case "clickMarker":c||this.clickSlice(a);break;case "clickLabel":c||this.clickSlice(a);break;case "rollOverItem":c||this.rollOverSlice(a,
!1);break;case "rollOutItem":c||this.rollOutSlice(a);break;case "hideItem":this.hideSlice(a);break;case "showItem":this.showSlice(a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).touchend(function(a){c.rollOverSlice(b,a);c.panEventsEnabled&&c.clickSlice(b,a)}).touchstart(function(a){c.rollOverSlice(b,
a)}).click(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b,c){a=AmCharts.formatValue(a,b,["value"],this.nf,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b,["percents"],this.pf);a=AmCharts.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));a=c?AmCharts.fixNewLines(a):AmCharts.fixBrakes(a);return a=
AmCharts.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},b.startDuration/b.chartData.length*500*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++){var d=b[c];d.pulled&&this.pullSlice(d,1,a)}},startSequenced:function(){var a=this.chartData,
b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration;b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),b.animate({opacity:1,translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var d=c.label;d&&d.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},
hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);if(!a.hidden){this.pullOnHover&&this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var d=a.balloonX,e=a.balloonY;a.pulled&&(d+=a.pullX,e+=a.pullY);var f=this.formatString(this.balloonText,a,!0),g=AmCharts.adjustLuminosity(a.color,-0.15);this.showBalloon(f,
g,b,d,e);a={type:"rollOverSlice",dataItem:a,chart:this,event:c};this.fire(a.type,a)}},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:1});this.hideBalloon();var c={type:"rollOutSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},clickSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.pulled?this.pullSlice(a,0):this.pullSlice(a,1);AmCharts.getURL(a.url,this.urlTarget);var c={type:"clickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},handleRightClick:function(a,
b){isNaN(a)||(a=this.chartData[a]);var c={type:"rightClickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},drawTicks:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(c.label){var d=c.ty,d=AmCharts.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,d,d],this.labelTickColor,this.labelTickAlpha);c.tick=d;c.wedge.push(d)}}},initialStart:function(){var a=this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):
(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b),a.startSlices())},pullSlice:function(a,b,c){var d=this.pullOutDuration;!0===c&&(d=0);(c=a.wedge)&&c.animate({translate:b*a.pullX+","+b*a.pullY},d,this.pullOutEffect);1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=
a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(a){a=this.chartData;var b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,d=0,e,f,g;for(e=0;e<c;e++){f={};var h=b[e];f.dataContext=h;f.value=Number(h[this.valueField]);(g=h[this.titleField])||(g="");f.title=g;f.pulled=AmCharts.toBoolean(h[this.pulledField],!1);(g=h[this.descriptionField])||
(g="");f.description=g;f.labelRadius=Number(h[this.labelRadiusField]);f.url=h[this.urlField];g=h[this.patternField];!g&&this.patterns&&(g=this.patterns[e]);f.pattern=g;f.visibleInLegend=AmCharts.toBoolean(h[this.visibleInLegendField],!0);g=h[this.alphaField];f.alpha=void 0!==g?Number(g):this.alpha;g=h[this.colorField];void 0!==g&&(f.color=AmCharts.toColor(g));f.labelColor=AmCharts.toColor(h[this.labelColorField]);d+=f.value;f.hidden=!1;a[e]=f}for(e=b=0;e<c;e++)f=a[e],f.percents=f.value/d*100,f.percents<
this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:this.groupValue/d*100,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,pattern:this.groupedPattern,dataContext:{}}));c=this.baseColor;c||(c=this.pieBaseColor);d=this.brightnessStep;d||(d=this.pieBrightnessStep);for(e=0;e<a.length;e++)c?g=AmCharts.adjustLuminosity(c,e*d/100):(g=this.colors[e],
void 0===g&&(g=AmCharts.randomColor())),void 0===a[e].color&&(a[e].color=g);this.recalculatePercents()}},recalculatePercents:function(){var a=this.chartData,b=0,c,d;for(c=0;c<a.length;c++)d=a[c],!d.hidden&&0<d.value&&(b+=d.value);for(c=0;c<a.length;c++)d=this.chartData[c],d.percents=!d.hidden&&0<d.value?100*d.value/b:0},removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=
this;a.startSlices();var b=setTimeout(function(){a.pullSlices.call(a)},1200*a.startDuration);a.timeOuts.push(b)},measureMaxLabel:function(){var a=this.chartData,b=0,c;for(c=0;c<a.length;c++){var d=this.formatString(this.labelText,a[c]),d=AmCharts.text(this.container,d,this.color,this.fontFamily,this.fontSize),e=d.getBBox().width;e>b&&(b=e);d.remove()}return b}});AmCharts.AmRectangularChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(a){AmCharts.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplier=this.widthMultiplier=1;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=
0;this.zoomOutButtonImageSize=17;this.zoomOutButtonImage="lens.png";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;AmCharts.applyTheme(this,a,"AmRectangularChart")},initChart:function(){AmCharts.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),
a=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){AmCharts.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(AmCharts.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw();a=this.zoomOutText;""!==a&&a&&this.drawZoomOutButton()}},resetMargins:function(){var a={},b;if("serial"==this.type){var c=
this.valueAxes;for(b=0;b<c.length;b++){var d=c[b];d.ignoreAxisWidth||(d.setOrientation(this.rotate),d.fixAxisPosition(),a[d.position]=!0)}(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}else{d=this.xAxes;c=this.yAxes;for(b=0;b<d.length;b++){var e=d[b];e.ignoreAxisWidth||(e.setOrientation(!0),e.fixAxisPosition(),a[e.position]=!0)}for(b=0;b<c.length;b++)d=c[b],d.ignoreAxisWidth||(d.setOrientation(!1),d.fixAxisPosition(),
a[d.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,d=this.fixMargins,e=this.realWidth,f=this.realHeight,g=c,h=c,k=e;b=f;var l;for(l=0;l<a.length;l++)b=this.getAxisBounds(a[l],g,k,h,b),g=Math.round(b.l),k=Math.round(b.r),h=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,g,k,h,b),g=Math.round(b.l),
k=Math.round(b.r),h=Math.round(b.t),b=Math.round(b.b);d.left&&g<c&&(this.marginLeft=Math.round(-g+c));d.right&&k>=e-c&&(this.marginRight=Math.round(k-e+c));d.top&&h<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-h+c+this.titleHeight));d.bottom&&b>f-c&&(this.marginBottom=Math.round(this.marginBottom+b-f+c));this.initChart()},getAxisBounds:function(a,b,c,d,e){if(!a.ignoreAxisWidth){var f=a.labelsSet,g=a.tickLength;a.inside&&(g=0);if(f)switch(f=a.getBBox(),a.position){case "top":a=f.y;
d>a&&(d=a);break;case "bottom":a=f.y+f.height;e<a&&(e=a);break;case "right":a=f.x+f.width+g+3;c<a&&(c=a);break;case "left":a=f.x-g,b>a&&(b=a)}}return{l:b,t:d,r:c,b:e}},drawZoomOutButton:function(){var a=this,b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,d=a.fontSize,e=a.zoomOutButtonImageSize,f=a.zoomOutButtonImage,g=a.zoomOutText,h=a.zoomOutButtonColor,k=a.zoomOutButtonAlpha,l=a.zoomOutButtonFontSize,m=a.zoomOutButtonPadding;isNaN(l)||(d=l);(l=a.zoomOutButtonFontColor)&&(c=l);var l=a.zoomOutButton,
p;l&&(l.fontSize&&(d=l.fontSize),l.color&&(c=l.color),l.backgroundColor&&(h=l.backgroundColor),isNaN(l.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=l.backgroundAlpha));var n=l=0;void 0!==a.pathToImages&&f&&(p=a.container.image(a.pathToImages+f,0,0,e,e),b.push(p),p=p.getBBox(),l=p.width+5);void 0!==g&&(c=AmCharts.text(a.container,g,c,a.fontFamily,d,"start"),d=c.getBBox(),n=p?p.height/2-3:d.height/2,c.translate(l,n),b.push(c));p=b.getBBox();c=1;AmCharts.isModern||(c=0);h=AmCharts.rect(a.container,
p.width+2*m+5,p.height+2*m-2,h,1,1,h,c);h.setAttr("opacity",k);h.translate(-m,-m);b.push(h);h.toBack();a.zbBG=h;p=h.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-p.width+m,a.marginTopReal+m);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();a.clickZB()});for(k=0;k<b.length;k++)b[k].attr({cursor:"pointer"});a.zbSet=b},rollOverZB:function(){this.zbBG.setAttr("opacity",
this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,d=this.marginTopReal,e=this.plotAreaWidth-1,f=this.plotAreaHeight-1,g=this.plotAreaFillColors,h=this.plotAreaFillAlphas,k=this.plotAreaBorderColor,l=this.plotAreaBorderAlpha;this.trendLinesSet.clipRect(c,d,e,f);"object"==typeof h&&
(h=h[0]);g=AmCharts.polygon(this.container,[0,e,e,0,0],[0,0,f,f,0],g,h,1,k,l,this.plotAreaGradientAngle);g.translate(c+a,d+b);this.set.push(g);0!==a&&0!==b&&(g=this.plotAreaFillColors,"object"==typeof g&&(g=g[0]),g=AmCharts.adjustLuminosity(g,-0.15),e=AmCharts.polygon(this.container,[0,a,e+a,e,0],[0,b,b,0,0],g,h,1,k,l),e.translate(c,d+f),this.set.push(e),a=AmCharts.polygon(this.container,[0,0,a,a,0],[0,f,f+b,b,0],g,h,1,k,l),a.translate(c,d),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},
updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);a=a-this.marginLeftReal-this.marginRightReal-this.dx;b=b-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=
Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy+a;this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b=this.marginLeftReal,c=this.marginTopReal,d=this.plotAreaHeight,e=this.plotAreaWidth,
f;for(f=0;f<a.length;f++){var g=a[f];g.axisRenderer=AmCharts.RecAxis;g.guideFillRenderer=AmCharts.RecFill;g.axisItemRenderer=AmCharts.RecItem;g.dx=this.dx;g.dy=this.dy;g.viW=e-1;g.viH=d-1;g.marginsChanged=!0;g.viX=b;g.viY=c;this.updateObjectSize(g)}},updateObjectSize:function(a){a.width=(this.plotAreaWidth-1)*this.widthMultiplier;a.height=(this.plotAreaHeight-1)*this.heightMultiplier;a.x=this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},updateGraphs:function(){var a=
this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.x=this.marginLeftReal+this.horizontalPosition;c.y=this.marginTopReal+this.verticalPosition;c.width=this.plotAreaWidth*this.widthMultiplier;c.height=this.plotAreaHeight*this.heightMultiplier;c.index=b;c.dx=this.dx;c.dy=this.dy;c.rotate=this.rotate}},updateChartCursor:function(){var a=this.chartCursor;a&&(a=AmCharts.processObject(a,AmCharts.ChartCursor,this.theme),this.addChartCursor(a),a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth-
1,a.height=this.plotAreaHeight-1,a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=AmCharts.processObject(a,AmCharts.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},addChartCursor:function(a){AmCharts.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=a},removeChartCursor:function(){AmCharts.callMethod("destroy",[this.chartCursor]);
this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal+this.horizontalPosition,c.y=this.marginTopReal+this.verticalPosition,c.draw())}},addTrendLine:function(a){this.trendLines.push(a)},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.scrollbarHeight+a.offset;"top"==a.position?b?
this.marginLeftReal+=c:this.marginTopReal+=c:b?this.marginRightReal+=c:this.marginBottomReal+=c},getScrollbarPosition:function(a,b,c){a.position=b?"bottom"==c||"left"==c?"bottom":"top":"top"==c||"right"==c?"bottom":"top"},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,d=this.marginLeftReal,e=a.scrollbarHeight,f=this.dx,g=this.dy,h=a.offset;"top"==a.position?b?(a.y=c,a.x=d-e-h):(a.y=c-e+g-1-h,a.x=d+f):b?(a.y=c+g,a.x=d+this.plotAreaWidth+f+h):(a.y=c+this.plotAreaHeight+
h,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;b&&(a?b.show():b.hide(),this.rollOutZB())},handleReleaseOutside:function(a){AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside()},handleMouseDown:function(a){AmCharts.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(a){}});AmCharts.TrendLine=AmCharts.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,d,e,f,g,h=a.categoryAxis,k=a.initialDate,l=a.initialCategory,m=a.finalDate,p=a.finalCategory,n=a.valueAxis,s=a.valueAxisX,q=a.initialXValue,r=a.finalXValue,u=a.initialValue,v=a.finalValue,
t=n.recalculateToPercents,w=b.dataDateFormat;h&&(k&&(k instanceof Date||(k=w?AmCharts.stringToDate(k,w):new Date(k)),a.initialDate=k,d=h.dateToCoordinate(k)),l&&(d=h.categoryToCoordinate(l)),m&&(m instanceof Date||(m=w?AmCharts.stringToDate(m,w):new Date(m)),a.finalDate=m,e=h.dateToCoordinate(m)),p&&(e=h.categoryToCoordinate(p)));s&&!t&&(isNaN(q)||(d=s.getCoordinate(q)),isNaN(r)||(e=s.getCoordinate(r)));n&&!t&&(isNaN(u)||(f=n.getCoordinate(u)),isNaN(v)||(g=n.getCoordinate(v)));isNaN(d)||isNaN(e)||
isNaN(f)||isNaN(f)||(b.rotate?(h=[f,g],e=[d,e]):(h=[d,e],e=[f,g]),f=a.lineColor,d=AmCharts.line(c,h,e,f,a.lineAlpha,a.lineThickness,a.dashLength),g=h,k=e,p=h[1]-h[0],n=e[1]-e[0],0===p&&(p=0.01),0===n&&(n=0.01),l=p/Math.abs(p),m=n/Math.abs(n),n=p*n/Math.abs(p*n)*Math.sqrt(Math.pow(p,2)+Math.pow(n,2)),p=Math.asin(p/n),n=90*Math.PI/180-p,p=Math.abs(5*Math.cos(n)),n=Math.abs(5*Math.sin(n)),g.push(h[1]-l*n,h[0]-l*n),k.push(e[1]+m*p,e[0]+m*p),h=AmCharts.polygon(c,g,k,f,0.005,0),c=c.set([h,d]),c.translate(b.marginLeftReal,
b.marginTopReal),b.trendLinesSet.push(c),a.line=d,a.set=c,h.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}),h.touchend&&h.touchend(function(){a.handleLineClick()}))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a})},handleLineOut:function(){this.line.attr({stroke:this.lineColor})},destroy:function(){AmCharts.remove(this.set)}});AmCharts.circle=function(a,b,c,d,e,f,g,h){if(void 0==e||0===e)e=0.01;void 0===f&&(f="#000000");void 0===g&&(g=0);d={fill:c,stroke:f,"fill-opacity":d,"stroke-width":e,"stroke-opacity":g};a=a.circle(0,0,b).attr(d);h&&a.gradient("radialGradient",[c,AmCharts.adjustLuminosity(c,-0.6)]);return a};
AmCharts.text=function(a,b,c,d,e,f,g,h){f||(f="middle");"right"==f&&(f="end");isNaN(h)&&(h=1);void 0!==b&&(b=String(b),AmCharts.isIE&&!AmCharts.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":d,"font-size":e,opacity:h};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};
AmCharts.polygon=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=0.01);isNaN(h)&&(h=e);var p=d,n=!1;"object"==typeof p&&1<p.length&&(n=!0,p=p[0]);void 0===g&&(g=p);e={fill:p,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);m=AmCharts.dx;f=AmCharts.dy;a.handDrawn&&(c=AmCharts.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;l&&(g=AmCharts.doNothing);l="M"+(g(b[0])+m)+","+(g(c[0])+f);for(h=1;h<b.length;h++)l+=" L"+(g(b[h])+m)+","+(g(c[h])+
f);a=a.path(l+" Z").attr(e);n&&a.gradient("linearGradient",d,k);return a};
AmCharts.rect=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=0);void 0===k&&(k=0);void 0===l&&(l=270);isNaN(e)&&(e=0);var p=d,n=!1;"object"==typeof p&&(p=p[0],n=!0);void 0===g&&(g=p);void 0===h&&(h=e);b=Math.round(b);c=Math.round(c);var s=0,q=0;0>b&&(b=Math.abs(b),s=-b);0>c&&(c=Math.abs(c),q=-c);s+=AmCharts.dx;q+=AmCharts.dy;e={fill:p,stroke:g,"fill-opacity":e,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);a=a.rect(s,q,b,c,k,f).attr(e);n&&a.gradient("linearGradient",d,l);return a};
AmCharts.bullet=function(a,b,c,d,e,f,g,h,k,l,m){var p;"circle"==b&&(b="round");switch(b){case "round":p=AmCharts.circle(a,c/2,d,e,f,g,h);break;case "square":p=AmCharts.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "rectangle":p=AmCharts.polygon(a,[-c,c,c,-c],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "diamond":p=AmCharts.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],d,e,f,g,h);break;case "triangleUp":p=AmCharts.triangle(a,c,0,d,e,f,g,h);break;case "triangleDown":p=AmCharts.triangle(a,
c,180,d,e,f,g,h);break;case "triangleLeft":p=AmCharts.triangle(a,c,270,d,e,f,g,h);break;case "triangleRight":p=AmCharts.triangle(a,c,90,d,e,f,g,h);break;case "bubble":p=AmCharts.circle(a,c/2,d,e,f,g,h,!0);break;case "line":p=AmCharts.line(a,[-c/2,c/2],[0,0],d,e,f,g,h);break;case "yError":p=a.set();p.push(AmCharts.line(a,[0,0],[-c/2,c/2],d,e,f));p.push(AmCharts.line(a,[-k,k],[-c/2,-c/2],d,e,f));p.push(AmCharts.line(a,[-k,k],[c/2,c/2],d,e,f));break;case "xError":p=a.set(),p.push(AmCharts.line(a,[-c/
2,c/2],[0,0],d,e,f)),p.push(AmCharts.line(a,[-c/2,-c/2],[-k,k],d,e,f)),p.push(AmCharts.line(a,[c/2,c/2],[-k,k],d,e,f))}p&&p.pattern(m);return p};
AmCharts.triangle=function(a,b,c,d,e,f,g,h){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===h&&(h=0);d={fill:d,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};b/=2;var k;0===c&&(k=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(k=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(k=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(k=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(k).attr(d)};
AmCharts.line=function(a,b,c,d,e,f,g,h,k,l,m){if(a.handDrawn&&!m)return AmCharts.handDrawnLine(a,b,c,d,e,f,g,h,k,l,m);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d=Math.round;l&&(d=AmCharts.doNothing);l=AmCharts.dx;e=AmCharts.dy;g="M"+(d(b[0])+l)+","+(d(c[0])+e);for(h=1;h<b.length;h++)g+=" L"+(d(b[h])+l)+","+(d(c[h])+e);if(AmCharts.VML)return a.path(g,void 0,!0).attr(f);k&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};
AmCharts.makeHD=function(a,b,c){for(var d=[],e=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),h=Number(b[f-1]),k=Number(a[f]),l=Number(b[f]),m=Math.sqrt(Math.pow(k-g,2)+Math.pow(l-h,2)),m=Math.round(m/50)+1,k=(k-g)/m,l=(l-h)/m,p=0;p<=m;p++){var n=g+p*k+Math.random()*c,s=h+p*l+Math.random()*c;d.push(n);e.push(s)}return[d,e]};
AmCharts.handDrawnLine=function(a,b,c,d,e,f,g,h,k,l,m){var p=a.set();for(m=1;m<b.length;m++)for(var n=[b[m-1],b[m]],s=[c[m-1],c[m]],s=AmCharts.makeHD(n,s,a.handDrawScatter),n=s[0],s=s[1],q=1;q<n.length;q++)p.push(AmCharts.line(a,[n[q-1],n[q]],[s[q-1],s[q]],d,e,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,h,k,l,!0));return p};AmCharts.doNothing=function(a){return a};
AmCharts.wedge=function(a,b,c,d,e,f,g,h,k,l,m,p){var n=Math.round;f=n(f);g=n(g);h=n(h);var s=n(g/f*h),q=AmCharts.VML,r=359.5+f/100;359.94<r&&(r=359.94);e>=r&&(e=r);var u=1/180*Math.PI,r=b+Math.sin(d*u)*h,v=c-Math.cos(d*u)*s,t=b+Math.sin(d*u)*f,w=c-Math.cos(d*u)*g,y=b+Math.sin((d+e)*u)*f,E=c-Math.cos((d+e)*u)*g,z=b+Math.sin((d+e)*u)*h,u=c-Math.cos((d+e)*u)*s,A={fill:AmCharts.adjustLuminosity(l.fill,-0.2),"stroke-opacity":0,"fill-opacity":l["fill-opacity"]},I=0;180<Math.abs(e)&&(I=1);d=a.set();var G;
q&&(r=n(10*r),t=n(10*t),y=n(10*y),z=n(10*z),v=n(10*v),w=n(10*w),E=n(10*E),u=n(10*u),b=n(10*b),k=n(10*k),c=n(10*c),f*=10,g*=10,h*=10,s*=10,1>Math.abs(e)&&1>=Math.abs(y-t)&&1>=Math.abs(E-w)&&(G=!0));e="";var B;p&&(A["fill-opacity"]=0,A["stroke-opacity"]=l["stroke-opacity"]/2,A.stroke=l.stroke);0<k&&(q?(B=" M"+r+","+(v+k)+" L"+t+","+(w+k),G||(B+=" A"+(b-f)+","+(k+c-g)+","+(b+f)+","+(k+c+g)+","+t+","+(w+k)+","+y+","+(E+k)),B+=" L"+z+","+(u+k),0<h&&(G||(B+=" B"+(b-h)+","+(k+c-s)+","+(b+h)+","+(k+c+s)+
","+z+","+(k+u)+","+r+","+(k+v)))):(B=" M"+r+","+(v+k)+" L"+t+","+(w+k)+(" A"+f+","+g+",0,"+I+",1,"+y+","+(E+k)+" L"+z+","+(u+k)),0<h&&(B+=" A"+h+","+s+",0,"+I+",0,"+r+","+(v+k))),B+=" Z",B=a.path(B,void 0,void 0,"1000,1000").attr(A),d.push(B),B=a.path(" M"+r+","+v+" L"+r+","+(v+k)+" L"+t+","+(w+k)+" L"+t+","+w+" L"+r+","+v+" Z",void 0,void 0,"1000,1000").attr(A),k=a.path(" M"+y+","+E+" L"+y+","+(E+k)+" L"+z+","+(u+k)+" L"+z+","+u+" L"+y+","+E+" Z",void 0,void 0,"1000,1000").attr(A),d.push(B),d.push(k));
q?(G||(e=" A"+n(b-f)+","+n(c-g)+","+n(b+f)+","+n(c+g)+","+n(t)+","+n(w)+","+n(y)+","+n(E)),f=" M"+n(r)+","+n(v)+" L"+n(t)+","+n(w)+e+" L"+n(z)+","+n(u)):f=" M"+r+","+v+" L"+t+","+w+(" A"+f+","+g+",0,"+I+",1,"+y+","+E)+" L"+z+","+u;0<h&&(q?G||(f+=" B"+(b-h)+","+(c-s)+","+(b+h)+","+(c+s)+","+z+","+u+","+r+","+v):f+=" A"+h+","+s+",0,"+I+",0,"+r+","+v);a.handDrawn&&(b=AmCharts.line(a,[r,t],[v,w],l.stroke,l.thickness*Math.random()*a.handDrawThickness,l["stroke-opacity"]),d.push(b));a=a.path(f+" Z",void 0,
void 0,"1000,1000").attr(l);if(m){b=[];for(c=0;c<m.length;c++)b.push(AmCharts.adjustLuminosity(l.fill,m[c]));0<b.length&&a.gradient("linearGradient",b)}a.pattern(p);d.push(a);return d};
AmCharts.adjustLuminosity=function(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",d,e;for(e=0;3>e;e++)d=parseInt(a.substr(2*e,2),16),d=Math.round(Math.min(Math.max(0,d+d*b),255)).toString(16),c+=("00"+d).substr(d.length);return c};AmCharts.Bezier=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l){"object"==typeof g&&(g=g[0]);"object"==typeof h&&(h=h[0]);f={fill:g,"fill-opacity":h,"stroke-width":f};void 0!==k&&0<k&&(f["stroke-dasharray"]=k);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d="M"+Math.round(b[0])+","+Math.round(c[0]);e=[];for(k=0;k<b.length;k++)e.push({x:Number(b[k]),y:Number(c[k])});1<e.length&&(b=this.interpolate(e),d+=this.drawBeziers(b));l?d+=l:AmCharts.VML||(d+="M0,0 L0,0");this.path=a.path(d).attr(f)},
interpolate:function(a){var b=[];b.push({x:a[0].x,y:a[0].y});var c=a[1].x-a[0].x,d=a[1].y-a[0].y,e=AmCharts.bezierX,f=AmCharts.bezierY;b.push({x:a[0].x+c/e,y:a[0].y+d/f});var g;for(g=1;g<a.length-1;g++){var h=a[g-1],k=a[g],d=a[g+1];isNaN(d.x)&&(d=k);isNaN(k.x)&&(k=h);isNaN(h.x)&&(h=k);c=d.x-k.x;d=d.y-h.y;h=k.x-h.x;h>c&&(h=c);b.push({x:k.x-h/e,y:k.y-d/f});b.push({x:k.x,y:k.y});b.push({x:k.x+h/e,y:k.y+d/f})}d=a[a.length-1].y-a[a.length-2].y;c=a[a.length-1].x-a[a.length-2].x;b.push({x:a[a.length-1].x-
c/e,y:a[a.length-1].y-d/f});b.push({x:a[a.length-1].x,y:a[a.length-1].y});return b},drawBeziers:function(a){var b="",c;for(c=0;c<(a.length-1)/3;c++)b+=this.drawBezierMidpoint(a[3*c],a[3*c+1],a[3*c+2],a[3*c+3]);return b},drawBezierMidpoint:function(a,b,c,d){var e=Math.round,f=this.getPointOnSegment(a,b,0.75),g=this.getPointOnSegment(d,c,0.75),h=(d.x-a.x)/16,k=(d.y-a.y)/16,l=this.getPointOnSegment(a,b,0.375);a=this.getPointOnSegment(f,g,0.375);a.x-=h;a.y-=k;b=this.getPointOnSegment(g,f,0.375);b.x+=
h;b.y+=k;c=this.getPointOnSegment(d,c,0.375);h=this.getMiddle(l,a);f=this.getMiddle(f,g);g=this.getMiddle(b,c);l=" Q"+e(l.x)+","+e(l.y)+","+e(h.x)+","+e(h.y);l+=" Q"+e(a.x)+","+e(a.y)+","+e(f.x)+","+e(f.y);l+=" Q"+e(b.x)+","+e(b.y)+","+e(g.x)+","+e(g.y);return l+=" Q"+e(c.x)+","+e(c.y)+","+e(d.x)+","+e(d.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}}});AmCharts.AmDraw=AmCharts.Class({construct:function(a,b,c,d){AmCharts.SVG_NS="http://www.w3.org/2000/svg";AmCharts.SVG_XLINK="http://www.w3.org/1999/xlink";AmCharts.hasSVG=!!document.createElementNS&&!!document.createElementNS(AmCharts.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");if(AmCharts.hasSVG){AmCharts.SVG=!0;var e=this.createSvgElement("svg");e.style.position="absolute";e.style.width=b+"px";e.style.height=c+
"px";b=this.createSvgElement("desc");b.appendChild(document.createTextNode("JavaScript chart by amCharts "+d.version));e.appendChild(b);AmCharts.rtl&&(e.setAttribute("direction","rtl"),e.style.left="auto",e.style.right="0px");e.setAttribute("version","1.1");a.appendChild(e);this.container=e;this.R=new AmCharts.SVGRenderer(this)}else AmCharts.isIE&&AmCharts.VMLRenderer&&(AmCharts.VML=!0,AmCharts.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?
(e=document.createStyleSheet(),e.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),AmCharts.vmlStyleSheet=e):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new AmCharts.VMLRenderer(this,d),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(AmCharts.SVG_NS,a)},circle:function(a,b,c,d){var e=new AmCharts.AmDObject("circle",this);e.attr({r:c,
cx:a,cy:b});this.addToContainer(e.node,d);return e},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,d,e,f,g){var h=new AmCharts.AmDObject("rect",this);AmCharts.VML&&(e=100*e/Math.min(c,d),c+=2*f,d+=2*f,h.bw=f,h.node.style.marginLeft=-f,h.node.style.marginTop=-f);1>c&&(c=1);1>d&&(d=1);h.attr({x:a,y:b,width:c,height:d,rx:e,ry:e,"stroke-width":f});this.addToContainer(h.node,g);return h},image:function(a,b,c,d,e,f){var g=new AmCharts.AmDObject("image",
this);g.attr({x:b,y:c,width:d,height:e});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,d){var e=new AmCharts.AmDObject("path",this);d||(d="100,100");e.attr({cs:d});c?e.attr({dd:a}):e.attr({d:a});this.addToContainer(e.node,b);return e},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=
this.container,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}a=1-c.e%1;c=1-c.f%1;0.5<a&&(a-=1);0.5<c&&(c-=1);a&&(b.left=a+"px");c&&(b.top=c+"px")},update:function(){this.R.update()}});AmCharts.AmDObject=AmCharts.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},
rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var d in a)if(a.hasOwnProperty(d)){var e=d,f=a[d];c=AmCharts.getEffect(c);this.R.animate(this,e,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},
hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;
c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,
"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(a){(a=this.animationX)&&AmCharts.removeFromArray(this.R.animations,a);(a=this.animationY)&&AmCharts.removeFromArray(this.R.animations,a)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,
a,b,c)},pattern:function(a,b){a&&this.R.pattern(this,a,b)}});AmCharts.VMLRenderer=AmCharts.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type="image";else{a.type=
"shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var e=document.createElement("amvml:fill");c.appendChild(e);a.fill=e;e.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var d;8===document.documentMode&&(d=!0);var e=a.node,f=a.type,
g=e.style;"r"==b&&(g.width=2*c,g.height=2*c);"roundrect"!=a.shapeType||"width"!=b&&"height"!=b||(c-=1);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-AmCharts.removePx(g.width)/2);"cy"==b&&(g.top=c-AmCharts.removePx(g.height)/2);var h=this.styleMap[b];void 0!==h&&(g[h]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,h=e.clientWidth,"end"==c&&(g.marginLeft=-h+"px"),"middle"==c&&(g.marginLeft=-(h/2)+"px",g.textAlign="center"),"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=
c));if(g=a.children)for(h=0;h<g.length;h++)g[h].setAttr(b,c);if("shape"==f){"cs"==b&&(e.style.width="100px",e.style.height="100px",e.setAttribute("coordsize",c));"d"==b&&e.setAttribute("path",this.svgPathToVml(c));"dd"==b&&e.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(d?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(d?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&(d?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),
3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),d?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?d?a.on=!1:a.setAttribute("on",!1):d?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(d?a.color=c:a.setAttribute("color",c));"rx"==b&&(d?e.arcSize=c+"%":e.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,b,c){var d=new AmCharts.AmDObject("text",this.D),e=d.node;e.style.whiteSpace="pre";e.innerHTML=
a;this.D.addToContainer(e,c);this.attr(d,b);return d},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,e=a.offsetHeight,f;if(a.hasChildNodes()){var g,h,k;for(k=0;k<a.childNodes.length;k++){f=this.getBox(a.childNodes[k]);var l=f.x;isNaN(l)||(isNaN(g)?g=l:l<g&&(g=l));var m=f.y;isNaN(m)||(isNaN(h)?h=m:m<h&&(h=m));l=f.width+l;isNaN(l)||(d=Math.max(d,l));f=f.height+m;isNaN(f)||(e=Math.max(e,f))}0>g&&(b+=g);0>h&&(c+=h)}return{x:b,y:c,width:d,
height:e}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var d=a.node,e=d.style;"text"==a.type&&(c-=AmCharts.removePx(e.fontSize)/2-1);"oval"==a.shapeType&&(b-=AmCharts.removePx(e.width)/2,c-=AmCharts.removePx(e.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(d.style.left=b+"px",d.style.top=c+"px")},svgPathToVml:function(a){var b=a.split(" ");a="";var c,d=Math.round,e;for(e=
0;e<b.length;e++){var f=b[e],g=f.substring(0,1),f=f.substring(1),h=f.split(","),k=d(h[0])+","+d(h[1]);"M"==g&&(a+=" m "+k);"L"==g&&(a+=" l "+k);"Z"==g&&(a+=" x e");if("Q"==g){var l=c.length,m=c[l-1],p=h[0],n=h[1],k=h[2],s=h[3];c=d(c[l-2]/3+2/3*p);m=d(m/3+2/3*n);p=d(2/3*p+k/3);n=d(2/3*n+s/3);a+=" c "+c+","+m+","+p+","+n+","+k+","+s}"A"==g&&(a+=" wa "+f);"B"==g&&(a+=" at "+f);c=h}return a},animate:function(a,b,c,d,e){var f=a.node,g=this.chart;if("translate"==b){b=c.split(",");c=b[1];var h=f.offsetTop;
g.animate(a,"left",f.offsetLeft,b[0],d,e,"px");g.animate(a,"top",h,c,d,e,"px")}},clipRect:function(a,b,c,d,e){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=e+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+e)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var d=a.node;a=d.style;c||(c=this.getBGColor(d.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/180;var e=Math.cos(c),f=Math.sin(c),g=AmCharts.removePx(a.left),h=AmCharts.removePx(a.top),
k=d.offsetWidth,d=d.offsetHeight;b/=Math.abs(b);a.left=g+k/2-k/2*Math.cos(c)-b*d/2*Math.sin(c)+3;a.top=h-b*k/2*Math.sin(c)+b*d/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+e+"', M12='"+-f+"', M21='"+f+"', M22='"+e+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new AmCharts.AmDObject("group",this.D);
this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var e="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++){var g=Math.round(100*f/(c.length-1)),e=e+(g+"% "+c[f]);f<c.length-1&&(e+=",")}a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",b),a.setAttribute("angle",d));e&&(a.colors.value=
e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){void 0!==typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"},pattern:function(a,b){var c=a.fill;a.node.fillColor="none";8===document.documentMode?(c.type="tile",c.src=b.url):(c.setAttribute("type","tile"),c.setAttribute("src",b.url))},update:function(){}});AmCharts.SVGRenderer=AmCharts.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(AmCharts.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,d,e){var f=a.node;a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=
f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:d,effect:e};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],d=1E3*c.time/AmCharts.updateRate,e=c.frame+1,f=c.obj,g=c.attribute,h,k,l;e<=d?(c.frame++,"translate"==g?(h=c.from.split(","),g=Number(h[0]),h=Number(h[1]),isNaN(h)&&(h=0),k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),l=0===l-g?l:
Math.round(AmCharts[c.effect](0,e,g,l-g,d)),c=0===k-h?k:Math.round(AmCharts[c.effect](0,e,h,k-h,d)),g="transform",c="translate("+l+","+c+")"):(k=Number(c.from),h=Number(c.to),l=h-k,c=AmCharts[c.effect](0,e,k,l,d),isNaN(c)&&(c=h),0===l&&this.animations.splice(a,1)),this.setAttr(f,g,c)):("translate"==g?(k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),f.translate(l,k)):(h=Number(c.to),this.setAttr(f,g,h)),this.animations.splice(a,1))}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,
height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(AmCharts.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,d,e){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var h=f.parentNode;h&&(f=document.createElementNS(AmCharts.SVG_NS,"clipPath"),g=AmCharts.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,d,e,0,0,f),h.appendChild(f),b="#",AmCharts.baseHref&&!AmCharts.isIE&&(b=window.location.href+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},text:function(a,b,
c){var d=new AmCharts.AmDObject("text",this.D);a=String(a).split("\n");var e=b["font-size"],f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(e+2)*f+Math.round(e/2));g.setAttribute("x",0);d.node.appendChild(g)}d.node.setAttribute("y",Math.round(e/2));this.attr(d,b);this.D.addToContainer(d.node,c);return d},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},move:function(a,
b,c,d){b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new AmCharts.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,d){var e=a.node,f=a.grad;f&&this.D.remove(f);b=document.createElementNS(AmCharts.SVG_NS,
b);f=AmCharts.getUniqueId();b.setAttribute("id",f);if(!isNaN(d)){var g=0,h=0,k=0,l=0;90==d?k=100:270==d?l=100:180==d?g=100:0===d&&(h=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",h+"%");b.setAttribute("y1",k+"%");b.setAttribute("y2",l+"%")}for(d=0;d<c.length;d++)g=document.createElementNS(AmCharts.SVG_NS,"stop"),h=100*d/(c.length-1),0===d&&(h=0),g.setAttribute("offset",h+"%"),g.setAttribute("stop-color",c[d]),b.appendChild(g);e.parentNode.appendChild(b);c="#";AmCharts.baseHref&&!AmCharts.isIE&&
(c=window.location.href+c);e.setAttribute("fill","url("+c+f+")");a.grad=b},pattern:function(a,b,c){var d=a.node;isNaN(c)&&(c=1);var e=a.patternNode;e&&this.D.remove(e);var e=document.createElementNS(AmCharts.SVG_NS,"pattern"),f=AmCharts.getUniqueId(),g=b;b.url&&(g=b.url);var h=Number(b.width);isNaN(h)&&(h=4);var k=Number(b.height);isNaN(k)&&(k=4);h/=c;k/=c;c=b.x;isNaN(c)&&(c=0);var l=-Math.random()*Number(b.randomX);isNaN(l)||(c=l);l=b.y;isNaN(l)&&(l=0);b=-Math.random()*Number(b.randomY);isNaN(b)||
(l=b);e.setAttribute("id",f);e.setAttribute("width",h);e.setAttribute("height",k);e.setAttribute("patternUnits","userSpaceOnUse");e.setAttribute("xlink:href",g);this.D.image(g,0,0,h,k,e).translate(c,l);g="#";AmCharts.baseHref&&!AmCharts.isIE&&(g=window.location.href+g);d.setAttribute("fill","url("+g+f+")");a.patternNode=e;d.parentNode.appendChild(e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}});AmCharts.AmDSet=AmCharts.Class({construct:function(a){this.create("g")},attr:function(a){this.R.attr(this.node,a)},move:function(a,b){this.R.move(this.node,a,b)}});AmCharts.AmLegend=AmCharts.Class({construct:function(a){this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderThickness=
this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=
!1;this.showEntries=!0;AmCharts.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];(AmCharts.ifArray(this.legendData)||AmCharts.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,d=a.divRealWidth,e=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.data);isNaN(this.fontSize)&&(this.fontSize=a.fontSize);if("right"==
b||"left"==b)this.maxColumns=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var h=a.autoMarginOffset;"bottom"==b?(this.marginBottom=h,this.marginTop=0):(this.marginTop=h,this.marginBottom=0)}var k;void 0!==c?k=AmCharts.toCoordinate(c,d):"right"!=b&&"left"!=b&&(k=a.realWidth);"outside"==b?(k=f.offsetWidth,e=f.offsetHeight,f.clientHeight&&(k=f.clientWidth,e=f.clientHeight)):(isNaN(k)||(f.style.width=k+"px"),
f.className="amChartsLegend");this.divWidth=k;this.container=new AmCharts.AmDraw(f,k,e,a);this.lx=0;this.ly=8;b=this.markerSize;b>this.fontSize&&(this.ly=b/2-1);0<b&&(this.lx+=b+this.markerLabelGap);this.titleWidth=0;if(b=this.title)a=AmCharts.text(this.container,b,this.color,a.fontFamily,this.fontSize,"start",!0),a.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=a.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=
0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+this.titleWidth,c=this.marginRight,d=this.marginTop,e=this.marginBottom,f=this.horizontalGap,g=this.div,h=this.divWidth,k=this.maxColumns,l=this.verticalGap,m=this.spacing,p=h-c-b,n=0,s=0,q=this.container,r=q.set();this.set=r;q=q.set();r.push(q);var u=this.entries,v,t;for(t=0;t<u.length;t++){v=u[t].getBBox();
var w=v.width;w>n&&(n=w);v=v.height;v>s&&(s=v)}var y=w=0,E=f;for(t=0;t<u.length;t++){var z=u[t];this.reversedOrder&&(z=u[u.length-t-1]);v=z.getBBox();var A;this.equalWidths?A=f+y*(n+m+this.markerLabelGap):(A=E,E=E+v.width+f+m);A+v.width>p&&0<t&&0!==y&&(w++,y=0,A=f,E=A+v.width+f+m);z.translate(A,(s+l)*w);y++;!isNaN(k)&&y>=k&&(y=0,w++);q.push(z)}v=q.getBBox();k=v.height+2*l-1;"left"==a||"right"==a?(h=v.width+2*f,g.style.width=h+b+c+"px"):h=h-b-c-1;c=AmCharts.polygon(this.container,[0,h,h,0],[0,0,k,
k],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);r.push(c);r.translate(b,d);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?b=f+(h-v.width)/2:"right"==this.align&&(b=f+h-v.width);q.translate(b,l+1);this.titleHeight>k&&(k=this.titleHeight);a=k+d+e+1;0>a&&(a=0);g.style.height=Math.round(a)+"px"},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,c=a.markerType;c||(c=this.markerType);var d=a.color,e=a.alpha;a.legendKeyColor&&
(d=a.legendKeyColor());a.legendKeyAlpha&&(e=a.legendKeyAlpha());var f;!0===a.hidden&&(f=d=this.markerDisabledColor);var g=a.pattern,h=a.customMarker;h||(h=this.customMarker);var k=this.container,l=this.markerSize,m=0,p=0,n=l/2;if(this.useGraphSettings)if(m=a.type,this.switchType=void 0,"line"==m||"step"==m||"smoothedLine"==m||"ohlc"==m)g=k.set(),a.hidden||(d=a.lineColorR,f=a.bulletBorderColorR),p=AmCharts.line(k,[0,2*l],[l/2,l/2],d,a.lineAlpha,a.lineThickness,a.dashLength),g.push(p),a.bullet&&(a.hidden||
(d=a.bulletColorR),p=AmCharts.bullet(k,a.bullet,a.bulletSize,d,a.bulletAlpha,a.bulletBorderThickness,f,a.bulletBorderAlpha))&&(p.translate(l+1,l/2),g.push(p)),n=0,m=l,p=l/3;else{var s;a.getGradRotation&&(s=a.getGradRotation());m=a.fillColorsR;!0===a.hidden&&(m=d);if(g=this.createMarker("rectangle",m,a.fillAlphas,a.lineThickness,d,a.lineAlpha,s,g))n=l,g.translate(n,l/2);m=l}else h?(b.path&&(h=b.path+h),g=k.image(h,0,0,l,l)):(g=this.createMarker(c,d,e,void 0,void 0,void 0,void 0,g))&&g.translate(l/
2,l/2);this.addListeners(g,a);k=k.set([g]);this.switchable&&k.setAttr("cursor","pointer");(f=this.switchType)&&"none"!=f&&("x"==f?(s=this.createX(),s.translate(l/2,l/2)):s=this.createV(),s.dItem=a,!0!==a.hidden?"x"==f?s.hide():s.show():"x"!=f&&s.hide(),this.switchable||s.hide(),this.addListeners(s,a),a.legendSwitch=s,k.push(s));f=this.color;a.showBalloon&&this.textClickEnabled&&void 0!==this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=d);!0===a.hidden&&(f=this.markerDisabledColor);
d=AmCharts.massReplace(this.labelText,{"[[title]]":a.title});s=this.fontSize;g&&l<=s&&g.translate(n,l/2+this.ly-s/2+(s+2-l)/2-p);var q;d&&(d=AmCharts.fixBrakes(d),a.legendTextReal=d,q=AmCharts.text(this.container,d,f,b.fontFamily,s,"start"),q.translate(this.lx+m,this.ly),k.push(q),b=q.getBBox().width,this.maxLabelWidth<b&&(this.maxLabelWidth=b));this.entries[this.index]=k;a.legendEntry=this.entries[this.index];a.legendLabel=q;this.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(){c.rollOverMarker(b)}).mouseout(function(){c.rollOutMarker(b)}).click(function(){c.clickMarker(b)})},
rollOverMarker:function(a){this.switchable&&this.dispatch("rollOverMarker",a);this.dispatch("rollOverItem",a)},rollOutMarker:function(a){this.switchable&&this.dispatch("rollOutMarker",a);this.dispatch("rollOutItem",a)},clickMarker:function(a){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a):this.dispatch("hideItem",a));this.dispatch("clickMarker",a)},rollOverLabel:function(a){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),this.dispatch("rollOverItem",
a))},rollOutLabel:function(a){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var b=this.color;void 0!==this.selectedColor&&a.showBalloon&&(b=this.selectedColor);this.useMarkerColorForLabels&&(b=a.lineColor,void 0===b&&(b=a.color));a.legendLabel.attr({fill:b})}this.dispatch("rollOutItem",a)}},clickLabel:function(a){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a):this.dispatch("hideItem",a))},dispatch:function(a,b){this.fire(a,
{type:a,dataItem:b,target:this,chart:this.chart})},createValue:function(a){var b=this,c=b.fontSize;if(!1!==a.visibleInLegend){var d=b.maxLabelWidth;b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&(d=a.legendEntry.getBBox().width);var e=d;if(b.valueText&&0<b.valueWidth){var f=b.color;b.useMarkerColorForValues&&(f=a.color,a.legendKeyColor&&(f=a.legendKeyColor()));!0===a.hidden&&(f=b.markerDisabledColor);var g=b.valueText,d=d+b.lx+b.markerLabelGap+b.valueWidth,h="end";"left"==b.valueAlign&&
(d-=b.valueWidth,h="start");f=AmCharts.text(b.container,g,f,b.chart.fontFamily,c,h);f.translate(d,b.ly);b.entries[b.index].push(f);e+=b.valueWidth+2*b.markerLabelGap;f.dItem=a;b.valueLabels.push(f)}b.index++;f=b.markerSize;f<c+7&&(f=c+7,AmCharts.VML&&(f+=3));c=b.container.rect(b.markerSize,0,e,f,0,0).attr({stroke:"none",fill:"#ffffff","fill-opacity":0.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(){b.rollOverLabel(a)}).mouseout(function(){b.rollOutLabel(a)}).click(function(){b.clickLabel(a)})}},
createV:function(){var a=this.markerSize;return AmCharts.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,d=AmCharts.line(c,[-a,a],[-a,a]).attr(b),a=AmCharts.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([d,a])},createMarker:function(a,b,c,d,e,f,g,h){var k=this.markerSize,l=this.container;e||(e=this.markerBorderColor);e||(e=b);isNaN(d)&&(d=this.markerBorderThickness);
isNaN(f)&&(f=this.markerBorderAlpha);return AmCharts.bullet(l,a,k,b,c,d,e,f,k,g,h)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,d=this.data;for(c=0;c<a.length;c++){var e=a[c],f=e.dItem,g=" ";if(d)f.value?e.text(f.value):e.text("");else{if(void 0!==f.type){var h=f.currentDataItem,k=this.periodValueText;f.legendPeriodValueText&&(k=f.legendPeriodValueText);h?(g=this.valueText,f.legendValueText&&(g=f.legendValueText),g=b.formatString(g,h)):
k&&(g=b.formatPeriodString(k,f))}else g=b.formatString(this.valueText,f);(h=f.legendLabel)&&h.text(f.legendTextReal);e.text(g)}}},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";AmCharts.remove(this.set)}});AmCharts.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};AmCharts.extractPeriod=function(a){var b=AmCharts.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};
AmCharts.resetDateToMin=function(a,b,c,d){void 0===d&&(d=1);var e,f,g,h,k,l,m;AmCharts.useUTC?(e=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),h=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds(),a=a.getUTCDay()):(e=a.getFullYear(),f=a.getMonth(),g=a.getDate(),h=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),m=a.getMilliseconds(),a=a.getDay());switch(b){case "YYYY":e=Math.floor(e/c)*c;f=0;g=1;m=l=k=h=0;break;case "MM":f=Math.floor(f/c)*c;g=1;m=l=k=h=0;break;case "WW":0===
a&&0<d&&(a=7);g=g-a+d;m=l=k=h=0;break;case "DD":m=l=k=h=0;break;case "hh":h=Math.floor(h/c)*c;m=l=k=0;break;case "mm":k=Math.floor(k/c)*c;m=l=0;break;case "ss":l=Math.floor(l/c)*c;m=0;break;case "fff":m=Math.floor(m/c)*c}AmCharts.useUTC?(a=new Date,a.setUTCFullYear(e,f,g),a.setUTCHours(h,k,l,m)):a=new Date(e,f,g,h,k,l,m);return a};
AmCharts.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case "YYYY":c=316224E5;break;case "MM":c=26784E5;break;case "WW":c=6048E5;break;case "DD":c=864E5;break;case "hh":c=36E5;break;case "mm":c=6E4;break;case "ss":c=1E3;break;case "fff":c=1}return c*b};AmCharts.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};
AmCharts.getMaxInterval=function(a,b){var c=AmCharts.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,AmCharts.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};AmCharts.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");AmCharts.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");AmCharts.monthNames="January February March April May June July August September October November December".split(" ");AmCharts.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
AmCharts.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};
AmCharts.stringToDate=function(a,b){var c={},d=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",
period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],e=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(e=!1));var f=b,g,h,k;for(k=0;k<d.length;k++)h=d[k].period,c[h]=0,"date"==h&&(c[h]=1);for(k=0;k<d.length;k++)if(g=d[k].pattern,h=d[k].period,-1!=b.indexOf(g)){var l=AmCharts.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==
g||"L"==g)e||(l+=12);c[h]=l}return new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds)};AmCharts.getFromDateString=function(a,b,c){c=c.indexOf(a);b=b.substr(c,a.length);"0"==b.charAt(0)&&(b=b.substr(1,b.length-1));b=Number(b);isNaN(b)&&(b=0);-1!=a.indexOf("M")&&b--;return b};
AmCharts.formatDate=function(a,b){var c,d,e,f,g,h,k,l,m=AmCharts.getWeekNumber(a);AmCharts.useUTC?(c=a.getUTCFullYear(),d=a.getUTCMonth(),e=a.getUTCDate(),f=a.getUTCDay(),g=a.getUTCHours(),h=a.getUTCMinutes(),k=a.getUTCSeconds(),l=a.getUTCMilliseconds()):(c=a.getFullYear(),d=a.getMonth(),e=a.getDate(),f=a.getDay(),g=a.getHours(),h=a.getMinutes(),k=a.getSeconds(),l=a.getMilliseconds());var p=String(c).substr(2,2),n=d+1;9>d&&(n="0"+n);var s="0"+f;b=b.replace(/W/g,m);m=g;24==m&&(m=0);var q=m;10>q&&(q=
"0"+q);b=b.replace(/JJ/g,q);b=b.replace(/J/g,m);q=g;0===q&&(q=24,-1!=b.indexOf("H")&&e--);m=e;10>e&&(m="0"+e);var r=q;10>r&&(r="0"+r);b=b.replace(/HH/g,r);b=b.replace(/H/g,q);q=g;11<q&&(q-=12);r=q;10>r&&(r="0"+r);b=b.replace(/KK/g,r);b=b.replace(/K/g,q);q=g;0===q&&(q=12);12<q&&(q-=12);r=q;10>r&&(r="0"+r);b=b.replace(/LL/g,r);b=b.replace(/L/g,q);q=h;10>q&&(q="0"+q);b=b.replace(/NN/g,q);b=b.replace(/N/g,h);h=k;10>h&&(h="0"+h);b=b.replace(/SS/g,h);b=b.replace(/S/g,k);k=l;10>k&&(k="00"+k);100>k&&(k="0"+
k);h=l;10>h&&(h="00"+h);b=b.replace(/QQQ/g,k);b=b.replace(/QQ/g,h);b=b.replace(/Q/g,l);b=12>g?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,c);b=b.replace(/@II@/g,
p);b=b.replace(/@XXXX@/g,AmCharts.monthNames[d]);b=b.replace(/@XXX@/g,AmCharts.shortMonthNames[d]);b=b.replace(/@XX@/g,n);b=b.replace(/@X@/g,d+1);b=b.replace(/@RR@/g,m);b=b.replace(/@R@/g,e);b=b.replace(/@PPPP@/g,AmCharts.dayNames[f]);b=b.replace(/@PPP@/g,AmCharts.shortDayNames[f]);b=b.replace(/@PP@/g,s);return b=b.replace(/@P@/g,f)};
AmCharts.changeDate=function(a,b,c,d,e){var f=-1;void 0===d&&(d=!0);void 0===e&&(e=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setFullYear(a.getFullYear()+c*f);d||e||a.setDate(a.getDate()+1);break;case "MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);d||e||a.setDate(a.getDate()+1);break;case "DD":a.setDate(a.getDate()+c*f);break;case "WW":a.setDate(a.getDate()+c*f*7);break;case "hh":a.setHours(a.getHours()+c*f);break;case "mm":a.setMinutes(a.getMinutes()+
c*f);break;case "ss":a.setSeconds(a.getSeconds()+c*f);break;case "fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};
AmCharts.AmStockChart=AmCharts.Class({construct:function(a){this.type="stock";this.cname="AmStockChart";this.version="3.4.8";this.theme=a;this.createEvents("zoomed","rollOverStockEvent","rollOutStockEvent","clickStockEvent","panelRemoved","dataUpdated","init","rendered","drawn");this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");this.firstDayOfWeek=1;this.glueToTheEnd=!1;this.dataSetCounter=-1;this.zoomOutOnDataSetChange=
!1;this.panels=[];this.dataSets=[];this.chartCursors=[];this.comparedDataSets=[];this.categoryAxesSettings=new AmCharts.CategoryAxesSettings(a);this.valueAxesSettings=new AmCharts.ValueAxesSettings(a);this.panelsSettings=new AmCharts.PanelsSettings(a);this.chartScrollbarSettings=new AmCharts.ChartScrollbarSettings(a);this.chartCursorSettings=new AmCharts.ChartCursorSettings(a);this.stockEventsSettings=new AmCharts.StockEventsSettings(a);this.legendSettings=new AmCharts.LegendSettings(a);this.balloon=
new AmCharts.AmBalloon(a);this.previousEndDate=new Date(0);this.previousStartDate=new Date(0);this.dataSetCount=this.graphCount=0;this.chartCreated=!1;AmCharts.applyTheme(this,a,this.cname)},write:function(a){var b=this.theme,c=this.exportConfig;c&&AmCharts.AmExport&&!this.AmExport&&(this.AmExport=new AmCharts.AmExport(this,c));this.chartRendered=!1;a="object"!=typeof a?document.getElementById(a):a;this.zoomOutOnDataSetChange&&(this.endDate=this.startDate=void 0);this.categoryAxesSettings=AmCharts.processObject(this.categoryAxesSettings,
AmCharts.CategoryAxesSettings,b);this.valueAxesSettings=AmCharts.processObject(this.valueAxesSettings,AmCharts.ValueAxesSettings,b);this.chartCursorSettings=AmCharts.processObject(this.chartCursorSettings,AmCharts.ChartCursorSettings,b);this.chartScrollbarSettings=AmCharts.processObject(this.chartScrollbarSettings,AmCharts.ChartScrollbarSettings,b);this.legendSettings=AmCharts.processObject(this.legendSettings,AmCharts.LegendSettings,b);this.panelsSettings=AmCharts.processObject(this.panelsSettings,
AmCharts.PanelsSettings,b);this.stockEventsSettings=AmCharts.processObject(this.stockEventsSettings,AmCharts.StockEventsSettings,b);this.dataSetSelector&&(this.dataSetSelector=AmCharts.processObject(this.dataSetSelector,AmCharts.DataSetSelector,b));this.periodSelector&&(this.periodSelector=AmCharts.processObject(this.periodSelector,AmCharts.PeriodSelector,b));a.innerHTML="";this.div=a;this.measure();this.createLayout();this.updateDataSets();this.addDataSetSelector();this.addPeriodSelector();this.addPanels();
this.updatePanels();this.addChartScrollbar();this.updateData();this.skipDefault||this.setDefaultPeriod()},setDefaultPeriod:function(a){var b=this.periodSelector;b&&(this.animationPlayed=!1,b.setDefaultPeriod(a))},validateSize:function(){var a,b=this.panels;this.measurePanels();for(a=0;a<b.length;a++)panel=b[a],panel.invalidateSize()},updateDataSets:function(){var a=this.mainDataSet,b=this.dataSets,c;for(c=0;c<b.length;c++){var d=b[c],d=AmCharts.processObject(d,AmCharts.DataSet);b[c]=d;d.id||(this.dataSetCount++,
d.id="ds"+this.dataSetCount);void 0===d.color&&(d.color=this.colors.length-1>c?this.colors[c]:AmCharts.randomColor())}!a&&AmCharts.ifArray(b)&&(this.mainDataSet=this.dataSets[0])},updateEvents:function(a){AmCharts.ifArray(a.stockEvents)&&AmCharts.parseEvents(a,this.panels,this.stockEventsSettings,this.firstDayOfWeek,this,this.dataDateFormat)},getLastDate:function(a){var b=this.dataDateFormat;a=a instanceof Date?new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),
a.getMilliseconds()):b?AmCharts.stringToDate(a,b):new Date(a);return new Date(AmCharts.changeDate(a,this.categoryAxesSettings.minPeriod,1,!0).getTime()-1)},getFirstDate:function(a){var b=this.dataDateFormat;a=a instanceof Date?new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds()):b?AmCharts.stringToDate(a,b):new Date(a);return new Date(AmCharts.resetDateToMin(a,this.categoryAxesSettings.minPeriod,1,this.firstDayOfWeek))},updateData:function(){var a=
this.mainDataSet;if(a){var b=this.categoryAxesSettings;-1==AmCharts.getItemIndex(b.minPeriod,b.groupToPeriods)&&b.groupToPeriods.unshift(b.minPeriod);var c=a.dataProvider;if(AmCharts.ifArray(c)){var d=a.categoryField;this.firstDate=this.getFirstDate(c[0][d]);this.lastDate=this.getLastDate(c[c.length-1][d]);this.periodSelector&&this.periodSelector.setRanges(this.firstDate,this.lastDate);a.dataParsed||(AmCharts.parseStockData(a,b.minPeriod,b.groupToPeriods,this.firstDayOfWeek,this.dataDateFormat),a.dataParsed=
!0);this.updateComparingData();this.updateEvents(a)}else this.lastDate=this.firstDate=void 0;this.glueToTheEnd&&this.startDate&&this.endDate&&this.lastDate&&(AmCharts.getPeriodDuration(b.minPeriod),this.startDate=new Date(this.startDate.getTime()+(this.lastDate.getTime()-this.endDate.getTime())),this.endDate=this.lastDate,this.updateScrollbar=!0);this.updatePanelsWithNewData()}a={type:"dataUpdated",chart:this};this.fire(a.type,a)},updateComparingData:function(){var a=this.comparedDataSets,b=this.categoryAxesSettings,
c;for(c=0;c<a.length;c++){var d=a[c];d.dataParsed||(AmCharts.parseStockData(d,b.minPeriod,b.groupToPeriods,this.firstDayOfWeek,this.dataDateFormat),d.dataParsed=!0);this.updateEvents(d)}},createLayout:function(){var a=this.div,b,c,d=document.createElement("div");d.style.position="relative";this.containerDiv=d;a.appendChild(d);if(a=this.periodSelector)b=a.position;if(a=this.dataSetSelector)c=a.position;if("left"==b||"left"==c)a=document.createElement("div"),a.style.cssFloat="left",a.style.styleFloat=
"left",a.style.width="0px",a.style.position="absolute",d.appendChild(a),this.leftContainer=a;if("right"==b||"right"==c)b=document.createElement("div"),b.style.cssFloat="right",b.style.styleFloat="right",b.style.width="0px",d.appendChild(b),this.rightContainer=b;b=document.createElement("div");d.appendChild(b);this.centerContainer=b;d=document.createElement("div");b.appendChild(d);this.panelsContainer=d},addPanels:function(){this.measurePanels();for(var a=this.panels,b=0;b<a.length;b++){var c=a[b],
c=AmCharts.processObject(c,AmCharts.StockPanel,this.theme);a[b]=c;this.addStockPanel(c,b)}this.panelsAdded=!0},measurePanels:function(){this.measure();var a=this.chartScrollbarSettings,b=this.divRealHeight,c=this.panelsSettings.panelSpacing;a.enabled&&(b-=a.height);(a=this.periodSelector)&&!a.vertical&&(a=a.offsetHeight,b-=a+c);(a=this.dataSetSelector)&&!a.vertical&&(a=a.offsetHeight,b-=a+c);a=this.panels;this.panelsContainer.style.height=b+"px";this.chartCursors=[];var d=0,e,h;for(e=0;e<a.length;e++){h=
a[e];var f=h.percentHeight;isNaN(f)&&(f=100/a.length,h.percentHeight=f);d+=f}this.panelsHeight=Math.max(b-c*(a.length-1),0);for(e=0;e<a.length;e++)h=a[e],h.percentHeight=h.percentHeight/d*100,h.panelBox&&(h.panelBox.style.height=Math.round(h.percentHeight*this.panelsHeight/100)+"px")},addStockPanel:function(a,b){var c=this.panelsSettings,d=document.createElement("div");d.className="amChartsPanel";0<b&&!this.panels[b-1].showCategoryAxis&&(d.style.marginTop=c.panelSpacing+"px");a.panelBox=d;a.stockChart=
this;a.id||(a.id="stockPanel"+b);a.pathToImages=this.pathToImages;d.style.height=Math.round(a.percentHeight*this.panelsHeight/100)+"px";d.style.width="100%";this.panelsContainer.appendChild(d);0<c.backgroundAlpha&&(d.style.backgroundColor=c.backgroundColor);if(d=a.stockLegend)d.container=void 0,d.title=a.title,d.marginLeft=c.marginLeft,d.marginRight=c.marginRight,d.verticalGap=3,d.position="top",AmCharts.copyProperties(this.legendSettings,d),a.addLegend(d,d.divId);a.zoomOutText="";a.removeChartCursor();
this.addCursor(a)},enableCursors:function(a){var b=this.chartCursors,c;for(c=0;c<b.length;c++)b[c].enabled=a},updatePanels:function(){var a=this.panels,b;for(b=0;b<a.length;b++)this.updatePanel(a[b]);this.mainDataSet&&this.updateGraphs();this.currentPeriod=void 0},updatePanel:function(a){a.seriesIdField="amCategoryIdField";a.dataProvider=[];a.chartData=[];a.graphs=[];var b=a.categoryAxis,c=this.categoryAxesSettings;AmCharts.copyProperties(this.panelsSettings,a);AmCharts.copyProperties(c,b);b.parseDates=
!0;a.zoomOutOnDataUpdate=!1;a.mouseWheelScrollEnabled=this.mouseWheelScrollEnabled;a.showCategoryAxis?"top"==b.position?a.marginTop=c.axisHeight:a.marginBottom=c.axisHeight:(a.categoryAxis.labelsEnabled=!1,a.chartCursor&&(a.chartCursor.categoryBalloonEnabled=!1));var c=a.valueAxes,d=c.length,e;0===d&&(e=new AmCharts.ValueAxis(this.theme),a.addValueAxis(e));b=new AmCharts.AmBalloon(this.theme);AmCharts.copyProperties(this.balloon,b);a.balloon=b;c=a.valueAxes;d=c.length;for(b=0;b<d;b++)e=c[b],AmCharts.copyProperties(this.valueAxesSettings,
e);a.listenersAdded=!1;a.write(a.panelBox)},zoom:function(a,b){this.zoomChart(a,b)},zoomOut:function(){this.zoomChart(this.firstDate,this.lastDate)},updatePanelsWithNewData:function(){var a=this.mainDataSet,b=this.scrollbarChart;if(a){var c=this.panels;this.currentPeriod=void 0;var d;for(d=0;d<c.length;d++){var e=c[d];e.categoryField=a.categoryField;0===a.dataProvider.length&&(e.dataProvider=[]);e.scrollbarChart=b}b&&(c=this.categoryAxesSettings,d=c.minPeriod,b.categoryField=a.categoryField,0<a.dataProvider.length?
(e=this.chartScrollbarSettings.usePeriod,b.dataProvider=e?a.agregatedDataProviders[e]:a.agregatedDataProviders[d]):b.dataProvider=[],e=b.categoryAxis,e.minPeriod=d,e.firstDayOfWeek=this.firstDayOfWeek,e.equalSpacing=c.equalSpacing,e.markPeriodChange=c.markPeriodChange,b.bbsetr=!0,b.validateData());0<a.dataProvider.length&&this.zoomChart(this.startDate,this.endDate)}this.panelDataInvalidated=!1},addChartScrollbar:function(){var a=this.chartScrollbarSettings,b=this.scrollbarChart;b&&(b.clear(),b.destroy());
if(a.enabled){var c=this.panelsSettings,d=this.categoryAxesSettings,b=new AmCharts.AmSerialChart(this.theme);b.pathToImages=this.pathToImages;b.autoMargins=!1;this.scrollbarChart=b;b.id="scrollbarChart";b.scrollbarOnly=!0;b.zoomOutText="";b.panEventsEnabled=this.panelsSettings.panEventsEnabled;b.marginLeft=c.marginLeft;b.marginRight=c.marginRight;b.marginTop=0;b.marginBottom=0;var c=d.dateFormats,e=b.categoryAxis;e.boldPeriodBeginning=d.boldPeriodBeginning;c&&(e.dateFormats=d.dateFormats);e.labelsEnabled=
!1;e.parseDates=!0;d=a.graph;if(AmCharts.isString(d)){c=this.panels;for(e=0;e<c.length;e++){var h=AmCharts.getObjById(c[e].stockGraphs,a.graph);h&&(d=h)}a.graph=d}var f;d&&(f=new AmCharts.AmGraph(this.theme),f.valueField=d.valueField,f.periodValue=d.periodValue,f.type=d.type,f.connect=d.connect,b.addGraph(f));d=new AmCharts.ChartScrollbar(this.theme);b.addChartScrollbar(d);AmCharts.copyProperties(a,d);d.scrollbarHeight=a.height;d.graph=f;this.listenTo(d,"zoomed",this.handleScrollbarZoom);f=document.createElement("div");
f.style.height=a.height+"px";d=this.periodSelectorContainer;c=this.periodSelector;e=this.centerContainer;"bottom"==a.position?c?"bottom"==c.position?e.insertBefore(f,d):e.appendChild(f):e.appendChild(f):c?"top"==c.position?e.insertBefore(f,d.nextSibling):e.insertBefore(f,e.firstChild):e.insertBefore(f,e.firstChild);b.write(f)}},handleScrollbarZoom:function(a){if(this.skipScrollbarEvent)this.skipScrollbarEvent=!1;else{var b=a.endDate,c={};c.startDate=a.startDate;c.endDate=b;this.updateScrollbar=!1;
this.handleZoom(c)}},addPeriodSelector:function(){var a=this.periodSelector;if(a){var b=this.categoryAxesSettings.minPeriod;a.minDuration=AmCharts.getPeriodDuration(b);a.minPeriod=b;a.chart=this;var c=this.dataSetSelector,d,b=this.dssContainer;c&&(d=c.position);var c=this.panelsSettings.panelSpacing,e=document.createElement("div");this.periodSelectorContainer=e;var h=this.leftContainer,f=this.rightContainer,g=this.centerContainer,k=this.panelsContainer,m=a.width+2*c+"px";switch(a.position){case "left":h.style.width=
a.width+"px";h.appendChild(e);g.style.paddingLeft=m;break;case "right":g.style.marginRight=m;f.appendChild(e);f.style.width=a.width+"px";break;case "top":k.style.clear="both";g.insertBefore(e,k);e.style.paddingBottom=c+"px";e.style.overflow="hidden";break;case "bottom":e.style.marginTop=c+"px","bottom"==d?g.insertBefore(e,b):g.appendChild(e)}this.listenTo(a,"changed",this.handlePeriodSelectorZoom);a.write(e)}},addDataSetSelector:function(){var a=this.dataSetSelector;if(a){a.chart=this;a.dataProvider=
this.dataSets;var b=a.position,c=this.panelsSettings.panelSpacing,d=document.createElement("div");this.dssContainer=d;var e=this.leftContainer,h=this.rightContainer,f=this.centerContainer,g=this.panelsContainer,c=a.width+2*c+"px";switch(b){case "left":e.style.width=a.width+"px";e.appendChild(d);f.style.paddingLeft=c;break;case "right":f.style.marginRight=c;h.appendChild(d);h.style.width=a.width+"px";break;case "top":g.style.clear="both";f.insertBefore(d,g);d.style.overflow="hidden";break;case "bottom":f.appendChild(d)}a.write(d)}},
handlePeriodSelectorZoom:function(a){var b=this.scrollbarChart;b&&(b.updateScrollbar=!0);a.predefinedPeriod?(this.predefinedStart=a.startDate,this.predefinedEnd=a.endDate):this.predefinedEnd=this.predefinedStart=null;this.zoomChart(a.startDate,a.endDate)},addCursor:function(a){var b=this.chartCursorSettings;if(b.enabled){var c=new AmCharts.ChartCursor(this.theme);AmCharts.copyProperties(b,c);a.removeChartCursor();a.addChartCursor(c);this.listenTo(c,"changed",this.handleCursorChange);this.listenTo(c,
"onHideCursor",this.hideChartCursor);this.listenTo(c,"zoomed",this.handleCursorZoom);this.chartCursors.push(c)}},hideChartCursor:function(){var a=this.chartCursors,b;for(b=0;b<a.length;b++){var c=a[b];c.hideCursor(!1);(c=c.chart)&&c.updateLegendValues()}},handleCursorZoom:function(a){var b=this.scrollbarChart;b&&(b.updateScrollbar=!0);var b={},c;if(this.categoryAxesSettings.equalSpacing){var d=this.mainDataSet.categoryField,e=this.mainDataSet.agregatedDataProviders[this.currentPeriod];c=new Date(e[a.start][d]);
a=new Date(e[a.end][d])}else c=new Date(a.start),a=new Date(a.end);b.startDate=c;b.endDate=a;this.handleZoom(b)},handleZoom:function(a){this.zoomChart(a.startDate,a.endDate)},zoomChart:function(a,b){var c=new Date(a),d=this,e=d.firstDate,h=d.lastDate,f=d.currentPeriod,g=d.categoryAxesSettings,k=g.minPeriod,m=d.panelsSettings,p=d.periodSelector,x=d.panels,t=d.comparedGraphs,w=d.scrollbarChart,y=d.firstDayOfWeek;if(e&&h){a||(a=e);b||(b=h);if(f){var n=AmCharts.extractPeriod(f);a.getTime()==b.getTime()&&
n!=k&&(b=AmCharts.changeDate(b,n.period,n.count),b.setTime(b.getTime()-1))}a.getTime()<e.getTime()&&(a=e);a.getTime()>h.getTime()&&(a=h);b.getTime()<e.getTime()&&(b=e);b.getTime()>h.getTime()&&(b=h);h=AmCharts.getItemIndex(k,g.groupToPeriods);e=f;f=d.choosePeriod(h,a,b);d.currentPeriod=f;h=AmCharts.extractPeriod(f);AmCharts.getPeriodDuration(h.period,h.count);AmCharts.getPeriodDuration(k);1>b.getTime()-a.getTime()&&(a=new Date(b.getTime()-1));k=new Date(a);for(g=0;g<x.length;g++){n=x[g];if(f!=e){var u;
for(u=0;u<t.length;u++){var q=t[u].graph;q.dataProvider=q.dataSet.agregatedDataProviders[f]}u=n.categoryAxis;u.firstDayOfWeek=y;u.minPeriod=f;n.dataProvider=d.mainDataSet.agregatedDataProviders[f];if(u=n.chartCursor)u.categoryBalloonDateFormat=d.chartCursorSettings.categoryBalloonDateFormat(h.period),n.showCategoryAxis||(u.categoryBalloonEnabled=!1);n.startTime=k.getTime();n.endTime=b.getTime();n.validateData(!0)}u=!1;n.chartCursor&&n.chartCursor.panning&&(u=!0);u||(n.startTime=void 0,n.endTime=void 0,
n.zoomToDates(c,b));0<m.startDuration&&d.animationPlayed?(n.startDuration=0,n.animateAgain()):0<m.startDuration&&n.animateAgain()}d.animationPlayed=!0;AmCharts.extractPeriod(f);c=new Date(b);w&&d.updateScrollbar&&(w.zoomToDates(a,c),d.skipScrollbarEvent=!0,setTimeout(function(){d.resetSkip.call(d)},100));d.updateScrollbar=!0;d.startDate=a;d.endDate=b;p&&p.zoom(a,b);if(a.getTime()!=d.previousStartDate.getTime()||b.getTime()!=d.previousEndDate.getTime())p={type:"zoomed"},p.startDate=a,p.endDate=b,p.chart=
d,p.period=f,d.fire(p.type,p),d.previousStartDate=new Date(a),d.previousEndDate=new Date(b)}d.eventsHidden&&d.showHideEvents(!1);d.chartCreated||(f="init",d.fire(f,{type:f,chart:d}));d.chartRendered||(f="rendered",d.fire(f,{type:f,chart:d}),d.chartRendered=!0);f="drawn";d.fire(f,{type:f,chart:d});d.chartCreated=!0;d.animationPlayed=!0},resetSkip:function(){this.skipScrollbarEvent=!1},updateGraphs:function(){this.getSelections();if(0<this.dataSets.length){var a=this.panels;this.comparedGraphs=[];var b;
for(b=0;b<a.length;b++){var c=a[b],d=c.valueAxes,e;for(e=0;e<d.length;e++){var h=d[e];h.prevLog&&(h.logarithmic=h.prevLog);h.recalculateToPercents="always"==c.recalculateToPercents?!0:!1}d=this.mainDataSet;e=this.comparedDataSets;h=c.stockGraphs;c.graphs=[];var f;for(f=0;f<h.length;f++){var g=h[f],g=AmCharts.processObject(g,AmCharts.StockGraph,this.theme);h[f]=g;if(!g.title||g.resetTitleOnDataSetChange)g.title=d.title,g.resetTitleOnDataSetChange=!0;g.useDataSetColors&&(g.lineColor=d.color,g.fillColors=
void 0,g.bulletColor=void 0);c.addGraph(g);var k=!1;"always"==c.recalculateToPercents&&(k=!0);var m=c.stockLegend,p,x,t,w;m&&(m=AmCharts.processObject(m,AmCharts.StockLegend,this.theme),c.stockLegend=m,p=m.valueTextComparing,x=m.valueTextRegular,t=m.periodValueTextComparing,w=m.periodValueTextRegular);if(g.comparable){var y=e.length;0<y&&g.valueAxis.logarithmic&&"never"!=c.recalculateToPercents&&(g.valueAxis.logarithmic=!1,g.valueAxis.prevLog=!0);0<y&&"whenComparing"==c.recalculateToPercents&&(g.valueAxis.recalculateToPercents=
!0);m&&g.valueAxis&&!0===g.valueAxis.recalculateToPercents&&(k=!0);var n;for(n=0;n<y;n++){var u=e[n],q=g.comparedGraphs[u.id];q||(q=new AmCharts.AmGraph(this.theme),q.id="comparedGraph"+n+"_"+f+u.id);q.periodValue=g.periodValue;q.dataSet=u;q.behindColumns=g.behindColumns;g.comparedGraphs[u.id]=q;q.seriesIdField="amCategoryIdField";q.connect=g.connect;var l=g.compareField;l||(l=g.valueField);var D=!1,A=u.fieldMappings,z;for(z=0;z<A.length;z++)A[z].toField==l&&(D=!0);if(D){q.valueField=l;q.title=u.title;
q.lineColor=u.color;g.compareGraphType&&(q.type=g.compareGraphType);l=g.compareGraphLineThickness;isNaN(l)||(q.lineThickness=l);l=g.compareGraphDashLength;isNaN(l)||(q.dashLength=l);l=g.compareGraphLineAlpha;isNaN(l)||(q.lineAlpha=l);l=g.compareGraphCornerRadiusTop;isNaN(l)||(q.cornerRadiusTop=l);l=g.compareGraphCornerRadiusBottom;isNaN(l)||(q.cornerRadiusBottom=l);l=g.compareGraphBalloonColor;isNaN(l)||(q.balloonColor=l);if(l=g.compareGraphFillColors)q.fillColors=l;if(l=g.compareGraphNegativeFillColors)q.negativeFillColors=
l;if(l=g.compareGraphFillAlphas)q.fillAlphas=l;if(l=g.compareGraphNegativeFillAlphas)q.negativeFillAlphas=l;if(l=g.compareGraphBullet)q.bullet=l;if(l=g.compareGraphNumberFormatter)q.numberFormatter=l;l=g.compareGraphPrecision;isNaN(l)||(q.precision=l);if(l=g.compareGraphBalloonText)q.balloonText=l;l=g.compareGraphBulletSize;isNaN(l)||(q.bulletSize=l);l=g.compareGraphBulletAlpha;isNaN(l)||(q.bulletAlpha=l);l=g.compareGraphBulletBorderAlpha;isNaN(l)||(q.bulletBorderAlpha=l);if(l=g.compareGraphBulletBorderColor)q.bulletBorderColor=
l;l=g.compareGraphBulletBorderThickness;isNaN(l)||(q.bulletBorderThickness=l);q.visibleInLegend=g.compareGraphVisibleInLegend;q.balloonFunction=g.compareGraphBalloonFunction;q.hideBulletsCount=g.hideBulletsCount;q.valueAxis=g.valueAxis;m&&(k&&p?(q.legendValueText=p,q.legendPeriodValueText=t):(x&&(q.legendValueText=x),w&&(q.legendPeriodValueText=w)));c.showComparedOnTop?c.graphs.push(q):c.graphs.unshift(q);this.comparedGraphs.push({graph:q,dataSet:u})}}}m&&(k&&p?(g.legendValueText=p,g.legendPeriodValueText=
t):(x&&(g.legendValueText=x),w&&(g.legendPeriodValueText=w)))}}}},choosePeriod:function(a,b,c){var d=this.categoryAxesSettings,e=d.groupToPeriods,h=e[a],e=e[a+1],f=AmCharts.extractPeriod(h),f=AmCharts.getPeriodDuration(f.period,f.count),g=b.getTime(),k=c.getTime(),d=d.maxSeries;return(k-g)/f>d&&0<d&&e?this.choosePeriod(a+1,b,c):h},handleCursorChange:function(a){var b=a.target,c=a.position;a=a.zooming;var d=this.chartCursors,e;for(e=0;e<d.length;e++){var h=d[e];h!=b&&c&&(h.isZooming(a),h.previousMousePosition=
NaN,h.forceShow=!0,h.setPosition(c,!1))}},getSelections:function(){var a=[],b=this.dataSets,c;for(c=0;c<b.length;c++){var d=b[c];d.compared&&a.push(d)}this.comparedDataSets=a;b=this.panels;for(c=0;c<b.length;c++)d=b[c],"never"!=d.recalculateToPercents&&0<a.length?d.hideDrawingIcons(!0):d.drawingIconsEnabled&&d.hideDrawingIcons(!1)},addPanel:function(a){this.panels.push(a);AmCharts.removeChart(a);AmCharts.addChart(a)},addPanelAt:function(a,b){this.panels.splice(b,0,a);AmCharts.removeChart(a);AmCharts.addChart(a)},
removePanel:function(a){var b=this.panels,c;for(c=b.length-1;0<=c;c--)if(b[c]==a){var d={type:"panelRemoved",panel:a,chart:this};this.fire(d.type,d);b.splice(c,1);a.destroy();a.clear()}},validateData:function(){this.resetDataParsed();this.updateDataSets();this.mainDataSet.compared=!1;this.updateGraphs();this.updateData();var a=this.dataSetSelector;a&&a.write(a.div)},resetDataParsed:function(){var a=this.dataSets,b;for(b=0;b<a.length;b++)a[b].dataParsed=!1},validateNow:function(){this.skipDefault=
!0;this.chartRendered=!1;this.clear(!0);this.write(this.div)},hideStockEvents:function(){this.showHideEvents(!1);this.eventsHidden=!0},showStockEvents:function(){this.showHideEvents(!0);this.eventsHidden=!1},showHideEvents:function(a){var b=this.panels,c;for(c=0;c<b.length;c++){var d=b[c].graphs,e;for(e=0;e<d.length;e++){var h=d[e];!0===a?h.showBullets():h.hideBullets()}}},invalidateSize:function(){var a=this;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateNow()},5);a.validateTO=
b},measure:function(){var a=this.div,b=a.offsetWidth,c=a.offsetHeight;a.clientHeight&&(b=a.clientWidth,c=a.clientHeight);this.divRealWidth=b;this.divRealHeight=c},clear:function(a){var b=this.panels,c;if(b)for(c=0;c<b.length;c++){var d=b[c];a||(d.cleanChart(),d.destroy());d.clear(a)}(b=this.scrollbarChart)&&b.clear();if(b=this.div)b.innerHTML="";a||(this.div=null,AmCharts.deleteObject(this))}});AmCharts.StockEvent=AmCharts.Class({construct:function(){}});AmCharts.DataSet=AmCharts.Class({construct:function(){this.cname="DataSet";this.fieldMappings=[];this.dataProvider=[];this.agregatedDataProviders=[];this.stockEvents=[];this.compared=!1;this.showInCompare=this.showInSelect=!0}});AmCharts.PeriodSelector=AmCharts.Class({construct:function(a){this.cname="PeriodSelector";this.theme=a;this.createEvents("changed");this.inputFieldsEnabled=!0;this.position="bottom";this.width=180;this.fromText="From: ";this.toText="to: ";this.periodsText="Zoom: ";this.periods=[];this.inputFieldWidth=100;this.dateFormat="DD-MM-YYYY";this.hideOutOfScopePeriods=!0;AmCharts.applyTheme(this,a,this.cname)},zoom:function(a,b){this.inputFieldsEnabled&&(this.startDateField.value=AmCharts.formatDate(a,this.dateFormat),
this.endDateField.value=AmCharts.formatDate(b,this.dateFormat));this.markButtonAsSelected()},write:function(a){var b=this;a.className="amChartsPeriodSelector";var c=b.width,d=b.position;b.width=void 0;b.position=void 0;AmCharts.applyStyles(a.style,b);b.width=c;b.position=d;b.div=a;a.innerHTML="";c=b.theme;d=b.position;d="top"==d||"bottom"==d?!1:!0;b.vertical=d;var e=0,h=0;if(b.inputFieldsEnabled){var f=document.createElement("div");a.appendChild(f);var g=document.createTextNode(b.fromText);f.appendChild(g);
d?AmCharts.addBr(f):(f.style.styleFloat="left",f.style.display="inline");var k=document.createElement("input");k.className="amChartsInputField";c&&AmCharts.applyStyles(k.style,c.PeriodInputField);k.style.textAlign="center";k.onblur=function(a){b.handleCalChange(a)};AmCharts.isNN&&k.addEventListener("keypress",function(a){b.handleCalendarChange.call(b,a)},!0);AmCharts.isIE&&k.attachEvent("onkeypress",function(a){b.handleCalendarChange.call(b,a)});f.appendChild(k);b.startDateField=k;if(d)g=b.width-
6+"px",AmCharts.addBr(f);else{var g=b.inputFieldWidth+"px",m=document.createTextNode(" ");f.appendChild(m)}k.style.width=g;k=document.createTextNode(b.toText);f.appendChild(k);d&&AmCharts.addBr(f);k=document.createElement("input");k.className="amChartsInputField";c&&AmCharts.applyStyles(k.style,c.PeriodInputField);k.style.textAlign="center";k.onblur=function(){b.handleCalChange()};AmCharts.isNN&&k.addEventListener("keypress",function(a){b.handleCalendarChange.call(b,a)},!0);AmCharts.isIE&&k.attachEvent("onkeypress",
function(a){b.handleCalendarChange.call(b,a)});f.appendChild(k);b.endDateField=k;d?AmCharts.addBr(f):e=k.offsetHeight+2;g&&(k.style.width=g)}f=b.periods;if(AmCharts.ifArray(f)){g=document.createElement("div");d||(g.style.cssFloat="right",g.style.styleFloat="right",g.style.display="inline");a.appendChild(g);d&&AmCharts.addBr(g);a=document.createTextNode(b.periodsText);g.appendChild(a);b.periodContainer=g;var p;for(a=0;a<f.length;a++)k=f[a],p=document.createElement("input"),p.type="button",p.value=
k.label,p.period=k.period,p.count=k.count,p.periodObj=k,p.className="amChartsButton",c&&AmCharts.applyStyles(p.style,c.PeriodButton),d&&(p.style.width=b.width-1+"px"),p.style.boxSizing="border-box",g.appendChild(p),b.addEventListeners(p),k.button=p;!d&&p&&(h=p.offsetHeight);b.offsetHeight=Math.max(e,h)}},addEventListeners:function(a){var b=this;AmCharts.isNN&&a.addEventListener("click",function(a){b.handlePeriodChange.call(b,a)},!0);AmCharts.isIE&&a.attachEvent("onclick",function(a){b.handlePeriodChange.call(b,
a)})},getPeriodDates:function(){var a=this.periods,b;for(b=0;b<a.length;b++)this.selectPeriodButton(a[b],!0)},handleCalendarChange:function(a){13==a.keyCode&&this.handleCalChange(a)},handleCalChange:function(a){var b=this.dateFormat,c=AmCharts.stringToDate(this.startDateField.value,b),b=this.chart.getLastDate(AmCharts.stringToDate(this.endDateField.value,b));try{this.startDateField.blur(),this.endDateField.blur()}catch(d){}if(c&&b){var e={type:"changed"};e.startDate=c;e.endDate=b;e.chart=this.chart;
e.event=a;this.fire(e.type,e)}},handlePeriodChange:function(a){this.selectPeriodButton((a.srcElement?a.srcElement:a.target).periodObj,!1,a)},setRanges:function(a,b){this.firstDate=a;this.lastDate=b;this.getPeriodDates()},selectPeriodButton:function(a,b,c){var d=a.button,e=d.count,h=d.period,f,g,k=this.firstDate,m=this.lastDate,p,x=this.theme;k&&m&&("MAX"==h?(f=k,g=m):"YTD"==h?(f=new Date,f.setMonth(0,1),f.setHours(0,0,0,0),0===e&&f.setDate(f.getDate()-1),g=this.lastDate):"YYYY"==h||"MM"==h?this.selectFromStart?
(f=k,g=new Date(k),g.setMonth(g.getMonth()+e)):(f=new Date(m),AmCharts.changeDate(f,h,e,!1),f.setDate(f.getDate()-1),g=m):(p=AmCharts.getPeriodDuration(h,e),this.selectFromStart?(f=k,g=new Date(k.getTime()+p-1)):(f=new Date(m.getTime()-p+1),g=m)),a.startTime=f.getTime(),this.hideOutOfScopePeriods&&(b&&a.startTime<k.getTime()?d.style.display="none":d.style.display="inline"),f.getTime()>m.getTime()&&(p=AmCharts.getPeriodDuration("DD",1),f=new Date(m.getTime()-p)),f.getTime()<k.getTime()&&(f=k),"YTD"==
h&&(a.startTime=f.getTime()),a.endTime=g.getTime(),b||(this.skipMark=!0,this.unselectButtons(),d.className="amChartsButtonSelected",x&&AmCharts.applyStyles(d.style,x.PeriodButtonSelected),a={type:"changed"},a.startDate=f,a.endDate=g,a.predefinedPeriod=h,a.chart=this.chart,a.count=e,a.event=c,this.fire(a.type,a)))},markButtonAsSelected:function(){if(!this.skipMark){var a=this.chart,b=this.periods,c=a.startDate.getTime(),a=a.endDate.getTime(),d=this.theme;this.unselectButtons();var e;for(e=b.length-
1;0<=e;e--){var h=b[e],f=h.button;h.startTime&&h.endTime&&c==h.startTime&&a==h.endTime&&(this.unselectButtons(),f.className="amChartsButtonSelected",d&&AmCharts.applyStyles(f.style,d.PeriodButtonSelected))}}this.skipMark=!1},unselectButtons:function(){var a=this.periods,b,c=this.theme;for(b=a.length-1;0<=b;b--){var d=a[b].button;d.className="amChartsButton";c&&AmCharts.applyStyles(d.style,c.PeriodButton)}},setDefaultPeriod:function(){var a=this.periods,b;for(b=0;b<a.length;b++){var c=a[b];c.selected&&
this.selectPeriodButton(c)}}});AmCharts.StockGraph=AmCharts.Class({inherits:AmCharts.AmGraph,construct:function(a){AmCharts.StockGraph.base.construct.call(this,a);this.cname="StockGraph";this.useDataSetColors=!0;this.periodValue="Close";this.compareGraphType="line";this.compareGraphVisibleInLegend=!0;this.comparable=this.resetTitleOnDataSetChange=!1;this.comparedGraphs={};this.showEventsOnComparedGraphs=!1;AmCharts.applyTheme(this,a,this.cname)}});AmCharts.StockPanel=AmCharts.Class({inherits:AmCharts.AmSerialChart,construct:function(a){AmCharts.StockPanel.base.construct.call(this,a);this.cname="StockPanel";this.theme=a;this.showCategoryAxis=this.showComparedOnTop=!0;this.recalculateToPercents="whenComparing";this.panelHeaderPaddingBottom=this.panelHeaderPaddingLeft=this.panelHeaderPaddingRight=this.panelHeaderPaddingTop=0;this.trendLineAlpha=1;this.trendLineColor="#00CC00";this.trendLineColorHover="#CC0000";this.trendLineThickness=2;this.trendLineDashLength=
0;this.stockGraphs=[];this.drawingIconsEnabled=!1;this.iconSize=18;this.autoMargins=this.allowTurningOff=this.eraseAll=this.erasingEnabled=this.drawingEnabled=!1;AmCharts.applyTheme(this,a,this.cname)},initChart:function(a){AmCharts.StockPanel.base.initChart.call(this,a);this.drawingIconsEnabled&&this.createDrawIcons();(a=this.chartCursor)&&this.listenTo(a,"draw",this.handleDraw)},addStockGraph:function(a){this.stockGraphs.push(a);return a},removeStockGraph:function(a){var b=this.stockGraphs,c;for(c=
b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},createDrawIcons:function(){var a=this,b=a.iconSize,c=a.container,d=a.pathToImages,e=a.realWidth-2*b-1-a.marginRight,h=AmCharts.rect(c,b,b,"#000",0.005),f=AmCharts.rect(c,b,b,"#000",0.005);f.translate(b+1,0);var g=c.image(d+"pencilIcon.gif",0,0,b,b);a.pencilButton=g;f.setAttr("cursor","pointer");h.setAttr("cursor","pointer");h.mouseup(function(){a.handlePencilClick()});var k=c.image(d+"pencilIconH.gif",0,0,b,b);a.pencilButtonPushed=k;a.drawingEnabled||k.hide();
var m=c.image(d+"eraserIcon.gif",b+1,0,b,b);a.eraserButton=m;f.mouseup(function(){a.handleEraserClick()});h.touchend&&(h.touchend(function(){a.handlePencilClick()}),f.touchend(function(){a.handleEraserClick()}));b=c.image(d+"eraserIconH.gif",b+1,0,b,b);a.eraserButtonPushed=b;a.erasingEnabled||b.hide();c=c.set([g,k,m,b,h,f]);c.translate(e,1);this.hideIcons&&c.hide()},handlePencilClick:function(){var a=!this.drawingEnabled;this.disableDrawing(!a);this.erasingEnabled=!1;this.eraserButtonPushed.hide();
a?this.pencilButtonPushed.show():(this.pencilButtonPushed.hide(),this.setMouseCursor("auto"))},disableDrawing:function(a){this.drawingEnabled=!a;var b=this.chartCursor;this.stockChart.enableCursors(a);b&&b.enableDrawing(!a)},handleEraserClick:function(){this.disableDrawing(!0);this.pencilButtonPushed.hide();if(this.eraseAll){var a=this.trendLines,b;for(b=a.length-1;0<=b;b--){var c=a[b];c.isProtected||this.removeTrendLine(c)}this.validateNow()}else(this.erasingEnabled=a=!this.erasingEnabled)?(this.eraserButtonPushed.show(),
this.setTrendColorHover(this.trendLineColorHover),this.setMouseCursor("auto")):(this.eraserButtonPushed.hide(),this.setTrendColorHover())},setTrendColorHover:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--){var d=b[c];d.isProtected||(d.rollOverColor=a)}},handleDraw:function(a){var b=this.drawOnAxis;AmCharts.isString(b)&&(b=this.getValueAxisById(b));b||(b=this.valueAxes[0]);this.drawOnAxis=b;var c=this.categoryAxis,d=a.initialX,e=a.finalX,h=a.initialY;a=a.finalY;var f=new AmCharts.TrendLine(this.theme);
f.initialDate=c.coordinateToDate(d);f.finalDate=c.coordinateToDate(e);f.initialValue=b.coordinateToValue(h);f.finalValue=b.coordinateToValue(a);f.lineAlpha=this.trendLineAlpha;f.lineColor=this.trendLineColor;f.lineThickness=this.trendLineThickness;f.dashLength=this.trendLineDashLength;f.valueAxis=b;f.categoryAxis=c;this.addTrendLine(f);this.listenTo(f,"click",this.handleTrendClick);this.validateNow()},hideDrawingIcons:function(a){(this.hideIcons=a)&&this.disableDrawing(a)},handleTrendClick:function(a){this.erasingEnabled&&
(a=a.trendLine,this.eraseAll||a.isProtected||this.removeTrendLine(a),this.validateNow())},handleWheelReal:function(a,b){var c=this.scrollbarChart;if(!this.wheelBusy&&c){var d=1;b&&(d=-1);var c=c.chartScrollbar,e=this.categoryAxis.minDuration();0>a?(d=this.startTime+d*e,e=this.endTime+1*e):(d=this.startTime-d*e,e=this.endTime-1*e);d<this.firstTime&&(d=this.firstTime);e>this.lastTime&&(e=this.lastTime);d<e&&c.timeZoom(d,e,!0)}}});AmCharts.CategoryAxesSettings=AmCharts.Class({construct:function(a){this.cname="CategoryAxesSettings";this.minPeriod="DD";this.equalSpacing=!1;this.axisHeight=28;this.tickLength=this.axisAlpha=0;this.gridCount=10;this.maxSeries=150;this.groupToPeriods="ss 10ss 30ss mm 10mm 30mm hh DD WW MM YYYY".split(" ");this.markPeriodChange=this.autoGridCount=!0;AmCharts.applyTheme(this,a,this.cname)}});AmCharts.ChartCursorSettings=AmCharts.Class({construct:function(a){this.cname="ChartCursorSettings";this.enabled=!0;this.bulletsEnabled=this.valueBalloonsEnabled=!1;this.categoryBalloonDateFormats=[{period:"YYYY",format:"YYYY"},{period:"MM",format:"MMM, YYYY"},{period:"WW",format:"MMM DD, YYYY"},{period:"DD",format:"MMM DD, YYYY"},{period:"hh",format:"JJ:NN"},{period:"mm",format:"JJ:NN"},{period:"ss",format:"JJ:NN:SS"},{period:"fff",format:"JJ:NN:SS"}];AmCharts.applyTheme(this,a,this.cname)},categoryBalloonDateFormat:function(a){var b=
this.categoryBalloonDateFormats,c,d;for(d=0;d<b.length;d++)b[d].period==a&&(c=b[d].format);return c}});AmCharts.ChartScrollbarSettings=AmCharts.Class({construct:function(a){this.cname="ChartScrollbarSettings";this.height=40;this.enabled=!0;this.color="#FFFFFF";this.updateOnReleaseOnly=this.autoGridCount=!0;this.hideResizeGrips=!1;this.position="bottom";AmCharts.applyTheme(this,a,this.cname)}});AmCharts.LegendSettings=AmCharts.Class({construct:function(a){this.cname="LegendSettings";this.marginBottom=this.marginTop=0;this.usePositiveNegativeOnPercentsOnly=!0;this.positiveValueColor="#00CC00";this.negativeValueColor="#CC0000";this.autoMargins=this.equalWidths=this.textClickEnabled=!1;AmCharts.applyTheme(this,a,this.cname)}});AmCharts.PanelsSettings=AmCharts.Class({construct:function(a){this.cname="PanelsSettings";this.marginBottom=this.marginTop=this.marginRight=this.marginLeft=0;this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.panelSpacing=8;this.panEventsEnabled=!0;this.creditsPosition="top-right";AmCharts.applyTheme(this,a,this.cname)}});AmCharts.StockEventsSettings=AmCharts.Class({construct:function(a){this.cname="StockEventsSettings";this.type="sign";this.backgroundAlpha=1;this.backgroundColor="#DADADA";this.borderAlpha=1;this.borderColor="#888888";this.balloonColor=this.rollOverColor="#CC0000";AmCharts.applyTheme(this,a,this.cname)}});AmCharts.ValueAxesSettings=AmCharts.Class({construct:function(a){this.cname="ValueAxesSettings";this.tickLength=0;this.showFirstLabel=this.autoGridCount=this.inside=!0;this.showLastLabel=!1;this.axisAlpha=0;AmCharts.applyTheme(this,a,this.cname)}});AmCharts.getItemIndex=function(a,b){var c=-1,d;for(d=0;d<b.length;d++)a==b[d]&&(c=d);return c};AmCharts.addBr=function(a){a.appendChild(document.createElement("br"))};AmCharts.applyStyles=function(a,b){if(b&&a)for(var c in a){var d=c,e=b[d];if(void 0!==e)try{a[d]=e}catch(h){}}};
AmCharts.parseStockData=function(a,b,c,d,e){(new Date).getTime();var h={},f=a.dataProvider,g=a.categoryField;if(g){var k=AmCharts.getItemIndex(b,c),m=c.length,p,x=f.length,t,w={};for(p=k;p<m;p++)t=c[p],h[t]=[];var y={},n=a.fieldMappings,u=n.length;for(p=0;p<x;p++){var q=f[p],l=q[g],l=l instanceof Date?"fff"==b?AmCharts.useUTC?new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate(),l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()):new Date(l.getFullYear(),l.getMonth(),
l.getDate(),l.getHours(),l.getMinutes(),l.getSeconds(),l.getMilliseconds()):new Date(l):e?AmCharts.stringToDate(l,e):new Date(l),D=l.getTime(),A={};for(t=0;t<u;t++)A[n[t].toField]=q[n[t].fromField];var z;for(z=k;z<m;z++){t=c[z];var s=AmCharts.extractPeriod(t),B=s.period,E=s.count,v,r;if(z==k||D>=w[t]||!w[t]){y[t]={};y[t].amCategoryIdField=String(AmCharts.resetDateToMin(l,B,E,d).getTime());var C;for(C=0;C<u;C++)s=n[C].toField,v=y[t],r=Number(A[s]),v[s+"Count"]=0,v[s+"Sum"]=0,isNaN(r)||(v[s+"Open"]=
r,v[s+"Sum"]=r,v[s+"High"]=r,v[s+"Low"]=r,v[s+"Close"]=r,v[s+"Count"]=1,v[s+"Average"]=r);v.dataContext=q;h[t].push(y[t]);z>k&&(s=new Date(l),s=AmCharts.changeDate(s,B,E,!0),s=AmCharts.resetDateToMin(s,B,E,d),w[t]=s.getTime());if(z==k)for(var F in q)q.hasOwnProperty(F)&&(y[t][F]=q[F]);y[t][g]=new Date(l)}else for(B=0;B<u;B++)s=n[B].toField,v=y[t],p==x-1&&(v[g]=new Date(l)),r=Number(A[s]),isNaN(r)||(isNaN(v[s+"Low"])&&(v[s+"Low"]=r),r<v[s+"Low"]&&(v[s+"Low"]=r),isNaN(v[s+"High"])&&(v[s+"High"]=r),
r>v[s+"High"]&&(v[s+"High"]=r),v[s+"Close"]=r,E=AmCharts.getDecimals(v[s+"Sum"]),C=AmCharts.getDecimals(r),v[s+"Sum"]+=r,v[s+"Sum"]=AmCharts.roundTo(v[s+"Sum"],Math.max(E,C)),v[s+"Count"]++,v[s+"Average"]=v[s+"Sum"]/v[s+"Count"])}}}a.agregatedDataProviders=h};
AmCharts.parseEvents=function(a,b,c,d,e,h){var f=a.stockEvents,g=a.agregatedDataProviders,k=b.length,m,p,x,t,w,y,n,u;for(m=0;m<k;m++){y=b[m];w=y.graphs;x=w.length;var q;for(p=0;p<x;p++)t=w[p],t.customBulletField="amCustomBullet"+t.id+"_"+y.id,t.bulletConfigField="amCustomBulletConfig"+t.id+"_"+y.id;for(var l=0;l<f.length;l++)if(n=f[l],q=n.graph,AmCharts.isString(q)&&(q=AmCharts.getObjById(w,q)))n.graph=q}for(var D in g)if(g.hasOwnProperty(D)){q=g[D];var A=AmCharts.extractPeriod(D),z=q.length,s;for(s=
0;s<z;s++){var B=q[s];m=B[a.categoryField];u=m instanceof Date;h&&!u&&(m=AmCharts.stringToDate(m,h));var E=m.getTime();w=A.period;var l=A.count,v;v="fff"==w?m.getTime()+1:AmCharts.resetDateToMin(AmCharts.changeDate(new Date(m),A.period,A.count),w,l,d).getTime();for(m=0;m<k;m++)for(y=b[m],w=y.graphs,x=w.length,p=0;p<x;p++){t=w[p];var r={};r.eventDispatcher=e;r.eventObjects=[];r.letters=[];r.descriptions=[];r.shapes=[];r.backgroundColors=[];r.backgroundAlphas=[];r.borderColors=[];r.borderAlphas=[];
r.colors=[];r.rollOverColors=[];r.showOnAxis=[];for(l=0;l<f.length;l++){n=f[l];u=n.date instanceof Date;h&&!u&&(n.date=AmCharts.stringToDate(n.date,h));u=n.date.getTime();var C=!1;n.graph&&(n.graph.showEventsOnComparedGraphs&&n.graph.comparedGraphs[a.id]&&(C=!0),(t==n.graph||C)&&u>=E&&u<v&&(r.eventObjects.push(n),r.letters.push(n.text),r.descriptions.push(n.description),n.type?r.shapes.push(n.type):r.shapes.push(c.type),void 0!==n.backgroundColor?r.backgroundColors.push(n.backgroundColor):r.backgroundColors.push(c.backgroundColor),
isNaN(n.backgroundAlpha)?r.backgroundAlphas.push(c.backgroundAlpha):r.backgroundAlphas.push(n.backgroundAlpha),isNaN(n.borderAlpha)?r.borderAlphas.push(c.borderAlpha):r.borderAlphas.push(n.borderAlpha),void 0!==n.borderColor?r.borderColors.push(n.borderColor):r.borderColors.push(c.borderColor),void 0!==n.rollOverColor?r.rollOverColors.push(n.rollOverColor):r.rollOverColors.push(c.rollOverColor),r.colors.push(n.color),!n.panel&&n.graph&&(n.panel=n.graph.chart),r.showOnAxis.push(n.showOnAxis),r.date=
new Date(n.date)));0<r.shapes.length&&(n="amCustomBullet"+t.id+"_"+y.id,u="amCustomBulletConfig"+t.id+"_"+y.id,B[n]=AmCharts.StackedBullet,B[u]=r)}}}}};AmCharts.StockLegend=AmCharts.Class({inherits:AmCharts.AmLegend,construct:function(a){AmCharts.StockLegend.base.construct.call(this,a);this.cname="StockLegend";this.valueTextComparing="[[percents.value]]%";this.valueTextRegular="[[value]]";AmCharts.applyTheme(this,a,this.cname)},drawLegend:function(){var a=this;AmCharts.StockLegend.base.drawLegend.call(a);var b=a.chart;if(b.allowTurningOff){var c=a.container,d=c.image(b.pathToImages+"xIcon.gif",b.realWidth-17,3,17,17),b=c.image(b.pathToImages+"xIconH.gif",
b.realWidth-17,3,17,17);b.hide();a.xButtonHover=b;d.mouseup(function(){a.handleXClick()}).mouseover(function(){a.handleXOver()});b.mouseup(function(){a.handleXClick()}).mouseout(function(){a.handleXOut()})}},handleXOver:function(){this.xButtonHover.show()},handleXOut:function(){this.xButtonHover.hide()},handleXClick:function(){var a=this.chart,b=a.stockChart;b.removePanel(a);b.validateNow()}});AmCharts.DataSetSelector=AmCharts.Class({construct:function(a){this.cname="DataSetSelector";this.theme=a;this.createEvents("dataSetSelected","dataSetCompared","dataSetUncompared");this.position="left";this.selectText="Select:";this.comboBoxSelectText="Select...";this.compareText="Compare to:";this.width=180;this.dataProvider=[];this.listHeight=150;this.listCheckBoxSize=14;this.rollOverBackgroundColor="#b2e1ff";this.selectedBackgroundColor="#7fceff";AmCharts.applyTheme(this,a,this.cname)},write:function(a){var b=
this,c,d=b.theme;a.className="amChartsDataSetSelector";var e=b.width;c=b.position;b.width=void 0;b.position=void 0;AmCharts.applyStyles(a.style,b);b.div=a;b.width=e;b.position=c;a.innerHTML="";var e=b.position,h;h="top"==e||"bottom"==e?!1:!0;b.vertical=h;var f;h&&(f=b.width+"px");var e=b.dataProvider,g,k;if(1<b.countDataSets("showInSelect")){c=document.createTextNode(b.selectText);a.appendChild(c);h&&AmCharts.addBr(a);var m=document.createElement("select");f&&(m.style.width=f);b.selectCB=m;d&&AmCharts.applyStyles(m.style,
d.DataSetSelect);a.appendChild(m);AmCharts.isNN&&m.addEventListener("change",function(a){b.handleDataSetChange.call(b,a)},!0);AmCharts.isIE&&m.attachEvent("onchange",function(a){b.handleDataSetChange.call(b,a)});for(c=0;c<e.length;c++)if(g=e[c],!0===g.showInSelect){k=document.createElement("option");k.text=g.title;k.value=c;g==b.chart.mainDataSet&&(k.selected=!0);try{m.add(k,null)}catch(p){m.add(k)}}b.offsetHeight=m.offsetHeight}if(0<b.countDataSets("showInCompare")&&1<e.length)if(h?(AmCharts.addBr(a),
AmCharts.addBr(a)):(c=document.createTextNode(" "),a.appendChild(c)),c=document.createTextNode(b.compareText),a.appendChild(c),k=b.listCheckBoxSize,h){AmCharts.addBr(a);f=document.createElement("div");a.appendChild(f);f.className="amChartsCompareList";d&&AmCharts.applyStyles(f.style,d.DataSetCompareList);f.style.overflow="auto";f.style.overflowX="hidden";f.style.width=b.width-2+"px";f.style.maxHeight=b.listHeight+"px";for(c=0;c<e.length;c++)g=e[c],!0===g.showInCompare&&g!=b.chart.mainDataSet&&(d=
document.createElement("div"),d.style.padding="4px",d.style.position="relative",d.name="amCBContainer",d.dataSet=g,d.style.height=k+"px",g.compared&&(d.style.backgroundColor=b.selectedBackgroundColor),f.appendChild(d),h=document.createElement("div"),h.style.width=k+"px",h.style.height=k+"px",h.style.position="absolute",h.style.backgroundColor=g.color,d.appendChild(h),h=document.createElement("div"),h.style.width="100%",h.style.position="absolute",h.style.left=k+10+"px",d.appendChild(h),g=document.createTextNode(g.title),
h.style.whiteSpace="nowrap",h.style.cursor="default",h.appendChild(g),b.addEventListeners(d));AmCharts.addBr(a);AmCharts.addBr(a)}else{d=document.createElement("select");b.compareCB=d;f&&(d.style.width=f);a.appendChild(d);AmCharts.isNN&&d.addEventListener("change",function(a){b.handleCBSelect.call(b,a)},!0);AmCharts.isIE&&d.attachEvent("onchange",function(a){b.handleCBSelect.call(b,a)});k=document.createElement("option");k.text=b.comboBoxSelectText;try{d.add(k,null)}catch(x){d.add(k)}for(c=0;c<e.length;c++)if(g=
e[c],!0===g.showInCompare&&g!=b.chart.mainDataSet){k=document.createElement("option");k.text=g.title;k.value=c;g.compared&&(k.selected=!0);try{d.add(k,null)}catch(t){d.add(k)}}b.offsetHeight=d.offsetHeight}},addEventListeners:function(a){var b=this;AmCharts.isNN&&(a.addEventListener("mouseover",function(a){b.handleRollOver.call(b,a)},!0),a.addEventListener("mouseout",function(a){b.handleRollOut.call(b,a)},!0),a.addEventListener("click",function(a){b.handleClick.call(b,a)},!0));AmCharts.isIE&&(a.attachEvent("onmouseout",
function(a){b.handleRollOut.call(b,a)}),a.attachEvent("onmouseover",function(a){b.handleRollOver.call(b,a)}),a.attachEvent("onclick",function(a){b.handleClick.call(b,a)}))},handleDataSetChange:function(){var a=this.selectCB,a=this.dataProvider[a.options[a.selectedIndex].value],b=this.chart;b.mainDataSet=a;b.zoomOutOnDataSetChange&&(b.startDate=void 0,b.endDate=void 0);b.validateData();a={type:"dataSetSelected",dataSet:a,chart:this.chart};this.fire(a.type,a)},handleRollOver:function(a){a=this.getRealDiv(a);
a.dataSet.compared||(a.style.backgroundColor=this.rollOverBackgroundColor)},handleRollOut:function(a){a=this.getRealDiv(a);a.dataSet.compared||(a.style.removeProperty&&a.style.removeProperty("background-color"),a.style.removeAttribute&&a.style.removeAttribute("backgroundColor"))},handleCBSelect:function(a){var b=this.compareCB,c=this.dataProvider,d,e;for(d=0;d<c.length;d++)e=c[d],e.compared&&(a={type:"dataSetUncompared",dataSet:e}),e.compared=!1;c=b.selectedIndex;0<c&&(e=this.dataProvider[b.options[c].value],
e.compared||(a={type:"dataSetCompared",dataSet:e}),e.compared=!0);b=this.chart;b.validateData();a.chart=b;this.fire(a.type,a)},handleClick:function(a){a=this.getRealDiv(a).dataSet;!0===a.compared?(a.compared=!1,a={type:"dataSetUncompared",dataSet:a}):(a.compared=!0,a={type:"dataSetCompared",dataSet:a});var b=this.chart;b.validateData();a.chart=b;this.fire(a.type,a)},getRealDiv:function(a){a||(a=window.event);a=a.currentTarget?a.currentTarget:a.srcElement;"amCBContainer"==a.parentNode.name&&(a=a.parentNode);
return a},countDataSets:function(a){var b=this.dataProvider,c=0,d;for(d=0;d<b.length;d++)!0===b[d][a]&&c++;return c}});AmCharts.StackedBullet=AmCharts.Class({construct:function(){this.fontSize=11;this.stackDown=!1;this.mastHeight=8;this.shapes=[];this.backgroundColors=[];this.backgroundAlphas=[];this.borderAlphas=[];this.borderColors=[];this.colors=[];this.rollOverColors=[];this.showOnAxiss=[];this.textColor="#000000";this.nextY=0;this.size=16},parseConfig:function(){var a=this.bulletConfig;this.eventObjects=a.eventObjects;this.letters=a.letters;this.shapes=a.shapes;this.backgroundColors=a.backgroundColors;this.backgroundAlphas=
a.backgroundAlphas;this.borderColors=a.borderColors;this.borderAlphas=a.borderAlphas;this.colors=a.colors;this.rollOverColors=a.rollOverColors;this.date=a.date;this.showOnAxiss=a.showOnAxis;this.axisCoordinate=a.minCoord},write:function(a){this.parseConfig();this.container=a;this.bullets=[];if(this.graph){var b=this.graph.fontSize;b&&(this.fontSize=b)}b=this.letters.length;(this.mastHeight+2*(this.fontSize/2+2))*b>this.availableSpace&&(this.stackDown=!0);this.set=a.set();a=0;var c;for(c=0;c<b;c++)this.shape=
this.shapes[c],this.backgroundColor=this.backgroundColors[c],this.backgroundAlpha=this.backgroundAlphas[c],this.borderAlpha=this.borderAlphas[c],this.borderColor=this.borderColors[c],this.rollOverColor=this.rollOverColors[c],this.showOnAxis=this.showOnAxiss[c],this.color=this.colors[c],this.addLetter(this.letters[c],a,c),this.showOnAxis||a++},addLetter:function(a,b,c){var d=this.container;b=d.set();var e=-1,h=this.stackDown;this.showOnAxis&&(this.stackDown=this.graph.valueAxis.reversed?!0:!1);this.stackDown&&
(e=1);var f=0,g=0,k=0,m,k=this.fontSize,p=this.mastHeight,x=this.shape,t=this.textColor;void 0!==this.color&&(t=this.color);void 0===a&&(a="");a=AmCharts.text(d,a,t,this.chart.fontFamily,this.fontSize);d=a.getBBox();this.labelWidth=t=d.width;this.labelHeight=d.height;d=0;switch(x){case "sign":m=this.drawSign(b);f=p+4+k/2;d=p+k+4;1==e&&(f-=4);break;case "flag":m=this.drawFlag(b);g=t/2+3;f=p+4+k/2;d=p+k+4;1==e&&(f-=4);break;case "pin":m=this.drawPin(b);f=6+k/2;d=k+8;break;case "triangleUp":m=this.drawTriangleUp(b);
f=-k-1;d=k+4;e=-1;break;case "triangleDown":m=this.drawTriangleDown(b);f=k+1;d=k+4;e=-1;break;case "triangleLeft":m=this.drawTriangleLeft(b);g=k;d=k+4;e=-1;break;case "triangleRight":m=this.drawTriangleRight(b);g=-k;e=-1;d=k+4;break;case "arrowUp":m=this.drawArrowUp(b);a.hide();break;case "arrowDown":m=this.drawArrowDown(b);a.hide();d=k+4;break;case "text":e=-1;m=this.drawTextBackground(b,a);f=this.labelHeight+3;d=k+10;break;case "round":m=this.drawCircle(b)}this.bullets[c]=m;this.showOnAxis?(m=isNaN(this.nextAxisY)?
this.axisCoordinate:this.nextY,k=f*e,this.nextAxisY=m+e*d):(m=this.nextY,k=f*e);a.translate(g,k);b.push(a);b.translate(0,m);this.addEventListeners(b,c);this.nextY=m+e*d;this.stackDown=h},addEventListeners:function(a,b){var c=this;a.click(function(){c.handleClick(b)}).mouseover(function(){c.handleMouseOver(b)}).touchend(function(){c.handleMouseOver(b,!0)}).mouseout(function(){c.handleMouseOut(b)})},drawPin:function(a){var b=-1;this.stackDown&&(b=1);var c=this.fontSize+4;return this.drawRealPolygon(a,
[0,c/2,c/2,-c/2,-c/2,0],[0,b*c/4,b*(c+c/4),b*(c+c/4),b*c/4,0])},drawSign:function(a){var b=-1;this.stackDown&&(b=1);var c=this.mastHeight*b,d=this.fontSize/2+2,e=AmCharts.line(this.container,[0,0],[0,c],this.borderColor,this.borderAlpha,1),h=AmCharts.circle(this.container,d,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);h.translate(0,c+d*b);a.push(e);a.push(h);this.set.push(a);return h},drawFlag:function(a){var b=-1;this.stackDown&&(b=1);var c=this.fontSize+4,d=this.labelWidth+
6,e=this.mastHeight,b=1==b?b*e:b*e-c,e=AmCharts.line(this.container,[0,0],[0,b],this.borderColor,this.borderAlpha,1),c=AmCharts.polygon(this.container,[0,d,d,0],[0,0,c,c],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);c.translate(0,b);a.push(e);a.push(c);this.set.push(a);return c},drawTriangleUp:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,b/2,-b/2,0],[0,b,b,0])},drawArrowUp:function(a){var b=this.size,c=b/2,d=b/4;return this.drawRealPolygon(a,
[0,c,d,d,-d,-d,-c,0],[0,c,c,b,b,c,c,0])},drawArrowDown:function(a){var b=this.size,c=b/2,d=b/4;return this.drawRealPolygon(a,[0,c,d,d,-d,-d,-c,0],[0,-c,-c,-b,-b,-c,-c,0])},drawTriangleDown:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,b/2,-b/2,0],[0,-b,-b,0])},drawTriangleLeft:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,b,b,0],[0,-b/2,b/2])},drawTriangleRight:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,-b,-b,0],[0,-b/2,b/2,0])},drawRealPolygon:function(a,
b,c){b=AmCharts.polygon(this.container,b,c,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);a.push(b);this.set.push(a);return b},drawCircle:function(a){shape=AmCharts.circle(this.container,this.fontSize/2,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);a.push(shape);this.set.push(a);return shape},drawTextBackground:function(a,b){var c=b.getBBox(),d=-c.width/2-5,e=c.width/2+5,c=-c.height-12;return this.drawRealPolygon(a,[d,-5,0,5,e,e,d,d],
[-5,-5,0,-5,-5,c,c,-5])},handleMouseOver:function(a,b){b||this.bullets[a].attr({fill:this.rollOverColors[a]});var c=this.eventObjects[a],d={type:"rollOverStockEvent",eventObject:c,graph:this.graph,date:this.date},e=this.bulletConfig.eventDispatcher;d.chart=e;e.fire(d.type,d);c.url&&this.bullets[a].setAttr("cursor","pointer");this.chart.showBalloon(AmCharts.fixNewLines(c.description),e.stockEventsSettings.balloonColor,!0)},handleClick:function(a){a=this.eventObjects[a];var b={type:"clickStockEvent",
eventObject:a,graph:this.graph,date:this.date},c=this.bulletConfig.eventDispatcher;b.chart=c;c.fire(b.type,b);b=a.urlTarget;b||(b=c.stockEventsSettings.urlTarget);AmCharts.getURL(a.url,b)},handleMouseOut:function(a){this.bullets[a].attr({fill:this.backgroundColors[a]});a={type:"rollOutStockEvent",eventObject:this.eventObjects[a],graph:this.graph,date:this.date};var b=this.bulletConfig.eventDispatcher;a.chart=b;b.fire(a.type,a)}});
AmCharts.AmExport = AmCharts.Class({
	construct: function(chart, cfg) {
		var _this		= this;
		_this.DEBUG		= false;
		_this.chart		= chart;
		_this.canvas	= null;
		_this.svgs		= [];
		_this.cfg		= {
			menuTop					: 'auto',
			menuLeft				: 'auto',
			menuRight				: '0px',
			menuBottom				: '0px',
			menuItems				: [{
				textAlign				: 'center',
				icon					: _this.chart.pathToImages + 'export.png',
				iconTitle				: 'Save chart as an image',
				format					: 'png'
			}],
			menuItemStyle			: {
			backgroundColor			: 'transparent',
			rollOverBackgroundColor	: '#EFEFEF',
			color					: '#000000',
			rollOverColor			: '#CC0000',
			paddingTop				: '6px',
			paddingRight			: '6px',
			paddingBottom			: '6px',
			paddingLeft				: '6px',
			marginTop				: '0px',
			marginRight				: '0px',
			marginBottom			: '0px',
			marginLeft				: '0px',
			textAlign				: 'left',
			textDecoration			: 'none',
			fontFamily				: _this.chart.fontFamily,
			fontSize				: _this.chart.fontSize + 'px'
			},
			menuItemOutput			: {
				backgroundColor			: '#FFFFFF',
				fileName				: 'amChart',
				format					: 'png',
				output					: 'dataurlnewwindow',
				render					: 'browser',
				dpi						: 90,
				onclick					: function(instance, config, event) {
					event.preventDefault();
					// Polify SVG; needs to wait
					instance.polifySVG();
					instance.output(config);
				}
			},
			removeImagery: false
		};
		_this.processing = {
			buffer: [],
			drawn: 0,
			timer: 0
		};

		// Config dependency adaption
		if (typeof(window.canvg) != 'undefined' && typeof(window.RGBColor) != 'undefined') {
			_this.cfg.menuItemOutput.render = 'canvg';
		}
		if (typeof(window.saveAs) != 'undefined') {
			_this.cfg.menuItemOutput.output = 'save';
		}
		if (AmCharts.isIE && AmCharts.IEversion < 10) {
			_this.cfg.menuItemOutput.output = 'dataurlnewwindow';
		}

		// Merge given configs
		if (cfg) {
			cfg.menuItemOutput = AmCharts.extend(_this.cfg.menuItemOutput, cfg.menuItemOutput || {});
			cfg.menuItemStyle = AmCharts.extend(_this.cfg.menuItemStyle, cfg.menuItemStyle || {});
			_this.cfg = AmCharts.extend(_this.cfg, cfg);
		}

		// Add reference to chart
		_this.chart.AmExport = _this;

		// Listen to the drawer
		_this.chart.addListener('rendered', function() {
			_this.setup();
		});

		// DEBUG; Public reference
		if (_this.DEBUG) {
			window.AmExport = _this;
		}
	},

	/*
	Simple log function for internal purpose
	@param **args
	*/
	log: function() {
		console.log('AmExport: ', arguments);
	},

	/* PUBLIC
	Prepares everything to get exported
	@param none
	*/
	setup: function() {
		var _this = this;

		if (_this.DEBUG == 10) {
			_this.log('SETUP START');
		} // DEBUG


		if (!AmCharts.isIE || (AmCharts.isIE && AmCharts.IEversion > 9)) {
			// Build Buttons
			_this.generateButtons();
			if (_this.DEBUG == 10) {
				_this.log('SETUP END');
			} // DEBUG
		} else {
			if (_this.DEBUG == 10) {
				_this.log('< IE10 NOT SUPPORTED');
			} // DEBUG
		}
	},

	/* PUBLIC
	Decodes base64 string to binary array
	@param base64_string
	@copyright Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
	*/
	generateBinaryArray: function(base64_string) {
		var
		len = base64_string.length,
			buffer = new Uint8Array(len / 4 * 3 | 0),
			i = 0,
			outptr = 0,
			last = [0, 0],
			state = 0,
			save = 0,
			rank, code, undef, base64_ranks = new Uint8Array([
				62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
			]);
		while (len--) {
			code = base64_string.charCodeAt(i++);
			rank = base64_ranks[code - 43];
			if (rank !== 255 && rank !== undef) {
				last[1] = last[0];
				last[0] = code;
				save = (save << 6) | rank;
				state++;
				if (state === 4) {
					buffer[outptr++] = save >>> 16;
					if (last[1] !== 61 /* padding character */ ) {
						buffer[outptr++] = save >>> 8;
					}
					if (last[0] !== 61 /* padding character */ ) {
						buffer[outptr++] = save;
					}
					state = 0;
				}
			}
		}
		// 2/3 chance there's going to be some null bytes at the end, but that
		// doesn't really matter with most image formats.
		// If it somehow matters for you, truncate the buffer up outptr.
		return buffer;
	},

	/*
	Creates blob object
	@param base64_datastring string
	@param type string
	*/
	generateBlob: function(datastring, type) {
		var _this = this,
			header_end = datastring.indexOf(',') + 1,
			header = datastring.substring(0, header_end),
			data = datastring,
			blob = new Blob();

		if (header.indexOf('base64') != -1) {
			data = _this.generateBinaryArray(datastring.substring(header_end));
		}

		// Fake blob for IE
		if (AmCharts.isIE && AmCharts.IEversion < 10) {
			blob.data = data;
			blob.size = data.length;
			blob.type = type;
			blob.encoding = 'base64';
		} else {
			blob = new Blob([data], {
				type: type
			});
		}
		return blob;
	},

	/*
	Creates PDF object
	@param config object
	*/
	generatePDF: function(cfg) {
		var _this = this,
			pdf = {
				output: function() {
					return '';
				}
			},
			data = _this.canvas.toDataURL('image/jpeg'), // JSPDF ONLY SUPPORTS JPG
			width = (_this.canvas.width * 25.4) / cfg.dpi,
			height = (_this.canvas.height * 25.4) / cfg.dpi;

		// Check
		if (window.jsPDF) {
			pdf = new jsPDF();
			if (pdf.addImage) {
				pdf.addImage(data, 'JPEG', 0, 0, width, height);
			} else {
				alert("Missing jsPDF plugin; Please add the 'addImage' plugin.");
			}
		} else {
			alert("Missing jsPDF lib; Don't forget to add the addImage plugin.");
		}

		return pdf;
	},

	/*
	Creates the CANVAS to receive the image data
	@param format void()
	@param callback; given callback function which returns the blob or datastring of the configured ouput type
	*/
	output: function(cfg, externalCallback) {
		var _this = this;
		cfg = AmCharts.extend(AmCharts.extend({}, _this.cfg.menuItemOutput), cfg || {});

		/* PRIVATE
		Callback function which gets called after the drawing process is done
		@param none
		*/
		function internalCallback() {
			var data = null;
			var blob;
			if (_this.DEBUG == 10) {
				_this.log('OUTPUT', format);
			} // DEBUG

			// SVG
			if (cfg.format == 'image/svg+xml' || cfg.format == 'svg') {
				for (var i = 0; i < _this.processing.buffer.length; i++) {
					data = new XMLSerializer().serializeToString(_this.processing.buffer[i][0]);
					blob = _this.generateBlob(data, 'image/svg+xml');

					if (cfg.output == 'save') {
						saveAs(blob, cfg.fileName + '.svg');
					} else if (cfg.output == 'datastring' || cfg.output == 'datauristring' || cfg.output == 'dataurlstring') {
						blob = 'data:image/svg+xml;base64,' + btoa(data);
					} else if (cfg.output == 'dataurlnewwindow') {
						window.open('data:image/svg+xml;base64,' + btoa(data));
					} else if (cfg.output == 'datauri' || cfg.output == 'dataurl') {
						location.href = 'data:image/svg+xml;base64,' + btoa(data);
					} else if (cfg.output == 'datastream') {
						location.href = 'data:image/octet-stream;base64,' + btoa(data);
					}

					if (externalCallback)
						externalCallback.apply(_this, [blob]);
				}
				// PDF
			} else if (cfg.format == 'application/pdf' || cfg.format == 'pdf') {
				data = _this.generatePDF(cfg).output('dataurlstring');
				blob = _this.generateBlob(data, 'application/pdf');

				if (cfg.output == 'save') {
					saveAs(blob, cfg.fileName + '.pdf');
				} else if (cfg.output == 'datastring' || cfg.output == 'datauristring' || cfg.output == 'dataurlstring') {
					blob = data;
				} else if (cfg.output == 'dataurlnewwindow') {
					window.open(data);
				} else if (cfg.output == 'datauri' || cfg.output == 'dataurl') {
					location.href = data;
				} else if (cfg.output == 'datastream') {
					location.href = data.replace('application/pdf', 'application/octet-stream');
				}

				if (externalCallback)
					externalCallback.apply(_this, [blob]);

				// PNG
			} else if (cfg.format == 'image/png' || cfg.format == 'png') {
				data = _this.canvas.toDataURL('image/png');
				blob = _this.generateBlob(data, 'image/png');

				if (cfg.output == 'save') {
					saveAs(blob, cfg.fileName + '.png');
				} else if (cfg.output == 'datastring' || cfg.output == 'datauristring' || cfg.output == 'dataurlstring') {
					blob = data;
				} else if (cfg.output == 'dataurlnewwindow') {
					window.open(data);
				} else if (cfg.output == 'datauri' || cfg.output == 'dataurl') {
					location.href = data;
				} else if (cfg.output == 'datastream') {
					location.href = data.replace('image/png', 'image/octet-stream');
				}

				if (externalCallback)
					externalCallback.apply(_this, [blob]);

				// JPG
			} else if (cfg.format == 'image/jpeg' || cfg.format == 'jpeg' || cfg.format == 'jpg') {
				data = _this.canvas.toDataURL('image/jpeg');
				blob = _this.generateBlob(data, 'image/jpeg');

				if (cfg.output == 'save') {
					saveAs(blob, cfg.fileName + '.jpg');
				} else if (cfg.output == 'datastring' || cfg.output == 'datauristring' || cfg.output == 'dataurlstring') {
					blob = data;
				} else if (cfg.output == 'dataurlnewwindow') {
					window.open(data);
				} else if (cfg.output == 'datauri' || cfg.output == 'dataurl') {
					location.href = data;
				} else if (cfg.output == 'datastream') {
					location.href = data.replace('image/jpeg', 'image/octet-stream');
				}

				if (externalCallback)
					externalCallback.apply(_this, [blob]);
			}

		}

		return _this.generateOutput(cfg, internalCallback);
	},

	/* PUBLIC
	Polifies missing attributes to the SVG and replaces images to embedded base64 images
	@param none
	*/
	polifySVG: function() {
		var _this = this;
		var svgs = _this.chart.div.getElementsByTagName('svg');

		// Recursive function to force the attributes
		function recursiveChange(svg, tag) {
			var items = svg.getElementsByTagName(tag);

			for (var i = 0; i < items.length; i++) {

				if ( _this.cfg.removeImagery ) {
					items[i].parentNode.removeChild(items[i]);

				} else {
					var image		= document.createElement('img');
					var canvas		= document.createElement('canvas');
					var ctx			= canvas.getContext('2d');

					canvas.width	= items[i].getAttribute('width');
					canvas.height	= items[i].getAttribute('height');
					image.src		= items[i].getAttribute('xlink:href');
					image.width		= items[i].getAttribute('width');
					image.height	= items[i].getAttribute('height');

					try {
						ctx.drawImage(image, 0, 0, image.width, image.height);
						datastring = canvas.toDataURL(); // image.src; // canvas.toDataURL(); //
					} catch (err) {
						datastring = image.src; // image.src; // canvas.toDataURL(); //

						_this.log('Tainted canvas, reached browser CORS security; origin from imagery must be equal to the server!');
						throw new Error(err);
					}

					items[i].setAttribute('xlink:href', datastring);
				}

				if (_this.DEBUG == 10) {
					_this.log('POLIFIED', items[i]);
				} // DEBUG
			}
		}

		// Loop through svgs to add some standardization
		for (var i = 0; i < svgs.length; i++) {
			var parent = svgs[i].parentNode;

			// Put some attrs to it; fixed 20/03/14 xmlns is required to produce a valid svg file
			if ( !AmCharts.isIE ) {
				svgs[i].setAttribute('xmlns','http://www.w3.org/2000/svg');
				//svgs[i].setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
			}
			//svgs[i].setAttribute('width',parent.style.width);
			//svgs[i].setAttribute('height',parent.style.height);

			// DEBUG
			if (_this.DEBUG == 10) {
				_this.log('POLIFIED', svgs[i]);
			}

			// Force link adaption
			recursiveChange(svgs[i], 'pattern');
			recursiveChange(svgs[i], 'image');

			_this.svgs.push(svgs[i]);
		}

		return svgs;
	},

	/* PUBLIC
	Generates the canvas with the given SVGs and configured renderer
	@param callback; function(); gets called after drawing process on the canvas has been finished
	*/
	generateOutput: function(cfg, callback) {
		var _this = this,
			svgs = _this.chart.div.getElementsByTagName('svg'),
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			offset = {
				y: 0,
				x: 0
			},
			tmp = {};

		// Reset
		_this.processing.buffer = [];
		_this.processing.drawn = 0;
		_this.canvas = canvas;

		// Walkthroug SVGs
		if (_this.DEBUG == 10) {
			_this.log('START EXPORT');
		} // DEBUG
		if (_this.DEBUG == 10) {
			_this.log('START BUFFERING');
		} // DEBUG
		for (var i = 0; i < svgs.length; i++) {
			var parent = svgs[i].parentNode,
				svgX = Number(parent.style.left.slice(0, -2)),
				svgY = Number(parent.style.top.slice(0, -2));
			tmp = AmCharts.extend({}, offset);

			// Overtake parent position if given; fixed 20/03/14 distinguish between relativ and others
			if ( parent.style.position == 'relative' ) {
				offset.x = svgX? svgX : offset.x;
				offset.y = svgY? svgY : offset.y;
			} else {
				offset.x = svgX;
				offset.y = svgY;
			}

			_this.processing.buffer.push([svgs[i], AmCharts.extend({}, offset)]);

			// Put back from "cache"
			if (svgY && svgX) {
				offset = tmp;

				// New offset for next one
			} else {
				offset.y += svgY ? 0 : parent.offsetHeight;
			}

			if (_this.DEBUG == 10) {
				_this.log('BUFFERED', svgs[i], offset);
			} // DEBUG
		}
		if (_this.DEBUG == 10) {
			_this.log('END BUFFERING');
		} // DEBUG

		// Apply background
		if (_this.DEBUG == 10) {
			_this.log('START DRAWING', cfg.render);
		} // DEBUG
		if (_this.DEBUG == 10) {
			_this.log('FILL BACKGROUND');
		} // DEBUG
		canvas.id = AmCharts.getUniqueId();
		canvas.width = _this.chart.divRealWidth;
		canvas.height = _this.chart.divRealHeight;

		// Set given background; jpeg default
		if (cfg.backgroundColor || format == 'image/jpeg') {
			context.fillStyle = cfg.backgroundColor || '#FFFFFF';
			context.fillRect(0, 0, canvas.width, canvas.height);
		}

		/* PRIVATE
		Recursive function to draw the images to the canvas;
		@param none;
		*/
		function drawItWhenItsLoaded() {
			var img, buffer, offset, source;

			// DRAWING PROCESS DONE
			if (_this.processing.buffer.length == _this.processing.drawn) {
				if (_this.DEBUG == 10) {
					_this.log('END DRAWING');
				} // DEBUG
				return callback();

				// LOOPING LUI
			} else {
				if (_this.DEBUG == 10) {
					_this.log('DRAW', _this.processing.drawn + 1, 'OF', _this.processing.buffer.length);
				} // DEBUG

				buffer = _this.processing.buffer[_this.processing.drawn];
				source = new XMLSerializer().serializeToString(buffer[0]); //source = 'data:image/svg+xml;base64,' + btoa();
				offset = buffer[1];

				if (_this.DEBUG == 10) {
					_this.log('SOURCE', source);
				} // DEBUG

				// NATIVE
				if (cfg.render == 'browser') {
					img = new Image();
					img.id = AmCharts.getUniqueId();
					source = 'data:image/svg+xml;base64,' + btoa(source);

					//img.crossOrigin	= "Anonymous";
					img.onload = function() {
						context.drawImage(this, buffer[1].x, buffer[1].y);
						_this.processing.drawn++;

						if (_this.DEBUG == 10) {
							_this.log('ONLOAD', this);
						} // DEBUG
						drawItWhenItsLoaded();
					};
					img.onerror = function() {
						if (_this.DEBUG == 10) {
							_this.log('ONERROR', this);
						} // DEBUG
						context.drawImage(this, buffer[1].x, buffer[1].y);
						_this.processing.drawn++;
						drawItWhenItsLoaded();
					};
					img.src = source;

					if (_this.DEBUG == 10) {
						_this.log('ADD', img);
					} // DEBUG
					if (img.complete || typeof(img.complete) == 'undefined' || img.complete === undefined) {
						if (_this.DEBUG == 10) {
							_this.log('FORCE ONLOAD', img);
						} // DEBUG
						img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
						img.src = source;
					}

					// CANVG
				} else if (cfg.render == 'canvg') {
					canvg(canvas, source, {
						offsetX: offset.x,
						offsetY: offset.y,
						ignoreMouse: true,
						ignoreAnimation: true,
						ignoreDimensions: true,
						ignoreClear: true,
						renderCallback: function() {
							_this.processing.drawn++;
							drawItWhenItsLoaded();
						}
					});
				}
			}
		}
		return drawItWhenItsLoaded();
	},

	/*
	Generates the export menu to trigger the exportation
	@param none;
	*/
	generateButtons: function() {
		var _this = this,
			div = document.createElement('div'),
			lvl = 0;

		// Push sublings
		function createList(items) {
			var ul = document.createElement('ul');

			ul.setAttribute('style', 'list-style: none; margin: 0; padding: 0;');

			// Walkthrough items
			for (var i = 0; i < items.length; i++) {
				var li = document.createElement('li'),
					img = document.createElement('img'),
					a = document.createElement('a'),
					item = items[i],
					children = null,
					itemStyle = AmCharts.extend(AmCharts.extend({}, _this.cfg.menuItemStyle), items[i]);

				// MERGE CFG
				item = AmCharts.extend(AmCharts.extend({}, _this.cfg.menuItemOutput), item);

				// ICON
				if (item['icon']) {
					img.alt = '';
					img.src = item['icon'];
					img.setAttribute('style', 'margin: 0 auto;border: none;outline: none');
					if (item['iconTitle']) {
						img.title = item['iconTitle'];
					}
					a.appendChild(img);
				}

				// TITLE; STYLING
				a.href = '#';
				if (item['title']) {
					img.setAttribute('style', 'margin-right: 5px;');
					a.innerHTML += item.title;
				}
				a.setAttribute('style', 'display: block;');
				AmCharts.extend(a.style, itemStyle);

				// ONCLICK
				a.onclick = item.onclick.bind(a, _this, item);
				li.appendChild(a);

				// APPEND SIBLINGS
				if (item.items) {
					children = createList(item.items);
					li.appendChild(children);

					li.onmouseover = function() {
						children.style.display = 'block';
					};
					li.onmouseout = function() {
						children.style.display = 'none';
					};
					children.style.display = 'none';
				}

				// Append to parent
				ul.appendChild(li);

				// Apply hover
				a.onmouseover = function() {
					this.style.backgroundColor = itemStyle.rollOverBackgroundColor;
					this.style.color = itemStyle.rollOverColor;
					this.style.borderColor = itemStyle.rollOverBorderColor;
				};
				a.onmouseout = function() {
					this.style.backgroundColor = itemStyle.backgroundColor;
					this.style.color = itemStyle.color;
					this.style.borderColor = itemStyle.borderColor;
				};
			}
			lvl++;

			if (_this.DEBUG == 10) {
				_this.log('MENU', ul);
			} // DEBUG

			return ul;
		}

		// Style wrapper; Push into chart div
		div.setAttribute('style', 'width:39px; height:28px; position: absolute;top:' + _this.cfg.menuTop + ';right:' + _this.cfg.menuRight + ';bottom:' + _this.cfg.menuBottom + ';left:' + _this.cfg.menuLeft + ';box-shadow:0px 0px 1px 0px rgba(0,0,0,0);');
		div.setAttribute('class', 'amExportButton');
		div.appendChild(createList(_this.cfg.menuItems));
		//_this.chart.div.style.position = 'relative';
		_this.chart.containerDiv.appendChild(div);
	}
});
/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed 
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
 */
(function(){
	// canvg(target, s)
	// empty parameters: replace all 'svg' elements on page with 'canvas' elements
	// target: canvas element or the id of a canvas element
	// s: svg string, url to svg file, or xml document
	// opts: optional hash of options
	//		 ignoreMouse: true => ignore mouse events
	//		 ignoreAnimation: true => ignore animations
	//		 ignoreDimensions: true => does not try to resize canvas
	//		 ignoreClear: true => does not clear canvas
	//		 offsetX: int => draws at a x offset
	//		 offsetY: int => draws at a y offset
	//		 scaleWidth: int => scales horizontally to width
	//		 scaleHeight: int => scales vertically to height
	//		 renderCallback: function => will call the function after the first render is completed
	//		 forceRedraw: function => will call the function on every frame, if it returns true, will redraw
	this.canvg = function (target, s, opts) {
		// no parameters
		if (target == null && s == null && opts == null) {
			var svgTags = document.getElementsByTagName('svg');
			for (var i=0; i<svgTags.length; i++) {
				var svgTag = svgTags[i];
				var c = document.createElement('canvas');
				c.width = svgTag.clientWidth;
				c.height = svgTag.clientHeight;
				svgTag.parentNode.insertBefore(c, svgTag);
				svgTag.parentNode.removeChild(svgTag);
				var div = document.createElement('div');
				div.appendChild(svgTag);
				canvg(c, div.innerHTML);
			}
			return;
		}	
		opts = opts || {};
	
		if (typeof target == 'string') {
			target = document.getElementById(target);
		}
		
		// store class on canvas
		if (target.svg != null) target.svg.stop();
		var svg = build();
		// on i.e. 8 for flash canvas, we can't assign the property so check for it
		if (!(target.childNodes.length == 1 && target.childNodes[0].nodeName == 'OBJECT')) target.svg = svg;
		svg.opts = opts;
		
		var ctx = target.getContext('2d');
		if (typeof(s.documentElement) != 'undefined') {
			// load from xml doc
			svg.loadXmlDoc(ctx, s);
		}
		else if (s.substr(0,1) == '<') {
			// load from xml string
			svg.loadXml(ctx, s);
		}
		else {
			// load from url
			svg.load(ctx, s);
		}
	}

	function build() {
		var svg = { };
		
		svg.FRAMERATE = 30;
		svg.MAX_VIRTUAL_PIXELS = 30000;
		
		// globals
		svg.init = function(ctx) {
			var uniqueId = 0;
			svg.UniqueId = function () { uniqueId++; return 'canvg' + uniqueId;	};
			svg.Definitions = {};
			svg.Styles = {};
			svg.Animations = [];
			svg.Images = [];
			svg.ctx = ctx;
			svg.ViewPort = new (function () {
				this.viewPorts = [];
				this.Clear = function() { this.viewPorts = []; }
				this.SetCurrent = function(width, height) { this.viewPorts.push({ width: width, height: height }); }
				this.RemoveCurrent = function() { this.viewPorts.pop(); }
				this.Current = function() { return this.viewPorts[this.viewPorts.length - 1]; }
				this.width = function() { return this.Current().width; }
				this.height = function() { return this.Current().height; }
				this.ComputeSize = function(d) {
					if (d != null && typeof(d) == 'number') return d;
					if (d == 'x') return this.width();
					if (d == 'y') return this.height();
					return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);			
				}
			});
		}
		svg.init();
		
		// images loaded
		svg.ImagesLoaded = function() { 
			for (var i=0; i<svg.Images.length; i++) {
				if (!svg.Images[i].loaded) return false;
			}
			return true;
		}

		// trim
		svg.trim = function(s) { return s.replace(/^\s+|\s+$/g, ''); }
		
		// compress spaces
		svg.compressSpaces = function(s) { return s.replace(/[\s\r\t\n]+/gm,' '); }
		
		// ajax
		svg.ajax = function(url) {
			var AJAX;
			if(window.XMLHttpRequest){AJAX=new XMLHttpRequest();}
			else{AJAX=new ActiveXObject('Microsoft.XMLHTTP');}
			if(AJAX){
			   AJAX.open('GET',url,false);
			   AJAX.send(null);
			   return AJAX.responseText;
			}
			return null;
		} 
		
		// parse xml
		
		svg.parseXml = function(xml) {			
			if (window.DOMParser)
			{
				var parser = new DOMParser();
				return parser.parseFromString(xml, 'text/xml');
			}
			else 
			{
				xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
				var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = 'false';
				xmlDoc.loadXML(xml); 
				return xmlDoc;
			}		
		}
		
		svg.Property = function(name, value) {
			this.name = name;
			this.value = value;
		}	
			svg.Property.prototype.getValue = function() {
				return this.value;
			}
		
			svg.Property.prototype.hasValue = function() {
				return (this.value != null && this.value !== '');
			}
							
			// return the numerical value of the property
			svg.Property.prototype.numValue = function() {
				if (!this.hasValue()) return 0;
				
				var n = parseFloat(this.value);
				if ((this.value + '').match(/%$/)) {
					n = n / 100.0;
				}
				return n;
			}
			
			svg.Property.prototype.valueOrDefault = function(def) {
				if (this.hasValue()) return this.value;
				return def;
			}
			
			svg.Property.prototype.numValueOrDefault = function(def) {
				if (this.hasValue()) return this.numValue();
				return def;
			}
			
			// color extensions
				// augment the current color value with the opacity
				svg.Property.prototype.addOpacity = function(opacity) {
					var newValue = this.value;
					if (opacity != null && opacity != '' && typeof(this.value)=='string') { // can only add opacity to colors, not patterns
						var color = new RGBColor(this.value);
						if (color.ok) {
							newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';
						}
					}
					return new svg.Property(this.name, newValue);
				}
			
			// definition extensions
				// get the definition from the definitions table
				svg.Property.prototype.getDefinition = function() {
					var name = this.value.match(/#([^\)'"]+)/);
					if (name) { name = name[1]; }
					if (!name) { name = this.value; }
					return svg.Definitions[name];
				}
				
				svg.Property.prototype.isUrlDefinition = function() {
					return this.value.indexOf('url(') == 0
				}
				
				svg.Property.prototype.getFillStyleDefinition = function(e, opacityProp) {
					var def = this.getDefinition();
					
					// gradient
					if (def != null && def.createGradient) {
						return def.createGradient(svg.ctx, e, opacityProp);
					}
					
					// pattern
					if (def != null && def.createPattern) {
						if (def.getHrefAttribute().hasValue()) {
							var pt = def.attribute('patternTransform');
							def = def.getHrefAttribute().getDefinition();
							if (pt.hasValue()) { def.attribute('patternTransform', true).value = pt.value; }
						}
						return def.createPattern(svg.ctx, e);
					}
					
					return null;
				}
			
			// length extensions
				svg.Property.prototype.getDPI = function(viewPort) {
					return 96.0; // TODO: compute?
				}
				
				svg.Property.prototype.getEM = function(viewPort) {
					var em = 12;
					
					var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
					if (fontSize.hasValue()) em = fontSize.toPixels(viewPort);
					
					return em;
				}
				
				svg.Property.prototype.getUnits = function() {
					var s = this.value+'';
					return s.replace(/[0-9\.\-]/g,'');
				}
			
				// get the length as pixels
				svg.Property.prototype.toPixels = function(viewPort, processPercent) {
					if (!this.hasValue()) return 0;
					var s = this.value+'';
					if (s.match(/em$/)) return this.numValue() * this.getEM(viewPort);
					if (s.match(/ex$/)) return this.numValue() * this.getEM(viewPort) / 2.0;
					if (s.match(/px$/)) return this.numValue();
					if (s.match(/pt$/)) return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0);
					if (s.match(/pc$/)) return this.numValue() * 15;
					if (s.match(/cm$/)) return this.numValue() * this.getDPI(viewPort) / 2.54;
					if (s.match(/mm$/)) return this.numValue() * this.getDPI(viewPort) / 25.4;
					if (s.match(/in$/)) return this.numValue() * this.getDPI(viewPort);
					if (s.match(/%$/)) return this.numValue() * svg.ViewPort.ComputeSize(viewPort);
					var n = this.numValue();
					if (processPercent && n < 1.0) return n * svg.ViewPort.ComputeSize(viewPort);
					return n;
				}

			// time extensions
				// get the time as milliseconds
				svg.Property.prototype.toMilliseconds = function() {
					if (!this.hasValue()) return 0;
					var s = this.value+'';
					if (s.match(/s$/)) return this.numValue() * 1000;
					if (s.match(/ms$/)) return this.numValue();
					return this.numValue();
				}
			
			// angle extensions
				// get the angle as radians
				svg.Property.prototype.toRadians = function() {
					if (!this.hasValue()) return 0;
					var s = this.value+'';
					if (s.match(/deg$/)) return this.numValue() * (Math.PI / 180.0);
					if (s.match(/grad$/)) return this.numValue() * (Math.PI / 200.0);
					if (s.match(/rad$/)) return this.numValue();
					return this.numValue() * (Math.PI / 180.0);
				}
		
		// fonts
		svg.Font = new (function() {
			this.Styles = 'normal|italic|oblique|inherit';
			this.Variants = 'normal|small-caps|inherit';
			this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';
			
			this.CreateFont = function(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) { 
				var f = inherit != null ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
				return { 
					fontFamily: fontFamily || f.fontFamily, 
					fontSize: fontSize || f.fontSize, 
					fontStyle: fontStyle || f.fontStyle, 
					fontWeight: fontWeight || f.fontWeight, 
					fontVariant: fontVariant || f.fontVariant,
					toString: function () { return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ') } 
				} 
			}
			
			var that = this;
			this.Parse = function(s) {
				var f = {};
				var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
				var set = { fontSize: false, fontStyle: false, fontWeight: false, fontVariant: false }
				var ff = '';
				for (var i=0; i<d.length; i++) {
					if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontStyle = d[i]; set.fontStyle = true; }
					else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) { if (d[i] != 'inherit') f.fontVariant = d[i]; set.fontStyle = set.fontVariant = true;	}
					else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) {	if (d[i] != 'inherit') f.fontWeight = d[i]; set.fontStyle = set.fontVariant = set.fontWeight = true; }
					else if (!set.fontSize) { if (d[i] != 'inherit') f.fontSize = d[i].split('/')[0]; set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true; }
					else { if (d[i] != 'inherit') ff += d[i]; }
				} if (ff != '') f.fontFamily = ff;
				return f;
			}
		});
		
		// points and paths
		svg.ToNumberArray = function(s) {
			var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');
			for (var i=0; i<a.length; i++) {
				a[i] = parseFloat(a[i]);
			}
			return a;
		}		
		svg.Point = function(x, y) {
			this.x = x;
			this.y = y;
		}	
			svg.Point.prototype.angleTo = function(p) {
				return Math.atan2(p.y - this.y, p.x - this.x);
			}
			
			svg.Point.prototype.applyTransform = function(v) {
				var xp = this.x * v[0] + this.y * v[2] + v[4];
				var yp = this.x * v[1] + this.y * v[3] + v[5];
				this.x = xp;
				this.y = yp;
			}

		svg.CreatePoint = function(s) {
			var a = svg.ToNumberArray(s);
			return new svg.Point(a[0], a[1]);
		}
		svg.CreatePath = function(s) {
			var a = svg.ToNumberArray(s);
			var path = [];
			for (var i=0; i<a.length; i+=2) {
				path.push(new svg.Point(a[i], a[i+1]));
			}
			return path;
		}
		
		// bounding box
		svg.BoundingBox = function(x1, y1, x2, y2) { // pass in initial points if you want
			this.x1 = Number.NaN;
			this.y1 = Number.NaN;
			this.x2 = Number.NaN;
			this.y2 = Number.NaN;
			
			this.x = function() { return this.x1; }
			this.y = function() { return this.y1; }
			this.width = function() { return this.x2 - this.x1; }
			this.height = function() { return this.y2 - this.y1; }
			
			this.addPoint = function(x, y) {	
				if (x != null) {
					if (isNaN(this.x1) || isNaN(this.x2)) {
						this.x1 = x;
						this.x2 = x;
					}
					if (x < this.x1) this.x1 = x;
					if (x > this.x2) this.x2 = x;
				}
			
				if (y != null) {
					if (isNaN(this.y1) || isNaN(this.y2)) {
						this.y1 = y;
						this.y2 = y;
					}
					if (y < this.y1) this.y1 = y;
					if (y > this.y2) this.y2 = y;
				}
			}			
			this.addX = function(x) { this.addPoint(x, null); }
			this.addY = function(y) { this.addPoint(null, y); }
			
			this.addBoundingBox = function(bb) {
				this.addPoint(bb.x1, bb.y1);
				this.addPoint(bb.x2, bb.y2);
			}
			
			this.addQuadraticCurve = function(p0x, p0y, p1x, p1y, p2x, p2y) {
				var cp1x = p0x + 2/3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)
				var cp1y = p0y + 2/3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)
				var cp2x = cp1x + 1/3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)
				var cp2y = cp1y + 1/3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)
				this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y,	cp2y, p2x, p2y);
			}
			
			this.addBezierCurve = function(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
				// from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
				var p0 = [p0x, p0y], p1 = [p1x, p1y], p2 = [p2x, p2y], p3 = [p3x, p3y];
				this.addPoint(p0[0], p0[1]);
				this.addPoint(p3[0], p3[1]);
				
				for (i=0; i<=1; i++) {
					var f = function(t) { 
						return Math.pow(1-t, 3) * p0[i]
						+ 3 * Math.pow(1-t, 2) * t * p1[i]
						+ 3 * (1-t) * Math.pow(t, 2) * p2[i]
						+ Math.pow(t, 3) * p3[i];
					}
					
					var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
					var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
					var c = 3 * p1[i] - 3 * p0[i];
					
					if (a == 0) {
						if (b == 0) continue;
						var t = -c / b;
						if (0 < t && t < 1) {
							if (i == 0) this.addX(f(t));
							if (i == 1) this.addY(f(t));
						}
						continue;
					}
					
					var b2ac = Math.pow(b, 2) - 4 * c * a;
					if (b2ac < 0) continue;
					var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
					if (0 < t1 && t1 < 1) {
						if (i == 0) this.addX(f(t1));
						if (i == 1) this.addY(f(t1));
					}
					var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
					if (0 < t2 && t2 < 1) {
						if (i == 0) this.addX(f(t2));
						if (i == 1) this.addY(f(t2));
					}
				}
			}
			
			this.isPointInBox = function(x, y) {
				return (this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2);
			}
			
			this.addPoint(x1, y1);
			this.addPoint(x2, y2);
		}
		
		// transforms
		svg.Transform = function(v) {	
			var that = this;
			this.Type = {}
		
			// translate
			this.Type.translate = function(s) {
				this.p = svg.CreatePoint(s);			
				this.apply = function(ctx) {
					ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
				}
				this.unapply = function(ctx) {
					ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
				}
				this.applyToPoint = function(p) {
					p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
				}
			}
			
			// rotate
			this.Type.rotate = function(s) {
				var a = svg.ToNumberArray(s);
				this.angle = new svg.Property('angle', a[0]);
				this.cx = a[1] || 0;
				this.cy = a[2] || 0;
				this.apply = function(ctx) {
					ctx.translate(this.cx, this.cy);
					ctx.rotate(this.angle.toRadians());
					ctx.translate(-this.cx, -this.cy);
				}
				this.unapply = function(ctx) {
					ctx.translate(this.cx, this.cy);
					ctx.rotate(-1.0 * this.angle.toRadians());
					ctx.translate(-this.cx, -this.cy);
				}
				this.applyToPoint = function(p) {
					var a = this.angle.toRadians();
					p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
					p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]);
					p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
				}			
			}
			
			this.Type.scale = function(s) {
				this.p = svg.CreatePoint(s);
				this.apply = function(ctx) {
					ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
				}
				this.unapply = function(ctx) {
					ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
				}
				this.applyToPoint = function(p) {
					p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
				}				
			}
			
			this.Type.matrix = function(s) {
				this.m = svg.ToNumberArray(s);
				this.apply = function(ctx) {
					ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
				}
				this.applyToPoint = function(p) {
					p.applyTransform(this.m);
				}					
			}
			
			this.Type.SkewBase = function(s) {
				this.base = that.Type.matrix;
				this.base(s);
				this.angle = new svg.Property('angle', s);
			}
			this.Type.SkewBase.prototype = new this.Type.matrix;
			
			this.Type.skewX = function(s) {
				this.base = that.Type.SkewBase;
				this.base(s);
				this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
			}
			this.Type.skewX.prototype = new this.Type.SkewBase;
			
			this.Type.skewY = function(s) {
				this.base = that.Type.SkewBase;
				this.base(s);
				this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
			}
			this.Type.skewY.prototype = new this.Type.SkewBase;
		
			this.transforms = [];
			
			this.apply = function(ctx) {
				for (var i=0; i<this.transforms.length; i++) {
					this.transforms[i].apply(ctx);
				}
			}
			
			this.unapply = function(ctx) {
				for (var i=this.transforms.length-1; i>=0; i--) {
					this.transforms[i].unapply(ctx);
				}
			}
			
			this.applyToPoint = function(p) {
				for (var i=0; i<this.transforms.length; i++) {
					this.transforms[i].applyToPoint(p);
				}
			}
			
			var data = svg.trim(svg.compressSpaces(v)).replace(/\)(\s?,\s?)/g,') ').split(/\s(?=[a-z])/);
			for (var i=0; i<data.length; i++) {
				var type = svg.trim(data[i].split('(')[0]);
				var s = data[i].split('(')[1].replace(')','');
				var transform = new this.Type[type](s);
				transform.type = type;
				this.transforms.push(transform);
			}
		}
		
		// aspect ratio
		svg.AspectRatio = function(ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
			// aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
			aspectRatio = svg.compressSpaces(aspectRatio);
			aspectRatio = aspectRatio.replace(/^defer\s/,''); // ignore defer
			var align = aspectRatio.split(' ')[0] || 'xMidYMid';
			var meetOrSlice = aspectRatio.split(' ')[1] || 'meet';					
	
			// calculate scale
			var scaleX = width / desiredWidth;
			var scaleY = height / desiredHeight;
			var scaleMin = Math.min(scaleX, scaleY);
			var scaleMax = Math.max(scaleX, scaleY);
			if (meetOrSlice == 'meet') { desiredWidth *= scaleMin; desiredHeight *= scaleMin; }
			if (meetOrSlice == 'slice') { desiredWidth *= scaleMax; desiredHeight *= scaleMax; }	
			
			refX = new svg.Property('refX', refX);
			refY = new svg.Property('refY', refY);
			if (refX.hasValue() && refY.hasValue()) {				
				ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
			} 
			else {					
				// align
				if (align.match(/^xMid/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) ctx.translate(width / 2.0 - desiredWidth / 2.0, 0); 
				if (align.match(/YMid$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) ctx.translate(0, height / 2.0 - desiredHeight / 2.0); 
				if (align.match(/^xMax/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) ctx.translate(width - desiredWidth, 0); 
				if (align.match(/YMax$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) ctx.translate(0, height - desiredHeight); 
			}
			
			// scale
			if (align == 'none') ctx.scale(scaleX, scaleY);
			else if (meetOrSlice == 'meet') ctx.scale(scaleMin, scaleMin); 
			else if (meetOrSlice == 'slice') ctx.scale(scaleMax, scaleMax); 	
			
			// translate
			ctx.translate(minX == null ? 0 : -minX, minY == null ? 0 : -minY);			
		}
		
		// elements
		svg.Element = {}
		
		svg.EmptyProperty = new svg.Property('EMPTY', '');
		
		svg.Element.ElementBase = function(node) {	
			this.attributes = {};
			this.styles = {};
			this.children = [];
			
			// get or create attribute
			this.attribute = function(name, createIfNotExists) {
				var a = this.attributes[name];
				if (a != null) return a;
							
				if (createIfNotExists == true) { a = new svg.Property(name, ''); this.attributes[name] = a; }
				return a || svg.EmptyProperty;
			}
			
			this.getHrefAttribute = function() {
				for (var a in this.attributes) { 
					if (a.match(/:href$/)) { 
						return this.attributes[a]; 
					} 
				}
				return svg.EmptyProperty;
			}
			
			// get or create style, crawls up node tree
			this.style = function(name, createIfNotExists) {
				var s = this.styles[name];
				if (s != null) return s;
				
				var a = this.attribute(name);
				if (a != null && a.hasValue()) {
					this.styles[name] = a; // move up to me to cache
					return a;
				}
				
				var p = this.parent;
				if (p != null) {
					var ps = p.style(name);
					if (ps != null && ps.hasValue()) {
						return ps;
					}
				}
					
				if (createIfNotExists == true) { s = new svg.Property(name, ''); this.styles[name] = s; }
				return s || svg.EmptyProperty;
			}
			
			// base render
			this.render = function(ctx) {
				// don't render display=none
				if (this.style('display').value == 'none') return;
				
				// don't render visibility=hidden
				if (this.attribute('visibility').value == 'hidden') return;
			
				ctx.save();
				if (this.attribute('mask').hasValue()) { // mask
					var mask = this.attribute('mask').getDefinition();
					if (mask != null) mask.apply(ctx, this);
				}
				else if (this.style('filter').hasValue()) { // filter
					var filter = this.style('filter').getDefinition();
					if (filter != null) filter.apply(ctx, this);
				}
				else {	
					this.setContext(ctx);
					this.renderChildren(ctx);	
					this.clearContext(ctx);							
				}
				ctx.restore();
			}
			
			// base set context
			this.setContext = function(ctx) {
				// OVERRIDE ME!
			}
			
			// base clear context
			this.clearContext = function(ctx) {
				// OVERRIDE ME!
			}			
			
			// base render children
			this.renderChildren = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					this.children[i].render(ctx);
				}
			}
			
			this.addChild = function(childNode, create) {
				var child = childNode;
				if (create) child = svg.CreateElement(childNode);
				child.parent = this;
				this.children.push(child);			
			}
				
			if (node != null && node.nodeType == 1) { //ELEMENT_NODE
				// add children
				for (var i=0; i<node.childNodes.length; i++) {
					var childNode = node.childNodes[i];
					if (childNode.nodeType == 1) this.addChild(childNode, true); //ELEMENT_NODE
					if (this.captureTextNodes && childNode.nodeType == 3) {
						var text = childNode.nodeValue || childNode.text || '';
						if (svg.trim(svg.compressSpaces(text)) != '') {
							this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
						}
					}
				}
				
				// add attributes
				for (var i=0; i<node.attributes.length; i++) {
					var attribute = node.attributes[i];
					this.attributes[attribute.nodeName] = new svg.Property(attribute.nodeName, attribute.nodeValue);
				}
										
				// add tag styles
				var styles = svg.Styles[node.nodeName];
				if (styles != null) {
					for (var name in styles) {
						this.styles[name] = styles[name];
					}
				}					
				
				// add class styles
				if (this.attribute('class').hasValue()) {
					var classes = svg.compressSpaces(this.attribute('class').value).split(' ');
					for (var j=0; j<classes.length; j++) {
						styles = svg.Styles['.'+classes[j]];
						if (styles != null) {
							for (var name in styles) {
								this.styles[name] = styles[name];
							}
						}
						styles = svg.Styles[node.nodeName+'.'+classes[j]];
						if (styles != null) {
							for (var name in styles) {
								this.styles[name] = styles[name];
							}
						}
					}
				}
				
				// add id styles
				if (this.attribute('id').hasValue()) {
					var styles = svg.Styles['#' + this.attribute('id').value];
					if (styles != null) {
						for (var name in styles) {
							this.styles[name] = styles[name];
						}
					}
				}
				
				// add inline styles
				if (this.attribute('style').hasValue()) {
					var styles = this.attribute('style').value.split(';');
					for (var i=0; i<styles.length; i++) {
						if (svg.trim(styles[i]) != '') {
							var style = styles[i].split(':');
							var name = svg.trim(style[0]);
							var value = svg.trim(style[1]);
							this.styles[name] = new svg.Property(name, value);
						}
					}
				}	

				// add id
				if (this.attribute('id').hasValue()) {
					if (svg.Definitions[this.attribute('id').value] == null) {
						svg.Definitions[this.attribute('id').value] = this;
					}
				}
			}
		}
		
		svg.Element.RenderedElementBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.setContext = function(ctx) {
				// fill
				if (this.style('fill').isUrlDefinition()) {
					var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
					if (fs != null) ctx.fillStyle = fs;
				}
				else if (this.style('fill').hasValue()) {
					var fillStyle = this.style('fill');
					if (fillStyle.value == 'currentColor') fillStyle.value = this.style('color').value;
					ctx.fillStyle = (fillStyle.value == 'none' ? 'rgba(0,0,0,0)' : fillStyle.value);
				}
				if (this.style('fill-opacity').hasValue()) {
					var fillStyle = new svg.Property('fill', ctx.fillStyle);
					fillStyle = fillStyle.addOpacity(this.style('fill-opacity').value);
					ctx.fillStyle = fillStyle.value;
				}
									
				// stroke
				if (this.style('stroke').isUrlDefinition()) {
					var fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));
					if (fs != null) ctx.strokeStyle = fs;
				}
				else if (this.style('stroke').hasValue()) {
					var strokeStyle = this.style('stroke');
					if (strokeStyle.value == 'currentColor') strokeStyle.value = this.style('color').value;
					ctx.strokeStyle = (strokeStyle.value == 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value);
				}
				if (this.style('stroke-opacity').hasValue()) {
					var strokeStyle = new svg.Property('stroke', ctx.strokeStyle);
					strokeStyle = strokeStyle.addOpacity(this.style('stroke-opacity').value);
					ctx.strokeStyle = strokeStyle.value;
				}
				if (this.style('stroke-width').hasValue()) {
					var newLineWidth = this.style('stroke-width').toPixels();
					ctx.lineWidth = newLineWidth == 0 ? 0.001 : newLineWidth; // browsers don't respect 0
			    }
				if (this.style('stroke-linecap').hasValue()) ctx.lineCap = this.style('stroke-linecap').value;
				if (this.style('stroke-linejoin').hasValue()) ctx.lineJoin = this.style('stroke-linejoin').value;
				if (this.style('stroke-miterlimit').hasValue()) ctx.miterLimit = this.style('stroke-miterlimit').value;
				if (this.style('stroke-dasharray').hasValue()) {
					var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);
					if (typeof(ctx.setLineDash) != 'undefined') { ctx.setLineDash(gaps); }
					else if (typeof(ctx.webkitLineDash) != 'undefined') { ctx.webkitLineDash = gaps; }
					else if (typeof(ctx.mozDash ) != 'undefined') { ctx.mozDash  = gaps; }
					
					var offset = this.style('stroke-dashoffset').numValueOrDefault(1);
					if (typeof(ctx.lineDashOffset) != 'undefined') { ctx.lineDashOffset = offset; }
					else if (typeof(ctx.webkitLineDashOffset) != 'undefined') { ctx.webkitLineDashOffset = offset; }
					else if (typeof(ctx.mozDashOffset) != 'undefined') { ctx.mozDashOffset = offset; }
				}

				// font
				if (typeof(ctx.font) != 'undefined') {
					ctx.font = svg.Font.CreateFont( 
						this.style('font-style').value, 
						this.style('font-variant').value, 
						this.style('font-weight').value, 
						this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '', 
						this.style('font-family').value).toString();
				}
				
				// transform
				if (this.attribute('transform').hasValue()) { 
					var transform = new svg.Transform(this.attribute('transform').value);
					transform.apply(ctx);
				}
				
				// clip
				if (this.style('clip-path').hasValue()) {
					var clip = this.style('clip-path').getDefinition();
					if (clip != null) clip.apply(ctx);
				}
				
				// opacity
				if (this.style('opacity').hasValue()) {
					ctx.globalAlpha = this.style('opacity').numValue();
				}
			}		
		}
		svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase;
		
		svg.Element.PathElementBase = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				if (ctx != null) ctx.beginPath();
				return new svg.BoundingBox();
			}
			
			this.renderChildren = function(ctx) {
				this.path(ctx);
				svg.Mouse.checkPath(this, ctx);
				if (ctx.fillStyle != '') {
					if (this.attribute('fill-rule').hasValue()) { ctx.fill(this.attribute('fill-rule').value); }
					else { ctx.fill(); }
				}
				if (ctx.strokeStyle != '') ctx.stroke();
				
				var markers = this.getMarkers();
				if (markers != null) {
					if (this.style('marker-start').isUrlDefinition()) {
						var marker = this.style('marker-start').getDefinition();
						marker.render(ctx, markers[0][0], markers[0][1]);
					}
					if (this.style('marker-mid').isUrlDefinition()) {
						var marker = this.style('marker-mid').getDefinition();
						for (var i=1;i<markers.length-1;i++) {
							marker.render(ctx, markers[i][0], markers[i][1]);
						}
					}
					if (this.style('marker-end').isUrlDefinition()) {
						var marker = this.style('marker-end').getDefinition();
						marker.render(ctx, markers[markers.length-1][0], markers[markers.length-1][1]);
					}
				}					
			}
			
			this.getBoundingBox = function() {
				return this.path();
			}
			
			this.getMarkers = function() {
				return null;
			}
		}
		svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase;
		
		// svg element
		svg.Element.svg = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseClearContext = this.clearContext;
			this.clearContext = function(ctx) {
				this.baseClearContext(ctx);
				svg.ViewPort.RemoveCurrent();
			}
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				// initial values
				ctx.strokeStyle = 'rgba(0,0,0,0)';
				ctx.lineCap = 'butt';
				ctx.lineJoin = 'miter';
				ctx.miterLimit = 4;			
			
				this.baseSetContext(ctx);
				
				// create new view port
				if (!this.attribute('x').hasValue()) this.attribute('x', true).value = 0;
				if (!this.attribute('y').hasValue()) this.attribute('y', true).value = 0;
				ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));
				
				var width = svg.ViewPort.width();
				var height = svg.ViewPort.height();
				
				if (!this.attribute('width').hasValue()) this.attribute('width', true).value = '100%';
				if (!this.attribute('height').hasValue()) this.attribute('height', true).value = '100%';
				if (typeof(this.root) == 'undefined') {
					width = this.attribute('width').toPixels('x');
					height = this.attribute('height').toPixels('y');
					
					var x = 0;
					var y = 0;
					if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
						x = -this.attribute('refX').toPixels('x');
						y = -this.attribute('refY').toPixels('y');
					}
					
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.lineTo(width, y);
					ctx.lineTo(width, height);
					ctx.lineTo(x, height);
					ctx.closePath();
					ctx.clip();
				}
				svg.ViewPort.SetCurrent(width, height);	
						
				// viewbox
				if (this.attribute('viewBox').hasValue()) {				
					var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
					var minX = viewBox[0];
					var minY = viewBox[1];
					width = viewBox[2];
					height = viewBox[3];
					
					svg.AspectRatio(ctx,
									this.attribute('preserveAspectRatio').value, 
									svg.ViewPort.width(), 
									width,
									svg.ViewPort.height(),
									height,
									minX,
									minY,
									this.attribute('refX').value,
									this.attribute('refY').value);
										
					svg.ViewPort.RemoveCurrent();	
					svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);						
				}				
			}
		}
		svg.Element.svg.prototype = new svg.Element.RenderedElementBase;

		// rect element
		svg.Element.rect = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');
				var rx = this.attribute('rx').toPixels('x');
				var ry = this.attribute('ry').toPixels('y');
				if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
				if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
				rx = Math.min(rx, width / 2.0);
				ry = Math.min(ry, height / 2.0);
				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(x + rx, y);
					ctx.lineTo(x + width - rx, y);
					ctx.quadraticCurveTo(x + width, y, x + width, y + ry)
					ctx.lineTo(x + width, y + height - ry);
					ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height)
					ctx.lineTo(x + rx, y + height);
					ctx.quadraticCurveTo(x, y + height, x, y + height - ry)
					ctx.lineTo(x, y + ry);
					ctx.quadraticCurveTo(x, y, x + rx, y)
					ctx.closePath();
				}
				
				return new svg.BoundingBox(x, y, x + width, y + height);
			}
		}
		svg.Element.rect.prototype = new svg.Element.PathElementBase;
		
		// circle element
		svg.Element.circle = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				var cx = this.attribute('cx').toPixels('x');
				var cy = this.attribute('cy').toPixels('y');
				var r = this.attribute('r').toPixels();
			
				if (ctx != null) {
					ctx.beginPath();
					ctx.arc(cx, cy, r, 0, Math.PI * 2, true); 
					ctx.closePath();
				}
				
				return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
			}
		}
		svg.Element.circle.prototype = new svg.Element.PathElementBase;	

		// ellipse element
		svg.Element.ellipse = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
				var rx = this.attribute('rx').toPixels('x');
				var ry = this.attribute('ry').toPixels('y');
				var cx = this.attribute('cx').toPixels('x');
				var cy = this.attribute('cy').toPixels('y');
				
				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(cx, cy - ry);
					ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
					ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
					ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
					ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
					ctx.closePath();
				}
				
				return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
			}
		}
		svg.Element.ellipse.prototype = new svg.Element.PathElementBase;			
		
		// line element
		svg.Element.line = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.getPoints = function() {
				return [
					new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')),
					new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
			}
								
			this.path = function(ctx) {
				var points = this.getPoints();
				
				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(points[0].x, points[0].y);
					ctx.lineTo(points[1].x, points[1].y);
				}
				
				return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
			}
			
			this.getMarkers = function() {
				var points = this.getPoints();	
				var a = points[0].angleTo(points[1]);
				return [[points[0], a], [points[1], a]];
			}
		}
		svg.Element.line.prototype = new svg.Element.PathElementBase;		
				
		// polyline element
		svg.Element.polyline = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.points = svg.CreatePath(this.attribute('points').value);
			this.path = function(ctx) {
				var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);
				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(this.points[0].x, this.points[0].y);
				}
				for (var i=1; i<this.points.length; i++) {
					bb.addPoint(this.points[i].x, this.points[i].y);
					if (ctx != null) ctx.lineTo(this.points[i].x, this.points[i].y);
				}
				return bb;
			}
			
			this.getMarkers = function() {
				var markers = [];
				for (var i=0; i<this.points.length - 1; i++) {
					markers.push([this.points[i], this.points[i].angleTo(this.points[i+1])]);
				}
				markers.push([this.points[this.points.length-1], markers[markers.length-1][1]]);
				return markers;
			}			
		}
		svg.Element.polyline.prototype = new svg.Element.PathElementBase;				
				
		// polygon element
		svg.Element.polygon = function(node) {
			this.base = svg.Element.polyline;
			this.base(node);
			
			this.basePath = this.path;
			this.path = function(ctx) {
				var bb = this.basePath(ctx);
				if (ctx != null) {
					ctx.lineTo(this.points[0].x, this.points[0].y);
					ctx.closePath();
				}
				return bb;
			}
		}
		svg.Element.polygon.prototype = new svg.Element.polyline;

		// path element
		svg.Element.path = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
					
			var d = this.attribute('d').value;
			// TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
			d = d.replace(/,/gm,' '); // get rid of all commas
			d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
			d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
			d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,'$1 $2'); // separate commands from points
			d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from points
			d = d.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits when no comma
			d = d.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); // separate digits when no comma
			d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,'$1 $3 $4 '); // shorthand elliptical arc path syntax
			d = svg.compressSpaces(d); // compress multiple spaces
			d = svg.trim(d);
			this.PathParser = new (function(d) {
				this.tokens = d.split(' ');
				
				this.reset = function() {
					this.i = -1;
					this.command = '';
					this.previousCommand = '';
					this.start = new svg.Point(0, 0);
					this.control = new svg.Point(0, 0);
					this.current = new svg.Point(0, 0);
					this.points = [];
					this.angles = [];
				}
								
				this.isEnd = function() {
					return this.i >= this.tokens.length - 1;
				}
				
				this.isCommandOrEnd = function() {
					if (this.isEnd()) return true;
					return this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
				}
				
				this.isRelativeCommand = function() {
					switch(this.command)
					{
						case 'm':
						case 'l':
						case 'h':
						case 'v':
						case 'c':
						case 's':
						case 'q':
						case 't':
						case 'a':
						case 'z':
							return true;
							break;
					}
					return false;
				}
							
				this.getToken = function() {
					this.i++;
					return this.tokens[this.i];
				}
				
				this.getScalar = function() {
					return parseFloat(this.getToken());
				}
				
				this.nextCommand = function() {
					this.previousCommand = this.command;
					this.command = this.getToken();
				}				
				
				this.getPoint = function() {
					var p = new svg.Point(this.getScalar(), this.getScalar());
					return this.makeAbsolute(p);
				}
				
				this.getAsControlPoint = function() {
					var p = this.getPoint();
					this.control = p;
					return p;
				}
				
				this.getAsCurrentPoint = function() {
					var p = this.getPoint();
					this.current = p;
					return p;	
				}
				
				this.getReflectedControlPoint = function() {
					if (this.previousCommand.toLowerCase() != 'c' && 
					    this.previousCommand.toLowerCase() != 's' &&
						this.previousCommand.toLowerCase() != 'q' && 
						this.previousCommand.toLowerCase() != 't' ){
						return this.current;
					}
					
					// reflect point
					var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);					
					return p;
				}
				
				this.makeAbsolute = function(p) {
					if (this.isRelativeCommand()) {
						p.x += this.current.x;
						p.y += this.current.y;
					}
					return p;
				}
				
				this.addMarker = function(p, from, priorTo) {
					// if the last angle isn't filled in because we didn't have this point yet ...
					if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length-1] == null) {
						this.angles[this.angles.length-1] = this.points[this.points.length-1].angleTo(priorTo);
					}
					this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
				}
				
				this.addMarkerAngle = function(p, a) {
					this.points.push(p);
					this.angles.push(a);
				}				
				
				this.getMarkerPoints = function() { return this.points; }
				this.getMarkerAngles = function() {
					for (var i=0; i<this.angles.length; i++) {
						if (this.angles[i] == null) {
							for (var j=i+1; j<this.angles.length; j++) {
								if (this.angles[j] != null) {
									this.angles[i] = this.angles[j];
									break;
								}
							}
						}
					}
					return this.angles;
				}
			})(d);

			this.path = function(ctx) {
				var pp = this.PathParser;
				pp.reset();

				var bb = new svg.BoundingBox();
				if (ctx != null) ctx.beginPath();
				while (!pp.isEnd()) {
					pp.nextCommand();
					switch (pp.command) {
					case 'M':
					case 'm':
						var p = pp.getAsCurrentPoint();
						pp.addMarker(p);
						bb.addPoint(p.x, p.y);
						if (ctx != null) ctx.moveTo(p.x, p.y);
						pp.start = pp.current;
						while (!pp.isCommandOrEnd()) {
							var p = pp.getAsCurrentPoint();
							pp.addMarker(p, pp.start);
							bb.addPoint(p.x, p.y);
							if (ctx != null) ctx.lineTo(p.x, p.y);
						}
						break;
					case 'L':
					case 'l':
						while (!pp.isCommandOrEnd()) {
							var c = pp.current;
							var p = pp.getAsCurrentPoint();
							pp.addMarker(p, c);
							bb.addPoint(p.x, p.y);
							if (ctx != null) ctx.lineTo(p.x, p.y);
						}
						break;
					case 'H':
					case 'h':
						while (!pp.isCommandOrEnd()) {
							var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
							pp.addMarker(newP, pp.current);
							pp.current = newP;
							bb.addPoint(pp.current.x, pp.current.y);
							if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
						}
						break;
					case 'V':
					case 'v':
						while (!pp.isCommandOrEnd()) {
							var newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
							pp.addMarker(newP, pp.current);
							pp.current = newP;
							bb.addPoint(pp.current.x, pp.current.y);
							if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
						}
						break;
					case 'C':
					case 'c':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var p1 = pp.getPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, p1);
							bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'S':
					case 's':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var p1 = pp.getReflectedControlPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, p1);
							bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'Q':
					case 'q':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, cntrl);
							bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'T':
					case 't':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var cntrl = pp.getReflectedControlPoint();
							pp.control = cntrl;
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, cntrl);
							bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
						}
						break;
					case 'A':
					case 'a':
						while (!pp.isCommandOrEnd()) {
						    var curr = pp.current;
							var rx = pp.getScalar();
							var ry = pp.getScalar();
							var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
							var largeArcFlag = pp.getScalar();
							var sweepFlag = pp.getScalar();
							var cp = pp.getAsCurrentPoint();

							// Conversion from endpoint to center parameterization
							// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
							// x1', y1'
							var currp = new svg.Point(
								Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
								-Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
							);
							// adjust radii
							var l = Math.pow(currp.x,2)/Math.pow(rx,2)+Math.pow(currp.y,2)/Math.pow(ry,2);
							if (l > 1) {
								rx *= Math.sqrt(l);
								ry *= Math.sqrt(l);
							}
							// cx', cy'
							var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(
								((Math.pow(rx,2)*Math.pow(ry,2))-(Math.pow(rx,2)*Math.pow(currp.y,2))-(Math.pow(ry,2)*Math.pow(currp.x,2))) /
								(Math.pow(rx,2)*Math.pow(currp.y,2)+Math.pow(ry,2)*Math.pow(currp.x,2))
							);
							if (isNaN(s)) s = 0;
							var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
							// cx, cy
							var centp = new svg.Point(
								(curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
								(curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
							);
							// vector magnitude
							var m = function(v) { return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)); }
							// ratio between two vectors
							var r = function(u, v) { return (u[0]*v[0]+u[1]*v[1]) / (m(u)*m(v)) }
							// angle between two vectors
							var a = function(u, v) { return (u[0]*v[1] < u[1]*v[0] ? -1 : 1) * Math.acos(r(u,v)); }
							// initial angle
							var a1 = a([1,0], [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry]);
							// angle delta
							var u = [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry];
							var v = [(-currp.x-cpp.x)/rx,(-currp.y-cpp.y)/ry];
							var ad = a(u, v);
							if (r(u,v) <= -1) ad = Math.PI;
							if (r(u,v) >= 1) ad = 0;

							// for markers
							var dir = 1 - sweepFlag ? 1.0 : -1.0;
							var ah = a1 + dir * (ad / 2.0);
							var halfWay = new svg.Point(
								centp.x + rx * Math.cos(ah),
								centp.y + ry * Math.sin(ah)
							);
							pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
							pp.addMarkerAngle(cp, ah - dir * Math.PI);

							bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better
							if (ctx != null) {
								var r = rx > ry ? rx : ry;
								var sx = rx > ry ? 1 : rx / ry;
								var sy = rx > ry ? ry / rx : 1;

								ctx.translate(centp.x, centp.y);
								ctx.rotate(xAxisRotation);
								ctx.scale(sx, sy);
								ctx.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
								ctx.scale(1/sx, 1/sy);
								ctx.rotate(-xAxisRotation);
								ctx.translate(-centp.x, -centp.y);
							}
						}
						break;
					case 'Z':
					case 'z':
						if (ctx != null) ctx.closePath();
						pp.current = pp.start;
					}
				}

				return bb;
			}

			this.getMarkers = function() {
				var points = this.PathParser.getMarkerPoints();
				var angles = this.PathParser.getMarkerAngles();
				
				var markers = [];
				for (var i=0; i<points.length; i++) {
					markers.push([points[i], angles[i]]);
				}
				return markers;
			}
		}
		svg.Element.path.prototype = new svg.Element.PathElementBase;
		
		// pattern element
		svg.Element.pattern = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.createPattern = function(ctx, element) {
				var width = this.attribute('width').toPixels('x', true);
				var height = this.attribute('height').toPixels('y', true);
			
				// render me using a temporary svg element
				var tempSvg = new svg.Element.svg();
				tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
				tempSvg.attributes['width'] = new svg.Property('width', width + 'px');
				tempSvg.attributes['height'] = new svg.Property('height', height + 'px');
				tempSvg.attributes['transform'] = new svg.Property('transform', this.attribute('patternTransform').value);
				tempSvg.children = this.children;
				
				var c = document.createElement('canvas');
				c.width = width;
				c.height = height;
				var cctx = c.getContext('2d');
				if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
					cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
				}
				// render 3x3 grid so when we transform there's no white space on edges
				for (var x=-1; x<=1; x++) {
					for (var y=-1; y<=1; y++) {
						cctx.save();
						cctx.translate(x * c.width, y * c.height);
						tempSvg.render(cctx);
						cctx.restore();
					}
				}
				var pattern = ctx.createPattern(c, 'repeat');
				return pattern;
			}
		}
		svg.Element.pattern.prototype = new svg.Element.ElementBase;
		
		// marker element
		svg.Element.marker = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.baseRender = this.render;
			this.render = function(ctx, point, angle) {
				ctx.translate(point.x, point.y);
				if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(angle);
				if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(ctx.lineWidth, ctx.lineWidth);
				ctx.save();
							
				// render me using a temporary svg element
				var tempSvg = new svg.Element.svg();
				tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
				tempSvg.attributes['refX'] = new svg.Property('refX', this.attribute('refX').value);
				tempSvg.attributes['refY'] = new svg.Property('refY', this.attribute('refY').value);
				tempSvg.attributes['width'] = new svg.Property('width', this.attribute('markerWidth').value);
				tempSvg.attributes['height'] = new svg.Property('height', this.attribute('markerHeight').value);
				tempSvg.attributes['fill'] = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
				tempSvg.attributes['stroke'] = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
				tempSvg.children = this.children;
				tempSvg.render(ctx);
				
				ctx.restore();
				if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(1/ctx.lineWidth, 1/ctx.lineWidth);
				if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(-angle);
				ctx.translate(-point.x, -point.y);
			}
		}
		svg.Element.marker.prototype = new svg.Element.ElementBase;
		
		// definitions element
		svg.Element.defs = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);	
			
			this.render = function(ctx) {
				// NOOP
			}
		}
		svg.Element.defs.prototype = new svg.Element.ElementBase;
		
		// base for gradients
		svg.Element.GradientBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.gradientUnits = this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
			
			this.stops = [];			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				if (child.type == 'stop') this.stops.push(child);
			}	
			
			this.getGradient = function() {
				// OVERRIDE ME!
			}			

			this.createGradient = function(ctx, element, parentOpacityProp) {
				var stopsContainer = this;
				if (this.getHrefAttribute().hasValue()) {
					stopsContainer = this.getHrefAttribute().getDefinition();
				}
				
				var addParentOpacity = function (color) {
					if (parentOpacityProp.hasValue()) {
						var p = new svg.Property('color', color);
						return p.addOpacity(parentOpacityProp.value).value;
					}
					return color;
				};
			
				var g = this.getGradient(ctx, element);
				if (g == null) return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color);
				for (var i=0; i<stopsContainer.stops.length; i++) {
					g.addColorStop(stopsContainer.stops[i].offset, addParentOpacity(stopsContainer.stops[i].color));
				}
				
				if (this.attribute('gradientTransform').hasValue()) {
					// render as transformed pattern on temporary canvas
					var rootView = svg.ViewPort.viewPorts[0];
					
					var rect = new svg.Element.rect();
					rect.attributes['x'] = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS/3.0);
					rect.attributes['y'] = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS/3.0);
					rect.attributes['width'] = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
					rect.attributes['height'] = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);
					
					var group = new svg.Element.g();
					group.attributes['transform'] = new svg.Property('transform', this.attribute('gradientTransform').value);
					group.children = [ rect ];
					
					var tempSvg = new svg.Element.svg();
					tempSvg.attributes['x'] = new svg.Property('x', 0);
					tempSvg.attributes['y'] = new svg.Property('y', 0);
					tempSvg.attributes['width'] = new svg.Property('width', rootView.width);
					tempSvg.attributes['height'] = new svg.Property('height', rootView.height);
					tempSvg.children = [ group ];
					
					var c = document.createElement('canvas');
					c.width = rootView.width;
					c.height = rootView.height;
					var tempCtx = c.getContext('2d');
					tempCtx.fillStyle = g;
					tempSvg.render(tempCtx);		
					return tempCtx.createPattern(c, 'no-repeat');
				}
				
				return g;				
			}
		}
		svg.Element.GradientBase.prototype = new svg.Element.ElementBase;
		
		// linear gradient element
		svg.Element.linearGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);
			
			this.getGradient = function(ctx, element) {
				var bb = element.getBoundingBox();
				
				if (!this.attribute('x1').hasValue()
				 && !this.attribute('y1').hasValue()
				 && !this.attribute('x2').hasValue()
				 && !this.attribute('y2').hasValue()) {
					this.attribute('x1', true).value = 0;
					this.attribute('y1', true).value = 0;
					this.attribute('x2', true).value = 1;
					this.attribute('y2', true).value = 0;
				 }
				
				var x1 = (this.gradientUnits == 'objectBoundingBox' 
					? bb.x() + bb.width() * this.attribute('x1').numValue() 
					: this.attribute('x1').toPixels('x'));
				var y1 = (this.gradientUnits == 'objectBoundingBox' 
					? bb.y() + bb.height() * this.attribute('y1').numValue()
					: this.attribute('y1').toPixels('y'));
				var x2 = (this.gradientUnits == 'objectBoundingBox' 
					? bb.x() + bb.width() * this.attribute('x2').numValue()
					: this.attribute('x2').toPixels('x'));
				var y2 = (this.gradientUnits == 'objectBoundingBox' 
					? bb.y() + bb.height() * this.attribute('y2').numValue()
					: this.attribute('y2').toPixels('y'));

				if (x1 == x2 && y1 == y2) return null;
				return ctx.createLinearGradient(x1, y1, x2, y2);
			}
		}
		svg.Element.linearGradient.prototype = new svg.Element.GradientBase;
		
		// radial gradient element
		svg.Element.radialGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);
			
			this.getGradient = function(ctx, element) {
				var bb = element.getBoundingBox();
				
				if (!this.attribute('cx').hasValue()) this.attribute('cx', true).value = '50%';
				if (!this.attribute('cy').hasValue()) this.attribute('cy', true).value = '50%';
				if (!this.attribute('r').hasValue()) this.attribute('r', true).value = '50%';
				
				var cx = (this.gradientUnits == 'objectBoundingBox' 
					? bb.x() + bb.width() * this.attribute('cx').numValue() 
					: this.attribute('cx').toPixels('x'));
				var cy = (this.gradientUnits == 'objectBoundingBox' 
					? bb.y() + bb.height() * this.attribute('cy').numValue() 
					: this.attribute('cy').toPixels('y'));
				
				var fx = cx;
				var fy = cy;
				if (this.attribute('fx').hasValue()) {
					fx = (this.gradientUnits == 'objectBoundingBox' 
					? bb.x() + bb.width() * this.attribute('fx').numValue() 
					: this.attribute('fx').toPixels('x'));
				}
				if (this.attribute('fy').hasValue()) {
					fy = (this.gradientUnits == 'objectBoundingBox' 
					? bb.y() + bb.height() * this.attribute('fy').numValue() 
					: this.attribute('fy').toPixels('y'));
				}
				
				var r = (this.gradientUnits == 'objectBoundingBox' 
					? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue()
					: this.attribute('r').toPixels());
				
				return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
			}
		}
		svg.Element.radialGradient.prototype = new svg.Element.GradientBase;
		
		// gradient stop element
		svg.Element.stop = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.offset = this.attribute('offset').numValue();
			if (this.offset < 0) this.offset = 0;
			if (this.offset > 1) this.offset = 1;
			
			var stopColor = this.style('stop-color');
			if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity').value);
			this.color = stopColor.value;
		}
		svg.Element.stop.prototype = new svg.Element.ElementBase;
		
		// animation base element
		svg.Element.AnimateBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			svg.Animations.push(this);
			
			this.duration = 0.0;
			this.begin = this.attribute('begin').toMilliseconds();
			this.maxDuration = this.begin + this.attribute('dur').toMilliseconds();
			
			this.getProperty = function() {
				var attributeType = this.attribute('attributeType').value;
				var attributeName = this.attribute('attributeName').value;
				
				if (attributeType == 'CSS') {
					return this.parent.style(attributeName, true);
				}
				return this.parent.attribute(attributeName, true);			
			};
			
			this.initialValue = null;
			this.initialUnits = '';
			this.removed = false;			

			this.calcValue = function() {
				// OVERRIDE ME!
				return '';
			}
					
			this.update = function(delta) {	
				// set initial value
				if (this.initialValue == null) {
					this.initialValue = this.getProperty().value;
					this.initialUnits = this.getProperty().getUnits();
				}
			
				// if we're past the end time
				if (this.duration > this.maxDuration) {
					// loop for indefinitely repeating animations
					if (this.attribute('repeatCount').value == 'indefinite'
					 || this.attribute('repeatDur').value == 'indefinite') {
						this.duration = 0.0
					}
					else if (this.attribute('fill').valueOrDefault('remove') == 'remove' && !this.removed) {
						this.removed = true;
						this.getProperty().value = this.initialValue;
						return true;
					}
					else {
						return false; // no updates made
					}
				}			
				this.duration = this.duration + delta;
			
				// if we're past the begin time
				var updated = false;
				if (this.begin < this.duration) {
					var newValue = this.calcValue(); // tween
					
					if (this.attribute('type').hasValue()) {
						// for transform, etc.
						var type = this.attribute('type').value;
						newValue = type + '(' + newValue + ')';
					}
					
					this.getProperty().value = newValue;
					updated = true;
				}
				
				return updated;
			}
			
			this.from = this.attribute('from');
			this.to = this.attribute('to');
			this.values = this.attribute('values');
			if (this.values.hasValue()) this.values.value = this.values.value.split(';');
			
			// fraction of duration we've covered
			this.progress = function() {
				var ret = { progress: (this.duration - this.begin) / (this.maxDuration - this.begin) };
				if (this.values.hasValue()) {
					var p = ret.progress * (this.values.value.length - 1);
					var lb = Math.floor(p), ub = Math.ceil(p);
					ret.from = new svg.Property('from', parseFloat(this.values.value[lb]));
					ret.to = new svg.Property('to', parseFloat(this.values.value[ub]));
					ret.progress = (p - lb) / (ub - lb);
				}
				else {
					ret.from = this.from;
					ret.to = this.to;
				}
				return ret;
			}			
		}
		svg.Element.AnimateBase.prototype = new svg.Element.ElementBase;
		
		// animate element
		svg.Element.animate = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);
			
			this.calcValue = function() {
				var p = this.progress();
				
				// tween value linearly
				var newValue = p.from.numValue() + (p.to.numValue() - p.from.numValue()) * p.progress; 
				return newValue + this.initialUnits;
			};
		}
		svg.Element.animate.prototype = new svg.Element.AnimateBase;
			
		// animate color element
		svg.Element.animateColor = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);

			this.calcValue = function() {
				var p = this.progress();
				var from = new RGBColor(p.from.value);
				var to = new RGBColor(p.to.value);
				
				if (from.ok && to.ok) {
					// tween color linearly
					var r = from.r + (to.r - from.r) * p.progress;
					var g = from.g + (to.g - from.g) * p.progress;
					var b = from.b + (to.b - from.b) * p.progress;
					return 'rgb('+parseInt(r,10)+','+parseInt(g,10)+','+parseInt(b,10)+')';
				}
				return this.attribute('from').value;
			};
		}
		svg.Element.animateColor.prototype = new svg.Element.AnimateBase;
		
		// animate transform element
		svg.Element.animateTransform = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);
			
			this.calcValue = function() {
				var p = this.progress();
				
				// tween value linearly
				var from = svg.ToNumberArray(p.from.value);
				var to = svg.ToNumberArray(p.to.value);
				var newValue = '';
				for (var i=0; i<from.length; i++) {
					newValue += from[i] + (to[i] - from[i]) * p.progress + ' ';
				}
				return newValue;
			};
		}
		svg.Element.animateTransform.prototype = new svg.Element.animate;
		
		// font element
		svg.Element.font = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.horizAdvX = this.attribute('horiz-adv-x').numValue();			
			
			this.isRTL = false;
			this.isArabic = false;
			this.fontFace = null;
			this.missingGlyph = null;
			this.glyphs = [];			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				if (child.type == 'font-face') {
					this.fontFace = child;
					if (child.style('font-family').hasValue()) {
						svg.Definitions[child.style('font-family').value] = this;
					}
				}
				else if (child.type == 'missing-glyph') this.missingGlyph = child;
				else if (child.type == 'glyph') {
					if (child.arabicForm != '') {
						this.isRTL = true;
						this.isArabic = true;
						if (typeof(this.glyphs[child.unicode]) == 'undefined') this.glyphs[child.unicode] = [];
						this.glyphs[child.unicode][child.arabicForm] = child;
					}
					else {
						this.glyphs[child.unicode] = child;
					}
				}
			}	
		}
		svg.Element.font.prototype = new svg.Element.ElementBase;
		
		// font-face element
		svg.Element.fontface = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);	
			
			this.ascent = this.attribute('ascent').value;
			this.descent = this.attribute('descent').value;
			this.unitsPerEm = this.attribute('units-per-em').numValue();				
		}
		svg.Element.fontface.prototype = new svg.Element.ElementBase;
		
		// missing-glyph element
		svg.Element.missingglyph = function(node) {
			this.base = svg.Element.path;
			this.base(node);	
			
			this.horizAdvX = 0;
		}
		svg.Element.missingglyph.prototype = new svg.Element.path;
		
		// glyph element
		svg.Element.glyph = function(node) {
			this.base = svg.Element.path;
			this.base(node);	
			
			this.horizAdvX = this.attribute('horiz-adv-x').numValue();
			this.unicode = this.attribute('unicode').value;
			this.arabicForm = this.attribute('arabic-form').value;
		}
		svg.Element.glyph.prototype = new svg.Element.path;
		
		// text element
		svg.Element.text = function(node) {
			this.captureTextNodes = true;
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				this.baseSetContext(ctx);
				if (this.style('dominant-baseline').hasValue()) ctx.textBaseline = this.style('dominant-baseline').value;
				if (this.style('alignment-baseline').hasValue()) ctx.textBaseline = this.style('alignment-baseline').value;
			}
			
			this.getBoundingBox = function () {
				// TODO: implement
				return new svg.BoundingBox(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'), 0, 0);
			}
			
			this.renderChildren = function(ctx) {
				this.x = this.attribute('x').toPixels('x');
				this.y = this.attribute('y').toPixels('y');
				this.x += this.getAnchorDelta(ctx, this, 0);
				for (var i=0; i<this.children.length; i++) {
					this.renderChild(ctx, this, i);
				}
			}
			
			this.getAnchorDelta = function (ctx, parent, startI) {
				var textAnchor = this.style('text-anchor').valueOrDefault('start');
				if (textAnchor != 'start') {
					var width = 0;
					for (var i=startI; i<parent.children.length; i++) {
						var child = parent.children[i];
						if (i > startI && child.attribute('x').hasValue()) break; // new group
						width += child.measureTextRecursive(ctx);
					}
					return -1 * (textAnchor == 'end' ? width : width / 2.0);
				}
				return 0;
			}
			
			this.renderChild = function(ctx, parent, i) {
				var child = parent.children[i];
				if (child.attribute('x').hasValue()) {
					child.x = child.attribute('x').toPixels('x') + this.getAnchorDelta(ctx, parent, i);
				}
				else {
					if (this.attribute('dx').hasValue()) this.x += this.attribute('dx').toPixels('x');
					if (child.attribute('dx').hasValue()) this.x += child.attribute('dx').toPixels('x');
					child.x = this.x;
				}
				this.x = child.x + child.measureText(ctx);
				
				if (child.attribute('y').hasValue()) {
					child.y = child.attribute('y').toPixels('y');
				}
				else {
					if (this.attribute('dy').hasValue()) this.y += this.attribute('dy').toPixels('y');
					if (child.attribute('dy').hasValue()) this.y += child.attribute('dy').toPixels('y');
					child.y = this.y;
				}
				this.y = child.y;
				
				child.render(ctx);
				
				for (var i=0; i<child.children.length; i++) {
					this.renderChild(ctx, child, i);
				}
			}
		}
		svg.Element.text.prototype = new svg.Element.RenderedElementBase;
		
		// text base
		svg.Element.TextElementBase = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.getGlyph = function(font, text, i) {
				var c = text[i];
				var glyph = null;
				if (font.isArabic) {
					var arabicForm = 'isolated';
					if ((i==0 || text[i-1]==' ') && i<text.length-2 && text[i+1]!=' ') arabicForm = 'terminal'; 
					if (i>0 && text[i-1]!=' ' && i<text.length-2 && text[i+1]!=' ') arabicForm = 'medial';
					if (i>0 && text[i-1]!=' ' && (i == text.length-1 || text[i+1]==' ')) arabicForm = 'initial';
					if (typeof(font.glyphs[c]) != 'undefined') {
						glyph = font.glyphs[c][arabicForm];
						if (glyph == null && font.glyphs[c].type == 'glyph') glyph = font.glyphs[c];
					}
				}
				else {
					glyph = font.glyphs[c];
				}
				if (glyph == null) glyph = font.missingGlyph;
				return glyph;
			}
			
			this.renderChildren = function(ctx) {
				var customFont = this.parent.style('font-family').getDefinition();
				if (customFont != null) {
					var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
					var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
					var text = this.getText();
					if (customFont.isRTL) text = text.split("").reverse().join("");
					
					var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
					for (var i=0; i<text.length; i++) {
						var glyph = this.getGlyph(customFont, text, i);
						var scale = fontSize / customFont.fontFace.unitsPerEm;
						ctx.translate(this.x, this.y);
						ctx.scale(scale, -scale);
						var lw = ctx.lineWidth;
						ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
						if (fontStyle == 'italic') ctx.transform(1, 0, .4, 1, 0, 0);
						glyph.render(ctx);
						if (fontStyle == 'italic') ctx.transform(1, 0, -.4, 1, 0, 0);
						ctx.lineWidth = lw;
						ctx.scale(1/scale, -1/scale);
						ctx.translate(-this.x, -this.y);	
						
						this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;
						if (typeof(dx[i]) != 'undefined' && !isNaN(dx[i])) {
							this.x += dx[i];
						}
					}
					return;
				}
			
				if (ctx.fillStyle != '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
				if (ctx.strokeStyle != '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
			}
			
			this.getText = function() {
				// OVERRIDE ME
			}
			
			this.measureTextRecursive = function(ctx) {
				var width = this.measureText(ctx);
				for (var i=0; i<this.children.length; i++) {
					width += this.children[i].measureTextRecursive(ctx);
				}
				return width;
			}
			
			this.measureText = function(ctx) {
				var customFont = this.parent.style('font-family').getDefinition();
				if (customFont != null) {
					var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
					var measure = 0;
					var text = this.getText();
					if (customFont.isRTL) text = text.split("").reverse().join("");
					var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
					for (var i=0; i<text.length; i++) {
						var glyph = this.getGlyph(customFont, text, i);
						measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
						if (typeof(dx[i]) != 'undefined' && !isNaN(dx[i])) {
							measure += dx[i];
						}
					}
					return measure;
				}
			
				var textToMeasure = svg.compressSpaces(this.getText());
				if (!ctx.measureText) return textToMeasure.length * 10;
				
				ctx.save();
				this.setContext(ctx);
				var width = ctx.measureText(textToMeasure).width;
				ctx.restore();
				return width;
			}
		}
		svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase;
		
		// tspan 
		svg.Element.tspan = function(node) {
			this.captureTextNodes = true;
			this.base = svg.Element.TextElementBase;
			this.base(node);
			
			this.text = node.nodeValue || node.text || '';
			this.getText = function() {
				return this.text;
			}
		}
		svg.Element.tspan.prototype = new svg.Element.TextElementBase;
		
		// tref
		svg.Element.tref = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);
			
			this.getText = function() {
				var element = this.getHrefAttribute().getDefinition();
				if (element != null) return element.children[0].getText();
			}
		}
		svg.Element.tref.prototype = new svg.Element.TextElementBase;		
		
		// a element
		svg.Element.a = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);
			
			this.hasText = true;
			for (var i=0; i<node.childNodes.length; i++) {
				if (node.childNodes[i].nodeType != 3) this.hasText = false;
			}
			
			// this might contain text
			this.text = this.hasText ? node.childNodes[0].nodeValue : '';
			this.getText = function() {
				return this.text;
			}		

			this.baseRenderChildren = this.renderChildren;
			this.renderChildren = function(ctx) {
				if (this.hasText) {
					// render as text element
					this.baseRenderChildren(ctx);
					var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
					svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.toPixels('y'), this.x + this.measureText(ctx), this.y));					
				}
				else {
					// render as temporary group
					var g = new svg.Element.g();
					g.children = this.children;
					g.parent = this;
					g.render(ctx);
				}
			}
			
			this.onclick = function() {
				window.open(this.getHrefAttribute().value);
			}
			
			this.onmousemove = function() {
				svg.ctx.canvas.style.cursor = 'pointer';
			}
		}
		svg.Element.a.prototype = new svg.Element.TextElementBase;		
		
		// image element
		svg.Element.image = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			var href = this.getHrefAttribute().value;
			var isSvg = href.match(/\.svg$/)
			
			svg.Images.push(this);
			this.loaded = false;
			if (!isSvg) {
				this.img = document.createElement('img');
				var self = this;
				this.img.onload = function() { self.loaded = true; }
				this.img.onerror = function() { if (typeof(console) != 'undefined') { console.log('ERROR: image "' + href + '" not found'); self.loaded = true; } }
				this.img.src = href;
			}
			else {
				this.img = svg.ajax(href);
				this.loaded = true;
			}
			
			this.renderChildren = function(ctx) {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');			
				if (width == 0 || height == 0) return;
			
				ctx.save();
				if (isSvg) {
					ctx.drawSvg(this.img, x, y, width, height);
				}
				else {
					ctx.translate(x, y);
					svg.AspectRatio(ctx,
									this.attribute('preserveAspectRatio').value,
									width,
									this.img.width,
									height,
									this.img.height,
									0,
									0);	
					ctx.drawImage(this.img, 0, 0);		
				}
				ctx.restore();
			}
			
			this.getBoundingBox = function() {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');
				return new svg.BoundingBox(x, y, x + width, y + height);
			}
		}
		svg.Element.image.prototype = new svg.Element.RenderedElementBase;
		
		// group element
		svg.Element.g = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.getBoundingBox = function() {
				var bb = new svg.BoundingBox();
				for (var i=0; i<this.children.length; i++) {
					bb.addBoundingBox(this.children[i].getBoundingBox());
				}
				return bb;
			};
		}
		svg.Element.g.prototype = new svg.Element.RenderedElementBase;

		// symbol element
		svg.Element.symbol = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {		
				this.baseSetContext(ctx);
				
				// viewbox
				if (this.attribute('viewBox').hasValue()) {				
					var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
					var minX = viewBox[0];
					var minY = viewBox[1];
					width = viewBox[2];
					height = viewBox[3];
					
					svg.AspectRatio(ctx,
									this.attribute('preserveAspectRatio').value, 
									this.attribute('width').toPixels('x'),
									width,
									this.attribute('height').toPixels('y'),
									height,
									minX,
									minY);

					svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);						
				}
			}			
		}
		svg.Element.symbol.prototype = new svg.Element.RenderedElementBase;		
			
		// style element
		svg.Element.style = function(node) { 
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			// text, or spaces then CDATA
			var css = ''
			for (var i=0; i<node.childNodes.length; i++) {
			  css += node.childNodes[i].nodeValue;
			}
			css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments
			css = svg.compressSpaces(css); // replace whitespace
			var cssDefs = css.split('}');
			for (var i=0; i<cssDefs.length; i++) {
				if (svg.trim(cssDefs[i]) != '') {
					var cssDef = cssDefs[i].split('{');
					var cssClasses = cssDef[0].split(',');
					var cssProps = cssDef[1].split(';');
					for (var j=0; j<cssClasses.length; j++) {
						var cssClass = svg.trim(cssClasses[j]);
						if (cssClass != '') {
							var props = {};
							for (var k=0; k<cssProps.length; k++) {
								var prop = cssProps[k].indexOf(':');
								var name = cssProps[k].substr(0, prop);
								var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);
								if (name != null && value != null) {
									props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
								}
							}
							svg.Styles[cssClass] = props;
							if (cssClass == '@font-face') {
								var fontFamily = props['font-family'].value.replace(/"/g,'');
								var srcs = props['src'].value.split(',');
								for (var s=0; s<srcs.length; s++) {
									if (srcs[s].indexOf('format("svg")') > 0) {
										var urlStart = srcs[s].indexOf('url');
										var urlEnd = srcs[s].indexOf(')', urlStart);
										var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
										var doc = svg.parseXml(svg.ajax(url));
										var fonts = doc.getElementsByTagName('font');
										for (var f=0; f<fonts.length; f++) {
											var font = svg.CreateElement(fonts[f]);
											svg.Definitions[fontFamily] = font;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		svg.Element.style.prototype = new svg.Element.ElementBase;
		
		// use element 
		svg.Element.use = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				this.baseSetContext(ctx);
				if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').toPixels('x'), 0);
				if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').toPixels('y'));
			}
			
			this.getDefinition = function() {
				var element = this.getHrefAttribute().getDefinition();
				if (this.attribute('width').hasValue()) element.attribute('width', true).value = this.attribute('width').value;
				if (this.attribute('height').hasValue()) element.attribute('height', true).value = this.attribute('height').value;
				return element;
			}
			
			this.path = function(ctx) {
				var element = this.getDefinition();
				if (element != null) element.path(ctx);
			}
			
			this.getBoundingBox = function() {
				var element = this.getDefinition();
				if (element != null) return element.getBoundingBox();
			}
			
			this.renderChildren = function(ctx) {
				var element = this.getDefinition();
				if (element != null) {
					// temporarily detach from parent and render
					var oldParent = element.parent;
					element.parent = null;
					element.render(ctx);
					element.parent = oldParent;
				}
			}
		}
		svg.Element.use.prototype = new svg.Element.RenderedElementBase;
		
		// mask element
		svg.Element.mask = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
						
			this.apply = function(ctx, element) {
				// render as temp svg	
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');
				
				if (width == 0 && height == 0) {
					var bb = new svg.BoundingBox();
					for (var i=0; i<this.children.length; i++) {
						bb.addBoundingBox(this.children[i].getBoundingBox());
					}
					var x = Math.floor(bb.x1);
					var y = Math.floor(bb.y1);
					var width = Math.floor(bb.width());
					var	height = Math.floor(bb.height());
				}
				
				// temporarily remove mask to avoid recursion
				var mask = element.attribute('mask').value;
				element.attribute('mask').value = '';
				
					var cMask = document.createElement('canvas');
					cMask.width = x + width;
					cMask.height = y + height;
					var maskCtx = cMask.getContext('2d');
					this.renderChildren(maskCtx);
				
					var c = document.createElement('canvas');
					c.width = x + width;
					c.height = y + height;
					var tempCtx = c.getContext('2d');
					element.render(tempCtx);
					tempCtx.globalCompositeOperation = 'destination-in';
					tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
					tempCtx.fillRect(0, 0, x + width, y + height);
					
					ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
					ctx.fillRect(0, 0, x + width, y + height);
					
				// reassign mask
				element.attribute('mask').value = mask;	
			}
			
			this.render = function(ctx) {
				// NO RENDER
			}
		}
		svg.Element.mask.prototype = new svg.Element.ElementBase;
		
		// clip element
		svg.Element.clipPath = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.apply = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					var child = this.children[i];
					if (typeof(child.path) != 'undefined') {
						var transform = null;
						if (child.attribute('transform').hasValue()) { 
							transform = new svg.Transform(child.attribute('transform').value);
							transform.apply(ctx);
						}
						child.path(ctx);
						ctx.clip();
						if (transform) { transform.unapply(ctx); }
					}
				}
			}
			
			this.render = function(ctx) {
				// NO RENDER
			}
		}
		svg.Element.clipPath.prototype = new svg.Element.ElementBase;

		// filters
		svg.Element.filter = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
						
			this.apply = function(ctx, element) {
				// render as temp svg	
				var bb = element.getBoundingBox();
				var x = Math.floor(bb.x1);
				var y = Math.floor(bb.y1);
				var width = Math.floor(bb.width());
				var	height = Math.floor(bb.height());

				// temporarily remove filter to avoid recursion
				var filter = element.style('filter').value;
				element.style('filter').value = '';
				
				var px = 0, py = 0;
				for (var i=0; i<this.children.length; i++) {
					var efd = this.children[i].extraFilterDistance || 0;
					px = Math.max(px, efd);
					py = Math.max(py, efd);
				}
				
				var c = document.createElement('canvas');
				c.width = width + 2*px;
				c.height = height + 2*py;
				var tempCtx = c.getContext('2d');
				tempCtx.translate(-x + px, -y + py);
				element.render(tempCtx);
			
				// apply filters
				for (var i=0; i<this.children.length; i++) {
					this.children[i].apply(tempCtx, 0, 0, width + 2*px, height + 2*py);
				}
				
				// render on me
				ctx.drawImage(c, 0, 0, width + 2*px, height + 2*py, x - px, y - py, width + 2*px, height + 2*py);
				
				// reassign filter
				element.style('filter', true).value = filter;	
			}
			
			this.render = function(ctx) {
				// NO RENDER
			}		
		}
		svg.Element.filter.prototype = new svg.Element.ElementBase;
		
		svg.Element.feMorphology = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.apply = function(ctx, x, y, width, height) {
				// TODO: implement
			}
		}
		svg.Element.feMorphology.prototype = new svg.Element.ElementBase;
		
		svg.Element.feColorMatrix = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			function imGet(img, x, y, width, height, rgba) {
				return img[y*width*4 + x*4 + rgba];
			}
			
			function imSet(img, x, y, width, height, rgba, val) {
				img[y*width*4 + x*4 + rgba] = val;
			}
			
			this.apply = function(ctx, x, y, width, height) {
				// only supporting grayscale for now per Issue 195, need to extend to all matrix
				// assuming x==0 && y==0 for now
				var srcData = ctx.getImageData(0, 0, width, height);
				for (var y = 0; y < height; y++) {
					for (var x = 0; x < width; x++) {
						var r = imGet(srcData.data, x, y, width, height, 0);
						var g = imGet(srcData.data, x, y, width, height, 1);
						var b = imGet(srcData.data, x, y, width, height, 2);
						var gray = (r + g + b) / 3;
						imSet(srcData.data, x, y, width, height, 0, gray);
						imSet(srcData.data, x, y, width, height, 1, gray);
						imSet(srcData.data, x, y, width, height, 2, gray);
					}
				}
				ctx.clearRect(0, 0, width, height);
				ctx.putImageData(srcData, 0, 0);
			}
		}
		svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase;
		
		svg.Element.feGaussianBlur = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
			this.extraFilterDistance = this.blurRadius;
			
			this.apply = function(ctx, x, y, width, height) {
				if (typeof(stackBlurCanvasRGBA) == 'undefined') {
					if (typeof(console) != 'undefined') { console.log('ERROR: StackBlur.js must be included for blur to work'); }
					return;
				}
				
				// StackBlur requires canvas be on document
				ctx.canvas.id = svg.UniqueId();
				ctx.canvas.style.display = 'none';
				document.body.appendChild(ctx.canvas);
				stackBlurCanvasRGBA(ctx.canvas.id, x, y, width, height, this.blurRadius);
				document.body.removeChild(ctx.canvas);
			}
		}
		svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase;
		
		// title element, do nothing
		svg.Element.title = function(node) {
		}
		svg.Element.title.prototype = new svg.Element.ElementBase;

		// desc element, do nothing
		svg.Element.desc = function(node) {
		}
		svg.Element.desc.prototype = new svg.Element.ElementBase;		
		
		svg.Element.MISSING = function(node) {
			if (typeof(console) != 'undefined') { console.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.'); }
		}
		svg.Element.MISSING.prototype = new svg.Element.ElementBase;
		
		// element factory
		svg.CreateElement = function(node) {	
			var className = node.nodeName.replace(/^[^:]+:/,''); // remove namespace
			className = className.replace(/\-/g,''); // remove dashes
			var e = null;
			if (typeof(svg.Element[className]) != 'undefined') {
				e = new svg.Element[className](node);
			}
			else {
				e = new svg.Element.MISSING(node);
			}

			e.type = node.nodeName;
			return e;
		}
				
		// load from url
		svg.load = function(ctx, url) {
			svg.loadXml(ctx, svg.ajax(url));
		}
		
		// load from xml
		svg.loadXml = function(ctx, xml) {
			svg.loadXmlDoc(ctx, svg.parseXml(xml));
		}
		
		svg.loadXmlDoc = function(ctx, dom) {
			svg.init(ctx);
			
			var mapXY = function(p) {
				var e = ctx.canvas;
				while (e) {
					p.x -= e.offsetLeft;
					p.y -= e.offsetTop;
					e = e.offsetParent;
				}
				if (window.scrollX) p.x += window.scrollX;
				if (window.scrollY) p.y += window.scrollY;
				return p;
			}
			
			// bind mouse
			if (svg.opts['ignoreMouse'] != true) {
				ctx.canvas.onclick = function(e) {
					var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
					svg.Mouse.onclick(p.x, p.y);
				};
				ctx.canvas.onmousemove = function(e) {
					var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
					svg.Mouse.onmousemove(p.x, p.y);
				};
			}
		
			var e = svg.CreateElement(dom.documentElement);
			e.root = true;
					
			// render loop
			var isFirstRender = true;
			var draw = function() {
				svg.ViewPort.Clear();
				if (ctx.canvas.parentNode) svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);
			
				if (svg.opts['ignoreDimensions'] != true) {
					// set canvas size
					if (e.style('width').hasValue()) {
						ctx.canvas.width = e.style('width').toPixels('x');
						ctx.canvas.style.width = ctx.canvas.width + 'px';
					}
					if (e.style('height').hasValue()) {
						ctx.canvas.height = e.style('height').toPixels('y');
						ctx.canvas.style.height = ctx.canvas.height + 'px';
					}
				}
				var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
				var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
				if (svg.opts['ignoreDimensions'] == true && e.style('width').hasValue() && e.style('height').hasValue()) {
					cWidth = e.style('width').toPixels('x');
					cHeight = e.style('height').toPixels('y');
				}
				svg.ViewPort.SetCurrent(cWidth, cHeight);		
				
				if (svg.opts['offsetX'] != null) e.attribute('x', true).value = svg.opts['offsetX'];
				if (svg.opts['offsetY'] != null) e.attribute('y', true).value = svg.opts['offsetY'];
				if (svg.opts['scaleWidth'] != null && svg.opts['scaleHeight'] != null) {
					var xRatio = 1, yRatio = 1, viewBox = svg.ToNumberArray(e.attribute('viewBox').value);
					if (e.attribute('width').hasValue()) xRatio = e.attribute('width').toPixels('x') / svg.opts['scaleWidth'];
					else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / svg.opts['scaleWidth'];
					if (e.attribute('height').hasValue()) yRatio = e.attribute('height').toPixels('y') / svg.opts['scaleHeight'];
					else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / svg.opts['scaleHeight'];
					
					e.attribute('width', true).value = svg.opts['scaleWidth'];
					e.attribute('height', true).value = svg.opts['scaleHeight'];			
					e.attribute('viewBox', true).value = '0 0 ' + (cWidth * xRatio) + ' ' + (cHeight * yRatio);
					e.attribute('preserveAspectRatio', true).value = 'none';
				}
			
				// clear and render
				if (svg.opts['ignoreClear'] != true) {
					ctx.clearRect(0, 0, cWidth, cHeight);
				}
				e.render(ctx);
				if (isFirstRender) {
					isFirstRender = false;
					if (typeof(svg.opts['renderCallback']) == 'function') svg.opts['renderCallback'](dom);
				}			
			}
			
			var waitingForImages = true;
			if (svg.ImagesLoaded()) {
				waitingForImages = false;
				draw();
			}
			svg.intervalID = setInterval(function() { 
				var needUpdate = false;
				
				if (waitingForImages && svg.ImagesLoaded()) {
					waitingForImages = false;
					needUpdate = true;
				}
			
				// need update from mouse events?
				if (svg.opts['ignoreMouse'] != true) {
					needUpdate = needUpdate | svg.Mouse.hasEvents();
				}
			
				// need update from animations?
				if (svg.opts['ignoreAnimation'] != true) {
					for (var i=0; i<svg.Animations.length; i++) {
						needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
					}
				}
				
				// need update from redraw?
				if (typeof(svg.opts['forceRedraw']) == 'function') {
					if (svg.opts['forceRedraw']() == true) needUpdate = true;
				}
				
				// render if needed
				if (needUpdate) {
					draw();				
					svg.Mouse.runEvents(); // run and clear our events
				}
			}, 1000 / svg.FRAMERATE);
		}
		
		svg.stop = function() {
			if (svg.intervalID) {
				clearInterval(svg.intervalID);
			}
		}
		
		svg.Mouse = new (function() {
			this.events = [];
			this.hasEvents = function() { return this.events.length != 0; }
		
			this.onclick = function(x, y) {
				this.events.push({ type: 'onclick', x: x, y: y, 
					run: function(e) { if (e.onclick) e.onclick(); }
				});
			}
			
			this.onmousemove = function(x, y) {
				this.events.push({ type: 'onmousemove', x: x, y: y,
					run: function(e) { if (e.onmousemove) e.onmousemove(); }
				});
			}			
			
			this.eventElements = [];
			
			this.checkPath = function(element, ctx) {
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) this.eventElements[i] = element;
				}
			}
			
			this.checkBoundingBox = function(element, bb) {
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					if (bb.isPointInBox(e.x, e.y)) this.eventElements[i] = element;
				}			
			}
			
			this.runEvents = function() {
				svg.ctx.canvas.style.cursor = '';
				
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					var element = this.eventElements[i];
					while (element) {
						e.run(element);
						element = element.parent;
					}
				}		
			
				// done running, clear
				this.events = []; 
				this.eventElements = [];
			}
		});
		
		return svg;
	}
})();

if (typeof(CanvasRenderingContext2D) != 'undefined') {
	CanvasRenderingContext2D.prototype.drawSvg = function(s, dx, dy, dw, dh) {
		canvg(this.canvas, s, { 
			ignoreMouse: true, 
			ignoreAnimation: true, 
			ignoreDimensions: true, 
			ignoreClear: true, 
			offsetX: dx, 
			offsetY: dy, 
			scaleWidth: dw, 
			scaleHeight: dh
		});
	}
}
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-10-21
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
if(AmCharts.isModern){ /// added by AmCharts to avoid old IE problems if this file is included
var saveAs = saveAs
  || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  || (function(view) {
	"use strict";
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link =  !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function (ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
                        window.open(object_url, "_blank");
                    }
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				// FF for Android has a nasty garbage collection mechanism
				// that turns all objects that are not pure javascript into 'deadObject'
				// this means `doc` and `save_link` are unusable and need to be recreated
				// `view` is usable though:
				doc = view.document;
				save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
				save_link.href = object_url;
				save_link.download = name;
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, view, 0, 0, 0, 0, 0
					, false, false, false, false, 0, null
				);
				save_link.dispatchEvent(event);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	return saveAs;
}(this.self || this.window || this.content));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== 'undefined') module.exports = saveAs;
}/// added by AmCharts to avoid old IE problems if this file is included
/** @preserve jsPDF 0.9.0rc2 ( ${buildDate} ${commitID} )
Copyright (c) 2010-2012 James Hall, james@snapshotmedia.co.uk, https://github.com/MrRio/jsPDF
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
*/

/*
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */


/**
Creates new jsPDF document object instance
@class
@param orientation One of "portrait" or "landscape" (or shortcuts "p" (Default), "l")
@param unit Measurement unit to be used when coordinates are specified. One of "pt" (points), "mm" (Default), "cm", "in"
@param format One of 'a0', 'a1', 'a2', 'a3', 'a4' (Default) etc to 'a10', 'b0' to 'b10', 'c0' to 'c10', 'letter', 'government-letter', 'legal', 'junior-legal', 'ledger' or 'tabloid'
@returns {jsPDF}
@name jsPDF
*/
var jsPDF = (function () {
    'use strict';
    /*jslint browser:true, plusplus: true, bitwise: true, nomen: true */
    /*global document: false, btoa, atob, zpipe, Uint8Array, ArrayBuffer, Blob, saveAs, adler32cs, Deflater */

// this will run on <=IE9, possibly some niche browsers
// new webkit-based, FireFox, IE10 already have native version of this.
    if (typeof btoa === 'undefined') {
        window.btoa = function (data) {
        // DO NOT ADD UTF8 ENCODING CODE HERE!!!!

        // UTF8 encoding encodes bytes over char code 128
        // and, essentially, turns an 8-bit binary streams
        // (that base64 can deal with) into 7-bit binary streams.
        // (by default server does not know that and does not recode the data back to 8bit)
        // You destroy your data.

        // binary streams like jpeg image data etc, while stored in JavaScript strings,
        // (which are 16bit arrays) are in 8bit format already.
        // You do NOT need to char-encode that before base64 encoding.

        // if you, by act of fate
        // have string which has individual characters with code
        // above 255 (pure unicode chars), encode that BEFORE you base64 here.
        // you can use absolutely any approch there, as long as in the end,
        // base64 gets an 8bit (char codes 0 - 255) stream.
        // when you get it on the server after un-base64, you must
        // UNencode it too, to get back to 16, 32bit or whatever original bin stream.

        // Note, Yes, JavaScript strings are, in most cases UCS-2 -
        // 16-bit character arrays. This does not mean, however,
        // that you always have to UTF8 it before base64.
        // it means that if you have actual characters anywhere in
        // that string that have char code above 255, you need to
        // recode *entire* string from 16-bit (or 32bit) to 8-bit array.
        // You can do binary split to UTF16 (BE or LE)
        // you can do utf8, you can split the thing by hand and prepend BOM to it,
        // but whatever you do, make sure you mirror the opposite on
        // the server. If server does not expect to post-process un-base64
        // 8-bit binary stream, think very very hard about messing around with encoding.

        // so, long story short:
        // DO NOT ADD UTF8 ENCODING CODE HERE!!!!

        /* @preserve
        ====================================================================
        base64 encoder
        MIT, GPL

        version: 1109.2015
        discuss at: http://phpjs.org/functions/base64_encode
        +   original by: Tyler Akins (http://rumkin.com)
        +   improved by: Bayron Guevara
        +   improved by: Thunder.m
        +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        +   bugfixed by: Pellentesque Malesuada
        +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        +   improved by: Rafal Kukawski (http://kukawski.pl)
        +                Daniel Dotsenko, Willow Systems Corp, willow-systems.com
        ====================================================================
        */

            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                b64a = b64.split(''),
                o1,
                o2,
                o3,
                h1,
                h2,
                h3,
                h4,
                bits,
                i = 0,
                ac = 0,
                enc = "",
                tmp_arr = [],
                r;

            do { // pack three octets into four hexets
                o1 = data.charCodeAt(i++);
                o2 = data.charCodeAt(i++);
                o3 = data.charCodeAt(i++);

                bits = o1 << 16 | o2 << 8 | o3;

                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;

                // use hexets to index into b64, and append result to encoded string
                tmp_arr[ac++] = b64a[h1] + b64a[h2] + b64a[h3] + b64a[h4];
            } while (i < data.length);

            enc = tmp_arr.join('');
            r = data.length % 3;
            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
            // end of base64 encoder MIT, GPL
        };
    }

    if (typeof atob === 'undefined') {
        window.atob = function (data) {
        // http://kevin.vanzonneveld.net
        // +   original by: Tyler Akins (http://rumkin.com)
        // +   improved by: Thunder.m
        // +      input by: Aman Gupta
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   bugfixed by: Onno Marsman
        // +   bugfixed by: Pellentesque Malesuada
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +      input by: Brett Zamir (http://brett-zamir.me)
        // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
        // *     returns 1: 'Kevin van Zonneveld'
        // mozilla has this native
        // - but breaks in 2.0.0.12!
        //if (typeof this.window['atob'] == 'function') {
        //    return atob(data);
        //}
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                o1,
                o2,
                o3,
                h1,
                h2,
                h3,
                h4,
                bits,
                i = 0,
                ac = 0,
                dec = "",
                tmp_arr = [];

            if (!data) {
                return data;
            }

            data += '';

            do { // unpack four hexets into three octets using index points in b64
                h1 = b64.indexOf(data.charAt(i++));
                h2 = b64.indexOf(data.charAt(i++));
                h3 = b64.indexOf(data.charAt(i++));
                h4 = b64.indexOf(data.charAt(i++));

                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

                o1 = bits >> 16 & 0xff;
                o2 = bits >> 8 & 0xff;
                o3 = bits & 0xff;

                if (h3 === 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1);
                } else if (h4 === 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2);
                } else {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
                }
            } while (i < data.length);
            dec = tmp_arr.join('');
            return dec;
        };
    }

    var getObjectLength = typeof Object.keys === 'function' ?
                function (object) {
                    return Object.keys(object).length;
                } :
                function (object) {
                    var i = 0, e;
                    for (e in object) {
                        if (object.hasOwnProperty(e)) {
                            i++;
                        }
                    }
                    return i;
                },

/**
PubSub implementation

@class
@name PubSub
*/
        PubSub = function (context) {
            /**  @preserve
            -----------------------------------------------------------------------------------------------
            JavaScript PubSub library
            2012 (c) ddotsenko@willowsystems.com
            based on Peter Higgins (dante@dojotoolkit.org)
            Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.
            Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
            http://dojofoundation.org/license for more information.
            -----------------------------------------------------------------------------------------------
            */
            /**
            @private
            @fieldOf PubSub
            */
            this.topics = {};
            /**
            Stores what will be `this` within the callback functions.

            @private
            @fieldOf PubSub#
            */
            this.context = context;
            /**
            Allows caller to emit an event and pass arguments to event listeners.
            @public
            @function
            @param topic {String} Name of the channel on which to voice this event
            @param args Any number of arguments you want to pass to the listeners of this event.
            @methodOf PubSub#
            @name publish
            */
            this.publish = function (topic, args) {
                if (this.topics[topic]) {
                    var currentTopic = this.topics[topic],
                        toremove = [],
                        fn,
                        i,
                        l,
                        pair,
                        emptyFunc = function () {};
                    args = Array.prototype.slice.call(arguments, 1);
                    for (i = 0, l = currentTopic.length; i < l; i++) {
                        pair = currentTopic[i]; // this is a [function, once_flag] array
                        fn = pair[0];
                        if (pair[1]) { /* 'run once' flag set */
                            pair[0] = emptyFunc;
                            toremove.push(i);
                        }
                        fn.apply(this.context, args);
                    }
                    for (i = 0, l = toremove.length; i < l; i++) {
                        currentTopic.splice(toremove[i], 1);
                    }
                }
            };
            /**
            Allows listener code to subscribe to channel and be called when data is available
            @public
            @function
            @param topic {String} Name of the channel on which to voice this event
            @param callback {Function} Executable (function pointer) that will be ran when event is voiced on this channel.
            @param once {Boolean} (optional. False by default) Flag indicating if the function is to be triggered only once.
            @returns {Object} A token object that cen be used for unsubscribing.
            @methodOf PubSub#
            @name subscribe
            */
            this.subscribe = function (topic, callback, once) {
                if (!this.topics[topic]) {
                    this.topics[topic] = [[callback, once]];
                } else {
                    this.topics[topic].push([callback, once]);
                }
                return {
                    "topic": topic,
                    "callback": callback
                };
            };
            /**
            Allows listener code to unsubscribe from a channel
            @public
            @function
            @param token {Object} A token object that was returned by `subscribe` method
            @methodOf PubSub#
            @name unsubscribe
            */
            this.unsubscribe = function (token) {
                if (this.topics[token.topic]) {
                    var currentTopic = this.topics[token.topic], i, l;

                    for (i = 0, l = currentTopic.length; i < l; i++) {
                        if (currentTopic[i][0] === token.callback) {
                            currentTopic.splice(i, 1);
                        }
                    }
                }
            };
        };


/**
@constructor
@private
*/
    function jsPDF(orientation, unit, format, compressPdf) { /** String orientation, String unit, String format, Boolean compressed */

        // Default parameter values
        if (typeof orientation === 'undefined') {
            orientation = 'p';
        } else {
            orientation = orientation.toString().toLowerCase();
        }
        if (typeof unit === 'undefined') { unit = 'mm'; }
        if (typeof format === 'undefined') { format = 'a4'; }
        if (typeof compressPdf === 'undefined' && typeof zpipe === 'undefined') { compressPdf = false; }

        var format_as_string = format.toString().toLowerCase(),
            version = '0.9.0rc2',
            content = [],
            content_length = 0,
            compress = compressPdf,
            pdfVersion = '1.3', // PDF Version
            pageFormats = { // Size in pt of various paper formats
                'a0': [2383.94, 3370.39],
                'a1': [1683.78, 2383.94],
                'a2': [1190.55, 1683.78],
                'a3': [841.89,  1190.55],
                'a4': [595.28,  841.89],
                'a5': [419.53,  595.28],
                'a6': [297.64,  419.53],
                'a7': [209.76,  297.64],
                'a8': [147.4 ,  209.76],
                'a9': [104.88,  147.4],
                'a10': [73.7,  104.88],
                'b0': [2834.65, 4008.19],
                'b1': [2004.09, 2834.65],
                'b2': [1417.32, 2004.09],
                'b3': [1000.63, 1417.32],
                'b4': [708.66,  1000.63],
                'b5': [498.9,  708.66],
                'b6': [354.33,  498.9],
                'b7': [249.45,  354.33],
                'b8': [175.75,  249.45],
                'b9': [124.72,  175.75],
                'b10': [87.87,  124.72],
                'c0': [2599.37, 3676.54],
                'c1': [1836.85, 2599.37],
                'c2': [1298.27, 1836.85],
                'c3': [918.43,  1298.27],
                'c4': [649.13,  918.43],
                'c5': [459.21,  649.13],
                'c6': [323.15,  459.21],
                'c7': [229.61,  323.15],
                'c8': [161.57,  229.61],
                'c9': [113.39,  161.57],
                'c10': [79.37,   113.39],
                'letter': [612, 792],
                'government-letter': [576, 756],
                'legal': [612, 1008],
                'junior-legal': [576, 360],
                'ledger': [1224, 792],
                'tabloid': [792, 1224]
            },
            textColor = '0 g',
            drawColor = '0 G',
            page = 0,
            pages = [],
            objectNumber = 2, // 'n' Current object number
            outToPages = false, // switches where out() prints. outToPages true = push to pages obj. outToPages false = doc builder content
            offsets = [], // List of offsets. Activated and reset by buildDocument(). Pupulated by various calls buildDocument makes.
            fonts = {}, // collection of font objects, where key is fontKey - a dynamically created label for a given font.
            fontmap = {}, // mapping structure fontName > fontStyle > font key - performance layer. See addFont()
            activeFontSize = 16,
            activeFontKey, // will be string representing the KEY of the font as combination of fontName + fontStyle
            lineWidth = 0.200025, // 2mm
            lineHeightProportion = 1.15,
            pageHeight,
            pageWidth,
            k, // Scale factor
            documentProperties = {'title': '', 'subject': '', 'author': '', 'keywords': '', 'creator': ''},
            lineCapID = 0,
            lineJoinID = 0,
            API = {},
            events = new PubSub(API),
            tmp,
            plugin,
            /////////////////////
            // Private functions
            /////////////////////
            // simplified (speedier) replacement for sprintf's %.2f conversion
            f2 = function (number) {
                return number.toFixed(2);
            },
            // simplified (speedier) replacement for sprintf's %.3f conversion
            f3 = function (number) {
                return number.toFixed(3);
            },
            // simplified (speedier) replacement for sprintf's %02d
            padd2 = function (number) {
                var n = (number).toFixed(0);
                if (number < 10) {
                    return '0' + n;
                } else {
                    return n;
                }
            },
            // simplified (speedier) replacement for sprintf's %02d
            padd10 = function (number) {
                var n = (number).toFixed(0);
                if (n.length < 10) {
                    return new Array( 11 - n.length ).join('0') + n;
                } else {
                    return n;
                }
            },
            out = function (string) {
                if (outToPages) { /* set by beginPage */
                    pages[page].push(string);
                } else {
                    content.push(string);
                    content_length += string.length + 1; // +1 is for '\n' that will be used to join contents of content
                }
            },
            newObject = function () {
                // Begin a new object
                objectNumber++;
                offsets[objectNumber] = content_length;
                out(objectNumber + ' 0 obj');
                return objectNumber;
            },
            putStream = function (str) {
                out('stream');
                out(str);
                out('endstream');
            },
            wPt,
            hPt,
            kids,
            i,
            putPages = function () {
                wPt = pageWidth * k;
                hPt = pageHeight * k;

                // outToPages = false as set in endDocument(). out() writes to content.

                var n, p, arr, uint, i, deflater, adler32;
                for (n = 1; n <= page; n++) {
                    newObject();
                    out('<</Type /Page');
                    out('/Parent 1 0 R');
                    out('/Resources 2 0 R');
                    out('/Contents ' + (objectNumber + 1) + ' 0 R>>');
                    out('endobj');

                    // Page content
                    p = pages[n].join('\n');
                    newObject();
                    if (compress) {
                        arr = [];
                        for (i = 0; i < p.length; ++i) {
                            arr[i] = p.charCodeAt(i);
                        }
                        adler32 = adler32cs.from(p);
                        deflater = new Deflater(6);
                        deflater.append(new Uint8Array(arr));
                        p = deflater.flush();
                        arr = [new Uint8Array([120, 156]), new Uint8Array(p),
                               new Uint8Array([adler32 & 0xFF, (adler32 >> 8) & 0xFF, (adler32 >> 16) & 0xFF, (adler32 >> 24) & 0xFF])];
                        p = '';
                        for (i in arr) {
                            if (arr.hasOwnProperty(i)) {
                                p += String.fromCharCode.apply(null, arr[i]);
                            }
                        }
                        out('<</Length ' + p.length  + ' /Filter [/FlateDecode]>>');
                    } else {
                        out('<</Length ' + p.length  + '>>');
                    }
                    putStream(p);
                    out('endobj');
                }
                offsets[1] = content_length;
                out('1 0 obj');
                out('<</Type /Pages');
                kids = '/Kids [';
                for (i = 0; i < page; i++) {
                    kids += (3 + 2 * i) + ' 0 R ';
                }
                out(kids + ']');
                out('/Count ' + page);
                out('/MediaBox [0 0 ' + f2(wPt) + ' ' + f2(hPt) + ']');
                out('>>');
                out('endobj');
            },
            putFont = function (font) {
                font.objectNumber = newObject();
                out('<</BaseFont/' + font.PostScriptName + '/Type/Font');
                if (typeof font.encoding === 'string') {
                    out('/Encoding/' + font.encoding);
                }
                out('/Subtype/Type1>>');
                out('endobj');
            },
            putFonts = function () {
                var fontKey;
                for (fontKey in fonts) {
                    if (fonts.hasOwnProperty(fontKey)) {
                        putFont(fonts[fontKey]);
                    }
                }
            },
            putXobjectDict = function () {
                // Loop through images, or other data objects
                events.publish('putXobjectDict');
            },
            putResourceDictionary = function () {
                out('/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]');
                out('/Font <<');
                // Do this for each font, the '1' bit is the index of the font
                var fontKey;
                for (fontKey in fonts) {
                    if (fonts.hasOwnProperty(fontKey)) {
                        out('/' + fontKey + ' ' + fonts[fontKey].objectNumber + ' 0 R');
                    }
                }
                out('>>');
                out('/XObject <<');
                putXobjectDict();
                out('>>');
            },
            putResources = function () {
                putFonts();
                events.publish('putResources');
                // Resource dictionary
                offsets[2] = content_length;
                out('2 0 obj');
                out('<<');
                putResourceDictionary();
                out('>>');
                out('endobj');
                events.publish('postPutResources');
            },
            addToFontDictionary = function (fontKey, fontName, fontStyle) {
                // this is mapping structure for quick font key lookup.
                // returns the KEY of the font (ex: "F1") for a given pair of font name and type (ex: "Arial". "Italic")
                var undef;
                if (fontmap[fontName] === undef) {
                    fontmap[fontName] = {}; // fontStyle is a var interpreted and converted to appropriate string. don't wrap in quotes.
                }
                fontmap[fontName][fontStyle] = fontKey;
            },
            /**
            FontObject describes a particular font as member of an instnace of jsPDF

            It's a collection of properties like 'id' (to be used in PDF stream),
            'fontName' (font's family name), 'fontStyle' (font's style variant label)

            @class
            @public
            @property id {String} PDF-document-instance-specific label assinged to the font.
            @property PostScriptName {String} PDF specification full name for the font
            @property encoding {Object} Encoding_name-to-Font_metrics_object mapping.
            @name FontObject
            */
            FontObject = {},
            addFont = function (PostScriptName, fontName, fontStyle, encoding) {
                var fontKey = 'F' + (getObjectLength(fonts) + 1).toString(10),
                    // This is FontObject
                    font = fonts[fontKey] = {
                        'id': fontKey,
                        // , 'objectNumber':   will be set by putFont()
                        'PostScriptName': PostScriptName,
                        'fontName': fontName,
                        'fontStyle': fontStyle,
                        'encoding': encoding,
                        'metadata': {}
                    };

                addToFontDictionary(fontKey, fontName, fontStyle);

                events.publish('addFont', font);

                return fontKey;
            },
            addFonts = function () {

                var HELVETICA = "helvetica",
                    TIMES = "times",
                    COURIER = "courier",
                    NORMAL = "normal",
                    BOLD = "bold",
                    ITALIC = "italic",
                    BOLD_ITALIC = "bolditalic",
                    encoding = 'StandardEncoding',
                    standardFonts = [
                        ['Helvetica', HELVETICA, NORMAL],
                        ['Helvetica-Bold', HELVETICA, BOLD],
                        ['Helvetica-Oblique', HELVETICA, ITALIC],
                        ['Helvetica-BoldOblique', HELVETICA, BOLD_ITALIC],
                        ['Courier', COURIER, NORMAL],
                        ['Courier-Bold', COURIER, BOLD],
                        ['Courier-Oblique', COURIER, ITALIC],
                        ['Courier-BoldOblique', COURIER, BOLD_ITALIC],
                        ['Times-Roman', TIMES, NORMAL],
                        ['Times-Bold', TIMES, BOLD],
                        ['Times-Italic', TIMES, ITALIC],
                        ['Times-BoldItalic', TIMES, BOLD_ITALIC]
                    ],
                    i,
                    l,
                    fontKey,
                    parts;
                for (i = 0, l = standardFonts.length; i < l; i++) {
                    fontKey = addFont(
                        standardFonts[i][0],
                        standardFonts[i][1],
                        standardFonts[i][2],
                        encoding
                    );

                    // adding aliases for standard fonts, this time matching the capitalization
                    parts = standardFonts[i][0].split('-');
                    addToFontDictionary(fontKey, parts[0], parts[1] || '');
                }

                events.publish('addFonts', {'fonts': fonts, 'dictionary': fontmap});
            },
            /**

            @public
            @function
            @param text {String}
            @param flags {Object} Encoding flags.
            @returns {String} Encoded string
            */
            to8bitStream = function (text, flags) {
                /* PDF 1.3 spec:
                "For text strings encoded in Unicode, the first two bytes must be 254 followed by
                255, representing the Unicode byte order marker, U+FEFF. (This sequence conflicts
                with the PDFDocEncoding character sequence thorn ydieresis, which is unlikely
                to be a meaningful beginning of a word or phrase.) The remainder of the
                string consists of Unicode character codes, according to the UTF-16 encoding
                specified in the Unicode standard, version 2.0. Commonly used Unicode values
                are represented as 2 bytes per character, with the high-order byte appearing first
                in the string."

                In other words, if there are chars in a string with char code above 255, we
                recode the string to UCS2 BE - string doubles in length and BOM is prepended.

                HOWEVER!
                Actual *content* (body) text (as opposed to strings used in document properties etc)
                does NOT expect BOM. There, it is treated as a literal GID (Glyph ID)

                Because of Adobe's focus on "you subset your fonts!" you are not supposed to have
                a font that maps directly Unicode (UCS2 / UTF16BE) code to font GID, but you could
                fudge it with "Identity-H" encoding and custom CIDtoGID map that mimics Unicode
                code page. There, however, all characters in the stream are treated as GIDs,
                including BOM, which is the reason we need to skip BOM in content text (i.e. that
                that is tied to a font).

                To signal this "special" PDFEscape / to8bitStream handling mode,
                API.text() function sets (unless you overwrite it with manual values
                given to API.text(.., flags) )
                    flags.autoencode = true
                    flags.noBOM = true

                */

                /*
                `flags` properties relied upon:
                .sourceEncoding = string with encoding label.
                    "Unicode" by default. = encoding of the incoming text.
                    pass some non-existing encoding name
                    (ex: 'Do not touch my strings! I know what I am doing.')
                    to make encoding code skip the encoding step.
                .outputEncoding = Either valid PDF encoding name
                    (must be supported by jsPDF font metrics, otherwise no encoding)
                    or a JS object, where key = sourceCharCode, value = outputCharCode
                    missing keys will be treated as: sourceCharCode === outputCharCode
                .noBOM
                    See comment higher above for explanation for why this is important
                .autoencode
                    See comment higher above for explanation for why this is important
                */

                var i, l, undef, sourceEncoding, encodingBlock, outputEncoding, newtext, isUnicode, ch, bch;

                if (flags === undef) {
                    flags = {};
                }

                sourceEncoding = flags.sourceEncoding ? sourceEncoding : 'Unicode';

                outputEncoding = flags.outputEncoding;

                // This 'encoding' section relies on font metrics format
                // attached to font objects by, among others,
                // "Willow Systems' standard_font_metrics plugin"
                // see jspdf.plugin.standard_font_metrics.js for format
                // of the font.metadata.encoding Object.
                // It should be something like
                //   .encoding = {'codePages':['WinANSI....'], 'WinANSI...':{code:code, ...}}
                //   .widths = {0:width, code:width, ..., 'fof':divisor}
                //   .kerning = {code:{previous_char_code:shift, ..., 'fof':-divisor},...}
                if ((flags.autoencode || outputEncoding) &&
                        fonts[activeFontKey].metadata &&
                        fonts[activeFontKey].metadata[sourceEncoding] &&
                        fonts[activeFontKey].metadata[sourceEncoding].encoding
                        ) {
                    encodingBlock = fonts[activeFontKey].metadata[sourceEncoding].encoding;

                    // each font has default encoding. Some have it clearly defined.
                    if (!outputEncoding && fonts[activeFontKey].encoding) {
                        outputEncoding = fonts[activeFontKey].encoding;
                    }

                    // Hmmm, the above did not work? Let's try again, in different place.
                    if (!outputEncoding && encodingBlock.codePages) {
                        outputEncoding = encodingBlock.codePages[0]; // let's say, first one is the default
                    }

                    if (typeof outputEncoding === 'string') {
                        outputEncoding = encodingBlock[outputEncoding];
                    }
                    // we want output encoding to be a JS Object, where
                    // key = sourceEncoding's character code and
                    // value = outputEncoding's character code.
                    if (outputEncoding) {
                        isUnicode = false;
                        newtext = [];
                        for (i = 0, l = text.length; i < l; i++) {
                            ch = outputEncoding[text.charCodeAt(i)];
                            if (ch) {
                                newtext.push(
                                    String.fromCharCode(ch)
                                );
                            } else {
                                newtext.push(
                                    text[i]
                                );
                            }

                            // since we are looping over chars anyway, might as well
                            // check for residual unicodeness
                            if (newtext[i].charCodeAt(0) >> 8) { /* more than 255 */
                                isUnicode = true;
                            }
                        }
                        text = newtext.join('');
                    }
                }

                i = text.length;
                // isUnicode may be set to false above. Hence the triple-equal to undefined
                while (isUnicode === undef && i !== 0) {
                    if (text.charCodeAt(i - 1) >> 8) { /* more than 255 */
                        isUnicode = true;
                    }
                    i--;
                }
                if (!isUnicode) {
                    return text;
                } else {
                    newtext = flags.noBOM ? [] : [254, 255];
                    for (i = 0, l = text.length; i < l; i++) {
                        ch = text.charCodeAt(i);
                        bch = ch >> 8; // divide by 256
                        if (bch >> 8) { /* something left after dividing by 256 second time */
                            throw new Error("Character at position " + i.toString(10) + " of string '" + text + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
                        }
                        newtext.push(bch);
                        newtext.push(ch - (bch << 8));
                    }
                    return String.fromCharCode.apply(undef, newtext);
                }
            },
            // Replace '/', '(', and ')' with pdf-safe versions
            pdfEscape = function (text, flags) {
                // doing to8bitStream does NOT make this PDF display unicode text. For that
                // we also need to reference a unicode font and embed it - royal pain in the rear.

                // There is still a benefit to to8bitStream - PDF simply cannot handle 16bit chars,
                // which JavaScript Strings are happy to provide. So, while we still cannot display
                // 2-byte characters property, at least CONDITIONALLY converting (entire string containing)
                // 16bit chars to (USC-2-BE) 2-bytes per char + BOM streams we ensure that entire PDF
                // is still parseable.
                // This will allow immediate support for unicode in document properties strings.
                return to8bitStream(text, flags).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            },
            putInfo = function () {
                out('/Producer (jsPDF ' + version + ')');
                if (documentProperties.title) {
                    out('/Title (' + pdfEscape(documentProperties.title) + ')');
                }
                if (documentProperties.subject) {
                    out('/Subject (' + pdfEscape(documentProperties.subject) + ')');
                }
                if (documentProperties.author) {
                    out('/Author (' + pdfEscape(documentProperties.author) + ')');
                }
                if (documentProperties.keywords) {
                    out('/Keywords (' + pdfEscape(documentProperties.keywords) + ')');
                }
                if (documentProperties.creator) {
                    out('/Creator (' + pdfEscape(documentProperties.creator) + ')');
                }
                var created = new Date();
                out('/CreationDate (D:' +
                    [
                        created.getFullYear(),
                        padd2(created.getMonth() + 1),
                        padd2(created.getDate()),
                        padd2(created.getHours()),
                        padd2(created.getMinutes()),
                        padd2(created.getSeconds())
                    ].join('') +
                    ')'
                    );
            },
            putCatalog = function () {
                out('/Type /Catalog');
                out('/Pages 1 0 R');
                // @TODO: Add zoom and layout modes
                out('/OpenAction [3 0 R /FitH null]');
                out('/PageLayout /OneColumn');
                events.publish('putCatalog');
            },
            putTrailer = function () {
                out('/Size ' + (objectNumber + 1));
                out('/Root ' + objectNumber + ' 0 R');
                out('/Info ' + (objectNumber - 1) + ' 0 R');
            },
            beginPage = function () {
                page++;
                // Do dimension stuff
                outToPages = true;
                pages[page] = [];
            },
            _addPage = function () {
                beginPage();
                // Set line width
                out(f2(lineWidth * k) + ' w');
                // Set draw color
                out(drawColor);
                // resurrecting non-default line caps, joins
                if (lineCapID !== 0) {
                    out(lineCapID.toString(10) + ' J');
                }
                if (lineJoinID !== 0) {
                    out(lineJoinID.toString(10) + ' j');
                }
                events.publish('addPage', {'pageNumber': page});
            },
            /**
            Returns a document-specific font key - a label assigned to a
            font name + font type combination at the time the font was added
            to the font inventory.

            Font key is used as label for the desired font for a block of text
            to be added to the PDF document stream.
            @private
            @function
            @param fontName {String} can be undefined on "falthy" to indicate "use current"
            @param fontStyle {String} can be undefined on "falthy" to indicate "use current"
            @returns {String} Font key.
            */
            getFont = function (fontName, fontStyle) {
                var key, undef;

                if (fontName === undef) {
                    fontName = fonts[activeFontKey].fontName;
                }
                if (fontStyle === undef) {
                    fontStyle = fonts[activeFontKey].fontStyle;
                }

                try {
                    key = fontmap[fontName][fontStyle]; // returns a string like 'F3' - the KEY corresponding tot he font + type combination.
                } catch (e) {
                    key = undef;
                }
                if (!key) {
                    throw new Error("Unable to look up font label for font '" + fontName + "', '" + fontStyle + "'. Refer to getFontList() for available fonts.");
                }

                return key;
            },
            buildDocument = function () {

                outToPages = false; // switches out() to content
                content = [];
                offsets = [];

                // putHeader()
                out('%PDF-' + pdfVersion);

                putPages();

                putResources();

                // Info
                newObject();
                out('<<');
                putInfo();
                out('>>');
                out('endobj');

                // Catalog
                newObject();
                out('<<');
                putCatalog();
                out('>>');
                out('endobj');

                // Cross-ref
                var o = content_length, i;
                out('xref');
                out('0 ' + (objectNumber + 1));
                out('0000000000 65535 f ');
                for (i = 1; i <= objectNumber; i++) {
                    out(padd10(offsets[i]) + ' 00000 n ');
                }
                // Trailer
                out('trailer');
                out('<<');
                putTrailer();
                out('>>');
                out('startxref');
                out(o);
                out('%%EOF');

                outToPages = true;

                return content.join('\n');
            },
            getStyle = function (style) {
                // see Path-Painting Operators of PDF spec
                var op = 'S'; // stroke
                if (style === 'F') {
                    op = 'f'; // fill
                } else if (style === 'FD' || style === 'DF') {
                    op = 'B'; // both
                }
                return op;
            },

            /**
            Generates the PDF document.
            Possible values:
                datauristring (alias dataurlstring) - Data-Url-formatted data returned as string.
                datauri (alias datauri) - Data-Url-formatted data pushed into current window's location (effectively reloading the window with contents of the PDF).

            If `type` argument is undefined, output is raw body of resulting PDF returned as a string.

            @param {String} type A string identifying one of the possible output types.
            @param {Object} options An object providing some additional signalling to PDF generator.
            @function
            @returns {jsPDF}
            @methodOf jsPDF#
            @name output
            */
            output = function (type, options) {
                var undef, data, length, array, i, blob;
                switch (type) {
                case undef:
                    return buildDocument();
                case 'save':
                    if (navigator.getUserMedia) {
                        if (window.URL === undefined) {
                            return API.output('dataurlnewwindow');
                        } else if (window.URL.createObjectURL === undefined) {
                            return API.output('dataurlnewwindow');
                        }
                    }
                    data = buildDocument();

                    // Need to add the file to BlobBuilder as a Uint8Array
                    length = data.length;
                    array = new Uint8Array(new ArrayBuffer(length));

                    for (i = 0; i < length; i++) {
                        array[i] = data.charCodeAt(i);
                    }

                    blob = new Blob([array], {type: "application/pdf"});

                    saveAs(blob, options);
                    break;
                case 'datauristring':
                case 'dataurlstring':
                    return 'data:application/pdf;base64,' + btoa(buildDocument());
                case 'datauri':
                case 'dataurl':
                    document.location.href = 'data:application/pdf;base64,' + btoa(buildDocument());
                    break;
                case 'dataurlnewwindow':
                    window.open('data:application/pdf;base64,' + btoa(buildDocument()));
                    break;
                default:
                    throw new Error('Output type "' + type + '" is not supported.');
                }
                // @TODO: Add different output options
            };

        if (unit === 'pt') {
            k = 1;
        } else if (unit === 'mm') {
            k = 72 / 25.4;
        } else if (unit === 'cm') {
            k = 72 / 2.54;
        } else if (unit === 'in') {
            k = 72;
        } else {
            throw ('Invalid unit: ' + unit);
        }

        // Dimensions are stored as user units and converted to points on output
        if (pageFormats.hasOwnProperty(format_as_string)) {
            pageHeight = pageFormats[format_as_string][1] / k;
            pageWidth = pageFormats[format_as_string][0] / k;
        } else {
            try {
                pageHeight = format[1];
                pageWidth = format[0];
            } catch (err) {
                throw ('Invalid format: ' + format);
            }
        }

        if (orientation === 'p' || orientation === 'portrait') {
            orientation = 'p';
            if (pageWidth > pageHeight) {
                tmp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = tmp;
            }
        } else if (orientation === 'l' || orientation === 'landscape') {
            orientation = 'l';
            if (pageHeight > pageWidth) {
                tmp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = tmp;
            }
        } else {
            throw ('Invalid orientation: ' + orientation);
        }



        //---------------------------------------
        // Public API

        /*
        Object exposing internal API to plugins
        @public
        */
        API.internal = {
            'pdfEscape': pdfEscape,
            'getStyle': getStyle,
            /**
            Returns {FontObject} describing a particular font.
            @public
            @function
            @param fontName {String} (Optional) Font's family name
            @param fontStyle {String} (Optional) Font's style variation name (Example:"Italic")
            @returns {FontObject}
            */
            'getFont': function () { return fonts[getFont.apply(API, arguments)]; },
            'getFontSize': function () { return activeFontSize;    },
            'getLineHeight': function () { return activeFontSize * lineHeightProportion;    },
            'btoa': btoa,
            'write': function (string1, string2, string3, etc) {
                out(
                    arguments.length === 1 ? string1 : Array.prototype.join.call(arguments, ' ')
                );
            },
            'getCoordinateString': function (value) {
                return f2(value * k);
            },
            'getVerticalCoordinateString': function (value) {
                return f2((pageHeight - value) * k);
            },
            'collections': {},
            'newObject': newObject,
            'putStream': putStream,
            'events': events,
            // ratio that you use in multiplication of a given "size" number to arrive to 'point'
            // units of measurement.
            // scaleFactor is set at initialization of the document and calculated against the stated
            // default measurement units for the document.
            // If default is "mm", k is the number that will turn number in 'mm' into 'points' number.
            // through multiplication.
            'scaleFactor': k,
            'pageSize': {'width': pageWidth, 'height': pageHeight},
            'output': function (type, options) {
                return output(type, options);
            },
            'getNumberOfPages': function () {return pages.length - 1; },
            'pages': pages
        };

        /**
        Adds (and transfers the focus to) new page to the PDF document.
        @function
        @returns {jsPDF}

        @methodOf jsPDF#
        @name addPage
         */
        API.addPage = function () {
            _addPage();
            return this;
        };

        /**
        Adds text to page. Supports adding multiline text when 'text' argument is an Array of Strings.
        @function
        @param {String|Array} text String or array of strings to be added to the page. Each line is shifted one line down per font, spacing settings declared before this call.
        @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Object} flags Collection of settings signalling how the text must be encoded. Defaults are sane. If you think you want to pass some flags, you likely can read the source.
        @returns {jsPDF}
        @methodOf jsPDF#
        @name text
         */
        API.text = function (text, x, y, flags) {
            /**
             * Inserts something like this into PDF
                BT
                /F1 16 Tf  % Font name + size
                16 TL % How many units down for next line in multiline text
                0 g % color
                28.35 813.54 Td % position
                (line one) Tj
                T* (line two) Tj
                T* (line three) Tj
                ET
            */

            var undef, _first, _second, _third, newtext, str, i;
            // Pre-August-2012 the order of arguments was function(x, y, text, flags)
            // in effort to make all calls have similar signature like
            //   function(data, coordinates... , miscellaneous)
            // this method had its args flipped.
            // code below allows backward compatibility with old arg order.
            if (typeof text === 'number') {
                _first = y;
                _second = text;
                _third = x;

                text = _first;
                x = _second;
                y = _third;
            }

            // If there are any newlines in text, we assume
            // the user wanted to print multiple lines, so break the
            // text up into an array.  If the text is already an array,
            // we assume the user knows what they are doing.
            if (typeof text === 'string' && text.match(/[\n\r]/)) {
                text = text.split(/\r\n|\r|\n/g);
            }

            if (typeof flags === 'undefined') {
                flags = {'noBOM': true, 'autoencode': true};
            } else {

                if (flags.noBOM === undef) {
                    flags.noBOM = true;
                }

                if (flags.autoencode === undef) {
                    flags.autoencode = true;
                }

            }

            if (typeof text === 'string') {
                str = pdfEscape(text, flags);
            } else if (text instanceof Array) {  /* Array */
                // we don't want to destroy  original text array, so cloning it
                newtext = text.concat();
                // we do array.join('text that must not be PDFescaped")
                // thus, pdfEscape each component separately
                for (i = newtext.length - 1; i !== -1; i--) {
                    newtext[i] = pdfEscape(newtext[i], flags);
                }
                str = newtext.join(") Tj\nT* (");
            } else {
                throw new Error('Type of text must be string or Array. "' + text + '" is not recognized.');
            }
            // Using "'" ("go next line and render text" mark) would save space but would complicate our rendering code, templates

            // BT .. ET does NOT have default settings for Tf. You must state that explicitely every time for BT .. ET
            // if you want text transformation matrix (+ multiline) to work reliably (which reads sizes of things from font declarations)
            // Thus, there is NO useful, *reliable* concept of "default" font for a page.
            // The fact that "default" (reuse font used before) font worked before in basic cases is an accident
            // - readers dealing smartly with brokenness of jsPDF's markup.
            out(
                'BT\n/' +
                    activeFontKey + ' ' + activeFontSize + ' Tf\n' + // font face, style, size
                    (activeFontSize * lineHeightProportion) + ' TL\n' + // line spacing
                    textColor +
                    '\n' + f2(x * k) + ' ' + f2((pageHeight - y) * k) + ' Td\n(' +
                    str +
                    ') Tj\nET'
            );
            return this;
        };

        API.line = function (x1, y1, x2, y2) {
            out(
                f2(x1 * k) + ' ' + f2((pageHeight - y1) * k) + ' m ' +
                    f2(x2 * k) + ' ' + f2((pageHeight - y2) * k) + ' l S'
            );
            return this;
        };

        /**
        Adds series of curves (straight lines or cubic bezier curves) to canvas, starting at `x`, `y` coordinates.
        All data points in `lines` are relative to last line origin.
        `x`, `y` become x1,y1 for first line / curve in the set.
        For lines you only need to specify [x2, y2] - (ending point) vector against x1, y1 starting point.
        For bezier curves you need to specify [x2,y2,x3,y3,x4,y4] - vectors to control points 1, 2, ending point. All vectors are against the start of the curve - x1,y1.

        @example .lines([[2,2],[-2,2],[1,1,2,2,3,3],[2,1]], 212,110, 10) // line, line, bezier curve, line
        @param {Array} lines Array of *vector* shifts as pairs (lines) or sextets (cubic bezier curves).
        @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} scale (Defaults to [1.0,1.0]) x,y Scaling factor for all vectors. Elements can be any floating number Sub-one makes drawing smaller. Over-one grows the drawing. Negative flips the direction.
        @param {String} style One of 'S' (the default), 'F', 'FD' or 'DF'.  'S' draws just the curve. 'F' fills the region defined by the curves. 'DF' or 'FD' draws the curves and fills the region. 
        @param {Boolean} closed If true, the path is closed with a straight line from the end of the last curve to the starting point. 
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name lines
         */
        API.lines = function (lines, x, y, scale, style, closed) {
            var undef, _first, _second, _third, scalex, scaley, i, l, leg, x2, y2, x3, y3, x4, y4;

            // Pre-August-2012 the order of arguments was function(x, y, lines, scale, style)
            // in effort to make all calls have similar signature like
            //   function(content, coordinateX, coordinateY , miscellaneous)
            // this method had its args flipped.
            // code below allows backward compatibility with old arg order.
            if (typeof lines === 'number') {
                _first = y;
                _second = lines;
                _third = x;

                lines = _first;
                x = _second;
                y = _third;
            }

            style = getStyle(style);
            scale = scale === undef ? [1, 1] : scale;

            // starting point
            out(f3(x * k) + ' ' + f3((pageHeight - y) * k) + ' m ');

            scalex = scale[0];
            scaley = scale[1];
            l = lines.length;
            //, x2, y2 // bezier only. In page default measurement "units", *after* scaling
            //, x3, y3 // bezier only. In page default measurement "units", *after* scaling
            // ending point for all, lines and bezier. . In page default measurement "units", *after* scaling
            x4 = x; // last / ending point = starting point for first item.
            y4 = y; // last / ending point = starting point for first item.

            for (i = 0; i < l; i++) {
                leg = lines[i];
                if (leg.length === 2) {
                    // simple line
                    x4 = leg[0] * scalex + x4; // here last x4 was prior ending point
                    y4 = leg[1] * scaley + y4; // here last y4 was prior ending point
                    out(f3(x4 * k) + ' ' + f3((pageHeight - y4) * k) + ' l');
                } else {
                    // bezier curve
                    x2 = leg[0] * scalex + x4; // here last x4 is prior ending point
                    y2 = leg[1] * scaley + y4; // here last y4 is prior ending point
                    x3 = leg[2] * scalex + x4; // here last x4 is prior ending point
                    y3 = leg[3] * scaley + y4; // here last y4 is prior ending point
                    x4 = leg[4] * scalex + x4; // here last x4 was prior ending point
                    y4 = leg[5] * scaley + y4; // here last y4 was prior ending point
                    out(
                        f3(x2 * k) + ' ' +
                            f3((pageHeight - y2) * k) + ' ' +
                            f3(x3 * k) + ' ' +
                            f3((pageHeight - y3) * k) + ' ' +
                            f3(x4 * k) + ' ' +
                            f3((pageHeight - y4) * k) + ' c'
                    );
                }
            }

            if (closed == true) {
                out(' h');
            }

            // stroking / filling / both the path
            out(style);
            return this;
        };

        /**
        Adds a rectangle to PDF

        @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} w Width (in units declared at inception of PDF document)
        @param {Number} h Height (in units declared at inception of PDF document)
        @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name rect
         */
        API.rect = function (x, y, w, h, style) {
            var op = getStyle(style);
            out([
                f2(x * k),
                f2((pageHeight - y) * k),
                f2(w * k),
                f2(-h * k),
                're',
                op
            ].join(' '));
            return this;
        };

        /**
        Adds a triangle to PDF

        @param {Number} x1 Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y1 Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} x2 Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y2 Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} x3 Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y3 Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name triangle
         */
        API.triangle = function (x1, y1, x2, y2, x3, y3, style) {
            this.lines(
                [
                    [ x2 - x1, y2 - y1 ], // vector to point 2
                    [ x3 - x2, y3 - y2 ], // vector to point 3
                    [ x1 - x3, y1 - y3 ] // closing vector back to point 1
                ],
                x1,
                y1, // start of path
                [1, 1],
                style,
                true
            );
            return this;
        };

        /**
        Adds a rectangle with rounded corners to PDF

        @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} w Width (in units declared at inception of PDF document)
        @param {Number} h Height (in units declared at inception of PDF document)
        @param {Number} rx Radius along x axis (in units declared at inception of PDF document)
        @param {Number} rx Radius along y axis (in units declared at inception of PDF document)
        @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name roundedRect
        */
        API.roundedRect = function (x, y, w, h, rx, ry, style) {
            var MyArc = 4 / 3 * (Math.SQRT2 - 1);
            this.lines(
                [
                    [ (w - 2 * rx), 0 ],
                    [ (rx * MyArc), 0, rx, ry - (ry * MyArc), rx, ry ],
                    [ 0, (h - 2 * ry) ],
                    [ 0, (ry * MyArc), -(rx * MyArc), ry, -rx, ry],
                    [ (-w + 2 * rx), 0],
                    [ -(rx * MyArc), 0, -rx, -(ry * MyArc), -rx, -ry],
                    [ 0, (-h + 2 * ry)],
                    [ 0, -(ry * MyArc), (rx * MyArc), -ry, rx, -ry]
                ],
                x + rx,
                y, // start of path
                [1, 1],
                style
            );
            return this;
        };

        /**
        Adds an ellipse to PDF

        @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} rx Radius along x axis (in units declared at inception of PDF document)
        @param {Number} rx Radius along y axis (in units declared at inception of PDF document)
        @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name ellipse
         */
        API.ellipse = function (x, y, rx, ry, style) {
            var op = getStyle(style),
                lx = 4 / 3 * (Math.SQRT2 - 1) * rx,
                ly = 4 / 3 * (Math.SQRT2 - 1) * ry;

            out([
                f2((x + rx) * k),
                f2((pageHeight - y) * k),
                'm',
                f2((x + rx) * k),
                f2((pageHeight - (y - ly)) * k),
                f2((x + lx) * k),
                f2((pageHeight - (y - ry)) * k),
                f2(x * k),
                f2((pageHeight - (y - ry)) * k),
                'c'
            ].join(' '));
            out([
                f2((x - lx) * k),
                f2((pageHeight - (y - ry)) * k),
                f2((x - rx) * k),
                f2((pageHeight - (y - ly)) * k),
                f2((x - rx) * k),
                f2((pageHeight - y) * k),
                'c'
            ].join(' '));
            out([
                f2((x - rx) * k),
                f2((pageHeight - (y + ly)) * k),
                f2((x - lx) * k),
                f2((pageHeight - (y + ry)) * k),
                f2(x * k),
                f2((pageHeight - (y + ry)) * k),
                'c'
            ].join(' '));
            out([
                f2((x + lx) * k),
                f2((pageHeight - (y + ry)) * k),
                f2((x + rx) * k),
                f2((pageHeight - (y + ly)) * k),
                f2((x + rx) * k),
                f2((pageHeight - y) * k),
                'c',
                op
            ].join(' '));
            return this;
        };

        /**
        Adds an circle to PDF

        @param {Number} x Coordinate (in units declared at inception of PDF document) against left edge of the page
        @param {Number} y Coordinate (in units declared at inception of PDF document) against upper edge of the page
        @param {Number} r Radius (in units declared at inception of PDF document)
        @param {String} style (Defaults to active fill/stroke style) A string signalling if stroke, fill or both are to be applied.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name circle
         */
        API.circle = function (x, y, r, style) {
            return this.ellipse(x, y, r, r, style);
        };

        /**
        Adds a properties to the PDF document

        @param {Object} A property_name-to-property_value object structure.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setProperties
         */
        API.setProperties = function (properties) {
            // copying only those properties we can render.
            var property;
            for (property in documentProperties) {
                if (documentProperties.hasOwnProperty(property) && properties[property]) {
                    documentProperties[property] = properties[property];
                }
            }
            return this;
        };

        /**
        Sets font size for upcoming text elements.

        @param {Number} size Font size in points.
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setFontSize
         */
        API.setFontSize = function (size) {
            activeFontSize = size;
            return this;
        };

        /**
        Sets text font face, variant for upcoming text elements.
        See output of jsPDF.getFontList() for possible font names, styles.

        @param {String} fontName Font name or family. Example: "times"
        @param {String} fontStyle Font style or variant. Example: "italic"
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setFont
         */
        API.setFont = function (fontName, fontStyle) {
            activeFontKey = getFont(fontName, fontStyle);
            // if font is not found, the above line blows up and we never go further
            return this;
        };

        /**
        Switches font style or variant for upcoming text elements,
        while keeping the font face or family same.
        See output of jsPDF.getFontList() for possible font names, styles.

        @param {String} style Font style or variant. Example: "italic"
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setFontStyle
         */
        API.setFontStyle = API.setFontType = function (style) {
            var undef;
            activeFontKey = getFont(undef, style);
            // if font is not found, the above line blows up and we never go further
            return this;
        };

        /**
        Returns an object - a tree of fontName to fontStyle relationships available to
        active PDF document.

        @public
        @function
        @returns {Object} Like {'times':['normal', 'italic', ... ], 'arial':['normal', 'bold', ... ], ... }
        @methodOf jsPDF#
        @name getFontList
        */
        API.getFontList = function () {
            // TODO: iterate over fonts array or return copy of fontmap instead in case more are ever added.
            var list = {},
                fontName,
                fontStyle,
                tmp;

            for (fontName in fontmap) {
                if (fontmap.hasOwnProperty(fontName)) {
                    list[fontName] = tmp = [];
                    for (fontStyle in fontmap[fontName]) {
                        if (fontmap[fontName].hasOwnProperty(fontStyle)) {
                            tmp.push(fontStyle);
                        }
                    }
                }
            }

            return list;
        };

        /**
        Sets line width for upcoming lines.

        @param {Number} width Line width (in units declared at inception of PDF document)
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setLineWidth
         */
        API.setLineWidth = function (width) {
            out((width * k).toFixed(2) + ' w');
            return this;
        };

        /**
        Sets the stroke color for upcoming elements.

        Depending on the number of arguments given, Gray, RGB, or CMYK
        color space is implied.

        When only ch1 is given, "Gray" color space is implied and it
        must be a value in the range from 0.00 (solid black) to to 1.00 (white)
        if values are communicated as String types, or in range from 0 (black)
        to 255 (white) if communicated as Number type.
        The RGB-like 0-255 range is provided for backward compatibility.

        When only ch1,ch2,ch3 are given, "RGB" color space is implied and each
        value must be in the range from 0.00 (minimum intensity) to to 1.00
        (max intensity) if values are communicated as String types, or
        from 0 (min intensity) to to 255 (max intensity) if values are communicated
        as Number types.
        The RGB-like 0-255 range is provided for backward compatibility.

        When ch1,ch2,ch3,ch4 are given, "CMYK" color space is implied and each
        value must be a in the range from 0.00 (0% concentration) to to
        1.00 (100% concentration)

        Because JavaScript treats fixed point numbers badly (rounds to
        floating point nearest to binary representation) it is highly advised to
        communicate the fractional numbers as String types, not JavaScript Number type.

        @param {Number|String} ch1 Color channel value
        @param {Number|String} ch2 Color channel value
        @param {Number|String} ch3 Color channel value
        @param {Number|String} ch4 Color channel value

        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setDrawColor
         */
        API.setDrawColor = function (ch1, ch2, ch3, ch4) {
            var color;
            if (ch2 === undefined || (ch4 === undefined && ch1 === ch2 === ch3)) {
                // Gray color space.
                if (typeof ch1 === 'string') {
                    color = ch1 + ' G';
                } else {
                    color = f2(ch1 / 255) + ' G';
                }
            } else if (ch4 === undefined) {
                // RGB
                if (typeof ch1 === 'string') {
                    color = [ch1, ch2, ch3, 'RG'].join(' ');
                } else {
                    color = [f2(ch1 / 255), f2(ch2 / 255), f2(ch3 / 255), 'RG'].join(' ');
                }
            } else {
                // CMYK
                if (typeof ch1 === 'string') {
                    color = [ch1, ch2, ch3, ch4, 'K'].join(' ');
                } else {
                    color = [f2(ch1), f2(ch2), f2(ch3), f2(ch4), 'K'].join(' ');
                }
            }

            out(color);
            return this;
        };

        /**
        Sets the fill color for upcoming elements.

        Depending on the number of arguments given, Gray, RGB, or CMYK
        color space is implied.

        When only ch1 is given, "Gray" color space is implied and it
        must be a value in the range from 0.00 (solid black) to to 1.00 (white)
        if values are communicated as String types, or in range from 0 (black)
        to 255 (white) if communicated as Number type.
        The RGB-like 0-255 range is provided for backward compatibility.

        When only ch1,ch2,ch3 are given, "RGB" color space is implied and each
        value must be in the range from 0.00 (minimum intensity) to to 1.00
        (max intensity) if values are communicated as String types, or
        from 0 (min intensity) to to 255 (max intensity) if values are communicated
        as Number types.
        The RGB-like 0-255 range is provided for backward compatibility.

        When ch1,ch2,ch3,ch4 are given, "CMYK" color space is implied and each
        value must be a in the range from 0.00 (0% concentration) to to
        1.00 (100% concentration)

        Because JavaScript treats fixed point numbers badly (rounds to
        floating point nearest to binary representation) it is highly advised to
        communicate the fractional numbers as String types, not JavaScript Number type.

        @param {Number|String} ch1 Color channel value
        @param {Number|String} ch2 Color channel value
        @param {Number|String} ch3 Color channel value
        @param {Number|String} ch4 Color channel value

        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setFillColor
         */
        API.setFillColor = function (ch1, ch2, ch3, ch4) {
            var color;

            if (ch2 === undefined || (ch4 === undefined && ch1 === ch2 === ch3)) {
                // Gray color space.
                if (typeof ch1 === 'string') {
                    color = ch1 + ' g';
                } else {
                    color = f2(ch1 / 255) + ' g';
                }
            } else if (ch4 === undefined) {
                // RGB
                if (typeof ch1 === 'string') {
                    color = [ch1, ch2, ch3, 'rg'].join(' ');
                } else {
                    color = [f2(ch1 / 255), f2(ch2 / 255), f2(ch3 / 255), 'rg'].join(' ');
                }
            } else {
                // CMYK
                if (typeof ch1 === 'string') {
                    color = [ch1, ch2, ch3, ch4, 'k'].join(' ');
                } else {
                    color = [f2(ch1), f2(ch2), f2(ch3), f2(ch4), 'k'].join(' ');
                }
            }

            out(color);
            return this;
        };

        /**
        Sets the text color for upcoming elements.
        If only one, first argument is given,
        treats the value as gray-scale color value.

        @param {Number} r Red channel color value in range 0-255 or {String} r color value in hexadecimal, example: '#FFFFFF'
        @param {Number} g Green channel color value in range 0-255
        @param {Number} b Blue channel color value in range 0-255
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setTextColor
        */
        API.setTextColor = function (r, g, b) {
            var patt = /#[0-9A-Fa-f]{6}/;
            if ((typeof r == 'string') && patt.test(r)) {
                var hex = r.replace('#','');
                var bigint = parseInt(hex, 16);
                r = (bigint >> 16) & 255;
                g = (bigint >> 8) & 255;
                b = bigint & 255;
            }

            if ((r === 0 && g === 0 && b === 0) || (typeof g === 'undefined')) {
                textColor = f3(r / 255) + ' g';
            } else {
                textColor = [f3(r / 255), f3(g / 255), f3(b / 255), 'rg'].join(' ');
            }
            return this;
        };

        /**
        Is an Object providing a mapping from human-readable to
        integer flag values designating the varieties of line cap
        and join styles.

        @returns {Object}
        @fieldOf jsPDF#
        @name CapJoinStyles
        */
        API.CapJoinStyles = {
            0: 0,
            'butt': 0,
            'but': 0,
            'miter': 0,
            1: 1,
            'round': 1,
            'rounded': 1,
            'circle': 1,
            2: 2,
            'projecting': 2,
            'project': 2,
            'square': 2,
            'bevel': 2
        };

        /**
        Sets the line cap styles
        See {jsPDF.CapJoinStyles} for variants

        @param {String|Number} style A string or number identifying the type of line cap
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setLineCap
        */
        API.setLineCap = function (style) {
            var id = this.CapJoinStyles[style];
            if (id === undefined) {
                throw new Error("Line cap style of '" + style + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
            }
            lineCapID = id;
            out(id.toString(10) + ' J');

            return this;
        };

        /**
        Sets the line join styles
        See {jsPDF.CapJoinStyles} for variants

        @param {String|Number} style A string or number identifying the type of line join
        @function
        @returns {jsPDF}
        @methodOf jsPDF#
        @name setLineJoin
        */
        API.setLineJoin = function (style) {
            var id = this.CapJoinStyles[style];
            if (id === undefined) {
                throw new Error("Line join style of '" + style + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
            }
            lineJoinID = id;
            out(id.toString(10) + ' j');

            return this;
        };

        // Output is both an internal (for plugins) and external function
        API.output = output;

        /**
         * Saves as PDF document. An alias of jsPDF.output('save', 'filename.pdf')
         * @param  {String} filename The filename including extension.
         *
         * @function
         * @returns {jsPDF}
         * @methodOf jsPDF#
         * @name save
         */
        API.save = function (filename) {
            API.output('save', filename);
        };

        // applying plugins (more methods) ON TOP of built-in API.
        // this is intentional as we allow plugins to override
        // built-ins
        for (plugin in jsPDF.API) {
            if (jsPDF.API.hasOwnProperty(plugin)) {
                if (plugin === 'events' && jsPDF.API.events.length) {
                    (function (events, newEvents) {

                        // jsPDF.API.events is a JS Array of Arrays
                        // where each Array is a pair of event name, handler
                        // Events were added by plugins to the jsPDF instantiator.
                        // These are always added to the new instance and some ran
                        // during instantiation.

                        var eventname, handler_and_args, i;

                        for (i = newEvents.length - 1; i !== -1; i--) {
                            // subscribe takes 3 args: 'topic', function, runonce_flag
                            // if undefined, runonce is false.
                            // users can attach callback directly,
                            // or they can attach an array with [callback, runonce_flag]
                            // that's what the "apply" magic is for below.
                            eventname = newEvents[i][0];
                            handler_and_args = newEvents[i][1];
                            events.subscribe.apply(
                                events,
                                [eventname].concat(
                                    typeof handler_and_args === 'function' ?
                                            [ handler_and_args ] :
                                            handler_and_args
                                )
                            );
                        }
                    }(events, jsPDF.API.events));
                } else {
                    API[plugin] = jsPDF.API[plugin];
                }
            }
        }

        /////////////////////////////////////////
        // continuing initilisation of jsPDF Document object
        /////////////////////////////////////////


        // Add the first page automatically
        addFonts();
        activeFontKey = 'F1';
        _addPage();

        events.publish('initialized');

        return API;
    }

/**
jsPDF.API is a STATIC property of jsPDF class.
jsPDF.API is an object you can add methods and properties to.
The methods / properties you add will show up in new jsPDF objects.

One property is prepopulated. It is the 'events' Object. Plugin authors can add topics, callbacks to this object. These will be reassigned to all new instances of jsPDF.
Examples:
    jsPDF.API.events['initialized'] = function(){ 'this' is API object }
    jsPDF.API.events['addFont'] = function(added_font_object){ 'this' is API object }

@static
@public
@memberOf jsPDF
@name API

@example
    jsPDF.API.mymethod = function(){
        // 'this' will be ref to internal API object. see jsPDF source
        // , so you can refer to built-in methods like so:
        //     this.line(....)
        //     this.text(....)
    }
    var pdfdoc = new jsPDF()
    pdfdoc.mymethod() // <- !!!!!!
*/
    jsPDF.API = {'events': []};

    return jsPDF;
}());
/** @preserve 
jsPDF addImage plugin (JPEG only at this time)
Copyright (c) 2012 https://github.com/siefkenj/
*/

/**
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */

;(function(jsPDFAPI) {
'use strict'

var namespace = 'addImage_'

// takes a string imgData containing the raw bytes of
// a jpeg image and returns [width, height]
// Algorithm from: http://www.64lines.com/jpeg-width-height
var getJpegSize = function(imgData) {
	'use strict'
	var width, height;
	// Verify we have a valid jpeg header 0xff,0xd8,0xff,0xe0,?,?,'J','F','I','F',0x00
	if (!imgData.charCodeAt(0) === 0xff ||
		!imgData.charCodeAt(1) === 0xd8 ||
		!imgData.charCodeAt(2) === 0xff ||
		!imgData.charCodeAt(3) === 0xe0 ||
		!imgData.charCodeAt(6) === 'J'.charCodeAt(0) ||
		!imgData.charCodeAt(7) === 'F'.charCodeAt(0) ||
		!imgData.charCodeAt(8) === 'I'.charCodeAt(0) ||
		!imgData.charCodeAt(9) === 'F'.charCodeAt(0) ||
		!imgData.charCodeAt(10) === 0x00) {
			throw new Error('getJpegSize requires a binary jpeg file')
	}
	var blockLength = imgData.charCodeAt(4)*256 + imgData.charCodeAt(5);
	var i = 4, len = imgData.length;
	while ( i < len ) {
		i += blockLength;
		if (imgData.charCodeAt(i) !== 0xff) {
			throw new Error('getJpegSize could not find the size of the image');
		}
		if (imgData.charCodeAt(i+1) === 0xc0 || //(SOF) Huffman  - Baseline DCT
		    imgData.charCodeAt(i+1) === 0xc1 || //(SOF) Huffman  - Extended sequential DCT 
		    imgData.charCodeAt(i+1) === 0xc2 || // Progressive DCT (SOF2)
		    imgData.charCodeAt(i+1) === 0xc3 || // Spatial (sequential) lossless (SOF3)
		    imgData.charCodeAt(i+1) === 0xc4 || // Differential sequential DCT (SOF5)
		    imgData.charCodeAt(i+1) === 0xc5 || // Differential progressive DCT (SOF6)
		    imgData.charCodeAt(i+1) === 0xc6 || // Differential spatial (SOF7)
		    imgData.charCodeAt(i+1) === 0xc7) {
			height = imgData.charCodeAt(i+5)*256 + imgData.charCodeAt(i+6);
			width = imgData.charCodeAt(i+7)*256 + imgData.charCodeAt(i+8);
			return [width, height];
		} else {
			i += 2;
			blockLength = imgData.charCodeAt(i)*256 + imgData.charCodeAt(i+1)
		}
	}
}
// Image functionality ported from pdf.js
, putImage = function(img) {
	var objectNumber = this.internal.newObject()
	, out = this.internal.write
	, putStream = this.internal.putStream

	img['n'] = objectNumber

	out('<</Type /XObject')
	out('/Subtype /Image')
	out('/Width ' + img['w'])
	out('/Height ' + img['h'])
	if (img['cs'] === 'Indexed') {
		out('/ColorSpace [/Indexed /DeviceRGB '
				+ (img['pal'].length / 3 - 1) + ' ' + (objectNumber + 1)
				+ ' 0 R]');
	} else {
		out('/ColorSpace /' + img['cs']);
		if (img['cs'] === 'DeviceCMYK') {
			out('/Decode [1 0 1 0 1 0 1 0]');
		}
	}
	out('/BitsPerComponent ' + img['bpc']);
	if ('f' in img) {
		out('/Filter /' + img['f']);
	}
	if ('dp' in img) {
		out('/DecodeParms <<' + img['dp'] + '>>');
	}
	if ('trns' in img && img['trns'].constructor == Array) {
		var trns = '';
		for ( var i = 0; i < img['trns'].length; i++) {
			trns += (img[trns][i] + ' ' + img['trns'][i] + ' ');
			out('/Mask [' + trns + ']');
		}
	}
	if ('smask' in img) {
		out('/SMask ' + (objectNumber + 1) + ' 0 R');
	}
	out('/Length ' + img['data'].length + '>>');

	putStream(img['data']);

	out('endobj');
}
, putResourcesCallback = function() {
	var images = this.internal.collections[namespace + 'images']
	for ( var i in images ) {
		putImage.call(this, images[i])
	}
}
, putXObjectsDictCallback = function(){
	var images = this.internal.collections[namespace + 'images']
	, out = this.internal.write
	, image
	for (var i in images) {
		image = images[i]
		out(
			'/I' + image['i']
			, image['n']
			, '0'
			, 'R'
		)
	}
}

jsPDFAPI.addImage = function(imageData, format, x, y, w, h) {
	'use strict'
	if (typeof imageData === 'object' && imageData.nodeType === 1) {
        var canvas = document.createElement('canvas');
        canvas.width = imageData.clientWidth;
	    canvas.height = imageData.clientHeight;

        var ctx = canvas.getContext('2d');
        if (!ctx) {
            throw ('addImage requires canvas to be supported by browser.');
        }
        ctx.drawImage(imageData, 0, 0, canvas.width, canvas.height);
        imageData = canvas.toDataURL('image/jpeg');
	    format = "JPEG";
	}
	if (format.toUpperCase() !== 'JPEG') {
		throw new Error('addImage currently only supports format \'JPEG\', not \''+format+'\'');
	}

	var imageIndex
	, images = this.internal.collections[namespace + 'images']
	, coord = this.internal.getCoordinateString
	, vcoord = this.internal.getVerticalCoordinateString;

	// Detect if the imageData is raw binary or Data URL
	if (imageData.substring(0, 23) === 'data:image/jpeg;base64,') {
		imageData = atob(imageData.replace('data:image/jpeg;base64,', ''));
	}

	if (images){
		// this is NOT the first time this method is ran on this instance of jsPDF object.
		imageIndex = Object.keys ? 
		Object.keys(images).length :
		(function(o){
			var i = 0
			for (var e in o){if(o.hasOwnProperty(e)){ i++ }}
			return i
		})(images)
	} else {
		// this is the first time this method is ran on this instance of jsPDF object.
		imageIndex = 0
		this.internal.collections[namespace + 'images'] = images = {}
		this.internal.events.subscribe('putResources', putResourcesCallback)
		this.internal.events.subscribe('putXobjectDict', putXObjectsDictCallback)
	}

	var dims = getJpegSize(imageData);
	var info = {
		w : dims[0],
		h : dims[1],
		cs : 'DeviceRGB',
		bpc : 8,
		f : 'DCTDecode',
		i : imageIndex,
		data : imageData
		// n: objectNumber will be added by putImage code

	};
	images[imageIndex] = info
	if (!w && !h) {
		w = -96;
		h = -96;
	}
	if (w < 0) {
		w = (-1) * info['w'] * 72 / w / this.internal.scaleFactor;
	}
	if (h < 0) {
		h = (-1) * info['h'] * 72 / h / this.internal.scaleFactor;
	}
	if (w === 0) {
		w = h * info['w'] / info['h'];
	}
	if (h === 0) {
		h = w * info['h'] / info['w'];
	}

	this.internal.write(
		'q'
		, coord(w)
		, '0 0'
		, coord(h) // TODO: check if this should be shifted by vcoord
		, coord(x)
		, vcoord(y + h)
		, 'cm /I'+info['i']
		, 'Do Q'
	)

	return this 
}
})(jsPDF.API)
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}


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
AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(a){this.type="serial";AmCharts.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.createEvents("changed");this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=0.8;this.updateScrollbar=!0;var b=new AmCharts.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1;this.minSelectedTime=
0;AmCharts.applyTheme(this,a,this.cname)},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var a=this.chartCursor;a&&(a.updateData(),a.fullWidth&&(a.fullRectSet=this.cursorLineSet));var a=this.countColumns(),b=this.graphs,c;for(c=0;c<b.length;c++)b[c].columnCount=a;this.updateScrollbar=!0;this.drawChart();this.autoMargins&&
!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins());this.mouseWheelScrollEnabled&&this.addMouseWheel()},handleWheelReal:function(a,b){if(!this.wheelBusy){var c=this.categoryAxis,d=c.parseDates,c=c.minDuration(),e=1;b&&(e=-1);0>a?d?this.endTime<this.lastTime&&this.zoomToDates(new Date(this.startTime+e*c),new Date(this.endTime+1*c)):this.end<this.chartData.length-1&&this.zoomToIndexes(this.start+e,this.end+1):d?this.startTime>this.firstTime&&this.zoomToDates(new Date(this.startTime-
e*c),new Date(this.endTime-1*c)):0<this.start&&this.zoomToIndexes(this.start-e,this.end-1)}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);AmCharts.AmSerialChart.base.validateData.call(this)},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(AmCharts.ifArray(a)){var b=this.chartScrollbar;b&&b.draw();if(0<this.realWidth&&0<this.realHeight){var a=a.length-1,c,b=this.categoryAxis;
if(b.parseDates&&!b.equalSpacing){if(b=this.startTime,c=this.endTime,isNaN(b)||isNaN(c))b=this.firstTime,c=this.lastTime}else if(b=this.start,c=this.end,isNaN(b)||isNaN(c))b=0,c=a;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(b,c)}}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},cleanChart:function(){AmCharts.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(a,b,c){a.chart=this;a.id=
c;a.rotate=b;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.axisItemRenderer=AmCharts.RecItem;a.setOrientation(!this.rotate);a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.viW=this.plotAreaWidth-1;a.viH=this.plotAreaHeight-1;a.viX=this.marginLeftReal;a.viY=this.marginTopReal;a.marginsChanged=!0},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,
b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=!0}},updateData:function(){this.parseData();var a=this.graphs,b,c=this.chartData;for(b=0;b<a.length;b++)a[b].data=c;0<c.length&&(this.firstTime=this.getStartTime(c[0].time),this.lastTime=this.getEndTime(c[c.length-1].time))},getStartTime:function(a){var b=this.categoryAxis;return AmCharts.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},
getEndTime:function(a){var b=AmCharts.extractPeriod(this.categoryAxis.minPeriod);return AmCharts.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},updateScrollbars:function(){AmCharts.AmSerialChart.base.updateScrollbars.call(this);this.updateChartScrollbar(this.chartScrollbar,this.rotate)},
zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?this.timeZoom(a,b):this.indexZoom(a,b);this.updateLegendValues()},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.startTime&&b-a>c&&(b=a+c,this.updateScrollbar=!0));var d=this.minSelectedTime;if(0<d&&b-a<d){var e=Math.round(a+(b-a)/2),d=Math.round(d/2);a=e-d;b=e+d}var f=this.chartData,e=this.categoryAxis;if(AmCharts.ifArray(f)&&(a!=this.startTime||b!=
this.endTime)){var k=e.minDuration(),d=this.firstTime,n=this.lastTime;a||(a=d,isNaN(c)||(a=n-c));b||(b=n);a>n&&(a=n);b<d&&(b=d);a<d&&(a=d);b>n&&(b=n);b<a&&(b=a+k);b-a<k/5&&(b<n?b=a+k/5:a=b-k/5);this.startTime=a;this.endTime=b;c=f.length-1;k=this.getClosestIndex(f,"time",a,!0,0,c);f=this.getClosestIndex(f,"time",b,!1,k,c);e.timeZoom(a,b);e.zoom(k,f);this.start=AmCharts.fitToBounds(k,0,c);this.end=AmCharts.fitToBounds(f,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=d||b!=n?this.showZB(!0):this.showZB(!1);
this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},indexZoom:function(a,b){var c=this.maxSelectedSeries;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.start&&b-a>c&&(b=a+c,this.updateScrollbar=!0));if(a!=this.start||b!=this.end){var d=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(c)||(a=d-c));isNaN(b)&&(b=d);b<a&&(b=a);b>d&&(b=d);a>d&&(a=d-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!==a||b!=this.chartData.length-
1?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()}},updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis;AmCharts.isString(c.fillToGraph)&&(c.fillToGraph=this.getGraphById(c.fillToGraph))}},updateColumnsDepth:function(){var a,b=this.graphs,c;AmCharts.remove(this.columnsSet);this.columnsArray=[];for(a=0;a<b.length;a++){c=
b[a];var d=c.columnsArray;if(d){var e;for(e=0;e<d.length;e++)this.columnsArray.push(d[e])}}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);c&&b.translate(c.x,c.y);this.columnsSet=b}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;a&&this.updateScrollbar&&(b.parseDates&&!b.equalSpacing?
a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.TrendLine,this.theme);a[b]=c;c.chart=this;AmCharts.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=
0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);this.zoomTrendLines();(b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,e,f=!1,k,n;for(n=0;n<b;n++){e=this.valueAxes[n];var l=e.stackType;if("100%"==l||"regular"==l)for(f=!1,k=0;k<c;k++)d=this.graphs[k],d.hidden||d.valueAxis!=e||"column"!=d.type||(!f&&d.stackable&&(a++,f=!0),
(!d.stackable&&d.clustered||d.newStack)&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0));if("none"==l||"3d"==l)for(k=0;k<c;k++)d=this.graphs[k],!d.hidden&&d.valueAxis==e&&"column"==d.type&&d.clustered&&(d.columnIndex=a,a++);if("3d"==l){for(n=0;n<c;n++)d=this.graphs[n],d.depthCount=a;a=1}}return a},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this);this.parseSerialData()},getCategoryIndexByValue:function(a){var b=this.chartData,c,d;for(d=0;d<b.length;d++)b[d].category==a&&
(c=d);return c},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},handleScrollbarZoom:function(a){this.updateScrollbar=!1;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;
this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=AmCharts.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[c];a.startValue=AmCharts.formatDate(a.startDate,b);a.endValue=AmCharts.formatDate(a.endDate,b);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=
this.end;var a=this.chartData;if(AmCharts.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){var b=
this.graphs,c;for(c=0;c<b.length;c++){var d=b[c];isNaN(a)?d.currentDataItem=void 0:d.currentDataItem=this.chartData[a].axes[d.valueAxis.id].graphs[d.id]}this.legend&&this.legend.updateValues()},getClosestIndex:function(a,b,c,d,e,f){0>e&&(e=0);f>a.length-1&&(f=a.length-1);var k=e+Math.round((f-e)/2),n=a[k][b];if(1>=f-e){if(d)return e;d=a[f][b];return Math.abs(a[e][b]-c)<Math.abs(d-c)?e:f}return c==n?k:c<n?this.getClosestIndex(a,b,c,d,e,k):this.getClosestIndex(a,b,c,d,k,f)},zoomToIndexes:function(a,
b){this.updateScrollbar=!0;var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):this.zoom(a,b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length);b=AmCharts.resetDateToMin(b,this.categoryAxis.minPeriod,1);c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);
this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,b){if(b){var c=["value","open","low","high","close"],d="value open low high close average sum count".split(" "),e=b.valueAxis,f=this.chartData,k=b.numberFormatter;k||(k=this.nf);for(var n=0;n<c.length;n++){for(var l=c[n],h=0,g=0,m,u,q,s,p,v=0,A=0,y,r,t,w,B,C=this.start;C<=this.end;C++){var x=
f[C];if(x&&(x=x.axes[e.id].graphs[b.id])){if(x.values){var z=x.values[l];if(!isNaN(z)){isNaN(m)&&(m=z);u=z;if(isNaN(q)||q>z)q=z;if(isNaN(s)||s<z)s=z;p=AmCharts.getDecimals(h);var D=AmCharts.getDecimals(z),h=h+z,h=AmCharts.roundTo(h,Math.max(p,D));g++;p=h/g}}if(x.percents&&(x=x.percents[l],!isNaN(x))){isNaN(y)&&(y=x);r=x;if(isNaN(t)||t>x)t=x;if(isNaN(w)||w<x)w=x;B=AmCharts.getDecimals(v);z=AmCharts.getDecimals(x);v+=x;v=AmCharts.roundTo(v,Math.max(B,z));A++;B=v/A}}}v={open:y,close:r,high:w,low:t,average:B,
sum:v,count:A};a=AmCharts.formatValue(a,{open:m,close:u,high:s,low:q,average:p,sum:h,count:g},d,k,l+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,v,d,this.pf,"percents\\."+l+"\\.")}}return a},formatString:function(a,b,c){var d=b.graph;if(-1!=a.indexOf("[[category]]")){var e=b.serialDataItem.category;if(this.categoryAxis.parseDates){var f=this.balloonDateFormat,k=this.chartCursor;k&&(f=k.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&
(f=AmCharts.formatDate(e,f),-1!=f.indexOf("fff")&&(f=AmCharts.formatMilliseconds(f,e)),e=f)}a=a.replace(/\[\[category\]\]/g,String(e))}d=d.numberFormatter;d||(d=this.nf);e=b.graph.valueAxis;(f=e.duration)&&!isNaN(b.values.value)&&(e=AmCharts.formatDuration(b.values.value,f,"",e.durationUnits,e.maxInterval,d),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),e));e="value open low high close total".split(" ");f=this.pf;a=AmCharts.formatValue(a,b.percents,e,f,"percents\\.");a=AmCharts.formatValue(a,b.values,
e,d,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b.values,["percents"],f);-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));return a=AmCharts.AmSerialChart.base.formatString.call(this,a,b,c)},addChartScrollbar:function(a){AmCharts.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=
a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){AmCharts.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){AmCharts.AmSerialChart.base.handleReleaseOutside.call(this,a);AmCharts.callMethod("handleReleaseOutside",[this.chartScrollbar])}});AmCharts.Cuboid=AmCharts.Class({construct:function(a,b,c,d,e,f,k,n,l,h,g,m,u,q,s){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=f;this.alpha=k;this.bwidth=n;this.bcolor=l;this.balpha=h;this.colors=f;this.dashLength=q;this.pattern=s;u?0>b&&0===g&&(g=180):0>c&&270==g&&(g=90);this.gradientRotation=g;0===d&&0===e&&(this.cornerRadius=m);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,c=this.w,d=this.h,e=this.dx,f=
this.dy,k=this.colors,n=this.alpha,l=this.bwidth,h=this.bcolor,g=this.balpha,m=this.gradientRotation,u=this.cornerRadius,q=this.dashLength,s=this.pattern,p=k,v=k;"object"==typeof k&&(p=k[0],v=k[k.length-1]);var A,y,r,t,w,B,C,x,z,D=n;s&&(n=0);if(0<e||0<f)C=v,v=AmCharts.adjustLuminosity(p,-0.2),v=AmCharts.adjustLuminosity(p,-0.2),A=AmCharts.polygon(b,[0,e,c+e,c,0],[0,f,f,0,0],v,n,1,h,0,m),0<g&&(z=AmCharts.line(b,[0,e,c+e],[0,f,f],h,g,l,q)),y=AmCharts.polygon(b,[0,0,c,c,0],[0,d,d,0,0],v,n,1,h,0,m),y.translate(e,
f),0<g&&(r=AmCharts.line(b,[e,e],[f,f+d],h,g,l,q)),t=AmCharts.polygon(b,[0,0,e,e,0],[0,d,d+f,f,0],v,n,1,h,0,m),w=AmCharts.polygon(b,[c,c,c+e,c+e,c],[0,d,d+f,f,0],v,n,1,h,0,m),0<g&&(B=AmCharts.line(b,[c,c+e,c+e,c],[0,f,d+f,d],h,g,l,q)),v=AmCharts.adjustLuminosity(C,0.2),C=AmCharts.polygon(b,[0,e,c+e,c,0],[d,d+f,d+f,d,d],v,n,1,h,0,m),0<g&&(x=AmCharts.line(b,[0,e,c+e],[d,d+f,d+f],h,g,l,q));n=D;1>Math.abs(d)&&(d=0);1>Math.abs(c)&&(c=0);b=0===d?AmCharts.line(b,[0,c],[0,0],h,g,l,q):0===c?AmCharts.line(b,
[0,0],[0,d],h,g,l,q):0<u?AmCharts.rect(b,c,d,k,n,l,h,g,u,m,q):AmCharts.polygon(b,[0,0,c,c,0],[0,d,d,0,0],k,n,l,h,g,m,!1,q);d=0>d?[A,z,y,r,t,w,B,C,x,b]:[C,x,y,r,t,w,A,z,B,b];for(A=0;A<d.length;A++)(y=d[A])&&a.push(y);s&&b.pattern(s)},width:function(a){this.w=a;this.draw()},height:function(a){this.h=a;this.draw()},animateHeight:function(a,b){var c=this;c.easing=b;c.totalFrames=1E3*a/AmCharts.updateRate;c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},AmCharts.updateRate)},
updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},AmCharts.updateRate))},animateWidth:function(a,b){var c=this;c.easing=b;c.totalFrames=1E3*a/AmCharts.updateRate;c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},AmCharts.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},
AmCharts.updateRate))}});AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(a){this.cname="CategoryAxis";AmCharts.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.markPeriodChange=this.boldPeriodBeginning=!0;this.safeDistance=30;this.centerLabelOnFullPeriod=!0;this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",
count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},
{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={};this.nextPeriod.fff="ss";this.nextPeriod.ss="mm";this.nextPeriod.mm="hh";this.nextPeriod.hh="DD";this.nextPeriod.DD="MM";this.nextPeriod.MM="YYYY";AmCharts.applyTheme(this,
a,this.cname)},draw:function(){AmCharts.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;if(AmCharts.ifArray(a)){var b,c=this.chart,d=this.start,e=this.labelFrequency,f=0;b=this.end-d+1;var k=this.gridCountR,n=this.showFirstLabel,l=this.showLastLabel,h,g="",m=AmCharts.extractPeriod(this.minPeriod);h=AmCharts.getPeriodDuration(m.period,m.count);var u,q,s,p,v,A;u=this.rotate;var y=this.firstDayOfWeek,r=this.boldPeriodBeginning,a=AmCharts.resetDateToMin(new Date(a[a.length-
1].time+1.05*h),this.minPeriod,1,y).getTime(),t;this.endTime>a&&(this.endTime=a);t=this.minorGridEnabled;var w,a=this.gridAlpha,B;if(this.parseDates&&!this.equalSpacing){this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);e=d.period;u=d.count;q=AmCharts.getPeriodDuration(e,u);q<h&&(e=m.period,u=m.count,q=h);s=e;"WW"==s&&(s="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var k=Math.ceil(this.timeDifference/q)+5,C=g=AmCharts.resetDateToMin(new Date(this.startTime-q),e,
u,y).getTime();s==e&&1==u&&this.centerLabelOnFullPeriod&&(v=q*this.stepWidth);this.cellWidth=h*this.stepWidth;b=Math.round(g/q);d=-1;b/2==Math.round(b/2)&&(d=-2,g-=q);var x=c.firstTime,z=0;t&&1<u&&(w=this.chooseMinorFrequency(u),B=AmCharts.getPeriodDuration(e,w));if(0<this.gridCountR)for(b=d;b<=k;b++){m=x+q*(b+Math.floor((C-x)/q))-z;"DD"==e&&(m+=36E5);m=AmCharts.resetDateToMin(new Date(m),e,u,y).getTime();"MM"==e&&(t=(m-g)/q,1.5<=(m-g)/q&&(m=m-(t-1)*q+AmCharts.getPeriodDuration("DD",3),m=AmCharts.resetDateToMin(new Date(m),
e,1).getTime(),z+=q));h=(m-this.startTime)*this.stepWidth;A=!1;this.nextPeriod[s]&&(A=this.checkPeriodChange(this.nextPeriod[s],1,m,g,s));t=!1;A&&this.markPeriodChange?(g=this.dateFormatsObject[this.nextPeriod[s]],this.twoLineMode&&(g=this.dateFormatsObject[s]+"\n"+g,g=AmCharts.fixBrakes(g)),t=!0):g=this.dateFormatsObject[s];r||(t=!1);g=AmCharts.formatDate(new Date(m),g);if(b==d&&!n||b==k&&!l)g=" ";this.labelFunction&&(g=this.labelFunction(g,new Date(m),this,e,u,p).toString());p=new this.axisItemRenderer(this,
h,g,!1,v,0,!1,t);this.pushAxisItem(p);p=g=m;if(!isNaN(w))for(h=1;h<u;h+=w)this.gridAlpha=this.minorGridAlpha,t=m+B*h,t=AmCharts.resetDateToMin(new Date(t),e,w,y).getTime(),t=new this.axisItemRenderer(this,(t-this.startTime)*this.stepWidth),this.pushAxisItem(t);this.gridAlpha=a}}else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(b),b<k&&(k=b),f+=this.start,this.stepWidth=this.getStepWidth(b),0<k)for(r=Math.floor(b/k),w=this.chooseMinorFrequency(r),h=f,h/2==Math.round(h/2)&&h--,0>h&&(h=0),
k=0,this.end-h+1>=this.autoRotateCount&&(this.labelRotation=this.autoRotateAngle),b=h;b<=this.end+2;b++){p=!1;0<=b&&b<this.data.length?(s=this.data[b],g=s.category,p=s.forceShow):g="";if(t&&!isNaN(w))if(b/w==Math.round(b/w)||p)b/r==Math.round(b/r)||p||(this.gridAlpha=this.minorGridAlpha,g=void 0);else continue;else if(b/r!=Math.round(b/r)&&!p)continue;h=this.getCoordinate(b-f);p=0;"start"==this.gridPosition&&(h-=this.cellWidth/2,p=this.cellWidth/2);if(b==d&&!n||b==this.end&&!l)g=void 0;Math.round(k/
e)!=k/e&&(g=void 0);k++;y=this.cellWidth;u&&(y=NaN);this.labelFunction&&s&&(g=this.labelFunction(g,s,this));g=AmCharts.fixBrakes(g);p=new this.axisItemRenderer(this,h,g,!0,y,p,void 0,!1,p);this.pushAxisItem(p);this.gridAlpha=a}}else if(this.parseDates&&this.equalSpacing){f=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);e=d.period;u=d.count;q=AmCharts.getPeriodDuration(e,u);q<h&&(e=m.period,
u=m.count,q=h);s=e;"WW"==s&&(s="DD");this.stepWidth=this.getStepWidth(b);k=Math.ceil(this.timeDifference/q)+1;g=AmCharts.resetDateToMin(new Date(this.startTime-q),e,u,y).getTime();this.cellWidth=this.getStepWidth(b);b=Math.round(g/q);d=-1;b/2==Math.round(b/2)&&(d=-2,g-=q);h=this.start;h/2==Math.round(h/2)&&h--;0>h&&(h=0);v=this.end+2;v>=this.data.length&&(v=this.data.length);B=!1;B=!n;this.previousPos=-1E3;20<this.labelRotation&&(this.safeDistance=5);q=h;if(this.data[h].time!=AmCharts.resetDateToMin(new Date(this.data[h].time),
e,u,y).getTime())for(y=0,x=g,b=h;b<v;b++)m=this.data[b].time,this.checkPeriodChange(e,u,m,x)&&(y++,2<=y&&(q=b,b=v),x=m);t&&1<u&&(w=this.chooseMinorFrequency(u),AmCharts.getPeriodDuration(e,w));for(b=h;b<v;b++)if(m=this.data[b].time,this.checkPeriodChange(e,u,m,g)&&b>=q){h=this.getCoordinate(b-this.start);A=!1;this.nextPeriod[s]&&(A=this.checkPeriodChange(this.nextPeriod[s],1,m,g,s));t=!1;A&&this.markPeriodChange?(g=this.dateFormatsObject[this.nextPeriod[s]],t=!0):g=this.dateFormatsObject[s];g=AmCharts.formatDate(new Date(m),
g);if(b==d&&!n||b==k&&!l)g=" ";B?B=!1:(r||(t=!1),h-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*Math.PI/180)&&(this.labelFunction&&(g=this.labelFunction(g,new Date(m),this,e,u,p)),p=new this.axisItemRenderer(this,h,g,void 0,void 0,void 0,void 0,t),y=p.graphics(),this.pushAxisItem(p),p=y.getBBox().width,AmCharts.isModern||(p-=h),this.previousPos=h+p));p=g=m}else isNaN(w)||(this.checkPeriodChange(e,w,m,C)&&(this.gridAlpha=this.minorGridAlpha,h=this.getCoordinate(b-this.start),t=new this.axisItemRenderer(this,
h),this.pushAxisItem(t),C=m),this.gridAlpha=a)}for(b=0;b<this.data.length;b++)if(n=this.data[b])l=this.parseDates&&!this.equalSpacing?Math.round((n.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(b-f),n.x[this.id]=l;n=this.guides.length;for(b=0;b<n;b++)l=this.guides[b],r=r=r=a=d=NaN,w=l.above,l.toCategory&&(r=c.getCategoryIndexByValue(l.toCategory),isNaN(r)||(d=this.getCoordinate(r-f),p=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(p,w))),l.category&&
(r=c.getCategoryIndexByValue(l.category),isNaN(r)||(a=this.getCoordinate(r-f),r=(d-a)/2,p=new this.axisItemRenderer(this,a,l.label,!0,NaN,r,l),this.pushAxisItem(p,w))),l.toDate&&(l.toDate instanceof Date||(l.toDate=AmCharts.stringToDate(l.toDate,c.dataDateFormat)),this.equalSpacing?(r=c.getClosestIndex(this.data,"time",l.toDate.getTime(),!1,0,this.data.length-1),isNaN(r)||(d=this.getCoordinate(r-f))):d=(l.toDate.getTime()-this.startTime)*this.stepWidth,p=new this.axisItemRenderer(this,d,"",!0,NaN,
NaN,l),this.pushAxisItem(p,w)),l.date&&(l.date instanceof Date||(l.date=AmCharts.stringToDate(l.date,c.dataDateFormat)),this.equalSpacing?(r=c.getClosestIndex(this.data,"time",l.date.getTime(),!1,0,this.data.length-1),isNaN(r)||(a=this.getCoordinate(r-f))):a=(l.date.getTime()-this.startTime)*this.stepWidth,r=(d-a)/2,p="H"==this.orientation?new this.axisItemRenderer(this,a,l.label,!1,2*r,NaN,l):new this.axisItemRenderer(this,a,l.label,!1,NaN,r,l),this.pushAxisItem(p,w)),d=new this.guideFillRenderer(this,
a,d,l),a=d.graphics(),this.pushAxisItem(d,w),l.graphics=a,a.index=b,l.balloonText&&this.addEventListeners(a,l)}this.axisCreated=!0;c=this.x;f=this.y;this.set.translate(c,f);this.labelsSet.translate(c,f);this.positionTitle();(c=this.axisLine.set)&&c.toFront();c=this.getBBox().height;2<c-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1);this.previousHeight=c},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},
choosePeriod:function(a){var b=AmCharts.getPeriodDuration(this.periods[a].period,this.periods[a].count),c=Math.ceil(this.timeDifference/b),d=this.periods;return this.timeDifference<b&&0<a?d[a-1]:c<=this.gridCountR?d[a]:a+1<d.length?this.choosePeriod(a+1):d[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},timeZoom:function(a,
b){this.startTime=a;this.endTime=b},minDuration:function(){var a=AmCharts.extractPeriod(this.minPeriod);return AmCharts.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,d,e){c=new Date(c);var f=new Date(d),k=this.firstDayOfWeek;d=b;"DD"==a&&(b=1);c=AmCharts.resetDateToMin(c,a,b,k).getTime();b=AmCharts.resetDateToMin(f,a,b,k).getTime();return"DD"==a&&"hh"!=e&&c-b<=AmCharts.getPeriodDuration(a,d)?!1:c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<
this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}},xToIndex:function(a){var b=this.data,c=this.chart,d=c.rotate,e=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/e)-this.minDuration()/2,c=c.getClosestIndex(b,"time",a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=e/2),c=this.start+Math.round(a/e));var c=AmCharts.fitToBounds(c,0,b.length-1),f;b[c]&&(f=b[c].x[this.id]);d?f>this.height+1&&c--:f>this.width+1&&c--;0>f&&
c++;return c=AmCharts.fitToBounds(c,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){return this.chart?(a=this.chart.getCategoryIndexByValue(a),this.getCoordinate(a-this.start)):NaN},coordinateToDate:function(a){return this.equalSpacing?
(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)}});
//fgnass.github.com/spin.js#v2.0.0
!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(b&&(b.insertBefore(f,b.firstChild||null),e(f,{left:d.left,top:d.top})),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});
AmCharts.themes.black = {

	themeName: "black",

	AmChart: {
		color: "#e7e7e7"
	},

	AmCoordinateChart: {
		colors: ["#de4c4f", "#d8854f", "#eea638", "#a7a737", "#86a965", "#8aabb0", "#69c8ff", "#cfd27e", "#9d9888", "#916b8a", "#724887", "#7256bc"]
	},

	AmStockChart: {
		colors: ["#de4c4f", "#d8854f", "#eea638", "#a7a737", "#86a965", "#8aabb0", "#69c8ff", "#cfd27e", "#9d9888", "#916b8a", "#724887", "#7256bc"]
	},

	AmSlicedChart: {
		outlineAlpha: 1,
		outlineThickness: 2,
		labelTickColor: "#FFFFFF",
		labelTickAlpha: 0.3,
		colors: ["#de4c4f", "#d8854f", "#eea638", "#a7a737", "#86a965", "#8aabb0", "#69c8ff", "#cfd27e", "#9d9888", "#916b8a", "#724887", "#7256bc"]
	},

	AmRectangularChart: {
		zoomOutButtonColor: '#FFFFFF',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lensWhite.png"
	},

	AxisBase: {
		axisColor: "#FFFFFF",
		axisAlpha: 0.3,
		gridAlpha: 0.1,
		gridColor: "#FFFFFF",
		dashLength: 3
	},

	ChartScrollbar: {
		backgroundColor: "#000000",
		backgroundAlpha: 0.2,
		graphFillAlpha: 0.2,
		graphLineAlpha: 0,
		graphFillColor: "#FFFFFF",
		selectedGraphFillColor: "#FFFFFF",
		selectedGraphFillAlpha: 0.4,
		selectedGraphLineColor: "#FFFFFF",
		selectedBackgroundColor: "#FFFFFF",
		selectedBackgroundAlpha: 0.09,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#FFFFFF",
		color: "#000000",
		cursorAlpha: 0.5
	},

	AmLegend: {
		color: "#e7e7e7"
	},

	AmGraph: {
		lineAlpha: 0.9
	},


	GaugeArrow: {
		color: "#FFFFFF",
		alpha: 0.8,
		nailAlpha: 0,
		innerRadius: "40%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 0.8,
		nailBorderAlpha: 0
	},

	GaugeAxis: {
		tickColor: "#FFFFFF",
		tickAlpha: 1,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 3,
		axisColor: '#FFFFFF',
		axisAlpha: 1,
		bandAlpha: 0.8
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AreasSettings: {
		alpha: 0.8,
		color: "#FFFFFF",
		colorSolid: "#000000",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#FFFFFF",
		outlineColor: "#000000",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#3c5bdc",
		rollOverOutlineColor: "#000000",
		selectedOutlineColor: "#000000",
		selectedColor: "#f15135",
		unlistedAreasOutlineColor: "#000000",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#FFFFFF",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelColor: "#FFFFFF",
		color: "#FFFFFF",
		labelRollOverColor: "#3c5bdc"
	},

	ZoomControl: {
		buttonRollOverColor: "#3c5bdc",
		buttonFillColor: "#738f58",
		buttonBorderColor: "#738f58",
		buttonFillAlpha: 0.8,
		gridBackgroundColor: "#FFFFFF",
		buttonBorderAlpha:0,
		buttonCornerRadius:2,
		gridAlpha:0.5,
		gridBackgroundColor:"#FFFFFF",
		homeIconFile:"homeIconWhite.gif",
		buttonIconAlpha:0.6,
		gridAlpha: 0.2,
		buttonSize:20
	},

	SmallMap: {
		mapColor: "#FFFFFF",
		rectangleColor: "#FFFFFF",
		backgroundColor: "#000000",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},

	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		color: "#e7e7e7"
	},

	PeriodButton: {
		color: "#e7e7e7",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(255, 255, 255, .15)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		color: "#e7e7e7",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		border: "1px solid rgba(255, 255, 255, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		color: "#e7e7e7",
		background: "transparent",
		border: "1px solid rgba(255, 255, 255, .15)",
		outline: "none"
	},

	DataSetSelector: {
		color: "#e7e7e7",
		selectedBackgroundColor: "rgba(255, 255, 255, .25)",
		rollOverBackgroundColor: "rgba(255, 255, 255, .15)"
	},

	DataSetCompareList: {
		color: "#e7e7e7",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(255, 255, 255, .15)"
	},

	DataSetSelect: {
		border: "1px solid rgba(255, 255, 255, .15)",
		outline: "none"
	}

};
AmCharts.themes.chalk = {

	themeName: "chalk",

	AmChart: {
		color: "#e7e7e7",
		fontFamily: "Covered By Your Grace",
		fontSize: 18,
		handDrawn: true
	},

	AmCoordinateChart: {
		colors: ["#FFFFFF", "#e384a6", "#f4d499", "#4d90d6", "#c7e38c", "#9986c8", "#edf28c", "#ffd1d4", "#5ee1dc", "#b0eead", "#fef85a", "#8badd2"]
	},

	AmSlicedChart: {
		outlineAlpha: 1,
		labelTickColor: "#FFFFFF",
		labelTickAlpha: 0.3,
		colors: ["#FFFFFF", "#e384a6", "#f4d499", "#4d90d6", "#c7e38c", "#9986c8", "#edf28c", "#ffd1d4", "#5ee1dc", "#b0eead", "#fef85a", "#8badd2"]
	},

	AmStockChart: {
		colors: ["#FFFFFF", "#e384a6", "#f4d499", "#4d90d6", "#c7e38c", "#9986c8", "#edf28c", "#ffd1d4", "#5ee1dc", "#b0eead", "#fef85a", "#8badd2"]
	},

	AmRectangularChart: {

		zoomOutButtonColor: '#FFFFFF',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lensWhite.png"
	},

	AxisBase: {
		axisColor: "#FFFFFF",
		gridColor: "#FFFFFF"
	},

	ChartScrollbar: {
		backgroundColor: "#FFFFFF",
		backgroundAlpha: 0.2,
		graphFillAlpha: 0.5,
		graphLineAlpha: 0,
		selectedBackgroundColor: "#000000",
		selectedBackgroundAlpha: 0.25,
		fontSize: 15,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#FFFFFF",
		color: "#000000"
	},

	AmLegend: {
		color: "#e7e7e7",
		markerSize: 20
	},

	AmGraph: {
		lineAlpha: 0.8
	},


	GaugeArrow: {
		color: "#FFFFFF",
		alpha: 0.1,
		nailAlpha: 0,
		innerRadius: "40%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 0.8,
		nailBorderAlpha: 0
	},

	GaugeAxis: {
		tickColor: "#FFFFFF",
		tickAlpha: 0.8,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 3,
		axisColor: '#FFFFFF',
		axisAlpha: 0.8,
		bandAlpha: 0.4
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AmMap: {
		handDrawn: false
	},

	AreasSettings: {
		alpha: 0.8,
		color: "#FFFFFF",
		colorSolid: "#000000",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#FFFFFF",
		outlineColor: "#000000",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#4d90d6",
		rollOverOutlineColor: "#000000",
		selectedOutlineColor: "#000000",
		selectedColor: "#e384a6",
		unlistedAreasOutlineColor: "#000000",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#FFFFFF",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelFontSize: 16,
		labelColor: "#FFFFFF",
		color: "#FFFFFF",
		labelRollOverColor: "#4d90d6"
	},

	ZoomControl: {
		buttonRollOverColor: "#4d90d6",
		buttonFillColor: "#e384a6",
		buttonFillAlpha: 0.8,
		buttonBorderColor: "#FFFFFF",
		gridBackgroundColor: "#FFFFFF",
		gridAlpha: 0.8
	},

	SmallMap: {
		mapColor: "#FFFFFF",
		rectangleColor: "#FFFFFF",
		backgroundColor: "#000000",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},


	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		color: "#e7e7e7"
	},

	PeriodButton: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		color: "#e7e7e7",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(255, 255, 255, .15)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		color: "#e7e7e7",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		border: "1px solid rgba(255, 255, 255, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		color: "#e7e7e7",
		background: "transparent",
		border: "1px solid rgba(255, 255, 255, .15)",
		outline: "none"
	},

	DataSetSelector: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		color: "#e7e7e7",
		selectedBackgroundColor: "rgba(255, 255, 255, .25)",
		rollOverBackgroundColor: "rgba(255, 255, 255, .15)"
	},

	DataSetCompareList: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		color: "#e7e7e7",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(255, 255, 255, .15)"
	},

	DataSetSelect: {
		fontFamily: "Covered By Your Grace",
		fontSize:"16px",
		border: "1px solid rgba(255, 255, 255, .15)",
		outline: "none"
	}

};
AmCharts.themes.dark = {

	themeName: "dark",

	AmChart: {
		color: "#e7e7e7"
	},

	AmCoordinateChart: {
		colors: ["#ae85c9", "#aab9f7", "#b6d2ff", "#c9e6f2", "#c9f0e1", "#e8d685", "#e0ad63", "#d48652", "#d27362", "#495fba", "#7a629b", "#8881cc"]
	},

	AmStockChart: {
		colors: ["#639dbd", "#e8d685", "#ae85c9", "#c9f0e1", "#d48652", "#629b6d", "#719dc3", "#719dc3"]
	},

	AmSlicedChart: {
		outlineAlpha: 1,
		outlineThickness: 2,
		labelTickColor: "#FFFFFF",
		labelTickAlpha: 0.3,
		colors: ["#495fba", "#e8d685", "#ae85c9", "#c9f0e1", "#d48652", "#629b6d", "#719dc3", "#719dc3"]
	},

	AmRectangularChart: {
		zoomOutButtonColor: '#FFFFFF',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lensWhite.png"
	},

	AxisBase: {
		axisColor: "#FFFFFF",
		axisAlpha: 0.3,
		gridAlpha: 0.1,
		gridColor: "#FFFFFF",
		dashLength: 3
	},

	ChartScrollbar: {
		backgroundColor: "#000000",
		backgroundAlpha: 0.2,
		graphFillAlpha: 0.2,
		graphLineAlpha: 0,
		graphFillColor: "#FFFFFF",
		selectedGraphFillColor: "#FFFFFF",
		selectedGraphFillAlpha: 0.4,
		selectedGraphLineColor: "#FFFFFF",
		selectedBackgroundColor: "#FFFFFF",
		selectedBackgroundAlpha: 0.09,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#FFFFFF",
		color: "#000000",
		cursorAlpha: 0.5
	},

	AmLegend: {
		color: "#e7e7e7"
	},

	AmGraph: {
		lineAlpha: 0.9
	},


	GaugeArrow: {
		color: "#FFFFFF",
		alpha: 0.8,
		nailAlpha: 0,
		innerRadius: "40%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 0.8,
		nailBorderAlpha: 0
	},

	GaugeAxis: {
		tickColor: "#FFFFFF",
		tickAlpha: 1,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 3,
		axisColor: '#FFFFFF',
		axisAlpha: 1,
		bandAlpha: 0.8
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AreasSettings: {
		alpha: 0.8,
		color: "#FFFFFF",
		colorSolid: "#000000",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#FFFFFF",
		outlineColor: "#000000",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#3c5bdc",
		rollOverOutlineColor: "#000000",
		selectedOutlineColor: "#000000",
		selectedColor: "#f15135",
		unlistedAreasOutlineColor: "#000000",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#FFFFFF",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelColor: "#FFFFFF",
		color: "#FFFFFF",
		labelRollOverColor: "#3c5bdc"
	},

	ZoomControl: {
		buttonRollOverColor: "#3c5bdc",
		buttonFillColor: "#f15135",
		buttonFillAlpha: 0.8,
		gridBackgroundColor: "#FFFFFF",
		buttonBorderAlpha:0,
		buttonCornerRadius:2,
		gridAlpha:0.5,
		gridBackgroundColor:"#FFFFFF",
		homeIconFile:"homeIconWhite.gif",
		buttonIconAlpha:0.6,
		gridAlpha: 0.2,
		buttonSize:20
	},

	SmallMap: {
		mapColor: "#FFFFFF",
		rectangleColor: "#FFFFFF",
		backgroundColor: "#000000",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},

	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		color: "#e7e7e7"
	},

	PeriodButton: {
		color: "#e7e7e7",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(255, 255, 255, .15)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		color: "#e7e7e7",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		border: "1px solid rgba(255, 255, 255, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		color: "#e7e7e7",
		background: "transparent",
		border: "1px solid rgba(255, 255, 255, .15)",
		outline: "none"
	},

	DataSetSelector: {
		color: "#e7e7e7",
		selectedBackgroundColor: "rgba(255, 255, 255, .25)",
		rollOverBackgroundColor: "rgba(255, 255, 255, .15)"
	},

	DataSetCompareList: {
		color: "#e7e7e7",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(255, 255, 255, .15)"
	},

	DataSetSelect: {
		border: "1px solid rgba(255, 255, 255, .15)",
		outline: "none"
	}

};
AmCharts.themes.light = {

	themeName:"light",

	AmChart: {
		color: "#000000"
	},

	AmCoordinateChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"]
	},

	AmStockChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"]
	},

	AmSlicedChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"],
		outlineAlpha: 1,
		outlineThickness: 2,
		labelTickColor: "#000000",
		labelTickAlpha: 0.3
	},

	AmRectangularChart: {
		zoomOutButtonColor: '#000000',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lens.png"
	},

	AxisBase: {
		axisColor: "#000000",
		axisAlpha: 0.3,
		gridAlpha: 0.1,
		gridColor: "#000000"
	},

	ChartScrollbar: {
		backgroundColor: "#000000",
		backgroundAlpha: 0.12,
		graphFillAlpha: 0.5,
		graphLineAlpha: 0,
		selectedBackgroundColor: "#FFFFFF",
		selectedBackgroundAlpha: 0.4,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#000000",
		color: "#FFFFFF",
		cursorAlpha: 0.5
	},

	AmLegend: {
		color: "#000000"
	},

	AmGraph: {
		lineAlpha: 0.9
	},
	GaugeArrow: {
		color: "#000000",
		alpha: 0.8,
		nailAlpha: 0,
		innerRadius: "40%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 0.8,
		nailBorderAlpha: 0
	},

	GaugeAxis: {
		tickColor: "#000000",
		tickAlpha: 1,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 3,
		axisColor: '#000000',
		axisAlpha: 1,
		bandAlpha: 0.8
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AreasSettings: {
		alpha: 0.8,
		color: "#67b7dc",
		colorSolid: "#003767",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#000000",
		outlineColor: "#FFFFFF",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#3c5bdc",
		rollOverOutlineColor: "#FFFFFF",
		selectedOutlineColor: "#FFFFFF",
		selectedColor: "#f15135",
		unlistedAreasOutlineColor: "#FFFFFF",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#000000",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelColor: "#000000",
		color: "#000000",
		labelRollOverColor: "#3c5bdc"
	},

	ZoomControl: {
		buttonRollOverColor: "#3c5bdc",
		buttonFillColor: "#3994e2",
		buttonBorderColor: "#3994e2",
		buttonFillAlpha: 0.8,
		gridBackgroundColor: "#FFFFFF",
		buttonBorderAlpha:0,
		buttonCornerRadius:2,
		gridColor:"#FFFFFF",
		gridBackgroundColor:"#000000",
		buttonIconAlpha:0.6,
		gridAlpha: 0.6,
		buttonSize:20
	},

	SmallMap: {
		mapColor: "#000000",
		rectangleColor: "#f15135",
		backgroundColor: "#FFFFFF",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},

	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		color: "#000000"
	},

	PeriodButton: {
		color: "#000000",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		color: "#000000",
		backgroundColor: "#b9cdf5",
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		color: "#000000",
		background: "transparent",
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	},

	DataSetSelector: {

		color: "#000000",
		selectedBackgroundColor: "#b9cdf5",
		rollOverBackgroundColor: "#a8b0e4"
	},

	DataSetCompareList: {
		color: "#000000",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(0, 0, 0, .3)"
	},

	DataSetSelect: {
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	}

};
AmCharts.themes.patterns = {

	themeName:"patterns",

	AmChart: {
		color: "#000000"
	},

	AmCoordinateChart: {
		colors:["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
		patterns:[
		{"url":"../amcharts/patterns/black/pattern1.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern2.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern3.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern4.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern5.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern6.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern7.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern8.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern9.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern10.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern11.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern12.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern13.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern14.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern15.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern16.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern17.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern18.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern19.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern20.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern21.png", "width":4, "height":4}]
	},


	AmStockChart: {
		colors:["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]
	},

	AmPieChart: {
		depth3D:0,
		angle:0,
		labelRadius:10
	},

	AmSlicedChart: {
		outlineAlpha: 0.3,
		colors:["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
		outlineThickness: 1,
		outlineColor:"#000000",
		labelTickColor: "#000000",
		labelTickAlpha: 0.3,
		patterns:[
		{"url":"../amcharts/patterns/black/pattern1.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern2.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern3.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern4.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern5.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern6.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern7.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern8.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern9.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern10.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern11.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern12.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern13.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern14.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern15.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern16.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern17.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern18.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern19.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern20.png", "width":4, "height":4},
		{"url":"../amcharts/patterns/black/pattern21.png", "width":4, "height":4}]
	},

	AmRectangularChart: {
		zoomOutButtonColor: '#000000',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lens.png"
	},



	AxisBase: {
		axisColor: "#000000",
		axisAlpha: 0.3,
		gridAlpha: 0.05,
		gridColor: "#000000"
	},

	ChartScrollbar: {
		backgroundColor: "#000000",
		backgroundAlpha: 0.13,
		graphFillAlpha: 0.4,
		selectedGraphFillAlpha: 0.7,
		graphLineAlpha: 0,
		selectedBackgroundColor: "#FFFFFF",
		selectedBackgroundAlpha: 0.9,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#000000",
		color: "#FFFFFF",
		cursorAlpha: 0.5
	},

	AmLegend: {
		color: "#000000",
		markerBorderAlpha:0.1,
		markerSize:20,
		switchColor:"#000000"
	},

	AmGraph: {
		lineAlpha: 0.4,
		fillAlphas:0.5
	},

	AmAngularGauge:{
		faceAlpha:0.5,
		facePattern:{"url":"../amcharts/patterns/black/pattern1.png", "width":4, "height":4}
	},


	GaugeArrow: {
		color: "#000000",
		alpha: 1,
		nailAlpha: 1,
		innerRadius: "0%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 1,
		radius:"70%",
		nailBorderAlpha: 1
	},

	GaugeAxis: {
		tickColor: "#000000",
		tickAlpha: 1,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 1,
		axisColor: '#000000',
		axisAlpha: 1,
		bandAlpha: 1
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AreasSettings: {
		alpha: 0.8,
		color: "#000000",
		colorSolid: "#000000",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#000000",
		outlineColor: "#FFFFFF",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#3c5bdc",
		rollOverOutlineColor: "#FFFFFF",
		selectedOutlineColor: "#FFFFFF",
		selectedColor: "#f15135",
		unlistedAreasOutlineColor: "#FFFFFF",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#000000",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelColor: "#000000",
		color: "#000000",
		labelRollOverColor: "#3c5bdc"
	},

	ZoomControl: {
		buttonRollOverColor: "#3c5bdc",
		buttonFillColor: "#f15135",
		buttonFillAlpha: 0.8,
		buttonBorderColor: "#000000",
		gridBackgroundColor: "#000000",
		gridAlpha: 0.8
	},

	SmallMap: {
		mapColor: "#000000",
		rectangleColor: "#FFFFFF",
		backgroundColor: "#FFFFFF",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},

	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		color: "#000000"
	},

	PeriodButton: {
		color: "#000000",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		color: "#000000",
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		color: "#000000",
		background: "transparent",
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	},

	DataSetSelector: {
		color: "#000000",
		selectedBackgroundColor: "rgba(0, 0, 0, .25)",
		rollOverBackgroundColor: "rgba(0, 0, 0, .15)"
	},

	DataSetCompareList: {
		color: "#000000",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(0, 0, 0, .3)"
	},

	DataSetSelect: {
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	}

};
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
    + "</div>\r\n	</div>\r\n	<div id=\"chart\"></div>\r\n</div>\r\n<div class=\"right\"></div>\r\n";
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
		var today = new Date();
		$.ajax({

			url: "http://ichart.yahoo.com/table.csv",
			type: "GET",
			data: { 
				s: stock,
				a: 0, //#month - 1 | start
				b: 1, //day | start
				c: 2010, //year | start
				d: today.getMonth(), //#month - 1 | end
				e: today.getDate(), //day | end
				f: today.getFullYear(), //year | end
				g: "w", //trade period d w m
				ignore: ".csv"
			},
			success: function(data) {
				var preParsed = Utils().CSVToArray(data);

				var histData = [ { key: stock, values: [] } ];

				var len = preParsed.length - 1;
				for (var i = 1; i < len; i++) {
					histData[0].values.unshift({ 
						date: preParsed[i][0], 
						price: preParsed[i][6],
						volume: preParsed[i][5]
					});
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
		'~/js/utilities/Utils Utils'

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

				chart = new AmCharts.AmSerialChart();
                chart.pathToImages = "compiled/images/";
				chart.dataProvider = this.stockData.histData[0].values;
                chart.categoryField = "date";
                chart.dataDateFormat = "YYYY-MM-DD";

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
                categoryAxis.dashLength = 1;
                categoryAxis.gridAlpha = 0.15;
                categoryAxis.minorGridEnabled = true;
                categoryAxis.axisColor = "#DADADA";

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.axisAlpha = 0.2;
                valueAxis.dashLength = 1;
                chart.addValueAxis(valueAxis);
 				
 				// GRAPH
                var graph = new AmCharts.AmGraph();
                graph.title = "red line";
                graph.valueField = "price";
                graph.bullet = "round";
                graph.bulletBorderColor = "#FFFFFF";
                graph.bulletBorderThickness = 2;
                graph.bulletBorderAlpha = 1;
                graph.fillAlphas = 0.5;
                graph.lineThickness = 2;
                graph.lineColor = "#9eaec6";
                graph.negativeLineColor = "#9eaec6";
                graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>value: [[value]]</span></b>";
                graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
                chart.addGraph(graph);

                // CURSOR
                chartCursor = new AmCharts.ChartCursor();
                chartCursor.cursorPosition = "mouse";
                chartCursor.categoryBalloonColor = "#9eaec6";
                chartCursor.cursorColor = "#9eaec6";
                chart.addChartCursor(chartCursor);

                // SCROLLBAR
                var chartScrollbar = new AmCharts.ChartScrollbar();
                chartScrollbar.graph = graph;
                chartScrollbar.scrollbarHeight = 40;
                chartScrollbar.color = "#FFFFFF";
                chartScrollbar.autoGridCount = true;
                chart.addChartScrollbar(chartScrollbar);

				chart.write('chart');

			}

		}.bind(this));

		


	}

});