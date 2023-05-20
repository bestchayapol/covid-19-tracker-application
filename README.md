# Covid 19 Tracker Application

"Covid-19 Tracker Application" is a website that gives live informations of Covid-19 cases across different countries based on user's search.

## Functions

- Users can create an account and log in to access the overview of covid 19 dashboard.
- The application will display real-time data and statistics about the spread of COVID-19 from various sources. Users will be able to browse and search through COVID-19 data by country. Historical data trends and visualizations about the spread of COVID-19 over time will also be available.
-Authorized users will be able to edit or update existing COVID-19 data for a location, such as the number of confirmed cases, deaths, or recoveries. They will also be able to edit or update the location-specific details, such as the location name or demographic details.
-Authorized users will be able to delete account from the application if it is no longer needed.
-The application will be mobile-friendly and responsive to ensure users can access information from any device.

## Database schema
![Register](https://github.com/bestchayapol/covid-19-tracker-application/assets/46255972/f91437c4-082a-4b42-94eb-cbada70cb04b)
![Sign-In](https://github.com/bestchayapol/covid-19-tracker-application/assets/46255972/3070a6b2-e000-4eb7-afef-f249ab5a3570)

## To run the frontend and backend in developmode 
### Frontend
cd to client and then run
```
    npm start
```
### Backend
cd to server and then run
```
    node index.js
```

### API endpoints

#### URL
`POST /register`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String|username |
|password|String| password|
|password|String| confirm password|

Example
```
   {
    "username":"bestTo",
    "password" : "Best$1324",
    "confirm password" : "Best$1324"
   }


```

#### Success

###### Status Code
` 200`  register success

no response body

### get logged in user

#### URL
`GET /account`

#### Request Body 
No Request Body


#### Success

###### Status Code
` 200`  got data

| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String| username
|id|String| user id

Example
```
{
   "username":"bestTo",
   "id" : "1"
}

```
#### URL

`POST /login`

#### Request Body 

| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String|username|
|password|String| password|

Example
```
   {
     "username" : "bestTo",
     "password" : "Best$1324"
   }


```

#### Success

Response

###### Status Code

`200`  login success

| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String| username |
|password|String| password |
|id|String| user id |

Example
```
{
   "username":"bestTo",
   "password" : "Best$1324"
   "id" : "1"
}

```

**noted: If success, the Response will be sent with cookie named UserToken**

### Delete Account

#### URL
`DELETE /delete-account`

### Parameter
| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String| username
|id|String| user id

#### Request Body 
No Request Body

#### Success
Response

###### Status Code
` 200`  delete success

no response body

