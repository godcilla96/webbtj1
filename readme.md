# Moment 2 - introduktion till webbtjänster

NPM-paket som installerats: 
- Express
- Nodemon
- body-parser
- dotenv
- cors

Den här uppgiften går ut på att skapa en webbtjänst som kan hantera CRUD-operationer, genom att använda Express.
Projektet använder sqlite/sqlite3 för databasanslutning. Tabellen heter workexperience
och har 7 olika kolumner (id, companyname, jobtitle, location, startdate, enddate och description).
För att möjliggöra testkörning till en annan domän har CORS installets och använts i Express-projektet.

Detta CRUD-operationer:
| HTTP-metod | Slutpunkt                | Beskrivning                                      |
|------------|--------------------------|--------------------------------------------------|
| GET        | /cv/workexperience       | Hämtar lagrad data för arbetserfarenheter       |
| GET        | /cv/workexperience/:id   | Hämtar lagrad data för en specifik arbetserfarenhet |
| POST       | /cv/workexp              | Lagrar ny arbetserfarenhet                       |
| PUT        | /cv/workexp/:id          | Ändrar lagrad data för valt ID                   |
| DELETE     | /cv/workexp/:id          | Raderar data för valt ID                         |