/**
 *	Static class to create drag-and-drop functionality 
 *	with JavaScript and CSS.
 *
 *	@author		Henrik Andersen
 *	@email		henrik.andersen@lnu.se
 *	@version	1.0
 *	@since		xxxx-xx-xx
 *	@requires	Utils.js, Event.js, Point.js
 */
var Drag = 
{
	//---------------------------------------------------
	//  Public static properties
	//---------------------------------------------------
	
	/**
	 *	The HTML element that should be draggable.
	 *
	 *	@default null
	 */
	element : null,
	
	/**
	 *	The start point of the drag movement.
	 *
	 *	@default point (0,0)
	 */
	start : new Point(),
	
	/**
	 *	The offset between the mouse and the HTML element's zero point.
	 *
	 *	@default point (0,0)
	 */
	offset : new Point(),
	
	//---------------------------------------------------
	//  Public static methods
	//---------------------------------------------------
	
	/**
	 *	Public method that creates drag and drop functionality of an HTML element.
	 *
	 *	@param	element		The HTML element that will become draggable by the user.
	 *	@param	event		The mouse event that occurs when the user interacts with the object.
	 *
	 *	@return undefined
	 */
	beginDrag : function(element, event) 
	{
		event.preventDefault();
		event.cancelBubble = true;
		
		Drag.element	= element;
		Drag.start.x	= event.clientX; 
		Drag.start.y	= event.clientY;
		Drag.offset		= this.getPosition(element);
		
		//Drag.element.style.position = 'relative'; // IF YOU DONT WANT TO SET THIS IN THE CSS FILE.
		
		Event.addEventListener(document, 'mousemove', Drag.onMove);
		Event.addEventListener(document, 'mouseup',	  Drag.onUp);
	},
	
	/**
	 *	Method to retrieve the coordinates (X,Y) of an HTML element as a Point object.
	 *
	 *	@param	element		The element which coordinates should be calculated.
	 *
	 *	@return Point
	 */
	getPosition : function(element)
	{
		return new Point(Utils.asNumber(element.style.left), Utils.asNumber(element.style.top));
	},
	
	/**
	 *	Private method that is activated when the HTML element moves with the mouse. The method 
	 *	calculates the HTML element's position relative to the mouse cursor. This method is only 
	 *	meant to be used as a private method, ie not by external developers.
	 *
	 *	@return undefined
	 */
	onMove : function(event) 
	{
		if (!event) event = window.event;
		
		Mouse.getPosition(event);
		
		Drag.element.style.left = ((Drag.offset.x + event.clientX) - Drag.start.x) + 'px'; 
		Drag.element.style.top  = ((Drag.offset.y + event.clientY) - Drag.start.y) + 'px';
	},
	
	/**
	 *	Private method that ends the drag-and-drop functionality of an HTML element. 
	 *	The method is activated when the user releases the mouse button.
	 *
	 *	@return undefined
	 */
	onUp : function(event) 
	{
		if (!event) event = window.event;
				
		Event.removeEventListener(document, 'mousemove',Drag.onMove);
		Event.removeEventListener(document, 'mouseup',	Drag.onUp);
		
		Drag.element	= null;
	}
}