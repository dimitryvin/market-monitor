(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AppView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"parent-container\">\n	<div class=\"container\"></div>\n</div>";
  });
templates['HeaderView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<li class=\"item\"><i class=\"fa "
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i> "
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n	";
  return buffer;
  }

  buffer += "<div class=\"logo\"><strong>Market</strong>Monitor</div>\n\n<ul class=\"nav\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.navitems), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	\n</ul>";
  return buffer;
  });
templates['SideView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"nav-items\">\n	<li class=\"item\">+ Add Portfolio</li>\n	<li class=\"item\">Portfolio 1</li>\n	<li class=\"item\">Portfolio 2</li>\n	<li class=\"item\">Portfolio 3</li>\n	<li class=\"item\">Portfolio 4</li>\n</ul>";
  });
templates['lists/StockListView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<tr><th class=\"text\">Ticker</th><th class=\"number\">Price</th><th class=\"number\">Quantity</th><th class=\"number\">Low</th><th class=\"number\">High</th><th class=\"number\">Beta</th></tr>";
  });
templates['lists/items/StockItemView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.ticker)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.price)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.quantity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n<td class=\"number\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.beta)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>";
  return buffer;
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"stock-info\">\n	<div class=\"price\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.price)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Range: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">52 week: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1['52_low'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1['52_hight'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Open: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.open)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Vol / Avg: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.vol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " / "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.avg_vol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Mkt Cap: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.cap)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">P/E: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.pe)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Div/yield: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.dividend)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " / "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.div_yield)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">EPS: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.eps)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Shares: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.so)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"stat\">Beta: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.beta)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>";
  return buffer;
  });
})();