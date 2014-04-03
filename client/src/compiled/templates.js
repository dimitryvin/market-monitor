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
  


  return "<div class=\"logo\"><strong>Market</strong>Monitor</div>\r\n\r\n<ul class=\"nav\">\r\n	<li class=\"item\">Portfolios</li>\r\n	<li class=\"item\">Trends</li>\r\n	<li class=\"item\">Settings</li>		\r\n</ul>";
  });
templates['sections/PortfolioView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	<tr>\r\n		<td class=\"text\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ticker)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n		<td class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.price)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n		<td class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.quantity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n		<td class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.low)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n		<td class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.high)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n		<td class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.beta)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n	</tr>\r\n	";
  return buffer;
  }

  buffer += "<table class=\"portfolio\">\r\n	<tr><th class=\"text\">Ticker</th><th class=\"number\">Price</th><th class=\"number\">Quantity</th><th class=\"number\">Low</th><th class=\"number\">High</th><th class=\"number\">Beta</th></tr>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.securities), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</table>";
  return buffer;
  });
templates['SideView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"nav-items\">\r\n	<li class=\"item\">+ Add Portfolio</li>\r\n	<li class=\"item\">Portfolio 1</li>\r\n	<li class=\"item\">Portfolio 2</li>\r\n	<li class=\"item\">Portfolio 3</li>\r\n	<li class=\"item\">Portfolio 4</li>\r\n</ul>";
  });
})();