const   mysql = require("mysql");
const     jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

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