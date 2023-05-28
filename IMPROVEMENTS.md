# Improvements

To improve this implementation further, we can consider the following points,

- Frontend can access these token using HttpOnly Cookies to keep them secured
- Token revocation functionality can be added when users sign out of the application. Revoking a token invalidates it, ensuring that even if a token is stolen or compromised, it cannot be used for further authentication
- Incase of long lived tokens, we can also rotate the token on every subsequent authenticated request. This will limit lifespan of any signed token and reduces the potential impact of a compromised token
- Rate limiting can also be implemented to protect the api endpoints against ddos or brute force attacks
