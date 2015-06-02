/**
 *	Simple static class to manage event handlers. The class provides 
 *	a common interface (API) to manage event listeners through 
 *	various platforms (web browser).
 *
 *	This class is not dependent on other external javascript objects 
 *	or classes, which means it can be used in many JavaScript-based 
 *	projects.
 *
 *	@author		Henrik Andersen
 *	@email		henrik.andersen@lnu.se
 *	@version	1.0
 *	@since		xxxx-xx-xx
 *	@requires	
 */
var Event = {

    //---------------------------------------------------
    //  Public static methods
    //---------------------------------------------------
    
    /**
     *	Adds an event listener on an object.
     *
     *	@param	element		The element that the listener should be applied to.
     *	@param	type		What kind of event handlers that should be applied (mouseup, click, etc..).
     *	@param	callback	The method / function that is activated when the event occurs.
     *	@param	useCapture	Determines whether the event should be captured or not.
     *
     *	@return undefined
     */
    addEventListener: function(element, type, callback, useCapture){
        
        if (useCapture == undefined)
        	useCapture  = false;
       
        if (element.addEventListener){
            element.addEventListener(type, callback, useCapture);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, callback);
        } else {
            element["on" + type] = callback;
        }
    },
    
    /**
     *	Removes an event listener from an object.
     *
     *	@param	element		The element that the listener should be applied to.
     *	@param	type		What kind of event handlers that should be applied (mouseup, click, etc..).
     *	@param	callback	The method / function that is activated when the event occurs.
     *	@param	useCapture	Determines whether the event should be captured or not.
     *
     *	@return undefined
     */
    removeEventListener: function(element, type, callback, useCapture){
        
        if (useCapture == undefined)
        	useCapture  = false;
        
        if (element.removeEventListener){
            element.removeEventListener(type, callback, useCapture);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, callback);
        } else {
            element["on" + type] = null;
        }
    },
    
    /**
     *	Stops event "bubbling" and default behaviour of the browser.
     *
     *	@param	event	The event to be prevented from bubbling.
     *
     *	@return undefined
     */
    stopEvent : function(event) 
    {
    	if (event.stopPropagation){
    		event.stopPropagation();
    		event.preventDefault();
    	}
    	else 
    	{
    	  // INTERNET EXPLORER FIX
    	  event.cancelBubble = true;
    	  event.returnValue	 = false;
    	}
    },
    
    /**
     *	Safe way to get the event target of the event.
     *
     *	@param	event	The event whose origin is unknown.
     *
     *	@return undefined
     */
    getEventTarget : function(event) 
    {
      if (event.target) return event.target;
      else if (event.srcElement) return event.srcElement;
      else return null;
    }
};