This application profile describes an information model for an application whose use case is the sending of 
notifications from a Public Organisation to persons and organisations and wants to exchange information about this between 
different information systems. A notification is a message from a sender to a recipient, with the aim of 
informing the recipient about a particular event or newsworthiness.
The intention to send a notification is expressed by the InformActie class 
([schema:InformAction](https://schema.org/InformAction)) and can be described on the basis of properties listed under 
provide more information about the target audience, content and relevance of the message. The target group of an InformeerActie can 
determined on the basis of a target group type — the interpretation of which is application-specific, for example all users 
of a particular application — , a geographic area or an identifier.
The translation of this target group into a set of recipients (with an email address or telephone number for each recipient) 
falls outside the scope of this application profile and must be developed within a specific application.