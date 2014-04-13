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

	}

});