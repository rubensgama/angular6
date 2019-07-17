/**
 * Domain class of authentication data of users logged in the application.
 * It's useful to work with the roles to realise specific authorization procedures.
 * The token is used into the http interceptor to inject it into all of the requests 
 * dispatched to the server backend.
 */
export class AuthUser {
    constructor(public username: String, public roles: Array<String>, public token: String) {
    }
}