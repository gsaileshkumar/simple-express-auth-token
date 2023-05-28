# express-auth-api

Simple express app with following endpoints

```
/token
POST
body
{
  username:"asd",
  password:"qwe"
}
response:
{
  accessToken:"xxxx",
  refreshToken:"yyyy",
}

/refresh
POST
body
{ refreshToken:"qwe" }
response:
{
  accessToken:"xxxx",
  refreshToken:"yyyy",
}

/about
GET
HEADER - Authorization: Bearer {accessToken}
response
Hello world
```

## Running the app

Install the dependencies by executing `yarn`

Start the app by executing `yarn start`

App will be running in the port `3000`

NOTE: Since the main goal of this exercise is to implement a token based endpoint,
username, password and jwt signing secrets are hardcoded for simplicity
and hence these variables are prefixed with `UNSAFE_`

## Testing the app

Run the test cases by executing `yarn run test`
