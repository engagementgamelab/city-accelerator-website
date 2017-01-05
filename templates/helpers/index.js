var _ = require('underscore');
var hbs = require('handlebars');

module.exports = function() {

    var _helpers = {};

    /**
     * Local HBS Helpers
     * ===================
     */

    //  ### Remove wrapping <p> from markup html string
    //
    //  @str: The string
    _helpers.removePara = function(str) {
        
        if(str) {
        	var re = new RegExp("<\s*p[^>]*>(.*?)<\s*/\s*p>");
        	var arr = re.exec(str);

        	if(arr)
        		return arr[1];
        }
    }


    return _helpers;


};