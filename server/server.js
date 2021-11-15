const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db/db");
const routes = require("./routes/db");

const app = express();
app.use(morgan("tiny"));
app.use(cors());
const port = process.env.PORT || 3500;
app.use(express.json());
app.use("/api/v1/restaurant", routes);

app.listen(port, () => {
	console.log(`App is listening on http://localhost:${port}`);
});
