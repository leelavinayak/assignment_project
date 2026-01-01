const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static('.'));
const jwt_token_secret = 'thisisasecretkeytokenforuser';

//Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vinayak155',
    database: 'userdetails'
});
connection.connect((err) => {
    if (err) {
        console.log("Error occured in databse: ", err);
    } else {
        console.log("Database Connected successfully.");
    }
});
app.get('/', (req, res) => {
    res.send("Hello user")
});

//Bearer token
const authentication = (req,res,next)=>{
    const bearer_token = req.headers.authorization;
    console.log("Bearer Token: ",bearer_token);
    res.status(401).send("your not autherizored");
    if(!bearer_token){
        res.status(400).send("Bearer Token missing");
    }
    const token = bearer_token.split('Bearer ')[1];
    console.log("line 44: ",token);
    const decodedversion = jwt.verify(token,jwt_token_secret)
    console.log('Decoded Version: ',decodedversion);
}
//Register authentication
app.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("hashedpassword: ", hashedpassword);
        connection.query(`INSERT INTO details(UserName,UserEmailId,Hashedpassword) VALUES('${username}','${email}','${hashedpassword}')`, (err, result) => {
            if (err) {
                console.error("Error ocuured to insert details on database");
            }else{
                console.log("Details Inserted into database");
            }
        })
    } catch (err) {
        console.error("Error ocuured: ", err);
    }
    res.status(200).send(`${username} you register Succesfully`);
});

//login authentication
app.post('/login',async (req, res) => {
    console.log("User logged in: ", req.body);
    const {username,email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    try {
        const query = 'SELECT hashedpassword FROM details WHERE userEmailId = ?';
        connection.query(query, [email], async (err, result) => {
            if (err) {
                console.error("Database error: ", err);
                return res.status(500).send("Database error occurred");
            }

            if (result.length === 0) {
                return res.status(401).send("Invalid email or password");
            }

            const hashedPassword = result[0].hashedpassword;
            console.log("Hashed password: ", hashedPassword);

            const isMatch = await bcrypt.compare(password, hashedPassword);
            console.log("Password match: ", isMatch);

            if (isMatch) {
                res.status(200).send("you Logged in successfully");
                console.log("Inserted Successfully");
                //Generating jwt token
                const userpayload = {
                    user_name:username,
                    user_email:email
                }
                const token=jwt.sign(userpayload,jwt_token_secret,{expiresIn:'1day'});
                console.log("token: ",token);
            } else {
                res.status(401).send("Invalid email or password");
            }
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send("Internal server error");
    }
});

//Get bearer token
app.get('/userdetails',authentication,(req,res)=>{
    const user={
        user_name:username,
        user_email:email
    }
    res.send("only users can see");
});

//Delete user details
app.delete('/delete',(req,res)=>{
    const id = 3;
    connection.query(`DELETE FROM details WHERE ID = '${id}'`,(err,result)=>{
        if(err){
            console.log('Error while deleting user: ',err);
        }else{
            console.log("Deleted Successfully.");
        }
    });
    res.send("only users can see");
});

app.listen(3000, () => {
    console.log("Server Running successfully");
})