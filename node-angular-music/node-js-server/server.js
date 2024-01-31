const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);



// parse requests of content-type - application/json
app.use(express.json());
app.use('/upload', express.static('./app/assets/upload'));
app.use('/music', express.static('./app/assets/music'));

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "node-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.use('', require('./app/routes/routes'));

// set port, listen for requests
const PORT =  8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
