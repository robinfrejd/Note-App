/**
 *	Simple static class to handle the system's mouse-input. 
 *	The class can not affect the mouse, but it can retrieve the 
 *	mouse coordinates.
 *
 *	@author		Henrik Andersen
 *	@email		henrik.andersen@lnu.se
 *	@version	1.0
 *	@since		xxxx-xx-xx
 *	@requires	Point.js
 */
var Mouse = 
{
	//---------------------------------------------------
	//  Public static properties
	//---------------------------------------------------
	
	/**
	 *	The mouse coordinates as a point object(x,y).
	 *
	 *	@default point
	 */
	position : new Point(),
	
	//---------------------------------------------------
	//  Public static methods
	//---------------------------------------------------
	
	/**
	 *	Get the position (x,y) of the mouse based on an event.
	 *
	 *	@param	event	Event related to the mouse.
	 *
	 *	@return Point
	 */
	getPosition : function(event) 
	{
		if(event.pageX && event.pageY)
		{
			Mouse.position.x = event.pageX; 
			Mouse.position.y = event.pageY; 
		}
		else 
		{ 
			Mouse.position.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			Mouse.position.y = event.clientY + document.body.scrollTop  + document.documentElement.scrollTop; 
		}
		
		return Mouse.position;
	},
	
	/**
	 *	Resets the mouse coordinates.
	 *
	 *	@return Point
	 */
	reset : function() 
	{
		Mouse.position.x = 0;
		Mouse.position.y = 0;
		
		return Mouse.position;
	}
}