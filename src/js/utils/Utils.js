/**
 *	A static class in order to handle small help methods 
 *	for preforming generic calculations. If you have a small 
 *	static method that you want to reuse throughout the system, 
 *	place it here.
 *
 *	@author		Henrik Andersen
 *	@email		henrik.andersen@lnu.se
 *	@version	1.0
 *	@since		xxxx-xx-xx
 */
var Utils = 
{
	//---------------------------------------------------
	//  Public properties
	//---------------------------------------------------
	
	/**
	 *	Check if a property has a value.
	 *
	 *	@return Boolean
	 */
	isset : function(object){
	
		return typeof object !== 'undefined' && object !== null;
	},
	
	/**
	 *	Generates a unique ID-string based on time.
	 *
	 *	@return String
	 */
	getUniqueId : function(){
	
		return Math.floor(new Date().getTime()/1000);
	},
	
	/**
	 *	Converts string values ​​to the valid number.
	 *
	 *	@param	value	The value to be converted.
	 *
	 *	@return number
	 */
	asNumber : function(value)
	{
		var n = parseInt(value); 
		return n == null || isNaN(n) ? 0 : n;
	}
}