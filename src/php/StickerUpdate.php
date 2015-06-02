<?php
	
	/**
	 * Konstant variabel som innehåller sökvägen för XML-filen.
	 */
	define('XML_DATABASE_PATH', '../xml/0.xml');	
	$xml 		= null;
	$data 		= null;
	
	/**
	 * Variabel som tar emot POST-anropet med parametrarna 
	 * för den aktuella stickern man manipluerat.
	 */
	$id 		= $_POST['id'];
	$text 		= $_POST['text'];
	$x 			= $_POST['x'];
	$y 			= $_POST['y'];
	$z 			= $_POST['z'];

	/**
	 * Metod som skapar en variabel som laddar in xml-databasen
	 * via simpleXML.
	 */
	function initDb()
	{
		global $xml;
		$xml 	= simplexml_load_file(XML_DATABASE_PATH);
	}

	/**
	 * Den aktuella stickerns ID skickas in i funktion, som sedan loopar varje sticker i en foreach-loop och
	 * syftet är att ta reda på ifall den aktuella stickern man arbetar med
	 * finns med i xml-databasen. Finns den så uppdateras innehållet i xml-filen.
	 * Om ID för stickern inte finns med så skapas en ny uppsättning av taggar i xml-filen
	 * som sparar ner informationen om stickern. 
	 */
	function initFindSticker($id)
	{
		global $xml;

		$databaseHit = false;

		foreach ($xml->sticker as $sticker)
		{			
			if ($sticker->id == $id)
			{
				$databaseHit = true;
				updateSticker($sticker);
				break;
			}	
		}

		if ($databaseHit == false) 
		{
			createNewSticker();
		}
	}

	/**
	 * Ifall stickerns ID finns med i xml-databasen så uppdateras ID, text och position
	 * i XML-filen. Information sparas till sist i XML-filen. 	
	 */
	function updateSticker($sticker)
	{
		global $xml;
		global $id;
		global $text;
		global $x;
		global $y;
		global $z;

		$sticker->id 			= $id;
		$sticker->text 			= $text;
		$sticker->position->x 	= $x;
		$sticker->position->y 	= $y;
		$sticker->position->z 	= $z;

		$output = $xml->saveXML();

		$data = new DOMDocument();
		$data->loadXML($output);
		$data->save(XML_DATABASE_PATH);
	}

	/**
	 * Variablerna från POST-förfrågan laddas in. Finns stickern inte i databasen skapas en ny och ges värdena som tas emot 
	 * från POST-förfrågan. XML-filen sparas sedan. 
	 */
	function createNewSticker()
	{	
		global $xml;
		global $id;
		global $text;
		global $x;
		global $y;
		global $z;
		
		$sticker = $xml->addChild('sticker');
		$sticker->addChild('id', $id);
		$sticker->addChild('text', $text);
		$position = $sticker->addChild('position');
		$position->addChild('x', $x);
		$position->addChild('y', $y);
		$position->addChild('z', $z);
		
		$output = $xml->saveXML();

		$data = new DOMDocument();
		$data->loadXML($output);
		$data->save(XML_DATABASE_PATH);			
	}

initDb();
initFindSticker($id);	
?>