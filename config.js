const port = 3000;

const dbConnection = "mongodb+srv://admin:admin@cluster0.4woyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const sessionSecret = 'secret';

const GithubClientID = '06168acd9ccd29543cf8';
const GithubClientSecret = '63b93ab89f472a139292d194a6cb911277188c34';
const GithubCallbackURL = "http://127.0.0.1:3000/auth/github/callback";

module.exports = {
    port,
    dbConnection,
    sessionSecret,
    GithubClientID,
    GithubClientSecret,
    GithubCallbackURL,
}
