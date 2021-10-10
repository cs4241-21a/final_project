const   mysql = require("mysql");
const     jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


//LOGIN PAGE
exports.login = async (request, response) => {
    try{

        const{ username, password } = request.body;

        if(!username || !password ){
            return response.status(400).render('login', {
                message: 'Username and Password fields must be completed'
            })
        }

        db.query( 'SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                response.status(401).render('login', {
                    message: 'Username or Password is incorrect'
                })
            }else{
                response.status(200).redirect('/home')
                const json = { username: username },
                    body = JSON.stringify( json )
                fetch( '/login-user', {
                    method:'POST',
                    body 
                  })
                  .then( function( response ) {
                    return response.json()
                  })
                  .then( function( json ) {
                    console.log(json)
                  })
            }
        })

    } catch (error){
        console.log(error);
    }
}


//REGISTER PAGE
exports.register = (request, response) => {
    console.log(request.body);
    
    const {username, password, passwordConfirm} = request.body;
    
    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, results) => {
        if(error){
            console.log(error);
        }
        
        if(results.length > 0) {
            return response.render ('register', {
                message: 'Username already in use'
            })
        } else if ( password !== passwordConfirm) {
            return response.render ('register',{
                message: 'Passwords do not match'
            })
        }
        
        
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        
        db.query('INSERT INTO users SET ?', {username:username, password:hashedPassword}, (error, results) => {
            if(error){
                console.log(error);
            } else {
                return response.render('register', {
                    message: 'User registered successfully'
                })
            }
        })
        
        
    });
    
}