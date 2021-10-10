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

					// Add read indexing for user to optimize load time
					if (!req.body.email.includes("noIndex") && !req.body.email.includes("89jv4hu8283e4c9h")) {
						// Create an descending index on the "date" field in the user's collection
						db.collection(req.body.email).createIndex({date: 1});
						// Create an compound index on the "date", "amount" and "note" field in the user's collection
						db.collection(req.body.email).createIndex({note: "text"})
						// db.collection(req.body.email).createIndex({"date": -1, "amount": -1, "note": "text"})
					}

					// Add random nouns
					if (req.body.email.includes("random@nouns") || req.body.email.includes("kmocowiamcwaiom")) {
						let randomNouns = ["assignment", "editor", "pie", "patience", "university", "republic", "customer", "river", "awareness", "bedroom", "message", "understanding", "measurement", "article", "speech", "night", "difference", "bread", "photo", "science", "property", "difficulty", "tooth", "surgery", "negotiation", "volume", "chocolate", "apartment", "two", "queen", "scene", "driver", "wedding", "hall", "law", "personality", "movie", "thing", "historian", "arrival", "city", "inspection", "assistant", "emotion", "pizza", "orange", "information", "drawing", "fortune", "security", "dinner", "possibility", "judgment", "poetry", "depth", "reading", "song", "grandmother", "ear", "ladder", "recognition", "height", "profession", "wife", "village", "education", "operation", "presentation", "entertainment", "analyst", "competition", "dirt", "definition", "president", "dad", "mom", "teacher", "advertising", "collection", "woman", "man", "agreement", "examination", "alcohol", "friendship", "bathroom", "revenue", "platform", "delivery", "temperature", "lake", "suggestion", "permission", "responsibility", "aspect", "child", "member", "leader", "country", "significance", "phone", "poem", "library", "opportunity", "outcome", "worker", "dealer", "employer", "language", "teaching", "county", "shopping", "camera", "tea", "politics", "tale", "refrigerator", "gene", "philosophy", "media", "environment", "girlfriend", "injury", "response", "energy", "economics", "reality", "method", "psychology", "strategy", "freedom", "climate", "safety", "lady", "people", "resolution", "extent", "quality", "sample", "administration", "restaurant", "internet", "decision", "procedure", "storage", "society", "writer", "accident", "client", "proposal", "committee", "bath", "cigarette", "history", "priority", "election", "highway", "topic", "membership", "reception", "efficiency", "assistance", "year", "feedback", "foundation", "statement", "atmosphere", "context", "cousin", "obligation", "studio", "promotion", "basket", "coffee", "passenger", "intention", "ratio", "currency", "hotel", "assumption", "town", "tradition", "drawer", "meat", "ad", "application", "growth", "problem", "leadership", "emphasis", "device", "organization", "hospital", "ability", "percentage", "power", "theory", "engineering", "mode", "anxiety", "wealth", "complaint", "pollution", "artisan", "student", "disease", "effort", "health", "government", "audience", "classroom", "variety", "breath", "income", "perspective", "marketing", "police", "hearing", "truth", "heart", "cancer", "inflation", "interaction", "transportation", "cell", "preparation", "entry", "construction", "world", "concept", "contribution", "quantity", "charity", "oven", "childhood", "expression", "management", "excitement", "supermarket", "thanks", "magazine", "writing", "map", "confusion", "relationship", "baseball", "communication", "midnight", "recording", "warning", "relation", "sector", "desk", "activity", "goal", "error", "agency", "cheek", "location", "attitude", "user", "guest", "tennis", "disk", "variation", "departure", "community", "imagination", "replacement", "establishment", "diamond", "possession", "description", "recipe", "candidate", "consequence", "area", "mall", "explanation", "initiative", "medicine", "series", "month", "salad", "lab", "bird", "death", "appointment", "advice", "memory", "skill", "uncle", "clothes", "professor", "garbage", "region", "bonus", "success", "revolution", "maintenance", "meal", "preference", "recommendation", "distribution", "sister", "penalty", "nation", "unit", "tension", "direction", "shirt", "airport", "presence", "disaster", "fact", "industry", "director", "computer", "person", "music", "engine", "guidance", "idea", "contract", "event", "mood", "database", "throat", "resource", "debt", "celebration", "estate", "attention", "manufacturer", "sympathy", "television", "discussion", "flight", "gate", "mud", "addition", "development", "chemistry", "tongue", "improvement", "moment", "investment", "passion", "mixture", "manager", "connection", "introduction", "video", "signature", "instance", "hat", "birthday", "perception", "association", "son", "performance", "knowledge", "family", "weakness", "blood", "appearance", "army", "reaction", "enthusiasm", "population", "marriage", "apple", "basis", "football", "control", "role", "insurance", "week", "ambition", "grocery", "payment", "secretary", "painting", "girl", "king", "meaning", "steak", "newspaper", "guitar", "exam", "actor", "soup", "importance", "homework", "situation", "comparison", "protection", "chapter", "news", "farmer", "instruction", "virus", "office", "requirement", "paper", "championship", "union", "policy", "drama", "art", "player", "love", "finding", "solution", "menu", "cookie", "youth", "piano", "analysis", "elevator", "potato", "product", "software", "insect", "loss", "winner", "data", "beer", "sir", "college", "speaker", "singer", "trainer", "independence", "length", "technology", "nature", "boyfriend", "argument", "stranger", "affair", "criticism", "food", "story", "reputation", "equipment", "category", "setting", "conversation", "wood", "indication", "version", "failure", "math", "impression", "road", "housing", "physics", "hair", "way", "poet", "literature", "chest", "thought", "opinion", "combination", "cabinet", "system", "honey", "conclusion", "inspector", "buyer", "employment", "fishing", "department", "vehicle", "reflection", "courage", "selection", "owner", "satisfaction", "employee", "depression", "session"]
						let randomTransactions = []
						let dataNum = 0;
						for (let year = 2011; year < 2022; year++) {
							for (let month = 1; month < 13; month++) {
								for (let day = 1; day < 31; day++) {
									let ranSmall = +(10 * Math.random()).toFixed(0);
									for (let j = 0; j < ranSmall; j++) {
										dataNum++;
										let ranMid = +(9999 * Math.random()).toFixed(0);
										let ranMini = +(2 * Math.random()).toFixed(0);
										let nouns1 = randomNouns[+(randomNouns.length * Math.random()).toFixed(0)];
										let nouns2 = randomNouns[+(randomNouns.length * Math.random()).toFixed(0)];
										let nouns3 = randomNouns[+(randomNouns.length * Math.random()).toFixed(0)];
										let nouns4 = randomNouns[+(randomNouns.length * Math.random()).toFixed(0)];
										let nouns5 = randomNouns[+(randomNouns.length * Math.random()).toFixed(0)];
										randomTransactions.push({
											date: year + "-" + ((month < 10) ? "0" + month : month) + "-" + ((day < 10) ? "0" + day : day),
											isIn: ranMini === 1,
											amount: ranMid,
											note: nouns1 + " #" + nouns2 + " " + nouns3 + " #" + nouns4 + " " + nouns5 + " #" + dataNum
										})
									}
								}
							}
						}
						db.collection(req.body.email).insertMany(randomTransactions)
					}

					// Add random data
					if (req.body.email.includes("random@test") || req.body.email.includes("ebdrfcgtvy567u")) {
						let randomTransactions = []
						let dataNum = 0;
						for (let year = 2011; year < 2022; year++) {
							for (let month = 1; month < 13; month++) {
								for (let day = 1; day < 31; day++) {
									let ranSmall = +(10 * Math.random()).toFixed(0);
									for (let j = 0; j < ranSmall; j++) {
										dataNum++;
										let ranMid = +(9999 * Math.random()).toFixed(0);
										let ranMini = +(2 * Math.random()).toFixed(0);
										randomTransactions.push({
											date: year + "-" + ((month < 10) ? "0" + month : month) + "-" + ((day < 10) ? "0" + day : day),
											isIn: ranMini === 1,
											amount: ranMid,
											note: "random data #" + dataNum.toString()
										})
									}
								}
							}
						}
						db.collection(req.body.email).insertMany(randomTransactions)
					}
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
	if (req.body.searchKey === null) {
		db.collection(req.session.email)
			.find({date: {$gte: req.body.firstDay, $lte: req.body.lastDay}})
			.sort({date: -1, amount: -1, note: -1})
			.limit(2000)
			.toArray()
			.then(result => res.json(result));
	} else {
		db.collection(req.session.email)
			.find({$text: {$search: req.body.searchKey}})
			.sort({score: {$meta: "textScore"}, date: -1, amount: -1, note: -1})
			.limit(2000)
			.toArray()
			.then(result => res.json(result));
	}
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

// 404 Page for logged in users
app.use(function (req, res) {
	res.redirect("/404");
});

app.listen(3000);
