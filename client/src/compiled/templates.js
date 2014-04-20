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