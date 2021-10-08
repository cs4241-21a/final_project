const port = 3030;

const dbConnection = 'mongodb+srv://db_user:r3b4kyGnRb4ozP5F@cluster0.gwbts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const sessionSecret = 'secret';

const GithubClientID = '06168acd9ccd29543cf8';
const GithubClientSecret = '2efda275797cda53cf000cc69326142c89fa2ebe';
const GithubCallbackURL = "http://127.0.0.1:3030/auth/github/callback";

module.exports = {
    port,
    dbConnection,
    sessionSecret,
    GithubClientID,
    GithubClientSecret,
    GithubCallbackURL,
}
