const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/publicf"));
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'product24',
        port: 3306
    }
);

connection.connect(function (error) {
    if (error) {
        console.log("Unable to connect with data base", error);
    } else {
        console.log("Database connected");
    }
});

app.get('/allusers',function (req,res){
    let pageInfo = {
        title: "all users",
        pageName: 'allusers',
        users: []
    };
    console.log("first 111111111111111");
    connection.query("SELECT * from employe", function (error,result){
        console.log("second 22222222222222");
        if(error){
            console.log("database query error");
        } else {
            console.log("All users :::", result);
            pageInfo.users = result;
            res.render("template", pageInfo);
        }
    });
});


app.get('/', function (req, res) {
    let pageInfo = {
        title: "disign page",
        pageName: 'homepage',
    };
    console.log(pageInfo, pageInfo.title);
    res.render('template', pageInfo);
});

app.get('/login', function (req, res) {
    let pageInfo = {
        title: "Login",
        pageName: 'loginpage',
    };
    res.render('template', pageInfo);
});

app.get('/register', function (req, res) {
    let pageInfo = {
        title: "Registration",
        pageName: 'register',
    };
    res.render('template', pageInfo);
});

app.get('/contact', function (req, res) {
    let pageInfo = {
        title: "contactpage",
        pageName: 'contactpage',
    };
    res.render('template', pageInfo);
});

app.get('/query', function (req, res) {
    let pageInfo = {
        title: "querypage",
        pageName: 'querypage',
    };
    res.render('template', pageInfo);
});

app.get('/images', function (req, res) {
    let pageInfo = {
        title: "imagepage",
        pageName: 'images',
    };
    res.render('template', pageInfo);
});

app.post('/register', function (req, res) {
    console.log("POST method Registration url", req.body);
    // return false;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const contact = req.body.contact;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const hobbies = req.body.hobbies;
    const dob = req.body.dob;
    const insertUser = `INSERT INTO employe(first_name, last_name, email, password, contact, address, city, state, hobbies, dob) VALUES ('${firstName}' , '${lastName}' , '${email}' , '${password}' , '${contact}' , '${address}' , '${city}' , '${state}' , '${hobbies}' , '${dob}')`;
    // console.log(insertUser);//return false;
    connection.query(insertUser, function (error, result) {
        if (error) {
            console.log("query error", error);
        } else {
            console.log("successfully....!");
            res.redirect('/login');
        };

    });

});


const port = 3003;
app.listen(port, function () {
    console.log(`Server started at port, ${port}`);
});