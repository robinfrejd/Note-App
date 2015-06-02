function StickerManager(stickerId, stickerText, stickerPos, x, y, z) 
{
	var self = this;

	this.stickerWrapper 		= null;
	this.stickerDrag			= null;
	this.textAreaWrapper		= null;
	
	this.ajax					= new Ajax();

	this.stickerPlaceholderText	= null;
	this.convertToString		= null;
	this.textArray				= new Array();

	this.stickerTextValue		= null;
	this.stickerIdValue			= null;
	this.stickerPosX			= null;
	this.stickerPosY			= null;
	this.stickerPosZ			= null;
	this.stickerId 				= stickerId;


	/**
	 * Klassens konstruktor-metod som instansieras när klassen anropas.
	 */
	function init()
	{
		addNewSticker();
		initEventHandlers();
	}

	/**
	 * Metod som skapar alla element som krävs för en ny stickerlapp. 
	 * Stickern ges även ett unikt ID via metoden getUniqueId i Utils-klassen.
	 * Om text-fältet är null ändras värdet istället till en tom sträng. 
	 * Metoden getStickerPosValues körs i slutet för att få ut positionering för stickern.
	 */
	function addNewSticker()
	{
		self.stickerWrapper = document.createElement('div');
		self.stickerWrapper.setAttribute('class', 'sticker');
		self.stickerWrapper.style.left = x || 0;
		self.stickerWrapper.style.top = y || 0;
		self.stickerWrapper.style.zIndex = z || 0;
		
		self.stickerDrag = document.createElement('div');
		self.stickerDrag.setAttribute('class', 'sticker-drag');
		self.stickerWrapper.appendChild(self.stickerDrag);

		self.textAreaWrapper = document.createElement('textarea');
		self.textAreaWrapper.innerHTML = stickerText || "";
		
		self.stickerWrapper.appendChild(self.textAreaWrapper);

		self.stickerClose = document.createElement('div');
		self.stickerClose.setAttribute('class', 'sticker-close');
		self.stickerWrapper.appendChild(self.stickerClose);

		self.stickerTextValue 	= self.textAreaWrapper.innerHTML;

		if (self.stickerId == undefined)
		{
			self.stickerId = Utils.getUniqueId();
		} 
			
		self.stickerTextValue = self.textAreaWrapper.innerHTML;
		getStickerPosValues();
	}

	/**
	 * Metod som startar olika händelselyssnare för klassen.
	 */
	function initEventHandlers()
	{
		Event.addEventListener(self.stickerDrag, "mousedown", onDragStart);
		Event.addEventListener(self.stickerClose, "click", initStickerClose);
		Event.addEventListener(self.textAreaWrapper, "keyup", getTextAreaValue);
		Event.addEventListener(self.stickerDrag, "mouseup", getStickerPosValues);
	}

	/**
	 * Metod som hämtar ut värden för X och Y samt värdet som finns inuti textArea-elementet för
	 * varje sticker. 
	 */
	function getStickerPosValues(event)
	{
		self.stickerPosX		= self.stickerWrapper.style.left;
		self.stickerPosY		= self.stickerWrapper.style.top;
		self.stickerPosZ		= self.stickerWrapper.style.zIndex;
		
		self.stickerTextValue 	= self.textAreaWrapper.value;
		self.ajax.post('src/php/StickerUpdate.php', "id="+self.stickerId+"&text="+self.stickerTextValue+"&x="+self.stickerPosX+"&y="+self.stickerPosY+"&z="+self.stickerPosZ, Main.blankResponse);
	}		
	
	/**
	 * Metod som hämtar ut värdet inuti textarea-taggen för den aktuella stickern.
	 */
	function getTextAreaValue(event)
	{
		self.stickerTextValue 	= self.textAreaWrapper.value;
		self.ajax.post('src/php/StickerUpdate.php', "id="+self.stickerId+"&text="+self.stickerTextValue+"&x="+self.stickerPosX+"&y="+self.stickerPosY+"&z="+self.stickerPosZ, Main.blankResponse);
	}

	/**
	 * Vid start ges det aktuella fönstret ett unikt ID som ställer 
	 * in ett högre z-index-tal är fönstret som var innan, vilket gör att 
	 * det aktuella fönstret alltid kommer ligga överst i "renderingslistan".
	 * Fönstrets opacitet ställs även om till 50% synlighet under tiden man drar fönstret.
	 */
	function onDragStart(event) 
	{
		self.stickerWrapper.style.zIndex = Utils.getUniqueId();
		Drag.beginDrag(self.stickerWrapper, event);
	}

	/**
	 * Metod som tar bort den aktuella stickern ifrån renderingslistan.
	 * Tas dock inte bort ifrån applikationen.
	 */
	function initStickerClose(event)
	{
		Main.removeSticker(self);
	}
	
init();	
}