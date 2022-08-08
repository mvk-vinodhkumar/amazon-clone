const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")(
  "sk_test_51LSdSKSCAW4erSwFaECcyz2WfK14RdMzgKR4gKGc3ThBNi49K9LX9EjLmRfL1nGvokB2KJdu462ne5w79kKe7xpp00eamdKBbJ"
)

// Following are the steps to setup API
// - App config
const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"))
// app.get("/vk", (request, response) => response.status(200).send("Hi Vinodh!"))

app.post("/payments/create", async (request, response) => {
  const total = request.query.total

  console.log("Payment Request Recieved!!! for this amount >>> ", total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  })

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// - Listen command
exports.api = functions.https.onRequest(app)

// Example endpoint
//http://localhost:5001/clone-f1e68/us-central1/api

//firebase emulators:start
