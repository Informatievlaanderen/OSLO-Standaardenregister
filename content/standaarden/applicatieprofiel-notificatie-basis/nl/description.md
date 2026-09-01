Dit applicatieprofiel beschrijft een informatiemodel voor een toepassing die als use case heeft het versturen van 
notificaties vanuit een Publieke Organisatie naar personen en organisaties en daarover informatie wil uitwisselen tussen 
verschillende informatiesystemen. Een notificatie is een bericht van een afzender naar een bestemmeling, met als doel de 
bestemmeling te informeren over een bepaalde gebeurtenis of nieuwswaardigheid.
De intentie om een notificatie te versturen wordt uitgedrukt door de klasse InformeerActie 
([schema:InformAction](https://schema.org/InformAction)) en kan beschreven worden aan de hand van eigenschappen die onder 
meer informatie meegeven over de doelgroep, inhoud en relevantie van het bericht. De doelgroep van een InformeerActie kan 
bepaald worden op basis van een doelgroep type — waarvan de invulling toepassing-specifiek is, bijvoorbeeld alle gebruikers 
van een bepaalde applicatie —, een geografisch gebied of een identificator.
De vertaling van deze doelgroep in een set van bestemmelingen (met een e-mailadres of telefoonnummer voor elke bestemmeling) 
valt buiten de scope van dit applicatieprofiel en moet uitgewerkt worden binnen een specifieke toepassing.
