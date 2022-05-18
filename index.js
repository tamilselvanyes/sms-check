const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const fast2sms = require("fast-two-sms");

const unirest = require("unirest");

const req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

const app = express();
//middleware settings
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const client = creatConnection();

app.get("/", (req, res) => {
  res.send("This is my backend app for OTP manager");
  return;
});

app.listen(PORT, () => console.log("Server Started at PORT " + PORT));

async function creatConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo connected successfully");
  return client;
}
//

async function sendOTP() {
  req.query({
    authorization: process.env.SMS_API_KEY,
    variables_values: "5599",
    route: "otp",
    numbers: "9894891316",
  });

  req.headers({
    "cache-control": "no-cache",
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
}

sendOTP();
