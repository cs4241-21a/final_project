const express = require("express"),
	mongodb = require("mongodb"),
	path = require("path"),
	bodyparser = require("body-parser"),
	favicon = require("serve-favicon"),
	cookieSession = require("cookie-session"),
	app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(favicon(path.join(__dirname, "public/assets/G3P-logo.png")));

// Database Connection
const uri = 'mongodb+srv://myApp:qyTOpIT3cup5lTe9@cluster0.9gtis.mongodb.net/'
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
client.connect().catch(console.dir)
const db = client.db("G3PExpenseTracker")
const users = db.collection("users")
if (users !== null) console.log("mongoDB connection established");
else console.log("mongoDB connection failed")

// Checks DB connection for each request
app.use((req, res, next) => {
	if (users !== null) next();
	else res.status(503).send();
});

// Cookie
app.use(
	cookieSession({
		name: "session",
		keys: ["key", "backup1", "backup2"],
		maxAge: 7 * 24 * 60 * 60 * 1000 // A week
	})
);

// ------ Serve Non-Secret Files ------

// login
app.get("/login", function (req, res) {
	res.sendFile(__dirname + "/public/login.html");
});

// join
app.get("/join", function (req, res) {
	res.sendFile(__dirname + "/public/join.html");
});

// css
app.get("/styles.css", function (req, res) {
	switch (req.session.theme) {
		case "pink":
			res.sendFile(__dirname + "/public/css/stylesPink.css");
			break;
		default:
			// Defaults and backup to the default style so nothing breaks
			res.sendFile(__dirname + "/public/css/styles.css");
			break;
	}
});

// icon
app.get("/G3P-logo.png", function (req, res) {
	res.sendFile(__dirname + "/public/assets/G3P-logo.png");
});

// ------ Account ------

// User login authentication
app.post("/login", (req, res) => {
	console.log("/login");
	console.log(req.body);

	users
		.countDocuments({email: req.body.email, password: req.body.password})
		.then(result => {
			if (result === 1) {
				console.log("Successfully logged user in");
				req.session.login = true;
				console.log("user id: " + req.body.email);
				req.session.email = req.body.email;
				// TODO: This is a temporary implementation of the "Remember me" feature
				if (req.body.remember !== "on") {
					req.sessionOptions.maxAge = 5 * 60 * 1000; // 5 Minutes
				}
				res.redirect("/");
			} else {
				console.log("No such combination found");
				// TODO: Inform user "Email or Password Incorrect"
				res.redirect("/login");
			}
		});
});

// User logout
app.get("/logout", function (req, res) {
	req.session = null;
	console.log("Successfully logged out")
	// TODO: Inform user "Successfully logged out"
	res.redirect("/login");
});

// Create new account
app.post("/join", (req, res) => {
	console.log("/join:");
	console.log(req.body);

	if (req.body.password !== req.body.passwordC) {
		console.log("Passwords don't match")
		// TODO: Inform user "Passwords don't match"
		res.redirect("/join");
	}

	users
		.countDocuments({email: req.body.email})
		.then(result => {
			if (result === 0) {
				let newUser = {
					email: req.body.email,
					password: req.body.password
				};
				db.createCollection(req.body.email).catch(console.dir);
				console.log("User collection created");
				users.insertOne(newUser).then(() => {
					console.log("Successfully created account");
					res.redirect("/login");
				});
			} else {
				console.log("Email already in use");
				// TODO: Inform user "Email already in use"
				// res.body.notify = "Email already in use"?
				res.redirect("/join");
			}
		});
});

// Block all unauthenticated access
app.use(function (req, res, next) {
	if (req.session.login === true) next();
	else res.redirect("/login");
});

// ------ Logged in only ------
// ------ Logged in only ------
// ------ Logged in only ------

// Serve static files with automatic extension fallbacks so things can look much nicer
app.use(express.static("public", {extensions: ["html", "js", "css"]}));

// Serve static files for the date picker, to enable importing of node packages in client
app.use(express.static("node_modules/@themesberg/tailwind-datepicker"));

// Serve index.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

// ------ CRUD ------

// Route to create transaction
app.post("/create", (req, res) => {
	console.log("/create");
	console.log(req.body);
	let transaction = {
		date: req.body.date,
		isIn: req.body.type === "income",
		amount: req.body.amount * 100,
		note: req.body.note
	};
	db.collection(req.session.email).insertOne(transaction)
	res.redirect("/");
});

// Route to read transaction
app.post("/read", (req, res) => {
	console.log("/read")
	console.log(req.body)
	db.collection(req.session.email)
		.find({date: {$gte: req.body.firstDay, $lte: req.body.lastDay}})
		.toArray()
		.then(result => res.json(result));
});

// Route to update transaction
app.post("/update", (req, res) => {
	console.log("/update");
	console.log(req.body);
	let transaction = {
		_id: new mongodb.ObjectId(req.body.id),
		date: req.body.date,
		isIn: req.body.type === "income",
		amount: req.body.amount * 100,
		note: req.body.note
	};
	db.collection(req.session.email).replaceOne({_id: new mongodb.ObjectId(req.body.id)}, transaction)
	res.redirect("/");
});

// Route to delete transaction
app.post("/delete", (req, res) => {
	console.log("/delete");
	console.log(req.body);
	db.collection(req.session.email).deleteOne({_id: new mongodb.ObjectId(req.body.id)})
	res.redirect("/");
});

// ------ Other Server Operations ------

// Update theme selection
// basically change client's cookie's theme field
app.post("/theme", (req, res) => {
	console.log("/theme");
	console.log(req.body);
	req.session.theme = req.body.theme
	res.redirect('/')
})

app.listen(3000);
