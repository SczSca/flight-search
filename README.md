# Flight
## Clone the Repository
```bash
git clone https://github.com/SczSca/flight-search.git
```

## flight-search Frontend


### Getting Started

#### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/package-manager)
##### Package manager:
You may choose between one of these:
- npm (included in Node.js)
- [yarn](https://yarnpkg.com)

#### Open project directory
```bash
cd front-end/search-flights/
```
#### Running app

##### Using npm

Installing dependencies used in project:
```bash
npm install
```
After installing, use this command to create docker image of app:
```bash
docker build . -t "front-amadeus-flightst:v1.0"
```
After creating a docker image just as mentioned, use docker compose up:
```bash
docker compose up
```

The application will start and be available at: 
```bash
http://localhost:3000/
```

#### Running tests

##### Using npm

```bash
npm run tests
```
##### Using yarn

```bash
yarn tests
```
### Features

1. **Flight Search Form**  
   - Input fields for:
     - Departure airport code or name
     - Arrival airport code or name
     - Departure date
     - Number of adults
     - Preferred currency (USD, MXN, EUR)
     - Flight preferences (non-stop or with stops)
   - Dynamically loads matching airport codes based on partial names or inputs to assist users in finding the correct IATA code.

2. **Search Validations**  
   - Prevents users from selecting past dates as departure dates.
   - Ensures the return date (if applicable) is not earlier than the departure date.

3. **Flight Results Display**  
   - Shows a list of flight options with:
     - Initial departure and final arrival date/time
     - Departure and arrival airports (name and code)
     - Airline name and code
     - Total flight duration, including layover times (if applicable)
     - Stops information with duration and details (name and code of layover airports)
     - Total price and price per traveler in the selected currency.

4. **Sorting and Filtering**  
   - Allows sorting of results by price and/or flight duration.

5. **Flight Details View**  
   - Displays a comprehensive breakdown for each selected flight:
     - Segment details, including:
       - Departure/arrival time
       - Airline and operating carrier details
       - Flight number and aircraft type
       - Cabin, class, and traveler fare details
       - Amenities (name, availability, and chargeability)
     - Layover durations between segments
   - Shows a detailed price breakdown:
     - Base price
     - Fees
     - Total price
     - Price per traveler
   - Displays all amounts in the user-selected currency.

6. **Roundtrip Functionality**  
   - Handles roundtrip searches by displaying returning flight details similarly to the departing flight.

---

## flight-search Backend

This is the backend application for the To-do list app built with Spring Boot and Maven. This guide will help you set up and run the application locally.

### Getting Started

#### Prerequisites
Make sure you have the following installed:
- [Java 11+](https://openjdk.org/install/)
  ```bash
  //this will install the latest version check: https://formulae.brew.sh/formula/openjdk
  brew install openjdk
  ```
- [Maven](https://maven.apache.org/download.cgi)

#### Open project directory
```bash
cd back-end
```
#### Running app
```bash
./gradlew build
```
After installing, use this command to create docker image of app:
```bash
docker build . -t "backend-amadeus-flights:v1.0"
```
After creating a docker image just as mentioned, use docker compose up:
```bash
docker compose up
```
The application will start and be available at: 
```bash
http://localhost:9090
```

#### Running tests
```bash
texts in progress of implementation
```

### Features

#### Base Endpoint
All endpoints are prefixed with `/api/v1`.
# Backend Features

The backend service is built using **Spring Boot** and exposes a REST API for flight search and airport information, which communicates with the **Amadeus API** for flight offers and IATA code recommendations.

## API Endpoints

### 1. **Get IATA Recommendations**
   - **Endpoint:** `/info/IATA`
   - **Method:** `GET`
   - **Description:** This endpoint allows users to retrieve airport IATA code recommendations based on a search keyword (partial or full airport name). It helps users find the correct airport IATA code without needing to know it beforehand.
   - **Request Parameters:**
     - `keyword` (required): A string representing the airport name or part of it.
   - **Response:** A list of IATA codes and corresponding airport names matching the keyword.
   - **Example Request:**  
     `/api/v1/info/IATA?keyword=New York`
   
   This endpoint is mapped to the `getIATARecommendations` method in the `FlightController` class, which interacts with the `FlightService` to retrieve the recommended IATA codes.

### 2. **Get Flight Offers**
   - **Endpoint:** `/search/flights`
   - **Method:** `GET`
   - **Description:** This endpoint fetches flight offers from the Amadeus API based on several search parameters such as origin and destination airports, departure and return dates, number of adults, currency, and whether the flight is non-stop.
   - **Request Parameters:**
     - `originLocationCode` (required): The IATA code of the departure airport.
     - `destinationLocationCode` (required): The IATA code of the arrival airport.
     - `departureDate` (required): The departure date in `YYYY-MM-DD` format.
     - `returnDate` (required): The return date in `YYYY-MM-DD` format.
     - `adults` (required): The number of adult passengers.
     - `nonStop` (required): Boolean indicating whether the flight is non-stop.
     - `currencyCode` (required): The currency in which the prices should be returned (USD, EUR, MXN).
     - `order` (required): Sorting preference for results (`price` or `duration`).
   - **Response:** A list of available flight options with details including flight times, airports, airline details, and pricing.
   - **Example Request:**  
     `/api/v1/search/flights?originLocationCode=NYC&destinationLocationCode=LON&departureDate=2024-12-15&returnDate=2024-12-20&adults=1&nonStop=true&currencyCode=USD&order=price`

   The endpoint is mapped to the `getFlightOffers` method in the `FlightController` class, which fetches flight offer details using the `FlightService`.

## Airport Information Optimization

To reduce the number of API requests to Amadeus for airport data, a **pre-population script** is implemented to make **5 requests** to Amadeus at the backend's startup. These requests are designed to collect the most relevant IATA results, which are then stored locally. This optimization ensures that the application performs efficiently by minimizing external API calls for airport-related information.

## Summary of Flow
- **When the backend is initiated**, a script makes 5 requests to Amadeus to gather IATA recommendations based on common airport queries. These results are then stored locally in the system to reduce repeated API calls.
- **Users interact with the backend via two key endpoints**: one for IATA code recommendations and another for retrieving flight offers based on user inputs. The backend communicates with the Amadeus API to provide the necessary data, and the results are returned in the response.







