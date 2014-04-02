(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AppView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container\"></div>";
  });
templates['HeaderView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"logo\"><strong>Market</strong>Monitor</div>\r\n\r\n<ul class=\"nav\">\r\n	<li class=\"item\">Portfolios</li>\r\n	<li class=\"item\">Trends</li>\r\n	<li class=\"item\">Settings</li>		\r\n</ul>";
  });
templates['SideView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"nav-items\">\r\n	<li class=\"item\">+ Add Portfolio</li>\r\n	<li class=\"item\">Portfolio 1</li>\r\n	<li class=\"item\">Portfolio 2</li>\r\n	<li class=\"item\">Portfolio 3</li>\r\n	<li class=\"item\">Portfolio 4</li>\r\n</ul>";
  });
})();