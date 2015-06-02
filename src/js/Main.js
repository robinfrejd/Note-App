var Main = {
	
	
	ajax : new Ajax(),
	contentWrapper : document.getElementById('page-content-wrapper'),

	/**
	 * Klassens konstruktor-funktion.
	 * Kör igång metoderna initEventHandlers och initDatabase samt hämtar
	 * in ID för div-taggen om omger hela sidan.
	 *
	 * @return undefined
	 */
	init : function() 
	{	
		Main.checkDatabase();
		Main.initEventHandlers();
		Main.initDatabase();
		Main.contentWrapper = document.getElementById('page-content-wrapper');
	},

	/**
	 * Metoden gör ett ajax-anrop till filen CheckDatabase.php, resultatet
	 * tas emot av metoden BlankResponse.
	 */
	checkDatabase : function()
	{
		Main.ajax.get("src/php/CheckDatabase.php", Main.blankResponse);
	},

	blankResponse : function(responseData)
	{

	},

	/**
	 * Metod som hämtar div-ID för knappen som skapar en ny sticker. 
	 * Lägger till ett klick-event så att en ny sticker skapas när man klickar på ikonen.
	 */
	initEventHandlers : function() 
	{
		var addNewStickerBtn = document.getElementById('add-new-sticker-btn');
			Event.addEventListener(addNewStickerBtn, 'click', Main.createNewSticker);
	},

	/**
	 * Anropar XML-databasen och kör sedan onDataLoaded-metoden som callback.
	 */
	initDatabase : function()
	{
		Main.ajax.get("src/php/loadDatabase.php", Main.onDataLoaded);	
	},

	/**
	 * Metoden får tillbaka ett svar från databasen med info om id, text och positionering
	 * för varje sticker. Svaret loopas igenom och alla värden hämtas ut från respektive sticker. 
	 * Metoden createLoadedSticker körs sedan och id, text och positionering skickas därefter med. 
	 */
	onDataLoaded : function(responseData)
	{
		responseData = responseData.responseXML;
		responseData = responseData.getElementsByTagName('sticker');

		for (var i = 0; i < responseData.length; i++)
		{
			var stickerId 		= responseData[i].getElementsByTagName('id')[0];
				stickerId 		= stickerId.childNodes[0];
				stickerId 		= stickerId.nodeValue;

			var stickerText 	= responseData[i].getElementsByTagName('text')[0];
				stickerText		= stickerText.childNodes[0];
				stickerText		= stickerText.nodeValue;

			var stickerPos		= responseData[i].getElementsByTagName('position')[0];

			var x 		= stickerPos.getElementsByTagName('x')[0];
				x 		= x.childNodes[0];
				x 		= x.nodeValue;

			var y 		= stickerPos.getElementsByTagName('y')[0];
				y 		= y.childNodes[0];
				y 		= y.nodeValue;

			var z 		= stickerPos.getElementsByTagName('z')[0];
				z 		= z.childNodes[0];
				z 		= z.nodeValue;

			Main.createLoadedSticker(stickerId, stickerText, stickerPos, x, y, z); 
		} 
	},

	/**
	 * Metod som tar emot id, text och positionering för en sticker som ligger i databasen. 
	 * En ny sticker skapas sedan och läggs ut i applikationsfönstret.
	 */
	createLoadedSticker : function(stickerId, stickerText, stickerPos, x, y, z)
	{
		var addLoadedSticker = new StickerManager(stickerId, stickerText, stickerPos, x, y, z);
		Main.contentWrapper.appendChild(addLoadedSticker.stickerWrapper);	
	},

	/**
	 * Skapar en ny sticker när man klickar på sticker-knappen. 
	 */
	createNewSticker : function(event)
	{
		var addNewSticker 	= new StickerManager();
		Main.contentWrapper.appendChild(addNewSticker.stickerWrapper);
	},

	/**
	 * Tar bort den grafiska representationen för stickern, vilket 
	 * gör att det ser ut som att man stänger ner en sticker när man klickar 
	 * på krysset längst upp till höger.
	 */
	removeSticker : function(sticker)
	{
		Main.contentWrapper.removeChild(sticker.stickerWrapper);
	}
};
Event.addEventListener(window, 'load', Main.init);