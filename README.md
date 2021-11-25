# Codeminer42 Backend Technical Test
This project is a API to travel into the space and delivery cargos. I use node with express and sqlite database.

## Pilots route
The pilot route has 7 diferrent endpoints (GET and POST), to access the route you can type:

> /pilots

### Get all pilots
Endpoint: /pilots\
Method: GET


### Get pilot by id
Endpoint: /pilots/id\
Method: GET


### Create a pilot
Endpoint: /pilots\
Method: POST\
Body: {\
    "certification": Number,\
    "name": String,\
    "age": Number,\
    "locationId": Number\
}

### Travel to other planet
Endpoint: /pilots/journey\
Method: POST\
Body: {\
    "destination": String\
}

### Accept contract
Endpoint: /pilots/accept-contract\
Method: POST\
Body: {\
    "contractId": Number\
}

### Collect cargo
Endpoint: /pilots/collect-cargo\
Method: POST\
Body: {\
    "contractId": Number\
}

### Deliver cargo
Endpoint: /pilots/deliver-cargo\
Method: POST\
Body: {\
    "contractId": Number\
}

## Ships route
The ship route has 4 diferrent endpoints (GET and POST), to access the route you can type:

> /ships

### Get all ships
Endpoint: /ships\
Method: GET

### Get ship by id
Endpoint: /ships/id\
Method: GET

### Create a ship
Endpoint: /ships\
Method: POST\
Body: {\
    "fuelCapacity": Number,\
    "fuelLevel": Number,\
    "weightCapacity": Number,\
    "pilotCertification": Number\
}

### Refill fuel of the ship
Endpoint: /ships/refill\
Method: POST\
Body: {\
    "fuelQuantity": Number\
}

## Contracts route
The ship route has 3 diferrent endpoints (GET and POST), to access the route you can type:\

> /contracts

### Get all contracts
Endpoint: /contracts\
Method: GET

### Get contract by id
Endpoint: /contracts/id\
Method: GET

### Create a contract
Endpoint: /contracts\
Method: POST\
Body: {\
    "description": String,\
    "resourceName": String,\
    "resourceWeight": Number,\
    "originPlanetId": Number,\
    "destinationId": Number,\
    "value": Number\
}

## Planets route
The ship route has 3 diferrent endpoints (GET and POST), to access the route you can type:

> /planets

### Get all planets
Endpoint: /planets\
Method: GET

### Get planet by id
Endpoint: /planets/id\
Method: GET

### Create a planet
Endpoint: /planets\
Method: POST\
Body: {\
    "name": String\
}

## Reports route
The reports route has 3 diferrent endpoints (GET), to access the route you can type:

> /reports

### Get the resources transported in each planet
Endpoint: /transported-planet-resources\
Method: GET

### Get the resources transported in for each pilot
Endpoint: /transported-pilot-resources\
Method: GET

### Check transactions
Endpoint: /transactions\
Method: GET

## Database model
The database witch I used is the sqlite3 and I create 4 tables (pilots, ships, contracts, planets), some of this tables has foreign keys.

Create database command:
```
npm run createdb
```

Drop database command:
```
npm run dropdb
```

Populate database command:
```
npm run populatedb
```

The populate database command will insert default datas in database.

## Software to test API
In this project I used the software Postman to test the API's, but have others like insomnia.

Note: You can use the browser by default to do this too.