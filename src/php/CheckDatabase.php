<?php
	
	/**
	 * Om XML-filen för databasen inte finns skapas en ny fil där grundtaggarna
	 * för en XML-fil skapas. 
	 */
	$filename = "../xml/0.xml";

	if (!file_exists($filename))
	{
		$file = new SimpleXMLElement("<stickers></stickers>");
		$file->asXML("../xml/0.xml");
	}
?>

